/* dev/test/set-bonus-check.js — DISPLAY SHELF SET BONUS (bộ) checks, review/display-set-bonus (owner OD 17/11 ~20:42Z/~20:47Z/~21:10Z, table APPROVED ~21:15Z).
   Run after dev/site/build_site.sh:  node dev/test/set-bonus-check.js
   1 table (26 sets / 12 groups, one set per piece, sizes 2/3/5, never Sủng, 6 new pieces exist) · 2 each size (pair Sắc via wearBonus, triple Đức, five Tài)
   3 nothing between checks / break → take back at once / regain at the next whole check (take down, wither, over-rank) · 4 cap (6, Danh ≤ 3) · 5 minus
   6 NPC parity (same table, same week pass) + co-op guest runs only her · 7 old save · 8 counted once (effSac, worn chips exclude set Sắc) · 9 player text.
   Exit 1 on any FAIL. Prints tables for the report. */
const {chromium}=require('playwright');const D=require('./lib/device');
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold');const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const g=await D.openHost(p,srv.url,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});
 await g.evaluate(()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<40;i++){window.__forceOrigin=null;start();if(!(S.origin&&S.origin.k==='cnv')&&!(window.isSrv&&isSrv()))break}window.__nlInner=0;
  ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});for(let j=0;j<10&&Q.length;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(0);else closeModal()}catch(e){Q.shift()}}});
 const R=await g.evaluate(()=>{const out={fail:[],T:{}};const F=(c,m)=>{if(!c)out.fail.push(m)};const B=BAL.shelf.set,T=B.s;
  /* 1 TABLE */
  const ids=Object.keys(T),grp=new Set(ids.map(i=>T[i].g)),seen={};let dup=[],badM=[],badG=[],badSz=[],sung=[];
  for(const id of ids){const x=T[id];if(!(x.m.length in B.size))badSz.push(id);if(x.st==="sung"||(x.minus&&x.minus.sung))sung.push(id);
   for(const m of x.m){if(seen[m])dup.push(m+" in "+seen[m]+"+"+id);seen[m]=id;if(m.startsWith("tp:")){if(BAL.shelf.tp[m.slice(3)]!==x.g)badG.push(m)}else if(!BAL.shelf.it[m]||!IT[m])badM.push(m);else if(BAL.shelf.it[m].g!==x.g)badG.push(m);
    if(!m.startsWith("tp:")&&BAL.shelf.it[m]&&(BAL.shelf.it[m].imp||BAL.shelf.it[m].dead))badM.push(m+" imp/dead")}}
  const NEW=["sonthuy","hoadieu","hophuong","nhatquy","butlong","muchuy"];const newBad=NEW.filter(k=>!(IT[k]&&IT[k].kd==="Bày biện"&&BAL.shelf.it[k]&&seen[k]));
  out.T.table={sets:ids.length,groups:grp.size,bySize:[2,3,5].map(n=>n+":"+ids.filter(i=>T[i].m.length===n).length).join(" "),minus:ids.filter(i=>T[i].minus).join(","),newPieces:NEW.map(k=>k+"="+(IT[k]?IT[k].n:"?")).join(", ")};
  F(ids.length===26,"sets "+ids.length+" ≠ 26");F(grp.size===12,"groups "+grp.size+" ≠ 12");F(!dup.length,"a piece in two sets: "+dup.join(";"));F(!badM.length,"unknown member: "+badM.join(","));
  F(!badG.length,"member of another group: "+badG.join(","));F(!badSz.length,"size not 2/3/5: "+badSz.join(","));F(!sung.length,"a set touches Sủng: "+sung.join(","));F(!newBad.length,"new piece missing: "+newBad.join(","));
  /* helpers: a clean room for p, place keys (ngự ban = never a vượt phẩm wait) */
  const clean=x=>{x.shelf={g:{},sd:1};delete x.shSet};const put=(x,keys,emp=true)=>{for(const k of keys){x.inv=x.inv||[];x.inv.push({k,from:emp?"emp":"me"});const r=shelfPut(x,x.inv.length-1);if(!r.ok)out.fail.push("put "+k+": "+r.why)}};
  const slotOf=(x,k)=>Object.keys(x.shelf.g).find(s=>x.shelf.g[s].k===k);
  const rk0=S.rank;S.rank=5;/* high enough that no member is above rank (over-rank tested apart) */
  clean(S);const base={sac:effSac(S),duc:S.duc,tai:S.tai,danh:S.danh,th:S.th,hh:S.hh,sung:S.sung};
  /* 2 EACH SIZE */
  put(S,["quattron","quatgap"]);F(effSac(S)===base.sac,"pair counted before the weekly check");shelfSetCheck(S);
  const sacP=effSac(S)-base.sac,shSac=wearBonus(S).shSac|0;
  put(S,["lanquy","cuc","maitrang"]);shelfSetCheck(S);const ducP=S.duc-base.duc;
  put(S,["nghien","tranchi","thaiho","butlong","muchuy"]);shelfSetCheck(S);const taiP=S.tai-base.tai;
  out.T.sizes={pair_sac:sacP,shSac,triple_duc:ducP,five_tai:taiP,ids:S.shSet.ids.join(",")};
  F(sacP===B.size[2]&&shSac===B.size[2],"pair Sắc "+sacP+" ≠ "+B.size[2]);F(ducP===B.size[3],"triple Đức "+ducP);F(taiP===B.size[5],"five Tài "+taiP);F(S.sung===base.sung,"Sủng moved");
  /* 8 COUNTED ONCE: effSac = sac + wearBonus once; the worn-only chips leave the set Sắc out */
  {const wb=wearBonus(S);F(effSac(S)===Math.min(130,Math.max(0,S.sac+wb.sac)),"effSac does not read wearBonus once");out.T.once={effSac:effSac(S),sac:S.sac,wbSac:wb.sac,setSac:wb.shSac|0}}
  /* 3 BREAK + REGAIN: take a member → back at once; put it back → nothing until the check; check → back again */
  {const d0=S.duc;shelfTake(S,slotOf(S,"cuc"));const dTake=S.duc-d0;const iv=S.inv.findIndex(e=>e.k==="cuc");shelfPut(S,iv);const dPut=S.duc-d0;shelfSetCheck(S);const dChk=S.duc-d0;
   out.T.breakTake={take:dTake,putBack:dPut,check:dChk};F(dTake===-B.size[3]&&dPut===-B.size[3]&&dChk===0,"take/put/check Đức "+[dTake,dPut,dChk])}
  {const s0=effSac(S);const sl=slotOf(S,"quatgap");const e=S.shelf.g[sl];shelfTake(S,sl);const sT=effSac(S)-s0;shelfPut(S,S.inv.indexOf(e));const sP=effSac(S)-s0;shelfSetCheck(S);
   out.T.breakSac={take:sT,putBack:sP,check:effSac(S)-s0};F(sT===-B.size[2]&&sP===-B.size[2]&&effSac(S)===s0,"Sắc take/put/check "+[sT,sP,effSac(S)-s0])}
  /* withered plant breaks (no wait for the week), cared back → regained at the next check */
  {const d0=S.duc,e=S.shelf.g[slotOf(S,"lanquy")];e.pc=BAL.shelf.plant.wither-1;shelfSetSync(S);const dW=S.duc-d0;const line=(shelfSetLines(S).find(x=>x.id==="tqt")||{}).t;
   e.pc=BAL.shelf.plant.start;shelfSetSync(S);const dS=S.duc-d0;shelfSetCheck(S);out.T.wither={withered:dW,line,caredNoCheck:dS,check:S.duc-d0};F(dW===-B.size[3]&&dS===-B.size[3]&&S.duc===d0,"wither break/regain "+[dW,dS,S.duc-d0])}
  /* the weekly pass itself (shelfWeek) keeps the sets (plants tended) */
  {const d0=S.duc,t0=S.tai;for(const s in S.shelf.g){const e=S.shelf.g[s];if(e.pc!=null)e.pc=100}shelfWeek();out.T.week={duc:S.duc-d0,tai:S.tai-t0};F(S.duc===d0&&S.tai===t0,"shelfWeek lost a whole set")}
  /* over-rank piece (not ngự ban) = a vượt phẩm charge waits on it → the set does not count; ngự ban above rank counts */
  {const v0=S.rank;clean(S);S.rank=1;const t0=S.tai;put(S,["dancoc","tyba","dantranh"],false);shelfSetCheck(S);const own=S.tai-t0;clean(S);S.tai=t0;put(S,["dancoc","tyba","dantranh"],true);shelfSetCheck(S);const ngu=S.tai-t0;
   out.T.overRank={rank:1,ownBought:own,nguBan:ngu};F(own===0&&ngu===B.size[3],"over-rank rule "+[own,ngu]);clean(S);S.tai=t0;S.rank=v0}
  /* 4 CAP: every set at once → plus ≤ cap, Danh ≤ capDanh */
  {const all=Object.keys(T);const P=shelfSetPts(all);let plus=0;for(const id in P.per)plus+=P.per[id].v;const dn=Object.values(P.per).filter(x=>x.st==="danh").reduce((a,x)=>a+x.v,0);
   out.T.cap={allSets:plus,danh:dn,o:JSON.stringify(P.o)};F(plus===B.cap,"cap "+plus+" ≠ "+B.cap);F(dn<=B.capDanh,"Danh "+dn+" > "+B.capDanh);F(!P.o.sung,"cap gives Sủng")}
  /* real room at the cap: Ngũ bảo (Tài 3) + Dây (Tài 2) + Tam quân tử (Đức 2) → 6 (one point clipped) */
  {clean(S);const t0=S.tai,d0=S.duc;put(S,["nghien","tranchi","thaiho","butlong","muchuy","dancoc","tyba","dantranh","lanquy","cuc","maitrang"]);shelfSetCheck(S);out.T.capRoom={tai:S.tai-t0,duc:S.duc-d0};
   F((S.tai-t0)+(S.duc-d0)===B.cap,"room above cap: "+((S.tai-t0)+(S.duc-d0)));clean(S);S.tai=t0;S.duc=d0}
  /* 5 MINUS: Ngự diêu Danh +2, Thái hậu & Hoàng hậu −1; Cơ giới Tây Thái hậu −1 */
  {clean(S);S.th=10;const s0={danh:S.danh,th:S.th,hh:S.hh};put(S,["cuudao","phanthai","dauthai","tuminh","hopnhac"]);shelfSetCheck(S);
   out.T.minus={danh:S.danh-s0.danh,th:S.th-s0.th,hh:S.hh-s0.hh,queen:!!queenP(),lines:shelfSetLines(S).map(x=>x.t)};F(S.danh-s0.danh===B.size[3]+B.size[2]&&S.th-s0.th===-2&&(S.hh-s0.hh===-1||!queenP()),"minus "+JSON.stringify(out.T.minus));
   clean(S);/* drop with no take-back: restore by hand */S.danh=s0.danh;S.th=s0.th;S.hh=s0.hh}
  S.rank=rk0;
  /* 6 NPC PARITY: same table, same check, same take-back; the week pass checks NPCs on the host only */
  const v=liveRivals(true).find(x=>x.alive&&!x.out);{v.rank=Math.max(v.rank|0,4);clean(v);const d0=v.duc;put(v,["lanquy","cuc","maitrang"]);shelfSetCheck(v);const g1=v.duc-d0;shelfTake(v,slotOf(v,"cuc"));const g2=v.duc-d0;
   v.inv.push({k:"cuc",from:"emp"});shelfPut(v,v.inv.length-1);for(const s in v.shelf.g)if(v.shelf.g[s].pc!=null)v.shelf.g[s].pc=100;
   const w0=window.worldOn;window.worldOn=()=>false;delete v.shSet;try{shelfWeek()}finally{window.worldOn=w0}const guestRan=!!v.shSet;
   shelfWeek();const g3=v.duc-d0;out.T.npc={name:v.name,check:g1,take:g2,guestWeekTouched:guestRan,hostWeek:g3};
   F(g1===B.size[3]&&g2===0&&g3===B.size[3]&&!guestRan,"NPC parity "+JSON.stringify(out.T.npc))}
  /* 7 OLD SAVE: no p.shSet / no p.shelf → no bonus, no crash; the first check gives */
  {let ok=true;try{for(const x of [S].concat(rivals)){delete x.shSet}shelfView(S);shelfSetLines(S);wearBonus(v);for(const x of [S].concat(rivals))delete x.shelf;effSac(S);shelfWeek();shelfView(S)}catch(e){ok=false;out.fail.push("old save: "+e.message)}out.T.oldSave=ok}
  /* 9 PLAYER TEXT: no %, numbers = BAL; "Phòng trưng bày" */
  {clean(S);S.rank=5;put(S,["quattron","holo"]);shelfSetCheck(S);const L=shelfSetLines(S).map(x=>x.t);const txt=L.join(" | ");out.T.text=L;F(!/%/.test(txt),"% in set text");
   F(L.some(t=>/còn thiếu Cải thảo phỉ thúy/.test(t)),"missing-piece line absent");F(L.some(t=>/Quạt mùa: còn thiếu Quạt gấp trúc vẽ/.test(t))&&!S.shSet.ids.length,"half a pair counts or shows wrong");S.rank=rk0}
  /* 10 GLOW DATA (owner OD 17/11 ~21:20Z): shelfView items carry .set {id,name,full}; random pieces null */
  {clean(S);S.rank=5;put(S,["quattron","quatgap","holo","binhsu","caytung"]);const V=shelfView(S),it=k=>V.groups.flatMap(g=>g.items).find(x=>x.k===k);
   out.T.glow={quattron:it("quattron").set,holo:it("holo").set,caytung:it("caytung").set};F(it("quattron").set&&it("quattron").set.full&&it("quattron").set.name==="Quạt mùa"&&it("holo").set&&!it("holo").set.full&&it("caytung").set===null,"glow data "+JSON.stringify(out.T.glow));
   S.rank=rk0}
  return out});
 R.T.errors=errs.slice(0,3);if(errs.length)R.fail.push('page errors: '+errs.slice(0,3).join(' | '));
 console.log(JSON.stringify(R.T,null,1));console.log(R.fail.length?'SET BONUS FAIL · '+R.fail.join(' · '):'SET BONUS PASS');await b.close();srv.close();process.exit(R.fail.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
