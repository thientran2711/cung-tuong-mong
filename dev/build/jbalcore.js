/* ================= jbalcore: BALANCE CORE (review/balance-core) =================
   Owner OD 16/11 23:00Z (arts start too high, reach 100 too fast), 23:08Z (ALL start stats + growth fit the origin, one table, NPCs the same),
   23:05Z (the Emperor's month art in the night choices), 22:50Z (Tranh sủng vs Chặn ngự giá a real trade-off; Giữ chân Hoàng thượng rolls).
   Every number: BAL.start / BAL.art / BAL.grow / BAL.steal (jbal2.js). This file only reads them.
   1. ONE course ladder for every art (p.arts / p.artp) and every Tứ đức course (p.vir / p.virp): p.arts[k] = bậc 0..5 (every old reader keeps
      working), p.artp[k] = points inside that bậc; points = BAL.art.tier[bậc] + artp (0–100). crsPush() is the only way points grow (her lessons,
      events, NPC study: addArt / addArtP / addVir call it). artO(p,k) = the ONE odds bonus of a course (BAL.art.odds[bậc]).
   2. Start values: origSet(p,k) from BAL.start for her (j2 start) and for every new NPC consort (rstats, origin drawn by BAL.start.npcW).
   3. Growth curve BAL.grow on every gain of Sắc / Tài / Tâm cơ (apply for her, ap for NPCs: one rule).
   4. Night choices: oSteal(a,mode) (j8, reads BAL.steal.m), oKeep(p), stealFail(a,t,mode), keepNoSteal / keepRobbed, rungDown(o,n) for jnf.
      The Emperor's month art S.emp.ea {m,f,d} (empArtMonth, host only in co-op); who knows it: p.eaK === S.turn (eaLearn).
   Old saves: vNorm moves the old progress (0..bậc+1) onto the new bậc width once (p.crsV = 1); bậc never drops. */
function artNeed(l){const T=BAL.art.tier,top=T.length-1;return l>=top?100-T[top]:T[l+1]-T[l]}
/* add g lesson points to course k of person p (lv = p.arts or p.vir, pt = p.artp or p.virp); up(l) runs at each new bậc */
function crsPush(lv,pt,k,g,up){if(!(g>0))return 0;const T=BAL.art.tier,G=BAL.art.gain,top=T.length-1;let left=g,n=0;
 for(let guard=0;left>1e-9&&guard<20;guard++){const l=lv[k]||0,need=artNeed(l),have=pt[k]||0;if(l>=top&&have>=need){pt[k]=need;break}
  const room=need-have,give=left*G[Math.min(l,G.length-1)];
  if(give<room-1e-9){pt[k]=Math.round((have+give)*10)/10;left=0}
  else{left-=room/G[Math.min(l,G.length-1)];if(l>=top){pt[k]=need;left=0}else{pt[k]=0;lv[k]=l+1;n++;if(up)up(l+1)}}}
 return n}
