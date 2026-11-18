# REVIEW — review/emotion-acts @ e9bd51ee → review/emotion-acts-r1 (reviewer, Foreman B)

Verdict: **FAIL** (one spec gap, numbered below). Merge + small fixes are pushed and reusable: **review/emotion-acts-r1 @ af2e5ce5fa928abc3677bbd808268ba0b3353846** (descends from origin/main 50299942). The worker should continue ON this branch.

Spec: OD "16/11 13:08Z", "16/11 13:25Z" (B), "16/11 13:50Z, s17 chat" (3); FOREMAN_B INBOX 13:08Z s16, 13:30Z s17, 14:15Z s17.

## Merge onto origin/main 50299942
- Conflicts: assets.json, index.html, sw.js (rebuilt), dev/build/jbal2.js (main's kept: BAL.mood is already on main via merge-train-8, BAL.ea lives in jemoact.js), dev/build/assemble.py (main's list + `jemoact.js` last, as on the branch). Site rebuilt (build_site.sh, media-check 0).

## Small fixes made on r1 (af2e5ce5)
1. Her outburst frame said "Vì ${why} quá mà **ra nông nỗi**; lần sau nên…" for EVERY feeling, also joy (Ban thưởng cung nhân, Bày tiệc trà…) — reads as a punishment, against OD 13:50Z (3). Now neutral: "Vì … quá nên lòng không giữ được; muốn tránh thì nên giữ lòng bình thản từ sớm."
2. Result line ended with "." which the kit chip renderer put INSIDE the last chip ("tâm trạng -10."). Dot dropped in the three past lines (outburst, others' outburst on her, extreme mood).
3. Hỏi tội: "Tạ lỗi, đền bạc" was HIDDEN when bạc is short; now always listed and greyed by the kit's own poor-option rule (j3 showModal), like every other bạc option.

## Checks — OK
- Emotion act cards: kit act cards (same objects as j76 standing cards, kitActArt + KIT §6.1 group labels), only in the matching mood band, max 2, giận Đập đồ / Mắng cung nữ (pick maid = kit event choice), buồn Khóc thầm / Viết thư nhà, vui Đàn hát tự thưởng, căng thẳng Thắp hương cầu an; each gain AND loss. Numbers BAL.ea; scan of every Vietnamese string literal in jemoact.js: 0 typed numbers, no %.
- Extreme mood ≥ BAL.ea.ext.wk (3) tuần: buồn/ghen Tâm bệnh, giận lỡ lời Danh −, vui tự mãn (ghen ×1.5 for 4 tuần), căng thẳng Chứng mất ngủ (extra). Player + consorts + servants.
- Forced outbursts by temper (EA_REACT): timid never Đánh / Mắng cung nữ cung khác / Phạm thượng / Châm chọc / Khoe; hot may; Phạm thượng never under cấm túc. Positive ones exist (Ban thưởng cung nhân, Bày tiệc trà, Ca hát, Khoe). Hers = kit event frame, only "Tiếp tục" (no damage control).
- Hỏi tội for scolding a higher-rank mistress's maid (next tuần, 3 answers), and two-way (lower-rank consort scolds her maid → Sang hỏi tội / Bỏ qua).
- Kit only: no CSS/style/class in jemoact.js; event choices use kit hint lines (jevb/kitHint, same as every event); greyed answers = kit disabled option. KIT REQUEST: none needed.
- Old save without S.ea loads (test case oldsave).
- Audit list (5) present in the report/PROGRESS; generic hold-back/hit-back lock built, with dead-end guard.

## Tests (r1 build)
- `node dev/test/emotion-acts.js` 10 cases × 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844: **PASS**, 0 page errors, 0 page/dialog overflow; rerun after fixes at 755x1000@2 + 844x390: PASS. Looked at the shots: cards, event frames, hỏi tội, greyed "Nhịn", Tâm bệnh, 390x844 rotate prompt. (Blank pictures in some first-load shots = load timing; checked at 1180x820: all act pictures load, naturalWidth 384.)
- Life bots (runb.js sens, inpage6, HHSTOP, INP2 inmood+inemoact, cap 3300 s), same r1 build, ON vs OFF (`window.__eaOff=1`):

| arm | lives | HH | early death |
|---|---|---|---|
| ON | 15 | 0 % | 40 % |
| OFF | 14 | 0 % | 43 % |
Together with the worker's n 27 / 32 (4 % vs 0 %, 52 % vs 47 %): no measurable change; emotion-acts does NOT make HH reach or early death worse. Her outbursts / 100 tuần by temper (ON): timid 0.24–0.40 · even 1.4–2.7 · hot 2.7–3.3.

## FAIL list (for the worker)
1. **Men (and the two elders) — OD 13:08Z "cho tất cả NPC, nam và nữ", INBOX 13:08Z (3) "their consequences hit them and show in the log/events".** In jemoact.js men / officials / children (eaKind "m") only have the `self` reactions: an outburst just lowers their feeling (no gain/loss, no log/news line — newsAdd is called only for kind "c"); their emotion acts (act band) only vent, no price; their extremes: giận / vui do nothing, buồn / sợ only set `p.ill` (no visible trace). Emperor (kind "e") extreme giận / vui and Thái hậu (kind "t") extreme giận / vui / buồn effects are empty too. Bots (ON, 15 lives): m:self outbursts 79, m:buon extremes 50, e:gian extremes 31 — all invisible and consequence-free. Needed: for every NPC kind, each outburst / act / extreme gets a real gain + loss on that person (e.g. officials: favour / standing with the court, Emperor: mood toward consorts or a court decision, eunuchs/servants: Lòng) and a line the player can see when seen (news / Sổ ghi, kit lines only), numbers in BAL.ea.
2. (minor, same round) INBOX 13:30Z says "list them in your report AND build them": the two audit rows marked NOT built (pillow-talk answers by mood, temper-coloured quở trách wording) — build them or have the foreman record they are dropped.
