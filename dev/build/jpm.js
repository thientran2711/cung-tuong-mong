/* ---- jpm: kitPalaceMap — BẢN ĐỒ CHI TIẾT MỘT CUNG (owner 11/15, KIT.md §33) ----
   Dư đồ → chạm một trong 8 cung phi tần (MAPH.rivalSlots) hoặc Càn Ninh → bản đồ chi tiết sân cung (tranh L2 của Phượng Lệnh,
   img/pl2/<dir>-<mùa>-<buổi>.webp, lễ: <dir>-<lễ>-<buổi>.webp) với 3 điểm chạm: Chính điện · Đông phối điện · Tây phối điện.
   Mỗi điểm: chip "N bóng người" = số người THẬT có mặt buổi này, chia từ đúng nguồn của chip Dư đồ (countAt / S.where):
   tổng 3 điểm = countAt(cung). Chạm một điểm = đi đến cung đó (luật ra vào, khắc, bái kiến như cũ, j77Tap) rồi vào phòng ấy:
   tranh phòng = residenceArt(cung, phần) của jres (25 phòng × 4 mùa × 4 buổi) với ĐÚNG những người
   phòng ấy trên sân khấu kit (curPeople lọc theo phòng). Quay lại: phòng → bản đồ cung → Dư đồ.
   ONE SOURCE (review/residence-art jres.js): who lives in which hall = residenceOf / roomResidents; the room picture = residenceArt.
   Không sửa module cũ: bọc mapHTML / j77Tap / placeOf / curPeople / goTo / renderStage. Nạp cuối cùng (sau j84). */

/* dữ liệu điểm chạm: một bản cho mỗi tranh L2 (phân số của tranh 16:9); nguồn: img/pl2/hotspots.json (giữ hai chỗ giống nhau:
   python3 dev/tools/pl2_sync.py chép JSON vào đây) */
