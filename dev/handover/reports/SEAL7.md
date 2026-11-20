# SEAL7 — Thái hậu seals: units 8–10 clips + bé gái «sợ» OUT + VN captions + de-dup list — worker of Foreman C ROOT-60
depth 4 · START_CTX ≈ 4.5 % of 1M (get_session read 0 → own estimate) · roll line ≈ 29.5 %, ceiling 60 % · successor of SEAL6.

## DONE (20/11 00:40–01:10Z) — all on CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-groups/
- Seal gate (A24): `seal_gate.py --builder groups/th_prompts.py act-hon … act-vui` → 50 prompts, 0 FAIL, PASS before any call;
  bé gái: `seal_gate.py --kind out` on `grp_set_prompts.py bg so` out → PASS. Every clip prompt = builder text word for word (no prompt diffs).
- Unit 8: th-act-hon, th-act-hothen, th-act-hungkhoi, th-act-khochiu → **th-u8-preview.mp4** (63 s)
- Unit 9: th-act-lo, th-act-so, th-act-tinhnghich, th-act-tinhtu → **th-u9-preview.mp4** (64 s)
- Unit 10: th-act-tutin, th-act-vui → **th-u10-preview.mp4** (32 s)   (dau2 NOT made — waiting for ROOT-60's wording word)
- Frame sheets th-act-<k>-frames.jpg for all 10 (now with a Vietnamese title row).
- Bé gái «sợ» OUT made (the SEAL3 classifier block did not happen this time) → bg-so-out.webp + bg-so-frames.jpg; **bg-set-preview.mp4**
  re-cut with all 10 bé gái seals incl. bg-so (150 s).
- B keyframes of units 9–10 looked at (contact sheet): all 6 OK. act-tutin B came back RGBA transparent → flattened on #00FF00 and uploaded
  (th-act-tutin-B-green, 9ZHahCdNYZ) and used as keyframe. act-so B background is a slightly darker green (keyed fine).
- Captions with accents (owner): new `groups/th_names.py` (key → «Thái hậu · Hành động · Sợ», an → «Ẩn – chưa rõ tâm trạng», binh → «Bình thường»,
  dau → «Đau lòng», bg-/hh- prefixes → Bé gái / Hoàng hậu). th_sheet.py draws it as a title row; th_preview.py draws it under every seal.
  Already-uploaded older sheets/previews were NOT rebuilt (only the ones above have captions).
- Credits SEAL7: 31 clips × 940 = 29 140 (+1 upload, free). Ledger 31 lines. Balance (shared pool) 146 024 → 92 956 at 01:05Z (other workers too).
- OUT trims (first second still): act-hon 0.8 s, hothen 1.2, hungkhoi 1.2, lo 1.0, tinhtu 0.9, tutin 0.7, vui 1.2, bg-so 1.3.

## A27 LABEL ON THE PICTURE (ROOT-61 01:00Z) — applied to the WHOLE Thái hậu set (no gens)
- th_sheet.py: title row 40 px «Thái hậu · Hành động · Sợ»; th_preview.py: two big lines under each seal (line 1 rank «Thái hậu», line 2 emotion, 38 px, shrinks to fit).
- Rebuilt from the CDN clips: th-<k>-frames.jpg for ALL 38 Thái hậu seals; **th-set-preview.mp4** = the whole set in one file (38 seals, 612 s, 110 MB,
  order gian vui buon so an binh dau ghen lo muu tutin hanghai tinhtu chuyentam hungkhoi tinhnghich hothen chan khochiu choang hon act-… ×17);
  th-u8/u9/u10-preview.mp4 and bg-set-preview.mp4 + bg-so-frames.jpg rebuilt with labels. Older unit previews th-u1…u7 NOT rebuilt (unlabelled — use th-set-preview).
- Foreman now ROOT-61 (session_01PEhRbxPG7XXXVSg4KgDLkW).

## FAULTS (looked at every frame sheet; NOT redone — A20/A21/777)
- act-tinhnghich BACK: she turns FULLY AROUND mid-way (frames ~33–45: back of head, bun, crown from behind, dragon on her back) — worst fault.
  LOOP 15–28: oversized pointing hand + folded paper snake thrust at the viewer; OUT 23–28 the snake reaches the picture edge.
- act-hungkhoi: OUT 24–51 + LOOP 13–54 a big purple/teal ink-swirl ring circles the whole medallion and reaches the picture edges; BACK a dark ink curl lingers lower right (0–20).
- act-tutin LOOP 30–50: a large pale-yellow sparkle halo bursts round her, sparkles reach the edges; scroll shows its blank back briefly (10–18).
- act-hon LOOP: her arm/sleeve touches the picture edge (frames 7–39). Otherwise clean.
- act-khochiu LOOP: small yellow anger marks at the rim touch the edge (13–29); BACK finger at the edge 2 frames.
- act-so LOOP: she ducks fully under the quilt twice (only the crown shows, 3–19 and 50–56); BACK sinks low mid-way. Reads as hiding; no edge.
- act-hothen: very small motion (barely leaves the medallion). Clean.
- act-lo, act-tinhtu, act-vui: clean.
- bg-so OUT: arms flung wide to both sides at the jolt (hands touch side edges 2 frames), then hands to mouth. Reads as fright.

## DE-DUP LIST (owner Lượt 803 — LIST ONLY, nothing changed in th_prompts.py) — Thái hậu pairs that can read alike, strongest first
1. hờn ↔ act-hờn — same plum-wine disc AND same face (chin up, eyes closed, head turned away); only palm-out vs arms crossed differs.
2. ẩn ↔ mưu ↔ tinh nghịch — all three a sly/winking face with a finger at the face (ẩn: wink + finger at lips 'shh'; mưu: side-glance + finger at chin + smirk; tinh nghịch: wink + tongue + finger at cheek).
3. mưu ↔ act-ghen ↔ ghen — side-glance + raised brow + smirk/sneer; mưu teal disc vs act-ghen jade-teal store (made warm amber) vs ghen yellow-green.
4. buồn ↔ act-buồn ↔ đau lòng (+ dau2) — all blue discs (pale / light / deep blue) with a tear; act-buồn adds the handkerchief, đau lòng the hand on the heart.
5. tự tin ↔ act-tự tin — same amber-gold disc, same proud chin-up smile + sparkle; only the scroll differs.
6. tình tứ ↔ act-tình tứ — same rose-pink disc, coy/wink + one pink heart; only the invitation card differs.
7. sợ ↔ act-sợ — same lavender-purple disc; act-sợ's quilt makes it different, sợ = hands at mouth.
8. lo ↔ act-lo ↔ tự tin ↔ act-ghen (as made) — four orange/amber discs (orange, orange-amber, amber-gold, warm amber).
9. vui ↔ hăng hái ↔ hưng khởi ↔ act-vui — big happy open smiles on warm discs (yellow / coral / orchid / bright yellow); hưng khởi has the star, hăng hái the fist.
10. chán ↔ act-chán, khó chịu ↔ act-khó chịu, choáng ↔ act-choáng, chuyên tâm ↔ act-chuyên tâm — same disc each; gestures differ clearly (hoop, scolding, blank stare + cloud, book + candle).
11. Sweat-drop cluster: lo, sợ, khó chịu, hổ thẹn, act-hăng hái all carry one sweat drop.
12. Calm cluster: bình ↔ chuyên tâm — soft closed mouth, calm eyes (sage green vs cream-beige).
(Act faces share their mood's disc by design — the owner decides whether that is wanted.)

## Recipe notes for a successor
Same as SEAL6/SEAL1 handover. img/ is gitignored in this checkout and empty at start → download any older webp from the CDN before building
a set preview. My helpers were scratchpad-only (proc.sh = download + th_cut + move .npy + edge check; edge.py).

## FEELING-SEAL AUDIT (owner ruling ~02:05Z via ROOT-62: feeling seals = face + light posture only; HĐ seals = deed with object) — 0 cr
Method: every group uses the SAME per-emotion wording (th_prompts.py / th-gian.md; hh_prompts, grp_set_prompts, grp_gian/sg2/sg4 swap only
the person block), so the verdict is per emotion and holds for every group that has it. Checked the B + LOOP wording of all 21 feeling
seals + a grid of the Thái hậu mid-LOOP frames (looked at). Common to ALL: B = "she bursts OUT of the medallion … both arms come forward
over the rim" — the burst itself is a big body move; toning down could also mean "leans out a little, hands rest on the rim".
Groups that have each emotion (on CDN): th + hh = all 21 (hh no dau yet); bg / bt / mm = giận + vui buồn sợ ẩn bình ghen lo mưu tự tin hăng hái;
pt ptl ht htg tg tv = giận only.

| emotion | verdict | what it acts out (B / LOOP) |
|---|---|---|
| giận | **ACTS OUT** (worst) | raised clenched fist shaken, shouting/scolding, steam — owner named it. ALL 13 groups. |
| hăng hái | **ACTS OUT** | both fists pumped up and down, bouncing |
| chuyên tâm | **ACTS OUT** | holds and reads a book, turns pages (prop deed; same as HĐ·chuyên tâm book) |
| ghen | **ACTS OUT** | tugs and bites a pink handkerchief (prop deed) |
| khó chịu | **ACTS OUT** | tugs collar + fans her face quickly, squirms |
| vui | **ACTS OUT** | waves both hands, claps |
| tinh nghịch | **ACTS OUT** | pulls eyelid 'bleh', tongue out, waves hand, wiggles head |
| ẩn | ACTS OUT (medium) | finger 'shh' at lips + hand parting the grey mist |
| hổ thẹn | ACTS OUT (medium) | both hands cover cheeks, hides/peeks through fingers repeatedly |
| lo | ACTS OUT (medium) | wrings hands, nibbles fingertip |
| mưu | ACTS OUT (medium) | taps chin, drums fingers on the rim |
| hưng khởi | ACTS OUT (medium) | finger raised high and wiggled, bouncing, big star |
| sợ | light-medium | both hands up at mouth trembling (gesture, but reads as feeling) |
| tình tứ | light-medium | hand on cheek + twirls a lock of hair |
| bình | light | small friendly wave |
| tự tin | light | hand on chest, small proud nod / pat |
| choáng | OK (face/light posture) | hand on forehead, sways |
| buồn | OK | chin resting on folded arms, sigh, tear |
| chán | OK | cheek on hand, lazy finger drum |
| hờn | OK | arms crossed, chin up, turned away |
| đau (old th-dau) | OK posture, WRONG feeling | the made th-dau is open-mouth sobbing (looks like crying) — that is why the owner asked for dau2 |

### Proposed SAMPLE (one group: Thái hậu; 2–3 worst) — NOT made (seal HOLD on)
th-giận, th-hăng hái, th-chuyên tâm redone as STILLS only (no clips), toned down:
- giận: furious face (knitted brows, glare, flushed, tight mouth), both hands resting tense on the rim, one small steam puff — no fist, no shouting.
- hăng hái: bright determined eyes, big eager smile, shoulders lifted, hands resting on the rim — no fist pumping.
- chuyên tâm: calm focused eyes looking steadily ahead, lips pressed, chin resting lightly on one hand — no book (book stays only in HĐ·chuyên tâm).
Cost: A still 135 + B still 135 per seal → 3 × 270 = **810 cr** (A only: 3 × 135 = 405). Prompt change = the B pose clause (+ A face line) only;
the rest stays word for word (A17 diff listed when made). Gate + label as usual. Owner picks before any clip.

## HANDOVER (SEAL7 at ≈ 26 % context, roll line ≈ 29.5 %) — for the successor; the COORDINATOR (ROOT-62) opens it
- Seal HOLD on (owner "Khoan vẽ tiếp ấn" ~01:30Z): no gens until ROOT-62 relays her word.
- Waiting work: (1) the feeling-seal sample above (810 cr) if she says go; (2) L870 fix list (ROOT-62 msg ~01:28Z): th tình tứ 3 hands,
  dau2 clips (A O6Et0g2ynm / B hu29sg9vqL, B not looked at yet), th chán fan cut at bottom, HĐ ghen / hổ thẹn / lo / tình tứ / vui redo as clear
  deeds with an object (est. 20–24.5k) — only when HOLD lifts.
- Recipe: SEAL1 / SEAL5 handovers + this file. img/ is gitignored and empty in a fresh checkout: curl the needed webps from the CDN first.
  Captions/labels: groups/th_names.py (A27), th_sheet.py / th_preview.py draw them. Gate: seal_gate.py before every call.
