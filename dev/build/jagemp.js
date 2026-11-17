/* ================= jagemp: AG2 — THE EMPEROR IS AN AGENT: his night is his own choice (npc-agent §3.2, §5 AG2) =================
   Owner OD:L1386 (every NPC, the Emperor too, plays like a player, by his needs / traits / the existing relation values; no invented bar,
   gate or flat roll for NPC outcomes) + OD 16/11 18:10Z (the Emperor picks WHO; the odds that he calls someone stay 90 %, 65 % when busy
   with court / ill) + OD:L1248 (a person, not a solver: mindPick with jmind's slip). Numbers: BAL.ag.emp (jbal2). HOST ONLY (agOn: a co-op
   guest never decides the world; jcoopworld's flip already draws nothing on the guest).
   What he does at buổi tối (j8 flip core, j75 custom, j55 court crisis, j8 vacant seat):
   1 SUMMON  he calls someone or rests alone: BAL.ag.emp.summon [calm, busy]; busy = ill, Chăm chính sự, or the court in crisis (j55
             tdCrisis — it was a second roll of 30 % on top; now the one 65 % rule). The reason goes into nightWhy ("ngài nghỉ…").
   2 WHO     a weighted pick (mindPick) over the tray, weight = the existing night weight nightCh (Sủng, Sắc, arts × his traits, mood, his
             change-of-face j75 sat, admonition, the cycle…) × his MEMORY of what each person did near him (S.emp.met: her or an NPC's deck
             act — dance, zither, chess, a small gift — success counts 1, a failed one BAL miss; kept BAL keep tuần). The same for her and
             every consort (her acts: runOpt below; an NPC's: j75 npcEffort; the co-op friend's: her own client's memory on her entry).
   3 CUSTOM  mùng 1 / rằm: the lệ (night at Hoàng hậu's palace) is HIS duty weighed against his wish for the card he turned (was j75
             roll 40 / 20): weight custom × duty(traits) vs (100 − custom) × want(nightCh ratio). nightWhy says when he keeps or breaks it.
   4 SEAT    a vacant Hoàng hậu seat: he decides when his duty says so (grows with the months vacant, Thái hậu presses), then picks by the
             same seatW with mindPick (was j8 roll 12 + plain weighted pick).
   Save: S.emp.met = {key: [[tuần, deed, ok], …]} (lazy; old saves load with none). Off: BAL.ag.on = 0 / __agOff (old dice paths stay).
   For the 10-night ledger (OD 18:10Z / 18:40Z / 19:00Z / 19:05Z; review/night-ledger, not built yet): empSummon() + empPick(C) are the
   per-night choice — the ledger calls them once per night; nothing here assumes one night per tuần.
   ===================================================================================================================== */
function empOn(){try{return !!(typeof agOn==="function"&&agOn()&&BAL.ag.emp&&S.emp)}catch(e){return false}}
function empD(){return BAL.ag.emp}
/* why tonight is as it is (read by j75 nightWhy) */
function empWhyZ(){const w=wk();if(!S.empWhy||S.empWhy.wk!==w)S.empWhy={wk:w};return S.empWhy}
function empDuty(){let f=1;try{for(const t of S.emp.traits||[])f*=empD().duty[t]||1}catch(e){}return f}
/* 1 SUMMON: busy (ill / Chăm chính / court crisis) or calm */
function empBusy(){try{if(illOf(S.emp))return"ill"}catch(e){}if(has("chamchinh"))return"duty";try{if(tdOn()&&tdCrisis())return"court"}catch(e){}return""}
function empSummon(){const b=empBusy();const o=empD().summon[b?1:0];const ok=roll(o);const z=empWhyZ();z.k=ok?"call":"rest";z.busy=b;return ok}
/* 2 WHO: his memory of each person's deeds near him */
function empMetL(p){if(!p||!S.emp)return null;if(p.coop&&p.emet)return p.emet;const M=S.emp.met;return M?M[key(p)]||null:null}
function empMet(p,kd,ok){try{if(!p||!S||!S.emp||!empOn())return;const D=empD().met,w=wk();const M=S.emp.met=S.emp.met||{};const k=key(p);
  const L=(M[k]||[]).filter(e=>w-e[0]>=0&&w-e[0]<D.keep);L.push([w,kd,ok?1:0]);while(L.length>D.n)L.shift();M[k]=L}catch(e){console.error("jagemp met",e)}}
