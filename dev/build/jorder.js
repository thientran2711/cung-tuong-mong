/* ================= jorder: SCENE ORDER GATE (owner 17/11 ~07:25Z/07:28Z, review/learn-scene-fix) =================
   "made item -> level-up scene -> buổi transition -> next VIỆC; the next VIỆC never opens underneath a running scene."
   Last module (outermost wrapper). While a scene runs / is armed in the kmPush queue (kmHold, j93) a NEW dialog (showModal) waits (hidden, retried every 150 ms); the dialog that
   is open when the scene was queued closes first (closeModal arms the scene: kmArm). Bots / quiet / co-op guest paths: kmOn() false = no gate. */
(function(){
 if(typeof showModal!=="function"||showModal.__ord)return;
 const sm=showModal;let gt=0;
 showModal=function(){try{if(Q.length&&typeof kmHold==="function"&&kmOn()&&kmHold()){const M=document.getElementById("modal");if(M)M.hidden=true;clearTimeout(gt);gt=setTimeout(()=>{gt=0;try{showModal()}catch(e){console.error(e)}},150);return}}catch(e){console.error(e)}return sm.apply(this,arguments)};
 showModal.__ord=1;
 if(typeof closeModal==="function"&&!closeModal.__ord){const cm=closeModal;closeModal=function(){try{if(Q.length<=1&&typeof kmArm==="function")kmArm()}catch(e){}return cm.apply(this,arguments)};closeModal.__ord=1}
})();
