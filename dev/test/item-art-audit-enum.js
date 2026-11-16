/* ITEM ART AUDIT step 1a (review/item-art-audit): every item key the game can put in front of the player, with the picture paths it would use.
   usage: node dev/test/sw-serve.js 8955 <repo root>  (other shell);  node dev/test/item-art-audit-enum.js http://localhost:8955/ <out.json>
   Sets: IT (items, fabrics, veils) · WD (WD_ITEMS garments / hairpins) · WORK (handmade kind x tier) · PET (stages) · MARK (8 ranks) · VEIL tiers.
   Static pass (item-art-audit-static.py) adds keys referenced in code that no table above knows. Pictures are checked by item-art-audit.py. */
const {chromium}=require('playwright');const fs=require('fs');const [,,BASE,OUT]=process.argv;
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});const c=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',ignoreHTTPSErrors:true});const p=await c.newPage();
 await c.route(/\.(webp|png|jpg|mp3)(\?|$)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==','base64')}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitItemInfo,null,{timeout:180000});
 const R=await p.evaluate(()=>{document.querySelectorAll('#kload').forEach(e=>e.remove());const base=(typeof IMG_BASE==="string"&&IMG_BASE)||"";const rel=s=>String(s||"").replace(base,"").replace(/^\.\//,"");const L=[];
  const add=(o)=>L.push(o);
  for(const k of Object.keys(IT)){if(IT[k].tp||k==="tp")continue;const I=kitItemInfo({k});const a=typeof itemArt==="function"?itemArt(k):null;
   add({set:(typeof WD_ITEMS==="object"&&WD_ITEMS[k])?"WD":IT[k].vl?"VEIL":"IT",key:k,name:I.name,grade:I.grade,kd:IT[k].kd||"",story:IT[k].story?1:0,small:rel(I.src),big:rel(I.src512),hasArt:!!a,hi:a?"img/hi/item-"+k+".webp":""})}
  for(const k of Object.keys(typeof WD_ITEMS==="object"?WD_ITEMS:{})){if(IT[k])continue;const w=WD_ITEMS[k];const I=kitItemInfo({k});const sm=rel(I.src);
   add({set:"WD",key:k,name:I.name,grade:I.grade,kd:w.sl,small:sm,big:sm.replace(/^img\/wd-/,"img/wd512/wd-"),hasArt:true,hi:""})}
  for(const kind of (typeof ITEM_ART_TP!=="undefined"?ITEM_ART_TP:[]))for(let ti=0;ti<4;ti++){const a=itemArt({wk:{kind,ti}});add({set:"WORK",key:`tp-${kind}-b${ti+1}`,name:"tác phẩm "+kind+" bậc "+(ti+1),grade:ti,small:rel(a.src),big:rel(a.src512),hasArt:true,hi:"img/hi/item-"+a.key+".webp"})}
  if(typeof PET==="object")for(const k of Object.keys(PET))for(const sfx of ["","-non","-tn","-lt"]){add({set:"PET",key:k+sfx,name:PET[k].n+(sfx?" "+sfx:""),grade:PET[k].tr|0,small:`img/pet-${k}${sfx}.webp`,big:`img/pet512/pet-${k}${sfx}.webp`,hasArt:true,hi:""})}
  for(let r=0;r<8;r++)add({set:"MARK",key:"me-mark-"+r,name:"dấu hiệu "+r,grade:0,small:`img/kit/me-mark-${r}.webp`,big:`img/mark512/me-mark-${r}.webp`,hasArt:true,hi:""});
  for(let t=1;t<=5;t++)add({set:"VEILPIC",key:"veil-t"+t,name:"mạng che t"+t,grade:0,small:`img/veil-t${t}.png`,big:`img/veil-t${t}.png`,hasArt:true,hi:""});
  return{L,nIT:Object.keys(IT).length,keys:{IT:Object.keys(IT),WD:Object.keys(typeof WD_ITEMS==="object"?WD_ITEMS:{})}}});
 fs.writeFileSync(OUT,JSON.stringify(R,null,1));const s={};for(const x of R.L)s[x.set]=(s[x.set]||0)+1;console.log(JSON.stringify(s),'IT keys incl tp',R.nIT);await b.close()})();
