/* ================= jplx: NƠI CHỐN CÒN THIẾU TRÊN DƯ ĐỒ (D42, owner 14-15/11: OD L82, L86, L87) =================
   Five places on the Dư đồ of the whole palace, each with the box read from the map picture (dev/PLACES_PLAN.md §1, §5):
     cnh  Dãy nhà cung nhân  (servants' quarters; picture = the approved residence painting cung-nhan, 16 season x buổi)
     tgk  Tân Giả khố        (= Hoán y cục, the laundry; picture tan-gia-kho already existed; now a place on the map)
     ttp  Thượng thư phòng   (the princes' study hall = "học đường"; new picture)
     acs  A ca sở            (where the princes from 6 years old live; new picture)
     dc   Đông cung          (where the crown prince lives; new picture)
   Pictures: img/<tên>-<mùa>-<buổi>.webp (gpt-2-6 EDITS of approved game rooms, CDN). Everything else is wrapped, no old module edited:
   places / PLNAME / MAPH.places (map hotspots + names) · mapPos (walk cost) · SCN_HAVE + SCIMG + KIT_FLOOR (pictures) · ACC_ROLE (who may enter)
   · goTo + countAt (people at the place) · homePeople (children who moved out are not at home).
   WHERE THE CHILDREN ARE (OD L87, computed fresh each buổi, nothing stored => old saves load):
     under 6: with the mother (as before: her children at her palace)
     prince 6-17: buổi sáng at Thượng thư phòng (study), the other buổi at A ca sở; the Thái tử at Đông cung (sáng at the study too)
     princess 6-17: buổi sáng at Thượng thư phòng, then back with the mother
   The map count of each place = the people shown when she arrives (same list). Co-op: only S.where/S.place travel (state only). */
const PLX={
 cnh:{n:"Dãy nhà cung nhân",fn:"chỗ ăn ngủ của cung nữ, thái giám",d:"Dãy nhà thấp mái xám, cung nữ và thái giám ăn ngủ ở đây.",img:"cung-nhan",box:{x:.085,y:.645,w:.11,h:.155},anchor:{x:.14,y:.69},pos:[2,-1],fl:.42},
 tgk:{n:"Tân Giả khố",fn:"Hoán y cục: nơi cung nhân chịu phạt giặt giũ",d:"Nơi cung nhân bị phạt giặt giũ ngày đêm.",img:"tan-gia-kho",box:{x:.097,y:.466,w:.13,h:.10},anchor:{x:.16,y:.50},pos:[1,-1]},
 ttp:{n:"Thượng thư phòng",fn:"học đường của hoàng tử, công chúa",d:"Nơi các hoàng tử, công chúa theo thầy học chữ, học võ.",img:"thuong-thu-phong",box:{x:.825,y:.635,w:.07,h:.09},anchor:{x:.86,y:.67},pos:[0,3],fl:.62},
 acs:{n:"A ca sở",fn:"nơi các hoàng tử ở",d:"Các hoàng tử từ sáu tuổi dọn ra đây ở, sáng sang Thượng thư phòng học.",img:"a-ca-so",box:{x:.742,y:.098,w:.095,h:.125},anchor:{x:.79,y:.16},pos:[2,3],fl:.62},
 dc:{n:"Đông cung",fn:"nơi Thái tử ở",d:"Điện của Thái tử, trang trọng mà không phô trương.",img:"dong-cung",box:{x:.795,y:.425,w:.075,h:.185},anchor:{x:.83,y:.47},pos:[1,3],fl:.62}};