function crsPts(lv,pt,k){const T=BAL.art.tier;const l=Math.min((lv||{})[k]||0,T.length-1);return Math.min(100,Math.round(T[l]+((pt||{})[k]||0)))}
function artPts(p,k){return crsPts(p&&p.arts,p&&p.artp,k)}
function virPts(p,k){return crsPts(p&&p.vir,p&&p.virp,k)}
function crsSet(lv,pt,k,pts){const T=BAL.art.tier;pts=Math.max(0,Math.min(100,pts||0));let l=0;for(let i=1;i<T.length;i++)if(pts>=T[i])l=i;lv[k]=l;pt[k]=Math.min(artNeed(l),Math.round((pts-T[l])*10)/10)}
function artNm(l){return BAL.art.nm[Math.max(0,Math.min(BAL.art.nm.length-1,l|0))]}
/* the ONE odds bonus of a course; artOE: when the Emperor himself judges (his trait Trọng tài / Mê sắc prizes it: × BAL.art.emp) */
function artO(p,k){const l=((p&&p.arts)||{})[k]||0;return BAL.art.odds[Math.min(l,BAL.art.odds.length-1)]||0}
function artOE(p,k){let m=1;try{if((["cam","ky","thi","hoa"].includes(k)&&has("trongtai"))||(k==="vu"&&has("mesac")))m=BAL.art.emp}catch(e){}return Math.round(artO(p,k)*m)}
function artFee(l){const F=BAL.art.fee;return F[0]+(l|0)*F[1]}
/* the art a person shows the Emperor on her night (bestArt in j85 for her: no Thêu/Nấu, his trait doubles what he prizes): the same pick for an NPC */
function nightArt(p){let b={k:null,l:0,w:0};for(const a of ARTS){if(a.k==="theu"||a.k==="nau")continue;const l=((p&&p.arts)||{})[a.k]||0,w=artW(a.k,l);if(w>b.w)b={k:a.k,l,w}}return b}
/* a multiplier in plain words for rule text (one core: the text prints the BAL constant) */
function xWord(m){return m===2?"gấp đôi":m===1.5?"gấp rưỡi":m===3?"gấp ba":`gấp ${String(m).replace(".",",")} lần`}
function artSide(p,k){return Math.round(artO(p,k)*BAL.art.side*10)/10}
function virO(p,k){const l=((p&&p.vir)||{})[k]||0;return BAL.art.odds[Math.min(l,BAL.art.odds.length-1)]||0}
/* ---- start values: one table for her and every NPC ---- */
function origRow(k){return (BAL.start&&BAL.start[k])||BAL.start.quan}
function origRoll(x){return Array.isArray(x)?x[0]+R(x[1]-x[0]+1):x}
function origPickNpc(){const W=BAL.start.npcW;const ks=Object.keys(W).filter(k=>W[k]>0);let r=Math.random()*ks.reduce((a,k)=>a+W[k],0);for(const k of ks){if((r-=W[k])<0)return k}return "quan"}
/* npc: {rank, malice} — her own start passes nothing */
function origSet(p,k,npc){const o=origRow(k);p.org=k;p.arts=p.arts||{};p.artp=p.artp||{};p.vir=p.vir||{};p.virp=p.virp||{};
 for(const a of ARTS){p.arts[a.k]=0;p.artp[a.k]=0}for(const v of (typeof VIR!=="undefined"?VIR:[])){p.vir[v.k]=0;p.virp[v.k]=0}
 p.sac=origRoll(o.sac);p.tai=origRoll(o.tai);p.tamco=origRoll(o.tamco);p.duc=origRoll(o.duc);p.suc=origRoll(o.suc);
 const ap0=Object.assign({},o.art||{});
 if(npc){const N=BAL.start.npc,rk=npc.rank|0,mal=npc.malice==null?40:npc.malice;
  p.tamco=cl(p.tamco+Math.round((mal-40)/N.mal),0,100);p.duc=cl(p.duc+Math.round((40-mal)/2)+R(11)-5+N.duc,0,100);
  p.danh=origRoll(o.danh)+rk*N.danh;p.bac=origRoll(o.bac)+rk*N.bac;p.mat=origRoll(o.mat)+R(2);p.th=origRoll(o.th)+R(20)-5;p.hh=origRoll(o.hh)+R(20)-5;
  const best=Object.keys(ap0).sort((a,b)=>ap0[b]-ap0[a]).slice(0,2);if(!best.length)best.push("cam");for(const b of best)ap0[b]=(ap0[b]||0)+rk*N.art}
 else{p.danh=origRoll(o.danh);p.bac=origRoll(o.bac);p.sung=origRoll(o.sung);p.mat=origRoll(o.mat);p.th=origRoll(o.th);p.hh=origRoll(o.hh)}
 for(const a in ap0)if(p.arts[a]!=null||ARTS.some(x=>x.k===a))crsSet(p.arts,p.artp,a,ap0[a]);
 for(const v in (o.vir||{}))crsSet(p.vir,p.virp,v,o.vir[v]);
 p.crsV=1;return p}
/* ---- old saves: progress (0..bậc+1 of the old 'bậc+2' step) onto the new bậc width, once ---- */
function crsMigrate(p){if(!p||p.crsV)return;const f=(lv,pt)=>{if(!lv||!pt)return;for(const k in lv){const l=Math.min(lv[k]|0,5);lv[k]=l;const o=+pt[k]||0;pt[k]=l>=5?0:Math.min(artNeed(l)-.1,Math.round(o/(l+2)*artNeed(l)*10)/10)}};
 f(p.arts,p.artp);f(p.vir,p.virp);p.crsV=1}
(function(){const v0=vNorm;vNorm=function(p){const r=v0.apply(this,arguments);try{crsMigrate(p)}catch(e){}return r}})();
/* NPC consorts: an origin from the same table (only for a new person: one with no Sắc yet) */
(function(){const r0=rstats;rstats=function(v,rank){try{if(v&&v.sac==null&&!v.org){const rk=rank==null?(v.queen?7:v.rank):rank;origSet(v,origPickNpc(),{rank:rk,malice:v.malice})}}catch(e){console.error("origSet npc",e)}return r0.apply(this,arguments)}})();
/* ---- growth curve: Sắc / Tài / Tâm cơ (BAL.grow), her and NPCs alike ---- */
function growMul(v){const G=BAL.grow;let i=0;for(const b of G.band)if(v>=b)i++;return G.mul[Math.min(i,G.mul.length-1)]}
function growScale(p,o){if(!o||typeof o!=="object"||!p)return o;let c=null;
 for(const k of BAL.grow.keys){const v=o[k];if(!(v>0))continue;let cur=p[k]||0,left=v,got=0;
  for(let i=0;i<v;i++){const m=growMul(cur+got);got+=m}  /* each point of gain at the mul of the value it lands on */
  const n=Math.floor(got)+(Math.random()<got-Math.floor(got)?1:0);if(n!==v){c=c||Object.assign({},o);c[k]=n}}
 return c||o}
