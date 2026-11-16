/* nw-poem entry-point scan (LUẬT SỬA CẢ NHÓM): prints, for EVERY way into the Thi / Câu đối games, which engine runs, and fails if a word engine is still reachable.
   usage: node dev/test/nwpoem-scan.js <url>
   entries: contest kinds (j71 SC7 / j82 startContest), lessons (KG82_MGL via openMG), plain arts (playArt: works j83, teacher jrcp, Phúc tuyển jkc, veil jveil), engine registry, old MG table. */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 const p=await (await b.newContext({ignoreHTTPSErrors:true,viewport:{width:755,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(process.argv[2],{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;if(typeof kitRoulette==='function')kitRoulette=o=>{try{o&&o.done&&o.done()}catch(e){}};document.getElementById('title').hidden=true;try{start()}catch(e){}});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.arts,null,{timeout:60000});
 const out=await p.evaluate(()=>{const rows=[];const WORD=new Set(['verse','pair','lantern','quiz']);const eng=k=>KG82_KIND[k]&&KG82_KIND[k].e;
  for(const k of Object.keys(SC7))rows.push(['contest (j71 SC7 -> startContest)',k,kg82Kind(k,SC7[k].n,false),eng(kg82Kind(k,SC7[k].n,false))]);
  for(const k of ARTS.map(a=>a.k))rows.push(['plain art (playArt: works/teacher/Phúc tuyển/veil)',k,kg82Kind(k,'',true),eng(kg82Kind(k,'',true))]);
  for(const k of Object.keys(KG82_MGL))rows.push(['lesson (KG82_MGL via openMG)',k,KG82_MGL[k][1],eng(KG82_MGL[k][1])]);
  const bad=rows.filter(r=>WORD.has(r[3])&&/^(tho|doi)$/.test(r[2]));
  return{rows,bad,verseRegistered:!!KG82_ENG.verse,pairRegistered:!!KG82_ENG.pair,thoEngine:eng('tho'),doiEngine:eng('doi'),quizDoiBank:Object.entries(KG82_KIND).filter(([k,v])=>v.e==='quiz'&&v.b==='doi').map(x=>x[0])}});
 console.log(JSON.stringify(out,null,1));console.log('errors',errs);await b.close();process.exit(out.bad.length||out.verseRegistered||out.pairRegistered||out.quizDoiBank.length||errs.length?1:0)})();
