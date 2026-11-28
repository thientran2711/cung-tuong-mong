/* ob-oan (owner 26/11 ~08:25Z «làm cách nào để giảm bớt oán ... giảm cái độ nguy hiểm»): real taps on the «Nguy hiểm chung» panel.
   1 the panel lists each person who endangers her: name · mức · oán in words · ghen · WHY (her real memory, else the driver), and a «Cách giảm» kit row;
   2 one «Làm lành với <phẩm tên>» kit option card per top person → the sub-choice holds the REAL acts (Tạ lỗi / Nhún nhường from talkOpts, Biếu quà làm lành);
   3 tapping Nhún nhường there lowers her oán by BAL.ag.cx.humble.oanDown (unless she refuses: netForgive) and spends talk khắc;
   4 «Nhờ bề trên che chở» → Xin Hoàng hậu che chở / Xin Thái hậu đỡ lời cards; «Phòng bị» → the j70 dialog;
   5 OLD SAVE (a life saved by the base build) loads and the panel opens.
   No server: files are served from disk through page.route.
   usage: node dev/test/ob-oan.js <newRoot> <oldRoot|-> <shotDir|-> [WxH@dpr ...]  → exit 1 on FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');
const [,,NEW,OLD0,SHOT0,...SZ]=process.argv;const OLD=OLD0&&OLD0!=='-'?OLD0:null;const SHOT=SHOT0&&SHOT0!=='-'?SHOT0:null;const SIZES=SZ.length?SZ:['755x1000@1','1180x820@1'];
const MIME={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webmanifest':'application/json','.mp3':'audio/mpeg','.ogg':'audio/ogg','.woff2':'font/woff2'};
const serve=async(ctx,root)=>{await ctx.route(/^https?:/,r=>{const u=new URL(r.request().url());if(u.hostname!=='ctm.local')return r.abort();
 const f=path.join(root,decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname));if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
 return r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[path.extname(f)]||'application/octet-stream'}})})};
const boot=async(p)=>{await p.goto('http://ctm.local/index.html',{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:180000});await p.waitForTimeout(1200);
 await p.evaluate(()=>{for(const id of ['kload','kroul','kroulw','dawn','klife']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}try{kitRoulette=o=>{try{o&&o.done&&o.done()}catch(e){}}}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  window.__forceOrigin='tt';for(let i=0;i<30;i++){start();if(!isSrv())break}});
 /* the life card (Thân phận kiếp này), when the boot lands on it: take it as a player does */
 for(let i=0;i<6;i++){const t=await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal button.opt')].find(x=>/^(Vào cung ngay|Nhận thân phận)/.test(x.innerText));if(!b||document.getElementById('modal').hidden)return'';b.click();return b.innerText.slice(0,20)});if(!t)break;await p.waitForTimeout(700)}
 await p.evaluate(()=>{for(const id of ['klife','kload','kroul','kroulw']){const x=document.getElementById(id);if(x)x.remove()}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()})};
/* two consorts who hate her: oán + a real memory (she slandered one), both known to her */
const seed=async p=>{try{await p.waitForFunction(()=>!document.getElementById('kdaytc'),null,{timeout:20000})}catch(e){}return p.evaluate(()=>{for(const id of ['klife','dawn','kload']){const x=document.getElementById(id);if(x)x.remove()}const C=liveRivals(true).filter(v=>!v.queen&&!persF(v,'harmGate',0)).slice(0,4);S.dKnown=S.dKnown||{};
 C.forEach((v,i)=>{v.oan=i%2?Math.max(70,netTh(v,'nguoi')+5):Math.max(3,netTh(v,'nguoi')-3);v.ghen=i%2?60:95;S.dKnown[v.id]=wk();try{S.met[v.id]=S.met[v.id]??wk()}catch(e){}try{const K=k61S();if(K)K[kOf61(v)]=3}catch(e){}});
 /* the two who really show on her bar (j28 danger × target share): one she can still win back (oán under her forgiving line), one past it */
 const T=tsDangerOf(S,true).top.slice(0,3).map(x=>x.v);/* the panel gives a «Làm lành» card to the top 3 */
 /* deterministic (rv RV-OB-OAN): L[0] = a SEEDED forgivable one (even index), L[1] = a seeded deep one (odd index), both on her bar */
 const L=[C.find((v,i)=>i%2===0&&T.includes(v)),C.find((v,i)=>i%2===1&&T.includes(v))].filter(Boolean);
 try{memAdd(L[0],S,"rumor",{})}catch(e){}
 /* the memory write may move oán: set it again under her forgiving line (netTh − 3), so «Nhún nhường» is open by design */
 if(L[0])L[0].oan=Math.max(3,netTh(L[0],'nguoi')-3);used=0;S.suc=Math.max(S.suc,80);S.bac=Math.max(S.bac,200);Q.length=0;render();return L.map(v=>({id:v.id,name:v.name,oan:Math.round(oan(v,S))}))})};
