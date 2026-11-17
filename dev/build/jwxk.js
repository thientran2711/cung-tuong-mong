/* ================= jwxk: WEATHER PER KHẮC by season (owner 17/11 ~16:20Z item (g): "nắng gắt, rồi tới trưa tới chiều ... âm u, rồi tới tối
   trời mưa ... đang ở ngự hoa viên rồi bỗng chốc tự nhiên mưa ào tới"; never off-season) + ONE shared clock (OD:L1641/L1642) =================
   - The tuần's first weather is still rollWx (j12 WX, seeded by jmcal so the calendar forecast holds). At that roll the WHOLE day is rolled
     khắc by khắc: S.wxDay = {d: wkKey(), s:[state names, one per khắc], u:[khắc that came as a sudden downpour], at: furthest khắc reached}.
     States = the season's list only (j12 wxStates = WX[sea] + WX_KH[sea]); moves by BAL.wx.day (stay / next by buổi / burst).
   - S.wx stays the CURRENT state {n: buổi words (jclose WX_BUOI), b: state, k: kind, f: flag}: wet() / harsh() / backdrop key (j11) /
     jfx weather layer / sounds (jsfx) / e68Ctx / events / NPC rules all read it, so they now change khắc by khắc. Her khắc = the world's khắc:
     it moves when her clock moves (spend / Sang buổi / Sang ngày mới), never back (a refund keeps the weather), NPCs see the same S.wx.
   - ONE API: currentWeather(k) (k = khắc of the day 0..N-1, default = now) -> {n,b,k,f,kh,lv,lvN} (lv 0 dry · 1 nhẹ · 2 vừa · 3 nặng, BAL.wx.day.lv); wxDayAny(f) = some khắc of the day has flag f.
     Hook for other systems (Foreman B looks-2: smudge by rain / umbrella): wxkHook(fn) -> fn(from, to, {k, burst}) on every change.
   - Co-op: the host rolls (worldOn()); wxDay is a world key (jcoopworld W_KEYS + HOST_ONLY); the guest never rolls, it only shows the host's
     day at her own khắc. Old saves: no wxDay -> the day is built lazily from the existing S.wx (khắc so far = that weather).
   - When the weather turns: one short cổ trang line in the result log (log), Hoàng thượng's mood rule (j12 wxMood) on the host. ================= */
