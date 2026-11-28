/* ================= jallot: LỆ THÁNG CHO MỌI NGƯỜI — hair oil, candles, and the servants' allotment (PARKING LOT #5 owner 17/11 ~08:15Z:
   "các phi tần này, hoặc là các cung nữ, nói chung là tất cả mọi người á, là sẽ được phân phát những cái đồ gì ... hiện tại là tao thấy chỉ có trà và vải")
   History first (law 8): dev/handover/reports/monthly-allotment.md §1 (Qing 宮分: candles 白蠟/黃蠟/羊油蠟 by rank, 頭油 hair oil 桂花油/刨花水,
   servants' monthly silver + seasonal cloth + coarse coal + cheap hair oil, squeezed with their mistress) on top of monthly-ration-history.md.
   Builds on what exists (PRIORITY #1): jstip (BAL.stip goods by rank, stipList / stipGoods, skimming + down map, chest reveal, NPC rule),
   jration (the cosmetics boxes: lxCapRec / lxSpend / lxColRows / lxColPick, first-sight issue, law C price), j42 srvMonth (the player maid),
   the ONE act table BAL.ag.cx (her deck in j2 + the NPC agents in jagacts). Numbers: BAL.allot (ONE CORE).
   1. HAIR OIL (dầu chải tóc): one bottle a month at every rank (law C: the grade rises with rank, never the count), BAL.allot.oil.uses lượt.
      Kiểu cầu kỳ (the high pinned style, col.want "diem") needs it and spends BAL.allot.oil.use a sitting — her mirror (the Kiểu cầu kỳ presets
      are hidden without oil, a note says why), her quick sitting, NPC faces (lxNpcCap → lxCapRec). NPCs spend BAL.allot.oil.npcUse a month.
   2. CANDLES (nến): BAL.allot.light.n a month at every rank, the grade by rank. Studying in the evening buổi (Luyện cầm kỳ thi họa,
      Đọc binh thư — BAL.allot.light.acts) burns one candle for BAL.allot.light.add more of the act's own gain. Her deck (runOpt) and the
      NPC agents' same cx acts (jagacts) — one rule, two-way.
   3. SERVANTS: the player maid (by bậc, BAL.allot.srv.goods) and every NPC maid / eunuch on a consort's staff get their lệ tháng (seasonal
      cloth, hair oil, tea from nhất đẳng up, coarse coal in winter). When her mistress is skimmed by Nội vụ phủ that month, the servants'
      best line is one step worse too (BAL.stip.down). NPC staff keep BAL.allot.srv.keep pieces (older ones are used up).
   BAL.allot.on = false turns it all off (no new lines, no gates). ============ */
Object.assign(BAL,{allot:{on:true,
 oil:{tier:[0,0,0,1,1,2,2,2],n:[1,1,1,1,1,1,1,1],uses:6,use:1,npcUse:2,price:[3,7,12],buyK:.08,shop:[0,1]},
 light:{tier:[0,0,1,1,1,2,2,2],n:[3,3,3,3,3,3,3,3],add:1,acts:["arts","book"],price:[2,4,6],buyK:.04,shop:[0,1],coldN:1},
 srv:{goods:[[["vaitho",1],["aldau0",1]],[["vaibong",1],["aldau0",1]],[["vaibong",1],["aldau0",1]],[["vaibong",1],["aldau0",1],["tragoi",1]],
   [["vaibong",1],["aldau1",1],["tragoi",1]],[["luahang",1],["aldau1",1],["trahop",1]]],/* by bậc (SRK.maid: thô sử … nữ quan): seasonal cloth, hair oil, tea from nhất đẳng */
   cloth:[1,4,7,10],coal:1,keep:4,lau:[["vaitho",1]]}}});
