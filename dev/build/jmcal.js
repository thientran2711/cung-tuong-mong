/* ================= jmcal: LỊCH THÁNG · kitMonthCal + kitDeskCal (owner 15/11 ~18:30Z, KIT §58) =================
   A wall calendar: one month = 3 tuần (thượng / trung / hạ), each a light label + 2 rows x 5 equal squares (days 1-30), a normal phone month view (owner 21/11 #42): header with arrows + swipe, no month chips. Only the FIXED YEARLY festivals of the game
   calendar (FEST, j31 + j71 Thánh thọ Thái hậu while she lives) are marked; private contests, tea parties, private banquets and every other
   surprise event never appear (they are not in FEST).
   TIME MODEL: the game has no day of the month; a turn is a tuần (S.tuan 0/1/2). Day squares map to tuần as 1-10 = thượng, 11-20 = trung,
   21-30 = hạ. A festival is marked on its traditional day (MCAL.days) when that day lies in the tuần the game holds it (FEST.t);
   otherwise on the first day of each of its tuần (Hội Phượng: 1, 11, 21 — it lasts the whole month).
   TODAY = the current tuần row (gold) + "Tuần này"; days of earlier tuần of this month are dimmed.
   The 12 month tabs run from this month to 11 months ahead (months before this one are next year's), so she can look ahead.
   A festival square (and its line in the list under the grid) opens the kit popover (kpPop): name, day, a short line, what contests
   the festival can hold (from its j71 pool FV7: C = contests SC7, W = wagers …), the prize, and how many tuần are left.
   kitDeskCal: the painted desk calendar (img/kit/desk-cal.webp; plain img/kit/desk-cal-plain.webp in lãnh cung / as a servant) in a
   free corner of HER room's stage (S.place "home"; in lãnh cung her place "lc"); one tap opens the calendar in the kit modal. ===== */
const MCAL={
 days:{newyear:[1,2,3],nguyentieu:[15],thanhminh:[5],doanngo:[5],thattich:[7],vulan:[15],trungthu:[15],vantho:[25],trungcuu:[9],thanhtho:[15],dongchi:[15],lapbat:[8],giaothua:[30]},
 short:{newyear:"Nguyên đán",nguyentieu:"Nguyên tiêu",thanhminh:"Thanh minh",doanngo:"Đoan ngọ",phoenix:"Hội Phượng",thattich:"Thất tịch",vulan:"Vu Lan",trungthu:"Trung thu",vantho:"Vạn thọ",trungcuu:"Trùng cửu",thanhtho:"Thánh thọ",dongchi:"Đông chí",lapbat:"Lạp bát",giaothua:"Giao thừa"},
 line:{newyear:"Lục cung vào chúc Tết Hoàng thượng và Thái hậu, mở yến xuân.",
  nguyentieu:"Đêm rằm tháng giêng, đèn lồng treo khắp ngự hoa viên, cả cung thắp đèn thi.",
  thanhminh:"Các cung theo Thái hậu cúng tế tiên đế, đạp thanh, thả diều.",
  doanngo:"Đua thuyền rồng trên Thái Dịch trì, đeo túi thơm, gói bánh ú.",
  phoenix:"Hội thi cưỡi ngựa bắn cung ở sân tàu ngựa phía tây, kéo dài cả tháng.",
  thattich:"Đêm Ngưu Lang Chức Nữ gặp nhau, các cung xâu kim khất xảo dưới trăng.",
  vulan:"Rằm tháng bảy, chùa trong cung mở đại lễ, các cung cúng dường cầu siêu.",
  trungthu:"Đêm rằm tháng tám, Hoàng thượng mở yến thưởng trăng bên hồ.",
  vantho:"Mừng thánh đản Hoàng thượng: các cung dâng lễ chúc thọ, mở yến lớn.",
  trungcuu:"Lên Cảnh Sơn ngắm cúc, ủ rượu cúc, dâng lễ người già.",
  thanhtho:"Mừng thọ Thái hậu ở Từ Ninh cung: các cung dâng lễ, lễ được khen sẽ được nhắc cả năm.",
  dongchi:"Hoàng thượng ra đàn Nam Giao tế trời; đêm dài nhất năm.",
  lapbat:"Mồng tám tháng chạp, nấu cháo lạp bát cúng dường, sửa soạn đón Tết.",
  giaothua:"Đêm cuối năm, cung đình đốt pháo, Hoàng thượng ban yến đón giao thừa."},
 other:{W:"đặt cược",B:"mở yến mời",P:"dâng lễ",R:"lễ cúng",G:"chơi cùng phi tần"}};
const mcTuanOf=d=>Math.min(2,Math.floor((d-1)/10));
const mcEsc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function mcNow(){try{if(S&&S.month)return{m:+S.month,y:+S.year||1,t:+S.tuan||0}}catch(e){}return{m:1,y:1,t:0}}
function mcMonName(m){try{return `tháng ${KP_MON[(m-1)%12]}`}catch(e){return `tháng ${m}`}}
function mcYearName(y){try{return kpYear(y)}catch(e){return `năm thứ ${y}`}}
function mcDayName(d){return d<=10?`mồng ${d}`:`ngày ${d}`}
function mcDaysName(L){if(!L.length)return"";const run=L.every((d,i)=>!i||d===L[i-1]+1);if(L.length>1&&run)return `${L[0]<=10?"mồng ":"ngày "}${L[0]}–${L[L.length-1]}`;return L.map(mcDayName).join(", ")}
/* the fixed yearly festivals of month m: [{k,name,short,days,t}] (FEST is the one source; Thánh thọ only while Thái hậu lives) */
function mcFests(m){const out=[];if(typeof FEST==="undefined")return out;
 for(const k in FEST){const f=FEST[k];if(!f||+f.m!==m)continue;if(k==="thanhtho"&&typeof S!=="undefined"&&S&&S.thDead)continue;
  const T=Array.isArray(f.t)&&f.t.length?f.t.slice().sort():[0];let d=(MCAL.days[k]||[]).filter(x=>T.includes(mcTuanOf(x)));if(!d.length)d=T.map(t=>t*10+1);
  out.push({k,name:String(f.name||k).replace(/\s*\([^)]*\)\s*$/,""),short:MCAL.short[k]||String(f.name||k).replace(/^(Tết|Tiết|Lễ|Hội|Đêm)\s+/,""),days:d,t:T})}
 return out.sort((a,b)=>a.days[0]-b.days[0])}
