#!/usr/bin/env python3
"""coverage.py -- FIGURE_GATE rule 0(g) builder COVERAGE MATRIX (W107, ROOT-36 order).

Owner (verbatim, FIGURE_GATE 0(g)): "Cái vấn đề á, là ở lượt 154 mày nói á, là thợ không được gõ câu vẽ, đều có máy soạn
lời vẽ. Nhưng mà mày chỉ làm ở mức độ tuổi 51, 65 rồi trung y rồi dáng đứng này nọ thôi. Thế còn những tuổi khác thì sao,
nó sẽ bị sót? Tại sao mày không làm cho tất cả mọi người, tất cả các cái nhóm người? Tại sao mày lại bỏ sót như vậy, đến lúc
làm ra lại sót những cái người đó nữa?"

For EVERY figure group of the game x tier x age it RUNS the builder command (dev/art/t8-prompt-B/build.py, or
dev/art/emperor-B/build.py for the Emperor) for EVERY person of the group and checks the output:
  NOCMD   no builder command/mode exists for this group/tier at all
  RUN     the command crashes (e.g. KeyError: the person has no DATA row) -> count of people
  AGE     the approved AGE_TXT[age] sentence is missing (or the builder has no text for that age)
  FRONT   FIGURE_GATE 3d2 frontal-only: the prompt still says three-quarter / 3/4
  POSE    no spec5 pose (D.3a) in the prompt (--spec5pose not applied / not available)
  POSE=   spec5 pose identical to the same person's pose at another age (pose not varied per age)
  ITEM    the held item is not from item_age.py cell(age, tier) (FIGURE_GATE 3f table) / no table row for the tier
  ITEM=   same held-item KIND as the same person at another age (3f: every age its own item)
  BG      the K3 background line ("IGNORE the style reference image's background ...") is missing
  ROYAL3  royal tier (t6+, Thái hậu, Nữ đế, triều phục 6-8) without the image-3 royal-yellow sentence
  REFS    the builder does not emit the A0 reference list (style image + own t1 + royal swatch) with the prompt
  A0      the form is not in FIGURE_GATE A0 APPROVED FORMS (sample-only; info, does not make a cell red alone)
A cell is GREEN only if every person passes every check except A0.  Usage:
  python3 dev/art/coverage.py            -> writes dev/art/BUILDER_COVERAGE.md
  python3 dev/art/coverage.py --stdout   -> prints it
Update the CMD templates below when a builder gains a mode (ty / cold / maid uniform / men / kids ...).
"""
import os, re, sys, subprocess, collections, concurrent.futures as cf
sys.dont_write_bytecode = True; os.environ["PYTHONDONTWRITEBYTECODE"] = "1"  # never touch the tracked __pycache__
HERE = os.path.dirname(os.path.abspath(__file__))
B = os.path.join(HERE, "t8-prompt-B", "build.py")
E = os.path.join(HERE, "emperor-B", "build.py")
sys.path.insert(0, os.path.join(HERE, "t8-prompt-B"))
import item_age as IA  # noqa: E402

SRC = open(B, encoding="utf-8").read()
ESRC = open(E, encoding="utf-8").read()
AGES = ["a18", "a26", "a36", "a51", "a65"]
C = ["c%02d" % n for n in range(1, 33)]
M = ["m%02d" % n for n in range(1, 53)]
W84 = C + M
N4B = ("(dignified, not bright; the royal yellow becomes a deeper antique gold)", "(dignified, not bright; the royal yellow stays the SAME soft warm antique gold as at 51, a gentle honey-gold, never ochre, never mustard, never brownish)")  # build.py N4b, approved
BGLINE = "IGNORE its background completely"  # N5d: K3_BG in build.py ("The second reference image is style only: IGNORE its background completely; ..."); --nostyle variant says "IGNORE the reference image's background"
BGLINE_NPC = "IGNORE the style reference image's background"  # build_npc.py K3 wording (W107b)
ROYAL3 = "Image 3 is only a colour reference"
HAS_REFS = bool(re.search(r"--refs|--log|REFS\s*=", SRC))  # N5c adds --log (gen ledger with refs)
HAS_REFS_E = bool(re.search(r"--refs|--log|REFS\s*=", ESRC))

