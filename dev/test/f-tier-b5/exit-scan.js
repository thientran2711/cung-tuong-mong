/* F-TIER-B5 (law 11): the batch-5 sets (audit v2 static.tsv exitMixed + C41/C42/C44) — for each set, read the option literals in the source and report
   per option: EXIT kind (hand-checked truth, table below), order index, and whether the option's own words name the life end (KIT_END_RE, the kit's
   life-option reader jk2b kitLifeOpt) or a death (KIT_DEADLY). A set PASSES when every exit option names its end in words and sits after every stay option
   (law 2: the exit is the NẶNG tier), and no stay option trips KIT_END_RE (a false «Cẩn thận khi lựa chọn»).
   usage: node exit-scan.js <dev/build dir> [--md]  (run on origin/main and on the branch for the before → after table) */
const fs=require('fs'),path=require('path');const D=process.argv[2]||path.join(__dirname,'../../build');const MD=process.argv.includes('--md');
const KIT_END_RE=/kiếp này dừng|kết thúc kiếp này|bị ban hoa|mất mạng|chuyển kiếp|tự vẫn|xuất gia|xuất giá|đi tu\b/i;
/* truth: f = file, a = anchor (first text of the set), o = [option name start, kind] kind: S stay · X sure exit · R rolled exit (a failure ends the life) · N exit of ANOTHER person / not her life · ✦ rare (outside the tiers) */
const SETS=require('./sets.js');
/* only what the card SHOWS: drop result-only text (story lines, end calls, log lines) before reading the words */
function vis(t){let o=t.replace(/\/\*[\s\S]*?\*\//g,""),p;do{p=o;o=o.replace(/\b(over|kcEndDo|kc2End|log|die|kcDie|deathSentence|stEnd|cold|kcRes|kcDo|kc2Go|kcEnd|kcMarry|succPick)\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\)/g,'')}while(o!==p);
 return o.replace(/\b(txt|rt|rf)\s*:\s*(["`])(?:\\.|(?!\2).)*\2/g,'').replace(/return\s*["`][^"`]*["`]/g,'')}
const rows=[];let fail=0;
for(const st of SETS){const src=fs.readFileSync(path.join(D,st.f),'utf8');const i=src.indexOf(st.a);if(i<0){rows.push([st.id,'ANCHOR MISSING','','','FAIL']);fail++;continue}
 const blk=src.slice(i,i+(st.len||6000));const pos=st.o.map(([n,k])=>{const j=blk.indexOf(n);return{n,k,j}});
 const res=pos.map(p=>{if(p.j<0)return{...p,miss:1};/* the option's own text: from its name to the next option name or 2500 chars */
  const nx=pos.filter(q=>q.j>p.j).map(q=>q.j).sort((a,b)=>a-b)[0];let end=nx||blk.length;for(const m of [']}};',']}}},',']}})','\nPEND.','\nfunction ','\n ev(']){const e=blk.indexOf(m,p.j);if(e>=0&&e<end)end=e}let t=vis(blk.slice(p.j,end));
  if(st.hint){const h=st.hint[p.n];if(h){const [hf,ha]=h.includes('|')?h.split('|'):[st.f,h];const hs=fs.readFileSync(path.join(D,hf),'utf8');const H=hs.indexOf(ha);if(H>=0)t+=' '+hs.slice(H,H+400)}}
  return{...p,named:KIT_END_RE.test(t)}});
 const order=(st.show?st.show.map(n=>res.find(r=>r.n===n)):res.filter(r=>!r.miss&&!r.k.startsWith('✦')).sort((a,b)=>a.j-b.j)).map(r=>r.k);
 const xs=order.map((k,i)=>k==='X'||k==='R'?i:-1).filter(i=>i>=0),ss=order.map((k,i)=>k==='S'||k==='N'?i:-1).filter(i=>i>=0);const exitsLast=!xs.length||!ss.length||Math.min(...xs)>Math.max(...ss);
 const exitNamed=res.filter(r=>r.k==='X'||r.k==='R'||r.k==='✦X').every(r=>r.named&&!r.miss);
 const falseWarn=res.filter(r=>(r.k==='S'||r.k==='N')&&r.named&&!st.okName?.includes(r.n));
 const miss=res.filter(r=>r.miss);
 const ok=exitNamed&&(exitsLast||st.order==='save-index')&&!falseWarn.length&&!miss.length;if(!ok)fail++;
 rows.push([st.id,st.f+' '+st.t,res.map(r=>`${r.k}${r.named?'·named':''}${r.miss?'·MISSING':''} «${r.n.slice(0,28)}»`).join(' / '),
  [exitNamed?'':'exit not named',exitsLast?'':st.order==='save-index'?'exit not last (kept: kc3 pending card stores odds by option index, a reorder would break an old save)':'exit not last',falseWarn.length?'false warn: '+falseWarn.map(r=>r.n).join(','):'',miss.length?'missing option':''].filter(Boolean).join('; ')||'-',ok?'PASS':'FAIL'])}
if(MD){console.log('| set | where | options (kind · named) in order | fault | verdict |\n|---|---|---|---|---|');for(const r of rows)console.log('| '+r.join(' | ')+' |')}
else for(const r of rows)console.log(r.join('\t'));
console.log(`${rows.length} sets, ${rows.length-fail} PASS, ${fail} FAIL`);process.exit(0)
