import difflib, re, sys, os
R = "/home/user/cung-tuong-mong/"; S = sys.argv[1]
PAIRS = [("thu t5", "dev/art/rank8-s62/s62_t5.txt", "dev/art/thu_comoi/s62_t5_THU_fix_L1803s.txt"),
         ("thu t6", "dev/art/rank8-s62/s62_t6.txt", "dev/art/thu_comoi/s62_t6_THU_fix_L1803s.txt"),
         ("winter t5", "dev/art/winter1/s62_t5_dong.txt", "dev/art/winter1/s62_t5_dong_L1825.txt"),
         ("winter t6", "dev/art/winter1/s62_t6_dong.txt", "dev/art/winter1/s62_t6_dong_L1825.txt"),
         ("xuân t5", "dev/art/swap56/base/s62_t5_XUAN_COMOI.txt", "dev/art/seasons4/s62_t5_XUAN_COMOI_L1803s.txt"),
         ("xuân t6", "dev/art/swap56/base/s62_t6_XUAN_COMOI.txt", "dev/art/seasons4/s62_t6_XUAN_COMOI_L1803s.txt"),
         ("builder t5", "dev/art/swap56/base/s62_t5.txt", S + "/build_t5.txt"),
         ("builder t6", "dev/art/swap56/base/s62_t6.txt", S + "/build_t6.txt")]
def chain(f):
    out = []; c = f
    for _ in range(20):
        k = c + ".keep"
        if not os.path.exists(k): break
        L = open(k).read().splitlines(); b = [l for l in L if l.startswith("base:")]
        out += [(l[6:].split("   #")[0].strip(), l.split("#", 1)[1].strip() if "#" in l else "") for l in L if l.startswith("allow:")]
        if not b: break
        c = R + b[0][5:].strip() if not b[0][5:].strip().startswith("/") else b[0][5:].strip()
    return out
def sents(t): return [s.strip() for s in re.split(r"(?<=[.;:])\s+", t.replace("\n", " ")) if s.strip()]
for name, a, b in PAIRS:
    A = sents(open(R + a if not a.startswith("/") else a).read()); B = sents(open(R + b if not b.startswith("/") else b).read())
    al = chain(R + b if not b.startswith("/") else b)
    print(f"\n#### {name}: {a} -> {b.replace(S,'(build_all)')}")
    sm = difflib.SequenceMatcher(None, A, B, autojunk=False)
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op == "equal": continue
        x = " ".join(A[i1:i2]); y = " ".join(B[j1:j2])
        wa, wb = x.split(), y.split(); lost, add = [], []
        for o, p1, p2, q1, q2 in difflib.SequenceMatcher(None, wa, wb, autojunk=False).get_opcodes():
            if o in ("delete", "replace"): lost.append(" ".join(wa[p1:p2]))
            if o in ("insert", "replace"): add.append(" ".join(wb[q1:q2]))
        why = sorted({r for ph, r in al if any(ph[:25] in l or l[:25] in ph for l in lost if len(l) > 8)})
        print(f"- [{(x or y)[:60]}] LOST: {' | '.join(lost)[:600]} || ADDED: {' | '.join(add)[:600]} || KEEP-WHY: {'; '.join(why)[:300]}")
