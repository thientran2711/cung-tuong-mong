/* rare-reach summary: node dev/measure/rr-sum.js <dir with rr_<style>_<shard>.json> [--defs] [--elig arc=E,road=E]
   Per style + all: lives, climaxes a life, eligibility (all hidden conditions met at the climax) and why not, roll hits, lives with ≥1 rare,
   median lives to a player's first rare (from the per-life share: smallest n with 1-(1-q)^n ≥ 1/2), the other sources (j96 / jkc / j99succ).
   --elig: projected per-life share if every gate rolled min(1, P / E[src]) (the owner's rule), from the same gates. */
const fs=require('fs'),path=require('path');const D=process.argv[2];const A=process.argv.slice(3);
const EL={};{const i=A.indexOf('--elig');if(i>=0)A[i+1].split(',').forEach(x=>{const[k,v]=x.split('=');EL[k]=+v})}
const lives={};for(const f of fs.readdirSync(D).filter(f=>/^rr_.*\.json$/.test(f)&&!/\.ext\.json$/.test(f))){const st=f.split('_')[1];let L=[];try{L=JSON.parse(fs.readFileSync(path.join(D,f),'utf8'))}catch(e){continue}
 lives[st]=(lives[st]||[]).concat(L.filter(x=>x&&x.rr))}
const pc=(a,b)=>b?(100*a/b).toFixed(1)+'%':'-';const med=q=>{if(q<=0)return'∞';if(q>=1)return 1;return Math.ceil(Math.log(.5)/Math.log(1-q))};
function sum(L,lab){const G=L.flatMap(l=>l.rr.gates.map(g=>Object.assign({o:l.rr.origin},g)));const row={lab,lives:L.length};
 for(const src of ["arc","road","all"]){const g=G.filter(x=>src==="all"||x.src===src);const c=g.filter(x=>x.c),ok=g.filter(x=>x.ok);
  const why={bad:g.filter(x=>x.b).length,path:g.filter(x=>!x.b&&x.p<x.np).length,sc:g.filter(x=>x.sc<x.scN).length,x:g.filter(x=>!x.x||!x.nd).length};
  const ok1=g.filter(x=>!x.b&&x.p>=x.np&&x.x&&x.nd&&x.sc>=x.scN-1).length,ok0=g.filter(x=>!x.b&&x.p>=x.np&&x.x&&x.nd).length,okP=g.filter(x=>!x.b&&x.p>=x.np-1&&x.x&&x.nd&&x.sc>=x.scN-1).length;
  row[src]={n:g.length,eSc1:pc(ok1,g.length),eSc0:pc(ok0,g.length),eSc1P1:pc(okP,g.length),perLife:(g.length/Math.max(1,L.length)).toFixed(2),elig:pc(c.length,g.length),e:c.length/Math.max(1,g.length),hit:ok.length,hitOfElig:pc(ok.length,c.length),expHit:c.reduce((a,x)=>a+x.P,0).toFixed(2),
   whyNot:{bad:pc(why.bad,g.length),pathShort:pc(why.path,g.length),loiThe:pc(why.sc,g.length),extra:pc(why.x,g.length)}}}
 const r1=L.filter(l=>(l.rr.rare||[]).length).length;row.lifeRare=pc(r1,L.length);row.q=r1/Math.max(1,L.length);row.medFirst=med(row.q);
 /* empirical: lives played (in file order) until the first rare, per shard order */
 const tm=L.filter(l=>l.rr.tm.on),tmE=tm.filter(l=>l.rr.tm.elig),tmR=tm.filter(l=>l.rr.tm.end==="c_tron");row.tm96=`${tm.length} lives had the arc · rare96 met ${tmE.length} (thuốc ${tmE.filter(l=>l.rr.tm.thuoc).length}) · ending ${tmR.length}`;
 const kc=L.flatMap(l=>l.rr.kc);row.kc=`${kc.length} rolls · ${kc.filter(x=>x.ok).length} hit`;
 const sc=L.filter(l=>l.rr.succ);row.succ=`${sc.length} reached ch2 · elig ${sc.filter(l=>l.rr.succ.elig).length} · hit ${sc.filter(l=>l.rr.succ.r).length}`;
 if(Object.keys(EL).length){/* projected: each eligible gate rolls min(1, P/E) */let pNone=[],tot=0;for(const l of L){let q=1;for(const g of l.rr.gates)if(g.c){const r=Math.min(1,(g.B||g.P)/(EL[g.src]||1));q*=1-r;tot+=r}pNone.push(q)}
  const qL=1-pNone.reduce((a,b)=>a+b,0)/Math.max(1,L.length);row.proj={lifeRare:pc(qL,1),medFirst:med(qL),rareHits:tot.toFixed(1)}}
 return row}
const all=[];const out=[];for(const st of Object.keys(lives).sort()){out.push(sum(lives[st],st));all.push(...lives[st])}out.push(sum(all,"ALL"));
for(const r of out){console.log(`\n## ${r.lab}: ${r.lives} lives · ≥1 rare ${r.lifeRare} · median lives to first rare ${r.medFirst}`+(r.proj?` · PROJECTED ≥1 rare ${r.proj.lifeRare}, median ${r.proj.medFirst}`:""));
 for(const s of ["arc","road","all"]){const x=r[s];console.log(`  ${s}: climaxes ${x.n} (${x.perLife}/life) · eligible ${x.elig} · roll hits ${x.hit} of eligible (${x.hitOfElig}; expected ${x.expHit}) · not eligible because: broke ${x.whyNot.bad}, path short ${x.whyNot.pathShort}, Lợi thế ${x.whyNot.loiThe}, stat/relation ${x.whyNot.extra} · IF Lợi thế floor −1: ${x.eSc1} · no Lợi thế floor: ${x.eSc0} · floor −1 and path −1: ${x.eSc1P1}`)}
 console.log(`  j96: ${r.tm96} · jkc: ${r.kc} · j99succ: ${r.succ}`)}
/* per origin (all styles) */
const byO={};for(const l of all){const o=l.rr.origin;byO[o]=byO[o]||{L:0,n:0,c:0,r:0};byO[o].L++;byO[o].n+=l.rr.gates.length;byO[o].c+=l.rr.gates.filter(g=>g.c).length;if(l.rr.rare.length)byO[o].r++}
console.log("\n## per origin: lives · climaxes · eligible · lives ≥1 rare");for(const o in byO){const x=byO[o];console.log(`  ${o}: ${x.L} · ${x.n} · ${pc(x.c,x.n)} · ${pc(x.r,x.L)}`)}
if(A.includes('--defs')){const byD={};for(const l of all)for(const g of l.rr.gates){const d=byD[g.a]=byD[g.a]||{n:0,c:0,src:g.src,pOK:0,scOK:0,xOK:0,b:0};d.n++;d.c+=g.c;if(g.p>=g.np)d.pOK++;if(g.sc>=g.scN)d.scOK++;if(g.x&&g.nd)d.xOK++;if(g.b)d.b++}
 console.log("\n## per rare (n climaxes · eligible · path met · Lợi thế met · stat met · broke)");for(const[k,d]of Object.entries(byD).sort((a,b)=>b[1].n-a[1].n))console.log(`  ${k} ${d.src}: ${d.n} · ${d.c} · ${d.pOK} · ${d.scOK} · ${d.xOK} · ${d.b}`)}
fs.writeFileSync(path.join(D,'summary.json'),JSON.stringify(out,null,1));
