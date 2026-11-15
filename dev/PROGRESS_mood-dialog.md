# PROGRESS review/mood-dialog (worker, 15/11)
Owner: "ảnh sự kiện này không hợp với khung tâm trạng … thêm icon tâm trạng 1 góc" + correction "ảnh khung tâm trạng là hiện sự việc liên quan,
nhưng là tấn phong kìa" (dev/handover/refs/owner-mood-dialog.jpg: Lo âu caused by "Khương Lạc Anh được tấn phong", picture = "Có người đến chơi").

## Root cause
emoBox (jevb) is a kit panel with a person subject and no picture of its own. jk4's kitEvArt wrapper gives EVERY person dialog without an event
id the visitor picture `j24:co-nguoi-den` ("Có người đến chơi"; Emperor → "Hoàng thượng ngự giá"). Same for the other look-up panels
(Đã biết về X, Chứng cứ về X).

## Done
- jevb: `emoCauseArt(cause)` + `emoBoxArt` → emoBox passes `headArt:{src,label,mark,markAlt}`. Picture = the EVENT that caused the current
  mood: recorded event picture (evbMood stores the event's kitEvArt on each cause it sets, `cause.a`) → EMO_CAUSE_EV (mood-cause words) →
  KBK_EVRE (week book) → kbkSpecific (only if on CDN) → fallback scene img/ev-mood-<k>[-2].webp. Caption = the cause text (« » dropped).
- Corner seal = KIT 28.19b `kitSceneArt o.mark` (jk2b; background layer so slot img rules never stretch it), passed through jk3 headArt and
  jk4 kitEventStage. Seal = same painted mood seal as the portrait (emo-/emo-m-/emo-mo-<k>, emoArtSet). KIT.md 28.19b + kit page sample §28.19b.
- Whole family: kitEvArt for `kit.look` panels returns only their own headArt (jevb, outer wrapper) and jph skips placeholders for them.
- Art (fallback only, made before the owner's correction arrived): 20 scenes img/ev-mood-{vui,binh,buon,gian,so,ghen,lo,dau,muu,an}[-2].webp,
  gpt-2-6, 800x600, 77–174 KB each, no people, gloomy moods dark; on the CDN. Used only when a cause has no picture (or no cause / unknown).

## Before / after (dev/test/mood-dialog.js, 1180x820)
| case | main | now |
|---|---|---|
| Lo âu · "Khương Lạc Anh được tấn phong" | Có người đến chơi | ev-tan-phong · caption = cause · seal emo-lo |
| Đau khổ · "mất con" | Có người đến chơi | ev-tang-le |
| Ghen · "X được thị tẩm" | Có người đến chơi | ev-hoang-de-dem |
| Bình thường, no cause | Có người đến chơi | ev-mood-binh · "Bình thường" |
| cause set by an event choice | Có người đến chơi | that event's own picture (ev-tranh-sung in test) |
| unknown mood | Có người đến chơi | ev-mood-an · "Chưa rõ lòng người" · seal emo-an |
| Hoàng thượng Giận · "bị phạt…" | Hoàng thượng ngự giá | ev-hinh-phat · seal emo-m-gian |
| Đã biết về X (intel) | Có người đến chơi | no picture |

## Tests
`node dev/test/mood-dialog.js <url> <out> 755x1000@1,1000x755@1,1180x820@1,1366x1024@1,844x390@1`: all 8 cases × 5 sizes: right picture,
seal top-right inside the picture (64 px), dialog on screen, no horizontal scroll, no page errors. (A cold-cache first load sometimes still
loading the picture after 8 s in the test — network timing only.)
Bytes: +0 per dialog open beyond one event picture (≤250 KB) + one seal (~10 KB), loaded on demand.
