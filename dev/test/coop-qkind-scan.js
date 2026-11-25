/* coop-qkind-scan (robot-coop-fix-6 r2, law 11 whole family): EVERY producer of the modal queue Q in dev/build/j*.js (pushModal / pushDil /
   kitPanel / kitModal / Q.push / Q.unshift), each classified by the same marks as jcoopworld qKind (the ONE rule of a room step):
     look = kit look:1 (her own look-up panel) → carried · tell = nothing to press but its close → carried
     hold = a choice: pid / rk / ev / nl / opts / ending / shop / pick / stage / game / timed / a button or a function (not onClose) in it
     run  = the spec is built by a function (svCauseCard, def70m, agSeekCard …): classified at run time by qKind (unknown → hold)
     pass = re-queues items that already exist (Q.unshift(...q0), Q.push(m)): their class is the class of each item, read at run time
   usage: node dev/test/coop-qkind-scan.js [--rows]   (prints the per-file table, --rows every producer line) */
const fs=require('fs'),path=require('path');const dir=path.join(__dirname,'../build');
const files=fs.readdirSync(dir).filter(f=>/^j.*\.js$/.test(f)&&!/^jbal/.test(f)).sort();
const RE=/\b(pushModal|pushDil|kitPanel|kitModal|Q\.push|Q\.unshift)\(/g;
function arg(s,i){let d=0,q=null,j=i;for(;j<s.length&&j-i<4000;j++){const c=s[j];if(q){if(c==='\\'){j++;continue}if(c===q)q=null;else if(q==='`'&&c==='$'&&s[j+1]==='{'){}continue}
 if(c==='"'||c==="'"||c==='`'){q=c;continue}if(c==='('||c==='{'||c==='[')d++;else if(c===')'||c==='}'||c===']'){if(d===0)break;d--}}return s.slice(i,j)}
function cls(p,a){const t=a.trim();
 if(p==='pushDil')return['hold','pushDil (card: opts / pid)'];
 if(/^\.\.\.|^[A-Za-z_$][\w$.]*$/.test(t)&&!/^\{/.test(t))return['pass','re-queue '+t.slice(0,30)];
 if(/\blook\s*:\s*(1|true)\b/.test(t))return['look','kit look'];
 const m=[[/\bpid\s*:/,'pid'],[/\brk\s*:/,'rk'],[/\bev\s*:\s*1\b/,'ev card'],[/\bnl\s*:\s*1\b/,'nl life card'],[/\bopts\s*:/,'opts'],[/\bo\s*:\s*\[/,'opts (o:)'],[/cls\s*:\s*"end"|kind\s*:\s*"end"/,'ending'],[/\bkind\s*:\s*"choice"/,'kind choice'],
  [/\bshop\s*:/,'shop'],[/\bpick\s*:\s*(1|true)/,'pick'],[/\bstage\s*:/,'stage'],[/\bgame\s*:/,'game'],[/\btimed\s*:/,'timed'],[/kptitle/,'title screen'],
  [/<button\b|\bpbtn\(|\bkbtn\b|onclick\s*=|class=\\?"opt\b/,'body button'],[/\bmg\s*:/,'mini game']];
 for(const [r,w] of m)if(r.test(t))return['hold',w];
 const fn=t.replace(/onClose\s*:\s*(\([^)]*\)\s*=>|function)/g,'');if(/(\([^)]*\)|\b\w+)\s*=>\s*[{(\w]|\bfunction\s*\(/.test(fn)&&/^\{/.test(t))return['hold','function in spec'];
 if(!/^\{/.test(t))return['run','dynamic spec '+t.slice(0,40)];
 return['tell','no choice mark'];}
const rows=[];for(const f of files){const s=fs.readFileSync(path.join(dir,f),'utf8');let m;RE.lastIndex=0;while((m=RE.exec(s))){const pre=s.slice(Math.max(0,m.index-9),m.index);if(/function\s+$/.test(pre))continue;
 const a=arg(s,m.index+m[0].length);const [k,w]=cls(m[1],a);rows.push({f,l:s.slice(0,m.index).split('\n').length,p:m[1],k,w,t:a.replace(/\s+/g,' ').slice(0,90)})}}
const by={};for(const r of rows){by[r.f]=by[r.f]||{look:0,tell:0,hold:0,'run':0,pass:0};by[r.f][r.k]++}
const K=['look','tell','hold','run','pass'];console.log('| file | '+K.join(' | ')+' |\n|---|'+K.map(()=>'---').join('|')+'|');
const tot={};for(const f in by){console.log(`| ${f} | ${K.map(k=>by[f][k]).join(' | ')} |`);for(const k of K)tot[k]=(tot[k]||0)+by[f][k]}
console.log(`| **all ${rows.length}** | ${K.map(k=>tot[k]).join(' | ')} |`);
if(process.argv.includes('--rows'))for(const r of rows)console.log(`${r.k}\t${r.f}:${r.l}\t${r.p}\t${r.w}\t${r.t}`);