/* what the festival can hold, from its j71 pool (the same filter as fvPick: no Thái hậu variants once she is gone) */
function mcActs(k){const P=(typeof FV7!=="undefined"&&FV7[k])||[];const thD=typeof S!=="undefined"&&S&&S.thDead;const C=[],O=[];
 for(const v of P){if(thD&&(v[1]==="th"||/Thái hậu/.test(v[2])))continue;if(v[0]==="C"){const n=typeof SC7!=="undefined"&&SC7[v[1]]&&SC7[v[1]].n;if(n&&!C.includes(n))C.push(n)}else{const n=MCAL.other[v[0]];if(n&&!O.includes(n))O.push(n)}}
 return{C,O}}
function mcPrize(k){try{if(typeof prize7==="function"&&typeof NAMES!=="undefined")return Object.entries(prize7(k)).map(([a,v])=>`${NAMES[a]} +${v}`).join(", ")}catch(e){}return""}
/* tuần from now to (offset o months ahead, tuần t); <0 = already past */
function mcLeft(o,t){const n=mcNow();return o*3+t-n.t}
function mcLeftText(o,f){const L=f.t.map(t=>mcLeft(o,t));const nx=L.find(x=>x>=0);if(nx==null)return"đã qua";if(nx===0)return"tuần này";return `còn ${nx} tuần`}
/* ---------- §58.3+ (owner 15/11 ~20:15Z, review/cal-plus): what else she KNOWS goes on the calendar — short entries, nothing private ----------
   One source per entry, read-only from the game state (old saves: the few lazy fields below are made on first read):
   bong   day 1 of every month: bổng lộc + Nội vụ phủ issue (j20 / jstip pay on the first day; not while she serves as a cung nữ)
   thaiy  the monthly thái y visit, only if review/thaiy's thaiyNextVisit() exists (nothing is invented here)
   sinh   her birthday (S.bmonth, j20 sinhthan) · hh Thiên thu of the Empress (her rival entry's bmonth, made once) · friend (co-op)
   prep   Vạn thọ / Thánh thọ: "sửa lễ vật" the tuần before (gift reminder) · due: the month of the birth (S.preg once she knows it, j75)
   exam   her promotion exam window (jexam p.ex.w0/w1, cooldown cd) · tuyen tuyển tú (j27: tháng hai, every third year)
   kexam  her children's yearly tests (j53 KTE, not the surprise "Khảo bài") · kid birthdays (k.bmo, made once) · pet: next growth stage (jpetcare)
   note   SỔ HẸN: what she wrote down for a tuần (S.calNotes) + reminder the tuần before and on the tuần
   wx     next tuần's weather, only with a servant who reads the sky (age ≥ 40 or lanh lợi); weather is drawn from a world seed so the
          forecast is true (and the same for both co-op players)
   cy     her monthly days, only if review/cycle's cycleDaysOf() exists (a faint mark, "Nguyệt tín")
   quẻ    the tuần row shows the quẻ she drew (current from S.lot, earlier tuần from her log) · moon phases on days 1 / 8 / 15 / 23
   Tap any day → the day box under the grid: that day's entries, the festival check list, what happened that tuần (her log), the sổ hẹn form. */
const MCX={tag:{note:"Hẹn",due:"Lâm bồn",exam:"Khảo hạch",sinh:"Sinh thần",hh:"Thiên thu",friend:"Hảo hữu",kid:"Sinh nhật",tuyen:"Tuyển tú",kexam:"Con thi",prep:"Sửa lễ",pet:"Thú lớn",thaiy:"Thái y",bong:"Bổng lộc",wx:"Trời"},
 ord:["note","due","exam","sinh","hh","friend","kid","tuyen","kexam","prep","pet","thaiy","bong","wx","moon","cy"],
 moon:{1:["sóc","Mồng một, trăng non: thắp hương lễ Phật"],8:["thượng huyền","Trăng thượng huyền"],15:["vọng","Rằm, trăng tròn: thắp hương lễ Phật"],23:["hạ huyền","Trăng hạ huyền"]},
 preset:["Dâng quà Thái hậu","Đến thăm Hoàng hậu","Lễ Phật","Luyện đàn"],noteMax:40,noteLen:48};
