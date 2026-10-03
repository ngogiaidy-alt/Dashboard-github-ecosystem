from github_worker.git_cloner import clone_repository
from github_worker.builder import run_build_pipeline

def process_task(task_obj):
    task_name = task_obj.get('task')
    payload = task_obj.get('payload', {})
    
    if task_name == 'git_build':
        repo_name = payload.get('repoName')
        clone_url = payload.get('cloneUrl')
        
        print(f"[*] Bắt đầu xử lý kho: {repo_name}")
        target_dir = clone_repository(clone_url, repo_name)
        if target_dir:
            run_build_pipeline(target_dir)