const openPanel=async p=>{await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();const b=document.querySelector('[data-hx="tsnh"],[data-k3="tsnh"]');if(b)b.click();else tsDangerPanel()});await p.waitForTimeout(500);return p.evaluate(()=>{
 const M=document.getElementById('modal');return{shown:M&&!M.hidden,title:Q[0]&&Q[0].t,txt:M?M.innerText:'',opts:[...document.querySelectorAll('#modal .opt[data-m]')].map(x=>x.innerText.replace(/\s+/g,' ').trim().slice(0,70))}})};
const tapOpt=(p,re)=>p.evaluate(re=>{const b=[...document.querySelectorAll('#modal .opt[data-m]')].find(x=>new RegExp(re).test(x.innerText));if(!b)return null;b.click();return b.innerText.slice(0,40)},re);
const settle=async p=>{for(let i=0;i<15;i++){const ok=await p.evaluate(()=>{const M=document.getElementById('modal');return !Q.length||(!M.hidden&&document.getElementById('mt').textContent===Q[0].t)});if(ok)return i;await p.waitForTimeout(200)}return -1};
/* the dialog's choices as the game holds them (Q[0].opts): shown in the centre modal, or — when that person stands in the room — in the
   stage encounter scene (jdfv kitFocus, J2), whose choice buttons call the same chooseM(k) */
const qOpts=p=>p.evaluate(()=>({t:Q[0]&&Q[0].t,inScene:!!(typeof DF!=='undefined'&&DF.encM&&DF.encM===Q[0]),o:(Q[0]&&Q[0].opts||[]).map(c=>({n:c.n,dis:!!(c.tsDis||c.off)}))}));
const choose=(p,re)=>p.evaluate(re=>{const M=document.getElementById('modal');const rx=new RegExp(re);const k=(Q[0]&&Q[0].opts||[]).findIndex(c=>rx.test(c.n));if(k<0)return null;
 if(!M.hidden&&document.getElementById('mt').textContent===Q[0].t){const b=M.querySelector('.opt[data-m="'+k+'"]');if(!b)return null;b.click();return'modal'}
 chooseM(k);return'scene'},re);
