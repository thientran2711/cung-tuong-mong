/* review/kit-mg-intro: kitFocus F.intro rules card in the play layer (KIT §92.4). usage: node dev/test/kit-mg-intro.js <url> <outdir> [WxH,..] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});let bad=0;
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitFocus,null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');tab='act';render();
   window.__acts=n=>Array.from({length:n},(_,i)=>({id:'a'+i,n:['Sai cung nữ thân tín mua lén ngoài cung','Hỏi han sức khỏe','Rỉ tai chuyện trong cung','Hối lộ người ở Thái y viện'][i]||('Việc số '+(i+1)+(i%3===0?' có tên khá dài để xuống dòng thêm một dòng nữa':'')),pic:'',word:['Liều','Khó','Tùy duyên','Khá chắc','Chắc','Nắm chắc','Nắm chắc','Tùy duyên','Tùy duyên'][i%9],ton:i===2?'2 khắc · Đức -2':i===3?'1 khắc · 20 bạc':(1+i%3)+' khắc',info:'<div class="kpopt">Tốn '+(1+i%3)+' khắc</div><p>Được: thiện cảm</p>',off:i===2,why:i===2?'Chưa đủ tin cậy':''}))});
  await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle{display:none!important}'});
  await p.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(/Vào cung ngay/.test(b.textContent)&&b.offsetParent)b.click()});await p.waitForTimeout(1500);
  const f=[];const run=async(label,fn)=>{try{const r=await fn();if(r&&r.length)f.push(...r.map(x=>label+': '+x))}catch(e){f.push(label+' threw '+e.message.split('\n')[0])}};
  const OPEN=`(()=>{const im=document.querySelector('#tokens .tok.fig img.figimg');if(!im)return 'nofig';window.__F=kitFocus.open({p:(typeof curPeople==='function'?curPeople()[+im.closest('.tok').dataset.p]:null),fig:im,from:im.getBoundingClientRect(),groups:[{k:'g1',n:'Giao thiệp',can:2,tot:9,acts:__acts(9)},{k:'g2',n:'Mưu kế',can:1,tot:3,acts:__acts(3)}],onAct:id=>{window.__act=id},onClose:()=>{window.__closed=1}});return 'ok'})()`;
  await run('intro',async()=>{await p.evaluate(()=>{KIT_FOC.motion=null;document.documentElement.classList.add('kf-still')});
   const o=await p.evaluate(OPEN);if(o!=='ok')return ['no stage figure ('+o+')'];await p.waitForTimeout(700);
   const g=await p.evaluate(async()=>{const F=window.__F;let went=0;const R=e=>e.getBoundingClientRect();
    F.play({skip:{n:'Bỏ qua',sub:'kết quả thường',onSkip(){}},onBack(){}});
    const fx=document.createElement('div');fx.id='kfxcv';fx.style.cssText='position:fixed;left:0;top:0;width:50px;height:50px;background:red;z-index:9450';document.body.appendChild(fx);
    const c=F.intro({title:'Chạm đúng nhịp',rows:[['Việc','Ôm đàn cho Nhụy phi','t'],['Chạm','Vòng khép dần quanh nàng: chạm đúng lúc vòng chuyển xanh, ba nhịp.','t'],['Được','Đúng nhịp càng nhiều càng thành.','t']],go:'Sẵn sàng',sub:'bắt đầu chơi',onGo(){went=1}});
    await new Promise(r=>setTimeout(r,250));if(!c)return {err:'no card'};
    const cr=R(c),L=R(F.el),h=c.querySelector('h4'),sk=F.q('.kfoc-skipw .kfoc-skip'),skr=sk?R(sk):null,go=c.querySelector('.kgr-go'),gr=R(go);
    const lh=parseFloat(getComputedStyle(h).lineHeight)||parseFloat(getComputedStyle(h).fontSize)*1.3;
    const out={card:[Math.round(cr.left),Math.round(cr.top),Math.round(cr.width),Math.round(cr.height)],inLayer:cr.left>=L.left-1&&cr.right<=L.right+1&&cr.top>=L.top-1&&cr.bottom<=L.bottom+1,clipped:c.scrollHeight>c.clientHeight+1||c.scrollWidth>c.clientWidth+1,
     titleOneLine:h.getBoundingClientRect().height<lh*1.6,titleCut:h.scrollWidth>h.clientWidth+1,goIn:gr.bottom<=cr.bottom+1&&gr.top>=cr.top,rows:c.querySelectorAll('.kgr-row,.kb,[class*=krow]').length,
     skipVisible:!!skr&&skr.width>0,skipOverlap:!!skr&&!(skr.bottom<=cr.top||skr.top>=cr.bottom||skr.right<=cr.left||skr.left>=cr.right),
     fxHidden:getComputedStyle(fx).visibility==='hidden',cls:document.documentElement.classList.contains('kfoc-playing')};
    window.__went=()=>went;window.__fx=fx;window.__c=c;window.__go=go;return out});
   try{await p.screenshot({path:OUT+'/intro-'+wh+'.png'})}catch(x){}
   Object.assign(g,await p.evaluate(()=>{const F=window.__F,o={};window.__go.click();o.went=window.__went();o.removed=!window.__c.isConnected;F.endPlay();o.clsOff=!document.documentElement.classList.contains('kfoc-playing');window.__fx.remove();try{F.close()}catch(e){}return o}));
   console.log(wh,JSON.stringify(g));const e=[];if(g.err)e.push(g.err);else{if(!g.inLayer)e.push('card outside layer');if(g.clipped)e.push('card clipped');if(!g.titleOneLine||g.titleCut)e.push('title wraps/cut');if(!g.goIn)e.push('go outside');if(!g.skipVisible)e.push('skip missing');if(g.skipOverlap)e.push('skip overlaps card');if(!g.fxHidden)e.push('fx layer not hidden');if(!g.went||!g.removed)e.push('go did not fire/close');if(!g.clsOff)e.push('class not cleared')}
   return e});
  console.log(wh,f.length?'FAIL '+f.join(' | '):'ok intro',errs.length?'PAGEERR '+errs[0]:'');if(f.length||errs.length)bad=1;await ctx.close()}
 await b.close();process.exit(bad)})();
