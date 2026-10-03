import { Router, Request, Response } from 'express';
import { pushTaskToQueue } from '../services/queueProducer.js';
import { fetchGitHubUserRepos } from '../services/githubClient.js';

const router = Router();

router.get('/list', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Chưa cung cấp Token' });

    const token = authHeader.replace('Bearer ', '');
    try {
        const repos = await fetchGitHubUserRepos(token);
        return res.json(repos);
    } catch (err) {
        return res.status(500).json({ error: 'Không thể lấy danh sách kho lưu trữ' });
    }
});

router.post('/deploy', async (req: Request, res: Response) => {
    const { repoName, cloneUrl } = req.body;
    await pushTaskToQueue('git_build', { repoName, cloneUrl });
    return res.json({ status: 'SUCCESS', message: 'Đã đưa yêu cầu build vào hàng đợi' });
});

export default router;
