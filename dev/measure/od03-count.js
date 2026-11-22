/* OD03 counters (run5b EXTRA): every flip try (her + NPC) by her month-art kind (best art = his favoured / neutral / disfavoured), true vs shown
   odds, win; her own month ledger (Sủng / Danh / nights gained in a favoured, neutral, disfavoured month). usage: EXTRA="$(cat dev/measure/od03-count.js)" run5b.sh … */
(function(){const C=window.__od3={tr:{},mo:{}};
 const kind=p=>{try{const ea=empArt(),b=stBestArt(p);if(!ea||!b)return"none";return b.k===ea.f?"fav":b.k===ea.d?"dis":"neu"}catch(e){return"none"}};
 const rec=(a,mode,won)=>{try{const m=mode==="road"?"road":"feign",k=(a===S?"me":"npc")+":"+m+":"+kind(a);const c=C.tr[k]=C.tr[k]||{n:0,w:0,o:0,sh:0,kn:0};
  c.n++;c.w+=won;c.o+=oSteal(a,m);c.sh+=stealShown(a,m);c.kn+=eaKnows(a)?1:0}catch(e){}};
 /* jnf resolves every flip try through stealWin (the one who gets him) / stealFail (a failed roll); tie losers (roll ok, he chose another) are not counted */
 const sW0=stealWin;stealWin=function(a,t,mode){rec(a,mode,1);return sW0.apply(this,arguments)};
 const sF0=stealFail;stealFail=function(a,t,mode){rec(a,mode,0);return sF0.apply(this,arguments)};
 let cur=null;const close=()=>{if(!cur||cur.S!==S)return;const c=C.mo[cur.k]=C.mo[cur.k]||{n:0,sung:0,danh:0,nights:0,hh:0};c.n++;c.sung+=(S.sung||0)-cur.sung;c.danh+=(S.danh||0)-cur.danh;c.nights+=(S.nights||0)-cur.nights;c.hh+=S.rank>=7&&cur.rank<7?1:0};
 const mT=monthTick;monthTick=function(){const ev=mT.apply(this,arguments);try{close();if(S&&!S.dead)cur={S,k:kind(S),sung:S.sung||0,danh:S.danh||0,nights:S.nights||0,rank:S.rank}}catch(e){}return ev};
 const P0=window.__res.push;window.__res.push=function(x){try{x.od3=JSON.parse(JSON.stringify(C))}catch(e){}return P0.apply(this,arguments)};/* each finished life carries the running totals */
 const ex=window.__bot.extra;window.__bot.extra=function(){const o=ex.apply(this,arguments);o.od3=C;return o}})();
