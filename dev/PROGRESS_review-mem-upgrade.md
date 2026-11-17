# PROGRESS — review/mem-upgrade (Foreman D item (1) MEMORY UPGRADE + ONE LEDGER part (b) CAUSE ledger)

Owner words (verbatim, dev/OWNER_DECISIONS.md, handover branch): 16/11 13:25Z (A) "có người thì ký ức phai nhanh, có người thì ký ức phai lâu, có những
cái sự kiện là sẽ nhớ cả đời … ảnh hưởng tới cái cách hành xử của một nhân vật đối với một nhân vật"; 16/11 13:40Z ONE LEDGER: "every action (scolding,
quarrel) must have a recorded REASON (an earlier conflict etc.), never spontaneous … hidden from her but kept by the game".
Base: origin/main e9c6021d (merge-train-6, D26 jmem LIVE). Code: `dev/build/jmem.js` (EXTENDED, no second memory system). Numbers: `BAL.mem`, `BAL.hook` (end of `jbal2.js`).

## LUẬT ƯU TIÊN SỐ 1 check (16/11)
`git ls-remote` review/*: memories, memories-r1 (both in main), emotion, mood-bar(-r1), mood-dialog(-r1) — none holds per-person fade, lifelong memory,
memory-driven NPC choice or a cause ledger. Reused, not copied: jmem store/API, PERS + traitsOf/persW/persF (j28), danger/bandOf/BANDS (j24/j28),
mindMenu/npcAct (j40), npcSocial/SOC (j28), pickTarget/hostility (j8/j9), punish (j8), servAct/bribeServ/threatServ (j10/j29), FAILRX (j40),
jcoopworld mapMe/REFF ("by"/"to" values and "me" keys are mapped per player), PROTOCOL.md §4 merge3. Existing oan fade by PERS.forgive (j28 oanMonth) kept.

## What was built
1. STORAGE (co-op: state only, host authority, same both sides). Her memories stay in `S.mem["me|<about>"]` (personal). Every other holder keeps its
   memories ON ITSELF: consort `v.mem`, Emperor `S.emp.mem`, Thái hậu `S.thO.mem`, servant `s.mem` (key "s<sid>") = `{<about>:[records]}` → world state,
   synced through W.R / W.S; jcoopworld maps the key "me" to the player id. Old saves: `S.mem["<holder>|<about>"]` of non-her holders move once (memMig, S.mem._v=2).
   Per-holder cap `holderCap` people (weakest pair pruned; her and lifelong last).
2. PER-PERSON FADE: monthly loss = `fadeMo × Π fadeT[trait][good|bad] × (1 ± fadeJit·hash(id,name))` (≥ fadeMinK). Thù dai keeps grudges (×.25),
   Trọng nghĩa keeps kindness (×.4), Hiền lành lets wrongs go (×1.8), Tham vọng forgets favours (×1.6); servants and the Emperor's traits too.
   Deterministic (no dice) → host and guest fade the same.
3. LIFELONG: `m.L=1` when the deed is in `BAL.mem.life` (poison, musk, kidharm, pardon, frame, takeaway, gifttaint, demote, srvshield, rescue), when the
   weight ≥ lifeMin (60), or an event relation swing ≥ lifeRel (30). Never fades; own cap lifeCap (3) per pair, never pushed out by small ones.
   Shown with the existing kitRows: fade word "khắc cốt ghi tâm"; quote tails "Ơn ấy ta nhớ suốt đời." / "Mối hận ấy ta mang theo suốt đời."
4. MEMORY-DRIVEN BEHAVIOUR (all numbers BAL.mem):
   - target choice: hostility − memMod (D26, unchanged);
   - danger: worst bad memory × memDanger (× lifeDanger if lifelong, ≤ dangerMax) keeps the will to harm after Oán fades (Hiền lành harmGate kept);
     good memories ≥ goodGate (and > the worst wrong) cap danger below band 1 → a person who owes her a big kindness never harms her (OD:L35);
   - revenge in kind: NPC mind act weight × (1 + g/mirrorDiv) for acts like the remembered wrong (MIRROR table);
   - everyday dealings (npcSocial re-done with memory): target pull 1 + |memory|/socDiv; kind acts × (1+good/socK) toward a friend, hostile acts toward a foe;
   - servants: bribe odds read loyalty ± memMod × srvLoy (memory of the mistress vs of the briber).
5. CAUSE LEDGER (same jmem ledger family as the hooks; hidden from her). Record `{w,dt,q,by,to,a,n,d,x,s,r,y:{k,c,d,x}}`, stored on the world side
   (target NPC/Emperor/Thái hậu/servant, else doer, else her `S.hooks.cz`), ≤ czMax per holder; ids `c<seat><turn>.<n>` (unique across co-op seats).
   Reason kinds: tra (retaliation; the doer's memory points to the earlier record m.c), on (repaying a kindness), mem/nho, ghen, oan, ghet, ngo (belief),
   nong (temper after a slight), tv (ambition), than, net (nết), toi (stated offence), su (inside an event), lenh, chon (her own choice).
   Only what the doer KNOWS (a memory) can make a retaliation. Every memory written by an act carries `c` = its cause id.
   API: `causeAdd(by,to,act,{s,n,d,x,r,y})`, `causeWhy(by,to,s)`, `causeQuery({by,to,who,a,since,s,limit})`, `causeGet`, `causeText`, `causeLine`,
   `causeLog(filter)` → lines for main ("who did what to whom, why"), e.g. `causeLog({to:"me",limit:10})`.

## LUẬT SỬA CẢ NHÓM — every act family between two people (scan of the code paths)
| # | family | entry point | memory before → after | cause after |
|---|---|---|---|---|
| 1 | schemes / acts (ACT: spy rumor frame poison accuse bribe block plant steal musk kid acts takeaway trip vp huydung giahoa tat phatquy rash trinhth trinhhh banphe uyhiep …), her↔NPC, NPC↔NPC, co-op her↔friend | runAct | seen only → same (+cause link) | ALWAYS (hidden), result ok/fail |
| 2 | gifts (incl. NPC↔NPC, to the Emperor; tainted = hostile) | giveTo | yes → yes | yes |
| 3 | her Hoàng hậu powers (reward pardon cutpay conf judge) | empAct | yes → yes | yes |
| 4 | talk options (secret care apology humble provoke vent, press with a secret, recall) | talk | yes → yes | yes (every option) |
| 5 | nợ-ân favours (helped failed exposed) | q72End | yes → yes | yes (reason = the quest) |
| 6 | event choices with a big relation swing | chooseM + relAdd | yes → yes (+lifelong if ≥ lifeRel) | yes (reason = the event) |
| 7 | everyday dealings: help visit warn mediate provoke humiliate spy ally drop night-steal feign apologise test | SOC[k].run (npcSocial) | NO → yes | yes |
| 8 | the Emperor's cấm túc / giáng | punish | NO → yes (giáng lifelong) | yes (reason = the stated offence) |
| 9 | her servants: thưởng / phạt / che chở | servAct | NO → yes (che chở lifelong) | yes |
| 10 | buying / threatening a servant (any doer) | bribeServ / threatServ | NO → threat yes | yes |
Not wired (no target person, or another worker's part): SOC flaunt/gossip/pray/check/bribeksp/serveTH/follow (no single target); deathSentence;
the Emperor's rewards / nights; Thái hậu scoldings; the cung-nữ road (mistress → her, j42) and the tiểu thư road (jkc family); forced emotion events
(item (B), other worker: call causeAdd + read memTop); item theft / confiscation (item ledger worker (a): call causeAdd so both ledgers agree).

## Shown (KIT FIRST)
No new component, no CSS. Only text inside the existing person-card kitRows / quote line: fade word "khắc cốt ghi tâm", the lifelong quote tails,
14 new deed phrases (cổ trang, no %). The cause ledger is NOT shown (hidden per OD 13:40Z) → QUESTION 1.

## Tests (16/11, build = this branch)
- `node dev/test/mem-upgrade.js <url> <out> 755x1000@1,1180x820@1` → ALL OK (29 checks per size + card block "Kỷ niệm" with "khắc cốt ghi tâm", no overflow, no page errors).
- `node dev/test/mem-coop.js <url>` → ALL OK (host + guest act on one NPC, merge3 per PROTOCOL §4, both rebuilt views see the same memories/causes from their own side, fade identical).
- `node dev/test/memories.js` (D26, fade checks updated: per-person rate; poison is lifelong so the keep-floor check uses "judge") → ALL OK.
- coop-e2e (live Worker) 59 ok / 0 FAIL. coop-world: 3 FAIL ("each sees the other", "A sees B in the garden", "both see each other") then a whereOf crash — IDENTICAL on main e9c6021d (pre-existing, not this branch).
- trong-check (old save → new build) OK, no errors. evtruth-bot 2 lives OK, no errors (cylie deeds also on main).
- Measure `node dev/measure/mem-behaviour.js <before> <after> 6` → table in dev/handover/reports/mem-upgrade.md.

## Resume notes
Serve `dev/` with a UTF-8 charset header (plain http.server breaks the page). `BAL.mem.pairCap` is no longer read (holderCap replaces it).
