/* WORDING-GAIN scan + rewrite (owner OD 26/11 ~18:50Z (7); law 11 whole family). Static, node only, no browser.
   Corpus = the value of every wx / lx / kx key (the Được / Mất / Kèm text of an option, arc step, road or event) in dev/build/j*.js (string + template literals).
   A text is split into items at «;» and «,»; an item is a VAGUE GAIN LINE when it holds a vague size word (VAGUE) beside a tracked quantity (STAT) and is not KEEP
   (không-row · exact count · chance word) — see dev/test/wording-gain-rules.js.
   usage: node dev/test/wording-gain-scan.js            → counts + the lines still vague (exit 1 when any is left)
          node dev/test/wording-gain-scan.js --fix      → rewrite dev/build/j*.js in place with RULES, then scan
          node dev/test/wording-gain-scan.js --table F  → write the before / after table (markdown) to F (with --fix) */
const fs=require('fs'),path=require('path');const {RULES,VAGUE,STAT,KEEP}=require('./wording-gain-rules.js');
const B=path.join(__dirname,'../build');const FIX=process.argv.includes('--fix');const ti=process.argv.indexOf('--table');const TABLE=ti>0?process.argv[ti+1]:null;
const items=t=>t.replace(/\s*\([^()]*\)/g,'').split(/(?:;|,)\s+/).map(x=>x.trim()).filter(Boolean);/* a «(vì …)» note is the Ghi chú, not a gain line */
const vagueItem=i=>VAGUE.test(i)&&STAT.test(i)&&!KEEP.some(k=>k[0].test(i));
const rewrite=t=>{let o=t;const fam=[];for(const [re,rp,f] of RULES){const n=o.replace(re,rp);if(n!==o){fam.push(f);o=n}}return [o,fam]};
const KEYRE=/\b(wx|lx|kx):("|`)((?:\\.|(?!\2)[^\\\n])*?)\2/g;
const rows=[];const left=[];let total=0,inScope=0;const kept={};
for(const f of fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f))){let s=fs.readFileSync(path.join(B,f),'utf8');let changed=false;
 const out=s.replace(KEYRE,(m,k,q,t,off)=>{const line=s.slice(0,off).split('\n').length;let nt=t;
  if(FIX){const [r,fam]=rewrite(t);if(r!==t){rows.push({f,line,k,before:t,after:r,fam:[...new Set(fam)].join('+')});nt=r;changed=true}}
  total++;let vg=false;for(const i of items(nt)){if(VAGUE.test(i)&&STAT.test(i)){inScope++;const kp=KEEP.find(k=>k[0].test(i));if(kp)kept[kp[1]]=(kept[kp[1]]||0)+1;else{vg=true;left.push(`${f}:${line} ${k} «${i}»`)}}}
  return `${k}:${q}${nt}${q}`});
 if(FIX&&changed)fs.writeFileSync(path.join(B,f),out)}
if(TABLE){fs.writeFileSync(TABLE,`| file:line | key | family | before | after |\n|---|---|---|---|---|\n`+rows.map(r=>`| ${r.f}:${r.line} | ${r.k} | ${r.fam} | ${r.before.replace(/\|/g,'\\|')} | ${r.after.replace(/\|/g,'\\|')} |`).join('\n')+'\n')}
const fams={};rows.forEach(r=>r.fam.split('+').forEach(x=>fams[x]=(fams[x]||0)+1));
console.log(`WORDING-GAIN scan · ${total} wx/lx/kx texts · vague-word items beside a stat ${inScope} · kept ${JSON.stringify(kept)} · VAGUE GAIN LINES LEFT ${left.length}`+(FIX?` · rewritten ${rows.length} texts ${JSON.stringify(fams)}`:''));
const uniq=[...new Set(left.map(x=>x.replace(/^\S+ \S+ /,'')))];console.log('left unique items:',uniq.length);
left.slice(0,+(process.env.SHOW||40)).forEach(x=>console.log('  LEFT',x));
process.exit(left.length?1:0);