def mode(tok):  # does build.py handle this state/flag at all? (unknown --state silently falls into the ngheo branch)
    return re.search(tok, SRC) is not None

# ---- groups: (group, ids, tiers, ages_for(tier), cmd(id,tier,age) -> argv list | None, item_tier(tier), a0(tier,age)) ----
def consort_cmd(i, t, a):
    ag = ["--age", a]
    if re.fullmatch(r"t[1-6]", t): return [B, i, "--low", t[1], "v0", "--spec5pose"] + ag
    if t == "t7": return [B, i, "--t7", "v0", "--head", "--spec5pose"] + ag
    if t == "t8": return [B, i, "v0", "--head", "--spec5pose"] + ag
    if t == "th": return [B, i, "--state", "thaihau", "--spec5pose"] + ag
    if t == "nude": return [B, i, "v0", "--state", "nude", "--spec5pose", "--nudeopt", "auto"] + ag
    if t in ("kc", "ngheo"): return [B, i, "--state", t, "--spec5pose"] + ag
    if re.fullmatch(r"ty[1-8]", t): return [B, i, "--state", t, "--spec5pose"] + ag if mode(r'["\']ty') else None
    if t == "cold": return [B, i, "--state", "cold", "--spec5pose"] + ag if mode(r'["\']cold["\']') else None
    if re.fullmatch(r"tm[0-4]", t): return [B, i, "--state", t, "--spec5pose"] + ag if mode(r'["\']tm') else None
    if re.fullmatch(r"tr[1-8]", t): return [B, i, "--trieu", t[2], "v0"] + ag
    return None

ITEMT = {**{"t%d" % n: "t%d" % n for n in range(1, 9)}, **{"tm%d" % n: "tm%d" % n for n in range(5)}, "th": "thaihau", "nude": "nude", "kc": "kc", "ngheo": "ngheo", "cold": "lanh", **{"ty%d" % n: "t%d" % n for n in range(1, 9)}}  # N5d: trung y tN holds the rank-N item cell (item_age.py)
A0_OK = {"t1", "t4", "t5", "t6", "t7", "t8", "th", "nude", "kc", "ngheo"}  # FIGURE_GATE A0 APPROVED FORMS rows (t5 = old Phi; redesign rejected)
def a0_consort(t, a):
    if t == "th": return a in ("a36", "a51", "a65")
    return t in A0_OK
TIERS_W = ["t%d" % n for n in range(1, 9)] + ["th", "nude", "kc", "ngheo"] + ["tm%d" % n for n in range(5)] + ["ty%d" % n for n in range(1, 9)] + ["cold"] + ["tr%d" % n for n in range(1, 9)]
TNAME = {"th": "Thái hậu", "nude": "Nữ đế", "kc": "khuê các", "ngheo": "nhà nghèo", "cold": "lãnh cung", **{"tm%d" % n: "cung nữ tm%d" % n for n in range(5)},
         **{"ty%d" % n: "trung y ty%d" % n for n in range(1, 9)}, **{"tr%d" % n: "triều phục %d" % n for n in range(1, 9)}}
def ages_w(t):
    if t in ("kc", "ngheo"): return IA.TIER_AGES[t]
    if t == "th": return IA.TIER_AGES["thaihau"]
    if t in ("tm0",): return ["a18", "a26", "a36"]  # art-matrix §2: no Tân Giả khố at 51+
    return AGES

def fp_cmd(i, t, a):  # foreign princesses: build.py has ONE generic face per country (PDATA nc/bd), ranks 1 and 6 only;
    # --spec5pose crashes for them (SPEC5_IDS has no nc/bd -> KeyError), so it is not passed (POSE shows red instead of RUN)
    k = i[:2]
    if k == "bd" and t == "t6": return [B, "bd", "--bdq", "1", "--age", a]  # A0: Bắc Địch Quý phi DESIGN (build_bdq)
    if t in ("t1", "t6"): return [B, k, "--state", k + t[1], "--age", a]
    return None
FP_IDS = ["nc1", "nc2", "nc3", "bd1", "bd2", "bd3"]
FP_TIERS = ["pre"] + ["t%d" % n for n in range(1, 9)] + ["th", "nude"] + ["ty%d" % n for n in range(1, 9)] + ["cold"]

