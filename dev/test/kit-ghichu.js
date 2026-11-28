/* review/kit-ghichu-bang (KIT §62.1): a «Ghi chú» row is never drawn — its text sits behind a kit round «!» at the end of the row above it; tap → kit popup titled «Ghi chú» with that text.
   usage: node dev/test/kit-ghichu.js <url> [WxH,...]   (renders kitRows into a probe div; no game start) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));
const [,,URL,SIZES]=process.argv;
(async()=>{const b=await chromium.launch();let bad=0;
 for(const wh of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block',hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitRows==='function'&&typeof kpPop==='function',null,{timeout:240000});
  const r=await p.evaluate(()=>{const d=document.createElement('div');d.id='gc';d.style.cssText='position:fixed;left:20px;top:40px;width:340px;background:#fff;z-index:99998;font-size:16px;padding:10px';
   d.innerHTML=kitRows([['Bổng','Quý nhân: +70 bạc','g'],['Bị cắt xén','Nội vụ phủ bớt 18 bạc','r'],['Ghi chú','cắt xén vì thái giám Nội vụ phủ lo việc phát bổng vốn tham','n'],['Còn','Bạc 154','n']])+'<hr>'+kitRows([['Ghi chú','chỉ một dòng','n']]);document.body.appendChild(d);
   const tabs=[...d.querySelectorAll('.kpkb')];const rows1=[...tabs[0].querySelectorAll('.krl')].map(x=>x.textContent);const rows2=[...tabs[1].querySelectorAll('.krl')].map(x=>x.textContent);
   const bang=d.querySelector('.kgnb');const owner=bang&&bang.closest('.kr');const R=e=>e.getBoundingClientRect();
   return {rows1,rows2,bangN:d.querySelectorAll('.kgnb').length,ownerLabel:owner?owner.querySelector('.krl').textContent:'',bangRight:bang?R(bang).right<=R(d).right+1:false,bangSameLine:bang&&owner?Math.abs((R(bang).top+R(bang).height/2)-(R(owner.querySelector('.krv .ef')).top+R(owner.querySelector('.krv .ef')).height/2))<=R(owner).height:false}});
  await p.click('#gc .kgnb');await p.waitForTimeout(400);
  r.pop=await p.evaluate(()=>{const k=document.getElementById('kpop');return k&&!k.hidden?{title:(k.querySelector('.kpopt')||{}).textContent,text:k.innerText.slice(0,200)}:null});
  r.sec=await p.evaluate(async()=>{try{kitModal({kind:'rule',title:'Thử',sub:'',sections:[{h:'Năm bậc',tiers:[{k:'Bậc 1',n:'a',c:'g',on:true}]},{h:'Ghi chú',rows:[['Lên bậc','Sắc +2 mỗi bậc','t']]}],btn:'Đã hiểu'});await new Promise(r=>setTimeout(r,500));const M=document.getElementById('modal');const hs=[...M.querySelectorAll('h4.kpst')].map(h=>h.textContent.trim());const b=M.querySelector('h4.kpst .kgnb');b&&b.click();await new Promise(r=>setTimeout(r,400));const k=document.getElementById('kpop');return {hs,bang:!!b,pop:k&&!k.hidden?k.innerText.slice(0,120):''}}catch(e){return {err:e.message}}});
  r.title=await p.evaluate(()=>{const d=document.createElement('div');d.innerHTML=kitNoteBang('x','Phần của ngươi');return d.firstChild.dataset.kfxt});
  const f=[];if(r.sec.err||r.sec.hs.some(h=>/ghi chú/i.test(h))||!r.sec.bang||!/lên bậc/i.test(r.sec.pop))f.push('section «Ghi chú»: '+JSON.stringify(r.sec));if(r.title!=='Phần của ngươi')f.push('kitNoteBang title arg '+r.title);if(r.rows1.join('|')!=='Bổng|Bị cắt xén|Còn')f.push('rows '+r.rows1);if(r.rows2.join('|')!=='Ghi chú')f.push('lone Ghi chú row must stay '+r.rows2);if(r.bangN!==1)f.push('bang count '+r.bangN);if(r.ownerLabel!=='Bị cắt xén')f.push('bang on '+r.ownerLabel);if(!r.bangRight)f.push('bang outside');
  if(!r.pop||r.pop.title!=='Ghi chú'||!/cắt xén vì thái giám/.test(r.pop.text))f.push('popup '+JSON.stringify(r.pop));if(errs.length)f.push('errors '+errs.join('|'));if(f.length)bad++;
  console.log(wh,f.length?'FAIL '+f.join('; '):'PASS',JSON.stringify(r));await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
