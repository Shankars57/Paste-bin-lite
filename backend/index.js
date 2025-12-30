import { config } from "dotenv";
config();

import app from "./app.js";
import sequelize from "./db.js";

async function initDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected & synced");
  } catch (err) {
    console.error("DB init failed:", err);
    process.exit(1);
  }
}

await initDb();

app.get("/api/healthz", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