def emp_cmd(i, t, a): return [E, i, "--age", a]
EMP_IDS = ["live1", "live2", "e1", "e2", "e3", "e4"]

NOBUILDER = [  # (group, n people, tiers, ages, note) -- no builder at all today (build_npc.py NOSRC ids are listed by npc_groups())
    ("Player look1-4 (legacy, superseded by the 84-face picker OD:L1448)", 4, ["t1"], AGES, "legacy, no new art planned -- listed for completeness"),
]

# ---- build_npc.py (W107b): NPC Thái hậu, eunuchs, officials, physicians, men, công tử, quý tử, children ----
import importlib.util as _ilu  # noqa: E402
_sp = _ilu.spec_from_file_location("ctm_build_npc", os.path.join(HERE, "t8-prompt-B", "build_npc.py"))
NPC = _ilu.module_from_spec(_sp); _sp.loader.exec_module(NPC)
NPC_GROUPS = [  # (group label, ids, rank or None)
    ("NPC Thái hậu h1–h3", [f"thaihau-h{n}" for n in range(1, 4)], None),
    ("Thái giám u01–u30 (base robe)", [f"eunuch-u{n:02d}" for n in range(1, 31)], None),
    *[(f"Thái giám u01–u30 rank {r}", [f"eunuch-u{n:02d}" for n in range(1, 31)], r) for r in ("r0", "r1", "r2", "r3")],
    ("Quan official-o1–o6", [f"official-o{n}" for n in range(1, 7)], None),
    ("Thái y physician-p1–p3", [f"physician-p{n}" for n in range(1, 4)], None),
    ("Thị vệ man-thive-1–4", [f"man-thive-{n}" for n in range(1, 5)], None),
    ("Thái y (romance) man-thaiy-1", ["man-thaiy-1"], None),
    ("Vương gia man-vuonggia-1–2", ["man-vuonggia-1", "man-vuonggia-2"], None),
    ("Nhạc sư / Họa sư man-nhacsu-1, man-hoasu-1", ["man-nhacsu-1", "man-hoasu-1"], None),
    ("Sứ thần man-suthan-1–2", ["man-suthan-1", "man-suthan-2"], None),
    ("Quý tử man-quytu-1–9 + Bắc Địch prince man-bacdich-1", [f"man-quytu-{n}" for n in range(1, 10)] + ["man-bacdich-1"], None),
    ("Công tử man-congtu-1–10", [f"man-congtu-{n}" for n in range(1, 11)], None),
    ("Huynh man-huynh-1–2", ["man-huynh-1", "man-huynh-2"], None),
    ("Người thương thuở nhỏ (tm96 lover)", ["lover-tm96"], None),
    ("Steward / tutor", ["steward-tgk1", "tutor-ttp1"], None),
    ("Phế phi Lý", ["fallen-ly1"], None),
    ("Mama k01–k08 (owner: = older cung nữ, build.py tm3/tm4 a36+)", [f"mama-k{n:02d}" for n in range(1, 9)], None),
    ("Hoàng tử kid-p01–p24", [f"kid-p{n:02d}" for n in range(1, 25)], None),
    ("Công chúa kid-f01–f24", [f"kid-f{n:02d}" for n in range(1, 25)], None),
]
KAGES_ALL = ["a4", "a9", "a14", "a20", "a26", "a36", "a51"]
def npc_pose(p):
    m = re.search(r" Pose: calm standing pose; (.*?)\. ", p) or re.search(r", ((?:holding|hugging|hands|with hands|one hand)[^.]*)\. Calm", p)
    return m.group(1) if m else None
