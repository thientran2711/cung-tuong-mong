# DUYET A — baseline whole-game seam audit

- Role: DUYET A (seams); chat identifier: `7b6ad9e1`.
- Queue item: `main__62a0506a`.
- Audited branch/head: `main 62a0506ac2d7124e0689f648bea62979315c21d2`.
- Current-main cross-check and report base: `17e8fc0382027e20ed7b80fa884ed38ef29e7817`.
- Date: 2026-11-15 UTC.
- Model: Codex (GPT-6-based runtime; exact model-routing and thinking-setting controls are not exposed).
- Verdict: **BLOCKED — four blocking findings**. All four remain present in the current-main cross-check. Findings are recommendations for the coordinator, not changes to canon.

## Authority and scope

The owner explicitly requested the DUYET A / claims / report-PR workflow in this run. That instruction controls this run despite main's newer weekly-only AGENTS.md and CLAUDE.md. The queued commit's AGENTS.md §§4–7 supplies the requested audit/report format; this audit does not reinstate a standing gate or schedule.

Rule-source inventory followed main CLAUDE.md: live OWNER_DECISIONS.md, WORKER_BRIEF.md and HANDOVER_1115_PM.md from `claude/cung-tuong-mong-handover-hj0h8w` at `b9e30597469257573019ba0c98e21aa76f026f75`; main HANDOVER.md; KIT.md, VANPHONG.md, KIT_REQUESTS.md; ITEMS.md, ITEMS_EARNED.md, MINIGAMES.md, EMOTION_PLAN.md, MEN_PLAN.md, RARE_ENDINGS.md, MOTION.md, STYLE_ANCHOR.md; progress-file inventories and their mechanism, measurement and open-work sections. Older decisions were compared with their later reversals, particularly hidden event outcomes, figure scale, clothing, and the ChatGPT workflow. Main contains no earlier audit report, only docs/reviews/chatgpt/README.md, so no closed finding was reopened.

This is a cross-system source audit with targeted runtime probes, not exhaustive execution of every menu, image, birth, origin and life. A blocked result must not be read as certification of unexercised paths. The four defects below are sufficient to withhold PASS independently of wider coverage.

