import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import repoRoutes from './routes/repo.routes.js';
import webhookRoutes from './routes/webhook.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/repos', repoRoutes);
app.use('/api/v1/webhook', webhookRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`[API Gateway] Đang chạy trên cổng ${PORT}`);
});
