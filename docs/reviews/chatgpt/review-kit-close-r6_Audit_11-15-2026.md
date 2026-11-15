# Single-item audit: review/kit-close-r6

Date: 2026-11-15 UTC. Role: DUYET B; chat 7c1b9e42.
Queued and inspected head: 3112605274382828c5e1a9728d4d7db43ecb570c.
Comparison baseline: 114887bc1. Main at report preparation: 64e91f1ae9379941d489dae4b01f9aa1603ba260.
Claim: claims/20261115-1818-7c1b9e42-review-kit-close-r6__31126052.md.

## Verdict

**BLOCKED: two blocking findings in the action-result card family.**

The ordinary first-outside-tap protection works in the exercised cases: **56 touch/mouse cases across five supported sizes closed the card without running the underlying action or changing its tracked state**. The new inventory sub-tabs and sampled news cards also behave as promised. However, the result card remains outside the shared close-button/Escape system, and its catcher treats a drag as a closing tap.

No game/design file, rule, balance number, image, build output or deployment was changed. This report recommends implementation repairs; it does not authorize new gameplay rules.

## Blocking findings

### B1 — Action results remain an exception to the one-close-control family

**Location:** dev/build/j63.js:198–214 (resultShow); dev/build/jk4.js:403–408 and :449–452.
**What:** resultShow creates #rtoast with no kit-x. The Escape handler knows registered layers, the modal and the room person card; it does not close #rtoast. The new catcher installs only outside-pointer dismissal.
**Why:** OWNER_DECISIONS 05:35Z/05:55Z requires every closable panel to use the shared corner ✕ and outside close. KIT §32.10 adds Escape for the topmost closable panel; the whole-family rule prohibits leaving one member behind. The original reviewer already mentioned the missing result-card ✕ as nonblocking; no owner exception or completed repair was found. The requested audit weights an unresolved owner-law breach as BLOCKING.
**Machine reproduction:** produce an ordinary action result with rsnap(), a real Danh change and resultShow(). On the queued head, at **755×1000, 1000×755, 1180×820, 1366×1024 and 844×390**, the result is open, the number of #rtoast .kit-x controls is **0**, and a real Playwright Escape press leaves it open. Repeated on main 17e8fc038 at 1180×820; main 64e91f1a has identical relevant code.
**Proposed repair:** register the action result with the same close lifecycle and topmost-layer ordering as the rest of the kit; give it one shared ✕, Escape and outside close, preserving the rule that the first outside gesture cannot run an underlying action. Check other transient notices for the same omission.
**Weight: BLOCKING** — breaks the explicit shared closing law.

### B2 — The floating-card catcher closes on drags and long presses

**Location:** dev/build/jk4.js:439–445; compare the proper gesture checks at :390–393 and :400–401.
**What:** #kxcatch closes unconditionally on pointerup or touchend. It does not record a press start, movement, elapsed time, or cancellation. The normal modal and overlay handlers require a tap with movement at most 10 px and duration at most 900 ms.
**Why:** KIT §32.10 explicitly distinguishes a tap from a drag/scroll: a drag must not close the panel. The result card was added to this closing family but uses a separate, weaker gesture recognizer.
**Machine reproduction:** while an action result and its catcher are open, start at a point whose actual hit target is #kxcatch, drag **80 px horizontally and 80 px vertically**, then release. Both endpoints are on the catcher. The result closes, despite movement exceeding the 10 px threshold. This reproduces on all five queued-head sizes above and on main at 1180×820. It is separate from the passing stationary outside-tap tests.
**Proposed repair:** reuse the kit's validated press-origin/movement/duration/cancellation logic for all floating-card catchers. Continue swallowing the closing gesture and late click events. Add real pointer/touch drag, long-press and pointercancel tests for every panel family.
**Weight: BLOCKING** — breaks the explicit gesture law across all result-card uses.

## Further findings and already known notes

### W1 — An older close timer can remove a newer card's catcher

**Location:** dev/build/jk4.js:443 and :446.
**What:** closing catcher A schedules a 400 ms callback that hides the shared element and clears its callback. Reopening that element for B does not cancel or invalidate A's timer.
**Machine measure:** in a controlled reentrant component fixture, close A at t=0, call kitCatchOn for B at t=100 ms, and inspect at t=450 ms. B's catcher is initially visible and then becomes hidden; A's callback count is 1 and B's is 0. Reproduced on the queued build and pinned main.
**Why/limits:** a new card should keep its own input protection. A naturally occurring production event sequence that opens B in this window was not established, so this is not counted as a verified ordinary-play blocker.
**Proposed repair:** associate delayed cleanup with the card/gesture generation that scheduled it, or cancel the pending cleanup when rearming. Add the reentrant lifecycle fixture.
**Weight: worth doing.**

