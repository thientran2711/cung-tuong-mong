/* review/kit-info-fixed (KIT §6.3h, owner #86 option A): the person info block (.pc .pcf rows) has a FIXED height: every row is ONE line, a long value («Dạo này» story) is a one-line headline + a kit «!» that opens the full text;
   the action list stays right under the block (first act fully inside the panel, no scrolling). Injects a very long «Dạo này» text into each person card and checks: block height unchanged, rows one line, «!» present + popup has the whole text.
   usage: node dev/test/kit-info-fixed.js <url> [WxH,...] [tab,...] */
const {chromium}=require('playwright');
const [,,URL,SIZES,TABS]=process.argv;
(async()=>{const b=await chromium.launch();let bad=0;
 for(const wh of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block',hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await ctx.addInitScript(()=>{setInterval(()=>{if(!window.__noskip)document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitInfoOneLine==='function',null,{timeout:240000});await p.waitForTimeout(1500);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});const m=document.getElementById('modal');if(m)m.hidden=true;
   try{kn();for(const v of rivals){S.met[v.id]=1};for(const v of rivals)k61Meet(v,"gặp",3)}catch(e){}render();window.__noskip=true;
   window.tabGo=t=>{Q.length=0;document.getElementById('modal').hidden=true;tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){};return 'ok'}});await p.waitForTimeout(1500);
  const out={};
  for(const t of (TABS||'rv,staff,court').split(',')){await p.evaluate(t=>tabGo(t),t);await p.waitForTimeout(2200);
   out[t]=await p.evaluate(async()=>{const sleep=ms=>new Promise(r=>setTimeout(r,ms));const R=e=>e.getBoundingClientRect();const pc=document.querySelector('.pc');if(!pc)return {nopc:true};const st=pc.querySelector('.kpstick')||pc.querySelector('.pcf');const P=document.getElementById('panel');
    const h0=Math.round(R(st).height);const rows=[...pc.querySelectorAll('.pcf .kr')];const v=rows.map(r=>r.querySelector('.krv')).filter(Boolean);
    const last=v[v.length-1];const LONG='Trong cung: '+'Ta đã quen biết nàng ta từ buổi yến đầu xuân, nghe nói nàng ta được ban nhiều món đồ quý nhưng lòng ghen ghét ngày một nặng thêm với phi tần trong cung Hoàng hậu. '.repeat(3);
    if(last){last.dataset.k1full=LONG;last.innerHTML=LONG}kitInfoOneLine(document);await sleep(300);
    const h1=Math.round(R(st).height);const oneLine=v.every(x=>R(x).height<=parseFloat(getComputedStyle(x).fontSize)*1.9);const bang=last?last.querySelector('.kgnb'):null;
    let popFull=false;if(bang){bang.click();await sleep(400);const k=document.getElementById('kpop');popFull=!!(k&&!k.hidden&&/lòng ghen ghét ngày một nặng/.test(k.innerText))}
    const act=[...pc.querySelectorAll('.pcr button.ka')].find(b=>b.offsetParent&&R(b).width>0);const actOk=act?(R(act).top>=R(P).top&&R(act).top+Math.min(R(act).height,80)<=R(P).bottom+1):true;
    return {rows:v.length,h0,h1,oneLine,bang:!!bang,popFull,actTop:act?Math.round(R(act).top-R(P).top):null,actOk}})}
  const f=[];for(const [t,o] of Object.entries(out)){if(o.nopc){f.push(t+': no person card');continue}if(Math.abs(o.h0-o.h1)>2)f.push(`${t}: block height changed ${o.h0}→${o.h1}`);if(!o.oneLine)f.push(t+': a row is not one line');if(!o.bang)f.push(t+': no «!» on the long row');if(!o.popFull)f.push(t+': popup lacks the full text');if(!o.actOk)f.push(t+': first act not visible under the block')}
  if(errs.length)f.push('errors '+errs.join('|'));if(f.length)bad++;console.log(wh,f.length?'FAIL '+f.join('; '):'PASS',JSON.stringify(out));await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