const KPM_DATA=/*@pl2*/{"_src":"Phượng Lệnh art repo thientran2711/phuong-lenh-art commit a9becbe, places/palace/nhat/x/L2/<dir>/<state>.webp (resized 1792 px, webp q80)","spots":{"nhat-phi-cung":{"chinh":{"x":0.24,"y":0.06,"w":0.52,"h":0.38},"tay":{"x":0.0,"y":0.3,"w":0.19,"h":0.45},"dong":{"x":0.81,"y":0.3,"w":0.19,"h":0.45},"cungnhan":{"x":0.82,"y":0.62,"w":0.1,"h":0.2}},"nhat-quy-cung":{"chinh":{"x":0.2,"y":0.06,"w":0.58,"h":0.36},"tay":{"x":0.0,"y":0.22,"w":0.17,"h":0.48},"dong":{"x":0.79,"y":0.22,"w":0.19,"h":0.5},"cungnhan":{"x":0.86,"y":0.66,"w":0.1,"h":0.16}},"nhat-vinh-hoa":{"chinh":{"x":0.27,"y":0.04,"w":0.48,"h":0.36},"tay":{"x":0.07,"y":0.27,"w":0.14,"h":0.45},"dong":{"x":0.8,"y":0.27,"w":0.14,"h":0.45},"cungnhan":{"x":0.87,"y":0.6,"w":0.09,"h":0.17}},"nhat-spare-cung":{"chinh":{"x":0.16,"y":0.03,"w":0.68,"h":0.4},"tay":{"x":0.0,"y":0.23,"w":0.12,"h":0.45},"dong":{"x":0.88,"y":0.23,"w":0.12,"h":0.45},"cungnhan":{"x":0.87,"y":0.66,"w":0.09,"h":0.16}},"nhat-can-ninh":{"chinh":{"x":0.26,"y":0.03,"w":0.54,"h":0.33},"tay":{"x":0.01,"y":0.38,"w":0.2,"h":0.4},"dong":{"x":0.85,"y":0.4,"w":0.15,"h":0.4}},"nhat-cac":{"chinh":{"x":0.23,"y":0.04,"w":0.54,"h":0.4},"tay":{"x":0.03,"y":0.3,"w":0.14,"h":0.4},"dong":{"x":0.83,"y":0.3,"w":0.14,"h":0.4},"cungnhan":{"x":0.02,"y":0.6,"w":0.1,"h":0.2}}},"rankDir":{"_note":"RANKS index of the palace's current chủ vị (3 Tần, 4 Phi, 5 Quý phi, 6 Hoàng quý phi, 7 Hoàng hậu) → PL L2 form; empty = no chủ vị (PHUONG_LENH_ART_REUSE.md §9)","empty":"spare-cung","3":"cac","4":"phi-cung","5":"quy-cung","6":"vinh-hoa","7":"can-ninh"},"have":{"nhat-cac":["doanngo-chieu","doanngo-sang","doanngo-toi","doanngo-trua","dong-chieu","dong-sang","dong-toi","dong-trua","dongchi-chieu","dongchi-sang","dongchi-toi","dongchi-trua","giaothua-chieu","giaothua-sang","giaothua-toi","giaothua-trua","ha-chieu","ha-sang","ha-toi","ha-trua","lapbat-chieu","lapbat-sang","lapbat-toi","lapbat-trua","newyear-chieu","newyear-sang","newyear-toi","newyear-trua","nguyentieu-chieu","nguyentieu-sang","nguyentieu-toi","nguyentieu-trua","phoenix-chieu","phoenix-sang","phoenix-toi","phoenix-trua","tang-chieu","tang-sang","tang-toi","tang-trua","thanhminh-chieu","thanhminh-sang","thanhminh-toi","thanhminh-trua","thanhtho-chieu","thanhtho-sang","thanhtho-toi","thanhtho-trua","thattich-chieu","thattich-sang","thattich-toi","thattich-trua","thu-chieu","thu-sang","thu-toi","thu-trua","trungcuu-chieu","trungcuu-sang","trungcuu-toi","trungcuu-trua","trungthu-chieu","trungthu-sang","trungthu-toi","trungthu-trua","vantho-chieu","vantho-sang","vantho-toi","vantho-trua","vulan-chieu","vulan-sang","vulan-toi","vulan-trua","xuan-chieu","xuan-sang","xuan-toi","xuan-trua"],"nhat-can-ninh":["doanngo-chieu","doanngo-sang","doanngo-toi","doanngo-trua","dong-chieu","dong-sang","dong-toi","dong-trua","dongchi-chieu","dongchi-sang","dongchi-toi","dongchi-trua","giaothua-chieu","giaothua-sang","giaothua-toi","giaothua-trua","ha-chieu","ha-sang","ha-toi","ha-trua","lapbat-chieu","lapbat-sang","lapbat-toi","lapbat-trua","newyear-chieu","newyear-sang","newyear-toi","newyear-trua","nguyentieu-chieu","nguyentieu-sang","nguyentieu-toi","nguyentieu-trua","phoenix-chieu","phoenix-sang","phoenix-toi","phoenix-trua","tang-chieu","tang-sang","tang-toi","tang-trua","thanhminh-chieu","thanhminh-sang","thanhminh-toi","thanhminh-trua","thanhtho-chieu","thanhtho-sang","thanhtho-toi","thanhtho-trua","thattich-chieu","thattich-sang","thattich-toi","thattich-trua","thu-chieu","thu-sang","thu-toi","thu-trua","trungcuu-chieu","trungcuu-sang","trungcuu-toi","trungcuu-trua","trungthu-chieu","trungthu-sang","trungthu-toi","trungthu-trua","vantho-chieu","vantho-sang","vantho-toi","vantho-trua","vulan-chieu","vulan-sang","vulan-toi","vulan-trua","xuan-chieu","xuan-sang","xuan-toi","xuan-trua"],"nhat-phi-cung":["doanngo-chieu","doanngo-sang","doanngo-toi","doanngo-trua","dong-chieu","dong-sang","dong-toi","dong-trua","dongchi-chieu","dongchi-sang","dongchi-toi","dongchi-trua","giaothua-chieu","giaothua-sang","giaothua-toi","giaothua-trua","ha-chieu","ha-sang","ha-toi","ha-trua","lapbat-chieu","lapbat-sang","lapbat-toi","lapbat-trua","newyear-chieu","newyear-sang","newyear-toi","newyear-trua","nguyentieu-chieu","nguyentieu-sang","nguyentieu-toi","nguyentieu-trua","phoenix-chieu","phoenix-sang","phoenix-toi","phoenix-trua","tang-chieu","tang-sang","tang-toi","tang-trua","thanhminh-chieu","thanhminh-sang","thanhminh-toi","thanhminh-trua","thanhtho-chieu","thanhtho-sang","thanhtho-toi","thanhtho-trua","thattich-chieu","thattich-sang","thattich-toi","thattich-trua","thu-chieu","thu-sang","thu-toi","thu-trua","trungcuu-chieu","trungcuu-sang","trungcuu-toi","trungcuu-trua","trungthu-chieu","trungthu-sang","trungthu-toi","trungthu-trua","vantho-chieu","vantho-sang","vantho-toi","vantho-trua","vulan-chieu","vulan-sang","vulan-toi","vulan-trua","xuan-chieu","xuan-sang","xuan-toi","xuan-trua"],"nhat-quy-cung":["doanngo-chieu","doanngo-sang","doanngo-toi","doanngo-trua","dong-chieu","dong-sang","dong-toi","dong-trua","dongchi-chieu","dongchi-sang","dongchi-toi","dongchi-trua","giaothua-chieu","giaothua-sang","giaothua-toi","giaothua-trua","ha-chieu","ha-sang","ha-toi","ha-trua","lapbat-chieu","lapbat-sang","lapbat-toi","lapbat-trua","newyear-chieu","newyear-sang","newyear-toi","newyear-trua","nguyentieu-chieu","nguyentieu-sang","nguyentieu-toi","nguyentieu-trua","phoenix-chieu","phoenix-sang","phoenix-toi","phoenix-trua","tang-chieu","tang-sang","tang-toi","tang-trua","thanhminh-chieu","thanhminh-sang","thanhminh-toi","thanhminh-trua","thanhtho-chieu","thanhtho-sang","thanhtho-toi","thanhtho-trua","thattich-chieu","thattich-sang","thattich-toi","thattich-trua","thu-chieu","thu-sang","thu-toi","thu-trua","trungcuu-chieu","trungcuu-sang","trungcuu-toi","trungcuu-trua","trungthu-chieu","trungthu-sang","trungthu-toi","trungthu-trua","vantho-chieu","vantho-sang","vantho-toi","vantho-trua","vulan-chieu","vulan-sang","vulan-toi","vulan-trua","xuan-chieu","xuan-sang","xuan-toi","xuan-trua"],"nhat-spare-cung":["doanngo-chieu","doanngo-sang","doanngo-toi","doanngo-trua","dong-chieu","dong-sang","dong-toi","dong-trua","dongchi-chieu","dongchi-sang","dongchi-toi","dongchi-trua","giaothua-chieu","giaothua-sang","giaothua-toi","giaothua-trua","ha-chieu","ha-sang","ha-toi","ha-trua","lapbat-chieu","lapbat-sang","lapbat-toi","lapbat-trua","newyear-chieu","newyear-sang","newyear-toi","newyear-trua","nguyentieu-chieu","nguyentieu-sang","nguyentieu-toi","nguyentieu-trua","phoenix-chieu","phoenix-sang","phoenix-toi","phoenix-trua","tang-chieu","tang-sang","tang-toi","tang-trua","thanhminh-chieu","thanhminh-sang","thanhminh-toi","thanhminh-trua","thanhtho-chieu","thanhtho-sang","thanhtho-toi","thanhtho-trua","thattich-chieu","thattich-sang","thattich-toi","thattich-trua","thu-chieu","thu-sang","thu-toi","thu-trua","trungcuu-chieu","trungcuu-sang","trungcuu-toi","trungcuu-trua","trungthu-chieu","trungthu-sang","trungthu-toi","trungthu-trua","vantho-chieu","vantho-sang","vantho-toi","vantho-trua","vulan-chieu","vulan-sang","vulan-toi","vulan-trua","xuan-chieu","xuan-sang","xuan-toi","xuan-trua"],"nhat-vinh-hoa":["doanngo-chieu","doanngo-sang","doanngo-toi","doanngo-trua","dong-chieu","dong-sang","dong-toi","dong-trua","dongchi-chieu","dongchi-sang","dongchi-toi","dongchi-trua","giaothua-chieu","giaothua-sang","giaothua-toi","giaothua-trua","ha-chieu","ha-sang","ha-toi","ha-trua","lapbat-chieu","lapbat-sang","lapbat-toi","lapbat-trua","newyear-chieu","newyear-sang","newyear-toi","newyear-trua","nguyentieu-chieu","nguyentieu-sang","nguyentieu-toi","nguyentieu-trua","phoenix-chieu","phoenix-sang","phoenix-toi","phoenix-trua","tang-chieu","tang-sang","tang-toi","tang-trua","thanhminh-chieu","thanhminh-sang","thanhminh-toi","thanhminh-trua","thanhtho-chieu","thanhtho-sang","thanhtho-toi","thanhtho-trua","thattich-chieu","thattich-sang","thattich-toi","thattich-trua","thu-chieu","thu-sang","thu-toi","thu-trua","trungcuu-chieu","trungcuu-sang","trungcuu-toi","trungcuu-trua","trungthu-chieu","trungthu-sang","trungthu-toi","trungthu-trua","vantho-chieu","vantho-sang","vantho-toi","vantho-trua","vulan-chieu","vulan-sang","vulan-toi","vulan-trua","xuan-chieu","xuan-sang","xuan-toi","xuan-trua"]},"_grade":"owner 11/15: only the most luxurious grade (nhat) for every courtyard; same-rank palaces share a picture; owner 11/16: a courtyard picture exists ONLY for places with >=2 halls (here: consort palaces by rank + home), single-hall places (places[k] has no form) go straight to the place","places":{"_note":"other places on the plan: key -> label of the one hotspot; no PL form = no courtyard, the tap goes straight to the place (owner 11/16). Only 'home' (several halls) keeps a form","home":{"form":"cac","label":"Ngọc Thanh các"},"dtd":{"label":"Dưỡng Hòa điện"},"tn":{"label":"Đức Thọ cung"},"lc":{"label":"Trường Môn viện"},"vuon":{"label":"Ngự hoa viên"},"ksp":{"label":"Kính sự phòng"},"thu":{"label":"Cần Chính điện"},"nvp":{"label":"Nội vụ phủ"}}}/*@*/;
/* WHICH HALLS ARE REALLY PAINTED in each courtyard picture (owner 16/11 21:36Z: a picture may only serve a place whose halls are ALL painted in it, every label sits ON its building).
   Audited by eye on all 6 dirs (r3): cac = ONE pavilion only (no side halls, no cung nhân row); the other five show chính + Đông + Tây phối điện. Not synced by pl2_sync.py: Foreman C updates this line when a new painting adds halls. */
