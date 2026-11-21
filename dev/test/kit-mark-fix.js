/* review/kit-mark-fix (KIT §6.3i/j, MAIN 89 mark-verify #38 + #3 + #17): left column fits the card (the figure fills the column = NOT shrunk; what does not fit scrolls and shows a bottom-fade cue), rank + name one colour, mother block above the rows. Clone of the pcrow-square harness. usage: node dev/test/kit-mark-fix.js <url> <out> [WxH,...] [scene,...]
   (clone of:) review/kit-pcrow-square (KIT §6.3 + §6.3b): SQUARE act picture (one size) + title + Tốn/Được only beside it, ONE full-width info box under (Cần/Bại/Mất/Kèm/Ghi chú/lead), no bullet note box on the card but a «!» on the avatar corner that opens it, rank + name tag centred over the left figure.
   Harness cloned from pcard-actrow.js (same scenes). usage: node dev/test/pcrow-square.js <url> <outdir> [WxH,...] [scene,...]
   (older header:) review/pcard-actrow (KIT §6.3): every act a person card offers is the long row — one per line, full width, picture slot, nothing clipped;
   gift recipient rows (jgift) honour their sub-tab and carry the person's portrait; person-target picker rows (spy target) carry the person's portrait and
   are not cut. usage: [NOMEET=1] node dev/test/pcard-actrow.js <url> <outdir> [WxH,...] [scene,...]   (CTM_CURL_CDN=1 fetches CDN files with curl so real pictures show)
   scenes: pop-maid pop-elder tab-rv tab-court tab-staff tab-art tab-kid tab-men gift-wk spy-pick */