const modal=p=>p.evaluate(()=>{const M=document.getElementById('modal');return{shown:M&&!M.hidden,t:Q[0]&&Q[0].t,txt:M?M.innerText:'',opts:[...document.querySelectorAll('#modal .opt[data-m]')].map(x=>x.innerText.replace(/\s+/g,' ').trim().slice(0,70))}});
const closeRes=async p=>{for(let i=0;i<4;i++){const m=await modal(p);if(!m.shown||/Làm lành|Nguy hiểm|Nhờ bề trên|Phòng bị/.test(m.t||''))return m;await p.evaluate(()=>{const b=document.querySelector('#modal .kpx,#modal [data-kx],#modal .kbtn,#modal button.opt');if(b)b.click()});await p.waitForTimeout(300)}return modal(p)};
(async()=>{const b=await chromium.launch();const R=[];const ok=(c,n,x)=>{R.push(c);console.log((c?'PASS':'FAIL')+' | '+n+(x==null?'':' | '+JSON.stringify(x).slice(0,500)))};
 let oldSave=null;
 if(OLD){const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});await serve(ctx,OLD);const p=await ctx.newPage();await boot(p);await seed(p);
  oldSave=await p.evaluate(()=>JSON.stringify(ser()));ok(!!oldSave,'old build: a life saved');await ctx.close()}
 for(const sz of SIZES){const [w,h,d]=sz.split(/[x@]/).map(Number);const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:d||1,serviceWorkers:'block'});await serve(ctx,NEW);
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));const shot=async n=>{if(SHOT)await p.screenshot({path:`${SHOT}/${sz.replace(/[@x]/g,'_')}-${n}.png`})};
  await boot(p);const L=await seed(p);const P=await openPanel(p);await shot('1-panel');
  ok(P.shown&&P.title==='Nguy hiểm chung',sz+' panel opens from the Nguy hiểm chung box',P.title);
  ok(/cách giảm/i.test(P.txt)&&/Tạ lỗi/.test(P.txt)&&/Phòng bị/.test(P.txt),sz+' «Cách giảm» row names the real ways',P.txt.match(/cách giảm[^\n]*\n?[^\n]*/i)?.[0]);
  ok(L.every(x=>P.txt.includes(x.name)),sz+' every person who hates her is listed by name',L.map(x=>x.name));
  ok(/vì (ngươi|ta) đã tung tin đồn bẩn/.test(P.txt),sz+' WHY from her real memory (rumor deed)',P.txt.match(/vì [^\n·]*/g));
  ok(/oán \d+|Oán \d+|Chút oán|Oán sâu|Oán hận/.test(P.txt),sz+' oán level in words + number');
  ok(P.opts.filter(x=>/^Làm lành với/.test(x)).length>=2&&P.opts.some(x=>x.startsWith('Nhờ bề trên che chở'))&&P.opts.some(x=>x.startsWith('Phòng bị')),sz+' direct act cards',P.opts);
  /* 2/3 Làm lành → Nhún nhường */
  const v0=L[0];await tapOpt(p,'^Làm lành với[^\\n]*'+v0.name);await p.waitForTimeout(400);await settle(p);let M=await modal(p);await shot('2-mend');
  const Q1=await qOpts(p);
  ok(/Làm lành/.test(Q1.t||'')&&['Tạ lỗi','Nhún nhường','Biếu quà làm lành'].every(n=>Q1.o.some(x=>x.n===n)),sz+' Làm lành sub-choice = the real acts'+(Q1.inScene?' (in the stage encounter scene: she is in the room)':''),Q1);
  const before=await p.evaluate(id=>({o:Math.round(oan(RV(id),S)),k:used}),v0.id);const via=await choose(p,'^Nhún nhường$');await p.waitForTimeout(600);await shot('3-result');
  const after=await p.evaluate(id=>({o:Math.round(oan(RV(id),S)),k:used}),v0.id);
  const dn=await p.evaluate(()=>BAL.ag.cx.humble.oanDown);
  ok(after.k>before.k&&after.o<=before.o-dn+1,sz+' Nhún nhường ran ('+via+'): oán '+before.o+' → '+after.o+', khắc spent',after);
  await closeRes(p);
  /* 3b the one whose oán is past her forgiving line: Tạ lỗi / Nhún nhường closed with the reason, the gift still open */
  {await p.evaluate(()=>{used=0;Q.length=0;render()});await openPanel(p);await tapOpt(p,'^Làm lành với[^\\n]*'+L[1].name);await p.waitForTimeout(500);const M2=await modal(p);await shot('3b-deep');
   await settle(p);const dis=(await qOpts(p)).o.map(x=>[x.n,x.dis]);
   ok(await p.evaluate(()=>/oán còn quá sâu/i.test(String(Q[0]&&Q[0].h||'')))&&dis.filter(([n,d])=>/^(Tạ lỗi|Nhún nhường)/.test(n)).every(([n,d])=>d)&&dis.some(([n,d])=>/^Biếu quà/.test(n)&&!d),sz+' deep oán: Tạ lỗi / Nhún nhường closed with the reason, Biếu quà open',dis)}
  /* 4 Nhờ bề trên / Phòng bị */
  await p.evaluate(()=>{used=0;Q.length=0;render()});await openPanel(p);await tapOpt(p,'^Nhờ bề trên che chở');await p.waitForTimeout(400);M=await modal(p);await shot('4-help');
  ok(M.opts.some(x=>/Xin Thái hậu đỡ lời|Xin Hoàng hậu che chở/.test(x)),sz+' Nhờ bề trên → the real patron acts',M.opts);
  await p.evaluate(()=>{Q.length=0;render()});await openPanel(p);await tapOpt(p,'^Phòng bị');await p.waitForTimeout(400);M=await modal(p);await shot('5-def');
  ok(M.t==='Phòng bị'&&M.opts.length>0,sz+' Phòng bị → the j70 dialog',{t:M.t,o:M.opts.slice(0,3)});
  /* 5 old save */
  if(oldSave){const r=await p.evaluate(s=>{try{Q.length=0;deser(JSON.parse(s));render();return 'ok'}catch(e){return e.message}},oldSave);const P2=await openPanel(p);
   ok(r==='ok'&&P2.title==='Nguy hiểm chung'&&/cách giảm/i.test(P2.txt),sz+' old save loads and the panel opens',r)}
  ok(!errs.length,sz+' no page error',errs);await ctx.close()}
 await b.close();const f=R.filter(x=>!x).length;console.log(f?`FAIL ${f}/${R.length}`:`ALL PASS ${R.length}`);process.exit(f?1:0)})();
