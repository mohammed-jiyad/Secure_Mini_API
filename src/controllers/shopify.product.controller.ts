import { Request, Response } from "express";
import { fetchProducts } from "../services";

export async function getProducts(req: Request, res: Response) {
  const { shop, token } = req.query;

  if (!shop || !token) {
    return res.status(400).json({ error: "Missing shop or token" });
  }

  try {
    const products = await fetchProducts(shop as string, token as string);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products", details: err });
  }
}
