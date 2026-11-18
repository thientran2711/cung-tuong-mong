/* review r2 C (odds-cap): a failure written in a card's 'hỏng:' text must land in the BẠI block, never as a KÈM row.
   Static extraction of every string literal in dev/build that holds 'hỏng:' (template parts ${…} → "5"), each run through the kit's
   own kaModelStr + kaRows (j63) in the built page. Lists every literal where a 'hỏng' item ends up in R.kem.
   usage: node dev/test/kem-split-scan.js <baseURL of the site root>   (e.g. http://127.0.0.1:8765/) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const BASE=process.argv[2]||'http://127.0.0.1:8765/';
const B=path.join(__dirname,'..','build');const L=[];
for(const f of fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js').sort()){const t=fs.readFileSync(path.join(B,f),'utf8').split('\n');
 t.forEach((l,i)=>{const re=/`((?:[^`\\]|\\.)*)`|"((?:[^"\\]|\\.)*)"/g;let m;while((m=re.exec(l))){let s=m[1]!=null?m[1]:m[2];if(!/hỏng:/.test(s))continue;
  /* flatten ${…} (nested braces too) to a sample value */let o='',d=0;for(let k=0;k<s.length;k++){if(d===0&&s[k]==='$'&&s[k+1]==='{'){d=1;k++;o+='5';continue}if(d>0){if(s[k]==='{')d++;else if(s[k]==='}')d--;continue}o+=s[k]}
  L.push({at:`${f}:${i+1}`,x:o})}})}
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});for(let i=0;i<120;i++){if(await p.evaluate(()=>typeof kaRows==='function'&&typeof kaModelStr==='function'))break;await new Promise(r=>setTimeout(r,500))}
 const R=await p.evaluate(L=>L.map(e=>{try{const M=kaModelStr(e.x);const R=kaRows(M);const bad=M.items.filter(it=>it.l==="hỏng").map(it=>kaPlain(it.h)).filter(h=>R.kem.some(k=>kaPlain(k.h)===h));
   return bad.length?{at:e.at,x:e.x.slice(0,160),kem:bad}:null}catch(x){return null}}).filter(Boolean),L);
 console.log(`literals with 'hỏng:': ${L.length} · failure items shown as KÈM: ${R.length}`);for(const r of R)console.log(`${r.at}  KÈM ← hỏng: ${r.kem.join(' | ')}   «${r.x}»`);
 await b.close();process.exit(0)})();