Object.assign(BAL.wx,{day:{
 stay:.88,                                    /* chance per khắc that the weather holds */
 stayOf:{"giông tố":.5,"mưa rào":.82,"mưa thu":.82,"tuyết dày":.7,"trời âm u":.7},   /* short-lived states */
 burst:{Xuân:[.03,"mưa rào"],Hạ:[.06,"mưa rào"],Thu:[.02,"mưa thu"],Đông:[.01,"tuyết nhẹ"]},  /* per dry khắc: sudden downpour (owner "bỗng chốc mưa ào tới") */
 /* RAIN INTENSITY (owner 17/11 16:40Z OD:L1654 "nhẹ, vừa và nặng"): per khắc, wet states only; weights [nhẹ, vừa, nặng];
    a sudden downpour is always nặng; a khắc that keeps the same wet state keeps its level with chance lvKeep */
 lv:{"mưa phùn":[8,2,0],"mưa rào":[2,5,3],"mưa thu":[4,5,1],"giông tố":[0,2,8],"tuyết nhẹ":[7,3,0],"tuyết dày":[0,3,7]},lvKeep:.75,
 lvName:["","nhẹ","vừa","nặng"],
 /* where a state goes when it changes: [to, weight by buổi [sáng, trưa, chiều, tối]] */
 next:{
  Xuân:{"hoa đào bay":[["trời quang",[2,2,1,1]],["trời âm u",[1,1,2,1]],["mưa phùn",[1,1,2,2]]],
   "mưa phùn":[["trời âm u",[2,2,2,2]],["sương sớm",[2,0,0,1]],["trời quang",[0,2,2,0]],["mưa rào",[0,1,1,1]]],
   "sương sớm":[["trời quang",[3,3,1,0]],["hoa đào bay",[1,2,1,0]],["trời âm u",[1,1,1,1]]],
   "trời quang":[["hoa đào bay",[1,2,2,1]],["trời âm u",[1,1,2,1]],["sương sớm",[0,0,0,2]]],
   "trời âm u":[["mưa phùn",[1,2,3,3]],["mưa rào",[0,1,2,1]],["trời quang",[1,1,1,1]]],
   "mưa rào":[["mưa phùn",[2,2,2,2]],["trời âm u",[2,2,2,2]],["trời quang",[1,1,1,0]]]},
  /* Hạ = mùa mưa (owner OD:L1654: the rainy season rains a lot, naturally) */
  Hạ:{"nắng gắt":[["trời âm u",[1,3,5,2]],["ve kêu râm ran",[2,2,1,0]],["đom đóm",[0,0,0,3]]],
   "ve kêu râm ran":[["nắng gắt",[3,2,1,0]],["trời âm u",[0,1,3,1]],["đom đóm",[0,0,0,3]]],
   "giông tố":[["mưa rào",[4,4,4,4]],["trời âm u",[1,1,1,1]]],
   "đom đóm":[["nắng gắt",[3,1,0,0]],["ve kêu râm ran",[2,2,0,0]],["trời âm u",[1,1,1,1]]],
   "trời âm u":[["mưa rào",[2,3,4,5]],["giông tố",[0,1,2,2]],["nắng gắt",[1,1,0,0]],["đom đóm",[0,0,0,1]]],
   "mưa rào":[["trời âm u",[2,2,2,2]],["ve kêu râm ran",[1,1,1,0]],["đom đóm",[0,0,0,1]],["giông tố",[0,1,1,1]]]},
  Thu:{"lá phong rơi":[["gió heo may",[1,1,2,1]],["nắng vàng",[2,2,1,0]],["trời âm u",[1,1,2,1]]],
   "nắng vàng":[["lá phong rơi",[1,1,2,0]],["trời âm u",[0,1,2,1]],["trăng rằm",[0,0,0,2]]],
   "gió heo may":[["lá phong rơi",[2,2,2,1]],["trời âm u",[1,1,2,2]],["mưa thu",[1,1,2,2]]],
   "trăng rằm":[["nắng vàng",[2,1,1,0]],["gió heo may",[1,1,1,1]]],
   "trời âm u":[["mưa thu",[2,3,3,3]],["gió heo may",[1,1,1,1]],["nắng vàng",[1,1,0,0]]],
   "mưa thu":[["trời âm u",[2,2,2,2]],["gió heo may",[1,1,1,1]],["nắng vàng",[0,1,1,0]]]},
  Đông:{"tuyết nhẹ":[["tuyết dày",[1,1,2,2]],["mai nở trong tuyết",[1,2,1,0]],["trời âm u",[1,1,1,1]],["sương giá",[1,0,0,2]]],
   "tuyết dày":[["tuyết nhẹ",[3,3,3,3]],["trời âm u",[1,1,1,1]]],
   "sương giá":[["trời âm u",[1,1,1,1]],["tuyết nhẹ",[1,1,2,2]],["mai nở trong tuyết",[1,1,0,0]]],
   "mai nở trong tuyết":[["tuyết nhẹ",[1,1,2,2]],["sương giá",[0,0,1,2]],["trời âm u",[1,1,1,1]]],
   "trời âm u":[["tuyết nhẹ",[1,2,3,3]],["tuyết dày",[0,0,1,1]],["sương giá",[1,0,0,1]]]}}}});
const WXK_HOOKS=[];
function wxkHook(fn){if(typeof fn==="function")WXK_HOOKS.push(fn)}
function wxkLast(){return typeof B4L==="number"?B4L:3}
function wxkN(){return (wxkLast()+1)*BAL.time.khac}
/* her khắc of the DAY, read through the ONE day-time function (j76 ONE DAY-TIME GATE, owner OD 17/11 ~16:45Z): khắc gone = day − j76left()
   + the khắc an act spilled into the next buổi (S.j76carry) — that act sees the spilled khắc's weather. Without a spill the last khắc of a
   buổi holds until Sang buổi (her buổi's words never show the next buổi's). */
