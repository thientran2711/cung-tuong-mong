/* review coop-name-clash r1: host keeps a rename order for the friend while any of her people still holds the old name, even when the order path (from her entry copy: kidsCopy drops dead children) misses her real S. usage: node dev/test/coop-name-ordprune.js index.html -> {"keptWhilePending":true,"droppedWhenDone":true} */
const {chromium}=require('playwright');const path=require('path');
(async()=>{const f=process.argv[2];const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+path.resolve(f));await p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:90000});
const r=await p.evaluate(()=>{S={name:"Chủ",staff:[]};
 window.COOPW=Object.assign(window.COOPW||{},{on:true,seat:"a"});
 const her={name:"Lan",kids:[{name:"Chết",alive:false,sex:"m"},{name:"Mai Anh",sex:"f"}]};
 COOPW.base={P:{b:{pid:902,S:her,dead:false}}};
 S.nmOrd={"902":[{p:"kids.0",o:"Mai Anh",n:"Thu Cúc"}]};
 nmOrdPrune();const own=nmOwner(),blob=!!nmFrBlob();const kept=!!(S.nmOrd&&S.nmOrd["902"]);
 her.kids[1].name="Thu Cúc";nmOrdPrune();const dropped=!(S.nmOrd&&S.nmOrd["902"]);
 return {own,blob,keptWhilePending:kept,droppedWhenDone:dropped}});
console.log(JSON.stringify(r));await b.close()})();