const PLX_NEW=["cnh","ttp","acs","dc"]; /* places with their own picture file; tgk keeps j94's */
const PLX_AGE=6,PLX_ADULT=18;
(function(){
 /* names and map hotspots */
 for(const k in PLX){PLNAME[k]=[PLX[k].n,PLX[k].fn];if(MAPH&&MAPH.places&&!MAPH.places[k])MAPH.places[k]={box:PLX[k].box,anchor:PLX[k].anchor}}
 /* pictures: 16 season x buổi variants each; SCIMG base name, floor line for the kit stage */
 const V=[];["xuan","ha","thu","dong"].forEach(s=>["sang","trua","chieu","toi"].forEach(t=>V.push(s+"-"+t)));
 if(typeof SCN_HAVE==="object")PLX_NEW.forEach(k=>V.forEach(v=>{SCN_HAVE[PLX[k].img+"-"+v]=1}));
 if(typeof SCIMG==="object")PLX_NEW.forEach(k=>{SCIMG["plx-"+k]=PLX[k].img});
 const F=window.KIT_FLOOR=window.KIT_FLOOR||{},A=window.KIT_FANCHOR=window.KIT_FANCHOR||{};
 PLX_NEW.forEach(k=>{const n=PLX[k].img;if(F[n]==null)F[n]=PLX[k].fl||.6;if(!A[n])A[n]={x:.5,feet:.9}});
 /* the list of places (Dư đồ list, placeOf) */
 const p0=places;places=function(){const L=p0.apply(this,arguments);
  for(const k in PLX)if(!L.some(x=>x.k===k))L.push({k,n:PLX[k].n,fn:PLX[k].fn,d:PLX[k].d,sc:k==="tgk"?"tgk":"plx-"+k});
  return L};
 /* walk cost: own cells outside the old 3x3 + rival rows (west cluster cnh/tgk next to tyv/kn; east column ttp/dc/acs next to tn/ksp/home) */
 const m0=mapPos;mapPos=function(k){return k&&PLX[k]?PLX[k].pos:m0.apply(this,arguments)};
 /* the list view shows them too (MAPL rows are only borrowed for the call: mapPos must not read them) */
 const g0=mapHTMLgrid;mapHTMLgrid=function(){MAPL.push(["cnh","tgk","ttp"],["acs","dc"]);try{return g0.apply(this,arguments)}finally{MAPL.length-=2}};
 /* small labels on the plan, like the lãnh cung */
 const s0=mapSpots;mapSpots=function(){const L=s0.apply(this,arguments);L.forEach(s=>{if(s&&PLX[s.k]){s.small=s.k!=="dc";s.fn=PLX[s.k].fn}});return L};
})();

/* ---------- children: where they are this buổi ---------- */
function plxKidPlace(k){try{if(!k||!k.alive)return null;const a=k.age||0;if(a<PLX_AGE||a>=PLX_ADULT)return null;
 const b=S.buoi||0;if(b===0)return"ttp";if(k.sex==="m")return k.heir?"dc":"acs";return null}catch(e){return null}}
function plxKidEntry(k,owner){return{kind:"kid",ref:k,name:k.name,ini:k.sex==="m"?"Tử":"Nữ",col:k.heir?"#f0d070":k.sex==="m"?"#9ab0d0":"#c9a0e0",
 info:`${k.age} tuổi · Sức khỏe ${k.hp}${k.heir?" · Thái tử":""} · con của ${owner?owner.name:"ngươi"}`}}
function plxKids(place){const L=[];try{for(const [k,v] of allKids())if(plxKidPlace(k)===place)L.push([k,v])}catch(e){}return L}
/* servants who rest in the dãy nhà (hers at night; a few of the other palaces' by day and night), stable per buổi */
function plxHash(s){let h=7;for(const c of String(s))h=(h*31+c.charCodeAt(0))>>>0;return h}
function plxServants(){const out=[];try{const b=S.buoi||0,night=b>=(typeof B4L==="number"?B4L:3);const mine=[].concat(S.staff||[]);
 const others=[];for(const v of liveRivals(true))for(const s of (v.staff||[]))others.push(s);
 const pickN=(L,n)=>L.map(s=>[plxHash(s.sid+":"+bkeyNow()+":"+b),s]).sort((x,y)=>x[0]-y[0]).slice(0,n).map(x=>x[1]);
 const ent=s=>({kind:"npc",sid:s.sid,name:s.name,ini:String(s.name).split(" ").pop()[0],col:"#b9a48a",info:`${typeof srkName==="function"?srkName(s):s.role==="maid"?"Cung nữ":"Thái giám"} · ${s.role==="maid"?"cung nữ":"thái giám"} nghỉ tay`});
 if(night){if(S.maid)out.push({kind:"maid",name:S.maid.name,ini:S.maid.name.split(" ").pop()[0],col:"#b9a48a",info:`Cung nữ thân tín · lòng ${S.maid.loyal}`});mine.forEach(s=>out.push(ent(s)))}
 pickN(others,night?3:2).forEach(s=>out.push(ent(s)))}catch(e){}return out}
