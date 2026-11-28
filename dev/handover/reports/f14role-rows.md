# F14ROLE-ROWS — F14ROLE rows for the 413 roles on 70 roads/premises that had none
Worker F14ROLE-ROWS session_01PEhRbwC87NmvYopoF5ocup (Foreman C ROOT 4-1 child, depth 2, START_CTX ~4 %). Branch review/f14role-rows on review/f14role-inherit 6b00d4f0.

PRIORITY #1 CHECK ('f14role|F14ROLE'): OD 0 | ledger 0 | claims 8 (B F14ROLE-CNV fixer + B BIG RV session_01N1tNP5nUH1msGiPcxxchEz on review/f14role-inherit) | main dev/build/jst14.js:144-153 F14ROLE + f14Hostile, jbal.js:299 hate cost | review/f14role-inherit 6b00d4f0 (base, REUSED: f14Row inherit + f14Carried + road-cut.js + f14role-inherit.js) | claims F14ROLE-ROWS → this session.
KIT CHECK: no UI touched (data rows only).

## What
- Source of the list: `node dev/test/f14role-inherit.js` «NO ROW» on the base = 413 roles / 70 roads+premises (B's report); my dump of every ARC67 text (same 584 roles) gave the same 413.
- Each role read from its own arc text (g / beats / endings) by the table's own rule (jst14 comment above F14ROLE): 1 = stands against the player from the start (frames, slanders, mocks, spies on, blackmails her or her house; a villain plotting against others whom she exposes = 1, as s_thu v:1); 0 = rival, suitor of an alliance, debtor, victim, curious one (as tt_tranh / ch_ho / cnv_mat / muoi_no 0). ROAD_MAP.md (dev/story) per-chapter lines agree where they name {v} (e.g. :143 dtq_binh rival, :166 muoi «mocks», :291 bd_san girth, :457 thd_sach).
- Rows written ONLY in jst14 F14ROLE (108 new rows, 0/1 flags: no number, no wording, no BAL, no kit). A road gets its row at the premise / first chapter; a later chapter has its own row only where the text turns the stance (td_ke .8 ally, thd_sach .6, ch_co .6, bd_soi .8, cn_* .10) or where v2 first appears (rows carry both keys so f14Row never returns a row without the role). The rest inherits (B's f14Row).
- No 1→0→1 on any road (f14Carried looks one chapter back only: such a chain would hate the same carried person twice, against OD:L1247 «once, when cast»); the scan checks it.
- UNDECIDED: none. Every one of the 413 roles has at least one line of its own text that acts or speaks; no role's design is silent. Thin evidence (one line) flagged for the reviewer: tt_gia/tt_tho/tt_thu/cn_chuoi/cn_tiec/nc_men/nc_nu/cnv_kho/cnv_thu (0) and tt_ruong/cnv_tieu/nc_kinh (1) premises, ch_*_10 (0).

## Evidence (row → value → what the text says → file:line; jrdcsd.js:2 = the composed-road data, one line)
| row(s) | value | what the arc text says | proof (file:line) |
|---|---|---|---|
| dtq_binh_5 | 1 | slanders dad / asks the tiger tally for the Lục house; .8 «gièm» private troops | dev/build/jrd_dtq.js:551 |
| dtq_hang | 1 | tells the Thái hậu the surrendered general is a spy; kin readies a memorial | dev/build/jrdcsd.js:2 |
| dtq_thuong | 0 | side party: the angry lady is her friend (no act of her own) | dev/build/jrdcsd.js:2 |
| dtq_ky | 0 | protects her kinsman with sweet gifts; no act against her | dev/build/jrdcsd.js:2 |
| dtq_*_6 (ngua/hang/thuong/ky) | 1 | shared .6–.10: .7 mocks «nhà ngươi vừa thất thế», a spy maid; .10 her house bribes the physician against dad | dev/build/jrdcsd.js:2 |
| tt_ruong | 1 | pushes the steward's land case straight before the Emperor (against her house) | dev/build/jrdcsd.js:2 |
| tt_gia | 0 | curious: says the match deserves the Emperor's favour | dev/build/jrdcsd.js:2 |
| tt_tho | 0 | a too-precious gift (suitor/curious) | dev/build/jrdcsd.js:2 |
| tt_thu | 0 | wants the brother as her retainer (rival) | dev/build/jrdcsd.js:2 |
| tt_*_6 (ruong/gia/tho/thu) | 1 | shared .6: rumours her house is broke + her letter «kể trọn kế nàng giăng»; .7 the «lost» Tân Giả khố bracelet; .10 tells the Emperor of secret letters | dev/build/jrdcsd.js:2 |
| muoi_no_7 | mixed | v = the debtor (0, as muoi_no); v2 blackmails her: «Muốn nàng im, ngươi phải nhường nàng suất hầu yến» | dev/build/jrd_muoi.js:770 |
| muoi_thi | 1 | mocks her merchant house at the feast | dev/build/jrdcsd.js:2 |
| muoi_hoi | 1 | threat: yield the guild seat «đổi lại nàng sẽ không gây chuyện» | dev/build/jrdcsd.js:2 |
| muoi_*_5 (gia/tien/thi/hoi) | 1 | shared .5: scented powder «để át mùi muối»; .6/.8 mocks loudly | dev/build/jrdcsd.js:2 |
| cn_tinh_5 | 1 | her people hunt the letters; .6 holds a letter and names her price | dev/build/jrd_cn.js:276 |
| cn_ban_5 | 1 | probes her about Tố Nga; .7 plants the hairpin; .11 threatens | dev/build/jrd_cn.js:515 |
| cn_chuoi | 0 | curious: pales at the necklace | dev/build/jrdcsd.js:2 |
| cn_tiec | 0 | curious: comes uninvited to congratulate | dev/build/jrdcsd.js:2 |
| cn_chuviet | 1 | slanders: «có phải do người khác chép» | dev/build/jrdcsd.js:2 |
| cn_theo | 1 | spies: one of the three is her eyes | dev/build/jrdcsd.js:2 |
| cn_*_6 | mixed | shared .6–.9 neutral (sits by, v2 asks to see the bedroom): carries the premise stance (chuoi/tiec 0, chuviet/theo 1), v2 0 | dev/build/jrdcsd.js:2 |
| cn_chuoi_10 / cn_tiec_10 | 1 | shared .10: adds a detail to rumours about her home; .11 blames her, «nên chọn phe»; v2 0 (borrows servants) | dev/build/jrdcsd.js:2 |
| nc_gian_5 / bd_ngua_5 | 1 | her people watch her maid; .7 accuses her of letters home, asks to search her palace | dev/build/jrd_nc.js:55 |
| nc_su_5 / bd_hoa_5 | 1 | mocks her envoys; .6 her silver pays the interpreter; .10 «bản đồ» slander | dev/build/jrd_nc.js:298 |
| nc_tuc_5 / bd_tuc_5 | 1 | reports her dress to Nội vụ phủ; .7 sorcery rumours | dev/build/jrd_nc.js:511 |
| nc_vuong_5 / bd_hoang_5 | 1 | her cousin stalls the investiture «chờ xem cung ngươi trả giá gì»; .7 her kin calls the grain contraband; .9 she accuses her of guiding the enemy | dev/build/jrd_nc.js:805 |
| nc_men | 0 | asks for a vase for the Thái hậu | dev/build/jrdcsd.js:2 |
| nc_kinh | 1 | belittles her land's sutra to the Thái hậu | dev/build/jrdcsd.js:2 |
| nc_nu | 0 | asks for the maid, promises good care | dev/build/jrdcsd.js:2 |
| nc_the | mixed | v2: only her brother mocks (v2:0) | dev/build/jrdcsd.js:2 |
| nc_*_5 (men/kinh/nu/the) | 1 | shared .5: says aloud she brings strange offerings | dev/build/jrdcsd.js:2 |
| nc_*_7 | mixed | shared .7: v spies the room (1); v2 sweet, curious (0); .8 v2 asks a favour (suitor) | dev/build/jrdcsd.js:2 |
| bd_san | 1 | lose: says she shot near the Emperor's horse; .6 her eunuch cut the girth | dev/build/jrd_bd.js:104 |
| bd_soi | 0 | faction: her house wants war, «nhà ta nhớ ơn» (suitor of an alliance) | dev/build/jrd_bd.js:369 |
| bd_soi_8 | 1 | insinuates against {mh} to the Thái hậu; .9 mocks her at the feast | dev/build/jrd_bd.js:502 |
| bd_tuyet | 1 | mocks; .7 cousin's memorial «kẻ trong cung che chở»; .9 plague slander | dev/build/jrd_bd2.js:32 |
| bd_hen | 1 | insinuation about the guard chief; .7 her house's poisoned cup | dev/build/jrd_bd2.js:314 |
| bd_*_6 (luuly/lua/bac/su) | 1 | shared .6: mocks «công chúa nước nhỏ chẳng đáng sợ» | dev/build/jrdcsd.js:2 |
| pt_hai | 1 | mocks the sunk tribute; .10 plants the pearl hairpin under her pillow | dev/build/jrd_pt.js:83 |
| pt_su | 1 | mocks her land aloud | dev/build/jrd_pt.js:364 |
| pt_tang | 1 | insinuates strange monks in her palace | dev/build/jrd_pt2.js:30 |
| pt_dang | 1 | mocks the swords dowry; slander with pirates | dev/build/jrd_pt2.js:326 |
| pf_*_5 (co/guong/tra/lich) | 1 | shared .5: whispers her dress is above her rank; .8 eyes her letters | dev/build/jrdcsd.js:2 |
| pf_*_11 | mixed | v probes sea routes (1, carried); v2 an unclear remark (0) | dev/build/jrdcsd.js:2 |
| td_an_5 | 1 | her people watch her maid near the Nội các store; .7 presents her poem as treason | dev/build/jrd_td.js:48 |
| td_ke_5 | 1 | spies: sudden friendship, asks what she sends out the West gate | dev/build/jrd_td.js:309 |
| td_ke_8 | 0 | turns: hates {n1} most of all (ally) | dev/build/jrd_td.js:410 |
| td_song_6 | 1 | hunts her letters to sell | dev/build/jrd_td.js:590 |
| td_tha_5 | 1 | the doll plot throws suspicion on her; .9 a spy maid in her palace | dev/build/jrd_td.js:821 |
| ch_co_5 | 0 | rival niece gains the Thái hậu's ear (as ch_ho 0) | dev/build/jrd_ch.js:29 |
| ch_co_6 | 1 | tells the whole palace her people visit Nội vụ phủ at midnight | dev/build/jrd_ch.js:84 |
| ch_*_10 (tuyentu/lenhbai/diensan/honngoai) | 0 | curious cousin with cakes, «ánh mắt dò xét» | dev/build/jrdcsd.js:2 |
| thd_sach_5 | 0 | daughter of {n1}, still smiling «như chị em» | dev/build/jrd_thd.js:271 |
| thd_sach_6 | 1 | «bắt đầu ra tay với ngươi», mocks | dev/build/jrd_thd.js:294 |
| thd_uoc | 1 | has her maid hint at the old engagement at the tea party | dev/build/jrdcsd.js:2 |
| thd_giay | 0 | trade rival, offers to buy the workshop | dev/build/jrdcsd.js:2 |
| thd_*_5 (dich/dien/uoc/giay) | 1 | shared .5: her people guard the held tea box; .6 mocks + dyed fan | dev/build/jrdcsd.js:2 |
| cnv_chu_5 | 1 | the musk left Thái y viện under her palace name (villain, as s_thu v:1); .6 threatens | dev/build/jrd_cnv.js:111 |
| cnv_ban_5 | 1 | the goods are her palace's; .6 frames Xuân Đào; .9 sends a warning | dev/build/jrd_cnv.js:365 |
| cnv_ma_5 | 1 | her people take the coal «Tiểu chủ muốn đòi thì cứ đến»; .7 asks for harsh torture of the mama | dev/build/jrd_cnv.js:947 |
| cnv_kho | 0 | asks to borrow silk | dev/build/jrdcsd.js:2 |
| cnv_thu | 0 | asks to keep the letter (curious) | dev/build/jrdcsd.js:2 |
| cnv_tieu | 1 | veiled threat: a eunuch like her friend lurked at the medicine store | dev/build/jrdcsd.js:2 |
| cnv_*_6 (kho/thu/hach/tieu) | 1 | shared .6: waits for her to stumble; .11 tells all she is clumsy | dev/build/jrdcsd.js:2 |
| noi14 | 1 | taunts her childless palace (as st_con 1) | dev/build/jend14.js:53 |
| hau14 | 1 | forms a faction: «không đủ đức làm mẫu nghi» | dev/build/jend14.js:89, dev/build/jend14.js:105 |
| ke14 | 0 | sweet alliance offer, rival mother of an heir | dev/build/jend14.js:150 |

## LAW 11 — scan dev/test/f14role-rows.js (new; one browser) — before (base 6b00d4f0) → after (this branch)
| measure | base 6b00d4f0 | this branch |
|---|---|---|
| roles ({v}/{v2} in arc text) that resolve a row | 171 / 584 | 584 / 584 |
| roles hostile (row value 1) | 91 | 443 |
| roads/premises with an unresolved role | 70 | 0 |
| F14ROLE rows | 30 | 138 |
| roads with a 1→0→1 chain (re-hate) | 0 | 0 |
Per road (roles used | resolved before → after | hostile before → after): see the scan output below. MUTATE=hole (bd_san row removed) → FAIL check 1 (8 unresolved); MUTATE=rehate (synthetic tt_co_6 0 / tt_co_7 1) → FAIL check 2. Real run PASS 3/3.
    road/premise | roles used | resolved before → after | hostile before → after
    bd_bac | 3 | 0 → 3 | 0 → 3
    bd_hen | 7 | 0 → 7 | 0 → 7
    bd_hoa | 7 | 0 → 7 | 0 → 7
    bd_hoang | 7 | 0 → 7 | 0 → 7
    bd_lua | 3 | 0 → 3 | 0 → 3
    bd_luuly | 3 | 0 → 3 | 0 → 3
    bd_ngua | 7 | 0 → 7 | 0 → 7
    bd_san | 8 | 0 → 8 | 0 → 8
    bd_soi | 8 | 0 → 8 | 0 → 4
    bd_su | 3 | 0 → 3 | 0 → 3
    bd_tuc | 7 | 0 → 7 | 0 → 7
    bd_tuyet | 6 | 0 → 6 | 0 → 6
    ch_co | 7 | 0 → 7 | 0 → 6
    ch_diensan | 1 | 0 → 1 | 0 → 0
    ch_honngoai | 1 | 0 → 1 | 0 → 0
    ch_lenhbai | 1 | 0 → 1 | 0 → 0
    ch_tuyentu | 1 | 0 → 1 | 0 → 0
    cn_ban | 7 | 0 → 7 | 0 → 7
    cn_chuoi | 9 | 0 → 9 | 0 → 2
    cn_chuviet | 9 | 0 → 9 | 0 → 6
    cn_theo | 9 | 0 → 9 | 0 → 6
    cn_tiec | 9 | 0 → 9 | 0 → 2
    cn_tinh | 6 | 0 → 6 | 0 → 6
    cnv_ban | 7 | 0 → 7 | 0 → 7
    cnv_chu | 6 | 0 → 6 | 0 → 6
    cnv_hach | 3 | 0 → 3 | 0 → 3
    cnv_kho | 4 | 0 → 4 | 0 → 3
    cnv_ma | 6 | 0 → 6 | 0 → 6
    cnv_thu | 4 | 0 → 4 | 0 → 3
    cnv_tieu | 4 | 0 → 4 | 0 → 4
    dtq_binh | 7 | 0 → 7 | 0 → 7
    dtq_hang | 6 | 0 → 6 | 0 → 6
    dtq_ky | 7 | 0 → 7 | 0 → 6
    dtq_ngua | 5 | 0 → 5 | 0 → 5
    dtq_thuong | 6 | 0 → 6 | 0 → 5
    hau14 | 1 | 0 → 1 | 0 → 1
    ke14 | 1 | 0 → 1 | 0 → 0
    muoi_gia | 6 | 0 → 6 | 0 → 6
    muoi_hoi | 7 | 0 → 7 | 0 → 7
    muoi_no | 10 | 8 → 10 | 0 → 2
    muoi_thi | 7 | 0 → 7 | 0 → 7
    muoi_tien | 6 | 0 → 6 | 0 → 6
    nc_gian | 7 | 0 → 7 | 0 → 7
    nc_kinh | 6 | 0 → 6 | 0 → 4
    nc_men | 6 | 0 → 6 | 0 → 3
    nc_nu | 6 | 0 → 6 | 0 → 3
    nc_su | 7 | 0 → 7 | 0 → 7
    nc_the | 6 | 0 → 6 | 0 → 3
    nc_tuc | 7 | 0 → 7 | 0 → 7
    nc_vuong | 7 | 0 → 7 | 0 → 7
    noi14 | 1 | 0 → 1 | 0 → 1
    pf_co | 4 | 0 → 4 | 0 → 3
    pf_guong | 4 | 0 → 4 | 0 → 3
    pf_lich | 4 | 0 → 4 | 0 → 3
    pf_tra | 4 | 0 → 4 | 0 → 3
    pt_dang | 8 | 0 → 8 | 0 → 8
    pt_hai | 8 | 0 → 8 | 0 → 8
    pt_su | 8 | 0 → 8 | 0 → 8
    pt_tang | 8 | 0 → 8 | 0 → 8
    td_an | 5 | 0 → 5 | 0 → 5
    td_ke | 7 | 0 → 7 | 0 → 3
    td_song | 4 | 0 → 4 | 0 → 4
    td_tha | 7 | 0 → 7 | 0 → 7
    thd_dich | 7 | 0 → 7 | 0 → 7
    thd_dien | 7 | 0 → 7 | 0 → 7
    thd_giay | 8 | 0 → 8 | 0 → 7
    thd_sach | 7 | 0 → 7 | 0 → 6
    thd_uoc | 8 | 0 → 8 | 0 → 8
    tt_gia | 7 | 0 → 7 | 0 → 5
    tt_ruong | 7 | 0 → 7 | 0 → 7
    tt_tho | 7 | 0 → 7 | 0 → 5
    tt_thu | 7 | 0 → 7 | 0 → 5
    TOTAL roles 584 · resolved 171 → 584 · hostile 91 → 443 · rows 30 → 138
    PASS 1) every role an arc text uses resolves a row (0 unresolved)
    PASS 2) no road turns a role hostile → not → hostile (same carried person hated twice)
    PASS 3) no page errors
    F14ROLE-ROWS PASS 3/3

