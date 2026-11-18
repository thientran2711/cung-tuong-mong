/* ================= WEATHER AND LIGHT ================= */
const WX={Xuân:[["hoa đào bay","petal",0],["mưa phùn","rain",1],["sương sớm","mist",0],["trời quang","dust",0]],
 Hạ:[["nắng gắt","sun",2],["ve kêu râm ran","sun",0],["giông tố","storm",3],["đom đóm","dust",0]],
 Thu:[["lá phong rơi","leaf",0],["nắng vàng","sun",0],["gió heo may","wind",0],["trăng rằm","dust",0]],
 Đông:[["tuyết nhẹ","snow",1],["tuyết dày","snowh",4],["sương giá","frost",0],["mai nở trong tuyết","snowp",0]]};
/* flags: 1 wet, 2 heat, 3 storm, 4 heavy snow */
function rollWx(){const L=WX[SEASON[S.month-1]];const w=pick(L);S.wx={n:w[0],k:w[1],f:w[2]};
 if(w[2]===3){if(has("nongnay"))S.emp.mood=3;else if(S.emp.mood<2)S.emp.mood=2;S.storms=(S.storms||0)+1}
 if(w[2]===2&&has("nongnay")&&S.emp.mood<2)S.emp.mood=2;
 if((w[0]==="trăng rằm"||w[0]==="hoa đào bay"||w[0]==="mai nở trong tuyết")&&(has("datinh")||has("mesac")))S.emp.mood=0;
 if(w[2]===4&&has("chamchinh")&&S.emp.mood===0)S.emp.mood=1}
function wet(){return S&&S.wx&&[1,3,4].includes(S.wx.f)}
function harsh(){return S&&S.wx&&(S.wx.f===2||S.wx.f===4)}
function wxName(){return S&&S.wx?`${SEASON[S.month-1]} · ${S.wx.n}`:SEASON[S.month-1]}
/* light by buổi, smooth CSS overlay (works without the scene layer) */
function lightTick(){const st=$("stage");if(!st||!S)return;let L=st.querySelector(".light");if(!L){L=document.createElement("div");L.className="light";st.insertBefore(L,$("stop")&&$("stop").parentNode===st?$("stop"):null)}
 /* a scene picture already painted for its buổi (j94: <name>-<season>-sang|trua|chieu|toi) gets only a light shift (~1/4 strength); the generic picture gets the full tint */
 const B=S.buoi||0,nb=typeof BUOI!=="undefined"?BUOI.length:3,night=B>=nb-1,b=night?2:B===0?0:1,late=used>=2;let own=false;try{own=/-(sang|trua|chieu|toi)$/.test(SCIMG[placeOf(S.place).sc]||"")}catch(e){}
 const k=own?.25:1,A=x=>(x*k).toFixed(3);
 const c=b===0?`rgba(170,200,255,${A(.16)})`:b===1?(late?`rgba(255,130,50,${A(.22)})`:`rgba(255,210,120,${A(.14)})`):`rgba(14,24,70,${A(.5)})`;
 const w=wet()?(b===2?`,rgba(40,50,80,${A(.25)})`:`,rgba(90,100,120,${A(.18)})`):S.wx&&(S.wx.k==="frost"||S.wx.k.startsWith("snow"))?`,rgba(200,225,255,${A(.16)})`:"";
 L.style.background=`linear-gradient(${c},${c})${w?`,linear-gradient(${w.slice(1)},${w.slice(1)})`:""}`;document.body.dataset.buoi=b;
 st.classList.toggle("frost",!!(S.wx&&S.wx.k==="frost"))}
