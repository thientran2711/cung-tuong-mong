/* ge-shots (review/grand-endings-engine): host-mode screenshots of the grand-ending screens at the owner's devices (Fold 755x1000@2, iPad 1180x820@2):
   1 Hồi kết nhánh · Ngã rẽ 1, 2 Ngã rẽ 2, 3 the Đại kết cục event (tt_co ge2, a stay ending, success), 4 the «Thiên mệnh» title notice,
   5 NHIỆM VỤ › Thiên mệnh tab (Bảng), 6 Sổ luân hồi (life line + Thiên mệnh rows), 7 a fail outcome, 8 the quiet form.
   Checks per shot: no page error, no horizontal overflow, the expected words on screen. Shots go OUTSIDE the repo (never in git).
   usage: node dev/test/ge-shots.js <outdir> [url] [WxH@dpr,…] */
const path=require('path');const fs=require('fs');const {chromium}=require('playwright');
const OUT=process.argv[2]||'/tmp/ge-shots';const URL=process.argv[3]&&process.argv[3]!=='-'?process.argv[3]:'file://'+path.resolve(__dirname,'../index.html');
const SIZES=(process.argv[4]||'755x1000@2,1180x820@2').split(',').map(s=>{const m=s.match(/(\d+)x(\d+)@(\d+)/);return {w:+m[1],h:+m[2],d:+m[3]}});
fs.mkdirSync(OUT,{recursive:true});const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);if(!c)console.error('FAIL',n,JSON.stringify(x).slice(0,600))};
(async()=>{const b=await chromium.launch();
 for(const z of SIZES){const tag=`${z.w}x${z.h}`;const ctx=await b.newContext({viewport:{width:z.w,height:z.h},deviceScaleFactor:z.d,serviceWorkers:'block'});const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(0);
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,300)));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof geS==='function',null,{timeout:0});await p.waitForTimeout(2500);
  await p.evaluate(async()=>{localStorage.removeItem('ctm-ge');const road='tt_co',k='tt';quiet=true;const others=Object.keys(ARC67).filter(id=>ARC67[id].o===k&&id!==road);
   localStorage.setItem('ctm-arcs',JSON.stringify({[k]:others}));localStorage.setItem('ctm-tm96','1');window.__forceOrigin=k;document.getElementById('title').hidden=true;const kl=document.getElementById('kload');if(kl)kl.remove();window.__nlInner=1;start();window.__nlInner=0;quiet=false;try{kmReset()}catch(e){}
   await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st&&S.st.f14)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;
   const s=geS();s.pull=[2,9,0,1];s.st=['o','o','x','o'];s.cx[2]=8;S.duc=62;S.sung=64;S.st.ch.all=1;S.st.f14.ends[11]='win';render();await new Promise(r=>setTimeout(r,2500));try{kmReset()}catch(e){}Q.length=0;geAsk();showModal()});
  const shot=async(n,want)=>{await p.waitForTimeout(600);await p.waitForFunction(()=>!(window.KLIFE&&KLIFE.on),null,{timeout:90000}).catch(()=>console.log('life gate still on'));await p.waitForTimeout(900);await p.evaluate(()=>{try{kmReset()}catch(e){}});await p.waitForTimeout(500);const f=path.join(OUT,`${tag}-${n}.png`);await p.screenshot({path:f});
   const t=await p.evaluate(()=>({txt:document.body.innerText,ov:document.documentElement.scrollWidth>innerWidth+1}));
   const low=t.txt.toLowerCase().replace(/\s+/g,' ');const has=w=>low.includes(w.toLowerCase())||low.includes(w.toLowerCase().replace(/ngươi/g,'ta'));
   chk(`${tag} ${n}: words on screen`,want.every(has),want.filter(w=>!has(w)));chk(`${tag} ${n}: no horizontal overflow`,!t.ov,null);console.log('shot',f)};
  await shot('1-hoi-nga-re-1',['Hồi kết nhánh','Ngã rẽ 1','Ở lại, giữ trọn phận mình','Rời khỏi cung cấm','Theo người ấy đi']);
  await p.evaluate(()=>chooseM(0));await shot('2-hoi-nga-re-2',['Ngã rẽ 2','Lấy ân mà đối đãi','Lấy uy mà trị','Buông bỏ tất cả']);
  await p.evaluate(()=>{const r0=window.roll;window.roll=()=>true;chooseM(0);window.roll=r0});
  await shot('3-dai-ket-cuc',['Đại kết cục','Hiền tướng hậu cung','Tạ ơn']);
  await p.evaluate(()=>chooseM(0));await shot('4-danh-hieu-moi',['Hiền tướng hậu cung']);
  await p.evaluate(()=>{Q.length=0;showModal();dhPanel()});await p.waitForTimeout(600);
  await p.evaluate(()=>{const t=document.querySelector('[data-kdhtab="tm"]');if(t)t.click()});await shot('5-bang-thien-menh',['Thiên mệnh','Bảng Thiên mệnh','Hiền tướng hậu cung']);
  /* a fail outcome and the quiet form (fresh states) */
  await p.evaluate(()=>{Q.length=0;S.ge=null;const s=geS();s.st[0]='f';geAnswer(1,1);showModal()});await shot('7-ket-cuc-thua',['Kết cục','Ngai đổ họ tan']);
  await p.evaluate(()=>{Q.length=0;S.ge=null;const s=geS();s.pull=[0,3,0,0];geAnswer(3,0);showModal()});await shot('8-quiet',['Kết cục','Lời ngay trái tai','Cuộc đời ngươi vẫn tiếp tục như thế']);
  /* Sổ luân hồi: this life recorded, the title screen's book */
  await p.evaluate(()=>{Q.length=0;S.ge=null;const s=geS();s.r1=0;s.lt=0;const r=geResolve(0,true);Q.length=0;S.dead=false;lifeSave('Thọ chung');try{localStorage.setItem('ctm-shotlife','1')}catch(e){}});
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof geS==='function',null,{timeout:0});await p.waitForTimeout(3000);
  await p.evaluate(()=>{const b=document.querySelector('button[data-tgo="past"]');if(b)b.click()});await p.waitForTimeout(800);
  await p.evaluate(()=>{const m=document.querySelector('#modal .kpt-mount');const h=[...(m?m.querySelectorAll('h3'):[])].find(x=>/Thiên mệnh/.test(x.textContent));if(h)h.scrollIntoView({block:'center'})});
  await shot('6-so-luan-hoi',['Đại kết cục: Hiền tướng hậu cung','Danh hiệu Thiên mệnh']);
  chk(`${tag}: no page errors`,!errs.length,errs.slice(0,5));await ctx.close()}
 await b.close();const nb=ok.filter(x=>!x[1]).length;console.log(`ge-shots: ${ok.length-nb}/${ok.length} pass`);process.exit(nb?1:0)})();
