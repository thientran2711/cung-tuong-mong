/* DUP-REPORT SCAN v3 (E97 + E97f fix r1 + E97f2 fix r2: collapsed totals, lãnh cung over 12 deals, cung nữ road forced states + pop-up by person kind; owner 26/11 feature-duplication audit). Prints EVERY number dev/design/HANHSU_MERGE.md states.
   Counts every act button the consort road (and the cung nữ road) offers: ACT table, Hành sự deck (pool + every conditional card under forced
   states: art level, illness, child, pregnancy, lãnh cung, origin story), Hậu cung consort card (group panes incl. hidden ones, real names),
   Quyền Hoàng hậu (incl. «Ân xá» which needs a confined consort), Hoàng tự, Cung nhân, Tư trang, Tài nghệ, and every person met in Dư đồ
   (dfActs = the stage pop-up), for scenarios đầu game / phẩm cao / Hoàng hậu / có con / cung nữ.
   usage: node dev/test/dup-report-scan.js <out.json> [url] [deck.json]   (scan + summary; deck.json = output of act-dedupe-deck.js, optional)
          node dev/test/dup-report-scan.js --sum <out.json> [deck.json]   (summary only, from a saved scan)
          node dev/test/dup-report-scan.js --range <deck.json> <a.json> <b.json> …   (v3: min–max of every stated total over N saved scans) */
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
 /* v3 (E97f2 fix r2): the COLLAPSED numbers the report states */
 P("\n# TOTALS THE REPORT STATES (v3)");
 {const MEN=n=>n.replace(/^Để ý một (nam nhân áo gấm|vị vương gia|vị thái y)$/,"Để ý một nam nhân (men road, any man)").replace(/^Xin ban hôn cho (một vị )?vương gia.*$/i,"Xin ban hôn cho Vương gia");
  const u=new Set(allDeck);if(deckFile&&fs.existsSync(deckFile))Object.values(JSON.parse(fs.readFileSync(deckFile,'utf8')).res).filter(r=>r.where==="act").forEach(r=>u.add(norm(r.name)));
  const col=new Set([...u].map(MEN));const var_=[...u].filter(n=>MEN(n)!==n);
  P(" deck: forced-state union",allDeck.size,"+ deck-bot-only",u.size-allDeck.size,"=",u.size,"names printed; men-road name variants",var_.length,"(",var_.join(" · "),") counted once → COLLAPSED deck =",col.size);
  P("  collapsed list:",[...col].join(" · "))}
 {const base=[],hh=[];for(const sc of SCN){const R=out[sc];if(!R||sc==="srv")continue;for(const id in R.surf){if(!/^rv:/.test(id))continue;const L=R.surf[id];if(!Array.isArray(L))continue;const g=L.filter(b=>b.g);if(!g.length)continue;
   const q=g.filter(b=>b.g==="Quyền Hoàng hậu").length;base.push(g.length-q);if(q)hh.push(q)}}
  const hhCode=F.hhq.length+(F.hhq.some(n=>/^Ân xá/.test(n))?0:1);
  P(" consort card WITHOUT Quyền Hoàng hậu:",rng(base),"(per consort met:",base.join(" / ")+")");
  P(" Quyền Hoàng hậu: on the card",rng(hh),"· with a confined consort",F.hhq.length,"(«Ân xá» needs v.confined, j15.js:43) · in code",hhCode,"→ card max =",Math.max(...base),"+",hhCode,"=",Math.max(...base)+hhCode)}
 if(out.coldx){const pe=out.coldx.per.filter(x=>typeof x==="number");const CV=n=>n.replace(/^Nhờ .+ đưa thư kêu oan$/,"Nhờ <người quen> đưa thư kêu oan");const cc=[...new Set(out.coldx.all.map(CV))];
  P(" lãnh cung deck per deal (12 deals, half with a strong father):",rng(pe),"· union",out.coldx.all.length,"names printed; «Nhờ <who> đưa thư kêu oan» name variants counted once → COLLAPSED lãnh cung deck =",cc.length,"·",cc.join(" · "))}
 if(out.srvx){P("\n# CUNG NỮ ROAD (forced states, v3)");const all=new Set();for(const k in out.srvx.deck){P(" Phận sự ["+k+"]:",out.srvx.deck[k].length,"·",out.srvx.deck[k].join(" · "));out.srvx.deck[k].forEach(n=>all.add(n))}
  P(" Phận sự distinct (every state):",all.size,"·",[...all].join(" · "));
  for(const k in out.srvx.pop)P(" pop-up ["+k+"]:",out.srvx.pop[k].length,"·",out.srvx.pop[k].join(" · "));
  P(" pop-up [mis] with Chủ tin 0:",(out.srvx.lowTin||[]).join(" · "));
  const dl=(out.srv&&out.srv.surf["staff:0"]||[]).filter(b=>b.g&&!b.nav).map(b=>b.g+"›"+b.n);P(" Cung nhân › Đồng liêu:",dl.length,"·",dl.join(" · "))}
 P("\npage errors:",out.perr.length);
}
/* v3 --range: the page's own timers draw from the game rng between steps, so two scans differ a little (who she meets, which pool cards a
   forced deal shows). The report states the RANGE over N saved scans: node dev/test/dup-report-scan.js --range deck.json a.json b.json c.json */
