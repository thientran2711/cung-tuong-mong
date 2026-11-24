/* review/kit-selscene (KIT §93 kitScene · kitDlgBox · kitNameTag · kitNewsRankRow · kitEdict fromWord; SELSCENE kit requests 1–4): Fold 755x1000 + iPad 1180x820.
   Serves the checkout (this repo root) through a Playwright route, starts a life, then:
   (1) kitScene.open({bg:<event picture>,intro}) + pair(): layer between the top bar and the tab bar; intro = picture clear first (kscn-clear) then blurred;
       figures FULL BODY and never clipped (painted part ≥3 px inside the layer on all four sides); boxes inside the layer and on top;
       the choice box holds the game's REAL option cards (.opts moved from a real event dialog); ONLY .opts scrolls; header + story stay put when it scrolls.
   (2) solo pair (no messenger): one box.  (3) kitNameTag stage 1 placeholder / family hint / stage 2 real name.  (4) kitNewsRankRow face + name/placeholder + rank chip.
   (5) kitEdict({fromWord:"Tú nữ"}) old-rank chip text.  Shots: <outdir>/kitsel-<case>-<dev>.png
   usage: node dev/test/kit-selscene.js <outdir> [WxH,...] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const [,,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const ROOT=path.resolve(__dirname,'../..');const MT={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp3':'audio/mpeg','.webmanifest':'application/manifest+json','.woff2':'font/woff2'};
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}else console.log('ok',m)};
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);const dev=W<1000?'fold':'ipad';
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.route('http://localhost:8812/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:MT[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('http://localhost:8812/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitScene!=='undefined',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');tab='act';render()});
  await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,#dawn,.kne,#kneov{display:none!important}'});
  for(let i=0;i<6;i++){await p.evaluate(()=>{document.querySelectorAll('.kmend').forEach(b=>b.click());try{kmReset()}catch(e){}document.querySelectorAll('.kne,#kneov,.kmstage').forEach(e=>e.remove());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});await p.waitForTimeout(400)}
  for(const solo of [false,true]){const cs=solo?'solo':'pair';
   /* real option cards: a real event dialog renders them, the test moves its .opts into the scene box (as a caller would) */
   const r0=await p.evaluate(async solo=>{const v=liveRivals(true).find(x=>x.alive&&!x.out);Q.length=0;
    Q.push({ev:1,t:'Tuyển tú',who:solo?null:pv(v),h:'<p>x</p>',opts:[{n:'Cúi đầu đáp lời, giữ lễ',fx:{}},{n:'Ngẩng lên thưa rõ ràng',fx:{danh:1}},{n:'Mỉm cười, nói khéo một câu',fx:{duc:1}},{n:'Lặng im chờ hỏi tiếp',fx:{}}]});showModal();
    await new Promise(r=>setTimeout(r,900));const M=document.getElementById('modal');const d=[...M.querySelectorAll('.dlg')].filter(x=>x.offsetWidth&&x.querySelector('.opts')).pop();if(!d)return {err:'nodlg'};
    const ev=d.querySelector('.k3ev img');const bg=ev?(ev.currentSrc||ev.src):'';const opts=d.querySelector('.opts');M.hidden=true;Q.length=0;
    const story=['<div class="kpmain"><p>Giữa giờ Thìn, tú nữ đứng thành hàng trước điện. Một thái giám cầm danh sách bước ra, giọng lanh lảnh đọc từng tên, từng nhà. Người phía trước run tay, chiếc khăn rơi xuống thềm.</p><p>Có người khẽ hỏi: “Muội tên gì, nhà ở đâu?”</p></div>'];
    const Sc=kitScene.open({bg,intro:1300});const P=await Sc.pair(solo?{me:S,storyTitle:'Tuyển tú',story,choice:[opts]}:{msgr:v,me:S,storyTitle:kitTitled(kitTitleOf(v),v.name),story,choiceTitle:S.name,choice:[opts]});
    const clear0=Sc.L.classList.contains('kscn-clear');Sc.show();window.__SC=Sc;return {bg:!!bg,clear0,boxes:Sc.L.boxes.length,figs:Sc.L.figs.length}},solo);
   ok(!r0.err&&r0.bg&&r0.clear0,`${dev} ${cs} opened with the event picture, intro clear first ${JSON.stringify(r0)}`);
   await p.waitForTimeout(3600);
   const ck=await p.evaluate(()=>{const L=window.__SC.L,g=L.getBoundingClientRect();const res={};const hud=document.querySelector('header.hud').getBoundingClientRect(),bar=document.querySelector('nav.bar').getBoundingClientRect();
    res.between=g.top>=hud.bottom-1&&g.bottom<=bar.top+1;res.clearGone=!L.classList.contains('kscn-clear');
    res.noClip=L.figs.map(f=>{const r=f.getBoundingClientRect(),o=f.ob;return [Math.round(r.left+o.l*r.width-g.left),Math.round(g.right-(r.left+o.r*r.width)),Math.round(r.top+o.t*r.height-g.top),Math.round(g.bottom-(r.top+o.b*r.height))]});
    res.noClipOk=res.noClip.every((a,i)=>a[0]>=3&&a[1]>=3&&a[2]>=0&&a[3]>=-1);/* the HALF-BODY figure (her, right) is cut by the layer's bottom edge on purpose (owner 24/11 ~04:35Z) */
    res.boxIn=L.boxes.every(b=>{const r=b.getBoundingClientRect();return r.top>=g.top-1&&r.bottom<=g.bottom+1&&r.right<=g.right+1&&r.left>=g.left-1});
    res.onTop=L.boxes.every(b=>{const r=b.getBoundingClientRect();const e=document.elementFromPoint(r.left+r.width/2,r.top+Math.min(60,r.height/2));return !!e&&b.contains(e)});
    const all=[...L.querySelectorAll('*')];const sc=all.filter(e=>e.scrollHeight>e.clientHeight+2&&/(auto|scroll)/.test(getComputedStyle(e).overflowY));res.scrollers=sc.map(e=>e.className.split(' ')[0]);res.onlyOpts=sc.every(e=>e.classList.contains('opts'));
    const fx=[...L.querySelectorAll('.kscn-box>.kph,.kscn-col>:not(.opts)'),...L.figs];const a=fx.map(e=>JSON.stringify(e.getBoundingClientRect()));sc.forEach(e=>e.scrollTop=1e5);const c=fx.map(e=>JSON.stringify(e.getBoundingClientRect()));sc.forEach(e=>e.scrollTop=0);res.fixed=a.join()===c.join();
    res.noPop=[...document.querySelectorAll('.kemo-big')].every(e=>getComputedStyle(e).visibility==='hidden');res.cards=L.querySelectorAll('.opts>button.ka').length;res.storyFits=[...L.querySelectorAll('.kscn-col')].every(c=>c.scrollHeight<=c.clientHeight+2);return res});
   ok(ck.between&&ck.clearGone&&ck.noClipOk&&ck.boxIn&&ck.onTop&&ck.onlyOpts&&ck.fixed&&ck.cards===4&&ck.storyFits&&ck.noPop,`${dev} ${cs} layout A ${JSON.stringify(ck)}`);
   if(process.env.DBG)console.log('HIZ',await p.evaluate(()=>[...document.querySelectorAll('body *')].filter(e=>{const c=getComputedStyle(e);return c.position!=='static'&&+c.zIndex>=50&&e.getClientRects().length&&!e.closest('.kscn')}).map(e=>(e.id?'#'+e.id:'')+'.'+String(e.className&&e.className.baseVal===undefined?e.className:'').split(' ').slice(0,3).join('.')+'['+getComputedStyle(e).zIndex+']').slice(0,30)));if(0)console.log('TOPAT',await p.evaluate(()=>{const out=[];for(const [x,y] of [[270,207],[300,230],[250,190]]){const L=document.elementsFromPoint(x,y).slice(0,4).map(e=>(e.id?'#'+e.id:'')+'.'+String(e.className&&e.className.baseVal===undefined?e.className:'').split(' ').slice(0,3).join('.')+'['+getComputedStyle(e).zIndex+','+getComputedStyle(e).position+']');out.push(L.join(' > '))}return out}));
   await p.screenshot({path:`${OUT}/kitsel-${cs}-${dev}.png`});await p.evaluate(()=>new Promise(r=>kitScene.close(false,r)));await p.waitForTimeout(300);
   ok(await p.evaluate(()=>!document.querySelector('.kscn')),`${dev} ${cs} closed`)}
  /* bare option cards (no odds, no rows) + result card with given rows */
  const bo=await p.evaluate(()=>{const d=kitBareOpts([{n:'Cúi đầu đáp lời, giữ lễ'},{n:'Ngẩng lên thưa rõ ràng'}]);d.style.cssText='position:fixed;left:20px;top:200px;width:360px;z-index:99;display:flex;flex-direction:column;gap:8px';document.body.appendChild(d);
   const r={n:d.querySelectorAll('button.ka.kopt.kbare').length,odds:d.querySelectorAll('.kodds,.kb').length,art:d.querySelectorAll('.kaart').length,h:Math.round(d.firstChild.getBoundingClientRect().height)};
   const t=kitResultCard({title:'Thái hậu hỏi chuyện',ok:true,rows:[{k:'duoc',label:'Được',items:['<span class="ef g">Thái hậu: quý ngươi hơn (thiện cảm +3)</span>','<span class="ef g">Điểm tuyển: Khá</span>'],},{k:'mat',label:'Mất',items:['<span class="ef r">Khắc −1</span>']}]});
   r.res=t.classList.contains('karesult')&&t.classList.contains('on')&&t.querySelectorAll('.kitem').length===3&&/THÀNH/.test(t.textContent);return r});
  ok(bo.n===2&&bo.odds===0&&bo.art===2&&bo.h>30&&bo.res,`${dev} kitBareOpt + kitResultCard ${JSON.stringify(bo)}`);await p.waitForTimeout(400);await p.screenshot({path:`${OUT}/kitsel-bare-${dev}.png`});
  await p.evaluate(()=>{document.querySelector('.kscn-opts').remove();document.getElementById('rtoast').classList.remove('on')});
  /* name tag + news rows + edict chip */
  const t=await p.evaluate(()=>{const v=liveRivals(true).find(x=>x.alive&&!x.out);const host=document.createElement('div');host.id='kselt';host.style.cssText='position:fixed;left:20px;top:200px;z-index:99;background:#f7efe1;padding:12px;border:1px solid #b8901f;border-radius:10px;width:'+Math.min(innerWidth-40,520)+'px';
   host.innerHTML='<div style="display:flex;gap:16px;margin-bottom:10px">'+kitNameTagBox(v,{stage:1,title:'Tú nữ'})+kitNameTagBox(v,{stage:1,ph:'Con gái Đô thống',title:'Tú nữ'})+kitNameTagBox(v,{stage:2})+'</div>'+kitNewsRankList([kitNewsRankRow(v,{rank:1,how:'cùng lượt'}),kitNewsRankRow(liveRivals(true)[1]||v,{rank:2,how:'quen ở sân chờ'})]);document.body.appendChild(host);
   const tags=[...host.querySelectorAll('.kscn-tag')].map(e=>e.innerText.replace(/\n/g,' / '));const rows=[...host.querySelectorAll('.kpl')].map(e=>e.innerText.replace(/\n/g,' / '));
   const u=kitUnkName({name:'X'},{ph:'một tú nữ'});return {tags,rows,unk:kitUnkName(v),face:host.querySelectorAll('.kpl .md, .kpl img, .kpl [class*=md]').length}});
  ok(/Chưa rõ tên/.test(t.tags[0])&&/Con gái Đô thống/.test(t.tags[1])&&t.rows.length===2&&t.face>=2,`${dev} kitNameTag / kitNewsRankRow ${JSON.stringify(t)}`);
  await p.screenshot({path:`${OUT}/kitsel-tags-${dev}.png`});await p.evaluate(()=>document.getElementById('kselt').remove());
  const e=await p.evaluate(async()=>{try{kmReset()}catch(x){}document.querySelectorAll('.kmstage').forEach(x=>x.remove());/* the test page may hold a blocking screen (dawn / podium): the queue is not under test */try{kmFree=()=>true}catch(x){}try{kitEdict({to:1,from:-1,fromWord:'Tú nữ'})}catch(x){return 'ex '+x.message}for(let i=0;i<80;i++){const c=document.querySelector('.kmchip-old');if(c)return c.textContent;await new Promise(r=>setTimeout(r,100))}return ''});
  ok(e==='Tú nữ',`${dev} kitEdict fromWord chip «${e}»`);
  ok(!errs.length,`${dev} no page errors ${JSON.stringify(errs.slice(0,3))}`);await ctx.close()}
 await b.close();console.log(bad?`FAILED ${bad}`:'ALL PASS');process.exit(bad?1:0)})();
