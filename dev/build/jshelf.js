/* ================= jshelf: NƠI TRƯNG BÀY — a display shelf per person + DWELLING xa xỉ + plant care (owner OD 17/11 ~18:30Z (A) + ~18:00Z s35 Lượt 26) =================
   Brief: dev/handover/briefs/display-shelf-build.md (handover branch). Numbers: BAL.shelf (this file, one table). Reuses, never rebuilds:
   · items = IT inventory entries (j8) + a few new décor pieces (IT kd "Bày biện"); one luxury number per piece = jlux luxPiece (BAL.shelf.it[k].lux for décor).
   · rank allowance = jinv luxAllow (BAL.lux.allow) × BAL.shelf.allowF — a SECOND score, separate from the worn-outfit xa xỉ (owner: "hai điểm xa xỉ").
   · sightings / evidence = the jdress model (p.dsn) → p.shn[wdKey(t)]: SAME place (visit), Dò la (spyFind, both ways), her maid's Sai đi dò la,
     rumours (knowledge only, never proof: jtruth rule 4).  Accuse = the existing "Tố xa xỉ" act (jdress ACT.xx) gains a second cause: the room.
   · NPC visits = a new shared deed TW "call" (Ghé chơi) in the agent day plan (jagent AGSOC), landing at the target's palace; her visiting them =
     walking into their palace (j2 goTo). Same rules both ways (OD:L1386).
   · mood = the ONE jemo bar (emoSet); plants = the jpet care model (decay a week, servants by lòng/traits, neglect → withered → dead pot).
   STORAGE (old saves: nothing to migrate, all lazy): p.shelf = {g:{<group>: entry}, sd} — a displayed entry is MOVED out of p.inv, so it cannot be
   gifted / sold / used / worn until taken down (owner (1)); jil (one item ledger) counts shelf entries as the owner's (ilSlots / ilOut wrapped).
   Plant entry fields: pc (care 0..100), pz (weeks at 0), pm (week of her own care). Seen: p.shn[key] = {w, sc, bud, n, sig, by, pf (proof)}.
   UI: KIT FIRST — the left-rail icon, painted shelf backdrop and cut-out items are KIT REQUESTS (dev/kit/KIT_REQUESTS.md 17/11 display-shelf);
   this module only feeds data: shelfView(p). Interim entry points are kit parts only (item panel act card "Trưng bày", kitModal + kitRows + pbtn).
   ================================================================================================================================================ */
Object.assign(BAL,{shelf:{
 /* the groups: ONE displayed piece per group (owner). Placeholder list until dev/research/display-shelf-items.md lands (expert worker) */
 groups:[["cay","Cây cảnh"],["chuong","Chuông gió"],["rem","Rèm, mành"],["phong","Bình phong"],["su","Đồ sứ"],["tranh","Tranh, thư pháp"],
  ["van","Văn phòng tứ bảo"],["nhac","Nhạc khí"],["ngoc","Ngọc khí"],["huong","Lư hương"]],
 /* displayable pieces: group + (décor only) luxury. Existing IT pieces keep their jinv luxVal (lux omitted). plant:1 = needs care */
 it:{lanquy:{g:"cay",plant:1},caytung:{g:"cay",plant:1,lux:20},caykho:{g:"cay",lux:0},
  chuonggio:{g:"chuong",lux:10},chuongngoc:{g:"chuong",lux:30},
  remtruc:{g:"rem",lux:8},remchau:{g:"rem",lux:34},
  bpgo:{g:"phong",lux:22},bpthue:{g:"phong",lux:40},
  binhsu:{g:"su",lux:24},
  tranhco:{g:"tranh"},thuphap:{g:"tranh",lux:14},
  nghien:{g:"van"},dancoc:{g:"nhac"},
  nhuy:{g:"ngoc",lux:50},cocngoc:{g:"ngoc"},
  luhuong:{g:"huong",lux:12}},
 shop:["chuonggio","remtruc","thuphap","luhuong","caytung","binhsu"],/* sold by Nội vụ phủ (SHOP_ALL) */
 best:{promo:["nhuy","bpthue"],birthday:["chuongngoc","remchau"],contest:["binhsu"]},/* ngự ban lists (j8 BEST) gain these */
 ui:0,              /* 1 = her interim entry points (item-panel act card) are on; stays 0 until the kit shelf part is KIT READY (no one-way door: she must be able to take pieces down) */
 prK:3,             /* Nội vụ phủ price of a décor piece = its luxury × prK */
 allowF:1,          /* dwelling allowance = her rank allowance (jinv luxAllow) × allowF */
 plainF:.15,lv3:1.5,/* sc below plainF × allowance = đơn sơ; above allowance = xa hoa; above lv3 × allowance = quá xa xỉ */
 /* what a visitor's eye does (once per visitor and owner every see.cdW tuần) */
 see:{cdW:4,supAff:[0,0,-4,-8],ghen:[0,0,3,6],npcOanK:.5,fitAff:2,nguGhen:2,witherAff:-2,seenW:12},
 /* her mood (and every NPC's), weekly, the one jemo bar */
 mood:{fit:22,lux:34,wither:20},
 rum:{lv:2,o:12},   /* a room at or above lv spreads: each consort hears it 1 in N a week (knowledge, never proof) */
 rep:1,             /* quá xa xỉ: tiếng xa hoa (jlux p.luxRep) +rep each month */
 /* NPC shelves: seed pieces by rank (0..7) on first look, then they arrange their chest weekly within capF × allowance (proud traits capHi) */
 npc:{seed:[0,1,1,2,2,3,3,4],capF:.9,capHi:1.3,proud:["Kiêu ngạo","Tham vọng"],care:.8},
 /* plants (jpet model): care 0..100, falls decay a tuần; servants care by default (0 khắc), quality by lòng and traits; her own care = the minigame */
 plant:{start:80,decay:12,wither:35,deadW:3,witherLux:.3,khacSelf:1,/* OWNER QUESTION OPEN (OD ~18:00Z (4)): her own care costs khacSelf khắc (0 = free); servants' care never costs her a khắc */srvBase:.45,srvLoyK:.006,srvMax:1.1,qCut:[.6,.9],/* servant care words: below qCut[0] vụng về, below qCut[1] tạm được, else khéo tay */srvTr:{"Cẩn thận":.2,"Chăm chỉ":.2,"Lười biếng":-.3,"Vụng về":-.2},
  gain:[10,45],game:{rounds:3,steps:10,band:[6,8],ms:[260,170]}},
 /* the shared deed "Ghé chơi" (TW call): friendship + a look at the room */
 visit:{rel:3,w:.6,affMin:-15,dayP:12,base:5,herW:15,upW:5},/* dayP: a consort who keeps her schedule this buổi still drops in on someone 1 in N (owner: daily visits); target weight base + liking (+ her, + a superior) *//* anyone not on bad terms may call (owner: NPCs come to her room as she goes to theirs) */
 seeDeeds:["call","visit","help","apol","provoke","humil","test","mediate","warn"],
 /* Tố xa xỉ, the room cause (numbers as jdress BAL.lux.xx so both causes weigh the same) */
 acc:{cdA:48,cdT:72,hostMin:50,ghenMin:70,npcO:15,ducT:-2,danhT:-4,repT:2,danhA:2,rel:-10,waveDanhA:-2,falseDanhA:-5,falseDanhT:2,falseRel:-12}}});

