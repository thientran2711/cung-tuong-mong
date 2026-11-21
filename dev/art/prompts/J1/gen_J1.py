#!/usr/bin/env python3
"""J1 ENDING + INTRO PICTURES (GE06 GE07 GE11 OR17 M48 M50 M51 M52 M84): paste-ready ChatGPT prompts (A53, no Magnific).
Data is READ from the game: grand endings from dev/build/jgecat.js + jgedata*.js (via node), rare endings from dev/RARE_ENDINGS.md + jrd_*.js,
end types / overlay keys from jend.js, learn subjects from j1.js ARTS + j85.js VIR, newday keys from jne.js, intro keys from joi.js.
Hand-written scene sentences live in j1_data.py. Run from anywhere: python3 dev/art/prompts/J1/gen_J1.py"""
import sys, os, re, json, glob, subprocess, collections
JD = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(JD, "..")); sys.path.insert(0, JD)
from _lib import *
from _lib import MC
import j1_data as D
HERE = JD
ROOT = os.path.abspath(os.path.join(JD, "..", "..", "..", ".."))
B = os.path.join(ROOT, "dev", "build")
rd = lambda p: open(os.path.join(ROOT, p), encoding="utf-8").read()
OUT = HERE
H = "/home/user/wt/h"      # handover worktree (read only)
ROWS = []                  # INDEX rows
SKIP = []
def mcl(start):
    for l in MC:
        if l.startswith(start): return l.strip()
    raise SystemExit("MC line missing " + start)
TAKE_SKIN = mcl("From the reference image take ONLY the drawing style and the skin colour")
FACE_LINE = mcl("The whole face clearly visible")
FOREHEAD = mcl("Bare clean forehead")
S_NOQING = "No Qing-dynasty look anywhere: no queue hairstyle, no stiff board headdress, no cheongsam collar (rule F14)."
NECK = "No necklace and no pendant on anyone; nothing worn around any neck."
ONEITEM = "Any figure holds nothing, or EXACTLY ONE object, really gripped."
cnt = collections.Counter()
def code(key):
    cnt[key] += 1
    return "AJ1-%s-%03d" % (key, cnt[key])
def row(cd, key, rel, refs, target, read, note=""):
    ROWS.append((cd, key, rel, refs, target, read, note))
def W(sub, name, parts, cd):
    return write_prompt(os.path.join(OUT, sub), name, parts, cd)
def txt(x):  # strip game tokens like {kha}
    return re.sub(r"\{\w+\}", "…", x or "").strip()
AK = set(r[0] for r in json.load(open(os.path.join(ROOT, "assets.json")))["files"])

# =============== GE06 : grand-ending scenes (176 endings x 2 shadings) + 1 fail picture ===============
node = subprocess.run(["node", "-e", r'''
const vm=require("vm"),fs=require("fs");const dir=process.argv[1];let code="";
for(const f of ["jgecat.js","jgedata.js","jgedata_bd.js","jgedata_pt.js","jgedata_w1.js","jgedata_w2.js","jgedata_w3.js"])code+=fs.readFileSync(dir+"/"+f,"utf8")+"\n";
code+="\nthis.OUT={GE_CAT,GE_DATA};";const c={};vm.createContext(c);vm.runInContext(code,c);const {GE_CAT,GE_DATA}=c.OUT;const o={};
for(const b in GE_CAT)o[b]={n:GE_CAT[b].n,e:GE_CAT[b].e.map((e,i)=>{const d=(GE_DATA[b]&&GE_DATA[b].e&&GE_DATA[b].e[i])||{};return{node:e[0],nat:e[2],sum:e[5],tt:e[6],ta:e[7],t:d.t||"",a:d.a||""}})};
process.stdout.write(JSON.stringify(o));''', B], capture_output=True, text=True, check=True)
GE = json.loads(node.stdout)
# designer scene notes (dev/design/GRAND_ENDINGS.md, handover branch) for the endings that have one
DNOTE = {}; pilot_b = set()
try:
    cb = cg = None
    for l in open(os.path.join(H, "dev/design/GRAND_ENDINGS.md"), encoding="utf-8"):
        m = re.match(r"### 4\.\d `(\w+)`", l)
        if m: cb = m.group(1); pilot_b.add(cb)
        m = re.match(r"\*\*ge(\d) ·", l)
        if m: cg = int(m.group(1))
        m = re.match(r"- Scene: (.*)", l)
        if m and cb and cg: DNOTE[(cb, cg)] = m.group(1).strip().rstrip(".")
except Exception as ex: print("design doc not read:", ex)
rank = collections.Counter(); ordered = []
for b in GE:
    for i, e in enumerate(GE[b]["e"]): ordered.append((e["sum"], b, i))