def npc_check(ids, rank, ages):
    cells = {}; per = {}
    for a in ages:
        for i in ids:
            try: per[(i, a)] = NPC.prompt(i, a, rank)
            except NPC.Held as e: per[(i, a)] = e
    for a in ages:
        miss = collections.Counter(); ex1 = {}
        for i in ids:
            p = per[(i, a)]
            if isinstance(p, Exception):
                k = "NOSRC" if str(p).startswith(("NO SOURCE", "NOT HERE")) else "HELD"
                miss[k] += 1; ex1.setdefault(k, f"{i}: {p}"); continue
            agetxt = (NPC.W_AGE if NPC.gender(i) == "f" else NPC.M_AGE).get(a) if not i.startswith("kid-") else "about %s years old" % a[1:]
            if not agetxt or agetxt not in p: miss["AGE"] += 1
            if re.search(r"three-quarter|3/4", p): miss["FRONT"] += 1
            miss["POSE"] += 1   # no spec5 pose for men / NPC / kids: men pose table HELD for the owner
            pz = npc_pose(p)
            if any(not isinstance(per.get((i, b)), (Exception, type(None))) and npc_pose(per[(i, b)]) == pz for b in ages if b != a): miss["POSE="] += 1
            miss["ITEM"] += 1   # no item_age.py rows for these groups: men item table HELD for the owner
            if BGLINE_NPC not in p: miss["BG"] += 1
        cells[a] = (miss, ex1)
    return cells
def npc_section(out, red):
    out.append("\n## build_npc.py groups (W107b: NPC Thái hậu, men, children) — `dev/art/t8-prompt-B/build_npc.py <id> --age aNN [--rank rN]`\n")
    out.append("Codes as above, plus NOSRC = no old prompt exists (rule 6: never invented; owner/ROOT-36), HELD = owner decision pending "
               "(men a65 age text, purple robes vs 'men never purple'). POSE / ITEM are red for every person here: the men pose table and men item table are HELD for the owner. "
               "Refs emitter: `--refs` / `--log` YES.\n")
    for name, ids, rank in NPC_GROUPS:
        ages = KAGES_ALL if ids[0].startswith("kid-") else AGES
        cells = npc_check(ids, rank, ages)
        out.append(f"\n### {name}\n")
        out.append("| " + " | ".join(ages) + " |"); out.append("|" + "---|" * len(ages))
        row = []
        for a in ages:
            miss, ex1 = cells[a]
            if not miss: row.append("✅"); continue
            s = " ".join(f"{k}{'' if v == len(ids) else '(%d)' % v}" for k, v in sorted(miss.items()))
            row.append("❌ " + s); red.append((name, rank or "base", a, s))
            for k in ("NOSRC", "HELD"):
                if ex1.get(k): RUNERR.append((name, re.sub(r"^[a-z0-9-]+: ", "", ex1[k])))
        out.append("| " + " | ".join(row) + " |")

def run(argv):
    try:
        p = subprocess.run([sys.executable] + argv, capture_output=True, text=True, timeout=60, cwd=os.path.dirname(argv[0]))
        return (p.returncode == 0, p.stdout if p.returncode == 0 else (p.stderr.strip().splitlines() or ["?"])[-1])
    except Exception as e:
        return (False, repr(e))

ALLITEMS = sorted({IA.fill(k, t) for t in IA.TIERS for a in IA.TIER_AGES[t] for k in IA.cell_kinds(a, t)}, key=len, reverse=True)
def held(o):
    m = re.search(r" Pose: (.*?)(?: Every hairpin| Luminous|$)", o)
    seg = m.group(1) if m else o
    for it in ALLITEMS:
        if it in seg: return it, seg
    return None, seg

