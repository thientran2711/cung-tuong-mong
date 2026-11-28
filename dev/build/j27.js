/* ================= RESIDENCE ON THE ĐẠI HY PLAN, TWELVE RIVALS, TUYỂN TÚ ================= */
/* the plan's real names; each place keeps a short function word on hover */
const PALN=MAPH.rivalSlots.map(s=>s.name),HOMEN="Ngọc Thanh các";
const PLNAME={kn:["Càn Ninh cung","cung Hoàng hậu"],tn:["Đức Thọ cung","cung Thái hậu"],dtd:["Dưỡng Hòa điện","tẩm điện Hoàng thượng"],thu:["Cần Chính điện","nơi Hoàng thượng phê tấu"],lc:["Trường Môn viện","lãnh cung"],vuon:["Ngự hoa viên","vườn ngự"],tyv:["Thái y viện","thuốc thang"],ksp:["Kính sự phòng","giữ thẻ bài thị tẩm"]};
/* start: traits spread so no two of the same rank share one; each gets a second trait (virtue or vice) */
const TRAIT2=["Vì gia tộc","Nóng nảy","Ham lợi","Trọng nghĩa","Nhiều chuyện","Thù dai","Rộng lượng","Thật thà","Mê tín","Thực dụng"];
function spreadTraits(){const A=[...TRAITS,...TRAITS].sort(()=>Math.random()-.5),B=[...TRAIT2,...TRAIT2].sort(()=>Math.random()-.5);
 rivals.forEach((v,i)=>{const t=A[i%A.length];v.trait=t[0];v.malice=cl(t[1]+R(20)-10,0,100);v.trait2=B[i%B.length]})}
function ensureT2(v){if(v&&!v.trait2)v.trait2=pick(TRAIT2);return v}
(function(){const n0=newRival;newRival=function(){return ensureT2(n0.apply(this,arguments))}})();
/* a palace head: Tần and above (PAL_HEAD), not the queen (she holds Càn Ninh), not fallen */
function palHeadOK(p){return !!p&&(p===S?!S.out&&!S.dead:p.alive&&!p.out)&&!p.queen&&rkOf(p)>=PAL_HEAD}
/* palFix: who heads which palace and who lives in whose side hall. ONE body, in jpal.js (it replaces this name at load);
   the co-resident cap is BAL.res (resCap), the player is housed like every NPC (owner 17/11 04:08Z/04:20Z). */
function palFix(){}
/* Hoàng hậu (NPC queen or the player at rank 7) and Hoàng quý phi (rank 6, not the queen) keep a palace to themselves */
function palSolo(p){return !!p&&(p.queen||rkOf(p)>=6)}
(function(){const a0=assignHouses;assignHouses=function(){palFix()}})();
/* where a house lives on the plan */
function palSlot(k){if(k==="home")return S.pal!=null?S.pal:null;if(k&&k[0]==="r"){const h=RV(+k.slice(1));return h&&h.pal!=null?h.pal:null}return null}
function palName(k){if(k==="home")return S.pal!=null?PALN[S.pal]:HOMEN;if(PLNAME[k])return PLNAME[k][0];const i=palSlot(k);if(i!=null)return PALN[i];const h=k&&k[0]==="r"&&RV(+k.slice(1));return h?`thiên điện của ${j78who(h)}`:k}
function palFn(k){if(k==="home")return "tẩm cung của ngươi";if(PLNAME[k])return PLNAME[k][1];const h=k&&k[0]==="r"&&RV(+k.slice(1));return h?`cung ${j78who(h)}`:""}
function residents(k){const L=[];if(k==="kn"){const q=rivals.find(v=>v.queen&&v.alive&&!v.out);if(q)L.push(q)}
 for(const p of [S].concat(rivals)){if(p!==S&&(!p.alive||p.out))continue;if(k!=="kn"&&p.queen)continue;const pk=palaceOf(p);if(pk===k&&!L.includes(p))L.push(p)}
 return L.sort((a,b)=>rkOf(b)-rkOf(a))}
