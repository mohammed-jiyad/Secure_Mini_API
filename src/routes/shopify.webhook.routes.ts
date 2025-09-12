import express from "express";
import { productCreated, productUpdated, productDeleted } from "../controllers";
import { verifyShopifyHmac } from "../middleware";

const router = express.Router();

router.post(
  "/webhook/products/create",
  express.json({ type: "*/*", verify: (req: any, _res, buf) => (req.rawBody = buf.toString()) }),
  verifyShopifyHmac,
  productCreated
);

router.post(
  "/webhook/products/update",
  express.json({ type: "*/*", verify: (req: any, _res, buf) => (req.rawBody = buf.toString()) }),
  verifyShopifyHmac,
  productUpdated
);

router.post(
  "/webhook/products/delete",
  express.json({ type: "*/*", verify: (req: any, _res, buf) => (req.rawBody = buf.toString()) }),
  verifyShopifyHmac,
  productDeleted
);

export default router;
