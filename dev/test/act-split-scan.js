/* ACT SPLIT W2 family scan (LUẬT SỬA CẢ NHÓM): for EVERY festival and EVERY j71 variant of its dialog, count (a) the festival dialogs that
   reach her on the day and (b) the duplicate acts between this year's j71 act and the light acts (AS_SAME families + "Thả đèn" vs the
   Hành sự lantern card), BEFORE (j31 FESTEV + j7 month event + j71, all unfiltered) and AFTER (j71 at day start; light acts at the place,
   filtered). usage: node dev/test/act-split-scan.js <url>   → a markdown table + "DUP_AFTER n" */
const {chromium}=require('playwright');const fs=require('fs');
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await p.waitForTimeout(3000);await p.evaluate(LIB);
 const R=await p.evaluate(()=>{for(let i=0;i<12;i++){AA.scen('cao');if(!adSrv()&&!S.out&&!S.dead)break}S.bac=500;const rows=[];
  const same=(t,n)=>AS_SAME.some(([a,b])=>a.test(n)&&b.test(t))||(/Thả đèn/.test(n)&&/thả đèn|Thả đèn/i.test(t));
  for(const k of Object.keys(FEST)){const F=FEST[k];S.month=F.m;S.tuan=F.t[0];S.buoi=BUOI.length-1;used=0;Q.length=0;
   const light=AS_LIGHT[k]?AS_LIGHT[k]().opts.map(o=>o.n):[];let j7=[];const jid=AS_J7F[k];if(jid&&EVI[jid]){try{const pp=EVI[jid].pp?EVI[jid].pp():{};const d=PEND[jid](pp||{});j7=(d&&d.o||[]).map(o=>o.n)}catch(e){}}
   let card=[];try{deal();card=deck.filter(a=>/Thả đèn/.test(a.n)).map(a=>a.n)}catch(e){}
   const V=(FV7[k]||[]);let dupB=0,dupA=0,n=0;const ex=new Set();
   for(let vi=0;vi<V.length;vi++){let t="";try{const m=fMake7(k,vi);t=String(m&&m.t||"")}catch(e){}if(!t)continue;n++;
    const before=[...light,...j7,...card];const db=before.filter(x=>same(t,x)||(x==="Thả đèn cầu con"&&card.length));dupB+=db.length;db.forEach(x=>ex.add(x));
    S.adF71={y:S.year,k,t};let after=[];if(AS_LIGHT[k]){const O=AS_LIGHT[k]().opts.filter(o=>!(k==="nguyentieu"&&o.n==="Thả đèn cầu con"));after.push(...asLightOpts(k,O).map(o=>o.n))}
    if(j7.length){after.push(...asLightOpts(k,j7.map(n=>({n}))).map(o=>o.n))}after.push(...card);
    const da=after.filter(x=>same(t,x)&&!/^Thả đèn hoa đăng$/.test(x));dupA+=da.length}
   S.adF71=null;
   rows.push({k,name:F.name,place:AS_FPLACE[k]||"",dlgB:1+(AS_LIGHT[k]?1:0)+(j7.length?1:0),dlgA:1,atPlace:(AS_LIGHT[k]||j7.length)?1:0,variants:n,dupB,dupA,ex:[...ex].join(", ")})}
  return rows});
 console.log('| festival | place (after) | festival dialogs on the day before → after (+ at the place) | j71 variants | duplicate acts before → after (sum over variants) | duplicated acts (before) |');
 console.log('|---|---|---|---|---|---|');let da=0;
 for(const r of R){da+=r.dupA;console.log(`| ${r.name} | ${r.place?PLN(r.place):"—"} | ${r.dlgB} → ${r.dlgA}${r.atPlace?" (+1 when she goes)":""} | ${r.variants} | ${r.dupB} → ${r.dupA} | ${r.ex||"—"} |`)}
 function PLN(k){return {thu:"Cần Chính điện",vuon:"Ngự hoa viên",tn:"Đức Thọ cung",cnh:"Dãy nhà cung nhân"}[k]||k}
 console.log('DUP_AFTER',da,'errs',perr.length,perr.slice(0,3));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
