/* ACT-INVENTORY (ACT-MERGE, owner 26/11 ~07:25Z «gộp hết toàn bộ của cái game chứ không phải là của riêng gì cái tab hành sự»).
   Counts EVERY action button of the WHOLE game from the built page (index.html == LIVE, md5 checked by the caller), per screen:
     - every person kind met on Dư đồ (dfActs = the stage pop-up a tap on a person opens), by pop-up tab, over scenarios × buổi × seeds
       (kinds: rival, hh, th, emp, maid, serv, man, min, ty, kid, mm, ksp, elder, fallen, peddler, chest …; whoever the schedules put there)
     - every tab panel (Hành sự, Hậu cung consort cards rv:*, Cung nhân staff:*, Hoàng tự kid:*, Tư trang inv, Tài nghệ art, Mệnh truyện story,
       Giao tình rel + fac), by group pane, nav excluded
     - the cung nữ road (srvTalk by person kind + Phận sự deck) and the lãnh cung deck
   Then a STATIC index: each button name → the first file:line in dev/build/j*.js that holds it (literal search, X-names collapsed).
   Reuses the act-audit harness (dev/test/act-audit.js LIB: AA.scen / AA.surfaces / AA.show) and the dup-report scan v3 ideas (review/dup-report).
   usage: node dev/tools/act-inventory.js <out.json> [url]        → scan + prints the per-screen table
          node dev/tools/act-inventory.js --sum <out.json>        → reprint from a saved scan
   No game code is touched. */
const fs=require('fs');const path=require('path');const ROOT=path.resolve(__dirname,'../..');
const SCN=['dau','cao','hh','con'];
/* names that differ only by the person named inside count ONCE (the button is one feature with a picker) */
const COL=n=>String(n).replace(/\s+/g," ").trim()
 .replace(/^Bàn tán về .+$/,"Bàn tán về <người>").replace(/^Nhờ .+ đưa thư kêu oan$/,"Nhờ <người> đưa thư kêu oan")
 .replace(/^Hỏi han ở .+$/,"Hỏi han ở <nơi>: ai cần giúp?").replace(/^Lén báo tin cho .+$/,"Lén báo tin cho <người>")
 .replace(/^Để ý một (nam nhân áo gấm|vị vương gia|vị thái y)$/,"Để ý một nam nhân").replace(/^(Hoàng hậu|Người lạ)(?=[A-ZĐÂ])/,"")
 .replace(/\s*\[.*\]$/,"");
let SRC=null;
function srcIndex(){if(SRC)return SRC;SRC=[];const D=path.join(ROOT,'dev/build');for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)&&!/sd\.js$/.test(f)))
 fs.readFileSync(path.join(D,f),'utf8').split('\n').forEach((l,i)=>SRC.push([f+':'+(i+1),l]));return SRC}
function where(n){const s=COL(n).replace(/<[^>]+>.*$/,"").replace(/[:…].*$/,"").trim();if(s.length<4)return"";const I=srcIndex();
 for(const pre of [s,s.slice(0,Math.max(6,Math.min(s.length,18)))]){const q=[`"${pre}`,"`"+pre,`'${pre}`];for(const [w,l] of I)if(q.some(x=>l.includes(x)))return w}
 for(const [w,l] of I)if(l.includes(s))return w;return""}
