# art-items-pets — verbatim owner rules

Holds: item icons, gift art, pets.

Read only when your task touches this topic.

Format: [source:Lnn] = line in the source file (OD = dev/OWNER_DECISIONS.md on the docs branch); the text after the tag is the owner's line, copied unchanged by script. Every rule line lives in exactly ONE file under dev/rules/ (find a tag: grep -rn '\[OD:L123\]' dev/rules). CANON OVERWRITE (owner OD:L1232): when a rule changes, delete the old line and write the new one IN ITS PLACE in the same file; never keep the old one with a 'changed to' note. Headings '### OD:Lnn' are the OD section headings the lines sit under. Generated 11/16/2026 from dev/PRIORITY_RULES.md + dev/art/OWNER_ART_RULES.md (owner rule OD:L1241, low context).

### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L422] - [ ] (12:05Z) Handmade item (fair-quality candied fruit) has no picture, generic name "Tác phẩm tự tay · Thường" (wrong grade), no receive animation. Rule restated: EVERY item that appears must glow in its grade colour, tap to receive and it flies into Tư trang (game-feel fixes + tests every place items are added).
### OD:L7 2026-11-14
[OD:L45] - Wardrobe items REDO: outfit icons must be drawn from the game's own character outfits per tier (owner rejected the first set). Per tier 20 items = 10 hairpins + 10 outfits, for 8 consort ranks + 5 maid ranks (260 total). Collection count per life → Sổ luân hồi titles at milestones (no carry-over of items). Sample tier (Tần) first for approval.
[OD:L47] - Every item (incl. crafted works from lessons, 4 quality tiers drawn differently: crude → exquisite) gets painted art (gpt-2-6). Items shown in a simple shared kit frame (kitItem) with background colour by grade (Thường/Tinh phẩm/Trân phẩm/Tuyệt phẩm/Ngự tứ).
[OD:L169] - (05:10Z) Owner: Tư trang Y phục slot must show the garment (existing wardrobe art img/wd512), not the fabric roll.
[OD:L271] - (07:35Z) Owner: draw pets now; 4 is too few → 18–24 pets, with grades + Xa xỉ N (rules like wearables), each grade a different use (warns of harm, guards the palace, eavesdrops, Sủng, Danh…), rare divine beast SAVES ONE LIFE for its owner; real downsides; NPCs same rules. review/pets.
### OD:L299 15/11 ~05:00Z (owner)
[OD:L303] - Pets: grades use exactly the grade ladder, colours and cell frames of equipment/items, no new palette.
[OD:L304] - Item cut-outs (especially hairpins) still dirty: re-cut, don't redraw.
### OD:L327 15/11 ~05:35Z (owner)
[OD:L333] - (05:40Z) Handmade items: redraw the self-sewn dance dress all 4 grades (dress upright, fully visible from collar to hem, not folded, no hanger); redraw Điệu múa all 4 grades as a dancing figure; redraw the Tuyệt phẩm endgame chess problem to differ clearly from Trân phẩm. Calligraphy/music scores/sutras: no Chinese characters. In-game handmade items use the per-grade frame + background like equipment (kitItem).
### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L381] - (09:10Z) Emotion icons: must show each emotion CLEARLY (Vui with bright open eyes, not squinting; Giận clearly angry); draw the full set and resend.
[OD:L387] - (09:55Z) 22 pets redrawn in the game's painting style (not realistic), natural poses, no cushions/rocks/pedestals; birds perch in a cage or on a stand; fish in a bowl.
[OD:L388] - (10:00Z) Pets: Thường–Tinh phẩm are real animals; higher grades are increasingly legendary (nine-tailed fox, baby qilin, jade rabbit, baby phoenix, spirit tortoise, divine white deer…), no ordinary lions/tigers/foxes. Update jpet data too.
[OD:L395] - (10:20Z) Pets grow: Non → Trưởng thành → Linh thú, each stage unlocks more effects; Ngự tứ only saves a life once fully grown. Virtual-pet care: full screen with the pet's picture, stats Đói/Sạch/Vui/Tình cảm, minigames feed/bathe/play; neglect → sick/sad/runs away (with notice). Art: each pet has young + adult pictures.
[OD:L398] - (10:42Z) Pets grow through 4 stages: Non → Thiếu niên → Trưởng thành → Linh thú (art for the first 3 stages; Linh thú = adult art + aura effect).
[OD:L400] - (10:50Z) Pets: baby qilin + white deer are lovely → style reference. Cat, dog, parrot still realistic → redraw every real animal in the qilin/white-deer style.
[OD:L401] - (10:52Z) Remove the tortoise from pets: Linh quy ngàn năm → Thiên mã (Ngự tứ); Bạch quy → Hạc đỉnh hồng (Trân phẩm).
[OD:L402] - (10:55Z) Pet markings by stage: young few/none, more beautiful as it grows, Linh thú most beautiful.
[OD:L403] - (10:57Z) Linh thú: differs from adult by the painting itself (majestic pose, coat/markings/ornaments), NO glow effect.
[OD:L407] - (11:10Z) Linh thú: aura allowed but PAINTED INTO the picture; each pet has its own Linh thú picture. Change: Kỳ lân up to Ngự tứ, Thiên mã down to Tuyệt phẩm.
[OD:L413] - (11:30Z) Pets: fine as they are; small dog ok; ONLY the cat is still realistic → redraw.
[OD:L425] - (12:10Z) Varied handmade works: each kind (cooking, embroidery, painting, calligraphy…) ~10 items per grade, each with its own picture, higher grades look grander.
[OD:L497] - [ ] (17:02Z) Gift brocade box: items fly out too fast → slow down, each item appears with a glow, pause to admire (every chest/box/pouch); item cells show only LETTERS "Á","T" instead of pictures (Áo lụa Hàng Châu vân thủy, Thoa bạc song điệp) → audit every item missing a picture and draw; grade label "Thường" wrong (item is Tinh phẩm); news card still has the line "Sủng nàng ta 30 → 30". Handed to session 6.
### OD:L566 15/11 ~19:50Z — Art completeness rule + handmade recipes (owner)
[OD:L568] - HANDMADE WORKS (j83, ~10 per type): she must NOT be able to make everything from the start. Each item needs its recipe/pattern learnt first — learn it, or BUY the recipe (recipe books / pattern sheets as shop items with their own pictures).
### OD:L574 15/11 ~20:15Z — Teacher learning + sub-styles per art (owner)
[OD:L577] - Owner asked to see pet tiers, item/handmade art (sheets sent).
### OD:L681 15/11 ~21:35Z — Art notes: poems, incense, dress items, item display, makeup tones, young pets (owner)
[OD:L682] - Handmade POEM works (item-tp-tho-*): wrong — they look like painted framed panels. A poem must look like a poem: a written scroll / poem sheet / fan with calligraphy. REDRAW all tho items (all subjects × 4 tiers).
[OD:L683] - Khúc nhạc, điệu múa, bình hoa: OK (mixed square/rectangle frames on múa: leave it).
[OD:L684] - Incense (item-tp-huong-*): r04 and r05 both yellow; r01–r03 too similar → give each a distinct colour (recolour/redraw).
[OD:L686] - ITEM RESOLUTION / BIG DISPLAY: item pictures shown big in the centre of the screen (receive / lose / reward) must be sharp (no upscaled blur) → draw/keep high-res sources (e.g. ≥1024 px) and serve a big size for centre display. In the centre display show the ITEM ALONE on a transparent background (no grade frame, no background tile). Only inside Tư trang does the item get the grade frame + background.
[OD:L688] - PETS: very cute overall, OK. But the THIẾU NIÊN (young) stage of several pets looks thin and loses cuteness: mèo mướp, chó nhỏ lông xù, thỏ ngọc, mèo tuyết, chó sư tử lông vàng, linh miêu mắt ngọc, cửu vĩ hồ, ngọc thố (circled). Redraw thiếu niên stage to keep a cute, chubby young look (adolescent but still adorable). Trưởng thành and Linh thú stay.
### OD:L759 15/11 ~23:15Z — CDNH works detail; luxury as a RANGE and a deeper system (owner)
[OD:L760] - Công Dung Ngôn Hạnh works follow the same shape as other works: each work kind has 10 items (e.g. túi thơm = 10 kinds of sachets), each item in 4 grade tiers, with its own art (Magnific).
### OD:L894 15/11 (session 8) — Header "‹ Phòng" bar → a room icon button (owner screenshot)
[OD:L897] - Decision: replace it with a compact painted ROOM ICON button (kit button, Magnific-painted icon of her residence/door; small label under/beside it, e.g. "Về phòng"; when she is elsewhere the label names where it goes back to). Same icon style as the other HUD icons; tooltip; works on all viewports; co-op same. The freed header space stays clean (no empty bar). Whole family: any other "‹ Nơi" back bars use the same kit icon button. → worker review/room-btn (QUEUED: subagent cap).
[OD:L1254] - (16/11 07:05Z, s11) OWNER (place glyphs, after they went live): "vẽ lại chính cái biểu tượng nơi chốn đi. Cái phong cách đó không có giống phong cách game của mình. Cái nét vẽ của biểu tượng cũng phải giống cái phong cách game của mình." → redraw the place glyphs in the game painting style; sample of 3 first (main), then the rest after approval (Foreman C mass production).
