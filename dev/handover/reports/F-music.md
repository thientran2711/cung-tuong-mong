# F-MUSIC — audit + wiring spec (worker F-MUSIC-M1)

PRIORITY #1 CHECK ('bgm|music|musicCtx'): reuse ONE chooser `musicCtx()` (dev/build/j11.js:34) + `setMusic/auTick` (j11.js:29-36, 1.2 s crossfade, re-evaluated on every render/showModal/over) + the jpres.js group→`mus` table (KPG/KPC, wrapper `W("musicCtx")` at the end of the jpres block). NO second music system: KK18 extends these two places only.

## 0. Findings that change the plan (read first)
1. **audio/ is in git, not on the CDN.** `dev/site/cdn_sync.py` has `TOPS = ("img",)` ("audio/ stays in git"), so `cdn_sync.py audio/bgm-x.mp3` uploads nothing. The mp3 files are therefore pushed on branch `review/music-m1` (files under `audio/`, 1.07 MB each). Coordinator: either merge that branch, or flip TOPS to `("img","audio")` and move bgm to the CDN (my recommendation: +24 MB in git is large; moving BGM to the CDN is cheap). No code reads a CDN URL for audio today (`fetch("audio/<n>.mp3")`, j11.js:18), so a CDN move needs one base-URL line in `mkAudio` — KK18 decides.
2. **Music is already switched per popup**, but only 6 tracks exist, so every family collapses to day / night / tension / festival / sorrow / cold. The owner hears "one track on every tab". Real fix = more tracks + a richer key table (below), not new plumbing.
3. **"Kỳ ngộ" has two meanings in code.** (a) `jky.js` chance-encounter cards (`pid:"kyngo"`, title "Kỳ ngộ") and (b) the rare ending ("kết cục kỳ ngộ" = RARE_ENDINGS / `KIT_END` type `rare`, plus `fate`). The owner's sentence is about ENDINGS (b) → `bgm-end-kyngo`. Encounter cards (a) get `bgm-joy` (good surprise). If sếp meant (a) too, change one row.
4. Existing bug: `musicCtx` plays `bgm-festival` for "month 1 or 7, tuan 0" instead of using `festToday()` (14 festivals, different months/weeks). Replace it.
5. Selection days: there is no "Chờ chiếu" string in code; the third selection track is for the waiting-for-summons days after Điện tuyển (state, not a card — see row S3).

## 1. Track inventory (all mono 112 kbps CBR, 76.0 s, fade-in 1.5 s / fade-out 1.8 s, −11.7…−12.0 LUFS, true peak ≈ −1 dBFS; the 6 live tracks measure −10.6…−12.3 LUFS)
Model for every track: Google Lyria 3 Pro via Magnific `audio_music_generate` (ElevenLabs not used). Check per track: ffmpeg ebur128 loudness, silencedetect (−45 dB, ≥1.5 s) = 0 gaps in all 23, no clipping (peak ≤ −0.9 dBFS), size 1,065,004 B (≤ 1.2 MB). Vocals: prompts say instrumental / no vocals; no speech-to-text was run (see §6 open point).

| key (file audio/bgm-<key>.mp3) | mood | Magnific creation |
|---|---|---|
| day-xuan | spring morning, plum, guzheng+dizi | xSoIh8IjfW |
| day-ha | summer lotus garden, light pipa | cpU7PNg0eP |
| day-thu | autumn, erhu, wistful | cpU7PiU0eP |
| day-dong | winter snow, sparse guzheng+xiao | u5cTpIeQLD |
| day-sang | sunrise courtyard, airy dizi, bell | huAzcXTvqL |
| day-chieu | late afternoon, mellow pipa, tea | u5cTpvoQLD |
| night-2 | 2nd night, moonlit, low xiao | 1lXom5Mr4r |
| tension-2 | danger/scheme: drones, sparse plucks | Doy4iM0pcl |
| joy | fresh/joyful, bright dizi | aFzYVENfSh |
| sad | sad/lonely erhu | nVlSOeTYQD |
| mourning | tang tóc, very slow erhu, bell, drum | gOhaQ3dSXO |
| romance | tender love theme | rgB8v92xtc |
| thitam | OWN: very soft warm guzheng+xiao, night, intimate | LwImCR2swO |
| contest | hội thi / trials: pipa, drum, clapper pulse | YMgUyfdWeC |
| banquet | yến tiệc: sheng, dizi, chimes, dance rhythm | 0ewJ9FdTfW |
| conferral | sắc phong / tấn phong: bianzhong, guqin, stately | N2bKj8R6D9 |
| daile | đại lễ: monumental drums, bells, sheng | eI4NZjldqL |
| sel-nhapcung | selection 1: entering the palace, wonder | LwImCpdswO |
| sel-dientuyen | selection 2: Điện tuyển, formal hush | w4fEqvK7EI |
| sel-chochieu | selection 3: waiting for summons | O6uFKuCynm |
| end | ordinary ending, reflective | s7thEhIl8e |
| end-grand | đại kết cục: full ensemble, triumphant | P3Fq15S42C |
| end-kyngo | kết cục kỳ ngộ: most moving, radiant | Doy43i4pcl |
| lanhcung | NOT generated: keep `bgm-cold` (cold, sparse; fits) — the key `lanhcung` is an alias of `bgm-cold` | — |
| fest-<key> ×14 | DONE by M2: newyear nguyentieu thanhminh doanngo phoenix thattich vulan trungthu vantho trungcuu thanhtho dongchi lapbat giaothua; files `audio/bgm-fest-<key>.mp3` on branch `review/music-fest` (reports/F-music-fest.md, −10.9…−12.6 LUFS) | see M2 |