function empMemN(p){const L=empMetL(p);if(!L)return 0;const D=empD().met,w=wk();let s=0;for(const e of L)if(w-e[0]>=0&&w-e[0]<D.keep)s+=e[2]?1:D.miss;return Math.min(D.cap,s)}
function empMemF(p){return empOn()?1+empD().met.w*empMemN(p):1}
function empMemK(p){const L=empMetL(p);if(!L||!empMemN(p))return null;const x=L.filter(e=>e[2]).pop()||L[L.length-1];return x?x[1]:null}
function empPrune(){try{const M=S.emp&&S.emp.met;if(!M)return;const w=wk(),K=empD().met.keep;for(const k in M){M[k]=M[k].filter(e=>w-e[0]>=0&&w-e[0]<K);if(!M[k].length)delete M[k]}}catch(e){}}
function empPick(C){empPrune();const t=mindPick(C.map(p=>[p,nightCh(p)*empMemF(p)]),S.emp)||C[0];const z=empWhyZ();z.pick=key(t);z.mem=empMemK(t);return t}
/* 3 CUSTOM: keep the lệ (Hoàng hậu) or follow the card he turned (cur) */
function empCustom(q,cur,base){const D=empD();const nq=Math.max(1,nightCh(q)),nc=cur?nightCh(cur):0;
 const want=cl(Math.sqrt(Math.max(0,nc)/nq),D.want[0],D.want[1]);const df=empDuty();
 const keep=mindPick([["keep",base*df],["break",(100-base)*want]],S.emp)==="keep";
 const z=empWhyZ();z.cust={keep,want:+want.toFixed(2),df:+df.toFixed(2),why:keep?"":has("datinh")?"datinh":has("mesac")?"mesac":want>1?"want":""};return keep}
/* 4 SEAT: when he decides to fill the vacant Hoàng hậu seat, and whom */
function empSeat(){const D=empD().seat;const m=S.turn-(S.vacSince==null?S.turn:S.vacSince);if(m<D.mourn)return false;
 let c=cl(D.b+D.m*(m-D.mourn),D.lo,D.hi)*empDuty()*(S.thDead?1:D.th);return roll(cl(c,0,100))}
function empSeatPick(C,wt){return mindPick(C.map(p=>[p,wt(p)]),S.emp)||C[0]}
/* nightWhy words (VANPHONG: cổ trang, no numbers of odds) */
const EMPREST={ill:"Long thể bất an, ngài nghỉ sớm ở Dưỡng Hòa điện.",duty:"Ngài chăm lo chính sự, phê tấu chương đến khuya.",court:"Triều chính rối ren, ngài ở lại Ngự thư phòng bàn việc với các đại thần.","":"Ngài muốn nghỉ một mình ở Dưỡng Hòa điện."};
const EMPMEM={cam:"tiếng đàn",vu:"điệu múa",ky:"ván cờ",qf:"món quà nhỏ"};
const EMPBRK={datinh:"ngài đa tình, vẫn theo thẻ bài đã lật",mesac:"ngài mê sắc, vẫn theo thẻ bài đã lật",want:"ngài nhớ người trên thẻ bài đã lật hơn",'':"ngài vẫn theo thẻ bài đã lật"};
function empWhyTxt(d){const z=d&&d.emp;if(!z)return"";
 if(!d.pick)return z.k==="rest"?EMPREST[z.busy||""]:"";
 let t="";if(z.cust&&!z.cust.keep&&d.day&&d.cause!=="custom"&&d.cause!=="stolen")t+=`Hôm nay là ${d.day}, theo lệ ngài nghỉ ở cung Hoàng hậu, nhưng ${EMPBRK[z.cust.why||""]}. `;
 if(z.mem&&z.pick===d.pick&&d.cause!=="custom"&&d.cause!=="stolen")t+=`Ngài còn nhớ ${EMPMEM[z.mem]||"việc"} hôm trước của ${d.pick==="me"?"ngươi":"nàng"}.`;
 return t.trim()}
/* her deeds near him, read by name from her deck / talk (the same deeds as an NPC's npcEffortKind: BAL.deck cam / vu / ky / qf) */
const EMPDECK={"Đàn khúc Phượng cầu hoàng":"cam","Kinh hồng vũ":"vu","Đánh cờ với Hoàng thượng":"ky"};
function empDeckK(a){if(!a||!a.n)return"";if(EMPDECK[a.n])return EMPDECK[a.n];try{if(/^Dâng /.test(a.n)&&a.c&&a.c.bac===-BAL.deck.qf.bac&&a.w&&a.w.sung!=null)return"qf"}catch(e){}return""}
(function(){if(typeof runOpt!=="function")return;const ro=runOpt;runOpt=function(a){const r=ro.apply(this,arguments);try{if(r!=null&&a){const k=empDeckK(a);if(k)empMet(S,k,r)}}catch(e){}return r}})();
Object.assign(window,{empOn,empSummon,empPick,empCustom,empSeat,empSeatPick,empMet,empMemF,empMemN,empWhyTxt,empBusy});