function mcHash(s){let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function mcWkNow(){try{return wk()}catch(e){const n=mcNow();return 0*n.m+n.t}}
/* month offset o (may be -1) → {m, y} */
function mcMY(o){const n=mcNow(),i=n.m-1+o;return{m:((i%12)+12)%12+1,y:n.y+Math.floor(i/12)}}
/* an absolute week W (wk() units) → {o, t} on the calendar */
function mcAt(W){const n=mcNow(),i=n.t+(W-mcWkNow());return{o:Math.floor(i/3),t:((i%3)+3)%3}}
function mcW(o,t){return mcWkNow()+o*3+t-mcNow().t}
function mcSrv(){try{return typeof isSrv==="function"&&isSrv()}catch(e){return false}}
function mcCap(s){s=String(s||"");return s.charAt(0).toUpperCase()+s.slice(1)}
/* lazy, once-made facts (old saves) */
function mcBm(o,key){if(!o)return 0;if(o[key]==null)o[key]=1+(mcHash((o.name||"")+"|"+key)%12);return +o[key]}
function mcBd(name){return 1+(mcHash(name+"|day")%30)}
/* weather: next tuần's draw from the world seed (Hoàng thượng's name + the date) — rollWx uses the same index, so the forecast holds */
function mcWxIdx(y,m,t,n){return mcHash(`${(S&&S.emp&&S.emp.name)||""}|${y}|${m}|${t}|wx`)%n}
function mcWxNext(){try{const n=mcNow();let m=n.m,y=n.y,t=n.t+1;if(t>2){t=0;m++;if(m>12){m=1;y++}}const L=WX[SEASON[m-1]];return L[mcWxIdx(y,m,t,L.length)]}catch(e){return null}}
(function(){if(typeof rollWx!=="function")return;const r0=rollWx;rollWx=function(){let L=null;try{L=WX[SEASON[S.month-1]]}catch(e){}if(!L)return r0.apply(this,arguments);
 const i=mcWxIdx(S.year,S.month,S.tuan,L.length),mr=Math.random;let once=false;Math.random=function(){if(!once){once=true;return (i+.5)/L.length}return mr.apply(Math,arguments)};
 try{return r0.apply(this,arguments)}finally{Math.random=mr}}})();
function mcWxSeer(){if(mcSrv()||(S&&S.out))return null;const L=(S&&S.staff)||[];return L.find(s=>s&&!s.coop&&(+s.age||0)>=40)||L.find(s=>s&&!s.coop&&netIs(s,"sharp"))||null}
/* quẻ of a tuần: current = S.lot; earlier = her log line "Xin xăm: quẻ X · dom" (the last re-draw wins) */
function mcLogsOf(m,y,t){const pre=`T${m}/${y} ${TUAN[t]}`;const out=[];try{for(const h of S.logs||[]){const p=String(h);const k=p.indexOf("</span>");const head=p.slice(0,k).replace(/<[^>]+>/g,"");if(head.trim()!==pre)continue;out.push(p.slice(k+7).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim())}}catch(e){}return out}
function mcQue(o,t){const n=mcNow();if(o>0||(o===0&&t>n.t))return null;if(o===0&&t===n.t&&S.lot)return{lv:+S.lot.lv,dom:S.lot.dom};
 const {m,y}=mcMY(o);for(const x of mcLogsOf(m,y,t)){const r=x.match(/^(?:Xin xăm|Gieo lại): quẻ ([^·.]+?)\s*·\s*([^.]+)\./);if(r){const lv=LV.indexOf(r[1].trim());if(lv>=0)return{lv,dom:r[2].trim()}}}return null}
function mcQueChip(q){if(!q)return"";const b=LVB[q.lv];return `<span class="kchip ${b>0?"g":b<0?"r":""} kmc-que" title="Quẻ ${LV[q.lv]} · ${mcEsc(q.dom)}">${b>0?"Cát":b<0?"Hung":"Bình"}</span>`}
/* the festival check list: what can be contested + gifts + wagers, ready ✓ / ✗ from HER stats, arts, bạc and Tư trang */
function mcPrep(k){const P=(typeof FV7!=="undefined"&&FV7[k])||[];const thD=S&&S.thDead;const L=[],seen=new Set(),C1=[],C0=[];
 for(const v of P){if(thD&&(v[1]==="th"||/Thái hậu/.test(v[2])))continue;const id=v[0]+v[1];if(seen.has(id))continue;seen.add(id);
  if(v[0]==="C"&&typeof SC7!=="undefined"&&SC7[v[1]]){let s=0;try{s=SC7[v[1]].f(S)}catch(e){}(s>=50?C1:C0).push(SC7[v[1]].n)}
  else if(v[0]==="P"){const r=v[1]==="th"?"th":"emp";const inv=(S.inv||[]).filter(e=>e&&!e.h&&(e.wk||(typeof IT!=="undefined"&&IT[e.k])));
   const like=inv.some(e=>{const it=typeof IT!=="undefined"&&IT[e.k];return it&&Array.isArray(it.tg)&&it.tg.includes(r)});
   L.push([like,`Lễ vật dâng ${r==="th"?"Thái hậu":"Hoàng thượng"}: ${like?"có món hợp ý":inv.length?"chưa có món hợp ý":"chưa có"}`])}
  else if(v[0]==="W"&&!seen.has("Wbac")){seen.add("Wbac");L.push([(S.bac||0)>=20,"Bạc đặt cược (20)"])}}
 /* contests in ONE or two lines (owner: short): in good form ✓ / not yet ✗ */
 if(C0.length)L.unshift([false,`Thi chưa sẵn: ${C0.join(", ")}`]);if(C1.length)L.unshift([true,`Thi đã sẵn: ${C1.join(", ")}`]);
 return L.sort((a,b)=>(a[0]?1:0)-(b[0]?1:0))}
/* every short entry of month offset o: {d: [{k, txt}]} (festivals are drawn by kitMonthCal itself) */
function mcExtra(o){const out={};const n=mcNow();const {m,y}=mcMY(o);const add=(d,k,txt,x)=>{d=Math.max(1,Math.min(30,d|0));(out[d]=out[d]||[]).push(Object.assign({k,txt},x||{}))};
 const atW=(W,k,txt,d0)=>{const a=mcAt(W);if(a.o===o)add(a.t*10+(d0||1),k,txt)};
 const run=f=>{try{f()}catch(e){}};
 run(()=>{if(!mcSrv())add(1,"bong",S.out?"Lĩnh bổng lộc (lãnh cung)":"Lĩnh bổng lộc · Nội vụ phủ phát đồ")});
 run(()=>{if(typeof thaiyNextVisit!=="function")return;const r=thaiyNextVisit(S);if(r==null||r===false)return;let W=null,d=1;
  if(typeof r==="number")W=r;else if(typeof r==="object"){if(r.w!=null)W=+r.w;else{const mm=+(r.m||r.month),tt=+(r.t!=null?r.t:r.tuan||0),yy=+(r.y||r.year||0);if(mm){let off=(mm-n.m+12)%12;if(yy)off=(yy-n.y)*12+(mm-n.m);W=mcW(off,tt)}}if(r.d)d=((+r.d-1)%10)+1}
  if(W!=null)atW(W,"thaiy","Thái y đến bắt mạch",Math.max(1,Math.min(10,d)))});
 run(()=>{if(S.bmonth==null&&!S.dead)S.bmonth=1+R(12);if(+S.bmonth===m)add(1+mcHash((S.name||"")+"|day")%10,"sinh",S.rank>=7?"Thiên thu, sinh thần của ngươi":"Sinh thần của ngươi")});
 run(()=>{if(S.rank>=7||typeof qOn!=="function"||!qOn())return;const q=rivals[0];if(mcBm(q,"bmonth")===m)add(mcBd(q.name||""),"hh",`Thiên thu ${q.name}: nên dâng lễ`)});
 run(()=>{for(const k of ["vantho","thanhtho"]){const f=typeof FEST!=="undefined"&&FEST[k];if(!f||(k==="thanhtho"&&S.thDead))continue;const T=(Array.isArray(f.t)&&f.t.length?f.t:[0]).slice().sort()[0];
  for(const oo of [o,o+1]){const my=mcMY(oo);if(my.m!==+f.m)continue;const W=mcW(oo,T)-1;if(W>=mcWkNow())atW(W,"prep",`Sửa lễ vật dâng ${k==="vantho"?"Hoàng thượng":"Thái hậu"} (${MCAL.short[k]})`)}}});
 run(()=>{if(!S.preg||S.pregUnk)return;const od=10-S.preg;if(od===o)add(1,"due",S.fake?"Hạn “lâm bồn” (thai giả)":"Tháng lâm bồn (dự tính)")});
 run(()=>{const e=S.ex;if(!e||typeof e!=="object")return;const w=mcWkNow();if(e.w0!=null&&e.w0>w)atW(e.w0,"exam","Được khảo hạch tấn phong");if(e.w1!=null&&e.w1>=w)atW(e.w1,"exam","Hết hạn khảo hạch tấn phong",10);
  if(e.w1==null&&e.cd!=null&&e.cd>S.turn)atW(e.cd*3,"exam","Lại được xét khảo hạch")});
 run(()=>{if(m===2&&y%3===0&&!(o===0&&n.t>0)&&!(o<0))add(1,"tuyen","Tuyển tú: tú nữ mới vào cung")});
 run(()=>{if(typeof KTE==="undefined"||typeof ktEl!=="function")return;const ks=(S.kids||[]).filter(k=>k&&k.alive);if(!ks.length)return;
  for(const e in KTE){if(e==="khao")continue;const E=KTE[e];if(!E.m.includes(m))continue;if(ks.some(k=>ktEl(k,E)))add(1,"kexam",`${E.n}: các con dự thi (${E.dom})`)}});
 run(()=>{for(const k of (S.kids||[])){if(!k||!k.alive)continue;if(mcBm(k,"bmo")===m)add(mcBd(k.name||""),"kid",`Sinh nhật ${k.name}`)}});
 run(()=>{if(typeof petcNext!=="function")return;for(const P of (S.pets||[])){if(!P)continue;const nx=petcNext(P);if(!nx)continue;const W=(P.at||0)+nx.age;const T=petT(P);
  const st=BAL.pet.stages[nx.s];const aff=(P.aff||0)<nx.aff?" · cần thêm tình cảm":"";if(W>mcWkNow())atW(W,"pet",`${T.n} đủ ngày thành ${st}${aff}`);else if(o===0&&aff)add(n.t*10+1,"pet",`${T.n} đủ ngày thành ${st}${aff}`)}});
 run(()=>{for(const x of (S.calNotes||[]))if(x&&x.w!=null){const a=mcAt(x.w);if(a.o===o)add(x.d&&mcTuanOf(x.d)===a.t?x.d:a.t*10+1,"note",x.txt,{id:x.id})}});
 run(()=>{const sr=mcWxSeer();if(!sr)return;const w=mcWxNext();if(w)atW(mcWkNow()+1,"wx",`Thời tiết: ${w[0]} (${sr.name} xem trời)`)});
 run(()=>{const C=window.COOPW;if(!C||!C.on||!C.base||!C.base.P)return;const F=C.base.P[C.seat==="a"?"b":"a"];if(!F||!F.S||F.dead)return;const nm=F.name||F.S.name||"Hảo hữu";
  if(F.S.bmonth!=null&&+F.S.bmonth===m)add(1+mcHash((F.S.name||nm)+"|day")%10,"friend",`Sinh thần ${nm}`);
  if(F.S.preg&&!F.S.pregUnk&&!F.S.hidden&&10-F.S.preg===o)add(1,"friend",`${nm} lâm bồn (dự tính)`);
  for(const x of (F.S.calNotes||[]))if(x&&x.share&&x.w!=null){const a=mcAt(x.w);if(a.o===o)add(x.d&&mcTuanOf(x.d)===a.t?x.d:a.t*10+1,"friend",`${nm}: ${x.txt}`)}});
 run(()=>{if(typeof cycleDaysOf!=="function")return;const L=cycleDaysOf(S,m);(Array.isArray(L)?L:[]).forEach(d=>{if(+d>=1&&+d<=30)add(+d,"cy","Nguyệt tín")})});
 for(const d in out)out[d].sort((a,b)=>MCX.ord.indexOf(a.k)-MCX.ord.indexOf(b.k));
 return out}
/* SỔ HẸN: a note on a tuần (+ the day she tapped), reminded the tuần before and on the tuần (once each), then kept in her log */
function mcNoteAdd(o,d,txt){txt=String(txt||"").replace(/\s+/g," ").trim().slice(0,MCX.noteLen);if(!txt)return false;const t=mcTuanOf(d);const W=mcW(o,t);if(W<mcWkNow())return false;
 S.calNotes=S.calNotes||[];S.calNoteN=(S.calNoteN||0)+1;S.calNotes.push({id:S.calNoteN,w:W,d,txt});if(S.calNotes.length>MCX.noteMax)S.calNotes.splice(0,S.calNotes.length-MCX.noteMax);return true}
function mcNoteDel(id){if(!S.calNotes)return;S.calNotes=S.calNotes.filter(x=>x.id!==+id)}
function mcNoteTick(){try{if(!S||S.dead||!S.calNotes||!S.calNotes.length)return;const w=mcWkNow();const due=[],soon=[];
 for(const x of S.calNotes){if(x.w===w+1&&!x.r1){x.r1=1;soon.push(x.txt)}if(x.w===w&&!x.r0){x.r0=1;x.r1=1;due.push(x.txt);try{log(`Sổ hẹn: ${mcEsc(x.txt)}.`)}catch(e){}}}
 S.calNotes=S.calNotes.filter(x=>x.w>=w-2);
 if((due.length||soon.length)&&typeof kitPanel==="function"&&!(typeof tsbBot==="function"&&tsbBot())){const rows=[];if(due.length)rows.push(["Tuần này",due.map(mcEsc)]);if(soon.length)rows.push(["Tuần sau",soon.map(mcEsc)]);
  kitPanel({kind:"notice",title:"Sổ hẹn",rows,btn:"Đã hiểu"})}}catch(e){console.error(e)}}
(function(){if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){const w=mcWkNow();const r=e0.apply(this,arguments);try{if(mcWkNow()!==w){mcNoteTick();if(Q.length&&$("modal").hidden)showModal()}}catch(e){}return r}})();
/* the day box (tap a day) */
function mcDayBox(o,d){const n=mcNow();const {m,y}=mcMY(o);const t=mcTuanOf(d);const past=o<0||(o===0&&t<n.t),now=o===0&&t===n.t;
 const F=mcFests(m).filter(f=>f.days.includes(d));const X=(mcExtra(o)[d]||[]);const rows=[];
 F.forEach(f=>rows.push(["Lễ hội",`<span class="kmc-lk" role="button" tabindex="0" data-kmcf="${f.k}" data-kmco="${o}">${mcEsc(f.name)}</span> · ${mcLeftText(o,f)}`]));
 const mo=MCX.moon[d];if(mo)rows.push(["Trăng",mo[1]]);
 X.forEach(x=>{if(x.k!=="moon")rows.push([MCX.tag[x.k]||(x.k==="cy"?"Riêng":""),mcEsc(x.txt)+(x.k==="note"&&!past?` <button type="button" class="kbtn alt kmc-del" data-kmcdel="${x.id}" aria-label="Bỏ hẹn">Bỏ</button>`:"")])});
 const q=mcQue(o,t);if(q)rows.push(["Quẻ tuần",`${LV[q.lv]} · ${mcEsc(q.dom)}`]);
 let h=`<div class="kmc-day" data-kmcday="${d}"><h4 class="kpst">${mcCap(mcDayName(d))} ${mcMonName(m)} · ${TUAN[t]}${now?" · tuần này":""}</h4>`;
 h+=rows.length?kitRows(rows):`<div class="kmc-none">Ngày thường, không có việc gì đã biết.</div>`;
 F.forEach(f=>{if(past)return;const L=mcPrep(f.k);if(L.length&&typeof kitChecks==="function")h+=`<div class="kmc-sub">Sửa soạn cho ${mcEsc(f.short)}</div>`+kitChecks(L)});
 if(past||now){const L=mcLogsOf(m,y,t).filter(x=>!/^(Xin xăm|Gieo lại)/.test(x)).slice(0,6).map(x=>x.length>96?x.slice(0,94).replace(/\s\S*$/,"")+"…":x);
  h+=`<div class="kmc-sub">${now?"Tuần này, sổ đã ghi":"Tuần ấy, sổ đã ghi"}</div>`+(L.length?kitRows(L.map(x=>["",mcEsc(x)])):`<div class="kmc-none">Sổ không ghi lại việc gì.</div>`)}
 if(!past){h+=`<div class="kmc-sub">Sổ hẹn</div><div class="kmc-form">`+(typeof kitInput==="function"?kitInput({id:"kmc-note",label:`Hẹn việc ${TUAN[t]} ${mcMonName(m)}`,placeholder:"Việc cần làm…"}):`<input id="kmc-note" class="kinput">`)+
  `<div class="kmc-pre">${MCX.preset.map(p=>`<button type="button" class="kbtn alt" data-kmcpre="${mcEsc(p)}">${mcEsc(p)}</button>`).join("")}</div>`+
  (window.COOPW&&window.COOPW.on&&typeof kitToggle==="function"?kitToggle({id:"kmc-share",label:"Cho hảo hữu cùng thấy",on:false}):"")+
  `<button type="button" class="kbtn kmc-save" data-kmcsave="${d}" data-kmco="${o}">Ghi vào sổ</button></div>`}
 return h+`</div>`}