const AL_N={dau:["Nước bào hoa","Dầu hoa quế","Dầu hoa lan ngự chế"],nen:["Nến mỡ dê","Nến sáp vàng","Nến sáp trắng"]};
const AL_OILW="dầu chải tóc";/* the word for the hair-oil family on the mirror */
const AL_ART={dau:"huongtram",nen:"thanbac"};/* stand-in pictures until Foreman C paints img/item-al<kind><t>.webp (listed in CTM_MISSING_PICS) */
function alOn(){return !!(BAL.allot&&BAL.allot.on)}
function alKey(kind,t){return "al"+kind+t}
function alOf(k){const m=/^al(dau|nen)([0-2])$/.exec(String(k||""));return m?{kind:m[1],t:+m[2]}:null}
function alRk(p){return Math.max(0,Math.min(7,(typeof rkOf==="function"?rkOf(p):p.rank)|0))}
/* law C: a piece costs at least buyK × the buyer's bổng (like lxPrice): high ranks pay as much of their purse as low ranks */
function alPrice(p,kind,t){const B=kind==="dau"?BAL.allot.oil:BAL.allot.light;const f=B.price[Math.max(0,Math.min(2,t|0))];if(!p||p.out||(typeof isSrv==="function"&&p===S&&isSrv()))return f;return Math.max(f,Math.ceil(BAL.pay[alRk(p)]*B.buyK))}
/* ---------- the items (into IT: the ONE item table) ---------- */
(function(){const O=BAL.allot.oil,L=BAL.allot.light;
 for(let t=0;t<3;t++){const kd=alKey("dau",t);if(!IT[kd]){IT[kd]={n:AL_N.dau[t],kd:"Dầu chải tóc",d:`Chải tóc vấn Kiểu cầu kỳ: mỗi lần điểm trang kiểu ấy dùng ${O.use} lần · một lọ dùng được ${O.uses} lần · tặng, bán được`,tg:["rv"],al:1};
   Object.defineProperty(IT[kd],"pr",{get(){return alPrice(typeof S!=="undefined"?S:null,"dau",t)},enumerable:true,configurable:true})}
  const kn=alKey("nen",t);if(!IT[kn]){IT[kn]={n:AL_N.nen[t],kd:"Nến",d:`Thắp học đêm: buổi tối luyện cầm kỳ thi họa hay đọc binh thư, thêm ${L.add} điểm của việc ấy, cháy hết một cây · tặng, bán được`,tg:["rv"],al:1};
   Object.defineProperty(IT[kn],"pr",{get(){return alPrice(typeof S!=="undefined"?S:null,"nen",t)},enumerable:true,configurable:true})}}
 try{if(BAL.priceTier)for(let t=0;t<3;t++){if(BAL.priceTier[alKey("dau",t)]==null)BAL.priceTier[alKey("dau",t)]=O.price[t];if(BAL.priceTier[alKey("nen",t)]==null)BAL.priceTier[alKey("nen",t)]=L.price[t]}}catch(e){}
 try{if(typeof STIP_UNIT==="object")for(let t=0;t<3;t++){STIP_UNIT[alKey("dau",t)]="lọ";STIP_UNIT[alKey("nen",t)]="cây"}}catch(e){}
 try{if(typeof SHOP_ALL==="object"){for(const t of O.shop)SHOP_ALL.push(alKey("dau",t));for(const t of L.shop)SHOP_ALL.push(alKey("nen",t))}}catch(e){}
 /* skimming (jstip): one grade worse, the lowest goes missing */
 try{if(BAL.stip&&BAL.stip.down)for(let t=0;t<3;t++){BAL.stip.down[alKey("dau",t)]=t>0?alKey("dau",t-1):null;BAL.stip.down[alKey("nen",t)]=t>0?alKey("nen",t-1):null}}catch(e){}})();
/* art: the stand-in picture at the right grade until painted (AL_PAINTED lists the painted keys) */
const AL_PAINTED={};
(function(){if(typeof itemArt!=="function")return;const a0=itemArt;itemArt=function(key,tier){const k=key&&typeof key==="object"?key.k:key;const r=alOf(k);if(!r)return a0.apply(this,arguments);
  if(AL_PAINTED[k])return{key:k,src:`img/item-${k}.webp`,src512:`img/item512/item-${k}.webp`,grade:r.t,gradeName:ITEM_GRADE[r.t]};
  try{window.CTM_MISSING_PICS=window.CTM_MISSING_PICS||[];if(!CTM_MISSING_PICS.some(x=>x.kind==="item"&&x.id===k))CTM_MISSING_PICS.push({kind:"item",id:k,title:IT[k].n})}catch(e){}
  const s=a0(AL_ART[r.kind]);return s?{key:k,src:s.src,src512:s.src512,grade:r.t,gradeName:ITEM_GRADE[r.t],ph:1}:null};window.itemArt=itemArt})();
