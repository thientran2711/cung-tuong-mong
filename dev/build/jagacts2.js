/* ================= jagacts2: AG-ALL-2 — the NPC acts still missing after AG-ALL (consort NO rows, the Emperor's visit / tea / bestowal) =================
   Owner OD 17/11 ~13:20Z (L1588): each GROUP of NPCs gets the WHOLE option set the player of that group has, same buttons, same formulas, chosen by needs ×
   traits × tâm cơ × goals; ~13:55Z: "nếu như bất kỳ một cái nhóm nào thiếu thì tự bổ sung vô luôn, không cần phải hỏi tôi duyệt đâu".
   Report: dev/handover/reports/ag-all.md §16 (handover branch). Core: jagday.js (agReg / agRunReg / day plan). Numbers: BAL.ag.cx2 / emp3 / give (jbal2);
   the player's cards read the SAME entries through cx2O (j8) — ONE CORE.
   1 CONSORT  Tâng bốc · Nói thật lòng · Phô tài · Xin ân điển · Bàn chuyện triều chính (at the Emperor's place) · Hầu thuốc Hoàng thượng (he is ill) ·
              Đưa con đến thỉnh an Hoàng thượng · Chữa bệnh cho con · Xin thuốc cho con / Bài thuốc dễ thụ thai / Mời làm thái y tâm phúc (Thái y viện) ·
              Hỏi sở thích Hoàng thượng (Kính sự phòng; what she learns makes her small gift sure, the player's known-flower rule j75) · Hỏi chuyện cũ (lãnh cung) ·
              Trút giận · Lục rương tìm chứng cứ · Nhờ giúp đỡ. Each = the player's card: cost, odds (odA over cx2O), gain / loss, the same side effects.
              Two needs join hers: bac (silver short: Xin ân điển, Nhờ giúp đỡ) and kid for a mother whose child is sick (kidCare).
   2 EMPEROR  Ngự giá lâm cung: his evening plan picks WHOM he visits among every consort (her, the co-op friend, NPC consorts) by visCh × his memory of
              them (mindPick), visGo (jvisit) runs the one visit — the daily roll is off while the loop runs. Ghé uống trà: his day plan, any consort with
              Sủng ≥ BAL.visit.tea.minSung (her card = empTeaCard, j24; the approach-pool roll is off). Bestowal (bestow, every site): empGive = his choice
              from his regard (Sủng, Ân tình, memory, mood, traits) at the site's old % — no flat roll; the Thái hậu's pet gift: thGive (her regard).
   Off: BAL.ag.on = 0 / agDOn false → the old paths (cx2O / empGive fall back to roll(%) at the same numbers).
   ===================================================================================================================== */
const AG2={stat:{opt:0,land:0,give:0,giveNo:0,visit:0,tea:0,by:{}}};
function ag2Kid(v,f){const L=kidsOf(v);return L.length?L.slice().sort(f)[0]:null}
function ag2Sick(v,hp){return kidsOf(v).filter(k=>k.hp<hp).sort((a,b)=>a.hp-b.hp)[0]||null}
/* her two new needs (silver; a sick child) — added to jagent agNeeds, so the day intent and every buổi pick weigh them like the others */
(function(){const n0=agNeeds;agNeeds=function(v){const N=n0.apply(this,arguments);try{const X=BAL.ag.cx2;N.bac=cl((X.bac.goal-(v.bac||0))/X.bac.goal,0,1)*X.bac.w;
  if(ag2Sick(v,X.kidMed.hp))N.kid=Math.max(N.kid||0,X.kidCare)}catch(e){}return N}})();
