/* robot-coop-fix-2 r3 (review r2 FAIL 2 + 3b): IDENTITY GUARD of the co-op Worker's person clamp (coop/worker/src/merge.js clampP).
   The Worker clamps every named object of a person both seats changed; on a number the GAME itself produced it must change nothing
   (else it cuts a value the game allows — r2: a servant's Sức over sucCap, which the game never caps). This plays real states and runs clampP
   on a clone of EVERY named object, with the same body rule (BAL.personRange.body: Sức ≤ sucCap only on W.R[] / P.<seat>.S), the same paths
   as the Worker's merge (objects + id-arrays), and lists every would-be rewrite.
   States: solo games (seeded Math.random, --seeds 7,11,23, --turns 80 endTurn each) of the BUILT site + any save file given (a ser() JSON
   {S, R, …}, e.g. a co-op seat's repro save). Each state is put in the canonical shape the Worker sees: W.R = the world people (non-co-op
   rivals), P.a.S = her.
   usage (repo root of a BUILT site): node dev/tools/coop-range-identity.js [--seeds 7,11,23] [--turns 80] [--every] [save.json …]
   Last line: COOP-RANGE-IDENTITY PASS (0 rewrites) / FAIL. */
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');const D=require('../test/lib/device.js');
const ROOT=path.resolve(__dirname,'../..');const A=process.argv.slice(2);const arg=(k,d)=>{const i=A.indexOf(k);return i>=0?A[i+1]:d};
const EVERY=A.includes('--every');/* --every: every named object reached through ANY array (the reviewer's probe), not only the Worker's id-arrays (staff carry sid, no id: the Worker keeps one seat's array whole) */
const SEEDS=String(arg('--seeds','7,11,23')).split(',').map(Number).filter(n=>!isNaN(n)),TURNS=+arg('--turns',80);
const FILES=A.filter((x,i)=>!x.startsWith('--')&&!(i>0&&A[i-1].startsWith('--')));
const isObj=o=>o!==null&&typeof o==='object'&&!Array.isArray(o);const idArr=x=>Array.isArray(x)&&x.length>0&&x.every(e=>isObj(e)&&e.id!=null);
(async()=>{const M=await import(path.join(ROOT,'coop/worker/src/merge.js'));
 const canon=d=>({W:{R:(d.R||[]).filter(r=>r&&!r.coop)},P:{a:{name:d.S&&d.S.name,S:d.S}}});
 /* every named object with its Worker path (m3: objects → pth.k, id-arrays → pth[]) */
 function walk(o,pth,out){if(isObj(o)){if(M.isPerson(o))out.push([pth,o]);for(const k in o){const v=o[k];if(isObj(v)||idArr(v)||(EVERY&&Array.isArray(v)))walk(v,pth?pth+'.'+k:k,out)}}
  else if(idArr(o)||(EVERY&&Array.isArray(o)))for(const e of o)walk(e,pth+'[]',out);return out}
 function diff(a,b,p,L){if(a===b)return;if(typeof a==='number'&&typeof b==='number'){if(a!==b)L.push(p+' '+a+'→'+b);return}
  if(isObj(a)&&isObj(b))for(const k in a)diff(a[k],b[k],p+'.'+k,L)}
 const rows=[];let bad=0;
 function check(label,d){const L=walk(canon(d),'',[]);const hits=[];
  for(const [pth,o] of L){const c=JSON.parse(JSON.stringify(o));M.clampP(c,M.isBody(pth));const x=[];diff(o,c,'',x);for(const y of x)hits.push(pth+(o.name?' «'+o.name+'»':'')+y+(o.age!=null?' (age '+o.age+')':''))}
  bad+=hits.length;rows.push(`| ${label} | ${L.length} | ${L.filter(([p])=>M.isBody(p)).length} | ${hits.length?hits.slice(0,6).join('<br>'):'none'} |`)}
 for(const f of FILES){const d=JSON.parse(fs.readFileSync(f,'utf8'));check('save '+path.basename(f),d.S?d:(d.save||d))}
 if(SEEDS.length&&TURNS>0){const srv=await D.serveRoot(ROOT);const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'ipadAir');const p=await ctx.newPage();
  await p.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());const g=await D.openHost(p,srv.url);
  for(const sd of SEEDS){const d=await g.evaluate(([sd,T])=>{let seed=sd;Math.random=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
    const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
    start();Q.length=0;$("modal").hidden=true;for(let i=0;i<T;i++){try{if(!S||S.dead)start();Q.length=0;S.mg=null;endTurn()}catch(e){}}Q.length=0;
    const o=ser();return JSON.parse(JSON.stringify(o))},[sd,TURNS]);check(`solo seed ${sd}, ${TURNS} turns (year ${d.S&&d.S.year}, ${(d.R||[]).length} rivals)`,d)}
  await b.close();srv.close()}
 console.log('| state | named objects | bodies (Sức ≤ sucCap) | would-be rewrites by clampP |\n|---|---|---|---|\n'+rows.join('\n'));
 console.log(`COOP-RANGE-IDENTITY ${bad?'FAIL':'PASS'} · ${rows.length} states · ${bad} rewrite(s)`);process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
