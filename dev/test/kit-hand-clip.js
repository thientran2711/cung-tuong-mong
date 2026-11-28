/* kit-hand-clip (K-HAND-CLIP, KK71 28/11; KK70 / RV-185 follow-up of K-HAND-DUPMAT; laws 10 + 11 «the card grows, text never clipped», KIT §101.10)
   The enlarged hand card (jkhand kitHandBigPlace → kitHandBigFit). When neither side of the hand had room for the card, the whole hand shrank (to
   KIT_HAND.big.shrinkMin) and the card went UNDER it — even when that freed LESS room than stood free above the hand. A short dialog on Fold
   (servant bribe set cnvBribeOpts: «Nhận bạc, làm tai mắt» / «Từ chối, bẩm chủ» with a long Kèm row) got 127 px under the shrunk hand while
   186 px stood free above: the wide card ran out of type sizes and clipped its last line by 6–7 px. Now the hand shrinks only when the room it
   frees under the hand beats the room above it.
   Check: servant games × their rivals, every hand card of the bribe set enlarged (real kitHandPlate path, plate settled): no row text sticks out of
   the plate box. Fold + iPad Air. KMUT=1 serves the old shrink condition → Fold must FAIL.
   usage: node dev/test/kit-hand-clip.js <root of BUILT site> [games=12]   (exit 1 on FAIL) */
const {chromium}=require('playwright');const D=require('./lib/device');
const [,,ROOT,GAMES]=process.argv;const NEW='if(k<1&&Math.round(bot0-(gr.top+H0*k+K.gapHand))>above){';const OLD='if(k<1){';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{for(const dev of ['fold','ipadAir']){const srv=await D.serveRoot(ROOT);const b=await chromium.launch();
 const ctx=await D.newDeviceContext(b,dev,{reducedMotion:'reduce'});await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev/,r=>r.abort());
 let patched=null;if(process.env.KMUT)await ctx.route(/\/(index\.html)?(\?.*)?$/,async r=>{if(r.request().resourceType()!=='document')return r.continue();const f=await r.fetch();let t=await f.text();if(t.includes(NEW)){t=t.replace(NEW,OLD);patched=true}else if(patched==null)patched=false;r.fulfill({response:f,body:t})});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const g=await D.openHost(p,srv.url);await p.waitForTimeout(2500);await g.addStyleTag({content:'#kroul,.kroul,[id^=kroul]{display:none!important}'});
 const r=await g.evaluate(async(GM)=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;try{j95bOn=()=>false}catch(e){}
  const hits=[];let tried=0,games=0;
  for(let gm=0;gm<GM;gm++){let sv=false;for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(isSrv()){sv=true;break}}if(!sv)continue;games++;Q.length=0;document.getElementById("modal").hidden=true;render();
   document.querySelectorAll('.klife,#curtain').forEach(e=>e.remove());const m=srvM();
   for(const v of liveRivals(true).filter(x=>x!==m).slice(0,6)){Q.length=0;document.getElementById("modal").hidden=true;
    Q.push({t:"x",h:"<p>probe</p>",who:pv(v),opts:cnvPend(S,cnvBribeOpts(S,v,m,BAL.coopBribe.pay))});showModal();await new Promise(r=>setTimeout(r,150));
    for(const c of [...document.querySelectorAll("#modal button.kopt")]){if(!(c.parentElement&&c.parentElement.classList.contains("khand")))continue;
     kitHandPlate(c);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(r,400))));
     const dd=c.closest(".dlg");const z=dd&&dd.querySelector(":scope>.khplate");if(!z)continue;tried++;const P=z.getBoundingClientRect();
     const out=[...z.querySelectorAll(".khbi .krv>.ef,.khbi .krl,.khbn")].filter(e=>e.getClientRects().length&&e.textContent.trim()).map(e=>({t:e.textContent.replace(/\s+/g," ").trim().slice(0,30),q:e.getBoundingClientRect()})).filter(x=>x.q.bottom>P.bottom+1||x.q.top<P.top-1||x.q.right>P.right+1||x.q.left<P.left-1);
     if(out.length&&hits.length<6)hits.push({card:(c.querySelector(".kan,b")||c).textContent.trim().slice(0,30),by:Math.round(Math.max(...out.map(x=>x.q.bottom-P.bottom))),rows:out.map(x=>x.t),dbg:window.__khdbg});
     z.hidden=true}}}
  Q.length=0;document.getElementById("modal").hidden=true;return {games,tried,hits}},+(GAMES||12));
 ok(r.tried>=20,`${dev} bribe-set hand cards enlarged`,{games:r.games,cards:r.tried});
 ok(!r.hits.length,`${dev} no plate clips a row`,r.hits.slice(0,2));
 if(process.env.KMUT)ok(patched===true,`${dev} KMUT build served (old shrink condition)`);
 ok(!errs.length,`${dev} page errors 0`,errs.slice(0,3));await b.close();srv.close()}
 const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}`:`ALL OK (${res.length})`);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
