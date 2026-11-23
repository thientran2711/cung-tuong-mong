/* ================= jres: NƠI Ở (residence rooms) — tranh phòng theo nơi người đó ĐANG ở =================
   Tranh: img/<phòng>-<mùa>-<buổi>.webp (Magnific gpt-2-6, 3:2). Phòng:
     các cung phi tần (PALN = MAPH.rivalSlots, 8 đông có tranh + PAL_WEST của jpal): <slug>-cung (chính điện, chủ vị), <slug>-cung-dong-phoi / -tay-phoi (phối điện, người ở chung);
     cung-nhan (dãy nhà cung nhân, dùng chung). Ngọc Thanh các = tam-cung-dem (j21), Càn Ninh = khon-ninh-cung, lãnh cung = lanh-cung (j6).
   API (dùng chung — thợ bản đồ cung review/palace-map gọi):
     residenceArt(palaceKey, part, season, time) → "img/<tên>.webp"  palaceKey = chỉ số PALN (0..PALN.length-1) | slug | tên cung | khóa "r<id>"/"home";
        part = 'chinh'|'dong'|'tay'|'cungnhan'; season = xuan|ha|thu|dong (mặc định mùa hiện tại); time = sang|trua|chieu|toi (mặc định buổi hiện tại).
        Thiếu bản → cùng mùa buổi gần nhất → xuân cùng buổi → xuân-sáng.
     residenceOf(p) → {pal (PALN index|null), part:'chinh'|'dong'|'tay'|'cungnhan'|'ngocthanh'|'kn'|'lc', head, name}  — tính TƯƠI mỗi lần (không lưu).
     roomResidents(pal, part) → mọi người SỐNG trong phòng đó;  roomPeople(pal, part) → những người đang Ở NHÀ buổi này (S.where).
     resRoomName(r) → "Đông phối điện · Cảnh Phúc cung" …
   Sân khấu: "home" và "r<id>" (thăm cung) dùng phòng thật thay cho phi-tan-cung chung; tính lại ở mỗi renderStage. */
