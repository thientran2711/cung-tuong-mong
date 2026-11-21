# story-voice (E39, opus literature expert) — owner mark #61 parts 2+3
PRIORITY #1 CHECK ('văn dẫn chuyện|literature|Tân quân lập uy|story-text|narration'): OD 6 (L2148 owner bug 21/11 ~04:33Z) | ledger 0 | claims: this job only | main: jreign.js RGT, jnroad/jnroade, j84 VP layer, jvoice kAddr (REUSED: kAddr/kSay for every address word, j84 quote-skip pattern of the «ngươi» rule) | review/* none.
Branch review/story-voice (from main 0d60ae54). TIER: BIG (code moved: j84 one rule, jstory one wrapper) — role-parity ×2 + coop-e2e before SSK.

## EXPERT NOTE (law 8, before design)
- Court-drama narration (Chân Hoàn truyện / Diên Hy dubbing, Vietnamese cung đấu novels): the Emperor speaks TO a consort in second person — «Ái phi thấy thế nào?», «Nàng nghĩ sao?», never a third-person «nàng ta» (that word is how the narrator or a rival points at ANOTHER woman). Thái hậu → «con» (warm) / «ngươi» (cold); Hoàng hậu → «muội muội»; servants → «tiểu chủ / nương nương». In this game all of these come from jvoice kAddr (VANPHONG §2) — no typed forms.
- Narrator → player: second-person «ngươi» in source, shown as first-person «ta» (j84, owner 11/15). A scene closes on the reader's decision: the classic beat is the question hanging in the air, then the narrator turning it to her — «Ta nên đáp ra sao?». Owner: «ta nên làm gì mới đúng chứ».
- Plain cổ trang: keep the court words (tấu chương, phê, chiếu chỉ, phụ chính) but say the meaning in the same sentence; no images that need decoding («chữ của trẫm chưa ra khỏi cửa điện» → «tấu chương nào cũng phải để Tể tướng phê trước; việc gì trẫm muốn làm, Tể tướng đã quyết thay trẫm rồi»).

## ROOT CAUSE of «Nàng ta nghĩ sao?» (whole group)
The source was right: c1a wrote “{Goi} nghĩ sao?” and kAddr("emp") gives «nàng» (owner 16/11 ~21:05Z rule). The j84 VP rule «a bare nàng → nàng ta» (owner 11/15, meant for NARRATION) also ran INSIDE quoted speech, so EVERY line where the Emperor (or anyone) speaks to her as «nàng» read «Nàng ta …». Scan: 397 quoted «nàng» across 20 story files (≈330 typed in jrd_*/j67/jend14, ≈ the Emperor talking to her: «Trẫm tin nàng.» → «Trẫm tin nàng ta.»).
FIX (one core): j84 rule now skips “…” exactly like the «ngươi»→«ta» rule next to it. Narration keeps «nàng ta» for another woman.

## CHOICE FRAME (part b, whole game)
jstory svFrame: every Chính tuyến / Phụ tuyến choice dialog whose last words (outside quotes) do not already ask her gets ONE closing line, picked by how the hồi ends (asked → «Ta nên đáp thế nào?» pool; asked to do something → «Ta nên làm gì đây?» pool; a scene → «Ta nên liệu thế nào?» pool; 3 wordings each, fixed per text). Hand-written frames (jreign) are kept as written.

