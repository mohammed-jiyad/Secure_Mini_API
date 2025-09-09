import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import loginRoute from "./routes/login.route";
import itemsRoute from "./routes/items.route";
import shopifyAuthRoute from "./routes/shopify.auth";
import shopifyWebhookRoute from "./routes/shopify.webhook";

const app = express();


app.use(
  express.json({
    type: "*/*", 
    verify: (req: any, _res, buf) => {
      req.rawBody = buf.toString("utf8");
    },
  })
);

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/v1", loginRoute);
app.use("/api/v1", itemsRoute);
app.use("/api/v1", shopifyAuthRoute);
app.use("/api/v1", shopifyWebhookRoute);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
