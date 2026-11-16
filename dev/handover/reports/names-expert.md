# Names expert report — ancient Chinese court naming for Cung Tường Mộng
Worker names-unique (session_01UV1Szgg373UqQQZzKsCM7H), coordinator s23, 11/16/2026. Owner rule: last line of dev/OWNER_DECISIONS.md (16/11 ~20:20Z):
"mỗi người một cái tên, không ai giống ai … Không lấy những cái họ giống như người Việt Nam … tên cổ trang ngày xưa của Trung Hoa".
The data that follows from this report lives in ONE file: `dev/build/jname.js` (pools + exclusion lists). This report is the reasoning.

## 1. How real Chinese courts named people (Han → Qing)
| Group | Real practice | What the game uses (Hán-Việt) |
|---|---|---|
| Consorts, noble ladies | Recorded by **clan surname + 氏 (thị)** in official records (Qing: Ô Lạp Na Lạp thị, Nữu Hỗ Lộc thị; Han/Ming: Vương thị, Triệu thị). A two-character given name (閨名) existed in the family; dramas use it ("Chân Hoàn", "Niên Thế Lan", "Phú Sát Dung Âm"). Rank titles + a hiệu (Hoa phi, Hi tần) are what the palace says. | Surname + 2-syllable literary given name (`NM_F`): jade, moon, snow, flowers, music, virtue words (Uyển, Dao, Tịnh, Thục, Nghi, Hàm, Ngưng…). A few compound noble houses (Mộ Dung, Thượng Quan, Độc Cô, Trưởng Tôn, Phú Sát…) for ~12 % of ladies. Mothers in the home: "X thị". |
| Palace maids (cung nữ) | Drafted from bondservant / banner families; masters re-named them with short pretty names, often one or two characters, "-nhi" endings, gems, flowers, seasons (Hồng Lâu Mộng: Tập Nhân, Tình Văn, Tử Quyên, Uyên Ương, Bình Nhi; Qing dramas: Hoán Bích, Lưu Chu, Cận Tịch, Bội Nhi). The surname is rarely used in the palace. | One given name only (`NM_MAID`, 114 names). When a save ever runs past them, the core adds a surname ("Tô Hoán Bích") — never a number. |
| Senior maids (ma ma, cô cô) | Known by surname + ma ma / cô cô (Dung ma ma, Tôn cô cô). | BAL.staff first holders keep their names; successors get a core name and "<surname> ma ma". |
| Eunuchs | Young ones were called **Tiểu X Tử** (小X子) by everyone; senior ones by surname + given name, often auspicious (Lý Liên Anh, An Đức Hải, Tô Bồi Thịnh, Thôi Ngọc Quý). | `nmNew("eun")` = "Tiểu X Tử" (60 X); `nmNew("eunE")` = surname + auspicious given (`NM_EUNG`: Phúc An, Bồi Thịnh, Đức Hải…). |
| Officials, guards, men | Surname + given name; educated men used a courtesy name (tự) built from birth order (Bá/Trọng/Thúc/Quý), "Tử-", "-Chi", virtue words (Khiêm, Cẩn, Viễn, Hành). | `NM_M`, 104 courtesy-style names (Tử Khiêm, Kính Chi, Trọng Lễ, Hành Chi…). Fathers and brothers keep the family surname. |
| Imperial physicians | Ordinary literati names; drama habit "Thái y + surname". | `NM_DOC`; the first Thái y stays "Trương" as before (Zhang is not a Vietnamese-marked surname, §2). |
| Princes | Qing: one **generation character** shared by all brothers (Dận, Hoằng, Vĩnh, Miên, Dịch, Tái) + a second character. | Generation char per save (`S.nmGen`, starts Vĩnh) + `NM_PX` (40). Fallback: the next generation char. |
| Princesses | Known by their fief title (Hòa Thạc công chúa, Cố Luân Hòa Kính…), not a given name. | `NM_PRINCESS` (38 title names). |

Surname frequency in the historical court: the most common Chinese surnames (Lý, Vương, Trương, Lưu, Trần, Dương, Triệu, Hoàng, Chu, Ngô) dominate real records, but a Vietnamese reader of a dubbed court drama associates the court with Thẩm, Chân, Niên, Tô, Lâm, Hoa, Cao, Phú Sát, Mộ Dung… The pool (`NM_SUR`, 82) leans on those drama houses plus common Chinese surnames that are rare in Vietnam.

