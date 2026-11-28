/* ================= jseason: LỆ THEO MÙA + «PHÁT BÙ ĐỦ LỆ, DƯ THÌ QUY BẠC» (owner OD 27/11 ~05:10Z: "có những cái món đồ mà cấp xong cái không có
   thấy xài, cái nó cứ nằm ở đó hoài ... cấp vải là cái việc mà mình nên cấp theo mùa"; plan dev/handover/reports/allot-season-plan.md @6a13cd58,
   adopted by MAIN 172 ~05:40Z). History (law 8): Qing 宮分 cloth counted per year / by season (換季 3rd + 9th month), unused allowance commuted to
   silver (折銀), old tea goes musty; NO recorded penalty for a palace woman in last season's dress → gain only.
   Numbers: BAL.stip.cloth / keep / teaAge / ban (jstip, ONE CORE). Loads after jstip, jration, jallot, jeitem (outermost stipGoods wrapper).
   1. CLOTH BY SEASON: jstip stipList issues the cloth line only in BAL.stip.cloth.m (one bolt, grade by rank). A garment sewn now carries the
      season (wdSew → e.sea); worn in the same half of the year (Xuân·Hạ / Thu·Đông) it gives Sắc +BAL.stip.cloth.fit (wearBonus).
   2. CEILING (her and every NPC, law 1; replaces the silent NPC npcKeep trim, law 14): at the monthly issue, a line whose stock in the chest is
      already at BAL.stip.keep gets no new piece; the piece's value at the Nội vụ phủ buy-back price (econPrice: BAL.stip.resell) is paid in bạc
      instead (law 6c: the piece is never made, its value is in the purse, the frame row and the log; NPC: p.stip.qb). Skimmed months: the silver
      part loses BAL.stip.cutSmall like the bổng.
   3. STALE TEA: issued tea older than BAL.stip.teaAge months turns into Trà mốc in place (same piece, its key changes; her line says so).
   4. BAN CHO KẺ HẦU (the Nhẹ road for stock she has; Vừa = Bán, Nặng = Tặng are the existing buttons): the piece goes to her cung nữ's bag,
      the maid's thiện cảm +BAL.stip.ban.maid. One rule for every consort (ssBan(p, ix)).
   BAL.stip.keep.on = false → no ceiling (the season cloth and stale tea stay: they are the rule now). ================= */
function ssOn(){try{return !!(BAL.stip.keep&&BAL.stip.keep.on)}catch(e){return false}}
/* the line a piece belongs to (the key of BAL.stip.keep) */
function ssFam(k){const it=IT[k];if(!it)return null;
 try{if(typeof lxOf==="function"&&lxOf(k))return "lx:"+lxOf(k).part}catch(e){}
 try{if(typeof alOf==="function"&&alOf(k))return alOf(k).kind}catch(e){}
 if(k==="vaitho"||(it.kd==="Vải vóc"&&itm(k).dr))return "vai";if(it.kd==="Trà")return "tra";if(it.kd==="Than sưởi")return "than";
 if(k==="yensao"||k==="nhansam")return k;return null}
function ssCap(f){const K=BAL.stip.keep;if(!f)return Infinity;const v=K[/^lx:/.test(f)?"lx":f];return v==null?Infinity:v}
/* pieces in stock: not hidden, not worn, not spent (boxes/bottles with lần left) */
function ssStock(p,f){return (p.inv||[]).filter(e=>e&&!e.h&&!e.w&&!e.t&&ssFam(e.k)===f&&(e.u==null||e.u>0)).length}
function ssVal(p,e){try{if(typeof econPrice==="function")return Math.max(0,econPrice(p,e)|0)}catch(x){}return Math.floor(((IT[e.k]&&itm(e.k).pr)||0)*BAL.stip.resell/100)}
/* 3. tea goes musty (before the issue: one rule, her and NPCs) */
function ssStale(p){let n=0;for(const e of p.inv||[]){if(!e||e.h||(e.k!=="tragoi"&&e.k!=="trahop"))continue;if(e.d==null){e.d=S.turn;continue}
  if(S.turn-e.d>=BAL.stip.teaAge){e.k="tramoc";n++}}return n}
/* 2. the ceiling on what was just issued */
function ssCeil(p,G,SK){let qb=0;const L=[];const have={};
 for(const g of G||[]){if(g.lost||!g.E||!g.E.length)continue;const f=ssFam(g.k);if(!f||ssCap(f)===Infinity)continue;
  if(have[f]==null)have[f]=ssStock(p,f)-g.E.filter(e=>p.inv.includes(e)).length;/* stock before this issue */
  const keep=[];let n=0,v=0;for(const e of g.E){if(have[f]<ssCap(f)){keep.push(e);have[f]++;continue}
   const i=p.inv.indexOf(e);if(i>=0)p.inv.splice(i,1);/* RV-187 (law 6c): an NPC candle / hair oil the issue took out of the Nội vụ phủ COUNTED stock (jstip ilStockTake) goes back there — never issued, never lost */if(e.stk&&typeof ilStock==="function")ilStock(e,1,p);n++;v+=ssVal(p,e)}
  if(n){g.E=keep;g.n=keep.length;g.qbN=n;g.qbV=v;qb+=v;L.push(stipNm(g.k,n).replace(/^\d+ \S+ /,""))}}
 if(qb&&SK)qb=Math.floor(qb*(1-BAL.stip.cutSmall));
 if(qb){ap(p,{bac:qb});const st=stipSt(p);st.qb=(st.qb||0)+qb;st.qbM={turn:S.turn,v:qb,L}}
 G.qb=qb;G.qbL=L;return qb}