try{AGWHY.bac="lo thiếu bạc chi tiêu";if(!AGWHY.kid)AGWHY.kid="lo cho con cái"}catch(e){}
/* ---------------- 1. CONSORT cards ---------------- */
const AGC2={
 flat:{act:"tâng bốc Hoàng thượng",tag:"social",at:"emp"},
 true:{act:"thưa chuyện thật lòng với Hoàng thượng",tag:"social",at:"emp"},
 show:{act:"phô tài trước Hoàng thượng",tag:"art",at:"emp"},
 favor:{act:"xin Hoàng thượng ân điển",tag:"social",at:"emp",ok:v=>(v.sung||0)>=BAL.ag.cx2.favor.min},
 court:{act:"bàn chuyện triều chính với Hoàng thượng",tag:"scheme",at:"emp",ok:()=>has("chamchinh")},
 nurse:{act:"hầu thuốc Hoàng thượng",tag:"help",at:"emp",ok:()=>!!(S.emp&&S.emp.ill)},
 kidGreet:{act:"đưa con đến thỉnh an Hoàng thượng",tag:"greet",at:"emp",ok:v=>kidsOf(v).length>0},
 kidHeal:{act:"tự bốc thuốc chữa bệnh cho con",tag:"help",at:"self",ok:v=>(v.arts&&v.arts.y||0)>=BAL.ag.cx2.kidHeal.y&&!!ag2Sick(v,BAL.ag.cx2.kidHeal.hp)},
 kidMed:{act:"xin thuốc cho con ở Thái y viện",tag:"help",at:"tyv",ok:v=>!!ag2Sick(v,BAL.ag.cx2.kidMed.hp)},
 fert:{act:"xin bài thuốc dễ thụ thai",tag:"self",at:"tyv",ok:v=>!v.fert&&!v.preg&&!sonsOf(v).length},
 doctor:{act:"mời thái y tâm phúc",tag:"self",at:"tyv",ok:v=>!v.doctor},
 likes:{act:"hỏi Kính sự phòng sở thích của Hoàng thượng",tag:"scheme",at:"ksp",ok:v=>!(v.eK&&v.eK.flower)||(typeof eaOpen==="function"&&eaOpen(v))},
 old:{act:"hỏi chuyện cũ phế phi ở lãnh cung",tag:"scheme",at:"lc"}};
/* the player's button each deed is (j2 talkOpts / deck, j9 topicOpts, j20) — checked by dev/test/ag-all.test.js (no NPC-only hidden act) */
const AGC2BTN={maidTalk:"Tâm sự",maidSpy:"Sai đi dò la",bribeSrv:"Mua chuộc",plantSrv:"Cài người vào cung khác",flat:"Tâng bốc",true:"Nói thật lòng",show:"Phô tài",favor:"Xin ân điển",court:"Bàn chuyện triều chính",nurse:"Hầu thuốc Hoàng thượng",kidGreet:"Đưa con đến thỉnh an Hoàng thượng",
 kidHeal:"Chữa bệnh cho con",kidMed:"Xin thuốc cho",fert:"Bài thuốc dễ thụ thai",doctor:"Mời làm thái y tâm phúc",likes:"Hỏi sở thích Hoàng thượng",old:"Hỏi chuyện cũ",vent:"Trút giận",chest:"Lục rương tìm chứng cứ",help:"Nhờ giúp đỡ"};
