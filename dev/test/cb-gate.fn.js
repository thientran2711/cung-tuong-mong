/* SCAN 1 — every khắc/buổi-gated way in: for each buổi × khắc left × place (incl. her CURRENT palace with a chủ vị she has not greeted),
   a way that is not offered must say why on the card. Also deck cards: a disabled card must carry a reason. */
(()=>{const rows=[];const bad=[];const modal=()=>{const M=document.getElementById('modal');if(!M||M.hidden)return null;return{t:document.getElementById('mt').textContent,body:M.innerText.replace(/\s+/g,' '),opts:[...M.querySelectorAll('#mb .opts > button')].map(x=>x.innerText.replace(/\s+/g,' ').trim())}};
 const clr=()=>{Q.length=0;const md=document.getElementById('modal');md.hidden=true};
 for(const b of [0,1,2,3])for(const u of [0,1,2,3]){
  for(const k of places().map(x=>x.k)){if(k==="home")continue;
   for(const inside of [0,1]){clr();S.out=0;S.confined=0;S.buoi=b;used=u;S.acPass={};S.acGreet={};
    const h=k[0]==="r"||k==="kn"?accHost(k):null;if(h&&h!==S&&h.alive&&!h.out)S.where[h.id]=k;
    if(inside){if(!(h&&h!==S&&rkOf(h)>rkOf(S)))continue;S.place=k;S.visit={k,people:[],talked:false,tk:{}}}else{S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}}}
    const st=accState(k);let e=null;try{e=inside?null:accEtq(S,k)}catch(x){}
    try{j77Tap(k)}catch(x){bad.push({b,u,k,inside,err:String(x)});continue}
    const m=modal();const left=4-used;const miss=[];
    if(inside){/* she is inside a palace whose chủ vị outranks her and is home: the greeting must be offered, or why not */
     const needGreet=h&&whereOf(h)===k&&rkOf(h)-rkOf(S)>=ACC_ETQ.rankGap&&!(k==="kn"&&b===0);
     if(needGreet&&!(m&&(m.opts.some(o=>/^Bái kiến/.test(o))||/Bái kiến:/.test(m.body))))miss.push("bái kiến (đang ở trong cung)")}
    else{if(st.ask&&!(m&&(m.opts.some(o=>/^Xin (bái|yết) kiến/.test(o))||/Xin (bái|yết) kiến:/.test(m.body))))miss.push("xin "+st.ask);
     if(st.kind&&!(m&&(m.opts.some(o=>/^Lẻn vào/.test(o))||/Lẻn vào:/.test(m.body))))miss.push("lẻn vào");
     if(e&&accessOf(S,k).ok&&S.place!==k&&!(m&&(m.opts.some(o=>/^Bái kiến/.test(o))||/Bái kiến:|theo lệ bái kiến|Không vào được lúc này: (đi|hết)/.test(m.body))))miss.push("bái kiến");}
    rows.push({b,u,k,inside,shown:!!m,miss});if(miss.length)bad.push({b,u,k,inside,miss,card:m&&m.body.slice(0,160)});
    clr();S.place="home"}}
  /* deck cards */
  clr();S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};tab="act";render();
  document.querySelectorAll('#panel .cards > button').forEach(x=>{if(!x.disabled)return;const t=x.innerText.replace(/\s+/g,' ');
   const hasWhy=x.querySelector('.kwhy, .kr-why .kwhy, .kr-why .ef')||/Cần/.test(t);rows.push({b,u,deck:1});if(!hasWhy)bad.push({b,u,deck:t.slice(0,80)})})}
 return{checked:rows.length,bad:bad.length,list:bad.slice(0,40)}})()
