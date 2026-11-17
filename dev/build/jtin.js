/* ================= CHỦ TIN: the mistress's trust in each servant, the mirror of the servant's Lòng; one pair for every mistress–servant bond ================= */
function tinOf(s){if(!s)return 0;if(s.tin==null)s.tin=cl(Math.round(45+((s.loyal||50)-50)/4),0,100);return s.tin}
function tinAdd(s,n){if(!s)return;s.tin=cl(Math.round(tinOf(s)+n),0,100)}
function sbar(lbl,v,cls){v=Math.round(v||0);return `<span class="sbar ${cls||""}"><span class="sbl">${lbl}</span><span class="sbt"><u style="width:${cl(v,0,100)}%"></u></span><b>${v}</b></span>`}
function bondBars(s){return sbar("Lòng",s.loyal,"lo")+sbar("Chủ tin",tinOf(s),"ti")}
/* entrusting: a scheme order needs Chủ tin 40, guarding a tryst 60 (same for every mistress) */
(function(){const b0=bestSent;bestSent=function(p){const L=(p.staff||[]).filter(s=>!s.spyFor&&tinOf(s)>=40);if(!L.length)return null;const sc=s=>s.loyal+tinOf(s)/2+nq(s,"sharp",BAL.net.k.spySharp);if(p!==S&&typeof mindPickBy==="function")return mindPickBy(L,s=>Math.pow(Math.max(BAL.mind.pick.tin.floor,sc(s)),BAL.mind.pick.tin.pow)*mindW(s,"spy"),p);/* npc-mind: an NPC mistress picks by trust, not always the best; her own pick stays the best (shown odds) */return L.slice().sort((a,b)=>sc(b)-sc(a))[0]}})();
watcher=function(){const s=(S.staff||[]).filter(x=>x.loyal>=BAL.loy.close&&tinOf(x)>=60).sort((a,b)=>b.loyal-a.loyal)[0];if(s)return{name:s.name,loyal:s.loyal,s};if(S.maid&&S.maid.loyal>=BAL.loy.close&&tinOf(S.maid)>=60)return{name:S.maid.name,loyal:S.maid.loyal};return null};
/* trust moves: a task done well raises it, a servant caught lowers it; being trusted slowly warms the servant's heart */
(function(){const m0=servMerit;servMerit=function(s,n){const r=m0.apply(this,arguments);tinAdd(s,(n||1)*1.5);return r}})();
(function(){const c0=servCaught;servCaught=function(p,s){if(s)tinAdd(s,-12);return c0.apply(this,arguments)}})();
(function(){const m0=monthTick;monthTick=function(){const ev=m0.apply(this,arguments);try{const L=allServ().concat(S.maid?[S.maid]:[]);for(const s of L){const t=tinOf(s);if(t>=60&&roll(50))s.loyal=cl((s.loyal||50)+BAL.eff.jtin.loyalTop,0,100);else if(t<25&&roll(50))s.loyal=cl((s.loyal||50)-BAL.eff.jtin.loyalTop_2,0,100)}}catch(e){}return ev}})();
