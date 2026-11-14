/* balance pass extras (evaluated after inpage5.js [+ inq72.js] by runbal.js):
   - nights: per life, her nights, every NPC's nights (by id), total; her nights before reaching Hoàng hậu
   - Sủng: every 9 buổi (≈ a month) sample every living NPC's Sủng and hers -> histogram (bins of 10), top-NPC Sủng
   - knobs: window.__fairO -> FAIRN, window.__q72O -> Q72CFG (BALJ -> BAL is done by inpage5) */
(function(){
try{if(window.__fairO&&window.FAIRN)Object.assign(window.FAIRN,window.__fairO)}catch(e){}
try{if(window.__q72O&&typeof Q72CFG==="object")Object.assign(Q72CFG,window.__q72O)}catch(e){}
try{if(window.__xO)for(const k in window.__xO)window[k]=window.__xO[k]}catch(e){}
window.__nn={};window.__hist={npc:new Array(11).fill(0),me:new Array(11).fill(0),top:new Array(11).fill(0)};window.__bc=0;window.__meHH=null;
const rn0=rivalNight;rivalNight=function(v){try{const k=v&&(v.id!=null?v.id:v.name);window.__nn[k]=(window.__nn[k]||0)+1}catch(e){}return rn0.apply(this,arguments)};
const nb0=nextBuoi;nextBuoi=function(){try{if(S&&!S.dead){window.__bc++;if(S.rank>=7&&window.__meHH==null){window.__meHH={me:(S.nightLog||[]).length,npc:Object.values(window.__nn).reduce((a,b)=>a+b,0)}}
  if(window.__bc%9===0){let top=0;window.__cnS=(window.__cnS||0)+1+liveRivals(true).filter(v=>v.alive&&!v.out).length;window.__cnN=(window.__cnN||0)+1;for(const v of liveRivals(true)){if(!v.alive||v.out)continue;const s=Math.round(v.sung||0);window.__hist.npc[Math.min(10,Math.floor(s/10))]++;top=Math.max(top,s)}
   window.__hist.top[Math.min(10,Math.floor(top/10))]++;window.__hist.me[Math.min(10,Math.floor((S.sung||0)/10))]++}}}catch(e){}return nb0.apply(this,arguments)};
const o0=over;over=function(){let st=null;try{const vals=Object.values(window.__nn);const npc=vals.reduce((a,b)=>a+b,0);const me=(S.nightLog||[]).length;
  st={nMe:me,nNpc:npc,nTopNpc:vals.length?Math.max(...vals):0,nNpcCount:vals.length,consorts:window.__cnN?window.__cnS/window.__cnN:null,meHH:window.__meHH}}catch(e){st={nerr:String(e)}}
 window.__nn={};window.__meHH=null;window.__bc=0;window.__cnS=0;window.__cnN=0;const r=o0.apply(this,arguments);try{const L=window.__res[window.__res.length-1];if(L)Object.assign(L,st)}catch(e){}return r};
/* watchdog: a buổi that takes >300 bot iterations is stuck (a free act repeated, a modal loop): record why once per kind, then move the day on */
window.__stuck=[];window.__stuckN=0;let sk="",si=0,lastN=[];
const st0=window.__bot.step;window.__bot.step=function(mode,n){let r=0;for(let i=0;i<n;i++){try{if(S&&!S.dead){const k=S.turn+"_"+S.tuan+"_"+S.buoi;if(k!==sk){sk=k;si=0}else si++;
   if(si>300){window.__stuckN++;if(window.__stuck.length<8)window.__stuck.push({k,used,Q:Q.length,q0:Q[0]&&(Q[0].t||Q[0].pid),ov:!document.querySelector('#ov').hidden,modal:!$("modal").hidden,acts:JSON.stringify(window.__acts).slice(0,200),deck:deck.filter(a=>!a.done&&!a.lock).map(a=>a.n+":"+cardCost(a)).slice(0,10).join("|")});si=0;Q.length=0;try{closeModal()}catch(e){}nextBuoi();continue}}}catch(e){}/* j82 mini-games inside #ov: an average player lets talent decide (5/10), then closes the result */
  try{const k=document.getElementById("kg82");if(k){const b=document.getElementById("kg82skip")||document.getElementById("kg82ok");if(b){b.click();window.__kg=(window.__kg||0)+1;continue}}}catch(e){}
  r=st0(mode,1)}return r||window.__res.length};
const x0=window.__bot.extra;window.__bot.extra=function(){const o=x0();o.hist=window.__hist;o.stuck=window.__stuck;o.stuckN=window.__stuckN;o.kg=window.__kg||0;return o};
})();