function ag2At(A,v,kh){if(A.at==="emp")return agEmpAt(kh);if(A.at==="self")return palaceOf(v);return A.at}
function ag2Pay(v,c){if(!agcCan(v,c))return false;agcPay(v,c);return true}
agReg("consort","cx2",(v,N,need)=>{const O=[];const X=BAL.ag.cx2;if(v===S||v.out||v.confined)return O;
 for(const k in AGC2){const D=X[k],A=AGC2[k];if(!D)continue;if(need&&D.g[need]==null)continue;if(A.ok&&!A.ok(v))continue;if(!agcCan(v,D.c))continue;
  if(k==="old"&&!(typeof lcPeople==="function"&&lcPeople("Phế phi").length))continue;
  const o=D.o==null?100:odA(v,cx2O(v,k));const u=agcU(v,N,o,D.g,D.c||{},A.tag,D.l&&D.l.sung?{sung:-D.l.sung}:null);
  if(u>0){AG2.stat.opt++;O.push({k:"cx2:"+k,t:null,u,tag:A.tag,act:A.act,at:(kh)=>ag2At(A,v,kh)})}}
 /* aimed at a person: Trút giận (she is jealous of a consort close to conceiving), Lục rương (a rival she resents), Nhờ giúp đỡ (one who likes her) */
 const T=others(v).filter(t=>t&&t!==v&&(t===S?!S.out:t.alive&&!t.out));const SPm=new Map();const sp=t=>{let x=SPm.get(t);if(x==null){x=agSpite(v,t);SPm.set(t,x)}return x};/* perf: hostility once per target per call */
 if(!need||need==="spite"){const L=T.filter(t=>(t.pg||0)>=X.vent.pg&&sp(t)>0&&(v.ghen||0)>0);if(L.length&&agcCan(v,X.vent.c)){const t=mindPickBy(L,x=>sp(x),v);const u=agcU(v,N,100,X.vent.g,X.vent.c,"punish");if(t&&u>0)O.push({k:"cx2:vent",t,u,tag:"punish",act:"trút giận",at:(kh,vv,tt)=>tt===S?"home":agAt(tt,kh)})}}
 if(!need||need==="spite"||need==="safe"){const L=T.filter(t=>sp(t)>0);if(L.length){const t=mindPickBy(L,x=>sp(x),v);const o=odA(v,cx2O(v,"chest"));const u=agcU(v,N,o,X.chest.g,{},"scheme",{"danh":2});
  if(t&&u>0)O.push({k:"cx2:chest",t,u,tag:"scheme",act:"lén lục rương tìm chứng cứ",at:(kh,vv,tt)=>palaceOf(tt)})}}
 if(!need||need==="bac"||need==="safe"){const L=T.filter(t=>t!==S&&aff(t,v)>=X.help.aff);if(L.length){const t=mindPickBy(L,x=>BAL.mind.pick.ag.base+aff(x,v),v);const u=agcU(v,N,100,X.help.g,{},"social");
  if(t&&u>0)O.push({k:"cx2:help",t,u,tag:"social",act:"sang nhờ giúp đỡ",at:(kh,vv,tt)=>agAt(tt,kh)})}}
 /* her confidant maid (Tâm sự / Sai đi dò la, j2 maid card) and the servants of other palaces (Mua chuộc / Cài người, j10 Người hầu tab) */
 const m=v.maid;if(m&&m.loyal!=null){if((!need||need==="safe")&&m.loyal<X.maidTalk.below){const u=agcU(v,N,100,X.maidTalk.g,{},"help");if(u>0)O.push({k:"cx2:maidTalk",t:null,u,tag:"help",act:"tâm sự với cung nữ thân tín",at:()=>palaceOf(v)})}
  if(!need||need==="spite"||need==="safe"){const t=maidSpyT(v);const o=t?spyRoll(v,t,m):0;const u=t?agcU(v,N,o,X.maidSpy.g,{},"scheme"):0;if(u>0)O.push({k:"cx2:maidSpy",t,u,tag:"scheme",act:"sai cung nữ thân tín đi dò la",at:()=>palaceOf(v)})}}
 if(!need||need==="safe"||need==="spite"){const L=T.filter(t=>t!==v&&sp(t)>0&&(t.staff||[]).some(s=>s.spyFor!==key(v)));
  if(L.length){const t=mindPickBy(L,x=>sp(x),v);const s=t&&ag2BribeS(v,t);if(s){const c=(typeof nv==="function"?nv(s,"bribeCost"):30)||30;if((v.bac||0)>=c){const u=agcU(v,N,odA(v,35-(s.loyal||0)/3+(v.tamco||0)/X.bribeSrv.tcDiv),X.bribeSrv.g,{"bac":-c},"scheme");if(u>0)O.push({k:"cx2:bribeSrv",t,u,tag:"scheme",act:"mua chuộc kẻ hầu cung khác",at:()=>palaceOf(v)})}}
   if(t&&(v.bac||0)>=X.plantSrv.cost&&typeof bestSent==="function"&&bestSent(v)&&(!need||need==="spite")){const u=agcU(v,N,odA(v,40+(v.tamco||0)/X.plantSrv.tcDiv),X.plantSrv.g,{"bac":-X.plantSrv.cost},"scheme");if(u>0)O.push({k:"cx2:plantSrv",t,u,tag:"scheme",act:"cài người vào cung khác",at:()=>palaceOf(v)})}}}
 return O});
