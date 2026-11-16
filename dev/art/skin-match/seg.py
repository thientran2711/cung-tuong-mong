# seg.py — MediaPipe selfie-multiclass skin segmentation for transparent full-body figures (skin-match, owner 15/11 20:15Z)
# classes: 0 bg, 1 hair, 2 body-skin, 3 face-skin, 4 clothes, 5 others. Runs on overlapping square tiles of the figure (the model
# is 256x256 and selfie-trained), returns per-pixel class probabilities for face-skin and body-skin at image resolution.
import os, numpy as np, cv2
import mediapipe as mp
from mediapipe.tasks.python import vision, BaseOptions
_MODEL = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", ".ahcache", "sm", "mc.tflite")
_seg = None
def _get():
    global _seg
    if _seg is None:
        o = vision.ImageSegmenterOptions(base_options=BaseOptions(model_asset_path=os.path.abspath(_MODEL)), output_confidence_masks=True)
        _seg = vision.ImageSegmenter.create_from_options(o)
    return _seg
def comp(im, bg=(195, 213, 230)):
    a = im[..., 3:].astype(np.float32) / 255
    return (im[..., :3] * a + np.array(bg, np.float32) * (1 - a)).astype(np.uint8)
def probs(im, full=False, maxt=9):
    """im BGRA. returns P[H,W,6] averaged over square tiles of side = figure width (each fed at 256 px): y = 0, 0.7s, 1.4s, ...
    while the tile starts above 70 % of the height (face, neck, hands and forearms live there; skirts below are not needed).
    Pixels no tile covers get P = 0 (background)."""
    H, W = im.shape[:2]; c = cv2.cvtColor(comp(im), cv2.COLOR_BGR2RGB)
    acc = np.zeros((H, W, 6), np.float32); n = np.zeros((H, W, 1), np.float32)
    s = int(min(W, H))
    if H >= W:
        ys = [0]; 
        while len(ys) < maxt and ys[-1] + int(0.7 * s) + s <= H and ys[-1] + int(0.7 * s) < (H if full else 0.7 * H): ys.append(ys[-1] + int(0.7 * s))
        boxes = [(0, y) for y in ys]
    else:
        boxes = [(x, 0) for x in sorted(set(list(range(0, W - s + 1, max(1, int(0.7 * s)))) + [W - s]))]
    for (x, y) in boxes:
        t = cv2.resize(c[y:y + s, x:x + s], (256, 256), interpolation=cv2.INTER_AREA)
        r = _get().segment(mp.Image(image_format=mp.ImageFormat.SRGB, data=np.ascontiguousarray(t)))
        m = np.dstack([cv2.resize(cm.numpy_view(), (s, s), interpolation=cv2.INTER_LINEAR) for cm in r.confidence_masks])
        acc[y:y + s, x:x + s] += m; n[y:y + s, x:x + s] += 1
    return acc / np.maximum(n, 1)

def probs_quick(im):
    """audit mode: ONE inference on a square of side 0.6*H at the top centre (face, neck, hands, forearms); rest P = 0"""
    H, W = im.shape[:2]; s = int(0.6 * H); x0 = (W - s) // 2
    c = cv2.cvtColor(comp(im), cv2.COLOR_BGR2RGB); pad = np.full((s, s, 3), (230, 213, 195), np.uint8)
    xa, xb = max(0, x0), min(W, x0 + s); pad[:, xa - x0:xb - x0] = c[:s, xa:xb]
    r = _get().segment(mp.Image(image_format=mp.ImageFormat.SRGB, data=np.ascontiguousarray(cv2.resize(pad, (256, 256), interpolation=cv2.INTER_AREA))))
    m = np.dstack([cv2.resize(cm.numpy_view(), (s, s), interpolation=cv2.INTER_LINEAR) for cm in r.confidence_masks])
    P = np.zeros((H, W, 6), np.float32); P[:s, xa:xb] = m[:, xa - x0:xb - x0]; return P
