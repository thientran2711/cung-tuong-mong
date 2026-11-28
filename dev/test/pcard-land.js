/* review/kit-keeper-2 · person card at short landscape (844x390): picture+info LEFT, acts RIGHT, first act visible without scrolling (KIT 6.3b).
   Derived from pcard-actrow.js; same scenes/usage. Original header: review/pcard-actrow (KIT §6.3): every act a person card offers is the long row — one per line, full width, picture slot, nothing clipped;
   gift recipient rows (jgift) honour their sub-tab and carry the person's portrait; person-target picker rows (spy target) carry the person's portrait and
   are not cut. usage: [NOMEET=1] node dev/test/pcard-actrow.js <url> <outdir> [WxH,...] [scene,...]   (CTM_CURL_CDN=1 fetches CDN files with curl so real pictures show)
   scenes: pop-maid pop-elder tab-rv tab-court tab-staff tab-art tab-kid tab-men gift-wk spy-pick */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const cp=require('child_process');
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
  for(const sc of (SCN?SCN.split(","):Object.keys(SCENES))){await p.evaluate(SCENES[sc]);await p.waitForTimeout(2500);await p.addStyleTag({content:'.kmov,#curtain,#buoitr,#kroulw,.kroul,.rtoast{display:none!important}'});await p.waitForTimeout(300);
   if(sc==='gift-wk'){const g=await p.evaluate(()=>{const M=document.getElementById('modal');const rows=[...M.querySelectorAll('.opt[data-m]')].filter(b=>getComputedStyle(b).display!=='none'&&b.offsetParent);
     const tot=[...M.querySelectorAll('.opt[data-m]')].filter(b=>b.dataset.kgg===GIFT_TAB).length;return{tab:GIFT_TAB,rows:rows.length,tot,wrong:rows.filter(b=>b.dataset.kgg!==GIFT_TAB).length,noface:rows.filter(b=>b.dataset.kopic!=='face:gift').length}});
    const ok=g.tab==='ct'&&!g.wrong&&!g.noface&&g.rows===g.tot&&g.rows===3;if(!ok)bad++;console.log(wh,sc,JSON.stringify(g),ok?'PASS':'FAIL');await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:60});continue}
   if(sc==='spy-pick'){const g=await p.evaluate(()=>{const M=document.getElementById('modal');const rows=[...M.querySelectorAll('.opts>button.ka')].filter(b=>!/Thôi/.test(b.textContent));
     return{rows:rows.length,noface:rows.filter(b=>!/^face/.test(b.dataset.kopic||'')).length,clipped:rows.filter(b=>{const body=b.querySelector('.kabody');return body&&body.getBoundingClientRect().bottom>b.getBoundingClientRect().bottom+1}).length}});
    const ok=g.rows>0&&!g.noface&&!g.clipped;if(!ok)bad++;console.log(wh,sc,JSON.stringify(g),ok?'PASS':'FAIL');await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:60});continue}
   await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m){m.hidden=true;m.className='modal'}document.querySelectorAll('#kmrew,.kmrew,#kpodov,.rtoast').forEach(e=>e.remove())});await p.waitForTimeout(400);
   const m=await p.evaluate(()=>{const R=e=>e.getBoundingClientRect();const vis=e=>e&&e.offsetParent&&R(e).width>0;
    const pc=[...document.querySelectorAll('.pc')].find(vis);if(!pc)return{none:1};
    const pcl=pc.querySelector(':scope>.pcl'),pcr=pc.querySelector(':scope>.pcr');const acts=[...pc.querySelectorAll('.pcr button.ka')].filter(vis);
    const pr=R(pc),a=acts[0]&&R(acts[0]);const sc=(e=>{while(e&&e!==document.body){if(e.scrollHeight>e.clientHeight+2&&/auto|scroll/.test(getComputedStyle(e).overflowY))return e;e=e.parentElement}return null})(pc);
    const vp=sc?R(sc):{top:0,bottom:innerHeight};const lr=R(pcl);
    return{pc:[Math.round(pr.left),Math.round(pr.top),Math.round(pr.width),Math.round(pr.height)],acts:acts.length,side:!!a&&a.left>=lr.right-4,
     firstAct:a?{top:Math.round(a.top),bottom:Math.round(a.bottom)}:null,firstVisible:!a||(a.top>=vp.top-1&&a.bottom<=vp.bottom+1),allActsVisible:acts.every(e=>R(e).bottom<=vp.bottom+1&&R(e).top>=vp.top-1),
     scroller:sc?(sc.id||sc.className+'').split(' ')[0]:null,scr:sc?sc.scrollHeight-sc.clientHeight:0,ph:Math.round(R(pcl).height),pcw:Math.round(lr.width),hs:document.documentElement.scrollWidth>innerWidth}});
   const short=H<=520&&W>H;const ok=!m.none&&(!short||(m.side&&m.firstVisible))&&!m.hs;if(!ok)bad++;
   console.log(wh,sc.padEnd(10),JSON.stringify(m),ok?'PASS':'FAIL');
   await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:60})}
  if(errs.length){bad++;console.log(wh,'ERRORS',errs)}
  await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