/* palaceOf: a lower consort living under the queen is in Càn Ninh */
/* (owner 11/14: nobody lives under the queen any more — palSolo; a stale link from an old save is cut in houseOf below until palFix runs) */
(function(){const h0=houseOf;houseOf=function(p){const k=h0.apply(this,arguments);try{if(p&&k!==key(p)&&rkOf(p)<PAL_HEAD){const h=byKey(k);if(h&&palSolo(h))return key(p)}}catch(e){}return k}})();
function houseName(p){const k=palaceOf(p);const hd=byKey(houseOf(p));const hl=p!==S&&hd!==p&&typeof resHallOf==="function"?resHallOf(p):null;/* hall-names r2: her side hall's plaque, role word only when unknown */
 const side=n=>hl?`${hl} · ${n}`:`thiên điện ${n}`;return k==="home"?(p===S?palName("home"):`${side(palName("home"))} (cung ngươi)`):hd===p?palName(k):side(palName(k))}
/* houseCung(p): the palace two housemates share — "cùng cung" (同宮) is the court phrase for consorts of one palace in different halls (history check, hall-names r2) */
function houseCung(p){return palName(palaceOf(p))}
/* houseLine(p, me): ONE wording of "how p stands to my palace" for every generator (owner 21/11 ~02:16Z: the head of the palace is «chủ vị», only peers are «cùng cung»):
   p is the chủ vị of the palace I live in → «Chủ vị <cung>, nơi ta ở»; I am the chủ vị and p lives under me → «Ở <cung> của ta»; two non-head housemates → «Cùng <cung> với ta». Palace + head from the residence data (houseOf/palaceOf). me = "ta" | "ngươi". */
function houseLine(p,me){me=me||"ta";const c=houseCung(p);if(typeof S==="undefined"||!S||p===S||!sameHouse(S,p))return"";const hp=byKey(houseOf(p))===p,hs=byKey(houseOf(S))===S;
 return hp&&!hs?`Chủ vị ${c}, nơi ${me} ở`:hs&&!hp?`Ở ${c} của ${me}`:`Cùng ${c} với ${me}`}
/* places carry the plan names; one entry per house */
(function(){const p0=places;places=function(){const L=p0.apply(this,arguments).filter(x=>!(x.k[0]==="r"));for(const x of L)if(PLNAME[x.k]){x.n=PLNAME[x.k][0];x.fn=PLNAME[x.k][1]}
 const seen={};for(const v of rivals){if(!v.alive||v.out||v.queen)continue;const k=palaceOf(v);if(k==="home"||k==="kn"||seen[k])continue;seen[k]=1;const hd=RV(+k.slice(1));const R2=residents(k);
  L.splice(L.length-3,0,{k,n:palName(k),fn:palFn(k),d:`${hd&&rkOf(hd)>=PAL_HEAD?"Chủ vị "+j78who(hd):"Ở thiên điện"}${R2.length>1?" · "+R2.filter(x=>x!==hd).map(x=>`${(typeof resHallOf==="function"&&resHallOf(x))||"thiên điện"}: ${kitNameList([x])}`).join(" · "):""}.`,sc:"rv",v:hd}) }
 return L}})();
(function(){const p0=placeOf;placeOf=function(k){if(k==="home"){const R2=residents("home").filter(x=>x!==S);return{k,n:palName("home"),fn:"tẩm cung của ngươi",d:`Cung nữ và các con ở đây.${R2.length?" Thiên điện: "+kitNameList(R2)+".":""}`,sc:"home"}}return p0.apply(this,arguments)}})();
/* the ceremony card when she first heads a palace: the Emperor grants the best empty one; she may ask for another */
function palCeremony(){if(!S||!S.palCer||S.dead)return;S.palCer=0;const occ={};[S].concat(rivals).forEach(p=>{if(p.pal!=null&&(p===S||p.alive))occ[p.pal]=1});const free=PALN.map((n,i)=>i).filter(i=>!occ[i]);
 palCerCard(free);log(`Được ban ${PALN[S.pal]}.`)}
/* save-unseen-lists r4 (LAW 11 / 6c): «Ban cung» is BUILT by a registered generator from the free palaces (indexes); the grant (S.pal, S.palCer) is
   made before, once — written into the sổ and made again on load */