/* ---------- new décor pieces (IT, kd "Bày biện"): only earned (bought, given, bestowed) ---------- */
(function(){const D={caytung:["Chậu tùng thế","Tùng nhỏ uốn thế trong chậu men, bày bàn: phải chăm, bỏ bê thì héo"],caykho:["Chậu cây khô","Cây trong chậu đã chết khô vì bỏ bê"],
 chuonggio:["Chuông gió đồng","Chuông đồng treo hiên, gió qua kêu khẽ"],chuongngoc:["Chuông gió lưu ly","Chuông lưu ly ngũ sắc, tiếng trong như ngọc"],
 remtruc:["Mành trúc vẽ hoa","Mành trúc mảnh vẽ hoa mai"],remchau:["Rèm châu","Rèm kết hạt châu, lấp lánh dưới đèn"],
 bpgo:["Bình phong gỗ chạm","Bình phong gỗ hương chạm tùng hạc"],bpthue:["Bình phong lụa thêu","Bình phong bốn tấm lụa thêu sơn thủy"],
 binhsu:["Bình sứ thanh hoa","Bình sứ men lam vẽ sen, cắm một cành mai"],thuphap:["Bức thư pháp","Một bức chữ đẹp treo tường"],
 nhuy:["Như ý ngọc","Như ý bằng ngọc bích, vật ngự ban cầu điều tốt lành"],luhuong:["Lư hương đồng","Lư đồng ba chân, khói trầm thoang thoảng"]};
 const P=BAL.shelf.it;for(const k in D){if(IT[k])continue;IT[k]={n:D[k][0],kd:"Bày biện",d:`${D[k][1]} · bày ở Nơi trưng bày`,pr:k==="caykho"?0:(P[k].lux|0)*BAL.shelf.prK||0,rk:0,tg:k==="caykho"?[]:["rv","th","hh"],gv:3}}
 try{for(const k of BAL.shelf.shop)if(!SHOP_ALL.includes(k))SHOP_ALL.push(k)}catch(e){}
 try{for(const w in BAL.shelf.best)if(BEST[w])for(const k of BAL.shelf.best[w])if(!BEST[w].includes(k))BEST[w].push(k)}catch(e){}})();
/* the one luxury number per piece (jlux luxPiece): décor reads its BAL value */
(function(){if(typeof luxPiece!=="function")return;const l0=luxPiece;luxPiece=function(k){const s=BAL.shelf.it[k];if(s&&s.lux!=null)return s.lux;return l0.apply(this,arguments)};window.luxPiece=luxPiece})();

/* ---------- data ---------- */
const SHELF_LV=["Đơn sơ","Hợp phẩm","Xa hoa","Quá xa xỉ"];
function shelfGrp(k){const s=BAL.shelf.it[k];return s?s.g:null}
function shelfGName(g){const x=BAL.shelf.groups.find(z=>z[0]===g);return x?x[1]:g}
function shelfIsPlant(e){return !!(e&&BAL.shelf.it[e.k]&&BAL.shelf.it[e.k].plant)}
function shelfOf(p){if(!p)return{g:{}};const z=p.shelf=p.shelf&&typeof p.shelf==="object"?p.shelf:{g:{}};z.g=z.g||{};if(p!==S&&!z.sd){z.sd=1;try{shelfSeed(p)}catch(e){console.error("shelfSeed",e)}}return z}
function shelfList(p){const z=shelfOf(p);return BAL.shelf.groups.map(x=>z.g[x[0]]).filter(Boolean)}
/* why a chest entry cannot go on display ("" = it can) */
function shelfWhyNot(p,e){if(!e||!IT[e.k])return"không có món này";const g=shelfGrp(e.k);if(!g)return"món này không để bày";if(e.h)return"không có trong rương";
 if(e.w)return"đang mặc, tháo ra trước";if(p.out)return"ở lãnh cung không được bày biện";return""}
