# BrainRot University

## Problem statement 
In this modern era, many Gen-Z face the issue of spending too much time watching pointless ‘brainrot’ on social media. The endless scrolling has also led to shortening attention spans and more people needing multiple ways of stimulation to stay engaged.  Thus, we have created Brainrot University to enrich the average scrolling session by generating funny, yet educational videos in the format of those posted on popular apps like TikTok or Instagram.

We opted to approach this problem like so, because BrainRot University delivers any information a user wants in short pockets of time, with easily digestible bits of information, which weaponises the shortcomings mentioned above for learning and understanding. 

## Features 
Our app allows users to generate short TikTok-style videos from Wikipedia links. By simply pasting a Wikipedia link, users can trigger the video generation process, after which the video is created featuring content from the entered Wikipedia link explained to users in an engaging meme format.


Generate short-form “brainrot” videos from Wikipedia URLs. Frontend is a Lynx app (React-like) with Tailwind; backend is Flask with an async job flow, TTS, forced alignment, and image overlays.

## Features
- Paste a Wikipedia link; backend scrapes and condenses content
- Select an asset voice: `griffin`, `lebron`, `spongebob`, or `trump`
- Async generation (no long HTTP timeouts): returns a `job_id`, frontend polls status
- Result video served from `backend/final/final.mp4`
- QR code saved to `backend/final/final_qr.png` and returned as `qr_url`

## Project structure
```
backend/          # Flask API, generation pipeline, TTS, overlays
frontend/         # Lynx frontend (rspeedy/rsbuild)
assets/           # Voice .mp3 and overlay image folders per asset (in backend)
```

## Prerequisites
- Node.js >= 18 and npm
- Python 3.10.18
- ffmpeg (required for audio conversion)
  - macOS: `brew install ffmpeg`

## First-time setup
Install all dependencies (backend venv + frontend node_modules):

```bash
# From repo root

# Backend: create venv and install Python deps
cd backend
python3.10 -m venv .venv
source .venv/bin/activate
pip install -U pip wheel
pip install -r requirements.txt
deactivate

# Frontend: install node modules
cd ../frontend
npm install
```

Notes:
- If `python3.10` isn’t available, use your Python 3.10 path or pyenv to install 3.10.18.
- If ffmpeg is missing, install it (see Prerequisites).

### Configure environment (.env)
Create `backend/.env` with the following variables (see `backend/.env.example`):

```dotenv
# Used for short, punchy summarization of Wikipedia content (optional but recommended)
GROQ_API_KEY=your_groq_api_key_here

# Absolute base URL that clients use to reach your backend (used in QR code)
# For local dev on this machine:
SERVER_URL=http://127.0.0.1:5000
```

## Quick start (both apps)
```bash
# From repo root
./dev.sh
```
This starts:
- Backend at http://127.0.0.1:5000
- Frontend dev server (rspeedy)

If you prefer manual steps:

### Backend
```bash
type python || true
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
# Optional: set absolute server URL used in QR code
export SERVER_URL="http://127.0.0.1:5000"
# Optional: set GROQ key for better summarization
# export GROQ_API_KEY="..."
python server.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API
### Start generation (async)
POST `/generate`
```json
{
  "link": "https://en.wikipedia.org/wiki/Python_(programming_language)",
  "asset": "griffin"
}
```
- `asset` must be one of: `griffin`, `lebron`, `spongebob`, `trump`.

Response 202
```json
{
  "job_id": "<id>",
  "status_url": "/generate/<id>",
  "status": "queued"
}
```

### Poll status
GET `/generate/<job_id>`
```jsonc
// while running
{ "status": "queued" }
{ "status": "running" }

// when done
{
  "status": "done",
  "video_url": "/final/final.mp4",
  "qr_url": "/final/final_qr.png"
}

// on error
{ "status": "error", "error": "..." }
```

### Static files
- GET `/final/<filename>` serves files from `backend/final/` (e.g., `final.mp4`, `final_qr.png`).

## Frontend integration
- The app posts to `/generate` with `asset`, receives `{ job_id, status_url }`, then polls every ~2s until status is `done`. It then renders the video and QR code.

## Configuration
- `SERVER_URL` (backend): absolute base used when building QR URL; default falls back to request host.
- `GROQ_API_KEY` (backend, optional): enables short, punchy summarization via Groq; without it the text is truncated.
- `TTS_HOME` (optional): set a stable TTS model cache path if needed, e.g. `~/.cache/tts`.

## Assets and overlays
- Voices are `.mp3` files in `backend/assets/`.
- Overlays are images in per-asset folders: `backend/assets/<asset>/`.
- The selected `asset` controls both voice (`assets/<asset>.mp3`) and overlay folder (`assets/<asset>/`).

## Troubleshooting
- 499/timeout on `/generate`: now mitigated by async job flow. Ensure you’re polling `/generate/<job_id>` until `done`.
- `ModuleNotFoundError: requests`: activate the backend venv and `pip install -r backend/requirements.txt`.
- TTS model re-downloads: use a stable `TTS_HOME` and avoid auto-reloader (`server.py` disables it). Models are cached after first load.
- ffmpeg not found: install `ffmpeg` and re-run.
- File committed by accident (e.g., `backend/final/final.mp4`): it’s ignored by `.gitignore`. If already pushed, remove with `git rm --cached` and commit.

## Scripts
- `./dev.sh` – start backend and frontend together; cleans up on exit.
- Frontend: `npm run dev`, `npm run build`
- Backend: `python server.py`

## License
TBD — replace with your chosen license (e.g., MIT/Apache-2.0). If you don’t intend to publish a license, remove this section and any LICENSE file.
