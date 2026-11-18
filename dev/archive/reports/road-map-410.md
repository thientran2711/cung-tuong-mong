# road-map-410 — canon check of Foreman D's men road templates → ROAD_MAP §4.10 (worker of Foreman B, 11/16/2026)

Source checked: dev/handover/reports/npc-roads.md "proposed ROAD_MAP §4.10" + "FOR FOREMAN B", data dev/build/jnroadm.js on
review/npc-roads @ 02405da5. Checked against ROAD_MAP §1/§4/§5/§6, story-roads rules (OD:L1226, L1243, L1247, L1252, L1264),
OD:L1327 + reports/road-history.md whole-family rules 1–11 (and note 12), VANPHONG.

## Result
- D's proposal = data: every printed row matches jnroadm.js exactly (script: rows printed from NRM, diffed with the report → identical).
- VANPHONG scan of all 160 titles + 480 tags: no digit, no %, no banned word (bạn, cơ hội, điểm, chỉ số, lượt, Chắc chắn).
- 20 roads × 8 chapters, 11 kinds; all place names already in the game (Thượng thư phòng 34×, Thận Hình ti 40× on main; registered in §5.2 now).
- Written: ROAD_MAP §4.10 (header + 6 binding rules + all 160 rows, generated from the data with the changes below applied), §5.2 places,
  §8.3 + 3 men HISTORY CHECK rows, §8.6 (2nd road per one-road kind, open), one §7 line.

## Row table (only rows that are not plain OK are listed; all other 152 rows: OK)
| row | verdict | what changed (map) | what D's worker must change in jnroadm.js |
|---|---|---|---|
| hz_hoc road title + .11 title «Thái phó và học vấn» | CHANGED | → «Học ở Thượng thư phòng». Thái phó is a top honorary title (main uses it only as a posthumous honour); princes' teachers in Thượng thư phòng are «thầy dạy» (main's own word) | def("hz_hoc", title) and row .11 title |
| hz_hoc .4 tags «được/bị Thái phó …» | CHANGED | → «được thầy dạy khen / bị thầy dạy phạt» | row .4 tags |
| hz_hoc .10 «đứng đầu / đứng sau các hoàng tử» | CHANGED | few children (OD:L1066): he may be the only prince → «bài khảo được chấm ưu / bài khảo bị chấm kém» | row .10 tags |
| hs_hoa .11 win «bức họa treo ở Càn Ninh cung» | WRONG | Càn Ninh cung is the Hoàng hậu's palace (main j-code) → «bức họa được Hoàng thượng giữ bên mình» | row .11 win tag |
| ksp_so .9 «Tin có thai» [man] | CHANGED | pregnancy is confirmed by the thái y → cast [doc] (help kind y) | row .9 w "doc" |
| hz_tran .5 «Tướng già dạy việc» [gd] | CHANGED | an old general is not a thị vệ → [off] | row .5 w "off" |
| vg_dat .8 «Thuế đất — nộp đủ thuế / thiếu thuế» | CHANGED | a fief prince collects his fief's rent, he does not pay land tax to the court → «Tô thuế đất phong — thu đủ tô thuế / thu thiếu tô thuế» | row .8 title + tags |
| off_dan .9 lose «bị kết một tội nhẹ» | CHANGED | history rule 2: Đại Lý tự proposes, the Emperor decides (.10) → «bị nghị một tội nhẹ» | row .9 lose tag |
| ty_tra .10 lose «bị buộc tội» | CHANGED | rule 2: the Hoàng hậu questions, she does not convict an outer-court official → «lời khai bị ngờ» | row .10 lose tag |
| rows with w th/hh/mom (vg_dat .9, st_uoc .7, ns_tho .4–.11, tq_an .9, hz_le .7/.9, hz_tran .8, ty_tra .10–.11, ksp_so .7, off_dan .8) | ENGINE | §4.10 rule 3: play only if the person is there (S.thDead, empty Hoàng hậu seat, player IS Hoàng hậu, mother dead/out) else skip quietly; ns_tho not drawn while S.thDead; «mẫu phi» → «mẫu hậu» when his mother is Hoàng hậu; hz roads end on a reign change. Same family as road-history note 12 | presence check before nrMenPlay plays a row (reuse kitChiTonMet j61 + mother alive/!out); filter ns_tho in nrPickRoad; mẫu word by mo.queen; N.x on reign change |
| all men roads: who gets one | ENGINE | §4.10 rule 2: also exclude every man HER road casts by name ({foed} + his house in td roads, td_ke mastermind, a named S.men guard of cn_tinh), not only her father / m96 / her children | nrMenL: skip men cast in S.st.M / S.st.X of the current life |
| off_thong partner | ENGINE | §4.10 rule 4: partner house never her own house (no off-screen marriage in her family record, §5.2) | nrMenRival: for NRM[r].ally drop tdHouse(S) from L |
| gd_tinh «nàng» | ENGINE | §4.10 rule 4 / OD:L1247: the beloved is a real live maid (not the player, not a consort), kept for the road, recast told; news always shows if she is the player's maid | cast a maid (allServ role maid) at .4 into N, name her in the news line |
| gd_kho .7 «Thận Hình ti tra hỏi» a thị vệ | HISTORY CHECK | kept; doubt: Thận Hình ti judges palace servants (road-history rule 10); a guard may belong to another court, though ngự khố is Nội vụ phủ's | none until the expert pass |
| tq_an (whole road, «Ấn Tổng quản») | HISTORY CHECK | kept; doubt: whether the chief eunuch holds a seal of office | none until the expert pass |
| off_dan .9 «Đại Lý tự xét» | HISTORY CHECK (light) | kept after the lose-tag fix; check against Tam ty rule 3 | none |
| one-road kinds ns, st, hs, ksp, eun | OPEN (not blocking) | §4.10 rule 6 + §8.6: same man → same road every life; OD:L1252 is met only by the varying help point; a 2nd road per kind to be written in §4.10 first (ns most: no road at all while S.thDead) | none now |

## Not changed, checked
- Sứ thần = a foreign envoy in game data (j72 «Quốc vương nước thần») → «bản quốc», «Lễ bộ tiếp sứ», «sứ quán» fit; envoy gift to the Thái hậu goes through rites (rule 8 OK).
- «Lời đồn mưu phản» (vg_bien .9) is only a rumour; no liên đới claimed (rule 6 OK). No year / real dynasty / real person (rule 7 OK).
- tq_que .8 «người cũ đã khuất» = an unnamed villager, not a real game person → allowed by rule 1.
- off_dan .8 «hậu cung nói đỡ» = pillow channel, allowed (rule 1).

## Handover
Task finished; no rollover needed. History doubts (3 rows) go to the next OD:L1327 expert pass (§8.3); nothing invented.
