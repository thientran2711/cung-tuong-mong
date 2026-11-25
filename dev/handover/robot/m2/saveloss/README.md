# M2 save-loss at year rollover (build 0756a05b, Fold 755x1000, thd_tho seed 102)
- 09:54:20 robot saw HUD Year 4 / age 23 (no modal) and did a TRUE reload (page.goto → «Chơi một mình» → «Tiếp tục kiếp này»).
- 09:54:29 after load: Year 3 / age 22, tháng 11 tuần 1 buổi 3 → ~5 weeks lost.
- life_0954_excerpt.log = robot log 09:52–09:56. save_after_rollback.json = localStorage (hclh-save-v2-1/-2) right after the reload (already the rolled-back state; no pre-reload copy was taken — the reload was the first thing after the tick). save_dump_Y3start_0856.json = older dump (Y3 start).
- Unknown: whether the year-end card was shown before the tick (robot only reloads with no dialog open).