/* put chest entry ix on display (the piece already in that group goes back to the chest) */
function shelfPut(p,ix){const e=(p.inv||[])[ix];const why=shelfWhyNot(p,e);if(why)return{ok:false,why};const z=shelfOf(p),g=shelfGrp(e.k),old=z.g[g];
 p.inv.splice(ix,1);if(old)p.inv.push(old);if(shelfIsPlant(e)&&e.pc==null){e.pc=BAL.shelf.plant.start;e.pz=0}e.shw=wk();z.g[g]=e;return{ok:true,g,old:old?itm(old.k).n:"",n:itm(e.k).n}}
function shelfTake(p,g){const z=shelfOf(p),e=z.g[g];if(!e)return"";delete z.g[g];p.inv=p.inv||[];p.inv.push(e);return itm(e.k).n}
function shelfPiece(e){if(!e)return 0;let v=0;try{v=luxPiece(e.k)}catch(x){v=0}if(shelfIsPlant(e)&&(e.pc|0)<BAL.shelf.plant.wither)v=Math.round(v*BAL.shelf.plant.witherLux);return v}
/* the DWELLING score: sum of the displayed pieces vs the rank allowance × allowF (never shown: OD 08:10Z, the player learns it from consequences) */
function shelfLux(p){const L=shelfList(p);const sc=L.reduce((s,e)=>s+shelfPiece(e),0);let bud=1;try{bud=Math.max(1,Math.round(luxAllow(p)*BAL.shelf.allowF))}catch(e){}
 const B=BAL.shelf;const lv=sc<bud*B.plainF?0:sc<=bud?1:sc<=bud*B.lv3?2:3;return{sc,bud,lv,name:SHELF_LV[lv],n:L.length,wither:L.some(e=>shelfIsPlant(e)&&(e.pc|0)<B.plant.wither)}}
function shelfSig(p){return shelfList(p).map(e=>e.k+(shelfIsPlant(e)&&(e.pc|0)<BAL.shelf.plant.wither?"~":"")).sort().join("|")}
window.shelfOf=shelfOf;window.shelfPut=shelfPut;window.shelfTake=shelfTake;window.shelfLux=shelfLux;window.shelfList=shelfList;

/* ---------- NPC shelves: seeded once by rank, arranged weekly from their own chest (same data, same rule) ---------- */
function shelfSeed(p){const B=BAL.shelf,n=B.npc.seed[Math.max(0,Math.min(7,rkOf(p)|0))]|0;if(!n)return;let bud=1;try{bud=luxAllow(p)*B.allowF}catch(e){}
 const z=p.shelf;const pool=Object.keys(B.it).filter(k=>IT[k]&&k!=="caykho");let left=bud*B.npc.capF;
 for(const k of shuf(pool.slice())){if(Object.keys(z.g).length>=n)break;const g=shelfGrp(k);if(z.g[g])continue;const v=luxPiece(k);if(v>left)continue;
  const e={k,from:"me"};if(B.it[k].plant){e.pc=B.plant.start;e.pz=0}z.g[g]=e;left-=v}}
function shelfArrange(p){const B=BAL.shelf,z=shelfOf(p);let bud=1;try{bud=luxAllow(p)*B.allowF}catch(e){}
 let T=[];try{T=traitsOf(p)||[]}catch(e){}const cap=bud*(T.some(t=>B.npc.proud.includes(t))?B.npc.capHi:B.npc.capF);
 for(let i=(p.inv||[]).length-1;i>=0;i--){const e=p.inv[i];if(shelfWhyNot(p,e)||e.t)continue;const g=shelfGrp(e.k),cur=z.g[g];
  const now=shelfLux(p).sc,gain=luxPiece(e.k)-(cur?shelfPiece(cur):0);if(gain>0&&now+gain<=cap)shelfPut(p,i)}}

/* ---------- what people SEE of a room (jdress model): same place, Dò la, maid's report; rumours = knowledge only ---------- */
function shelfRec(t,by,pf){const x=shelfLux(t);return{w:wk(),sc:x.sc,bud:x.bud,lv:x.lv,n:x.n,wi:x.wither?1:0,sig:shelfSig(t),by:by||"",pf:pf?1:0}}
function shelfLook(obs,t,by,pf){if(!obs||!t||obs===t||t.alive===false)return null;const r=shelfRec(t,by,pf!==false);obs.shn=obs.shn||{};const k=wdKey(t),o=obs.shn[k];
 /* a rumour never overwrites proof of the same room */if(!r.pf&&o&&o.pf&&o.sig===r.sig&&wk()-o.w<=BAL.shelf.see.seenW)return o;
 /* NPCs keep only what matters (an over-allowance room or a withered plant): saves stay small */if(obs!==S&&r.lv<2&&!r.wi){delete obs.shn[k];return r}
 obs.shn[k]=r;return r}
function shelfSeen(obs,t){const r=obs&&obs.shn&&obs.shn[wdKey(t)];if(!r||wk()-r.w>BAL.shelf.see.seenW)return null;return r}
function shelfNow(obs,t){const r=shelfSeen(obs,t);return r&&r.sig===shelfSig(t)?r:null}
window.shelfLook=shelfLook;window.shelfSeen=shelfSeen;window.shelfNow=shelfNow;
/* a visitor's eye on the room: her view of the owner (superiors frown on a room above its rank, peers envy, a fitting room is admired) */
function shelfReact(obs,t){if(!obs||!t||obs===t||obs===S)return"";const B=BAL.shelf.see;obs.shR=obs.shR||{};const k=wdKey(t);if(obs.shR[k]!=null&&wk()-obs.shR[k]<B.cdW)return"";obs.shR[k]=wk();
 const x=shelfLux(t);if(!x.n)return"";const sup=obs.queen||rkOf(obs)>rkOf(t);let m=1;try{m=tv(LUX_TR,obs)||1}catch(e){}
 if(x.lv>=2){if(sup)affAdd(obs,t,B.supAff[x.lv]);else{const n=Math.round(B.ghen[x.lv]*m);if(t===S)obs.ghen=cl((obs.ghen||0)+n,0,100);else oanAdd(obs,t,n*B.npcOanK)}}
 else if(x.lv===1)affAdd(obs,t,B.fitAff);
 if(!sup&&shelfList(t).some(e=>e.from==="emp"||e.from==="th")){if(t===S)obs.ghen=cl((obs.ghen||0)+B.nguGhen,0,100);else oanAdd(obs,t,B.nguGhen*B.npcOanK)}
 if(x.wither)affAdd(obs,t,B.witherAff);return x.name}
