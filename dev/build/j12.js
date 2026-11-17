/* ================= WEATHER AND LIGHT ================= */
const WX={Xuân:[["hoa đào bay","petal",0],["mưa phùn","rain",1],["sương sớm","mist",0],["trời quang","dust",0]],
 Hạ:[["nắng gắt","sun",2],["ve kêu râm ran","sun",0],["giông tố","storm",3],["đom đóm","dust",0]],
 Thu:[["lá phong rơi","leaf",0],["nắng vàng","sun",0],["gió heo may","wind",0],["trăng rằm","dust",0]],
 Đông:[["tuyết nhẹ","snow",1],["tuyết dày","snowh",4],["sương giá","frost",0],["mai nở trong tuyết","snowp",0]]};
/* flags: 1 wet, 2 heat, 3 storm, 4 heavy snow */
/* weather-khac (owner 17/11 (g) "nắng gắt ... trưa chiều âm u ... tối trời mưa"): IN-SEASON states the day can turn into khắc by khắc (jwxk.js).
   Never drawn as the tuần's first weather (the forecast keeps WX); a season's allowed states = WX[sea] + WX_KH[sea] (wxStates). */
/* weather-khac-2 (owner 17/11 ~17:40Z (3) "dông bão nè, gió nè ... gió nhiều"): + wind gusts (gió lớn / gió bấc) and fog mornings (sương mù) */
const WX_KH={Xuân:[["trời âm u","cloud",0],["mưa rào","rain",1],["gió lớn","wind",0]],Hạ:[["trời âm u","cloud",0],["mưa rào","rain",1],["gió lớn","wind",0]],
 Thu:[["trời âm u","cloud",0],["mưa thu","rain",1],["sương mù","mist",0]],Đông:[["trời âm u","cloud",0],["sương mù","mist",0],["gió bấc","wind",0]]};
function wxStates(sea){return (WX[sea]||[]).concat(WX_KH[sea]||[])}
/* what a weather does to Hoàng thượng's mood (+ storm count): at the tuần roll AND when the day turns into it (jwxk) — one rule */
function wxMood(w){if(w[2]===3){if(has("nongnay"))S.emp.mood=3;else if(S.emp.mood<2)S.emp.mood=2;S.storms=(S.storms||0)+1}
 if(w[2]===2&&has("nongnay")&&S.emp.mood<2)S.emp.mood=2;
 if((w[0]==="trăng rằm"||w[0]==="hoa đào bay"||w[0]==="mai nở trong tuyết")&&(has("datinh")||has("mesac")))S.emp.mood=0;
 if(w[2]===4&&has("chamchinh")&&S.emp.mood===0)S.emp.mood=1}
function rollWx(){const L=WX[SEASON[S.month-1]];const w=pick(L);S.wx={n:w[0],k:w[1],f:w[2]};wxMood(w)}
function wet(){return S&&S.wx&&[1,3,4].includes(S.wx.f)}
function harsh(){return S&&S.wx&&(S.wx.f===2||S.wx.f===4)}
function wxName(){return S&&S.wx?`${SEASON[S.month-1]} · ${S.wx.n}`:SEASON[S.month-1]}
/* light by buổi, smooth CSS overlay (works without the scene layer) */
function lightTick(){const st=$("stage");if(!st||!S)return;let L=st.querySelector(".light");if(!L){L=document.createElement("div");L.className="light";st.insertBefore(L,$("stop")&&$("stop").parentNode===st?$("stop"):null)}
 /* owner 16/11: every scene has its own 4-buổi paintings (j94), so NO buổi tint on any picture (the painting carries the light, night included).
    Only the weather washes below stay (rain / snow / frost), at 1/4 strength on a buổi painting. */
 const b=S.buoi||0;let own=false;try{own=/-(sang|trua|chieu|toi)$/.test(SCIMG[placeOf(S.place).sc]||"")}catch(e){}
 const k=own?.25:1,A=x=>(x*k).toFixed(3);const c="rgba(0,0,0,0)";
 const w=wet()?(b===B4L?`,rgba(40,50,80,${A(.25)})`:`,rgba(90,100,120,${A(.18)})`):S.wx&&(S.wx.k==="frost"||S.wx.k.startsWith("snow"))?`,rgba(200,225,255,${A(.16)})`:S.wx&&S.wx.k==="cloud"?`,rgba(70,78,92,${A(.14)})`:"";  /* trời âm u (weather-khac): a dim grey wash, no particles */
 L.style.background=`linear-gradient(${c},${c})${w?`,linear-gradient(${w.slice(1)},${w.slice(1)})`:""}`;document.body.dataset.buoi=b;
 st.classList.toggle("frost",!!(S.wx&&S.wx.k==="frost"))}
