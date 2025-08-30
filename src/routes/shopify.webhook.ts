import express from "express";
import { createHmac } from "crypto";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

function verifyShopifyHmac(
  req: express.Request & { rawBody?: string },
  res: express.Response,
  next: express.NextFunction
) {
  if (process.env.NODE_ENV === "development") {
    console.log("⚠️ Skipping HMAC check in development mode");
    return next();
  }

  const hmac = req.headers["x-shopify-hmac-sha256"] as string;
  const body = req.rawBody || "";

  const generatedHmac = createHmac("sha256", process.env.SHOPIFY_API_SECRET!)
    .update(body, "utf8")
    .digest("base64");

  if (generatedHmac !== hmac) {
    return res.status(401).send("Unauthorized");
  }
  next();
}



router.post(
  "/webhook/products/create",
  express.json({ type: "*/*", verify: (req: any, _res, buf) => (req.rawBody = buf.toString()) }),
  verifyShopifyHmac,
  async (req, res) => {
    console.log("📦 Product Created:", req.body);
    res.status(200).send("Webhook received");
  }
);

router.post(
  "/webhook/products/update",
  express.json({ type: "*/*", verify: (req: any, _res, buf) => (req.rawBody = buf.toString()) }),
  verifyShopifyHmac,
  async (req, res) => {
    console.log("🔄 Product Updated:", req.body);
    res.status(200).send("Webhook received");
  }
);

router.post(
  "/webhook/products/delete",
  express.json({ type: "*/*", verify: (req: any, _res, buf) => (req.rawBody = buf.toString()) }),
  verifyShopifyHmac,
  async (req, res) => {
    console.log("❌ Product Deleted:", req.body);
    res.status(200).send("Webhook received");
  }
);

export default router;