function ag2BribeS(v,t){const L=(t.staff||[]).filter(s=>s&&s.spyFor!==key(v));return L.length?mindPickBy(L,s=>Math.max(1,100-(s.loyal||0)),v):null}
agRunReg("cx2:maidTalk",v=>{const m=v.maid;if(!m)return"";m.loyal=cl((m.loyal||0)+BAL.ag.cx2.maidTalk.w.maid,0,100);return ag2Res(v,"maidTalk",1,`${v.name} tâm sự với ${m.name}`)});
/* cx2:maidSpy runner: jagacts3 (spyRoll, one rule with jwhy "Sai đi dò la"); the old flat-odds copy is gone (review ag-all-2 r2 A1) */
agRunReg("cx2:bribeSrv",(v,t)=>{if(!t)return"";const s=ag2BribeS(v,t);if(!s)return"";const r=bribeServ(v,s);return ag2Res(v,"bribeSrv",!!r,r?String(r).replace(/\.\s*$/,""):"")});
agRunReg("cx2:plantSrv",(v,t)=>{if(!t)return"";const r=plantServ(v,t);const ok=!!r&&!!PLANT_OK;/* a refusal returns a line too */return ag2Res(v,"plantSrv",ok,r?String(r).replace(/\.\s*$/,""):"")});
/* ag2Sf = the last ag2Roll failed SOFTLY at the cap (owner OD 17/11 ~17:35Z): its result line is the ONE BẠI line; cleared by ag2Res */
let ag2Sf=false,ag2SfC=null;/* ag2SfC = the cost of the softly failed deed, not paid (rolled before paying): agSoftTxt charges its Sức share once */
function ag2Res(v,k,ok,txt){AG2.stat.land++;AG2.stat.by[k]=(AG2.stat.by[k]||0)+1;if(!ok&&ag2Sf)txt=agSoftTxt(v,"",ag2SfC);ag2Sf=false;ag2SfC=null;return txt}
function ag2Soft(c){ag2Sf=true;ag2SfC=c||null;return false}
/* the card of a deed with odds: cost → roll odA(cx2O) → w or l (the player's go / fail effects after) */
function ag2Roll(v,k,c){const X=BAL.ag.cx2[k],cc=c||X.c;if(!agcCan(v,cc))return null;const o=odA(v,cx2O(v,k)),ok=agTry(o);if(!ok&&agSoft(o))return ag2Soft(cc);agcPay(v,cc);ap(v,ok?X.w||{}:X.l||{});return ok}
agRunReg("cx2:flat",v=>{const ok=ag2Roll(v,"flat");if(ok==null)return"";return ag2Res(v,"flat",ok,ok?`${v.name} khéo lời tâng bốc, Hoàng thượng vui vẻ`:`${v.name} tâng bốc vụng về, Hoàng thượng nhíu mày`)});
agRunReg("cx2:true",v=>{const ok=ag2Roll(v,"true");if(ok==null)return"";if(ok&&roll(agCap(BAL.ag.cx2.true.disc))){const u=Object.keys(LIKES).filter(k=>!(v.eK||{})[k]);if(u.length)(v.eK=v.eK||{})[pick(u)]=1}
 return ag2Res(v,"true",ok,ok?`${v.name} thưa chuyện thật lòng, được Hoàng thượng để tâm`:`${v.name} nói thật lòng, Hoàng thượng không vui`)});