(function(){if(typeof stipGoods!=="function")return;const g0=stipGoods;stipGoods=function(p,SK){let st=0;try{if(p&&!p.dead)st=ssStale(p)}catch(e){console.error("ss stale",e)}
  const G=g0.apply(this,arguments);try{if(st)G.stale=st;if(ssOn()&&p&&!p.dead)ssCeil(p,G,SK)}catch(e){console.error("ss ceil",e)}return G};window.stipGoods=stipGoods})();
/* the frame row «Đồ phát» and the log line say it (one text) */
(function(){if(typeof stipGoodsTxt!=="function")return;const t0=stipGoodsTxt;stipGoodsTxt=function(G){
  /* a line paid wholly in silver is said once, in the quy bạc part (never «0 súc …») */
  let t=t0.call(this,Array.isArray(G)?G.filter(g=>!(g.qbN&&!g.n)):G)||"";try{
  if(G&&G.qb)t+=`${t?"; ":""}rương còn đủ ${G.qbL.join(", ")}: Nội vụ phủ quy ra ${G.qb} lượng bạc`;
  if(G&&G.stale)t+=`${t?"; ":""}${G.stale} phần trà để lâu đã mốc`}catch(e){}return t};window.stipGoodsTxt=stipGoodsTxt})();
/* the chest shows the silver too */
(function(){if(typeof stipShow!=="function")return;const s0=stipShow;stipShow=function(G,net){const a=[...arguments];try{if(G&&G.qb)a[1]=(net||0)+G.qb}catch(e){}return s0.apply(this,a)};window.stipShow=stipShow})();
/* 1. the garment knows its season; worn in its half of the year → Sắc +fit */
const SS_HALF={"Xuân":"nong","Hạ":"nong","Thu":"lanh","Đông":"lanh"};
function ssSeaNow(){try{return SEASON[S.month-1]}catch(e){return""}}
function ssFit(p){try{const w=wdOf(p),e=w&&w.y;return e&&e.sea&&SS_HALF[e.sea]===SS_HALF[ssSeaNow()]?BAL.stip.cloth.fit:0}catch(e){return 0}}
(function(){if(typeof wdSew!=="function")return;const s0=wdSew;wdSew=function(p,fk){const e=s0.apply(this,arguments);try{if(e)e.sea=ssSeaNow()}catch(x){}return e};window.wdSew=wdSew})();
(function(){if(typeof wearBonus!=="function")return;const w0=wearBonus;wearBonus=function(p){const b=w0.apply(this,arguments);try{const f=p&&ssFit(p);if(f){b.sac=(b.sac||0)+f;b.ssFit=f}}catch(e){}return b};window.wearBonus=wearBonus})();
function ssSewTxt(k){try{const g=typeof wdFabOf==="function"?wdFabOf(k):null;const n=g&&WD_ITEMS[g]?WD_ITEMS[g].n:"y phục";const s=ssSeaNow();
  return `thành: ${n}, áo mùa ${s.toLowerCase()} · mặc hợp mùa (${SS_HALF[s]==="nong"?"xuân, hạ":"thu, đông"}): Sắc +${BAL.stip.cloth.fit}`}catch(e){return "thành: y phục"}}
/* 4. ban cho kẻ hầu: the allotment lines only */
function ssBanOk(k){const f=ssFam(k);return !!f&&k!=="tramoc"&&k!=="vaitho"}
function ssBan(p,ix){const e=p.inv&&p.inv[ix];if(!e||e.h||e.w||!ssBanOk(e.k))return"";const m=p===S?S.maid:p.maid;if(!m)return"";
 p.inv.splice(ix,1);m.inv=m.inv||[];m.inv.push(Object.assign({},e,{from:"ban",giver:p.name||""}));ap(p,{maid:BAL.stip.ban.maid});
 return `${p===S?"Ngươi":p.name} ban ${itm(e.k).n} cho ${m.name}. Thiện cảm của cung nữ ${balSg(BAL.stip.ban.maid)}. `}
(function(){if(typeof itemAct!=="function")return;const i0=itemAct;itemAct=function(a,ix){if(a==="ban"){if(S.dead||Q.length)return;const r=ssBan(S,ix);if(r){log(r);render()}return}return i0.apply(this,arguments)}})();
window.ssBan=ssBan;window.ssFam=ssFam;window.ssFit=ssFit;
