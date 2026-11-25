const {chromium}=require('playwright');
(async()=>{const b=await chromium.connectOverCDP('http://127.0.0.1:9333');const p=b.contexts()[0].pages()[0];
const faces={};const done=new Set();
const face=async i=>await p.evaluate(i=>document.querySelectorAll('.modal-backdrop .memory-card')[i]?.innerHTML.replace(/\s+/g,' '),i);
const cards=()=>p.locator('.modal-backdrop .memory-card');
const n=await cards().count();
for(let guard=0;guard<40&&done.size<n;guard++){
 // find known pair
 let pair=null;const byF={};for(const [i,f] of Object.entries(faces)){if(done.has(+i))continue;(byF[f]=byF[f]||[]).push(+i)}
 for(const f in byF)if(byF[f].length>=2){pair=byF[f].slice(0,2)}
 if(pair){for(const i of pair){await cards().nth(i).click();await p.waitForTimeout(900)}pair.forEach(i=>done.add(i));await p.waitForTimeout(800);continue}
 const unk=[...Array(n).keys()].filter(i=>!done.has(i)&&!(i in faces));
 if(!unk.length)break;
 const a=unk[0];await cards().nth(a).click({timeout:4000}).catch(()=>{});await p.waitForTimeout(900);faces[a]=await face(a);
 const c=unk[1];if(c===undefined)break;
 await cards().nth(c).click({timeout:4000}).catch(()=>{});await p.waitForTimeout(900);faces[c]=await face(c);
 if(faces[a]===faces[c]){done.add(a);done.add(c)}
 await p.waitForTimeout(1000);
}
console.log(JSON.stringify(faces).slice(0,300),[...done]);
console.log((await p.evaluate(()=>document.querySelector('.modal-backdrop')?.innerText.replace(/\n+/g,' | ')||'none')).slice(0,500));
process.exit(0)})();
