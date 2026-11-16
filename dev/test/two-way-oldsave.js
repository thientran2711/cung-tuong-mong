/* review/two-way-acts: a save made on the main build loads in this build; NPC deeds (SOC, npcMonthly, the new BAL.tw deeds) run for N
   weeks on it and the rival talk list (new player options) builds. usage: node dev/test/two-way-oldsave.js <old.html> <new.html> [weeks]
   (files built with CTM_IMG_BASE= python3 dev/build/assemble.py). Exit 1 on page errors. */
const {chromium}=require('playwright');const [,,OLD,NEW,WK='40']=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
async function boot(p){for(let i=0;i<300;i++){const ok=await p.evaluate(()=>{const g=document.querySelector('#kload [data-kl="go"]');if(g)g.click();return !!document.querySelector('#slots button[data-new]')});if(ok)return;await sleep(200)}}
(async()=>{const b=await chromium.launch();const ctx=await b.newContext();await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const errs=[];let p=await ctx.newPage();p.on('pageerror',e=>errs.push('old:'+e.message.slice(0,160)));
 await p.goto(OLD);await boot(p);await p.evaluate(()=>localStorage.clear());await p.reload();await boot(p);
 await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(1200);
 const saved=await p.evaluate(()=>{quiet=true;const r0=render;render=()=>{};let g=0;const t0=S.turn;while(S.turn<t0+8&&g++<80){Q.length=0;S.mg=null;try{endTurn()}catch(e){}if(S.dead)break}
  render=r0;quiet=false;S.dead=false;Q.length=0;localStorage.setItem(SK(SLOT),JSON.stringify(ser()));localStorage.setItem("hclh-slot",String(SLOT));return {turn:S.turn,slot:typeof SLOT!=="undefined"?SLOT:null}});
 const LS=await p.evaluate(()=>JSON.stringify(Object.assign({},localStorage)));p.removeAllListeners('pageerror');p.on('pageerror',e=>errs.push('new:'+e.message.slice(0,160)));
 await p.addInitScript(ls=>{if(!sessionStorage.getItem('__ld')){sessionStorage.setItem('__ld','1');const o=JSON.parse(ls);for(const k in o)localStorage.setItem(k,o[k])}},LS);
 await p.goto(NEW);await boot(p);
 await p.evaluate(s=>{const b=document.querySelector(`#slots [data-load="${s}"]`)||document.querySelector('#slots [data-load]');if(b)b.click();return document.querySelector("#slots")?document.querySelector("#slots").innerHTML.slice(0,300):"no slots"},saved.slot).then(x=>console.log("SLOTS",x));await sleep(3000);
 const out=await p.evaluate(WK=>{if(typeof S==="undefined"||!S)return {ok:'no S after load'};let ok=true;const t0=S.turn;quiet=true;const r0=render;render=()=>{};let g=0;
  while(S.turn<t0+WK&&g++<WK*8){Q.length=0;S.mg=null;if(S.dead)S.dead=false;try{endTurn()}catch(e){ok='turn:'+e.message;break}}
  render=r0;quiet=false;let tw=null;try{render();const v=liveRivals(true).find(x=>!x.queen);tw=topicOpts(v).map(a=>a.n).slice(-6);
   for(const x of liveRivals(true))if(x.tablet==null||isNaN(x.tablet))ok='tablet NaN'}catch(e){ok='render:'+e.message}return {ok,turn0:t0,turn:S.turn,tw}},+WK);
 console.log(JSON.stringify({saved,out,errs:errs.slice(0,6)}));await b.close();process.exit(errs.length||out.ok!==true?1:0)})().catch(e=>{console.error(e);process.exit(1)});