const KPM_HALLS={"nhat-cac":["chinh"],"nhat-phi-cung":["chinh","dong","tay"],"nhat-quy-cung":["chinh","dong","tay"],"nhat-vinh-hoa":["chinh","dong","tay"],"nhat-can-ninh":["chinh","dong","tay"],"nhat-spare-cung":["chinh","dong","tay"]};
const KPM_PARTS=[["chinh","Chính điện"],["dong","Đông phối điện"],["tay","Tây phối điện"]];
const KPM_PN={chinh:"Chính điện",dong:"Đông phối điện",tay:"Tây phối điện",cungnhan:"Dãy nhà cung nhân"};

function kpmBuoiW(){const four=typeof BUOI!=="undefined"&&BUOI.length>=4;return (four?["sang","trua","chieu","toi"]:["sang","chieu","toi"])[S.buoi||0]||"sang"}
function kpmSeason(){return ({"Xuân":"xuan","Hạ":"ha","Thu":"thu","Đông":"dong"})[SEASON[(S.month||1)-1]]||"xuan"}
/* the palace key on the plan for slot i ("r<id>" of its chủ vị, "home" when it is hers), or null when empty */
/* other places on the plan (KPM_DATA.places: key → PL form + label of its one hotspot): slot "p:<key>" */
function kpmPlace(k){const P=KPM_DATA.places||{};if(!P[k]||P[k].label==null)return null;if(k==="home"&&S.pal!=null)return null;if(k==="kn")return null;return P[k]}
function kpmIsPlace(slot){return typeof slot==="string"&&slot.indexOf("p:")===0}
function kpmKeyOf(i){if(kpmIsPlace(i)){const k=i.slice(2);return kpmPlace(k)?k:null}if(i==="kn")return qOn&&qOn()?"kn":null;for(const p of [S].concat(rivals)){if(p!==S&&(!p.alive||p.out||p.queen))continue;const k=palaceOf(p);if(k==="kn")continue;if(palSlot(k)===i)return k}return null}
function kpmSlotOf(k){if(k==="kn")return"kn";const i=palSlot(k);if(i!=null)return i;return kpmPlace(k)?"p:"+k:null}
function kpmName(slot){if(kpmIsPlace(slot)){const k=slot.slice(2);return k==="home"?HOMEN:palName(k)}return slot==="kn"?"Càn Ninh cung":PALN[slot]}
/* the courtyard picture follows the RANK of the palace's current chủ vị (owner 11/15, as in Phượng Lệnh; the 8 names are labels):
   lookup KPM_DATA.rankDir {"empty","3".."7"} → L2 form; changes as soon as the head is promoted, demoted or replaced */
