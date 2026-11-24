/* review/servant-mline-r1: a save made on the previous main build loads in this build and the maid line runs on it (no S.mline / s.seek crash).
   usage: node dev/test/mline-oldsave.js <oldBuildUrl> <newBuildUrl> [months]. Prints JSON; exit 1 on page errors. */
const {chromium}=require('playwright');const [,,OLD,NEW,MON='24']=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
async function boot(p,u){await p.goto(u,{waitUntil:'domcontentloaded'});for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}await sleep(800)}
(async()=>{const b=await chromium.launch({args:['--blink-settings=imagesEnabled=false']});const ctx=await b.newContext({serviceWorkers:'block'});await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const errs=[];let p=await ctx.newPage();await require('./lib/veil').guard(p);p.on('pageerror',e=>errs.push('old:'+e.message.slice(0,160)));p.setDefaultTimeout(600000);await boot(p,OLD);
 const saved=await p.evaluate((MON)=>{window.__forceOrigin='thd';SLOT=3;quiet=true;window.__nlInner=1;start();window.__nlInner=0;quiet=true;const r0=render;render=()=>{};
  for(let i=0;i<4;i++){const s=mkServ('maid');s.age=18;S.staff.push(s)}let g=0;const t0=S.turn;while(S.turn<t0+6&&g++<80){Q.length=0;S.mg=null;try{endTurn()}catch(e){}if(S.dead)break}
  render=r0;quiet=false;S.dead=false;save();return {turn:S.turn,ls:Object.keys(localStorage).filter(k=>/3/.test(k)),hasMline:typeof mlMonth}},+MON);
 const LS=await p.evaluate(()=>JSON.stringify(Object.assign({},localStorage)));await p.close();
 p=await ctx.newPage();await require('./lib/veil').guard(p);p.on('pageerror',e=>errs.push('new:'+e.message.slice(0,160)));p.setDefaultTimeout(600000);
 await p.addInitScript(ls=>{if(!sessionStorage.getItem('__ld')){sessionStorage.setItem('__ld','1');const o=JSON.parse(ls);for(const k in o)localStorage.setItem(k,o[k])}},LS);await boot(p,NEW);
 await p.evaluate(()=>{try{showTitle()}catch(e){}const b=document.querySelector('#slots [data-load="3"]');if(b)b.click()});await sleep(2500);
 const out=await p.evaluate((MON)=>{window.__mlN={};let ok=S?true:'no S after load';if(!S)return {ok};Q.length=0;quiet=true;const r0=render;render=()=>{};
  const t0=S.turn,maids=(S.staff||[]).filter(s=>s.role==='maid').length;let g=0;while(S.turn<t0+MON&&g++<MON*8){Q.length=0;S.mg=null;try{const md=document.getElementById('modal');if(md)md.hidden=true}catch(e){}if(S.dead)S.dead=false;try{endTurn()}catch(e){ok='turn:'+e.message;break}}
  render=r0;quiet=false;try{render()}catch(e){ok='render:'+e.message}return {ok,turn0:t0,turn:S.turn,maids,mlN:window.__mlN,seekers:(S.staff||[]).filter(s=>s.seek).length}},+MON);
 console.log(JSON.stringify({saved,out,errs:errs.slice(0,6)}));await b.close();process.exit(errs.length||out.ok!==true?1:0)})().catch(e=>{console.error(e);process.exit(1)});
