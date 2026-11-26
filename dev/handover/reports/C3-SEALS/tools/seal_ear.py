#!/usr/bin/env python3
"""NO PAINTED EARRINGS on seals (rule F15, owner Lượt 1037, 20/11: "... không có bỏ sót bất kỳ một người nữ nào, bất kỳ một cái bậc nào, không ai được đeo hoa tai.").
Earrings are a separate dress-up layer (dev/art/earring-test). ear(obj) walks a seal builder's output (same nesting as seal_gate.walk): for every WOMAN's seal
prompt (seal_gate: not is_male and a female word) it removes old earring words (master_common.strip_ear, the figure builders' same edit) and, in keyframes A/B,
puts master_common.EAR_SENT once right before 'Whole picture on a flat pure chroma green' (else at the end). Men / boys / objects: unchanged.
The gate (seal_gate S13) checks the result; this module only builds."""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.dirname(HERE)); sys.path.insert(0, HERE)
import master_common as _MC, seal_gate as _SG
ANCHOR = " Whole picture on a flat pure chroma green"


def female(t): return not _SG.is_male(t) and bool(_SG.FEM_RX.search(t))


def one(t, kind):
    if not isinstance(t, str) or not _SG.kind_of(kind) or not female(t): return t   # only prompt leaves (seal_gate.walk), only women
    t = _MC.strip_ear(t)
    if _SG.kind_of(kind) not in ("A", "B") or _MC.EAR_SENT in t: return t
    if ANCHOR in t: i = t.index(ANCHOR); return t[:i] + " " + _MC.EAR_SENT + t[i:]
    return t.rstrip() + " " + _MC.EAR_SENT


def ear(o, key=None):
    if isinstance(o, dict): return {k: ear(v, k) for k, v in o.items()}
    if isinstance(o, list): return [ear(v, key) for v in o]
    return one(o, key)
