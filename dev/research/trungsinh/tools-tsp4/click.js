const {chromium}=require('playwright');
(async()=>{const b=await chromium.connectOverCDP('http://127.0.0.1:9333');const p=b.contexts()[0].pages()[0];
const name=process.argv[2];const wait=+(process.argv[3]||1800);
if(name!=='-'){const inM=await p.evaluate(()=>!!document.querySelector('.modal-backdrop'));
const loc=(inM?p.locator('.modal-backdrop'):p.locator('body')).getByRole('button',{name:name,exact:process.argv[4]==='x'});
try{await loc.first().click({timeout:5000});}catch(e){console.log('CLICK FAIL '+name)}
await p.waitForTimeout(wait);}
const look=require('fs').readFileSync('/tmp/ts/look.js','utf8');
console.log(await p.evaluate(new Function(look)));
process.exit(0)})();