Festival keys on main (j31 FEST + j71 + jsfx): newyear, nguyentieu, thanhminh, doanngo, phoenix, thattich, vulan, trungthu, trungcuu, vantho, dongchi, lapbat, giaothua, thanhtho (M2 confirmed these 14; `hanthuc` is only an SFX key, no festival). Missing file → `bgm-festival`.

## 2. Signals KK18 can use (all already exist)
- state: `S.dead`, `S.place==="lc"` (lãnh cung), `S.buoi` (0 sáng,1 trưa,2 chiều,3 tối = `B4L` night; BUK in j26/j94), `S.month` + `SEASON[S.month-1]`/`SEAK` (xuan/ha/thu/dong), `festToday()` → `{k,name}`, `S.kc` (tuyển tú run), tab = `TABS` key in j84 (act go rv rel court men fac staff kid inv art story log).
- popup `Q[0]`: `pid`, `evId`, `cls` (contains "night", "end", "kes-t-<type>"), `ky`, `pp`, `kit`, plus jpres `kpresCat(m)` = picture category and `kpresGrp()`; endings: `kitEndType(m)` (death exile fail leave throne grand fate rare).
- open mini-game: `document.getElementById("kg82")` open / `startContest` / `playArt` (j82).

## 3. The key function (spec for KK18)
`musicCtx()` becomes `musicKey()` returning a short key `k` (file = `bgm-`+k). First match wins:
1. `S.dead` or ending card (`kitEndType(Q[0])` set): type grand/throne → `end-grand`; rare/fate → `end-kyngo`; death/exile/fail/leave → `end`. (Today: all `bgm-sorrow`.)
2. `S.place==="lc"` → `cold` (alias lanhcung).
3. popup open → the event table in §4 (jpres `KPC`/`KPG` `mus` become keys; `m.__presMus` keeps working).
4. mini-game / contest open → `contest`.
5. festival day (`festToday()`) → `fest-<k>` (M2) else `festival`.
6. base: buổi 3 (night) → alternate `night` / `night-2` (§5); otherwise day variant (§5). Selection run (`S.kc` active): base = `sel-nhapcung` (day of entry) / `sel-chochieu` (waiting days) instead of day variants.
Hold rule: an event track holds ≥ 6 s before switching back, so two chained cards do not flap; crossfade stays 1.2 s (setMusic). Close → `auTick` (already called from `over` wrapper) returns to the base key automatically.
Fallback chain (never silence): requested file fails (`o.fail`/audio `error`) → try family fallback: day-*/joy → `bgm-day`; night-2/romance/thitam → `bgm-night`; tension-2 → `bgm-tension`; sad/mourning/end → `bgm-sorrow`; contest/banquet/conferral/daile/sel-*/fest-*/end-grand/end-kyngo → `bgm-festival`; cold → `bgm-cold`. Start with base tracks lazily preloaded: day variants of the current season in idle time after first interaction (new files are `lazy` in assets.py; only bgm-day is ALWAYS).

## 4. Event / scene table — music today → wanted key
"Today" = what `musicCtx` + jpres return now (6 tracks). Pic cat = evArtCat (jk4 KIT_EVCAT). Rows marked **NEW** have no distinct music today.

