/* ================= j98: TRANH VẬT PHẨM (data only; the kit component kitItem draws the frame + grade background) =================
   Every item has a painted transparent icon (gpt-2-6, dev/art/ITEM_ART.md):
     img/item-<key>.webp            256x256   (chest grid, reward tray, result cards)
     img/item512/item-<key>.webp    512x512   (detail view, large reward reveal)
   Handmade works (IT.tp, j83 WK kinds) have one painting per tier, drawn differently (crude → exquisite):
     img/item-tp-<kind>-b<1..4>.webp   bậc 1 Thường · 2 Khá · 3 Tinh xảo · 4 Tuyệt phẩm (j83 WTIER, wk.ti = bậc-1)
   Grade (phẩm cấp, kitItem background colour): 0 Thường · 1 Tinh phẩm · 2 Trân phẩm · 3 Tuyệt phẩm · 4 Ngự tứ (same scale as j92 WD_GRADE).
   API:
     itemArt(key)                 → {src, src512, grade, gradeName, key}   key = IT key, e.g. "nhansam"
     itemArt("theu", 3)           → work "theu" bậc 3 (also "tp-theu", 3)
     itemArt(invEntry)            → an inventory entry {k, wk:{kind, ti}} (works use wk.ti+1 as bậc)
   Unknown keys return null (the kit shows its empty slot). Wardrobe items (j92 WD_ITEMS, img/wd-*) are not here. */
const ITEM_GRADE=["Thường","Tinh phẩm","Trân phẩm","Tuyệt phẩm","Ngự tứ"];
const ITEM_ART_G={
 /* Thường */ sonphan:0,huongtram:0,tuithom:0,thuocanthai:0,demgam:0,luahang:0,tramngoc:0,botngua:0,thunha:0,chungcu:0,hinhnhan:0,
 /* Tinh phẩm */ vongngoc:1,yensao:1,agiao:1,nhansam:1,xahuong:1,nghien:1,giaidoc:1,
 /* Trân phẩm */ gamto:2,boodieu:2,tranhco:2,dancoc:2,vongvang:2,hacdinh:2,vangbac:2,bienvang:2,
 /* Tuyệt phẩm */ tramphuong:3,gamvang:3,ngocdungcao:3,
 /* Ngự tứ */ ngocboi:4,bienngu:4,
 /* D45 small-art (review/small-art-wire): earrings + shoes (no wear slot yet: KIT REQUEST), per-rank Đeo eo / Đeo tay / Túi thơm of the promotion set (jinv RANKED) */
 hoatai:1,hoataivang:2,giayhoa:0,giaygam:1,
 ngocboi_r0:0,ngocboi_r1:0,ngocboi_r2:1,ngocboi_r3:1,ngocboi_r4:2,ngocboi_r5:2,ngocboi_r6:3,ngocboi_r7:4,
 vongngoc_r1:1,vongngoc_r2:1,vongngoc_r3:2,vongngoc_r4:2,
 tuithom_r1:0,tuithom_r2:0,tuithom_r3:1,tuithom_r4:1,tuithom_r5:2,tuithom_r6:2,tuithom_r7:3};
const ITEM_ART_TP=["tranh","theu","bhoa","tho","kinh","khuc","the","mua","ao","mon","huong"];
function itemArt(key,tier){try{
  let k=key,b=tier;
  if(k&&typeof k==="object"){if(k.wk){b=(k.wk.ti|0)+1;k=k.wk.kind}else k=k.k}
  k=String(k||"");if(k.indexOf("tp-")===0)k=k.slice(3);
  if(ITEM_ART_TP.indexOf(k)>=0){b=Math.max(1,Math.min(4,(b|0)||1));const n=`tp-${k}-b${b}`,g=b-1;
    return {key:n,src:`img/item-${n}.webp`,src512:`img/item512/item-${n}.webp`,grade:g,gradeName:ITEM_GRADE[g]}}
  if(!(k in ITEM_ART_G))return null;const g=ITEM_ART_G[k];
  return {key:k,src:`img/item-${k}.webp`,src512:`img/item512/item-${k}.webp`,grade:g,gradeName:ITEM_GRADE[g]}}catch(e){return null}}
/* existing small icons (j8 iic → "item-"+ITIMG[k]) now point at the new paintings, one file per key */
try{if(typeof ITIMG==="object"&&ITIMG)for(const k in ITEM_ART_G)ITIMG[k]=k}catch(e){}
