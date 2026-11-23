/* ================= jpq: DÂNG MÓN CÓ ĐỘC LÊN HOÀNG THƯỢNG / THÁI HẬU (owner OD:L602 + OD:L430; ledger D8 / #174; review/poison-road) =================
   One poison system: this file only OPENS two more targets of jpoison's "Bỏ độc vào…" (same items, same gift dialog, same pgFood / pgGrade,
   same Đức cost rule, same NPC act shape). Numbers: BAL.pq (one core, OD:L1267). History/drama notes: dev/handover/reports/poison-road.md §0.
   1. MOTIVE GATES (her and every consort, one function pqMotive):
      Hoàng thượng · "hận": Sủng ≤ BAL.pq.gate.sung AND Ân tình ≤ BAL.pq.gate.an (out of favour and no bond left);
      Hoàng thượng · "Vương gia": a living Vương gia she is bound to (j24 S.vgAlly + tình ý ≥ BAL.tinhLv.ally; an NPC: her child's real father / vgAlly);
      Thái hậu · "nghiêm": the life's Thái hậu archetype is harsh (BAL.pq.gate.harsh, jtrong TH_ARCH) AND Thái hậu quý ≤ BAL.pq.gate.th.
      Co-op: the Emperor's death stays muted (jmort / jcoopworld rule) → the Emperor is never offered; Thái hậu only on the host (host-only rolls).
   2. ODDS (pqOdds, kit "Vì sao"): BAL.pg.base + Tâm cơ/BAL.pg.tamDiv + the target's trust/BAL.pg.trustDiv (one table with jpoison pgOdds; khắc = BAL.pg.khac) + dish grade − the three royal checks (người nếm, Ngự thiện phòng
      kiểm hai lượt, đũa bạc) [− the kitchen alert after a failed try] [+ slow poison passes the taster] [+ the Vương gia's men] [+ a trusted maid];
      capped at BAL.pq.max, then the one ODDS CAP oddsCl (BAL.odds.lo / hi) (never better than "Năm phần" band at the top: ladder words only, no %).
   3. FAIL: the kitchens go on alert BAL.pq.guard.alertMo months; traced (cp) → treason: the doer dies ("Ban chết", over() / jmort kill) and her house
      falls (j55 tdPowAdd, members' Danh). SUCCESS: Hạc đỉnh hồng = death now (Emperor: S.mort.empDue → j3 emperorDies next month; Thái hậu: jmort kill →
      thShift); Độc ngấm dần = lifespan −BAL.pq.slowCut years (jmort omen + death later). After a royal death a poisoning is investigated
      (pqInq: fast poison easier to trace, a cover-up when her son / her Vương gia takes the throne).
   4. ENDINGS (existing over()/emperorDies): exposed → Ban chết + house; Vương gia road → he takes the throne (BAL.pq.vg odds) and she becomes his
      Quý phi, or he fails and she dies; "hận" road / her son heir → the existing succession flow (j3 / jmort / j99succ) runs unchanged.
   5. NPCs: same gates, same odds, same consequences (pqNpc in npcMonthly, host only), weighted by persW(v,"pgift"), one try per BAL.pq.npc.cd months
      in the whole palace (no runaway regicide). */
Object.assign(BAL,{pq:{duc:12,max:60,trustLo:-8,
 gate:{sung:15,an:10,th:-20,harsh:["nghiem","danghi","quyen"]},
 guard:{taster:12,twoPot:6,touch:8,alert:15,alertMo:6},
 help:{slow:12,vg:12,maid:6},
 caught:{base:50,tam:5,lo:20,hi:90},
 inq:{base:40,fast:20,slow:-20,tam:4,cover:25,mo:6,lo:5,hi:90},
 slowCut:6,
 vg:{base:45,tinh:2,pow:5,pw0:40,lo:15,hi:85},
 clan:{pow:30,danh:8},
 npc:{try:12,cd:24}}});
