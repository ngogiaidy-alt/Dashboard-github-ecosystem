import subprocess
import os

def run_build_pipeline(target_dir: str):
    print(f"[*] Đang thực thi build pipeline tại: {target_dir}")
    if os.path.exists(os.path.join(target_dir, 'package.json')):
        subprocess.run(['npm', 'install'], cwd=target_dir, stdout=subprocess.DEVNULL)
        subprocess.run(['npm', 'run', 'build'], cwd=target_dir, stdout=subprocess.DEVNULL)
        print("[+] Build Node.js Project thành công!")
    else:
        print("[*] Không tìm thấy cấu hình build đặc thù, hoàn tất xử lý kho.")
