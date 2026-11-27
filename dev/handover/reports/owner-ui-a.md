# OWNER-UI-A report (branch review/owner-ui-a, 27/11)
KIT CHECK: reuses pcard, pager, kitRows, kitItem (sm), kitItemCard (data-kid), mdH/pcPort portrait renderers, BAL.reveal pacing, kit chips. NEW kit part: portrait STATE (.kst-lc / .kst-dead, jgrey.js §3) — asked KK56 for sign-off by message (no reply yet); KIT.md §84b + §93.1c written.
PRIORITY #1 CHECK: OD «hưởng dương/đã khuất» 0, «rương nhảy» 0 | main 4cd3f974: dead rivals already stayed in the strip («Đã mất», dim) but lãnh cung AND dead shared `.pc.out .pcp{grayscale(.8)}`; kitReward already flew items one by one | review/* none | claims none.

## JOB A — lãnh cung vs the dead
- Lãnh cung = own colours faded + warm sepia (`.kst-lc`); b/w only for the dead (`.kst-dead`). One state set from `f.st` by the two portrait renderers (mdH, pcPort) → strip faces, big card, men strip. Old `.pc.out` grayscale and `.pface.dim` opacity removed (p1.html). Selected strip face keeps state + glow.
- Dead stay in lists: Phi tần strip group «Đã khuất» after the living + «· Đã khuất: N» beside the count; Nam nhân strip likewise (dead men were filtered out before). Nun / sent-away (`alive:false` + nun/left) are NOT dead: group «Đã rời cung», status «Đã xuất gia / Đã rời cung».
- Tap dead = whole record + kit rows «Hưởng dương N tuổi» (<60) / «Hưởng thọ N tuổi» (60+) + «Nguyên do: …» (the words the log used; jmort kill stamps its own, deathSentence/dieIf/kidDie wrapped, everything else = sweep with «không ai rõ nguyên do»). Threshold BAL.dth.thoAge.
- Save: `p.dth={a,c,y}` on the person (rivals/men/kids already saved). Old save test: dead rival without record → «Hưởng thọ 61 tuổi · không ai rõ nguyên do», nun not counted dead; quickcheck old save ok.
- NOT DONE (honest): (1) kids list and servants list: dead kids get a record by the sweep but no dead-kid group/card was built; dead servants are removed from staff on death (no data kept) — needs a design decision on where a dead child/servant list lives. (2) Other portrait paths outside mdH/pcPort (stage tokens, kit-person-panel raster) not audited for the lc state. (3) Coop MAN_F field list does not carry `dth` for men (guest sees fallback cause).
## JOB B — chest
- Root cause of «nhảy một loạt rồi cả list»: per item ~3.8 s (BAL.pace) × 10+ allotment items; she taps, and a tap used to jump everything at once + show the list frame. No code regression found (history shallow).
- Fix (j93 kitReward, all chests: Nội vụ/bestow/festival/gift/pouch use it): total fly-out fits BAL.reveal.total 8000 ms (minScale .3, ~1.2 s/item at 10+); first tap = faster but still one by one (BAL.reveal.fast), second tap = end; settled = kit item tiles (icon + name, ×N merged) in rows, PAGE 12 with ‹ n/N ›, Nhận; `.kmlist` frame gone for rewards; tap tile = existing item detail card.
- Not touched: the owner's third row (cloth/cosmetics oversupply = history expert question, not mine).
## Tests
Fold 755x1000 + iPad 1180x820: chest (13+2 items, paging, tap → detail) and Hậu cung (lc card, dead card, Nam nhân dead) driven + looked; one-core-guard PASS (3561 ≤ 3592); quickcheck PASS (299 s, old save ok); kit-std-scan: NOT AVAILABLE (not on main, no review branch has it; REPORT_ONLY n/a).
Videos: https://ctm-img.victoria-tntt.workers.dev/img/_review/owner-ui-a/{chest-fold,chest-ipad,list-fold,list-ipad}.mp4
NEXT: MAIN LOOK → RV-166 (UI) ; RV-163E (save/data: p.dth, jmort stamp). Roll: finished, no handover needed.
