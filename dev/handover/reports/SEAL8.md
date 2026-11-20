START_CTX ≈ 3 % of 1M (get_session used_tokens read 0 → own estimate) · depth 4 · roll line ≈ 28 %, ceiling 60 %
# SEAL8 — male «ghen» without handkerchief (rule A25), worker of Foreman C ROOT-60
Owner 20/11 verbatim: "Hoàng thượng ghen tại sao lại cầm cái khăn? Đàn ông con trai mà cầm khăn." The ghen prompt as it is stays for
everyone EXCEPT males.

## (1) Male groups' ghen seals — handkerchief? (prompt grep + frames looked at: <g>-ghen-frames.jpg; m/mo webp sampled)
| group | made by | prompt says handkerchief | frames show it | ids A / B / OUT / LOOP / BACK |
|---|---|---|---|---|
| ht Hoàng thượng trẻ | SEAL4 sg4_set | B, out, loop, back | YES pink, B/OUT/LOOP/BACK (falls out bottom in BACK) | gOmd9BtSXO / N2qfnlO6D9 / If3yH10tvE / dt4UCbzXSL / 5jDYU9hKxe |
| htg Hoàng thượng già | SEAL4 sg4_set | B, out, loop, back | YES | aFG6bp0fSh / xSBVJ8IjfW / ksec7qR16B / YMlkBGBWeC / 1ld0Ohor4r |
| tg thái giám | SEAL4 sg4_set | B, out, loop, back | YES | tCRPqWWmZJ / SyhXiL4Ub8 / rgXTPS5xtc / dt4UuhyXSL / ksecOST16B |
| tv thị vệ | SEAL4 sg4_set | B, out, loop, back | YES | p8ygasqehw / Lw8D4uVswO / jUoM4EnLD0 / cpSrINc0eP / Cqn3xdcEEy |
| bt bé trai | SEAL3 grp_set_prompts | B, out, loop, back | YES | see SEAL3 / ledger |
| m- nam trẻ (old emo-anim-mass) | m/prompts.py | no | no (arms crossed, glare, puffed cheek) | — keep |
| mo- nam lớn (old) | mo/prompts.py | no | no | — keep |
| m-act-, mo-act- ghen (old) | */prompts.py | no | no (smirk, pointing, hand at mouth) | — keep |
| nt / nl | cancelled (SEAL3), no ghen made | — | — | — |
A keyframes never had the cloth (A prompt = face only; frames show none).

## (2) Male wording (builder) — dev/art/emo-anim/groups/ghen_male.py → T.S['ghen-m']
Same disc (yellow-green), same A face, same end face, same framing; ONLY the hands: "both arms crossed tight over his chest, one shoulder
turned away in a sulk … narrowed side-glance, puffed cheek, a sour pout"; OUT: arms come out and cross, turns a shoulder away, glares
sideways; LOOP: arms stay crossed, huffs, turns shoulder away and back; BACK: "uncrosses his arms, lowers his hands".
Wired in: sg4_set.py (ht htg tg tv, all male) and grp_set_prompts.py (bt only; bg/mm keep the handkerchief). Female th_prompts 'ghen' untouched.
Gate: seal_gate.py --json on all 5 ghen outputs → PASS (0 FAIL); 0 handkerchief/cloth words. sg4_set --check 200 OK.

## Cost estimate (not started — waits for ROOT-60 GO)
Per group: A + B (2 × 135) + OUT/LOOP/BACK (3 × 940) = 3 090 → 5 groups = 15 450. (Keeping the old A, which has no cloth: 14 775.)
Balance 20/11 ~01:00Z: 141 189 (shared; stop under 60 000).

