/* SCAN 2 — every weather × buổi × season: the words shown must fit the buổi (both ways). Night: no sun / cicadas / "sớm" / noon heat words;
   day: no moon / stars / fireflies / "đêm" / "dưới trăng"; "sớm" only in the morning. "before" = the week's words shown all day (old),
   "after" = what the HUD shows now (after a real nextBuoi / render, read from the HUD chip). */
(()=>{const BAD=[[/nắng|ve kêu|sớm|râm ran/i,[3]],[/trăng|sao sáng|đom đóm|đêm|dế/i,[0,1,2]],[/sớm/i,[1,2,3]]];
 const bad=(t,b)=>BAD.some(([re,bs])=>bs.includes(b)&&re.test(t));const rows=[];let nb=0,na=0;
 for(const sea of Object.keys(WX))for(const w of (typeof wxStates==="function"?wxStates(sea):WX[sea]))for(const b of [0,1,2,3]){
  /* weather-khac: the day holds this one weather in every khắc (jwxk), so the scan reads the words of THIS state at each buổi */
  if(typeof wxkN==="function")S.wxDay={d:wkKey(),s:Array(wxkN()).fill(w[0]),u:[],at:0};S.wx={n:w[0],k:w[1],f:w[2]};S.buoi=b;render();const chip=document.querySelector('#hud2 .kmwx');const shown=S.wx.n;const hud=(document.getElementById('me-d')||{}).textContent||"";
  const before=w[0];const bb=bad(before,b),ba=bad(shown,b)||(chip&&bad(chip.textContent,b));if(bb)nb++;if(ba)na++;
  const ic=chip&&chip.querySelector('img')?chip.querySelector('img').getAttribute('src').replace(/.*mo-wx-|\.webp/g,''):'';
  rows.push([sea,before,BUOI[b],shown,ic,bb?"SAI":"",ba?"SAI":"",S.wx.f===w[2]?"":"FLAG CHANGED",S.wx.b===before?"":"BASE LOST"])}
 return{badBefore:nb,badAfter:na,rows}})()