const PQ_K=["hacdinh","docngam"];
const PQ_N={emp:"Hoàng thượng",th:"Thái hậu"};
function pqS(){if(!S.pq)S.pq={alert:0,cd:0,n:{}};S.pq.n=S.pq.n||{};return S.pq}
function pqCount(k){const n=pqS().n;n[k]=(n[k]||0)+1}
function pqCo(){try{return !!(window.COOPW&&COOPW.on)}catch(e){return false}}
function pqHost(){try{return !pqCo()||COOPW.seat==="a"}catch(e){return true}}
function pqKinds(a){return PQ_K.filter(k=>(a.inv||[]).some(e=>e&&e.k===k&&!e.h))}
function pqThReg(a){return a===S?(S.th||0):(a.th||0)}
function pqVg(a){try{const vg=(S.men||[]).find(m=>m.alive&&m.role==="Vương gia");if(!vg)return null;
 if(a===S)return S.vgAlly===vg.id&&(vg.tinh||0)>=BAL.tinhLv.ally?vg:null;return a.trueFather===vg.id||a.vgAlly===vg.id?vg:null}catch(e){return null}}
function pqHarsh(){try{thArch();return BAL.pq.gate.harsh.includes(S.thO.arch)}catch(e){return false}}
/* the one motive gate: {ok, road, miss} (miss = why it is closed, player words) */
function pqMotive(a,who){const G=BAL.pq.gate;
 if(who==="emp"){if(pqCo())return{ok:false,miss:"chơi cùng hảo hữu: chưa mở đường này"};
  const vg=pqVg(a);if(vg)return{ok:true,road:"vg",vg};
  if((a.sung||0)<=G.sung&&(a.an||0)<=G.an)return{ok:true,road:"hate"};
  return{ok:false,miss:`chưa có nguyên cớ: cần hận ngài (Sủng từ ${G.sung} trở xuống và Ân tình từ ${G.an} trở xuống) hoặc tư tình sâu với Vương gia`}}
 if(S.thDead)return{ok:false,miss:"Thái hậu đã băng hà"};if(!pqHost())return{ok:false,miss:"chơi cùng hảo hữu: chỉ chủ phòng mới mở đường này"};
 if(pqHarsh()&&pqThReg(a)<=G.th)return{ok:true,road:"harsh"};
 return{ok:false,miss:`chưa có nguyên cớ: chỉ khi Thái hậu nghiêm khắc, đa nghi hay chuyên quyền và Thái hậu quý ${a===S?"ngươi":"nàng"} từ ${G.th} trở xuống`}}
/* the royal checks + helps: [label, points] */
function pqGuard(a,who,k){const G=BAL.pq.guard,H=BAL.pq.help;const L=[["Thái giám nếm thử mọi món",-G.taster],["Ngự thiện phòng kiểm hai lượt",-G.twoPot],["Đũa bạc chạm thử từng món",-G.touch]];
 if(k==="docngam")L.push(["Độc ngấm chậm, người nếm chưa thấy gì",H.slow]);
 if(pqS().alert>0)L.push(["Ngự thiện phòng còn đang tra xét",-G.alert]);
 const vg=who==="emp"&&pqVg(a);if(vg)L.push([`Người của ${pqMN(vg)} trong Ngự thiện phòng`,H.vg]);
 if(a.maid&&(a.maid.loyal||0)>=BAL.loy.trust)L.push([`Cung nữ tâm phúc của ${pgNm(a)} lo đường đưa món`,H.maid]);return L}
/* the one formula (her card, the roll, every NPC): o = success, cp = a failed try traced to the doer, inq = a success traced later */
function pqOdds(a,who,e,k,cover){const P=BAL.pg,Q=BAL.pq;const tc=Math.round((a.tamco||0)/P.tamDiv);const tr=Math.max(Q.trustLo,Math.round((who==="emp"?(a.sung||0):pqThReg(a))/P.trustDiv));const gr=pgGrade(e)*P.grade;
 const F=[[`Tâm cơ ${pgNm(a)} ${a.tamco|0}`,tc],[`${PQ_N[who]} ${tr>=0?"tin":"ngờ"} ${pgNm(a)}`,tr],[e&&e.wk?`Món ${WTIER[e.wk.ti|0]} che vị`:`${e&&IT[e.k]?itm(e.k).n:"Món"} che vị`,gr]].concat(pqGuard(a,who,k));
 const o=oddsCl(Math.min(Math.round(P.base+F.reduce((s,x)=>s+x[1],0)),Q.max));
 const cp=cl(Q.caught.base+(pqS().alert>0?Q.guard.alert:0)-Math.round((a.tamco||0)/Q.caught.tam),Q.caught.lo,Q.caught.hi);
 return{o,F,cp,inq:pqInqO(a,k,cover)}}