## (3) DONE 20/11 ~01:10Z — male ghen redo (GO ROOT-60 00:44Z, old A kept) + A26 auto-fixes
Gate: seal_gate.py (with S10) PASS right before every call. One try each; one A26 auto-redo (tg BACK).
| group | A (kept) | B new | OUT | LOOP | BACK | fr out/loop/back |
|---|---|---|---|---|---|---|
| ht | gOmd9BtSXO | Lw8DDhSswO | 8aiOyRhIrU | s7Ipemvl8e | 9ZHaf5INYZ | 60/60/42 |
| htg | aFG6bp0fSh | P3QhhbO42C | xSBVMtZjfW | ksec0ov16B | BhN7JZ7oQR | 58/60/41 |
| tg | tCRPqWWmZJ | 4RFvvkM9Aa | MBJslMfDCm | fHzi3fpCDY | N2qfQRj6D9 (1st try mEZ4NvyhJQ BROKEN: shrank to a dot, vanished, popped) | 58/60/43 |
| tv | p8ygasqehw | N2qffxa6D9 | nVsK1cWYQD | gOmdBwESXO | 4RFvfiQ9Aa | 60/60/43 |
| bt | Xm9whh4Bfo | Lw8DDEKswO | rgXTMl9xtc | yiumv6HPW9 | jUoMpUVLD0 | 57/60/50 |
Every B: arms crossed, no cloth, yellow-green disc, opaque green (no flatten needed). No handkerchief in any frame (looked).
Faults (small, not redone): LOOP of ht, htg, tg turns the whole back to the viewer for ~1 s (back of the head/robe; my wording
"turns his shoulder away and back" was taken too far — a softer word would be "turns his head aside"); htg LOOP worst (~1.5 s).
tg OUT ducks the hat forward, face hidden ~3 frames (fr ~7–9). tv BACK opens arms wide on the rim before going back (fine).
A26 broken-clip scan (script: figure area = opaque pixels not of disc colour, per frame; min / end-frame area; then LOOKED at the top 7):
BROKEN (same kind: shrinks to a doll/vanishes, pops back) → auto-redone, same prompt + keyframes, gate PASS:
| clip | old | new | result (looked) |
|---|---|---|---|
| mm-muu BACK | iG5EBPQ3uK | s7IpB3ml8e | smooth, ends teal disc face (33 fr, start 1.87 s) |
| th-chan BACK | mEZ4CBDhJQ | ov6JNx4829 | smooth, slight dip then face |
| th-muu BACK | iG5C4JO3uK | ksecpRZ16B | smooth |
| ht-gian BACK | YMlK62KWeC | Xm9w4xxBfo | smooth |
| htg-an LOOP | xSBVyPXjfW | 5jDYMRGKxe | steady, no dark disc |
Looked, NOT broken (stay on the fault list): htg-an BACK (gradual shrink), hh-muu BACK, th-act-gian BACK (small end jump), bg-ghen LOOP (pose).
CDN …/img/_review/emo-anim-groups/: <g>-ghen-out/.webp/-back, <g>-ghen-frames.jpg, <g>-set-preview.mp4 for ht htg tg tv bt mm (rebuilt),
male-ghen-preview.mp4 (5 groups), seal-fix-preview.mp4 (mm-muu th-chan th-muu ht-gian htg-an); th-chan/th-muu/ht-gian/htg-an/mm-muu frames.jpg.
Old files kept in scratchpad only. Credits mine: 5 × 135 + 21 × 940 = 20 415. Balance 93 226 after (shared pool, 141 189 before).

