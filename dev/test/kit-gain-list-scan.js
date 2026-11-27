/* OB-KIEP (owner 25/11 ~22:40Z «chữ tràn lan đại hải»; law 11 whole family) — KIT §6.6 GAIN LIST scan.
   Corpus = every option / act line in dev/build/j*.js that carries «thành:» / «hỏng:» / «kèm:» / «tốn:» (string and template literals, ${…} → «X»).
   Each line goes through the kit model (kaModelStr → kaRows) in the real game page; per Tốn/Được/Mất/Kèm row:
     WALL  = the row that would be one «·» run over KA_LIST.chars (or an item over KA_LIST.long) — LIVE printed all of them inline;
     LIST  = kaListCls() now gives .klist (one item per line) / .klist2 (2–3 columns);
     MISLABEL = a loss / risk word inside Được (a gain row): «sụp đổ», «tịch thu», «mất mạng», «chết», «bị phạt», «bị giáng», «muộn … mới».
   usage: node dev/test/kit-gain-list-scan.js <url> [--fail]   (exit 1 with --fail when a WALL row is not a LIST or a MISLABEL is found) */
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const [,,URL0,FLAG]=process.argv;const B=path.join(__dirname,'../build');
const files=fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f));const corpus=[];
for(const f of files){const s=fs.readFileSync(path.join(B,f),'utf8');const re=/(["`])((?:\\.|(?!\1)[^\\])*?)\1/gs;let m;
 while((m=re.exec(s))){let t=m[2];if(!/(^|[\s·"])(thành|hỏng|kèm|tốn)\s*:/.test(t)||t.length<12||t.length>1500)continue;
  if(m[1]==='`'){let d=0,o='';for(let i=0;i<t.length;i++){if(t[i]==='$'&&t[i+1]==='{'&&d===0){d=1;i++;o+='X';continue}if(d){if(t[i]==='{')d++;else if(t[i]==='}')d--;continue}o+=t[i]}t=o}
  if(/[<>]/.test(t.replace(/<\/?(b|span)[^>]*>/g,'')))continue;corpus.push({f,line:s.slice(0,m.index).split('\n').length,t})}}
(async()=>{const px=process.env.HTTPS_PROXY;const br=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const p=await br.newPage();
 await p.route(/ctm-img|\.webp|\.mp3|\.ogg/,r=>r.abort());await p.goto(URL0,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kaModelStr==='function'&&typeof kaRows==='function',null,{timeout:120000});
 const res=await p.evaluate(C=>{const has=typeof kaListCls==='function';const MIS=/(sụp đổ|tịch thu|mất mạng|chết|bị phạt|bị giáng|muộn .* mới)/i,RIVAL=/(^|\s)(nàng|hắn|kẻ đó|y thị)(\s|$)/i;/* harm to a rival is her gain */
  /* the «Con đường» lines of every home-road origin, built live (the tội thần text is a runtime replace, not a literal) */
  const out0=[];window.__kcerr=out0;const S0=S;for(const k of (typeof KC==='object'?KC.ok:[]).concat(typeof KC2K==='object'?Object.keys(KC2K):[])){try{S=Object.assign({},S0||{},{origin:originByKey(k),kc:null,kcPick:'cung'});const d=document.createElement('div');d.innerHTML=kcPathHTML();d.querySelectorAll('button small').forEach((sm,i)=>C.push({f:'kcPathHTML['+k+']',line:i+1,t:sm.innerHTML}))}catch(e){out0.push(k+':'+e.message)}}S=S0;const out={lines:C.length,rows:0,wall:0,list:0,list2:0,wallNotList:[],mis:[],has};
  const LB={ton:'Tốn',duoc:'Được',mat:'Mất',kem:'Kèm'};out.lines=C.length;out.kcerr=window.__kcerr;
  for(const c of C){let R;try{R=kaRows(kaModelStr(c.t))}catch(e){continue}
   for(const k of ['ton','duoc','mat','kem']){const L=R[k]||[];if(!L.length)continue;
    for(const b of ['t','b','a','']){const LL=L.filter(x=>(x.b||'')===b);if(!LL.length)continue;out.rows++;
     const n=LL.map(x=>kaPlain(x.h).length),tot=n.reduce((a,b)=>a+b,0)+3*(LL.length-1),mx=Math.max(...n);const wall=LL.length>=2&&(tot>56||mx>40);if(wall)out.wall++;
     const cls=has?kaListCls(k,LL):'';if(/klist2/.test(cls))out.list2++;if(/klist/.test(cls))out.list++;if(wall&&!/klist/.test(cls))out.wallNotList.push(`${c.f}:${c.line} ${LB[k]} (${LL.length} mục, ${tot} chữ)`);
     if(k==='duoc')LL.forEach(x=>{const t=kaPlain(x.h);if(MIS.test(t)&&!RIVAL.test(t))out.mis.push(`${c.f}:${c.line} Được «${t.slice(0,90)}»`)})}}}
  return out},corpus);
 if(res.kcerr&&res.kcerr.length)console.log('kcPath errors',res.kcerr.join(' / '));console.log(`KIT §6.6 gain-list scan · ${res.lines} option lines · ${res.rows} Tốn/Được/Mất/Kèm rows · WALL rows (one «·» run over the limit) ${res.wall} · now LIST ${res.list} (of them 2–3 columns ${res.list2}) · WALL not LIST ${res.wallNotList.length} · MISLABEL (loss/risk in Được) ${res.mis.length}`);
 res.wallNotList.slice(0,30).forEach(x=>console.log('  WALL',x));res.mis.slice(0,60).forEach(x=>console.log('  MIS ',x));
 await br.close();if(FLAG==='--fail'&&(res.wallNotList.length||res.mis.length))process.exit(1)})();
