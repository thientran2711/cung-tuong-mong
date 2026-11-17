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

## HANDOVER (if rolling over)
Remaining: run quickcheck, view Fold art/story + 1366x1024, upload shots to CDN img/_review/kit-rcol-top, update kit sample page, then SẴN SÀNG KIỂM.
