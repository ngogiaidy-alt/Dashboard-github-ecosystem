import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';

const router = Router();

router.post('/github/exchange', async (req: Request, res: Response) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'Thiếu mã code xác thực' });

    try {
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            })
        });
        const tokenData: any = await tokenResponse.json();
        
        if (tokenData.error) {
            return res.status(400).json({ error: tokenData.error_description });
        }

        return res.json({ access_token: tokenData.access_token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Lỗi xác thực GitHub OAuth' });
    }
});

export default router;
