<<<<<<< HEAD
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import loginRoute from "./routes/login.route";
import itemsRoute from "./routes/items.route";
import shopifyAuthRoute from "./routes/shopify.auth";
import shopifyWebhookRoute from "./routes/shopify.webhook";
=======
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import loginRoute from './routes/login.route';
import itemsRoute from './routes/items.route';
>>>>>>> f124b32cb5236f3ce1810c59d099dfb75ea0fb1d

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

<<<<<<< HEAD
app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/v1", loginRoute);
app.use("/api/v1", itemsRoute);
app.use("/api/v1", shopifyAuthRoute);
app.use("/api/v1", shopifyWebhookRoute);
=======

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per window
  message: {
    error: 'Too many login attempts. Please try again later.'
  }
});

app.get('/health', (_req, res) => res.json({ ok: true }));


app.use('/api/v1/login', loginLimiter);
app.use('/api/v1', loginRoute);
app.use('/api/v1', itemsRoute);
>>>>>>> f124b32cb5236f3ce1810c59d099dfb75ea0fb1d

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
