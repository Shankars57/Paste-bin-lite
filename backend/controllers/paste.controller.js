import Paste from "../model/Paste.js";
import { nowMs } from "../utils/time.js";

/* POST /api/pastes */
export async function createPaste(req, res) {
  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Invalid content" });
  }

  if (
    ttl_seconds !== undefined &&
    (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)
  ) {
    return res.status(400).json({ error: "Invalid ttl_seconds" });
  }

  if (
    max_views !== undefined &&
    (!Number.isInteger(max_views) || max_views < 1)
  ) {
    return res.status(400).json({ error: "Invalid max_views" });
  }

  const expiresAt = ttl_seconds
    ? new Date(Date.now() + ttl_seconds * 1000)
    : null;

  const paste = await Paste.create({
    content,
    expires_at: expiresAt,
    max_views: max_views ?? null,
  });

  res.status(201).json({
    id: paste.id,
    url: `${req.protocol}://${req.get("host")}/p/${paste.id}`,
  });
}

/* GET /api/pastes/:id */
export async function getPasteApi(req, res) {
  const { id } = req.params;
  const now = nowMs(req);

  const paste = await Paste.findByPk(id);
  if (!paste) return res.status(404).json({ error: "Not found" });

  if (paste.expires_at && now > paste.expires_at.getTime()) {
    return res.status(404).json({ error: "Expired" });
  }

  if (paste.max_views !== null && paste.views >= paste.max_views) {
    return res.status(404).json({ error: "View limit exceeded" });
  }

  paste.views += 1;
  await paste.save();

  res.json({
    content: paste.content,
    remaining_views:
      paste.max_views === null
        ? null
        : Math.max(0, paste.max_views - paste.views),
    expires_at: paste.expires_at,
  });
}

/* GET /p/:id */
export async function getPasteHtml(req, res) {
  const { id } = req.params;
  const now = nowMs(req);

  const paste = await Paste.findByPk(id);
  if (!paste) return res.status(404).send("Not found");

  if (paste.expires_at && now > paste.expires_at.getTime()) {
    return res.status(404).send("Expired");
  }

  if (paste.max_views !== null && paste.views >= paste.max_views) {
    return res.status(404).send("View limit exceeded");
  }

  paste.views += 1;
  await paste.save();

  res.setHeader("Content-Type", "text/html");
  res.send(`<pre>${paste.content.replace(/</g, "&lt;")}</pre>`);
}
