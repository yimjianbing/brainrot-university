from flask import Flask, request, jsonify, render_template, send_from_directory
from main import main
import os

app = Flask(__name__)
server_url = os.getenv('SERVER_URL')

@app.route('/')
def index():
    return render_template('web.html')

@app.route('/generate', methods=['POST'])
def generate():
    print("Received request at /generate")  # Debugging statement
    data = request.get_json()
    link = data['link']
    print(f"Link: {link}")  # Debugging statement

    video_filename = 'final.mp4'
    video_path = os.path.join('final', video_filename)
    qr_png = generate_qr(f'{server_url}/final/{video_filename}')
    if os.path.exists(video_path):
        print("Video generation successful")  # Debugging statement
        return jsonify({'video_url': f'{server_url}/final/{video_filename}', 'qr_url': f'{server_url}/final/{qr_png}'})
    else:
        print("Video generation failed")  # Debugging statement
        return jsonify({'error': 'Video generation failed'}), 500

@app.route('/final/<path:filename>')
def serve_video(filename):
    return send_from_directory('final', filename)

if __name__ == "__main__":
    # Disable debug autoreload to avoid re-initializing heavy models twice
    app.run(host='127.0.0.1', port=5000, debug=False, use_reloader=False)