/* robot10 E-FIX-1 family scan «a person read from an empty seat» (econ card TypeError null.queen, robot R1/R6/R7):
   queenP() is null when the Hoàng hậu seat is empty. Every place that hands queenP() straight to a person helper (rkOf rkName palaceOf agAt NM pv
   kitName houseOf ledgerId byKey) or reads a field of it (queenP().x) must be guarded in the SAME synchronous expression (queenP()&& / ?: before it,
   with no deferred arrow `=>` in between — a closure runs later, when the seat may have emptied).
   usage: node dev/test/r10e-null-seat-scan.js [build dir]   exit 1 when an unguarded read is left */
const fs=require('fs'),path=require('path');const DIR=process.argv.slice(2).find(a=>!a.startsWith('--'))||path.join(__dirname,'../build');
const H=/\b(rkOf|rkName|palaceOf|agAt|NM|pv|kitName|houseOf|ledgerId|byKey)\(\s*$/;const bad=[],safe=[];let n=0;
for(const f of fs.readdirSync(DIR).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js')){fs.readFileSync(path.join(DIR,f),'utf8').split('\n').forEach((L,i)=>{
 const re=/queenP\(\)/g;let m;while((m=re.exec(L))){const pre=L.slice(0,m.index),post=L.slice(m.index+8);
  /* the argument / field use: queenP().x  or  helper(queenP() / helper(x||queenP() */
  const arg=pre.match(/\b(rkOf|rkName|palaceOf|agAt|NM|pv|kitName|houseOf|ledgerId|byKey)\(([^()]*)$/);
  const use=/^\s*\./.test(post)||(arg&&!/[?:]/.test(arg[2]));if(!use)continue;n++;
  const g=Math.max(pre.lastIndexOf('queenP()&&'),pre.lastIndexOf('queenP()?'),pre.lastIndexOf('qOn()&&'));
  const guarded=g>=0&&pre.slice(g).indexOf('=>')<0;(guarded?safe:bad).push(`${f}:${i+1}: …${L.slice(Math.max(0,m.index-70),m.index+30)}…`)}})}
console.log(`r10e-null-seat-scan: ${n} direct reads of queenP(); ${safe.length} guarded, ${bad.length} UNGUARDED`);bad.forEach(x=>console.log('  UNGUARDED '+x));
/* (2) a variable taken from queenP() (q=queenP(), q=typeof queenP==="function"?queenP():null) used (q.x / helper(q)) before any guard of it */
const sus=[];let nv=0;for(const f of fs.readdirSync(DIR).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js')){const s=fs.readFileSync(path.join(DIR,f),'utf8');
 const re=/\b(?:const|let|var)?\s*([a-zA-Z_$][\w$]*)\s*=\s*(?:typeof queenP===?"function"\s*\?\s*)?queenP\(\)(?:\s*:\s*null)?/g;let m;
 while((m=re.exec(s))){nv++;const v=m[1].replace(/\$/g,'\\$');const tail=s.slice(m.index+m[0].length,m.index+m[0].length+400);
  const u=tail.search(new RegExp('(?<![\\w$.])'+v+'\\.(?!=)|\\b(rkOf|rkName|palaceOf|agAt|NM|pv|kitName|houseOf|ledgerId|byKey)\\(\\s*'+v+'\\s*[,)]'));
  const g=tail.search(new RegExp('(?<![\\w$.])'+v+'\\s*(&&|\\?|\\|\\||!==|===)|!\\s*'+v+'\\b|if\\s*\\(\\s*'+v+'\\b'));
  if(u>=0&&(g<0||u<g))sus.push(`${f}:${s.slice(0,m.index).split('\n').length}: ${m[1]} used before a guard: …${tail.slice(Math.max(0,u-60),u+40).replace(/\n/g,' ')}…`)}}
console.log(`r10e-null-seat-scan: ${nv} variables taken from queenP(); ${sus.length} UNGUARDED`);sus.forEach(x=>console.log('  UNGUARDED '+x));
if(process.argv.includes('--all'))safe.forEach(x=>console.log('  ok '+x));process.exit(bad.length+sus.length?1:0);