/* ---------- the calendar (pure HTML; o = months from the current month, -1 = last month (her log), 0..11 ahead; sel = the tapped day) ---------- */
function kitMonthCal(opt){opt=opt||{};const n=mcNow();const o=Math.max(-1,Math.min(11,opt.o|0));const {m,y}=mcMY(o);const F=mcFests(m);const X=mcExtra(o);const sel=+opt.sel||0;
 const at={};F.forEach(f=>f.days.forEach(d=>{(at[d]=at[d]||[]).push(f)}));
 let g="";for(let t=0;t<3;t++){const now=o===0&&t===n.t;const q=mcQue(o,t);
  g+=`<div class="kmc-row${now?" on":""}"><div class="kmc-tl"><span>${mcCap(typeof TUAN!=="undefined"?TUAN[t]:["thượng tuần","trung tuần","hạ tuần"][t])}</span>${now?`<span class="kchip g kmc-now">Tuần này</span>`:""}${mcQueChip(q)}</div><div class="kmc-cells">`;
  for(let d=t*10+1;d<=t*10+10;d++){const past=o<0||(o===0&&t<n.t);const L=at[d];const E=(X[d]||[]).filter(x=>x.k!=="cy");const cy=(X[d]||[]).some(x=>x.k==="cy");
   const mo=MCX.moon[d]?`<span class="kmc-mo p${d}" aria-hidden="true"></span>`:"";const cnt=(L?L.length-1:0)+E.length-(L?0:1);
   const badge=cnt>0?`<span class="kmc-c">+${cnt}</span>`:"";const cls=`kmc-d${L?" f":""}${E.length?" x":""}${cy?" cy":""}${past?" past":""}${sel===d?" sel":""}`;
   const lab=[mcDayName(d)].concat((L||[]).map(x=>x.name),E.map(x=>x.txt),cy?["Nguyệt tín"]:[]).join(": ");
   if(L){const f=L[0];g+=`<button type="button" class="${cls}" data-kmcd="${d}" data-kmcf="${f.k}" data-kmco="${o}" aria-label="${mcEsc(lab)}"><img src="img/ev-fest-${f.k}.webp" alt="" loading="lazy" decoding="async" onerror="this.remove()"><span class="kmc-n">${d}</span>${badge}${mo}<span class="kmc-fn">${mcEsc(f.short)}</span></button>`}
   else g+=`<button type="button" class="${cls}" data-kmcd="${d}" data-kmco="${o}" aria-label="${mcEsc(lab)}"><span class="kmc-n">${d}</span>${badge}${mo}${E.length?`<span class="kmc-tg t-${E[0].k}">${MCX.tag[E[0].k]||""}</span>`:""}</button>`}
  g+=`</div></div>`}
 const rows=[];for(let d=1;d<=30;d++){(at[d]||[]).forEach(f=>{if(f.days[0]===d)rows.push([d,mcDaysName(f.days),`<span class="kmc-lk" role="button" tabindex="0" data-kmcf="${f.k}" data-kmco="${o}">${mcEsc(f.name)}</span> · ${mcLeftText(o,f)}`])});
  (X[d]||[]).forEach(x=>{if(x.k!=="cy"&&x.k!=="bong")rows.push([d,mcDayName(d),mcEsc(x.txt)])})}
 const rr=rows.map(r=>[r[1],r[2]]);
 const list=rr.length?(typeof kitRows==="function"?kitRows(rr):rr.map(r=>`<div>${r[0]} · ${r[1]}</div>`).join("")):`<div class="kmc-none">${o<0?"Tháng trước không có lễ hội lớn.":"Tháng này không có lễ hội lớn."}</div>`;
 const ar=(to,cap,sym)=>`<button type="button" class="kbtn alt kmc-ar" data-kmcm="${to}" aria-label="${cap}" title="${cap}"${to<-1||to>11?" disabled":""}>${sym}</button>`;
 return `<div class="kmc" data-kmc="${o}"><div class="kmc-nav">${ar(o-1,"Tháng trước","‹")}<div class="kmc-head"><b>${mcMonName(m).replace(/^t/,"T")}</b> · ${mcYearName(y)}${o===0?"":` <span class="kmc-ahead">(${o<0?"đã qua":o===1?"tháng sau":`${o} tháng nữa`})</span>`}</div>${ar(o+1,"Tháng sau","›")}</div>`+
  `<div class="kmc-grid">${g}</div>${sel?mcDayBox(o,sel):`<div class="kmc-hint">Chạm vào một ngày để xem việc ngày ấy, ghi sổ hẹn. Lướt ngang hoặc bấm mũi tên để đổi tháng.</div>`}<div class="kmc-list">${list}</div></div>`}
