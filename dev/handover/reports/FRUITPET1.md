# FRUITPET1 — no fruit held + pets draft + earrings note (Foreman C ROOT-67 session_01PEhRbxwtuTAkw2Fc6e7Enp, 20/11)
depth 2 · START_CTX ≈ 3 % (get_session used_tokens read 0; own estimate) · end ≈ 12 % · 0 gens · 0 credits

## (1) FRUIT — done (owner verbatim: "Thôi, đừng có cho cầm trái cây. Cứ như là đi bán buôn gì đó" + "Cái người nào mà lỡ vẽ mà cầm trái cây ở bậc thiếu nữ rồi thì thôi kệ, đừng có vẽ lại, nhưng mà trong cái prompt mình nên sửa lại ở những bậc sau, cái đồ mà họ cầm tay là phải thay đổi.")
### Thiếu nữ already drawn holding fruit — KEPT, frozen, no redraw
| pid | picture | fruit |
|---|---|---|
| s44 | s44.v5 Sắc sảo cut 79foGbpJAL + s44.qr Quyến rũ cut DoOgxICpcl (make_sacsao_L737.py / make_quyenru_s43_45.py) | small red pomegranate held at the waist |
| s64 | s64.v5 Dịu dàng cut JNChlRROq4 (make_new_s62_65.py, Lượt 1046 "keep s64 loquats") | golden-orange loquats on a twig at the chest |
No other thiếu nữ / face / Nữ đế / template prompt (321 stored files) holds fruit (blossoms, peach colours, pomegranate embroidery are not fruit).

### Later ranks/ages — fruit item replaced (A17 diff = only the item words; hand key unchanged "two"; E6 kind "peach" → new kind "plaque", 1:1, so every E6/E11/E12 pick stays the same)
| where | rank / age | old item | new item |
|---|---|---|---|
| build.py L3F t2 | Thường tại (a65 slot) | a carved wooden longevity peach | a round carved wooden longevity plaque carved with a round shou symbol |
| build.py L3F t3 | Quý nhân | a carved red-agate longevity peach | a round red-agate longevity plaque … shou symbol |
| build.py L3F t4 | Tần | a carved jade longevity peach | a round jade longevity plaque … shou symbol |
| build.py L3F t5 | Phi | a fine-jade longevity peach on a gilded stand | a round fine-jade longevity plaque …, on a gilded stand |
| build.py L3F t6 | Quý phi | a carved white-jade longevity peach on a gold stand | a round white-jade longevity plaque …, on a gold stand |
| build.py ITEMS7 | t7 HQP | a gold-filigree longevity peach set with gems | a round gold-filigree longevity plaque …, set with gems |
| build.py ITEMS | t8 HH (+ triều t8 a65) | a carved imperial-jade longevity peach on a gold stand | a round imperial-jade longevity plaque …, on a gold stand |
| build.py TH_ITEMS | Thái hậu | a carved old-jade longevity peach | a round old-jade longevity plaque … |
| item_age.py lady a65 kind "peach" | t1–t8, Thái hậu, Nữ đế, nc, bd a65 cells (+ kc AGE5 a65, unused age) | carved longevity peach of {H} | "plaque": round longevity plaque of {H} carved with a round shou symbol / bài Thọ tròn {H} chạm chữ Thọ |
| item_age.py maid a18 "m_ftray" | tm0–tm4, ma ma a18 (AGE5 tm2, mama) | small tray of {H} with fresh fruit | "m_ttray": small tray of {H} with neatly folded hand towels / khay nhỏ {H} đựng khăn lau tay gấp gọn |
| item_age.py poor a65 "p_gourd" | lãnh cung a65 (AGE5) | small dried gourd on a cord | "p_amulet": folded paper temple amulet on a cord / bùa giấy chùa gấp treo dây |
| item_age.py poor a65 "p_jujube" | (extra pool, not picked by anyone) | cloth pouch of dried jujubes | "p_sole": cloth shoe sole half-stitched, with needle and thread |
| build_npc.py P4 | Hoàng tử kid-p a4 (p03 p16 p21) | holding a small round fruit | holding a small wooden boat toy |
| build_npc.py Q4 | Công chúa kid-f a4 (f08 f13 f18) | holding a small peach | holding a little clay doll |
Every new item is used by no one else (grep). Item colour: unchanged B16 path (item_colour()/S15 adds the contrasting colour, the item words carry no colour). dev/art/item-rank-age.md regenerated (item_age.py md). item_age.py check: bad 0.

