/* probe: her part-D notice cards after a Lãnh cung close, tapped on her phone; does each pick land on the host? */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'http://127.0.0.1:8787';const SWAP=+(process.argv[3]||1);const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const clear=(()=>{const t=fs.readFileSync(path.join(__dirname,'coop-e2e.js'),'utf8');const i=t.indexOf('async function clear(');const j=t.indexOf("return'many'}",i)+13;return eval('('+t.slice(i,j)+')')})();
async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   window.__co=()=>{const c=window.COOP;if(!c)return{};return{code:c.code,seat:c.seat,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.on)}}},[WURL,want]);
 const p=await ctx.newPage();p.setDefaultTimeout(90000);p.on('pageerror',e=>console.log('PERR',name,e.message.slice(0,300)));
 p.on('console',m=>{const t=m.text();if(m.type()==='error'&&!/Failed to load|favicon|fonts|CORS/.test(t))console.log('CERR',name,t.slice(0,400));if(/^PRB/.test(t))console.log(name,t.slice(0,1500))});return {name,p}}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
(async()=>{const b=await chromium.launch({args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']});
 const H=await mk(b,'host',SWAP?[1180,820]:[686,880],13),G=await mk(b,'guest',SWAP?[686,880]:[1180,820],0);
 await H.p.goto(BASE);await H.p.waitForTimeout(3000);await tapText(H,/^(Chơi cùng bạn|Cùng hảo hữu)/);await H.p.waitForTimeout(500);await tapText(H,/^(Mời bạn|Mời hảo hữu)/);
 await H.p.waitForFunction(()=>window.COOP&&COOP.code&&COOP.seat==='a');const code=await H.p.evaluate(()=>COOP.code);
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);await tapText(G,/^(Vào phòng|Tiếp tục)/,4000);
 const t0=Date.now();while(Date.now()-t0<150000){await clear(H);await clear(G);const a=await H.p.evaluate(()=>typeof S!=='undefined'&&!!S&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>typeof S!=='undefined'&&!!S&&rivals.some(v=>v.coop));if(a&&c)break;await sleep(500)}
 for(let i=0;i<6;i++){await clear(H);await clear(G);await sleep(300)}
 console.log('lvl',await H.p.evaluate(()=>COOPW.thin.lvl),await G.p.evaluate(()=>COOPW.thin.lvl));
 await H.p.evaluate(()=>{COOPW.thin.D.later('b',()=>{cold('Thử vào lãnh cung')});});
 await sleep(1500);
 const dump=async()=>({h:await H.p.evaluate(()=>{const B=COOPW.thin.seatOf('b');return {thq:(B.S.thq||[]).map(c=>c.t),out:B.S.out,log:COOPW.thin.D.log.slice(-4)}}),
   g:await G.p.evaluate(()=>({Q:Q.map(q=>[q.t,q.thin]),out:S.out,place:S.place,modal:document.getElementById('modal').hidden,title:(document.querySelector('#modal .dlg')||{}).innerText?.slice(0,60),btns:[...document.querySelectorAll('#modal button')].filter(b=>b.offsetParent).map(b=>(b.id||b.className)+':'+b.textContent.trim().slice(0,14)),inLife:COOPW.inLife,life:!!(COOPW.thin.life&&COOPW.thin.life.ask)}))});
 console.log('after cold',JSON.stringify(await dump()));
 /* her close of each card, one by one */
 for(let k=0;k<6;k++){const d=await dump();if(!d.g.Q.length&&!d.h.thq.length)break;
  if(k===0)await H.p.evaluate(()=>{COOPW.thin.D.later('b',()=>{const k=Object.keys(IT).find(k=>IT[k].sl&&IT[k].rk>=3);S.inv=S.inv||[];S.inv.push({k});console.log('PRB item',k,JSON.stringify(demoSeize(S,'cold','thử')))})});
  await sleep(1000);
  const r=await G.p.evaluate(()=>{const b=[...document.querySelectorAll('#modal button')].find(b=>b.offsetParent&&(b.id==='mclose'||b.classList.contains('kit-x')));const t=Q[0]&&Q[0].t;if(!b||b.offsetParent===null)return {nob:1,t,btns:[...document.querySelectorAll('#modal button')].map(b=>(b.id||b.className)+':'+b.textContent.trim().slice(0,14)+':'+(b.offsetParent?1:0))};b.click();return {t}});
  await sleep(1500);console.log('tap',k,JSON.stringify(r),JSON.stringify(await dump()))}
 await b.close()})();
