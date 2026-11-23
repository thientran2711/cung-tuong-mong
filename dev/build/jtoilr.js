/* ================= jtoilr: EXTRA TOILETTE REACTION BUTTONS (owner D27, review/toil-react) =================
   After the reaction dialogs of jtoil (toilFlush: "Xin lỗi / Cười trừ / Đáp lại" for a slight, "Cảm tạ" for praise) four more answers she may pick:
     Ghi hận        (a slight from a consort / Hoàng hậu)  her Oán towards that person +, Đức -1; stored in S.toilGrudge (per person, expires), which
                    makes a later "Mách Hoàng hậu" about the same person likelier (she kept count). Reuses the Oán book (oanAdd(S,v) = S.ro, faded monthly by oanMonth).
     Mách Hoàng hậu (a slight from a consort)  odds by Hoàng hậu's regard; win: Danh +, Hoàng hậu quý +, the culprit oán her; fail = she looks petty: Danh -, Đức -1, Hoàng hậu quý -.
     Tặng lại       (praise from Thái hậu / Hoàng hậu / a consort)  a gift in kind: bạc (about 1/7 of a month's pay, like BAL.thy road costs) OR one of her own things of the same worth (two buttons, same card
                    frame, neither the obvious pick); regard of the giver +.
     Hỏi bí quyết   (a consort who made up better than her)  odds by how she regards her; the price is her regard for Ta (paid even when refused); win: a makeup tip, + skill for BAL.toil.rx.tipDays days.
   Pure add-on: wraps toilReact / toilFlush / toilSkill, appends options to the dialogs jtoil builds (same option fields: n, fx, hideOut, hint, risk, go; nothing new in the UI kit).
   Co-op: S is per player; nothing is sent. Old saves: S.toilGrudge / S.toilTip are created on first use. Numbers: BAL.toil.rx. */
Object.assign(BAL.toil,{rx:{grudgeOan:6,grudgeDuc:1,grudgeDays:30,grudgeTell:10,
 tellBase:50,tellHhDiv:6,tellMin:15,tellMax:85,tellOkDanh:1,tellOkHh:3,tellOkOan:5,tellFailDanh:-2,tellFailDuc:-1,tellFailHh:-2,tellFailOan:8,
 giveMo:.15,giveMin:6,giveItemLo:.8,giveItemHi:1.6,giveAff:2,giveAffBig:3,
 askGap:10,askBase:45,askAffDiv:2,askGhenDiv:5,askProud:15,askAff:-2,askMin:10,askMax:90,tipDays:7,tipBonus:.15}});
const TOIL_RXK=["Ghi hận","Mách Hoàng hậu","Tặng lại","Hỏi bí quyết"];window.TOIL_RXK=TOIL_RXK;
function toilRx(){return BAL.toil.rx}
/* ---- the grudge book (S.toilGrudge[hostKey] = {wk, name}) ---- */
function toilGrudgeOf(host,p){try{const P=p||S;const g=P.toilGrudge&&P.toilGrudge[toilHostKey(host)];return g&&toilWk()-g.wk<=toilRx().grudgeDays?g:null}catch(e){return null}}
function toilGrudgeAdd(host,name,p){const P=p||S;P.toilGrudge=P.toilGrudge||{};P.toilGrudge[toilHostKey(host)]={wk:toilWk(),name:name||toilWho(host)}}
/* ---- the tip (S.toilTip = {wk, until, from}): more skill at the mirror ---- */
function toilTipOn(p){const t=(p||S)&&(p||S).toilTip;return !!(t&&toilWk()<=t.until)}
(function(){const s0=toilSkill;toilSkill=function(){const r=s0.apply(this,arguments);try{if(toilTipOn()){r.sk=Math.max(0,Math.min(1,r.sk+toilRx().tipBonus));r.tip=S.toilTip.from}}catch(e){}return r}})();
/* ---- Tặng lại: price in bạc, and the same worth in one of her own things ---- */
/* a month's pay by rank (BAL.pay, jecon). NEVER stipend(S): it pays out */
function toilGiveCost(p){let st=30;try{st=BAL.pay[Math.min(7,rkOf(p||S))]||30}catch(e){}return Math.max(toilRx().giveMin,Math.round(st*toilRx().giveMo))}
/* the worth of a thing to her = what it would fetch if she sold it (econPrice, jecon: the bạc she would get), so the item road costs the same as the bạc road.
   Only plain, tradable, her-own things: never worn / tainted / forged things, a gift from Hoàng thượng / Thái hậu / Hoàng hậu, a keepsake or an ngự tứ piece (econNo / econGiver). */
