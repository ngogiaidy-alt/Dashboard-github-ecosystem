import React, { useState, useEffect } from 'react';

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('github_token'));
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code && !token) {
      fetch('http://localhost:4000/api/v1/auth/github/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
      .then(res => res.json())
      .then(data => {
        if (data.access_token) {
          localStorage.setItem('github_token', data.access_token);
          setToken(data.access_token);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:4000/api/v1/repos/list', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRepos(data);
      });
    }
  }, [token]);

  const loginWithGitHub = () => {
    const clientId = "YOUR_GITHUB_CLIENT_ID";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`;
  };

  const triggerDeploy = (repoName: string, cloneUrl: string) => {
    fetch('http://localhost:4000/api/v1/repos/deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoName, cloneUrl })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', background: '#0e1116', color: '#fff', minHeight: '100vh' }}>
      <h1>Dashboard Ecosystem & GitHub Integration</h1>
      {!token ? (
        <button onClick={loginWithGitHub} style={{ padding: '10px 20px', background: '#238636', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Đăng nhập với GitHub
        </button>
      ) : (
        <div>
          <h3>Danh sách Kho lưu trữ (Repositories)</h3>
          <ul>
            {repos.map(repo => (
              <li key={repo.id} style={{ margin: '10px 0', display: 'flex', justifyContent: 'space-between', width: '500px' }}>
                <span>{repo.full_name}</span>
                <button onClick={() => triggerDeploy(repo.full_name, repo.clone_url)} style={{ background: '#1f6feb', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                  Deploy Pipeline
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