const {chromium}=require('playwright');const fs=require('fs');const cp=require('child_process');
const [,,URL,OUT,SIZES,SCN]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const SCENES={'pop-maid':"popKind('maid')",'pop-elder':"popKind('elder')",'tab-rv':"tabGo('rv')",'tab-court':"tabGo('court')",'tab-staff':"tabGo('staff')",'tab-art':"tabGo('art')",'tab-kid':"tabGo('kid')",'tab-men':"tabGo('men')",'tab-kin':"subGo('Hoàng tự trong cung')",'tab-kvo':"subGo('Kế vị')",'tab-hon':"subGo('Hôn sự')",'tab-qt':"subGo('Quý tộc kén rể')",'tab-rel':"tabGo('rel')",'gift-wk':"giftWk()",'spy-pick':"spyPickScene()"};
const cdn={};const TOPS={};
(async()=>{const b=await chromium.launch();let bad=0;
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
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
   window.subGo=(lab)=>{const v=rivals.find(x=>x.alive&&!x.out)||rivals[0];if(!v.kids)v.kids=[];if(!v.kids.length)v.kids.push(mkKid('m',5));Q.length=0;document.getElementById('modal').hidden=true;tab='kid';try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){};const b=[...document.querySelectorAll('button,.pct')].find(x=>x.textContent.indexOf(lab)>=0&&x.children.length<3);if(b)b.click();return 'ok'};
   window.tabGo=t=>{Q.length=0;document.getElementById('modal').hidden=true;tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){};return 'ok'}},process.env.NOMEET==='1');
  await p.waitForTimeout(1500);
  const DEFAULT_SCENES='pop-maid,tab-rv,tab-staff,tab-kin';
  const REP=+process.env.REP||1;const LIST=[];for(let i=0;i<REP;i++)LIST.push(...(SCN||DEFAULT_SCENES).split(","));/* r6: REP=n repeats every scene n times (rv: iPad ≥ 10 clean) */
  for(const sc of LIST){const go=await p.evaluate(SCENES[sc]);if(go==='none'){console.log(wh,sc,'SKIP (this world has no such person)');continue}/* r5: a random world without a maid is not a card fault */await p.waitForTimeout(2500);try{await p.waitForFunction(()=>{try{kitPcActScan(document)}catch(e){}return ![...document.querySelectorAll('.pc>.pcr button.ka.kart')].some(b=>b.querySelector(':scope>.kabody small.kb>.kr:not(.kr-ton):not(.kr-duoc):not(.kr-thanh)'))},null,{timeout:15000})}catch(e){}await p.addStyleTag({content:'.kmov,#curtain,#buoitr,#kroulw,.kroul{display:none!important}'});await p.waitForTimeout(300);
   if(sc==='gift-wk'){const g=await p.evaluate(()=>{const M=document.getElementById('modal');const rows=[...M.querySelectorAll('.opt[data-m]')].filter(b=>getComputedStyle(b).display!=='none'&&b.offsetParent);
     const tot=[...M.querySelectorAll('.opt[data-m]')].filter(b=>b.dataset.kgg===GIFT_TAB).length;return{tab:GIFT_TAB,rows:rows.length,tot,wrong:rows.filter(b=>b.dataset.kgg!==GIFT_TAB).length,noface:rows.filter(b=>b.dataset.kopic!=='face:gift').length}});
    const ok=g.tab==='ct'&&!g.wrong&&!g.noface&&g.rows===g.tot&&g.rows===3;if(!ok)bad++;console.log(wh,sc,JSON.stringify(g),ok?'PASS':'FAIL');await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:60});continue}
   if(sc==='spy-pick'){const g=await p.evaluate(()=>{const M=document.getElementById('modal');const rows=[...M.querySelectorAll('.opts>button.ka')].filter(b=>!/Thôi/.test(b.textContent));
     return{rows:rows.length,noface:rows.filter(b=>!/^face/.test(b.dataset.kopic||'')).length,clipped:rows.filter(b=>{const body=b.querySelector('.kabody');return body&&body.getBoundingClientRect().bottom>b.getBoundingClientRect().bottom+1}).length}});
    const ok=g.rows>0&&!g.noface&&!g.clipped;if(!ok)bad++;console.log(wh,sc,JSON.stringify(g),ok?'PASS':'FAIL');await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:60});continue}
   /* r6 (rv round 5 c): the marks must HOLD — measured on the settled scene and again 1 s later; both must pass */
   const MEAS=()=>p.evaluate(()=>{const R=e=>e.getBoundingClientRect();const vis=e=>e.offsetParent&&R(e).width>0;const out=[];
    for(const pc of [...document.querySelectorAll('.pc')].filter(vis)){const L=pc.querySelector(':scope>.pcl'),pcp=L&&L.querySelector(':scope>.pcp');if(!pcp||!pc.classList.contains('kpwide'))continue;
     const pr=R(pc);let bottom=0;[...L.children].forEach(c=>{if(vis(c))bottom=Math.max(bottom,R(c).bottom)});const rk=L.querySelector(':scope>.pcrk'),nm=L.querySelector(':scope>.pcname');
     const kpl=pc.querySelector('.kpl'),kb=kpl&&kpl.parentElement.querySelector('.kb.kpkb');
     out.push({name:(nm?nm.textContent.trim():'').slice(0,14),figW:Math.round(R(pcp).width),colW:Math.round(R(L).width),more:pc.classList.contains('kpmore'),atEnd:pc.scrollTop+pc.clientHeight>=pc.scrollHeight-3,cut:Math.round(bottom-pr.bottom),scrollable:pc.scrollHeight>pc.clientHeight+2&&/auto|scroll/.test(getComputedStyle(pc).overflowY),
      rankCol:rk?getComputedStyle(rk).color:'',nameCol:nm?getComputedStyle(nm).color:'',same:nm&&rk?(nm.classList.contains('krt')||getComputedStyle(nm).color===getComputedStyle(rk).color):true,
      kplAbove:kpl&&kb?(R(kpl).bottom<=R(kb).top+2&&Math.abs(R(kpl).left-R(kb).left)<6&&(!/grid/.test(getComputedStyle(kpl.parentElement).display)||getComputedStyle(kpl).gridColumnStart==='1'&&getComputedStyle(kpl).gridColumnEnd==='-1')):null})}
    return out});
   const m=await MEAS();await p.waitForTimeout(1000);const m2=await MEAS();if(m2.length!==m.length)m.push({name:'card count changed '+m.length+'→'+m2.length,figW:0,colW:99});m.push(...m2.map(x=>Object.assign(x,{name:'+1s '+x.name})));
   const fails=m.filter(x=>Math.abs(x.figW-x.colW)>3||(x.cut>2&&!x.scrollable)||(x.scrollable&&!x.atEnd&&!x.more)||!x.same||x.kplAbove===false).map(x=>JSON.stringify(x));
   const ok=m.length>0&&!fails.length;if(!ok)bad++;
   console.log(wh,sc,'cards',m.length,JSON.stringify(m.map(x=>({fig:x.figW,col:x.colW,more:x.more,cut:x.cut,sc:x.scrollable,same:x.same,kplAbove:x.kplAbove}))),ok?'PASS':'FAIL '+fails.join(' ').slice(0,900));
   await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:60})}
  if(errs.length){bad++;console.log(wh,'ERRORS',errs)}
  await ctx.close()}
 for(const wh in TOPS){const v=Object.values(TOPS[wh]);if(v.length&&Math.max(...v)-Math.min(...v)>1){bad++;console.log(wh,'TOP BLOCK NOT ONE FIXED SIZE',JSON.stringify(TOPS[wh]))}else console.log(wh,'top block fixed size',JSON.stringify(TOPS[wh]))}
 await b.close();process.exit(bad?1:0)})();