function pqInqO(a,k,cover){const I=BAL.pq.inq;return cl(I.base+(k==="hacdinh"?I.fast:I.slow)-Math.round((a.tamco||0)/I.tam)-(cover?I.cover:0),I.lo,I.hi)}
function pqMN(m){try{return typeof succMN==="function"?succMN(m):m.name}catch(e){return m.name}}
function pqWho(a){return a===S?"ngươi":`${rkName(a)} ${a.name}`}
/* the doer's house falls (j55 houses): power down, the house's other consorts lose Danh */
function pqClan(p){const Q=BAL.pq.clan;let c="";try{c=tdHouse(p)||""}catch(e){}
 if(!c)return p===S?"Nhà mẹ đẻ ngươi bị tra xét, cha anh mất hết chức tước. ":`Nhà ${p.name} bị tra xét, cha anh mất hết chức tước. `;
 try{tdPowAdd(c,-Q.pow);for(const m of tdMembers(c))if(m!==p&&(m!==S||!S.dead))ap(m,{danh:-Q.danh});tdNews(`Nhà ${c} bị liên lụy vì án mưu hại ${p===S?S.name:p.name}.`)}catch(e){}
 return `Nhà ${c} bị liên lụy: cha ${p===S?"ngươi":"nàng"} bị cách chức, thế lực nhà ${c} -${Q.pow}, các phi tần nhà ${c} Danh -${Q.danh}. `}
/* treason found: the doer dies */
function pqDoom(a,who,txt){pqCount("doom_"+who);const cl0=pqClan(a);
 if(a===S){over("Ban chết",`${txt} Tội mưu hại ${PQ_N[who]}: ban lụa trắng. ${cl0}`,`Ban chết vì mưu hại ${PQ_N[who]}`,false);return ""}
 let ev="";try{ev=typeof mortKill==="function"?mortKill(a,`bị ban chết vì mưu hại ${PQ_N[who]}`):(a.alive=false,"")}catch(e){a.alive=false}
 try{newsAdd(a,"poison",`${rkName(a)} ${a.name} bị ban chết vì mưu hại ${PQ_N[who]}.`,true)}catch(e){}
 return `${txt} ${ev||`<span class="r">${a.name} bị ban chết.</span> `}${cl0}`}
/* the act: same function for her and every NPC */
function pqGive(a,who,ix,k){const e=a.inv[ix];if(!e||!pgFood(e)||!PQ_K.includes(k))return"";const pi=a.inv.findIndex(x=>x&&x.k===k&&!x.h);if(pi<0)return"";
 const M=pqMotive(a,who);if(!M.ok)return"";const Z=pqS();const dn=e.wk?e.wk.n:itm(e.k).n;const O=pqOdds(a,who,e,k);
 a.inv.splice(Math.max(ix,pi),1);a.inv.splice(Math.min(ix,pi),1);a.schemes=(a.schemes||0)+1;if(typeof ducAdd==="function")ducAdd(a,-BAL.pq.duc,`mưu hại ${PQ_N[who]}`);else ap(a,{duc:-BAL.pq.duc});
 pqCount("try_"+who);pqCount("road_"+M.road);if(a===S)pqCount("me_try");
 const by=a===S?"Ngươi":`${rkName(a)} ${a.name}`;
 if(roll(O.o)){pqCount("hit_"+who);return pqHit(a,who,k,M,dn)}
 Z.alert=BAL.pq.guard.alertMo;
 if(roll(O.cp))return pqDoom(a,who,`${by} sai người dâng ${dn} lên ${PQ_N[who]}. Thái giám nếm thử phát hiện có độc, lần theo người đưa món về tận cung ${a===S?"ngươi":a.name}.`);
 pqCount("miss_"+who);return `${PQ_N[who]} chưa dùng món ${dn}: thái giám nếm thử phát hiện có độc. Ngự thiện phòng bị tra xét, chưa lần ra ai. `}
