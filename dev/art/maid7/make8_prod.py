#!/usr/bin/env python3
"""MAIDFIX3 JOB 10 (owner L1836): PRODUCTION maid prompts, 2 persons x every maid rank. 0 gens.
Persons: m18 (owner-approved maid, powder blue + deep rose) and m09 (DUYET L285, heart face, rose pink + teal).
Bases = owner-approved test17_{tam,nhi}_L1785 (+ thancan), test18_nhat_L1797 (+ thancan), test3_tm0 (tho su), gpt/chuongsu_gpt_v5, build.py mama.
Run from repo root: python3 dev/art/maid7/make8_prod.py"""
import os, re, subprocess, sys
sys.path.insert(0, "dev/art")
import keep_check as kc
D = "dev/art/maid7/"; OUT = D + "prod/"
os.makedirs(OUT + "base", exist_ok=True)
PERS = {
 "m18": dict(main="powder blue", mh="#A7BAD2", sec="deep rose", sh="#CA7281", ref="s7IPw0Ll8e", face=None),
 "m09": dict(main="rose pink", mh="#D5909C", sec="teal", sh="#499597", ref="gOm4HrsSXO",
   face="Her face: a small HEART-SHAPED face with a narrow pointed chin and wide cheekbones, long almond eyes clearly UPTURNED at the outer corners (a cat-eye look), high thin arched brows, a small straight nose, a slightly fuller pouty lower lip. Expression: a sly, confident little smile with one corner of the mouth higher."),
}
M18 = PERS["m18"]
FACE18 = "Her face: a SLIM OVAL face with a gently pointed chin, large almond eyes with softly upturned outer corners, fully open and clear, softly arched thin brows, a slim straight nose, a small rosebud mouth. Expression: Sparkling eyes, a small playful closed-lip smile, head slightly tilted, eyes fully open, never a stretched grin."
CREPE = "The FABRIC is thin, light, flowing matte silk crepe (lụa tơ tằm dệt nhám): a softly crinkled, slightly grainy, completely MATTE surface with no sheen at all, never glossy, never satin, never brocade, with fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha); the small embroidered motifs are stitched in fine gold thread."
OLD_M06 = "The FABRIC is thin, light, flowing silk and gauze with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha); the small embroidered motifs are stitched in fine gold thread."
EDGES = "CLEAN COLOUR EDGES: every garment part is ONE flat solid colour with crisp clean edges (collar band, jacket, sash, bow, skirt): no colour bleeding, no gradient or ombré between the two colours; both colours stay as soft and muted as the colour rule says, never richer or more saturated."
FABSAME = "FABRIC (same for every palace maid): all her clothes are matte silk crepe: a softly crinkled, slightly grainy, completely MATTE surface with no sheen at all, soft and drapey, never glossy, never satin, never brocade."
SMILE = "Only a soft closed-lips smile, never laughing, no teeth."

def rd(f): return open(f, encoding="utf-8").read()
def sub(t, old, new, n=1):
    assert t.count(old) == n, (t.count(old), old[:70]); return t.replace(old, new)

def person(t, P):
    """m18 text -> person P (token swap, asserted)."""
    if P is M18: return t
    if P["face"]: t = sub(t, FACE18, P["face"])
    t = t.replace("powder blue", P["main"]).replace("#A7BAD2", P["mh"]).replace("deep rose", P["sec"]).replace("#CA7281", P["sh"])
    t = t.replace("lower maid's blue", "lower maid's " + P["main"]).replace("sleeves blue all the way down", "sleeves " + P["main"] + " all the way down")
    t = t.replace("the blue ruqun", "the " + P["main"] + " ruqun").replace("the pink jacket", "the " + P["sec"] + " jacket")
    return t

def hdr(t):  # strip the ChatGPT attach header (Magnific gets the ref as an image parameter)
    return re.sub(r"^\[ChatGPT:[^\]]*\]\s*", "", t)

# ---- ports (Foreman decision a): crepe / clean edges / bow onto tho su, chuong su, ma ma (m18 colour words; person() swaps after)
def port_thosu(t):
    t = sub(t, OLD_M06, CREPE)
    t = sub(t, "fine smooth plain cotton-silk in powder blue", "fine smooth plain matte silk crepe in powder blue")
    t = sub(t, "From the reference image take ONLY", "From the reference image take ONLY") if False else t
    t = sub(t, "closed-lip smile, lips closed, no teeth, mouth never open;", "closed-lip smile, lips closed, no teeth, mouth never open;") 
    t = sub(t, "nowhere else; hair in a simple bun", "nowhere else; that sash is tied at the FRONT of the waist in a small, pretty, graceful bow, the sash deep rose and the front BOW in the opposite colour powder blue so the bow stands out, never white; hair in a simple bun")
    t = sub(t, " HAIR: ALL her hair", " " + EDGES + " " + FABSAME + " HAIR: ALL her hair")
    return t