function toilGiveItem(cost){const R=toilRx();let best=null;try{(S.inv||[]).forEach((e,i)=>{const it=e&&IT[e.k];if(!it||e.h||e.w||e.t||e.wk||!(it.pr>0))return;if(econNo(S,e)||econGiver(e))return;const v=econPrice(S,e);if(v<cost*R.giveItemLo||v>cost*R.giveItemHi)return;
  const d=Math.abs(v-cost);if(!best||d<best.d)best={i,d,n:it.n,pr:v}})}catch(e){}return best}
/* the kit's own hint wording (KIT §28.6 kitHint, level >= 1): the ladder word of the odds (word(), VANPHONG) folded the way kitHint folds it. Level 0 (vague) names no chance. */
const toilOddsW=o=>{const w=word(o);return kitOddsIdx(w)>=5?"dễ thành":kitOddsIdx(w)<=2?"khó thành":"thành bại khó đoán"};
function toilHhOk(){try{return qOn()&&S.rank<7}catch(e){return false}}
/* ---- ONE rule per answer for her and an NPC consort (AG-ALL-2e3: jagacts3 p3ToilAns / p3ToilPraise / p3ToilAsk run the same functions; p = who answers) ---- */
function toilTellO(p,h){const R=toilRx();return cl(Math.round(R.tellBase+(p.hh||0)/R.tellHhDiv+(toilGrudgeOf(h,p)?R.grudgeTell:0)),R.tellMin,R.tellMax)}
function toilAskO(p,h){const R=toilRx();const T=traitsOf(h)||[];return cl(Math.round(R.askBase+aff(h,p)/R.askAffDiv-(h.ghen||0)/R.askGhenDiv-(T.some(t=>t==="Kiêu ngạo"||t==="Xảo quyệt")?R.askProud:0)),R.askMin,R.askMax)}
function toilRxAp(p,x){if(p===S)apply(x);else ap(p,x)}
function toilRxGrudge(p,h,nm){const R=toilRx();oanAdd(p,h,R.grudgeOan);toilGrudgeAdd(h,nm,p);toilRxAp(p,{duc:-R.grudgeDuc});if(p===S)log(`Ta mím môi ghi nhớ lời ${nm}: món nợ này, ta chưa quên.`);return"grudge"}
function toilRxTell(p,h,nm,odds){const R=toilRx();if(roll(odds==null?toilTellO(p,h):odds)){toilRxAp(p,{danh:R.tellOkDanh,hh:R.tellOkHh});oanAdd(h,p,R.tellOkOan);if(p===S)log(`Ta mách Hoàng hậu; người răn ${nm} vài câu, còn ${nm} đem lòng oán ta.`);return"tellOk"}
 toilRxAp(p,{danh:R.tellFailDanh,duc:R.tellFailDuc,hh:R.tellFailHh});oanAdd(h,p,R.tellFailOan);if(p===S)log(`Ta mách Hoàng hậu, người chê ta hay chấp vặt; ${nm} thêm oán ta.`);return"tellFail"}
function toilRxGive(p,h,nm,gain,what){toilBack(h,gain,p);if(p===S)log(`Ta gửi ${what} đáp lễ; ${nm} nhận lấy, thêm quý ta.`);return"give"}
function toilRxAsk(p,h,nm,odds){const R=toilRx();affAdd(h,p,R.askAff);if(roll(odds==null?toilAskO(p,h):odds)){p.toilTip={wk:toilWk(),until:toilWk()+R.tipDays,from:nm};if(p===S)log(`${nm} chỉ cho ta cách kẻ mày, đánh phấn; tay ta nhờ đó khéo hơn mấy hôm.`);return"askOk"}
 if(p===S)log(`${nm} cười nhạt, không chịu chỉ bảo; ta mất mặt một chút.`);return"askNo"}