## Gates (one browser at a time; build = root index.html of acb144c; base = review/f14role-inherit 6b00d4f0 index.html)
| gate | this branch | base | note |
|---|---|---|---|
| f14role-rows.js (new, law 11) | PASS 3/3 (584/584 resolve, no 1→0→1) | 171/584 | MUTATE=hole FAIL c1 · MUTATE=rehate FAIL c2 |
| f14role-inherit.js | PASS 6/6; «NO ROW» 0 roles / 0 roads (base: 413 / 70) | PASS 6/6 | |
| road-cut.js (92 roads, cut 7) | PASS 273/273 | PASS 273/273 (B) | |
| quickcheck.sh acb144c vs LIVE 8330e8b8 | PASS · core gates PASS · time-spill PASS · open 2218 ms · old LIVE save loads + plays a buổi · perf new/live render 294/319, tab 570/580, buổi 1790/1695 ms, tasks>200 44/37 | — | first run killed by my own 20-min timeout during perf; rerun in full |
| story14-view.js | FAIL Fold + iPad (chapter detail «open:false») | SAME FAIL on base | pre-existing, not this change (data rows only) |
| story14-host.js (http) | FAIL fold/ipadAir/ipadPro (detail open:false) | SAME FAIL on base | pre-existing |
| story14-frame.js (4 steps) | bots stuck at ch.1, crash at :94 before item 3 prints | — | the known harness fault B reported (fix on review/sideq-road-fold, not in this base); item 3's exact logic = f14role-rows check 1 (PASS) |

