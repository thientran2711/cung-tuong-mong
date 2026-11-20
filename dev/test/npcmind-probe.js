/* review/npc-mind: inventory probe — for every person class, does the game hold nết / trọng / sở trường / sở thích / sở ghét?
   usage: node dev/test/npcmind-probe.js <build index.html> */
const {chromium}=require('playwright');const [,,B]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto('file://'+B,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{SLOT=2;document.getElementById('title').hidden=true;start();Q.length=0;
  const F=(f,x)=>{try{const v=f(x);return v==null?null:(Array.isArray(v)?v.join("/"):typeof v==="object"?JSON.stringify(v).slice(0,80):String(v))}catch(e){return "ERR "+e.message.slice(0,40)}};
  const has=fn=>typeof window[fn]==="function";
  const row=(cls,x)=>({cls,name:x&&x.name||String(x),
   net:F(o=>traitsOf(o),x),trong:F(o=>trongOf(o),x),
   str:F(o=>has("mindOf")?mindOf(o).str:null,x),like:F(o=>has("mindOf")?mindOf(o).like:null,x),dis:F(o=>has("mindOf")?mindOf(o).dis:(has("disOf")?disOf(o):null),x),
   keys:x&&typeof x==="object"?Object.keys(x).filter(k=>/tr|trait|like|dis|tal|art|skill|taste|str/i.test(k)).join(","):""});
  const out=[];out.push(row("player",S));
  const R=liveRivals(true);R.slice(0,3).forEach(v=>out.push(row(v.queen?"Hoàng hậu":"consort",v)));const q=rivals.find(v=>v.queen);if(q)out.push(row("Hoàng hậu",q));
  out.push(row("Emperor",S.emp));out.push(row("Thái hậu","th"));
  if(S.maid)out.push(row("close maid",S.maid));
  const sv=allServ();const m=sv.find(s=>s.role==="maid"),e=sv.find(s=>s.role==="eunuch");if(m)out.push(row("maid",m));if(e)out.push(row("eunuch",e));
  if(S.court)for(const k in S.court)out.push(row("court:"+k,S.court[k]));
  (S.men||[]).slice(0,3).forEach(x=>out.push(row("man",x)));
  const K=allKids();if(K.length)out.push(row("child",K[0][0]));
  for(const k of ["mama","mm","momo","maMa"])if(S[k])out.push(row("mama:"+k,S[k]));
  return {rows:out,stateKeys:Object.keys(S).filter(k=>/men|court|mama|kid|staff|off|quan|th[A-Z]|coop/i.test(k))}});
 console.log(JSON.stringify(r,null,1));console.log("errors",errs);await b.close()})();