def check(group, people, tiers, ages_for, cmdf, itemt, a0f, agetxt, has_refs, royal):
    jobs = {}
    for t in tiers:
        for a in ages_for(t):
            for i in people:
                c = cmdf(i, t, a)
                if c: jobs[(t, a, i)] = c
    with cf.ThreadPoolExecutor(16) as ex:
        res = dict(zip(jobs, ex.map(run, jobs.values())))
    cells = {}
    for t in tiers:
        al = ages_for(t)
        per = {}  # (i,a) -> (pose-without-item, kind)
        for a in al:
            for i in people:
                r = res.get((t, a, i))
                if r and r[0]:
                    it, seg = held(r[1])
                    per[(i, a)] = ((seg.replace(it, "<ITEM>") if it else seg), IA.kind_of(it) if it else None)
        for a in al:
            miss = collections.Counter(); ex1 = {}
            cmd0 = cmdf(people[0], t, a)
            if not cmd0:
                cells[(t, a)] = (["NOCMD"], None, a0f(t, a)); continue
            for i in people:
                ok, o = res[(t, a, i)]
                if not ok:
                    miss["RUN"] += 1; ex1.setdefault("RUN", f"{i}: {o[:90]}"); continue
                if a not in agetxt or (agetxt[a] not in o and not (t == "nude" and a == "a65" and agetxt[a].replace(N4B[0], N4B[1]) in o)): miss["AGE"] += 1
                if re.search(r"three-quarter|3/4", o): miss["FRONT"] += 1
                if "--spec5pose" not in cmd0 or " Pose: calm standing pose;" in o: miss["POSE"] += 1
                pz, kd = per[(i, a)]
                if any(per.get((i, b), (None,))[0] == pz for b in al if b != a): miss["POSE="] += 1
                it, _ = held(o)
                tt = itemt(i, t)
                if not t.startswith("tr"):  # triều phục = formal pose with no held item by design
                    if not tt or tt not in IA.TIER_AGES or a not in IA.TIER_AGES[tt] or it not in IA.cell(a, tt): miss["ITEM"] += 1
                if not t.startswith("tr") and kd and any(per.get((i, b), (0, None))[1] == kd for b in al if b != a): miss["ITEM="] += 1
                if BGLINE not in o: miss["BG"] += 1
                if royal(t) and ROYAL3 not in o: miss["ROYAL3"] += 1
            if not has_refs: miss["REFS"] = len(people)
            cells[(t, a)] = (miss, ex1, a0f(t, a))
    return cells

def bt():  # import AGE_TXT of each builder without running main
    ns = {}
    for name, src in (("b", SRC), ("e", ESRC)):
        m = re.search(r"^AGE_TXT=\{.*?\}\s*$", src, re.S | re.M)
        g = {}
        exec(m.group(0), g)
        ns[name] = g["AGE_TXT"]
    return ns

