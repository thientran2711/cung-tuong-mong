PRIORITY #1 CHECK: OD 24/11 ~08:40Z (emotion seals all animated) + MAIN 157 | main: only th- live; review/c3-seals owned by W1/W1c; reports C3-SEALS.md + tools/ reused unchanged.
# C3-SEALS-W2 — sets tt, cc, bt, bg, tg (21 emotions each, 105 seals)
Recipe = Thái hậu THACT recipe (A still + B burst gpt-2-6 1:1 2k, OUT + LOOP Seedance 2.0 Fast 4 s 1:1 720p no sound, BACK = reversed OUT, chroma cut, THACT5 disc scale) via the W1 tools. Prompts = Thái hậu A/B/out/loop texts with only the person block swapped (generator + per-set JSON prompts kept off git; person lines below). Never yellow.
- tt (Thái tử + Hoàng tử lớn + Vương gia merged): young royal man ~25, black topknot, small silver crown piece + jade hairpin, deep blue #2F4B7C robe, silver clouds.
- cc (Công chúa lớn): young princess ~20, two coils with gold butterfly hairpins + pearl tassel, blush-pink #E8A7A5 robe, bare earlobes.
- bt (bé trai): boy ~7, topknot with red ribbon, fresh green #6AA874 robe.
- bg (bé gái): girl ~7, two buns with pink ribbons, lilac-pink #C79BC9 robe, bare earlobes.
- tg (thái giám): young eunuch ~28, small black servant cap, slate-teal #4F7378 robe, pale grey sash.
Note: FIGURE_GATE A0 lists no approved full-body forms for these groups (only consort/Thái hậu), so person blocks above are new, one per set, shown to Foreman C by sheet.
## Results (all on CDN: live img/kit/emo-anim/<p>act-<emo>{,-out,-back}.webp + img/kit/emo-<p>act-<emo>.webp, review img/_review/c3-seals/<p>/ with <p>-set-sheet.png)
All sets: THACT5 disc scale applied (rest ≈1.00, peak ≈1.12, back_end ≈1.00); every A/B still and OUT/LOOP sheet LOOKED at by the painters; set sheets LOOKED at by W2.
- cc 21/21 ≈ 48 700 cr · tt 21/21 ≈ 48 400 · bg 21/21 ≈ 50 700 · tg 21/21 ≈ 54 000 · bt 21/21 ≈ 62 000 (see faults). Total ≈ 264 000 cr vs 225 750 budget (+17 %).
## Cost cause + lessons
gpt-2-6 returned a TRANSPARENT background on ~50–75 % of images (even with "flat chroma green" in the prompt) → rerolls. Free fix (proved on tg khochiu): flatten the transparent image on #00FF00 with PIL, check it, upload it as the keyframe (no halo seen). Use that instead of rerolling. A transparent A as OUT start frame gives WHITE leading frames; a transparent B as end/loop keyframe gives a WHITE clip: always flatten before video. The 2nd reference (set's vui A) leaked its items (ingot, pouch) into lo/choang A; those were rerolled with the sex reference only.
bt faults found at the cut (white OUT starts/ends, 4 white LOOPs) were fixed: 4 loops + 1 out + 7 outs redone (~11 000 cr extra); lesson above.
## Known minor (kept)
cc: lo/choang lack the pink flower hairpin; an OUT faint mist rings; chan thread. tt: lo loop faint breath puff, choang uses an older B pair. bg: out_chan hoop flies out, out_khochiu arm past rim. tg: lo OUT holds a teacup from A. bt: khochiu loop disc 1.05–1.07 (not 1.12).
## Rollover
None needed. Wiring = W1c (review/c3-seals), strict by CDN index: the five prefixes tt- cc- bt- bg- tg- are now complete on the CDN.
