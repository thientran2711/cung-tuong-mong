/* ORDER THIN P4 no-repeat measure on the REAL j68 engine (after dev/site/build_site.sh): node dev/test/j68c-measure.js [draws per kiếp=130] [runs=4]
   6 lives × 1 kiếp: each life = a new game (new roster, as a real new life) + a new P0 life id (nrLife), a fresh j68 record, `draws` situations drawn exactly as e68Tick does (e68Cands → e68Pick →
   e68Make: real cast, variant memory, P0 marks), the clock moving BAL.ag.why.e68.gap tuần per draw (cooldowns run). Reported per family and in all:
   % of the situations shown in lives 2–6 whose DECISION (template / seed) was already met in an earlier life, and % whose exact WORDING was.
   before = BAL.j68c.on false (the 90 hand-written decisions only), after = on (90 + composed seeds). */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const N=+process.argv[2]||130,RUNS=+process.argv[3]||4;
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const g=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
 const R=await g.evaluate(([N,RUNS])=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});
  window.__bot=1;window.quiet=1;const SET=()=>{S.srv=null;S.rank=Math.max(S.rank||0,3);if(!S.maid)S.maid=newMaid(nmNew('maid'),50);if(!(S.staff||[]).length)fillStaff(S,true);S.kids=S.kids||[];while(S.kids.filter(k=>k.alive).length<2)S.kids.push(mkKid(S.kids.length?'f':'m',5));S.sung=Math.max(S.sung||0,40);S.nights=Math.max(S.nights||0,6);};/* SET = a mid-life consort (her cung nữ, servants, two children, some favour; the 17 cold / servant / hh life-only templates stay out, as in a normal life) */const FAM=["day","visit","serv","emp","sea","court","rumor","kid","myst"];const gap=BAL.ag.why.e68.gap;
  const one=(on,run)=>{BAL.j68c.on=on;try{localStorage.removeItem('ctm-nr')}catch(e){}const metD=new Set(),metW=new Set();const T={};for(const f of FAM.concat(["all","composed"]))T[f]={n:0,d:0,w:0};
   for(let l=0;l<6;l++){start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});SET();Q.length=0;S.nrl='M'+(on?1:0)+'_'+run+'_'+l;nrLife();S.e68=null;e68();const e=S.e68;const lifeD=new Set(),lifeW=new Set();
    for(let i=0;i<N;i++){for(const k in e.cd)e.cd[k]-=gap;const L=e68Cands(null);let x=null,d=null;for(let t=0;t<6&&L.length;t++){x=e68Pick(L);if(!x)break;L.splice(L.indexOf(x),1);Q.length=0;d=e68Make(x[0]);if(d)break}
     if(!d)continue;const s=x[0],vi=e.vu[s.id].slice(-1)[0];const kd=s.id,kw=s.id+":"+vi;
     if(l>0){for(const f of [s.fam,"all"].concat(s.cs?["composed"]:[])){if(!T[f])continue;T[f].n++;if(metD.has(kd))T[f].d++;if(metW.has(kw))T[f].w++}}lifeD.add(kd);lifeW.add(kw)}
    for(const k of lifeD)metD.add(k);for(const k of lifeW)metW.add(k)}
   return T};
  const out={};for(const on of [false,true]){const A={};for(let r=0;r<RUNS;r++){const T=one(on,r);for(const f in T){A[f]=A[f]||{n:0,d:0,w:0};A[f].n+=T[f].n;A[f].d+=T[f].d;A[f].w+=T[f].w}}out[on?"after":"before"]=A}
  out.cnt=e68cCount();return out},[N,RUNS]);
 const pc=(a,b)=>b?Math.round(a/b*100)+' %':'–';
 console.log(`j68 no-repeat measure: 6 lives × ${N} situations per kiếp, ${RUNS} runs; composed seeds ${JSON.stringify(R.cnt.seeds)}`);
 console.log('| Family | before: decision repeats | before: wording repeats | after: decision repeats | after: wording repeats | shown per kiếp after |\n|---|---|---|---|---|---|');
 for(const f of ["day","visit","serv","emp","sea","court","rumor","kid","myst","all","composed"]){const B=R.before[f]||{},A=R.after[f]||{};console.log(`| ${f} | ${pc(B.d,B.n)} | ${pc(B.w,B.n)} | ${pc(A.d,A.n)} | ${pc(A.w,A.n)} | ${A.n?Math.round(A.n/RUNS/5):0} |`)}
 if(errs.length)console.log('page errors: '+errs[0]);await b.close();srv.close()})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
