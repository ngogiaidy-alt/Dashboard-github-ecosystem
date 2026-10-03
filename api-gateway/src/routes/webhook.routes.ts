import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { pushTaskToQueue } from '../services/queueProducer.js';

const router = Router();
const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || 'secret';

router.post('/github', async (req: Request, res: Response) => {
    const signature = req.headers['x-hub-signature-256'] as string;
    const payloadStr = JSON.stringify(req.body);

    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    const digest = `sha256=${hmac.update(payloadStr).digest('hex')}`;

    if (signature !== digest) {
        return res.status(401).send('Chữ ký Webhook không hợp lệ');
    }

    const event = req.headers['x-github-event'];
    if (event === 'push') {
        const repoName = req.body.repository?.full_name;
        const cloneUrl = req.body.repository?.clone_url;
        await pushTaskToQueue('git_build', { repoName, cloneUrl });
    }

    return res.status(200).send({ status: 'Webhook nhận thành công' });
});

export default router;
