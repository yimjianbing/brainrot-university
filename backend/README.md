# Backend (Flask)

## Quickstart

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Server runs on http://127.0.0.1:5000

Routes:
- GET /health -> {"status":"ok"}
- POST /generate -> {"video_url": "..."}


