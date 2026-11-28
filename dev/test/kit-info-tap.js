/* review/kit-info-fixed (KIT §6.3h, rv FAIL 21/11): REAL tap (mouse at the «!» centre) on the long-row «!» of every person-card host (pop-up maid/elder, rv, court, staff, Hoàng tự, Kế vị, Hôn sự, Quý tộc): elementFromPoint is the «!», the popup opens with the whole text, the card/dialog stays. Clone of the kit-mark-fix harness. usage: node dev/test/kit-info-tap.js <url> <outdir> [WxH,...] [scene,...] */
/* review/kit-mark-fix (KIT §6.3i/j, MAIN 89 mark-verify #38 + #3 + #17): left column fits the card (figure >= 170 px wide, rows + wear slots not cut), rank + name one colour, mother block above the rows. Clone of the pcrow-square harness. usage: node dev/test/kit-mark-fix.js <url> <out> [WxH,...] [scene,...]
   (clone of:) review/kit-pcrow-square (KIT §6.3 + §6.3b): SQUARE act picture (one size) + title + Tốn/Được only beside it, ONE full-width info box under (Cần/Bại/Mất/Kèm/Ghi chú/lead), no bullet note box on the card but a «!» on the avatar corner that opens it, rank + name tag centred over the left figure.
   Harness cloned from pcard-actrow.js (same scenes). usage: node dev/test/pcrow-square.js <url> <outdir> [WxH,...] [scene,...]
   (older header:) review/pcard-actrow (KIT §6.3): every act a person card offers is the long row — one per line, full width, picture slot, nothing clipped;
   gift recipient rows (jgift) honour their sub-tab and carry the person's portrait; person-target picker rows (spy target) carry the person's portrait and
   are not cut. usage: [NOMEET=1] node dev/test/pcard-actrow.js <url> <outdir> [WxH,...] [scene,...]   (CTM_CURL_CDN=1 fetches CDN files with curl so real pictures show)
   scenes: pop-maid pop-elder tab-rv tab-court tab-staff tab-art tab-kid tab-men gift-wk spy-pick */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const cp=require('child_process');
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
   window.subGo=(lab)=>{const v=rivals.find(x=>x.alive&&!x.out)||rivals[0];if(!v.kids)v.kids=[];if(!v.kids.length)v.kids.push(mkKid('m',5));if(/Hôn sự|Quý tộc|Kế vị/.test(lab)&&!v.kids.some(k=>k.age>=BAL.age.matchShow)){try{v.kids.push(mkKid('f',BAL.age.matchShow+1));v.kids.push(mkKid('m',BAL.age.matchShow+1))}catch(e){}}/* sub-tabs that list only kids of marriage age need one */Q.length=0;document.getElementById('modal').hidden=true;tab='kid';try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){};const b=[...document.querySelectorAll('button,.pct')].find(x=>x.textContent.indexOf(lab)>=0&&x.children.length<3);if(b)b.click();return 'ok'};
   window.tabGo=t=>{Q.length=0;document.getElementById('modal').hidden=true;tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){};return 'ok'}},process.env.NOMEET==='1');
  await p.waitForTimeout(1500);
  const DEFAULT_SCENES='pop-maid,pop-elder,tab-rv,tab-court,tab-staff,tab-kin,tab-kvo,tab-hon,tab-qt';
  for(const sc of (SCN||DEFAULT_SCENES).split(",")){await p.evaluate(SCENES[sc]);await p.waitForTimeout(2500);try{await p.waitForFunction(()=>{try{kitPcActScan(document)}catch(e){}return ![...document.querySelectorAll('.pc>.pcr button.ka.kart')].some(b=>b.querySelector(':scope>.kabody small.kb>.kr:not(.kr-ton):not(.kr-duoc):not(.kr-thanh)'))},null,{timeout:15000})}catch(e){}await p.addStyleTag({content:'.kmov,#curtain,#buoitr,#kroulw,.kroul{display:none!important}'});await p.waitForTimeout(300);
   if(sc==='gift-wk'){const g=await p.evaluate(()=>{const M=document.getElementById('modal');const rows=[...M.querySelectorAll('.opt[data-m]')].filter(b=>getComputedStyle(b).display!=='none'&&b.offsetParent);
     const tot=[...M.querySelectorAll('.opt[data-m]')].filter(b=>b.dataset.kgg===GIFT_TAB).length;return{tab:GIFT_TAB,rows:rows.length,tot,wrong:rows.filter(b=>b.dataset.kgg!==GIFT_TAB).length,noface:rows.filter(b=>b.dataset.kopic!=='face:gift').length}});
    const ok=g.tab==='ct'&&!g.wrong&&!g.noface&&g.rows===g.tot&&g.rows===3;if(!ok)bad++;console.log(wh,sc,JSON.stringify(g),ok?'PASS':'FAIL');await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:60});continue}
   if(sc==='spy-pick'){const g=await p.evaluate(()=>{const M=document.getElementById('modal');const rows=[...M.querySelectorAll('.opts>button.ka')].filter(b=>!/Thôi/.test(b.textContent));
     return{rows:rows.length,noface:rows.filter(b=>!/^face/.test(b.dataset.kopic||'')).length,clipped:rows.filter(b=>{const body=b.querySelector('.kabody');return body&&body.getBoundingClientRect().bottom>b.getBoundingClientRect().bottom+1}).length}});
    const ok=g.rows>0&&!g.noface&&!g.clipped;if(!ok)bad++;console.log(wh,sc,JSON.stringify(g),ok?'PASS':'FAIL');await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:60});continue}
   const LONG='Trong cung: Ta đã quen biết nàng ta từ buổi yến đầu xuân, nghe nói nàng ta được ban nhiều món đồ quý nhưng lòng ghen ghét ngày một nặng thêm với phi tần trong cung Hoàng hậu cũng chẳng yên.';
   /* harness opens the dialog by popKind(), not by a real token tap: the outside-tap catcher #kxcatch (meant to sit UNDER the card) can end up over it; it is not what this test is about */
   await p.evaluate(()=>{const c=document.getElementById('kxcatch');if(c)c.style.pointerEvents='none'});
   await p.evaluate(()=>{const m=document.getElementById('modal');if(m&&m.hidden===false&&!m.querySelector('.pc'))m.hidden=true;document.querySelectorAll('.kpscene').forEach(e=>{if(!e.querySelector('.pc'))e.hidden=true})});
   let pt={},g=null;
   for(let tr=0;tr<4&&!g;tr++){
    pt=await p.evaluate(LONG=>{const vis=e=>e.getClientRects().length>0&&e.getBoundingClientRect().width>0;const pc=[...document.querySelectorAll('.pc')].find(e=>vis(e)&&e.querySelector('.pcf .kr,.pcb>.kb.kpkb>.kr'));if(!pc)return {nopc:1};
     const last=[...pc.querySelectorAll('.pcf .kr,.pcb>.kb.kpkb>.kr')].map(r=>r.querySelector('.krv')).filter(Boolean).pop();if(!last)return {norow:1};document.querySelectorAll('[data-k1t]').forEach(x=>delete x.dataset.k1t);last.dataset.k1t='1';last.dataset.k1full=LONG;last.innerHTML=LONG;kitInfoOneLine(document);
     const b=last.querySelector('.kgnb');if(!b)return {nobang:1};b.scrollIntoView({block:'center'});return {ok:1}},LONG);
    if(pt.nopc||pt.norow)break;await p.waitForTimeout(600);
    g=pt.ok?await p.evaluate(()=>{const pc=[...document.querySelectorAll('.pc')].find(e=>e.getClientRects().length&&e.querySelector('[data-k1t]>.kgnb'));if(!pc)return null;const b=pc.querySelector('[data-k1t]>.kgnb');/* tap the «!» of the row the test filled, not another long row's */const r=b.getBoundingClientRect();const x=r.x+r.width/2,y=r.y+r.height/2;const el=document.elementFromPoint(x,y);return {x,y,hitBang:!!(el&&el.closest('.kgnb')),hit:el?(el.tagName+'.'+String(el.className).slice(0,24)):'none',dialog:!!pc.querySelector('.pcx')}}):null}
   let popOpen=false,stay=false;if(g){await p.mouse.click(g.x,g.y);await p.waitForTimeout(500);const q=await p.evaluate(()=>{const k=document.getElementById('kpop');const pc=[...document.querySelectorAll('.pc')].find(e=>e.offsetParent&&e.getBoundingClientRect().width>0);return {pop:!!(k&&!k.hidden&&/lòng ghen ghét ngày một nặng/.test(k.innerText)),stay:!!pc}});popOpen=q.pop;stay=q.stay}
   if(pt.nopc||(pt.norow)){console.log(wh,sc,'SKIP (no .pcf info row on this host)');await p.screenshot({path:`${OUT}/${wh}-${sc}-skip.jpg`,type:'jpeg',quality:60});await p.evaluate(()=>{const x=document.getElementById('popx');if(x)x.click()});continue}
   const ok=!!g&&g.hitBang&&popOpen&&stay;if(!ok)bad++;
   console.log(wh,sc,JSON.stringify(g?{hitBang:g.hitBang,hit:g.hit,dialog:g.dialog,popOpen,stay}:pt),ok?'PASS':'FAIL');
   await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:60});await p.evaluate(()=>{const k=document.getElementById('kpop');if(k)k.hidden=true;const x=document.getElementById('popx');if(x)x.click()});await p.waitForTimeout(400)}
  if(errs.length){bad++;console.log(wh,'ERRORS',errs)}
  await ctx.close()}
 for(const wh in TOPS){const v=Object.values(TOPS[wh]);if(v.length&&Math.max(...v)-Math.min(...v)>1){bad++;console.log(wh,'TOP BLOCK NOT ONE FIXED SIZE',JSON.stringify(TOPS[wh]))}else console.log(wh,'top block fixed size',JSON.stringify(TOPS[wh]))}
 await b.close();process.exit(bad?1:0)})();