agRunReg("cx2:show",v=>{const X=BAL.ag.cx2.show;if(!agcCan(v,X.c))return"";const o=odA(v,cx2O(v,"show")),ok=agTry(o);if(!ok&&agSoft(o)){ag2Soft(X.c);return ag2Res(v,"show",0,"")}agcPay(v,X.c);let lv=0;for(const a in v.arts||{})lv=Math.max(lv,v.arts[a]||0);
 ap(v,ok?{"sung":X.w.sung+lv,"danh":X.w.danh}:X.l);return ag2Res(v,"show",ok,ok?`${v.name} phô tài trước Hoàng thượng, được ngài khen`:`${v.name} phô tài trước Hoàng thượng nhưng vụng về`)});
agRunReg("cx2:favor",v=>{const X=BAL.ag.cx2.favor;if((v.sung||0)<X.min)return"";const ok=ag2Roll(v,"favor",{});if(ok==null)return"";
 if(!ok&&!ag2Sf&&S.emp&&S.emp.mood===3&&roll(agCap(X.angry)))punish(v,"làm phiền lúc thánh thượng nổi giận",1);return ag2Res(v,"favor",ok,ok?`${v.name} xin được ân điển của Hoàng thượng`:`${v.name} xin ân điển, bị Hoàng thượng gạt đi`)});
agRunReg("cx2:court",v=>{const ok=ag2Roll(v,"court");if(ok==null)return"";return ag2Res(v,"court",ok,ok?`${v.name} bàn chuyện triều chính, Hoàng thượng tán thưởng`:`${v.name} bàn chuyện triều chính, Hoàng thượng không vừa ý`)});
agRunReg("cx2:nurse",v=>{if(!(S.emp&&S.emp.ill))return"";const ok=ag2Roll(v,"nurse");if(ok==null)return"";if(ok&&empGive(v,BAL.ag.cx2.nurse.best,"nurse"))bestow(v,"nurse");
 return ag2Res(v,"nurse",ok,ok?`${v.name} sang Dưỡng Hòa điện sắc thuốc, hầu bên giường Hoàng thượng`:`${v.name} hầu thuốc Hoàng thượng đến kiệt sức`)});
agRunReg("cx2:kidGreet",v=>{const k=ag2Kid(v,(a,b)=>a.fond-b.fond);if(!k)return"";const ok=ag2Roll(v,"kidGreet");if(ok==null)return"";if(ok)k.fond=cl((k.fond||0)+BAL.ag.cx2.kidGreet.fond,0,100);
 return ag2Res(v,"kidGreet",ok,`${v.name} dắt ${k.name} đến thỉnh an Hoàng thượng`)});
