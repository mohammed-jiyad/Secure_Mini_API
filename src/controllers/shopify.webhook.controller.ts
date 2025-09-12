import { Request, Response } from "express";

export async function productCreated(req: Request, res: Response) {
  console.log("🟢 Product Created:", req.body);
  res.status(200).send("Webhook received");
}

export async function productUpdated(req: Request, res: Response) {
  console.log("🟡 Product Updated:", req.body);
  res.status(200).send("Webhook received");
}

export async function productDeleted(req: Request, res: Response) {
  console.log("🔴 Product Deleted:", req.body);
  res.status(200).send("Webhook received");
}