function pqHit(a,who,k,M,dn){const Z=pqS();const D={who,by:key(a),k,road:M.road,y:S.year};
 if(who==="emp"){if(k==="hacdinh"){S.mort=S.mort||{};S.mort.empDue="Ngự thiện có độc, ngài trở bệnh nặng rồi băng hà giữa đêm";Z.done=D;return `${PQ_N.emp} dùng xong ${dn} thì người mệt lả, Thái y viện cả đêm không rời Càn Thanh cung. `}
  if(S.emp&&S.emp.tho>0)S.emp.tho=Math.max(S.emp.age,S.emp.tho-BAL.pq.slowCut);Z.slow=D;return `${PQ_N.emp} dùng ${dn} vài lần, dạo này hay mệt; thái y bảo do lo việc triều chính. `}
 const O=S.thO||{};
 if(k==="hacdinh"){let ev="";try{ev=typeof mortKill==="function"?mortKill(O,"Thái hậu dùng xong chén canh thì trở bệnh nặng"):""}catch(e){}if(!S.thDead){S.thDead=true;S.th=0;S.thIll=null}
  Z.inq=Object.assign(D,{mo:BAL.pq.inq.mo,o:pqInqO(a,k,false)});return ev||`<b>Thái hậu băng hà.</b> `}
 if(O.tho>0)O.tho=Math.max(S.thAge||O.age||0,O.tho-BAL.pq.slowCut);Z.slow=D;return `Thái hậu dùng ${dn} vài lần, dạo này người yếu đi; thái y bảo do tuổi cao. `}
/* a royal death that came from a poisoning is investigated: the doer by key */
function pqDoer(D){if(!D)return null;if(D.by==="me")return S;return (rivals||[]).find(v=>v.id===D.by&&v.alive)||null}
/* the Emperor dies (j3 emperorDies): her poison road decides first; else the existing flow (succession, her fate) runs unchanged */
(function(){if(typeof emperorDies!=="function")return;const e0=emperorDies;emperorDies=function(ev){try{const Z=S&&S.pq;const D=Z&&(Z.done&&Z.done.who==="emp"?Z.done:Z.slow&&Z.slow.who==="emp"?Z.slow:null);
  if(D&&!S.dead){if(Z.done===D)Z.done=null;if(Z.slow===D)Z.slow=null;const r=pqEmpEnd(D,ev);if(r!=null)return r;if(typeof r==="undefined"&&D._ev!=null)ev=D._ev}}catch(x){console.error("pq emp",x)}return e0.call(this,ev)}})();
function pqEmpEnd(D,ev){const a=pqDoer(D);if(!a)return undefined;const Q=BAL.pq;const pre=`Năm ${S.year}, ${empName()} băng hà, thọ ${S.emp.age} tuổi. `;
 const heir=S.heir&&S.heir.k&&S.heir.k.alive&&!S.heir.v;const vg=D.road==="vg"&&(S.men||[]).find(m=>m.alive&&m.role==="Vương gia");
 const o=pqInqO(a,D.k,a===S&&(heir||!!vg));pqCount("inq_emp");
 if(roll(o)){pqCount("exp_emp");if(ev)log(ev);
  if(a===S)return pqDoom(S,"emp",`${pre}Tông nhân phủ tra xét Ngự thiện phòng, lần ra món ăn từ cung ngươi (khả năng ${chanceLo(o)}).`);
  D._ev=`${ev||""} ${pqDoom(a,"emp",`Tông nhân phủ tra ra món ăn có độc từ cung ${a.name}.`)}`;return undefined}
 if(a!==S||!vg||heir)return undefined;
 const pw=(()=>{try{const c=tdHouse(S);return c?tdPow(c):Q.vg.pw0}catch(e){return Q.vg.pw0}})();
 const o2=cl(Math.round(Q.vg.base+((vg.tinh||0)-BAL.tinhLv.ally)/Q.vg.tinh+(pw-Q.vg.pw0)/Q.vg.pow),Q.vg.lo,Q.vg.hi);pqCount("vg_try");if(ev)log(ev);
 if(roll(o2)){pqCount("vg_win");return over("Tân đế đăng cơ",`${pre}Triều đình rối ren mấy ngày, rồi ${pqMN(vg)} đem quân vào kinh, được tôn lên ngôi (khả năng ${chanceLo(o2)}). Tân đế đón ngươi vào hậu cung mới, phong Quý phi; chuyện cũ chôn theo tiên đế.`,"Vương gia đăng cơ, phong Quý phi",true)}
 pqCount("vg_lose");return pqDoom(S,"emp",`${pre}Triều thần lập thân vương khác; ${pqMN(vg)} mưu đoạt ngôi không thành (khả năng ${chanceLo(o2)}), bị giam vào Tông nhân phủ, khai ra ngươi.`)}
