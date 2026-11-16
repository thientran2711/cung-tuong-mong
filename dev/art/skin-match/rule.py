"""rule.py — when and how much to shift a region (shared by fix/fixrun/select; no MediaPipe import)."""
import numpy as np

CAP_A = 7.0; B_LO, B_HI = -2.0, 4.0
TRIG_A = 2.5   # owner's complaint = face ROSIER than neck/hands: a region is fixed only when its a* excess >= 2.5 (≈ 2 natural IQRs)

def shift_for(st, base, region, min_n=120):
    """(da, db) to add to that region, or (0, 0). Skips regions whose 'skin' is implausible (clothes picked up by the model)."""
    if st.get(region + "_n", 0) < min_n or "face_a" not in st or (region + "_a") not in st: return 0.0, 0.0
    ra, rb = st[region + "_a"], st[region + "_b"]
    if not (2 <= ra <= 18 and 4 <= rb <= 26) or abs(ra - st["face_a"]) > 9 or abs(rb - st["face_b"]) > 9: return 0.0, 0.0
    da = (st["face_a"] - ra) - base[region][0]
    db = (st["face_b"] - rb) - base[region][1]
    if da < TRIG_A: return 0.0, 0.0
    return float(min(da, CAP_A)), float(np.clip(db, B_LO, B_HI))