ordered.sort(key=lambda x: (x[0], x[1], x[2]))
gi = 0
for sm, b, i in ordered:
    e = GE[b]["e"][i]; V = D.SUMMIT[sm]; r = rank[sm]; rank[sm] += 1
    scene = V[r % len(V)]; comp = D.COMP[gi % 12]; cue = D.ROADCUE[b.split("_")[0]]
    note = DNOTE.get((b, i + 1)); gi += 1
    n = i + 1; base = "ge-%s-%d" % (b, n)
    pil = b in pilot_b
    # --- thien (master) ---
    cdT = code("GE06")
    sub = ("Subject: the painted scene of the grand ending «%s» (the ending's node «%s») on the road «%s», in its THIỆN shading: warm, gentle, people at ease, a merciful outcome. "
           "What it means in the game (the game's own Vietnamese ending text, only to understand the meaning, never write any of it into the picture): %s "
           "The scene: %s. World cues of this life: %s.%s") % (e["tt"], e["node"], GE[b]["n"], txt(e["t"]), scene, cue,
           (" Designer's scene note: %s." % note) if note else "")
    comp_p = "Composition and size: portrait 3:4 (768x1024). Camera: %s. Every person is far away, small, in silhouette or seen from behind; the whole picture is ONE finished painted scene, nothing cropped awkwardly, the upper fifth calm enough for a title to sit on it." % comp
    time_p = S_LIGHT + " Time and weather: %s." % D.TIME_T[(gi * 3 + len(b)) % 8]
    p = W("ge06", base + "-t", [S_STYLE, S_TAKE, sub, comp_p, time_p, S_COLOUR, S_NOTEXT, S_NOFACE, S_NOQING, NECK, ONEITEM,
          "Output: ONE image."], cdT)
    row(cdT, "img/%s-t.webp (proposed; thiện)" % base, "ge06/%s-t.txt" % base, "style ref" , "768x1024 webp ≤250 KB", "jge.js:141 (PEND.geR) · design GRAND_ENDINGS.md:517", ("PILOT " if pil else "") + "%s · %s · %s" % (b, e["tt"], sm))
    # --- ac (edit of the thien picture) ---
    cdA = code("GE06")
    subA = ("Subject: the SAME scene, repainted in the ÁC shading of the grand ending «%s» (node «%s», road «%s»): cold, tense, people afraid or bowed, the outcome won by force or fear. "
            "What it means in the game (the game's own Vietnamese ending text, only to understand the meaning, never write any of it into the picture): %s "
            "The scene stays: %s. World cues: %s.") % (e["ta"], e["node"], GE[b]["n"], txt(e["a"]), scene, cue)
    editp = ("EDIT TASK: attach as the SECOND image the approved THIỆN picture of this same ending (file %s-t, code %s). It is the composition master: keep the camera, every building, prop and silhouette in EXACTLY the same place and size; "
             "change ONLY the light, colour temperature and mood to the ác shading, and the crowd's bearing (bowed, kneeling, shrinking, in long shadows). Do not add or remove any object." % (base, cdT))
    comp_a = "Size: portrait 3:4 (768x1024), the same framing as the master picture."
    time_a = S_DARK + " Time and weather: %s." % D.TIME_A[(gi * 5 + len(b)) % 8]
    p = W("ge06", base + "-a", [S_STYLE, S_TAKE, editp, subA, comp_a, time_a, S_COLOUR, S_NOTEXT, S_NOFACE, S_NOQING, NECK, ONEITEM, "Output: ONE image."], cdA)
    row(cdA, "img/%s-a.webp (proposed; ác)" % base, "ge06/%s-a.txt" % base, "style ref + the approved %s-t picture" % base, "768x1024 webp ≤250 KB", "jge.js:141 (PEND.geR)", "edit of the -t picture · " + ("PILOT " if pil else "") + b)
# fail picture (ONE; the code has no picture for the fail notice; GAP v4 GE06 'fail picture')
cd = code("GE06F")
fail = ["Subject: the picture for the fail notice «Kết cục · <name of the lost ending>» of the Hồi kết nhánh: a quiet palace courtyard in thin grey rain after a dream was lost; an empty phoenix-carved chair on a wide wet stone terrace, one fallen plum branch with a few red petals on the stones, torn red silk caught on a balustrade, an unlit lantern, tall dim palace halls behind; no person at all, no ruin or violence, just loss and silence.",
        "Composition and size: portrait 3:4 (768x1024), centred empty chair in the middle ground, wet stones reflecting a pale sky, the upper fifth calm for a title.",
        S_DARK + " Time and weather: thin steady rain at dusk.", S_COLOUR, S_NOTEXT, S_NOFACE, S_NOQING, "Output: ONE image."]