function kpmHeadRank(k){if(!k)return null;const hd=kpmHead(k);if(!hd)return null;return hd.queen||(hd===S&&S.rank>=7)?7:rkOf(hd)}
/* owner 11/15: only the most luxurious PL grade (nhat) for every courtyard; same-rank palaces share a picture */
function kpmDir(slot){if(kpmIsPlace(slot)){const P=kpmPlace(slot.slice(2));return P&&P.form?"nhat-"+P.form:null}const R=KPM_DATA.rankDir||{};const r=kpmHeadRank(kpmKeyOf(slot));const form=(r!=null&&R[r])||R.empty;return form?"nhat-"+form:null}
/* the L2 picture for now (owner OD:L1415 + 16/11 21:12Z): the exact painted state when it exists (mourning tang-<buổi>; festival <lễ>-<buổi>; else <mùa>-<buổi>).
   A stand-in (missing state → season × nearest buổi, or a picture that does not paint every hall of the place) is allowed ONLY with tam:true → the kit 'tạm' chip (kitTam, jgrey.js)
   that disappears by itself once the exact picture is in KPM_DATA.have / KPM_HALLS. A hall label/hotspot is NEVER put on a building that is not painted (see kitPalaceMap). */
function kpmArt(slot){const dir=kpmDir(slot);if(!dir)return null;const have=(KPM_DATA.have||{})[dir]||[];const b=kpmBuoiW(),se=kpmSeason();
 let f=null;try{f=typeof festToday==="function"&&festToday()}catch(e){}
 let tang=false;try{tang=typeof wdTang==="function"&&!!wdTang()}catch(e){}
 const L=[];if(tang)L.push("tang-"+b);else if(f&&f.k){L.push(f.k+"-"+b);const ff=f.files&&f.files[b],mm=ff&&/map-fest-(.+)\.webp/.exec(ff);if(mm&&mm[1].endsWith("-"+b))L.push(mm[1])}else L.push(se+"-"+b);
 const exact=L[0];const near={sang:["sang","trua","chieu"],trua:["trua","sang","chieu"],chieu:["chieu","trua","sang"],toi:["toi"]}[b]||[b];
 near.forEach(x=>L.push(se+"-"+x));L.push("xuan-sang");const st=L.find(x=>have.includes(x));if(!st)return null;
 const H=KPM_HALLS[dir]||[];const halls=kpmParts(slot,kpmKeyOf(slot)).every(x=>H.includes(x[0]));
 const R0=KPM_DATA.rankDir||{};const hr=kpmIsPlace(slot)?null:kpmHeadRank(kpmKeyOf(slot));const rankPic=kpmIsPlace(slot)||(hr!=null&&!!R0[hr]); /* main 08725411: rank with no own picture → stand-in → tạm */
 return{src:`img/pl2/${dir}-${st}.webp`,dir,tam:!(L.slice(0,2).includes(st)&&halls&&rankPic)}}

