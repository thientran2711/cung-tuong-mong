#!/usr/bin/env python3
"""Shared helpers for the J1..J5/KP09 paste-ready ChatGPT prompt files (branch review/art-prompts-j).
Style/colour/fabric/no-text sentences are READ from dev/art/MASTER_COMMON.txt (handover branch copy, vendored as MASTER_COMMON.txt next to this file)
so they stay byte-identical to the approved block (A57). Nothing here invents a style."""
import os, re, json
HERE = os.path.dirname(os.path.abspath(__file__))
MC = open(os.path.join(HERE, "MASTER_COMMON.txt"), encoding="utf-8").read().split("\n")
def _line(start):
    for l in MC:
        if l.startswith(start): return l.strip()
    raise SystemExit("MASTER_COMMON line missing: " + start)
S_STYLE_FULL = _line("Soft painted guofeng game illustration")
# scene/icon style = the same first sentence without the SKIN clause (no figure to match skin on)
S_STYLE = ("Soft painted guofeng game illustration in EXACTLY the drawing style of the reference image (soft clean line work, "
           "smooth airbrushed painting); NOT a photo, NOT a realistic real person, NOT 3D.")
S_TAKE = "From the reference image take ONLY the drawing style: NEVER copy its face or its subject."
S_COLOUR = _line("COLOUR RULE")
S_FABRIC = _line("The FABRIC is thin")
S_WEIGHT = _line("The silk has real weight")
S_NOTEXT = "No text, no labels, no letters, no numbers, no watermark, no signature, no frame, no border."
S_NOFACE = ("No visible face of any character: people are far away, small, in silhouette or seen from behind (rule N1).")
S_NOQING = "No Qing-dynasty look anywhere: no black two-wing board headdress, no cheongsam collar (rule F14)."
S_LIGHT = "LIGHT mood: bright, clean, warm gentle daylight, clear soft colours (rule N2)."
S_DARK = "DARK mood: deep, rich, gloomy atmosphere with low light, not black and not just night (rule N2)."
REF_STYLE = "dev/handover/prompts_L2095/refs/mau_net_ve.jpg"   # on branch claude/cung-tuong-mong-handover-hj0h8w
CODES = {}
def code_of(tag): return tag
def write_prompt(outdir, name, body_parts, code, caption_extra=""):
    """body_parts = list of sentences/paragraphs; writes <name>.txt ending with the A56 CAPTION line. Returns path."""
    os.makedirs(outdir, exist_ok=True)
    text = "\n".join(p.strip() for p in body_parts if p and p.strip())
    text += '\n\nCAPTION: write ONLY this code, small, bold, in the top-left corner, never over the picture content: "%s"' % code
    p = os.path.join(outdir, name + ".txt")
    open(p, "w", encoding="utf-8").write(text + "\n")
    CODES[code] = os.path.relpath(p, os.path.join(HERE, "..", "..", ".."))
    return p
def save_codes(jtag):
    p = os.path.join(HERE, "CODES_%s.json" % jtag)
    json.dump(CODES, open(p, "w"), indent=0, ensure_ascii=False, sort_keys=True)
