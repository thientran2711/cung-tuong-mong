START_CTX ~4 % (get_session not read; own estimate) · coordinator ROOT-C6 session_01D3E3NbR3sDtAqDLRspEis7 · worker ROOMS1 session_01D3E3Nbe6Bq694LDaKecAKd
PRIORITY #1 CHECK ('rooms1|consort-room|window drape|L30'): OD 0 | ledger 14 | claims 7 | main 1 | review/* 1 | archive 2 — reused PLACES4 scan list + PLACES5 EDIT recipe (M2370-49 template), window_L30.txt, room_gate.py, swap_L2370 pattern; nothing to rebuild.
# ROOMS1 — 16 consort-room bases, window drapes off (owner 23/11 03:15Z "tiếp tục vẽ tranh phòng ốc", 03:25Z "thay luôn đi"; L30 structure-true; G78)
Method: gpt-2-6 2k 3:2 EDIT of each LIVE img/<key>-ha-sang.webp (1620x1080, uploaded to folder ba4aecfe…), one prompt per room =
PLACES5 head ("change ONLY the fabric drapes… show exactly what was behind them") + a room sentence naming each drape and every opening/scroll/bed curtain to keep + window_L30.txt.
Builder dev/art/place-rank/rooms1_edit_prompts.py → dev/handover/prompts_L2095/RM1-NN_<key>_EDIT_ha_sang.txt; room_gate PASS ×16. No caption (no decap step).
Credits: 16 × 135 = **2 160 cr** (simulate_cost exact). Balance before: 2 778 266. 0 redos.

## OLD → NEW, structure check (G78: walls, pillars, niches, doors, windows/sashes, hung objects) — LOOKED at all 16 side by side
| code | live file | gen | drapes removed | structure |
|---|---|---|---|---|
| RM1-01 | canh-phuc-cung | p8PuGywehw | green sheers L+R edges → shut red lattice windows | moon gate + garden view, screen, settee same |
| RM1-02 | canh-phuc-cung-tay-phoi | fHnLdWICDY | cream sheers at right window | window frame + open lotus view same; round window, bed-alcove curtains (kept), scroll same |
| RM1-03 | chung-tu-cung-dong-phoi | iGKDUxH3uK | blue sheers both sides of big window | big window + bridge view same; lattice side panels shown |
| RM1-04 | chung-tu-cung | s7t3HCIl8e | blue sheers L edge, both sides of opening, R | big opening + corridor view same; wisteria lattice wall same; pillars shown where drapes were |
| RM1-05 | dien-huy-cung-dong-phoi | mE21DHahJQ | pink window drapes left | window + view same; canopy bed keeps its pink bed curtains |
| RM1-06 | dien-huy-cung | 1lX4E79r4r | pink drapes L+R edges | gilt pillars + shut lattice panels; central pavilion view same |
| RM1-07 | dien-huy-cung-tay-phoi | lJmRbN8gv9 | pink drape at right window | right window shut lattice; central window keeps its 2 open sashes; peony scroll on wall |
| RM1-08 | ham-an-cung-dong-phoi | vQGxe1Ha47 | gold drapes beside window + left | window + view same; scroll on right wall |
| RM1-09 | ham-an-cung | u5cg8GfQLD | orange valance + 2 drapes | transom lattice + lattice wall shown; open lattice doors + courtyard same; bookcases, lotus scroll same |
| RM1-10 | khai-tuong-cung-tay-phoi | s7t3qoSl8e | cream sheers both sides of window | window keeps its one open sash; phoenix scroll same |
| RM1-11 | thua-minh-cung-dong-phoi | Td7aZUaVNR | white sheers left + right of window | left tall lattice windows shut; central window same; landscape panel same |
| RM1-12 | thua-minh-cung | lJmRbtqgv9 | white drapes top corners | lattice windows shut; round window + waterfall same |
| RM1-13 | thua-minh-cung-tay-phoi | 0ewvZDfTfW | white drapes round window | round window same; canopy bed keeps its curtains |
| RM1-14 | truong-xuan-cung-dong-phoi | 5jpOfxDKxe | coral drapes at right window | window + bridge view same; lattice side panel shown |
| RM1-15 | truong-xuan-cung | 1lX4uggr4r | coral swags/drapes L, centre-left, R | red pillars + lattice panels shown; open veranda view same; swallow screen same |
| RM1-16 | vinh-hoa-cung | bxDJalz5Y2 | bamboo-print drapes left | shut lattice panels; bamboo-grove opening same; scroll on wall |
No wall/column/niche turned into a window, no new opening, no sash newly opened, no hung object moved. Bed curtains kept everywhere.
Sheets OLD|NEW: https://ctm-img.victoria-tntt.workers.dev/img/_review/rooms1/rooms1-old-new-01_02.jpg (…-03_04, -05_06, -07_08, -09_10, -11_12, -13_14, -15_16).

## Into the game
- New files 1620x1080 WebP (q76–82, sized ≤ old +5 %): 5.63 MB vs 5.58 MB (+44 KB total). Staged CDN img/_review/rooms1/new/; old live backed up img/_review/rooms1/old/.
- review/rooms1 @6770bcadd (off origin/main): dev/art/place-rank/swap_rooms1.py (dry run: 16 would change; --go swaps + cdn_sync; --revert), SWAP_ROOMS1.md, dev/test/rooms1-look.js.
- LIVE SWAP NOT RUN: my `cp → img/ + cdn_sync` of the live files was refused by this session's permission classifier (overwriting live CDN files). Lander runs
  `python3 dev/art/place-rank/swap_rooms1.py --go` then the site build (assets.json takes keys from img/_index.json).
- LOOK (pre-swap, new files routed in): 755x1000@2 + 1180x820@2, real hall path (S.hall + goTo → kpmRoomImg → residenceArt): 32/32 halls show the new <key>-ha-sang, 0 page errors; screenshots looked at.
- Note for the lander (not mine): N13 swapped 6 places on the CDN but origin/main assets.json still has the old keys (e.g. a-ca-so-ha-sang 936802 B) → needs the same site build.
- Variants: the 15 season×buổi pictures per room still have drapes (option 1 = bases only).
STATE: DONE (pending live swap by lander). Worktree /home/user/wt/rooms1-wt kept until the swap is confirmed.
