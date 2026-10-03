import time
import json
import redis
from queue_consumer.redis_listener import process_task

redis_client = redis.Redis(host='localhost', port=6379, db=0)

def main():
    print("[Python Engine] Khởi động hệ thống Worker, đang lắng nghe Redis Queue...")
    while True:
        try:
            task_data = redis_client.brpop('build_queue', timeout=5)
            if task_data:
                _, raw_value = task_data
                task_obj = json.loads(raw_value.decode('utf-8'))
                print(f"[+] Nhận task mới: {task_obj.get('task')}")
                process_task(task_obj)
        except Exception as e:
            print(f"[-] Lỗi trong vòng lặp Worker: {e}")
            time.sleep(2)

if __name__ == "__main__":
    main()
