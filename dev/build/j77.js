
/* ================= BẢN ĐỒ: CHẠM LÀ CÓ VIỆC (j77) =================
   Before: a tap on a map place could do nothing at all —
   - her own palace / where she stands was a disabled <button> (no click event fires);
   - a grey place (.agrey) had its click swallowed by j41's capture listener; its tiny buttons were the only way in;
   - "hết khắc" was shown while 4 khắc were left: the walk needed can(tc+1), and can() asks Sức 20 for anything over
     1 khắc, so with Sức under 20 every place read "hết khắc", and an accepted 'Xin bái kiến' still could not walk in.
   Now: walking (and asking / sneaking in) costs only its khắc, no Sức (Sức still gates the acts there); the reason says
   what is really missing; a tap on a reachable place goes there; on where she stands, opens the scene; on a closed
   place, a card with the reason and the ways in (Xin bái kiến / yết kiến, Lẻn vào with odds and risk, wait for the
   next buổi). The whole place is the tap target (labels and chips let the tap through), at least 36px. */
(function(){
 /* the walk: goTo's own check can(tc+1) reads as "tc khắc left" while she walks */
 const c0=can;can=function(c){if(window.__j77walk!=null&&c===window.__j77walk+1)return j77Kh(window.__j77walk);return c0(c)};
 const g0=goTo;goTo=function(k){if(!S||!k||k==="home"||k===S.place)return g0.apply(this,arguments);
  let tc=1;try{tc=travel(S.place,k)}catch(e){}window.__j77walk=tc;try{return g0.apply(this,arguments)}finally{window.__j77walk=null}};
})();
/* what stops the walk itself, in words */
function j77Kh(n){return !!S&&!S.dead&&used+n<=4}
function j77WalkWhy(tc){const left=Math.max(0,4-used);if(left<=0)return"hết khắc";return `đi tốn ${tc} khắc, còn ${left}`}
/* the map state of a place (same shape as j41's; prices: walk tc, ask 1+tc, sneak 1+tc) */
accState=function(k){if(!S||!k)return{why:""};if(S.place===k)return{why:"",here:1};
 if(S.out)return{why:"đang ở lãnh cung"};if(S.confined)return{why:`cấm túc ${S.confined} tháng`};
 const a=accessOf(S,k);const tc=k==="home"?0:travel(S.place,k);
 if(!a.ok){const st={why:a.why,kind:a.kind,ask:a.ask,tc};st.sneakOk=j77Kh(tc+1);if(a.ask==="yk")st.empAway=(S.where||{}).emp!==k;st.askOk=j77Kh(tc+1)&&!st.empAway;return st}
 if(k!=="home"&&!j77Kh(tc))return{why:j77WalkWhy(tc),tc,walk:1};
 return{why:"",tc}};
/* sneaking: 1 khắc at the side gate, then the walk */
accSneak=function(k){if(!S||S.dead||Q.length||S.out||S.confined)return;const tc=travel(S.place,k);if(!j77Kh(tc+1))return;const nm=accName(k);const o=accSneakO(k);spend(1);
 if(roll(o)){accGrant(S,k);log(`Lẻn vào ${nm} trót lọt.`);window.__accSilent=0;goTo(k);if(S.place!==k)render();return}
 spend(tc);apply({danh:-8});log(`<span class="r">Lẻn vào ${nm}, bị thị vệ bắt được: Danh -8.</span>`);punish(S,`tự tiện lẻn vào ${nm}`,1);
 Q.push({t:"Bị bắt",h:`<p>Thị vệ ${nm} bắt được ngươi ở cửa hông. Chuyện truyền khắp lục cung.</p><p class="r">Danh -8 · ${S.confined?`cấm túc ${S.confined} tháng`:"bị phạt"}</p>`});showModal();render()};
