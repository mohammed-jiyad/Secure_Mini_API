import { Request, Response, NextFunction } from "express";
import { createHmac } from "crypto";

export function verifyShopifyHmac(
  req: Request & { rawBody?: string },
  res: Response,
  next: NextFunction
) {
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