const strip=h=>String(h||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().slice(0,110);
function summary(out){const P=(...a)=>console.log(...a);const T=[];
 P("ACT-INVENTORY on",out.url,"· md5",out.md5||"?","· page errors",out.perr.length);
 P("\n# 1. TAP A PERSON (Dư đồ stage pop-up, dfActs) — by person kind; max = the most buttons one pop-up showed; distinct = union of collapsed names");
 const K=out.pop;for(const k of Object.keys(K).sort((a,b)=>K[b].max-K[a].max)){const x=K[k];const names=Object.keys(x.names);
  P(`\n## ${k} — seen ${x.seen}× · one pop-up ${x.min}–${x.max} buttons · distinct ${names.length}`);
  P("   tabs (max per tab):",Object.entries(x.tabs).map(([g,n])=>g+" "+n).join(" · "));
  for(const n of names){const a=x.names[n];P(`   - ${n} | ${a.g} | ${a.ton||"—"} | ${a.small||""} | ${where(n)||"(runtime only)"}`)}
  T.push(["Dư đồ › chạm "+k,x.max,names.length])}
 P("\n# 2. TABS (panel buttons by pane, nav excluded) — union over scenarios");
 for(const id of Object.keys(out.tab)){const x=out.tab[id];
  /* an ACT button names a cost (tốn / khắc / bạc) or sits in a named act pane; list rows, sub-tabs, ⓘ help and filters are not acts */
  const isAct=n=>{const a=x.names[n];return !/^ⓘ/.test(n)&&((a.g&&a.g!=="-")||/tốn|khắc|bạc/i.test(a.small||""))};
  const names=Object.keys(x.names).filter(isAct);x.actN=names.length;P(`\n## ${id} — one panel ${x.min}–${x.max} buttons incl. nav/list rows · ACT buttons (named cost or act pane) ${names.length}`);
  const byG={};for(const n of names){const g=x.names[n].g||"-";(byG[g]=byG[g]||[]).push(n)}
  for(const g in byG)P(`   [${g}] ${byG[g].length}: `+byG[g].map(n=>n+" ("+(where(n)||"rt")+")").join(" · "));T.push([id,"(see list)",names.length])}
 if(out.srv){P("\n# 3. CUNG NỮ ROAD (srvTalk by person kind; Phận sự deck)");for(const k in out.srv.pop){const L=[...new Set(out.srv.pop[k].map(COL))];P(`   pop-up ${k}: ${L.length} · `+L.join(" · "));T.push(["cung nữ › chạm "+k,L.length,L.length])}
  const D=[...new Set(out.srv.deck.map(COL))];P(`   Phận sự deck: ${D.length} · `+D.join(" · "));T.push(["cung nữ › Phận sự",D.length,D.length])}
 if(out.cold){const D=[...new Set(out.cold.map(COL))];P(`\n# 4. LÃNH CUNG deck: ${D.length} · `+D.join(" · "));T.push(["Lãnh cung deck",D.length,D.length])}
 P("\n# TOTALS (screen | most buttons on one screen | distinct collapsed names)");for(const r of T)P("   "+r.join(" | "));
 const all=new Set();for(const k in K)Object.keys(K[k].names).forEach(n=>all.add(n));for(const id in out.tab){const x=out.tab[id];Object.keys(x.names).filter(n=>!/^ⓘ/.test(n)&&((x.names[n].g&&x.names[n].g!=="-")||/tốn|khắc|bạc/i.test(x.names[n].small||""))).forEach(n=>all.add(n))}
 P("   DISTINCT action names, whole game (person pop-ups + tabs, consort road):",all.size);return T}
if(process.argv[2]==="--sum"){summary(JSON.parse(fs.readFileSync(process.argv[3],'utf8')));return}
const {chromium}=require('playwright');
const src=fs.readFileSync(path.join(ROOT,'dev/test/act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const OUT=process.argv[2],URL=process.argv[3]||'file://'+path.join(ROOT,'index.html');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},hasTouch:true,isMobile:true,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(3000);
 await p.evaluate(LIB);
 const out={url:URL,pop:{},tab:{},perr};
 await p.evaluate(()=>{window.AI={pop:{},tab:{}};
  AI.nm=x=>{const k=x.querySelector('.kan');if(k)return k.textContent.replace(/\s+/g," ").trim();const c=x.cloneNode(true);c.querySelectorAll('.kaart,small,.kwhy,figure').forEach(e=>e.remove());return (c.textContent||"").replace(/\s+/g," ").trim().slice(0,70)};
  AI.col=n=>String(n).replace(/\s+/g," ").trim().replace(/^Bàn tán về .+$/,"Bàn tán về <người>").replace(/^Nhờ .+ đưa thư kêu oan$/,"Nhờ <người> đưa thư kêu oan").replace(/^Hỏi han ở .+$/,"Hỏi han ở <nơi>: ai cần giúp?").replace(/^(Hoàng hậu|Người lạ)(?=[A-ZĐÂ])/,"");
  AI.add=(bag,key,list)=>{const x=bag[key]=bag[key]||{seen:0,min:1e9,max:0,tabs:{},names:{}};x.seen++;x.min=Math.min(x.min,list.length);x.max=Math.max(x.max,list.length);
   const per={};for(const a of list){per[a.g]=(per[a.g]||0)+1;const n=AI.col(a.n);if(!x.names[n])x.names[n]={g:a.g,ton:a.ton||"",small:a.small||""}}
   for(const g in per)x.tabs[g]=Math.max(x.tabs[g]||0,per[g])};
  AI.kindOf=q=>{let k=q.kind||"?";if(k==="rival"&&q.ref&&q.ref.queen)k="rival(Hoàng hậu)";return k};
  AI.places=(sc,bu)=>{for(const sf of AA.surfaces()){if(!sf.place)continue;try{AA.restore(1+bu);S.buoi=bu;used=0;AA.show(sf);const ppl=curPeople();
   ppl.forEach((q,i)=>{let g=null;try{g=dfActs(i)}catch(e){}if(!g)return;const L=[];for(const G of g)for(const a of G.acts)L.push({n:a.n,g:G.n,ton:a.ton,small:(a.small||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().slice(0,110)});
    let k=AI.kindOf(q);if(k==="rival"&&L.some(a=>/^Cùng cung/.test(a.n)))k="rival(cùng cung)";if(L.length)AI.add(AI.pop,k,L)})}catch(e){}}};
  AI.tabs=()=>{for(const sf of AA.surfaces()){if(sf.place)continue;try{AA.restore(1);AA.show(sf);const pan=document.querySelector('#panel');const tabs=[...pan.querySelectorAll('.pctabs .pct')].map(t=>t.dataset.pct||t.textContent.trim());const panes=[...pan.querySelectorAll('.pcg')];
   const L=[...pan.querySelectorAll('button')].filter(x=>typeof dfIsAct!=="function"||dfIsAct(x)).map(x=>{const pg=x.closest('.pcg');const gi=pg?panes.indexOf(pg):-1;
    const nav=/^[‹›✕×]$/.test(x.textContent.trim())||(/^rv:/.test(sf.id)&&gi<0&&!x.dataset.a&&!x.dataset.k);return nav?null:{n:AI.nm(x),g:gi>=0?(tabs[gi]||("g"+gi)):"",small:((x.querySelector('small')||{}).textContent||"").replace(/\s+/g," ").trim().slice(0,110)}}).filter(x=>x&&x.n);
   const id=sf.id.replace(/^rv:(HH )?.*$/,(m,h)=>h?"Hậu cung › thẻ Hoàng hậu":"Hậu cung › thẻ một phi tần").replace(/^staff:0$/,"Cung nhân › tab").replace(/^staff:\d+$/,"Cung nhân › một người hầu").replace(/^kid(:\d+)?$/,"Hoàng tự").replace(/^act$/,"Hành sự").replace(/^inv$/,"Tư trang").replace(/^art$/,"Tài nghệ").replace(/^story$/,"Mệnh truyện").replace(/^rel$/,"Giao tình › Ân oán").replace(/^fac$/,"Giao tình › Phe phái");
   AI.add(AI.tab,id,L)}catch(e){}}};
 });
 for(const sc of SCN){await p.evaluate(n=>{AA.scen(n);AI.tabs()},sc);for(let bu=0;bu<4;bu++){await p.evaluate(([n,b])=>{AA.scen(n);AI.places(n,b)},[sc,bu])}console.error(sc,'done')}
 /* cung nữ road: srvTalk by person kind + Phận sự deck; lãnh cung deck over 8 deals */
 out.srv=await p.evaluate(()=>{try{try{localStorage.clear()}catch(e){}document.getElementById("title").hidden=true;AA.reseed(11);let ok=false;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(isSrv()){ok=true;break}}if(!ok)return null;AA.hide();S.buoi=0;used=0;if(S.suc<60)S.suc=80;if(S.bac<200)S.bac=200;render();
  const m=srvM();const v=rivals.find(x=>x.alive&&x!==m&&!x.queen);const q=rivals.find(x=>x.alive&&x.queen&&x!==m);const s=(typeof allServ==="function"?allServ():[]).find(x=>x&&x.sid!=null);const man=(typeof srvMen==="function"?srvMen():[]).find(x=>x);S.tin=99;
  const K={"chủ (mis)":{sk:"mis"},"phi tần khác (rv)":{sk:"rv",ref:{id:v.id}},"Hoàng hậu (hh)":q?{sk:"hh",ref:{id:q.id}}:null,"Hoàng thượng (emp)":{sk:"emp"},"thái y (ty)":{sk:"ty"},"người hầu khác (sv)":s?{sk:"sv",sid:s.sid}:null,"nam nhân (man)":man?{sk:"man",mid:man.id}:null};
  const pop={};for(const k in K){try{pop[k]=K[k]?(typeof talkOpts==="function"?talkOpts(Object.assign({kind:"srv"},K[k])):srvTalk(K[k])).map(a=>String(a.n)):[]}catch(e){pop[k]=["ERR "+e.message]}}
  let dk=[];try{deal();dk=(Array.isArray(deck)&&deck.length?deck:typeof srvCards==="function"?srvCards():[]).map(a=>String(a.n))}catch(e){dk=["ERR "+e.message]}return {pop,deck:dk}}catch(e){return {pop:{err:[e.message]},deck:[]}}});
 out.cold=await p.evaluate(()=>{const all=new Set();for(let i=0;i<8;i++){try{AA.scen('cao');AA.reseed(100+i);S.out=1;if(i%2)S.dad=99;deal();render();const sf=AA.surfaces().find(s=>s.id==="act");AA.show(sf);document.querySelectorAll('#panel button .kan').forEach(e=>all.add(e.textContent.replace(/\s+/g," ").trim()))}catch(e){}}return [...all]});
 const R=await p.evaluate(()=>AI);out.pop=R.pop;out.tab=R.tab;
 try{out.md5=require('crypto').createHash('md5').update(fs.readFileSync(path.join(ROOT,'index.html'))).digest('hex')}catch(e){}
 fs.writeFileSync(OUT,JSON.stringify(out));await b.close();summary(out)})().catch(e=>{console.error(e);process.exit(1)});