### W2 — The existing suite does not cover the two failed laws or the lifecycle race

**Location:** dev/test/kit-close2.js:1; dev/test/kit-close.js:1.
**What/why:** kit-close2 checks touch/mouse stationary dismissal and state preservation for #rtoast but does not assert its ✕, Escape, drag rejection or timer ownership. kit-close checks drag rejection for modal cards, not the result catcher. Its passing output therefore cannot certify the complete closing family.
**Proposed repair:** use the same closing matrix for every family member, including transient action results, overlapping/replaced cards and all supported game-result button IDs.
**Weight: worth doing.**

**Prior notes not reopened:** the original review's inventory-equipment visibility issue at raw 844×390 was reproduced as a diagnostic (slot heading top 410, panel bottom 334). However, later main implements the owner-approved fixed design-canvas scaling, and automated direct mode bypasses that host. This raw-viewport observation is not evidence that the actual current hosted screen still has the same fault, so it is not counted as a new live blocker. The later main kitOvBtn also excludes buttons inside hidden game panels; the older queued implementation's stale-button risk is already repaired and is not reopened.

## Checks, scans and coverage

Read main AGENTS.md and CLAUDE.md; live handover-branch OWNER_DECISIONS.md, WORKER_BRIEF.md and HANDOVER_1115_PM.md; main HANDOVER.md, KIT.md, VANPHONG.md, KIT_REQUESTS.md; and indexed the listed design/progress sources for the touched families. Fresh chatgpt-claims README/QUEUE/OPEN_AUDITS/audit-fast/claims/logs were checked before claiming. The first B claim was DONE before this claim was created; the reread showed no earlier competing claim or DONE for this item.

Family scans used:

```sh
git diff 114887bc1 311260527 -- dev/build dev/site
git grep -n -E 'mustChoose|kitCloseLayer\(|kitCatchOn\(|kitXAdd\(|kitOvBtn\(|kitOvSync\(' 311260527 -- 'dev/build/j*.js' 'dev/site/*.js'
git grep -n -E 'kg82ok|kg92ok|mgok|closeLabel|Đã hiểu|Đã rõ|Thôi|Lui|Đóng' 311260527 -- 'dev/build/j*.js'
git grep -n -E 'Sang buổi|Sang ngày mới|Qua buổi|Qua đêm|Qua ngày' 311260527 -- 'dev/build/j*.js' 'dev/site/*.js'
git grep -n -E 'Tin trong cung|Sủng nàng|kitNewsArtId|kinvsub|kinvpane' 311260527 -- 'dev/build/j*.js'
```

The closing family was traced through **j3, j5, j15, j16, j25, j63, j67, j72, j75, j77, j79, j82, j87, j90, j92, jinv, jk2b, jk3, jk4, jplace, jcooplobby and site/swreg**, including shared close-only detection, preserved semantic buttons, forced choices, action results, room cards, books, game results, item/slot/shop cards and independent update/co-op panels. The scan distinguishes internal close labels converted by the kit from visible forbidden buttons.