const RES_SLUG=["canh-phuc","khai-tuong","chung-tu","ham-an","thua-minh","dien-huy","vinh-hoa","truong-xuan"];
const RES_PART_N=HALL_ROLE; /* role = small subtitle only; the plaque name comes from jhall.js hallName() */
/* RES_VAR: bản có thật trong img/ (viết lại bằng dev/art/gen_res_var.py) */
const RES_VAR={"canh-phuc-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "canh-phuc-cung-dong-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "canh-phuc-cung-tay-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "khai-tuong-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "khai-tuong-cung-dong-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "khai-tuong-cung-tay-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "chung-tu-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "chung-tu-cung-dong-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "chung-tu-cung-tay-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "ham-an-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "ham-an-cung-dong-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "ham-an-cung-tay-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "thua-minh-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "thua-minh-cung-dong-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "thua-minh-cung-tay-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "dien-huy-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "dien-huy-cung-dong-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "dien-huy-cung-tay-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "vinh-hoa-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "vinh-hoa-cung-dong-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "vinh-hoa-cung-tay-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "truong-xuan-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "truong-xuan-cung-dong-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "truong-xuan-cung-tay-phoi":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi",
 "cung-nhan":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi"};/*@RES_VAR*/
const RES_HAVE={};for(const s in RES_VAR)for(const v of RES_VAR[s].split(" "))if(v)RES_HAVE[s+"-"+v]=1;
function resSeason(){try{return SCN_SEAS[SEASON[(S.month||1)-1]]||"xuan"}catch(e){return"xuan"}}
function resTime(){try{const four=typeof BUOI!=="undefined"&&BUOI.length>=4;return(four?["sang","trua","chieu","toi"]:["sang","chieu","toi"])[S.buoi||0]||"sang"}catch(e){return"sang"}}
function resPalIdx(k){if(k==null)return null;if(typeof k==="number")return k>=0&&k<(typeof PALN!=="undefined"?PALN.length:8)?k:null;
 if(k==="home")return S&&S.pal!=null?S.pal:null;
 if(typeof k==="string"&&k[0]==="r"&&/^r\d+$/.test(k)){const h=RV(+k.slice(1));return h&&h.pal!=null?h.pal:null}
 let i=RES_SLUG.indexOf(String(k).replace(/-cung$/,""));if(i>=0)return i;i=(typeof PALN!=="undefined"?PALN:[]).indexOf(k);return i>=0?i:null}
/* the west palaces jpal adds (PAL_WEST, the PALN indices past RES_SLUG) have no room paintings yet (ART REQUEST, Foreman C): a stand-in from the 8 painted ones, marked 'tạm' */
function resTamPal(pal){const i=resPalIdx(pal);return i!=null&&i>=RES_SLUG.length}
/* RANK ROOMS (owner L2406, C8-RANKROOM): frontal rooms per chủ vị rank × {chính điện, phòng ngủ} + phối phòng ngủ. Table = dev/art/place-rank/rank_rooms.json (script rank_rooms_wire.py rewrites the block below with the WIRED bases).
   Rank is read from the game's own state (rkOf(head)) and named by RANKS[r].n - no rank number is typed here (law 4). One painting per room (hạ-sáng file), any mùa/buổi. A missing rank room falls back to the old picture. */
/*@RANK_ROOM*/const RANK_ROOM={};/*@END_RANK_ROOM*/
const RES_RANKSUF={"Tần":"tan","Phi":"phi","Quý phi":"quyphi"};
function resRankSuf(head){try{if(!head)return"";const r=rkOf(head);return RES_RANKSUF[RANKS[r]&&RANKS[r].n]||""}catch(e){return""}}
function resBase0(pal,part){if(part==="cungnhan")return"cung-nhan";const i=resPalIdx(pal);if(i==null)return null;
 return RES_SLUG[i%RES_SLUG.length]+"-cung"+(part==="dong"?"-dong-phoi":part==="tay"?"-tay-phoi":"")}
/* resBase(pal,part,head,ngu): the rank/bedroom room when its picture is wired, else the old base. head = the chủ vị of the room; ngu = true at night in her own room */
function resBase(pal,part,head,ngu){const b=resBase0(pal,part);if(!b||part==="cungnhan")return b;
 const rk=part==="chinh"||part==null?(resRankSuf(head)?b+"-"+resRankSuf(head):""):"";
 if(ngu){const n=(rk||b)+"-ngu";if(RANK_ROOM[n])return n}
 if(rk&&RANK_ROOM[rk])return rk;return b}
function resPick(base,se,ti){if(!base)return null;if(RANK_ROOM[base])return base+"-ha-sang";se=se||resSeason();ti=ti||resTime();
 const near=(typeof SCN_NEAR!=="undefined"?SCN_NEAR:{})[ti]||[ti];
 for(const s of [se,"xuan"])for(const x of near.concat(ti==="toi"?[]:[])){if(RES_HAVE[`${base}-${s}-${x}`])return`${base}-${s}-${x}`}
 return RES_HAVE[`${base}-xuan-sang`]||!Object.keys(RES_HAVE).length?`${base}-xuan-sang`:null}
function residenceArt(palaceKey,part,season,time,head,ngu){const n=resPick(resBase(palaceKey,part||"chinh",head,ngu),season,time);return n?`img/${n}.webp`:null}
/* who lives where, now */
function resAlive(p){return !!p&&(p===S?!S.dead:p.alive!==false)}
function resHeadOf(p){try{const h=byKey(houseOf(p));return h||null}catch(e){return null}}
function resSidePart(p,h){/* co-residents of head h: the hall palFix gave (p.resHall, BAL.res.halls, one room each); else stable order, BAL.res.side per hall */
 const HL=BAL.res.halls;if(HL.includes(p.resHall))return p.resHall;
 const L=[S].concat(rivals||[]).filter(x=>x!==h&&resAlive(x)&&!(x!==S&&x.out)&&!x.queen&&rkOf(x)<PAL_HEAD&&resHeadOf(x)===h).sort((a,b)=>String(key(a)).localeCompare(String(key(b)),"en",{numeric:true}));
 const i=Math.max(0,L.indexOf(p));return HL[Math.min(HL.length-1,Math.floor(i/BAL.res.side))]}
function residenceOf(p){const R=(o)=>Object.assign({pal:null,head:null},o);if(!p||!S)return R({part:"ngocthanh"});
 if(p===S){if(S.out)return R({part:"lc"});if(typeof isSrv==="function"&&isSrv())return R({part:"cungnhan",pal:null});
  if(S.pal!=null&&rkOf(S)>=PAL_HEAD)return R({part:"chinh",pal:S.pal,head:S});
  const h=S.resHead!=null?byKey(S.resHead):null;if(h&&h!==S&&h.pal!=null&&resAlive(h)&&!h.out)return R({part:resSidePart(S,h),pal:h.pal,head:h});
  return R({part:"ngocthanh"})}
 if(!(rivals||[]).includes(p))return R({part:"cungnhan"});/* cung nữ, ma ma, thái giám hầu: dãy nhà cung nhân */
 if(p.out)return R({part:"lc"});if(p.queen)return R({part:"kn"});
 if(rkOf(p)>=PAL_HEAD&&p.pal!=null)return R({part:"chinh",pal:p.pal,head:p});
 const h=resHeadOf(p);if(!h||h===p)return R({part:p.pal!=null?"chinh":"ngocthanh",pal:p.pal!=null?p.pal:null,head:p});
 if(h===S)return S.pal!=null?R({part:resSidePart(p,S),pal:S.pal,head:S}):R({part:"ngocthanh",head:S});
 if(h.queen)return R({part:"kn",head:h});
 return h.pal!=null?R({part:resSidePart(p,h),pal:h.pal,head:h}):R({part:"ngocthanh",head:h})}
/* resHallOf(p) → the plaque of the side hall p lives in ("Dưỡng Xuân hiên"), or null (head, Càn Ninh, Ngọc Thanh, servants…) — hall-names r2, OD:L1474 residence lines */
function resHallOf(p){try{const r=residenceOf(p);if((r.part==="dong"||r.part==="tay")&&r.pal!=null&&typeof PALN!=="undefined")return hallName(PALN[r.pal],r.part)}catch(e){}return null}
function resRoomName(r){if(!r)return"";if(r.part==="ngocthanh")return typeof HOMEN!=="undefined"?HOMEN:"Ngọc Thanh các";
 if(r.part==="kn")return "Càn Ninh cung · "+hallName("Càn Ninh cung","chinh");if(r.part==="lc")return"Trường Môn viện";
 const pn=r.pal!=null&&typeof PALN!=="undefined"?PALN[r.pal]:"";return pn?`${pn} · ${hallName(pn,r.part)}`:hallName(pn,r.part)}
function resSame(a,b){return!!a&&!!b&&a.part===b.part&&a.pal===b.pal&&(a.pal!=null||a.head===b.head)}
function roomResidents(pal,part){const T={pal:resPalIdx(pal),part};return[S].concat((rivals||[]).filter(v=>v.alive&&!v.out)).filter(p=>resSame(residenceOf(p),T))}
function roomPeople(pal,part){const W=(S&&S.where)||{};return roomResidents(pal,part).filter(p=>p===S?S.place==="home":W[p.id]===palaceOf(p))}
/* the scene file for a residence (null → keep the old generic one) */
function resScene(r){if(!r)return null;if(r.part==="ngocthanh"||r.part==="kn"||r.part==="lc")return null;
 return resPick(r.part==="cungnhan"?"cung-nhan":resBase(r.pal,r.part,r.head,resTime()==="toi"))}
/* floor line + open-floor anchor of each room (read from the paintings; same in every season/buổi) */
(function(){const F=window.KIT_FLOOR=window.KIT_FLOOR||{},A=window.KIT_FANCHOR=window.KIT_FANCHOR||{};
 const fx={"canh-phuc-cung":.5,"canh-phuc-cung-dong-phoi":.56,"canh-phuc-cung-tay-phoi":.45,"khai-tuong-cung":.46,"khai-tuong-cung-dong-phoi":.5,"khai-tuong-cung-tay-phoi":.36,
  "chung-tu-cung":.55,"chung-tu-cung-dong-phoi":.62,"chung-tu-cung-tay-phoi":.45,"ham-an-cung":.48,"ham-an-cung-dong-phoi":.5,"ham-an-cung-tay-phoi":.5,
  "thua-minh-cung":.5,"thua-minh-cung-dong-phoi":.5,"thua-minh-cung-tay-phoi":.46,"dien-huy-cung":.5,"dien-huy-cung-dong-phoi":.56,"dien-huy-cung-tay-phoi":.42,
  "vinh-hoa-cung":.5,"vinh-hoa-cung-dong-phoi":.36,"vinh-hoa-cung-tay-phoi":.42,"truong-xuan-cung":.5,"truong-xuan-cung-dong-phoi":.5,"truong-xuan-cung-tay-phoi":.5,"cung-nhan":.42};
 for(const k in fx){if(F[k]==null)F[k]=.6;if(!A[k])A[k]={x:fx[k],feet:.9}}
 /* rank rooms: same floor line / open-floor anchor as the palace's chính điện (every picture: the aisle is open, centre of the room) */
 for(const k in RANK_ROOM)for(const n of [k,k+"-ha-sang"]){if(F[n]==null)F[n]=.6;if(!A[n])A[n]={x:.5,feet:.9}}})();
/* stage: the room where the place's people really live, recomputed at every render */
(function(){if(typeof renderStage!=="function"||typeof SCIMG!=="object")return;const HOME0="tam-cung-dem",RV0="phi-tan-cung";
 window.resStageRoom=function(){try{if(!S)return null;if(S.place==="home")return residenceOf(S);
   if(S.place&&/^r\d+$/.test(S.place)){const rk=S.visit&&S.visit.room!=null?S.visit.room:window.__resPend;const t=rk!=null?byKey(rk):null;if(t&&palaceOf(t)===S.place)return residenceOf(t);
    const h=RV(+S.place.slice(1));return h?residenceOf(h):null}}catch(e){}return null};
 function resApply(){try{const r=resStageRoom(),n=resScene(r);
   if(S.place==="home")SCIMG.home=n||HOME0;else if(S.place&&/^r\d+$/.test(S.place))SCIMG.rv=n||RV0;
   S.__resName=r&&n?resRoomName(r):null;S.__resTam=!!(r&&n&&r.part!=="cungnhan"&&resTamPal(r.pal))}catch(e){}}
 window.resApply=resApply;
 /* every painter of the room (DOM stage, PIXI stage, event art) reads SCIMG: set it first, every time */
 const r0=renderStage;renderStage=function(){resApply();const x=r0.apply(this,arguments);try{const st=$("stage");if(st){let t=document.getElementById("restam");
   const on=!!(S&&S.__resTam&&(S.place==="home"||/^r\d+$/.test(S.place||"")));if(on&&!t){st.insertAdjacentHTML("beforeend",kitTam(true));t=st.lastElementChild;if(t)t.id="restam"}else if(!on&&t)t.remove()}}catch(e){}return x};
 if(typeof pxScene==="function"){const p0=pxScene;pxScene=function(){resApply();return p0.apply(this,arguments)}}
 if(typeof evArt==="function"){const e0=evArt;evArt=function(){resApply();return e0.apply(this,arguments)}}})();
/* room label on the stage title follows the real room */
(function(){if(typeof placeOf!=="function")return;const p0=placeOf;placeOf=function(k){const P=p0.apply(this,arguments);try{if(P&&S&&k===S.place&&S.__resName&&(k==="home"||/^r\d+$/.test(k)))return Object.assign({},P,{n:S.__resName})}catch(e){}return P}})();
/* "Đến cung nàng thăm": the stage is the TARGET's own room; only the people of that room (+ guests in the main hall) */
(function(){if(typeof visitPal!=="function")return;const v0=visitPal;visitPal=function(id){window.__resPend=id;let r;try{r=v0.apply(this,arguments)}finally{window.__resPend=null}try{const v=rivals.find(x=>x.id===id);
  if(v&&S.visit&&S.place===palaceOf(v)){S.visit.room=key(v);const T=residenceOf(v);
   S.visit.people=(S.visit.people||[]).filter(p=>{const o=p.ref;if(!o||!(rivals||[]).includes(o))return true;const ro=residenceOf(o);
    return resSame(ro,T)||(T.part==="chinh"&&!(ro.pal===T.pal&&(ro.part==="dong"||ro.part==="tay")))});
   const n=S.visit.people.length;if(S.visit.msg)S.visit.msg=S.visit.msg.replace(/Ở đây có \d+ người\./,n?`Ở đây có ${n} người.`:"Không gặp ai.");render()}}catch(e){}return r}})();
/* her own room: roommates who are home this buổi stand with her (same phối điện) */
(function(){if(typeof homePeople!=="function")return;const h0=homePeople;homePeople=function(){const L=h0.apply(this,arguments);try{const me=residenceOf(S);
  if(me.part==="dong"||me.part==="tay"){const W=S.where||{};for(const v of rivals){if(!v.alive||v.out||v===S)continue;if(L.some(p=>p.ref===v))continue;
   if(resSame(residenceOf(v),me)&&W[v.id]===palaceOf(v))L.push(rp(v))}}}catch(e){}return L}})();

/* ================= HER SIDE HALL (owner 17/11 04:08Z/04:20Z): below Tần the player lives in a chủ vị's Đông / Tây phối điện like any NPC =================
   jpal palFix houses her (S.resHead, S.resHall). Her own room stays the place key "home" (stage = residenceOf(S): that phối điện);
   her home's name is the room's name; on the Dư đồ her face stands in that chủ vị's palace (no separate Ngọc Thanh các spot while housed). */
function resMeHoused(){try{if(!S||S.pal!=null||S.out||S.dead)return null;const r=residenceOf(S);return(r.part==="dong"||r.part==="tay")&&r.pal!=null&&r.head&&r.head!==S?r:null}catch(e){return null}}
(function(){const n0=palName;palName=function(k){if(k==="home"){const r=resMeHoused();if(r)return resRoomName(r)}return n0.apply(this,arguments)}})();
(function(){const r0=residents;residents=function(k){const L=r0.apply(this,arguments);try{const r=resMeHoused();if(r&&k!=="home"&&palaceOf(r.head)===k&&!L.includes(S)){L.push(S);L.sort((a,b)=>rkOf(b)-rkOf(a))}}catch(e){}return L}})();
(function(){const m0=mapSpots;mapSpots=function(){const L=m0.apply(this,arguments);try{const r=resMeHoused();if(!r)return L;const hk=palaceOf(r.head);
  const out=L.filter(x=>x.k!=="home");const sp=out.find(x=>x.k===hk);if(sp){if(!(sp.res||[]).includes(S))sp.res=(sp.res||[]).concat([S]);sp.fn=`${sp.fn} · ngươi ở ${RES_PART_N[r.part]}`}return out}catch(e){return L}}})();
/* walking: her home is where her phối điện is (the chủ vị's palace), not Ngọc Thanh các */
(function(){if(typeof mapPos!=="function")return;const m0=mapPos;mapPos=function(k){try{if(k==="home"){const r=resMeHoused();if(r)return m0.call(this,palaceOf(r.head))}}catch(e){}return m0.apply(this,arguments)}})();