const palCerCard=rcpReg("palCer",free=>{if(!S||S.pal==null)return null;const m={ev:1,kind:"group"/* KIT §101.9: choose a palace = vòng nhóm (RING-BUILD) */,t:"Ban cung",who:pEmp(),h:`<p>Thánh chỉ: ${meRankN()} ${S.name} được ban <b>${PALN[S.pal]}</b>, làm chủ vị một cung. Cung nhân dọn từ ${HOMEN} sang trong ngày.</p>`,
  opts:[{n:`Nhận ${PALN[S.pal]}`,fx:{},x:"tạ ơn, dọn sang",go:()=>log(`Dọn sang ${PALN[S.pal]}.`)}].concat(free.slice(0,3).map(i=>({n:`Xin ${PALN[i]}`,fx:{},x:"tâu xin cung khác còn trống",go:()=>{S.pal=i;log(`Tâu xin, được dời sang ${PALN[i]}.`)}})))};Q.push(m);return m});
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead){palFix();palCeremony();tuyenTu();if(Q.length&&$("modal").hidden)showModal()}}catch(e){}return r}})();
/* TUYỂN TÚ: every third spring, 3-5 young consorts enter at Đáp ứng / Thường tại; living consorts (her too) capped at BAL.harem.cap */
function tuyenTu(){if(!S||S.month!==2||S.tuan!==0||S.ttDone===S.year)return;if(S.year%3!==0&&liveRivals(true).length>=8)return;S.ttDone=S.year;const live=liveRivals(true).length+1;let n=Math.min(BAL.selx.intake.min+R(BAL.selx.intake.max-BAL.selx.intake.min+1),BAL.harem.cap-live);/* SELSCENE: intake from BAL (was typed 3+R(3); same draw) */const L=[];
 while(n-->0&&roomFor("consort")){const v=newRival(roll(60)?0:1);Object.assign(v,drawFace());v.age=BAL.ageMin+R(3);rivals.push(v);L.push(v)}palFix();
 if(L.length){log(`Tuyển tú: ${L.map(v=>`${v.name} (${RANKS[v.rank].n})`).join(", ")} vào cung.`);if(!quiet)Q.push({t:"Tuyển tú",h:`<p>Mùa xuân năm thứ ${S.year}, cung tuyển tú nữ. ${L.length} người vào cung:</p>${kitRows(L.map(v=>[`${mdH(pv(v),"xs")}${v.name}`,`${RANKS[v.rank].n} · ${houseName(v)}`,"t"]))}`})}}
/* the cap applies to every way a consort enters */
(function(){const r0=roomFor;roomFor=function(role){if(role==="consort"&&S&&rivals&&liveRivals(true).length+1>=BAL.harem.cap)return false;return r0.apply(this,arguments)}})();
/* MAP: every palace hotspot shows its plan name and its residents' faces (residence is public); silhouettes count who is there now */
function mapSpots(){palFix();const L=[];
 for(const k in MAPH.places){if(k==="kn"&&!qOn())continue;if(k==="home"&&S.pal!=null)continue;L.push({k,box:MAPH.places[k].box,n:k==="home"?HOMEN:palName(k),fn:k==="home"?"tẩm cung của ngươi":palFn(k),res:k==="home"||k==="kn"?residents(k):[],small:k==="lc"||k==="home"})}
 const houses={};for(const p of [S].concat(rivals)){if(p!==S&&(!p.alive||p.out||p.queen))continue;const k=palaceOf(p);if(k==="kn")continue;const i=palSlot(k);if(i!=null)houses[i]=k}
 PALN.forEach((nm,i)=>{const s=MAPH.rivalSlots[i];const k=houses[i];if(k){L.push({k,box:s.box,n:nm,fn:palFn(k),res:residents(k),small:true})}else L.push({k:null,box:s.box,n:nm,fn:"cung trống",res:[],small:true,empty:true,pk:"cungtrong"})});
 /* lower consorts whose head has no slot yet (more heads than palaces) live with no plan spot: listed under the nearest head */
 return L}
/* map-self-why (s3e-display-fix, robot: «every place says đang cấm túc (1 tháng)»): HER OWN state (lãnh cung / cấm túc) is ONE reason, shown ONCE on the spot
   where she is; every other spot stays shut (lock + tap card + title) without repeating it — plan map (j27), list (j25/j41) read this one function */