/* ---------- pieces: a bottle carries its lượt u (filled on first sight: old saves, gifts, shop, stolen goods) ---------- */
function alFix(p){if(!p||!p.inv)return;for(const e of p.inv){const r=e&&alOf(e.k);if(r&&r.kind==="dau"&&!(e.u>=0))e.u=BAL.allot.oil.uses}}
function alOil(p){alFix(p);return (p&&p.inv||[]).filter(e=>{const r=e&&alOf(e.k);return r&&r.kind==="dau"&&e.u>0&&!e.h})}
function alCandle(p){return (p&&p.inv||[]).filter(e=>{const r=e&&alOf(e.k);return r&&r.kind==="nen"&&!e.h})}
function alHasOil(p){return alOil(p).length>0}
/* ---------- 1+2. the monthly lines of a consort (through jstip stipList: rank text, chest, skimming, NPCs all follow) ---------- */
function alLines(r,out){const O=BAL.allot.oil,L=BAL.allot.light;r=Math.max(0,Math.min(7,r|0));
 if(out)return [[alKey("nen",0),L.coldN]];return [[alKey("dau",O.tier[r]),O.n[r]],[alKey("nen",L.tier[r]),L.n[r]]]}
(function(){if(typeof stipList!=="function")return;const l0=stipList;stipList=function(r,out){const L=l0.apply(this,arguments);try{if(alOn())L.push(...alLines(r,out))}catch(e){console.error("al list",e)}return L}})();
/* the skim of the month is remembered on the person (the servants' allotment follows the mistress) */
(function(){if(typeof stipSkim!=="function")return;const s0=stipSkim;stipSkim=function(p){const r=s0.apply(this,arguments);try{if(r&&p)stipSt(p).skT=S.turn}catch(e){}return r};window.stipSkim=stipSkim})();
function alSkimmed(p){try{return !!p&&p.stip&&p.stip.skT===S.turn}catch(e){return false}}
/* NPC consort month: spend the past month's hair oil BEFORE the issue (as lxNpcSpend), then her staff's lệ; her own and her staff's after jstip */
(function(){if(typeof stipGoods!=="function")return;const g0=stipGoods;stipGoods=function(p,SK){try{if(alOn()&&p&&p!==S&&!p.coop)alNpcSpend(p)}catch(e){console.error("al spend",e)}
  const G=g0.apply(this,arguments);try{if(alOn()&&p){alFix(p);alStaffGive(p,!!SK)}}catch(e){console.error("al goods",e)}return G};window.stipGoods=stipGoods})();
