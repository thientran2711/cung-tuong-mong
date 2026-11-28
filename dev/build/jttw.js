/* ================= jttw: TUẪN TÁNG — signs first, then roads (MAIN 183 order 28/11 00:38Z, Foreman E ES8-bd_tuyet-random5-h) =================
   Before: when the Emperor died, two engine rolls could end her life with no warning and no choice:
     (A) «Tân Thái hậu xét lại chuyện cũ» (j3 emperorDies): the heir is another consort's son, she is below Hoàng hậu → spared at
         od(BAL.odb.j3.odO + Đức/2 + the new Thái hậu's tie to her/2), else lụa trắng.
     (B) «Di chiếu theo hầu nơi Hoàng lăng» (jmort mortFate): childless favourite (Sủng ≥ BAL.mort.fate.tuanSung) → tuanP % unless
         Đức ≥ tuanDuc or Thái hậu ≥ tuanTh.
   Now (law 6 real world: the signs exist in the world before; law 2 tiered roads; law 3 every road gains; law 4 BAL.mort.ttw):
   1. SIGNS: each month (after monthTick) ttwRisk() reads the SAME conditions the engine will read on the day; when her chance to be
      spared is below BAL.mort.ttw.warnO a «Lời đồn hậu sự» card comes: at once the first time, then every cd.sign months while the
      Emperor shows a sign (his omen illness / weakness reported by the Thái y, a plot rumour), else every cd.quiet months.
      The card says who threatens her and her chance today (odds word, law 7).
   2. ROADS (one card, ≤ 3 tiers, Tốn and Được rise together; the bạc road has a matching non-bạc road, law 2):
      NHẸ  thỉnh an / chép kinh (Sức)                          → protection +road.nhe.pz, the tie (A: the heir's mother, B: Thái hậu) +
      VỪA  dâng lễ (Bạc)  ·  hết lòng với Thái tử / Thái hậu (Sức) → protection +road.vua.pz, the tie ++, Sủng − (time away from him)
      NẶNG cáo bệnh, lánh xa ân sủng (Sủng)                    → protection +road.nang.pz, Đức +, Sức + (and lower Sủng = B no longer applies)
      Every road can fail (odds word on the card); a failed road still gives a little (law 3). Protection S.ttw.pz is capped at
      BAL.mort.ttw.cap, so the end can still happen (roads raise odds, never guarantee).
   3. ON THE DAY: (A) adds S.ttw.pz to the j3 odds base; (B) a hit is still averted when roll(min(cap, pz)) (jmort save line).
      With no road taken (pz 0) both rolls are exactly as before.
   4. TWO-WAY (law 1): NPC consorts at risk B take a road too, on their own risk and rhythm (BAL.mort.ttw.npcP % per beat, same odds and
      costs as hers, v.ttwPz); when she, as the new Thái hậu,
      forces a foe to tuẫn táng (j99succ «Chuyện cũ hậu cung»), the foe's v.ttwPz can save her (triều thần can, she is sent to a temple).
   Off: co-op (the Emperor's death is muted there) and the servant road (no consort). In lãnh cung the signs and roads stay (letters, gifts).
   PEND "ttw" (rebuilt from S on load). Old saves: S.ttw is created on first use. Test: dev/test/tuantang-warn.js. ========================= */