function wxkNow(){if(!S)return 0;const K=BAL.time.khac,N=wxkN(),b=Math.max(0,Math.min(wxkLast(),S.buoi||0));
 const gone=typeof j76left==="function"?N-j76left():b*K+(typeof used==="number"?used:0);const carry=S.j76carry||0;
 return Math.max(0,Math.min(N-1,carry>0?gone+carry:Math.min(gone,b*K+K-1)))}
function wxkSea(){return SEASON[S.month-1]}
function wxkRow(sea,n){return wxStates(sea).find(w=>w[0]===n)||null}
/* seeded like the forecast (jmcal): the same world + date gives the same day; host only */
function wxkRng(seed){let h=0;try{h=typeof mcHash==="function"?mcHash(seed):0}catch(e){}if(!h)for(let i=0;i<seed.length;i++)h=(Math.imul(h^seed.charCodeAt(i),2654435761)>>>0);
 let a=h>>>0||1;return ()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296}}
/* roll khắc i0+1 .. N-1 from the state at i0 (states up to i0 = s0) */
function wxkRoll(s0,i0,seed){const sea=wxkSea(),D=BAL.wx.day,K=BAL.time.khac,N=wxkN(),r=wxkRng(seed);const s=[],u=[];
 for(let i=0;i<=i0;i++)s.push(s0);let cur=s0;
 for(let i=i0+1;i<N;i++){const b=Math.floor(i/K),row=wxkRow(sea,cur),B=D.burst[sea];
  if(B&&row&&![1,3,4].includes(row[2])&&r()<B[0]&&wxkRow(sea,B[1])){cur=B[1];u.push(i)}
  else if(r()>=(D.stayOf[cur]!=null?D.stayOf[cur]:D.stay)){const L=((D.next[sea]||{})[cur]||[]).filter(x=>wxkRow(sea,x[0])&&x[1][b]>0);
   const tot=L.reduce((a,x)=>a+x[1][b],0);if(tot>0){let z=r()*tot;for(const x of L){z-=x[1][b];if(z<0){cur=x[0];break}}}}
  s.push(cur)}
 /* intensity per khắc (0 = dry) */
 const lv=[],rl=wxkRng(seed+"|lv");for(let i=0;i<N;i++){const W=D.lv[s[i]];if(!W){lv.push(0);continue}
  if(u.includes(i)){lv.push(3);continue}
  if(i>0&&s[i-1]===s[i]&&lv[i-1]>0&&rl()<D.lvKeep){lv.push(lv[i-1]);continue}
  const t=W[0]+W[1]+W[2];let z=rl()*t,l=1;for(let j=0;j<3;j++){z-=W[j];if(z<0){l=j+1;break}}lv.push(l)}
 return{s,u,lv}}
function wxkSeed(){return `${(S.emp&&S.emp.name)||""}|${S.year}|${S.month}|${S.tuan}|wxk`}
function wxkBuild(s0,i0){const sea=wxkSea();if(!wxkRow(sea,s0))s0=(WX[sea]||[[s0]])[0][0];const R=wxkRoll(s0,i0,wxkSeed());S.wxDay={d:wkKey(),s:R.s,u:R.u,lv:R.lv,at:i0,sk:i0};return S.wxDay}
/* today's timeline; old saves: built lazily from the existing S.wx; the co-op guest never builds (host's day only) */
function wxkDay(){if(!S||!S.wx)return null;const D=S.wxDay;if(D&&D.d===wkKey()&&Array.isArray(D.s)&&D.s.length===wxkN())return D;
 if(typeof worldOn==="function"&&!worldOn())return null;return wxkBuild(S.wx.b||S.wx.n,wxkNow())}
/* THE API: the weather at khắc k of today (default: now) */
function currentWeather(k){if(!S)return null;const D=wxkDay();if(!D)return S.wx?Object.assign({},S.wx):null;
 k=k==null?Math.max(D.at||0,wxkNow()):Math.max(0,Math.min(wxkN()-1,k|0));const nm=D.s[k],row=wxkRow(wxkSea(),nm)||[nm,(S.wx&&S.wx.k)||"dust",(S.wx&&S.wx.f)||0];
 const lv=[1,3,4].includes(row[2])?Math.max(1,(D.lv&&D.lv[k])||1):0;
 return{n:wxAt(nm,Math.floor(k/BAL.time.khac))[0],b:nm,k:row[1],f:row[2],kh:k,lv,lvN:BAL.wx.day.lvName[lv]}}
