from flask import Flask, request, jsonify
from flask_cors import CORS


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    @app.route('/health', methods=['GET'])
    def health() -> tuple:
        return jsonify({"status": "ok"}), 200

    @app.route('/generate', methods=['POST'])
    def generate() -> tuple:
        try:
            data = request.get_json(force=True, silent=False) or {}
            link = data.get('link')
            is_reddit_thread = bool(data.get('is_reddit_thread'))

            if not link or not isinstance(link, str):
                return jsonify({"error": "Missing or invalid 'link'"}), 400

            # Placeholder: implement your generation logic here
            # For now, return a mocked URL so the UI can proceed
            mock_url = f"https://example.com/video.mp4?source={'reddit' if is_reddit_thread else 'wiki'}"
            return jsonify({"video_url": mock_url}), 200
        except Exception as exc:  # Avoid leaking stack traces to clients
            return jsonify({"error": str(exc)}), 500

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='127.0.0.1', port=5000)


