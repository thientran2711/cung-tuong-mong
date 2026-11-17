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
 stayOf:{"giông tố":.5,"mưa rào":.82,"mưa thu":.82,"tuyết dày":.7,"trời âm u":.7,"gió lớn":.6,"gió bấc":.65,"sương mù":.7,"sương sớm":.75},   /* short-lived states */
 burst:{Xuân:[.03,"mưa rào"],Hạ:[.06,"mưa rào"],Thu:[.02,"mưa thu"],Đông:[.01,"tuyết nhẹ"]},  /* per dry khắc: sudden downpour (owner "bỗng chốc mưa ào tới") */
 /* RAIN INTENSITY (owner 17/11 16:40Z OD:L1654 "nhẹ, vừa và nặng"): per khắc, wet states only; weights [nhẹ, vừa, nặng];
    a sudden downpour is always nặng; a khắc that keeps the same wet state keeps its level with chance lvKeep */
 lv:{"mưa phùn":[8,2,0],"mưa rào":[2,5,3],"mưa thu":[4,5,1],"giông tố":[0,2,8],"tuyết nhẹ":[7,3,0],"tuyết dày":[0,3,7],
  /* weather-khac-2 (owner 17/11 ~17:40Z (3): EVERY kind has its level nhẹ / vừa / nặng, not only rain) — the strength of what that weather IS
     (heat, wind, fog, frost, petals, leaves, cloud); calm states (trời quang, trăng rằm…) are always nhẹ */
  "hoa đào bay":[6,3,1],"sương sớm":[3,5,2],"sương mù":[2,5,3],"nắng gắt":[1,4,5],"lá phong rơi":[5,4,1],
  "gió heo may":[3,5,2],"gió lớn":[0,6,4],"gió bấc":[2,5,3],"sương giá":[3,4,3],"mai nở trong tuyết":[7,3,0],"trời âm u":[4,4,2]},lvKeep:.75,
 lvName:["","nhẹ","vừa","nặng"],
 /* the KIND of each state (what its level measures; Foreman B's looks read it): rain · storm · snow · wind · fog · frost · heat · petal · leaf · cloud · calm */
 kd:{"mưa phùn":"rain","mưa rào":"rain","mưa thu":"rain","giông tố":"storm","tuyết nhẹ":"snow","tuyết dày":"snow","gió heo may":"wind","gió lớn":"wind",
  "gió bấc":"wind","sương sớm":"fog","sương mù":"fog","sương giá":"frost","nắng gắt":"heat","hoa đào bay":"petal","mai nở trong tuyết":"petal",
  "lá phong rơi":"leaf","trời âm u":"cloud"},
 /* natural day flow of the level by buổi [sáng, trưa, chiều, tối] (added, then held to nhẹ..nặng): heat peaks at noon, fog thickest in the
    morning, frost hardest at dawn; wind GUSTS (its level rarely holds from one khắc to the next) */
 lvB:{heat:[-1,1,0,-2],fog:[1,-1,-1,0],frost:[1,0,-1,0]},lvKeepOf:{wind:.3,storm:.5},
 /* what the level LOOKS like (reviewer r1 B): jfx weather-layer config per kind × [nhẹ, vừa, nặng] (KF_WX rows, existing sprites) and the wet / snow
    wash strength × on the light overlay (j12 lightTick); kinds not listed keep their own jfx row */
 fxLv:{rain:["drizzle","rain2","rainh"],snow:["snow1","snow","snowh"],wind:["wind1","wind","wind3"],fog:["mist1","mist","mist3"],storm:["storm1","storm2","storm"],heat:["heat1","heat","heat3"],cloud:["cloud1","cloud","cloud3"],frost:["frost1","frost","frost3"]},
 /* wx-anim: kinds whose state keeps its own row family (kd petal covers hoa đào + mai nở; kd leaf; snowp) keyed by the state kind S.wx.k; bolt = share of the lightning rate per level */
 fxLvK:{petal:["petal1","petal","petal3"],leaf:["leaf1","leaf","leaf3"],snowp:["snowp1","snowp","snowp3"]},bolt:[0,.25,.6,1],heatSe:[1,.6,1,1.2],wash:[1,1,1.5,2.4],washOwn:[.25,.25,.45,.7],
 /* where a state goes when it changes: [to, weight by buổi [sáng, trưa, chiều, tối]] */
 next:{
  Xuân:{"hoa đào bay":[["trời quang",[2,2,1,1]],["trời âm u",[1,1,2,1]],["mưa phùn",[1,1,2,2]],["gió lớn",[1,1,2,1]]],
   "mưa phùn":[["trời âm u",[2,2,2,2]],["sương sớm",[2,0,0,1]],["trời quang",[0,2,2,0]],["mưa rào",[0,1,1,1]]],
   "sương sớm":[["trời quang",[3,3,1,0]],["hoa đào bay",[1,2,1,0]],["trời âm u",[1,1,1,1]]],
   "trời quang":[["hoa đào bay",[1,2,2,1]],["trời âm u",[1,1,2,1]],["sương sớm",[0,0,0,2]],["gió lớn",[1,2,2,1]]],
   "trời âm u":[["mưa phùn",[1,2,3,3]],["mưa rào",[0,1,2,1]],["trời quang",[1,1,1,1]],["gió lớn",[1,1,1,1]]],
   "mưa rào":[["mưa phùn",[2,2,2,2]],["trời âm u",[2,2,2,2]],["trời quang",[1,1,1,0]]],
   "gió lớn":[["trời âm u",[1,1,2,2]],["hoa đào bay",[1,2,1,0]],["trời quang",[1,1,1,1]],["mưa phùn",[0,1,1,1]]]},
  /* Hạ = mùa mưa (owner OD:L1654: the rainy season rains a lot, naturally) */
  Hạ:{"nắng gắt":[["trời âm u",[1,3,5,2]],["ve kêu râm ran",[2,2,1,0]],["đom đóm",[0,0,0,3]],["gió lớn",[0,1,2,1]]],
   "ve kêu râm ran":[["nắng gắt",[3,2,1,0]],["trời âm u",[0,1,3,1]],["đom đóm",[0,0,0,3]]],
   "giông tố":[["mưa rào",[4,4,4,4]],["trời âm u",[1,1,1,1]]],
   "đom đóm":[["nắng gắt",[3,1,0,0]],["ve kêu râm ran",[2,2,0,0]],["trời âm u",[1,1,1,1]]],
   "trời âm u":[["mưa rào",[2,3,4,5]],["giông tố",[0,1,2,2]],["nắng gắt",[1,1,0,0]],["đom đóm",[0,0,0,1]],["gió lớn",[1,1,2,2]]],
   "gió lớn":[["giông tố",[0,1,2,2]],["mưa rào",[0,1,2,2]],["trời âm u",[1,1,1,1]],["nắng gắt",[1,1,0,0]]],
   "mưa rào":[["trời âm u",[2,2,2,2]],["ve kêu râm ran",[1,1,1,0]],["đom đóm",[0,0,0,1]],["giông tố",[0,1,1,1]]]},
  Thu:{"lá phong rơi":[["gió heo may",[1,1,2,1]],["nắng vàng",[2,2,1,0]],["trời âm u",[1,1,2,1]],["sương mù",[4,0,0,2]]],
   "nắng vàng":[["lá phong rơi",[1,1,2,0]],["trời âm u",[0,1,2,1]],["trăng rằm",[0,0,0,2]]],
   "gió heo may":[["lá phong rơi",[2,2,2,1]],["trời âm u",[1,1,2,2]],["mưa thu",[1,1,2,2]]],
   "trăng rằm":[["nắng vàng",[2,1,1,0]],["gió heo may",[1,1,1,1]],["sương mù",[3,0,0,1]]],
   "sương mù":[["nắng vàng",[3,3,1,0]],["lá phong rơi",[2,2,1,1]],["trời âm u",[1,1,1,1]]],
   "trời âm u":[["mưa thu",[2,3,3,3]],["gió heo may",[1,1,1,1]],["nắng vàng",[1,1,0,0]]],
   "mưa thu":[["trời âm u",[2,2,2,2]],["gió heo may",[1,1,1,1]],["nắng vàng",[0,1,1,0]]]},
  Đông:{"tuyết nhẹ":[["tuyết dày",[1,1,2,2]],["mai nở trong tuyết",[1,2,1,0]],["trời âm u",[1,1,1,1]],["sương giá",[2,0,0,2]],["gió bấc",[1,2,2,1]]],
   "tuyết dày":[["tuyết nhẹ",[3,3,3,3]],["trời âm u",[1,1,1,1]]],
   "sương giá":[["trời âm u",[1,1,1,1]],["tuyết nhẹ",[1,1,2,2]],["mai nở trong tuyết",[1,1,0,0]],["sương mù",[3,0,0,1]],["gió bấc",[0,1,1,0]]],
   "mai nở trong tuyết":[["tuyết nhẹ",[1,1,2,2]],["sương giá",[0,0,1,3]],["trời âm u",[1,1,1,1]]],
   "trời âm u":[["tuyết nhẹ",[1,2,3,3]],["tuyết dày",[0,0,1,1]],["sương giá",[1,0,0,2]],["sương mù",[3,0,0,1]],["gió bấc",[1,1,1,1]]],
   "sương mù":[["sương giá",[2,0,0,1]],["trời âm u",[1,2,2,1]],["mai nở trong tuyết",[1,1,0,0]],["tuyết nhẹ",[0,1,1,1]]],
   "gió bấc":[["tuyết nhẹ",[1,1,2,2]],["tuyết dày",[0,1,1,1]],["trời âm u",[1,1,1,1]],["sương giá",[1,0,0,2]]]}}},
 /* WORLD EFFECTS (weather-khac-2, owner 17/11 ~17:40Z (3)), through existing rules only; kl = the level 1 nhẹ · 2 vừa · 3 nặng:
    fog  -> the target's chance to SEE a scheme (j8 oSee, the one witness roll) drops by see[kl]; still held to BAL.odds lo..hi
    storm-> WEATHER NEVER CLOSES OR GREYS A PLACE (owner 17/11 ~18:05Z: "Muốn đi đâu là chuyện của mình"): the garden stays open; an NPC out
             in the garden goes home by HER OWN choice with odds leave (BAL.odds lo..hi), Hoàng thượng's "dạo vườn" invite stays open with
             walk fewer odds; no extra walking khắc (owner 15/11 06:40Z, jclose §7)
    frost-> cold hands: the board ease of the listed minigames (jmgt mgTier, the one difficulty input) drops by ease[kl] */
 fx:{fog:{kd:["fog"],see:[0,8,15,25]},storm:{f:[3],out:["vuon"],leave:70,walk:20},frost:{kd:["frost"],kinds:["dan","theu"],ease:[0,.5,1,1.5]}}});
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
 /* level per khắc, EVERY kind (1 nhẹ · 2 vừa · 3 nặng; calm states 1): weights D.lv, buổi flow D.lvB by kind, gusts D.lvKeepOf */
 const lv=[],rl=wxkRng(seed+"|lv");for(let i=0;i<N;i++){const W=D.lv[s[i]],kd=D.kd[s[i]]||"calm",b=Math.floor(i/K);if(!W){lv.push(1);continue}
  if(u.includes(i)){lv.push(3);continue}
  const keep=D.lvKeepOf[kd]!=null?D.lvKeepOf[kd]:D.lvKeep;
  if(i>0&&s[i-1]===s[i]&&lv[i-1]>0&&Math.floor((i-1)/K)===b&&rl()<keep){lv.push(lv[i-1]);continue}
  const t=W[0]+W[1]+W[2];let z=rl()*t,l=1;for(let j=0;j<3;j++){z-=W[j];if(z<0){l=j+1;break}}
  const sh=(D.lvB[kd]||[0,0,0,0])[b]||0;lv.push(Math.max(1,Math.min(3,l+sh)))}
 return{s,u,lv}}
