/* review/kit-focus-fig-r2: the person focus figure = the stage figure 1:1 (size + feet line; x too unless a button column would drop under 200 px), real tap on an action button, tabs above the head, no column over the figure's head. usage: node dev/test/kit-focus-fig.js <url> <outdir> [WxH,..] */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
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
  const AREA=[150,H-60];
  const AREA_T=AREA[0],AREA_B=AREA[1];
  await run('fig',async()=>{await p.evaluate(()=>{KIT_FOC.motion=null;document.documentElement.classList.add('kf-still')});
   const n=await p.evaluate(()=>document.querySelectorAll('#tokens .tok.fig img.figimg').length);if(!n)return ['no stage figure'];const e=[];
   for(let k=0;k<Math.min(n,2);k++){
    const OP=OPEN.replace("querySelector('#tokens .tok.fig img.figimg')","querySelectorAll('#tokens .tok.fig img.figimg')["+k+"]");
    await p.addStyleTag({content:'#dawn,#modal,.kroul,.kmbox,.kne,#kmrew,[class*=kmrew],.kmov,#kxcatch{display:none!important}'});
    const pre=await p.evaluate(k=>{const r=document.querySelectorAll('#tokens .tok.fig img.figimg')[k].getBoundingClientRect();return {l:r.left,t:r.top,w:r.width,h:r.height,b:r.bottom}},k);if(pre.h<40||pre.b>820&&0)continue;if(pre.t<AREA_T||pre.b>AREA_B)continue;/* token not on the visible stage */
    const o=await p.evaluate(OP);if(o!=='ok'){e.push('open '+o);continue}await p.waitForTimeout(900);
    await p.evaluate(v=>{window.__pre=v},pre);const r=await p.evaluate(()=>{const F=window.__F,R=e=>{const r=e.getBoundingClientRect();return {l:r.left,t:r.top,w:r.width,h:r.height,b:r.bottom}};const s=window.__pre,f=R(F.img),b=document.querySelector('.kfoc-b:not(.kfoc-off)');const br=b.getBoundingClientRect();const x=br.left+br.width/2,y=br.top+br.height/2,hit=document.elementFromPoint(x,y);
     return {s,f,copy:F.copy,tabs:R(F.tabs),cl:R(F.cl),cr:R(F.cr),A:F.A,tap:{x,y,ok:!!hit&&b.contains(hit)||hit===b,by:hit?hit.tagName+'.'+String(hit.className).slice(0,30):'null'}}});
    const L='fig'+k;console.log(wh,L,'stage',Math.round(r.s.w)+'x'+Math.round(r.s.h),'bottom',Math.round(r.s.b),'| focus',Math.round(r.f.w)+'x'+Math.round(r.f.h),'bottom',Math.round(r.f.b),'dx',Math.round(r.f.l+r.f.w/2-(r.s.l+r.s.w/2)));
    if(!r.copy)e.push(L+': no stage rect, fallback size used');
    if(Math.abs(r.f.h-r.s.h)>1.5||Math.abs(r.f.w-r.s.w)>1.5)e.push(L+': focus figure size '+Math.round(r.f.w)+'x'+Math.round(r.f.h)+' != stage '+Math.round(r.s.w)+'x'+Math.round(r.s.h));
    if(Math.abs(r.f.b-r.s.b)>1.5&&!(r.f.t>r.s.t+1))e.push(L+': feet line moved '+Math.round(r.f.b-r.s.b)+'px');
    const dx=Math.abs(r.f.l+r.f.w/2-(r.s.l+r.s.w/2));if(dx>1.5){const room=Math.min(r.cl.w,r.cr.w);if(room<190)e.push(L+': x shifted '+Math.round(dx)+'px but columns only '+Math.round(room)+'px')}
    if(r.f.b>r.A.top+r.A.h+1)e.push(L+': figure below the focus area');
    await p.screenshot({path:OUT+'/focus-'+wh+'-'+k+'.png'});
    await p.evaluate(()=>{window.__act=null});await p.touchscreen.tap(r.tap.x,r.tap.y);await p.waitForTimeout(250);
    const act=await p.evaluate(()=>window.__act);if(!r.tap.ok)e.push(L+': real tap on an action button hits '+r.tap.by);else if(!act)e.push(L+': real tap on the action button did not call onAct');
    const xb=await p.evaluate(()=>{const x=document.querySelector('.kfoc-x').getBoundingClientRect();return [x.left+x.width/2,x.top+x.height/2,(()=>{const h=document.elementFromPoint(x.left+x.width/2,x.top+x.height/2);return !!h&&!!h.closest('.kfoc-x')})()]});
    if(!xb[2])e.push(L+': ✕ covered');else{await p.touchscreen.tap(xb[0],xb[1]);await p.waitForTimeout(120);{/* robot M1: while the layer plays its closing animation a tap must already reach what is under it */const cov=await p.evaluate(()=>{const e=document.elementFromPoint(innerWidth*.5,innerHeight*.55);return e&&e.closest('.kfoc')?e.className:''});if(cov)e.push(L+': 120 ms after ✕ the focus layer still catches taps ('+String(cov).slice(0,30)+')')}let gone=false;for(let w=0;w<20&&!gone;w++){await p.waitForTimeout(150);gone=await p.evaluate(()=>!document.querySelector('.kfoc')||!!window.__closed)}if(!gone)e.push(L+': real tap on ✕ did not close')}
    await p.evaluate(()=>{try{window.__F.destroy()}catch(e){}window.__closed=0});await p.waitForTimeout(300)}
   return e});
  console.log(wh,f.length?'FAIL '+f.join(' | '):'ok focus-fig',errs.length?'PAGEERR '+errs[0]:'');if(f.length||errs.length)bad=1;await ctx.close()}
 await b.close();process.exit(bad)})();