/* ---- the extra options of one reaction r (the object toilReact got) ---- */
function toilRxOpts(r){const R=toilRx(),L=[];const h=r.host,cons=h&&h!=="th"&&h!=="emp"&&h!==S;const bad=r.n<0,nm=r.name||toilWho(h);const boss=h==="th"||(h&&h.queen);
 /* Ghi hận */
 if(bad&&cons)L.push({n:"Ghi hận",fx:{},hideOut:true,hint:lv=>lv?`ta nhớ mối này; ${nm} càng bị ta oán, ta thêm lòng dạ hẹp hòi`:"nhớ mối này, sau có dịp đáp lại; lòng dạ thêm hẹp hòi",risk:"an toàn",
  go:()=>toilRxGrudge(S,h,nm)});
 /* Mách Hoàng hậu */
 if(bad&&cons&&!h.queen&&toilHhOk()){const odds=toilTellO(S,h);
  L.push({n:"Mách Hoàng hậu",fx:{},hideOut:true,odds,hint:lv=>lv?`Hoàng hậu có thể răn ${nm}, ta thêm danh tiếng và được lòng Hoàng hậu; ${toilOddsW(odds)}, hỏng thì ta bị cho là hay chấp vặt, mất danh, mất đức, ${nm} càng oán`:`được lòng bề trên; hỏng thì bị cho là hay chấp vặt`,risk:"có rủi ro",
   go:()=>toilRxTell(S,h,nm,odds)})}
 /* Tặng lại */
 if(!bad&&h&&h!=="emp"){const cost=toilGiveCost(),gain=Math.abs(r.n)>=2?R.giveAffBig:R.giveAff,item=toilGiveItem(cost);
  const done=(what)=>toilRxGive(S,h,nm,gain,what);
  L.push({n:"Tặng lại",fx:{bac:-cost},hideOut:true,hint:lv=>lv?`đáp lễ bằng bạc; ${boss?"bề trên":nm} thêm quý ta`:"đáp lễ bằng bạc, người nhận thêm quý ta",risk:"an toàn",go:()=>done("chút bạc")});
  L.push(kitOffIf({n:item?`Tặng lại: ${item.n}`:"Tặng lại bằng một món đồ",fx:{},hideOut:true,hint:`tốn một món của ta, đáng giá ngang chút bạc kia; ${boss?"bề trên":nm} thêm quý ta`,risk:"an toàn",
   go:()=>{if(!item)return;const i=(S.inv||[]).findIndex(e=>e&&IT[e.k]&&itm(e.k).n===item.n&&!e.h&&!e.w&&!e.t&&!e.wk&&!econNo(S,e)&&!econGiver(e)&&econPrice(S,e)===item.pr);if(i<0)return;const x=S.inv.splice(i,1)[0];/* the piece goes to the person thanked (item ledger jil) */if(h&&typeof h==="object"&&h.inv)h.inv.push(x);else if(typeof ilGone==="function")ilGone(S,x,h==="emp"?"emp":h==="th"?"th":"net");done(item.n)}},!!item,kitWhyItem("món đồ đáng giá ngang chút bạc kia"),kitWhenItem()))}
 /* Hỏi bí quyết */
 if(cons&&!h.queen&&!toilTipOn()){let np=null;try{np=toilNpc(h)}catch(e){}const mine=toilToday(S),my=mine&&mine.makeup?(mine.score|0):0;
  if(np&&np.makeup&&np.score>=my+R.askGap){const odds=toilAskO(S,h);
   L.push({n:"Hỏi bí quyết",fx:{},hideOut:true,odds,hint:lv=>lv?`hỏi ${nm} cách trang điểm cho khéo; ${toilOddsW(odds)}, nàng ta bớt quý ta dù có chịu chỉ hay không`:`học được cách trang điểm; hỏi xin thì bị coi thấp một chút`,risk:"có rủi ro",
    go:()=>toilRxAsk(S,h,nm,odds)})}}
 return L}
/* ---- hook: remember each reaction, then add the options to the dialogs toilFlush made for them (same order: strongest first, popMax of them) ---- */
(function(){const f0=toilFlush;toilFlush=function(){const L=(typeof TOIL_POP!=="undefined"?TOIL_POP.slice():[]).sort((a,b)=>Math.abs(b.n)-Math.abs(a.n)).slice(0,BAL.toil.popMax);const n0=Q.length;
 const r=f0.apply(this,arguments);try{const A=Q.slice(n0).filter(m=>m&&m.toilEv);let first=false;A.forEach((m,i)=>{const x=L[i];if(!x||m.toilEv!==x.k||m.toilRx)return;m.toilRx=1;const E=toilRxOpts(x);if(!E.length)return;m.opts=m.opts.concat(E);if(m===Q[0])first=true});
  if(first)showModal()}catch(e){console.error("toil rx",e)}return r};window.toilFlush=toilFlush})();
window.toilRxOpts=toilRxOpts;Object.assign(window,{toilTellO,toilAskO,toilRxGrudge,toilRxTell,toilRxGive,toilRxAsk,toilGiveCost});window.toilGrudgeOf=toilGrudgeOf;window.toilTipOn=toilTipOn;