/* monthly (host only): the kitchens calm down, the Thái hậu inquest runs its window, a slow poison that reached its end opens the inquest */
function pqMonth(){const Z=pqS();let ev="";if(Z.alert>0)Z.alert--;if(Z.cd>0)Z.cd--;
 if(Z.slow&&Z.slow.who==="th"&&S.thDead&&!Z.inq){Z.inq=Object.assign(Z.slow,{mo:BAL.pq.inq.mo,o:pqInqO(pqDoer(Z.slow)||S,"docngam",false)});Z.slow=null}
 const I=Z.inq;if(I){const a=pqDoer(I);if(!a){Z.inq=null;return ev}
  if(I.mo===BAL.pq.inq.mo)pqCount("inq_th");
  if(roll(100*(1-Math.pow(1-I.o/100,1/BAL.pq.inq.mo)))){/* the window's rolls add up to exactly the shown chance I.o */Z.inq=null;pqCount("exp_th");ev+=a===S?pqDoom(S,"th",`Hoàng thượng sai Tông nhân phủ tra xét cái chết của Thái hậu, lần ra món ăn từ cung ngươi (khả năng ${chanceLo(I.o)}).`):pqDoom(a,"th",`Tông nhân phủ tra ra cái chết của Thái hậu do món ăn từ cung ${a.name}.`);return ev}
  if(--I.mo<=0){Z.inq=null;ev+="Vụ Thái hậu băng hà khép lại, Tông nhân phủ không tra ra điều gì. "}}
 return ev}
(function(){if(typeof monthTick!=="function")return;const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments);try{if(S&&!S.dead&&pqHost())ev=(ev||"")+pqMonth()}catch(x){console.error("pq month",x)}return ev}})();
/* NPCs: same gates, same act; one try in the whole palace per BAL.pq.npc.cd months (host only) */
function pqNpc(v){if(!pqHost()||!S||S.dead||!v||!v.alive||v.out||v.confined)return"";const Z=pqS();if(Z.cd>0||Z.done||Z.inq||Z.slow)return"";
 const ks=pqKinds(v);if(!ks.length)return"";const ix=(v.inv||[]).findIndex(pgFood);if(ix<0)return"";
 for(const who of ["emp","th"]){const M=pqMotive(v,who);if(!M.ok)continue;const w=persW(v,"pgift");if(!(w>0)||!roll(BAL.pq.npc.try*w))continue;
  Z.cd=BAL.pq.npc.cd;pqCount("npc_try");return pqGive(v,who,ix,ks[0])}return""}
(function(){if(typeof npcMonthly!=="function")return;const m0=npcMonthly;npcMonthly=function(v){const r=m0.apply(this,arguments);let x="";try{x=pqNpc(v)}catch(e){console.error("pq npc",e)}return x?(r||"")+x:r}})();
/* her card: two more targets in jpoison's "Bỏ độc vào…" picker (kit options; closed ones say why) */
function pqLine(who,k,X){const P=PGX[k],Q=BAL.pq;const won=k==="hacdinh"?`${PQ_N[who]} băng hà`:`${PQ_N[who]} suy dần, thọ bớt ${Q.slowCut} năm`;
 return `${word(X.o)} · tốn: ${BAL.pg.khac} khắc, ${P.n} -1, Đức -${Q.duc} · thành: ${won} · hỏng: Ngự thiện phòng tra xét ${Q.guard.alertMo} tháng · kèm: hỏng mà bị lần ra (khả năng ${chanceLo(X.cp)}): ban chết, nhà mẹ đẻ liên lụy · thành rồi vẫn có thể bị tra ra (khả năng ${chanceLo(X.inq)})`}
