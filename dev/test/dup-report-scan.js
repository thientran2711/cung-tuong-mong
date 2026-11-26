/* DUP-REPORT SCAN v2 (E97 + E97f fix r1, owner 26/11 feature-duplication audit). Prints EVERY number dev/design/HANHSU_MERGE.md states.
   Counts every act button the consort road (and the cung nữ road) offers: ACT table, Hành sự deck (pool + every conditional card under forced
   states: art level, illness, child, pregnancy, lãnh cung, origin story), Hậu cung consort card (group panes incl. hidden ones, real names),
   Quyền Hoàng hậu (incl. «Ân xá» which needs a confined consort), Hoàng tự, Cung nhân, Tư trang, Tài nghệ, and every person met in Dư đồ
   (dfActs = the stage pop-up), for scenarios đầu game / phẩm cao / Hoàng hậu / có con / cung nữ.
   usage: node dev/test/dup-report-scan.js <out.json> [url] [deck.json]   (scan + summary; deck.json = output of act-dedupe-deck.js, optional)
          node dev/test/dup-report-scan.js --sum <out.json> [deck.json]   (summary only, from a saved scan) */
const fs=require('fs');const path=require('path');
const SCN=['dau','cao','hh','con','srv'];
function summary(out,deckFile){
 const P=(...a)=>console.log(...a);const uniq=a=>[...new Set(a)];const rng=a=>a.length?(Math.min(...a)===Math.max(...a)?String(a[0]):Math.min(...a)+"–"+Math.max(...a)):"0";
 P("ACT keys:",out.ACT.length);
 const F=out.forced;const norm=n=>n.replace(/^Hoàng hậu(?=[A-ZĐÂ])/,"").trim();
 P("\n# HÀNH SỰ DECK (code: pool() + every conditional card under forced states)");
 const pool=uniq(F.pool.map(norm));P("pool (5 random a buổi, after jact AD_OUT):",pool.length,"·",pool.join(" · "));P(" pool cards moved out of Hành sự by jact AD_OUT (live in Tài nghệ / Hoàng tự):",F.poolOut.join(" · "));
 const extra={};for(const k in F.deck){const add=uniq(F.deck[k].map(norm)).filter(n=>!pool.includes(n));if(add.length)extra[k]=add}
 const allDeck=new Set(pool);const fixed=new Set();for(const k in extra){P(" +",k+":",extra[k].length,"·",extra[k].join(" · "));extra[k].forEach(n=>{allDeck.add(n);fixed.add(n)})}
 P("deck distinct total (consort road, every state):",allDeck.size,"= pool",pool.length,"+ fixed/conditional",fixed.size);P(" lãnh cung deck (own deck, not the consort Hành sự):",(F.cold||[]).length,"·",(F.cold||[]).join(" · "));
 if(deckFile&&fs.existsSync(deckFile)){const R=Object.values(JSON.parse(fs.readFileSync(deckFile,'utf8')).res).filter(r=>r.where==="act");const seen=uniq(R.map(r=>norm(r.name)));
  P("deck seen by the seeded deck bot (act-dedupe-deck.js):",seen.length,"· not in the forced list:",seen.filter(n=>!allDeck.has(n)).join(" · ")||"none")}
 P("\n# HẬU CUNG CONSORT CARD (act buttons, by group pane)");
 for(const sc of SCN){const R=out[sc];if(!R)continue;for(const id in R.surf){if(!/^rv:/.test(id))continue;const L=R.surf[id];if(!Array.isArray(L))continue;const g={};L.filter(b=>b.g).forEach(b=>{(g[b.g]=g[b.g]||[]).push(b)});const tot=Object.values(g).reduce((a,x)=>a+x.length,0);if(!tot)continue;
  P(` ${sc} ${id}: ${tot} = `+Object.keys(g).map(k=>k+" "+g[k].length).join(" · "))}}
 P(" Quyền Hoàng hậu with a confined consort (forced):",F.hhq.length,"·",F.hhq.join(" · "));
 P("\n# DƯ ĐỒ IN-PERSON POP-UP (dfActs), by person kind");
 const pop={};for(const sc of SCN){const R=out[sc];if(!R)continue;for(const pl in R.place)for(const q of R.place[pl].people){const kind=q.who.split("|")[1];const n=q.groups.reduce((a,g)=>a+g.acts.length,0);if(!n)continue;(pop[kind]=pop[kind]||{});(pop[kind][sc]=pop[kind][sc]||[]).push({n,gs:q.groups.map(g=>g.n+" "+g.acts.length).join(" · ")})}}
 for(const kind in pop){for(const sc in pop[kind]){const A=pop[kind][sc];P(` ${kind} [${sc}]: ${rng(A.map(a=>a.n))} · max e.g. ${A.sort((a,b)=>b.n-a.n)[0].gs}`)}}
 P(" «Bàn tán về X» buttons in one rival pop-up vs people she knows:",(out.banTan||[]).join(" / "));
 P("\n# OTHER TABS (act buttons, nav excluded)");
 for(const sc of SCN){const R=out[sc];if(!R)continue;const row=[];for(const id in R.surf){if(/^rv:|^act$|^home$/.test(id))continue;const L=R.surf[id];if(Array.isArray(L))row.push(id+" "+L.filter(b=>b.n&&!b.nav).length)}P(` ${sc}: `+row.join(" · "))}
 P("\n# NAMES per surface (° = shown but locked)");
 for(const sc of ['con','hh','srv']){const R=out[sc];if(!R)continue;for(const id of Object.keys(R.surf).filter(i=>/^(kid|inv|art|staff:0|story|rel|fac|act)/.test(i))){const L=R.surf[id];if(Array.isArray(L))P(` ${sc} ${id}: `+uniq(L.filter(b=>!b.nav).map(b=>(b.g?b.g+"›":"")+b.n+(b.off?"°":""))).join(" | "))}}
 P("\n# PETS (khắc budget, OD 26/11 ~04:25Z)");P(" pet acts found:",(out.pets||[]).join(" | ")||"none");
 P("\npage errors:",out.perr.length);
}
if(process.argv[2]==="--sum"){summary(JSON.parse(fs.readFileSync(process.argv[3],'utf8')),process.argv[4]);return}
const {chromium}=require('playwright');
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const OUT=process.argv[2],URL=process.argv[3]&&!/\.json$/.test(process.argv[3])?process.argv[3]:'file://'+path.resolve(__dirname,'../../index.html'),DECK=process.argv.find((a,i)=>i>2&&/\.json$/.test(a));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},hasTouch:true,isMobile:true,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(3000);
 await p.evaluate(LIB);
 await p.evaluate(()=>{
  window.DR={};
  DR.nm=x=>{const k=x.querySelector('.kan');if(k)return k.textContent.replace(/\s+/g," ").trim();const c=x.cloneNode(true);c.querySelectorAll('.kaart,small,.kwhy,figure').forEach(e=>e.remove());return (c.textContent||"").replace(/\s+/g," ").trim().slice(0,70)};
  DR.key=x=>["a","k","kid","kt53","go","visit","scout","invite","pma","st","inv","staff"].map(k=>x.dataset[k]!=null?k+"="+x.dataset[k]:"").filter(Boolean).join("&");
  DR.srvStart=()=>{try{localStorage.clear()}catch(e){}document.getElementById("title").hidden=true;AA.reseed(11);let ok=false;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(isSrv()){ok=true;break}}AA.hide();S.buoi=0;used=0;if(S.suc<60)S.suc=80;if(S.bac<200)S.bac=200;render();AA.save();return ok};
  DR.surfs=()=>{const R={surf:{},place:{}};
   for(const sf of AA.surfaces()){try{AA.restore(1);AA.show(sf);
    if(sf.place){const L=[];let ppl=[];try{ppl=curPeople()}catch(e){}
     ppl.forEach((q,i)=>{let g=null;try{g=dfActs(i)}catch(e){}L.push({who:(q.name||q.kind||"?")+"|"+q.kind,groups:(g||[]).map(x=>({n:x.n,acts:x.acts.map(a=>a.n+" ["+a.ton+"]")}))})});R.place[sf.id]={people:L}}
    else{const pan=document.querySelector('#panel');const tabs=[...pan.querySelectorAll('.pctabs .pct')].map(t=>t.dataset.pct||t.textContent.trim());const panes=[...pan.querySelectorAll('.pcg')];
     R.surf[sf.id]=[...pan.querySelectorAll('button')].filter(x=>typeof dfIsAct!=="function"||dfIsAct(x)).map(x=>{const pg=x.closest('.pcg');const gi=pg?panes.indexOf(pg):-1;
      const nav=/^[‹›]$/.test(x.textContent.trim())||(/^rv:/.test(sf.id)&&gi<0&&!x.dataset.a&&!x.dataset.k);
      return {n:DR.nm(x),g:gi>=0?(tabs[gi]||("g"+gi)):"",key:DR.key(x),off:x.disabled,nav}})}
   }catch(e){R.surf[sf.id]=["ERR "+e.message]}}return R}});
 const out={};out.ACT=await p.evaluate(()=>Object.keys(ACT).map(k=>({k,n:String(ACT[k].n)})));
 for(const sc of SCN){const ok=await p.evaluate(n=>{if(n==="srv")return DR.srvStart();AA.scen(n);return true},sc);if(!ok){out[sc]=null;console.error(sc,'no start');continue}
  out[sc]=await p.evaluate(()=>DR.surfs());console.error(sc,'done')}
 /* forced states for the deck's conditional cards + Quyền Hoàng hậu «Ân xá» + «Bàn tán» growth + pet acts */
 out.forced=await p.evaluate(()=>{const F={deck:{}};const names=A=>(A||[]).map(a=>String(a.n));
  AA.scen('cao');F.poolAll=names(pool());F.pool=F.poolAll.filter(n=>!(typeof AD_OUT!=="undefined"&&AD_OUT.test(n)));F.poolOut=F.poolAll.filter(n=>!F.pool.includes(n));
  /* the RENDERED Hành sự panel (jact AD_OUT already moved some cards to Tài nghệ / Hoàng tự; those are not counted twice) */
  const shown=()=>{render();const sf=AA.surfaces().find(s=>s.id==="act");AA.show(sf);return [...document.querySelectorAll('#panel button .kan')].map(e=>e.textContent.replace(/\s+/g," ").trim())};
  const run=(k,fn)=>{try{AA.scen(/^con/.test(k)?"con":"cao");fn();deal();F.deck[k]=shown()}catch(e){F.deck[k]=["ERR "+e.message]}};
  run("base",()=>{});
  run("art lv max (cam/vu/ky/hoa; deal shows ONE of these)",()=>{for(const a of ["cam","vu","ky","hoa","y"])S.arts[a]=20;F.artActs=names(artActs()).filter(n=>!(typeof AD_OUT!=="undefined"&&AD_OUT.test(n)))});
  run("ill",()=>{S.ill={k:Object.keys(ILL)[0],st:2,at:wk()};S.arts.y=5});
  run("con: kid ≥3, sick, Y thuật",()=>{S.arts.y=20;for(const k of S.kids){k.age=Math.max(k.age,4);k.hp=10}});
  run("pregnant, hidden",()=>{S.preg=2;S.hidden=true;S.fake=0});
  run("tâm cơ ≥50, not pregnant",()=>{S.preg=0;S.tamco=80});
  F.cold=(()=>{try{AA.scen('cao');S.out=1;deal();return shown()}catch(e){return ["ERR "+e.message]}})();
  const ak="art lv max (cam/vu/ky/hoa; deal shows ONE of these)";F.deck[ak]=(F.deck[ak]||[]).concat(F.artActs||[]);
  try{AA.scen('hh');const v=rivals.find(x=>x.alive&&!x.queen);v.confined=2;const sf=AA.surfaces().find(s=>s.id==="rv:"+v.name)||AA.surfaces().find(s=>/^rv:/.test(s.id));AA.show(sf);
   F.hhq=[...document.querySelectorAll('#panel button[data-k]')].map(x=>DR.nm(x)+(x.disabled?"°":""))}catch(e){F.hhq=["ERR "+e.message]}
  return F});
 out.banTan=await p.evaluate(()=>{const R=[];for(const n of [1,4,9]){try{AA.scen('cao');const L=rivals.filter(v=>v.alive);L.forEach((v,i)=>{if(i>=n){delete S.met[v.id];v.known=0}});
   const sf=AA.surfaces().find(s=>{if(!s.place)return false;AA.show(s);try{return curPeople().some(q=>q.kind==="rival")}catch(e){return false}});if(!sf){R.push(n+": no place");continue}AA.show(sf);const ppl=curPeople();const i=ppl.findIndex(q=>q.kind==="rival");
   const c=(dfActs(i)||[]).flatMap(g=>g.acts).filter(a=>/^Bàn tán/.test(a.n)).length;R.push(`${n} known → ${c}`)}catch(e){R.push(n+": ERR "+e.message)}}return R});
 out.pets=await p.evaluate(()=>{const R=new Set();try{AA.scen('cao');for(const sf of AA.surfaces()){if(sf.place)continue;AA.show(sf);document.querySelectorAll('#panel button').forEach(x=>{const t=DR.nm(x);if(/thú|mèo|chó|chim|pet/i.test(t+" "+(x.dataset.a||"")))R.add(sf.id+": "+t)})}}catch(e){R.add("ERR "+e.message)}return [...R]});
 out.perr=perr;fs.writeFileSync(OUT,JSON.stringify(out));await b.close();summary(out,DECK)})().catch(e=>{console.error(e);process.exit(1)});
