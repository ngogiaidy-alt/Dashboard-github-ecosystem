import asyncio

async def monitor_live_streams():
    tabs = [f"https://oklive.co/room/{i}" for i in range(1, 21)]
    print(f"[*] Đang khởi tạo giám sát cho {len(tabs)} luồng trực tiếp đồng thời.")
