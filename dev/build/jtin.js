/* ================= CHỦ TIN: the mistress's trust in each servant, the mirror of the servant's Lòng; one pair for every mistress–servant bond ================= */
function tinOf(s){if(!s)return 0;if(s.tin==null)s.tin=cl(Math.round(45+((s.loyal||50)-50)/4),0,100);return s.tin}
function tinAdd(s,n){if(!s)return;s.tin=cl(Math.round(tinOf(s)+n),0,100)}
function sbar(lbl,v,cls){v=Math.round(v||0);return `<span class="sbar ${cls||""}"><span class="sbl">${lbl}</span><span class="sbt"><u style="width:${cl(v,0,100)}%"></u></span><b>${v}</b></span>`}
/* r6 N6 (VANPHONG l.55 + l.61 "bất kỳ «thiện cảm» nào cũng phải nói của ai với ai", law 11): the two bars name WHO → WHOM. Her servant: «Thiện cảm» (to her) ·
   «Ta tin cậy»; another master's servant (an NPC consort's, Thái hậu's household): «Thiện cảm với <chủ>» · «<chủ> tin cậy» — never «Ta» for a trust that is not hers.
   Servant road keeps «Chủ tin» (VANPHONG: chế độ cung nữ). bondOwner = j9 relOwner (the ONE servant → master link), Thái hậu's household = S.thO. */
function bondOwner(s){try{const o=typeof relOwner==="function"?relOwner(s):null;if(o)return o}catch(e){}if(S&&s===S.maid)return S;if(S&&S.thO&&(S.thO.staff||[]).includes(s))return S.thO;return null}
function bondWho(m){if(!m)return null;if(S&&m===S.thO)return "Thái hậu";return typeof shortN==="function"?shortN(m.name):m.name}
function bondBars(s){const tb=s.sid!=null||typeof s.tin==="number";/* a trust bar only for a servant who holds one (jaudit rule) */
 if(typeof isSrv==="function"&&S&&isSrv())return sbar("Thiện cảm",s.loyal,"lo")+(tb?sbar("Chủ tin",tinOf(s),"ti"):"");
 const m=bondOwner(s),K=typeof KIT_REL==="object"?KIT_REL:{};if(!m||m===S)return sbar(K.srvThem||"Thiện cảm",s.loyal,"lo")+(tb?sbar(K.srvTrust||"Ta tin cậy",tinOf(s),"ti"):"");
 const n=bondWho(m);return sbar(`Thiện cảm với ${n}`,s.loyal,"lo")+(tb?sbar(`${n} tin cậy`,tinOf(s),"ti"):"")}
/* entrusting: a scheme order needs Chủ tin BAL.tinLv.send, guarding a tryst BAL.tinLv.watch (same for every mistress) */
(function(){const b0=bestSent;bestSent=function(p){const L=(p.staff||[]).filter(s=>!s.spyFor&&tinOf(s)>=BAL.tinLv.send);if(!L.length)return null;const sc=s=>s.loyal+tinOf(s)/2+nq(s,"sharp",BAL.net.k.spySharp);if(p!==S&&typeof mindPickBy==="function")return mindPickBy(L,s=>Math.pow(Math.max(BAL.mind.pick.tin.floor,sc(s)),BAL.mind.pick.tin.pow)*mindW(s,"spy"),p);/* npc-mind: an NPC mistress picks by trust, not always the best; her own pick stays the best (shown odds) */return L.slice().sort((a,b)=>sc(b)-sc(a))[0]}})();
/* p = the woman whose watcher this is (her by default; an NPC consort: j22 lộRisk(k,p) / manTryst, jchat eavesdrop partner) — keeps j22's watcher(p) signature (was: always S) */
watcher=function(p){p=p||S;const s=(p.staff||[]).filter(x=>x&&x.loyal>=BAL.loy.close&&tinOf(x)>=BAL.tinLv.watch).sort((a,b)=>b.loyal-a.loyal)[0];if(s)return{name:s.name,loyal:s.loyal,s};if(p.maid&&p.maid.loyal>=BAL.loy.close&&tinOf(p.maid)>=BAL.tinLv.watch)return{name:p.maid.name,loyal:p.maid.loyal};return null};
/* trust moves: a task done well raises it, a servant caught lowers it; being trusted slowly warms the servant's heart */
(function(){const m0=servMerit;servMerit=function(s,n){const r=m0.apply(this,arguments);tinAdd(s,(n||1)*1.5);return r}})();
(function(){const c0=servCaught;servCaught=function(p,s){if(s)tinAdd(s,-12);return c0.apply(this,arguments)}})();
(function(){const m0=monthTick;monthTick=function(){const ev=m0.apply(this,arguments);try{const L=allServ().concat(S.maid?[S.maid]:[]);for(const s of L){const t=tinOf(s);if(t>=60&&roll(50))s.loyal=cl((s.loyal||50)+BAL.eff.jtin.loyalTop,0,100);else if(t<25&&roll(50))s.loyal=cl((s.loyal||50)-BAL.eff.jtin.loyalTop_2,0,100)}}catch(e){}return ev}})();