/* who is where inside the palace, from the one ledger (S.where) and the map's own count (countAt) */
function kpmHead(k){if(k==="kn")return rivals.find(v=>v.queen&&v.alive&&!v.out)||null;if(k==="home"&&S.pal!=null)return S;const i=palSlot(k);if(i==null)return null;try{return roomResidents(i,"chinh")[0]||null}catch(e){return null}}
function kpmHallOf(p,k){try{const i=palSlot(k);const r=residenceOf(p);if(i!=null&&r.pal===i&&(r.part==="chinh"||r.part==="dong"||r.part==="tay"))return r.part}catch(e){}return"chinh"} /* guests: chính điện */
function kpmSplit(k){const W=S.where||{};const O={chinh:{ppl:[],n:0,res:[]},dong:{ppl:[],n:0,res:[]},tay:{ppl:[],n:0,res:[]},cungnhan:{ppl:[],n:0,res:[]}};if(!k)return O;
 if(k==="home"){const sv=kpmServants();O.cungnhan.n=sv.length;O.cungnhan.srv=1}
 if(kpmPlace(k)||k==="kn"){O.chinh.ppl=rivals.filter(v=>v.alive&&!v.out&&W[v.id]===k);try{O.chinh.n=countAt(k)}catch(e){O.chinh.n=O.chinh.ppl.length}if(k==="kn")O.chinh.res=residents(k);return O}
 const here=rivals.filter(v=>v.alive&&!v.out&&W[v.id]===k);here.forEach(v=>O[kpmHallOf(v,k)].ppl.push(v));
 let total=0;try{total=countAt(k)}catch(e){total=here.length}
 for(const h in O)if(h!=="cungnhan")O[h].n=O[h].ppl.length;O.chinh.n+=Math.max(0,total-here.length); /* men, kids, Thái hậu…: the chính điện */
 const i=palSlot(k);if(i!=null)["chinh","dong","tay"].forEach(h=>{O[h].res=roomResidents(i,h)});else residents(k).forEach(p=>O.chinh.res.push(p));return O}
/* her own servants (the people her rooms show, minus consorts, kids, men): they live in the dãy nhà cung nhân */
function kpmIsSrv(p){return !!p&&!(p.ref&&(rivals||[]).includes(p.ref))&&!["kid","man","emp","th","hh","rival","chest","fallen"].includes(p.kind)}
function kpmServants(){try{return (homePeople()||[]).filter(kpmIsSrv)}catch(e){return[]}}
function kpmSil(n,ppl){return"";if(!n)return"";const im=g=>typeof K61U==="object"&&K61U["fig-"+g]?`<svg viewBox="0 0 10 14" aria-hidden="true"><image href="img/kit/unknown-fig-${g}.webp" width="10" height="14" preserveAspectRatio="xMidYMax meet"/></svg>`:(typeof SILH==="string"?SILH:"");
 const L=ppl.map(()=>"f");while(L.length<n)L.push("f");return `<span class="msil" aria-label="${n} bóng người">${L.slice(0,Math.min(n,3)).map(im).join("")}${n>1?`<b>${n}</b>`:""}</span>`}
function kpmResLine(p){return p===S?"ngươi":`${p.queen?"Hoàng hậu":RANKS[rkOf(p)].n} ${p.name}`}