function alNpcSpend(v){if(!v||!v.inv||v.out)return;let left=BAL.allot.oil.npcUse;for(const e of alOil(v).sort((a,b)=>a.u-b.u)){const n=Math.min(left,e.u);e.u-=n;left-=n;if(e.u<=0){typeof ilUsedUp==="function"&&ilUsedUp(e,v);v.inv.splice(v.inv.indexOf(e),1)}if(!left)break}}
/* first sight (new life / old save): one month's oil + candles so Kiểu cầu kỳ is not shut on day one */
function alInit(p){if(!p||!alOn()||p.alInit)return;p.alInit=1;p.inv=p.inv||[];for(const [k,n] of alLines(alRk(p),!!p.out))for(let i=0;i<n;i++)invAdd(p,{k,from:"noivu",d:S.turn});alFix(p)}
function alInitAll(){try{if(!S||S.dead||!alOn())return;if(typeof isSrv==="function"&&isSrv()){S.alInit=1;return}alInit(S);if(typeof mlGuest==="function"&&mlGuest())return;for(const v of consorts())if(v!==S&&v.alive!==false)alInit(v)}catch(e){console.error("alInit",e)}}
/* ---------- 1. hair oil at the sitting: Kiểu cầu kỳ needs it (her, NPC faces) and spends it ---------- */
(function(){if(typeof lxCapRec!=="function")return;const c0=lxCapRec;lxCapRec=function(p,rec){const r=c0.apply(this,arguments);try{if(alOn()&&rec&&rec.makeup&&rec.col&&rec.col.want==="diem"&&!alHasOil(p)){delete rec.col.want;rec.noOil=1}}catch(e){}return r};window.lxCapRec=lxCapRec})();
(function(){if(typeof lxSpend!=="function")return;const s0=lxSpend;lxSpend=function(p,rec,col){const wantB=!!(col&&col.want==="diem");const R=s0.apply(this,arguments);
  try{if(alOn()&&wantB&&rec&&rec.makeup&&p){const L=alOil(p);if(L.length){const e=L.slice().sort((a,b)=>a.u-b.u)[0];e.u-=Math.min(e.u,BAL.allot.oil.use);R.oil=e;if(e.u<=0){typeof ilUsedUp==="function"&&ilUsedUp(e,p);p.inv.splice(p.inv.indexOf(e),1);(R.gone=R.gone||[]).push(e)}}}}catch(e){console.error("al oil",e)}return R};window.lxSpend=lxSpend})();
/* her mirror: without oil the Kiểu cầu kỳ presets are not offered, the pick falls back, the note says why */
(function(){if(typeof lxColRows!=="function")return;const r0=lxColRows;lxColRows=function(rows){const R=r0.apply(this,arguments);/* makeup-set (owner OD 25/11 ~23:20Z, LUẬT SỬA CẢ NHÓM): without hair oil the Kiểu cầu kỳ sets stay on the mirror GREYED with why (never hidden) */
 try{if(alOn()&&!alHasOil(S))return R.map(r=>{if(!(r&&/^pre-/.test(r.k)&&(r.items||[]).every(i=>{const x=TOIL_PRE.find(y=>y[0]===i.k);return x&&x[2]==="diem"})))return r;
  return Object.assign({},r,{items:r.items.map(i=>Object.assign({},i,{off:true,why:i.off&&i.why?`thiếu ${AL_OILW}; ${i.why}`:`thiếu ${AL_OILW} để vấn tóc cao. Đường kiếm: ${LX_ROADS}`})),note:LX_SETNOTE})})}catch(e){}return R};window.lxColRows=lxColRows})();
(function(){if(typeof lxColPick!=="function")return;const p0=lxColPick;lxColPick=function(col){const c=p0.apply(this,arguments);try{if(alOn()&&c&&c.want==="diem"&&!alHasOil(S))delete c.want}catch(e){}return c};window.lxColPick=lxColPick})();
(function(){if(typeof lxMirrorNote!=="function")return;const n0=lxMirrorNote;lxMirrorNote=function(){const h=n0.apply(this,arguments);try{if(!alOn())return h;const L=alOil(S);const u=L.reduce((a,e)=>a+e.u,0);
  const row=L.length?["Dầu chải tóc",`${L.map(e=>IT[e.k].n).filter((x,i,a)=>a.indexOf(x)===i).join(", ")}, còn ${u} lần dùng`,"n"]:["Dầu chải tóc","hết: không vấn được Kiểu cầu kỳ · mua ở hàng rong, Nội vụ phủ phát đầu tháng","r"];
  return h+`<div class="kgr">${kitRows([row])}</div>`}catch(e){return h}};window.lxMirrorNote=lxMirrorNote})();
/* ---------- 2. candles: the evening study acts burn one for a bigger gain (one rule for her deck and the NPC agents) ---------- */
function alEvening(){try{return (S.buoi||0)===(typeof B4L!=="undefined"?B4L:3)}catch(e){return false}}
/* p studied (act key k of BAL.ag.cx) — in the evening with a candle: burn it, add light.add to each stat the act gains */
function alLight(p,k){try{const L=BAL.allot.light;if(!alOn()||!p||!L.acts.includes(k)||!alEvening())return 0;const C=alCandle(p);if(!C.length)return 0;
 const e=C.slice().sort((a,b)=>a.k<b.k?-1:1)[0];typeof ilUsedUp==="function"&&ilUsedUp(e,p);p.inv.splice(p.inv.indexOf(e),1);const D=BAL.ag.cx[k];const fx={};for(const s in D.w)if(s!=="maid"&&D.w[s]>0)fx[s]=L.add;
 if(p===S)apply(fx);else ap(p,fx);return {e,fx}}catch(x){console.error("al light",x);return 0}}