/* the popover of one festival (kit kpPop) */
function mcPopHTML(k,o){const mm=mcMY(o).m;const f=mcFests(mm).find(x=>x.k===k);if(!f)return"";const A=mcActs(k),pz=mcPrize(k);
 const T=f.t.map(t=>typeof TUAN!=="undefined"?TUAN[t]:"").filter(Boolean).join(", ");const P=o<0?[]:mcPrep(k);const ok=P.filter(x=>x[0]).length;
 return `<div class="kpopt">${mcEsc(f.name)}</div><div class="kpopx kmc-px"><div class="kmc-pw">${mcDaysName(f.days)} ${mcMonName(mm)} · ${T} · <b>${mcLeftText(o,f)}</b></div>`+
  `<div>${MCAL.line[k]||""}</div>`+(A.C.length?`<div><b>Có thể thi:</b> ${A.C.join(", ")}</div>`:"")+(A.O.length?`<div><b>Còn có:</b> ${A.O.join(", ")}</div>`:"")+
  (A.C.length&&pz?`<div><b>Thắng thi:</b> ${pz}</div>`:"")+(P.length?`<div><b>Sửa soạn:</b> ${ok}/${P.length} đã sẵn</div>`:"")+`</div>`}
function kitMonthCalOpen(){try{if(typeof kitModal!=="function")return;kitModal({kind:"cal",title:"Lịch tháng",sub:`Nay là ${typeof k3Date==="function"?k3Date():""}. Lịch ghi lễ hội hằng năm và những ngày ngươi đã biết.`,html:kitMonthCal({o:0}),cls:"kmc-modal"})}catch(e){console.error(e)}}
try{KP_SEAL.cal="LỊCH"}catch(e){}
window.kitMonthCal=kitMonthCal;window.kitMonthCalOpen=kitMonthCalOpen;
/* re-draw the calendar in place (month tab, tapped day, a note saved), keeping the tab row's scroll */
function mcRedraw(c,o,sel,focusDay,dir){const w=document.createElement("div");w.innerHTML=kitMonthCal({o,sel});const nc=w.firstElementChild;c.replaceWith(nc);
 if(dir){const g=nc.querySelector(".kmc-grid");if(g)g.classList.add(dir>0?"kmc-in-r":"kmc-in-l")}
 if(sel&&focusDay!==false){const b=nc.querySelector(".kmc-day");if(b&&b.scrollIntoView)b.scrollIntoView({block:"nearest"})}return nc}