(function(){const g0=PEND.pgpick;if(!g0)return;PEND.pgpick=function(p){const d=g0.apply(this,arguments);try{if(!d||!d.o)return d;const e=S.inv[p.ix];if(!e||!pgFood(e))return d;const dn=e.wk?e.wk.n:itm(e.k).n;
  d.t=String(d.t).replace("Hoàng thượng và Thái hậu luôn có người nếm thử, không thể.","Hoàng thượng và Thái hậu luôn có người nếm thử: chỉ khi có nguyên cớ mới dám, bị lần ra là tội chết, nhà mẹ đẻ liên lụy.");
  const R=[];for(const who of ["emp","th"]){if(who==="th"&&S.thDead)continue;const M=pqMotive(S,who);
   for(const k of pqKinds(S)){const vgC=M.ok&&M.road==="vg";const X=pqOdds(S,who,e,k,vgC||!!(S.heir&&S.heir.k&&S.heir.k.alive&&!S.heir.v));
    const O={n:`${PGX[k].n} vào ${dn} dâng ${PQ_N[who]}`,fx:{},kgt:who/* kit: the target's own portrait (jopic kitOptPic), like every other target row */,x:pqLine(who,k,X),o:X.o,base:BAL.pg.base,why:()=>pqOdds(S,who,e,k).F,
     go:()=>{spend(BAL.pg.khac);const i=S.inv.indexOf(e);const r=pqGive(S,who,i,k);if(r&&!S.dead){log(r);Q.push({t:`Dâng món lên ${PQ_N[who]}`,who:who==="emp"?pEmp():pTH(),h:`<p>${r}</p>`})}}};
    if(!M.ok)kitOff(O,M.miss,"mở khi có nguyên cớ");R.push(O)}}
  if(R.length){const i=d.o.findIndex(o=>o&&o.n==="Thôi");d.o.splice(i<0?d.o.length:i,0,...R)}}catch(x){console.error("pq pick",x)}return d}})();
/* the gift-dialog row text follows (jpoison pgRow) */
(function(){if(typeof pgRow!=="function")return;const r0=pgRow;pgRow=function(ix){const o=r0.apply(this,arguments);try{o.kgift="(chọn người nhận và thứ độc; Hoàng thượng, Thái hậu chỉ khi có nguyên cớ)"}catch(e){}return o}})();
/* the death card: cause + how it could have been prevented (the house line stays in the story text: one fact, one place) */
(function(){if(typeof deathChain!=="function")return;const d0=deathChain;deathChain=function(f){const L=d0.apply(this,arguments);try{if(/mưu hại (Hoàng thượng|Thái hậu)/.test(String(f||""))){L.splice(0,L.length>1?2:L.length,"Món có độc dâng lên bị Tông nhân phủ lần ra.","Phòng được: chỉ ra tay khi Tâm cơ cao, chọn độc ngấm chậm, có người trong Ngự thiện phòng, đợi Ngự thiện phòng thôi tra xét.")}}catch(e){}return L}})();
try{KIT_GLOSS["Mưu hại Hoàng thượng"]=`Chỉ mở khi có nguyên cớ: ngươi hận ngài (Sủng từ ${BAL.pq.gate.sung} trở xuống, Ân tình từ ${BAL.pq.gate.an} trở xuống) hoặc tư tình sâu với Vương gia. Món dâng lên qua người nếm, hai lượt kiểm và đũa bạc. Bị lần ra là ban chết, nhà mẹ đẻ liên lụy.`}catch(e){}
window.pqOdds=pqOdds;window.pqGive=pqGive;window.pqMotive=pqMotive;window.pqNpc=pqNpc;window.pqMonth=pqMonth;