def port_chuongsu(t):
    t = hdr(t)
    t = sub(t, OLD_M06, CREPE)
    t = sub(t, "a long robe of fine embroidered silk brocade with a subtle woven pattern", "a long robe of fine embroidered matte silk crepe with a subtle tone-on-tone woven pattern")
    t = sub(t, "a wide silk sash tied in a bow at the waist,", "a wide silk sash in her main eggplant purple tied at the FRONT of the waist in a pretty, graceful bow, the front BOW in the opposite colour deep rose so the bow stands out, never white,")
    t = sub(t, " HAIR: ALL her hair", " " + EDGES + " " + FABSAME + " HAIR: ALL her hair")
    return t
def port_mama(t):
    t = sub(t, "a wide silk sash tied in a bow at the waist,", "a wide silk sash in her main colour tied at the FRONT of the waist in a pretty, graceful bow, the front BOW in the opposite (secondary) colour so the bow stands out, never white,")
    t = sub(t, " Any flower or pattern on the fabric", " " + EDGES + " Any flower or pattern on the fabric")
    return t

def build_mama(pid, age):
    s = subprocess.run(["python3", "dev/art/t8-prompt-B/build.py", pid, "v0", "--state", "mama", "--age", age, "--nostyle", "--twocol", "auto", "--noflower"], capture_output=True, text=True, check=True).stdout
    return s.strip() + "\n" if not s.endswith("\n") else s

RANKS = [  # (key, base file, scope, age, ports fn)
 ("tam", D+"test17_tam_L1785.txt", "maid", "a18", None),
 ("nhi", D+"test17_nhi_L1785.txt", "maid", "a18", None),
 ("nhat", D+"test18_nhat_L1797.txt", "maid", "a18", None),
 ("tam_thancan", D+"test17_tam_thancan_L1785.txt", "maid", "a18", None),
 ("nhi_thancan", D+"test17_nhi_thancan_L1785.txt", "maid", "a18", None),
 ("nhat_thancan", D+"test18_nhat_thancan_L1797.txt", "maid", "a18", None),
 ("thosu", D+"test3_tm0.txt", "maid", "a18", port_thosu),
 ("chuongsu", D+"gpt/chuongsu_gpt_v5.txt", "maid", "a26", port_chuongsu),
]
def allows_for(base_text, new_text, reason):
    d, _, _, _ = None, None, None, None
    seen, out = set(), []
    nn = kc.norm(re.sub(r"\s+", " ", new_text)); nf = re.sub(r"\s+", " ", re.sub(r"[.;:,()\[\]]", " ", nn))
    for raw, n in kc.units(base_text):
        if n in seen: continue
        seen.add(n); n2 = re.sub(r"\s+", " ", n)
        if n2 in nn or n2 in nf: continue
        out.append(raw.split("#")[0].strip())
    return out

manifest = []
for pid, P in PERS.items():
    for key, base, scope, age, port in RANKS + [("mama_a36", None, "mama", "a36", None), ("mama_a51", None, "mama", "a51", None)]:
        name = f"{pid}_{key}_L1836.txt"; path = OUT + name
        if base:
            b = rd(base); new18 = port(b) if port else b
        else:  # ma ma: builder text for THIS person is the base snapshot (gate-PASS), ports applied on top
            snap = OUT + f"base/{pid}_{key}_builder.txt"; open(snap, "w", encoding="utf-8").write(build_mama(pid, age))
            b = rd(snap); new18 = port_mama(b); base = snap
        new = person(new18, P) if not key.startswith("mama") else new18
        open(path, "w", encoding="utf-8").write(new)
        # sidecar: base + allow lines (ports/person reasons)
        mid = allows_for(b, new18, "port"); allp = allows_for(b, new, "person")
        lines = [f"base: {base}"]
        for a in allp:
            why = ("port: Foreman C decision (a) — owner-approved crepe L1775 / clean-edge / K30 front bow L1725+L1734 ported to this rank" if a in mid and port else "person swap: face + main/secondary colour tokens for " + pid + " (owner L1836 two persons)")
            lines.append(f"allow: {a}   # {why}")
        open(path + ".keep", "w", encoding="utf-8").write("\n".join(lines) + "\n")
        manifest.append((pid, key, path, scope, age, len(new)))
open(OUT + "MANIFEST.tsv", "w").write("\n".join("\t".join(map(str, m)) for m in manifest) + "\n")
print(len(manifest), "files")
