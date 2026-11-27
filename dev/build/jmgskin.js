/* KIT MG-SKIN wiring (THIN lane «MGSKIN-WIRE», review/mgskin-wire): the painted seasonal skins of Foreman F's batch (img/mg/<board>-<id>.webp on the CDN,
   ids xuan · ha · thu · dong) registered through the kit's kitMgSkinAdd in ONE table; no per-board code, no private CSS, no BAL number (law 4/9/11).
   - pick: kg82Open asks mgpSkin(kind) (jmgpool.js) = "default" (today's art) + the registered skins, fresh-first through the shared no-repeat memory (mgskin:<kind>:<skin>);
   - pictures: the kit resolver kg82SkinSrc names the file by the BOARD the kind plays (kg82BgName), so a kind that plays another kind's board uses that board's files
     (td_cong→theu, td_hanh/kinh/may→ve, le→huong, tc→banh, hoadien→chai, xa→doi, thq/td_dung→mua, td_ngon→tho); a file not on the CDN index = today's art (never a hole);
   - names: Foreman F's cổ trang words (not shown to the player today; the kit slot only stores them); button palette per season: xuan dao · ha ngoc · thu kim · dong mac.
   kinh / may follow «ve» through KG82_BOARDOF (j82), nothing to register here. */
const MGSKIN_SEASON=[["xuan","dao"],["ha","ngoc"],["thu","kim"],["dong","mac"]];
const MGSKIN_NAMES={
 dan:["Xuân đài","Hạ liên đài","Thu đài","Đông điện"],
 hat:["Xuân trì","Hạ liên các","Thu các","Đông điện"],
 co:["Xuân viên","Hạ trì","Thu đình","Đông đình"],
 co7:["Xuân viên","Hạ trì","Thu các","Đông điện"],
 dauho:["Xuân đài","Hạ trì đài","Thu đài","Đông đài"],
 ban:["Xuân viên","Hạ viên","Thu viên","Đông viên"],
 tho:["Xuân đình","Hạ viện","Thu viện","Đông điện"],
 doi:["Xuân sảnh","Hạ sảnh","Thu sảnh","Đông sảnh"],
 doden:["Xuân dạ viên","Hạ dạ trì","Thu dạ viện","Đông dạ điện"],
 ve:["Xuân thư án","Hạ trì các","Thu các","Đông điện"],
 hoa:["Xuân viên","Hạ trì","Thu viên","Đông viên"],
 theu:["Xuân viên","Hạ trì","Thu các","Đông điện"],
 kim:["Xuân viên","Hạ trì","Thu viên","Đông viên"],
 mua:["Xuân đình","Hạ liên đình","Thu đình","Đông đình"],
 banh:["Xuân thiện","Hạ thiện","Thu thiện","Đông thiện"],
 huong:["Xuân đình","Hạ đình","Thu đình","Đông đình"],
 chai:["Xuân trang các","Hạ trang các","Thu trang các","Đông trang các"],
 xa:["Xuân bích","Hạ bích","Thu bích","Đông bích"],
 thq:["Xuân đình","Hạ liễu","Thu đình","Đông tuyết"],
 td_dung:["Xuân đình","Hạ liễu","Thu đình","Đông tuyết"],
 td_ngon:["Xuân sân","Hạ sân","Thu sân","Đông sân"],
 tat:["Xuân điện","Hạ đình","Thu các","Đông điện"],
 ne:["Xuân sảnh","Hạ sảnh","Thu sảnh","Đông sảnh"],
 nghe:["Xuân hiên","Hạ hiên","Thu hiên","Đông hiên"],
 duho:["Xuân hồ","Hạ trì","Thu hồ","Đông hồ"],
 den:["Xuân đăng","Hạ đăng","Thu đăng","Đông đăng"],
 truyen:["Xuân lang","Hạ lang","Thu lang","Đông lang"],
 mac:["Xuân phường","Hạ phường","Thu phường","Đông phường"],
 thoico:["Xuân viên","Hạ trì","Thu viên","Đông tuyết"],
 thu_tam:["Xuân đình","Hạ trì","Thu đình","Đông đình"],
 thu_choi:["Xuân viên","Hạ viên","Thu viên","Đông viên"],
 tuoi:["Xuân thảo","Hạ thảo","Thu thảo","Đông tuyết"]};
/* a kind with no skin names of its own plays another kind's board and takes that board's names (the files are that board's) */
const MGSKIN_OF={td_cong:"theu",td_hanh:"ve",le:"huong",tc:"banh",hoadien:"chai"};
window.MGSKIN_NAMES=MGSKIN_NAMES;window.MGSKIN_OF=MGSKIN_OF;
(function(){if(typeof kitMgSkinAdd!=="function")return;const reg=(k,L)=>MGSKIN_SEASON.forEach((s,i)=>kitMgSkinAdd(k,s[0],{name:L[i],pal:s[1]}));
 for(const k in MGSKIN_NAMES)reg(k,MGSKIN_NAMES[k]);for(const k in MGSKIN_OF)reg(k,MGSKIN_NAMES[MGSKIN_OF[k]])})();