function wxDayAny(f){try{const D=wxkDay();if(!D)return !!(S&&S.wx&&S.wx.f===f);const sea=wxkSea();return D.s.some(n=>{const r=wxkRow(sea,n);return r&&r[2]===f})}catch(e){return !!(S&&S.wx&&S.wx.f===f)}}
/* the line when it turns (cổ trang, VANPHONG: no numbers) */
function wxkLine(a,b,burst){const W=x=>[1,3,4].includes(x.f),snow=x=>/tuyết/.test(x.b);
 if(burst)return snow(b)?"Trời bỗng đổ tuyết.":`Trời bỗng đổ ${b.b}.`;
 if(a.f===3&&b.f!==3)return W(b)?`Giông tố đã tạnh, chỉ còn ${b.n}.`:`Giông tố đã tạnh, ${b.n}.`;
 if(W(a)&&!W(b))return snow(a)?`Tuyết ngừng rơi, ${b.n}.`:`Mưa đã tạnh, ${b.n}.`;
 if(b.f===3)return"Trời nổi giông tố.";if(b.b==="trời âm u")return"Mây kéo đến, trời âm u.";
 if(W(b))return snow(b)?(b.f===4?"Tuyết rơi dày.":"Tuyết bắt đầu rơi."):`Trời đổ ${b.n}.`;
 return `Bên ngoài, ${b.n}.`}
/* move S.wx to her khắc; quiet = no line / no mood (day start, load) */
function wxkSync(quiet){try{if(!S||S.dead||!S.wx)return;const D=wxkDay();if(!D)return;const k=Math.max(D.at||0,wxkNow());D.at=k;if(D.sk===k)return;D.sk=k;  /* sk: the khắc S.wx was last moved to (only a NEW khắc moves it) */
 const w=currentWeather(k),prev=S.wx.b||S.wx.n;if(!w)return;if(prev===w.b){if(S.wx.lv!==w.lv)S.wx.lv=w.lv;return}
 const a={n:S.wx.n,b:prev,k:S.wx.k,f:S.wx.f,lv:S.wx.lv||0};S.wx={n:w.n,b:w.b,k:w.k,f:w.f,lv:w.lv};
 if(quiet)return;let burst=false;for(let i=k;i>=0&&D.s[i]===w.b;i--)if((D.u||[]).includes(i)){burst=true;break}
 log(wxkLine(a,S.wx,burst));
 if(typeof worldOn!=="function"||worldOn())wxMood([w.b,w.k,w.f]);
 for(const fn of WXK_HOOKS)try{fn(a,Object.assign({},S.wx),{k,burst})}catch(e){console.error("wxk hook",e)}}catch(e){console.error("wxk",e)}}
/* day start: the tuần's weather (rollWx, seeded) is khắc 0; the host rolls the rest of the day. jweather's own storm clear is replaced by the day. */
(function(){const r0=rollWx;rollWx=function(){const r=r0.apply(this,arguments);try{if(S&&S.wx){delete S.wx.clr;if(typeof worldOn!=="function"||worldOn())wxkBuild(S.wx.b||S.wx.n,0)}}catch(e){console.error("wxk",e)}return r}})();
/* her clock moves -> the world's weather moves with it (jclose wxSync runs in nextBuoi + render; spend is the khắc) */
(function(){const w0=wxSync;wxSync=function(){const r=w0.apply(this,arguments);wxkSync(false);return r}})();
(function(){const s0=spend;spend=function(){const r=s0.apply(this,arguments);try{wxSync()}catch(e){}return r}})();
/* jweather wxClrName: the buổi the storm stops, read from the day */
wxClrName=function(){try{const D=wxkDay();if(!D||!S.wx||S.wx.f!==3)return"";const sea=wxkSea();for(let i=Math.max(D.at||0,wxkNow());i<D.s.length;i++){const r=wxkRow(sea,D.s[i]);if(r&&r[2]!==3)return String(BUOI[Math.floor(i/BAL.time.khac)]).toLowerCase()}}catch(e){}return""};
Object.assign(window,{currentWeather,wxDayAny,wxkHook,wxkNow,wxkN,wxkSync});
