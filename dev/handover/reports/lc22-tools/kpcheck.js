const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(3000);
const r=await p.evaluate(()=>KIT_SAMPLES.filter(s=>/kitKemRow|§12\.2/.test(s.title+s.id)).map(s=>{let h='';try{h=s.html()}catch(e){h='ERR '+e.message}return {id:s.id,t:s.title.slice(0,50),len:h.length,err:h.startsWith('ERR')?h:''}}));
console.log(JSON.stringify({r,errs:errs.slice(0,3)}));await b.close();process.exit(r.length===2&&r.every(x=>x.len>50&&!x.err)?0:1)})();
