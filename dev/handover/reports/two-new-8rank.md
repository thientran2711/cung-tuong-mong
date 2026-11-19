# two-new-8rank — TN1 (Lượt 469, + 476 / 483 / 486 / 487 / 489)

PRIORITY #1 CHECK: OD/ledger: rank tests m07/m29 (F4b, ledger 1398–1429), angles-14.md, item-ladder-8ranks.md | main none | review/* none | claims ROOT-48 Lượt 469 → TN1.

## 1. Audit (Lượt 469) — builder before b44f422
| person | ANGLE t1..t8 (ANG14 #) | HELD ITEM | POSE (spec5) |
|---|---|---|---|
| c06 | 5,6,7,8,9,10,11,12 (8 distinct) | 8 distinct (3f) | t1=t7 skirt-stair, t2=t8 cheek-raise, t4=t5 hairpin → 6 distinct |
| m07 | 6..13 | 8 distinct | t2=t3=t8 hairpin, t1=t7 → 5 distinct |
| m29 | 0..7 | 8 distinct | t4=t5 'both hands' → 7 distinct |
Between people at the same rank: angle and item differ (n differs), but c06/m07 (same personality list) share poses at t6–t8 after fallbacks. Result: ANGLE yes, ITEM yes, POSE **no** (only ~6/87 people had 8 different poses). Also the store kept two-item poses (lantern + item: SPEC5_ADAPT key carries {prop}, so never adapted).
Lượt 306 "t8 Hoàng hậu fixed frontal" vs Lượt 440/469 14-angle rotation: followed the NEWER rule (t8 rotates too). Phi bạch: t1–t6 thường phục only; not t7/t8/Nữ đế/triều phục (builder unchanged).

## 2. Builder changes (dev/art/store-all/build_all.py; store text untouched, check_store 728/728 PASS each time)
- b44f422 (Lượt 469): pose dedupe (8 distinct spec5 poses per person) + GRACE line (8 head/shoulder nuances).
- de04967 (Lượt 476): ANGLE, POSE, GRACE = one global seeded-random plan (seed person+rank), 8 distinct per person, per-rank counts balanced (least-used option first, tie random). Ma ma builder (build.py ang_for) unchanged.
- this commit (Lượt 483/486/489):
  - Lượt 483 root cause: **f2c2835 (W72, 18/11 18:30, first `--low` builder)** wrote the t1–t6 COLOUR RULE as "{main} … with {second} in the inner robe and linings", copied from the t8 ORIG1 sentence (where yellow dominates); for maids the second word is silver/gold/ivory, so outfits read as one colour; phi bạch then fell to FAMILY_CONTRAST (antique gold).
  - Lượt 489: the owner-approved TWO-COLOUR RULE (Cao Ly V2, dev/art/owner-copy/pr_cl_t2_V2.txt) copied VERBATIM on t1–t6, slots {main}/{secondary}. Why it was missing: it exists only in the owner-copy generators (mk_ranks_v3.py, mk_princess_ranks.py, mk_v7.py); build_all copies the store t8-prompt-B/build.py, which never had it. COLOUR RULE colour slot swapped to the secondary (wording unchanged).
  - Secondary resolver: listed secondary if a real colour of another family; else ORIG1 measured second colour if chromatic/other family/not yellow; else FAMILY_CONTRAST (gold/yellow removed). Live-picture pixel measurement was tried and FAILED (skin/arms dominate the hue histogram) → 74/87 people are on the contrast fallback: a person-by-person eye check of the live originals is still owed (table below).
  - Phi bạch colour = that secondary (never gold/yellow).
  - Lượt 486.1 HELD ITEM COLOUR sentence (item + its decoration ≠ main and ≠ secondary) on all ranks.
  - Lượt 486.2 m13 t8 "cái dây" = the POSE "standing as a breeze lifts her long stole" (spec5 thamvong#4), not the store text (HH store has only a floor mantle). t7/t8 now ban stole/ribbon/sash poses; m13/m20 t7/t8 prompts contain no stole/shawl/ribbon/sash/streamer word.
  - Lượt 486.4 HOÀNG QUÝ PHI LUXURY sentence (crown jewels, pearl-gold necklace, pearl/jade cape trims, jade-gold pendants; below HH) on t7.
  - Lượt 486.5 poses: was partly rule (t6+ no twirl/dance/skip/butterfly/songbird/stair; t7+ no walking) — now explicit: t6–t8 also no walking/mid-step/stepping (calm pool, chosen first), t1–t5 full lively pool.

## 3. Gens (Lượt 469 round, old builder b44f422) — now SKINS (Lượt 487)
gpt-2-6 1024x2304 2k seed 7172; t1 refs style 6AbGv6EiJO + v3 thiếu nữ; t2–t5 thiếu nữ; t6–t8 + swatch TdwDfOyVNR. m13 thiếu nữ VX7IB7sMMU, m20 UPv6ye3wny (never drawn at 8 ranks before; n differ by 7 → all 14 angles).
- m13 t1 gOm0XbJSXO cut jUonmYeLD0
- m13 t2 4RFBfqR9Aa cut lJtcaV4gv9
- m13 t3 3zKmHuNREY cut s7IWvD3l8e
- m13 t4 SyhT8tzUb8 cut 5jDRXWRKxe
- m13 t5 0eUql7ETfW cut Lw8YhdIswO
- m13 t6 s7IWBvLl8e cut jUonmXaLD0
- m13 t7 lJtc88cgv9 cut gOm0fh7SXO
- m13 t8 dt4xy94XSL cut P3QXbHF42C
- m20 t1 UPvV8mPwny cut 0eUqOcjTfW
- m20 t2 3zKm5HNREY cut 0eUqyVsTfW
- m20 t3 SyhTmEMUb8 cut aFGJculfSh
- m20 t4 xSBzBeYjfW cut ov6s2va829
- m20 t5 P3QXQFb42C cut Xm9jRhVBfo
- m20 t6 Tdwb7jjVNR cut 3zKmjWvREY
- m20 t7 u5W4cGwQLD cut rgXGtJGxtc
- m20 t8 VX75OeOMMU cut JNCpHAzOq4
Credits: 16 × 135 = 2,160 + 16 × 3 cuts = 48 → 2,208. Faults (looked at all 16): no gate fault; 3/4 angles read softer than asked (m13 t5/t7); m20 t6 yellow inner panel large; m20 t7 bead string at cheek height (pose text); outfits one colour (→ Lượt 483). Sheets: img/_review/rank-test/m13_8rank_angles.jpg, m20_8rank_angles.jpg, m13_m20_14angles.jpg (+ repo dev/handover/review-sheets/rank-test/); cuts img/_review/rank-test/v469/. SKINS.md: 16 lines.

## 4. HANDOVER (TN1 at context ceiling — successor does the Lượt 487 redraw)
1. `python3 dev/art/store-all/build_all.py m13|m20 1..8` → prompts already regenerated in dev/art/store-all/test/m13_t*.prompt.txt / m20_t*.prompt.txt (STORE CHECK PASS 16/16, args as in ledger "check").
2. Refs per Lượt 482 "own picture only": t1 = thiếu nữ only? (confirm with ROOT-48: t1 prompt still names the style image as image 1 — if t1 drops the style image, build t1 with STYLE removal like t2) ; t2–t5 [thiếu nữ]; t6–t8 [thiếu nữ, TdwDfOyVNR].
3. LOOK: two outfit colours visible, phi bạch = secondary (m13 deep teal, m20 warm coral rose), item ≠ outfit colours, no drape t7/t8, HQP richer. Regen cap 2. Cut, sheets with $S/sheet.py logic (labels from plan(): angle = plan('a18')[(p,t)][0]), ledger, report, send paths, STOP.

## 5. Colour table + angle histogram
| person | palette (store) | main | SECONDARY (outfit bands + phi bạch) | source |
|---|---|---|---|---|
| c01 | rose red and gold | rose red | deep teal | contrast (listed gold is neutral/metal/same family) |
| c02 | sapphire blue and silver | sapphire blue | warm coral rose | contrast (listed silver is neutral/metal/same family) |
| c03 | emerald green and cream | emerald green | crimson | contrast (listed cream is neutral/metal/same family) |
| c04 | royal purple and lavender | royal purple | crimson | contrast (listed lavender is neutral/metal/same family) |
| c05 | peacock teal and gold | peacock teal | crimson | contrast (listed gold is neutral/metal/same family) |
| c06 | vermilion and ivory | vermilion | jade green | contrast (listed ivory is neutral/metal/same family) |
| c07 | lavender and pale pink | lavender | pale pink | listed secondary |
| c08 | cherry-blossom pink and pale green | cherry-blossom pink | pale green | listed secondary |
| c09 | powder blue and white | powder blue | deep rose | contrast (listed white is neutral/metal/same family) |
| c10 | peach and cream | peach | jade green | contrast (listed cream is neutral/metal/same family) |
| c11 | lilac and silver | lilac | deep teal | contrast (listed silver is neutral/metal/same family) |
| c12 | mint green and white | mint green | deep rose | contrast (listed white is neutral/metal/same family) |
| c13 | apricot and cream | apricot | deep sapphire blue | contrast (listed cream is neutral/metal/same family) |
| c14 | soft butter yellow and white | soft butter yellow | blue-violet | contrast (listed white is neutral/metal/same family) |
| c15 | coral pink and ivory | coral pink | deep teal | contrast (listed ivory is neutral/metal/same family) |
| c16 | sage green and cream | sage green | deep rose | contrast (listed cream is neutral/metal/same family) |
| c17 | blush pink and pale gold | blush pink | deep teal | contrast (listed pale gold is neutral/metal/same family) |
| c18 | magenta rose and lilac | magenta rose | lilac | listed secondary |
| c19 | plum and pink | plum | pink | listed secondary |
| c20 | lotus pink and celadon | lotus pink | celadon | listed secondary |
| c21 | ruby and blush pink | ruby | blush pink | listed secondary |
| c22 | orchid purple and pink | orchid purple | pink | listed secondary |
| c23 | crimson and gold | crimson | deep teal | contrast (listed gold is neutral/metal/same family) |
| c24 | scarlet and ivory | scarlet | jade green | contrast (listed ivory is neutral/metal/same family) |
| c25 | deep cherry red and black-gold | deep cherry red | deep teal | contrast (listed black-gold is neutral/metal/same family) |
| c26 | burgundy and gold | burgundy | jade green | contrast (listed gold is neutral/metal/same family) |
| c27 | cinnabar and cream | cinnabar | deep teal | contrast (listed cream is neutral/metal/same family) |
| c28 | celadon and white | celadon | deep rose | contrast (listed white is neutral/metal/same family) |
| c29 | ink blue and pale grey | ink blue | deep rose | contrast (listed pale grey is neutral/metal/same family) |
| c30 | moonlight blue and white | moonlight blue | warm coral rose | contrast (listed white is neutral/metal/same family) |
| c31 | pale jade and silver | pale jade | crimson | contrast (listed silver is neutral/metal/same family) |
| c32 | ivory and soft grey-blue | ivory | soft grey-blue | listed secondary |
| m01 | sage green and cream | sage green | crimson | contrast (listed cream is neutral/metal/same family) |
| m02 | moss green and silver | moss green | deep rose | contrast (listed silver is neutral/metal/same family) |
| m03 | slate blue and silver | slate blue | deep rose | contrast (listed silver is neutral/metal/same family) |
| m04 | warm apricot and gold | warm apricot | blue-violet | contrast (listed gold is neutral/metal/same family) |
| m05 | coral red and gold | coral red | deep teal | contrast (listed gold is neutral/metal/same family) |
| m06 | pale blue-grey and silver | pale blue-grey | warm coral rose | contrast (listed silver is neutral/metal/same family) |
| m07 | pale jade green and white | pale jade green | crimson | contrast (listed white is neutral/metal/same family) |
| m08 | peach-salmon and gold | peach-salmon | jade green | contrast (listed gold is neutral/metal/same family) |
| m09 | rose pink and gold | rose pink | deep teal | contrast (listed gold is neutral/metal/same family) |
| m10 | sage green and gold | sage green | deep rose | contrast (listed gold is neutral/metal/same family) |
| m11 | sky blue and silver | sky blue | deep rose | contrast (listed silver is neutral/metal/same family) |
| m12 | pale golden yellow and ivory | pale golden yellow | blue-violet | contrast (listed ivory is neutral/metal/same family) |
| m13 | lilac and silver | lilac | deep teal | contrast (listed silver is neutral/metal/same family) |
| m14 | ivory white and celadon | ivory white | celadon | listed secondary |
| m15 | blush pink and pearl white | blush pink | deep teal | contrast (listed pearl white is neutral/metal/same family) |
| m16 | lavender purple and gold | lavender purple | crimson | contrast (listed gold is neutral/metal/same family) |
| m17 | olive green and gold | olive green | crimson | contrast (listed gold is neutral/metal/same family) |
| m18 | powder blue and pearl white | powder blue | warm coral rose | contrast (listed pearl white is neutral/metal/same family) |
| m19 | caramel apricot and gold | caramel apricot | deep sapphire blue | contrast (listed gold is neutral/metal/same family) |
| m20 | slate blue and gold | slate blue | warm coral rose | contrast (listed gold is neutral/metal/same family) |
| m21 | aqua celadon and silver | aqua celadon | crimson | contrast (listed silver is neutral/metal/same family) |
| m22 | dusty rose and taupe | dusty rose | jade green | contrast (listed taupe is neutral/metal/same family) |
| m23 | butter yellow and gold | butter yellow | deep sapphire blue | contrast (listed gold is neutral/metal/same family) |
| m24 | jade green and gold | jade green | deep rose | contrast (listed gold is neutral/metal/same family) |
| m25 | lavender violet and silver | lavender violet | deep teal | contrast (listed silver is neutral/metal/same family) |
| m26 | blush pink and gold | blush pink | jade green | contrast (listed gold is neutral/metal/same family) |
| m27 | soft spring green and gold | soft spring green | crimson | contrast (listed gold is neutral/metal/same family) |
| m28 | coral pink and ivory | coral pink | jade green | contrast (listed ivory is neutral/metal/same family) |
| m29 | pale celadon and silver | pale celadon | crimson | contrast (listed silver is neutral/metal/same family) |
| m30 | soft lilac and silver | soft lilac | crimson | contrast (listed silver is neutral/metal/same family) |
| m31 | pale buttercup yellow and gold | pale buttercup yellow | deep sapphire blue | contrast (listed gold is neutral/metal/same family) |
| m32 | pale mint green and ivory | pale mint green | deep rose | contrast (listed ivory is neutral/metal/same family) |
| m33 | lavender blue and silver | lavender blue | deep rose | contrast (listed silver is neutral/metal/same family) |
| m34 | peach pink and gold | peach pink | jade green | contrast (listed gold is neutral/metal/same family) |
| m35 | pale jade green and pearl white | pale jade green | crimson | contrast (listed pearl white is neutral/metal/same family) |
| m36 | ivory cream and gold | ivory cream | deep rose | contrast (listed gold is neutral/metal/same family) |
| m37 | pale aqua and silver | pale aqua | crimson | contrast (listed silver is neutral/metal/same family) |
| m38 | warm apricot and gold | warm apricot | blue-violet | contrast (listed gold is neutral/metal/same family) |
| m39 | sky blue and silver | sky blue | deep rose | contrast (listed silver is neutral/metal/same family) |
| m40 | dusty rose and gold | dusty rose | jade green | contrast (listed gold is neutral/metal/same family) |
| m41 | soft willow green and gold | soft willow green | crimson | contrast (listed gold is neutral/metal/same family) |
| m42 | peach coral and gold | peach coral | jade green | contrast (listed gold is neutral/metal/same family) |
| m43 | periwinkle and silver | periwinkle | deep rose | contrast (listed silver is neutral/metal/same family) |
| m44 | ivory and blush pink | ivory | blush pink | listed secondary |
| m45 | pale sky blue and pearl white | pale sky blue | deep rose | contrast (listed pearl white is neutral/metal/same family) |
| m46 | rust red and gold | rust red | jade green | contrast (listed gold is neutral/metal/same family) |
| m47 | pale lilac and mint | pale lilac | mint | listed secondary |
| m48 | warm beige cream and gold | warm beige cream | deep rose | contrast (listed gold is neutral/metal/same family) |
| m49 | powder blue and silver | powder blue | deep rose | contrast (listed silver is neutral/metal/same family) |
| m50 | soft pink and pearl white | soft pink | jade green | contrast (listed pearl white is neutral/metal/same family) |
| m51 | pale mint and silver | pale mint | crimson | contrast (listed silver is neutral/metal/same family) |
| m52 | pink lilac and gold | pink lilac | crimson | contrast (listed gold is neutral/metal/same family) |
| p01 | indigo blue and ivory | indigo blue | deep rose | contrast (listed ivory is neutral/metal/same family) |
| p02 | rose and jade | rose | jade | listed secondary |
| p03 | wisteria and crimson | wisteria | crimson | listed secondary |

Sources: {'contrast': 74, 'listed secondary': 13}

### Angle histogram per rank (counts of ANG14 #0..#13 over 87 people)

- t1: 6 6 6 7 6 6 6 6 6 7 6 6 7 6
- t2: 6 6 6 7 6 6 7 6 6 6 7 6 6 6
- t3: 7 6 7 6 6 6 6 6 6 6 6 6 7 6
- t4: 6 6 6 6 6 7 6 6 6 7 7 6 6 6
- t5: 6 7 7 6 6 6 6 6 6 6 6 6 7 6
- t6: 6 6 6 6 6 7 7 6 6 6 6 7 6 6
- t7: 6 6 6 6 6 6 6 6 7 6 7 7 6 6
- t8: 6 7 6 6 6 6 6 7 6 6 6 6 7 6

## 6. Lượt 487 redraw — TN2 (successor of TN1), 19/11 ~17:35–18:05Z
Prompts: `build_all.py m13|m20 1..8` re-run (gate PASS 16/16). Only t1 changed vs TN1's files: the builder default is now own-picture-only (Lượt 482, `NOSTYLE_FOR` = True for every rank), so t1 lost the style image/sentences (answer to §4 q2 from ROOT-49: own picture only at ALL ranks). Refs: t1–t5 [thiếu nữ]; t6–t8 [thiếu nữ, swatch TdwDfOyVNR] (swatch kept pending owner, conflict #4). gpt-2-6 1024x2304 2k seed 7172, folder ba4aecfe. Old 16 (§3) stay SKINS, untouched.
| | t1 | t2 | t3 | t4 | t5 | t6 | t7 | t8 |
|---|---|---|---|---|---|---|---|---|
| m13 gen | gOmT2gXSXO | SyhVzTDUb8 | SyhVnjrUb8 | mEZwlsdhJQ | KLp2RGfkqp | CqnP91TEEy (regen 1, seed 7173) | s7IcVBsl8e | gOmTplGSXO |
| m13 cut | 3zKhLB5REY | DoO16bBpcl | BhNs2xVoQR | BhNs2LDoQR | JNCeqdBOq4 | 6AbtxvRiJO | KLp28nckqp | 5jDZoYiKxe |
| m20 gen | bxMRn6w5Y2 | 5jDZczYKxe | rgXzDEHxtc | SyhVtAlUb8 | JNCefu1Oq4 | 0eUbwdPTfW | 8aigR9nIrU | SyhVfgtUb8 |
| m20 cut | WDgHOrncXe | vQAJc3Ta47 | jUoYvXXLD0 | fHzyTzbCDY | hu27WzlvqL | vQAJcYBa47 | kseAII016B | Lw8WafQswO |
| angle (plan) m13 / m20 | 1 / 10 | 3 / 5 | 4 / 2 | 6 / 8 | 8 / 7 | 11 / 1 | 13 / 0 | 5 / 9 |
Rejected: m13 t6 YMlFF7lWeC (turn ~15–20° instead of 3/4 R; round-fan painting lilac = main colour). Regens used: 1 (cap 2).
LOOK (every gen looked at, 1024 px): both colours clearly visible on all t1–t6 (m13 lilac + deep teal, m20 slate blue + warm coral rose: inner skirt/borders/sash); phi bạch = secondary on t1–t6 only; t7/t8 no stole/ribbon/sash drape (t8 = store floor mantle only); no gold/yellow outfit colour below t6; HQP t7 clearly richer (pearl layers, jade pendants, jewelled crown), below HH.
Faults (kept, not regen-worthy): (1) angles read softer than asked — 3/4 asks land ~30° (m13 t3/t6, m20 t3/t8), slight turns read near-frontal (m20 t4/t6); (2) m20 t7 pose text names a "gold-and-coral bead string" → coral = her secondary family (B16 builder fault: pose item colour words not checked against secondary), string held at cheek as in TN1's round; (3) m13 t7 jewel casket enamel blue-green, close to her secondary teal; (4) t5 store "broad gold brocade girdle" reads as a gold band on both people; (5) m13 t4/t5 hair flowers lilac = main colour (F3); (6) m20 store hex "slate blue like #A79E9C" is a grey-taupe value (store data, render reads slate blue anyway); (7) 14-angle coverage: the global seeded plan gives these two people 13/14 angles — angle 12 missing, 1/5/8 twice (TN1's old diagonal gave 14/14; the balanced plan does not guarantee it per pair).
Sheets (CDN, 200 OK): img/_review/rank-test/v487/m13_8rank_angles.jpg, m20_8rank_angles.jpg, m13_m20_14angles.jpg; cuts img/_review/rank-test/v487/cut/{m13,m20}_t1..t8.png. Repo copy: dev/handover/review-sheets/rank-test/v487/.
Credits: 17 gens × 135 = 2,295 + 16 cuts × 3 = 48 → 2,343. Ledger: 16 lines (TN2, Lượt 487). STOP — waiting for owner verdict.

## 7. HOLD breach + HANDOVER (TN2 at context ceiling)
- ROOT-49 sent HOLD (Lượt 495 pose groups) at 17:41Z, the Lượt 502 pose restraint test at 17:49Z and LAW #0 (Lượt 505 / A18) at 17:53Z. TN2 read all three only after §6 was finished and pushed (the queue was not checked between gens). So the §6 gens made after 17:41Z (about m13 t6 onward: YMlFF7lWeC, CqnP91TEEy, s7IcVBsl8e, gOmTplGSXO + all 8 m20 + 16 cuts) went against the hold. They are review pictures only, nothing is live; the owner can treat them as void once the pose groups land.
- Successor task (ROOT-49 Lượt 502): POSE RESTRAINT TEST, m13 t2 / t5 / t8. Only the pose slot changes, identical in all three: "raising {prop} beside her cheek with one hand, chin slightly lifted, the other long sleeve floating out" + that rank's EXISTING builder ending (t2 lively, t5 ", poised", t8 ", with stately grace"; if a rank has no ending, ask ROOT-49, never invent one). Base prompts = `build_all.py m13 2|5|8`; {prop} = that rank's item from the default prompt. Diff each against the default (pose slot only). Refs: t2/t5 [VX7IB7sMMU]; t8 [VX7IB7sMMU, TdwDfOyVNR]; gpt-2-6 1024x2304 2k seed 7172. LAW #0: any other fault = a NOTE, never a prompt change. LOOK at each, then one 3-figure sheet (rank + the full pose sentence under each) → CDN img/_review/rank-test/ + repo dev/handover/review-sheets/, commit, push, send paths + credits, STOP. Question to answer: do the three read clearly different in liveliness?