function wxkSeed(){return `${(S.emp&&S.emp.name)||""}|${S.year}|${S.month}|${S.tuan}|wxk`}
function wxkKd(n){return BAL.wx.day.kd[n]||"calm"}
function wxkBuild(s0,i0){const sea=wxkSea();if(!wxkRow(sea,s0))s0=(WX[sea]||[[s0]])[0][0];const R=wxkRoll(s0,i0,wxkSeed());S.wxDay={d:wkKey(),s:R.s,u:R.u,lv:R.lv,at:i0,sk:i0};return S.wxDay}
/* today's timeline; old saves: built lazily from the existing S.wx; the co-op guest never builds (host's day only) */
function wxkDay(){if(!S||!S.wx)return null;const D=S.wxDay;if(D&&D.d===wkKey()&&Array.isArray(D.s)&&D.s.length===wxkN())return D;
 if(typeof worldOn==="function"&&!worldOn())return null;return wxkBuild(S.wx.b||S.wx.n,wxkNow())}
/* THE API: the weather at khắc k of today (default: now) */
/* her own marks on today's day (r1): `at` = furthest khắc she reached (never back), `sk` = the khắc S.wx was last moved to. The host keeps them
   on S.wxDay (as before); a co-op GUEST keeps her own (S.wxkG, personal, not a world key) so she sees the day at HER khắc, not the host's. */
