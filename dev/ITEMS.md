# KIỂM KÊ VẬT PHẨM — Cung Tường Mộng (nền origin/review/balance 85abf40)

Nguồn mã: `IT` ở j8.js (29 món), j67.js thêm 4 món thưởng Mệnh truyện, j70.js sửa Ngọc dung cao, j83.js thêm loại `tp` (tác phẩm tự tay, 11 kiểu). Rương = `S.inv` (mọi phi tần NPC cũng có `v.inv`, cùng luật). Mỗi món trong rương: `{k, from, w(đang đeo), t(bị tẩm), by(ai tẩm/cài), h(bị cài lén, chủ không thấy)}`.

Tổng: **33 món định sẵn + 1 loại tác phẩm (11 kiểu × 4 bậc)**. Có ảnh biểu tượng `img/item-*.webp`: 22/33 (thiếu: Trâm ngọc bích, Vòng vàng chạm phượng, Gấm minh hoàng, Đệm gấm, 4 món Mệnh truyện… phần lớn mượn ảnh món khác qua ITIMG ở j25).

Luật chung (j8):
- **Bán**: mọi món có giá (`pr>0`), được nửa giá (`floor(pr/2)`). Món giá 0 (thưởng, kỷ vật) không có nút Bán.
- **Tặng**: mọi món trừ Ngọc bội ngự ban (trừ khi đã bị tẩm). Món hợp ý người nhận (cột "Ai thích") được trọn giá trị quà, không hợp thì chỉ được 1/3. Người nhận thấy được tên người tặng (`from`).
- **Đeo** (ô `sl`): mỗi ô (tóc `hair`, tay `wrist`) đeo một món. Món có `rk` cao hơn phẩm người đeo là **vượt phẩm**: hiệu lực ×1,5 nhưng có thể bị tố (j8 `vpAccuse`, thành: tịch thu, Danh -8, bị phạt).
- **May áo** (`dr`): dùng vải → mặc áo mới 3 tháng (`S.dress`), Sắc +dr (vượt phẩm ×1,5).
- **Tẩm/cài** (TAINT, 6 cách) và **Soát rương** / **Khám cung** (j8 `inspect`, `search`): nền cho giá họa.

## 1. Trang sức (đeo) — 5 món
| Khóa | Tên | Cách có | Tác dụng | Phẩm tối thiểu | Giá | Bán / Tặng | Ai thích |
|---|---|---|---|---|---|---|---|
| tramngoc | Trâm ngọc bích | hàng rong; thưởng đêm thị tẩm, sinh thần; Hoàng hậu ban | tóc: Sắc +2 | mọi phẩm | 30 | 15 / được | HH, phi tần |
| boodieu | Bộ diêu vàng | hàng rong; thưởng tấn phong; Mệnh truyện (court, hiếm) | tóc: Sắc +5, Danh +2 | Phi (4) | 90 | 45 / được | HH, phi tần |
| tramphuong | Trâm phượng cửu vĩ | không bán, không ai ban (chưa có nguồn) | tóc: Sắc +8, Danh +4 | Hoàng hậu (7) | 200 | 100 / được | phi tần |
| vongngoc | Vòng ngọc Hòa Điền | hàng rong; thưởng đêm, thi tài, tố giác, sinh thần; Thái hậu ban; Mệnh truyện (court, quý) | tay: Sắc +2, Danh +1 | mọi phẩm | 50 | 25 / được | TH, HH, phi tần |
| vongvang | Vòng vàng chạm phượng | hàng rong; thưởng sinh hoàng tử, tấn phong | tay: Sắc +4, Danh +3 | Quý phi (5) | 120 | 60 / được | phi tần |

## 2. Vải vóc (may áo 3 tháng) — 3 món
| luahang | Lụa Hàng Châu | hàng rong; thưởng đêm, tố giác, sinh công chúa; HH ban; Mệnh truyện (court, thường) | Sắc +3 trong 3 tháng | mọi phẩm | 30 | 15 / được | TH, phi tần |
|---|---|---|---|---|---|---|---|
| gamto | Gấm Tô Châu | hàng rong; thưởng thi tài, sinh hoàng tử, tấn phong, Vạn thọ, sinh thần; Mệnh truyện (court, quý) | Sắc +6 trong 3 tháng | Quý phi (5) | 80 | 40 / được | TH, HH, phi tần |
| gamvang | Gấm minh hoàng | không bán, không ai ban (chưa có nguồn) | Sắc +9 trong 3 tháng | Hoàng hậu (7) | 160 | 80 / được | — |