| Family / law | Machine evidence and conclusion |
|---|---|
| First stationary outside tap only closes | Existing kit-close2.js executed against pinned shipped HTML: 56 exercised touch/mouse cases pass; 4 shop cases have no uncovered target and are explicitly unexercised. No action-state changes in exercised cases. |
| Modal close buttons / Escape / forced panels | Additional 10-type × 2-method × 5-size matrix: 96 cases exercised with expected behavior; 4 hair/wrist-slot fixture attempts at 844×390 did not open and are not counted as passes. Info/choice close callbacks and forced panels were checked. |
| Floating result ✕ / Escape / gesture recognition | Failed B1 and B2 at five sizes; no blanket family PASS. |
| Learning-game result | Actual playArt intro has 0 ✕; skipping to result gives 1 ✕ and hides the old text button; Escape closes and invokes onDone exactly once. Checked at 1180×820. Game-result families kg82ok/kg92ok/mgok scanned; all active game variants were not played. |
| Week book | Actual kitBook gets 1 ✕; clicking it removes the book and invokes onClose once. Checked at 1180×820. |
| Inventory | Both Túi đồ/Việc visible; bag pane has no action cards; Việc has 6 cards in doable-first order in all five kit-close2 runs. Equipment heading is initially visible at four raw sizes, not raw 844×390; see already known note above. |
| News | Five sampled real nextBuoi news cards: title Tin trong cung buổi này, 1 ✕, 0 visible close-word buttons, 0 sampled X→X rows, 0 bare Sủng nàng strings; outside closes without running an action. Manifest/art verification is excluded. |
| Old save | Generated a real 23,598-byte save from pre-item baseline 114887bc1 in memory, loaded it on the queued head at all five sizes, retained life identity and its serialized news, closed that news via the kit, and could serialize state again. A forced pending-choice restoration was not established by this fixture and is not claimed. |
| State and numbers | Closing safety measured khắc, buổi/tab, Sức/Bạc/Sủng/Danh and logs using the existing test. Diff review of j75/j76 shows conditional omission/attribution of zero-change prose and news lookup, not new reward/odds constants. No claim about whole-life balance. |
| Wording | Sang buổi/Sang ngày mới call sites scanned including co-op overrides. Internal cancellation words remain data inputs to the shared kit; player-visible close-only buttons are converted. |
| Art / shared UI | Shared .kit-x/.ksub/kitRows paths inspected; no art generated. Image loading, painted identity, figure fit and screenshot alignment are not certified. |
| Other laws | No change to ranks, succession, death, roster, romance, items' mechanical effects or rare endings is proposed or approved. Cross-system law certification belongs to share A. |

## Numbers and menu-choice review

The branch changes presentation/routing of the inventory's six existing actions rather than introducing a new mutually exclusive economic choice. Túi đồ and Việc are navigation choices with no exclusive reward; no numeric superiority claim is made for either. Their underlying purchase/search/bribe/black-market/ally formulas were not changed by this item.

The close controls preserve meaningful choices (accept/defer/continue/rebirth) rather than silently turning them into cancellation. Forced panels were required to remain open without a choice. Stationary outside closing was specifically checked not to spend resources or advance time.

Numeric thresholds audited in the new input code are **10 px**, **900 ms** and **400 ms**. The first two are consistently applied to ordinary modal/layer taps and omitted from the floating catcher (B2); the last creates the cross-card timer risk (W1). No replacement thresholds are proposed.

## Historical check with named sources

The inventory action “Nhờ thái giám mua đồ” is a game abstraction. The Palace Museum's [Furniture Gallery](https://intl.dpm.org.cn/galleries/details/309.html?_wap=1) identifies the Imperial Household Department as responsible for imperial possessions/residences and workshops. Its [“清宫内务府造办处”](https://www.dpm.org.cn/lemmas/244994.html) also describes eunuchs among the workshop administration personnel. These support palace procurement through household institutions and attendants; they do not establish the game's exact prices or free access to every market. This item adds no new historical rank, rite, punishment or succession claim, and no history blocker is asserted.

## Test limits and delivery

Tests used installed /usr/bin/chromium and in-memory Git HTML routes; no browser installation, code-file editing or assembly/build command. For the existing suite only, the browser launch and input routes were adapted in memory, screenshot calls were suppressed and the output-directory mkdir was suppressed; no test/artifact files were created. Images/audio were blocked and JSON asset manifests were empty. Reported behavior therefore covers logic/input and raw DOM geometry only, not a successful CDN or painted-screen check.

The shallow fresh fetch used --depth=30 under /tmp/cung-tuong-mong-fetch.lock because the repository's /home/user lock path is not creatable here. Main advanced from 17e8fc038 to 64e91f1a during this item; the relevant result/catcher code is unchanged. The report branch is created from current main, with this report as its sole change.

Sếp: mục này có 2 lỗi chặn về đóng thẻ kết quả. Chạm ngoài thông thường đã qua 56 ca; còn thiếu ✕/Esc và kéo ngoài thẻ vẫn làm thẻ đóng. Phần kiểm toán mục này đã hoàn tất; tỷ lệ chơi được của toàn game chưa đo.

CHATGPT AUDIT BLOCKED: review/kit-close-r6 3112605274382828c5e1a9728d4d7db43ecb570c (2 blocking)