function wxkM(D){if(typeof worldOn!=="function"||worldOn())return D;let g=S.wxkG;if(!g||g.d!==D.d)g=S.wxkG={d:D.d,at:wxkNow(),sk:-1};return g}
function currentWeather(k){if(!S)return null;const D=wxkDay();if(!D)return S.wx?Object.assign({},S.wx):null;
 k=k==null?Math.max(wxkM(D).at||0,wxkNow()):Math.max(0,Math.min(wxkN()-1,k|0));const nm=D.s[k],row=wxkRow(wxkSea(),nm)||[nm,(S.wx&&S.wx.k)||"dust",(S.wx&&S.wx.f)||0];
 const kl=Math.max(1,Math.min(3,(D.lv&&D.lv[k])||((D.u||[]).includes(k)?3:1))),lv=[1,3,4].includes(row[2])?kl:0;
 /* lv/lvN = wet intensity (0 dry; unchanged API) · kd = the kind · kl/klN = the level of that kind, every state (weather-khac-2) */
 return{n:wxAt(nm,Math.floor(k/BAL.time.khac))[0],b:nm,k:row[1],f:row[2],kh:k,lv,lvN:BAL.wx.day.lvName[lv],kd:wxkKd(nm),kl,klN:BAL.wx.day.lvName[kl]}}
