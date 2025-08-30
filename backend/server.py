from flask import Flask, request, jsonify, render_template, send_from_directory
from main import main
from qr import generate_qr
import os
import threading
import uuid
from typing import Dict

app = Flask(__name__)
server_url = os.getenv('SERVER_URL')

# Simple in-memory job store (process-local). For production, replace with Redis/Celery.
jobs: Dict[str, Dict] = {}
jobs_lock = threading.Lock()

@app.route('/')
def index():
    return render_template('web.html')

def _run_job(job_id: str, link: str, asset: str) -> None:
    try:
        with jobs_lock:
            jobs[job_id]['status'] = 'running'

        speaker_wav = f"assets/{asset}.mp3"
        main(link, speaker_wav=speaker_wav)

        video_filename = 'final.mp4'
        video_path = os.path.join('final', video_filename)
        base = 'http://127.0.0.1:5000'
        if os.path.exists(video_path):
            qr_png = generate_qr(f"{base}/final/{video_filename}")
            result = {
                'status': 'done',
                'video_url': f"http://127.0.0.1:5000/final/{video_filename}",
            }
            if qr_png:
                result['qr_url'] = f"/final/{os.path.basename(qr_png)}"
            with jobs_lock:
                jobs[job_id].update(result)
        else:
            with jobs_lock:
                jobs[job_id]['status'] = 'error'
                jobs[job_id]['error'] = 'Video generation failed'
    except Exception as exc:
        with jobs_lock:
            jobs[job_id]['status'] = 'error'
            jobs[job_id]['error'] = str(exc)


@app.route('/generate', methods=['POST'])
def generate():
    print("Received request at /generate")
    data = request.get_json()
    link = data['link']
    asset = str(data.get('asset', 'trump')).lower()
    allowed_assets = {"griffin", "lebron", "spongebob", "trump"}
    if asset not in allowed_assets:
        return jsonify({'error': f"Invalid asset '{asset}'. Allowed: {sorted(allowed_assets)}"}), 400

    job_id = uuid.uuid4().hex
    with jobs_lock:
        jobs[job_id] = {'status': 'queued'}

    t = threading.Thread(target=_run_job, args=(job_id, link, asset), daemon=True)
    t.start()

    return jsonify({
        'job_id': job_id,
        'status_url': f"/generate/{job_id}",
        'status': 'queued'
    }), 202


@app.route('/generate/<job_id>', methods=['GET'])
def job_status(job_id: str):
    with jobs_lock:
        job = jobs.get(job_id)
    if not job:
        return jsonify({'error': 'job not found'}), 404
    return jsonify(job)

@app.route('/final/<path:filename>')
def serve_video(filename):
    return send_from_directory('final', filename)

if __name__ == "__main__":
    # Disable debug autoreload to avoid re-initializing heavy models twice
    app.run(host='127.0.0.1', port=5000, debug=False, use_reloader=False)