/* an accepted request walks her in at once */
(function(){const a0=accAsk;accAsk=function(k){const r=a0.apply(this,arguments);try{if(accHas(S,k)&&S.place!==k&&Q.length&&/Được/.test(Q[0].t||"")){const m=Q[0];m.btn="Vào";m.onClose=()=>{setTimeout(()=>{if(!Q.length&&S&&S.place!==k)goTo(k)},0)};showModal()}}catch(e){}return r}})();
/* the card for a place she cannot enter now */
function j77Card(k,empty){if(!S||S.dead||Q.length)return;
 if(empty){Q.push({t:empty,h:`<p>Cung trống, chưa có ai ở.</p>`,btn:"Đã rõ"});showModal();return}
 const st=accState(k);const nm=accName(k);let n=0;try{n=countAt(k)}catch(e){}
 const left=Math.max(0,4-used);const L=[`<p>Không vào được lúc này: <b>${st.why}</b>.</p>`];
 if(st.kind==="hour")L.push(`<p class="past">Mở cửa buổi sáng và buổi chiều.</p>`);
 if(n)L.push(`<p class="past">Có ${n} bóng người ở đó.</p>`);
 const opts=[];
 if(st.ask){const nmA=st.ask==="yk"?"Xin yết kiến":"Xin bái kiến";
  if(st.empAway)L.push(`<p class="past">${nmA}: Hoàng thượng không có ở đây.</p>`);
  else if(!st.askOk)L.push(`<p class="past">${nmA}: cần ${st.tc+1} khắc, còn ${left}.</p>`);
  else opts.push({n:nmA,fx:{},x:`${word(accAskO(k))} · tốn: 1 khắc, thêm ${st.tc} khắc đi · thành: được vào buổi này · hỏng: không mất gì thêm`,go:()=>setTimeout(()=>accAsk(k),0)})}
 if(st.kind){if(st.sneakOk)opts.push({n:"Lẻn vào",fx:{},x:accSneakLine(k,st.tc),go:()=>setTimeout(()=>accSneak(k),0)});
  else L.push(`<p class="past">Lẻn vào: cần ${st.tc+1} khắc, còn ${left}.</p>`)}
 const waitHelps=st.kind==="hour"||st.walk||/sáng/.test(st.why||"")||(st.ask&&!st.empAway&&!st.askOk)||(st.kind&&!st.sneakOk);
 if(waitHelps&&!S.out&&!S.confined&&!S.mg){const night=(S.buoi||0)>=2;opts.push({n:night?"Đợi sáng mai (Qua đêm)":"Đợi buổi sau (Qua buổi)",fx:{},x:st.kind==="hour"||/sáng/.test(st.why||"")?"sáng mai mở cửa, thử lại":night?"sáng mai đủ khắc, thử lại":"sang buổi sau đủ khắc, thử lại",go:()=>setTimeout(()=>{try{nextBuoi()}catch(e){}},0)})}
 if(opts.length){opts.push({n:"Thôi",fx:{},x:""});Q.push({t:nm,h:L.join(""),opts})}else Q.push({t:nm,h:L.join(""),btn:"Đã rõ"});
 showModal()}
/* one tap rule for the map and the list */
function j77Tap(k,empty){if(!S||S.dead||Q.length)return;if(empty||!k)return j77Card(k,empty||"Cung trống");
 if(S.place===k){window.__fromMap=1;tab="act";render();return}
 const st=accState(k);if(!st.why){goTo(k);if(S.place!==k&&!Q.length)j77Card(k);return}
 j77Card(k)}
window.addEventListener("click",e=>{try{if(typeof tab==="undefined"||tab!=="go"||!S)return;
 const sp=e.target.closest("#panel .mspot, #panel .mtile");if(!sp)return;
 if(sp.classList.contains("mtile")&&e.target.closest(".acb"))return; /* the list keeps its own kit buttons */
 const k=sp.dataset.go||sp.dataset.ak||"";let empty="";if(!k){const l=sp.querySelector(".mlab");empty=(l?l.textContent:"")||"Cung trống"}
 e.preventDefault();e.stopImmediatePropagation();j77Tap(k,empty)}catch(err){}},true);
/* the map: no disabled place buttons (a disabled button swallows the tap); legend separator */
(function(){const m0=mapHTML;mapHTML=function(){let h=m0.apply(this,arguments);if(window.__mapList)return h;
 try{h=h.replace(/(<button class="mspot[^"]*"[^>]*?)\sdisabled(?=[\s>])/g,"$1");
  h=h.replace('<span class="mleg">đi gần','<span class="mleg"> · đi gần')}catch(e){}return h}})();
(function(){const g0=mapHTMLgrid;mapHTMLgrid=function(){let h=g0.apply(this,arguments);
 try{h=h.replace(/(<button class="mtile[^"]*"[^>]*?)\sdisabled(?=[\s>])/g,"$1")}catch(e){}return h}})();
(function(){const st=document.createElement("style");st.textContent=`
.mspot{min-width:36px;min-height:36px}
.mspot.agrey,.mspot.off,.mspot.empty{cursor:pointer}
.mspot>*,.mspot .acb,.mspot .macts{pointer-events:none!important}
.mtile .tacts .acb{min-height:36px}
`;document.head.appendChild(st)})();
