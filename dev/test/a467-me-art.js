/* act-pics2 a467 (Tổng lược "Việc của ngươi"): her lines show ONLY a picture made for the line (ACTS log rule / place / act name);
   "-" or no match → NO picture; never an event-group (KBK_EVRE) or act-category stand-in, never the "Có người đến" room.
   usage: node dev/test/a467-me-art.js <build url> <corpus.txt>  (corpus: dev/figwork/acts/corpus.py output, one sentence per line)
   Prints counts for ctx "me" (new rule) next to ctx "p" (other people's pages = the old "me" path) and exits 1 when a "me" line
   gets a picture that kbkSpecific / its place does not give it, or on page errors. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,CORP]=process.argv;
const lines=fs.readFileSync(CORP,'utf8').split('\n').filter(Boolean);
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL+'index.html',{waitUntil:'domcontentloaded',timeout:120000});
 await p.waitForFunction(()=>typeof kbkArt==='function'&&typeof KIT_ACTS!=='undefined'&&KIT_ACTS.log&&KIT_ACTS.log.length>100&&typeof EVART!=='undefined'&&EVART&&EVART.categories,null,{timeout:120000});
 const r=await p.evaluate(L=>{const out={};const kd=new Set(((EVART.categories["khach-den"]||{}).files)||[]);
  for(const ctx of ["me","p"]){const F=kbkArt(L.map(t=>({text:t})),ctx);const C={none:0,own:0,group:0,actCat:0,khachDen:0,bad:[]};
   F.forEach((f,i)=>{const a=f.art||"";if(!a){C.none++;return}const own=a===kbkSpecific(L[i])||/^Đến /.test(L[i]);
    if(own)C.own++;else{if(kd.has(a))C.khachDen++;if(/act-cat-/.test(a))C.actCat++;else C.group++;if(C.bad.length<8)C.bad.push(L[i].slice(0,60)+" → "+a.split('/').pop())}});
   out[ctx]=C}return out},lines);
 console.log(JSON.stringify({lines:lines.length,me:r.me,p_oldPath:r.p,errs},null,1));await b.close();
 process.exit(r.me.group||r.me.actCat||r.me.khachDen||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