/* the halls (hotspots) of a slot: [part,label]; ONE rule for the whole plan (owner 11/16): >=2 halls → courtyard picture first, exactly 1 → the tap goes straight to the place */
function kpmParts(slot,k,nm){nm=nm||kpmName(slot);return(kpmIsPlace(slot)?[["chinh",(kpmPlace(slot.slice(2))||{}).label||nm]]:slot==="kn"?[["chinh","Chính điện"]]:KPM_PARTS.slice()).concat(k==="home"?[["cungnhan",KPM_PN.cungnhan]]:[])}
function kpmMulti(slot,k){return kpmParts(slot,k===undefined?kpmKeyOf(slot):k).length>=2&&!!kpmArt(slot)} /* >=2 halls AND some courtyard picture exists (exact or tạm stand-in); no picture at all → the Dư đồ tap goes straight to the hall */

/* ---------- the component ---------- */
/* kitPalaceMap({slot,k}) → HTML of the palace detail map, inside the Dư đồ leather (.mapv, kitLeather §32.1b). */
function kitPalaceMap(o){const slot=o.slot,k=o.k;const A=kpmArt(slot);const nm=kpmName(slot);const SP=kpmSplit(k);
 const spots=A&&KPM_DATA.spots&&KPM_DATA.spots[A.dir]||{};const why=o.why||"";
 const PARTS=kpmParts(slot,k,nm);
 const chip=(n,h)=>h==="cungnhan"?`<i>${n} cung nhân</i>`:n?`<i>${n} bóng người</i>`:`<i>vắng</i>`;
 const here=h=>(!!k&&S.place===k&&kpmHall()&&kpmHall().part===h)||(S.place==="home"&&kpmMine(slot)===h);
 return `<div class="mapv kpmv" data-kpm="${slot}"><div class="maptools"><span><button class="btn mz kpm-back" data-kpmback="1" aria-label="Về Dư đồ">‹ Dư đồ</button></span><span class="past kpm-t"><b>${nm}</b>${why?` · <em>${why}</em>`:""}</span></div>
 <div class="mapsc"><div class="mapw" style="width:100%">${A?`<img class="mapimg" src="${A.src}" alt="Sân ${nm} nhìn từ trên cao">`:`<img class="mapimg" src="${mapImg()}" alt="${nm}">`}
 ${PARTS.map(([h,hn])=>{const b=spots[h];if(!b||!(KPM_HALLS[A.dir]||[]).includes(h))return"";const s=SP[h]; /* only halls painted in this picture get a hotspot; the others stay in the kit list below */
  return `<button class="mspot kpm-spot${here(h)?" here":""}" data-go="kpm:${h}" title="${hn}${s.res.length?" · ở: "+s.res.map(kpmResLine).join(", "):""}" style="left:${b.x*100}%;top:${b.y*100}%;width:${b.w*100}%;height:${b.h*100}%"><span class="mlab">${hn}${chip(s.n,h)}</span>${h==="cungnhan"?"":kpmSil(s.n,s.ppl)}</button>`}).join("")}
 ${kitTam(!A||A.tam)}</div></div>
 <div class="kpm-list${PARTS.length===1?" one":""}">${PARTS.map(([h,hn])=>{const s=SP[h];return `<button class="btn kpm-row${here(h)?" sel":""}" data-kpmpart="${h}"><b class="kpm-rn">${hn}</b><span class="kpm-rs">${h==="cungnhan"?`${s.n} cung nhân của ngươi`:s.n?`${s.n} bóng người`:"vắng người"}</span>${kpmIsPlace(slot)||h==="cungnhan"?"":`<span class="kpm-rs">${s.res.length?"Người ở: "+s.res.map(kpmResLine).join(", "):"Chưa ai ở"}</span>`}</button>`}).join("")}</div></div>`}

/* ---------- state + navigation ---------- */
/* __kpm = the detail map open on the Dư đồ tab ({slot,k}); S.hall = the room she stands in ({k,part,t}) for this buổi only */
function kpmStamp(){return `${S.year}/${S.month}/${S.tuan}/${S.buoi||0}`}
function kpmHall(){const h=S&&S.hall;if(!h||h.t!==kpmStamp()||S.place!==h.k)return null;return h}
function kpmOpen(k){const slot=kpmSlotOf(k);if(slot==null)return false;return kpmOpenSlot(slot,k)}
function kpmOpenSlot(slot,k){window.__kpm={slot,k,empty:!k};window.__mapList=false;render();try{const sc=document.querySelector("#panel .kpmv .mapsc");if(sc)sc.scrollTop=0}catch(e){}return true}
function kpmTapPart(part){const o=window.__kpm;if(!o||!S||S.dead||Q.length)return;kpmEnter(o.slot,part)}
/* walk into one hall of a slot (from the courtyard rows/hotspots, or straight from the Dư đồ for a single-hall place) */
/* her own phối điện in a chủ vị's palace (jres resMeHoused, owner 17/11 04:08Z): that hall is her home ("home") */
function kpmMine(slot){try{const r=typeof resMeHoused==="function"&&resMeHoused();return r&&r.pal===slot?r.part:null}catch(e){return null}}
function kpmEnter(slot,part){const k=kpmMine(slot)===part?"home":kpmKeyOf(slot);if(!k){window.__kpmGo=1;try{j77Tap(null,kpmName(slot))}finally{window.__kpmGo=0}return}
 S.hall={k,part,t:kpmStamp(),place:part==="chinh"&&(kpmIsPlace(slot)||slot==="kn"||!kpmArt(slot))?1:0};window.__kpmArrive=1;
 if(S.place===k){popIdx=null;window.__fromMap=1;tab="act";render();return}
 window.__kpmGo=1;try{j77Tap(k,"")}finally{window.__kpmGo=0}}