### Proof (before/after snapshot of every builder output: coverage.py groups = c01–c32 + m01–m52 × every tier/age, FP, NPC incl. kids; 15 755 prompts)
- 127 prompts changed, every changed hunk = the item swap only (0 other diffs); 7 049 ERR/EXC cells identical before/after (modes that do not exist).
- New gate on the BEFORE prompts: 127 FAIL NOFRUIT; on the AFTER prompts: 0.
- Drawn rank pictures with a longevity peach / fruit tray (if any) are NOT redrawn (A20/A21); old ledger lines keep their old text (records).

### Gate: check_store.py NOFRUIT (rule F16, added with rule.py add, owner verbatim)
- fruit_fails(): every scope; a fruit word (fruit, peach, pomegranate, loquat, persimmon, lychee, longan, grape, jujube, kumquat, tangerine, citron, apple, pear, plums, cherries, melon, gourd, quả, trái cây…) in a hold sentence (Pose:, holding/held/holds/cradling/carrying/hugging/raising/lifting/offering/showing/with one hand…) = FAIL "F16 NOFRUIT". Not fruit: blossoms/flowers, colours (peach pink, apricot…), peach-wood, cloth words, face shapes, gourd doorway. "no fruit"/"never a peach" just before the word = allowed.
- Frozen exemption: only --scope face --pid s44 / s64 (FRUIT_FROZEN). Same files with another pid → FAIL.
- check_store.py --self: 38 sentences, 20 banned, 0 problems (+5 NOFRUIT samples + s64 frozen sample built in).

