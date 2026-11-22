# DESIGN BIBLE — Cung Tường Mộng (working book for Foreman C + art workers)
Owner order L2276 (21/11, via ROOT-B7): "tôi chỉ cần một cái cuốn design Bible để cho chính bạn làm việc thôi. Sau này có cần thì cứ lôi cái cuốn này ra, luật chung hay là prompt chung hay cái gì đó."
This file is an INDEX + the current core. It does NOT copy rules: it points at rule IDs. Look a rule up with `python3 dev/art/rule.py find <words>` (VN/EN). Keep this file short (< 10 KB); update it when the owner says "duyệt" or locks something.

## 1. Where everything lives
| What | Where |
|---|---|
| All art rules (318+, by ID) | dev/art/ART_RULES.md — use `rule.py find/set/add/check`, never read whole |
| Rule history / conflicts | dev/art/ART_RULES_HISTORY.md · ART_RULES_CONFLICTS.md |
| Owner verbatim + gate history | dev/art/FIGURE_GATE.md (grep) · dev/OWNER_DECISIONS.md (1.2 MB, grep "OD:L…") |
| Common prompt blocks (byte-identical copy, A57) | dev/art/common_blocks/ (README.md, phoenix_plumage.txt) |
| Builder (all outfits) | dev/art/store-all/build_all.py (+ lowneck_L2228.py wired in) |
| Store gate before every prompt/gen | `python3 dev/art/check_store.py <prompt> <args>` (A19) |
| Keep check before sending prompts | `python3 dev/art/keep_check.py --all` / `--sidecar <file>` (A38) |
| Per-person data | dev/art/face-common/ (palettes_season.json LIVE palette, OWNER_GROUPS_L686.json personality groups), dev/art/KC_REFS.json (face refs) |
| Paste-ready prompt files for the owner | dev/handover/prompts_L2095/ (code M<Lượt>-<nn>, A56) |
| Owner's own GPT/Magnific runs (THE comparison base) | dev/art/owner_runs/ |
| Compare sheets | dev/handover/review-sheets/so_sanh_* |
| GPT palettes | dev/art/palette_gpt_L2259 (v1, rejected) · L2262 (v2) · **L2272 (v3 = KEEP, L2274)** |
| Old style anchor (superseded direction, see §3) | dev/art/STYLE_ANCHOR.md, MASTER_COMMON.txt |
| Status / worker reports | dev/handover/FOREMAN_C_STATUS.md · dev/handover/reports/<WORKER>.md |

## 2. Approved core (locked — change only on the owner's explicit order)
- **Work laws**: A18 (change only what she raised), A17 (diff vs last approved), A20/A21 (no redraw without yes), A7 (only "duyệt" approves), A53 (no Magnific drawing — she draws in ChatGPT; exception only when she orders a run), A55 (tests never go into the builder), A56 (picture code on every prompt), A57 (approved picture = frozen prompt; shared parts = common blocks).
- **Rank ladder** (8): t1 Đáp ứng · t2 Thường tại · t3 Quý nhân · t4 Tần · t5 Phi · t6 Quý phi · t7 Hoàng quý phi · t8 Hoàng hậu. Designs per rank: G1, G3 (QP two-tier cloud collar), G12 (HQP/HH), G46 (Tần capelet / Phi cape), G67 (no outer cloak QP/HQP/HH).
- **Fabric**: B12 (t1–t5 thin flowing silk; t6+ brocade); same breeze/motion sentence all ranks + extra motion line t6–t8 (L2239).
- **Sleeves**: G5 ladder, re-confirmed L2215/L2238 (t1–t3 knees · t4–t6 mid-calf · t7–t8 ankles / floor).
- **Neck/collar**: G76 low neckline a18–a36 all women (L2228) · Hán collar LOCKED G62/G66 (L2234: Hán excluded from G76) · G70 t7/t8 chest = lower-rank neckline · G71 square neckline framed.
- **Embroidery**: G65 placement/size · G68 Tần density · G73 natural chest embroidery · L2232: density t2<t3<t4, t3 ties embroidered, centre panel t3–t8 by rank.
- **Sash / ties / bow**: G60 bow centred · G61 front waist free · G57 no jade pendant · one tassel/tie length all ranks (L2206/L2233) · Phi sash more gold than Tần (L2232).
- **Thu signature**: G75 soft vân kiên every rank; HQP vân kiên = HH's (phoenix under pearl net, L2233). Latest thu set = M2231-02..08 (THUROOT9 report).
- **Colour**: royal yellow #EFBD69 (B17 t7/t8, B21) · Thái hậu deeper yellow (B22) · HH yellow set LOCKED (L2226) · phoenix plumage G33 (L2235 set **superseded by GPT palette L2274** when PALGPT1 lands).
- **Palette (L2274)**: "giữ cái bảng màu của ChatGPT" → GPT v3 dev/art/palette_gpt_L2272/ is the game palette; being written into palettes_season.json / flower / veil / plumage by PALGPT1 (report dev/handover/reports/PALGPT1.md).
- **Others**: F14 no Qing headdress · E1 angles · B9 gen sizes · C5 men · L21 bed height · **L29 bed width ladder** (L2329: anchor Cảnh Phúc Phi frontal UPve2vXwny 43 % W; Tần = Phi = Quý phi ≥ 43 %, HQP ~47 %, HH ~51 %, wider than tall; phối smaller, not measured; dev/art/place-rank/bed_measure.py).

