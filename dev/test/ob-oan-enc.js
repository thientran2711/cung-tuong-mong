/* ob-oan-enc (MAIN 157, LC21 land check): the hater STANDS IN HER ROOM (a rival on the home stage, jdfv encounter on, real figure art from the CDN).
   A  Nguy hiểm chung box → «Làm lành với <her>» → the choice shows ONCE (centre modal OR the stage encounter scene, never both, never empty) → real tap «Nhún nhường» → oán −oanDown.
   B  real tap on HER FIGURE on the stage → the encounter card → real tap «Nhún nhường» there → shows once, oán drops, no centre modal left over.
   usage: node dev/test/ob-oan-enc.js <root> <videoDir|-> [WxH@dpr ...]  → exit 1 on FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');
const [,,ROOT,VID0,...SZ]=process.argv;const VID=VID0&&VID0!=='-'?VID0:null;const SIZES=SZ.length?SZ:['755x1000@1','1180x820@1'];
const MIME={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp','.png':'image/png','.webmanifest':'application/json'};
/* the game files from disk, everything else (CDN pictures) from the network: real figure art */
const serve=async ctx=>{await ctx.route(/^https?:/,r=>{const u=new URL(r.request().url());if(u.hostname!=='ctm.local')return r.continue();
 const f=path.join(ROOT,decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname));if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
 return r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[path.extname(f)]||'application/octet-stream'}})})};
