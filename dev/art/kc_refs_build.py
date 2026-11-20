#!/usr/bin/env python3
"""Build dev/art/KC_REFS.json + KC_REFS.md (owner Lượt 543/551, ART_RULES B8).

ONE identity reference per person = her NEW THIẾU NỮ (khuê các) picture approved 19/11
(Lượt 284–322): COMMON_v3 + face-common/mNN.v3*.FULL.txt, M09 eIyOFEidqL, seed 7172,
then images_remove_background. Ref = the remove_bg CUT id (Magnific, pass it directly).
Source of ids: dev/art/gen_ledger.jsonl (OWNER-DESIGN 'thiếu nữ COMMON_v3' lines) +
owner verdicts in dev/art/FIGURE_GATE.md. kc2k (18/11) = OLD, REJECTED.
Run: python3 dev/art/kc_refs_build.py
"""
import json, os, re

ART = os.path.dirname(os.path.abspath(__file__))
FC = os.path.join(ART, "face-common")
M09 = "eIyOFEidqL"

# owner-verdict overrides: id -> (gen_id, cut_id, prompt file, why)
OVR = {
    "m09": ("yiuZ1KKPW9", "gOm4HrsSXO", "m09.v3.FULL.txt", "Lượt 285 DUYỆT m09 v3"),
    "m11": ("bxMsImL5Y2", "Syh9qs6Ub8", "m11.v3.FULL.txt", "Lượt 285 DUYỆT m11 v3"),
    "m19": ("8aiEYV3IrU", "tCRQ0thmZJ", "m19.v3.FULL.txt", "Lượt 285 DUYỆT m19 v3"),
    "m10": ("w4a6jlX7EI", "O6ERgEUynm", "m10.v3.FULL.txt", "Lượt 289 teeth redo (seed 7173) -> Lượt 291 'M10 ok'"),
    "m12": ("CqnKBtpEEy", "xSB7FTWjfW", "m12.v3.FULL.txt", "Lượt 285 redo -> Lượt 289 'M10 và M12 ok'"),
    "m43": ("0eUoBbaTfW", "kseUUU416B", "m43.v3.FULL.txt", "Lượt 293 teeth redo, lips-pressed expression (exact redo wording not saved in the file)"),
    "m04": ("aFG5rpsfSh", "MBJtEqLDCm", "m04.v3b.FULL.txt", "Lượt 300 pose redo; Lượt 302 not re-asked = OK"),
    "m30": ("kseUOH516B", "xSBJ6nGjfW", "m30.v3b.FULL.txt", "Lượt 300 pose redo; Lượt 302 'm30 OK'"),
    "m31": ("3zKcD5YREY", "iG5Wphl3uK", "m31.v3b.FULL.txt", "Lượt 300 pose redo; Lượt 302 not re-asked = OK"),
    "m37": ("eIPvuP6dqL", "Cqnkl9tEEy", "m37.v3b.FULL.txt", "Lượt 300 pose redo; Lượt 302 not re-asked = OK"),
    "m14": ("fHzK9PmCDY", "mEZHy3chJQ", "m14.v3c.FULL.txt", "Lượt 302 pose redo v3c (refs own cut iG5WzkW3uK + M09); no later complaint found"),
    "m44": ("EbY16GEuuO", "nVsebgfYQD", "m44.v3c.FULL.txt", "Lượt 302 pose redo v3c (refs own cut 1ldwsyqr4r + M09); no later complaint found"),
    "m23": ("gOmNUUoSXO", "xSBOL8qjfW", "m23.v4b.FULL.txt", "Lượt 316 NEW person v4 -> Lượt 322 v4b younger colours; Lượt 326 'm23 v4b OK'"),
    "m39": ("tCRFXOSmZJ", "JNCRSC2Oq4", "m39.v4.FULL.txt", "Lượt 317 NEW person v4; Lượt 322 'm39 OK'"),
}

# people with NO v3 thiếu nữ picture (NOT drawn, B8)
OTHERS = {}
for i in range(1, 33):
    OTHERS["c%02d" % i] = "consort: no v3 thiếu nữ picture (only img/_review/kc2k 18/11 = REJECTED)"
