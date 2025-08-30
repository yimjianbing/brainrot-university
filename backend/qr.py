import os
import qrcode

def generate_qr(url):
    os.makedirs('final', exist_ok=True)
    qr_png = os.path.join('final', 'final_qr.png')
    try:
        img = qrcode.make(url)
        img.save(qr_png)
    except Exception:
        qr_png = None
    return qr_png