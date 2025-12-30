import { Router } from "express";
import {
  createPaste,
  getPasteApi,
  getPasteHtml,
} from "../controllers/paste.controller.js";

const router = Router();

router.post("/api/pastes", createPaste);
router.get("/api/pastes/:id", getPasteApi);
router.get("/p/:id", getPasteHtml);

export default router;
