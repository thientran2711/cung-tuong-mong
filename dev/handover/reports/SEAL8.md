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