window.shelfReact=shelfReact;
function shelfSee(obs,t,by){const r=shelfLook(obs,t,by,true);if(r)shelfReact(obs,t);return r}
const SHELF_PW={k:""};/* once per buổi (placeWhere runs many times a buổi: perf) */
/* her walk into a palace: she sees the rooms of everyone living there; NPCs at her palace the same buổi see hers */
(function(){if(typeof goTo==="function"){const g0=goTo;goTo=function(){const was=S&&S.place;const r=g0.apply(this,arguments);try{if(S&&S.place!==was&&!S.out)for(const v of liveRivals(true))if(v.alive&&palaceOf(v)===S.place)shelfSee(S,v,"tận mắt")}catch(e){console.error("shelf goTo",e)}return r}}
 if(typeof placeWhere==="function"){const p0=placeWhere;placeWhere=function(){const r=p0.apply(this,arguments);try{const kb=wk()+"-"+(S&&S.buoi||0);if(S&&!S.dead&&S.where&&SHELF_PW.k!==kb&&(SHELF_PW.k=kb))for(const v of liveRivals(true)){if(!v.alive||v.out)continue;const w=whereOf(v);
   if(w==="home"&&!S.out)shelfSee(v,S,"tận mắt");else for(const o of liveRivals(true))if(o!==v&&o.alive&&!o.out&&palaceOf(o)===w&&w!==palaceOf(v))shelfSee(v,o,"tận mắt")}}catch(e){console.error("shelf where",e)}return r}}})();
/* Dò la (both ways) also reports the room; her maid's "Sai đi dò la" the same */
function shelfSpyTxt(a,t,by){const r=shelfSee(a,t,by);if(!r||a!==S)return"";return `Phòng của ${NM(t)}: ${r.n?`bày ${r.n} món, ${SHELF_LV[r.lv].toLowerCase()}`:"không bày gì"}${r.wi?", có chậu cây héo":""}. `}
(function(){if(typeof spyFind==="function"){const s0=spyFind;spyFind=function(a,t){const r=s0.apply(this,arguments);let add="";try{add=shelfSpyTxt(a,t,a===S?"dò la":(a.name||""))}catch(e){}return (r||"")+add}}
 if(typeof spyMaidRun==="function"){const m0=spyMaidRun;spyMaidRun=function(v,ag){const ok=m0.apply(this,arguments);try{if(ok&&v){const m=ag||S.maid||{};const t=shelfSpyTxt(S,v,m.name||"cung nữ");if(t){log(`${m.name||"Cung nữ"} báo: ${t}`);try{noteAdd(v.id,t)}catch(e){}}}}catch(e){console.error(e)}return ok}}})();

/* ---------- NPC VISITS (owner (2): "tại sao người ta không tới phòng của tôi?") — the shared deed Ghé chơi, two-way ---------- */
(function(){try{BAL.tw.g.call=BAL.shelf.visit.rel;
 TWD("call",{n:"Ghé chơi",req:(a,t)=>!!t&&t!==a&&!t.out&&t.alive!==false,run:(a,t)=>{relAdd(a,t,BAL.tw.g.call);shelfSee(a,t,"ghé chơi");if(t!==S)shelfSee(t,a,"ghé chơi");return `${twNm(a)} ghé chơi cung ${NM(t)}`}});
 SOC.call={w:BAL.shelf.visit.w,ok:(v,t)=>t!==v&&!t.out&&aff(v,t)>=BAL.shelf.visit.affMin,run:(v,t)=>twDo(v,t,"call",true)};
 if(typeof AGSOC==="object"){AGSOC.call=["call","social","ally",g=>({ally:g.call})];AGACTW.call="ghé chơi"}}catch(e){console.error("shelf call",e)}})();
/* the visit happens AT the target's palace (her room / theirs), not wherever she is that khắc */
(function(){if(typeof agOpts!=="function")return;const o0=agOpts;agOpts=function(){const O=o0.apply(this,arguments);try{for(const o of O)if(o.k==="call")o.at=(kh,vv,tt)=>tt?palaceOf(tt):null}catch(e){}return O}})();
/* daily life: a consort who keeps her schedule this buổi may drop in on someone (her room weighs more: the player's palace is where life is seen) */
(function(){if(typeof agDecide0!=="function")return;const d0=agDecide0;agDecide0=function(v){const r=d0.apply(this,arguments);try{const V=BAL.shelf.visit;if(r||!v||v.confined||!roll(V.dayP))return r;
  const L=[S].concat(liveRivals(true)).filter(x=>x&&x!==v&&x.alive!==false&&!x.out&&aff(v,x)>=V.affMin).map(x=>[x,V.base+Math.max(0,aff(v,x))+(x===S?V.herW:0)+(rkOf(x)>rkOf(v)?V.upW:0)]);
  const t=L.length?agPw(L):null;if(!t)return r;const c={k:"call",t,tag:"social",act:AGACTW.call,need:"ally",at:(kh,vv,tt)=>palaceOf(tt)};const sl=agSlot(v,c.at,t);if(!sl)return r;
  let N={};try{N=agNeedsC(v)}catch(e){}agPlan(v,c,N,sl[0],sl[1]);return 1}catch(e){console.error("shelf call day",e)}return r}})();