## (2) PETS — first draft (SUPERSEDED by round 2 below: owner approved pets only at 18/26, no HQP/HH/Thái hậu, in contact only)
Proposal Lượt 1053: ≥ 3 pictures per rank × age; low ranks + thiếu nữ hold/play; Tần/Phi calmer; Quý phi/HQP/HH/Thái hậu not held, animal beside. No animal repeats inside one rank (over all its ages). 3 different people per cell. People = consorts c01–c32 (rotation, can be swapped freely). Script: none committed (draft table below).
| Bậc | Tuổi | Người 1 → con vật | Người 2 → con vật | Người 3 → con vật |
|---|---|---|---|---|
| Thiếu nữ (khuê các) | a18 | c01 → thỏ trắng ôm trong tay | c11 → mèo con mướp ôm trước ngực | c21 → chim sẻ đậu trên ngón tay |
| Thiếu nữ (khuê các) | a26 | c04 → bướm đậu trên đầu ngón tay | c14 → chậu sứ nhỏ có cá vàng (bưng) | c24 → bồ câu trắng trên tay |
| t1 Đáp ứng | a18 | c12 → chim sẻ đậu trên ngón tay | c22 → bướm đậu trên đầu ngón tay | c32 → chậu sứ nhỏ có cá vàng (bưng) |
| t1 Đáp ứng | a26 | c15 → bồ câu trắng trên tay | c25 → chim hoàng yến đậu trên tay | c03 → sóc nhỏ trên vai |
| t1 Đáp ứng | a36 | c18 → chó con lông trắng ôm trong tay | c28 → chuồn chuồn đậu trên ngón tay | c06 → lồng tre nhỏ có con dế (xách) |
| t1 Đáp ứng | a51 | c21 → đôi chim yến phụng trên ngón tay | c31 → rùa con trên lòng bàn tay | c09 → chim én sà xuống tay |
| t1 Đáp ứng | a65 | c24 → vịt con trong lòng bàn tay | c02 → thỏ trắng ôm trong tay | c12 → mèo con mướp ôm trước ngực |
| t2 Thường tại | a18 | c23 → chậu sứ nhỏ có cá vàng (bưng) | c01 → bồ câu trắng trên tay | c11 → chim hoàng yến đậu trên tay |
| t2 Thường tại | a26 | c26 → sóc nhỏ trên vai | c04 → chó con lông trắng ôm trong tay | c14 → chuồn chuồn đậu trên ngón tay |
| t2 Thường tại | a36 | c29 → lồng tre nhỏ có con dế (xách) | c07 → đôi chim yến phụng trên ngón tay | c17 → rùa con trên lòng bàn tay |
| t2 Thường tại | a51 | c32 → chim én sà xuống tay | c10 → vịt con trong lòng bàn tay | c20 → thỏ trắng ôm trong tay |
| t2 Thường tại | a65 | c03 → mèo con mướp ôm trước ngực | c13 → chim sẻ đậu trên ngón tay | c23 → bướm đậu trên đầu ngón tay |
| t3 Quý nhân | a18 | c02 → chim hoàng yến đậu trên tay | c12 → sóc nhỏ trên vai | c22 → chó con lông trắng ôm trong tay |
| t3 Quý nhân | a26 | c05 → chuồn chuồn đậu trên ngón tay | c15 → lồng tre nhỏ có con dế (xách) | c25 → đôi chim yến phụng trên ngón tay |
| t3 Quý nhân | a36 | c08 → rùa con trên lòng bàn tay | c18 → chim én sà xuống tay | c28 → vịt con trong lòng bàn tay |
| t3 Quý nhân | a51 | c11 → thỏ trắng ôm trong tay | c21 → mèo con mướp ôm trước ngực | c31 → chim sẻ đậu trên ngón tay |
| t3 Quý nhân | a65 | c14 → bướm đậu trên đầu ngón tay | c24 → chậu sứ nhỏ có cá vàng (bưng) | c02 → bồ câu trắng trên tay |
| t4 Tần | a18 | c13 → chậu sứ cá vàng trên kỷ cạnh | c23 → chim sáo trên giá gỗ | c01 → mèo trắng mắt xanh ngồi cạnh |
| t4 Tần | a26 | c16 → bồ câu trắng đậu trên tay vịn | c26 → chim khướu trong lồng tre cạnh | c04 → rùa nhỏ trong chậu sứ cạnh |
| t4 Tần | a36 | c19 → chim bạch yến đậu trên ngón tay | c29 → mèo nằm trong lòng | c07 → vẹt xanh đậu trên cổ tay |
| t4 Tần | a51 | c22 → họa mi trong lồng nhỏ để cạnh | c32 → chó Bắc Kinh nhỏ ngồi bên chân | c10 → bướm bay quanh vai |
| t4 Tần | a65 | c25 → chim hoàng anh đậu trên cành bên cạnh | c03 → thỏ trắng nằm trong lòng | c13 → đôi chim yến phụng trên giá cạnh |
| t5 Phi | a18 | c24 → mèo trắng mắt xanh ngồi cạnh | c02 → bồ câu trắng đậu trên tay vịn | c12 → chim khướu trong lồng tre cạnh |
| t5 Phi | a26 | c27 → rùa nhỏ trong chậu sứ cạnh | c05 → chim bạch yến đậu trên ngón tay | c15 → mèo nằm trong lòng |
| t5 Phi | a36 | c30 → vẹt xanh đậu trên cổ tay | c08 → họa mi trong lồng nhỏ để cạnh | c18 → chó Bắc Kinh nhỏ ngồi bên chân |
| t5 Phi | a51 | c01 → bướm bay quanh vai | c11 → chim hoàng anh đậu trên cành bên cạnh | c21 → thỏ trắng nằm trong lòng |
| t5 Phi | a65 | c04 → đôi chim yến phụng trên giá cạnh | c14 → chậu sứ cá vàng trên kỷ cạnh | c24 → chim sáo trên giá gỗ |
| t6 Quý phi | a18 | c03 → cò trắng đứng dưới hồ cạnh | c13 → rùa thọ trong chậu đá cạnh | c23 → chim bói cá đậu trên cành cạnh |
| t6 Quý phi | a26 | c06 → hạc trắng đứng bên cạnh | c16 → khổng tước xòe đuôi phía sau | c26 → mèo Ba Tư nằm bên ghế |
| t6 Quý phi | a36 | c09 → chim quý trong lồng vàng trên giá cạnh | c19 → cá chép gấm dưới hồ bên cạnh | c29 → đôi uyên ương dưới ao bên cạnh |
| t6 Quý phi | a51 | c12 → hươu sao đứng bên cạnh | c22 → thiên nga trắng dưới hồ cạnh | c32 → chim trĩ vàng đứng cạnh |
| t6 Quý phi | a65 | c15 → khổng tước trắng phía sau | c25 → chó Bắc Kinh nằm trên nệm gấm cạnh ghế | c03 → vẹt trắng mào vàng trên giá đứng cạnh |
| t7 Hoàng quý phi | a18 | c14 → chim bói cá đậu trên cành cạnh | c24 → hạc trắng đứng bên cạnh | c02 → khổng tước xòe đuôi phía sau |
| t7 Hoàng quý phi | a26 | c17 → mèo Ba Tư nằm bên ghế | c27 → chim quý trong lồng vàng trên giá cạnh | c05 → cá chép gấm dưới hồ bên cạnh |
| t7 Hoàng quý phi | a36 | c20 → đôi uyên ương dưới ao bên cạnh | c30 → hươu sao đứng bên cạnh | c08 → thiên nga trắng dưới hồ cạnh |
| t7 Hoàng quý phi | a51 | c23 → chim trĩ vàng đứng cạnh | c01 → khổng tước trắng phía sau | c11 → chó Bắc Kinh nằm trên nệm gấm cạnh ghế |
| t7 Hoàng quý phi | a65 | c26 → vẹt trắng mào vàng trên giá đứng cạnh | c04 → cò trắng đứng dưới hồ cạnh | c14 → rùa thọ trong chậu đá cạnh |
| t8 Hoàng hậu | a18 | c25 → khổng tước xòe đuôi phía sau | c03 → mèo Ba Tư nằm bên ghế | c13 → chim quý trong lồng vàng trên giá cạnh |
| t8 Hoàng hậu | a26 | c28 → cá chép gấm dưới hồ bên cạnh | c06 → đôi uyên ương dưới ao bên cạnh | c16 → hươu sao đứng bên cạnh |
| t8 Hoàng hậu | a36 | c31 → thiên nga trắng dưới hồ cạnh | c09 → chim trĩ vàng đứng cạnh | c19 → khổng tước trắng phía sau |
| t8 Hoàng hậu | a51 | c02 → chó Bắc Kinh nằm trên nệm gấm cạnh ghế | c12 → vẹt trắng mào vàng trên giá đứng cạnh | c22 → cò trắng đứng dưới hồ cạnh |
| t8 Hoàng hậu | a65 | c05 → rùa thọ trong chậu đá cạnh | c15 → chim bói cá đậu trên cành cạnh | c25 → hạc trắng đứng bên cạnh |
| Thái hậu | a36 | c04 → chim quý trong lồng vàng trên giá cạnh | c14 → cá chép gấm dưới hồ bên cạnh | c24 → đôi uyên ương dưới ao bên cạnh |
| Thái hậu | a51 | c07 → hươu sao đứng bên cạnh | c17 → thiên nga trắng dưới hồ cạnh | c27 → chim trĩ vàng đứng cạnh |
| Thái hậu | a65 | c10 → khổng tước trắng phía sau | c20 → chó Bắc Kinh nằm trên nệm gấm cạnh ghế | c30 → vẹt trắng mào vàng trên giá đứng cạnh |

