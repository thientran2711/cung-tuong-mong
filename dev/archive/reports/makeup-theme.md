# review/makeup-theme — SẴN SÀNG KIỂM 3a54ec94

PRIORITY #1 CHECK: OD 25 ('Diêm dúa|Kiều diễm|Khuynh thành|…') | main: jtoil.js TOIL_MK/toilPreName/toilReact, jts.js Hội phối đồ (TS_THEME, tsDressHold), jlux theme tags, j1 LIKES/discover | review/*: toil-looks, toil-looks2, toil-overlay(-r1/-r2), toil-react(-r1), toil-reveal-fix, diemtrang-score(-r1) (render/overlay — not touched) | claims: none for makeup theme/taste. Reused: TOIL_MK, toilFx/leAttire/toilReact (ONE judgement + reaction system), toilNpcPlay (one sitting table), the morning mirror (toilColUI → 3 hồi → reveal), tsOpt/tsPanel/kitRows, LIKES/E.known + discover() for Hoàng thượng, wdMama (Tống ma ma etc.), S.mat (Tai mắt).

Base: origin/main 6c4f21c3 (merged again before report: up to date). Worker session_01N1tNP2LT2KVhpghZdmGafo, START_CTX ~3 % (1 M window), ended ~25 %.

## What was built
1. NAMES (OD:L1553-1554) — ONE label source `TOIL_MK` (jtoil.js): moc Mặt mộc · vung Vụng về · vua Đoan trang · dep Kiều diễm · tuyet Khuynh thành · diem Diêm dúa; `toilMkW(k)` for inside a sentence (names keep capital, only "mặt mộc" lower case). Ids unchanged (old saves keep keys). Every printing place switched: why rows, top-bar chip, chip popup, mirror buttons ("Để mặt mộc"), log/Sổ ghi line, result card, reveal card, crowd/rival lines ("dung nhan ta Khuynh thành"). TOIL_HINT rewritten so no hint carries another level's name ("Thanh nhã đoan trang" on đẹp was the old clash). Preset groups now `TOIL_STY`: "Kiểu thanh nhã" / "Kiểu cầu kỳ" (the bold group; "Diêm dúa" is only the overdone RESULT). Dress words that clashed with "Đoan trang": TOIL_HK "thích y phục …", ma ma hint "thỉnh an nên chỉnh tề". VANPHONG §1 makeup table (id → name → meaning) + KIT.md note; jne/KIT comments.
2. TONE WORDS OFF (OD:L1515) — preset name display (toilPreRows) and toilPreName print only the preset name. Tone stays hidden.
3. THEME + TASTE RULES (OD:L1514/1516; new jmkt.js after jts.js; numbers BAL.toil.taste / allowRk / underOcc):
   - Each đề has a hidden want: tone (đào cam / hồng tím, or by season for Hương sắc / Cổ phong) + bold (Phú quý, Hương sắc want Kiểu cầu kỳ AND ≥ Kiều diễm).
   - Discovery through existing roads: notice row "Son phấn" (chưa rõ → roads) + three tsOpt roads in the notice: hỏi ma ma (wdMama, Lòng), sai tai mắt (Tai mắt + Tâm cơ, Bạc), hỏi a consort with thiện cảm ≥25 (tone only); past contests (the result tells the want; remembered per đề+tone); đề colours + season shown. A miss teaches nothing (never a false answer).
   - Contest day: after the dress board she sits at the ONE mirror (jtoil colour pick → 3 hồi → reveal, festival allowance), note under swatches shows the known want; ✕/Esc/Đã hiểu hands the contest back exactly once (kg82Close hook). Bot seat sits from skill.
   - Score: tsMkPts (tone ±, group ±, level, bold đề under Kiều diễm −) × w 1.5 added to the contest total. Result line: "Dung nhan …, son phấn …: điểm trang cộng/trừ N (Diêm dúa: người ta chê phô trương). Đề X năm nay chuộng …".
   - Rivals: same rule; know the want with chance from Tâm cơ/Tài/Đức/Tai mắt/traits (hash, no Math.random); face from toilNpcPlay (Sắc+Họa, festival, their rank). Co-op friend: her own sitting record when present.
   - Per-person liked tone (Thái hậu, Hoàng hậu, each consort by hash; Hoàng thượng = LIKES.mk "Son phấn" row in Điều ngài thích, learned by discover() too). Inside toilFx: known → shows on the meeting card (Vì sao) and counts; unknown → once per host per day a toilReact popup (own spoken lines) + she learns it. NPC looks judged by hosts with the same table (two-way).
   - Big occasion (F 2) wants ≥ Kiều diễm (−1 thiện cảm, not frugal/jealous hosts). Rank: toilAllow(occ, rank) shift [Đáp ứng..Quý nhân −1, Tần/Phi 0, Quý phi+ +1] → overdoing beyond rank = Diêm dúa.