/* any visiting deed landing at the target's palace shows the visitor the room (sang thăm, giúp, tạ lỗi, khiêu khích …) */
(function(){if(typeof agLand0!=="function")return;const l0=agLand0;agLand0=function(p){const r=l0.apply(this,arguments);try{if(r&&p&&BAL.shelf.seeDeeds.includes(p.k)&&p.k!=="call"){const v=RV(p.vid),t=agPerson(p.t);if(v&&t&&p.pl===palaceOf(t))shelfSee(v,t,"tận mắt")}}catch(e){console.error("shelf land",e)}return r}})();

/* ---------- Tố xa xỉ: the room is a second cause of the SAME act (jdress ACT.xx); proof only (visit / Dò la), never a rumour ---------- */
function shelfCause(a,t){if(!a||!t||a===t)return null;const r=shelfNow(a,t);return r&&r.pf&&r.sc>r.bud?r:null}
window.shelfCause=shelfCause;
function shelfStrip(t){const L=BAL.shelf.groups.map(g=>[g[0],shelfOf(t).g[g[0]]]).filter(x=>x[1]).sort((x,y)=>shelfPiece(y[1])-shelfPiece(x[1]));return L.length?shelfTake(t,L[0][0]):""}
function shelfAccuse(a,t){const B=BAL.shelf.acc;const x=shelfLux(t);let judge="";try{judge=judgeName(t)}catch(e){judge="Hoàng hậu"}const A0=NMc(a),T0=NM(t);
 for(const o of liveRivals(true))if(o!==a&&o!==t&&o.alive&&!o.out)shelfLook(o,t,"tra xét",true);/* the inquiry makes the room known */
 const lux=`Xa xỉ nơi ở ${x.sc}`;
 if(x.sc<=x.bud){ap(a,{danh:B.falseDanhA});ap(t,{danh:B.falseDanhT});relAdd(a,t,B.falseRel);
  return `${A0} tố ${T0} bày biện xa xỉ; <span class="${a===S?"r":"g"}">tra xét ra phòng ${T0} không quá mức</span> (${lux}), ${a===S?"ngươi":a.name} bị quở vì tố bừa. Danh ${B.falseDanhA}, ${T0} Danh +${B.falseDanhT}. `}
 if(!roll(oVP(a))){ap(a,{danh:B.waveDanhA});relAdd(a,t,B.rel);return `${A0} tố ${T0} bày biện xa xỉ (${lux}), ${judge} bỏ qua, chỉ dặn lần sau giữ ý. ${a===S?"Danh "+B.waveDanhA+". ":""}`}
 relAdd(a,t,B.rel);ap(a,{danh:B.danhA});const off=shelfStrip(t);ap(t,{duc:B.ducT,danh:B.danhT});try{t.luxRep=Math.min(BAL.lux.repMax,(t.luxRep||0)+B.repT)}catch(e){}
 return `${A0} tố ${T0} bày biện xa xỉ (${lux}): <span class="${t===S?"r":"g"}">thành</span>. ${off?off+" phải cất vào rương. ":""}${NMc(t)} Đức ${B.ducT}, Danh ${B.danhT}. `}
window.shelfAccuse=shelfAccuse;
function shelfAccHook(){const X=typeof ACT==="object"?ACT.xx:null;if(X&&X.__sh)return;
 const SX=" · hoặc đã tận mắt thấy (hay dò la ra) phòng nàng bày biện quá mức phẩm mình";
 if(X){const ok0=X.ok,f0=X.f;X.ok=(a,t)=>{let d=false;try{d=!!ok0(a,t)}catch(e){}return d||!!shelfCause(a,t)};X.f=(a,t)=>{let d=false;try{d=!!ok0(a,t)}catch(e){}return d?f0(a,t):shelfAccuse(a,t)};X.x=(X.x||"")+SX;X.__sh=1;return}
 A("xx","Tố xa xỉ",{c:{},ok:(a,t)=>!!shelfCause(a,t),o:a=>oVP(a),x:"cần đã tận mắt thấy (hay dò la ra) phòng nàng bày biện quá mức phẩm mình",f:(a,t)=>shelfAccuse(a,t)});ACT.xx.__sh=1}
try{shelfAccHook()}catch(e){console.error("shelfAccHook",e)}
/* an NPC with proof and a motive brings the charge herself (monthly; same act, same odds oVP, same pacing shape as Tố xa xỉ) */
function shelfNpcAccuse(){const B=BAL.shelf.acc;for(const a of liveRivals(true)){if(!a.alive||a.out||!a.shn)continue;if(a.shA!=null&&wk()-a.shA<B.cdA)continue;
  for(const k in a.shn){const t=k==="me"?S:RV(+k);if(!t||t===a||t.alive===false||t.out)continue;if(t.shT!=null&&wk()-t.shT<B.cdT)continue;if(!shelfCause(a,t))continue;
   const mot=hostility(a,t)>=B.hostMin||(t===S&&(a.ghen||0)>=B.ghenMin);if(!mot||!roll(B.npcO))continue;
   a.shA=wk();t.shT=wk();const r=shelfAccuse(a,t);if(t===S)Q.push({t:"Bị tố bày biện xa xỉ",who:typeof pv==="function"?pv(a):null,h:`<p>${r}</p>`});else try{newsAdd(a,"xx",r,false)}catch(e){}break}}}