function totals(out,deckFile){const T={};const uniq=a=>[...new Set(a)];const F=out.forced;const norm=n=>n.replace(/^Hoàng hậu(?=[A-ZĐÂ])/,"").trim();
 const MEN=n=>n.replace(/^Để ý một (nam nhân áo gấm|vị vương gia|vị thái y)$/,"Để ý một nam nhân").replace(/^Xin ban hôn cho (một vị )?vương gia.*$/i,"Xin ban hôn cho Vương gia");
 const u=new Set();uniq(F.pool.map(norm)).forEach(n=>u.add(n));for(const k in F.deck)F.deck[k].map(norm).forEach(n=>u.add(n));
 if(deckFile&&fs.existsSync(deckFile))Object.values(JSON.parse(fs.readFileSync(deckFile,'utf8')).res).filter(r=>r.where==="act").forEach(r=>u.add(norm(r.name)));
 T["deck names printed"]=u.size;T["deck COLLAPSED (men-road variants once)"]=new Set([...u].map(MEN)).size;
 const base=[],hh=[];for(const sc of SCN){const R=out[sc];if(!R||sc==="srv")continue;for(const id in R.surf){if(!/^rv:/.test(id))continue;const L=R.surf[id];if(!Array.isArray(L))continue;const g=L.filter(b=>b.g);if(!g.length)continue;const q=g.filter(b=>b.g==="Quyền Hoàng hậu").length;base.push(g.length-q);if(q)hh.push(q)}}
 T["card without Quyền HH (min)"]=Math.min(...base);T["card without Quyền HH (max)"]=Math.max(...base);T["Quyền HH on the card"]=Math.max(0,...hh);
 const hhCode=F.hhq.length+(F.hhq.some(n=>/^Ân xá/.test(n))?0:1);T["Quyền HH in code"]=hhCode;T["card max incl. Quyền HH in code"]=Math.max(...base)+hhCode;
 const pop={};for(const sc of SCN){const R=out[sc];if(!R)continue;for(const pl in R.place)for(const q of R.place[pl].people){let kind=q.who.split("|")[1];const n=q.groups.reduce((a,g)=>a+g.acts.length,0);if(!n)continue;if(kind==="rival"&&q.groups.some(g=>g.acts.some(a=>/^Cùng cung/.test(a))))kind="rival of her OWN palace («Cùng cung» lock)";(pop[kind]=pop[kind]||[]).push(n)}}
 for(const k in pop){T["pop-up "+k+" (min)"]=Math.min(...pop[k]);T["pop-up "+k+" (max)"]=Math.max(...pop[k])}
 if(out.coldx){const pe=out.coldx.per.filter(x=>typeof x==="number");T["lãnh cung per deal (min)"]=Math.min(...pe);T["lãnh cung per deal (max)"]=Math.max(...pe);T["lãnh cung COLLAPSED («Nhờ <who> đưa thư kêu oan» once)"]=new Set(out.coldx.all.map(n=>n.replace(/^Nhờ .+ đưa thư kêu oan$/,"Nhờ X đưa thư kêu oan"))).size}
 if(out.srvx){const all=new Set();for(const k in out.srvx.deck)out.srvx.deck[k].forEach(n=>all.add(n.replace(/^Lén báo tin cho .+$/,"Lén báo tin cho <người mua chuộc>")));T["cung nữ Phận sự distinct (every state)"]=all.size;
  for(const k in out.srvx.pop)T["cung nữ pop-up "+k.replace(/ \(.*\)$/,"")]=out.srvx.pop[k].filter(n=>!/^\(none/.test(n)).length;
  T["cung nữ Đồng liêu"]=(out.srv&&out.srv.surf["staff:0"]||[]).filter(b=>b.g&&!b.nav).length}
 T["page errors"]=out.perr.length;return T}
if(process.argv[2]==="--range"){const D=process.argv[3];const files=process.argv.slice(4);const A=files.map(f=>totals(JSON.parse(fs.readFileSync(f,'utf8')),D));
 console.log("RANGE over",files.length,"scans (",files.map(f=>path.basename(f)).join(", "),")");
 for(const k of [...new Set(A.flatMap(t=>Object.keys(t)))]){const v=A.map(t=>t[k]).filter(x=>x!=null&&isFinite(x));const lo=Math.min(...v),hi=Math.max(...v);console.log(" "+k+":",lo===hi?String(lo):lo+"–"+hi,"   [",v.join(" / "),"]")}return}
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
 /* v3 (E97f2 fix r2): lãnh cung deck over many deals + its conditional card, and the cung nữ road under forced states (every Phận sự card in j42 + jagknow, every pop-up act by person kind) */
 out.coldx=await p.evaluate(()=>{const per=[],all=new Set();const shown=()=>{render();const sf=AA.surfaces().find(s=>s.id==="act");AA.show(sf);return [...document.querySelectorAll('#panel button .kan')].map(e=>e.textContent.replace(/\s+/g," ").trim())};
  for(let i=0;i<12;i++){try{AA.scen('cao');AA.reseed&&AA.reseed(100+i);S.out=1;if(i%2)S.dad=99;deal();const L=shown();per.push(L.length);L.forEach(n=>all.add(n))}catch(e){per.push("ERR "+e.message)}}
  return {per,all:[...all]}});
 out.srvx=await p.evaluate(()=>{const R={deck:{},pop:{}};const shown=()=>{render();const sf=AA.surfaces().find(s=>s.id==="act");AA.show(sf);return [...document.querySelectorAll('#panel button .kan')].map(e=>e.textContent.replace(/\s+/g," ").trim().replace(/^(Hoàng hậu|Người lạ)(?=[A-ZĐÂ])/,""))};
  const st=(k,fn)=>{try{if(!DR.srvStart()){R.deck[k]=["no srv start"];return}fn();try{deal()}catch(e){}R.deck[k]=shown()}catch(e){R.deck[k]=["ERR "+e.message]}};
  st("base",()=>{});
  st("errand offered (Việc chủ sai)",()=>{S.srv.err=Object.assign({b:bid()},srvErrPick())});
  st("rank ≥ books + low Sức (Quản sổ sách · Mua thuốc bổ · Đốc thúc)",()=>{S.srv.rk=Math.max(S.srv.rk,SRVA.books.rk,BAL.srvRk.dai);S.suc=Math.min(S.suc,SRVA.med.at-1)});
  st("HT at her master tonight (Hầu trà · Lui sau bình phong)",()=>{S.tonight=srvM();S.buoi=B4L});
  st("bought by a rival (Lén báo tin)",()=>{const v=rivals.find(x=>x.alive&&x!==srvM());S.srv.spyFor=v.id});
  st("punished: Tân Giả khố (lau)",()=>{S.srv.lau=2});
  try{DR.srvStart();const m=srvM();const v=rivals.find(x=>x.alive&&x!==m&&!x.queen);const q=rivals.find(x=>x.alive&&x.queen&&x!==m);const s=(typeof allServ==="function"?allServ():[]).find(x=>x&&x.sid!=null);const man=(typeof srvMen==="function"?srvMen():[]).find(x=>typeof srvAdult!=="function"||srvAdult(x));if(man)man.tinh=999;
   S.tin=99;S.srv.intel=[v.id];
   const K={"mis (her own chủ)":{sk:"mis"},"rv (another consort)":{sk:"rv",ref:{id:v.id}},"hh (Hoàng hậu)":q?{sk:"hh",ref:{id:q.id}}:null,"rv = chủ (met outside)":{sk:"rv",ref:{id:m.id}},"emp (Hoàng thượng)":{sk:"emp"},"ty (thái y)":{sk:"ty"},"task (errand place)":(S.srv.sent={k:"x",n:"Việc chủ sai",until:bid()+9,done:0},{sk:"task"})};
   K["sv (another servant)"]=s?{sk:"sv",sid:s.sid}:null;K["man (a man met, tình ý max)"]=man?{sk:"man",mid:man.id}:null;
   for(const k in K){try{R.pop[k]=K[k]?srvTalk(K[k]).map(a=>String(a.n)):["(none in this save)"]}catch(e){R.pop[k]=["ERR "+e.message]}}
   R.lowTin=(()=>{S.tin=0;try{return srvTalk({sk:"mis"}).map(a=>String(a.n))}catch(e){return ["ERR "+e.message]}})()}catch(e){R.pop.err=["ERR "+e.message]}
  return R});
 out.perr=perr;fs.writeFileSync(OUT,JSON.stringify(out));await b.close();summary(out,DECK)})().catch(e=>{console.error(e);process.exit(1)});
