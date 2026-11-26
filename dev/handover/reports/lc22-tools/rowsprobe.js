const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(3000);
const r=await p.evaluate(()=>{const h=KIT_SAMPLES.map(s=>{try{return s.html()}catch(e){return ''}}).join(' ');const t=h.replace(/<[^>]+>/g,' ');
 const c=re=>(t.match(re)||[]).length;return {bai:c(/BẠI/g),tonKhong:c(/Tốn\s*:?\s*không/g),duocKhong:c(/Được\s*:?\s*không/g),ton:c(/Tốn/g),duoc:c(/Được/g),rowNil:typeof kitRowNil}});
console.log(JSON.stringify({r,errs:errs.slice(0,3)}));await b.close()})();
