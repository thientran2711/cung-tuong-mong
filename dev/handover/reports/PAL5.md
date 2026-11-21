# PAL5 — L1726 live + compare sheets (worker of Foreman C #20)
START_CTX 0 % · depth 2 · 0 gens · 0 cr

## 1. L1726 is LIVE (owner verbatim via Foreman C #20: "bắt đầu ra đúng cái vibe, đúng cái cảm giác mà tao muốn rồi đó. Ok, duyệt bảng màu chung mới đi.")
- `dev/art/face-common/palettes_season.json` = L1726, 90 consorts (s62–s65 now in; old live had 86 → check_unique had 4 FAIL).
- History: old live copied to `dev/art/face-common/palettes_season_preL1726.json` (untouched). `palettes_season_L1726.json` / `_L1583.json` unchanged.
- Converter `dev/art/palettes3/make_live_L1726.py` (re-runnable). Why it is not a plain copy — the readers need it:
  - build_all.py (B20 secondary "as written", đông main/sec) puts `main`/`sec` straight into ENGLISH prompts. L1726 had "hồng mẫu đơn đậm #933966" there.
    → `main`/`sec` = English words (vi→en table in the script), `main_vi`/`sec_vi` Vietnamese, `main_vi_hex`/`sec_vi_hex` = L1726's old strings.
  - English words are coarser than hexes → 32 "same name pair" FAILs; fixed by adding a hue-cast/depth word from her own hex only where two people clash
    (e.g. "airy cornflower-tinged mist blue"; 65 of 720 names).
  - `root_drawn` (L27: colours her EXISTING picture was drawn in; check_store.root_pair reads it first) carried from the old live file onto her L1726 root
    season for 53 people, EXCEPT the G50-released roots (owner L1645: ★GỐC recoloured, old pictures = kho skins). c20 etc.: old live root pair kept as root_drawn.
- Checks:
  - `python3 dev/art/palettes3/check_unique.py` → 90/90, **0 FAIL**, 206 WARN (= L1726 itself 0/206; old live was 4 FAIL).
  - check_store `--scope face --pid` on all 84 face-common/*.v3.FULL.txt, before vs after: 18 pre-existing ROOT HEX fails unchanged; **7 new** = c08 c10 c14 c27 c28
    c31 c32 — all G50-released roots: their old face prompts carry the old root pair, the new root is the recoloured one (expected; a redraw of any of them needs the L1726 root pair).
  - `check_store.py --self`: same 2 pre-existing PROOF MISMATCH (S14, S19) with and without the change.
  - `build_all.py m04 3 --season dong` / `c06 3 --season dong` → exit 0, gate PASS, English L1726 đông colours in the TWO-COLOUR sentence.
  - `keep_check.py --all` → 441 sidecars PASS.
- Foreman (rule.py): B20 pointer line to set: **"B20 = dev/art/face-common/palettes_season.json = palettes_season_L1726 (owner approved via Foreman C #20, LIVE by PAL5); history palettes_season_preL1726.json"**.
  Ledger line: `PAL5 L1726 LIVE: palettes_season.json <- L1726 (make_live_L1726.py), check_unique 0 FAIL/206 WARN, keep_check 441 PASS, 0 cr`.
- Not changed: palettes_season_deep.json (check_store s44 / c06 trial still read it), hair table.
- Naming notes (not fixed, owner-approved data): a few odd Vietnamese names from the L1726 engine, e.g. "cam quýt nhạt nhạt", "dịu tím than".

## 2. Compare sheets (owner: hard to compare)
`dev/handover/review-sheets/pal_L1726/sosanh_{xuan,ha,thu,dong}_{1,2}.png` — 8 sheets, 1080 px wide (phone), 45 rows each, all 90 people in group order.
Each row: person + group | CŨ L1583 (left) → MỚI L1726 (right), big box = main, small = secondary, Vietnamese names, ★ = root, grey + "=" when unchanged.
Split in 2 per season because 90 rows in one picture is ~9 000 px tall (unreadable on a phone). LOOKED: xuân 1 top, hạ 2 top, thu 1 middle, đông 2 bottom.
Script `dev/art/palettes3/sosanh_L1726.py`.
