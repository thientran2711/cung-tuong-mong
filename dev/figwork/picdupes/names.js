// node names.js <build url> <out.json> : act names built from game data (pet types, places) for the ACTS patch
const {chromium}=require('playwright');const fs=require('fs');const [,,BASE,OUT]=process.argv;
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
const p=await (await b.newContext({serviceWorkers:'block'})).newPage();await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');
const r=await p.evaluate(()=>{const places_=()=>{try{return places()}catch(e){return []}};const lc=s=>s.replace(/^./,c=>c.toLowerCase());const pets=Object.values(PET).map(T=>lc(T.n));
 const PL=[];try{for(const x of places_())PL.push(x.n)}catch(e){}
 return {pets:[...new Set(pets)],places:[...new Set(PL)]}});
fs.writeFileSync(OUT,JSON.stringify(r,null,1));console.log(r.pets.length,r.places.length);await b.close()})();