RUNERR = []
def main():
    AT = bt()
    royal_w = lambda t: t in ("t6", "t7", "t8", "th", "nude") or (t.startswith("tr") and int(t[2]) >= 6)
    G = []
    G.append(("Consorts c01–c32 (32)", C, TIERS_W, ages_w, consort_cmd, lambda i, t: ITEMT.get(t), a0_consort, AT["b"], HAS_REFS, royal_w))
    G.append(("Maid faces m01–m52 (52) in every woman tier", M, TIERS_W, ages_w, consort_cmd, lambda i, t: ITEMT.get(t), a0_consort, AT["b"], HAS_REFS, royal_w))
    G.append(("Foreign princesses Nam Chiếu nc1–3 / Bắc Địch bd1–3 (6)", FP_IDS, FP_TIERS, lambda t: ["a18"] if t == "pre" else AGES, fp_cmd,
              lambda i, t: i[:2], lambda t, a: t == "t6", AT["b"], HAS_REFS, lambda t: t in ("t6", "t7", "t8", "th", "nude")))
    G.append(("Emperor (emperor-B: live1, live2, e1–e4)", EMP_IDS, ["base"], lambda t: AGES, emp_cmd, lambda i, t: None, lambda t, a: a != "a65", AT["e"], HAS_REFS_E, lambda t: False))
    out = []; red = []
    out.append("# BUILDER COVERAGE MATRIX — FIGURE_GATE rule 0(g) (generated by dev/art/coverage.py — do not edit by hand)\n")
    out.append("Owner (verbatim): \"Cái vấn đề á, là ở lượt 154 mày nói á, là thợ không được gõ câu vẽ, đều có máy soạn lời vẽ. Nhưng mà mày chỉ làm ở mức độ tuổi 51, 65 rồi trung y rồi dáng đứng này nọ thôi. Thế còn những tuổi khác thì sao, nó sẽ bị sót? Tại sao mày không làm cho tất cả mọi người, tất cả các cái nhóm người? Tại sao mày lại bỏ sót như vậy, đến lúc làm ra lại sót những cái người đó nữa?\"\n")
    out.append("Each cell RUNS the builder for every person of the group. ✅ = every person passes every check; ❌ = missing pieces (count of people failing). "
               "`*` after a cell = form not in FIGURE_GATE A0 APPROVED FORMS (sample only). Codes: see the docstring of coverage.py "
               "(NOCMD no builder mode · RUN crash · AGE no approved age text · FRONT three-quarter (3d2) · POSE no spec5 pose · POSE= same pose as another age · "
               "ITEM item not from item_age.py 3f cell · ITEM= same item kind as another age · BG no K3 background line · ROYAL3 no royal-swatch sentence · REFS builder emits no A0 refs).\n")
    out.append(f"build.py refs emitter (--log/--refs): {'YES' if HAS_REFS else 'NO'} · emperor-B refs emitter: {'YES' if HAS_REFS_E else 'NO'}\n")
    for (name, people, tiers, agesf, cmdf, itf, a0f, at, hr, ry) in G:
        cells = check(name, people, tiers, agesf, cmdf, itf, a0f, at, hr, ry)
        out.append(f"\n## {name}\n")
        if name.startswith("Foreign"): out.append("NOTE: build.py has ONE generic face per country (PDATA nc / bd), not the 3 + 3 people; ranks 1 and 6 only (+ Bắc Địch Quý phi --bdq). FACE per person = missing piece for every FP cell.\n")
        out.append("| tier | " + " | ".join(AGES) + " |")
        out.append("|---|" + "---|" * len(AGES))
        for t in tiers:
            row = []
            for a in AGES:
                if (t, a) not in cells: row.append("—"); continue
                miss, ex1, a0 = cells[(t, a)]
                star = "" if a0 else "*"
                if miss == ["NOCMD"]:
                    row.append("❌ NOCMD" + star); red.append((name, t, a, "NOCMD (no builder mode)")); continue
                if not miss: row.append("✅" + star); continue
                s = " ".join(f"{k}{'' if v == len(people) else '(%d)' % v}" for k, v in sorted(miss.items()))
                if ex1.get("RUN"): RUNERR.append((name, re.sub(r"^[a-z]+\d+: ", "", ex1["RUN"])))
                row.append("❌ " + s + star); red.append((name, t, a, s + (f" — e.g. {ex1['RUN']}" if ex1.get("RUN") else "")))
            out.append(f"| {TNAME.get(t, t)} | " + " | ".join(row) + " |")
        cmdx = [c for c in (cmdf(people[0], t, "a26") for t in tiers) if c]
        if cmdx: out.append("\nCommands (example, a26): " + " · ".join("`" + " ".join([os.path.relpath(c[0], os.path.dirname(HERE) + '/..')] + c[1:]) + "`" for c in cmdx[:4]) + (" …" if len(cmdx) > 4 else ""))
    npc_section(out, red)
    out.append("\n## Groups with NO builder at all (every cell RED: NOCMD)\n")
    out.append("| group | people | tiers | ages | note |\n|---|---|---|---|---|")
    for g, n, ts, ags, note in NOBUILDER:
        out.append(f"| {g} | {n} | {', '.join(ts)} | {', '.join(ags)} | {note} |")
        for t in ts:
            for a in ags: red.append((g, t, a, "NOCMD"))
    if RUNERR:
        out.append("\n## RUN / NOSRC / HELD reasons (first failing person per cell, deduplicated)\n")
        for g, e in sorted(set(RUNERR)): out.append(f"- {g}: `{e}`")
    # compact RED summary grouped by (group, missing pieces)
    out.append("\n## RED LIST (grouped)\n")
    agg = collections.OrderedDict()
    for g, t, a, s in red:
        key = (g, re.sub(r"\(\d+\)", "", s.split(" — ")[0]).strip())
        agg.setdefault(key, []).append(f"{t}/{a}")
    for (g, s), cl in agg.items():
        out.append(f"- **{g}** — {s}: {', '.join(cl) if len(cl) <= 14 else ', '.join(cl[:14]) + f' … (+{len(cl) - 14})'}")
    txt = "\n".join(out) + "\n"
    if "--stdout" in sys.argv: print(txt)
    else:
        open(os.path.join(HERE, "BUILDER_COVERAGE.md"), "w", encoding="utf-8").write(txt)
        print("wrote dev/art/BUILDER_COVERAGE.md;", len(red), "red cells")
if __name__ == "__main__":
    main()