/* month arrows + swipe, day taps, festival popover, sổ hẹn (delegated; the capture-phase kit popover closer runs first, so a tap on another square re-opens it) */
document.addEventListener("click",e=>{const T=e.target.closest&&e.target;if(!T)return;const c=T.closest(".kmc");
 const tb=T.closest("[data-kmcm]");if(tb&&c){e.stopPropagation();e.preventDefault();if(tb.disabled)return;const to=+tb.dataset.kmcm;mcRedraw(c,to,0,false,to>+c.dataset.kmc?1:-1);return}
 const pre=T.closest("[data-kmcpre]");if(pre&&c){e.preventDefault();const i=c.querySelector("#kmc-note");if(i){i.value=pre.dataset.kmcpre;i.focus()}return}
 const sv=T.closest("[data-kmcsave]");if(sv&&c){e.preventDefault();const i=c.querySelector("#kmc-note");const d=+sv.dataset.kmcsave,o=+sv.dataset.kmco;if(i&&mcNoteAdd(o,d,i.value)){const sh=c.querySelector("#kmc-share");if(sh&&sh.checked){const x=S.calNotes[S.calNotes.length-1];if(x)x.share=1}try{if(typeof save==="function")save()}catch(x){}mcRedraw(c,o,d)}return}
 const dl=T.closest("[data-kmcdel]");if(dl&&c){e.preventDefault();e.stopPropagation();mcNoteDel(dl.dataset.kmcdel);const b=c.querySelector(".kmc-day");try{if(typeof save==="function")save()}catch(x){}mcRedraw(c,+c.dataset.kmc,b?+b.dataset.kmcday:0);return}
 const dd=T.closest(".kmc-d[data-kmcd]");if(dd&&c){e.stopPropagation();e.preventDefault();const o=+dd.dataset.kmco||0,d=+dd.dataset.kmcd;const nc=mcRedraw(c,o,d,!dd.dataset.kmcf);
  if(dd.dataset.kmcf&&typeof kpPop==="function"){const h=mcPopHTML(dd.dataset.kmcf,o);const a=nc.querySelector(`.kmc-d[data-kmcd="${d}"]`);if(h&&a)kpPop(a,h)}return}
 const f=T.closest("[data-kmcf]");if(f&&typeof kpPop==="function"){e.stopPropagation();e.preventDefault();const h=mcPopHTML(f.dataset.kmcf,+f.dataset.kmco||0);if(h)kpPop(f,h)}});
document.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;const f=e.target.closest&&e.target.closest(".kmc-lk[data-kmcf]");if(f){e.preventDefault();f.click()}
 if(e.key==="Enter"&&e.target&&e.target.id==="kmc-note"){const c=e.target.closest(".kmc");const b=c&&c.querySelector("[data-kmcsave]");if(b){e.preventDefault();b.click()}}});
