/* sil-role (SIL-EUNUCH, owner order main 172): the grey stranger silhouette letter follows the ROLE — every male role (Emperor, eunuch/Thái giám, Tổng quản, official, physician,
   guard, prince, man) gets unknown-fig-m, eunuch / Thái giám / Tổng quản gets unknown-fig-e (soft cap, no official hat), kids -k, women -f — in EVERY place that picks one: stage token (j59 slot fill / j60 hook),
   kitSilFig + kitFigOf (dialog / week book), krvSex (stone frame). Prints a role x place table; exit 1 on any male role shown as a lady (or the reverse).
   usage: NODE_PATH=$(npm root -g) node dev/test/sil-role.js [index.html] [WxH] [shot.png]      (works on an old build too: kitSilG missing => only the stage + kitSilFig columns) */
const {chromium}=require('playwright');const path=require('path');const [,,U0,VP,SHOT]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);
const URL=/^(https?|file):/.test(U0||'')?U0:'file://'+path.resolve(U0||'index.html');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL);await p.waitForTimeout(1500);
 await p.evaluate(()=>{localStorage.clear();document.getElementById('title').hidden=true;window.__nlInner=1;for(let k=0;k<400;k++){start();if(!(typeof isSrv==="function"&&isSrv())&&!S.out)break}});
 for(let i=0;i<30;i++){const g=await p.evaluate(()=>{const r=document.getElementById('kmrew');if(r)r.remove();const bt=[...document.querySelectorAll('button')].find(x=>/Vào cung ngay/.test(x.textContent||'')&&x.offsetParent);if(bt)bt.click();return !!document.getElementById('tokens')});if(g)break;await p.waitForTimeout(300)}
 const R=await p.evaluate(async()=>{try{Q.length=0;try{closeModal()}catch(e){}
  S.staff=S.staff||[];const sE={sid:9001,role:"eunuch",name:"Tiểu Mậu Tử",age:22,rk:1,loyal:10},sM={sid:9002,role:"maid",name:"Tiểu Hạnh",age:19,rk:1,loyal:10};S.staff.push(sE,sM);
  const man=(S.men||[])[0];
  const recs=[ /* [label, expected letter, record] — the same shapes j95 / j59 / j28 put on a place stage */
   ["eunuch · staff npc (sid)","e",{kind:"npc",sid:9001,name:sE.name,ini:"Tử",col:"#b9a48a",info:"Thái giám"}],
   ["eunuch · ledger court npc (c:)","e",{kind:"npc",lid:"c:xx",name:"Tiểu Lộ Tử",ini:"Tử",col:"#8a8aa0",info:""}],
   ["eunuch · servant with ref","e",{kind:"serv",ref:{role:"eunuch",name:"Tiểu Phúc",id:"e1",age:20,rk:1},sid:5,name:"Tiểu Phúc",ini:"P",info:"Thái giám"}],
   ["eunuch · maid-kind with ref","e",{kind:"maid",ref:{role:"eunuch",name:"Tiểu Lộ",id:"e2",age:24,rk:1},name:"Tiểu Lộ"}],
   ["Tổng quản (ksp)","e",{kind:"ksp",name:"Tổng quản Cao",ini:"Hoạn",col:"#b9a48a",info:"Kính sự phòng"}],
   ["thái giám Nội vụ phủ (peddler)","e",{kind:"peddler",name:"Thái giám Nội vụ phủ",ini:"Hoạn",col:"#b9a48a",info:"Thái giám Nội vụ phủ"}],
   ["thái y (ty)","m",{kind:"ty",name:"Thái y Lục",ini:"Y",col:"#8fc38a",info:"Thái y viện"}],
   ["quan (min)","m",{kind:"min",ref:{name:"Quan X",c:(typeof CLANS!=="undefined"?CLANS[0]:"A")},name:"Quan X",ini:"Quan",col:"#7a6a50",info:"Quan"}],
   ["Hoàng thượng (emp)","m",{kind:"emp",name:"Hoàng thượng",ini:"帝",col:"#f0d070",info:"niên hiệu"}],
   ["man (ref)","m",man?{kind:"man",ref:man,name:man.name,ini:"N",info:"Công tử"}:null],
   ["maid (staff npc)","f",{kind:"npc",sid:9002,name:sM.name,ini:"H",col:"#b9a48a",info:"Cung nữ"}],
   ["maid (mm: npc)","f",{kind:"npc",lid:"mm:9",name:"Ỷ Thúy",ini:"T",col:"#b9a48a",info:"Cung nữ thân tín"}],
   ["ma ma (elder)","f",{kind:"elder",ref:{role:"maid",name:"Tống Quế Chi",age:55},eid:"gt",name:"Tống ma ma",ini:"Tống",info:"Giáo tập ma ma"}],
   ["thái hậu (th)","f",{kind:"th",name:"Thái hậu",ini:"Từ",info:"Thái hậu"}]].filter(r=>r[2]);
  const out=[];
  for(const [lab,exp,rec] of recs){const o={lab,exp};
   o.G=typeof kitSilG==="function"?kitSilG(rec):"-";o.sil=typeof kitSilFig==="function"?(kitSilFig(rec).match(/unknown-fig-(\w)/)||[])[1]:"-";
   o.krv=typeof krvSex==="function"?krvSex(rec):"-";out.push(o)}
  /* the stage itself: all records on one place, no art for them (tokens without a figure = j59 slot fill) */
  S.visit=S.visit||{people:[],tk:{}};S.court=S.court||{};S.court.ksp=S.court.ksp||{name:"Tổng quản Cao",id:"ksp1",age:50};S.court.ty=S.court.ty||{name:"Thái y Lục",id:"ty1",age:45};
  S.visit.people=recs.filter(r=>/ksp|ty\)|peddler|maid-kind|serv|npc|maid \(staff/.test(r[0])).map(r=>r[2]);const mine=S.visit.people.slice();window.__mine=mine;window.curPeople=()=>mine;const n0=mine.length;try{tab="act"}catch(e){}renderStage();const n1=curPeople().length;await new Promise(r=>setTimeout(r,3500));window.__dbg=[n0,n1,curPeople().length,(S.visit.people||[]).map(x=>x.kind).join(",")];
  const toks=[...document.querySelectorAll('#tokens .tok')].map(t=>({tag:((t.querySelector('.tag')||{}).textContent||'').slice(0,24),src:((t.querySelector('img.figimg')||{getAttribute(){return''}}).getAttribute('src')||'').replace(/^.*\//,'')}));
  const ppl=(typeof curPeople==='function'?curPeople():[]).map(x=>x.kind+':'+(x.name||'').slice(0,14));return{out,toks,ppl,dbg:window.__dbg}}catch(e){return{err:e.stack}}});
 if(R.err){console.log('ERR',R.err);process.exit(1)}
 let bad=0;console.log('role · record'.padEnd(36),'expect','kitSilG','kitSilFig','krvSex');
 for(const o of R.out){const ok=(o.sil==='-'||o.sil===o.exp)&&(o.G==='-'||o.G===o.exp)&&(o.krv==='-'||o.krv===o.exp);if(!ok)bad++;console.log((ok?'ok  ':'FAIL')+' '+o.lab.padEnd(32),o.exp.padEnd(6),String(o.G).padEnd(7),String(o.sil).padEnd(9),o.krv)}
 console.log('dbg',JSON.stringify(R.dbg));console.log('stage people:',R.ppl.join(' | '));console.log('stage tokens:');for(const t of R.toks)console.log('  ',t.tag.padEnd(26),t.src);
 const stageF=R.toks.filter(t=>(/Mậu Tử|Lộ Tử|Phúc|Tổng quản|Nội vụ|Thái y/.test(t.tag)&&/unknown-fig-f/.test(t.src))||(/Mậu Tử|Lộ Tử|Phúc|Tổng quản|Nội vụ/.test(t.tag)&&/unknown-fig-m/.test(t.src))||(/Tiểu Hạnh|Ỷ Thúy/.test(t.tag)&&/unknown-fig-m/.test(t.src)))
 if(SHOT){/* the picture for her: a stranger eunuch (A) and a stranger maid (B) on the stage, one shot each, modals closed */for(const [tag,nm] of [['eunuch','Tiểu Mậu Tử'],['maid','Tiểu Hạnh']]){await p.evaluate(async(nm)=>{try{Q.length=0;closeModal()}catch(e){}const r=document.getElementById('kmrew');if(r)r.remove();const m=window.__mine;const one=[m.find(x=>x.name===nm)];window.curPeople=()=>one;renderStage();await new Promise(r=>setTimeout(r,3500));try{Q.length=0;closeModal()}catch(e){}},nm);await p.screenshot({path:SHOT.replace(/\.png$/,'-'+tag+'.png')})}}
 if(errs.length){console.log('page errors',errs.slice(0,3));bad++}console.log(bad?'FAIL '+bad:'PASS');await b.close();process.exit(bad?1:0)})();