/* ---------- the week: plants (decay, servants' care, withered, dead pot), NPC arrange, mood, rumours; the month: reputation, NPC charges ---------- */
function shelfSrvQ(s){const P=BAL.shelf.plant;if(!s)return 0;let q=P.srvBase+(s.loyal||0)*P.srvLoyK;const T=[].concat(s.traits||[],typeof s.tr==="string"?[s.tr]:[]);for(const t of T)q+=P.srvTr[t]||0;return cl(q,0,P.srvMax)}
const SHELF_SRVW=["vụng về","tạm được","khéo tay"];
function shelfSrvWord(q){const C=BAL.shelf.plant.qCut;return SHELF_SRVW[q<C[0]?0:q<C[1]?1:2]}
function shelfSrvBest(p){const L=(p===S?(S.staff||[]):(p.staff||[])).concat(p.maid?[p.maid]:[]).filter(Boolean);return L.sort((a,b)=>shelfSrvQ(b)-shelfSrvQ(a))[0]||null}
function shelfPlantWeek(p){const P=BAL.shelf.plant,z=shelfOf(p),me=p===S;const s=shelfSrvBest(p);const out=[];
 for(const g in z.g){const e=z.g[g];if(!shelfIsPlant(e))continue;const was=(e.pc|0)>=P.wither;e.pc=cl((e.pc==null?P.start:e.pc)-P.decay,0,100);
  if(e.pm!==wk()){/* she did not tend it herself this tuần: the servant does (0 khắc for her); an NPC's household as their pets */
   const q=me?shelfSrvQ(s):BAL.shelf.npc.care;e.pc=cl(e.pc+P.decay*q,0,100)}
  e.pz=e.pc<=0?(e.pz|0)+1:0;
  if(e.pz>=P.deadW){e.k="caykho";delete e.pc;delete e.pz;out.push(["dead",g]);continue}
  if(was&&e.pc<P.wither)out.push(["wither",g])}
 if(me&&out.length&&!(typeof tsbBot==="function"&&tsbBot()))for(const [w,g] of out){if(w==="dead"){log(`<span class="r">Chậu cây bày trong phòng bị bỏ bê lâu ngày, đã chết khô.</span>`);continue}
  const n=itm(z.g[g].k).n;Q.push({t:"Chậu cây héo úa",who:typeof pMe==="function"?pMe():null,h:`<p>${n} bày trong phòng lá vàng, đất khô${s?`: ${s.name} chăm chưa khéo`:", không ai chăm"}. Để lâu thì chết khô; khách đến thấy cũng chê.</p>`,
   opts:[{n:"Tự tay chăm",fx:{},x:`tốn: ${P.khacSelf} khắc · thành: cây tươi lại`,go:()=>setTimeout(()=>{try{shelfPlantOpen(g)}catch(e){}},60)},{n:"Để người hầu lo",fx:{},x:s?`${s.name} chăm tiếp, khéo vụng tùy lòng`:"không ai chăm: cây héo tiếp"}]})}return out}
function shelfMood(p){if(typeof emoSet!=="function")return;const x=shelfLux(p),M=BAL.shelf.mood;
 if(x.wither)emoSet(p,"buon",M.wither,"chậu cây trong phòng héo úa");else if(x.lv>=2)emoSet(p,"vui",M.lux,"phòng ốc bày biện lộng lẫy");else if(x.lv===1)emoSet(p,"vui",M.fit,"phòng ốc bày biện vừa ý")}
function shelfRumour(){const B=BAL.shelf.rum;const P=[S].concat(liveRivals(true)).filter(p=>p&&p.alive!==false&&!p.out);let heardMe=0;
 for(const t of P){const x=shelfLux(t);if(x.lv<B.lv)continue;for(const o of P){if(o===t||shelfSeen(o,t))continue;if(!roll(B.o))continue;shelfLook(o,t,"tin đồn",false);if(t===S)heardMe++;
   else if(o===S){try{noteAdd(t.id,`Nghe đồn phòng ${t.name} bày biện ${SHELF_LV[x.lv].toLowerCase()}.`)}catch(e){}}}}
 if(heardMe&&!(typeof tsbBot==="function"&&tsbBot()))log(`Hậu cung xì xào về đồ bày trong phòng ngươi.`)}
function shelfWeek(){if(!S||S.dead)return;const P=[S].concat(liveRivals(true)).filter(p=>p&&p.alive!==false);
 for(const p of P){try{if(p.out){if(p.shelf&&p.shelf.g)for(const g in p.shelf.g)shelfTake(p,g);continue}if(p!==S)shelfArrange(p);shelfPlantWeek(p);shelfMood(p)}catch(e){console.error("shelfWeek",e)}}
 try{shelfRumour()}catch(e){console.error("shelfRumour",e)}
 if(S.shM!==S.turn){S.shM=S.turn;for(const p of P){try{if(shelfLux(p).lv>=3)p.luxRep=Math.min(BAL.lux.repMax,(p.luxRep|0)+BAL.shelf.rep)}catch(e){}}try{shelfNpcAccuse()}catch(e){console.error("shelfNpcAccuse",e)}}}
window.shelfWeek=shelfWeek;
(function(){if(typeof petWeek!=="function")return;const w0=petWeek;petWeek=function(){const r=w0.apply(this,arguments);try{shelfWeek()}catch(e){console.error("shelfWeek",e)}return r}})();

/* ---------- jil: a displayed piece is still the owner's (one ledger, conservation law) ---------- */
(function(){if(typeof ilSlots==="function"){const s0=ilSlots;ilSlots=function(p){const o=s0.apply(this,arguments);try{if(p&&p.shelf&&p.shelf.g)for(const g in p.shelf.g){const e=p.shelf.g[g];if(e&&e.k)o.push(e)}}catch(e){}return o}}
 if(typeof ilOut==="function"){const o0=ilOut;ilOut=function(p,e){try{if(p&&p.shelf&&p.shelf.g)for(const g in p.shelf.g)if(p.shelf.g[g]===e){delete p.shelf.g[g];return}}catch(x){}return o0.apply(this,arguments)}}})();