/* her deck: the two study cards of j2 carry cx:"arts"/"book"; the card says what a candle adds (text = effect) */
(function(){if(typeof runOpt!=="function")return;const r0=runOpt;runOpt=function(a){const r=r0.apply(this,arguments);try{if(r===true&&a&&a.cx&&p0ok()){const R=alLight(S,a.cx);
  if(R)log(`Ngươi thắp ${IT[R.e.k].n} học đến khuya: ${Object.keys(R.fx).map(s=>`${NAMES[s]||s} +${R.fx[s]}`).join(", ")} thêm.`)}}catch(e){console.error("al runOpt",e)}return r}})();
function p0ok(){return !!(S&&!S.dead&&!(typeof isSrv==="function"&&isSrv()))}
function alLightNote(k){const L=BAL.allot.light;if(!alOn()||!L.acts.includes(k))return"";const D=BAL.ag.cx[k];const s=Object.keys(D.w).filter(x=>x!=="maid"&&D.w[x]>0).map(x=>`${NAMES[x]||x} +${L.add}`).join(", ");
 return `buổi tối có nến thì thắp học khuya: ${s} thêm · kèm: cháy một cây nến`}/* " · kèm: " = the card's red Kèm row (j19 cardH): the candle is the cost */
/* ---------- 3. the servants' lệ tháng ---------- */
function alSrvList(rk,lau){const B=BAL.allot.srv;if(lau)return B.lau.map(x=>x.slice());const L=B.goods[Math.max(0,Math.min(B.goods.length-1,rk|0))].map(x=>x.slice());
 /* seasonal clothing (四季衣裳): cloth only in the months of a new season; coarse coal in winter */
 const m=(S&&S.month)||1;const out=L.filter(([k])=>!(IT[k]&&IT[k].kd==="Vải vóc")||B.cloth.includes(m));if(typeof stipWinter==="function"&&stipWinter())out.push(["thanden",B.coal]);return out}
/* one step worse on the dearest line when the mistress was skimmed (jstip down map) */
function alSrvSkim(L){const D=BAL.stip.down;const ix=L.map((x,i)=>i).filter(i=>L[i][0] in D).sort((a,b)=>((IT[L[b][0]]&&itm(L[b][0]).pr)||0)-((IT[L[a][0]]&&itm(L[a][0]).pr)||0))[0];
 if(ix==null)return {L,cut:null};const k0=L[ix][0],k=D[k0];const M=L.slice();if(k)M[ix]=[k,M[ix][1]];else M.splice(ix,1);return {L:M,cut:{k0,k}}}
function alSrvTxt(rk){const B=BAL.allot.srv;const L=B.goods[Math.max(0,Math.min(B.goods.length-1,rk|0))];
 return L.map(([k,n])=>(IT[k]&&IT[k].kd==="Vải vóc"?"đầu mùa ":"")+stipNm(k,n)).join(", ")+`, mùa đông ${stipNm("thanden",B.coal)}`}/* BIG #10 1c: commas, not a «·» chain */
