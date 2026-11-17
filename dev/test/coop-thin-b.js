/* Co-op thin guest, part B (review/coop-thin-b): life creation + rebirth on the HOST. Two Playwright clients in one room.
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-b.js [workerURL] [thinLevel=2] [swap=0] [origins=all]
   level 2: the guest's first life and every rebirth are built by the host in context b (do life roll / accept); the guest shows the host's
     person (card == life), builds no world, sends the host's blob as `me`. Checks per origin (forced on the host: window.__forceOrigin):
     same consorts on both seats, 0 temp ids, her name / her maid's name unique in the one world, a cung nữ's mistress real on both seats,
     the host forgets the old face (j61 "Người lạ" until met), host state intact (withSeat round trip + own person unchanged), the tiểu thư
     road at home (kc "nha"). Then the host's own rebirth (old path, unchanged) and a week merge.
   level 1: the same rebirths through the OLD guest path (the before number of the tripwire).
   TRIP: the guest tripwire (dev/test/coop-thin-trip.js) counts every guest write outside fromCanon during the rebirths only (meter of part B).
   swap=1: the iPad creates the room (host), the Fold joins (guest). Shots: none (no new UI; the card and the wait note are the kit card). */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||2);const SWAP=+(process.argv[4]||0);const ONLY=(process.argv[5]||'').split(',').filter(Boolean);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp,want,trip){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};return{code:c.code,seat:c.seat,week:c.week,frozen:!!c.frozen,waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(c.seat&&(c.ended||{})[c.seat]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}};if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   const W0=window.WebSocket;window.__tx=[];window.WebSocket=function(a,p){const s=p===undefined?new W0(a):new W0(a,p);const sd=s.send.bind(s);
    s.send=d=>{try{if(typeof d==='string'){const m=JSON.parse(d);__tx.push(m.t==='do'?'do:'+m.op+':'+(m.args&&m.args.st):m.t)}}catch(e){}return sd(d)};return s};
   window.WebSocket.prototype=W0.prototype;Object.assign(window.WebSocket,{CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3})},[WURL,want]);
  if(trip)await ctx.addInitScript({path:path.join(__dirname,'coop-thin-trip.js')});
  const p=await ctx.newPage();p.setDefaultTimeout(60000);const o={name,ctx,p,errs:[]};
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon/.test(m.text()))o.errs.push('console: '+m.text())});return o}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);
  const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