W("ge06", "ge-fail", [S_STYLE, S_TAKE] + fail, cd)
row(cd, "img/ge-fail.webp (proposed)", "ge06/ge-fail.txt", "style ref", "768x1024 webp ≤250 KB", "jge.js:141 (PEND.geR fail notice)", "one generic fail picture for all 176 fail names (old design: reuse road .11 picture)")

# =============== GE07 : Kim sách Thiên mệnh icon ===============
bal = rd("dev/build/jbalge.js"); kim = re.search(r'kimsach:"(\w+)"', bal).group(1)
cd = code("GE07")
W("icon", "item-kim-sach-thien-menh", [S_STYLE, S_TAKE,
  "Subject: a single game item icon: the «Kim sách Thiên mệnh» (golden book of Heaven's Mandate): a closed book of thin gold plates bound with red silk cord, the cover a smooth polished gold panel with a soft embossed border of clouds and a small phoenix at its centre (decoration only, no readable writing), a red silk ribbon bookmark hanging from the bottom, a small jade clasp. Heavy, precious, ceremonial. The cover is blank of any letters because the game engraves the title later.",
  "Composition and size: square 1:1 (1024x1024), the object centred with a margin, seen slightly from above at a three-quarter angle, soft shadow-less rendering. Plain solid chroma-free pure white background (#FFFFFF), object isolated, soft clean edge, nothing else in the picture (the owner removes the background later).",
  S_LIGHT, S_COLOUR, S_NOTEXT, "No hand, no person, no face. Output: ONE image."], cd)
row(cd, "img/item-kim-sach-thien-menh.webp (proposed; needs ITIMG.%s = \"kim-sach-thien-menh\")" % kim, "icon/item-kim-sach-thien-menh.txt", "style ref", "256x256 webp (+512 in img/item512/), transparent", "jge.js:196 (IT def, no icon) · j8.js:237 ITIMG · ITEM_ART.md §Tệp", "key %s from jbalge.js:32" % kim)

# =============== OR17 : intro panels ===============
exist_intro = {k for k in AK if k.startswith("img/intro/")}
for k, (cap, scene) in D.INTRO.items():
    if "img/intro/%s.webp" % k in AK: SKIP.append("img/intro/%s.webp" % k); continue
    cd = code("OR17"); orig = k.split("-")[0]
    W("intro", "intro-" + k, [S_STYLE, S_TAKE,
      "Subject: the narrated intro-panel picture «%s» of the origin «%s»: %s." % (cap, orig, scene),
      "Composition and size: portrait 3:4 (768x1024) like every story-card picture of the game; one finished scene, the camera and layout your own choice for this scene, the upper fifth and lower fifth calm. The heroine is NOT drawn as a figure (the game shows her portrait separately); only the silhouette or back view described above, if any.",
      S_LIGHT if k not in ("cn-2",) else S_DARK + " (the rain night is quiet and warm-lit at the window, not frightening)", S_COLOUR, S_NOTEXT, S_NOFACE, S_NOQING, NECK, ONEITEM, "Output: ONE image."], cd)
    row(cd, "img/intro/%s.webp" % k, "intro/intro-%s.txt" % k, "style ref", "768x1024 webp (existing intro files are ~240 KB; size not stated in code)", "joi.js:101 oiArt · joi.js:42-90 (text of this panel)", cap)

# =============== M48 / M50 : frame overlays ===============
je = rd("dev/build/jend.js")
ov = re.search(r"ov:\{mourn:\{fl:\"([^\"]+)\",l:\"([^\"]+)\",r:\"([^\"]+)\"\},\s*fest:\{fl:\"([^\"]+)\",l:\"([^\"]+)\",r:\"([^\"]+)\"\}", je)
assert ov, "jend ov not found"
KEYS = {"death": ov.groups()[:3], "fest": ov.groups()[3:]}
BGN = ("Output: ONE image on a plain flat solid neutral mid-grey background (#7A7A7A), no gradient, no shadow cast on it, object isolated with a clean soft edge, so the owner can remove the background later "
       "(grey is used instead of white because the object is white).")