(function(){const a0=apply;apply=function(o){try{if(S&&!S.dead&&!window.__noGrow)o=growScale(S,o)}catch(e){}return a0.apply(this,[o].concat([].slice.call(arguments,1)))}})();
(function(){const a0=ap;ap=function(p,o){try{if(p&&p!==S&&!window.__noGrow)o=growScale(p,o)}catch(e){}return a0.apply(this,arguments.length>2?[p,o].concat([].slice.call(arguments,2)):[p,o])}})();
/* ---- the Emperor's month art (owner 23:05Z) ---- */
function empArtMonth(){if(!S||S.dead||!S.emp)return"";const E=S.emp;if(E.ea&&E.ea.m===S.turn)return"";
 const W=ARTS.map(a=>{let w=1;try{if((["cam","ky","thi","hoa"].includes(a.k)&&has("trongtai"))||(a.k==="vu"&&has("mesac")))w=2}catch(e){}return [a.k,w]});
 let r=Math.random()*W.reduce((s,x)=>s+x[1],0),f=W[0][0];for(const [k,w] of W){if((r-=w)<0){f=k;break}}
 const rest=ARTS.map(a=>a.k).filter(k=>k!==f);E.ea={m:S.turn,f,d:rest[R(rest.length)]};return""}
function empArt(){const E=S&&S.emp;return E&&E.ea&&E.ea.m===S.turn?E.ea:null}
function eaKnows(p){return !!(p&&p.eaK===S.turn&&empArt())}
function eaTell(p,why){if(!p||!empArt()||p.eaK===S.turn)return false;p.eaK=S.turn;
 if(p===S&&!quiet){const ea=empArt(),n=k=>(ARTS.find(a=>a.k===k)||{}).n||k;log(`<span class="g">Ngươi biết được${why?" ("+why+")":""}: tháng này Hoàng thượng chuộng ${n(ea.f)}, không ưa ${n(ea.d)}.</span>`)}return true}
function eaText(p){const ea=empArt();if(!ea)return"";if(!eaKnows(p))return"Tháng này Hoàng thượng chuộng môn gì: chưa rõ";const n=k=>(ARTS.find(a=>a.k===k)||{}).n||k;return `Tháng này Hoàng thượng chuộng ${n(ea.f)}, không ưa ${n(ea.d)}`}
/* who learns it: at the month start Tai mắt ≥ ea.mat; each week a rumour (r0 + Tai mắt × rMat %); the same for her and every NPC */
function eaLearn(start){if(!S||S.dead||!empArt())return"";const E=BAL.steal.ea;const P=[S].concat(typeof liveRivals==="function"?liveRivals(true):[]);
 for(const p of P){if(!p||p.eaK===S.turn)continue;const m=p.mat||0;if(start&&m>=E.mat)eaTell(p,"tai mắt báo");else if(!start&&roll(E.r0+m*E.rMat))eaTell(p,"nghe lời đồn")}return""}
(function(){const m0=monthTick;monthTick=function(){const ev=m0.apply(this,arguments);try{empArtMonth();eaLearn(true)}catch(e){console.error("ea",e)}return ev}})();
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead){if(!empArt())empArtMonth();eaLearn(false)}}catch(e){}return r}})();
(function(){if(typeof discover!=="function")return;const d0=discover;discover=function(){try{if(empArt()&&!eaKnows(S)&&roll(BAL.steal.ea.disc)&&eaTell(S,"dò được"))return true}catch(e){}return d0.apply(this,arguments)}})();
/* ---- night choices ---- */
/* her best art (most points; a tie prefers his favoured art, never his disfavoured one first) */
function stBestArt(p){const ea=empArt();let b=null;for(const a of ARTS){const v=artPts(p,a.k);const pr=ea?(a.k===ea.f?1:a.k===ea.d?-1:0):0;
  if(v>0&&(!b||v>b.v||(v===b.v&&pr>b.pr)))b={k:a.k,v,l:((p.arts||{})[a.k])||0,pr}}return b}