function bkeyNow(){try{return `${S.year}/${S.month}/${S.tuan}`}catch(e){return""}}
function plxTgk(){const out=[];try{out.push({kind:"npc",name:"Quản sự Tân Giả khố",ini:"Quản",col:"#8a8aa0",info:"Quản sự · trông coi việc giặt giũ"});
 const L=[];for(const v of liveRivals(true))for(const s of (v.staff||[]))if(s.role==="maid"&&(s.lau>0||s.trouble))L.push(s);
 L.slice(0,3).forEach(s=>out.push({kind:"npc",sid:s.sid,name:s.name,ini:String(s.name).split(" ").pop()[0],col:"#b9a48a",info:"Cung nữ bị phạt giặt giũ"}))}catch(e){}return out}
function plxPeople(k){try{
 if(k==="cnh")return plxServants();
 if(k==="tgk")return plxTgk();
 const L=[];for(const [kid,v] of plxKids(k)){const mine=v==null;L.push(mine?plxHomeKid(kid):plxKidEntry(kid,v))}
 if(k==="ttp"&&L.length)L.unshift({kind:"npc",name:"Thầy dạy Thượng thư phòng",ini:"Thầy",col:"#8a9ab0",info:"Thầy dạy · giảng sách cho các hoàng tử, công chúa"});
 return L}catch(e){return[]}}
/* her own children keep the line the home stage gives them (Văn/Võ/Đức bars): take it from the unfiltered home list */
let plxHomeFull=null;
function plxHomeKid(kid){try{const f=plxHomeFull?plxHomeFull():[];const p=f.find(x=>x.kind==="kid"&&x.ref===kid);if(p)return p}catch(e){}return plxKidEntry(kid,null)}
function plxPlaceMsg(k,n){if(n)return"";return({cnh:"Dãy nhà vắng, cung nhân đang làm việc.",ttp:(S.buoi||0)===0?"Chưa có ai trong Thượng thư phòng.":"Thượng thư phòng vắng, buổi học đã tan.",acs:(S.buoi||0)===0?"Các hoàng tử đã sang Thượng thư phòng học.":"A ca sở im ắng, chưa có hoàng tử nào ở đây.",dc:(S.buoi||0)===0?"Thái tử đã sang Thượng thư phòng học.":"Đông cung vắng, chưa lập Thái tử.",tgk:"Nước giặt lạnh buốt, chậu gỗ chất cao."})[k]||""}

/* her palace: children who live elsewhere this buổi are not on the home stage (and not in its head count) */
(function(){if(typeof homePeople!=="function")return;const h0=homePeople;plxHomeFull=()=>h0.apply(null,[]);
 homePeople=function(){const L=h0.apply(this,arguments);try{if(typeof isSrv==="function"&&isSrv())return L;return L.filter(p=>!(p&&p.kind==="kid"&&p.ref&&plxKidPlace(p.ref)))}catch(e){return L}}})();
/* arriving: the people there */
(function(){const g0=goTo;goTo=function(k){const r=g0.apply(this,arguments);try{if(!PLX[k]||S.dead||S.place!==k||!S.visit||S.visit.k!==k)return r;
  if(typeof isSrv==="function"&&isSrv())return r;
  const m0=S.visit.msg,E=S.visit.people.filter(p=>p.kind==="elder"),L=E.concat(plxPeople(k));S.visit.people=L;
  const m=k==="tgk"&&E.length&&m0?m0:plxPlaceMsg(k,S.visit.people.length);S.visit.msg=m||(S.visit.people.length?`Ở đây có ${S.visit.people.length} người.`:"Không gặp ai.");
  render()}catch(e){console.error(e)}return r}})();
