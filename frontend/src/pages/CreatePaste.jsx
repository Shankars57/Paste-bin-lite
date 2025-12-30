import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { ClipboardCopy, Timer, Eye } from "lucide-react";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setUrl("");

    try {
      const res = await api.post("/api/pastes", {
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined,
      });

      setUrl(res.data.url);
      toast.success("Paste created successfully!");
      setContent("");
      setTtl("");
      setViews("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create paste");
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard");
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Pastebin Lite</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your content here..."
          className="w-full h-40 p-3 rounded bg-gray-900 border border-gray-700"
        />

        <div className="flex gap-4 flex-col w-64">
          <div className="flex items-center gap-2 flex-1">
            <Timer size={18} />
            <input
              type="number"
              placeholder="TTL (seconds)"
              value={ttl}
              onChange={(e) => setTtl(e.target.value)}
              className="w-full p-2 rounded bg-gray-900 border border-gray-700"
            />
          </div>

          <div className="flex items-center gap-2 flex-1">
            <Eye size={18} />
            <input
              type="number"
              placeholder="Max views"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              className="w-full p-2 rounded bg-gray-900 border border-gray-700"
            />
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold">
          Create Paste
        </button>
      </form>

      {url && (
        <div className="mt-6 p-4 bg-gray-900 rounded border border-gray-700 flex items-center justify-between">
          <a href={url} target="_blank" className="text-blue-400">
            {url}
          </a>
          <button onClick={copyLink}>
            <ClipboardCopy />
          </button>
        </div>
      )}
    </div>
  );
}