function stealArtB(p,mode){const M=mode==="keep"?BAL.steal.keep:(BAL.steal.m[mode]||{}),b=stBestArt(p);if(!b)return 0;const ea=empArt(),A=BAL.steal.art;
 const f=ea?(b.k===ea.f?A.fav:b.k===ea.d?-A.dis:A.neu):A.neu;return Math.round(BAL.art.odds[b.l]*f*(M.art==null?1:M.art))}
function stealBase(a,mode){const M=BAL.steal.m[mode];let o=M.b;for(const k in M.w){const v=k==="sac"?effSac(a):(a[k]||0);o+=v*M.w[k]}return o+stealArtB(a,mode)}
function oKeep(p){const K=BAL.steal.keep;return odA(p,K.base+(p.sung||0)*K.sung+effSac(p)*K.sac+stealArtB(p,"keep")+stealFit(p)+mm())}
/* a failed Tranh sủng / Chặn ngự giá: the loss of that choice (BAL.steal.m[mode].lose); returns the line */
function stealLose(mode){return Object.assign({},(BAL.steal.m[mode==="road"?"road":"feign"]||{}).lose||{sung:-BAL.steal.failSung})}
function stealFail(a,t,mode){const L=stealLose(mode);ap(a,L);return `${NMc(a)} định giành đêm${t?" của "+NM(t):""} nhưng Hoàng thượng không động lòng. ${fmt(L)}. `}
/* Giữ chân Hoàng thượng: nobody took her night → keepSung; robbed anyway (w = winner, mode = its choice) → the steal's thiện cảm / oán hit is × oanX (the extra part here) */
function keepNoSteal(p){const n=BAL.steal.keep.gain;if(n)ap(p,{sung:n});return n}
function keepRobbed(p,w,mode){try{const M=BAL.steal.m[mode==="road"?"road":"feign"]||{};const x=Math.round((M.rel==null?BAL.steal.rel:M.rel)*(BAL.steal.keep.oan-1));if(x>0&&w&&w!==p)relAdd(w,p,-x)}catch(e){}}
/* the word() ladder (BAL.lad): odds o dropped n rungs, keeping its place inside the band */
function rungDown(o,n){const F=[0].concat(BAL.lad),top=100;let i=0;for(let j=0;j<F.length;j++)if(o>=F[j])i=j;const lo=F[i],hi=i+1<F.length?F[i+1]:top;
 const t=Math.max(0,i-(n|0)),lo2=F[t],hi2=t+1<F.length?F[t+1]:top;return Math.max(5,Math.round(lo2+(o-lo)*(hi2-lo2)/Math.max(1,hi-lo)))}
/* ---- the bậc effect texts print the constants (one core): Tài/Sắc per bậc (BAL.art.stUp), Danh at bậc 3/5 (BAL.art.danh), "dễ thành hơn"
   = BAL.art.odds[bậc] (passive weights: × BAL.art.side), Tứ đức Dung / Ngôn odds = the same ladder ---- */
(function(){try{const O=BAL.art.odds,side=x=>Math.round(x*BAL.art.side*10)/10;
 const SIDE={ky:[1],vu:[1],y:[1]};/* passive weights: mưu kế (Kỳ 1), lật thẻ (Vũ 1, Y 1) */
 for(const k in ARTFX){ARTFX[k].forEach((s,i,arr)=>{const l=i+1;
  s=s.replace(/^(Tài|Sắc) \+(\d+)/,(m,st,n)=>`${st} +${BAL.art.stUp+(+n-2)}`);
  if(BAL.art.danh[l])s=s.replace(/^((?:Tài|Sắc) \+\d+), Danh \+\d+/,`$1, Danh +${BAL.art.danh[l]}`);
  if(k==="vu"&&l===2)s=s.replace(/Múa trong yến tiệc \(mỗi bậc \+\d+\), Chặn ngự giá \(mỗi bậc \+\d+\) dễ thành hơn/,`Múa trong yến tiệc dễ thành hơn (+${O[l]})`);
  s=s.replace(/\(mỗi bậc \+[\d,]+\)/g,()=>`(+${(SIDE[k]||[]).includes(l)?String(side(O[l])).replace(".",","):O[l]})`);
  arr[i]=s})}/* in place: ARTMS (j82) holds the same arrays */
 for(const k of ["dung","ngon"])if(VIRFX[k])VIRFX[k].forEach((s,i,arr)=>arr[i]=s.replace(/(\(|thỉnh an |tố giác )\+(3|6|9|12|15)(?!\d)/,(m,a)=>`${a}+${O[i+1]}`));
}catch(e){console.error("artfx text",e)}})();
