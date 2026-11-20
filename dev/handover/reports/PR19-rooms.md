# PR19 — rooms art worker (Foreman C ROOT-64)
STATUS 20/11 ~02:55Z: depth 8 (limit 8), START_CTX ~3 % (get_session used_tokens read 0; estimate). Roll line ~28 %, ceiling 60 %.
- Job 1 (composite room 30 + ĐẬM s07 s28 | CŨ s47 s56): NOT redone. PR18 already made + sent room30-dam-cu-lbl.jpg (PR18 report l.68; FOREMAN_C_STATUS Lượt 967 "PR19 job 1 cancelled"). 0 cr.
- FOREMAN_C_STATUS Lượt 969 shows owner GO for room 30 redo ("Nền gỗ như cũ, nhưng thêm câu ánh sáng trắng thử"; old recipe + wooden floor + L25 white-light sentence only, 1 gen ~135 cr, sheet + 4-girl composite). Not started: waiting for ROOT-64's direct brief (A20).
- Note: branch was force-updated on origin before this session; worked from origin tip.

## Room 30 REDO (ROOT-64 GO 02:47–02:49Z, owner "Nền gỗ như cũ, nhưng thêm câu ánh sáng trắng thử") — 1 gen, 135 cr
- Builder dev/art/place-rank/prompts_pr19_room30.py (room gate PASS, 5683 ch). Refs G9 + M2X (gOmYI7iSXO, EbYJzsMuuO, 8aiwqQTIrU) as rooms 25–29.
- A17 diff vs rooms 25–29 recipe: C9_END LIGHT 'soft warm morning daylight from the right, like the light on the girl in image 2.' → 'morning daylight from the right, like the light on the girl in image 2: bright neutral white daylight, clean white light, no warm golden or amber cast, lanterns unlit.'; C9_STYLE 'same natural warm light' → 'same natural light'. FLOOR = 'warm polished wooden floorboards'. Room text = PR18 layout minus its BASE (stone) sentence; light refs 4/5 dropped.
- Gen DoOgSWcpcl → CDN img/_review/place-rank/pr19/truong-xuan-cung-tay-phoi-go-trang-ha-sang.webp.
- LOOK: wood floor back, light cleaner/whiter than room 28, layout as written. Faults (note only, no redraw): floor still glossy with reflections (L10), dense gold carving, armchair pair fairly big at left (as PR18's).
- Sheets (0 cr, CDN img/_review/place-rank/pr19/): room30-ai-vs-go-trang-vs-28-lbl.jpg (AI rejected | NEW wood+white | room 28 OLD); room30-go-trang-dam-cu-lbl.jpg (ĐẬM s07 s28 | CŨ s47 s56, cut-outs gOmpzsdSXO kseYX7y16B 1ldcY3kr4r rgX0qMZxtc, sheet_row.py).
- Context ~6 %. Idle after this: no more gens until the owner's verdict.

## Room 30 APPROVED (owner "Ok, chọn đậm", Lượt 971 via ROOT-64) — 0 cr
- DoOgSWcpcl now at img/_review/place-rank/pr13/truong-xuan-cung-tay-phoi-ha-sang.webp (CDN etag 7d28ae05…, = pr19 raw); rejected AI 8aiywnbIrU kept at pr18/truong-xuan-cung-tay-phoi-ai-rejected-ha-sang.webp. Robes = ĐẬM (L27).
- Live img/<key>-ha-sang.webp NOT swapped: rooms 24–29 are not live either (live room 28 md5 ≠ pr13 copy) — going live is MAIN's wiring step.
- Recipe for next rooms = prompts_pr19_room30.py (rooms 25–29 recipe + L25 white-light sentence, wood floor), NOT PR18's L25 stone builder.
- Queue estimate (PR17 NEXT line): chính điện rooms Tần/Phi/Quý phi of the 7 palaces (~14: reception + bedroom each) + Từ Ninh (~2) + ~35 live place scenes ≈ 51 gens. 135 cr/gen → batch of 5 = 675 cr; rooms only (~16) ≈ 2 160 cr; all ≈ 6 900 cr. Balance 88 855.
