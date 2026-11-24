/* robot10-coop STUCKCAP proof (Foreman E child6 19:39Z; U19 / U20 «STUCK REPRO / CHECK»: a night-event picture «Đêm lạnh nhạt / Đêm mặn nồng»
   sits over an open dialog and covers its first button; only the first stuck room kept a shot, the rest a state line).
   Synthetic overlay test (box saves are not in git): a real game dialog (pushDil → #modal), then the real night-end picture (jne kitNightEnd →
   j93 kmStage «kne-ov», manual) on top. STUCKCAP (read from dev/measure/robot10-coop.js, the exact function the runner calls) must report:
   (a) without the picture: the dialog title + every button ok; (b) with it: the night picture named, the dialog's buttons COVERED by the .kmov layer.
   Also renders the «## Stuck rooms» bug-file section from the same source with these two captures.
   usage: python3 dev/build/assemble.py && node dev/test/r10c-stuckcap.js fold|ipad <save.json> (any save, e.g. review/robot10-saves-r5 R8-cautious-3.json)   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const SRC=fs.readFileSync(path.join(__dirname,'../measure/robot10-coop.js'),'utf8');
const m=SRC.match(/const STUCKCAP=(\(\)=>\{[\s\S]*?\n\}\);?|\(\)=>\{[\s\S]*?vh:innerHeight\}\});/);if(!m){console.log('FAIL STUCKCAP not found in robot10-coop.js');process.exit(1)}
const CAP=m[0].replace(/^const STUCKCAP=/,'').replace(/;$/,'');
const sec=SRC.match(/  \.\.\.\(\(\)=>\{const R=done\.flatMap\(r=>\(r\.stuck[\s\S]*?\}\)\(\),\n/);if(!sec){console.log('FAIL «Stuck rooms» section not found');process.exit(1)}
const DEV=process.argv[2]==='ipad'?{width:1180,height:820}:{width:755,height:1000};
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:DEV,deviceScaleFactor:1});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
 const p=await ctx.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof kitNightEnd==='function',null,{timeout:120000});await p.waitForTimeout(800);
 const sv=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));await p.evaluate(d=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=1;Q=[];deser(d);try{closeModal()}catch(e){}try{render()}catch(e){}},sv);await p.waitForTimeout(1500);
 /* clear whatever the new life opened, then ONE known dialog */
 await p.evaluate(()=>{try{document.querySelectorAll('.kmov,#klife,#kload,#kroul,#kroulw').forEach(e=>e.remove())}catch(e){}Q.length=0;try{closeModal()}catch(e){}
  pushDil({t:"<p>Thử: một việc cần chọn.</p>",o:[{n:"Hướng dẫn",fx:{}},{n:"Thôi, không chơi",fx:{}}]},"Việc thử STUCKCAP");try{showModal()}catch(e){}});
 await p.waitForTimeout(600);const a=await p.evaluate('('+CAP+')()');
 await p.evaluate(()=>{try{kitNightEnd({tier:"cold",before:{sung:S.sung,an:S.an||0}})}catch(e){console.error(e)}});await p.waitForTimeout(+(process.env.NEWAIT||2500));
 const c=await p.evaluate('('+CAP+')()');const shot=path.join(process.env.SHOTS||'/tmp','r10c-stuckcap-'+(process.argv[2]||'fold')+'.png');await p.screenshot({path:shot});
 await b.close();
 const md=new Function('done',"return ["+sec[0]+"]")([{job:{id:'p0-test'},stuck:[{room:'TEST',n:1,week:7,seats:[Object.assign({seat:'host',dev:'fold',shot:'shots/a.png'},a),Object.assign({seat:'guest',dev:'ipad',shot:'shots/b.png'},c)]}]}]).join('\n');
 const dl=x=>(x.layers||[]).find(L=>/#modal/.test(L.layer));const A=dl(a),C=dl(c);
 const chk=[['before: #modal layer found with its title',!!A&&/Việc thử STUCKCAP|Thử: một việc/.test(A.title)],['before: both buttons listed and ok',!!A&&['Hướng dẫn','Thôi, không chơi'].every(t=>A.buttons.some(x=>x.label.includes(t)&&x.ok))],
  ['after: night picture named',(c.nightPic||[]).length>0&&(c.scene||[]).some(s=>/kne-ov/.test(s))],['after: dialog buttons COVERED by the .kmov layer',!!C&&C.buttons.filter(x=>/Hướng dẫn|Thôi, không chơi/.test(x.label)).length===2&&C.buttons.filter(x=>/Hướng dẫn|Thôi, không chơi/.test(x.label)).every(x=>!x.ok&&/kmov|kne/.test(x.by||''))],
  ['bug file: one row per seat with COVERED',/## Stuck rooms \(1;/.test(md)&&(md.match(/\| p0-test \|/g)||[]).length===2&&/\*\*COVERED\*\* by/.test(md)]];
 console.log(md);console.log('before',JSON.stringify(a).slice(0,600));console.log('after ',JSON.stringify(c).slice(0,900));console.log('shot '+shot);
 let bad=0;for(const [t,ok] of chk){if(!ok)bad++;console.log((ok?'ok   ':'FAIL ')+t)}process.exit(bad?1:0)})();
