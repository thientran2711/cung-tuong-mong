/* Update notes (D10): pop-up once per release, Settings "Thông tin cập nhật", never blocks boot / save load / co-op.
   usage: python3 dev/build/assemble.py && node dev/test/update-notes.js [WxH ...]   (default: the 5 viewports + 390x844) */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');
const VPS=(process.argv.slice(2).length?process.argv.slice(2):['755x1000','1000x755','1180x820','1366x1024','844x390','390x844']).map(s=>s.split('x').map(Number));
const OUTD=require('path').resolve(__dirname,'../shots/update-notes');require('fs').mkdirSync(OUTD,{recursive:true});let bad=0;
const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});
 for(const [w,h] of VPS){const tag=w+'x'+h;
  const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:true,isMobile:w<1100,reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  const boot=async()=>{await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>window.CTM_NOTES_UI&&document.querySelector('#modal.kpthome'),null,{timeout:90000})};
  const ovf=()=>p.evaluate(()=>{const M=document.getElementById('modal');const d=M&&M.querySelector('.dlg');return {page:document.documentElement.scrollWidth-innerWidth,dlg:d?d.scrollWidth-d.clientWidth:0,top:d?Math.round(d.getBoundingClientRect().top):null,bot:d?Math.round(d.getBoundingClientRect().bottom)-innerHeight:null}});
  /* 1. brand-new player: no pop-up, id recorded, boot not delayed */
  await boot();await p.waitForTimeout(4500);
  let s=await p.evaluate(()=>({seen:CTM_NOTES_UI.seen(),top:CTM_NOTES[0].id,pop:/Điều mới trong cung/.test(document.body.innerText),kind:(document.querySelector('#modal .dlg')||{}).dataset&&document.querySelector('#modal .dlg').dataset.kind}));
  ok(s.seen===s.top&&!s.pop,`${tag} new player: no pop-up, id recorded`,s);
  /* 2. Settings row + panel (title > Thiết lập) */
  await p.evaluate(()=>{document.querySelector('[data-tgo="opt"]').click()});await p.waitForTimeout(600);
  const row=await p.evaluate(()=>{const b=document.querySelector('#modal button[data-tgo="notes"]');if(!b)return null;const r=b.getBoundingClientRect();return {w:Math.round(r.width),h:Math.round(r.height),inView:r.bottom>0&&r.top<innerHeight}});
  ok(row&&row.h>=36,`${tag} Settings row "Thông tin cập nhật" present`,row);
  await p.evaluate(()=>{document.querySelector('#modal button[data-tgo="notes"]').scrollIntoView({block:'center'})});await p.waitForTimeout(200);
  await p.screenshot({path:`${OUTD}/${tag}-settings.png`});
  await p.evaluate(()=>document.querySelector('#modal button[data-tgo="notes"]').click());await p.waitForTimeout(700);
  const pn=await p.evaluate(()=>{const d=document.querySelector('#modal .dlg');return {kind:d&&d.dataset.kind,txt:d&&d.innerText.slice(0,260),facts:document.querySelectorAll('#modal .kfacts .kfact, #modal .kfacts > *').length,vis:!document.getElementById('modal').hidden}});
  ok(pn.vis&&pn.kind==='notice'&&/thông tin cập nhật/i.test(pn.txt)&&/ngày 16 tháng mười một/i.test(pn.txt),`${tag} Settings panel lists releases`,pn.txt&&pn.txt.slice(0,90));
  const o2=await ovf();ok(o2.page<=0&&o2.dlg<=0,`${tag} panel no horizontal overflow`,o2);
  await p.screenshot({path:`${OUTD}/${tag}-panel.png`});
  const nobad=await p.evaluate(()=>/%|phiên bản|cài đặt|lưu |điểm/i.test(document.querySelector('#modal .dlg').innerText));ok(!nobad,`${tag} no forbidden words`);
  /* Lui returns to Settings */
  await p.evaluate(()=>{const bs=[...document.querySelectorAll('#modal #mr .kbtn')];const l=bs.find(x=>/Lui/.test(x.textContent));if(l)l.click()});await p.waitForTimeout(700);
  const back=await p.evaluate(()=>({opt:!!document.querySelector('#modal button[data-tgo="notes"]'),title:(document.querySelector('#modal .kptitle, #modal.kptitle')||{}).className}));
  ok(back.opt,`${tag} Lui returns to Thiết lập`,back);
  /* 3. existing player: a sổ exists + seen cleared → pop-up in play once, never again */
  await p.evaluate(()=>{SLOT=1;$("title").hidden=true;start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:60000});
  await p.evaluate(()=>{try{nlAccept()}catch(e){}while(Q.length)Q.shift();try{closeModal()}catch(e){}try{render()}catch(e){}save()});
  await p.evaluate(()=>{CTM_NOTES_UI.reset()});
  await boot();
  await p.evaluate(()=>{document.querySelector('[data-tgo="cont"]').click()});   /* old-save load through the title's own Tiếp tục */
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&document.getElementById('title').hidden,null,{timeout:60000});
  for(let i=0;i<40;i++){const up=await p.evaluate(()=>/Điều mới trong cung/.test(document.body.innerText));if(up)break;   /* clear other dialogs (the test has no tutorial), never the notes pop-up */
   await p.evaluate(()=>{while(Q.length&&!(Q[0].kit&&/Điều mới/.test(Q[0].kit.title||'')))Q.shift();});await p.waitForTimeout(500)}
  await p.waitForFunction(()=>{const d=document.querySelector('#modal:not([hidden]) .dlg');return d&&/Điều mới trong cung/.test(d.innerText)},null,{timeout:15000}).catch(()=>{});
  const pop=await p.evaluate(()=>{const d=document.querySelector('#modal:not([hidden]) .dlg');return {kind:d&&d.dataset.kind,txt:d&&d.innerText.slice(0,200),seen:CTM_NOTES_UI.seen(),top:CTM_NOTES[0].id,saveOk:!!S.name}});
  ok(/Điều mới trong cung/.test(pop.txt||'')&&pop.seen===pop.top&&pop.saveOk,`${tag} old save loaded; pop-up shown once in play`,pop);
  const o3=await ovf();ok(o3.page<=0&&o3.dlg<=0&&o3.top>=0&&o3.bot<=0,`${tag} pop-up fits the screen`,o3);
  await p.screenshot({path:`${OUTD}/${tag}-popup.png`});
  await p.evaluate(()=>{const b=document.querySelector('#modal #mr .kbtn');b&&b.click()});await p.waitForTimeout(600);
  const gone=await p.evaluate(()=>{const M=document.getElementById('modal');return M.hidden||!/Điều mới trong cung/.test(M.innerText)});ok(gone,`${tag} pop-up closes`);
  await p.waitForTimeout(4200);const again=await p.evaluate(()=>{const d=document.querySelector('#modal:not([hidden]) .dlg');return !!(d&&/Điều mới trong cung/.test(d.innerText))});ok(!again,`${tag} not shown again in the same visit`);
  /* 4. reload: remembered, no pop-up */
  await boot();await p.evaluate(()=>{document.querySelector('[data-tgo="cont"]').click()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&document.getElementById('title').hidden,null,{timeout:60000});await p.waitForTimeout(5000);
  const again2=await p.evaluate(()=>/Điều mới trong cung/.test(document.body.innerText));ok(!again2,`${tag} after reload: remembered, no pop-up`);
  /* 5. co-op room: never shown, never marked seen */
  await p.evaluate(()=>{CTM_NOTES_UI.reset();while(Q.length)Q.shift();try{closeModal()}catch(e){}window.COOPW&&(COOPW.on=true)});
  await p.evaluate(()=>CTM_NOTES_UI.tick());
  const cc=await p.evaluate(()=>({calm:CTM_NOTES_UI.calm(),seen:CTM_NOTES_UI.seen()}));ok(!cc.calm&&cc.seen==null,`${tag} in a co-op room: no pop-up, not marked`,cc);
  ok(errs.length===0,`${tag} no page errors`,errs.slice(0,3));
  await ctx.close()}
 await b.close();console.log(bad?'FAILURES: '+bad:'ALL OK');process.exit(bad?1:0)})();