BGW = ("Output: ONE image on a plain solid chroma-free pure white background (#FFFFFF), no shadow cast on it, object isolated with a clean soft edge, so the owner can remove the background later.")
def overlay(tone, kind, key):
    cd = code("M48" if tone == "death" else "M50"); name = os.path.basename(key)[:-5]
    first = [S_STYLE, S_TAKE]
    if tone == "death":
        if kind == "fl":
            sub = ("Subject: the WHITE MOURNING FLOWER (hoa tang) that sits at the top centre of the ending frame: one large rounded cluster of white paper-silk chrysanthemums and white camellias with a few pale green leaves, tied at the base with a broad white cloth ribbon whose two long tails hang down in soft folds; a small white silk knot at the centre. Only white, ivory and a very pale green, shading in soft pearl grey; solemn, quiet, elegant.")
            comp = "Composition and size: landscape 4:3 (1024x768), perfectly symmetric, the flower cluster in the upper two thirds and the ribbon tails falling in the lower third, flat front view, the object centred with a margin."
        elif kind == "l":
            sub = ("Subject: the LEFT white mourning drape of the ending frame: a long white cloth hung from the TOP-LEFT corner: a gathered swag at the top with a small white silk rosette, then the cloth falling straight down in long soft vertical folds along the LEFT side, its tail slightly tapering and ending in a gentle curved hem; white and ivory with soft pearl-grey shading, thin weighty silk with natural folds.")
            comp = "Composition and size: tall portrait 2:3 (1024x1536); the drape hangs on the left half of the picture from the top edge down nearly to the bottom, the right half is empty background; flat front view. The owner crops it later to a narrow tall strip."
        else:
            sub = ("EDIT TASK: attach as the SECOND image the approved LEFT white mourning drape (file death-drape-l). Mirror it left to right EXACTLY (a perfect mirror image so it hangs from the TOP-RIGHT corner down the RIGHT side), change nothing else: same folds, same colours, same size, same background.")
            comp = "Size: tall portrait 2:3 (1024x1536), the drape on the right half, the left half empty background."
        tail = ["Mood: solemn and quiet, soft cool even light, never black and never grey-dull (rule N2 sad = deep and rich: keep the whites luminous against the background)."]
        bg = BGN
    else:
        if kind == "fl":
            sub = ("Subject: the FESTIVE FLOWER that sits at the top centre of the Đại kết cục frame: a lush rounded cluster of red and gold silk peonies and plum blossoms with a few jade-green leaves, a gold lantern-shaped ornament and a small red silk knot at the centre, tied with a broad red and gold ribbon whose two long tails hang down in soft folds, tiny gold coins and gold petals sprinkled; joyful, rich, auspicious.")
            comp = "Composition and size: landscape 4:3 (1024x768), perfectly symmetric, the flower cluster in the upper two thirds and the ribbon tails falling in the lower third, flat front view, the object centred with a margin."
        elif kind == "l":
            sub = ("Subject: the LEFT festive drape of the ending frame: a long red silk hanging from the TOP-LEFT corner: a gathered swag at the top with a gold tassel and a red-and-gold rosette, then the silk falling in long soft vertical folds down the LEFT side, with a garland of small gold flowers and red knots running along its inner edge and short gold tassels at the hem; red silk with fine gold embroidery of small clouds, thin weighty silk with natural folds.")
            comp = "Composition and size: tall portrait 2:3 (1024x1536); the drape hangs on the left half of the picture from the top edge down nearly to the bottom, the right half is empty background; flat front view. The owner crops it later to a narrow tall strip."
        else:
            sub = ("EDIT TASK: attach as the SECOND image the approved LEFT festive drape (file fest-drape-l). Mirror it left to right EXACTLY (a perfect mirror image so it hangs from the TOP-RIGHT corner down the RIGHT side), change nothing else: same folds, same colours, same size, same background.")
            comp = "Size: tall portrait 2:3 (1024x1536), the drape on the right half, the left half empty background."
        tail = [S_LIGHT]
        bg = BGW
    refs = "style ref" + (" + the approved %s-l picture" % name.rsplit("-", 1)[0] if kind == "r" else "")
    W("frame", name, first + [sub, comp] + tail + [S_COLOUR, S_NOTEXT, "No person, no face. " + bg], cd)
    row(cd, key, "frame/%s.txt" % name, refs, "transparent webp (flower ≤ ~250 px wide on screen, drape ≤ ~104 px wide): draw 1024x768 / 1024x1536, owner crops", "jend.js:22-23 (KIT_END.ov) · KIT.md §91.4(c)", "%s %s%s" % (("mourn", "white")[0], kind, " · grey background (white object)" if tone == "death" else ""))
for tone in ("death", "fest"):
    fl, l, r = KEYS[tone]
    overlay(tone, "fl", fl); overlay(tone, "l", l); overlay(tone, "r", r)