function wxDayAny(f){try{const D=wxkDay();if(!D)return !!(S&&S.wx&&S.wx.f===f);const sea=wxkSea();return D.s.some(n=>{const r=wxkRow(sea,n);return r&&r[2]===f})}catch(e){return !!(S&&S.wx&&S.wx.f===f)}}
/* the line when it turns (cổ trang, VANPHONG: no numbers) */
function wxkLine(a,b,burst){const W=x=>[1,3,4].includes(x.f),snow=x=>/tuyết/.test(x.b);
 if(burst)return snow(b)?"Trời bỗng đổ tuyết.":`Trời bỗng đổ ${b.b}.`;
 if(a.f===3&&b.f!==3)return W(b)?`Giông tố đã tạnh, chỉ còn ${b.n}.`:`Giông tố đã tạnh, ${b.n}.`;
 if(W(a)&&!W(b))return snow(a)?`Tuyết ngừng rơi, ${b.n}.`:`Mưa đã tạnh, ${b.n}.`;
 if(b.f===3)return"Trời nổi giông tố.";if(b.b==="trời âm u")return"Mây kéo đến, trời âm u.";
 if(b.kd==="wind")return `Trời nổi ${b.b}.`;if(b.kd==="fog"&&/sương/.test(b.n))return `${b.n[0].toUpperCase()}${b.n.slice(1)} giăng kín lối.`;
 if(W(b))return snow(b)?(b.f===4?"Tuyết rơi dày.":"Tuyết bắt đầu rơi."):`Trời đổ ${b.n}.`;
 return `Bên ngoài, ${b.n}.`}
/* move S.wx to her khắc; quiet = no line / no mood (day start, load) */
function wxkSync(quiet){try{if(!S||S.dead||!S.wx)return;const D=wxkDay();if(!D)return;const M=wxkM(D),k=Math.max(M.at||0,wxkNow());M.at=k;if(M.sk===k)return;M.sk=k;  /* sk: the khắc S.wx was last moved to (only a NEW khắc moves it) */
 const w=currentWeather(k),prev=S.wx.b||S.wx.n;if(!w)return;
 const a={n:S.wx.n,b:prev,k:S.wx.k,f:S.wx.f,lv:S.wx.lv||0,kd:S.wx.kd||wxkKd(prev),kl:S.wx.kl||1};
 if(prev===w.b){if(S.wx.lv===w.lv&&S.wx.kl===w.kl&&S.wx.kd===w.kd)return;S.wx.lv=w.lv;S.wx.kd=w.kd;S.wx.kl=w.kl;
  /* level-only change (gust, fog thinning, heat at noon): no log line; the looks hook still hears it (lvOnly) */
  if(!quiet)for(const fn of WXK_HOOKS)try{fn(a,Object.assign({},S.wx),{k,burst:false,lvOnly:true})}catch(e){console.error("wxk hook",e)}return}
 S.wx={n:w.n,b:w.b,k:w.k,f:w.f,lv:w.lv,kd:w.kd,kl:w.kl};
 if(quiet)return;let burst=false;for(let i=k;i>=0&&D.s[i]===w.b;i--)if((D.u||[]).includes(i)){burst=true;break}
 try{wxkFxSweep()}catch(e){}
 log(wxkLine(a,S.wx,burst)+wxkFxLine(a,S.wx));
 if(typeof worldOn!=="function"||worldOn()){const sea=wxkSea(),st0=S.storms,early=w.f===3&&D.s.slice(0,k).some(n=>{const r=wxkRow(sea,n);return r&&r[2]===3});
  wxMood([w.b,w.k,w.f]);if(early)S.storms=st0}  /* r1: S.storms counts storm DAYS (illness / kid / rival rules read it per month): a 2nd storm the same day adds none */
 for(const fn of WXK_HOOKS)try{fn(a,Object.assign({},S.wx),{k,burst})}catch(e){console.error("wxk hook",e)}}catch(e){console.error("wxk",e)}}
