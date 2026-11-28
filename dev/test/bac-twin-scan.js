/* E-TIER-B14b bạc-twin gate (law 2 «a bạc road always has another road of matching tier», owner OD 27/11 ~00:46Z; Foreman E C11 ruling Q4 (a)):
   ONE jstory hook (twin6 / altOf67 / twinNpc). On the built game (index.html) every card of the families is made from a real roster and checked:
   - j7c (every J7SEEDS seed), j68c (every composed E68 card), j71c (every festival comp), jworldc (every WC seed): each way that costs Bạc has its
     twin «<way>, không dùng bạc» (jstory twinN) on the SAME card: no Bạc in its cost, more Sức than the bạc way (the Bạc priced by altCost), the same Được line;
     the card keeps BAL.<fam>.tier.length real ways (twins are not a 4th tier);
   - j67 (every ARC67 hồi, wrapped opts67): a hồi with k bạc ways carries ≥ k routes «không dùng bạc» (alt67), each without Bạc; the kept ways
     come first in their own order (S.pl67.i of a kept way never moves);
   - jworldc NPC round (law 1): an NPC with 0 bạc under a bạc stance pays Sức (the twin), never goes below 0 bạc.
   MUTANT (env MUT=twinoff → BAL.twin.on=false in the page) must FAIL.
   usage: node dev/test/bac-twin-scan.js   (from the worktree root, after dev/site/build_site.sh) */