agRunReg("cx2:kidHeal",v=>{const X=BAL.ag.cx2.kidHeal;const k=ag2Sick(v,X.hp);if(!k||!ag2Pay(v,X.c))return"";k.hp=Math.min(100,k.hp+X.up);return ag2Res(v,"kidHeal",1,`${v.name} tự bốc thuốc chữa bệnh cho ${k.name}`)});
agRunReg("cx2:kidMed",v=>{const X=BAL.ag.cx2.kidMed;const k=ag2Sick(v,X.hp);if(!k||!ag2Pay(v,X.c))return"";k.hp=Math.min(100,k.hp+X.up);return ag2Res(v,"kidMed",1,`${v.name} đến Thái y viện xin thuốc cho ${k.name}`)});
agRunReg("cx2:fert",v=>{const X=BAL.ag.cx2.fert;if(v.fert||!ag2Pay(v,X.c))return"";v.fert=X.m;return ag2Res(v,"fert",1,`${v.name} đến Thái y viện xin bài thuốc dễ thụ thai`)});
agRunReg("cx2:doctor",v=>{const X=BAL.ag.cx2.doctor;if(v.doctor||!ag2Pay(v,X.c))return"";v.doctor=1;return ag2Res(v,"doctor",1,`${v.name} mời được một thái y làm tâm phúc`)});
agRunReg("cx2:likes",v=>{const X=BAL.ag.cx2.likes;if(!agcCan(v,X.c))return"";const lo=odA(v,X.o),ok=agTry(lo);if(!ok&&agSoft(lo)){ag2Soft(X.c);return ag2Res(v,"likes",0,"")}agcPay(v,X.c);if(ok){const u=Object.keys(LIKES).filter(k=>!(v.eK||{})[k]);const k=u.includes("flower")?"flower":u.length?pick(u):null;/* OD03 two-way: her discover() rule (jbalcore eaAsk) — the month art at BAL.steal.ea.disc, else a like; sure when no like is left */let e=false;try{if(typeof eaAsk==="function")e=eaAsk(v,!k)}catch(x){}if(!e&&k)(v.eK=v.eK||{})[k]=1}
 return ag2Res(v,"likes",ok,ok?`${v.name} dò được sở thích của Hoàng thượng ở Kính sự phòng`:`${v.name} hỏi Kính sự phòng nhưng chẳng được gì`)});
agRunReg("cx2:old",v=>{const oo=odA(v,cx2O(v,"old")),ok=agTry(oo);if(!ok&&agSoft(oo)){ag2Soft();return ag2Res(v,"old",0,"")}let x=null;if(ok){const P=others(v).filter(t=>t&&t!==v&&(t===S||t.alive));x=evGuilty(v,P);if(x&&!evA(v,x,BAL.ag.ev.one))x=null}
 return ag2Res(v,"old",ok,x?`${v.name} nghe phế phi kể chuyện cũ của ${agcNm(x)}`:`${v.name} sang lãnh cung hỏi chuyện cũ, chẳng được gì`)});
agRunReg("cx2:vent",(v,t)=>{const X=BAL.ag.cx2.vent;if(!t||(t.pg||0)<X.pg||!ag2Pay(v,X.c))return"";t.pg=0;relAdd(v,t,-X.rel);try{agVent(v,t,"provoke")}catch(e){}
 return ag2Res(v,"vent",1,`${v.name} trút cơn ghen lên ${agcNm(t)}`)});
agRunReg("cx2:chest",(v,t)=>{const X=BAL.ag.cx2.chest,o=t?odA(v,cx2O(v,"chest")):0;if(!t)return"";if(agTry(o)){const r=evA(v,t,BAL.ag.ev.one);return ag2Res(v,"chest",1,r?`${v.name} lén lục rương của ${agcNm(t)}, tìm được thư từ`:`${v.name} lén lục rương của ${agcNm(t)}, chẳng thấy gì`)}
 if(agSoft(o)){ag2Soft();return ag2Res(v,"chest",0,"")}relAdd(t,v,-X.rel);punish(v,"lục lọi cung phi tần",1);return ag2Res(v,"chest",0,`${v.name} lục rương của ${agcNm(t)}, bị cung nhân bắt gặp`)});
agRunReg("cx2:help",(v,t)=>{const X=BAL.ag.cx2.help;if(!t||t===S)return"";if(aff(t,v)<X.aff){affAdd(t,v,-X.fail);return ag2Res(v,"help",0,`${t.name} khéo từ chối lời nhờ của ${v.name}`)}
 if(roll(agCap(X.p))&&(t.bac||0)>=X.bac){ap(t,{"bac":-X.bac});ap(v,{"bac":X.bac});return ag2Res(v,"help",1,`${t.name} cho ${v.name} mượn ${X.bac} lượng`)}
 const x=evGuilty(v,others(v).filter(y=>y&&y!==v&&y!==t&&(y===S||y.alive)));if(x&&evA(v,x,BAL.ag.ev.one))return ag2Res(v,"help",1,`${t.name} kể cho ${v.name} một chuyện về ${agcNm(x)}`);
 return ag2Res(v,"help",1,`${t.name} tiếp ${v.name} ân cần`)});