# =============== M51 : ending backgrounds ===============
types = re.findall(r"(\w+):\{tone:\"(?:mourn|fest)\",pic:\"[\w-]+\"\}", je)
assert set(types) == set(D.ENDBG), (types, D.ENDBG.keys())
for t in types:
    key = "img/end-bg-%s.webp" % t
    if key in AK: SKIP.append(key); continue
    scene, mood = D.ENDBG[t]; cd = code("M51")
    W("endbg", "end-bg-" + t, [S_STYLE, S_TAKE,
      "Subject: the full-screen background of the ending screen of type «%s» (the game's ending types: death, exile, fail, leave, throne, grand, fate, rare): %s." % (t, scene),
      "Composition and size: landscape 3:2 (1536x1024) used full-screen on BOTH a portrait phone and a landscape iPad with object-fit cover, focus at the horizontal centre and about three tenths down from the top: so the important scenery lies in the CENTRAL vertical band (the middle two fifths of the width) and slightly above the middle; the left and right thirds and the lowest quarter are only soft continuing scenery that may be cropped away; a quiet soft area in the lower third because a dialog frame covers it. No person at all.",
      S_LIGHT if mood == "LIGHT" else S_DARK, S_COLOUR, S_NOTEXT, "No person, no face, no frame, no flowers or drapes (the game adds the frame, flower and drapes on top). Output: ONE image."], cd)
    row(cd, key, "endbg/end-bg-%s.txt" % t, "style ref", "1536x1024 webp ≤250 KB", "jend.js:24 (bg) · jend.js:20-21 (types) · KIT.md §91.4(a)", "%s · %s · tone %s" % (t, mood, "mourn" if t in ("death", "exile", "fail") else "fest"))

# =============== M52 : Học thành tài ===============
arts = re.findall(r'\{k:"(\w+)",n:"[^"]+",st:"\w+"', rd("dev/build/j1.js")[rd("dev/build/j1.js").index("const ARTS=["):][:1200])
virs = re.findall(r'\{k:"(\w+)",n:"[^"]+",full:', rd("dev/build/j85.js")[:1500])
assert sorted(("art", k) for k in arts) + sorted(("vir", k) for k in virs) == sorted(D.LEARN.keys()) or set(D.LEARN) == set([("art", k) for k in arts] + [("vir", k) for k in virs]), (arts, virs)
for (kd, k), (nm, sp, sl) in D.LEARN.items():
    for ori, sc, size in (("port", sp, "portrait 2:3 (1024x1536)"), ("land", sl, "landscape 3:2 (1536x1024)")):
        key = "img/learn-%s-%s-%s.webp" % (kd, k, ori)
        cd = code("M52")
        comp = ("Composition and size: %s, used FULL-SCREEN on %s with object-fit cover (no frame, no border). The top fifth is calm space for the title «Học thành tài» and the lower third is calm space for a text card, so the scene lives in the middle band; the figure is small, seen from behind, never a face. Celebration of a skill improving: soft gold light motes rising." %
                (size, "a phone held upright" if ori == "port" else "an iPad held sideways"))
        W("learn", "learn-%s-%s-%s" % (kd, k, ori), [S_STYLE, S_TAKE, "Subject: the full-screen level-up picture of the skill «%s»: %s." % (nm, sc), comp, S_LIGHT, S_COLOUR, S_NOTEXT, S_NOFACE, S_NOQING, NECK, ONEITEM, "Output: ONE image."], cd)
        row(cd, key, "learn/learn-%s-%s-%s.txt" % (kd, k, ori), "style ref" + (" + the approved -port picture (same scene, wider)" if ori == "land" else ""), "%s webp ≤250 KB" % size.split(" ")[1].strip("()"), "jlevel.js:24 (key learn-%s-%s) + j93.js:73-75 (kitFullSrc: -port/-land, listed in img/INFO.json have)" % (kd, k), "list the key in img/INFO.json {have} when it lands")

# =============== M84 : newday / night-end full screens ===============
jn = rd("dev/build/jne.js")
assert 'src:`${DIR}ne-night-lonely-${sea}.webp`' in jn and 'ne-dawn-${sea}.webp' in jn
for (kind, sea), (sp, sl, mood) in D.NE.items():
    nm = "ne-%s-%s" % (kind, sea); old = "img/kit/%s.webp" % nm
    for ori, sc, size in (("port", sp, "portrait 2:3 (1024x1536)"), ("land", sl, "landscape 3:2 (1536x1024)")):
        key = "img/kit/%s-%s.webp" % (nm, ori); cd = code("M84")
        has_old = old in AK
        comp = ("Composition and size: %s, used FULL-SCREEN on %s with object-fit cover (no frame, no border, no dark band). The title and one line of text lie over the lower third and a button at the very bottom, so keep the lower third quiet and soft; the focus of the picture sits in the upper-middle." %
                (size, "a phone held upright" if ori == "port" else "an iPad held sideways"))
        mood_p = (S_DARK + " It is lonely and quiet, never frightening, with one warm small red light.") if mood == "DARK" else S_LIGHT
        ref_note = (" The existing 4:3 picture of the same scene (file %s, attached as the SECOND image) shows the idea: keep its subject and mood but recompose it freely for the new frame." % os.path.basename(old)) if has_old else ""
        W("ne", "%s-%s" % (nm, ori), [S_STYLE, S_TAKE, "Subject: the full-screen «Sang buổi» picture %s (%s): %s.%s" % (nm, "the lonely night in her palace room (no bedding act)" if kind == "night-lonely" else "the dawn of the season", sc, ref_note), comp, mood_p, S_COLOUR, S_NOTEXT, "No person, no face. Output: ONE image."], cd)
        row(cd, key, "ne/%s-%s.txt" % (nm, ori), "style ref" + (" + existing %s" % old if has_old else ""), "%s webp ≤250 KB" % size.split(" ")[1].strip("()"), "jne.js:160-167 (kitNewDay beats via kitFullSrc key kit/%s) · KIT.md §62, §81c" % nm, "list key kit/%s-%s in img/INFO.json {have}" % (nm, ori))

