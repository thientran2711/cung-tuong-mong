/* ================= jbancung: «Ban cung» — which palace a consort may ask for, and how likely the Emperor grants it =================
   Owner mark #53 (21/11 ~04:12Z, verbatim in FOREMAN_D_STATUS): "không phải cái cung nào cũng xin được đâu … gần hay xa với cái cung của
   hoàng thượng … xác suất mà xin được cái cung đó hay không". History (law 8): dev/research/palace-residence.md — standing of each palace
   (nearness to the Emperor + its former owners), locks by rank, odds from favour/rank/standing/nearness/rivals, a real price on refusal.
   ONE rule for the player and every NPC (law 1): bcGrantIx (the decree, called from jpal palFix), bcOdds (the ask), bcAsk (the outcome).
   Every number lives in BAL.banCung (law 4); odds print as the ladder word (law 7). Nearness is measured on the plan (MAPH anchors), never typed.
   Co-op: bcOdds is a pure function of the shared world (no dice), so both seats read the same word; NPC petitions roll on the host only. */
Object.assign(BAL,{banCung:{
 /* standing 0..3 per palace (research table §2); a palace not listed = 1 */
 danh:{"Vĩnh Thọ cung":3,"Dực Khôn cung":3,"Thừa Minh cung":2,"Diên Huy cung":2,"Trường Xuân cung":2,"Chung Tú cung":1,"Cảnh Phúc cung":1,"Khải Tường cung":1,"Vĩnh Hòa cung":1,"Hàm An cung":0},
 need:[3,3,4,5],          /* rank index needed to live in / ask for a palace of standing 0,1,2,3 (Tần, Tần, Phi, Quý phi) */
 base:66,                 /* odds of asking for a palace equal to the one granted */
 step:14,                 /* − per standing step above the granted palace (+ per step below: a humble ask) */
 near:20,                 /* − × how much nearer to the Emperor's hall (0..1 of the plan's spread) */
 sungMid:50,sung:0.35,    /* + per point of her Sủng above sungMid (− below) */
 rank:6,                  /* + per rank above the palace's need */
 rival:8,rivalMax:3,      /* − per consort who also wants it (a chủ vị of the needed rank living in a palace of lower standing) */
 opts:4,lockMax:2,        /* ask options shown, of which at most lockMax locked ones (so she sees why) */
 ok:{danhStep:3,danhNear:2,ducHumble:3,ducTake:1},   /* granted: Danh + per step up; same standing but nearer the Emperor: Danh + danhNear (nearness = prestige, research §1.2);
                                                         a humble ask (lower standing, or same standing and not nearer) Đức +; accepting the decree Đức + */
 fail:{sung:2,sungStep:3,danh:1,danhStep:2,rel:6},  /* refused: Sủng −(sung + sungStep×steps up), Danh −(danh + danhStep×steps up), the first rival's relation −rel */
 npcLv:4                  /* an NPC asks only when her odds word is at least this ladder step (KIT_ODDS index: Khá chắc; was 3 before the 7-equal-bands ladder, the word is the same) */
}});
function bcDanh(i){const n=PALN[i];const d=BAL.banCung.danh[n];return d==null?1:d}
function bcNeed(i){return BAL.banCung.need[bcDanh(i)]}
function bcLocked(p,i){return rkOf(p)<bcNeed(i)}
const bcDistOf=i=>{const s=MAPH.rivalSlots[i],e=MAPH.places.dtd;if(!s||!e)return 0;const a=s.anchor||s.box,b=e.anchor||e.box;return Math.hypot(a.x-b.x,a.y-b.y)};
/* nearness 0..1: 1 = the palace nearest the Emperor's hall, 0 = the farthest, from the plan */
function bcNear(i){const D=PALN.map((_,j)=>bcDistOf(j)),lo=Math.min(...D),hi=Math.max(...D);return hi>lo?(hi-D[i])/(hi-lo):0}
/* THE gain of a granted ask (law 2/3: every ask has a gain; the card prints exactly what bcAsk applies), player and NPC alike */
function bcGain(i,from){const B=BAL.banCung,st=bcDanh(i)-(from!=null?bcDanh(from):0);if(st>0)return{danh:B.ok.danhStep*st};if(st<0)return{duc:B.ok.ducHumble};
 return from!=null&&bcNear(i)>bcNear(from)?{danh:B.ok.danhNear}:{duc:B.ok.ducHumble}}
