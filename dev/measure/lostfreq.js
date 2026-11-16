/* D38 jlost frequency + fairness bot: N lives × M weeks, dialogs dropped (so she never lies, never steals, never wears others' items).
   usage: node dev/measure/lostfreq.js <url of root index.html> [lives=2] [weeks=300]
   Prints: cases per life (her / NPC), causes, keep vs plant, act laydo by NPCs, hearings by kind, and FAIRNESS: any penalty to her
   from a lost-item hearing while she did nothing (must be 0; a rival's real plant scheme goes through the j92 dialog, counted apart). */
const {chromium}=require('playwright');const [,,URL,LIVES,WEEKS]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{timeout:0});await p.addStyleTag({content:'#kroul,#kroulw,#kload,.krbox,#dawn,#curtain,.fxo{display:none!important}'});await p.waitForTimeout(5000);
 const r=await p.evaluate(([L,W])=>{document.getElementById('title').hidden=true;const T={lives:0,months:0,me:0,npc:0,cause:{},keep:0,actNpc:0,actOnMe:0,quiet:0,quietMe:0,keepHear:0,keepWin:0,j92lo:0,j92loMe:0,unfairMe:0};
  const l0=loLose;loLose=function(pp,f){const c=l0.apply(this,arguments);if(c){if(pp===S)T.me++;else T.npc++;T.cause[c.cause]=(T.cause[c.cause]||0)+1;if(c.keep)T.keep++;if(f&&f.cause==="riv"&&f.by!=="me"){T.actNpc++;if(pp===S)T.actOnMe++}}return c};
  const q0=loQuietHear;loQuietHear=function(c,a,h){T.quiet++;if(h===S){T.quietMe++;const d=S.danh;const r=q0.apply(this,arguments);if(S.danh<d)T.unfairMe++;return r}return q0.apply(this,arguments)};
  const k0=loKeepHear;loKeepHear=function(c,a,h){T.keepHear++;if(h===S)T.unfairMe++;const st=c.st;const r=k0.apply(this,arguments);if(c.st==="done")T.keepWin++;return r};
  const w0=wdFrameResolve;wdFrameResolve=function(a,t){const i=wdFrameIx(a,t);const e=i>=0?t.inv[i]:null;if(e&&e.lo){T.j92lo++;if(t===S)T.j92loMe++}return w0.apply(this,arguments)};
  for(let l=0;l<L;l++){for(let i=0;i<40;i++){try{store.set(NL_KEY,null)}catch(e){}start();let ok=false;try{ok=!isSrv()}catch(e){}if(ok)break}T.lives++;const m0=S.turn;
   for(let w=0;w<W&&!S.dead;w++){Q.length=0;try{endTurn()}catch(e){}}T.months+=S.turn-m0;Q.length=0}
  return T},[+(LIVES||2),+(WEEKS||300)]);
 r.perYearMe=+(r.me/(r.months/12)).toFixed(2);r.perYearNpc=+(r.npc/(r.months/12)).toFixed(2);console.log(JSON.stringify({r,errs:errs.slice(0,5)}));await b.close()})();