## 3. Son phấn, hương liệu — 4 món
| sonphan | Son phấn Dương Châu | hàng rong; thưởng đêm; phi tần tặng; sinh công chúa | dùng: Sắc +2 | — | 20 | 10 / được | phi tần |
|---|---|---|---|---|---|---|---|
| huongtram | Hương trầm | hàng rong; thưởng đêm; Thái hậu ban; phi tần tặng; Mệnh truyện | dùng: Đức +1, Sức +5 | — | 20 | 10 / được | TH, Hoàng thượng |
| tuithom | Túi thơm thêu | hàng rong; phi tần tặng; HH ban; sinh công chúa | dùng: Sức +3 | — | 15 | 7 / được | phi tần, HH |
| xahuong | Xạ hương | hàng rong (lén, 45% mỗi lần đổi hàng); mua lén (j83 IROUTE) | trộn vào túi thơm/hương trầm: hại thai | — | 50 | 25 / được | — |

## 4. Thuốc bổ, thuốc — 6 món
| nhansam | Nhân sâm trăm năm | hàng rong; thưởng sinh hoàng tử, hầu thuốc; Thái hậu ban; Mệnh truyện (med, hiếm) | dùng: Sức +25; có thai thì an thai | — | 60 | 30 / được | TH |
|---|---|---|---|---|---|---|---|
| yensao | Yến sào | hàng rong; thưởng đêm, hầu thuốc; Thái hậu ban | dùng: Sức +15, Sắc +1 | — | 35 | 17 / được | TH, phi tần |
| agiao | A giao | hàng rong; thưởng hầu thuốc | dùng: Sức +10; 2 tháng dễ thụ thai | — | 40 | 20 / được | phi tần |
| giaidoc | Thuốc giải độc | hàng rong; Mệnh truyện (med, hiếm) | để trong rương: cứu một lần trúng độc | — | 70 | 35 / được | — |
| thuocanthai | Thuốc an thai | hàng rong; Mệnh truyện (med, thường) | dùng khi có thai: nguy cơ sảy giảm nửa | — | 25 | 12 / được | phi tần |
| ngocdungcao | Ngọc dung cao | Mệnh truyện (med, trân phẩm); j70 bán trên thẻ vết thương | thoa mặt: chữa hủy dung (lành không sẹo, sớm 4 tuần); mặt lành Sắc +3 | — | 0 | không bán / được | — |

## 5. Độc dược (đồ cấm `il`) — 3 món
| hacdinh | Hạc đỉnh hồng | hàng rong lén; chợ đen, Thái y viện, cung nữ mua lén, xin đồng minh (j83) | hạ độc chắc chết; khám ra là tội | — | 120 | 60 / được | — |
|---|---|---|---|---|---|---|---|
| botngua | Bột ngứa | như trên | rắc áo phi tần: Danh -5; khám ra là tội | — | 30 | 15 / được | — |
| (xahuong ở mục 3 cũng nằm trong WILL đồ cấm j83) | | | | | | | |

## 6. Lễ vật (để tặng) — 5 món
| tranhco | Tranh cổ | hàng rong; thưởng thi tài, tấn phong, Mệnh truyện (emp/scholar) | tặng HT, TH: rất hợp ý (quà 10) | — | 90 | 45 / được | HT, TH |
|---|---|---|---|---|---|---|---|
| nghien | Nghiên mực Đoan Khê | hàng rong; thưởng tố giác; Mệnh truyện | tặng HT: hợp ý (8) | — | 60 | 30 / được | HT |
| dancoc | Đàn cổ Tiêu Vĩ | hàng rong; thưởng thi tài, Vạn thọ; Mệnh truyện (scholar) | tặng HT, phi tần mê nhạc (10) | — | 100 | 50 / được | HT, phi tần |
| demgam | Đệm gấm | hàng rong | tặng: ai cũng nhận (4) | — | 20 | 10 / được | TH, phi tần, HH |
| vangbac | Rương vàng bạc châu báu | Mệnh truyện (family, quý) | mở rương: Bạc +120 | — | 0 | không bán / được | — |

## 7. Kỷ vật, thư từ — 5 món
| ngocboi | Ngọc bội ngự ban | thưởng sinh hoàng tử; Mệnh truyện (emp, trân phẩm) | còn giữ: Sủng không dưới 15; mất là đại họa | — | 0 | **không bán, không tặng** | — |
|---|---|---|---|---|---|---|---|
| bienvang | Biển vàng tạ ơn | Mệnh truyện (family, hiếm) | treo trước cửa cung: Danh +8 | — | 0 | không bán / được | — |
| bienngu | Biển ngự bút «Trung hiếu lưỡng toàn» | Mệnh truyện (family, trân phẩm) | treo: Danh +12, Đức +3 | — | 0 | không bán / được | — |
| thunha | Thư nhà | Mệnh truyện (family, thường) | đọc: Sức +10, Đức +2 | — | 0 | không bán / được | — |
| chungcu | Tập chứng cứ | thưởng "tuyến truyện thành" | dùng với một phi tần: chứng cứ +2 | — | 0 | không bán / được | — |