function bcGainTxt(g){const N={danh:"Danh",duc:"Đức"};return Object.keys(g).map(k=>`${N[k]} ${balSg(g[k])}`).join(", ")}
function bcLive(p){return p===S?!!S&&!S.dead&&!S.out:!!p&&p.alive&&!p.out}
/* who else wants palace i: living chủ vị (not the queen) of the rank it needs, now in a palace of lower standing (or none) — strongest first */
function bcWanters(p,i){const L=[S].concat(typeof rivals!=="undefined"?rivals:[]).filter(q=>q!==p&&bcLive(q)&&!q.queen&&rkOf(q)>=PAL_HEAD&&rkOf(q)>=bcNeed(i)&&(q.pal==null||bcDanh(q.pal)<bcDanh(i)));
 return L.sort((a,b)=>rkOf(b)-rkOf(a)||(b.sung||0)-(a.sung||0))}
/* the odds (0..100, shown only as the ladder word) that p, granted palace `from`, is granted palace i instead */
function bcOdds(p,i,from){const B=BAL.banCung;const st=bcDanh(i)-(from!=null?bcDanh(from):0),nr=bcNear(i)-(from!=null?bcNear(from):0);
 const w=Math.min(B.rivalMax,bcWanters(p,i).length);
 const o=B.base-B.step*st-B.near*nr+B.sung*((p.sung||0)-B.sungMid)+B.rank*(rkOf(p)-bcNeed(i))-B.rival*w;
 return cl(Math.round(o),BAL.odds.lo,BAL.odds.hi)}
/* the lock reason in cổ trang words (rank names read from RANKS) */
function bcWhy(i){const d=bcDanh(i),rk=RANKS[bcNeed(i)].n;
 return d>=3?`Cung bậc nhất lục cung, lệ chỉ dành cho bậc ${rk} trở lên; tâu xin là vượt phận.`:`Cung danh giá, xưa nay bậc ${rk} trở lên mới được ở; tâu xin là vượt phận.`}
function bcOcc(p){const o={};for(const q of [S].concat(rivals||[]))if(q!==p&&q.pal!=null&&bcLive(q))o[q.pal]=1;return o}
/* the decree (jpal palFix → every new chủ vị, player and NPC alike): a free palace her rank allows; her favour decides how good — 
   allowed free palaces ordered by standing then nearness, her Sủng picks the place in that list. -1 = none allowed (palFix falls back). */
function bcGrantIx(p,occ){try{const L=PALN.map((_,i)=>i).filter(i=>occ[i]==null&&!bcLocked(p,i)).sort((a,b)=>bcDanh(a)-bcDanh(b)||bcNear(a)-bcNear(b));
 if(!L.length)return -1;return L[Math.min(L.length-1,Math.floor(cl(p.sung||0,0,99)*L.length/100))]}catch(e){return -1}}
/* the outcome of an ask (same for player and NPC): returns true when granted */
function bcAsk(p,i,from){const B=BAL.banCung,me=p===S,st=bcDanh(i)-(from!=null?bcDanh(from):0),up=Math.max(0,st);const top=bcWanters(p,i)[0]||null;
 const who=me?"Ngươi":`${RANKS[rkOf(p)].n} ${p.name}`;
 if(roll(bcOdds(p,i,from))){p.pal=i;const g=bcGain(i,from);
  if(me)apply(g);else for(const k in g)p[k]=cl((p[k]||0)+g[k],0,100);
  log(`${who} tâu xin ${PALN[i]}, Hoàng thượng chuẩn tấu, dời sang ${PALN[i]}.`);return true}
 const L={sung:-(B.fail.sung+B.fail.sungStep*up),danh:-(B.fail.danh+B.fail.danhStep*up)};
 if(me)apply(L);else for(const k in L)p[k]=cl((p[k]||0)+L[k],0,100);
 if(top&&up>0)relAdd(p,top,-B.fail.rel);
 log(`${who} tâu xin ${PALN[i]}, Hoàng thượng không chuẩn${top&&up>0?`; ${top===S?"ngươi":top.name} biết chuyện, sinh lòng oán`:""}. Vẫn ở ${PALN[from]}.`);return false}
