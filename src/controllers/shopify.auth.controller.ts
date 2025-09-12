import { Request, Response } from "express";
import { exchangeAccessToken, fetchProducts, createWebhook } from "../services";

export async function startAuth(req: Request, res: Response) {
  const { shop } = req.query;

  if (!shop) return res.status(400).send("Missing shop parameter");

  const redirectUri = `${process.env.HOST}/api/v1/auth/callback`;
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SHOPIFY_SCOPES}&redirect_uri=${redirectUri}`;

  res.redirect(installUrl);
}

export async function authCallback(req: Request, res: Response) {
  const { code, shop } = req.query;

  if (!code || !shop) {
    return res.status(400).json({ error: "Missing code or shop" });
  }

  try {
    const token = await exchangeAccessToken(code as string, shop as string);
    const products = await fetchProducts(shop as string, token);

    await createWebhook(shop as string, token, "products/create", `${process.env.NGROK}/api/v1/webhook/products/create`);
    await createWebhook(shop as string, token, "products/update", `${process.env.NGROK}/api/v1/webhook/products/update`);
    await createWebhook(shop as string, token, "products/delete", `${process.env.NGROK}/api/v1/webhook/products/delete`);

    res.json({
      success: true,
      shop,
      token,
      products,
      message: "App installed, products fetched",
    });
  } catch (err) {
    res.status(400).json({ error: "Shopify auth failed", details: err });
  }
}