(function(){if(typeof j77Tap!=="function")return;const t0=j77Tap;
 j77Tap=function(k,empty){try{if(typeof k==="string"&&k.indexOf("kpm:")===0)return kpmTapPart(k.slice(4));
   if(!window.__kpmGo&&empty&&!k&&S&&!S.dead&&!Q.length){const i=PALN.findIndex(n=>n===empty||n.replace(/ cung$/,"")===String(empty).trim());if(i>=0&&kpmArt(i))return kpmOpenSlot(i,null)}
   if(!window.__kpmGo&&!empty&&k&&S&&!S.dead&&!Q.length&&(k==="kn"||kpmSlotOf(k)!=null)){const sl=kpmSlotOf(k);if(kpmMulti(sl,k)){if(kpmOpen(k))return}else return kpmEnter(sl,kpmMine(sl)||"chinh")}}catch(e){console.error(e)}
  return t0.apply(this,arguments)}})();
/* the detail map replaces the plan while open */
(function(){const m0=mapHTML;mapHTML=function(){const o=window.__kpm;if(!o||!S)return m0.apply(this,arguments);
 const k=kpmKeyOf(o.slot);if(!k&&!o.empty){window.__kpm=null;return m0.apply(this,arguments)}o.k=k;
 try{return kitPalaceMap({slot:o.slot,k})}catch(e){console.error(e);window.__kpm=null;return m0.apply(this,arguments)}}})();
window.addEventListener("click",e=>{try{const b=e.target.closest("#panel [data-kpmback]");if(b){e.preventDefault();e.stopImmediatePropagation();window.__kpm=null;render();return}
 const r=e.target.closest("#panel [data-kpmpart]");if(r){e.preventDefault();e.stopImmediatePropagation();kpmTapPart(r.dataset.kpmpart)}}catch(err){console.error(err)}},true);
/* leaving the Dư đồ tab by the tab bar closes the detail map (the room's "‹ <cung>" button keeps it) */
document.addEventListener("click",e=>{const t=e.target.closest("#tabs [data-tab]");if(t)window.__kpm=null},true);
/* another way into a palace (person card, follow…) is not a hall choice: drop a hall chosen for another place */
(function(){const g0=goTo;goTo=function(k){try{if(S&&S.hall&&S.hall.k!==k)S.hall=null}catch(e){}return g0.apply(this,arguments)}})();

