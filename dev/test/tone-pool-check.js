/* static check of the tone-pool data files (VOICE BY TÍNH TÌNH): node dev/test/tone-pool-check.js [files]; no file given = every dev/build/jtone*.js
   (review voice-trait-r1: with no argument it used to scan nothing and print "0 pools"). Pools spoken only by the Thái hậu (th*) / the Emperor (emp*) need
   only the tones BAL.voice.tone.th / .emp can give (read from jbal2.js, ONE CORE); {x} = the greet subject (jgreet gmOpts).
   every pool: 8 tones, >=10 lines each, no duplicate inside a tone, no line shared by two tones, no digit / %, only known {placeholders} */
const fs=require('fs'),vm=require('vm');
const TONES=["Ân cần","Lạnh lùng","Nóng nảy","Điềm tĩnh","Nhiều chuyện","Kín đáo","Kiêu ngạo","Khiêm nhường"];
const OK=new Set(["goi","Goi","xung","Xung","ten","Ten","P","R","I","p","d","V","x"]);
const path=require('path'),B=path.join(__dirname,'..','build');
const bal=fs.readFileSync(path.join(B,'jbal2.js'),'utf8'),vals=k=>{const m=bal.match(new RegExp('tone:\\{[^]*?\\b'+k+':\\{([^}]*)\\}'));return m?[...new Set([...m[1].matchAll(/:"([^"]+)"/g)].map(x=>x[1]))]:null};
const REQ={th:vals('th'),emp:vals('emp')};const req=k=>(/^th[A-Z]/.test(k)&&REQ.th)||(/^emp[A-Z]/.test(k)&&REQ.emp)||TONES;
const FILES=process.argv.length>2?process.argv.slice(2):fs.readdirSync(B).filter(f=>/^jtone.*\.js$/.test(f)).sort().map(f=>path.join(B,f));
let bad=0,pools=0,lines=0;
for(const f of FILES){const w={};w.window=w;vm.runInNewContext(fs.readFileSync(f,'utf8'),w);const P=w.TONE_POOL||{};
 for(const k in P){pools++;const seen=new Map();for(const t of req(k)){const L=P[k][t];if(!Array.isArray(L)){console.log(`${k}: missing tone ${t}`);bad++;continue}
  if(L.length<10){console.log(`${k}/${t}: only ${L.length}`);bad++}if(new Set(L).size!==L.length){console.log(`${k}/${t}: duplicate`);bad++}
  for(const x of L){lines++;const s=String(x);if(seen.has(s)){console.log(`${k}: shared by ${seen.get(s)} and ${t}: ${s}`);bad++}seen.set(s,t);
   if(/%|\d/.test(s)){console.log(`${k}/${t}: digit/% in: ${s}`);bad++}for(const m of s.matchAll(/\{(\w+)\}/g))if(!OK.has(m[1])){console.log(`${k}/${t}: unknown {${m[1]}}: ${s}`);bad++}
   if(/^\s|\s$|\s\s/.test(s)){console.log(`${k}/${t}: stray spaces: ${s}`);bad++}}}
  for(const t in P[k])if(!TONES.includes(t)){console.log(`${k}: unknown tone key ${t}`);bad++}}}
console.log(`${pools} pools, ${lines} lines, ${bad?bad+' PROBLEMS':'OK'}`);process.exit(bad?1:0);