## (4) A — DISC COLOUR CODES (A26) 20/11 ~01:25Z — 0 credits
Table (builders + seal_gate read it): dev/art/emo-anim/discs/disc_colours.json — key → {hex, vi, en (prompt words), source}.
Official = the MEASURED Thái hậu disc of each key (approved set), except hanghai = Hoàng hậu coral #F77156 (th still is the old spring
green) and act-ghen = PROPOSED #1E6B5C deep jade-teal (th-act-ghen still is AMBER #E7903B — prompt said jade-teal; needs OK; note it is
close to mưu teal #208B77).
Tools: discs/disc_measure.py (disc hex of a still: dominant colour of the ring 0.78–0.88 R), discs/measured_20-11.json (129 stills),
discs/audit_20-11.json (ΔE CIE76 vs official: >15 MISMATCH, 8–15 slight), discs/disc_sheet.py → CDN …/emo-anim-groups/disc-audit-sheet.jpg
(one row per emotion: official swatch + every group's still + measured swatch + ΔE).
MISMATCH (hue wrong): hanghai bt #144FC0 cobalt, mm #1B45DB cobalt, th #8DC423 spring green; act-ghen th amber.
MISMATCH (same hue, shade off ΔE 15–22): muu ht #326A6C (dark), htg, tv; ghen mm, htg (lighter/greener); buon tv (brighter); tutin mm.
slight (ΔE 8–15): 23 — mostly muu (all groups bluer-teal than th) + vui/tutin/lo shades. List in audit_20-11.json.
Clips' B frames not measured (figure covers the ring); BACK ends on the still, OUT starts on it.

## (5) B — FIX PLAN (NOT APPLIED — waits for ROOT-60)
Digital tool: discs/disc_recolour.py SRC DST KEY --measured HEX [--tol hue°]: hue mask (± tol° of the measured disc, chroma/lightness
gated), keeps only the big connected region (= the disc), shifts it in Lab to the official colour keeping the brush texture.
Demo (scratchpad, nothing replaced): CDN …/disc-recolour-demo.jpg — top: before/after bt-hanghai, mm-hanghai, th-act-ghen, th-hanghai;
bottom: bt-hanghai LOOP frames recoloured.
- WORKS: hanghai bt / mm (cobalt → coral; blue/teal collars untouched), th (green → coral), and bt LOOP frames (small blue rim bits left
  under the arms in a few frames → raise tol or accept). → apply to still + out/loop/back webp of bt-, mm-, th-hanghai: 0 cr.
- FAILS: th-act-ghen amber → jade: the gold crown, fan and robe share the amber hue and turn teal. → REDRAW needed: A + B + 3 clips
  = 3 090 cr (after the owner OKs the act-ghen colour; jade-teal vs mưu teal too close?).
- Shade mismatches (same hue): digital with tight tol possible but risky where the robe shares the hue (tutin/vui amber-yellow vs
  royal yellow robes); recommend: muu ht/htg/tv + ghen mm/htg + buon tv digital (review each), tutin mm leave. 0 cr.
Also tell the builders: prompts should carry the hex from disc_colours.json (e.g. "yellow-green (#C3B23F)") — not done (A18: needs OK).

## HANDOVER (20/11 ~01:30Z) — SEAL8 context ≈ 30 % (START_CTX 3 % + 25 % passed) → ROLL; ROOT-60 opens the successor (worker never does).
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
STATE: D (male ghen) DONE + uploaded · C (mm-muu + broken-clip scan, 6 clips redone) DONE + uploaded · A (colour table, audit, sheet) DONE,
MG4 told the path · B plan written (§5), NOT applied — waits for ROOT-60.
NEXT for the successor (only on ROOT-60's word):
1. Apply digital recolour (0 cr) per §5: for bt/mm/th hanghai run discs/disc_recolour.py on still/<g>-hanghai.webp and <g>-hanghai-out.webp,
   <g>-hanghai.webp, <g>-hanghai-back.webp (measured: bt #144FC0, mm #1B45DB, th #8DC423; tol 25, raise to ~35 if blue bits stay), LOOK at
   each (sheet: th_sheet.py), keep old files in scratchpad, cdn_sync the files, rebuild bt/mm set previews (th_preview.py).
   NOTE: `cdn_sync.py --pull` REPLACES local files that differ — never pull a glob over files you just made.
2. act-ghen: owner/ROOT OK on colour first (proposed #1E6B5C), then redraw A+B+3 clips (3 090 cr) with the gate.
3. Optional (ROOT asks): ghen LOOP of ht/htg/tg turns the back to the viewer ~1 s → redo with "turns his head aside" (3 × 940).
Scan tool for broken clips: scratchpad scan2.py is not in the repo — the method: per frame count opaque pixels NOT of the disc colour
(mode colour ±70); ratio min/min(first,last) < ~0.75 → look. (Copy into discs/ if needed again.)
Credits: balance 93 226 at 01:10Z (shared). Stop under 60 000.
ADD 01:12Z: foreman is now ROOT-61 (session_01PEhRbxPG7XXXVSg4KgDLkW). New owner rule ('LABEL ON THE PICTURE'): every preview/sheet sent
to the owner must carry the group/rank name written big ON the image — my previews/sheets (male-ghen-preview, seal-fix-preview, set
previews, disc-audit-sheet) do NOT have it yet → successor adds labels (0 cr) before they go to the owner.
Checked: CDN mm-muu-back.webp = 33 frames = the NEW clip s7IpB3ml8e (clean); old was 42. No LOOP back-turn redo without owner yes (ROOT-60).
