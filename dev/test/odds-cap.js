/* ODDS CAP unit draw (owner 17/11 17:00Z + 17:35Z: nothing is 100 %, nothing is 0 %; cap 95, floor 5 = BAL.odds.hi / lo).
   capRes(ok,o) (j1) turns a noise-draw result whose raw odds are o into one whose final chance is oddsCl(o).
   usage: [OC_BUILD=<dev/build dir>] node dev/test/odds-cap.js [--old]   (--old = the r2 formula roll(H/o*100), for the before/after table)
   Reads capRes / roll / oddsCl / cl from dev/build/j1.js and BAL.odds from dev/build/jbal.js (ONE core: no typed 95 / 5 here). */
const fs=require('fs'),path=require('path');const B=process.env.OC_BUILD||path.join(__dirname,'..','build');
const j1=fs.readFileSync(path.join(B,'j1.js'),'utf8'),jb=fs.readFileSync(path.join(B,'jbal.js'),'utf8');
const m=jb.match(/odds:\{[^}]*?lo:(\d+),hi:(\d+)/);if(!m){console.log('FAIL: BAL.odds lo/hi not found in jbal.js');process.exit(1)}
const BAL={odds:{lo:+m[1],hi:+m[2]}};
const fn=n=>{const r=j1.match(new RegExp('^function '+n+'\\(.*$','m'));if(!r)throw new Error('no '+n+' in j1.js');return r[0]};
let src=[fn('cl'),fn('roll'),fn('oddsCl'),fn('capRes')].join('\n');
if(process.argv.includes('--old'))src=src.replace(/function capRes\(.*$/m,'function capRes(ok,o){o=+o||0;const H=BAL.odds.hi,L=BAL.odds.lo;if(o>H)return !!ok&&roll(H/o*100);if(o<L)return !!ok||roll((L-o)/(100-o)*100);return !!ok}');
const capRes=new Function('BAL',src+'\nreturn capRes')(BAL);
const N=200000,TOL=.004;let bad=0;const rows=[];
const draw=o=>{let w=0;for(let i=0;i<N;i++){const ok=Math.random()*100<o;if(capRes(ok,o))w++}return w/N};
const want=o=>Math.max(BAL.odds.lo,Math.min(BAL.odds.hi,o))/100;
for(const o of [0,1,2,3,4,5,6,50,94,95,96,97,98,99,100]){const p=draw(o),e=want(o),ok=Math.abs(p-e)<=TOL;if(!ok)bad++;rows.push(`o=${String(o).padStart(3)}  P(final win)=${p.toFixed(3)}  want ${e.toFixed(3)}  ${ok?'ok':'FAIL'}`)}
console.log(`capRes unit draw, ${N} draws per o, BAL.odds lo ${BAL.odds.lo} / hi ${BAL.odds.hi}${process.argv.includes('--old')?' (OLD r2 formula)':''}`);
console.log(rows.join('\n'));console.log(bad?`FAIL ${bad}`:'PASS');process.exit(bad?1:0);
