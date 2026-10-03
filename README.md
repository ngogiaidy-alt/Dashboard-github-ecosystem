# Dashboard & GitHub Ecosystem

Hệ thống quản lý tích hợp bao gồm:
1. **Frontend**: Giao diện Dashboard React 19 tương tác.
2. **API Gateway**: Xử lý xác thực OAuth GitHub, tương tác Git API và điều phối Queue.
3. **Python Engine**: Worker xử lý CI/CD background pipeline và xử lý Media chuyên sâu (ASR, Audio Ducking).
4. **Infrastructure**: PostgreSQL, Redis, Nginx và Docker Compose tối ưu.

## Hướng dẫn Khởi chạy
Chạy lệnh bên dưới tại thư mục gốc để khởi động toàn bộ hệ thống bằng Docker:
```bash
docker-compose -f infra/docker-compose.yml up -d