## 2. Surnames EXCLUDED as Vietnamese-style (`NM_BAN_SUR`, 19) — reasons
Rule used: a surname is excluded when a Vietnamese reader hears "người Việt" before "người Hoa". Three tests, any one is enough:
1. **Top Vietnamese surnames** (the 14 that cover ~90 % of Vietnamese people): Nguyễn (~38 %), Trần, Lê, Phạm, Hoàng/Huỳnh, Phan, Vũ/Võ, Đặng, Bùi, Đỗ, Hồ, Ngô, Dương, Lý.
2. **Vietnamese-only readings** of a Chinese character: Huỳnh (= Hoàng 黃), Võ (= Vũ 武) — never used for a Chinese person.
3. **Vietnamese ruling houses**: Đinh, Lê, Lý, Trần, Hồ, Mạc, Nguyễn, plus the Trịnh lords.
| Excluded | Why |
|---|---|
| Nguyễn, Trần, Lê, Phạm, Hoàng, Phan, Vũ, Đặng, Bùi, Đỗ, Hồ, Ngô, Dương, Lý | test 1 (owner's examples Nguyễn, Phạm, Huỳnh/Hoàng, Đặng, Bùi, Đỗ, Võ/Vũ are all here) |
| Huỳnh, Võ | test 2 |
| Đinh, Mạc, Trịnh | test 3 |
Borderline, KEPT (classic in Chinese dramas, not top-14 in Vietnam): Trương, Lâm, Cao, Tô, Lưu, Vương, Đào, Lương, Tạ. "Hoàng" as a TITLE (Hoàng hậu, Hoàng thượng, Hoàng tử) is not a surname and stays. "Âu Dương" (compound) is left out of the pool to avoid the "Dương" sound.
Fixed story names changed for this: "Tổng quản Lý Liên Anh" → generated senior eunuch; "Phế phi họ Lý" → "Phế phi họ Tần"; "thị vệ họ Lý" → "thị vệ họ Hách"; kit sample names Lý Trung / Mạc Thừa Vũ / Trịnh Ngọc Hành / Bùi Thừa Chí changed; BAL ma ma "Lạc Ngọc Dung" → "Lạc Uyển Hề".

## 3. Given names EXCLUDED as Vietnamese-style
- First syllable that is a Vietnamese middle-name marker: **Thị, Văn, Hữu, Đình, Công, Quang, Duy** (Nguyễn Thị …, Trần Văn …). (Old pools had "Văn Uyên", "Hữu Chính".)
- Modern Vietnamese given names (they read as a Vietnamese girl/boy today): Thu Thủy, Bích Hà, Minh Châu, Ngọc Lan, Thu Cúc, Hồng Liên, Xuân Hạnh, Bích Ngọc, Ngọc Anh, Thanh Hà, Thu Hà, Kim Anh, Phương Anh, Thùy Linh, Minh Anh, Bảo Ngọc, Thanh Tâm, Thanh Thủy, Hoài An, Đức Minh, Gia Huy, Minh Triết, Tuấn Dật, Cẩm Tú, Lan Chi, Thủy Tiên, Tố Tâm (Vietnamese novel), Họa Mi, Diễm Thu, Ngọc Dung, Phương Hoa, Hồng Diệp, Băng Tâm, Hải Đường, Minh Ngọc, Ngọc Hà, Kim Ngân, Thanh Hương, Mỹ Linh, Hồng Nhung (`NM_BAN_GIVEN`).
- No pool name contains an excluded surname as a syllable (Vũ, Dương, Lê, Đỗ, Đinh, Ngô, Trần, Hoàng were taken out: "Khinh Vũ", "Kỳ Dương", "Lê Hương", "Đinh Hương"…), and no name repeats a word ("Kiều Kiều Ân").

## 4. Uniqueness rule
Full name (title stripped) unique across the whole save, living + dead (registry `S.nmReg`); among the LIVING also no shared short form (given name, or surname + last word — the forms the stranger mask uses), so "Uyển Nhi" never stands beside "Thẩm Uyển Nhi". The player's own name is never changed; an NPC who collides with it is renamed.
