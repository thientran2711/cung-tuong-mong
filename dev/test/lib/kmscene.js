/* dev/test/lib/kmscene.js — KIT §81 scene end for tests (owner OD:L1261, kitSceneEnd in j93).
   Since §81 a kit scene (kmStage: flip tablet, edict, bloom, gloom, ink, soft …) never closes by itself or by a tap on the scene:
   it waits for its ONE end button `.kmov.km-endon > .kmend` («Tiếp theo» / «Đã hiểu» / «Ta biết rồi»), like the player presses it.
   A test that clicks through the kit motion queue (edict → reward chest → person reveal …) must press that button, or the queue stays
   on the first scene (e.g. the Kính sự phòng card flip at the start of a life) and later scenes never show.
   usage (Node):  const KM=require('./lib/kmscene');  await KM.use(page);   // before page.goto; survives reloads
   then in page code:  __kmNext()  → presses every shown end button, returns how many it pressed. */
const KM_NEXT=`window.__kmNext=function(){let n=0;document.querySelectorAll('.kmov.km-endon > .kmend').forEach(b=>{if(b.offsetParent!==null||getComputedStyle(b).position==='fixed'){b.click();n++}});return n};`;
async function use(pageOrCtx){await pageOrCtx.addInitScript(KM_NEXT)}
module.exports={KM_NEXT,use};
