import express from "express";
import {
  saveEmailSettings,
  getEmailSettings
} from "../controllers/email.controller.js";

const router = express.Router();

router.patch("/:id/toggle-email", saveEmailSettings);
router.get("/:id/settings", getEmailSettings);

export default router;