/* review/residence-seats measure add-on (load AFTER inpage6.js): per life, months to first reach Tần / Phi / Quý phi / HQP / Hoàng hậu,
   harem size (living consorts + her) per game year and its max, co-resident counts per chủ vị (sampled monthly), where she lives
   (side hall / Ngọc Thanh các / own palace), and ms per buổi (nextBuoi). Attached to each window.__res row as .rs */
/* speed (17/11, successor): window.__rsFast (run_rs.js default) turns off the dialog FIT passes only (pure layout: kitFrameLive3 v3 re-lay,
   feet/fig fit, dlg/dp fit, panel compact, element focus() = ~78 % of the bot page's CPU in a profile). Game state, rules and buttons are untouched; both
   builds get the same stubs, so the before/after comparison holds. Render/buổi perf vs live is gated by quickcheck.sh, not by this run. */
if(window.__rsFast){try{HTMLElement.prototype.focus=function(){}}catch(e){}try{kitFrameLive3=()=>false;window.kitFrameLive3=kitFrameLive3}catch(e){}for(const f of ["kszFeetFit","kitDlgFit","kitDpFit"])try{if(typeof window[f]==="function"){window[f]=function(){};eval(f+"=window."+f)}}catch(e){}try{if(typeof kitPanelCompact==="function"){kitPanelCompact=()=>false;window.kitPanelCompact=kitPanelCompact}}catch(e){}}
(function(){let cur=null;const live=x=>x===S?!S.out&&!S.dead:x.alive&&!x.out;
 function reset(){cur={t0:null,first:{},hmax:0,hy:[],co:[0,0,0,0],coN:0,meSide:0,meNT:0,mePal:0,meN:0,bms:0,bn:0,over:0}}reset();
 function sample(){if(!S||S.dead)return;if(cur.t0==null)cur.t0=S.turn-1;const m=S.turn-cur.t0;const rk=rkOf(S);
  for(const k of [3,4,5,6,7])if(rk>=k&&cur.first[k]==null)cur.first[k]=m;
  const n=liveRivals(true).length+1;cur.hmax=Math.max(cur.hmax,n);try{if(typeof BAL!=="undefined"&&BAL.harem&&n>BAL.harem.cap&&!cur.hx)cur.hx={m,n,logs:(S.logs||[]).slice(0,10).map(x=>strip(x).slice(0,160))}}catch(e){}const y=Math.floor(m/12);if(y<10)cur.hy[y]=Math.max(cur.hy[y]||0,n);
  try{const H=[S].concat(rivals).filter(p=>typeof palHostOK==="function"?palHostOK(p):false);
   for(const h of H){const c=[S].concat(rivals).filter(y=>y!==h&&live(y)&&!y.queen&&y.resHead===key(h)&&!(rkOf(y)>=3&&y.pal!=null)).length;cur.co[Math.min(3,c)]++;cur.coN++;if(c>2)cur.over++}}catch(e){}
  try{if(!S.out&&rk<3){cur.meN++;const r=residenceOf(S);if(r.part==="dong"||r.part==="tay")cur.meSide++;else if(r.part==="ngocthanh")cur.meNT++}else if(rk>=3&&S.pal!=null)cur.mePal++}catch(e){}}
 const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{sample()}catch(e){}return r};
 if(typeof nextBuoi==="function"){const b0=nextBuoi;nextBuoi=function(){const t=performance.now();const r=b0.apply(this,arguments);cur.bms+=performance.now()-t;cur.bn++;return r}}
 /* life cap (run_rs.js lifeMonths, window.__rsCap): a life that reaches the cap ends as fate "CAP" (counted as alive at 10 years) */
 const st0=window.__bot.step;window.__bot.step=function(mode,n){if(window.__rsCap&&S&&!S.dead&&cur.t0!=null&&S.turn-cur.t0>=window.__rsCap){window.__res.push({origin:S.origin.k,rank:S.rank,maxRank:Math.max(window.__maxRank||0,S.rank),turns:S.turn,years:+(S.turn/12).toFixed(2),title:"CAP",fate:"CAP "+window.__rsCap});window.__maxRank=0;window.__lifeIter=0;window.__hhTurn=null;window.__acts={};Q.length=0;start()}return st0.apply(this,arguments)};
 const p0=window.__res.push.bind(window.__res);window.__res.push=function(o){try{o.rs=cur}catch(e){}reset();return p0(o)};
})();
