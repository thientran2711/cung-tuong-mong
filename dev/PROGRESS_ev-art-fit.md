# PROGRESS review/ev-art-fit (worker, session 8)
Owner 15/11: "Mệt ghê á. Mấy cái ảnh minh họa không liên quan gì cả." (VIỆC "Lời cảnh báo" showed the gift box "Có người đến chơi")
+ "Hình minh họa đâu? Khung sự kiện đâu?" (BÁO "Hảo hữu vào cung" had no picture) + ruling: one picture per MEANING GROUP, shared.

## Done
- jk4 kitEvArt: removed the "who is on the stage" default (visitor → j24:co-nguoi-den gift box, Emperor → ngự giá, Thái hậu → thỉnh an),
  in both branches. jk2b kitNewsArtId: no "people visiting" default (→ cat:tin-cung). jtsb: 4 events no longer show the ROOM (tsbPlaceArt)
  but their group (Điềm lạ → chuyen-la, Bị ép/uy hiếp đòi của → hoi-lo, Lần đầu gặp mặt → tham-hoi, Đèn nến → hoa-hoan).
- NEW dev/build/jevfit.js (before jk4 in assemble.py): KIT_EVFIT meaning rules (title + first two sentences) → group = EVENTS.json category
  ("cat:<group>", j89 evArtCat) or a picture; kitEvFitWant: BÁO/TIN/KẾT QUẢ/VIỆC/BAN THƯỞNG/MẬT BÁO/CẢNH GIÁC/CHỨNG CỨ panels get a picture
  (jk2b showModal). KIT_EVFIT_OVER: warnings beat the shared j70thr banner (jevban). KIT §28.10c documents it; KIT_EVCAT frames for new groups.
- Bug found by the scan: KBK title match read "Phụ/Chính tuyến" as "yến" (feast) → every quest without own art showed "Yến tiệc". Fixed (prefix stripped).
- Art (gpt-2-6, folder ba4aecfe…, style ref ev-tai-mat / ev-cung-nu, looked at every one, hands checked), on the CDN:
  ev-mat-bao (maid whispers a warning behind a screen; 1024x690 so heads stay in the 2.3:1 band), ev-am-muu (consort hands a packet + silver
  to a kneeling eunuch), ev-bac-tien (silver ingots, purse, ledger, abacus), ev-canh-phong (eunuch with lantern guards the barred gate),
  ev-hao-huu (two friends hand in hand through a moon gate; co-op), ev-nguy-gia (consort pulls the Emperor from a falling beam). 94–197 KB each.
- EVENTS.json (CDN): new categories mat-bao, am-muu, bac-tien, canh-phong, hao-huu, nguy-gia, tham-hoi (ev-khach-den), qua-tang
  (ev-khach-den-2), tin-cung (ev-news-tin-trong-cung); khach-den now only the tea-visit picture (the gift box left it); e68 giftArrive →
  qua-tang, gossipTea/kindVisit/newGirlAdvice/officialWife/borrowDress → tham-hoi.
- Tests: dev/test/ev-art-fit.js (every builder + bot lives; before/after JSON), dev/test/ev-art-fit-shots.js (owner cases, 3 sizes).

## Not touched (owners)
night pictures (review/night-end-r1: ksp/night1/night2/prep keep theirs; Kính sự phòng notices use the existing ngự giá group),
option cards (review/opt-pics), act collisions (review/pic-dupes), Nhập cung (review/newgame-ui), week book lines (owner rule).
