/* review/d-robot-bugs (Foreman D robot lives 25/11): scan + real checks for the bug family fixed there.
   #1 «f.rk.split is not a function»: a face's .rk is a CLASS STRING; every .rk string use goes through kitRk / kitRkCls (j15). Static scan + pcPort/mdH with rk = number / object / array / null / "c3 th".
   usage: node dev/test/d-robot-bugs.js [WxH,...]   (needs the BUILT root: python3 dev/build/assemble.py && bash dev/site/build_site.sh) */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const D=require('./lib/device');
const root=path.join(__dirname,'..','..');let bad=0;const ok=(n,c,x)=>{if(!c)bad++;console.log(c?'PASS':'FAIL',n,x===undefined?'':JSON.stringify(x))};
/* 1. static scan: every .rk string method call in the game code (before: j15 pcPort x2 unguarded; after: none outside the helper) */
{const dir=path.join(root,'dev','build');const hits=[];for(const f of fs.readdirSync(dir).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js')){fs.readFileSync(path.join(dir,f),'utf8').split('\n').forEach((l,i)=>{const re=/\.rk\.(split|slice|trim|replace|indexOf|startsWith|toLowerCase|match|substr)\b|\.rk\)\.(split|slice)\b/g;let m;while((m=re.exec(l)))hits.push(f+':'+(i+1)+' '+m[0])})}
 ok('scan: no .rk.<string method> call left (kitRk is the only way)',hits.length===0,hits)}
(async()=>{const srv=await D.serveRoot(process.env.ROOT_DIR);const b=await chromium.launch();
 for(const wh of (process.argv[2]||'755x1000,1180x820').split(',')){const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await p.route(/workers\.dev/,r=>r.abort());
  await p.goto(srv.url+'/index.html?khost=0',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await p.waitForTimeout(1500);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}render()});
  const r1=await p.evaluate(()=>{const out={};for(const [k,v] of [['num',3],['obj',{a:1}],['arr',["c1"]],['null',null],['str','c3 th'],['empty','']]){try{const f={rk:v,src:"",ini:"T",col:"#888"};const a=pcPort(f);const c=mdH(Object.assign({},f,{ini:"T"}));out[k]={port:(a.match(/class="pcp([^"]*)"/)||[])[1],md:(c.match(/class="md([^"]*)"/)||[])[1]}}catch(e){out[k]='THROW '+e.message}}return out});
  const bad1=Object.entries(r1).filter(([k,v])=>typeof v==='string'||/object|undefined|\[/.test(JSON.stringify(v)&&(v.port||'')+(v.md||'')));
  ok(wh+' #1 pcPort/mdH never throw, no junk class',bad1.length===0&&/rk-c3 rk-th/.test(r1.str.port)&&/rk-c3 rk-th/.test(r1.str.md),r1);
  /* #4 ✕ / Lui on «Tin chờ người sai đi» and «Tâm trạng · X» when a forced card (night flip choice nfch) is put in FRONT after the dialog was drawn: ✕ must close THE DIALOG (not answer the hidden choice) */
  await p.evaluate(()=>{try{kmReset()}catch(e){}['buoitr','klife','curtain'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov,[id^="kroul"],.kroul-ov').forEach(e=>e.remove());S.dead=false;Q.length=0;document.getElementById('modal').hidden=true});
  const NF=()=>({t:"Kính sự phòng",pid:"nfch",h:"<p>x</p>",opts:[{n:"Tranh sủng",fx:{}},{n:"Chặn ngự giá",fx:{}}]});
  const scen={
   look:()=>{Q.length=0;Q.push(NF());kitModal({kind:"info",look:1,title:"Tâm trạng · Thử",sub:"chưa rõ",subject:S,sections:[{h:"",rows:[["Tâm trạng","bình thản"]]}]});Q.unshift(Q.splice(Q.findIndex(m=>m.pid==="nfch"),1)[0])},
   tin:()=>{Q.length=0;S.away=[{id:"e1-0",by:"me",who:"mm:me",nm:"Tiểu cung nữ",k:"spy",lbl:"đi dò la",t0:0,due:0,back:1,read:0,rep:{t:"Tiểu cung nữ về",ok:null,L:["Nghe được vài lời."],d:[]}}];kitStatusIcon.refresh();kitStatusIcon.open("tin");const T=Q.filter(m=>m.t==='Tin chờ người sai đi');Q.length=0;T.forEach(m=>Q.push(m));showModal();Q.unshift(NF())}};
  for(const k of Object.keys(scen)){const src=scen[k].toString();
   await p.evaluate(`(()=>{const NF=${NF.toString()};(${src})()})()`);
   try{await p.waitForFunction(()=>!document.getElementById('modal').hidden,null,{timeout:8000})}catch(e){}await p.waitForTimeout(500);
   const r=await p.evaluate(()=>{const M=document.getElementById('modal');const x=[...M.querySelectorAll('.kit-x')].filter(e=>e.getClientRects().length)[0];return{title:(M.querySelector('.kptitle')||{}).textContent,x:x?JSON.stringify(x.getBoundingClientRect()):null,q:Q.map(m=>m.t)}});
   if(!r.x){ok(wh+' #4 '+k+' has a ✕',false,r);continue}
   const bb=JSON.parse(r.x);await p.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2);await p.waitForTimeout(700);
   const a=await p.evaluate(()=>{const M=document.getElementById('modal');return{title:(M.querySelector('.kptitle')||{}).textContent,q:Q.map(m=>m.t+'|'+(m.pid||''))}});
   ok(wh+' #4 '+k+': ✕ closes the dialog, the forced card is NOT answered',a.q.length===1&&a.q[0]==='Kính sự phòng|nfch'&&a.title!==r.title,{before:r,after:a});
   await p.screenshot({path:`${process.env.OUT||'/tmp'}/drb-${wh}-x-${k}.png`});
   await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true})}
  /* #3 options of a card whose dialog was drawn BEFORE a gate put another card in front («Bổng lộc tháng ba · Lễ nghĩa»: both options tapped with no effect): the tap must run THE DRAWN card's option */
  await p.evaluate(()=>{Q.length=0;window.__A=0;window.__B=0;document.getElementById('modal').hidden=true;Q.push({t:"Bổng lộc tháng ba · Lễ nghĩa",h:'<p class="past">Việc theo phẩm: lễ nghĩa 4 bạc.</p>',bl:1,opts:[{n:"Chu toàn lễ nghĩa",fx:{},go:()=>{window.__A=1}},{n:"Bớt lễ nghĩa",fx:{},go:()=>{window.__B=1}}]});showModal();Q.unshift({t:"Thư báo",h:"<p>x</p>"})});
  try{await p.waitForFunction(()=>!document.getElementById('modal').hidden,null,{timeout:8000})}catch(e){}await p.waitForTimeout(400);
  const ob=await p.evaluate(()=>{const b=document.querySelector('#modal .opt[data-m="0"]');if(!b)return null;const r=b.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}});
  if(!ob)ok(wh+' #3 option button exists',false);else{await p.mouse.click(ob.x,ob.y);await p.waitForTimeout(500);
   const r3=await p.evaluate(()=>({A:window.__A,B:window.__B,q:Q.map(m=>m.t)}));ok(wh+' #3 «Chu toàn lễ nghĩa» tap runs its option, the other card is untouched',r3.A===1&&r3.B===0&&r3.q.join('|')==='Thư báo',r3);
   await p.screenshot({path:`${process.env.OUT||'/tmp'}/drb-${wh}-opt.png`});await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true})}
  /* #4b look-up openers pushed many copies (dump: 10 queued): ONE card per title+sub, one ✕ closes it */
  await p.evaluate(()=>{Q.length=0;for(let i=0;i<6;i++)kitModal({kind:"info",look:1,title:"Tâm trạng · Thử",sub:"chưa rõ",subject:S,sections:[{h:"",rows:[["Tâm trạng","bình thản"]]}]})});
  await p.waitForTimeout(500);ok(wh+' #4b six taps on a look-up opener = ONE queued dialog',(await p.evaluate(()=>Q.length))===1);
  const xb=await p.evaluate(()=>{const x=[...document.querySelectorAll('#modal .kit-x')].filter(e=>e.getClientRects().length)[0];if(!x)return null;const r=x.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}});
  if(xb){await p.mouse.click(xb.x,xb.y);await p.waitForTimeout(500);ok(wh+' #4b one ✕ closes it',(await p.evaluate(()=>[Q.length,document.getElementById('modal').hidden])).join()==='0,true')}else ok(wh+' #4b has ✕',false);
  /* #2 (law 6b) the seller she buys from and whoever asks her something are named, never «???» */
  const shopTxt=async fn=>{await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('.kshop').forEach(e=>e.remove())});await p.evaluate(fn);await p.waitForTimeout(900);return p.evaluate(()=>[...document.querySelectorAll('.kshop,#modal')].map(e=>e.textContent).join(' '))};
  const nmE=await p.evaluate(()=>{S.court=S.court||{};const c=S.court.ped=S.court.ped||{name:"Lý Đức Toàn",role:"eunuch",rk:2};if(!c.name)c.name="Lý Đức Toàn";S.known=S.known||{};return c.name});
  const t1=await shopTxt(()=>{S.known[kOf61(S.court.ped)]=0;window.__b=k61Named(S.court.ped);petShop()}),t2=await shopTxt(()=>{S.known[kOf61(S.court.ped)]=0;kitShopNvp()});
  ok(wh+' #2 pet shop seller is named, not ???',t1.includes(nmE)&&!/Thái giám Nội vụ phủ\s*\?\?\?|\?\?\?/.test(t1.slice(0,4000)),{nm:nmE,has:t1.includes(nmE),q:/\?\?\?/.test(t1)});
  ok(wh+' #2 Nội vụ phủ shop seller is named, not ???',t2.includes(nmE)&&!/\?\?\?/.test(t2.slice(0,4000)),{nm:nmE,has:t2.includes(nmE)});
  const r2=await p.evaluate(()=>{const o={};try{rivals.forEach(x=>{S.known[kOf61(x)]=0});const v=rivals.find(x=>x.alive!==false&&!k61Named(x));if(!v){o.skip='no private rival';return o}o.vb=k61Named(v);ptOrdAdd("err",{},"Việc thử",v);o.va=k61Named(v)}catch(e){o.err=String(e)}return o});
  ok(wh+' #2 whoever orders / asks her something is named',!r2.err&&(r2.skip||(r2.vb===false&&r2.va===true)),r2);
  ok(wh+' no page errors',errs.length===0,errs);await ctx.close()}
 await b.close();srv.close();console.log(bad?'FAIL':'ALL PASS');process.exit(bad?1:0)})();