function mapSelfWhy(){return !S?"":S.out?"đang ở lãnh cung":S.confined?`đang cấm túc (còn ${S.confined} tháng)`:""}
function mapHTML(){const W=S.where||{};const disR=k=>mapSelfWhy()||(S.place===k?"đang ở đây":!walkOk(travel(S.place,k))?(used>=BAL.time.khac?"hết khắc":`đi ${travel(S.place,k)} khắc`):"");
 if(window.__mapList){return `<div class="ph"><button class="btn" data-maplist="0">Xem bản đồ hoàng cung<small>toàn cảnh</small></button></div>`+mapHTMLgrid()}
 const z=window.__mapZ||1; /* KIT §85.7: fit-all is the default on every size (mapFit, j38, sets the real width) */
 return `<div class="mapv"><div class="maptools"><span class="past">${SEASON[S.month-1]} · ${BUOI[S.buoi||0]} · còn ${BAL.time.khac-used} khắc<span class="mleg"> · đi gần ${BAL.walk.near} khắc, xa ${walkFarK()} · mặt nhỏ: người ở cung · bóng: người đang có mặt</span></span><span><button class="btn mz" data-mapz="-1" aria-label="Thu nhỏ">−</button><button class="btn mz" data-mapz="1" aria-label="Phóng to">+</button><button class="btn mz" data-maplist="1">Danh sách</button></span></div>
 <div class="mapsc"><div class="mapw" style="width:${z*100}%"><img class="mapimg" src="${mapImg()}" alt="Toàn cảnh hoàng cung Đại Hy" onerror="this.src='img/map-${BUK[S.buoi||0]}.webp'">
 ${(()=>{const hereK=typeof mapHereK==="function"?mapHereK():S.place;/* her place on the plan: housed in a chủ vị's phối điện (jres) = that palace's spot (map-fix-2) */return mapSpots().map(s=>{const b=s.box;const pos=`left:${b.x*100}%;top:${b.y*100}%;width:${b.w*100}%;height:${b.h*100}%`;
  if(s.empty)return `<div class="mspot sm off empty mgrey"${s.pk?` data-pk="${s.pk}"`:""} title="${s.n}: ${s.fn}" style="${pos}"><span class="mlab">${s.n.replace(/ cung$/,"")}</span>${s.fn==="cung trống"?"":`<span class="mmeta">${s.fn}</span>`}</div>`; /* owner 18/11 ~21:50Z: an empty palace shows ONLY its name (grey look kept), no second line; Ngoại triều keeps its reason line */
  const here=s.k===hereK,why=here&&S.place!==s.k?"":disR(s.k);const n=countAt(here?S.place:s.k);const fs=s.res.slice(0,s.small?3:4).map(p=>`<span class="mres">${mdH(p===S?pMe():pv(p),"xs")}</span>`).join("")+(s.res.length>(s.small?3:4)?`<span class="mres more">+${s.res.length-(s.small?3:4)}</span>`:"");
  return `<button class="mspot${s.small?" sm":""}${why?" off":""}${here?" here":""}" data-go="${s.k}" ${why?"disabled":""} title="${s.n}: ${s.fn}${n?` · ${n} bóng`:""}${why?` · ${why}`:S.place!==s.k?` · đi ${travel(S.place,s.k)} khắc`:""}${s.res.length?" · ở: "+s.res.map(p=>p===S?"ngươi":p.name).join(", "):""}" style="${pos}"><span class="mlab">${here&&!S.out&&!S.dead&&typeof kitMeMapMark==="function"?kitMeMapMark():""}${s.small?s.n.replace(/ cung$/,""):s.n}</span>${(()=>{const mine=here&&!S.out&&!S.dead; /* KIT §41.2 (owner 17/11 ~12:30Z, picked "1"): her place counts HER: "Ta + N bóng · K khắc" (N = the others there), alone "Chỉ có ta · K khắc"; K = khắc she has left this buổi */
 const sw=mapSelfWhy();const bits=mine?[n?`Ta + ${n} bóng`:"Chỉ có ta",sw?`<em>${sw}</em>`:`<em class="ok">còn ${Math.max(0,BAL.time.khac-used)} khắc</em>`]:[n?`${n} bóng`:"",why&&why!=="đang ở đây"&&(here||why!==sw)?`<em>${why}</em>`:why&&why===sw?"":S.place!==s.k?`<em class="ok">${travel(S.place,s.k)} khắc</em>`:""].filter(Boolean);return bits.length?`<span class="mmeta">${bits.join(" · ")}</span>`:""})()}${fs?`<span class="mfaces">${fs}</span>`:""}</button>`}).join("")})()}
 </div></div></div>`}