| # | family / scene (signal) | today | wanted |
|---|---|---|---|
| E1 | triều chính, general (`trieu-chinh`) | bgm-day (non-pid) / tension (pid) | day variant |
| E2 | bad news: lu-lut, han-han, bien-ai, tham-quan | tension | `tension` |
| E3 | good news: thang-tran, duoc-mua, dai-xa | day | `joy` **NEW** |
| E4 | su-than (envoy) | day | day variant |
| E5 | hoa-than, quoc-tang, tang-le, te-le (tang tóc) | sorrow | `mourning` **NEW** |
| E6 | sủng ái: hoang-de-vui, tu-tinh, mat-uoc | night | `romance` **NEW** (hoang-de-vui `joy`) |
| E7 | hoang-de-dem (emperor's night card), `night1/night2/prep` (Đêm thị tẩm, j8 pid night1/night2, cls "night") | night | `thitam` **NEW** (own track) |
| E8 | vi-hanh, nguy-gia | day | day variant |
| E9 | di-san (inheritance/legacy) | night | `sad` **NEW** |
| E10 | trừng phạt: hoang-de-gian, hinh-phat, hoa-hoan | tension | `tension` / `tension-2` alternate |
| E11 | lanh-cung card + `S.place==="lc"` | cold | `cold` (= lanhcung) |
| E12 | lễ nghi seasonal: le-xuan/ha/thu/dong, any `fest*` cat | festival | `fest-<festToday().k>` else `festival` |
| E13 | yen-tiec (banquet card), jts "Yến …" banquets | festival | `banquet` **NEW** |
| E14 | tan-phong, lễ tấn phong (jts ý 4), promotion cards | day / (festival) | `conferral` **NEW** |
| E15 | Đại lễ: j71 FBIG7 big days (newyear, trungthu, vantho, thanhtho, giaothua), "Đại lễ tế Giao" (jworld AWAY_N.te) | festival | `daile` **NEW** (their own fest-<k> track wins when M2 has it; `daile` for te-Giao and any Đại lễ without its own) |
| E16 | tuyen-tu card; kcE `so` | day | `sel-nhapcung` |
| E17 | kcE `phuc` (Phúc tuyển mini-game) | day | `contest` |
| E18 | kcE `dien` (Điện tuyển), kcEnter result | day | `sel-dientuyen` **NEW** |
| E19 | thinh-an, hh-viec | day | day variant |
| E20 | chăm con: sinh-no, con-tre | day | `joy` |
| E21 | giao thiệp: khach-den, thu-nha, tham-hoi, tin-cung, bac-tien | day | day variant |
| E22 | chuyen-la (strange tale) | night | `night-2` |
| E23 | qua-tang, hao-huu | day | `joy` |
| E24 | hầu hạ: cung-nhan, cung-nu, canh-phong | day | day variant |
| E25 | hoc-tap: tai-nghe (skill card) | day | `contest` |
| E26 | nghi-ngoi: thoi-tiet | day | day variant |
| E27 | dieu-troi (omen) | night | `night-2` |
| E28 | dieu-lanh (good omen) | day | `joy` |
| E29 | benh-tat, dich-benh | sorrow | `sad` **NEW** |
| E30 | mưu kế: tranh-sung, tin-don, tai-mat, mat-bao, am-muu, vu-oan, hoi-lo; cards with `pid` j70/j71x/j72 scheme | tension | `tension` / `tension-2` alternate |
| E31 | hại người: dau-doc, hai-thai | tension / sorrow | `tension-2` |
| E32 | story cards "Chính tuyến / Phụ tuyến" (`kpresStory`) | day | day variant; hồi cao trào (`ARC67` climax card) `tension` |
| E33 | Kỳ ngộ encounter card (`pid:"kyngo"`, jky.js) | tension (pid) | `joy` **NEW** (see §0.3) |
| E34 | thị tẩm result / next-morning card | day | day variant |
| E35 | `kitpg-timed`, `j97x` rare-ending hint card | tension | `joy` |
| S1 | selection run, entry day / Nhập cung card (jkc) | day | `sel-nhapcung` **NEW** |
| S2 | Sơ tuyển (kcE `so`) | day | `sel-nhapcung` |
| S3 | waiting days after Điện tuyển until first summons (`S.kc` active, no card) | day | `sel-chochieu` **NEW** |
| C1 | any mini-game / contest open (`kg82`, `startContest`, `playArt`), hội thi, thi tài (jts), Hội Phượng contest | tension (pid) | `contest` **NEW** |
| C2 | exam / promotion test (kcEntryExam) | tension | `contest` |
| B1 | banquet days (jts FEST 1 "Yến tiệc đầu xuân", 7 "Thi tài Thất tịch") | festival | `banquet` (contest part `contest`) |
| M1 | S.dead: death «Kiếp này» (`kes-t-death`) | sorrow | `end` |
| M2 | exile / fail ending (`kes-t-exile`, `fail`, jge geR not ok) | sorrow | `end` |
| M3 | leave (xuất cung) ending | sorrow | `end` |
| M4 | grand ending: geR ok, `kes-t-grand`, throne | sorrow | `end-grand` **NEW** |
| M5 | rare ending (`kes-t-rare`), Bảng Thiên mệnh (`fate`) | sorrow | `end-kyngo` **NEW** |
| M6 | title screen / Sổ luân hồi | (no S → bgm-day) | `day-xuan` |

Cards with `pid` not listed in the 11 jpres rows (shops, gift/plant picks, `giftpick`, `itarget`, `evpick`, `cmPick`…) are menus: keep the base key (already excluded in j11.js:34/77).

## 5. Base rotation (tabs + time)
- Base day key = `day-<season>` (xuan/ha/thu/dong from `SEAK[SEASON[S.month-1]]`), except buổi 0 → `day-sang`, buổi 2 → `day-chieu`; buổi 1 → the season track; buổi 3 → `night` / `night-2`.
- Anti-repeat: keep `AU.last2` (last two base keys). If the new base key equals the one playing, pick the next from the candidate list of that slot: sáng {day-sang, day-<season>}, trưa {day-<season>, day}, chiều {day-chieu, day-<season>}, tối {night, night-2}. Rotate only when the tab changes or the buổi changes (never mid-track; the end-of-loop handoff in startTrack replays the same file — at handoff, also advance to the next candidate so a long stay on one tab alternates).
- Tab hint: odd-index tabs (go, rel, men, staff, inv, story) prefer the second candidate; so two tabs in a row do not give the same loop.
- All variants are ≈ −12 LUFS so the change is felt as a new piece, not a volume jump.

## 6. Open points for the coordinator
1. Vocals check is by prompt only (no speech tool in this session; Magnific `creative_transcribe_audio` could be run later on all 23 if wanted).
2. The 23 files are 24.5 MB in git on `review/music-m1`. To shrink: re-encode 64 kbps ≈ 0.6 MB each (≈ 14 MB). Say if wanted.
3. audio/MANIFEST.json: 23 entries (kind music, file, magnificUrl, seconds 76.04, bytes 1065004) are in the branch; M2 adds `fest-*` the same way (merge, don't overwrite).
4. `bgm-sorrow` stays as `sad`/`end` fallback; `bgm-festival` as fallback for fest/banquet/etc.

## 7. Handover note
START_CTX ≈ 6 % of the window; used so far ≈ 35 %; no rollover needed.

MUSIC SPEC READY

## FOREMAN F CHECK + CDN (24/11 07:22Z)
- CDN: all 37 new tracks uploaded by Foreman F to audio/bgm-<key>.mp3 (23 core from review/music-m1 + 14 fest from review/music-fest; old 6 untouched); img/_index.json rebuilt; spot-fetch 200 OK (joy, thitam, fest-trungthu, end-kyngo). The CDN worker already serves /audio/* (bgm-day.mp3 200). No md5 duplicates among the 37.
- Loudness/size (ffmpeg ebur128): core 76.0 s, −11.7…−12.0 LUFS, 1.07 MB each; fest 85.9–90.1 s, −10.9…−12.6 LUFS, 1.03–1.08 MB; live bgm-day = −11.3 LUFS → matched.
- VOCAL CHECK DONE: faster-whisper base on every track, VAD on: 0 speech-like segments in all 37 (banquet 4 / end-grand 1 raw VAD segments, all no-speech) → instrumental, PASS.
- «daile» trigger (MAIN 118 Q): daile plays for (1) Đại lễ tế Giao (jworld AWAY_N.te); (2) the GRAND investiture ceremony of the top ranks (Hoàng quý phi / Hoàng hậu / Thái hậu sắc lập, D's promo-redesign «đại lễ» step) — an ordinary rank sắc phong keeps «conferral»; (3) court rites with no festival track of their own (e.g. jend14 «đại lễ Thái miếu»). A yearly festival that has bgm-fest-<k> always uses its own track.