Files: dev/build/jst14.js (F14ROLE rows only), dev/test/f14role-rows.js (new), index.html + sw.js (build_site.sh; assets.json = base), this report. No BAL, no wording, no kit change.

## r2 restack (FOREMAN C ROOT 4-1-1-1 order, 28/11 ~04:26Z)
New branch review/f14role-rows-r2 on review/f14role-inherit-r2 0e2afaa1 (B BIG RV PASS, FF on LIVE 18003079); f45f76dd left untouched.
- Delta re-applied = the one F14ROLE hunk in jst14.js + dev/test/f14role-rows.js + this report; rebuilt (build_site.sh, assets.json = base). Applied cleanly.
- Double-row check: the r2 base F14ROLE still has its 30 rows (none of the 108 new ones); f14Row / f14Hostile / f14Carried code is identical to 6b00d4f0 (the cnv_chu ch.7 fix is jroad/jst14 flow, not rows) → no row resolved twice, nothing dropped.
| gate | r2 branch | r2 base 0e2afaa1 |
|---|---|---|
| f14role-rows.js | PASS 3/3 (584/584, hostile 443, rows 138, no 1→0→1); MUTATE=hole FAIL c1 · MUTATE=rehate FAIL c2 | 171/584, rows 30 |
| f14role-inherit.js | PASS 6/6; NO ROW 0 roles / 0 roads | — |
| road-cut.js (cut 7) | PASS 270/270 (92 roads, 5 skipped) | PASS 270/270 (same 5 skipped) |
| quickcheck vs LIVE 18003079 | PASS · core gates PASS · open 2164 ms · old LIVE save loads + plays a buổi · perf new/live render 279/293, tab 497/483, buổi 1602/1943, tasks>200 35/32 | — |
