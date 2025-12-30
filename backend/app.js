import express from "express";
import cors from "cors";
import pasteRoutes from "./routes/paste.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Server is running</h1>");
});

app.use(pasteRoutes);

export default app;
