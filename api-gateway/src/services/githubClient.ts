import fetch from 'node-fetch';

export async function fetchGitHubUserRepos(accessToken: string) {
    const response = await fetch('https://api.github.com/user/repos', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'User-Agent': 'Dashboard-App',
            'Accept': 'application/vnd.github+json'
        }
    });
    if (!response.ok) {
        throw new Error('Không thể truy vấn danh sách repository từ GitHub API');
    }
    return await response.json();
}