const clear=(()=>{const t=require('fs').readFileSync(path.join(__dirname,'coop-e2e.js'),'utf8');const i=t.indexOf('async function clear(');const j=t.indexOf("return'many'}",i)+13;return eval('('+t.slice(i,j)+')')})();
const until=async(o,fn,arg,ms=40000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}};
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{});
 const FOLD=[686,880],IPAD=[1180,820];const TRIP=!!process.env.TRIP;
 const H=await mk(b,'host',SWAP?IPAD:FOLD,LVL,false),G=await mk(b,'guest',SWAP?FOLD:IPAD,0,TRIP);
 await H.p.goto(BASE);await H.p.waitForTimeout(3000);await tapText(H,/^(Chơi cùng bạn|Cùng hảo hữu)/);await H.p.waitForTimeout(500);await tapText(H,/^(Mời bạn|Mời hảo hữu)/);
 await until(H,()=>window.COOP&&COOP.code&&COOP.seat==='a');const code=await H.p.evaluate(()=>COOP.code);console.log('room',code,'swap',SWAP,'level',LVL,'trip',TRIP);
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);
 /* the guest's own core build is counted (it must stay 0 at level 2): j2 start's scratch harem calls newRival */
 await G.p.evaluate(()=>{window.__nr=0;const f=newRival;newRival=function(){__nr++;return f.apply(this,arguments)}});
 await tapText(G,/^Vào phòng/,4000);
 ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000),'guest joined seat b');
 {const t0=Date.now();while(Date.now()-t0<90000){await clear(H);await clear(G);const a=await H.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop));if(a&&c)break;await sleep(500)}}
 const both=async f=>[await H.p.evaluate(f),await G.p.evaluate(f)];
 ok((await both(()=>COOPW.thin.CAP))+''==='2,2','both seats run a build with part B (TH.CAP 2)');
 const L=await both(()=>COOPW.thin.lvl);ok(L[0]===LVL&&L[1]===LVL,'room level '+LVL+' on both',L);
 ok(await H.p.evaluate(()=>COOPW.thin.NOOP.every(n=>COOPW.thin.NOOPED.includes(n))&&!COOPW.thin.REGBAD.length&&['KMS','KMSNAP','J95B.bind','SP13.L','J95C.lastV'].every(n=>COOPW.thin.REG.includes(n))),'UI no-op list wrapped, part B state registered, REGBAD empty');
 /* first life of the guest */
 const fl=await both(()=>({st:COOPW.thin.life&&COOPW.thin.life.stat,tr:COOPW.tr.filter(x=>/^attach/.test(x)).length,nr:window.__nr,name:S&&S.name,life:COOPW.life}));
 if(LVL>=2){ok(fl[0].st.roll>=1&&fl[0].st.accept>=1,'first life of the guest: built by the host (roll + accept)',fl[0].st);
  ok(fl[1].tr===0&&fl[1].nr===0&&fl[1].st.old===0,'first life: the guest ran no core build (0 newRival, 0 attach, no old path)',fl[1]);
  ok(await H.p.evaluate(n=>COOPW.base.P.b&&COOPW.base.P.b.name===n,fl[1].name),'first life: the room has her host-built person',fl[1].name)}
 /* the host's own person + its own rows on every NPC, right before and right after each life intent (inside the same task: nothing else runs) */
 await H.p.evaluate(()=>{window.__wsd=[];const T=COOPW.thin;const w=T.withSeat;const snap=()=>JSON.stringify({n:S.name,r:S.rank,st:['tai','sac','tamco','duc','danh','bac','sung','suc','age'].map(k=>S[k]),
   rows:rivals.filter(v=>!v.coop).map(v=>[v.id,v.rel,v.oan,v.ghen,v.ev,v.alive,v.rank]),tab,Q:Q.length,used,deck:(deck||[]).length,popMsg,quiet,logs:(S.logs||[]).length,known:Object.keys(S.known||{}).length,ek:Object.keys((S.emp||{}).known||{}).length});
   T.withSeat=function(seat,fn){if(T.curDo!=='life'||seat===COOPW.seat)return w.apply(this,arguments);const a=snap();try{return w.apply(this,arguments)}finally{const b=snap();if(a!==b){let i=0;while(a[i]===b[i])i++;__wsd.push([a.slice(Math.max(0,i-60),i+80),b.slice(Math.max(0,i-60),i+80)])}else __wsd.push(0)}}});
 if(process.env.DBG)await H.p.evaluate(()=>{window.__aff=[];const f=affAdd;affAdd=function(x,y,n){if(COOPW.ctx&&(x&&x.coop||y&&y.coop))__aff.push([x&&x.name,y&&y.name,n,new Error().stack.split('\n').slice(2,9).map(l=>l.trim().split(' ')[1]).join('<')]);return f.apply(this,arguments)}});
 const H0=await H.p.evaluate(()=>{const o={};for(const k of ['name','rank','tai','sac','tamco','duc','danh','age'])o[k]=S[k];o.ids=rivals.filter(v=>!v.coop).map(v=>v.id+':'+v.name+':'+v.rel).join(',');return o});
 if(TRIP)await G.p.evaluate(()=>{window.__trip0=JSON.parse(JSON.stringify(__trip()))});
 const ORG=(await H.p.evaluate(()=>ORIGINS.map(o=>o.k))).filter(k=>!ONLY.length||ONLY.includes(k));
 const RUNS=ORG.map(k=>[k,null]).concat(ORG.includes('tt')?[['tt','nha']]:[]);
 for(const [k,kc] of RUNS){const tag=k+(kc?'/'+kc:'');
  const life0=await G.p.evaluate(()=>COOPW.life||0);const hn0=await H.p.evaluate(()=>S.name);
  await H.p.evaluate(k=>{window.__forceOrigin=k},k);await G.p.evaluate(kc=>{window.__kcO=kc||undefined},kc);
  await G.p.evaluate(()=>{try{over('<h3>Thử luân hồi</h3>','thử','Thử luân hồi')}catch(e){console.warn(e)}Q=[];start()});
  let card=null;
  if(LVL>=2){ok(await until(G,()=>COOPW.thin.life.key&&Q[0]&&Q[0].nl&&Q[0].h&&S&&Q[0].h.includes(S.name)&&!S.dead,null,30000),tag+': the card shows the host\'s person');
   card=await G.p.evaluate(()=>{const d=COOPW.thin.view.o.dr;const P=d&&d.r&&d.r.P;return {ok:S.origin.k,name:S.name,age:S.age,tai:S.tai,sac:S.sac,tamco:S.tamco,duc:S.duc,rank:S.rank,maid:S.maid&&S.maid.name,P:P&&{name:P.name,ok:P.ok,tai:P.S.tai,sac:P.S.sac,maid:P.S.maid&&P.S.maid.name},nr:window.__nr,tr:COOPW.tr.filter(x=>/^attach/.test(x)).length}});
   ok(card.ok===k&&card.P&&card.P.name===card.name&&card.P.tai===card.tai&&card.P.sac===card.sac&&card.P.ok===k,tag+': card == the host\'s blob (origin, name, stats)',card);
   ok(card.nr===0&&card.tr===0,tag+': the guest built nothing (0 newRival, 0 attach)',[card.nr,card.tr])}
  /* accept: the kit card's "Nhận thân phận" (clear() presses it first) */
  {const t0=Date.now();while(Date.now()-t0<30000){await clear(G,4);const d=await G.p.evaluate(l=>!COOPW.inLife&&(COOPW.life||0)===l+1&&COOPW.base.P.b&&COOPW.base.P.b.life===l+1,life0);if(d)break;await sleep(300)}}
  ok(await until(H,([l,n])=>COOPW.base.P.b&&COOPW.base.P.b.life===l+1&&COOPW.base.P.b.name===n,[life0,await G.p.evaluate(()=>S.name)],30000),tag+': the room took her new person (life +1, same name on the host)');
  await sleep(800);
  const g=await G.p.evaluate(()=>{const all=[];const add=(o,w)=>{if(o&&o.name)all.push([o.name,w])};rivals.forEach(v=>{add(v,v.coop?'friend':'npc');(v.staff||[]).forEach(x=>add(x,'srv'))});try{allServ().forEach(x=>add(x,'srv'))}catch(e){}try{allKids().forEach(([x])=>add(x,'kid'))}catch(e){}
   const t=n=>String(n).split(' ').slice(-2).join(' ');
   /* other people only (her own maid / kids are hers); objects, not names, are compared */
   const own=new Set([S,S.maid,...(S.staff||[]),...(S.kids||[])]);const oth=[],who=[];const add2=o=>{if(o&&o.name&&!own.has(o)){oth.push(o.name);who.push([o.name,o.sid||o.id||'',o.role||'',o.coop?'coop':''])}};rivals.forEach(v=>{add2(v);(v.staff||[]).forEach(add2)});try{allServ().forEach(add2)}catch(e){}try{allKids().forEach(([x])=>add2(x))}catch(e){}
   const meClash=oth.filter(n=>n===S.name||t(n)===t(S.name)).length;const maidClash=S.maid?oth.filter(n=>n===S.maid.name).length:0;
   return {ok:S.origin.k,name:S.name,maid:S.maid&&S.maid.name,srv:S.srv?{mid:S.srv.mid,m:(RV(S.srv.mid)||{}).name||null}:null,kc:!!S.kc,ids:rivals.filter(v=>!v.coop).map(v=>v.id).sort((a,b)=>a-b),names:rivals.filter(v=>!v.coop).map(v=>v.name).sort(),
    tmp:rivals.filter(v=>!v.coop&&+v.id>=900).length+((S.coopAsk||[]).filter(a=>a.k==='np').length),meClash,maidClash,dup:who.filter(x=>x[0]===S.name||(S.maid&&x[0]===S.maid.name)),life:COOPW.life,card:Q.some(m=>m.nl)}});
  const hn=await H.p.evaluate(()=>{const P=COOPW.base.P.b;const t=n=>String(n).split(' ').slice(-2).join(' ');const seen=new Set(),oth=[];const add=o=>{if(o&&o.name&&!o.coop&&!seen.has(o)){seen.add(o);oth.push([o.name,o.sid||o.id||'',o.role||''])}};
   rivals.forEach(v=>{add(v);(v.staff||[]).forEach(add)});try{allServ().forEach(add)}catch(e){}try{allKids().forEach(([x])=>add(x))}catch(e){};(S.men||[]).forEach(add);if(S.maid)oth.push([S.maid.name,'host maid','']);oth.push([S.name,'host','']);
   const mn=P.S.maid&&P.S.maid.name;return {name:P.name,maid:mn,me:oth.filter(x=>x[0]===P.name||t(x[0])===t(P.name)),md:mn?oth.filter(x=>x[0]===mn):[]}});
  ok(!hn.me.length&&!hn.md.length,tag+': her name and her maid\'s name unique in the one world (the host\'s)',hn);
  const h=await H.p.evaluate(()=>({ids:rivals.filter(v=>!v.coop).map(v=>v.id).sort((a,b)=>a-b),names:rivals.filter(v=>!v.coop).map(v=>v.name).sort(),srvOf:(()=>{const P=COOPW.base.P.b;const m=P&&P.S&&P.S.srv?RV(P.S.srv.mid):null;return m?{id:m.id,name:m.name,alive:m.alive,out:!!m.out}:null})(),
   knows:!!((S.known||{})['r902']),self:(()=>{const t=COOPW.thin.selfTest();/* a host at home (tiểu thư road) has no stand-in entry: the round trip itself is what counts */return (t.sameA&&t.sameB&&t.b&&t.b.ctx==='b')||{paths:t.paths,err:t.err,b:t.b}})(),ctx:COOPW.ctx||null,hold:COOPW.thin.life.hold,name:S.name,stat:COOPW.thin.life.stat}));
  ok(g.ok===k&&!g.card,tag+': guest playing her new life (origin '+k+')',{ok:g.ok,card:g.card});
  if(card)ok(g.name===card.name,tag+': the life she got == the card',[g.name,card.name]);
  ok(JSON.stringify(g.ids)===JSON.stringify(h.ids)&&JSON.stringify(g.names)===JSON.stringify(h.names),tag+': same consorts on both seats',{g:g.ids.length,h:h.ids.length});
  ok(g.tmp===0,tag+': 0 temp ids (no ghost consorts)',g.tmp);
  ok(g.meClash===0,tag+': her name unique on the guest\'s screen too (maid on the guest: '+g.maidClash+' same-name entries, informational)',{name:g.name,me:g.meClash,maid:g.maid,mc:g.maidClash,dup:g.dup});
  if(g.srv||k==='cnv'||k==='cn')ok(!g.srv||(h.srvOf&&h.srvOf.alive&&!h.srvOf.out&&h.srvOf.id===g.srv.mid&&g.srv.m===h.srvOf.name&&h.srvOf.id<900),tag+': a cung nữ has a real mistress on both seats',{g:g.srv,h:h.srvOf});
  if(kc==='nha')ok(g.kc,tag+': the tiểu thư road at home (kc) built on the host',g.kc);
  ok(!h.knows,tag+': the host does not know her new face (j61, until met)');
  if(process.env.DBG)console.log('aff',JSON.stringify(await H.p.evaluate(()=>__aff.splice(0))));
  if(process.env.DBG)console.log('host rows',await H.p.evaluate(()=>rivals.filter(v=>!v.coop).map(v=>v.id+':'+v.rel+'/'+((v.rl||{})[902])).join(' ')));
  ok(h.self===true&&!h.ctx&&!h.hold&&h.name===hn0,tag+': host state intact (round trip ok, no context left, store released, host is still '+hn0+')',h);
 }
 const H1=await H.p.evaluate(()=>{const o={};for(const k of ['name','rank','tai','sac','tamco','duc','danh','age'])o[k]=S[k];o.ids=rivals.filter(v=>!v.coop).map(v=>v.id+':'+v.name+':'+v.rel).join(',');return o});
 {const D=await H.p.evaluate(()=>__wsd);ok(D.length>=RUNS.length*2&&D.every(x=>x===0),'the host\'s own person, its screen state and its own rows on every NPC are the same right before and right after each of the '+D.length+' life intents',D.filter(x=>x!==0).slice(0,3))}
 if(TRIP){const t=await G.p.evaluate(()=>{const a=window.__trip0,b=__trip();const d={};for(const k in b.statePart)d[k]=b.statePart[k]-((a.statePart||{})[k]||0);const r={};for(const k in b.byPart)r[k]=b.byPart[k]-((a.byPart||{})[k]||0);
   const pa=new Map(((a.parts||{}).B||[]).map(x=>[x[0]+'|'+x[1],x[2]]));const pb=((b.parts||{}).B||[]).map(x=>[x[0],x[1],x[2]-(pa.get(x[0]+'|'+x[1])||0)]).filter(x=>x[2]);
   return {state:b.state-a.state,total:b.total-a.total,statePart:d,byPart:r,parts:pb,sRep:b.sReplaced-a.sReplaced}});
  console.log('TRIPWIRE rebirths ('+RUNS.length+') level '+LVL+': changing writes '+t.total+' · STATE '+t.state+' · by part '+JSON.stringify(t.statePart)+' · raw by part '+JSON.stringify(t.byPart)+' · S replaced '+t.sRep+'\n  B writers: '+JSON.stringify(t.parts.slice(0,12)))}
 /* the host's own rebirth: the old path, unchanged */
 {const g0=await G.p.evaluate(()=>COOPW.base.P.a&&COOPW.base.P.a.life||0);
  await H.p.evaluate(()=>{window.__forceOrigin='dtq';try{over('<h3>Thử luân hồi</h3>','thử','Thử luân hồi')}catch(e){}Q=[];start()});
  {const t0=Date.now();while(Date.now()-t0<30000){await clear(H,4);if(await H.p.evaluate(()=>!COOPW.inLife&&S&&!S.dead&&!Q.some(m=>m.nl)))break;await sleep(300)}}
  ok(await until(G,l=>COOPW.base.P.a&&(COOPW.base.P.a.life||0)===l+1,g0,30000),'host rebirth (old path) still works; the guest sees the host\'s new life');
  await H.p.evaluate(()=>{window.__forceOrigin=undefined})}
 /* a week still ends and merges on both seats, and her person survives it */
 const wk0=await H.p.evaluate(()=>COOP.week);
 {const t0=Date.now();while(Date.now()-t0<120000){for(const o of [H,G]){await clear(o,6);await o.p.evaluate(()=>{const n=document.getElementById('next');if(n&&!n.disabled)n.click()}).catch(()=>{})}
  if((await H.p.evaluate(()=>COOP.week))>wk0&&(await G.p.evaluate(()=>COOP.week))>wk0)break;await sleep(300)}}
 ok((await H.p.evaluate(()=>COOP.week))>wk0&&(await G.p.evaluate(()=>COOP.week))>wk0,'a week ends and merges on both seats');
 const gn=await G.p.evaluate(()=>S.name);ok(await until(H,n=>COOPW.base.P.b.name===n&&rivals.some(v=>v.coop&&v.name===n),gn,20000)||await H.p.evaluate(n=>COOPW.base.P.b.name===n,gn),'after the merge the host still has her (host-built) person',gn);
 ok(await H.p.evaluate(()=>{const t=COOPW.thin.selfTest();return t.sameA&&t.sameB}),'withSeat round trip after the merged week');
 const E=[...H.errs,...G.errs].filter(e=>!/ResizeObserver/.test(e));ok(!E.length,'no page errors',E.slice(0,5));
 const f=res.filter(r=>!r[0]).length;console.log(`\n${res.length-f}/${res.length} ok`);await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
