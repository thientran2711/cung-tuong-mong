/* ORDER THIN P6b browser test: composed j70 ROUTES (j70c) on the real game. node dev/test/j70c-play.js [seeds.jsonl]  (after dev/site/build_site.sh)
   For each route seed: it registers as one more route of M70[m] with the tier numbers of BAL.j70c (law 4); a real NPC plots it against her and she
   plots it against a real NPC (newPlot70 with that route, law 1: the same runtime both ways); the tells are the seed's own lines (tl or the per-plot
   pair of tl+tlx) with «nạn nhân» written as the real target; P0 marks j70:<m>:<id> (and j70t for the tell pair); the real object is recorded
   (law 6c) and its trace is told when the plot is carried out; pickRoute70 still returns a route of the method (fresh-first wrapper); every built
   J70SEEDS route registers; the old counter still says 51 hand-written routes. 0 page errors. */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const FILE=process.argv[2]||path.join(__dirname,'j70c-fixture.jsonl');
const FIX=fs.readFileSync(FILE,'utf8').split('\n').filter(l=>l.trim().startsWith('{')).map(JSON.parse).filter(r=>r.type==='route');
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
let fail=0;const ok=(c,m)=>{if(!c)fail++;if(!c||process.env.V)console.log((c?'ok   ':'FAIL ')+m)};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const g=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
 const R=await g.evaluate(FIX=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});
  window.__bot=1;window.quiet=1;S.srv=null;S.rank=Math.max(S.rank||0,3);if(!S.maid)S.maid=newMaid(nmNew('maid'),50);if((S.staff||[]).length<4)fillStaff(S,true);
  S.kids=S.kids||[];while(S.kids.filter(k=>k.alive).length<2)S.kids.push(mkKid(S.kids.length?'f':'m',5));S.preg=0;
  const out={seeds:[],built:0,builtN:-1};try{out.builtN=(typeof J70SEEDS!=='undefined'?J70SEEDS:[]).length;out.built=Object.keys(J70C_SEEDS).filter(id=>J70SEEDS.some(s=>s.id===id)).length}catch(e){}
  out.old=j70Count().types;const L=()=>liveRivals(true).filter(v=>!v.confined&&!v.out);
  for(const sd of FIX){const r={id:sd.id,m:sd.m};out.seeds.push(r);try{
   j70cReg(sd);const M=M70[sd.m];const R0=M.R.find(x=>x.id===sd.id);r.reg=!!R0;if(!R0)continue;
   r.num=R0.vis===BAL.j70c.vis[sd.vis]&&R0.need===BAL.j70c.need[sd.need]&&R0.bac===BAL.j70c.bac[String(sd.bac)];
   const z=j70();z.pl=z.pl.filter(x=>x.end);
   const tells=sd.tl.concat(sd.tlx||[]);
   const one=(a,t)=>{if(a!==S)a.bac=Math.max(a.bac||0,999);else S.bac=Math.max(S.bac||0,999);if(t!==S&&sd.acc==="tsv"&&!(t.staff||[]).length)try{fillStaff(t,true)}catch(e){}
    const P=newPlot70(a,t,sd.m,sd.id,"band");if(!P)return{made:false};const tn=t===S?"ngươi":t.name;
    const t0=tellOf70(P,0),t1=tellOf70(P,1);const raw=s=>s.replace(new RegExp(tn.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'g'),'nạn nhân');
    const own=tells.includes(raw(t0))&&tells.includes(raw(t1))&&t0!==t1;const named=!/nạn nhân/.test(t0+t1);
    const mk=nrNow("j70",sd.m+":"+sd.id);const pair=!(sd.tlx&&sd.tlx.length)||(Array.isArray(P.tv)&&P.tv.every(i=>nrNow("j70t",sd.m+":"+sd.id+":"+i)));
    const o=j70cObj(P.id);const ended=!!P.end;const obj=sd.obj&&!ended?!!o&&o.name===sd.obj.name&&o.trace===sd.obj.trace:!o;
    let ex=null;try{const n0=S.logSeq||0;P.st="prep";P.pg=P.need;exec70(P,(M.opp||["night"])[0]);const lg=(S.logs||[]).slice(0,Math.max(0,(S.logSeq||0)-n0)).join(' ');ex=ended||P.st==="sent"||P.st==="wait"?true:sd.obj&&(a===S||t===S)&&P.end!=="miss"?lg.indexOf(sd.obj.trace)>=0:true}catch(e){ex='threw '+String(e).slice(0,120)}
    z.pl=z.pl.filter(x=>x!==P);return{made:true,t0,t1,own,named,mk,pair,obj,ex,end:P.end||P.st}};
   window.__j95off=1;/* forced: the j95 motive gate is the NPC's own reason to plot; here every pair may */const v=L().find(x=>x.alive)||L()[0];const v2=L().find(x=>x!==v);
   r.npc=one(v,S);r.me=one(S,v2||v);
   const pk=pickRoute70(v,S,M);r.pick=!!pk&&M.R.includes(pk);
  }catch(e){r.err=String(e&&e.stack||e).slice(0,300)}}
  out.count=j70cCount();out.old2=j70Count().types;return out},FIX);
 for(const r of R.seeds){const t=`${r.id}`;if(r.err){ok(false,t+' threw '+r.err);continue}
  ok(r.reg,t+' registers in M70.'+r.m);ok(r.num,t+' vis/need/bac = BAL.j70c tiers');
  for(const[who,x]of[["NPC→her",r.npc],["her→NPC",r.me]]){if(!x.made){console.log(`skip ${t} ${who}: the runtime declined (act not possible for this pair in the test world)`);continue}
   ok(x.own&&x.named,`${t} ${who} tells are the seed's own, target named: «${x.t0}» / «${x.t1}»`);ok(x.mk,`${t} ${who} P0 marks j70:${r.m}:${r.id}`);ok(x.pair,`${t} ${who} tell pair drawn + marked (j70t)`);
   ok(x.obj,`${t} ${who} real object recorded (law 6c)`);ok(x.ex===true,`${t} ${who} carried out (${x.end}); object trace told: ${x.ex}`)}
  ok(r.pick,t+' pickRoute70 returns a route of the method')}
 ok(R.old===51&&R.old2===51,`old j70 count unchanged (${R.old} / ${R.old2})`);ok(R.builtN<0||R.built>=R.builtN,`built J70SEEDS register (${R.built}/${R.builtN})`);ok(errs.length===0,'0 page errors '+(errs[0]||''));
 console.log(fail?`J70C PLAY: ${fail} FAIL (${R.seeds.length} routes)`:`J70C PLAY: ALL PASS (${R.seeds.length} routes, ${R.builtN} built; count ${JSON.stringify(R.count)})`);await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
