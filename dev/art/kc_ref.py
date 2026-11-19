#!/usr/bin/env python3
"""kc_ref.py <id> [--full] — the ONE identity reference of a person (ART_RULES B8, owner Lượt 543/551).

Prints: ref id (Magnific remove_bg cut of her NEW thiếu nữ v3 picture, pass it directly as type image),
Magnific web link, the prompt file, and the FACE words to copy VERBATIM into the new prompt.
--full also prints her whole {PERSON} line.
kc_ref.py --check <prompt file | ids | keys>  -> exit 1 if any BANNED set-A ref (KC_BANNED_REFS.json). m09_ok NO -> the person is NOT drawn (exit 2).
Table: dev/art/KC_REFS.json (rebuild: python3 dev/art/kc_refs_build.py).
"""
import json, os, sys

T = os.path.join(os.path.dirname(os.path.abspath(__file__)), "KC_REFS.json")
B = os.path.join(os.path.dirname(os.path.abspath(__file__)), "KC_BANNED_REFS.json")


def banned_hits(text):
    """-> list of banned set-A keys/ids found in text (KC_BANNED_REFS.json, owner Lượt 554/555)."""
    b = json.load(open(B, encoding="utf-8"))
    hits = [k for k in b["key_patterns"] if k in text]
    hits += [i for i in b["magnific_ids"] if i in text]
    return hits


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if "--check" in sys.argv:   # kc_ref.py --check <file|id|key> ... : FAIL if any banned set-A ref
        txt = " ".join(open(a, encoding="utf-8").read() if os.path.isfile(a) else a for a in args)
        h = banned_hits(txt)
        if h:
            print("BANNED REF FAIL (old khuê các set A, owner Lượt 554/555):", ", ".join(sorted(set(h))))
            sys.exit(1)
        print("BANNED REF PASS")
        return
    if not args:
        raise SystemExit(__doc__)
    d = json.load(open(T, encoding="utf-8"))
    p = d["people"].get(args[0].lower())
    if not p:
        raise SystemExit(f"{args[0]}: not in KC_REFS.json")
    if p["m09_ok"] != "yes":
        print(f"{p['id']}: NOT DRAWN — {p['note']}")
        sys.exit(2)
    print(f"id        {p['id']}")
    print(f"ref_id    {p['ref_id']}   (type image; Magnific https://www.magnific.com/app/creation/{p['ref_id']})")
    print(f"gen_id    {p['gen_id']}   refs used then: {p['refs_used']}")
    print(f"prompt    {p['prompt_file']}")
    print(f"pick      {p['pick_why']}")
    print(f"face      {p['face_words']}")
    if "--full" in sys.argv:
        print(f"person    {p['person_line']}")


if __name__ == "__main__":
    main()
