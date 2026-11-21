/* self-word-r1 (E41r): every rare-path matcher (RARE97 path/bad, substring of an option label) still matches >=1 raw option of its road; usage: node dev/test/self-word/rare-match.js <repo dir>. 14 pre-existing misses on story-voice-land are family-scope / function-option cases (same before and after). */
/* every rare-path matcher string (j97 R97 + RARE97.defs path/bad) must be a substring of >=1 raw option label of its road */
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
await p.goto('file://'+process.argv[2]+'/index.html');await p.waitForFunction(()=>typeof start==='function'&&typeof ARC67==='object'&&window.RARE97,null,{timeout:180000});await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{const out=[];let n=0;const labs=a=>{const L=[];const A=ARC67[a];if(!A)return L;for(const bb of Object.values(A.B||{})){let O=bb.o;if(typeof O==='function')continue;for(const o of O||[])L.push(String(o.n))}return L};
 const defs=Object.assign({},RARE97.defs);
 for(const [id,d] of Object.entries(defs)){const A=ARC67[id];if(!A)continue;const road=A.road||id;const o=A.o;
  /* options of every arc of the same origin road family */
  const fam=Object.keys(ARC67).filter(k=>ARC67[k].o===o&&(!A.road||ARC67[k].road===A.road||k===id));let L=[];for(const k of fam)L=L.concat(labs(k));
  for(const kind of ['path','bad'])for(const x of d[kind]||[]){n++;if(!L.some(s=>s.includes(x)))out.push(id+' '+kind+': '+x)}}
 return{n,out}});
console.log('matchers',r.n,'unmatched',r.out.length);for(const x of r.out)console.log('  '+x);console.log('errs',errs.slice(0,2));await b.close()})();