/* ---------------- 2. THE EMPEROR: his evening visit (Ngự giá lâm cung) and his tea, from his own day plan ---------------- */
(function(){const n0=AGNEEDREG.emp;agRegNeeds("emp",(E)=>{const N=n0?n0(E):{};try{const X=BAL.ag.emp3;let m=1;try{m=tsMoodW()}catch(e){}let busy="";try{busy=empBusy()}catch(e){}const bf=busy?BAL.ag.emp2.busyF:1;
  let sv=0;for(const p of ag2VisC())sv+=visCh(p);N.desire=X.desire*sv/100*m*bf;N.tea=X.tea*m*bf}catch(e){agdErr("emp3",e)}return N})})();
try{AGWHYX.desire="muốn ngự giá đến cung người ngài nhớ";AGWHYX.tea="muốn ghé ai đó uống chén trà"}catch(e){}
function ag2VisC(){const L=[];if(typeof visOk!=="function"||typeof visCh!=="function")return L;for(const p of consorts())if((p===S||(p.alive!==false&&!p.out))&&visCh(p)>0&&visOk(p))L.push(p);
 try{if(window.COOPW&&COOPW.on){const f=(rivals||[]).find(v=>v&&v.coop&&v.alive!==false&&!v.out);if(f&&!L.includes(f)&&visCh(f)>0&&visOk(f))L.push(f)}}catch(e){}return L}
agReg("emp","visit",(E,N,need)=>{if(need&&need!=="desire")return[];if(S.dead||!(N.desire>0))return[];const b=AG.cB!=null?AG.cB:agDayB();if(!BAL.ag.emp3.visB.includes(j95c(b)))return[];
 const C=ag2VisC();if(!C.length)return[];const t=mindPickBy(C,x=>visCh(x)*empMemF(x),E);if(!t)return[];
 return[{k:"emp:visit",t,u:N.desire,tag:"social",act:"ngự giá lâm cung",at:()=>{try{return palaceOf(t)}catch(e){return"dtd"}}}]});
agRunReg("emp:visit",(E,t)=>{if(!t||S.dead||typeof visOk!=="function"||!visOk(t))return"";AG2.stat.visit++;/* RECEIVER CHOICE (jrcv rcvVisit): an NPC answers with her card's roads */if(t!==S&&!t.coop&&typeof rcvVisit==="function"){const c=rcvVisit(t);if(c!=="go")return c==="adv"?`${t.name} khuyên Hoàng thượng giữ long thể, ngài về Dưỡng Hòa điện`:`${t.name} phô tài cho Hoàng thượng xem rồi tiễn ngài về`}visGo(t);return""});
agReg("emp","tea",(E,N,need)=>{if(need&&need!=="tea")return[];if(S.dead||!(N.tea>0))return[];const b=AG.cB!=null?AG.cB:agDayB();if(!BAL.ag.emp3.teaB.includes(j95c(b)))return[];const VT=BAL.visit.tea,g=BAL.ag.emp3.teaGap;
 const C=consorts().filter(p=>(p===S?!S.out&&!S.confined&&!S.mg:p.alive!==false&&!p.out&&!p.confined)&&(p.sung||0)>=VT.minSung&&!(p.teaW!=null&&wk()-p.teaW<g));if(!C.length)return[];
 const t=mindPickBy(C,x=>(x.sung||0)*empMemF(x),E);if(!t)return[];return[{k:"emp:tea",t,u:N.tea,tag:"social",act:"ghé uống chén trà",at:()=>palaceOf(t)}]});
