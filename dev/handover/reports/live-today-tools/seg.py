import sys, numpy as np, mediapipe as mp
from PIL import Image
from mediapipe.tasks.python import vision, BaseOptions
S = vision.ImageSegmenter.create_from_options(vision.ImageSegmenterOptions(base_options=BaseOptions(model_asset_path="/home/user/wt/selfie_mc.tflite"), output_confidence_masks=True))
def person_prob(im, frac=.35):
    """prob of NOT background on the bottom 35 % crop (square tiles), same size as im"""
    W, H = im.size; y0 = int(H * (1 - frac)); c = im.crop((0, y0, W, H))
    bg = Image.new("RGBA", c.size, (255, 255, 255, 255)); bg.alpha_composite(c); rgb = np.ascontiguousarray(np.asarray(bg.convert("RGB")))
    r = S.segment(mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb))
    p = 1 - np.squeeze(r.confidence_masks[0].numpy_view())
    out = np.zeros((H, W), float); out[y0:] = p; out[:y0] = 1; return out
if __name__ == "__main__":
    im = Image.open(sys.argv[1]).convert("RGBA"); p = person_prob(im)
    a = np.asarray(im)[..., 3]; v = (np.dstack([p * 255, (a > 0) * 120, a * 0]).clip(0, 255)).astype("uint8")
    Image.fromarray(v).crop((0, int(im.height * .65), im.width, im.height)).resize((im.width * 2, int(im.height * .35) * 2)).save(sys.argv[2])
