/* ge-measure (review/grand-endings-engine): bot measure of the grand endings (BAL.ge.target bands, design GRAND_ENDINGS.md §2.14 / §7 step 2).
   Plays whole lives of each pilot branch (the road forced, every due hồi answered by a bot, months run by nextBuoi like dev/test/road-full.js) and the
   Hồi kết nhánh; the engine then rolls for real (no forcing). Bots:
     in    — follows ONE ending (target j) from the start: takes its Chuỗi, avoids its Khóa / doom, answers its Ngã rẽ pair;
     kind  — like in, and prefers thiện-tagged options, avoids ác-tagged ones;   cruel — the reverse;
     rand  — random options, a random Ngã rẽ pair.
   Reports per branch: grand-ending rate of in / rand, open endings at .8 / .11 (funnel), shading a win would get for every kind / cruel life (geShade, measured on all those lives, wins are rare); checks the bands
   BAL.ge.target {inChar, random, open11, shade}. Writes JSON to <out> when given.
   usage: node dev/measure/ge-measure.js [url] [lives per (branch, bot, target)] [parallel pages] [out.json] [roads comma list] [sens|idle] */
const path=require('path');const fs=require('fs');const {chromium}=require('playwright');
const URL=process.argv[2]&&process.argv[2]!=='-'?process.argv[2]:'file://'+path.resolve(__dirname,'../index.html');
const NL=+process.argv[3]||1,PAR=+process.argv[4]||3,OUT=process.argv[5],ROADS=(process.argv[6]||'tt_co,cnv_mat,nc_tuc').split(',');
const PLAY=process.argv[7]||'sens';/* sens: between story beats she plays the months like a player (the inpage6 sensible bot + inty.js, as runb.js; rand bots use its random step); idle: months only pass (nextBuoi) */
const BOTJS=PLAY==='idle'?'':['inpage6.js','inty.js'].map(f=>fs.readFileSync(path.join(__dirname,f),'utf8')).join('\n;\n');
(async()=>{const b=await chromium.launch();const errs=[];
 const jobs=[];for(const road of ROADS)for(let L=0;L<NL;L++){for(let j=0;j<4;j++)jobs.push({road,mode:'in',j});jobs.push({road,mode:'rand',j:-1},{road,mode:'rand',j:-1},{road,mode:'kind',j:L%4},{road,mode:'cruel',j:(L+2)%4})}
 if(process.env.MAXJ)jobs.length=Math.min(jobs.length,+process.env.MAXJ);/* smoke runs */
 if(process.env.MODES){const M=process.env.MODES.split(",");for(let i=jobs.length-1;i>=0;i--)if(!M.includes(jobs[i].mode))jobs.splice(i,1)}/* verify runs on some bots only, e.g. MODES=kind,cruel */
 const res=[];let next=0;
 const worker=async w=>{let p=null;
  const boot=async()=>{if(p)await p.context().close();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});p=await ctx.newPage();p.setDefaultTimeout(0);
   p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
   await p.waitForFunction(()=>typeof start==='function'&&typeof geS==='function',null,{timeout:0});await p.waitForTimeout(1200);
   if(BOTJS){await p.evaluate(BOTJS);await p.evaluate(()=>{const pd=pushDil;pushDil=function(d,t){if(d&&d.pid==='ge1'){window.__geHit=1;return ''}return pd.apply(this,arguments)}})}
   await p.evaluate(()=>{document.getElementById('title').hidden=true;const md0=msDone67;msDone67=function(m){return m.force14?true:md0.apply(this,arguments)};
    window.__ge=async(road,mode,j)=>{const k=road.split('_')[0];quiet=true;const others=Object.keys(ARC67).filter(id=>ARC67[id].o===k&&id!==road);
     localStorage.setItem('ctm-arcs',JSON.stringify({[k]:others}));localStorage.setItem('ctm-tm96','1');window.__forceOrigin=k;window.__origO=k;window.__geHit=0;start();quiet=false;
     await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st&&S.st.f14)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;
     if(S.st.f14.rd!==road)return{err:'road '+S.st.f14.rd};const D=GE_DATA[road],C=GE_CAT[road];
     const sc=n=>{if(mode==='rand')return 0;let v=0;const e=D.e[j];if(e.pull.includes(n))v+=3;if((e.close||[]).includes(n)||(e.doom||[]).includes(n))v-=6;
      if(mode==='kind'){if(D.lean.p.includes(n))v+=2;if(D.lean.m.includes(n))v-=2}if(mode==='cruel'){if(D.lean.m.includes(n))v+=2;if(D.lean.p.includes(n))v-=2}return v};
     let mon=0,stuck=0,err=null;
     for(;mon<500&&S.ge&&!S.ge.done;mon++){if(S.dead||S.out){S.dead=false;S.out=0;S.suc=60}
      const A=S.st.M;try{if(A&&!A.done&&!A.cur&&A.nb){A.due=0;fireBeat67(A)}if(A&&A.cur){const bd=beatDef67(A,A.cur);const O=opts67(A,bd);
        const s=O.map(o=>sc(o.n)+Math.random()*.5);const i=mode==='rand'?Math.floor(Math.random()*O.length):s.indexOf(Math.max(...s));const o=O[i];
        res67(thKey67(A),A.cur,i,o&&o.o!=null?oOf67(A,o,bd):100)}}catch(e){err=err||('beat '+e.message)}
      if(S.st.ms&&++stuck>2){if(S.st.ms.id==='len14'&&S.srv&&!S.srv.risen){S.age=Math.max(S.age||0,18);srvRise('bot')}else S.st.ms.force14=1}
      if(window.__geHit||Q.some(m=>m.pid==='ge1'))break;
      const t=S.turn;if(window.__bot){Q.length=0;for(let g=0;g<4000&&S.turn===t&&!window.__geHit&&!S.dead&&!S.out;g++){const B=S.st.M;if(B&&B.cur){Q.length=0;break}try{window.__bot.step(mode==='rand'?'rand':'sens',1)}catch(e){err=err||('bot '+e.message);break}}}
      for(let g=0;g<40&&S.turn===t&&!window.__geHit;g++){Q.length=0;used=0;try{nextBuoi()}catch(e){err=err||('buoi '+e.message);break}}
      if(window.__geHit)break;
      if(Q.some(m=>m.pid==='ge1'))break;Q.length=0}
     const s=S.ge;if(!s)return{err:"no S.ge",mon};if(!window.__geHit&&!Q.some(m=>m.pid==='ge1'))return{err:err||'no hồi',mon,n:S.st.ch.n,all:!!S.st.ch.all};Q.length=0;
     const pr=mode==='rand'?[Math.floor(Math.random()*4),Math.floor(Math.random()*3)]:[C.e[j][3],C.e[j][4]];
     const st=s.st.slice(),pull=s.pull.slice(),oc=Object.assign({},s.oc);geLive(s);const odds=s.st[j]==='o'&&j>=0?geOdds(s,j):null;
     const cf=j>=0?(D.e[j].cond||[]).filter(t=>!geDbg.term(s,j,t)).map(t=>t[0]==='s'?t[1]+':'+Math.round(geDbg.stat(t[1]))+'/'+((BAL.ge.gate[road+'_'+(j+1)]||{})[t[1]]||0):t.join('.')).join(','):'';
     const gk={};Object.keys(BAL.ge.gate).filter(g=>g.startsWith(road+'_')).forEach(g=>Object.keys(BAL.ge.gate[g]).forEach(k=>{if(k!=='mis'||geDbg.mis())gk[k]=Math.round(geDbg.stat(k))}));
     const r=geAnswer(pr[0],pr[1]);Q.length=0;const shW=j>=0?geDbg.shade(s,j):'';const lt=s.lt,dd=Math.round((S.duc||0)-(s.d0||0));
     return{road,mode,j,ok:r.ok,i:r.i,sh:r.sh||'',quiet:r.quiet||0,st,stEnd:s.st.slice(),pull,oc,odds,cf,gk,shW,lt,dd,lean:Math.round(r.lean*10)/10,mon,err}}})};
  await boot();
  while(next<jobs.length){const J=jobs[next++];let R=null;for(let t=0;t<3;t++){try{R=await p.evaluate(([a,m,j])=>window.__ge(a,m,j),[J.road,J.mode,J.j])}catch(e){R={err:'eval '+e.message.slice(0,100)}}
    if(R&&!R.err)break;console.log('retry',J.road,J.mode,J.j,R&&R.err);await boot()}
   res.push(Object.assign({},J,R));console.log(`[${res.length}/${jobs.length}]`,J.road,J.mode,J.j,R&&R.err?'ERR '+R.err:`ok=${R.ok} sh=${R.sh} oc=${JSON.stringify(R.oc)} st=${R.st.join('')} pull=${R.pull} odds=${R.odds} cf=${R.cf} shW=${R.shW} lt=${R.lt} dd=${R.dd} lean=${R.lean} gk=${JSON.stringify(R.gk)}`)}
  await p.context().close()};
 await Promise.all([...Array(PAR)].map((_,w)=>worker(w)));
 const T=await (async()=>{const p=await b.newPage();await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof BAL==='object'&&BAL.ge,null,{timeout:0});const t=await p.evaluate(()=>BAL.ge.target);await p.close();return t})();
 const good=res.filter(r=>!r.err);const rate=L=>L.length?L.filter(r=>r.ok).length/L.length:0;const mean=L=>L.length?L.reduce((a,x)=>a+x,0)/L.length:0;
 const rep={};for(const road of ROADS.concat(['all'])){const G=good.filter(r=>road==='all'||r.road===road);
  const inL=G.filter(r=>r.mode!=='rand'),rnd=G.filter(r=>r.mode==='rand');const kind=G.filter(r=>r.mode==='kind'),cruel=G.filter(r=>r.mode==='cruel');
  rep[road]={n:G.length,inChar:+rate(inL).toFixed(2),random:+rate(rnd).toFixed(2),open8:+mean(G.map(r=>r.oc[8]).filter(x=>x!=null)).toFixed(2),open11:+mean(G.map(r=>r.oc[11]).filter(x=>x!=null)).toFixed(2),
   kindT:kind.length?+(kind.filter(r=>(r.shW||r.sh)==='t').length/kind.length).toFixed(2):null,cruelA:cruel.length?+(cruel.filter(r=>(r.shW||r.sh)==='a').length/cruel.length).toFixed(2):null,
   perEnding:[0,1,2,3].map(j=>{const L=inL.filter(r=>r.j===j);return `${L.filter(r=>r.ok).length}/${L.length}`}).join(' ')}}
 console.log('REPORT',JSON.stringify(rep,null,1));const A=rep.all;
 const band=(n,v,[lo,hi])=>{const okk=v>=lo&&v<=hi;console.log(`${okk?'IN ':'OUT'} ${n} ${v} band [${lo}, ${hi}]`);return okk};
 band('inChar',A.inChar,T.inChar);band('random',A.random,T.random);band('open11',A.open11,T.open11);
 const sh=[A.kindT,A.cruelA].filter(x=>x!=null);console.log(`${sh.every(x=>x>=T.shade)?'IN ':'OUT'} shade kind→thiện ${A.kindT} · cruel→ác ${A.cruelA} (≥ ${T.shade})`);
 console.log('errors',good.length,'/',res.length,'lives ok · page errors',errs.length,errs.slice(0,3));
 if(OUT)fs.writeFileSync(OUT,JSON.stringify({rep,res,target:T},null,1));await b.close()})();
