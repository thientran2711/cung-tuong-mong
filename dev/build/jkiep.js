/* ================= jkiep: TRỌN KIẾP / KIẾP DỞ DANG (sếp 11/14: chống "chết cho nhanh để đổi kiếp"); bọc j52 =================
   - Trọn kiếp: sống ít nhất 1 năm game (12 tháng), HOẶC được thăng tới Quý nhân (người vào cung từ Quý nhân trở lên: thêm một bậc),
     HOẶC (cung nữ cnv) lên Chưởng sự cô cô hay được sủng hạnh. Đạt rồi thì giữ mãi (S.kpTron) và có một dòng ghi.
   - Kiếp dở dang: chết hay bỏ ngang (Kiếp mới / ghi đè sổ đang sống) trước mốc. Mất Phúc duyên kết cục và mọi Phúc duyên đã tích
     trong kiếp đó, trừ thêm KIEP.pen (không xuống dưới 0); kiếp sau không được đổi thân phận (khóa trên bản gieo sẵn "ctm-nextlife").
     Thẻ kết kiếp và Sổ luân hồi ghi "Kiếp dở dang: …". Chết vì bị hại ngoài ý muốn cũng tính (không phân biệt được).
   - Trước khi bỏ ngang (nút Kiếp mới trên sổ đang sống, việc của hệ thống): bấm hai lần. Trong game không hỏi lại sau khi chọn (sếp 24/11 ~08:40Z).
   - Cung nữ (cnv): mốc giữa chặng là thành tựu thật: lên Chưởng sự cô cô, được sủng hạnh, lên Phi lần đầu; mỗi mốc +Phúc duyên và ghi Sổ luân hồi. */
const KIEP={mo:12,rk:2,pen:30,ms:{cs:10,sh:15,phi:10}};
const KP_RULE="Kiếp chỉ tính là trọn khi sống đủ một năm trong cung hoặc được thăng tới Quý nhân (cung nữ: lên Chưởng sự hay được sủng hạnh). Chết hay bỏ ngang trước đó là kiếp dở dang: mất Phúc duyên của kiếp ấy, trừ thêm "+KIEP.pen+", kiếp sau không được đổi thân phận.";
function kpSrv(){return typeof isSrv==="function"&&isSrv()}
function kpNow(){if(!S)return true;if(S.kpTron)return true;const r0=S.kpR0!=null?S.kpR0:0;const mr=Math.max(S.rank||0,S.maxRank||0);
 if((S.turn||0)>=KIEP.mo)return "sống đủ một năm";
 if(S.srv&&(S.srv.risen||(S.srv.rk||0)>=BAL.srvRk.cs||(S.srv.rk0||0)>=BAL.srvRk.cs))return S.srv.risen?"được sủng hạnh":"lên Chưởng sự cô cô";
 if(!S.srv&&mr>=Math.max(KIEP.rk,r0+1))return `thăng ${RANKS[Math.min(7,mr)].n}`;return false}
function kpCheck(){if(!S||S.dead)return !!(S&&S.kpTron);if(S.kpTron)return true;if((typeof NLP!=="undefined"&&NLP)||S.kpR0==null)return false;const w=kpNow();if(w){S.kpTron=1;try{log(`<span class="pdl">Kiếp này đã trọn (${w}): từ nay chết hay bỏ ngang không còn mang nghiệp.</span>`)}catch(e){}return true}return false}
function kpWhy(){const L=[];L.push(`mới ${S.turn||0}/${KIEP.mo} tháng trong cung`);if(S.srv)L.push("chưa lên Chưởng sự, chưa được sủng hạnh");else L.push(`chưa được thăng tới ${RANKS[Math.max(KIEP.rk,(S.kpR0||0)+1)].n}`);return L.join(", ")}
function kpLock(){try{const d=store.get(NL_KEY)||nlGet();d.lock=1;store.set(NL_KEY,d)}catch(e){}}
function kpLocked(){try{const d=store.get(NL_KEY);return !!(d&&d.lock)}catch(e){return false}}
/* the life's log entry (Sổ luân hồi) gets a note */
function kpLifeNote(t){try{const p=lifeLog();if(p[0]&&S&&p[0].n===S.name){p[0].f=(p[0].f||"")+" · "+t;store.set("cung-luanhoi",p)}}catch(e){}}
/* penalty: everything this life earned is taken back, and KIEP.pen more */
function kpPenalty(base){const now=pdGet();const lost=Math.max(0,now-base);const after=Math.max(0,base-KIEP.pen);pdSet(after);kpLock();return{lost,after,pen:base-after}}
/* death / ending */
(function(){const o0=over;over=function(h,t,fate){if(!S||S.dead)return o0.apply(this,arguments);const tron=kpCheck();const why=tron?"":kpWhy();const base=pdGet()-(S.pdLife||0);
 const r=o0.apply(this,arguments);
 try{if(!tron){const P=kpPenalty(base);S.kpDo=1;window.__kpDo=(window.__kpDo||0)+1;const line=`<p class="pdend r"><b>Kiếp dở dang:</b> ${why}. Không nhận Phúc duyên của kiếp này${P.lost?` (${P.lost})`:""}, trừ thêm ${P.pen} · Tổng: <b>${P.after}</b>. Kiếp sau không được đổi thân phận.</p>`;
  const m=Q.find(x=>x&&x.cls==="end");if(m){m.h=m.h.replace(/<p class="pdend">[\s\S]*?<\/p>/,"")+line;if(Q[0]===m)showModal()}
  kpLifeNote(`Kiếp dở dang: ${why}`);log(`<span class="r">Kiếp dở dang: ${why}.</span>`)}}catch(e){console.error(e)}
 return r}})();