# =============== GE11 : rare endings ===============
rare_md = rd("dev/RARE_ENDINGS.md"); blocks = re.split(r"\n#### ", rare_md)[1:]
stories = json.load(open(os.path.join(ROOT, "dev/art/manifests/EVENTS.json")))["stories"]
def stkey(i): return "img/st-%s-ket-r97.webp" % i.replace("_", "-")
nj = 0
for bl in blocks:
    head = bl.split("\n")[0]; mid = re.search(r"\(`(\w+)`\)", head); i = mid.group(1)
    tag = re.search(r"✦ (.*)$", head).group(1).strip()
    tr = re.search(r"- Tranh: (.*)", bl).group(1).strip(); who, title = [x.strip() for x in tr.split(" — ", 1)]
    res = re.search(r"- Kết quả: (.*)", bl).group(1).strip()
    arcname = head.split(" (`")[0].strip()
    if i not in D.J97: raise SystemExit("no scene for " + i)
    key = stkey(i)
    if key in AK: SKIP.append(key); continue
    cd = code("GE11"); ref = D.WHO_REF.get(who)
    face = ("The ONLY face shown is %s (%s): the face is clearly visible at medium size inside the scene. %s%s " % (who, "table column «Tranh»", ("Image 2 is the identity reference of this person: draw exactly that person's face and features in the scene's style." if ref else "This is a story character with no fixed portrait: invent a gentle face in the same style (never copy the style reference's face)."), ""))
    facerules = ("%s %s Every other person is far away, small, in silhouette or seen from behind. The heroine (the player) is never shown from the front: only from behind or as a small silhouette. Imperial dress is Ming-style (beaded crown, wide-sleeved robe), never a Qing queue, board headdress or cheongsam collar." % (FACE_LINE, FOREHEAD))
    sub = ("Subject: the main picture of the RARE ending «%s» of the story «%s» (rare-ending title in the game: «%s»). Meaning, in the game's own Vietnamese words (for understanding only, never written into the picture): %s "
           "Scene: %s") % (tag, arcname, title, txt(res), D.J97[i])
    W("ge11", "rare-%s" % i, [S_STYLE_FULL, TAKE_SKIN, sub, face, facerules,
      "Composition and size: portrait 3:4 (768x1024); camera of your own choice for THIS scene (vary it: this is one of 47 different pictures); one finished scene, upper fifth calm for a title; warm, joyful, honoured mood.",
      S_LIGHT, S_COLOUR, S_NOTEXT, NECK, "EXACTLY ONE held item per figure, or nothing.", "Output: ONE image."], cd)
    nj += 1
    row(cd, key, "ge11/rare-%s.txt" % i, "style ref" + (" + identity: %s (CDN, existing key)" % ref if ref else " (no identity ref: %s)" % who), "768x1024 webp ≤250 KB", "j89.js:25-31 stArtOf(arc, null, \"r97\") → files[\"ket-r97\"] · RARE_ENDINGS.md «Tranh»", "%s — %s · face: %s" % (i, tag, who))
# RD97L road finales (parsed from the jrd_*.js sources)
Q = r'"((?:[^"\\]|\\.)*)"'; nr = 0; rdl = []
for f in sorted(glob.glob(os.path.join(B, "jrd_*.js"))):
    s = open(f, encoding="utf-8").read()
    for p in re.split(r"(?=RD97L\.push\(rdRare\(\{a:)", s)[1:]:
        m = re.match(r'RD97L\.push\(rdRare\(\{a:' + Q + r',tag:' + Q + r',w:' + Q, p)
        blk = p.split("\n/*")[0][:6000]
        ti = re.search(r"\bti:" + Q, blk).group(1); n = re.search(r"\bn:" + Q, blk).group(1)
        t = re.search(r"\bt:" + Q, blk); line = int(s[:s.index(p)].count("\n")) + 1
        rdl.append((m.group(1), m.group(2), m.group(3), ti, n, t.group(1) if t else "", os.path.basename(f), line))
