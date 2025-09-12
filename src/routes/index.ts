import express from "express";
import authRoutes from "./shopify.auth.routes";
import productRoutes from "./shopify.product.routes";
import webhookRoutes from "./shopify.webhook.routes";

const router = express.Router();

router.use("/api/v1", authRoutes);
router.use("/api/v1", productRoutes);
router.use("/api/v1", webhookRoutes);

export default router;