/* the palace screen: residents present stand in the scene; absent ones named 'đi vắng' only if known */
(function(){const g=goTo;goTo=function(k){const r=g.apply(this,arguments);try{if(S.place===k&&S.visit&&(k==="home"||k==="kn"||k[0]==="r")){const R2=residents(k).filter(p=>p!==S);const here=R2.filter(p=>whereOf(p)===k);const away=R2.filter(p=>whereOf(p)!==k);
   const aw=away.map(p=>{const l=locKnown&&locKnown(p);return l?`${p.name} (đi vắng, ở ${palName(l)})`:null}).filter(Boolean);
   S.visit.res={here:here.map(p=>p.id),away:aw};const line=`${palName(k)}: ${R2.length?R2.map(p=>`${p.name} (${p.queen?"Hoàng hậu":RANKS[p.rank].n}${byKey(houseOf(p))===p?", chủ vị":`, ${(typeof resHallOf==="function"&&resHallOf(p))||"thiên điện"}`})`).join(", "):"không ai ở"}.${aw.length?" "+aw.join("; ")+".":""}`;
   if(k!=="home")S.visit.msg=(S.visit.msg?S.visit.msg+" ":"")+line}}catch(e){}return r}})();
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{palFix()}catch(e){}return r}})();
/* on a narrow screen the zoomed map opens centred on where she stands */
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(tab==="go"&&!document.querySelector(".game.maptab")){const sc=document.querySelector(".mapsc");const h=sc&&(sc.querySelector(".mspot.here")||sc.querySelector('[data-go="home"]'));const key=S.place+"|"+(window.__mapZ||0);if(sc&&h&&sc.scrollWidth>sc.clientWidth){const img=sc.querySelector(".mapimg");const go=()=>{sc.scrollLeft=h.offsetLeft+h.offsetWidth/2-sc.clientWidth/2;sc.scrollTop=h.offsetTop+h.offsetHeight/2-sc.clientHeight/2};if(img&&!img.complete)img.addEventListener("load",go,{once:true});else go();if(window.__mapCtr===key&&window.__mapPos){sc.scrollLeft=window.__mapPos[0];sc.scrollTop=window.__mapPos[1]}window.__mapCtr=key;sc.addEventListener("scroll",()=>{window.__mapPos=[sc.scrollLeft,sc.scrollTop]},{passive:true})}}}catch(e){}return r}})();
/* the Phi tần face strip, grouped by palace (12-16 consorts): Càn Ninh first, then each palace by rank, fallen and dead last */
/* rvOrd() = the strip order (rivals indexes); PG.rv is a STRIP position, so «open X's card» (kitCourtOpen: Hoàng hậu, a cung nữ's chủ) sets PG.rv = rvPgOf(X), never rivals.indexOf(X)
   (maid-8tabs #34: the chủ row opened another consort's card) */
function rvOrd(){const ordG=v=>!v.alive?(typeof dthIs==="function"&&!dthIs(v)?97:99):v.out?98:palaceOf(v)==="kn"?0:palaceOf(v)==="home"?1:2+(palSlot(palaceOf(v))??9);
 return rivals.map((v,i)=>i).sort((a,b)=>ordG(rivals[a])-ordG(rivals[b])||rkOf(rivals[b])-rkOf(rivals[a]))}
function rvPgOf(v){try{const i=rivals.indexOf(v);if(i<0)return -1;return rvOrd().indexOf(i)}catch(e){return rivals.indexOf(v)}}
window.rvPgOf=rvPgOf;
(function(){const p0=pager;pager=function(key,items,mk){if(key!=="rv"||!rivals||items.length<rivals.length)return p0.apply(this,arguments);const n=rivals.length;
 const nDead=rivals.filter(v=>typeof dthIs==="function"&&dthIs(v)).length;const grp=v=>!v.alive?(typeof dthIs==="function"&&!dthIs(v)?"Đã rời cung":"Đã khuất"):v.out?"Lãnh cung":palName(palaceOf(v));
 const ord=rvOrd();let last=null;
 const it2=ord.map(i=>{const g=grp(rivals[i]);const x=Object.assign({},items[i]);if(g!==last){x.sep=g;last=g}return x}).concat(items.slice(n));const map=ord.concat(items.slice(n).map((_,j)=>n+j));
 const h=p0.call(this,key,it2,i=>mk(map[i]));/* the count of the dead beside the strip count (owner 27/11 ~05:10Z «Đã khuất: N») */return nDead?h.replace(/(<span class="pcount">[^<]*)/,`$1 · Đã khuất: ${nDead}`):h}})();
/* old saves: anyone living under the Hoàng hậu / Hoàng quý phi is moved out on load (palFix logs each move) */
(function(){const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{if(S&&rivals&&!S.dead)palFix()}catch(e){console.error("palFix load",e)}return r}})();