/* ---------- the room: picture of that hall + only its people ---------- */
function kpmRoomImg(k,part){try{const a=part==="cungnhan"?residenceArt(null,"cungnhan"):residenceArt(palSlot(k),part);return a?a.replace(/^.*?img\//,"").replace(/\.webp$/,""):null}catch(e){return null}}
(function(){const p0=placeOf;placeOf=function(k){const P=p0.apply(this,arguments);try{const h=kpmHall();if(!h||h.place||k!==h.k||!P)return P;
  const im=kpmRoomImg(k,h.part);const sc="kpm-"+h.part;if(im)SCIMG[sc]=im;
  const sl=kpmSlotOf(k);const base=sl!=null&&!kpmIsPlace(sl)?kpmName(sl):k==="home"?HOMEN:P.n;
  return Object.assign({},P,{sc:im?sc:P.sc,n:h.part==="chinh"?base:`${base} · ${KPM_PN[h.part]}`})}catch(e){return P}}})();
(function(){const c0=curPeople;curPeople=function(){const L=c0.apply(this,arguments);try{const h=kpmHall();if(!h||h.place||!S.visit||S.visit.k!==h.k)return L;
  if(h.part==="cungnhan")return L.filter(kpmIsSrv);
  const hd=kpmHead(h.k);return L.filter(p=>{const r=p&&p.ref;if(r&&rivals.includes(r)&&p.kind!=="chest")return kpmHallOf(r,h.k)===h.part;
   if(p&&p.kind==="chest")return h.part==="chinh"?r===hd:kpmHallOf(r,h.k)===h.part;return h.part==="chinh"})}catch(e){return L}}})();
/* the room's back button names the palace and returns to its detail map */
(function(){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const b=document.getElementById("tomap");const h=kpmHall();
  /* the visit line counts the whole palace: in a hall it counts that hall */
  if(h&&!h.place){const m=document.querySelector("#sc-t .rmsg");if(m){const n=curPeople().length;const R=kpmSplit(h.k)[h.part].res;
   const t=` · ${n?`Ở đây có ${n} người.`:"Không có ai ở đây."}${R.length?` Người ở: ${R.map(kpmResLine).join(", ")}.`:""}`;if(m.textContent!==t){m.textContent=t;m.title=t}}}
  if(b){const slot=h?kpmSlotOf(h.k):null;if(h&&slot!=null&&kpmMulti(slot,h.k)){const nm=kpmName(slot);b.textContent="‹ "+nm.replace(/ cung$/," cung");b.setAttribute("aria-label","Về bản đồ "+nm);b.dataset.kpm=slot}else if(b.dataset.kpm!=null){delete b.dataset.kpm;b.textContent="‹ Dư đồ";b.setAttribute("aria-label","Về Dư đồ")}}}catch(e){}return r}})();
document.addEventListener("click",e=>{const b=e.target.closest("#tomap");if(!b||!S)return;const h=kpmHall();if(h&&b.dataset.kpm!=null){const v=b.dataset.kpm;const slot=/^\d+$/.test(v)?+v:v;window.__kpm={slot,k:h.k}}else window.__kpm=null},true);

/* ---------- kit CSS (component-owned; same map skin as Dư đồ: .mspot/.mlab/.msil, kit .btn rows) ---------- */
(function(){const st=document.createElement("style");st.textContent=`
.kpmv{display:flex;flex-direction:column}
.game.maptab #panel .mapv.kpmv{height:100%;min-height:0;container-type:inline-size;justify-content:center}
.kpmv .mapsc{flex:0 1 auto!important;overflow:hidden!important;height:calc(100cqw / 1.76)!important;max-height:none!important;min-height:0!important;container-type:size;display:flex;justify-content:center;align-items:flex-start;background:transparent!important}
.kpmv .kpm-list{flex:0 0 auto}
.kpmv .kpm-t{font-family:var(--display);color:#ffe7b0;background:#1a0e08b0;border-radius:8px;padding:1px 8px;text-shadow:0 1px 2px #000}
.kpmv .kpm-t em{font-style:normal;color:#ffb8a0;font-family:var(--body);font-size:.8em}
.kpmv .mspot.kpm-spot{align-items:center;justify-content:flex-start}
.kpmv .mspot.kpm-spot .mlab{font-size:.78rem;padding:2px 8px;white-space:nowrap;flex-direction:column;gap:0;line-height:1.15;max-width:none}
.kpmv .mspot.kpm-spot[data-go="kpm:tay"]{align-items:flex-start}
.kpmv .mspot.kpm-spot[data-go="kpm:dong"]{align-items:flex-end}
.kpmv .mspot.kpm-spot .mlab i{font-size:.66rem}
.kpmv .kpm-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;padding:8px}
.kpmv .kpm-list .btn{min-height:44px;white-space:normal;text-align:center}
.kpmv .kpm-list .btn{display:flex;flex-direction:column;align-items:center;gap:1px;padding:6px 8px}
.kpmv .kpm-list .kpm-rn{font-family:var(--display);font-weight:600}
.kpmv .kpm-list .kpm-rs{font-size:.8em;opacity:.85;line-height:1.25}
.kpmv .mapw{position:relative;width:min(100cqw,calc(100cqh * 1.76))!important;height:auto!important;max-width:none!important;flex:0 0 auto;aspect-ratio:1.76/1} /* r3 KIT: frame keeps its 1.76:1 box while the painting loads, so hotspots never collapse under the "‹ Dư đồ" button (iPad FAIL 4) */
.kpmv .mapw .mapimg{width:100%!important;height:auto!important;max-width:none!important;max-height:none!important;object-fit:fill!important;display:block}
.kpmv .kpm-list.one{grid-template-columns:1fr}
/* kv3:.kv1 */:where(.kv1) .kpmv .kpm-list{grid-template-columns:1fr}
/* phone landscape (844x390): no room for a readable courtyard + rows; the picture would be a cropped strip with hidden hotspots, so the hall rows stand alone */

`;document.head.appendChild(st)})();
/* phone shell (kitPhoneShell §31.7): arriving in a hall shows the ROOM, not the act page */
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(window.__kpmArrive){const h=kpmHall();
  if(h&&tab==="act"){window.__kpmArrive=0;window.__k3quiet=1;setTimeout(()=>{try{const rb=document.getElementById("k3room");if(rb&&!rb.hidden)rb.click()}catch(e){}setTimeout(()=>{window.__k3quiet=0},450)},0)}else if(!Q.length&&tab!=="go")window.__kpmArrive=0}}catch(e){}return r}})();
/* kit sample page (KIT §76): the palace detail map of palace 0, opened empty (needs only the game state) */
try{if(window.KIT_SAMPLES)KIT_SAMPLES.push({id:"§76",title:"kitPalaceMap",html:()=>kitPalaceMap({slot:0,k:null})})}catch(e){}