const boot=async p=>{await p.goto('http://ctm.local/index.html',{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:180000});await p.waitForTimeout(1200);
 await p.evaluate(()=>{for(const id of ['kload','kroul','kroulw','dawn','klife']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}try{kitRoulette=o=>{try{o&&o.done&&o.done()}catch(e){}}}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  window.__forceOrigin='tt';for(let i=0;i<30;i++){start();if(!isSrv())break}});
 for(let i=0;i<6;i++){const t=await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal button.opt')].find(x=>/^(Vào cung ngay|Nhận thân phận)/.test(x.innerText));if(!b||document.getElementById('modal').hidden)return'';b.click();return 1});if(!t)break;await p.waitForTimeout(700)}
 await p.evaluate(()=>{for(const id of ['klife','kload']){const x=document.getElementById(id);if(x)x.remove()}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});
 try{await p.waitForFunction(()=>!document.getElementById('kdaytc'),null,{timeout:20000})}catch(e){}};
/* a rival on her home stage, not of her house; she becomes THE hater (oán under her forgiving line, ghen high), the others calm */
const seed=(p,needFig)=>p.evaluate(needFig=>{render();const visTok=i=>{const t=document.querySelector('#tokens .tok[data-p="'+i+'"]');return !!(t&&t.getBoundingClientRect().width>0)};
 /* a rival of another house, her figure drawn on the stage (not folded into «+N»), whose nết does not gate harm (j28 danger harmGate) */
 const i=curPeople().findIndex((x,j)=>(x.kind==='rival'||x.kind==='hh')&&x.ref&&!sameHouse(S,x.ref)&&!persF(x.ref,'harmGate',0)&&(!needFig||visTok(j)));if(i<0)return null;const v=curPeople()[i].ref;
 for(const o of liveRivals(true)){if(o!==v){o.ghen=0;o.oan=0;if((+o.rel||0)<0)o.rel=0}}/* review/oan-pace-2 (WORKLIST row 38): another consort's dislike (thiện cảm < 0, danger × net.heat.affK) could outrank the hater, so her «Làm lành» card was not in the panel's top 3 (random life: FAIL on some lives, LIVE too) */v.oan=Math.max(3,netTh(v,'nguoi')-3);v.ghen=95;S.dKnown=S.dKnown||{};S.dKnown[v.id]=wk();try{S.met[v.id]=S.met[v.id]??wk()}catch(e){}try{const K=k61S();if(K)K[kOf61(v)]=3}catch(e){}
 used=0;S.suc=Math.max(S.suc,80);S.bac=Math.max(S.bac,200);Q.length=0;render();return{i,id:v.id,name:v.name,oan:Math.round(oan(v,S)),fig:visTok(i)}},needFig);
/* every place a «Nhún nhường» choice is visible now: centre modal buttons + encounter (kitFocus) buttons */
const seen=p=>p.evaluate(()=>{const vis=e=>!!(e&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden');const M=document.getElementById('modal');
 const mo=M&&!M.hidden?[...M.querySelectorAll('.opt[data-m]')].filter(vis).filter(b=>/^Nhún nhường/.test(b.innerText)).length:0;
 const fo=[...document.querySelectorAll('.kfoc-b')].filter(vis).filter(b=>/^Nhún nhường/.test((b.getAttribute('aria-label')||b.innerText||'').trim())).length;
 return{modal:mo,scene:fo,modalShown:!!(M&&!M.hidden),modalTitle:M&&!M.hidden?document.getElementById('mt').textContent:'',q:Q.map(m=>m.t)}});
const tapHumble=p=>p.evaluate(()=>{const vis=e=>!!(e&&e.getClientRects().length);const M=document.getElementById('modal');
 const a=M&&!M.hidden?[...M.querySelectorAll('.opt[data-m]')].find(b=>vis(b)&&/^Nhún nhường/.test(b.innerText)&&!b.disabled):null;if(a){a.click();return'modal'}
 const f=[...document.querySelectorAll('.kfoc-b')].find(b=>vis(b)&&/^Nhún nhường/.test((b.getAttribute('aria-label')||b.innerText||'').trim())&&!b.classList.contains('kfoc-off'));if(f){f.click();return'scene'}return null});
(async()=>{const b=await chromium.launch();const R=[];const ok=(c,n,x)=>{R.push(!!c);console.log((c?'PASS':'FAIL')+' | '+n+(x==null?'':' | '+JSON.stringify(x).slice(0,400)));return c};
 for(const sz of SIZES){const [w,h,d]=sz.split(/[x@]/).map(Number);
  for(const flow of ['A','B']){
   const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:d||1,serviceWorkers:'block',...(VID?{recordVideo:{dir:path.join(VID,`${w}x${h}-${flow}`),size:{width:w,height:h}}}:{})});await serve(ctx);
   const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));let v=null;
   for(let k=0;k<10&&!v;k++){await boot(p);v=await seed(p,flow==='B')}
   if(!v&&flow==='B'){console.log(`SKIP | ${sz} B: in 10 lives no visiting rival had her figure DRAWN on the home stage (visitors fold into «+N»), so there is no figure to tap`);await ctx.close();continue}
   if(!ok(!!v,`${sz} ${flow}: a rival stands in her room`,v)){await ctx.close();continue}
   await p.waitForTimeout(2500);const dn=await p.evaluate(()=>BAL.ag.cx.humble.oanDown);
   const enc=await p.evaluate(()=>typeof dfEncOn==='function'&&dfEncOn());ok(enc,`${sz} ${flow}: stage encounter is on (figure art: ${await p.evaluate(i=>typeof dfHasFig==='function'&&dfHasFig(i),v.i)})`);
   if(flow==='A'){
    await p.evaluate(()=>{const b=document.querySelector('[data-k3="tsnh"],[data-hx="tsnh"]');if(b)b.click()});await p.waitForTimeout(1500);
    /* review/oan-pace-2 (WORKLIST row 38): wait for the panel's «Làm lành với …» card to be built (a busy box at iPad size missed it after the fixed 1.5 s) */await p.waitForFunction(n=>[...document.querySelectorAll('#modal .opt[data-m]')].some(x=>/^Làm lành với/.test(x.innerText)&&x.innerText.includes(n)),v.name,{timeout:15000,polling:250}).catch(()=>{});const tapped=await p.evaluate(n=>{const b=[...document.querySelectorAll('#modal .opt[data-m]')].find(x=>/^Làm lành với/.test(x.innerText)&&x.innerText.includes(n));if(!b)return null;b.scrollIntoView({block:'center'});b.click();return b.innerText.slice(0,40)},v.name);
    ok(!!tapped,`${sz} A: «Làm lành với ${v.name}» card tapped in the panel`,tapped);await p.waitForTimeout(3500);
    const s1=await seen(p);ok(s1.modal+s1.scene===1,`${sz} A: the choice shows ONCE (modal ${s1.modal} + scene ${s1.scene})`,s1);
    const via=await tapHumble(p);await p.waitForTimeout(3500);const o1=await p.evaluate(id=>Math.round(oan(RV(id),S)),v.id);
    ok(!!via&&o1<=v.oan-dn+1,`${sz} A: Nhún nhường tapped (${via}) → oán ${v.oan} → ${o1}`);
    const s2=await seen(p);ok(s2.modal+s2.scene===0&&!/Làm lành/.test(s2.modalTitle),`${sz} A: nothing left over (no second / empty «Làm lành» dialog)`,s2)}
   else{
    const fig=await p.evaluate(i=>{const t=document.querySelector(`#tokens .tok[data-p="${i}"]`);if(!t)return null;const r=t.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height*0.35}},v.i);
    ok(!!fig,`${sz} B: her figure on the stage`,fig);if(fig){await p.mouse.click(fig.x,fig.y);await p.waitForTimeout(3500)}
    /* her card: the talk acts sit under a group tab — open the tab that holds «Nhún nhường» */
    for(let k=0;k<6;k++){const s=await seen(p);if(s.scene)break;const t=await p.evaluate(k=>{const T=[...document.querySelectorAll('.kfoc-tabs button, .kfoc-tabs [role=tab]')];const b=T[k];if(!b)return null;b.click();return b.innerText},k);if(t==null)break;await p.waitForTimeout(700)}
    const s1=await seen(p);ok(s1.modal+s1.scene===1,`${sz} B: in the encounter card «Nhún nhường» shows ONCE (modal ${s1.modal} + scene ${s1.scene})`,s1);
    const via=await tapHumble(p);await p.waitForTimeout(3500);const o1=await p.evaluate(id=>Math.round(oan(RV(id),S)),v.id);
    ok(!!via&&o1<=v.oan-dn+1,`${sz} B: Nhún nhường tapped (${via}) → oán ${v.oan} → ${o1}`);
    const s2=await seen(p);ok(!/Làm lành|Nguy hiểm chung/.test(s2.modalTitle),`${sz} B: no stray centre modal`,s2)}
   ok(!errs.length,`${sz} ${flow}: no page error`,errs);const vd=p.video();await ctx.close();if(vd)console.log('video',await vd.path())}}
 await b.close();const f=R.filter(x=>!x).length;console.log(f?`FAIL ${f}/${R.length}`:`ALL PASS ${R.length}`);process.exit(f?1:0)})();