/* ---------- PLANT CARE (owner (4)): the act "Chăm sóc" lists pets + plants; plant screen = the jpetcare kit screen shape ---------- */
const SHPC={g:null,game:null};
function shelfCareList(){const L=[];try{tsbPets(S).forEach((P,i)=>L.push({kind:"pet",i,n:petT(P).n}))}catch(e){}for(const g in shelfOf(S).g){const e=shelfOf(S).g[g];if(shelfIsPlant(e))L.push({kind:"plant",g,n:itm(e.k).n})}return L}
function shelfCareOpen(){const L=shelfCareList();const t1=whyTime(BAL.shelf.plant.khacSelf);
 kitModal({kind:"info",title:"Chăm sóc",html:L.length?`<div class="rbtn">${L.map(x=>x.kind==="pet"?pbtn(`data-shc="pet" data-i="${x.i}"`,`Chăm ${x.n.toLowerCase()}`,`thành: mở chăm thú nuôi`,""):pbtn(`data-shc="plant" data-g="${x.g}"`,`Chăm ${x.n.toLowerCase()}`,`tốn: ${BAL.shelf.plant.khacSelf} khắc · thành: cây tươi lại`,t1)).join("")}</div>`:kitFacts(["Chưa có thú nuôi hay chậu cây nào cần chăm."]),btn:"Lui"})}
window.shelfCareOpen=shelfCareOpen;
function shelfPlantBody(e,msg){const P=BAL.shelf.plant;const s=shelfSrvBest(S);const t1=whyTime(P.khacSelf);
 return kitStatRow([{cells:[kitStatCell("","Tươi tốt",Math.round(e.pc|0),{bar:Math.round(e.pc|0),title:`Tươi tốt ${Math.round(e.pc|0)}/100`})]}])+
  kitRows([["Mỗi tuần",[`${s?s.name+" chăm hộ":"không ai chăm"}${s?` (${shelfSrvWord(shelfSrvQ(s))})`:""}`],"n"],["Bỏ bê",["héo thì phòng kém sang, ai thấy cũng chê; héo lâu thì chết khô"],"r"]].concat(msg?[["Vừa rồi",[msg],"n"]]:[]))+
  `<div id="kshpgw"></div><div class="rbtn">${pbtn(`data-shc="water"`,"Tưới, tỉa lá",`tốn: ${P.khacSelf} khắc · thành: Tươi tốt tăng · dừng tưới khi nước vừa đủ (${P.game.rounds} lần)`,t1)}</div>`}
function shelfPlantOpen(g){const e=shelfOf(S).g[g];if(!shelfIsPlant(e))return;SHPC.g=g;SHPC.game=null;try{if(!document.getElementById("modal").hidden)closeModal()}catch(x){}
 kitModal({kind:"info",title:`Chăm ${itm(e.k).n.toLowerCase()}`,sub:shelfGName(g),itemPic:kitItem({src:typeof kitItemSrc==="function"?kitItemSrc(e.k,""):"",name:"",grade:0,size:"lg"}).replace('<span class="kitn"></span>',''),
  html:`<div id="kshp">${shelfPlantBody(e)}</div>`,onClose:()=>{SHPC.g=null;SHPC.game=null}})}
window.shelfPlantOpen=shelfPlantOpen;
/* the care minigame (also the Thử tay calibration entry): water rises step by step; stop it inside the band; score = closeness over the rounds */
function shelfWaterGame(box,done){const G=BAL.shelf.plant.game;let r=0,lv=0,tm=0,sum=0;const stop=()=>clearTimeout(tm);
 const draw=()=>{box.innerHTML=`<div class="rbtn"><button type="button" class="kgbtn" data-shw="stop">Dừng tưới</button></div>`+kitFacts([`Lần ${r+1}/${G.rounds} · nước ${lv}/${G.steps} · vừa đủ: ${G.band[0]}–${G.band[1]}`])};
 const tick=()=>{if(!document.body.contains(box)){stop();return}lv++;if(lv>G.steps){end(0);return}draw();tm=setTimeout(tick,G.ms[0]-(G.ms[0]-G.ms[1])*r/Math.max(1,G.rounds-1))};
 const end=s=>{stop();sum+=s;r++;lv=0;if(r>=G.rounds){SHPC.game=null;done(sum/G.rounds);return}draw();tm=setTimeout(tick,G.ms[0])};
 box.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-shw]");if(!b)return;ev.preventDefault();ev.stopPropagation();
  const d=lv<G.band[0]?G.band[0]-lv:lv>G.band[1]?lv-G.band[1]:0;end(cl(1-d/G.band[0],0,1))});draw();tm=setTimeout(tick,G.ms[0]);SHPC.peek=()=>lv;return stop}
