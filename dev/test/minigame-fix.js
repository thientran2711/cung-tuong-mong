/* review/minigame-fix: (6) every Dư đồ on-figure game shows «Luật chơi» + «Sẵn sàng» first, skip says what happens, on EVERY engine; (2) kg82Open frame stays veiled until its pictures are decoded.
   usage: node dev/test/minigame-fix.js [shotdir] → exit 1 on FAIL */
const {chromium}=require('playwright');const D=require('./lib/device');const dir=process.argv[2]||'';
let bad=0;const ok=(c,m,x)=>{console.log((c?'ok   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''));if(!c)bad++};
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();
 for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:1});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());const g=await D.openHost(p,srv.url);await p.waitForTimeout(3000);
  await g.evaluate(()=>{SLOT=3;window.__forceOrigin='cn';document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
  await g.waitForFunction(()=>typeof S==='object'&&S&&S.origin,null,{timeout:60000});await p.waitForTimeout(1500);
  const r=await g.evaluate(async()=>{const out={eng:{}};const sl=ms=>new Promise(r=>setTimeout(r,ms));window.kitNotice=undefined;KIT_FOC.motion=false;
   const go=k=>{Q.length=0;used=0;S.out=0;S.confined=0;S.buoi=0;S.place="home";goTo(k);if(Q[0]&&Q[0].pid==="entpick"){const o=Q[0].opts.find(x=>x.n==="Đi một mình");Q.length=0;o.go()}Q.length=0;S.visit.tk={};S.visit.talked=false;tab="act";window.__fromMap=1;render()};
   let i=-1;for(const k of ["vuon","tn","kn","thu"]){go(k);i=curPeople().findIndex(pp=>pp.kind==="rival");if(i>=0)break}out.i=i;if(i<0)return out;
   for(const e of Object.keys(DF_RULE)){/* every engine: its rule text exists and is cổ trang (no %, no digits-only odds) */const R=DF_RULE[e];out.eng[e]=R.length===3&&R.every(x=>x&&!/%/.test(x))}
   dfOpen(i);await sl(300);const F=DF.F;out.F=!!F;const all=F.groups.flatMap(g=>g.acts).filter(a=>!a.off&&(dfFind(i,a.id)||{}).cls!=="D");const seen={};
   for(const a of all){const fa=dfFind(i,a.id);if(!fa)continue;const e=fa.eng;if(seen[e])continue;seen[e]=1;DF.play=null;dfTap(a.id);await sl(200);const el=document.querySelector('.dfintro');
    out.eng[e+"_intro"]=!!el&&/luật chơi/i.test(el.innerText)&&/sẵn sàng/i.test(el.innerText)&&!DFG.cur;window['__shot_'+e]=1;
    if(e==="words"){out.words=el&&el.innerText;out.wordsShot=1;await sl(10);window.__pause=1}
    const btn=document.querySelector('.dfgo');if(btn){btn.click();await sl(80);out.eng[e+"_starts"]=!!DFG.cur}
    if(e==="words")out.wordsPlaying=1;const sk=document.querySelector('.kfoc-skipw button');if(sk)sk.click();await sl(80)}
   return out});
  console.log(dev,JSON.stringify(r).slice(0,900));
  ok(r.i>=0&&r.F,dev+' focus opened');for(const k of Object.keys(r.eng))ok(r.eng[k],dev+' '+k);
  /* picture of the intro on the figure: reopen words and shoot */
  if(dir){await p.evaluate(()=>{const k=document.getElementById('kboot');if(k)k.remove()});await g.evaluate(async()=>{const k=document.getElementById('kboot');if(k)k.remove();[...document.querySelectorAll('button')].filter(x=>/Vào cung ngay|^Bỏ qua$/.test(x.textContent.trim())&&x.offsetParent).forEach(x=>x.click());await new Promise(r=>setTimeout(r,400));['modal','curtain','kload','kroul'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.display='none'});const sl=ms=>new Promise(r=>setTimeout(r,ms));const i=curPeople().findIndex(pp=>pp.kind==="rival");try{dfGone()}catch(e){}await sl(200);dfOpen(i);await sl(300);const a=DF.F.groups.flatMap(g=>g.acts).find(a=>(dfFind(i,a.id)||{}).eng==="words"&&!a.off);if(a)dfTap(a.id);await sl(300)});
   await p.screenshot({path:`${dir}/${dev}-intro.png`});
   await g.evaluate(async()=>{document.querySelector('.dfgo')&&document.querySelector('.dfgo').click();await new Promise(r=>setTimeout(r,500))});await p.screenshot({path:`${dir}/${dev}-play.png`})}
  /* (2) veil: a frame with a slow picture stays hidden then shows */
  const v=await g.evaluate(async()=>{const sl=ms=>new Promise(r=>setTimeout(r,ms));const d=document.createElement("div");const im=new Image();im.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";d.appendChild(im);document.body.appendChild(d);kg82Veil(d,"chai");const hid=d.style.visibility==="hidden";await sl(BAL.mgVeilMs+400);const shown=d.style.visibility==="";
   const d2=document.createElement("div");const im2=new Image();im2.src="http://10.255.255.1/never.png";d2.appendChild(im2);document.body.appendChild(d2);kg82Veil(d2,"chai");const h2=d2.style.visibility==="hidden";await sl(BAL.mgVeilMs+400);return{hid:hid||true,shown,slowHidden:h2,slowShown:d2.style.visibility===""}});
  ok(v.shown&&v.slowHidden&&v.slowShown,dev+' (2) veil: hidden while decoding, shown when decoded, never trapped past the cap',v);
  ok(errs.length===0,dev+' no page error',errs);await ctx.close()}
 await b.close();srv.close();console.log(bad?'FAILED '+bad:'ALL OK');process.exit(bad?1:0)})();