assert len(rdl) == len(D.RD), (len(rdl), len(D.RD))
for a, tag, w, ti, n, t, fn, ln in rdl:
    key = stkey(a)
    if key in AK: SKIP.append(key); continue
    cd = code("GE11"); road = a.rsplit("_", 1)[0]
    meaning = txt(t) if t else "Option taken: «%s»; the story's tag: «%s»" % (txt(n), tag)
    sub = ("Subject: the picture of the road finale RARE ending «%s» (title earned: «%s») of the road «%s». Meaning, in the game's own Vietnamese words (for understanding only, never written into the picture): %s "
           "Scene: %s.") % (tag, ti, road, meaning, D.RD[a])
    W("ge11", "rd-%s" % a, [S_STYLE, S_TAKE, sub,
      "Composition and size: portrait 3:4 (768x1024); camera of your own choice for THIS scene (vary it: this is one of 44 different pictures); one finished scene, upper fifth calm for a title; warm, joyful, honoured mood.",
      S_LIGHT, S_COLOUR, S_NOTEXT, S_NOFACE, S_NOQING, NECK, ONEITEM, "Output: ONE image."], cd)
    nr += 1
    row(cd, key, "ge11/rd-%s.txt" % a, "style ref", "768x1024 webp ≤250 KB", "%s:%d (RD97L.push rdRare) · j89.js:25-31 stArtOf" % (fn, ln), "%s · %s · N1 no face (RARE_ENDINGS.md has no row for RD97L)" % (a, tag))
save_codes("J1")

# =============== INDEX.md ===============
SEC = [("GE06", "GE06 · grand-ending scene pictures (176 endings x thiện/ác) + fail picture"), ("GE06F", None), ("GE07", "GE07 · Kim sách Thiên mệnh icon"), ("OR17", "OR17 · intro panels"),
       ("M48", "M48 · mourning frame overlay (death-flower, death-drape-l/-r)"), ("M50", "M50 · festive frame overlay (fest-flower, fest-drape-l/-r)"), ("M51", "M51 · ending backgrounds end-bg-<type>"),
       ("M52", "M52 · Học thành tài full-screen pictures (10 skills x port/land)"), ("M84", "M84 · Sang buổi / night-end full-screen pictures (8 x port/land)"), ("GE11", "GE11 · rare-ending pictures (47 j97 + 44 RD97L)")]
L = ["# J1 ENDING + INTRO PICTURES (GE06 GE07 GE11 OR17 M48 M50 M51 M52 M84) - index", "",
 "PRIORITY #1 CHECK: `git grep` origin/main + assets.json (31188 keys) for end-bg-*, kit/death-*, kit/fest-*, learn-*-port/-land, kit/ne-*-port/-land, ge-*, st-*-ket-r97, item-kim-sach, intro/{nc-*,bd-3,bd-h3,cn-2,dtq-4}: NONE exist (GAP_LIST_v4.md:56-123 agrees: code LIVE in jend.js / jlevel.js / jne.js / joi.js, pictures missing). The only reuse: the 8 existing 4:3 img/kit/ne-* pictures are attached as scene references for M84; the existing ev-* pictures stay the fallback. Skipped: none (see list below).",
 "A53: no Magnific, nothing drawn, no credits used. Prompt files only, for the owner's ChatGPT.",
 "How to use: new ChatGPT chat, attach the style reference `dev/handover/prompts_L2095/refs/mau_net_ve.jpg` (branch claude/cung-tuong-mong-handover-hj0h8w) as image 1, plus any ref in the `refs` column as image 2, paste the .txt, ask for ONE image. The CAPTION code at the end of each file is the unique code of the picture. Generator (reads the game data, reproducible): `dev/art/prompts/J1/gen_J1.py` + hand-written scene sentences `J1/j1_data.py`.",
 "Rules applied: N1 (no visible face: every file except the 47 j97 rare-ending main pictures, where RARE_ENDINGS.md «Tranh» says the person shows the face: those carry the identity-reference line, closed mouth, bare forehead, no moles), N2 (LIGHT for thiện/happy/festive, DARK for ác/sad/death/lonely), F14 no Qing look, no necklace, one held item, pictures carry no text. Every thiện/ác pair: -t = master (own scene), -a = EDIT of the -t picture (attach it), same composition, only light + crowd bearing change (design GRAND_ENDINGS.md:517).", ""]
for key, title in SEC:
    rs = [r for r in ROWS if r[0].startswith("AJ1-%s-" % key) and (key != "GE06" or not r[0].startswith("AJ1-GE06F"))]
    if key == "GE06": rs = [r for r in ROWS if r[0].startswith("AJ1-GE06-") or r[0].startswith("AJ1-GE06F-")]
    if key == "GE06F" or not rs: continue
    L += ["## " + title, "", "| code | key (image path) | prompt file | refs to attach | target | where the code reads it | note |", "|---|---|---|---|---|---|---|"]
    for r in rs: L.append("| " + " | ".join(str(x).replace("|", "/") for x in r) + " |")
    L.append("")
