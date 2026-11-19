# SEAL GROUPS MASS — mood-seal sets per person group (owner GO Lượt 719, relayed by ROOT-56 22:01Z)
Owner (verbatim, via ROOT-56): "Hình video của Thái Hậu ok rồi. Tiếp tục làm những người khác đi. Làm hàng loạt luôn đi."
Orders: MAIN ROOT-70 15:40Z + 17:00Z + 17:10Z (dev/handover/FOREMAN_C_STATUS.md; owner words dev/OWNER_DECISIONS.md 19/11 ~15:35Z/~17:00Z/~17:10Z real).
APPROVED SAMPLE = Thái hậu «giận»: CDN img/_review/emo-anim-groups/th-gian-*.webp, recipe + prompts + ids dev/art/emo-anim/groups/th-gian.md.

## Recipe per seal (copy th-gian exactly; only person/feeling words change)
1. Keyframe A (gpt-2-6, 1:1, 2k, green #00FF00, NO transparentBackground). Reference image = that GROUP's approved A (for Thái hậu: eIPl4i6dqL)
   so every seal of a group is the same person; for a new group, the first seal (giận) is painted from the women giận still
   (img/kit/emo-gian.webp, 640 px) like th-gian §1, LOOKED at, and becomes the group's reference.
2. Keyframe B (gpt-2-6, ref = A): bursts out over the rim, BOTH hands act the feeling (hands/face/mark table: dev/art/emo-anim/prompts.md;
   act faces: dev/handover/research/feelings-18-model.md "ACT LIST + FACES"). If B comes back RGBA transparent → flatten onto #00FF00 and
   upload (ROOT-56 did this for th-gian: s7IMhSkl8e).
3. Seedance 2.0 Fast (bytedance-seedance-fast-2.0), 4 s, 1:1, 720p, no sound, keyframes only: OUT A→B, LOOP B→B, BACK B→A (prompt
   templates th-gian.md §3). video_view_frames on every clip; redo a bad one once.
4. creations_register_download → curl → cut with `python3 dev/art/emo-anim/groups/th_cut.py out|loop|back in.mp4 out.webp [start_s]`
   (un-mixes against the real screen ≈ #00E406; OUT may need a manual start when the first second is still). Loop 1 + bg 00000000 for
   -out/-back, loop 0 for the LOOP file, 288 px, 15 fps. Still = A cut to 160 px (snippet: see th-gian.md RESULT / CP1 session).
5. Names: img/_review/emo-anim-groups/<prefix><k>-out.webp, <prefix><k>.webp, <prefix><k>-back.webp (+ still/<prefix><k>.webp).
   Upload with `python3 dev/site/cdn_sync.py img/_review/emo-anim-groups`. Do NOT promote to img/kit (main's mapping worker decides).
6. LOOK at every frame (frame sheet: every frame on alternating light/dark rows) before upload. Per group: frame sheet(s) ≤ 600 KB JPG +
   preview MP4 (OUT + LOOP×2 + BACK per seal, light bg) → send to Foreman C. One ledger line per gen in dev/art/gen_ledger.jsonl
   (append-only; on merge conflict keep BOTH sides).

## The 38 keys per set (same as img/_review/emo-anim-mass women set)
feelings (21): an binh buon chan choang chuyentam dau ghen gian hanghai hon hothen hungkhoi khochiu lo muu so tinhnghich tinhtu tutin vui
act faces (17): act-buon act-chan act-choang act-chuyentam act-ghen act-gian act-hanghai act-hon act-hothen act-hungkhoi act-khochiu
act-lo act-so act-tinhnghich act-tinhtu act-tutin act-vui
Disc colour per key = the women set's disc (look at img/_review/emo-anim-mass/<k>.webp).

## Groups (owner priority) — prefix proposal
(a) th- Thái hậu: old face, LARGE phoenix crown, royal yellow #EFBD69 robe + deep plum #6E3A5E collar (as th-gian) — 37 left
(b) hh- Hoàng hậu: large phoenix crown, red/gold (RCOL t8 #f0d070 → per B21 royal yellow + her red; state the hexes in the prompt)
(c) pt- phi tần trẻ: MUST read as a consort, not a maid (crown/pin tier by rank, hairpins denser with rank). Rank robe colour = RCOL hex
    from dev/build/j1.js straight in the prompt (17:10Z; no recolouring). Owner 17:00Z: one consort set reading clearly as consort is the
    base; per-rank robe colours = one set per rank colour if credits allow — ASK the foreman which (credit math below).
(j) bg- bé gái < 14, (k) bt- bé trai < 14: must look like CHILDREN (not the adult women/men sets)
then (d) ptl- phi tần lớn tuổi, (e) mm- ma ma / cung nữ già, (f) ht- Hoàng thượng trẻ (dragon robe, crown), (g) htg- Hoàng thượng già
(dragon robe, beard), (h) tg- thái giám (eunuch hat, no beard), (i) tv- thị vệ (helmet/armour).
Royal yellow (B21): Thái hậu, our công chúa, hoàng tử, vua (Hoàng thượng), vương gia, Nữ đế, consort ranks t6–t8 wear #EFBD69 with their
own colours; foreign princesses never.

## CREDITS (checked 19/11 22:03Z): available 538 731
≈ 3 090 cr per seal (+135 per redone keyframe) → ≈ 117 k per 38-seal set, ≈ 114 k for Thái hậu's remaining 37.
All 11 groups ≈ 1.29 M = MORE THAN AVAILABLE. Fits: (a)+(b)+(c one set) ≈ 348 k; + (j) ≈ 465 k; (k) does not fit after that.
→ Foreman must tell the owner before (k) and the rest (or she tops up). simulate_cost per batch.

## Organisation (from ROOT-56): one worker session per group (or half-group), each with this brief; the coordinator checks every sheet.
Children: create_session, clone_depth 1, blob_limit_kb 300.