window.shelfWaterGame=shelfWaterGame;
function shelfPlantGain(score){const e=shelfOf(S).g[SHPC.g];if(!e)return;const G=BAL.shelf.plant.gain;const v=Math.round(G[0]+(G[1]-G[0])*score);const p0=e.pc|0;e.pc=cl(p0+v,0,100);e.pm=wk();e.pz=0;
 const msg=`Tươi tốt +${Math.round(e.pc-p0)}${score>=.8?" · rất khéo tay":score<.35?" · chưa khéo":""}.`;log(`Ngươi tự tay tưới, tỉa ${itm(e.k).n.toLowerCase()} (${msg})`);
 const box=document.getElementById("kshp");if(box){box.innerHTML=shelfPlantBody(e,msg);try{if(typeof kitFix==="function")kitFix(box)}catch(x){}}}
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-shc]");if(!b||b.disabled)return;ev.stopPropagation();const k=b.dataset.shc;
 if(k==="pet"){try{closeModal()}catch(x){}petcOpen(+b.dataset.i);return}
 if(k==="plant"){shelfPlantOpen(b.dataset.g);return}
 if(k==="water"){if(SHPC.game||!SHPC.g)return;const c=BAL.shelf.plant.khacSelf;if(c&&!can(c))return;if(c)spend(c);const w=document.getElementById("kshpgw");if(!w)return;
  w.innerHTML=kitGameFrame({art:"Chăm",title:"Tưới, tỉa lá",how:"Nước dâng dần: chạm Dừng tưới khi vừa đủ.",id:"kshpgame"});SHPC.game="water";shelfWaterGame(document.getElementById("kshpgame"),shelfPlantGain)}},true);
/* Thử tay (calibration, OD 17/11 ~17:10Z (3)): every new minigame registers its entry; the calibration page lists window.MG_CAL */
(window.MG_CAL=window.MG_CAL||[]).push({k:"chamcay",n:"Chăm cây (tưới, tỉa lá)",run:box=>new Promise(res=>shelfWaterGame(box,res))});

/* ---------- interim entry points (kit parts only; the shelf screen itself waits for KIT READY) ---------- */
/* item panel (jinv kinvOpen): an act card "Trưng bày" on every displayable piece */
(function(){if(typeof kinvOpen!=="function")return;const k0=kinvOpen;kinvOpen=function(x){const r=k0.apply(this,arguments);if(!BAL.shelf.ui)return r;try{const i=x&&x.g?x.g.i:-1,e=S.inv[i];const g=e&&shelfGrp(e.k);
  if(g){const cur=shelfOf(S).g[g];const card=pbtn(`data-shelfput="${i}"`,"Trưng bày",`thành: bày lên kệ nhóm ${shelfGName(g)}${cur?` thay ${itm(cur.k).n}`:""} · kèm: còn bày thì không tặng hay bán được`,shelfWhyNot(S,e));
   const acts=document.querySelector("#modal .kinvacts"),body=document.querySelector("#modal .kpb");if(acts)acts.insertAdjacentHTML("beforeend",card);else if(body)body.insertAdjacentHTML("beforeend",`<div class="rbtn kinvacts">${card}</div>`)}}catch(e){console.error("shelf kinvOpen",e)}return r}})();
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-shelfput],[data-shelftake]");if(!b||b.disabled)return;ev.stopPropagation();
 if(b.dataset.shelfput!=null){const R=shelfPut(S,+b.dataset.shelfput);try{closeModal()}catch(x){}if(R.ok)log(`Ngươi bày ${R.n} ở Nơi trưng bày${R.old?`, cất ${R.old} vào rương`:""}.`);try{render()}catch(x){}return}
 const n=shelfTake(S,b.dataset.shelftake);try{closeModal()}catch(x){}if(n)log(`Ngươi cất ${n} vào rương.`);try{render()}catch(x){}},true);
/* interim shelf dialog (kit parts only: kitModal + kitRows + pbtn) until the painted shelf part lands: what stands in each group + take down / care */
function shelfOpen(p){p=p||S;const V=shelfView(p),me=p===S;const rows=V.groups.filter(x=>x.item).map(x=>[x.n,[x.item.name+(x.item.plant&&x.item.plant.wither?" (héo úa)":"")],x.item.plant&&x.item.plant.wither?"r":"n"]);
 const acts=me?V.groups.filter(x=>x.item).map(x=>pbtn(x.item.take,`Cất ${x.item.name.toLowerCase()}`,"thành: về rương · tặng, bán, dùng được lại","")+(x.item.plant?pbtn(`data-shc="plant" data-g="${x.g}"`,`Chăm ${x.item.name.toLowerCase()}`,`tốn: ${BAL.shelf.plant.khacSelf} khắc · thành: cây tươi lại`,whyTime(BAL.shelf.plant.khacSelf)):"")).join(""):"";
 kitModal({kind:"info",title:me?"Nơi trưng bày":`Nơi trưng bày của ${p.name}`,html:(rows.length?kitRows(rows):kitFacts([V.known?"Chưa bày món nào.":"Chưa thấy phòng nàng bày gì."]))+(V.lux?kitFacts([`Xa xỉ nơi ở ${V.lux.sc}`]):"")+(acts?`<div class="rbtn">${acts}</div>`:""),btn:"Lui"})}
window.shelfOpen=shelfOpen;
/* the data the kit shelf part will draw (KIT REQUEST 17/11 display-shelf): one slot per group, cut-out picture, no frame */
function shelfView(p){p=p||S;const z=shelfOf(p),me=p===S;let known=me?null:shelfSeen(S,p);
 return{who:me?"me":wdKey(p),groups:BAL.shelf.groups.map(([g,n])=>{const e=z.g[g];if(!e||(!me&&!known))return{g,n,item:null};
   return{g,n,item:{k:e.k,name:itm(e.k).n,src:typeof kitItemSrc==="function"?kitItemSrc(e.k,""):"",lux:shelfPiece(e),plant:shelfIsPlant(e)?{care:Math.round(e.pc|0),wither:(e.pc|0)<BAL.shelf.plant.wither}:null,from:e.from||"",take:me?`data-shelftake="${g}"`:""}}}),
  lux:me||known?{sc:me?shelfLux(p).sc:known.sc,name:me?shelfLux(p).name:SHELF_LV[known.lv]}:null,known:me||!!known}}
window.shelfView=shelfView;
