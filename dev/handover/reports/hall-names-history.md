# Hall names — history expert report (E3, PL #3, OD:L1475 + OD:L1327)

Question: how did real Ming/Qing courts name the halls of a palace, its side halls, pavilions and garden spots, so the game can hang a believable plaque (biển ngạch) on each one.

## What the real courts did (Tử Cấm Thành / Đông-Tây lục cung, Dưỡng Tâm điện, Ngự hoa viên)
1. Every building carried a named horizontal plaque (匾額). The palace had a name (Vĩnh Thọ, Dực Khôn, Trữ Tú…); the main hall inside it had its own, different name; each side hall and studio had another. Only the generic role ("chính điện", "đông phối điện") was used in speech and in architectural lists, never as the plaque.
2. Type word = rank of the building. Highest: 殿 điện (main halls); then 堂 đường, 閣 các (two-storey), 軒 hiên, 齋 trai, 館 quán, 樓 lâu; outdoors 亭 đình, 榭 tạ, 軒, 齋. In the six-palace compounds the main hall is a điện; side halls and rear rooms are usually hiên / trai / đường.
3. Characters. Main halls take weighty virtue / blessing words (承 thừa, 體 thể, 德 đức, 仁 nhân, 和 hòa, 寧 ninh, 祥 tường, 慶 khánh, 壽 thọ, 福 phúc, 順 thuận, 敬 kính, 懷 hoài, 昭 chiêu), usually 2 characters + 殿. Studios / side rooms take gentler, scholarly or seasonal words (春 xuân, 秋 thu, 蘭 lan, 菊 cúc, 桂 quế, 雲 vân, 霞 hà, 月 nguyệt, 靜 tĩnh, 清 thanh, 逸 dật, 雅 nhã).
4. Orientation. The Đông (east) side belongs to spring / wood / benevolence (仁 nhân) → warm, rising words (春, 溫, 和, 仁); the Tây (west) side belongs to autumn / metal / righteousness (義 nghĩa) → calm, clear, moonlit words (秋, 靜, 清, 義, 月). A pair of side halls was often named as a pair.
5. No two plaques alike inside the compound; names repeat across the court only as the same character in a different pair (Hòa appears in many names).
6. Servants' rows and rear houses (後罩房, 值房) were plain-named workaday buildings — a short virtue name (勤 cần = diligence) is fitting; they were not imperial halls.
7. Garden spots (Ngự hoa viên): pavilions and rockeries carry a 2-character poetic name + type (e.g. a Thiên Thu đình, Thủy Tạ, Thái Dịch trì already used in the game) — the game's garden spots are already named; nothing generic to replace there.

## Rules adopted for the table (jhall.js, BAL-style data, one core)
- chính = 2 auspicious/virtue characters + điện; Đông side = spring/benevolence word + hiên; Tây side = autumn/righteousness/moon word + trai; servants' row = Tích Cần viện.
- Hán-Việt reading, real Chinese characters behind every name; nothing Vietnamese in flavour; unique across the whole table and against all palace names.
- Role stays only as a small subtitle. Ids (`chinh|dong|tay|cungnhan`, palace keys, slots) unchanged → old saves load.