for i in range(1, 4):
    OTHERS["p%02d" % i] = "player: no thiếu nữ picture of any kind"
# owner Lượt 570: nc1–nc3 OK as refs ("foreign princess pictures OK as reference, no redraw"; ROOT-50 patch 14c39c1/307ca97 moved here by BW3).
# Their pictures = COMMON_v2 princess prompt (file now in _retired/face-common); face words = the "Her face: …" sentence of that {PERSON} line (verbatim).
NC_OK = {"nc1": "6Abnqu9iJO", "nc2": "p8ymOwOehw", "nc3": "ov6CN4g829"}
for i in range(1, 4):
    OTHERS["bd%d" % i] = "princess Bắc Địch: COMMON_v2 samples only; Bắc Địch styles DROPPED by owner Lượt 283"


def ledger_mass():
    out = {}
    for l in open(os.path.join(ART, "gen_ledger.jsonl"), encoding="utf-8"):
        try:
            j = json.loads(l)
        except Exception:
            continue
        pf = j.get("prompt_file") or ""
        m = re.search(r"face-common/(m\d\d)\.v3\.FULL\.txt$", pf)
        note = j.get("note") or ""
        if m and "Lượt 293 mass" in note and "redo" not in note:
            cut = re.search(r"remove_bg (\w{10})", note)
            out[m.group(1)] = (j["gen_id"], cut.group(1) if cut else None, os.path.basename(pf), "Lượt 293 mass (v3), not re-asked")
    return out


def person_line(full):
    com = open(os.path.join(FC, "COMMON_v3.txt"), encoding="utf-8").read().strip()
    pre, suf = com.split("{PERSON}")
    t = full.strip()
    # COMMON_v3 was edited a few times (hair/teeth); fall back to anchor sentences
    if t.startswith(pre.strip()) and t.endswith(suf.strip()):
        return t[len(pre.strip()):len(t) - len(suf.strip())].strip()
    a = t.find("A young")
    b = t.find("Her legs and feet")
    if a < 0:
        a = t.find("Her face")
    return t[a:b if b > a else None].strip()


def face_words(pl):
    m = re.search(r"(Her face:.*?)(?=\s(?:Hair|Outfit):)", pl, re.S)
    return m.group(1).strip() if m else pl


REFS = {}


