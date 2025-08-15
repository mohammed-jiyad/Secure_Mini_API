import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import loginRoute from './routes/login.route';
import itemsRoute from './routes/items.route';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


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

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