/* swipe the grid sideways = the next / last month (a tap is not a swipe: no click is made after a drag, so the day squares keep working) */
(function(){let x0=0,y0=0,live=null;document.addEventListener("touchstart",e=>{const t=e.touches&&e.touches[0];const c=e.target.closest&&e.target.closest(".kmc-grid,.kmc-nav");live=t&&c?c.closest(".kmc"):null;if(t){x0=t.clientX;y0=t.clientY}},{passive:true});
 document.addEventListener("touchend",e=>{const c=live;live=null;const t=e.changedTouches&&e.changedTouches[0];if(!c||!t||!c.isConnected)return;const dx=t.clientX-x0,dy=t.clientY-y0;if(Math.abs(dx)<48||Math.abs(dx)<Math.abs(dy)*1.5)return;
  const o=+c.dataset.kmc,to=o+(dx<0?1:-1);if(to<-1||to>11)return;mcRedraw(c,to,0,false,dx<0?1:-1)},{passive:true})})();
/* hover (mouse) shows the same popover */
document.addEventListener("mouseover",e=>{try{if(!matchMedia("(hover:hover) and (pointer:fine)").matches)return;const f=e.target.closest&&e.target.closest(".kmc-d[data-kmcf]");if(!f||f.__kmh)return;f.__kmh=1;
 const h=mcPopHTML(f.dataset.kmcf,+f.dataset.kmco||0);if(h)kpPop(f,h);f.addEventListener("mouseleave",()=>{f.__kmh=0;const p=document.getElementById("kpop");if(p)p.hidden=true},{once:true})}catch(x){}});
/* ---------- kitDeskCal: the desk calendar in a free corner of her room ---------- */
const KIT_DESKCAL={min:48,max:84,frac:.11,pad:8};
function kdcPlain(){try{return !!(S.out||(typeof isSrv==="function"&&isSrv()))}catch(e){return false}}
function kdcRects(st){const L=[];const add=(e,sx)=>{const r=e.getBoundingClientRect();if(r.width<2||r.height<2)return;if(sx){const w=r.width*sx;L.push({left:r.left+(r.width-w)/2,right:r.right-(r.width-w)/2,top:r.top,bottom:r.bottom})}else L.push(r)};
 st.querySelectorAll("#sc-t,#stop,.ksh,.k3cs,.tag,#j59metag,#tomap,.kmm,.kchip,.kmnote,.empty,.j59more").forEach(e=>{if(e.offsetParent)add(e)});
 st.querySelectorAll("img.figimg,#mefig").forEach(e=>{if(e.offsetParent)add(e,.6)});return L}
function kdcPlace(){const st=document.getElementById("stage"),b=document.getElementById("kmcdesk");if(!st||!b)return;const R=st.getBoundingClientRect();if(R.width<40)return;
 const sz=Math.round(Math.max(KIT_DESKCAL.min,Math.min(KIT_DESKCAL.max,R.height*KIT_DESKCAL.frac)));const p=KIT_DESKCAL.pad;b.style.setProperty("--kmcd",sz+"px");
 const L=kdcRects(st);const sct=st.querySelector("#sc-t");const tb=sct&&sct.offsetParent?sct.getBoundingClientRect().bottom-R.top+4:p;
 const C=[[R.width-sz-p,R.height-sz-p],[p,R.height-sz-p],[p,Math.max(p,tb)],[R.width-sz-p,Math.max(p,tb)]];
 const ov=([x,y])=>{const a={left:R.left+x,top:R.top+y,right:R.left+x+sz,bottom:R.top+y+sz};let s=0;for(const r of L){const w=Math.min(a.right,r.right)-Math.max(a.left,r.left),h=Math.min(a.bottom,r.bottom)-Math.max(a.top,r.top);if(w>0&&h>0)s+=w*h}return s};
 let best=C[0],bs=Infinity;for(const c of C){const s=ov(c);if(s<bs){bs=s;best=c}if(!s)break}
 b.style.left=best[0]+"px";b.style.top=best[1]+"px";b.dataset.ov=Math.round(bs)}
