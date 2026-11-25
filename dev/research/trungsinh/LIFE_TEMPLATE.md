# TRUNGSINH life record — template (lead: TRUNGSINH-STORY, session_01V1ZZGzGFi21WiTptDmEZ45)

One file per life: `dev/research/trungsinh/life-NN.md` (NN = 01..20; lead = 01–05, TS-P2 = 06–10, TS-P3 = 11–15, TS-P4 = 16–20).
Push to branch `review/trungsinh-story` (rebase on it; only add your own files; never touch other files). Push after EVERY life.
English, tables, short. Quote the game's Vietnamese only for names/titles/ending texts (exact wording matters there).
Rules: reference only — never copy their art/text into our game; real taps in one Playwright browser at human pace (≥1–2 s per action);
no scraping of their JS/assets/API. Shots stay outside git (max 2 per life worth keeping → tell the lead the local path).

## How the game works (what the lead learned in life 1 — saves you time)
- URL https://trungsinhgame.com (no login; save in localStorage → keep ONE browser context alive, or save storageState before restarting).
- Start: «Nhận thân phận kiếp này» → identity card (origin, parents, stats, Thiện/Ác/May mắn) → «Roll lại thân phận · 1 điểm» (costs 1 luân hồi point) or «Nhận thân phận · Vào tuyển tú».
  Card text: «Kiếp kết thúc tự nhiên +1 điểm; cưỡng ép luân hồi hoặc kết thúc do trượt tuyển tú không nhận điểm. Mỗi thành tựu mới +1 điểm.»
- Tuyển tú = a DRAWING test (copy a line picture on a canvas; score 85+ Bảo lâm, 70–84 Ngự nữ, 50–69 Thải nữ, <50 FAIL = life ends, no point).
  Draw with mouse down/move/up strokes roughly matching the sample (a lantern drawn as ellipse + 4 ribs + caps + tassels scored 81).
- Monthly loop: 5 action slots (Lễ nghi, Đọc sách, Tài nghệ, Đối đáp, Y quan, Nhận việc, Lập danh, Dâng công) → «+1 THÁNG».
  Each month may pop an event modal: choice events show «<stat> · Thuận lợi NN%» per option; bully events («Kẻ trên gây khó dễ»: give silver / refuse); fashion festival («Lễ hội thời trang cung đình»); result cards («Vượt qua phép thử» / «Một bước chông chênh»).
- Countdown milestone on screen: «Đại khảo thăng phẩm · Còn N tháng» (rank exam every 24 months).
- Tabs: Cuộc đời (home), Hoàng cung (map, 5 thể lực/month, visit places, meet NPCs «Làm quen / Tặng quà»), Túi đồ, Nhân duyên. Hourglass top = luân hồi points.
- Speed tip: an autopilot that clicks the highest-odds option + «Tiếp tục» and does 3 actions/month runs ~15 s per month; stop it on any new kind of modal and decide by your style.

## life-NN.md — copy this block and fill every row
```
# Life NN — <full name> (player seat, style)
| Field | Value |
|---|---|
| Real time played | start HH:MM UTC → end HH:MM UTC = N min |
| Origin | e.g. con Huyện úy Cửu phẩm, mẹ tiểu thiếp; rolls used |
| Start stats | Dung/Trí/Tài/Hoạt/Thiện/Ác/May |
| Tuyển tú | test + score + rank given |
| Style played | obedient / schemer / favourite / maid / ... + how (which options you favoured) |
| Ranks reached (age) | Ngự nữ 16 → ... |
| Age at end / in-game years | 23 tuổi 4 tháng / 7 years |
| END TYPE | death / story closure (non-death ending) / failed selection / forced reincarnation |
| DEATH CAUSE (exact game text) | «...» |
| Warning or odds shown before death | e.g. «Khó sinh · Thuận lợi 48%» / none |
| Pregnancies | n; for EACH: age, outcome (born son/daughter, miscarriage, khó sinh survived/died, poisoned/pushed), odds shown |
| ENDING name + full ending text | «...» (verbatim) |
| End card / share card | what it shows (title like «Một kiếp phù sinh», stats, rank, achievements) |
| Kept after the life | luân hồi points +N, achievements (names), collection unlocked |
```
### Story beats (chronological, one row per event that mattered)
| Age | Event title (game) | Who (recurring NPC?) | Choice taken | Result | Opens / closes what later? (callback, foreshadow) |
|---|---|---|---|---|---|

### Recurring characters this life
| Name | Role | How they carried a storyline (how many beats, how it ended) |
|---|---|---|

### Features / systems seen (new ones only)
| Feature | How it works | Story use |
|---|---|---|

### Pacing
Months per year of real time; how often events fire; quiet stretches; when the life felt fast/slow.

### 3 lines: what made this life memorable (or not)