/* abandoning a living, unfinished life from the title screen (Kiếp mới over a live slot) */
(function(){const sl=$("slots");if(!sl)return;const h0=sl.onclick;sl.onclick=function(e){try{const b=e.target.closest("button");if(b&&b.dataset.new&&b.dataset.ask){const d=loadSlot(+b.dataset.new);const s=d&&d.S;
   /* OB-M3UI (fault 3, SYSTEM act — OD 24/11 ~08:40Z keeps system confirms): abandoning a living life from the title = the ONE kit confirm (kitConfirm), no more «bấm lần nữa» button text */
   if(s&&!s.dead&&!s.kpTron){if(b.dataset.ask==="1"){e.stopImmediatePropagation&&e.stopImmediatePropagation();kitConfirm({title:"Bỏ ngang kiếp này?",lines:[`Kiếp này chưa trọn, bỏ ngang sẽ mang nghiệp: mất Phúc duyên kiếp này${s.pdLife?` (${s.pdLife})`:""}, trừ thêm ${KIEP.pen}, kiếp sau không được đổi thân phận.`],yes:"Bỏ ngang",no:"Thôi",onYes:()=>{setTimeout(()=>{try{b.dataset.ask="2";b.click()}catch(x){console.error(x)}},0)}});return}
    if(b.dataset.ask==="2"){const base=pdGet()-(s.pdLife||0);kpPenalty(base);try{const p=lifeLog();p.unshift({n:s.name,o:((typeof originByKey==="function"&&originByKey(d.ok))||{}).n||(s.origin&&s.origin.n)||""/* a save keeps the origin KEY (d.ok), not S.origin */,r:lifeTopRank(s).n,age:s.age,y:s.year,kids:(s.kids||[]).length,fc:s.fc||"",f:"Bỏ ngang · Kiếp dở dang",foes:[]});store.set("cung-luanhoi",p.slice(0,40))}catch(x){}}}}}catch(x){console.error(x)}
 return h0.apply(this,arguments)}})();
/* identity card: no reroll after an unfinished life */
(function(){const c0=nlCardHTML;nlCardHTML=function(){let h=c0.apply(this,arguments);try{if(kpLocked())h=h.replace(/<button class="opt" data-nl="re"[\s\S]*?<\/button>/,`<button class="opt" data-nl="re" disabled>Đổi thân phận<small data-kp="1">Kiếp trước dở dang: kiếp này không được đổi thân phận</small></button>`)}catch(e){}return h}})();
(function(){const r0=nlReroll;nlReroll=function(){if(kpLocked())return;return r0.apply(this,arguments)}})();
/* a new life: remember the starting rank, explain the rule on the entry card */
(function(){const a0=nlAccept;nlAccept=function(){const r=a0.apply(this,arguments);try{if(S&&!S.dead){S.kpR0=S.rank||0;S.kpTron=0;
  const m=Q.find(x=>x&&!x.nl&&x.h&&!/kp-rule/.test(x.h));if(m)m.h+=`<p class="past kp-rule">${KP_RULE}</p>`}}catch(e){}return r}})();
try{KIT_GLOSS["Phúc duyên"]="Điểm tích qua các kiếp. Dùng để đổi thân phận khi bắt đầu kiếp mới. "+KP_RULE}catch(e){}
/* OB-M3UI (fault 3 family): OWNER OD 24/11 ~07:25Z + ~08:08Z «không có một lời nhắc nào về bất cứ hành động của tôi» — NO re-ask after she taps a game option, ending choices included
   («Kiếp này chưa trọn … Nghĩ lại / Vẫn chọn» was one). kpGate stays callable (co-op thin cards call it) but never asks: the loss shows after (Kiếp dở dang card). */
window.kpGate=function(i){return false};
(function(){const c0=chooseM;chooseM=function(i){if(window.kpGate(i))return;return c0.apply(this,arguments)}})();
/* cung nữ milestones */
function kpMs(k,why){S.kpMs=S.kpMs||{};if(S.kpMs[k])return;S.kpMs[k]=1;try{pdAdd(KIEP.ms[k],why,"ms_"+k)}catch(e){}(S.kpMsL=S.kpMsL||[]).push(why)}
function kpMsCheck(){if(!S||S.dead||!S.origin||S.origin.k!=="cnv"||!S.srv)return;
 if((S.srv.rk||0)>=BAL.srvRk.cs||(S.srv.rk0||0)>=BAL.srvRk.cs)kpMs("cs","cung nữ lên Chưởng sự cô cô");
 if(S.srv.risen)kpMs("sh","cung nữ được sủng hạnh, phong phi tần");
 if(S.srv.risen&&(S.rank||0)>=4)kpMs("phi","từ cung nữ lên Phi")}
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{kpMsCheck();kpCheck()}catch(e){}return r}})();
(function(){const r0=render;render=function(){try{if(S&&!S.dead){kpMsCheck();kpCheck()}}catch(e){}return r0.apply(this,arguments)}})();
(function(){const l0=lifeSave;lifeSave=function(f){const r=l0.apply(this,arguments);try{if(S&&S.kpMsL&&S.kpMsL.length)kpLifeNote("Mốc: "+S.kpMsL.join(", "))}catch(e){}return r}})();
/* old saves (before this rule): the rank they have now is the starting point */
(function(){const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{if(S&&S.kpR0==null)S.kpR0=S.rank||0}catch(e){}return r}})();
