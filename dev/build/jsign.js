/* ================= jsign: SIGNS BEFORE SUDDEN ENDS (tuantang-warn r2; MAIN 185 rulings 28/11 02:20Z, Foreman C ROOT 4-1-1-1) =================
   Q2 (accidents): jmort sets an accident one month ahead (p.accW) with a sign line; for HER this card follows the line:
      «Điềm gở» — NHẸ «Giữ mình, tránh xa chỗ hiểm» (gain-only, law 3) · VỪA «Mời pháp sư làm lễ giải hạn» (Bạc) = «Lên chùa chép kinh cầu an» (Sức).
      A heeded sign (roll on the road's odds, odds word shown, law 7) means the accident does not come (p.accW.safe); a road that does not help still
      gives its fw (law 3). NPCs heed the sign on the same odds (BAL.mort.sign.npcP %, law 1). The sudden lifespan death's sign lives in jmort
      (sudSign → the omen illness at its last stage, so the existing Thái y cure road works).
   Q3 («Sắp kiệt sức», law 11 family = every Sức-0 death, dev/test/kiet-scan.py): when her Sức falls to BAL.kiet.warn the card comes once
      (again only after Sức climbs above BAL.kiet.reset). A Sức-0 blow that comes BEFORE any warning leaves her at BAL.kiet.floor and the card
      comes then (kietSave); the next Sức 0 kills as before (law 6: the end still happens). Roads by place (cung / lãnh cung / Tân Giả khố /
      nhà): NHẸ rest (gain-only) · VỪA Bạc = Danh · NẶNG Danh, Sức gain rising with the tier (law 2). NPCs (lãnh cung consorts, servants)
      get the same: a warning beat, a road at npcP % on the same odds, the same one-time floor (kietNpcSave).
   Numbers: BAL.mort.sign, BAL.kiet (jbal2, law 4). Kit: PEND + Q item (must:1, as jttw), option rows {n, fx, j67, need}, resultShow, pMe.
   Old saves: S.kiet / p.accW are created on first use. Test: dev/test/tuantang-warn-r2.js. ========================= */
