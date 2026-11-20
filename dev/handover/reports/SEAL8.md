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
