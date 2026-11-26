/* ================= jhudsp: HUD «Sắc phong X/Y tuần» DATA (owner 26/11 ~22:58Z, corrected: X = weeks ALREADY PASSED since the last kỳ, Y = weeks of the whole gap to the next kỳ) =================
   READ-ONLY accessor over jpromob (BAL.promoR.ky, pbNextKy, S.pb); no number of its own (law 4): a month holds BAL.cut.tuanDays.length+1 tuần (S.tuan 0..2).
   hudSacphongInfo() -> {kind:"ky"|"dl"|"hoan", done, total, name} ; "hoan" = quốc tang or no kỳ scheduled (done/total null). Kind "dl" only when jpromob offers a pure peek
   window.pbDlNext() -> {A,name} (not built yet: asked of Foreman D); until then the next occasion is always a kỳ. Never writes S. */
(function(){
 const W=()=>BAL.cut.tuanDays.length+1;
 window.hudSacphongInfo=function(){try{
  if(!S||S.dead||typeof pbNextKy!=="function"||!BAL.promoR)return null;
  const A=pbA(),P=S.pb||{},K=P.ky||null;
  if(P.mt!=null&&A<P.mt)return{kind:"hoan",done:null,total:null,name:""};
  const n=pbNextKy(A);if(!n)return{kind:"hoan",done:null,total:null,name:""};
  let dl=null;try{dl=typeof pbDlNext==="function"?pbDlNext():null}catch(e){}
  const tgt=dl&&dl.A>=A&&dl.A<n.A?dl:n,kind=tgt===n?"ky":"dl";
  /* the last kỳ before the target month: the stored calendar, else the stored «last», else one minimum gap back */
  let prev=null;if(K){for(const a in K.at){if(+a<tgt.A&&(prev==null||+a>prev))prev=+a}if(prev==null&&K.last!=null&&K.last<tgt.A)prev=K.last}
  if(prev==null)prev=tgt.A-BAL.promoR.ky.gapMin;
  const total=(tgt.A-prev)*W(),done=Math.max(0,Math.min(total,(A-prev)*W()+(S.tuan||0)));
  return{kind,done,total,name:tgt===n?n.n:(dl.name||"")}
 }catch(e){console.error("hudSacphongInfo",e);return null}};
 /* the words (VANPHONG: cổ trang, no %): «Sắc phong 5/32 tuần» · «Đại lễ 5/32 tuần» · «Sắc phong: tạm hoãn» */
 window.hudSacphongText=function(i){i=i||hudSacphongInfo();if(!i)return null;if(i.kind==="hoan")return{l:"Sắc phong",v:"tạm hoãn",s:"Sắc phong: tạm hoãn"};
  const l=i.kind==="dl"?"Đại lễ":"Sắc phong",v=`${i.done}/${i.total} tuần`;return{l,v,s:`${l} ${v}`}};
})();
