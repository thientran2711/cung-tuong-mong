const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
const ctx=await b.newContext({viewport:{width:755,height:1000},ignoreHTTPSErrors:true,serviceWorkers:'block'});
await ctx.route(/\.(webp|png|jpg)(\?|$)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==','base64')}));
const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
await p.goto(process.argv[2],{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitOptPic==='function'&&typeof KIT_CDNHAVE!=='undefined'&&KIT_CDNHAVE,null,{timeout:90000}).catch(()=>{});await p.waitForFunction(()=>KIT_ACTS&&Object.keys(KIT_ACTS.acts).length,null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(4000);
const T=JSON.parse(fs.readFileSync('dev/art/pp3/titles.json'));
const r=await p.evaluate(T=>{const NEW=new Set(["opt-de-thang","opt-noi-xau","opt-thua-trinh","khen-mot-cau-h","opt-thue-tho-theu","opt-hoa-giai","opt-ran-day","opt-xu-nghieng","opt-phan-gian","opt-than-can","opt-tin-gia","opt-tin-thuong","opt-tra-xem"]);
 const f=()=>T.map(t=>{const q=kitOptPic(t);return q.how+":"+q.key});const nw=f();const keep=KIT_OPT_RULES.slice();
 for(let i=KIT_OPT_RULES.length-1;i>=0;i--)if(NEW.has(KIT_OPT_RULES[i][1]))KIT_OPT_RULES.splice(i,1);const od=f();KIT_OPT_RULES.length=0;keep.forEach(x=>KIT_OPT_RULES.push(x));
 return T.map((t,i)=>[t,od[i],nw[i]]).filter(x=>x[1]!==x[2])},T);
console.log('titles',T.length,'changed',r.length);for(const x of r)console.log(JSON.stringify(x));console.log('errors',errs.length,errs.slice(0,2));await b.close()})()