(function(){
const T=()=>BAL.mort&&BAL.mort.ttw;
function ttwOff(){const B=T();return !B||!B.on||!S||S.dead||S.empDead||(S.succ&&S.succ.on)||!(BAL.mort&&BAL.mort.on)||
 (window.COOPW&&COOPW.on)||(typeof isSrv==="function"&&isSrv())}
function ttwSt(){if(!S.ttw)S.ttw={pz:0,last:-999,n:0};return S.ttw}
const mi=()=>(S.year||1)*12+(S.month||1);
/* the heir the engine will pick on the day (j99succ first, j51 / j3 fallbacks) */
function ttwHeir(){let h=S.heir&&S.heir.k&&S.heir.k.alive?S.heir:null;
 if(!h&&typeof kvOrder==="function")try{const o=kvOrder().sort((a,b)=>a.k.bt-b.k.bt);const x=o.find(z=>z.dich)||o[0];if(x)h={k:x.k,v:x.v}}catch(e){}
 if(!h)try{const c=allKids().filter(([k])=>k.alive&&k.sex==="m").sort((a,b)=>b[0].age-a[0].age);if(c.length)h={k:c[0][0],v:c[0][1]}}catch(e){}
 return h}
/* risk B (jmort mortFate): the share of a hit she cannot avert */
function favHit(pz){const F=BAL.mort.fate;if(mySons().length||myDaus().length||(S.sung||0)<F.tuanSung)return 0;
 if((S.duc||0)>=F.tuanDuc||(!S.thDead&&(S.th||0)>=F.tuanTh))return 0;return F.tuanP/100*(1-Math.min(T().cap,pz)/100)}
/* what the engine would do today: {k:"th"|"fav", v, h, o (chance spared, 5–95)} or null (no risk) */
window.ttwRisk=function(){if(ttwOff())return null;const B=T(),pz=ttwSt().pz;
 try{const m=S.vgAlly&&typeof manById==="function"&&manById(S.vgAlly);if(m&&m.tinh>=BAL.tinhLv.ally&&S.rank<7)return null}catch(e){}/* j24: a Vương gia ally takes her out */
 if(S.rank>=7)return null;const h=ttwHeir();if(h&&!h.v)return null;/* her own son → Hoàng thái hậu */
 let k="fav",v=null,spare=1;
 if(h&&h.v&&h.v.alive&&!h.v.out){v=h.v;k="th";let b=j3SpareB(v)+pz;try{if(succNpcClaims(v,h.k))b-=12}catch(e){}spare=od(b)/100}
 const f=favHit(pz);spare*=1-f;if(k==="fav"&&!f)return null;
 const o=oddsCl(Math.round(spare*100));return{k,v,h,o,f:f>0}};
window.ttwPz=function(){return S&&S.ttw&&!ttwOffSoft()?S.ttw.pz||0:0};
function ttwOffSoft(){const B=T();return !B||!B.on||(window.COOPW&&COOPW.on)}
/* jmort mortFate: a hit averted by the roads she took */
window.ttwSpare=function(){const p=ttwPz();return p>0&&roll(Math.min(T().cap,p))};
/* the Emperor's signs (jmort omen / weak / plot rumour) */
function ttwSign(){const e=S.emp||{};if(e.ill&&e.ill.mort)return e.ill.st>=3?"crit":"ill";if(e.pre)return "weak";if(S.mort&&S.mort.plot)return "plot";return ""}
function vN(v){try{if(typeof kitKnownName==="function"&&!kitKnownName(v))return `một vị ${rkName(v)}`}catch(e){}return `${rkName(v)} ${v.name}`}
function sonN(h){return h&&h.k?String(h.k.name||"hoàng tử"):"hoàng tử"}
const SIGN={crit:"Thái y viện quỳ suốt đêm ngoài Càn Thanh cung; long thể nguy kịch.",ill:"Thái y viện ra vào Càn Thanh cung, thuốc thang không ngớt; long thể bất an.",
 weak:"Dạo này Hoàng thượng hay mệt, buổi chầu thường cho bãi sớm.",plot:"Trong cung đồn có kẻ mưu hại thánh thượng, cấm quân tăng canh.",
 "":"Hoàng thượng vẫn còn khỏe, nhưng lời bàn tán trong cung chưa dứt."};
function ttwText(r){const s=ttwSign();let t=`<p>${SIGN[s]}</p>`;
 if(r.k==="th")t+=`<p>Cung nhân xì xào: ${vN(r.v)} là mẹ của ${sonN(r.h)}. Nếu một mai long thể có mệnh hệ gì, ${r.v.name?"người ấy":"nàng"} sẽ ngồi Từ Ninh cung, và chuyện cũ giữa hai người khó lòng bỏ qua.${r.f?" Lại thêm lệ cũ: phi tần được sủng mà không con phải theo hầu nơi Hoàng lăng.":""}</p>`;
 else t+=`<p>Cung nhân xì xào: theo lệ cũ, khi tiên đế băng hà, di chiếu thường cho phi tần được sủng mà không con theo hầu nơi Hoàng lăng. Ngươi được sủng ái, lại chưa có con.</p>`;
 t+=`<p>Nếu chuyện ấy đến hôm nay, cơ được tha: <b>${word(r.o)}</b>.${S.ttw.pz?" Những việc ngươi lo liệu trước đã có người ghi nhận.":""} Ngươi nên lo liệu thế nào?</p>`;return t}
/* the roads; tie = the person whose favour saves her on that path (A: the heir's mother, B: the Thái hậu) */
function ttwRoads(r){const R=T().road,th=r.k==="th",who=th?vN(r.v):"Thái hậu",S0=sonN(r.h);
 return[
  {id:"nhe",n:th?`Năng sang thỉnh an ${who}`:"Chép kinh dâng Thái hậu",c:R.nhe.c,p:R.nhe.p,wx:th?"nàng bớt giận ngươi":"Thái hậu để ý đến ngươi"},
  {id:"bac",n:th?`Dâng lễ hậu cho ${who}`:"Đút lót thái giám giữ di chiếu",c:R.bac.c,p:R.bac.p,wx:th?"nàng nhận lễ, nhớ ơn ngươi":"tên ngươi được gạch khỏi sổ theo hầu"},
  {id:"sl",n:th?`Hết lòng chăm lo cho ${S0}`:"Ngày ngày hầu thuốc bên Thái hậu",c:R.sl.c,p:R.sl.p,wx:th?"mẹ con nàng nợ ngươi một ân":"Thái hậu quý ngươi"},
  {id:"nang",n:"Cáo bệnh, lánh xa ân sủng",c:R.nang.c,p:R.nang.p,wx:"ngươi khuất khỏi mắt mọi người"}]}
function ttwCost(c){c=Object.assign({},c||{});if(c.bac&&typeof price67==="function")c.bac=price67(c.bac);return c}
function ttwWin(id,r){const R=T().road[id],th=r.k==="th";const w=Object.assign({},R.w||{});if(!th)w.th=(w.th||0)+R.th;return w}
function ttwLine(o,r){const R=T().road[o.id];const od_=odA(S,o.p),w=ttwWin(o.id,r);
 const win=[fmt(w),`<span class="g">${o.wx}</span>`,"được miễn dễ hơn"].filter(Boolean).join(" · ");
 const lose=[fmt(R.l||{}),fmt(R.fw||{})?`còn lại: ${fmt(R.fw)}`:""].filter(Boolean).join(", ");
 return `${word(od_)} · tốn: ${fmt(ttwCost(o.c))} · thành: ${win} · hỏng: ${lose||"không mất gì thêm"}`}
PEND.ttw=pp=>{try{const r=ttwRisk();if(!r)return null;const O=ttwRoads(r);
 const o=O.map(x=>{const fx=ttwCost(x.c);const y={n:x.n,fx,j67:ttwLine(x,r),go:()=>ttwGo(x.id)};
  if(fx.bac&&(S.bac||0)<-fx.bac)y.need=[{t:`✗ Bạc ${-fx.bac} (có ${S.bac||0})`,ok:false}];return y});o.push({n:"Để sau",fx:{}});
 return{t:ttwText(r),o,who:pMe()}}catch(e){console.error(e);return null}};
function ttwFire(){const d=mkP("ttw",{});if(!d)return false;Q.push({t:"Lời đồn hậu sự",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,must:1});/* must: the event gate (j68 evGate) may hold or DROP optional cards; a life-or-death warning is never dropped */try{evBusyMark()}catch(e){}return true}
function ttwGo(id){const r=ttwRisk();if(!r)return;const B=T(),R=B.road[id],st=ttwSt();const o=ttwRoads(r).find(x=>x.id===id);if(!o)return;
 {const c=ttwCost(o.c);if(c.bac&&(S.bac||0)<-c.bac)return}
 const p=odA(S,o.p);const before=rsnap();apply(ttwCost(o.c));const ok=roll(p);st.n++;(st.done=st.done||{})[id]=(st.done[id]||0)+1;
 if(ok){st.pz=Math.min(B.cap,st.pz+R.pz);apply(ttwWin(id,r));if(r.k==="th"&&R.rel)try{relAdd(r.v,S,R.rel)}catch(e){}}
 else{apply(R.l||{});apply(R.fw||{});if(r.k==="th"&&R.rel)try{relAdd(r.v,S,R.frel)}catch(e){}}
 log(`Lời đồn hậu sự: ${o.n}. ${ok?"Thành.":"Không thành."}`);if(!window.__bot)try{resultShow(`Lời đồn hậu sự: ${o.n}`,before,ok)}catch(e){}}
/* NPC consorts at risk B take a road too (law 1, two-way; RV-163L FAIL-1/2): on their OWN risk (childless, Sủng ≥ tuanSung, no Đức save),
   on their own rhythm (v.ttwLast, same cd as hers), independent of whether SHE is at risk; the road pays its cost and rolls the SAME BAL odds
   (odA on the NPC); success adds protection + w, failure pays l and still gives its fw (law 3) — the same rows as her ttwGo. Bạc road only when the NPC has the bạc. */
function npcRisk(v){const F=BAL.mort.fate;return !((v.kids||[]).some(k=>k.alive)||(v.sung||0)<F.tuanSung||(v.duc||0)>=F.tuanDuc)||npcRiskA(v)}
/* RV-181 (law 1): the mirror of her path A — when HER son is the heir she will be the new Thái hậu and may force a foe to tuẫn táng (j99succ
   «Chuyện cũ hậu cung»); an NPC below Hoàng hậu whose mercy odds on the same formula as hers (j3: odO + own Đức/2 + tie to her/2) are below
   warnO is at risk and takes the roads, kids or not (her path A ignores kids too). */
function npcRiskA(v){const h=S.heir;if(!h||!h.k||!h.k.alive||h.v||v.queen||(v.rank||0)>=7)return false;return od(j3SpareB(v,v.duc||0))<T().warnO}
function ttwNpc(){const B=T(),cd=ttwSign()?B.cd.sign:B.cd.quiet;try{for(const v of liveRivals(false)){if(!npcRisk(v))continue;if(mi()-(v.ttwLast==null?-999:v.ttwLast)<cd)continue;v.ttwLast=mi();if(!roll(B.npcP))continue;
 const ids=["nhe","sl","nang"];{const c=ttwCost(B.road.bac.c);if((v.bac||0)>=-c.bac)ids.push("bac")}const id=pick(ids),R=B.road[id],c=ttwCost(R.c);
 for(const k in c)if(typeof v[k]==="number")v[k]=Math.max(0,v[k]+c[k]);
 const ok=roll(odA(v,R.p));v.ttwN=(v.ttwN||0)+1;
 const add=o=>{for(const k in (o||{}))if(typeof v[k]==="number")v[k]=Math.max(0,v[k]+o[k])};/* RV-163M: same outcome rows as hers (ttwGo): success w, failure l then fw */
 if(ok){v.ttwPz=Math.min(B.cap,(v.ttwPz||0)+R.pz);add(R.w)}else{add(R.l);add(R.fw)}}}catch(e){console.error(e)}}
window.ttwNpcTick=ttwNpc;
window.ttwNpcSpared=function(v){return !!(v&&v.ttwPz>0&&roll(Math.min(T().cap,v.ttwPz)))};
/* the monthly beat */
window.ttwMonth=function(){if(ttwOff())return;ttwNpc();const r=ttwRisk();if(!r||r.o>=T().warnO)return;const st=ttwSt(),s=ttwSign();
 const cd=s?T().cd.sign:T().cd.quiet;if(mi()-st.last<cd)return;if((Q||[]).some(m=>m&&m.pid==="ttw"))return;
 if(ttwFire()){st.last=mi();log(`Lời đồn hậu sự: ${s?SIGN[s]+" ":""}trong cung bắt đầu bàn chuyện hậu sự.`)}};
if(typeof monthTick==="function"){const m0=monthTick;monthTick=function(){const ev=m0.apply(this,arguments);try{if(S&&!S.dead)ttwMonth()}catch(e){console.error(e)}return ev}}
})();
