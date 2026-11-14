/* Co-op bot run: two headless clients auto-play WEEKS weeks in one room on the LIVE Worker and compare their worlds every week.
   usage: python3 dev/build/assemble.py && node dev/test/coop-bot.js [weeks=52] [outdir] [workerURL]
   Each buổi each bot answers open choices at random, taps up to 3 random enabled act cards, then Qua buổi / Qua đêm.
   After every merged week both worlds are compared (Emperor, date, consorts id/name/rank/alive/out/queen, their children,
   Thái hậu, friend entry = the other player's real name + rank). Deaths → the bot takes the rebirth choice and goes on. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const WEEKS=+(process.argv[2]||52);const OUT=path.resolve(process.argv[3]||path.join(__dirname,'../shots/coop-bot'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[4]||'https://ctm-coop.victoria-tntt.workers.dev';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const log=[];const L=s=>{console.log(s);log.push(s)};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1});await serve(ctx);
  await ctx.addInitScript(u=>{window.COOP_URL=u;
    window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};const you=c.seat||s.you||null;const ended=c.ended||s.ended||{};
      const on=typeof c.on==='boolean'?c.on:!!(s.playing||(s.status&&s.status!=='off'));
      return{code:c.code||s.room||'',seat:you,week:c.week!=null?c.week:(s.week||0),ended,on,
        frozen:!!(on&&(s.status!=='open'||!s.peerOnline)),waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(you&&ended[you]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}},WURL);
  const p=await ctx.newPage();p.setDefaultTimeout(30000);const o={name,ctx,p,errs:[],acts:0,deaths:0,names:[]};
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon/.test(m.text()))o.errs.push('console: '+m.text())});return o}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);
  const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
const until=async(o,fn,arg,ms=30000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}};
/* one step of the bot inside the page: returns what it did */
const STEP=()=>{const c=__co();if(c.frozen||c.waiting)return'coop';if(typeof S==='undefined'||!S)return'nos';if(S.mg){try{S.mg=null;render()}catch(e){}return'mg'}
  if(S&&S.dead){const b=[...document.querySelectorAll('button')].filter(x=>x.offsetParent!==null&&!x.disabled);const k=b.find(x=>/Đầu thai|Luân hồi|Nhận thân phận|Tiến cung|Vào cung|Ở nhà|Nhập cung/.test(x.textContent))||b.find(x=>x.closest('#modal'));if(k){k.click();return'reborn:'+k.textContent.trim().slice(0,20)}return'dead'}
  const T=document.getElementById('title');if(T&&!T.hidden){const b=[...T.querySelectorAll('button')].filter(x=>x.offsetParent!==null&&!x.disabled);const k=b.find(x=>/Nhận thân phận|Tiến cung|Vào cung|Ở nhà|Lật|Chọn/.test(x.textContent))||b[0];if(k){k.click();return'title'}}
  const bk=[...document.querySelectorAll('.kbk-bar button')].find(x=>x.offsetParent!==null&&/^Lui$/.test(x.textContent.trim()));if(bk){bk.click();return'book'}
  const m=document.getElementById('modal');if(m&&!m.hidden){const acc=[...m.querySelectorAll('button:not([disabled])')].find(x=>x.offsetParent!==null&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent));if(acc){acc.click();return'accept'}const o=[...m.querySelectorAll('.opts button:not([disabled])')];const b=o.length?o[Math.floor(Math.random()*o.length)]:m.querySelector('#mr button:not([disabled])');if(b){b.click();return'modal'}return'stuck'}
  if(window.__actsThis==null)window.__actsThis=0;
  if(window.__actsThis<3&&Math.random()<.8){const cards=[...document.querySelectorAll('#panel button.card:not([disabled]),#panel button.kcard:not([disabled])')].filter(x=>x.offsetParent!==null);
    if(cards.length){window.__actsThis++;cards[Math.floor(Math.random()*cards.length)].click();return'act'}
    const t=[...document.querySelectorAll('[data-tab="act"]')].find(x=>x.offsetParent!==null);if(t&&!window.__tabTried){window.__tabTried=1;t.click();return'tab'}}
  const n=document.getElementById('next');if(n&&!n.disabled){window.__actsThis=0;window.__tabTried=0;n.click();return'next'}return'idle'};
/* the world as this client sees it (only shared truth, no personal data) */
const WORLD=()=>{const kidsOf=v=>(v.kids||[]).map(k=>k.name+(k.alive?'':'†')).join('/');
  return{date:[S.year,S.month,S.tuan],emp:[S.emp.era,S.emp.age,(S.emp.traits||[]).join('+'),!!S.emp.dead],th:!!S.thDead,
   R:rivals.filter(v=>!v.coop).map(v=>[v.id,v.name,v.queen?7:v.rank,v.alive?1:0,v.out?1:0,kidsOf(v)].join(':')).sort(),
   friend:(rivals.find(v=>v.coop)||null)&&(({name,rank,alive,queen})=>({name,rank:queen?7:rank,alive}))(rivals.find(v=>v.coop)),
   me:{name:S.name,rank:S.rank,dead:!!S.dead,srv:!!S.srv},where:Object.entries(S.where||{}).filter(([k])=>!(+k>=900)).map(([k,v])=>k+'@'+v).sort().join(),buoi:S.buoi||0}};

