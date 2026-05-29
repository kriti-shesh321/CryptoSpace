import { Router } from "express";
import { getAlerts, createAlert, updateAlert, deleteAlert } from "./alert.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getAlerts);
router.post("/", authMiddleware, createAlert);
router.patch("/:id", authMiddleware, updateAlert);
router.delete("/:id", authMiddleware, deleteAlert);

export default router;