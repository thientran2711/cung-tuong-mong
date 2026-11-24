/* ORDER THIN P8 play test: composed origin roads (jroadc.js) on the real game.   node dev/test/rdc-play.js [rows file] [lives per road] [roads,…]
   (after dev/site/build_site.sh). Rows = dev/test/rdc-fixture.jsonl by default (any rdseeds_*.md works); rows not already in the build are loaded
   with rdcLoad. For every composed road of the file, a fast story bot starts a NEW life of that origin with the road forced (ctm-arcs history makes it
   the only fresh premise; same bot as dev/test/road-full.js) and plays every due hồi (life 1: first option, later lives: random) and checks:
   - chapters 4..11 = the premise then <road>_5 … <road>_11 in order, the frame reaches 14, the origin ending is told by the road's .11;
   - the composition (S.st.f14.rc) uses each part once in the road; each chapter's title / climax / endings are its clim row's;
   - every hồi card: 4 options (j67 may add none), no {placeholder} left, cổ trang (no digit / %);
   - numbers: every option of every played hồi = its steps × BAL.road.c.fx (cost when picked, gain when it holds), climax odds terms from BAL;
   - the road's rival is the same person while alive; each opened chapter marks its parts in P0 (family rdc:<origin>);
   - reload: the composition survives a JSON round trip of S and rebuilds the same chapters; validator numbers = BAL.road.c; 0 page errors. */