/* the option list of the ceremony (her or any chủ vị): returns [{i, odds, locked}] */
function bcChoices(p,from){const B=BAL.banCung;const occ=bcOcc(p);const L=PALN.map((_,i)=>i).filter(i=>i!==from&&!occ[i])
  .sort((a,b)=>bcDanh(b)-bcDanh(a)||bcNear(b)-bcNear(a));
 const lk=L.filter(i=>bcLocked(p,i)),ok=L.filter(i=>!bcLocked(p,i));
 /* allowed ones first; at least one locked one when any (so she sees why), more only when few are allowed */
 const nLk=Math.min(lk.length,B.lockMax,Math.max(lk.length?1:0,B.opts-ok.length)),out=ok.slice(0,B.opts-nLk).concat(lk.slice(0,nLk));
 return out.map(i=>({i,locked:bcLocked(p,i),odds:bcLocked(p,i)?0:bcOdds(p,i,from)}))}
/* THE CEREMONY (replaces j27): the decree's palace, «Nhận» (sure, Đức +), «Xin <cung>» with real odds, or locked with the reason */
palCeremony=function(){if(!S||!S.palCer||S.dead)return;S.palCer=0;const from=S.pal;if(from==null)return;const B=BAL.banCung;
 const st=i=>bcDanh(i)-bcDanh(from);
 const opts=[{n:`Nhận ${PALN[from]}`,fx:{duc:B.ok.ducTake},x:"tạ ơn, dọn sang",go:()=>log(`Dọn sang ${PALN[from]}.`)}];
 for(const c of bcChoices(S,from)){const i=c.i;
  if(c.locked){opts.push(kitOff({n:`Xin ${PALN[i]}`,fx:{},x:`dời sang ${PALN[i]}`,go:()=>{}},bcWhy(i),kitWhenRank()));continue}
  const s=st(i),up=Math.max(0,s),top=bcWanters(S,i)[0];
  const gain=`, ${bcGainTxt(bcGain(i,from))}`;
  const loss=`${sgStat(-(B.fail.sung+B.fail.sungStep*up))}, Danh ${balSg(-(B.fail.danh+B.fail.danhStep*up))}${top&&up>0?`, ${top.name} sinh oán`:""}`;
  opts.push({n:`Xin ${PALN[i]}`,fx:{},x:`${word(c.odds)} · thành: dời sang ${PALN[i]}${gain} · hỏng: ${loss}`,go:()=>{bcAsk(S,i,from)}})}
 Q.push({ev:1,t:"Ban cung",who:pEmp(),h:`<p>Thánh chỉ: ${RANKS[S.rank].n} ${S.name} được ban <b>${PALN[from]}</b>, làm chủ vị một cung. Cung nhân dọn từ ${HOMEN} sang trong ngày.</p><p>Cung càng gần ngự tẩm, càng danh giá, càng nhiều người muốn; tâu xin quá phận thì khó được chuẩn.</p>`,opts});
 log(`Được ban ${PALN[from]}.`)};
/* NPC parity (law 1): a consort newly made chủ vị may petition the same way (host only in co-op: one roll for the world) */
function bcNpcAsk(v){const B=BAL.banCung,from=v.pal;if(from==null)return;
 const C=bcChoices(v,from).filter(c=>!c.locked&&bcDanh(c.i)>bcDanh(from)&&oddsLv(c.odds)>=B.npcLv);if(!C.length)return;
 bcAsk(v,C[0].i,from)}
(function(){const f0=palFix;palFix=function(){const pre={};try{for(const v of rivals||[])pre[v.id]=v.pal}catch(e){}const r=f0.apply(this,arguments);
 try{const cw=!!(window.COOPW&&COOPW.on),hostOK=!cw||COOPW.seat==="a";if(hostOK&&S&&rivals)for(const v of rivals)if(!v.coop&&pre[v.id]==null&&v.pal!=null&&!v.palLone&&palHeadOK(v))bcNpcAsk(v)}catch(e){console.error(e)}
 return r}})();
