PRIORITY #1 CHECK: OD 2 (23/11 23:05Z mgskin order) | ledger 0 | claims 8 | main kit-mgskin LIVE 2a80712b (j82 kitMgSkinAdd/kg82SkinSrc, j79 kitBoardBg) | review/* none on MGSKIN art | status: workers A (hoa banh huong kim), B (ve theu dan co) run in parallel.

# F-MGSKIN-C report (ban, dauho, td_cong, le)
Model gpt-2-6 only (8 edits, 1 try each, all looked at via creations_read and kept). Magnific folder ba4aecfe… is NOT visible to this account: results landed in Personal (reference images imported there too). All boards 1024x1024 webp (153-233 KB), same size/aspect/layout as the defaults; sheets looked at.

## Finding: td_cong and le have NO board of their own — nothing painted by me
- td_cong draws `theu-bg-hoc` (jtd.js TD_BG) -> resolver `img/mg/theu-<id>.webp` = Worker B's theu skins. Sprites kim-needle / theu-cloud carry game meaning (tool / pattern): not skinned.
- le (engine "lay", jnwq NWQ_BG) draws `huong-bg` -> resolver `img/mg/huong-<id>.webp` = Worker A's huong skins; its sprites (censer, vase, bowl, lantern, fan, inkstone, bell, pot, slip) are the objects the player must place = meaning: not skinned.
- So both inherit the skins of theu / huong automatically through kg82SkinSrc once A/B upload. Painting separate files would be dead (file name derives from the board, not the kind). Foreman B's wiring: register skins for td_cong from theu's keys and le from huong's (same ids/pals), nothing else to paint. This also means le/td_cong look like theu/huong boards.
## ban, dauho
BAL.mgArt is measured on the SPRITES (mg-ban-target 470x560, mg-dauho-pot 290x560), not on the board: sprites untouched (rings/pot pixel-identical by not editing), only the board picture changes. Ban target/arrow, pot/arrow carry game meaning -> no sprite skins. `-bg-hoc` does not exist for ban/dauho.

FOR MAIN MGSKIN ban keys» kind=ban skins: xuan(dao, name «Xuân viên»), ha(ngoc, «Hạ viên»), thu(kim, «Thu viên»), dong(mac, «Đông viên») | boards: img/mg/ban-xuan.webp, ban-ha, ban-thu, ban-dong (.webp) | sprites: none | sheet https://ctm-img.victoria-tntt.workers.dev/img/_review/f-mgskin/ban-sheet.jpg | gens: 4 (xuan CqYYx0cEEy, ha LwIINgFswO, thu 4RHHW3i9Aa, dong xSoo4SejfW; ref iGKKTHv3uK)
FOR MAIN MGSKIN dauho keys» kind=dauho skins: xuan(dao, «Xuân đài»), ha(ngoc, «Hạ trì đài»), thu(kim, «Thu đài»), dong(mac, «Đông đài») | boards: img/mg/dauho-xuan.webp, dauho-ha, dauho-thu, dauho-dong (.webp) | sprites: none | sheet https://ctm-img.victoria-tntt.workers.dev/img/_review/f-mgskin/dauho-sheet.jpg | gens: 4 (xuan vQGG1Hfa47, ha fHnnr0mCDY, thu XmNNQf6Bfo, dong UPaaZ32wny; ref mE2253PhJQ)
FOR MAIN MGSKIN td_cong keys» kind=td_cong: no files; uses img/mg/theu-<id>.webp (Worker B) | gens 0
FOR MAIN MGSKIN le keys» kind=le: no files; uses img/mg/huong-<id>.webp (Worker A) | gens 0

## Not done / caveats
- No in-frame Fold/iPad shots (KG82.preSkin not run); only default-vs-4 sheets (looked 3x). Law 12 full-screen check is left to the first wired screen (Foreman B THIN P1).
- Starting context ~5 %; finished well under the rollover limit.
