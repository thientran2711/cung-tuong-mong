/* ================= jdc0: DRESS CODE gate hook (review/dresscode; the feature lives in jdc.js) =================
   Assembled right BEFORE j31 on purpose: this wrapper sits INSIDE j31's / j71's endTurn wrappers, so it runs after the new tuần begins
   and BEFORE the festival's own events are queued. dcTurn() (jdc.js) gives borrowed pieces back and, on a festival day, queues the
   festival dress-code gate FIRST; the festival events then follow it in Q (or are taken out again if she is turned away). */
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(typeof dcTurn==="function")dcTurn()}catch(e){console.error("dcTurn",e)}return r}})();