agRunReg("emp:tea",(E,t)=>{if(!t||S.dead)return"";const VT=BAL.visit.tea;t.teaW=wk();AG2.stat.tea++;
 if(t===S){if(S.out||S.confined)return"";try{const c=empTeaCard();if(c)Q.push(c)}catch(e){agdErr("tea",e)}return""}
 if(!t.alive||t.out)return"";ap(t,{"sung":VT.sung,"an":VT.an});return `Hoàng thượng ghé cung ${t.name} uống chén trà`});
/* ---------------- 3. BESTOWAL: his (her) choice from regard at the site's own % ---------------- */
function ag2Reg(p){const G=BAL.ag.give;const sg=(p===S?S.sung:p.sung)||0,an=(p===S?S.an:p.an)||0;let r=cl(G.b+(sg-G.ref)/G.div+an/G.anDiv,G.lo,G.hi);
 try{r*=empMemF(p)}catch(e){}try{r*=tsMoodW()}catch(e){}try{for(const t of S.emp.traits||[])r*=G.tr[t]||1}catch(e){}return r}
(function(){const e0=empGive,t0=thGive;
 empGive=function(p,pct,why){if(!p||!(typeof agOn==="function"&&agOn())||!S.emp)return e0.apply(this,arguments);const w=cl(pct*ag2Reg(p),0,100);
  const g=roll(agCap(w));/* his inclination = the site's % × his regard; a straight weighted draw (jmind slip would bend a rare gift's rate) */AG2.stat[g?"give":"giveNo"]++;return g};
 thGive=function(p,pct,why){if(!p||!(typeof agOn==="function"&&agOn())||S.thDead)return t0.apply(this,arguments);const G=BAL.ag.give.th;const w=cl(pct*cl(1+(((p===S?S.th:p.th)||0)-G.ref)/G.div,G.lo,G.hi),0,100);
  return roll(agCap(w))};})();
/* ledger labels of the new deeds */
try{for(const k in AGC2)ACT95["ag_cx2:"+k]=AGC2[k].act;Object.assign(ACT95,{"ag_cx2:vent":"trút giận","ag_cx2:chest":"lén lục rương","ag_cx2:help":"sang nhờ giúp đỡ","ag_cx2:maidTalk":"tâm sự với cung nữ thân tín","ag_cx2:maidSpy":"sai cung nữ đi dò la","ag_cx2:bribeSrv":"mua chuộc kẻ hầu cung khác","ag_cx2:plantSrv":"cài người vào cung khác","ag_emp:visit":"ngự giá lâm cung","ag_emp:tea":"ghé uống chén trà"})}catch(e){}
Object.assign(window,{AG2,AGC2,AGC2BTN,ag2Reg});
/* AG-ALL-2 part 2b (G7): Biếu Tổng quản (the player's court button courtAct "thuong", j10) as a consort's choice — replaces npcCourt roll(10).
   Its worth to her: the Tổng quản's favour helps her to the Emperor (need sung), less as his favour already stands high (BAL.ag.cx3.tq). */
agReg("consort","court3",(v,N,need)=>{if(need&&need!=="sung")return[];if(!S.court||!S.court.tq)return[];const X=BAL.ag.cx3.tq;const c={bac:-BAL.bacFee.court};if(!agcCan(v,c)||(v.bac||0)<BAL.bacFee.court*X.keep)return[];
 const af=S.court.tq.af[v.id]||0;const u=agcU(v,N,100,{sung:X.g*cl(1-af/X.cap,0,1)},c,"bribe");return u>0?[{k:"cx:tqGift",t:null,u,tag:"bribe",act:"biếu quà Tổng quản thái giám",at:(kh,vv)=>palaceOf(vv||v)}]:[]});
agRunReg("cx:tqGift",(v)=>courtGive(v,"tq"));
try{ACT95["ag_cx:tqGift"]="biếu quà Tổng quản thái giám"}catch(e){}