(async()=>{const b=await chromium.launch();const A=await mk(b,'A',[755,1000]),B=await mk(b,'B',[1180,820]);
 await A.p.goto(BASE);await A.p.waitForTimeout(3000);await tapText(A,/^Chơi cùng bạn/);await A.p.waitForTimeout(500);await tapText(A,/^Mời bạn/);
 await until(A,()=>__co().code&&__co().seat==='a');const code=(await A.p.evaluate(()=>__co())).code;L('room '+code);
 await B.p.goto(BASE+'?room='+code);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng/,4000);
 if(!await until(B,()=>__co().seat==='b'&&!__co().frozen,null,40000))L('FAIL B could not join');
 const div=[];let weeks=0,whereDiff=0;const t0=Date.now();
 for(let w=0;w<WEEKS;w++){const wk=(await A.p.evaluate(()=>__co().week));
  const done={A:false,B:false};const t=Date.now();
  while(Date.now()-t<120000){for(const o of [A,B]){const r=await o.p.evaluate(STEP).catch(e=>'err:'+e.message);if(r==='act')o.acts++;if(/^reborn/.test(r)){o.deaths++;L(`week ${w}: ${o.name} died → ${r}`)}}
   const wa=await A.p.evaluate(()=>__co().week),wb=await B.p.evaluate(()=>__co().week);if(wa>wk&&wb>wk)break;await sleep(60)}
  const wa=await A.p.evaluate(()=>__co().week),wb=await B.p.evaluate(()=>__co().week);if(!(wa>wk&&wb>wk)){L(`FAIL week ${w}: stuck (A week ${wa}, B week ${wb})`);
   await A.p.screenshot({path:`${OUT}/stuck-A.png`});await B.p.screenshot({path:`${OUT}/stuck-B.png`});break}
  await sleep(400);weeks++;
  const a=await A.p.evaluate(WORLD),c=await B.p.evaluate(WORLD);
  const d=[];if(String(a.date)!==String(c.date))d.push(`date ${a.date} vs ${c.date}`);if(String(a.emp)!==String(c.emp))d.push(`emp ${a.emp} vs ${c.emp}`);if(a.th!==c.th)d.push('thái hậu');
  const ra=new Set(a.R),rc=new Set(c.R);const onlyA=a.R.filter(x=>!rc.has(x)),onlyB=c.R.filter(x=>!ra.has(x));if(onlyA.length||onlyB.length)d.push(`consorts A-only [${onlyA}] B-only [${onlyB}]`);
  if(!a.friend||a.friend.name!==c.me.name)d.push(`A sees friend ${a.friend&&a.friend.name}, B is ${c.me.name}`);if(!c.friend||c.friend.name!==a.me.name)d.push(`B sees friend ${c.friend&&c.friend.name}, A is ${a.me.name}`);
  if(a.friend&&a.friend.rank!==c.me.rank)d.push(`A sees B rank ${a.friend.rank}, B has ${c.me.rank}`);if(c.friend&&c.friend.rank!==a.me.rank)d.push(`B sees A rank ${c.friend.rank}, A has ${a.me.rank}`);
  if(a.where!==c.where)whereDiff++;
  if(d.length){div.push([w+1,d]);L(`week ${w+1} DIVERGE: ${d.join(' | ')}`)}
  if(w%4===3)L(`week ${w+1} ok-ish · date ${a.date} · A ${a.me.name} r${a.me.rank} · B ${c.me.name} r${c.me.rank} · consorts ${a.R.length}`);
  if(w===0||w===25||w===WEEKS-1){await A.p.screenshot({path:`${OUT}/w${w+1}-A-fold.png`});await B.p.screenshot({path:`${OUT}/w${w+1}-B-ipad.png`})}}
 const mins=((Date.now()-t0)/60000).toFixed(1);
 L(`\nweeks played ${weeks}/${WEEKS} in ${mins} min · acts A ${A.acts} B ${B.acts} · deaths A ${A.deaths} B ${B.deaths} · weeks with divergence ${div.length} · weeks where NPC places differ ${whereDiff} (phase 2: per-buổi sync makes this 0)`);
 L(`page errors A ${A.errs.length} B ${B.errs.length}`);[...new Set([...A.errs,...B.errs])].slice(0,10).forEach(e=>L('  err: '+e.slice(0,200)));
 fs.writeFileSync(OUT+'/bot-log.txt',log.join('\n')+'\n');await b.close();process.exit(div.length||weeks<WEEKS?1:0)})().catch(e=>{console.error(e);process.exit(2)});