function kitDeskCal(){try{const st=document.getElementById("stage");if(!st)return;let b=document.getElementById("kmcdesk");
 const show=typeof S!=="undefined"&&S&&!S.dead&&(S.place==="home"||(S.out&&S.place==="lc"));if(!show){if(b)b.remove();return}
 const src=`img/kit/desk-cal${kdcPlain()?"-plain":""}.webp`;
 if(!b){b=document.createElement("button");b.type="button";b.id="kmcdesk";b.className="kmcdesk";b.setAttribute("aria-label","Lịch tháng");b.title="Lịch tháng";
  b.addEventListener("click",e=>{e.stopPropagation();kitMonthCalOpen()})}
 let im=b.querySelector("img");const want=src.replace(/^.*?img\//,"img/");if(!im||!(im.getAttribute("src")||"").split("?")[0].endsWith(want)){if(im)im.remove();im=document.createElement("img");im.alt="";im.decoding="async";im.src=src;b.appendChild(im)}if(b.parentNode!==st)st.appendChild(b);
 kdcPlace();requestAnimationFrame(kdcPlace);setTimeout(kdcPlace,350);setTimeout(kdcPlace,1200)}catch(e){console.error(e)}}
window.kitDeskCal=kitDeskCal;
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);kitDeskCal();return r}})();
addEventListener("resize",()=>{clearTimeout(window.__kdcT);window.__kdcT=setTimeout(kdcPlace,150)});
(function(){const st=document.createElement("style");st.id="kmc-css";st.textContent=`
.kmc{display:grid;gap:8px;min-width:0;container-type:inline-size}
.kmc-nav{display:grid;grid-template-columns:44px minmax(0,1fr) 44px;align-items:center;gap:8px}
.kmc-ar{min-width:44px;min-height:44px;padding:0;font-size:1.5rem;line-height:1;font-weight:700}.kmc-ar[disabled]{opacity:.35;cursor:default}
.kmc-head{font-family:var(--display);color:var(--ink);font-size:1rem;text-align:center}.kmc-head b{color:var(--gold)}.kmc-ahead{color:var(--dim);font-size:.8rem}
.kmc-grid{display:grid;gap:6px;min-width:0;max-width:560px;width:100%;justify-self:center}
.kmc-grid.kmc-in-r{animation:kmcInR .2s ease both}.kmc-grid.kmc-in-l{animation:kmcInL .2s ease both}
@keyframes kmcInR{from{opacity:.3;transform:translateX(18px)}to{opacity:1;transform:none}}@keyframes kmcInL{from{opacity:.3;transform:translateX(-18px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.kmc-grid.kmc-in-r,.kmc-grid.kmc-in-l{animation:none}}
.kmc-row{display:grid;gap:4px;min-width:0}
.kmc-cells{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:4px;min-width:0}
@container (min-width:470px){.kmc-cells{grid-template-columns:repeat(10,minmax(0,1fr))}}
.kmc-tl{display:flex;align-items:center;gap:6px;font-family:var(--display);font-size:.76rem;line-height:1.2;color:var(--dim);padding:1px 4px;border-radius:6px}
.kmc-row.on .kmc-tl{color:var(--gold);background:#f0d07033;box-shadow:inset 0 0 0 1px var(--gold)}
.kmc-now{font-size:.62rem!important;white-space:nowrap}
.kmc-d{position:relative;min-width:0;min-height:0;aspect-ratio:1/1;display:flex;flex-direction:column;justify-content:flex-end;margin:0;padding:0;border:1px solid var(--k-hair);border-radius:6px;background:var(--k-card);color:var(--ink);font:inherit;overflow:hidden}
.kmc-row.on .kmc-d{border-color:var(--gold);box-shadow:inset 0 0 0 1px #f0d07088}
.kmc-d.past{opacity:.5}
.kmc-n{position:absolute;top:2px;left:3px;font-weight:700;font-size:.74rem;line-height:1.1}
.kmc-d.f{cursor:pointer;border:1.5px solid var(--gold);box-shadow:0 0 0 1px #f0d07066}
.kmc-d.f img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.kmc-d.f .kmc-n{background:#fffaf0e0;border-radius:4px;padding:0 3px}
.kmc-fn{position:relative;display:block;background:#fffaf0eb;color:var(--ink);font-size:.68rem;font-weight:700;line-height:1.1;padding:2px 1px;text-align:center;overflow-wrap:normal;word-break:keep-all}
.kmc-lk{color:var(--gold);font-weight:700;text-decoration:underline dotted;text-underline-offset:3px;cursor:pointer}
.kmc-none{color:var(--dim);font-size:.85rem}
.kmc-px>div{margin-top:3px}.kmc-pw{color:var(--dim)}
.kmcdesk{position:absolute;z-index:3;width:var(--kmcd,64px);height:var(--kmcd,64px);min-width:44px;min-height:44px;padding:0;margin:0;border:0;background:none;cursor:pointer;filter:drop-shadow(0 2px 3px #2a1a1270)}
.kmcdesk img{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none}
.kmcdesk.kmc-st{position:relative}.kmc-strow{display:flex;gap:16px}
.kmcdesk:active{transform:scale(.94)}
/* §58.3+ entries, moon, quẻ, day box, sổ hẹn */
button.kmc-d{cursor:pointer;text-align:left;-webkit-tap-highlight-color:transparent}
.kmc-d.x:not(.f){background:var(--k-card2,#f3e7cf)}
.kmc-d.sel{filter:var(--k-glow,drop-shadow(0 0 5px #ffd66e) drop-shadow(0 0 2px #be8c1ee6));z-index:1;transform:scale(1.06);border-color:var(--gold)}
.kmc-c{position:absolute;top:2px;right:15px;font-size:.6rem;font-weight:700;line-height:1.1;color:var(--gold);background:#fffaf0e0;border-radius:4px;padding:0 2px}
.kmc-mo{position:absolute;top:3px;right:3px;width:9px;height:9px;border-radius:50%;box-sizing:border-box;border:1px solid #8a7350;background:#fff6d8}
.kmc-mo.p1{background:#3a2e24}.kmc-mo.p15{box-shadow:0 0 3px #f0d070}
.kmc-mo.p8{background:linear-gradient(90deg,#3a2e24 50%,#fff6d8 50%)}.kmc-mo.p23{background:linear-gradient(90deg,#fff6d8 50%,#3a2e24 50%)}
.kmc-d.cy::after{content:"";position:absolute;left:4px;top:18px;width:5px;height:5px;border-radius:50%;background:#c98a96;opacity:.75}
.kmc-tg{position:relative;display:block;margin:0 2px 2px;border-radius:4px;background:var(--k-card,#fffaf0);border:1px solid var(--k-hair);color:var(--ink);font-size:.62rem;font-weight:700;line-height:1.1;padding:1px;text-align:center;overflow-wrap:normal;word-break:keep-all}
.kmc-tg.t-note{border-color:var(--gold);color:var(--gold)}.kmc-tg.t-due,.kmc-tg.t-exam{border-color:#e3a497;color:var(--bad)}
.kmc-que{font-size:.6rem!important;white-space:nowrap}
.kmc-hint{color:var(--dim);font-size:.78rem}
.kmc-day{display:grid;gap:5px;border:1px solid var(--k-hair);border-radius:8px;padding:8px 10px;background:var(--k-card);min-width:0}
.kmc-day .kpst{margin:0}
.kmc-sub{font-family:var(--display);color:var(--gold);font-size:.84rem;margin-top:4px}
.kmc-form{display:grid;gap:6px;min-width:0}
.kmc-pre{display:flex;flex-wrap:wrap;gap:5px}.kmc-pre .kbtn{font-size:.78rem;padding:4px 9px;min-height:34px}
.kmc-save{justify-self:start;min-height:38px}
.kmc-del{font-size:.72rem;padding:1px 7px;min-height:26px;margin-left:4px;vertical-align:middle}

`;document.head.appendChild(st)})();
/* ---------- kit sample page (§47) ---------- */
if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push(
 {id:"§58",title:"kitMonthCal: lịch tháng (mũi tên đổi tháng, ô vuông đều, 3 tuần × 10 ngày, lễ hội cố định)",html:()=>kitMonthCal({o:0})},
 {id:"§58.1",title:"kitMonthCal: tháng có lễ hội (tháng giêng)",html:()=>{const n=mcNow();return kitMonthCal({o:(13-n.m)%12})}},
 {id:"§58.3",title:"kitMonthCal: những ngày ngươi biết (bổng lộc, sinh thần, sổ hẹn, quẻ, trăng) và ô ngày đã chọn",html:()=>{const n=mcNow();return kitMonthCal({o:0,sel:n.t*10+1})}},
 {id:"§58.2",title:"kitDeskCal: lịch để bàn ở góc phòng (thường · lãnh cung)",html:()=>`<div class="kmc-strow"><button type="button" class="kmcdesk kmc-st" aria-label="Lịch tháng"><img src="img/kit/desk-cal.webp" alt=""></button><button type="button" class="kmcdesk kmc-st" aria-label="Lịch tháng"><img src="img/kit/desk-cal-plain.webp" alt=""></button></div>`});