def main():
    for l in open(os.path.join(ART, "gen_ledger.jsonl"), encoding="utf-8"):
        try:
            j = json.loads(l)
        except Exception:
            continue
        if j.get("gen_id"):
            REFS[j["gen_id"]] = [(r.get("id") if isinstance(r, dict) else r) for r in (j.get("refs") or [])]
    mass = ledger_mass()
    rows = {}
    for n in range(1, 53):
        pid = "m%02d" % n
        src = OVR.get(pid) or mass.get(pid)
        if not src:
            rows[pid] = {"id": pid, "m09_ok": "NO", "note": "no v3 ledger line found"}
            continue
        gen, cut, pf, why = src
        full = open(os.path.join(FC, pf), encoding="utf-8").read()
        pl = person_line(full)
        rows[pid] = {
            "id": pid, "m09_ok": "yes", "set": "thiếu nữ v3 (19/11, COMMON_v3)",
            "ref_id": cut, "gen_id": gen, "refs_used": REFS.get(gen),
            "magnific_ref_ok": True, "cdn_url": None,
            "prompt_file": "dev/art/face-common/" + pf, "pick_why": why,
            "face_words": face_words(pl), "person_line": pl,
        }
    for pid, cut in NC_OK.items():
        pf = "dev/art/_retired/face-common/%s.v2.FULL.txt" % pid
        full = open(os.path.join(os.path.dirname(os.path.dirname(ART)), pf), encoding="utf-8").read()
        fw = re.search(r"(Her face:.*?)(?=\sCostume\b)", full, re.S).group(1).strip()
        rows[pid] = {
            "id": pid, "m09_ok": "yes", "ref_id": cut, "note": "owner Lượt 570: foreign princess pictures OK as reference, no redraw",
            "prompt_file": pf, "set": "foreign princess (M09, COMMON_v2 princess prompt)", "gen_id": None, "refs_used": [M09],
            "face_words": fw, "magnific_ref_ok": True, "cdn_url": None, "pick_why": "owner Lượt 570",
        }
    for pid, why in OTHERS.items():
        rows[pid] = {"id": pid, "m09_ok": "NO", "ref_id": None, "note": why}
    # FRUITPET2 (ROOT-69 BEFORE MASS (b)): rows added to KC_REFS.json by later workers (RANK8-C s62/s64/s65, REDRAW3 c06 commit 2931181, ...)
    # have no source in this script. A rebuild KEEPS every existing drawn row (m09_ok yes) that this script would drop or mark NOT drawn, verbatim.
    kept = []
    try:
        old_people = json.load(open(os.path.join(ART, "KC_REFS.json"), encoding="utf-8")).get("people", {})
    except Exception:
        old_people = {}
    for pid, r in old_people.items():
        if r.get("m09_ok") == "yes" and rows.get(pid, {}).get("m09_ok") != "yes":
            rows[pid] = r; kept.append(pid)
    if kept: print("kept from the existing KC_REFS.json (no source in this script):", " ".join(sorted(kept)))
    data = {
        "rule": "ART_RULES B8 (owner Lượt 543/551): ONE identity ref = ref_id (Magnific remove_bg cut, pass directly as type image). Face words copied VERBATIM from face_words/person_line. m09_ok NO -> NOT drawn. NEVER img/_review/kc2k (REJECTED) or img/fig-*/hd t1.",
        "m09": M09, "royal_swatch_t6plus": "TdwDfOyVNR",
        "rejected_sets": ["img/_review/kc2k/ -> moved to img/_rejected/kc2k/", "img/_review/kc2k-mass/ -> moved to img/_rejected/kc2k-mass/"], "banned_refs": "dev/art/KC_BANNED_REFS.json (check: python3 dev/art/kc_ref.py --check ...; check_store.py --refs)",
        "people": rows,
    }
    json.dump(data, open(os.path.join(ART, "KC_REFS.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    ok = [r for r in rows.values() if r["m09_ok"] == "yes"]
    no = [r for r in rows.values() if r["m09_ok"] != "yes"]
    md = ["# KC_REFS — one identity reference per person (owner Lượt 543/551, ART_RULES B8)", "",
          "Built by `python3 dev/art/kc_refs_build.py`; look up one person with `python3 dev/art/kc_ref.py <id>`.",
          "Ref = her NEW thiếu nữ picture approved 19/11 (COMMON_v3 + face-common/mNN.v3*.FULL.txt, M09 %s, seed 7172, remove_bg cut). Pass `ref_id` to Magnific directly (type image); no CDN copy exists." % M09,
          "Face words: copy VERBATIM from `face_words` (full {PERSON} line in `person_line` of KC_REFS.json).",
          "OLD 18/11 khuê các (set A: kc2k, kc2k-mass, now in img/_rejected/) = REJECTED and BANNED (dev/art/KC_BANNED_REFS.json; gate `python3 dev/art/kc_ref.py --check <prompt/ids>` and check_store.py --refs) — owner Lượt 554/555 “đừng bao giờ lôi nó ra nữa”.", "",
          "Counts: ok %d · NOT drawn %d · total %d" % (len(ok), len(no), len(rows)), "",
          "| id | ok | ref (cut) | gen | prompt file | pick | face words |", "|---|---|---|---|---|---|---|"]
    for r in ok:
        md.append("| %s | yes | %s | %s | %s | %s | %s |" % (r["id"], r.get("ref_id"), r.get("gen_id"), (r.get("prompt_file") or "").split("/")[-1], r.get("pick_why") or r.get("note") or "", (r.get("face_words") or "").replace("|", "/")))
    md += ["", "## NOT drawn (no v3 thiếu nữ picture)", "", "| id | why |", "|---|---|"]
    for r in no:
        md.append("| %s | %s |" % (r["id"], r.get("note")))
    open(os.path.join(ART, "KC_REFS.md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
    print("ok", len(ok), "not", len(no))


if __name__ == "__main__":
    main()