(function(){
const MS=()=>BAL.mort&&BAL.mort.sign,K=()=>BAL.kiet;
function cost(c){c=Object.assign({},c||{});if(c.bac&&typeof price67==="function")c.bac=price67(c.bac);return c}
function short(c){return c.bac&&(S.bac||0)<-c.bac}
function line(R,c,win){return `${word(odA(S,R.p))} · tốn: ${fmt(c)||"không tốn gì"} · thành: ${win} · hỏng: ${fmt(R.fw||{})?`còn lại: ${fmt(R.fw)}`:"không mất gì thêm"}`}
function opt(n,R,win,go){const c=cost(R.c),y={n,fx:c,j67:line(R,c,win),go};if(short(c))y.need=[{t:`✗ Bạc ${-c.bac} (có ${S.bac||0})`,ok:false}];return y}
function npcPay(v,c){for(const k in c)if(typeof v[k]==="number")v[k]=Math.max(0,v[k]+c[k])}
function npcGain(v,w){for(const k in (w||{}))if(typeof v[k]==="number")v[k]+=w[k]}
/* ---------- Q2: her accident card ---------- */
const AR={nhe:"Giữ mình, tránh xa chỗ hiểm",bac:"Mời pháp sư làm lễ giải hạn",sl:"Lên chùa chép kinh cầu an"};
PEND.sgAcc=()=>{try{const w=S.accW;if(!w||w.safe||w.tried)return null;const B=MS().road;
 const o=["nhe","bac","sl"].map(id=>opt(AR[id],B[id],`<span class="g">tai họa không đến</span>`,()=>accGo(id)));o.push({n:"Để sau",fx:{}});
 return{t:`<p class="r">${accSignText(w.t)}.</p><p>Người già trong cung bảo: điềm gở đã hiện, tháng tới phải hết sức giữ mình. Ngươi tính sao?</p>`,o,who:pMe()}}catch(e){console.error(e);return null}};
window.signAccCard=function(){if(window.__bot&&window.__bot.noSign)return;const d=mkP("sgAcc",{});if(!d)return;
 Q.push({t:"Điềm gở",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,must:1});try{evBusyMark()}catch(e){}};
function accGo(id){const w=S.accW;if(!w||w.tried)return;const R=MS().road[id],c=cost(R.c);if(short(c))return;const before=rsnap();apply(c);w.tried=1;
 const ok=roll(odA(S,R.p));if(ok)w.safe=1;else apply(R.fw||{});log(`Điềm gở: ${AR[id]}. ${ok?"Ngươi giữ mình cẩn thận.":"Lòng vẫn chưa yên."}`);
 if(!window.__bot)try{resultShow(`Điềm gở: ${AR[id]}`,before,ok)}catch(e){}}
window.signAccNpc=function(v){const w=v&&v.accW;if(!w||!roll(MS().npcP))return;const B=MS().road;const ids=["nhe","sl"];if((v.bac||0)>=-cost(B.bac.c).bac)ids.push("bac");
 const id=pick(ids),R=B[id];npcPay(v,cost(R.c));w.tried=1;if(roll(typeof v.suc==="number"?odA(v,R.p):oddsCl(R.p)))w.safe=1;else npcGain(v,R.fw)};
/* ---------- Q3: «Sắp kiệt sức» ---------- */
function mode(){if(typeof isKc==="function"&&isKc())return "kc";if(typeof isSrv==="function"&&isSrv())return "srv";return S.out?"lanh":"cung"}
const KR={cung:{nhe:"Cáo ốm, nằm nghỉ vài hôm",bac:"Mời thái y bốc thuốc bổ",sl:"Nhờ người quen ở Thái y viện xin thuốc",nang:"Dâng thư xin miễn việc hầu hạ một thời gian"},
 lanh:{nhe:"Đắp chăn nằm yên, giữ chút hơi ấm",bac:"Lén đưa bạc cho thái giám canh cửa xin than, xin cháo",sl:"Nhờ người cũ lén gửi thuốc vào",nang:"Viết thư xin Thái hậu rủ lòng thương"},
 srv:{nhe:"Gắng ngủ sớm, ăn đủ bữa",bac:"Bỏ bạc mua thuốc bổ ngoài cung",sl:"Nhờ cung nữ cùng phòng làm đỡ việc",nang:"Quỳ xin quản sự cho nghỉ vài hôm"},
 kc:{nhe:"Nằm nghỉ, bớt việc nhà",bac:"Bỏ bạc mời lang trung bốc thuốc",sl:"Nhờ người nhà làm đỡ việc",nang:"Xin cha mẹ cho miễn việc nặng"}};
const KW={cung:"Việc hầu hạ, lễ nghi ngày đêm không ngớt",lanh:"Lãnh cung giá lạnh, cơm canh thiếu thốn",srv:"Việc nặng từ sáng sớm đến tối mịt",kc:"Việc nhà, việc học chồng chất"};
function kSt(){if(!S.kiet)S.kiet={w:0,n:0};return S.kiet}
function kOff(){return !K()||!K().on||!S||S.dead}
PEND.kiet=pp=>{try{const m=KR[mode()],B=K().road;
 const o=["nhe","bac","sl","nang"].map(id=>opt(m[id],B[id],`${fmt(B[id].w)} · <span class="g">qua cơn kiệt sức</span>`,()=>kietGo(id)));o.push({n:"Để sau",fx:{}});
 const hit=pp&&pp.hit;
 return{t:`<p class="r">${hit?"Ngươi ngã quỵ, tưởng đã không qua khỏi; may còn chút hơi tàn.":"Ngươi đã sắp kiệt sức: tay chân rã rời, đứng lên là hoa mắt."}</p><p>${KW[mode()]}. Nếu cứ thế này${hit?", lần sau ngươi sẽ không gượng dậy nổi":", chẳng bao lâu nữa ngươi sẽ không gượng nổi"}. Sức còn ${S.suc}.</p><p>Ngươi nên lo liệu thế nào?</p>`,o,who:pMe()}}catch(e){console.error(e);return null}};
function kFire(hit){if(window.__bot&&window.__bot.noSign)return;if((Q||[]).some(m=>m&&m.pid==="kiet"))return;const d=mkP("kiet",{hit:hit?1:0});if(!d)return;
 Q.push({t:"Sắp kiệt sức",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,must:1});try{evBusyMark()}catch(e){}}
function kietGo(id){const R=K().road[id],c=cost(R.c);if(short(c))return;const before=rsnap();apply(c);const ok=roll(odA(S,R.p));kSt().n++;
 apply(ok?R.w:R.fw||{});log(`Sắp kiệt sức: ${KR[mode()][id]}. ${ok?"Sức hồi lại phần nào.":"Chưa đỡ được bao nhiêu."}`);
 if(!window.__bot)try{resultShow(`Sắp kiệt sức: ${KR[mode()][id]}`,before,ok)}catch(e){}}
/* the warning beat: called at every Sức-0 death check (weekly j3 / j42 / jkc / jkc2, monthly j14) */
window.kietDue=function(){if(kOff())return;const st=kSt();if(S.suc>K().reset)st.w=0;else if(!st.w&&S.suc>0&&S.suc<=K().warn){st.w=1;kFire(false)}};
/* a Sức-0 death check: true = spared this time (no warning came before) → Sức = floor + the card; false = the death goes on */
window.kietSave=function(){if(kOff())return false;const st=kSt();if(st.w)return false;st.w=1;S.suc=Math.max(S.suc,K().floor);kFire(true);log("Ngươi kiệt sức ngã quỵ, may còn chút hơi tàn.");return true};
/* law 1: NPCs (lãnh cung consorts j14, servants j42) — same line, same one-time floor, a road on the same odds */
window.kietNpcSave=function(v){if(!K()||!K().on||!v||v.kietW)return false;v.kietW=1;v.suc=Math.max(v.suc||0,K().floor);kietNpcRoad(v);return true};
function kietNpcRoad(v){if(!roll(K().npcP))return;const B=K().road,ids=["nhe","sl","nang"];if((v.bac||0)>=-cost(B.bac.c).bac)ids.push("bac");
 const id=pick(ids),R=B[id];npcPay(v,cost(R.c));npcGain(v,roll(odA(v,R.p))?R.w:R.fw);v.kietN=(v.kietN||0)+1}
window.kietNpcDue=function(v){if(!K()||!K().on||!v||typeof v.suc!=="number")return;if(v.suc>K().reset)v.kietW=0;else if(!v.kietW&&v.suc>0&&v.suc<=K().warn){v.kietW=1;kietNpcRoad(v)}};
})();