const {chromium}=require('playwright');const D=require('./lib/device');const path=require('path');
const ROOT=path.resolve(__dirname,'../..');const MUT=process.env.MUT||'';
let fail=0;const ok=(c,m,x)=>{if(!c)fail++;if(!c||process.env.V)console.log((c?'ok   ':'FAIL ')+m+(x!==undefined&&!c?' '+JSON.stringify(x).slice(0,500):''));return c};
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const g=await D.openHost(p,srv.url,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title')&&window.__ctmBuilt===1,null,{timeout:120000});
 const R=await g.evaluate(MUT=>{try{store.set(NL_KEY,null)}catch(e){}document.getElementById('title').hidden=true;SLOT=3;start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});
  window.__bot=1;window.quiet=1;S.srv=null;S.rank=Math.max(S.rank||0,3);S.bac=Math.max(S.bac||0,999);if(!S.maid)S.maid=newMaid(nmNew('maid'),50);if((S.staff||[]).length<4)fillStaff(S,true);
  if(MUT==='twinoff')BAL.twin.on=false;
  const NET=[...new Set([].concat(...[J7SEEDS,J68SEEDS,J71SEEDS].flat().map(r=>Object.values(r.roles||{}).flatMap(x=>[].concat(x['nết']||[],x['lòng']||[])))))];const tr0=tr6;tr6=o=>NET;
  const out={card:{},bad:[],j67:{hoi:0,bac:0,ok:0},npc:null,err:[]};const T=f=>out.card[f]=out.card[f]||{cards:0,bacWays:0,twins:0};
  const sucOf=o=>(o.fx||{}).suc||0;const wOf=o=>String(o.x||'').split(' · kèm')[0];
  const chk=(fam,id,opts,tiers)=>{const t=T(fam);t.cards++;const real=opts.filter(o=>!o.twin);if(real.length!==tiers)out.bad.push([fam,id,'real ways '+real.length]);
   for(const o of real){if(!((o.fx||{}).bac<0))continue;t.bacWays++;const n0=o.n.replace(/ \(mệt\)$/,'');const tw=opts.find(x=>x.twin&&x.n.replace(/ \(mệt\)$/,'')===twinN(n0));
    if(!tw){out.bad.push([fam,id,'no twin «'+n0+'»']);continue}
    if((tw.fx||{}).bac)out.bad.push([fam,id,'twin pays bạc «'+n0+'»']);else if(!(sucOf(tw)<sucOf(o)))out.bad.push([fam,id,'twin Sức not dearer «'+n0+'»']);
    else if(wOf(tw)!==wOf(o))out.bad.push([fam,id,'twin result differs «'+n0+'»',wOf(o),wOf(tw)]);else t.twins++}};
  try{for(const sd of j7cSeeds()){let C=null;try{C=j7cCast(sd)}catch(e){}if(!C)continue;const d=mkP("j7c",{sid:sd.id,c:C});if(d)chk('j7c',sd.id,d.o,BAL.j7c.tier.length)}}catch(e){out.err.push('j7c '+e.message)}
  try{for(const s of E68){if(!s.cs)continue;let pp=null;try{pp=s.pp&&s.pp()}catch(e){}if(!pp)continue;const d=mkP("e68"+s.id,Object.assign({vi:0},pp));if(d)chk('j68c',s.cs,d.o,BAL.j68c.tier.length)}}catch(e){out.err.push('j68c '+e.message)}
  try{const X_=window.J71C_X,SD=window.J71C_SEEDS,L=liveRivals(true);let n=0;for(const id in SD.CI){const sd=SD.CI[id];const fest=sd.fest==="*"?Object.keys(FV7)[0]:sd.fest;
   const m=X_.compCard(fest,{id,b:(sd.roles||{}).B?L[n++%L.length].id:null});if(m)chk('j71c',id,m.opts,BAL.j71c.tier.length)}}catch(e){out.err.push('j71c '+e.message)}
  try{const X_=window.WC_X;const L=liveRivals(true).filter(v=>v&&v.alive);for(const [id,sd] of Object.entries(window.WC_SEEDS)){
   let O=null;const w0={id:-1,k:sd.k,x:{}};let c=null;for(let i=0;i<6&&!c;i++){try{c=X_.wcCast(sd,w0)}catch(e){}}
   if(c){const w={id:-1,k:sd.k,x:{wc:c}};try{O=X_.wcCard(w)}catch(e){O=null}}if(O)chk('wc',id,O.opts,BAL.wc.tier.length);else T('wc').skip=(T('wc').skip||0)+1}}catch(e){out.err.push('wc '+e.message)}
  /* j67: every hồi of every arc, through the wrapped opts67 */
  try{const ok67=typeof v267==='function'&&v267();for(const aid of Object.keys(ARC67)){const a=ARC67[aid];for(const bid of Object.keys(a.B||{})){const A={a:aid,kind:'x',act:{},f:{},sc:0,used:[],hist:[],cur:bid,nb:null,done:0,tag:'',end:'',i:0};
    let L=null;try{L=opts67(A,beatDef67(A,bid))}catch(e){continue}if(!Array.isArray(L))continue;const sil=L.filter(o=>o&&!o.alt67&&o.c&&o.c.bac<0);if(!sil.length)continue;out.j67.hoi++;out.j67.bac+=sil.length;
    const alts=L.filter(o=>o&&o.alt67),first=L.findIndex(o=>o&&o.alt67);const tail=first<0||L.slice(first).every(o=>o.alt67);
    if(alts.length>=sil.length&&alts.every(o=>!(o.c&&o.c.bac<0))&&tail)out.j67.ok++;else out.bad.push(['j67',aid+'.'+bid,'bạc ways '+sil.length+' twins '+alts.length+(tail?'':' (alts not last)')])}}if(!ok67)out.err.push('j67 v267 off')}catch(e){out.err.push('j67 '+e.message)}
  /* jworldc NPC round: an NPC with no bạc picks only bạc stances → pays the twin's Sức */
  try{const X_=window.WC_X;const sd=Object.values(window.WC_SEEDS).find(s=>s.scope!=='srv'&&Object.values(s.stances).some(st=>(st.loss||{}).bac));
   if(sd){const L=liveRivals(true).filter(v=>v&&v.alive&&!v.confined&&!v.out);L.forEach(v=>{v.bac=0;v.suc=Math.max(v.suc||0,60)});const s0=L.map(v=>v.suc);
    const bk=Object.entries(sd.stances).find(([k,st])=>(st.loss||{}).bac)[0];const sd1=Object.assign({},sd,{stances:{[bk]:sd.stances[bk]}});/* the round can only pick the bạc stance */
    const r=X_.wcRound(sd1,{id:-1,k:sd.k,x:{wc:{id:sd.id}}},{id:sd.id})
    const who=(r&&r[bk])||[];const P=L.filter(v=>who.includes(window.WORLD_X.pid(v)));out.npc={sd:sd.id,n:P.length,neg:P.filter(v=>(v.bac||0)<0).length,paidSuc:P.filter(v=>v.suc<s0[L.indexOf(v)]).length}}}catch(e){out.err.push('npc '+e.message)}
  tr6=tr0;return out},MUT);
 for(const [f,t] of Object.entries(R.card))console.log(`${f}: cards ${t.cards} · bạc ways ${t.bacWays} · with twin ${t.twins}${t.skip?' · not castable '+t.skip:''}`);
 console.log(`j67: hồi with bạc ${R.j67.hoi} · bạc ways ${R.j67.bac} · hồi with a twin per bạc way ${R.j67.ok}`);console.log('npc round: '+JSON.stringify(R.npc));
 ok(R.err.length===0,'harness errors',R.err);for(const f of ['j7c','j68c','j71c','wc'])ok(R.card[f]&&R.card[f].cards>0&&R.card[f].bacWays>0,f+' has cards with bạc ways',R.card[f]);
 ok(R.j67.hoi>0,'j67 hồi with bạc found');ok(R.bad.length===0,'every bạc way has its twin ('+R.bad.length+' bad)',R.bad.slice(0,12));
 ok(R.npc&&R.npc.n>0&&R.npc.neg===0&&R.npc.paidSuc===R.npc.n,'NPC who cannot pay bạc takes the twin (Sức), none below 0 bạc',R.npc);
 ok(errs.length===0,'page errors '+errs.length+' '+(errs[0]||''));
 console.log(fail?`BAC-TWIN${MUT?' [MUT '+MUT+']':''}: ${fail} FAIL`:`BAC-TWIN${MUT?' [MUT '+MUT+']':''}: ALL PASS`);await b.close();srv.close&&srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
