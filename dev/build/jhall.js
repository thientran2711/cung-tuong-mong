/* ================= jhall: ONE place-name table for the halls of every palace (owner OD:L1475, 16/11 21:48Z) =================
   Real courts hung a named plaque (biển ngạch) on every hall. Display-only: ids (part 'chinh'|'dong'|'tay'|'cungnhan', palace keys, slots) never change,
   old saves load untouched. The role (Chính điện / Đông phối điện / Tây phối điện / Dãy nhà cung nhân) stays only as a small subtitle (HALL.role).
   Patterns (dev/handover/reports/hall-names-history.md): chính = 2 auspicious/virtue characters + điện; Đông (spring, benevolence) side = + hiên;
   Tây (autumn, righteousness) side = + trai; the servants' row = + viện. Every name is unique in the whole table AND against the palace names (selftest below).
   Keyed by the palace's own display name (PALN / jpal.js list / "Càn Ninh cung"), so a slot index never matters. */
const HALL_PN={
 "Cảnh Phúc cung":["Thể Hòa điện","Dưỡng Xuân hiên","Thanh Thu trai"],
 "Khải Tường cung":["Sùng Đức điện","Nhã Vận hiên","Tĩnh Nghi trai"],
 "Chung Tú cung":["Diên Khánh điện","Minh Hòa hiên","Du Thanh trai"],
 "Hàm An cung":["Thụy Ngọc điện","Tuy Phúc hiên","Tịch Nguyệt trai"],
 "Thừa Minh cung":["Chiêu Huy điện","Duyệt Xuân hiên","Thanh Dật trai"],
 "Diên Huy cung":["Kính Ninh điện","Chiêu Nhân hiên","Sùng Nghĩa trai"],
 "Vĩnh Hòa cung":["Hoài Nhu điện","Hòa Chương hiên","Tư Tĩnh trai"],
 "Trường Xuân cung":["Lạc Thọ điện","Vĩnh Xuân hiên","Hàm Thu trai"],
 "Vĩnh Thọ cung":["Ngưng Tường điện","Tuyên Hòa hiên","Hoài Cẩn trai"],
 "Dực Khôn cung":["Hậu Đức điện","Hòa Sướng hiên","Mặc Hương trai"],
 "Càn Ninh cung":["Mẫu Nghi điện"]};
const HALL_ROLE={chinh:"Chính điện",dong:"Đông phối điện",tay:"Tây phối điện",cungnhan:"Dãy nhà cung nhân"};
const HALL_IDX={chinh:0,dong:1,tay:2};
const HALL_SRV="Tích Cần viện"; /* the servants' row is one shared building */
const HALL_NC="Quân Ân điện"; /* Nam Chiếu court hall (jkc2 P.dien); role "chính điện" = subtitle only */
/* hallName(palaceName, part) → the plaque name; unknown palace / part → the old generic role (nothing ever blank) */
function hallName(pn,part){if(part==="cungnhan")return HALL_SRV;const L=HALL_PN[pn];const i=HALL_IDX[part];return(L&&i!=null&&L[i])||HALL_ROLE[part]||""}
function hallRole(part){return HALL_ROLE[part]||""}