All finding line references below are to the **queued head**, unless explicitly labelled current-main or live handover. They can be opened with the pinned [queued repository tree](https://github.com/thientran2711/cung-tuong-mong/tree/62a0506ac2d7124e0689f648bea62979315c21d2). No game, design, build, image or deployment file was changed.

## Blocking findings

### A-01 — The accusation rolls worse odds than its own preview

**Locations:** `dev/build/jbal2.js:24`, `dev/build/jbal2.js:25`; caller `dev/build/j8.js:95`; previews `dev/build/j78.js:181`. Current-main locations: `jbal2.js:29` and `:30`.

**What:** The accusation wrapper appends the current week to the accuser's `accL` **before** the inner action evaluates `oAccuse`. That action therefore counts the accusation being attempted as a previous accusation. The preview was computed before that append. Away from the clamps, execution is lower by BAL.accTire, currently 10.

**Why:** KIT.md:380 requires “The card's odds word = the odds the roll uses”. jbal2.js:21 also describes fatigue from previous accusations reducing the **next** one and promises the real odds word. The formula is shared by player and NPC accusations, so the ordering error affects the whole family.

**Machine reproduction:** In each published index.html, start a consort life; clear existing modal choices; use an ordinary living non-queen target with two evidence; player rank 3, Sức 80, Danh 40, Tài 40; no previous accusations. Disable the emotion modifier and set the fortune contribution to zero to isolate this calculation. Read ACT.accuse.o, then intercept the roll argument while invoking the real runAct path, returning failure to avoid demotion/reward side effects.

| Build | Preview calculation | Preview word | Actual roll argument | Word for actual argument |
|---|---:|---|---:|---|
| queued 62a0506ac | 74 | Chắc | 64 | Khá chắc |
| current 17e8fc038 | 74 | Chắc | 64 | Khá chắc |

This measures the exact execution input, not a sampled win-rate estimate. The labels above quote the game's word() output.

**Proposed repair:** Have the preview and action consume the same pre-attempt fatigue state, then record the attempt at the intended point. Preserve the existing fatigue rule and knob. Recheck player/NPC, zero/one/multiple recent attempts, the 36-week boundary, fortune, and both clamps.

**Weight: BLOCKING — wrong odds in ordinary play and violation of the written single-source promise.**

### A-02 — Plot-reaction accusations bypass the shared 36-week lock

**Locations:** `dev/build/jbal2.js:30`, `dev/build/jbal2.js:32`; `dev/build/j70.js:229`, `:241`, `:421`; related preview `dev/build/j78.js:181` and ordinary execution guard `dev/build/j8.js:427`.

**What:** ACT.accuse.ok rejects a target already accused within BAL.accCdT. The three plot/threat reaction builders instead test accOK, which checks evidence/rank but does not check that lock. Their callbacks call runAct directly. The final action wrapper only enforces the lock when the actor is **not** S. Consequently a player can submit an accusation through a plot-reaction choice that the ordinary action correctly refuses.

The evidence-card preview has the same eligibility drift: evidenceActs computes the action's ok value but its accusation entry ignores it when deciding the disabled reason. The ordinary evidenceDo → doAct path still rejects it, producing an apparently usable choice that does nothing. That no-op is distinct from the executable plot-reaction bypass.

**Why:** jbal2.js:26–32 explicitly says a recently accused person “cannot be accused again by anyone” for 36 weeks, including the player. The design rationale and measurement are documented under the accusation-cooldown section in dev/measure/BALANCE_REPORT.md. Different entry points must not change this rule.

**Machine reproduction:** Start a consort life with free action time, enough silver and two evidence against a living rival. Set the target's accT to wk(). Confirm ACT.accuse.ok(S,target) is false. Build optsAft70 for a post-poison plot by that rival against the player, select its actual “Tố giác …” callback, and capture rolls with a failure stub.

| Build | Shared eligibility | Reaction choice offered | Actual execution |
|---|---|---|---|
| queued 62a0506ac | false | yes | roll invoked; evidence 2 → 0; attempt recorded |
| current 17e8fc038 | false | yes | roll invoked; evidence 2 → 0; attempt recorded |

This calls the generated choice's callback; it does not manufacture an alternative execution path. Static family scan found the same accOK/direct-runAct pattern at all three j70 locations listed above.

**Proposed repair:** Make all accusation builders read the complete shared eligibility result and show its reason. Enforce the same lock for both actors at the execution boundary, including a stale open dialog. Retain the ordinary doAct guard. Recheck all three j70 builders, the evidence panel, the person card, NPC actions and save/load during a lock.

**Weight: BLOCKING — breaks a written cooldown and player/NPC parity.**

### A-03 — NPC etiquette is calculated from the player's outfit and drops Đức

**Locations:** `dev/build/jaudit.js:200`, `dev/build/jaudit.js:221`; base NPC act `dev/build/j28.js:90`. Additional current-main interactions: `dev/build/jtoil.js:137`, `dev/build/jty.js:78`.

**What:** The NPC serveTH hook correctly asks whether **v** is underdressed, then calls aaThieuLeFx("th"). That helper now reads leAttire(**S**, …), so the NPC's consequence depends on the player's appearance. The hook applies Danh and Thái hậu favour but never applies the returned Đức delta.

Later toilette and trung-y wrappers do not repair that actor mismatch for a **clothed but underdressed** NPC. This finding does not dispute the explicit current-main trung-y exception.

**Why:** KIT.md:360–368 says the same rule applies to NPCs and defines leAttire(p, occasion, host) as the one judgement, including Danh, Đức and favour. HANDOVER.md's standing rules require equal rules within a group.

**Machine reproduction:** Use a living rank-5 NPC wearing the real low-rank y_hoanho outfit; player rank 3 wears y_haiduong and has the proper-issued-set state. Reset NPC Danh/Đức to 50 and Thái hậu favour to 0. Read leAttire(v,"thỉnh an","th"), then execute SOC.serveTH.run(v). The base service act independently grants +2 favour.

- On the queued build, with a strict Thái hậu, leAttire(v) returned **Danh −2, Đức −1, favour −4**. leAttire(S) returned all zero. Actual service changed **Danh 0, Đức 0, favour +2**. The expected dress part was completely omitted.
- A second queued-build context with a frugal host returned **Đức +1, favour +2** for the NPC's dress; actual service again omitted that dress judgement.
- On current main the same clothed-under-rank case still entered the faulty hook. A frugal-host run changed **Danh 0, Đức 0, favour +5** while leAttire(v) returned **Đức +1, favour +2** for dress. The additional appearance layer changes the favour total; it does not restore the missing Đức or correct the helper's S argument.

The current-main total is not presented as a clean measurement of dress alone. The direct code dependency and missing Đức application remain independently reproducible.

**Proposed repair:** Use the existing actor-specific attire judgement for the NPC being served and apply all its intended fields once. Keep the later appearance and trung-y exceptions explicit. Check strict/normal/frugal hosts, player outfit changes while the NPC stays unchanged, makeup-only reactions, bare inner robes, and ordinary clothing below rank.

**Weight: BLOCKING — wrong NPC numbers and violation of the same-law-for-everyone rule.**

### A-04 — The binding location/activity/motive ledger is absent from the merged game

**Locations:** `dev/build/assemble.py:14` (module list); independent whereabouts in `dev/build/j9.js:21`, `dev/build/j22.js:9`, and `dev/build/jmen.js:57`; dormant gate integration `dev/build/jemo.js:148`.

**What:** Neither audited bundle has S.roster or motiveOK. The main source tree lacks j95.js, dev/tools/roster.js and dev/test/ROSTER_AUDIT.md. Place generation still writes S.where; men's placement writes S.menW and S.menWhy; stages use S.visit.people. Emotion's “lazy” motive integration returns without installing its gate because the prerequisite function is absent.

**Why:** OWNER_DECISIONS.md:34–36 at the queued head, and the same live handover rules at lines 34–36, require one saved location **and activity** ledger for every living person at every khắc, shared consumers, a real recorded motive gate, and a clean 30+ lives × two years audit plus independent recheck before release. EMOTION_PLAN.md's motive section also depends on that integration.

**Machine/source evidence:** Fresh life initialization in both exact published bundles returned:

| Build | typeof S.roster | typeof motiveOK |
|---|---|---|
| queued 62a0506ac | undefined | undefined |
| current 17e8fc038 | undefined | undefined |

Repository file-tree and assembled-module scans found no required ledger, audit tool or audit report. This is an unmet integration/release condition, **not** a claim that the existing map/stage headcounts always disagree or that every current NPC decision lacks a motive. Current headcount patches cannot supply the missing activity/history contract.

Existing work was checked before recommending repair: remote branches review/schedules (`8a925a4c`), review/schedules2 (`3e55eb57`), review/schedules-audit (`b11377e3`) and review/kit-j95 (`33e50165`) already exist. This report does not certify those branches.

**Proposed repair:** The coordinator should reconcile and integrate the existing schedules/ledger work through its normal review process, connect every consumer and motive-dependent feature, then produce the required invariant report and independent recheck on the final merged head. Do not build a second competing ledger. If the owner has superseded this requirement, record that actual decision before claiming compliance.

**Weight: BLOCKING — an explicit owner release requirement remains unmet.**

## Other audit observations

### A-05 — Current-main balance targets are not established by the older tables

**Locations:** queued `dev/measure/BALANCE_REPORT.md:166` and `dev/EMOTION_PLAN.md:106`; current-main `dev/measure/BALANCE_REPORT.md` final four-buổi section, `dev/PROGRESS_promo-exam.md:47`, `dev/PROGRESS_review_event-balance.md:53`, `dev/review/event-balance.md` r6 table.

**What/why:** The sources contain measurements on different bundles, different stop conditions and successive rule versions. The current promotion-exam progress explicitly says no usable before/after lives completed. Current event-choice r6 has only 4–6 completed lives per bot: hint mean maximum rank 3.8 versus random 3.75, with different survival outcomes. Those observations do not establish the owner's “hint reader clearly beats random” requirement. Likewise an old childbirth estimate or an earlier emotion configuration cannot certify the present whole-game rates.

The four-buổi report records childbirth deaths of 17.8% and 20.8% in its two samples, but this audit has not established the exposure counts or a current-head estimate needed to diagnose a rate error. No new probability or threshold is proposed.

**Proposed repair:** Keep build SHA, bot policy, seed, life-stop rule, births/exposures, censoring and sample size with each result. Complete the already-requested merged-head measurements and distinguish exact formula tests from estimates of whole-life outcomes. Do not pool different configurations as if they were one treatment.

**Weight: worth doing — evidence limitation, not a demonstrated current rate defect.**

### A-06 — The paid-choice scan's six suspects are not six proven dominated choices

**Locations:** current-main `dev/test/paid-scan.py:36`; queued `dev/build/j67.js:218`, `:222`, `:234`, `:1131`, `:1680`; `dev/build/j96.js:125`.

**What:** Running the existing scan against the queued source examined **595 options in 376 lists** and printed six “dominated paid options”. Manual comparison rejected all six as proofs: alternatives spend Danh, Sủng or Sức; some change story score; the maid option changes loyalty/trust and a story flag. Comparing only positive reward fields omits those trade-offs.

**Why:** A dominance claim must include costs, failed outcomes and future state. The owner's no-always-best requirement does not justify labelling every higher-priced option a defect.

**Proposed repair:** Keep these results as candidates for contextual review; include every resource, story flag and continuation in the comparison before declaring dominance. Reuse the existing choice-bot work. No option is recommended for removal based on this scan alone.

**Weight: worth doing — audit-tool false-positive risk.**

## Coverage and verification record

| Family | Source/scan and evidence | Conclusion |
|---|---|---|
| Shared odds, detection and fortune | ACT declarations/callers; odA/odT, oAccuse, spyRoll, chanceW; jwhy, jaudit, jbal2, j70, j78 | A-01 and A-02 proven; no blanket odds PASS |
| Equal player/NPC costs and consequences | ACT/runAct/doAct, SOC, leAttire, wardrobe, toilette/trung-y hooks | A-03 proven |
| Whereabouts, encounters, co-op and motive | placeWhere/whereOf/countAt, menPlace/menWatch, S.visit, jcoopworld, emotion gate; missing-file/module scan | A-04 proven; no two-player network session claimed |
| Promotion/demotion, rewards, stipend, inventory | j8/j30/j34, BAL/hhNeed, jbal2; current jexam, jstip, jecon, jearn, jwdinv; progress and existing measurements | Source review; current global rates unproven; no new balancing numbers |
| Story/rare endings, gifts, minigames and event choices | j67/j68/j70/j71/j72/j82/j83/j91/j96/j97; RARE_ENDINGS mechanisms/conditions; paid-option scan; current context/hint documentation | Six scan suspects rejected as dominance proofs; current hint advantage unproven |
| Save compatibility and ordinary initialization | Real ser() from queued published build, JSON round-trip, deser() into both bundles, deal/render at five sizes | Sample loaded with origin thd, buổi 0, used 0, place home preserved; no page errors |
| Adult age floor | Live initialized player, rivals and allServ() in that save | Zero sampled adults under 18; not an exhaustive generator proof |
| UI/wording rules | KIT/VANPHONG laws; render smoke only, with media blocked | No document-level horizontal overflow in the tested initial view; no visual/art or full-game wording PASS |

Five smoke viewports: 755×1000, 1000×755, 1180×820, 1366×1024 and 844×390. Both bundles initialized and rendered without page errors in these probes. Images/audio were blocked to isolate engine logic; art correctness, full visual layouts and network/offline behaviour were not certified. Service workers were blocked in the save/load smoke.

The installed Playwright package's default browser executable was missing. The system's existing /usr/bin/chromium was used explicitly; no browser was installed. Probes were ephemeral and no test or implementation files were added. The preferred fetch-lock directory /home/user/wt was not writable; shallow fetches used flock on /tmp/cung-tuong-mong-fetch.lock instead. GitHub writes are limited to the authorized report, claims, verdict and role log.

Useful repeat scans, from the relevant pinned checkout:

- `rg -n 'accOK|oAccuse|accL|accT|accCdT|runAct' dev/build/j*.js`
- `rg -n 'serveTH|aaThieuLe|leAttire|toilFx' dev/build/j*.js`
- `rg -n 'roster|motiveOK|S\\.where|S\\.menW|S\\.visit' dev/build/j*.js`
- Inspect assemble.py's final module order and the git tree for the required ledger/tool/report.
- Run the existing paid-scan.py against each source snapshot; manually inspect every reported candidate's entire option and continuation.

## Palace-history and genre cross-check

These checks distinguish historical grounding from the owner's fictional rules; none authorizes a design change.

- **Ranks and nominal seat counts:** j1's eight ranks and the written 1 Empress / 1 Imperial Noble Consort / 2 Noble Consorts / 4 Consorts / 6 Concubines structure agree with the Qing framework in Zhao Erxun et al., *Draft History of Qing*, “Empresses and Consorts”, introductory institutional passage. That source also describes the three lower ranks as having no fixed number. See the [named primary text](https://www.shidianguji.com/book/LS0025/chapter/1kt95n6uy0dus). The game's overall population cap remains its own rule.
- **Maid and candidate systems:** the Palace Museum's [“Palace Maid System”](https://www.dpm.org.cn/court/system/236418.html) distinguishes the Qing maid and candidate selections and describes rare promotion of a maid after imperial attention. That grounds the genre path; it does not make automatic promotion on every birth a historical law.
- **Succession:** the Palace Museum's [“Secret Establishment of the Heir”](https://www.dpm.org.cn/court/system/236361.html) explains Yongzheng's sealed succession arrangement behind the Zhengda Guangming plaque. The rare-ending motif in RARE_ENDINGS.md:556 is grounded in that practice. It does not establish a universal Qing rule of automatic eldest-son succession.
- **Period and safety boundaries:** the approved adult-age floor, composite palace names, appearance rules, fictional succession rewards and promotion exams are game decisions. Historical references were not used to overturn them. No claim is made here that a palace-drama medical or poison trope is medical fact.

## Return requested from the coordinator

Answer A-01 through A-04 individually with accepted/rejected and evidence. For accepted findings, repair the **whole entry-point family**, attach before/after deterministic results and queue the repaired head for re-audit under the owner's requested workflow. A-05 and A-06 remain observations, not grounds to change numbers without measurement.

Report delivery is complete. Whole-game playability percentage was not measured and is not invented.

CHATGPT AUDIT BLOCKED: main 62a0506ac2d7124e0689f648bea62979315c21d2 (4 blocking)
