/* TIER-AUDIT static scan (E-TIER-AUDIT, OD 27/11 ~00:46Z law 2 three tiers). Read-only.
   Finds every literal option list `o:[ ... ]` / `opts:[ ... ]` / `ch:[ ... ]` in dev/build/j*.js, splits it into options,
   reads each option's label + cost/effect keys, groups same-signature options, flags exit-mixed sets.
   usage: node tierscan.js <repo root> <out.tsv> */
const fs=require('fs');const R=process.argv[2],OUT=process.argv[3];const B=R+'/dev/build/';
const files=fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js').sort();
function matchClose(s,i){/* s[i]==='[' ; returns index of matching ']' (strings, templates, comments aware; regex approx) */
 let d=0;const st=[];for(let k=i;k<s.length;k++){const c=s[k];
  if(c==='"'||c==="'"){const q=c;k++;while(k<s.length&&s[k]!==q){if(s[k]==='\\')k++;k++}continue}
  if(c==='`'){k++;let td=0;while(k<s.length){if(s[k]==='\\'){k+=2;continue}if(s[k]==='`'&&td===0)break;if(s[k]==='$'&&s[k+1]==='{'){td++;k+=2;continue}if(s[k]==='}'&&td>0){td--;k++;continue}k++}continue}
  if(c==='/'&&s[k+1]==='*'){k=s.indexOf('*/',k+2);if(k<0)return -1;k++;continue}
  if(c==='/'&&s[k+1]==='/'){k=s.indexOf('\n',k);if(k<0)return -1;continue}
  if(c==='['||c==='{'||c==='(')d++;else if(c===']'||c==='}'||c===')'){d--;if(d===0)return c===']'?k:-1}}return -1}
function splitTop(body){const out=[];let d=0,start=0;for(let k=0;k<body.length;k++){const c=body[k];
  if(c==='"'||c==="'"){const q=c;k++;while(k<body.length&&body[k]!==q){if(body[k]==='\\')k++;k++}continue}
  if(c==='`'){k++;let td=0;while(k<body.length){if(body[k]==='\\'){k+=2;continue}if(body[k]==='`'&&td===0)break;if(body[k]==='$'&&body[k+1]==='{'){td++;k+=2;continue}if(body[k]==='}'&&td>0){td--;k++;continue}k++}continue}
  if(c==='/'&&body[k+1]==='*'){const e=body.indexOf('*/',k+2);k=e<0?body.length:e+1;continue}
  if('[{('.includes(c))d++;else if(']})'.includes(c))d--;else if(c===','&&d===0){out.push(body.slice(start,k));start=k+1}}
 const last=body.slice(start);if(last.trim())out.push(last);return out.map(x=>x.trim()).filter(Boolean)}
const STAT=/\b(bac|suc|duc|danh|sung|tam|tamco|kh|khac|tai|dung|ev|ann|hl|tl|lk|hap|fav|oan|tc|cc|ghen|than|mau|nhan|hy|loy|tien|gold|hp|hv)\s*:\s*(-?)/g;
const EXIT=/kcMarry|\bover\(|endLife|S\.dead\s*=|die\(|kill\(|tự vẫn|xuất gia|đi tu|lụa trắng|chết|ban hoa|hòa thân|lấy chồng|Lên kiệu hoa|exit\s*:|ending|endG|toCold|lãnh cung|rời cung/;
function label(el){let m=el.match(/^\{\s*n\s*:\s*(["'`])((?:\\.|(?!\1).)*)\1/s)||el.match(/\bn\s*:\s*(["'`])((?:\\.|(?!\1).)*)\1/s);
 if(m)return m[2];m=el.match(/^[A-Za-z_$][\w$.]*\(\s*(?:[A-Za-z_$][\w$.]*\(\s*)*(["'`])((?:\\.|(?!\1).)*)\1/s);if(m)return m[2];
 m=el.match(/\bn\s*:\s*([A-Za-z_$][\w$.()]*)/);if(m)return '«'+m[1]+'»';return null}
function sig(el){const K=new Set();let m;STAT.lastIndex=0;while((m=STAT.exec(el)))K.add(m[1]+(m[2]?'-':'+'));
 const f=el.match(/\bf\s*:\s*["']([\w]+)["']/);if(f)K.add('f='+f[1]);return [...K].sort().join(' ')}
const rows=[];
for(const f of files){const s=fs.readFileSync(B+f,'utf8');const re=/\b(o|opts|ch)\s*:\s*\[/g;let m;
 while((m=re.exec(s))){const i=m.index+m[0].length-1;const j=matchClose(s,i);if(j<0)continue;const body=s.slice(i+1,j);
  const els=splitTop(body).filter(e=>/^\{|^[A-Za-z_$][\w$.]*\(/.test(e));if(els.length<2)continue;
  const L=els.map(label);if(L.filter(Boolean).length<2)continue;
  const pre=s.slice(Math.max(0,m.index-900),m.index);const hm=[...pre.matchAll(/\b(h|t|tag)\s*:\s*(["'`])((?:\\.|(?!\2).){2,120}?)\2/gs)].pop();
  const km=[...pre.matchAll(/(?:^|[,{\s])([A-Za-z_$][\w$]*)\s*:\s*\{(?=[^{}]*$)/g)].pop()||[...pre.matchAll(/(?:^|[,{\s])([A-Za-z_$][\w$]*)\s*:\s*\{/g)].pop();
  const line=s.slice(0,m.index).split('\n').length;
  const opts=els.map((e,k)=>({n:(L[k]||'?').replace(/\s+/g,' ').slice(0,70),sg:sig(e),ex:EXIT.test(e)?1:0,cancel:/^(Thôi|Lui|Đóng|Bỏ qua|Để sau)\b/.test(L[k]||'')}));
  const real=opts.filter(o=>!o.cancel);
  const grp={};real.forEach(o=>{if(o.sg)(grp[o.sg]=grp[o.sg]||[]).push(o.n)});const dup=Object.values(grp).filter(g=>g.length>1);
  const exMix=real.some(o=>o.ex)&&real.some(o=>!o.ex);
  rows.push({f,line,key:km?km[1]:'',title:hm?hm[3].replace(/\s+/g,' ').slice(0,70):'',n:real.length,opts,dup,exMix})}}
const tsv=['file\tline\tkey\ttitle\tn\tdupGroups\texitMixed\toptions'];
for(const r of rows)tsv.push([r.f,r.line,r.key,r.title,r.n,r.dup.map(g=>g.join(' = ')).join(' ; '),r.exMix?1:0,r.opts.map(o=>`${o.n}{${o.sg}}${o.ex?'!EXIT':''}`).join(' | ')].join('\t'));
fs.writeFileSync(OUT,tsv.join('\n'));
const by={};rows.forEach(r=>{const fam=r.f.replace(/\.js$/,'');by[fam]=by[fam]||{sets:0,gt3:0,dup:0,ex:0,n2:0,n3:0};const b=by[fam];b.sets++;if(r.n>3)b.gt3++;else if(r.n===3)b.n3++;else b.n2++;if(r.dup.length)b.dup++;if(r.exMix)b.ex++});
console.log('sets',rows.length,'gt3',rows.filter(r=>r.n>3).length,'dup',rows.filter(r=>r.dup.length).length,'exitMixed',rows.filter(r=>r.exMix).length);
for(const [k,b] of Object.entries(by).sort((a,b)=>b[1].sets-a[1].sets))console.log(k,JSON.stringify(b));