## 8. Tác phẩm tự tay (j83, khóa `tp`) — 11 kiểu × 4 bậc (Thường/Khá/Tinh xảo/Tuyệt phẩm)
Bức tranh, Khăn thêu, Bình hoa (để 1 tuần), Bức thư pháp, Quyển kinh chép tay (Đức +1), Khúc đàn tự phổ, Thế cờ tàn, Điệu múa (chỉ dâng HT/TH), Áo múa tự may, Món (để 1 tuần), Túi hương. Có được: tự luyện hoặc học tài nghệ (phẩm = điểm trò tài nghệ 0..10 + bậc + vật liệu). Dâng/tặng (hợp gu người nhận), bán (6/10/16/24 bạc × hệ số), bày ở yến tiệc (Danh +1/2/3/5). NPC cũng làm, tặng, bán.

## Nguồn phần thưởng (ai ban gì)
- `bestow(p,why)` (j8 + j20): night, contest, son, dau, promo, accuse, story, birthday (Vạn thọ), sinhthan, nurse; mỗi lần thêm bạc (BBAC) và phi tần khác ghen +3; ghi **Sổ ân thưởng** `S.awards` (60 dòng). Món vượt phẩm bị lọc trừ khi sinh hoàng tử.
- Thái hậu ban (th≥60, 8%/tháng): nhansam, yensao, vongngoc, huongtram. Hoàng hậu ban (hh≥50, 6%): tramngoc, luahang, tuithom; Hoàng hậu tịch thu trang sức khi hh≤-40.
- Mệnh truyện j67 `reward67(theme,tier)`: 5 nhóm × 4 bậc (thường/quý/hiếm/trân phẩm): family [thunha, vangbac, bienvang, bienngu], court [luahang, vongngoc, gamto, boodieu], med [thuocanthai, nhansam, giaidoc, ngocdungcao], emp [huongtram, nghien, tranhco, ngocboi], scholar [huongtram, nghien, dancoc, tranhco].
- Phi tần đến chơi tặng (j24): tuithom, sonphan, luahang, huongtram. Gánh hàng rong (`SHOP_ALL` 18 món, mỗi lượt 6 món + 45% một món cấm). Chợ đen qua kẻ hầu (j29).

## Lỗ hổng thấy khi kiểm kê
1. Trâm phượng cửu vĩ và Gấm minh hoàng có trong dữ liệu nhưng không có đường nào để có (chỉ khi đã là Hoàng hậu cũng không ai ban).
2. Chưa có loại "ngự tứ" (không bán, không tặng) ngoài Ngọc bội. Phần thưởng lớn vẫn là đồ mua được ở hàng rong.
3. Y phục chỉ là "áo mới 3 tháng" từ vải, không có món áo cụ thể; NPC không có ô đang mặc thấy được.
4. 11 món chưa có ảnh riêng.
→ j92 bổ sung (xem dev/WARDROBE.md).

## Hoa điền (review/hoa-dien, owner OD 17/11 ~17:30Z / ~17:45Z real)
- ONE table: j92 `WD_LIST` slot `"hd"`, 8 tiers (P1 Hoa điền mai trắng · P2 hoa đào · P3 bạc khảm lưu ly (old hair item, moved) · P4 hồ điệp · P5 lá lan phỉ thúy · P6 liên hoa hồng ngọc · P7 mẫu đơn điểm thúy · P8 kim phượng). Motifs: flowers / leaves / butterfly / phoenix only (OD:L1104).
- Never worn through the wardrobe (`wdWear` refuses "hd"); placed during makeup only (jhd `hdStep`): pick one → drag + tilt → Dán. q = `hdQ(distance / eye distance, tilt vs eye line)`; part `hd` of `toilRaw` (weights `BAL.toil.w`), a miss still counts.
- NPCs, her auto bot and contest rivals: `hdNpc` (same q from their hand, hashed per day, cap `BAL.hd.npcCap`).
- Xa xỉ: `wdLux(k)` of the placed one inside `toilMkLux` → `luxOf` → `luxTotal`; `luxParts(p).hd` = its share of `mk`.
- Sources: shop restock (`BAL.hd.shop` %), NPC holdings (`BAL.hd.npcHave` %) → their gifts (j8 tg "rv"), found (`BAL.hd.find` % / month), +1 per promotion (her and NPCs).
- Thử tay: `KG82_KIND.hoadien` / `KG82_ENG.hoadien` (board ease → `BAL.mgTier.lev.hoadien.tol`).
- Art pending (Foreman C): transparent sprites `img/hd-<key>.webp` (until then the item picture is placed), item icons `img/wd-hd-*.webp`, clean foreheads + per-face anchors (`window.HD_ANCHOR[file]`).
