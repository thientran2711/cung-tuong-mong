/* review/kit-opt-kem (K-OPT-KEM, rv maid-8tabs ROUND 2 notes; whole family, law 11 + law 4):
   (1) a number-less «kèm» / «hỏng» phrase of an option line («ít gặp Hoàng thượng», «chủ ít thấy mặt ngươi») is a real side effect: it gets its row in the card (kaRows) AND is an item of the hint model (kitOptModel), never a note;
       ONLY the night «reading of the moment» («ngài …, rất hợp», «an toàn») stays a note. A scan over every raw option line of the sample set prints before/after.
   (2) a Sủng number shown on an option card == the number the game applies (law 4): fmt() and apply() both go through sg() (Emperor traits nồng nàn ×1.3 / lạnh lùng ×.7): for every trait combo and v in -3..3 the shown value equals the applied delta.
   usage: node dev/test/kit-opt-kem.js <url> */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kaModelStr==='function',null,{timeout:240000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}});await p.waitForTimeout(800);
 const r=await p.evaluate(()=>{const f=[];const LINES=[
   ["consort kèm","Khá chắc · tốn: Chủ tin -2 · thành: 2 tuần: mưu hại ít đi một nửa · hỏng: không mất gì · kèm: Sủng -2 · ít gặp Hoàng thượng",["ít gặp Hoàng thượng"],0],
   ["maid kèm","Chắc · tốn: 1 khắc · thành: Danh +1 · kèm: Sủng -2 · chủ ít thấy mặt ngươi",["chủ ít thấy mặt ngươi"],0],
   ["hỏng text","Liều · tốn: 1 khắc · thành: Sủng +3 · hỏng: Danh -2 · bị nghi ngờ",["bị nghi ngờ"],0],
   ["night reading","Khá chắc · thành: đêm vui, Sủng +3 · hỏng: đêm nhạt, Sủng +1 · ngài trọng tài, rất hợp",[],1],
   ["night safe","Chắc · thành: đêm vui, Sủng +3 · hỏng: đêm nhạt, Sủng +1 · an toàn",[],1]];
  const rows=[];for(const [n,s,must,note] of LINES){const R=kaRows(kaModelStr(s));const O=kitOptModel({x:s});const cardTxt=[...R.kem,...R.mat,...R.duoc,...R.ton].map(x=>kaPlain(x.h));const items=O.items.map(i=>i.p);
   for(const m of must){if(!cardTxt.some(t=>t.includes(m)))f.push(n+': «'+m+'» missing from the card rows');if(!items.some(t=>t.includes(m)))f.push(n+': «'+m+'» missing from the hint model items');if(O.notes.some(t=>t.includes(m)))f.push(n+': «'+m+'» is a note')}
   if(note&&!O.notes.length)f.push(n+': the night reading is no longer a note');if(!note&&O.notes.length)f.push(n+': unexpected notes '+JSON.stringify(O.notes));rows.push(n+' → card '+JSON.stringify(cardTxt)+' notes '+JSON.stringify(O.notes))}
  const T=[[],['nongnay'],['lanhlung'],['nongnay','lanhlung']],keep=S.emp.traits.slice();const mm=[];
  for(const tr of T){S.emp.traits=tr.slice();for(const v of [-3,-2,-1,1,2,3]){S.sung=50;const shown=(String(fmt({sung:v})).replace(/<[^>]+>/g,'').match(/[+\-−]?\s?\d+/)||[''])[0].replace(/\s|−/g,m=>m==='−'?'-':'');apply({sung:v});const got=S.sung-50;if(+shown!==got)mm.push(tr.join('+')+' v='+v+' shown '+shown+' applied '+got)}}
  S.emp.traits=keep;if(mm.length)f.push('Sủng shown != applied: '+mm.join('; '));
  return {f,rows}});
 r.rows.forEach(x=>console.log(x));if(errs.length)r.f.push('errors '+errs.join('|'));console.log(r.f.length?'FAIL '+r.f.join(' | '):'PASS');await b.close();process.exit(r.f.length?1:0)})();
