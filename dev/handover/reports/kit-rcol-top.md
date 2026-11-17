PRIORITY #1 CHECK: OD 1569/1575/1576 | main 0 | review/morechip-fix eba25768 (separate; trial-merge: source auto-merges clean, only generated index.html/sw.js/assets.json conflict -> rebuild) | claims 0.

# kit-rcol-top — kit worker report
Branch review/kit-rcol-top, sha fa787165 (source only; generated files NOT committed, main rebuilds site).

## What
1. Right column (#kshR): ONE width 140 px (jk3 k3RW; was 172 Fold / 139 iPad; widest content ~135). `.k3cs` grid with equal rows -> Hoàng thượng/Thái hậu/Hoàng hậu/cung nữ cards one height; info boxes taller by content. j59 phone strip keeps flex.
2. Tab bar trailing info slot: kitSubTabs(key,list,info) -> `.pctinfo` at right end (sticky). New kitSecHead (`.ksech`). Tài nghệ: ⓘ Cách học / Tác phẩm on bar; Tứ đức + Đức chip + ⓘ luật Đức in the Tứ đức section header; Danh sư chip alone keeps a one-line row. Mệnh truyện: ⓘ Luật chương on bar (Tâm nguyện tab: ⓘ Tâm nguyện, its band removed). Việc nhờ: ⓘ on bar.
3. No "!" badge on top-bar stat cells: kitStatSet drops .kstw, `warn` option + CSS removed; Đức goal text now in tooltip + tap popup (k3DucNeed). Map-place "!" untouched.
KIT.md §33.40 written.

## Scan (tabbed screens, Fold 755x1000)
| screen | before band under tabs | after |
|---|---|---|
| Tài nghệ | ⓘ Cách học · ⓘ Tứ đức · Đức · ⓘ luật Đức | bar slot + Tứ đức header |
| Mệnh truyện (Chương này) | chips + ⓘ Luật chương | chips only (data), ⓘ on bar |
| Mệnh truyện Tâm nguyện | ⓘ only band | bar slot |
| Việc nhờ | chips + ⓘ | chips (data), ⓘ on bar |
| Tư trang, Hậu cung, Giao tình, Hoàng tự | no band | unchanged |
| Sắc phong (content-bottom ⓘ line) | not under tabs | unchanged |

## Tests / looks
Build ok (assemble + media-check), page errors [] on Fold + iPad, ⓘ click opens its gloss from the bar. Looked at iPad Tài nghệ shot. NOT run: quickcheck, Fold re-look after final build, CDN shots (shots in /home/user/wt/rcol-shots, not uploaded). Not updated: kit sample page jkitpage.js:26 (still uses kitInfo in a band) and tests small-bugs-2/header-danh (they only assert no/relative .kstw, still valid).

## #2 (final) — SẴN SÀNG KIỂM, sha 44ac9cda (source only; main rebuilds site)
PRIORITY #1 CHECK: continued fa787165; base origin/main 65dcf52f (no rebase needed).
- Added: kit sample page §33.40 (kitSubTabs ⓘ slot + kitSecHead) in jkitpage.js.
- quickcheck (on a temp built commit 54f2a41b, --runs 3): PASS · core gates PASS (G1 one-core, G2, G3 kit-conform, hook coop) · time-spill PASS · open 1396 ms · old save ok · perf median new/live render 211/141, tab 270/229, buổi 1100/567 (3 runs, noisy box), tasks>200ms 11/8. Built files not committed.
- Shots LOOKED (Fold 755x1000, iPad 1180x820; Tài nghệ, Mệnh truyện, Dư đồ, Tư trang, Hành sự): ⓘ Cách học / Luật chương at the tab-bar right end, Tứ đức header holds Đức chip + ⓘ luật Đức, Dư đồ right column one width, cards aligned, page errors []. CDN: img/_review/kit-rcol-top/{art,story,go,inv,act}-{755x1000,1180x820}.jpg (https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-rcol-top/...).
- Not looked: 1366x1024, 412x1058, 390x844. Perf buổi gap worth a re-run by the reviewer.
- Wipe shots with the verdict: cdn_sync.py --wipe-review kit-rcol-top.