/* faces of servants shown here */
(function(){if(typeof pFaceOf!=="function")return;const f0=pFaceOf;pFaceOf=function(p){try{if(p&&p.kind==="npc"&&p.sid){const s=servById(p.sid);if(s)return pServ(s)}}catch(e){}return f0.apply(this,arguments)}})();
/* the Dư đồ count of these places = the people she meets on arrival (outermost wrap: after j59's own, which is queued at load) */
setTimeout(()=>{try{const c0=countAt;countAt=function(k){try{if(PLX[k]&&!(S&&S.visit&&k===S.place&&S.visit.k===k)&&!(typeof isSrv==="function"&&isSrv()))return plxPeople(k).filter(p=>p.kind!=="task").length+(k==="tgk"&&typeof elderBy==="function"&&elderBy("tn")?1:0)}catch(e){}return c0.apply(this,arguments)}}catch(e){}},0);

/* ---------- who may enter (j41 ACC_ROLE; the servant road keeps j42's hook, patched for her own quarters) ---------- */
(function(){
 const day=()=>(S.buoi||0)<(typeof B4L==="number"?B4L:3);
 const hasStudent=p=>{try{return(p===S?S.kids||[]:p.kids||[]).some(k=>k.alive&&(k.age||0)>=PLX_AGE&&(k.age||0)<PLX_ADULT)}catch(e){return false}};
 const hasPrince=p=>{try{return(p===S?S.kids||[]:p.kids||[]).some(k=>k.alive&&k.sex==="m"&&(k.age||0)>=PLX_AGE&&(k.age||0)<PLX_ADULT)}catch(e){return false}};
 const mumOfHeir=p=>{try{return !!(S.heir&&S.heir.k&&S.heir.k.alive&&(p===S?!S.heir.v:S.heir.v===p))}catch(e){return false}};
 if(typeof ACC_DAY==="object")ACC_DAY.cnh=1;
 accRole((p,k,ctx)=>{if(!PLX[k])return null;if(typeof isSrv==="function"&&p===S&&isSrv())return null;const r=ctx.r;
  if(k==="cnh")return day()?{ok:true}:{ok:false,why:"đêm chỉ cung nhân ra vào",kind:"hour"};
  if(k==="tgk"){if(r>=2||p.queen)return{ok:true};return{ok:false,why:"nơi phạt cung nhân: cần phẩm Quý nhân",kind:"rule"}}
  if(k==="ttp"||k==="acs"){if(!day())return{ok:false,why:"đóng cửa tối",kind:"hour"};
   if(r>=3||p.queen||(k==="acs"?hasPrince(p):hasStudent(p)))return{ok:true};
   return{ok:false,why:k==="ttp"?"chỉ Tần trở lên hoặc người có con đang học":"chỉ Tần trở lên hoặc mẹ của hoàng tử",kind:"rule"}}
  if(k==="dc"){if(!day())return{ok:false,why:"đóng cửa tối",kind:"hour"};
   if(p.queen||r>=7||mumOfHeir(p))return{ok:true};
   return{ok:false,why:"điện của Thái tử: chỉ mẹ Thái tử và Hoàng hậu; người khác xin bái kiến",kind:"rule",ask:"bk"}}
  return null});
 /* a maid may sleep in the dãy nhà (it is her own place); the other new places: only when her mistress sends her (j42 default) */
 const e0=window.placeEnterHook;if(typeof e0==="function")window.placeEnterHook=function(p,place){const k=typeof place==="string"?place:place&&place.k;
  try{if(p===S&&isSrv()&&k==="cnh"&&!(S.srv.lau>0))return{ok:true,why:""}}catch(e){}return e0.apply(this,arguments)};
})();