## LUẬT SỬA CẢ NHÓM — scan (player-visible level words in jtoil.js strings)
| place | before | after |
|---|---|---|
| TOIL_MK | mặt mộc/vụng/vừa/đẹp/tuyệt/diêm dúa | Mặt mộc/Vụng về/Đoan trang/Kiều diễm/Khuynh thành/Diêm dúa |
| why row / chip / chip popup / log / result / reveal | "trang điểm đẹp" etc. | "dung nhan Kiều diễm" (TOIL_MK) |
| preset rows / toilPreName | "Hoa lê (sắc lạnh)" | "Hoa lê" |
| preset groups | Kiểu thanh nhã / Kiểu diêm dúa | Kiểu thanh nhã / Kiểu cầu kỳ (TOIL_STY) |
| crowd/rival texts | "tuyệt mỹ", "diêm dúa", "vụng về" typed | toilMkW(...) |
| buttons / card text "mặt mộc" | typed | toilMkW("moc") |
| TOIL_HINT dep | "Thanh nhã đoan trang…" | no other level name (test hintNoOtherName) |
Remaining hits are NPC dialogue adjectives ("đoan trang" about demeanour) and code comments. Other modules: no level printing outside jtoil (grep TOIL_MK/look ids: jne comment only).

## Bot measure (dev/measure/makeup-theme-bot.js, 500 × 10 đề·month)
| player | mean makeup points | Diêm dúa % | Vụng về % |
|---|---|---|---|
| skilled + scouted | 3.61 | 9 | 16 |
| skilled, not scouted | 1.1 | 9 | 15 |
| scouted, not skilled | 2.26 | 9 | 29 |
| random | 0.49 | 4 | 29 |
| bare face | −4 | 0 | 0 |
Dress part for scale (raw × 4): random set 3, best set 35.2 → makeup ≈ 1/5 of dress, decides close places. Skilled+scouted > random on all 10 đề·month. Rival knows the want: low stats 18 % → top stats 85 %.

## Tests
- dev/test/makeup-theme.js (new): 12/12 ok at 755x1000 and 1180x820 (names, noTone, hints, notice, scoutLearn, sitNote, swNoTone, sitDone, bot contest, taste surprise+learn+card, rank, old save without new fields), 0 page errors. Shots looked at (notice panel, contest mirror): kit parts only.
- one-core-guard: 0 fails (no --allow-grow). quickcheck PASS (core gates incl. coop-one-world, old save ok, perf ≈ live). coop-e2e 60/60. toilette.js 0 errors.
- Not run: ts-oldsave.js (needs a pre-jts build; quickcheck old save covers live→new).

## Notes for Foreman B
- Naming choice to confirm: bold preset group "Kiểu cầu kỳ" (owner's own word 03:38Z: "cầu kỳ chứ không phải là diêm dúa").
- review/toil-looks2 drops 'tuyet' (owner 04:44Z, overwritten by 05:00Z/04:54Z 6 levels) — not merged; this branch keeps the 6 ids. If toil-looks2 lands it conflicts with TOIL_MK/tier.
- Pre-existing, not in scope: Hội phối đồ NPC DRESS uses roll()/pick() (Math.random) per seat; the makeup part is hashed.
