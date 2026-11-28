/* review/kit-pcrow-square (KIT §6.3 + §6.3b): SQUARE act picture (one size) + title + Tốn/Được only beside it, ONE full-width info box under (Cần/Bại/Mất/Kèm/Ghi chú/lead), no bullet note box on the card but a «!» on the avatar corner that opens it, rank + name tag centred over the left figure.
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
   window.subGo=(lab)=>{const v=rivals.find(x=>x.alive&&!x.out)||rivals[0];if(!v.kids)v.kids=[];if(!v.kids.length)v.kids.push(mkKid('m',5));Q.length=0;document.getElementById('modal').hidden=true;tab='kid';try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){};const b=[...document.querySelectorAll('button,.pct')].find(x=>x.textContent.indexOf(lab)>=0&&x.children.length<3);if(b)b.click();return 'ok'};
   window.tabGo=t=>{Q.length=0;document.getElementById('modal').hidden=true;tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){};return 'ok'}},process.env.NOMEET==='1');
  await p.waitForTimeout(1500);
  for(const sc of (SCN?SCN.split(","):Object.keys(SCENES))){await p.evaluate(SCENES[sc]);await p.waitForTimeout(2500);try{await p.waitForFunction(()=>{try{kitPcActScan(document)}catch(e){}return ![...document.querySelectorAll('.pc>.pcr button.ka.kart')].some(b=>b.querySelector(':scope>.kabody small.kb>.kr:not(.kr-ton):not(.kr-duoc):not(.kr-thanh)'))},null,{timeout:15000})}catch(e){}await p.addStyleTag({content:'.kmov,#curtain,#buoitr,#kroulw,.kroul{display:none!important}'});await p.waitForTimeout(300);
   if(sc==='gift-wk'){const g=await p.evaluate(()=>{const M=document.getElementById('modal');const rows=[...M.querySelectorAll('.opt[data-m]')].filter(b=>getComputedStyle(b).display!=='none'&&b.offsetParent);
     const tot=[...M.querySelectorAll('.opt[data-m]')].filter(b=>b.dataset.kgg===GIFT_TAB).length;return{tab:GIFT_TAB,rows:rows.length,tot,wrong:rows.filter(b=>b.dataset.kgg!==GIFT_TAB).length,noface:rows.filter(b=>b.dataset.kopic!=='face:gift').length}});
    const ok=g.tab==='ct'&&!g.wrong&&!g.noface&&g.rows===g.tot&&g.rows===3;if(!ok)bad++;console.log(wh,sc,JSON.stringify(g),ok?'PASS':'FAIL');await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:60});continue}
   if(sc==='spy-pick'){const g=await p.evaluate(()=>{const M=document.getElementById('modal');const rows=[...M.querySelectorAll('.opts>button.ka')].filter(b=>!/Thôi/.test(b.textContent));
     return{rows:rows.length,noface:rows.filter(b=>!/^face/.test(b.dataset.kopic||'')).length,clipped:rows.filter(b=>{const body=b.querySelector('.kabody');return body&&body.getBoundingClientRect().bottom>b.getBoundingClientRect().bottom+1}).length}});
    const ok=g.rows>0&&!g.noface&&!g.clipped;if(!ok)bad++;console.log(wh,sc,JSON.stringify(g),ok?'PASS':'FAIL');await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:60});continue}
   const m=await p.evaluate(()=>{const R=e=>e.getBoundingClientRect();const vis=e=>e.offsetParent&&R(e).width>0;const out={acts:[],cards:[]};{const g=document.querySelector('#panel>.pgwrap');const ph=g&&g.querySelector(':scope>.ph');const st=g&&g.querySelector(':scope>.pstrip');const bg=g&&g.querySelector(':scope>.kppbang');out.intro={ph:!!ph,phShown:!!(ph&&vis(ph)),bang:!!bg,bangIn:bg?(R(bg).right<=R(g).right+1&&R(bg).top>=R(g).top-1):false,stripTop:st?Math.round(R(st).top):null,gTop:g?Math.round(R(g).top):null};}
    {const P=document.getElementById('panel'),pcw=P&&P.querySelector(':scope>.pgwrap>.pc'),st=P&&P.querySelector('.pstrip, .ph');
     if(pcw&&st&&vis(pcw)){const t0=R(st).top;P.scrollTop=99999;pcw.scrollTop=99999;const t1=R(st).top;const acts=[...pcw.querySelectorAll(':scope>.pcr button.ka.kart')].filter(vis);const la=acts[acts.length-1];
      out.frame={moved:Math.abs(t1-t0)>1,lastCut:la?R(la).bottom>R(P).bottom+2:false,panelScrolled:P.scrollTop>1};pcw.scrollTop=0;P.scrollTop=0}}
    for(const pc of [...document.querySelectorAll('.pc')].filter(vis)){
     const L=pc.querySelector(':scope>.pcl'),pcp=L&&L.querySelector(':scope>.pcp');const nm=L&&L.querySelector(':scope>.pcname'),rk=L&&L.querySelector(':scope>.pcrk');
     const cx=e=>{const r=R(e);return r.left+r.width/2};const wide=pc.classList.contains('kpwide');
     const note=pc.querySelector(':scope>.pcr>.pcn.kpres');const noteShown=note&&vis(note)&&!/:\s*(thành|hỏng)/i.test(note.textContent);
     out.cards.push({name:nm?nm.textContent.trim().slice(0,16):'',wide,cenName:wide&&nm&&pcp?Math.round(Math.abs(cx(nm)-cx(pcp))):0,cenRank:wide&&rk&&pcp&&vis(rk)?Math.round(Math.abs(cx(rk)-cx(pcp))):0,noteShown:!!noteShown,bang:!!(pcp&&pcp.querySelector(':scope>.kpcbang')),hasNote:!!(pc.querySelector('.kpcnote')||note)});
     for(const e of pc.querySelectorAll(':scope>.pcr button.ka.kart')){if(!vis(e)||e.closest('.cards'))continue;const r=R(e),art=e.querySelector(':scope>.kaart'),body=e.querySelector(':scope>.kabody'),box=e.querySelector(':scope>.kpabox');
      const ar=art&&R(art),br=body&&R(body);const rowsIn=[...e.querySelectorAll(':scope>.kabody small.kb>.kr')].map(x=>[...x.classList].find(c=>/^kr-/.test(c))||'?');
      const bad=rowsIn.filter(c=>!/^kr-(ton|duoc|thanh)$/.test(c));
      const rowsBox=box?[...box.querySelectorAll('.kr')].map(x=>[...x.classList].find(c=>/^kr-/.test(c))||'?'):[];
      out.acts.push({t:(e.querySelector('.kan')||e).textContent.trim().slice(0,22),w:Math.round(r.width),aw:ar?Math.round(ar.width):0,ah:ar?Math.round(ar.height):0,bad,rowsBox,
       boxUnder:box?R(box).top>=Math.max(ar?ar.bottom:0,br?br.bottom:0)-1:true,boxFull:box?R(box).width>=r.width*0.88:true,over:r.right>R(e.parentElement).right+1,tallPic:ar?ar.height>ar.width+1:false,cut:!!(box&&box.scrollWidth>box.clientWidth+2)})}}
     return out});
   const A=m.acts,C=m.cards;const sizes=new Set(A.map(x=>x.aw+'x'+x.ah));
   const fails=[...A.filter(x=>x.aw!==x.ah||![68,84,96].includes(x.aw)||x.tallPic||x.bad.length||!x.boxUnder||!x.boxFull||x.over||x.cut).map(x=>'act '+JSON.stringify(x)),...C.filter(x=>x.cenName>3||x.cenRank>3||x.noteShown||(x.hasNote&&!x.bang)).map(x=>'card '+JSON.stringify(x))];
   if(m.frame&&(m.frame.moved||m.frame.lastCut||m.frame.panelScrolled))fails.push('frame '+JSON.stringify(m.frame));
   if(m.intro&&(m.intro.phShown||(m.intro.ph&&!m.intro.bang)||(m.intro.bang&&!m.intro.bangIn)))fails.push('intro '+JSON.stringify(m.intro));
   if(m.intro&&m.intro.ph&&m.intro.stripTop!=null)(TOPS[wh]=TOPS[wh]||{})[sc]=m.intro.stripTop;
   if(sizes.size>1)fails.push('picture sizes differ: '+[...sizes]);
   const ok=!fails.length;if(!ok)bad++;
   console.log(wh,sc,'frame',m.frame?(m.frame.moved?'MOVED':'fixed'):'-','cards',C.length,'acts',A.length,'pic',[...sizes].join('/'),ok?'PASS':'FAIL',ok?'':JSON.stringify(fails).slice(0,1500));
   await p.screenshot({path:`${OUT}/${wh}-${sc}.jpg`,type:'jpeg',quality:60})}
  if(errs.length){bad++;console.log(wh,'ERRORS',errs)}
  await ctx.close()}
 for(const wh in TOPS){const v=Object.values(TOPS[wh]);if(v.length&&Math.max(...v)-Math.min(...v)>1){bad++;console.log(wh,'TOP BLOCK NOT ONE FIXED SIZE',JSON.stringify(TOPS[wh]))}else console.log(wh,'top block fixed size',JSON.stringify(TOPS[wh]))}
 await b.close();process.exit(bad?1:0)})();