const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const [,,FILE,NL,ONLY]=process.argv;const NLIV=+NL||2;
const ROWS=fs.readFileSync(FILE||path.join(__dirname,'rdc-fixture.jsonl'),'utf8').split('\n').filter(l=>l.trim().startsWith('{')).map(l=>JSON.parse(l));
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
let fail=0,pass=0;const ok=(c,m,x)=>{if(!c){fail++;console.log('FAIL '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,700):''))}else pass++};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const URL='http://127.0.0.1:'+srv.address().port+'/';const b=await chromium.launch();const errs=[];let p;
 const boot=async()=>{if(p)await p.context().close();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
  await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());p=await ctx.newPage();p.setDefaultTimeout(0);
  p.on('pageerror',e=>errs.push(e.message.slice(0,300)));await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
  await p.waitForFunction(()=>typeof start==='function'&&typeof ROAD14==='object'&&typeof rdcLoad==='function',null,{timeout:0});await p.waitForTimeout(1500);
  await p.evaluate(ROWS=>{document.getElementById('title').hidden=true;
   const fresh=ROWS.filter(r=>!(RDC.ids[r.id]));window.__load=fresh.length?rdcLoad(fresh):{prem:0,roads:0,skip:[],already:1};
   const md0=msDone67;msDone67=function(m){return m.force14?true:md0.apply(this,arguments)};
   window.__run=async(k,road,pick)=>{quiet=true;const others=Object.keys(ARC67).filter(id=>ARC67[id].o===k&&id!==road);
    try{localStorage.setItem('ctm-arcs',JSON.stringify({[k]:others}));localStorage.setItem('ctm-tm96','1')}catch(e){}window.__forceOrigin=k;start();quiet=false;
    await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;
    if(typeof S==='undefined'||!S||!S.origin)return{err:'boot'};if(S.origin.k!==k||!S.st.f14)return{err:'origin '+S.origin.k};
    const C=BAL.road.c,seq=[],vs=[],ends=[],cards=[],num=[],marks=[];let lastN=0,stuck=0,err=null,mon=0;
    const rc0=JSON.parse(JSON.stringify(S.st.f14.rc||null));
    const exp=(row,o,clim)=>{const c={},w={};for(const [s,n] of Object.entries(o.loss||{}))if(!s.startsWith('rel.'))c[s]=-n*C.fx[s];for(const [s,n] of Object.entries(o.gain||{}))if(s!=='sc'&&!s.startsWith('rel.'))w[s]=n*C.fx[s];return{c,w,sc:(o.gain&&o.gain.sc||0)*C.fx.sc}};
    const same=(a,b)=>JSON.stringify(Object.entries(a||{}).filter(([,v])=>v).sort())===JSON.stringify(Object.entries(b||{}).filter(([,v])=>v).sort());
    for(;mon<400&&!S.st.ch.all;mon++){const c=S.st.ch;if(c.n!==lastN){seq.push(c.n+':'+(S.st.ms?S.st.ms.id:S.st.M?S.st.M.a:'?'));lastN=c.n;stuck=0}
     if(S.dead||S.out){S.dead=false;S.out=0;S.suc=60}
     const A=S.st.M;try{if(A&&A.act&&A.act.v!=null){const v=RV(A.act.v);vs.push({a:A.a,v:A.act.v,alive:!!(v&&v.alive&&!v.out)})}
      if(A&&!A.done&&!A.cur&&A.nb){A.due=0;fireBeat67(A)}
      if(A&&A.cur){const a=ARC67[A.a],bd=beatDef67(A,A.cur);const O=opts67(A,bd);
       if(a&&a.rdc&&(a.o==='rd'?a.road===road:A.a===road)){
        /* the card as she sees it */
        const pp={t:thKey67(A),a:A.a,b:A.cur,o:O.map(o=>oOf67(A,o,bd))};const card=PEND.j67(pp);
        const txt=card?card.t+' '+card.o.map(x=>x.n+' '+x.j67).join(' '):'';
        cards.push({a:A.a,b:A.cur,n:card?card.o.length:0,left:(txt.replace(/<[^>]+>/g,'').match(/\{[A-Za-z0-9]+\}/g)||[]),dig:/[0-9%]/.test(txt.replace(/<[^>]+>/g,'').replace(/Chương \d+|hồi \d+\/\d+|Hồi \d+\/\d+/g,''))});
        /* numbers = steps × BAL */
        let row=null;if(a.o==='rd'){const ch=rdcChap(a.road,a.rn);const i={s1:0,s2:1,c1:2,c2:3,t1:4,x1:5}[A.cur];row=RDC.ids[ch.parts[i]]}
        else{const P=RDC.ids[A.a];const m=/^([sctx])(\d)$/.exec(A.cur);row=P&&m?P[m[1]][+m[2]-1]:null}
        if(row){O.forEach((o,i)=>{const e=exp(row,row.opts[i],A.cur==='x1');num.push({b:A.a+':'+A.cur+':'+i,ok:same(o.c,e.c)&&same(o.w,e.w)&&(o.sc||0)===e.sc&&(A.cur[0]!=='x'||(Array.isArray(o.e)&&typeof o.o==='function'))})})}}
       const i=pick==='rand'?Math.floor(Math.random()*O.length):0;const o=O[i];
       /* the option's cost is the dil fx: pay it as the card would */
       try{if(o&&o.c)ap67(o.c)}catch(e){}
       res67(thKey67(A),A.cur,i,o&&o.o!=null?oOf67(A,o,bd):100);if(A.done)ends.push(A.a+'='+A.end)}}catch(e){err=err||('beat '+e.message+' '+(e.stack||'').split('\n')[1])}
     if(S.st.ms&&++stuck>2){if(S.st.ms.id==='len14'&&S.srv&&!S.srv.risen){S.age=Math.max(S.age||0,18);srvRise('bot')}else S.st.ms.force14=1}
     const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){Q.length=0;used=0;try{nextBuoi()}catch(e){err=err||('buoi '+e.message);break}}Q.length=0}
    const rc=S.st.f14.rc||null,o=RDC.road[road];
    if(rc)for(let n=BAL.road.first;n<=BAL.road.last;n++){const id=road+'_'+n;const opened=(S.st.ch.past||[]).some(x=>x.a===id);if(opened)for(const pid of rdcChap(road,n).parts)marks.push([pid,nrSeenK?nrNow('rdc:'+o,pid):true])}
    const parts=rc?Object.values(rc).flatMap(c=>[].concat(c.s,c.c,c.t,[c.x])):[];
    const titles=rc?Object.keys(rc).map(n=>[ARC67[road+'_'+n].t===RDC.ids[rc[n].x].title,ARC67[road+'_'+n].E.win.tag===RDC.ids[rc[n].x].E.win.tag]):[];
    /* reload: S through JSON, the chapters rebuild the same */
    const before=rc?Object.keys(rc).map(n=>ARC67[road+'_'+n].t+'|'+Object.keys(ARC67[road+'_'+n].B).map(k=>ARC67[road+'_'+n].B[k].h).join('/')).join(';'):'';
    let after='';if(rc){const s=JSON.stringify(S);S=JSON.parse(s);RDC.cache={};after=Object.keys(rc).map(n=>ARC67[road+'_'+n].t+'|'+Object.keys(ARC67[road+'_'+n].B).map(k=>ARC67[road+'_'+n].B[k].h).join('/')).join(';')}
    return{k,road:S.st.f14.road,rd:S.st.f14.rd||'',rc0:!!rc0,parts,uniq:new Set(parts).size,titles,seq,vs,ends,cards,num,marks,reload:before===after&&!!before,all:!!S.st.ch.all,n:S.st.ch.n,fin:S.st.ch.fin||'',months:mon,err}}},ROWS)};
 await boot();
 const L0=await p.evaluate(()=>window.__load);console.log('load',JSON.stringify(L0));
 const bal=await p.evaluate(()=>({st:BAL.road.c.st,Est:BAL.road.c.Est,xs:Object.keys(BAL.road.c.xs).sort()}));
 ok(bal.st===2&&bal.Est.win===3&&bal.Est.lose===3&&bal.Est.mid===1&&bal.xs.join()==='danh,duc,hh,mat,sung,tamco,th','validator constants = BAL.road.c',bal);
 const want=ROWS.filter(r=>r.type==='prem').map(r=>r.id).filter(r=>!ONLY||ONLY.split(',').includes(r));
 const roads=await p.evaluate(W=>W.filter(r=>RDC.def[r]&&rdFull(r)),want);console.log('composed roads:',roads.join(' ')||'(none)');
 ok(roads.length>0,'at least one composed road registered',want);
 const seen={};
 for(const rd of roads){const k=await p.evaluate(rd=>ARC67[rd].o,rd);
  for(let L=0;L<NLIV;L++){let R;for(let t=0;t<3;t++){R=await p.evaluate(([k,rd,pk])=>window.__run(k,rd,pk),[k,rd,L===0?0:'rand']);if(R&&R.err==='boot'){await p.waitForTimeout(3000);continue}break}
   if(!R||!R.seq){ok(false,`${rd} L${L+1}: ran`,R);continue}
   console.log(rd,'life',L+1,R.n,R.all?'ALL':'',R.months+'m','fin='+R.fin,'|',R.seq.join(' '),R.err||'');
   const ns=R.seq.map(x=>+x.split(':')[0]);
   ok(!R.err,`${rd} L${L+1}: no error`,R.err);
   ok(R.road===rd&&R.rd===rd&&R.rc0,`${rd} L${L+1}: road kept + composed at life start`,[R.road,R.rd,R.rc0]);
   ok(R.all&&R.n===14&&ns.every((n,i)=>n===i+1),`${rd} L${L+1}: chapters 1..14 in order`,R.seq);
   const got=R.seq.filter(x=>{const n=+x.split(':')[0];return n>=4&&n<=11}).map(x=>x.split(':')[1]);const w=[rd].concat([5,6,7,8,9,10,11].map(n=>rd+'_'+n));
   ok(JSON.stringify(got)===JSON.stringify(w),`${rd} L${L+1}: chapters 4..11 are the road in order`,{got,w});
   ok(!!R.fin&&R.ends.some(e=>e.startsWith(rd+'_11=')),`${rd} L${L+1}: origin ending told by the road finale`,[R.fin,R.ends.slice(-2)]);
   ok(R.parts.length===42&&R.uniq===42,`${rd} L${L+1}: 7 chapters × 6 parts, each part once in the road`,[R.parts.length,R.uniq]);
   ok(R.titles.length===7&&R.titles.every(x=>x[0]&&x[1]),`${rd} L${L+1}: chapter title + endings = its climax row`,R.titles);
   ok(R.cards.length>=20&&R.cards.every(c=>c.n===4),`${rd} L${L+1}: ${R.cards.length} hồi cards, every one has 4 options`,R.cards.filter(c=>c.n!==4).slice(0,3));
   ok(R.cards.every(c=>!c.left.length),`${rd} L${L+1}: no placeholder left`,R.cards.filter(c=>c.left.length).slice(0,3));
   ok(R.cards.every(c=>!c.dig),`${rd} L${L+1}: no digit / % in a card`,R.cards.filter(c=>c.dig).slice(0,3));
   ok(R.num.length>=80&&R.num.every(x=>x.ok),`${rd} L${L+1}: ${R.num.length} options = steps × BAL.road.c`,R.num.filter(x=>!x.ok).slice(0,4));
   ok(R.marks.length>=36&&R.marks.every(x=>x[1]),`${rd} L${L+1}: opened chapters mark ${R.marks.length} parts in P0 rdc:${k}`,R.marks.filter(x=>!x[1]).slice(0,4));
   ok(R.reload,`${rd} L${L+1}: composition survives a reload (JSON round trip)`);
   let bad=[],last=null;for(const x of R.vs){if(!x.a.startsWith(rd))continue;if(last&&x.v!==last.v&&last.alive)bad.push([last.a,last.v,x.a,x.v]);last=x}
   ok(!bad.length,`${rd} L${L+1}: the road's rival is the same person while alive`,bad.slice(0,3));
   if(seen[rd]){const o=R.parts.filter(x=>seen[rd].includes(x)).length;console.log(`  parts met again from life ${L}: ${o}/42 (fresh-first, pool-bound)`)}seen[rd]=R.parts}
  await boot()}
 ok(!errs.length,'0 page errors',errs.slice(0,4));
 console.log(fail?`RDC PLAY: ${fail} FAIL (${pass} pass)`:`RDC PLAY: ALL PASS (${pass})`);await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
