/* review/fig-label (owner 20/11): a person's role + rank is said ONCE (kitMaidTitle, j79), rank from SRK, never typed.
   usage: node dev/test/fig-label.js <outdir> [fold|ipadAir ...]   (serves the built root; run bash dev/site/build_site.sh first)
   Checks per device: every SRK.maid rung merges right (+ old save without rk); home stage tag = 1 title line + name line; person card, home list,
   staff list, people-index label carry the merged title; NO caption/card/row repeats a role word twice (scan table printed); 0 page errors. */
const {chromium}=require('playwright');const fs=require('fs');const D=require('./lib/device');
const OUT=process.argv[2]||'/tmp/fig-label';const DEVS=process.argv.slice(3).length?process.argv.slice(3):['fold','ipadAir'];fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot();const PX=process.env.HTTPS_PROXY;const b=await chromium.launch(PX?{proxy:{server:PX,bypass:'127.0.0.1,localhost'}}:{});const fail=[],table=[];
for(const dev of DEVS){const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>fail.push(dev+' pageerror '+e.message));
 const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
 await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;deal();render()});await sleep(2500);
 const clean=()=>g.evaluate(()=>{try{kmReset()}catch(e){}Q.length=0;for(const id of['modal','dawn']){const e=document.getElementById(id);if(e)e.hidden=true}});
 /* 1 merge rule, every rung + old save */
 const rungs=await g.evaluate(()=>SRK.maid.map((r,i)=>{S.maid.rk=i;return[r,kitMaidTitle(),kitMaidTitle(null,1)]}));
 rungs.forEach(([r,t,l],i)=>{const want=/^Cung nữ /.test(r)?'Cung nữ thân tín '+r.slice(8):r+' thân tín';if(t!==want)fail.push(`rung ${i} ${t} != ${want}`);if(/(Cung nữ|thân tín).*\1/i.test(t))fail.push('repeat in '+t);if(l!==want[0].toLowerCase()+want.slice(1))fail.push('lower '+l)});
 const old=await g.evaluate(()=>{delete S.maid.rk;return kitMaidTitle()});if(old!=='Cung nữ thân tín tam đẳng')fail.push('old save '+old);
 await g.evaluate(()=>{S.maid.rk=1;S.place="home";tab="act";goTo("home");Q.length=0;render()});await clean();await sleep(2500);
 /* 2 stage tag */
 const tags=await g.evaluate(()=>[...document.querySelectorAll('#tokens .tok .tag, #j59metag .tag')].filter(e=>e.offsetParent).map(e=>({lines:[...e.children].map(c=>c.innerText.trim()),txt:e.innerText.replace(/\n/g,' / ')})));
 const mt=tags.find(t=>/thân tín/.test(t.txt));if(!mt)fail.push(dev+' no maid tag');else{if(mt.lines.join('|')!=='Cung nữ thân tín tam đẳng|'+mt.lines[1]||mt.lines.length!==2||/thân tín|Cung nữ/.test(mt.lines[1]))fail.push(dev+' maid tag '+JSON.stringify(mt))}
 const one=await g.evaluate(()=>[...document.querySelectorAll('#tokens .tok .tag .j59t, #j59metag .tag .j59t')].filter(e=>e.offsetParent).map(t=>[t.innerText,t.scrollWidth<=t.clientWidth+1,t.getClientRects().length&&Math.round(t.getBoundingClientRect().height/parseFloat(getComputedStyle(t).lineHeight||16))]));one.forEach(([x,fit])=>{if(!fit)fail.push(dev+' title cut/wraps: '+x)});
 table.push([dev,'stage tag',mt&&mt.txt]);await p.screenshot({path:`${OUT}/stage-${dev}.png`});
 /* 3 card, home list, staff list, people index */
 await g.evaluate(()=>{tab="staff";render();window.scrollTo(0,0)});await sleep(1500);
 const st=await g.evaluate(()=>{const P=document.getElementById('panel')||document.body;const t=P.innerText;return{t:t.slice(0,900),rows:[...P.querySelectorAll('.srow2,.pc')].map(e=>e.innerText.replace(/\n/g,' / '))}});
 st.rows.filter(r=>/thân tín/i.test(r)).forEach(r=>{table.push([dev,'staff row/card',r.slice(0,120)]);if(!/thân tín tam đẳng/i.test(r))fail.push(dev+' staff row '+r)});
 await p.screenshot({path:`${OUT}/staff-${dev}.png`});
 /* 4 whole-page scan: a caption/row/card never repeats a role word */
 const rep=await g.evaluate(()=>[...document.querySelectorAll('.tag,.srow2,.pc,.pcrk,.pcname,.j59t,.j59n,.sinfo,figcaption,.kname')].map(e=>e.innerText.replace(/\n/g,' / ')).filter(t=>/(cung nữ|thân tín|tam đẳng|thái giám)[^/·]*\b\1/i.test(t)||/Cung nữ[^/·]*cung nữ/i.test(t)));
 rep.forEach(t=>fail.push(dev+' repeat: '+t));
 const hp=await g.evaluate(()=>homePeople()[0].info);table.push([dev,'homePeople info',hp]);if(!/^Cung nữ thân tín tam đẳng · /.test(hp))fail.push('homePeople '+hp);
 await g.evaluate(()=>{tab="act";render()});await ctx.close()}
console.log(table.map(r=>r.join(' | ')).join('\n'));console.log(fail.length?'FAIL\n'+fail.join('\n'):'PASS');await b.close();srv.close();process.exit(fail.length?1:0)})();
