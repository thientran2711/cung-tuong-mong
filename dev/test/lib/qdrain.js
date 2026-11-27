/* qdrain: shared in-page helper for long-life tests that pass months headless (npc-roads*, nroadhp-*). NPCROADS-RED 26/11.
   Two landed systems stop time when a test only empties Q:
   (1) jdayq (24/11) holds the buổi in UI mode until the old scenes are painted; it is OFF for bots (window.__bot, jdayq header «Bots: off (no UI)»);
   (2) jnf: every night a timed «Kính sự phòng» choice (pid nfch) waits for HER answer; emptying Q does not answer it, endTurn shows it again.
   So: window.__bot=1 (the game's own headless flag, as j72c-play / the robot), and qDrain() answers the night choice «Thôi» (as ledger.js drain does)
   and drops every other card exactly as the old `Q.length=0` did.
   usage: await ctx.addInitScript(require('./lib/qdrain').init) before goto; in the page: __qDrain() where the test emptied Q. */
function init(){window.__bot=1;
 window.__qDrain=function(){for(let n=0;n<80&&typeof Q!=='undefined'&&Q.length;n++){const m=Q[0];
  if(m&&m.pid==='nfch'&&m.opts&&m.opts.length){let i=m.opts.findIndex(o=>o&&o.n==='Thôi');if(i<0)i=m.opts.length-1;try{chooseM(i)}catch(e){}if(Q[0]===m)Q.shift()}
  else Q.shift()}
  try{if(typeof S!=='undefined'&&S)S.mg=0}catch(e){}if(typeof Q!=='undefined')Q.length=0}}
module.exports={init};
