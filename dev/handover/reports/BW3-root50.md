# BW3 — ROOT-50 jobs (owner Lượt 543 / 559 / 551 / 570): ma ma one ref, Quý nhân t3 option B, B8 face words

depth 3 · START_CTX ≈ 4 % (get_session used_tokens read 0; my own estimate) · builders only, NO generations

## 1) Ma ma ONE reference (owner Lượt 543 "Chỉ dùng một hình")
BW2 had already landed it in **a227772** while I was working on the same edit (my identical edit was dropped in the merge; BW2's version keeps "RECOLOUR", so fewer words change).
With `--noflower` (MMX3's flag) or `--oneref`: no "exactly the cut of image 2", no "take ONLY the cut from image 2", no "do not copy the brown of image 2", MAMA_IMG3 sentence dropped (the outfit text keeps TWO front panels / hai tà, S32). `--refs` = image 1 only.
Checked: m05 a36/a51/a65 → STORE CHECK PASS, 0 "image 2/3". MMX3 told (send_message).
Left in place (not asked): MAMA_HAIR "…the style reference image must not influence her hair." still names a style image that is no longer sent.

## 2) Quý nhân t3 = option B v2 (G15, owner Lượt 559)
- `check_store.py`: `G15_T3_OLD` (old t3 design words) + `G15_T3_OPTB` = the Outfit words of dev/handover/reports/quy-nhan/m13_a26_t3_v2_optB.prompt.txt **verbatim**, with slots only: lilac → {main}, deep teal → {sec}, wisteria → {motif}. `g15_t3()` does the swap.
- `store-all/build_all.py` `_t3_slot` (rank 3 only, after the secondary slot): main = her TWO-COLOUR main, sec = `secondary()` (the same as the TWO-COLOUR sentence), motif = her own t3 motif that the store already used. Only the t3 outfit-design words change; everything else in the t3 prompt is the same.
- Gate: store_check now **requires** the option-B words at t3 (main/sec can be any words, motif = the store's). Negative test: an old t3 prompt (m07) → FAIL "G15 Quý nhân t3 option-B outfit words missing".
- m13 a26 rebuilt: the Outfit part matches the optB file word for word (only GRACE/pose draws and the D9 line differ, as they should).

**G16 grep (round neckline/collar), NOT changed:**
1. `dev/art/t8-prompt-B/build.py:1029` nữ quan (tm4): "…rank badge (buzi) of a crane and clouds on the chest, **round collar**, neat embroidered borders…", used by the live tm4 builder.
2. `dev/art/owner-copy/mk_princess_v4.py:6`: Ba Tư t1 V4 "…with a **high round neck**…". This is an older generator; the current pr_bt_t1_V6.txt says "(never a round or high round neck)".
3. `dev/art/owner-copy/princess_nc3_NANZHAO.txt`: "…silk blouse with a **small round collar**…". This is a static prompt file; no builder reads it.
4. pr_bt_t1_V4/V5.txt: static, older versions.
None of the t1–t8 thường phục outfits (store + build_all) say round neckline/collar.

## 3) B8 face words + refusal (owner Lượt 543/551)
- `t8-prompt-B/build.py` (end of the data part): every person with KC_REFS `m09_ok yes` + real face words gets `DATA[id] face = face_words` without the leading "Her face: " and the final "." Every builder writes `Her face: {face}.`, so the line becomes the KC face words **verbatim**, including their "Expression: …" sentence. This covers t1–t8, t7, ma ma, tm states, Nữ đế, trieu…
- **Refusal**: build.py CLI exits **2** for a person id (cNN/mNN/pNN/ncN/bdN) that is not drawn (KC m09_ok NO), with `REFUSED <id>: NOT drawn (ART_RULES B8 …)`. `--golden` (frozen A/B reproduction) is exempt. build_all: `build()` raises NotDrawn, the CLI exits 2, and `--check` counts the person as HELD.
- **nc1–nc3** (owner Lượt 570, ROOT-50 patch): moved into the OK list in `kc_refs_build.py` (as its comment asked). face_words = the "Her face: …" sentence of `_retired/face-common/ncN.v2.FULL.txt` (prompt_file path fixed: the file is in _retired). KC_REFS rebuilt: only the nc rows changed. Now 55 ok / 38 not drawn (c01–c32, p01–p03, bd1–bd3).
- Gate fix: the owner's verbatim face words tripped two BANNED rules. **m13** "long PHOENIX eyes" (eye shape) tripped X08 phoenix-at-t1–t6, and **m43** "the lips fully pressed together and covering the teeth completely" tripped X11. check_text now leaves the exact KC face_words strings out of the BANNED scan only; outside them, bans still fire (negative test: "mouth open showing teeth" → FAIL).
- Verified: 52 m × 7 modes (t1, t3, t6, t7, t8, ma ma a36 one-ref, tm1) all contain the KC face words verbatim; all 38 not-drawn ids refused (exit 2) in every mode (266 checks). nc1–nc3: ma ma builds; rank modes crash with KeyError/ValueError, as they did before (nc was never in the rank tables).

### Side effects for ROOT-50 (LAW #0: flagged only)
1. **MMX3 c-id ma ma** (c06…c26, p01–p03, bd1–3 in mama-specs) can no longer be rebuilt (refused). MMX3's current queue is m01–m52 + nc1–nc3, so this matches.
2. The face line changed for **every m** prompt (it used INDEX_m.md words before, now KC v3 words + Expression sentence). Pictures already drawn are not redrawn.
3. `build_all --samples` uses c06/p01/p03, so it now stops with NotDrawn.
4. Men (emperor-B), build_npc and nude-B were not touched (men are not in KC; nude-B already uses kc_ref).

## Gate results (after all 3 jobs)
- `check_store.py --self`: 35 sentences, 14 banned, 0 problems.
- `build_all.py --check` a18/a26/a36/a51/a65: **0 FAIL ×5** (416 drawn prompts each; 312 HELD = not drawn). Job 2 alone, before job 3: 728 ×5, 0 FAIL.
- Samples (exact builder stdout, STORE CHECK PASS): `dev/handover/reports/bw3-samples/m07_t3_a18.prompt.txt`, `m20_t3_a18.prompt.txt`, `m05_mama_a36.prompt.txt` (`--nostyle --twocol "deep teal" --noflower`; also BANNED REF PASS).

## HANDOVER line
BW3 done (push + report). Nothing open except the notes above. Successor not needed.