/* the player maid: after her wage (j42 srvMonth) */
function alSrvMonth(){try{if(!alOn()||!S||S.dead||!(typeof isSrv==="function"&&isSrv())||!S.srv)return;const m=typeof srvM==="function"?srvM():null;
 let L=alSrvList(S.srv.rk,(S.srv.lau||0)>0);let cut=null;if(m&&alSkimmed(m)&&!(S.srv.lau>0)){const x=alSrvSkim(L);L=x.L;cut=x.cut}
 S.inv=S.inv||[];const E=[];for(const [k,n] of L)if(IT[k])for(let i=0;i<n;i++){const e={k,from:"noivu",d:S.turn};invAdd(S,e);E.push(e)}alFix(S);
 const cutTxt=cut?` Chủ nhân ${m.name} bị Nội vụ phủ cắt xén, lệ của kẻ hầu cũng bị bớt: ${cut.k?`${itm(cut.k).n} thay ${itm(cut.k0).n}`:`thiếu ${itm(cut.k0).n}`}.`:"";
 if(E.length){log(`Lệ tháng của cung nữ: ${stipGoodsTxt(L.map(([k,n])=>({k,n})))}.${cutTxt}`);if(typeof stipReveal==="function")stipReveal(E,{kind:"chest",title:"Lệ tháng",sub:cut?"Nội vụ phủ phát · bị bớt theo chủ":"Nội vụ phủ phát"})}
 else if(cutTxt)log(cutTxt.trim())}catch(e){console.error("al srv",e)}}
(function(){if(typeof srvMonth!=="function")return;const m0=srvMonth;srvMonth=function(){const r=m0.apply(this,arguments);alSrvMonth();return r};window.srvMonth=srvMonth})();
/* NPC staff (and her own staff): the same list by their bậc, into their own small bag (kept to BAL.allot.srv.keep, older pieces used up) */
function alStaffGive(p,skim){if(!p||!Array.isArray(p.staff)||p.out)return;const B=BAL.allot.srv;
 for(const s of p.staff){if(!s||s.sid==null||s.out||s.dead)continue;const rk=typeof srk==="function"?srk(s):0;let L=alSrvList(rk,false);if(skim)L=alSrvSkim(L).L;
  s.inv=Array.isArray(s.inv)?s.inv:[];for(const [k,n] of L)if(IT[k])for(let i=0;i<n;i++)invAdd(s,{k,from:"noivu",d:S.turn});alFix(s);if(s.inv.length>B.keep)s.inv.splice(0,s.inv.length-B.keep).forEach(e=>{/* E-FIX-3: older hair oil (lượt left) goes back to the Nội vụ phủ counted stock, issued again first (law 6c) */if(alOf(e.k)&&typeof ilStock==="function")ilStock(e,1,s)})}}
/* the maid's help line (kit help popup of j42 "Lương tháng") names the lệ goods too */
(function(){try{if(typeof HX==="object"){const w0=HX.wage;Object.defineProperty(HX,"wage",{get(){try{return alOn()&&S&&S.srv?`${w0} Kèm lệ tháng của bậc ngươi: ${alSrvTxt(S.srv.rk)}. Chủ nhân bị Nội vụ phủ cắt xén thì lệ kẻ hầu cũng bị bớt.`:w0}catch(e){return w0}},configurable:true,enumerable:true})}}catch(e){}})();
/* ---------- item detail: lượt left of a bottle (kit detail rows' own note line) ---------- */
(function(){if(typeof kitItemDetailRows!=="function")return;const d0=kitItemDetailRows;kitItemDetailRows=function(ref,o){try{const k=ref&&(typeof ref==="string"?ref:ref.k||(ref.e&&ref.e.k));const r=alOf(k);
  if(r&&r.kind==="dau"){alFix(S);const E=(S.inv||[]).filter(e=>e&&e.k===k);if(E.length){o=Object.assign({},o||{});o.note=[].concat(o.note||[],typeof kitUseNote==="function"?kitUseNote(E,{unit:"lọ"}):[`còn ${E.reduce((a,e)=>a+(e.u|0),0)} lần dùng`])}}}catch(e){}return d0.call(this,ref,o)};window.kitItemDetailRows=kitItemDetailRows})();
/* ---------- first sight on load / new life ---------- */
(function(){const g=window.render;if(typeof g!=="function")return;window.render=function(){try{if(S&&!S.alInit)alInitAll()}catch(e){}return g.apply(this,arguments)}})();
window.alOf=alOf;window.alLight=alLight;window.alLightNote=alLightNote;window.alSrvMonth=alSrvMonth;window.alStaffGive=alStaffGive;window.alInitAll=alInitAll;window.alHasOil=alHasOil;window.alPrice=alPrice;
