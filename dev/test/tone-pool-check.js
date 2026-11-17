/* static check of a tone-pool data file (VOICE BY TÍNH TÌNH): node dev/test/tone-pool-check.js dev/build/jtone_b1.js [more files]
   every pool: 8 tones, >=10 lines each, no duplicate inside a tone, no line shared by two tones, no digit / %, only known {placeholders} */
const fs=require('fs'),vm=require('vm');
const TONES=["Ân cần","Lạnh lùng","Nóng nảy","Điềm tĩnh","Nhiều chuyện","Kín đáo","Kiêu ngạo","Khiêm nhường"];
const OK=new Set(["goi","Goi","xung","Xung","ten","Ten","P","R","I","p","d","V"]);
let bad=0,pools=0,lines=0;
for(const f of process.argv.slice(2)){const w={};w.window=w;vm.runInNewContext(fs.readFileSync(f,'utf8'),w);const P=w.TONE_POOL||{};
 for(const k in P){pools++;const seen=new Map();for(const t of TONES){const L=P[k][t];if(!Array.isArray(L)){console.log(`${k}: missing tone ${t}`);bad++;continue}
  if(L.length<10){console.log(`${k}/${t}: only ${L.length}`);bad++}if(new Set(L).size!==L.length){console.log(`${k}/${t}: duplicate`);bad++}
  for(const x of L){lines++;const s=String(x);if(seen.has(s)){console.log(`${k}: shared by ${seen.get(s)} and ${t}: ${s}`);bad++}seen.set(s,t);
   if(/%|\d/.test(s)){console.log(`${k}/${t}: digit/% in: ${s}`);bad++}for(const m of s.matchAll(/\{(\w+)\}/g))if(!OK.has(m[1])){console.log(`${k}/${t}: unknown {${m[1]}}: ${s}`);bad++}
   if(/^\s|\s$|\s\s/.test(s)){console.log(`${k}/${t}: stray spaces: ${s}`);bad++}}}
  for(const t in P[k])if(!TONES.includes(t)){console.log(`${k}: unknown tone key ${t}`);bad++}}}
console.log(`${pools} pools, ${lines} lines, ${bad?bad+' PROBLEMS':'OK'}`);process.exit(bad?1:0);
