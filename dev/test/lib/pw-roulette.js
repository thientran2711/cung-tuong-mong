/* Drop-in for require('playwright') in tests that start a fresh life: every context/page it creates
   gets the shared roulette auto-dismiss (taps "Bỏ qua" on #kroul), so the new-game roulette never
   blocks the first tap. Use: const {chromium}=require('./lib/pw-roulette'); (see lib/roulette.js). */
const pw=require('playwright');
const {autoDismissRoulette}=require('./roulette');
const orig=pw.chromium.launch.bind(pw.chromium);
const chromium=Object.create(pw.chromium);
chromium.launch=async function(){
  const b=await orig.apply(null,arguments);
  const nc=b.newContext.bind(b),np=b.newPage.bind(b);
  b.newContext=async function(){const c=await nc.apply(null,arguments);await autoDismissRoulette(c);return c};
  b.newPage=async function(){const p=await np.apply(null,arguments);await autoDismissRoulette(p);return p};
  return b;
};
module.exports=Object.assign({},pw,{chromium});
