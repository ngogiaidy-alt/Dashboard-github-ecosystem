import os
import subprocess

def clone_repository(clone_url: str, repo_name: str) -> str:
    safe_name = repo_name.replace('/', '_')
    target_dir = os.path.join('/tmp', safe_name)
    
    if os.path.exists(target_dir):
        print(f"[-] Thư mục đã tồn tại, đang thực hiện git pull...")
        subprocess.run(['git', '-C', target_dir, 'pull'], stdout=subprocess.DEVNULL)
    else:
        print(f"[-] Đang clone kho từ {clone_url}...")
        subprocess.run(['git', 'clone', clone_url, target_dir], stdout=subprocess.DEVNULL)
        
    return target_dir