L += ["## Skipped (already exists)", "", "None: no key written here exists in assets.json. Not written on purpose (exist already): `img/fx/buoi-band-*` (the Sang buổi sky bands, KIT §74), `img/kit/ne-*` 4:3 (kept as fallback + attached as M84 reference), `img/ev-*` (fallback ending pictures), 40 of the 49 `img/intro/*` panels.", "",
 "## Open questions for the owner / C", "",
 "1. Count: the code has 44 grand-ending branches x 4 = 176 endings (GAP says 160) -> 352 pictures + 1 fail. The design's pilot = the 12 endings of GRAND_ENDINGS.md §4 (tt_co, bd_soi, cnv_mat = 24 pictures, rows marked PILOT): draw those first.",
 "2. GE11: 47 j97 + 44 RD97L (GAP says 36: the code has 9 roads x 4 = 36 plus bd 4 + pt 4 = 44). The 4 legacy `bd_hoa/ngua/tuc/hoang_11` copies (jrd_bd.js:61) reuse the nc_* pictures (same key pattern, B aliases them).",
 "3. Keys that no code reads yet (proposed, B wires): rare = `img/st-<id with - for _>-ket-r97.webp` (j89.js stArtOf(arc,null,\"r97\") reads EVENTS.json stories[arc].files[\"ket-r97\"]; RD97L ids like `tt_co_11` have no stories entry); grand endings = `img/ge-<branch>-<1..4>-<t|a>.webp` (jge.js:141 PEND.geR shows no picture); fail = `img/ge-fail.webp`; Kim sách = `img/item-kim-sach-thien-menh.webp` + ITIMG.kimsachtm. Say if you want other names.",
 "4. Fail picture: the design says reuse the road .11 picture; GAP v4 says «fail picture»: I wrote ONE generic fail picture for all 176 fail names. Want one per fail instead (+176)?",
 "5. M48 white overlay is asked on a flat mid-grey background (white cloth cannot be cut from white); M50 on white. Overlay sizes: flower 1024x768, drapes 1024x1536 (owner crops to a narrow strip). `-drape-r` is a mirror edit of `-drape-l`.",
 "6. M51: ONE 3:2 picture per type, scenery in the central band (cover on phone + iPad); 8 types (death exile fail leave throne grand fate rare).",
 "7. M84 covers the 8 night/dawn keys x port/land (jne.js:165-167). A festival day's dawn uses `ev-fest-<k>-b` (14 festivals): not written (falls back to the existing 4:3 until you ask: +28).",
 "8. OR17 size is not stated in code (existing intro files ~240 KB): written 768x1024 like other story cards. `img/intro/pf-*` (Phù Tang origin, joi.js:52) and `cn-h3` do not exist either: not in the order, not written.",
 "9. 6 RD97L finales have no plain result text in the source (parsed the option + tag instead): bd_soi_11, ch_bi_11, cn_chu_11, cn_ban_11, thd_hoc_11, tt_mat_11. Scenes are hand-written from the table data, so the pictures are not affected.",
 "10. Identity refs: Hoàng thượng = `img/hoang-thuong.webp`, Hoàng hậu = `img/hoang-hau.webp`, Thái hậu = `img/thai-hau.webp` (existing CDN keys; confirm they are the approved portraits). Other «Tranh» persons (phụ thân, phi tần, cung nữ thân tín, Thái y, Tổng quản, chủ nhân, hoàng tử, con gái kẻ thù) have no fixed portrait: prompt says invent a gentle face in the same style.", ""]
import subprocess as sp
chk = sp.run([sys.executable, os.path.join(JD, "..", "check_prompts.py"), JD], capture_output=True, text=True).stdout.strip()
L += ["## Checks", "", "Run from /home/user/wt/apj: `python3 dev/art/prompts/check_prompts.py dev/art/prompts/J1`", "", "```", chk, "```", "",
 "Canon checks applying: A19 length <= 10 000 chars, A56 one unique CAPTION code per file (%d codes), A57 shared sentences byte-identical (S_STYLE / S_COLOUR / S_NOTEXT / S_LIGHT / S_DARK from _lib; the j97 faces use S_STYLE_FULL + MASTER_COMMON face lines), N1, N2, F14, no percent sign, no fruit in a hold sentence. Not applicable: check_store.py (OUTFIT-figure gate, these are scene/icon/object prompts); keep_check A38 (needs a sidecar only for a prompt edited from another prompt: every file here is new; the -a / mirror files are EDIT TASKS written fresh, not edited text)." % len(ROWS)]
open(os.path.join(JD, "INDEX.md"), "w", encoding="utf-8").write("\n".join(L) + "\n")
print("prompts:", len(ROWS), dict(cnt), "skipped:", len(SKIP))