## 3. New direction — NOT approved yet (no "duyệt")
- **Style**: she prefers the GPT semi-realistic anime look (L2253; her red HH dev/art/owner_runs/L2264_*, L2266_*, L2268). GPT style block = wording in M2246-01 / M2248-04/05 / M2255-08; anime tests attach NO mau_net_ve image. Face consistency would need an anime face ref per person (proposed, not done).
- **4-layer design**: rank (8) × personality group (6: Quyến rũ 18, Sắc sảo 15, Kiêu kỳ 15, Lạnh lùng 15, Dịu dàng 14, Đoan trang 13 = 90) × season (colour + winter fur) × age (a51–a65 less sexy).
- **L2271**: C writes NO new outfit/style prompts. She brings ChatGPT standard prompts; we build the standard from them. Short GPT helper prompts she asks for are OK — traits only, NO colour/clothing hints (L2258/L2261/L2263/L2273).

## 4. Lessons (owner was angry — never repeat)
- L2242: when she only ASKS ("có…chưa?", "có sửa gì không?") → ANSWER ONLY. Change nothing unless she says sửa/đổi/làm.
- L2251: compare pictures with HER runs of the same prompt (dev/art/owner_runs/), never old L1576 sheets.
- L2247: don't blame prompt length; describe GPT style faithfully.
- L2281 (her GPT Tần, sage+ivory): "Theo thùa mọi thứ đều rất là có cái sự tiết chế và đẹp … cái mà làm cho nó bị AI chính là các cái mẫu theo random." → embroidery follows the garment structure (borders/bands), one motif family, tone-on-tone, calm empty areas; random scattered motifs = "AI look". (Lesson only, no change ordered.)
- Lượt 777: no regen/redraw without her yes; say the credit cost first.
- Never re-ask an approved thing: `rule.py find` first.
- To her: Vietnamese only, very short; pictures via SendUserFile; every message "Lượt N", ends "~X% xong / ~Y% chơi được".

## 5. Colour system L2287 (owner attached GPT handoff, dev/art/color_system_L2287/Imperial_Court_Color_System_Handoff.xml, 688 KB — grep, don't read whole)
Owner order L2287 verbatim: "Read the attached XML before continuing costume design. Follow its color hierarchy and flexible tonal-rendering rules. Distinguish confirmed rules from generated proposals; do not treat proposed HEX values or costume designs as approved."
**CONFIRMED (follow):** its `<ApprovalBoundaries>` + `<DesignRules>` (lines 9–32) + `<ReusablePromptInstruction>`:
- Royal gold #EFBD69 AND Chu Sa red allowed at ranks 6/7/8 with growing presence (t6 tiny accents < t7 < t8 strongest). Gold/red not chosen by personality.
- Rank depth tiers: t1–3 light / t4–6 medium / t7–8 deep — separate from royal-colour placement. Medium = source atlas = palette_gpt_L2272 (now LIVE).
- HEX = midtone anchors, not flat fills; lighter/deeper tones of the same family across fabric layers OK; main + secondary may share a family; natural light/shadow; designed tone placement written in the prompt.
- Gauze HEX = solid colour; transparency is separate (never white).
- Sexy = shared game aesthetic (Dịu dàng / Đoan trang may be open-neck / off-shoulder too). Personality = whole garment construction (neckline, overlaps, shoulders, sleeves, waist, skirt, fabric behaviour, embroidery), never exposure/face/hair/pose. Dịu dàng ≠ Đoan trang.
- Keep BOTH original 8-rank collections; soft clothing never simplified below its rank's luxury; no universal 85/15 historical/fantasy ratio (per group).
- No personal favourite colour per character; a group is not one hue. Season may change hue family, neckline, mantle, layering.
- Generate/edit images only when asked. Phoenix motif not granted at every rank.
**APPROVED owner L2290 (was proposal):** light + deep tier HEX (all 1080 palettes), Chu Sa #B62832, royal amount t6 few small points (trim, clasp) → t7 trims + centre panel → t8 most of the robe, HH MAIN robe = royal gold or Chu Sa with own colours secondary + embroidery → rule G77; G13 rewritten. Data flags = approved_L2290. Still NOT approved: any costume design inside the XML.
**Still to check:** builder not yet wired to tiers (TIER_PAL); B17/B21 (t7/t8 = yellow + own colours) vs gold+red t6–t8; F20 (flower ≠ main) and G56 (veil hue ≥ 60° from main) vs "main + secondary may share a family".
- Lượt 777: no regen/redraw without her yes; say the credit cost first.
- Never re-ask an approved thing: `rule.py find` first.
- To her: Vietnamese only, very short; pictures via SendUserFile; every message "Lượt N", ends "~X% xong / ~Y% chơi được".
**PROPOSAL (NOT approved — never treat as locked):** light + deep tier HEX (90 × 4 seasons × 3 tiers × 8), Chu Sa HEX #B62832, exact royal coverage %, HH dominant royal main garment, any costume design in the file.
**Conflicts to raise with the owner before changing rules:** G13 (one colour pair at every rank) vs rank tiers; B17/B21 (t7/t8 = yellow + own colours) vs gold+red t6–t8; F20 (flower ≠ main) and G56 (veil hue ≥ 60° from main) vs "main + secondary may share a family".
