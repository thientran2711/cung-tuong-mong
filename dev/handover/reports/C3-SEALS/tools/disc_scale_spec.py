#!/usr/bin/env python3
"""ACT-SEAL DISC SCALE SPEC — the ONE shared fixed rule for the medallion (disc) size of every animated seal
(owner L2381 22/11, verbatim: "... ví dụ như mà 5 cái ấn mà nó cùng hoạt động thì nó phải cùng một cái kích thước phóng ra,
ví dụ như là phóng to ra bao nhiêu phần trăm đó thì dừng ở ngay mức đó rồi mới bắt đầu ..."). Rule A58 (rule.py find disc scale).
Every worker uses THIS file (import it); never pick your own numbers. Lean-out of the body is NOT governed here (keep it).

  canvas      288 x 288 RGBA webp, 15 fps (67 ms per frame)
  rest        disc radius R0 = 74 px, disc centre C0 = (144, 144) — identical for every seal, every first OUT frame,
              every last BACK frame
  OUT         disc grows from 100 % to PEAK = 112 % of R0 over the first RAMP = 15 frames (1.0 s), ease = smoothstep
              (3t^2 - 2t^3, t = i/(RAMP-1)); from frame 15 to the end of OUT it stays at exactly 112 %
  LOOP        exactly 112 % on every frame (first frame = last frame size)
  BACK        exactly 112 % until the last RAMP frames, then shrinks 112 % -> 100 % on the SAME smoothstep (mirror of OUT);
              last frame = rest (100 %)
  OUT length  every seal's OUT has exactly OUT_N = 60 frames (4.0 s): shorter → hold the end (lean) pose at the end,
              longer → drop frames evenly (ROOT-C5 22/11)
  BACK length every seal's BACK has exactly BACK_N = 45 frames (3.0 s) — the body return is fitted to this length: shorter → hold the
              lean pose at the start, longer → drop frames evenly (no blended frames: they ghost) (ROOT-C5 22/11 from owner L2381 "same timing for all"); LOOP = 61 frames as cut
  encode      animated webp lossy quality 50, method 4 (≈ the old file size)
  centre      the disc centre stays at C0 on every frame (no drift, no jump)
  tolerance   measured disc r / R0 per frame: rest 1.00, peak 1.12, LOOP min/max 1.12 +- 0.01

Applied as a per-frame post-process (0 credits): measure the disc circle on each frame (THACT5_tools/disc.py track), then scale the
WHOLE frame about the measured disc centre by R0*scale(i)/r_i and move that centre to C0 (body lean stays exactly as drawn).
Tool: dev/handover/reports/THACT5_tools/apply.py.   python3 disc_scale_spec.py  -> prints the per-frame scale table.
"""
W = H = 288
FPS = 15
R0 = 74.0
C0 = (144.0, 144.0)
PEAK = 1.12
RAMP = 15
OUT_N = 60
BACK_N = 45
WEBP_Q, WEBP_M = 50, 4

def ease(t):
    t = min(max(t, 0.0), 1.0); return t * t * (3 - 2 * t)

def scale(part, i, n):
    """disc scale (x R0) for frame i of a part with n frames; part in 'out' | 'loop' | 'back'."""
    if part == 'out':
        return 1.0 + (PEAK - 1.0) * ease(i / (RAMP - 1))
    if part == 'loop':
        return PEAK
    if part == 'back':
        j = i - (n - RAMP)
        return PEAK if j < 0 else PEAK - (PEAK - 1.0) * ease(j / (RAMP - 1))
    raise ValueError(part)

if __name__ == '__main__':
    print('OUT ', ' '.join(f'{scale("out", i, 58):.3f}' for i in range(RAMP + 1)), '... 1.120')
    print('BACK ... ', ' '.join(f'{scale("back", i, 50):.3f}' for i in range(50 - RAMP - 1, 50)))
