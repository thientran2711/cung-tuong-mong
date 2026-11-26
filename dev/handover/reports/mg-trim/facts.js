const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+path.resolve('dev/index.html'),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{const o={};o.dfOn=BAL.df&&BAL.df.on;o.dfEng=Object.keys(DFG.ENG);o.slapDef=BAL.slap&&BAL.slap.def;o.slapNpc=BAL.slap&&BAL.slap.npc;
o.stealMg=BAL.steal&&BAL.steal.mg;o.toilKhac=BAL.toil&&BAL.toil.khac;o.lessonPts=BAL.mgTier.lessonPts;o.npc=BAL.mgTier.npc;o.skip=BAL.skip;o.cut=BAL.odds.cut;
o.ex=BAL.ex&&{rounds:BAL.ex.rounds,pass:BAL.ex.pass};o.toilMkTier=typeof toilTier==="function"?[0,2,4,6,8,10].map(x=>toilTier(x)):null;o.toilB=BAL.toil&&Object.keys(BAL.toil);
o.statMax=BAL.statMax||BAL.cap||null;return o});
console.log(JSON.stringify(r));await b.close()})();