/* day start: the tuần's weather (rollWx, seeded) is khắc 0; the host rolls the rest of the day. jweather's own storm clear is replaced by the day. */
(function(){const r0=rollWx;rollWx=function(){const r=r0.apply(this,arguments);try{if(S&&S.wx){delete S.wx.clr;if(typeof worldOn!=="function"||worldOn())wxkBuild(S.wx.b||S.wx.n,0)}}catch(e){console.error("wxk",e)}return r}})();
/* her clock moves -> the world's weather moves with it (jclose wxSync runs in nextBuoi + render; spend is the khắc) */
(function(){const w0=wxSync;wxSync=function(){const r=w0.apply(this,arguments);wxkSync(false);return r}})();
(function(){const s0=spend;spend=function(){const r=s0.apply(this,arguments);try{wxSync()}catch(e){}return r}})();
/* jweather wxClrName: the buổi the storm stops, read from the day */
wxClrName=function(){try{const D=wxkDay();if(!D||!S.wx||S.wx.f!==3)return"";const sea=wxkSea();for(let i=Math.max(wxkM(D).at||0,wxkNow());i<D.s.length;i++){const r=wxkRow(sea,D.s[i]);if(r&&r[2]!==3)return String(BUOI[Math.floor(i/BAL.time.khac)]).toLowerCase()}}catch(e){}return""};
Object.assign(window,{currentWeather,wxDayAny,wxkHook,wxkNow,wxkN,wxkSync});

/* ================= WORLD EFFECTS of the weather (weather-khac-2, owner 17/11 ~17:40Z (3)) — numbers BAL.wx.fx, existing rules only =================
   fog   : j8 oSee (the target's chance to see a scheme: caught() + every preview that prints it) − see[kl], held to BAL.odds.lo..hi
   storm : nothing closes (owner 17/11 ~18:05Z); each NPC in the garden leaves by odds (her choice, rolled once at the turn + once per buổi in placeWhere)
   frost : jmgt mgTier ease − ease[kl] for the listed kinds (the one board-difficulty input); the intro row "Độ khó" says why
   Shown: one clause on the weather line in the log (wxkFxLine) + the kit weather popup rows (kitWxEffects). Host and guest read the same S.wx. */
function wxkFx(name){try{if(!S||!S.wx)return 0;const F=BAL.wx.fx[name];if(!F)return 0;
 if(F.f)return F.f.includes(S.wx.f)?1:0;const kd=S.wx.kd||wxkKd(S.wx.b||S.wx.n);if(!F.kd.includes(kd))return 0;
 if(name==="fog"&&!/sương/.test(S.wx.n||""))return 0;  /* sương sớm lifts by noon (its words turn "nắng dịu"): no fog effect then */
 return Math.max(1,Math.min(3,S.wx.kl||1))}catch(e){return 0}}
function wxkFxLine(a,b){const was=x=>BAL.wx.fx.fog.kd.includes(x.kd)&&/sương/.test(x.n||"")?"fog":BAL.wx.fx.frost.kd.includes(x.kd)?"frost":BAL.wx.fx.storm.f.includes(x.f)?"storm":"";
 const e=was(b);if(!e||e===was(a))return"";
 return e==="fog"?" Người ngoài khó trông rõ việc trong cung.":e==="storm"?" Người trong vườn lục tục tìm chỗ trú.":" Giá rét, tay cóng khó đàn khó thêu."}
