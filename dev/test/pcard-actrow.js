/* review/pcard-actrow (KIT §6.3): every act a person card offers is the long row — one per line, full width, picture slot, nothing clipped;
   gift recipient rows (jgift) honour their sub-tab and carry the person's portrait; person-target picker rows (spy target) carry the person's portrait and
   are not cut. usage: [NOMEET=1] node dev/test/pcard-actrow.js <url> <outdir> [WxH,...] [scene,...]   (CTM_CURL_CDN=1 fetches CDN files with curl so real pictures show)
   scenes: pop-maid pop-elder tab-rv tab-court tab-staff tab-art tab-kid tab-men gift-wk spy-pick */
const {chromium}=require('playwright');const fs=require('fs');const cp=require('child_process');
const [,,URL,OUT,SIZES,SCN]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const SCENES={'pop-maid':"popKind('maid')",'pop-elder':"popKind('elder')",'tab-rv':"tabGo('rv')",'tab-court':"tabGo('court')",'tab-staff':"tabGo('staff')",'tab-art':"tabGo('art')",'tab-kid':"tabGo('kid')",'tab-men':"tabGo('men')",'gift-wk':"giftWk()",'spy-pick':"spyPickScene()"};
const cdn={};
(async()=>{const b=await chromium.launch();let bad=0;
 for(const wh of (SIZES||"755x1000,1000x755,1180x820,1366x1024,844x390").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  if(process.env.CTM_CURL_CDN)await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev/,r=>{const u=r.request().url();try{if(!cdn[u])cdn[u]=cp.execFileSync('curl',['-sSf','-m','30',u],{maxBuffer:60e6});r.fulfill({status:200,body:cdn[u],contentType:u.endsWith('.json')?'application/json':'image/webp',headers:{'access-control-allow-origin':'*'}})}catch(e){r.abort()}});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(nomeet=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
   if(!nomeet){kn();for(const v of rivals){S.met[v.id]=1};try{for(const v of rivals)k61Meet(v,"gặp",3);k61Meet(S.emp,"gặp",3)}catch(e){}}
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');render();
   window.popKind=k=>{Q.length=0;document.getElementById('modal').hidden=true;tab='act';S.out=0;S.confined=0;render();const ps=curPeople();const i=ps.findIndex(x=>x.kind===k);if(i<0)return 'none';popIdx=i;popMsg='';renderStage();return 'ok'};
   window.giftWk=()=>{Q.length=0;document.getElementById('modal').hidden=true;tab='art';S.out=0;render();S.inv.push(wkMake(S,'khuc',0,10));GIFT_TAB=null;itemAct('gift',S.inv.length-1);showModal();showModal();return 'ok'};
   window.spyPickScene=()=>{Q.length=0;document.getElementById('modal').hidden=true;tab='act';S.out=0;render();const ps=curPeople();popIdx=ps.findIndex(x=>x.kind==='maid');renderStage();spyPick(0);return 'ok'};
   window.tabGo=t=>{Q.length=0;document.getElementById('modal').hidden=true;tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){};return 'ok'}},process.env.NOMEET==='1');
  await p.waitForTimeout(1500);
  for(const sc of (SCN?SCN.split(","):Object.keys(SCENES))){await p.evaluate(SCENES[sc]);await p.waitForTimeout(2500);await p.addStyleTag({content:'.kmov,#curtain,#buoitr,#kroulw,.kroul{display:none!important}'});await p.waitForTimeout(300);
   if(sc==='gift-wk'){const g=await p.evaluate(()=>{const M=document.getElementById('modal');const rows=[...M.querySelectorAll('.opt[data-m]')].filter(b=>getComputedStyle(b).display!=='none'&&b.offsetParent);
     const tot=[...M.querySelectorAll('.opt[data-m]')].filter(b=>b.dataset.kgg===GIFT_TAB).length;return{tab:GIFT_TAB,rows:rows.length,tot,wrong:rows.filter(b=>b.dataset.kgg!==GIFT_TAB).length,noface:rows.filter(b=>b.dataset.kopic!=='face:gift').length}});
    const ok=g.tab==='ct'&&!g.wrong&&!g.noface&&g.rows===g.tot&&g.rows===3;if(!ok)bad++;console.log(wh,sc,JSON.stringify(g),ok?'PASS':'FAIL');await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:60});continue}
   if(sc==='spy-pick'){const g=await p.evaluate(()=>{const M=document.getElementById('modal');const rows=[...M.querySelectorAll('.opts>button.ka')].filter(b=>!/Thôi/.test(b.textContent));
     return{rows:rows.length,noface:rows.filter(b=>!/^face/.test(b.dataset.kopic||'')).length,clipped:rows.filter(b=>{const body=b.querySelector('.kabody');return body&&body.getBoundingClientRect().bottom>b.getBoundingClientRect().bottom+1}).length}});
    const ok=g.rows>0&&!g.noface&&!g.clipped;if(!ok)bad++;console.log(wh,sc,JSON.stringify(g),ok?'PASS':'FAIL');await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:60});continue}
   const m=await p.evaluate(()=>{const R=e=>e.getBoundingClientRect();const vis=e=>e.offsetParent&&R(e).width>0;
    const bs=[...document.querySelectorAll('.pc>.pcr button.ka')].filter(e=>vis(e)&&!e.closest('.cards'));
    return bs.map(e=>{const r=R(e),g=R(e.parentElement);const cut=[...e.querySelectorAll('*')].filter(x=>vis(x)&&x.scrollWidth>x.clientWidth+2&&getComputedStyle(x).overflow!=='visible'&&!x.closest('.kaart')).length;
     const sib=[...e.parentElement.children].filter(x=>x!==e&&x.matches('button.ka')&&vis(x)&&Math.abs(R(x).top-r.top)<4).length;
     return{t:(e.querySelector('.kan')||e).textContent.trim().slice(0,24),w:Math.round(r.width),gw:Math.round(g.width),h:Math.round(r.height),pic:!!e.querySelector(':scope>.kaart'),cut,side:sib,over:r.right>g.right+1||r.left<g.left-1}})});
   const fails=m.filter(x=>x.w<x.gw*0.9||x.side||x.cut||x.over||!x.pic);
   const ok=!fails.length;if(!ok)bad++;
   console.log(wh,sc,'acts',m.length,ok?'PASS':'FAIL',ok?'':JSON.stringify(fails));
   await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:60})}
  if(errs.length){bad++;console.log(wh,'ERRORS',errs)}
  await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