## SAMPLE (10+ hồi, Tân quân lập uy rewritten by hand: c1a c1b c2a c3a(×4 sides) c3b c4a c4b c5a(×4) c5b c6a(×4) c6b + 9 errands)
| hồi | before | after |
|---|---|---|
| C1 H1 c1a | …lời phê sẵn của {q}. “Trẫm ngồi trên ngai mà chữ của trẫm chưa ra khỏi cửa điện.” Ngài quay sang ngươi: “{Goi} nghĩ sao?” (screen: «Nàng ta nghĩ sao?») | …bản nào cũng đã có lời phê sẵn của {q}. Ngài thở dài: “Trẫm ngồi trên ngai vàng, mà tấu chương nào cũng phải để Tể tướng phê trước. Việc gì trẫm muốn làm, Tể tướng đã quyết thay trẫm rồi.” Rồi ngài quay sang ta: “Nàng/Ái phi thấy trẫm nên làm thế nào?” Ta nên đáp ra sao? |
| C1 H2 c1b | …Hậu cung chớ bàn chuyện triều đình.” Bà nhìn thẳng vào ngươi. | … Bà nhìn thẳng vào ta: lời ấy là nói cho ta nghe. Ta nên thưa thế nào? |
| C2 c2a | Mới nửa năm sau ngày đăng cơ… Chọn phe lúc này; về sau vẫn đổi được, nhưng phải trả giá. | Ngày đăng cơ chưa lâu… Ta theo ai? Về sau vẫn đổi phe được, nhưng phe bị bỏ lại sẽ thành kẻ thù. (no time typed: BAL.rg.at decides) |
| C3 H1 c3a th | “…{goi} ở gần thì để ý giùm ai gia.” | …giọng nhẹ mà ý nặng: “…để ý giúp ai gia.” Bà muốn ta dò ý chính Hoàng thượng. Ta nên làm thế nào? |
| C3 H1 c3a quyen | “…chỉ cần chép lại vài dòng.” | + Chép lén chiếu thư là tội lớn, mà từ chối thì mất lòng nhà Tể tướng. Ta nên làm sao? |
| C3 H2 c3b | a rival consort called her «{x}» (= the SERVANT word «tiểu chủ») | the rival speaks through kSay(foe, S) (muội muội / tỷ tỷ / title by rank+mood) + Ta nên ứng phó ra sao? |
| C4 H1 c4a | …nghe đàn. | + Ta có nhận lời, và đãi khách thế nào? |
| C4 H2 c4b | Hai năm sau ngày đăng cơ… Giữ phe hay đổi phe; đổi thì phe cũ thành kẻ thù. | Đã mấy mùa trôi qua kể từ ngày đăng cơ… Ta giữ lòng với phe cũ, hay đổi sang phe khác? Đổi thì phe cũ thành kẻ thù. |
| C5 H1 c5a (4 sides) | …lời của bà sẽ định đoạt. | …mà lời của bà sẽ định đoạt. Ta có nên ra mặt vì bệ hạ không? (each side its own question) |
| C5 H2 c5b | …truyền hậu cung góp tay. | + Ta góp phần thế nào? |
| C6 H1 c6a (4 sides) | …ai ra vào.” | + Nói ra là phản bệ hạ, im lặng là phụ nhà Tể tướng. Ta chọn thế nào? |
| C6 H2 c6b | …<b>Phe ngươi thắng…</b> | + Giờ ta nên làm gì? |
| errands ×9 | «hặc tội» etc., no question | «dâng sớ buộc tội», each ends with her question |

## SCAN (dev/test/story-voice/scan.js; before = main 0d60ae54)
| kind | before | after (on screen) |
|---|---|---|
| Q3P quoted «nàng» shown as «nàng ta» | 397 | 0 (j84 quote skip; screen.js reads the real dialog) |
| NOFR hồi without her choice frame (source) | 2786 of 2839 | jreign 1 (kSay-built line, framed on screen) · on screen 0 (svFrame; j67frame.js: 369 arcs / 2484 hồi, 0 unframed) |
| OBS obscure list | 6 (jreign 2, jnrask 1, jrd_dtq/td/thd 3 «đánh hơi»/«hặc tội») | jreign 0; rest in whole-set pass |
| DIG typed digits in story strings | 60 (mostly outcome labels) | whole-set pass |

## TESTS (sample)
story-voice/screen.js 755x1000 PASS (VP.fix, 80 reign dialogs × sides read in the real modal, c1a reads right, seat address ái phi/nàng by each seat's Sủng) · j67frame.js PASS · shots looked at (Fold c1a/c2a/c4b, scratch only).