/* fog: the witness roll */
(function(){const o0=oSee;oSee=function(){const n=o0.apply(this,arguments);const l=wxkFx("fog");if(!l)return n;const O=BAL.odds;return cl(n-BAL.wx.fx.fog.see[l],O.lo,O.hi)}})();
/* storm: nobody is barred (owner 17/11 ~18:05Z); NPCs out in the garden go home by their own choice (odds, BAL.wx.fx.storm.leave, held to BAL.odds) */
function wxkSweepW(W){if(!W||!wxkFx("storm"))return W;const F=BAL.wx.fx.storm,O=BAL.odds,p=cl(F.leave,O.lo,O.hi);
 for(const id of Object.keys(W)){if(!F.out.includes(W[id])||!roll(p))continue;if(id==="emp")W[id]="thu";else if(id==="th")W[id]="tn";
  else{const v=(typeof rivals!=="undefined"?rivals:[]).find(x=>x&&String(x.id)===id);if(v)W[id]=palaceOf(v)}}return W}
function wxkFxSweep(){if(S&&S.where&&(typeof worldOn!=="function"||worldOn()))wxkSweepW(S.where)}
(function(){const p0=placeWhere;placeWhere=function(){const r=p0.apply(this,arguments);try{wxkFxSweep()}catch(e){}return r}})();
/* jgift "Mời ngài dạo ngự hoa viên": the old weather gate (kmStorm: giông tố / tuyết dày = greyed) is gone — she may ask; Hoàng thượng
   answers by odds, fewer in a storm or heavy snow (BAL.wx.fx.storm.walk; kmEmpO -> odA holds it to 5..95) */
(function(){if(typeof kmStorm!=="function"||typeof kmEmpO!=="function")return;const st=kmStorm;kmStorm=function(){return false};
 const o0=kmEmpO;kmEmpO=function(a,kind){const o=o0.apply(this,arguments);try{if(kind==="walk"&&st()){const O=BAL.odds;return cl(o-BAL.wx.fx.storm.walk,O.lo,O.hi)}}catch(e){}return o}})();
/* frost: cold hands */
function wxkCold(kind){const l=wxkFx("frost");return l&&BAL.wx.fx.frost.kinds.includes(kind)?BAL.wx.fx.frost.ease[l]:0}
(function(){const m0=mgTier;mgTier=function(kind){const t=m0.apply(this,arguments);try{const e=wxkCold(kind);if(e>0&&t){t.ease=Math.round(Math.max(BAL.mgTier.easeMin,t.ease-e)*10)/10;t.cold=1}}catch(x){}return t}})();
(function(){const d0=mgDiffTxt;mgDiffTxt=function(t){const s=d0.apply(this,arguments);return t&&t.cold?s+" · trời giá, tay cóng":s}})();
/* the kit weather popup (j93 kitWxEffects rows) */
(function(){if(typeof kitWxEffects!=="function")return;const e0=kitWxEffects;kitWxEffects=function(){const L=e0.apply(this,arguments);try{
 const add=[];if(wxkFx("fog"))add.push(["g","Sương mù: người khác khó trông thấy việc ngươi làm, mưu kế khó bị phát giác hơn."]);
 if(wxkFx("storm"))add.push(["r","Giông tố: ít ai ở lại ngoài vườn; Hoàng thượng khó nhận lời dạo vườn."]);
 if(wxkFx("frost"))add.push(["r","Giá rét: tay cóng, đàn và thêu khó hơn."]);
 if(add.length){const q=L.filter(x=>!/^Trời yên/.test(x[1]));return q.concat(add)}}catch(e){}return L}})();
/* the level shows (reviewer r1 B): the jfx weather layer picks the row for the khắc's level; storm keeps its own row (thunder + bolt) */
function wxkFxId(w){try{const L=w&&(BAL.wx.day.fxLvK[w.k]||BAL.wx.day.fxLv[w.kd]);if(!L)return null;const id=L[Math.max(1,Math.min(3,w.kl||1))-1];return KF_WX[id]?id:null}catch(e){return null}}
(function(){if(typeof kfWxCfg!=="function")return;const c0=kfWxCfg;kfWxCfg=function(){const c=c0.apply(this,arguments);try{
 if(c&&(c.id==="gold"||c.id==="fly"))return c;if(!S||!S.wx)return c;
 /* wx-anim: kinds the base config does not draw (heat, cloud) get their level row too; not at night for heat (no sun) */
 const night=(S.buoi||0)===B4L;if(!c&&S.wx.kd==="heat"&&night)return c;const id=wxkFxId(S.wx);if(!id||(c&&id===c.id))return c;
 return Object.assign({lay:"wx"},KF_WX[id],{id,night:c?c.night:night})}catch(e){}return c}})();
Object.assign(window,{wxkFx,wxkCold,wxkFxId});