Open for the owner: (a) "no repeat inside a rank" read as over ALL ages of that rank (15 animals per rank) — or only inside one rank×age cell? (b) maids (cung nữ, ma ma), lãnh cung / nhà nghèo, Nữ đế, foreign princesses, kids: pets too? (c) pet picture = an extra pose of the same person (replaces her held item at that age) or a separate picture?
When OK'd: the animal replaces the held item for those people/ages (E5 one item), animal colour per B16, gate count ≥ 3 per cell.

## (3) EARRINGS — note only (owner verbatim, answer to Lượt 1051): "những người nào đã vẽ hoa tay rồi thì thôi kệ đi, đừng có vẽ lại nữa … bắt đầu từ cái bậc phi tần á, vào cung rồi mình sẽ bắt đầu cho họ là không đeo hoa tai … Còn bậc thiếu nữ thì tôi nghĩ chắc chưa cần hoa tai đâu, cứ để như vậy đi"
→ NO redraw anywhere (the 46 faces of NOEAR1's list stay). NOEAR1 gate (F15, EAR_SENT, S13 seals) unchanged — nothing to change.

## Files
dev/art/check_store.py (fruit_fails + FRUIT_FROZEN + --self samples + doc line) · dev/art/ART_RULES.md (F16) · dev/art/t8-prompt-B/build.py · item_age.py · build_npc.py · dev/art/item-rank-age.md · this report.
Commit: 5de287f (report line filled in the next commit)

# ROUND 2 (ROOT-67 jobs 3–6, 07:02–07:06Z) — 0 gens
## (5) FRUIT correction — owner verbatim Lượt 1058: "Không cầm trái cây là cho tất cả mọi người, tất cả mọi độ tuổi, chứ không phải là chỉ có độ tuổi 36 trở lên."
- No exemption any more: check_store fruit_fails has no pid/scope exemption. F16 rewritten (rule.py set, all three owner quotes).
- s44 / s64 STORE prompts (sNN.v5/.qr FULL.txt + the 3 makers): pomegranate → "a small cobalt-blue silk lucky-knot charm with a short tassel" (s44; colours burnt sienna + sage green), loquats → "a small amber-yellow jade cicada on a short cord" (s64; peony pink + smoke lilac). Both used by no one else; B16 colour outside both roots.
- The DRAWN prompts are kept as records in dev/art/face-common/legacy_fruit/ (s44.v5, s44.qr, s64.v5) → FAIL if reused. Pictures not redrawn.
- --self: legacy s64 record must FAIL, store s64 must PASS (both checked).

## (6) EAR_SENT shortened (job 5)
- master_common.EAR_SENT = "Bare earlobes, no earrings." (was 105 chars, our wording, not owner verbatim). EAR_SENT_OLD kept; strip_ear() removes it so legacy() still verifies. Gate logic unchanged (exactly once + no earring word).
- 286 stored prompts updated (face-common 242, nude-B 40, template-B 3, approved 1); seals inherit via import. ART_RULES F15 sentence updated. check_store --self, seal_gate --self: 0 problems; 0 NOEAR fails on stored files.
- LEN (build_all, all 2 496 buildable prompts; gate run on every one > 9 900): 510 prompts FAIL only on LEN (> 10 000). Of these only **25** were pushed over by the earring sentence and are still over by 1–27 chars after the shortening:
  m38 t8 a65 (+1) · m08 t7 a51 (+2) · m49 TH a65 (+4) · m03 t1 a51 (+6) · m14 t7 a51 (+6) · m16 TH a65 (+6) · m01 t7 a65 (+8) · m43 t7 a51 (+8) · m11 t8 a65 (+9) · m39 t7 a65 (+9) · m48 t7 a51 (+9) · m04 TH a65 (+13) · m41 t1 a51 (+13) · m40 t7 a51 (+16) · m25 t1 a51 (+19) · m32 TH a65 (+19) · m49 t7 a51 (+19) · m10 t7 a51 (+22) · m24 t7 a51 (+23) · m09 t8 a65 (+24) · m19 TH a65 (+25) · m20 t7 a51 (+27) · m22 TH a65 (+27) · m47 t8 a65 (+27) · m52 t7 a51 (+27).
  The other ~485 were already over before NOEAR (a51/a65 elder blocks, MG4 "a51 LEN>10000 (236)"; over by 0–900+).
  Candidate trims (our wording only, NOT applied, A18 → foreman/owner): (a) ANGLE sentence tail "; her head turns together with her shoulders and body, never back-turned, never in profile." repeats approved S23 HEAD AND BODY → keep "; never back-turned, never in profile." (−52, fixes all 25); (b) Thái hậu pose "in a contrasting colour, not the robe colour," repeats the S15/E5 sentence that follows (−45); (c) elder second COLOUR RULE repeats "her own colours in the DEEPER, DARKER mature shades described above, never bright, never pastel" (−55, a51/a65 only).
- My fruit swaps: 0 prompts went over because of them (plaque prompts over the limit were already over by > 34).

## (7) PETS — written into the builders (owner approved Lượt 1059 + Lượt 1057 in contact only), rule F17
- dev/art/t8-prompt-B/pets.py = the ONE table + check (`python3 pets.py` prints it, `pets.py check` → bad 0): ages a18/a26 × kc + t1–t6, 3 people each (m01–m21 at a18, m27–m47 at a26; one pet per person per age), no species twice in a rank, nothing "beside".
- build.py age_item(): the pet replaces the held item for those people (not in trung y: pet=False); store-all/build_all.py ladder age_item(): same hook. The animal's colour follows the existing HELD ITEM COLOUR sentence (B16).
- Old spec5 "numi" poses with an animal (butterfly on finger / songbird feeding) at t7, t8, Thái hậu, Nữ đế, triều, states and 36+ → only the animal words change (pets.depet: "gazing at her lightly raised hand" / "one hand raised gracefully at shoulder height, fingers softly curved"), same pose pick.
- Gate check_store.py pet_fails (F17): animal in a pose/holding sentence → FAIL outside tp1–6/pr1–6/state:kc/face, FAIL at age ≠ a18/a26, FAIL if beside her / at her feet; colour words (kingfisher-blue), embroidery/painted/carved/jade/scroll motifs, cages, toys are not pets. --self: 6 samples + pets.check.
- Proof: build_all 2 496 prompts + build.py 15 755 prompts → 0 F16/F17 fails, 0 new builder errors. Pets present in exactly 3 prompts per rank × age (t1–t6 × a18/a26 in build_all, kc via build.py --state kc).
- NOTE (A17 honesty): build_all plans poses per group, so giving 3 people a pet re-planned the poses of ~170 other a18/a26 prompts at t1–t6 (different pose from the same approved pose pool, nothing else changed). At t7/t8/TH and 36+ only the depet words changed.
- Table (people can be swapped; Vietnamese animal names):
| Bậc | Tuổi | Người → thú cưng (tiếp xúc) |
|---|---|---|
| kc | a18 | m01 → thỏ trắng nhỏ ôm trong tay · m02 → chim sẻ đậu trên đầu ngón tay · m03 → bướm đậu trên đầu ngón tay |
| kc | a26 | m27 → mèo con mướp ôm trước ngực · m28 → bồ câu trắng nhỏ đậu trên tay · m29 → chim hoàng yến đậu trên ngón tay |
| t1 | a18 | m04 → mèo con mướp ôm trước ngực · m05 → bướm đậu trên đầu ngón tay · m06 → bồ câu trắng nhỏ đậu trên tay |
| t1 | a26 | m30 → thỏ trắng nhỏ ôm trong tay · m31 → chim sẻ đậu trên đầu ngón tay · m32 → đôi chim yến phụng đậu trên tay |
| t2 | a18 | m07 → chim sẻ đậu trên đầu ngón tay · m08 → thỏ trắng nhỏ ôm trong tay · m09 → chim hoàng yến đậu trên ngón tay |
| t2 | a26 | m33 → bướm đậu trên đầu ngón tay · m34 → chó con lông trắng ôm trong tay · m35 → mèo con mướp ôm trước ngực |
| t3 | a18 | m10 → bướm đậu trên đầu ngón tay · m11 → mèo con mướp ôm trước ngực · m12 → đôi chim yến phụng đậu trên tay |
| t3 | a26 | m36 → chim sẻ đậu trên đầu ngón tay · m37 → thỏ trắng nhỏ ôm trong tay · m38 → chó con lông trắng ôm trong tay |
| t4 | a18 | m13 → vẹt xanh nhỏ đậu trên cổ tay · m14 → mèo trắng nhỏ bế nhẹ trong tay · m15 → bướm đậu trên mu bàn tay |
| t4 | a26 | m39 → chim họa mi đậu trên cổ tay · m40 → chim hoàng anh đậu trên ngón tay · m41 → bồ câu trắng đậu trên cổ tay |
| t5 | a18 | m16 → chim họa mi đậu trên cổ tay · m17 → bướm đậu trên mu bàn tay · m18 → mèo trắng nhỏ bế nhẹ trong tay |
| t5 | a26 | m42 → vẹt xanh nhỏ đậu trên cổ tay · m43 → bồ câu trắng đậu trên cổ tay · m44 → chim hoàng anh đậu trên ngón tay |
| t6 | a18 | m19 → chim nhỏ đậu trên ngón tay khẽ nâng · m20 → bướm đậu trên mu bàn tay · m21 → chim vành khuyên đậu trên ngón tay khẽ nâng |
| t6 | a26 | m45 → chim bói cá nhỏ đậu trên ngón tay khẽ nâng · m46 → chim én nhỏ đậu trên ngón tay khẽ nâng · m47 → chim hoàng yến đậu trên ngón tay |

- Open for the owner: pet pose wording comes from the existing pose templates ("raising X beside her cheek", "X held at her side") — a first SAMPLE gen of 1–2 pet people should be checked before mass gens (A1/A2).

## HANDOVER (roll line reached: context 29 % of the window, START_CTX ≈ 3 % → line 28 %; depth 2)
Done + pushed: fruit (all), EAR shortening, pets in builders + gate. NOT done:
- Job (4) s62–s65: pick their other 3 season pairs by the P6 toned A32 palette method (ff2e3a4; rules A31 relaxed + A32; dev/handover/reports/P6.md — solver dev/art/palettes3/four_season86_a32_soft.py, full run ~45 min; check whether it can run for 4 pids only), add to palettes_season.json, run the palette gate, 0 gens.
- LEN: the 25 + ~485 over-limit prompts need a trim decision (candidates above).
- NEW (ROOT-68 07:20Z, owner verbatim: "Cung nữ nhà nghèo, nữ đế là không ôm thú cưng, công chúa trẻ con thì có ôm thú cưng."): pets for công chúa + trẻ con (build_npc.py kid-f/kid-p ages a4 a9 a14 …; foreign princesses nc/bd in build.py) — same rules (in contact, replaces the held item, >= 3 per rank x age, no repeat animal, child-suitable small animals). Ages: use their drawn ages; if unclear list them, don't guess. NO pets: maids (tm*, mama), nhà nghèo/lãnh cung, Nữ đế (already none: pets.RANKS = kc,t1–t6; gate PET_SCOPES excludes them). Hook points: pets.py (add groups), build_npc.py P4/Q4/P9/Q9… pose lists (kids hold items there; note Q4 already has toy rabbit / butterfly toy), check_store PET_SCOPES (kids/princess scopes), rule F17 text (rule.py set, add owner quote).
- Owner answers relayed by ROOT-67 07:11Z: no repeat = per RANK; pet REPLACES the held item — both already built that way.
Takeover lines (verbatim):
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
Commits round 2: 69f64ef (fruit-for-all + EAR), 27e4615 (pets + report)
