/* ================= HOUSEHOLDS: maids and eunuchs, one rule for every consort ================= */

const EUN=NM_EUNX.map(x=>"Tiểu "+x+" Tử");/* one name core: jname.js (nmNew("eun")) */
let sidN=0;
/* ONE household table (owner 17/11 OD 02:50Z + 04:48Z, review/staff-root): BAL.promo.cap[rank] = [maids INCLUDING the personal (close) maid, eunuchs],
   for her AND every NPC consort (two-way law); cold palace = the lowest row; Thái hậu = BAL.promo.capTh; Nữ đế (succession path c) = BAL.promo.capNd; a cung nữ (servant road) keeps no household.
   hhHas(p) = the same count of what the household holds now: the personal maid (S.maid / an NPC's own maid) is the "+1", counted once, here only. */
function capOf(p){const B=BAL.promo,C=B.cap;if(S&&p&&p===S.thO)return B.capTh.slice();if(p===S&&typeof isSrv==="function"&&isSrv())return C[0].map(()=>0);
 if(p===S&&S.succ&&S.succ.p==="c"&&B.capNd)return B.capNd.slice();
 return C[p&&p.out?0:Math.max(0,Math.min(C.length-1,rkOf(p)||0))].slice()}
/* coop-staff-split: a co-op PLAYER serving as cung nữ is her coop entry in her mistress's staff on the OTHER seat only (on her own seat she is S),
   and only while the world loops do not run (jcoopworld withoutFriend pulls her out); she is never one of the household's allotted servants
   (as in solo, where the cung-nữ player is not in m.staff). Counted, she made the host trim a real servant at her arrival (that person
   vanished) and every month the fill (her pulled) and the trim (her back) made and dropped one more — on the host only, so the two seats split. */
function hhHas(p){const L=((p&&p.staff)||[]).filter(s=>s&&!s.coop);return[L.filter(s=>s.role==="maid").length+1,L.filter(s=>s.role==="eunuch").length]}
function mkServ(role){const n=role==="maid"?(AV.maids||[]).length:0;
 const sa=servAge(role);return{fc:drawF(role==="maid"?"maid":"eunuch",sa.age),fk:bandKeys(role==="maid"?"maid":"eunuch",sa.age)[0],sid:++sidN,name:nmNew(role==="maid"?"maid":"eun"),role,face:allServ().filter(x=>x.role===role).length,...sa,loyal:BAL.srvLoyal.base+R(BAL.srvLoyal.r),spyFor:null,lover:null,af:{}}}
function allServ(){const L=[];for(const p of [S].concat(rivals))if(p&&p.staff)L.push(...p.staff);return L}
/* perf (review ag-all-2 r2 B5): the last owner found is checked first (one includes on one list); a moved servant falls through to the full scan */
const OWN_C=new WeakMap();
function ownerOf(s){const o=s&&typeof s==="object";if(o){const c=OWN_C.get(s);if(c&&c.staff&&c.staff.includes(s)&&(c===S||rivals.includes(c)))return c}
 for(const p of [S].concat(rivals))if(p&&p.staff&&p.staff.includes(s)){if(o)OWN_C.set(s,p);return p}return null}
function servById(id){return allServ().find(s=>s.sid===id)||null}
function staffInit(){sidN=Math.max(sidN,...allServ().map(s=>s.sid),0);capSweep();for(const p of consorts()){if(!p.staff)p.staff=[];fillStaff(p,true)}
 if(!S.court)S.court={tq:{name:"Tổng quản "+nmNew("eunE"),n:"Tổng quản thái giám Càn Thanh cung",af:{},age:56+R(6)},ksp:{name:"Thái giám Kính sự phòng Kính Sự",n:"Giữ thẻ bài",af:{},age:40+R(10)},ped:{name:nmNew("eun"),n:"Thái giám Nội vụ phủ lo mua đồ",af:{},age:20+R(7)},ty:{name:"Thái y Trương",n:"Thái y viện",af:{},age:50+R(8)}};
 const L=allServ();if(!L.some(s=>s.af&&Object.keys(s.af).length))for(const s of L){const o=pick(L.filter(x=>ownerOf(x)!==ownerOf(s)));if(o){s.af[o.sid]=30;o.af[s.sid]=30}
  if(s.role==="eunuch"&&!(typeof asSelfOn==="function"&&asSelfOn(ownerOf(s)))&&roll(20)){/* AG-ALL B: đối thực is chosen ("Hẹn ước", jagstaff) */const m=pick(L.filter(x=>x.role==="maid"&&!x.lover&&ownerOf(x)!==ownerOf(s)));if(m){s.lover=m.sid;m.lover=s.sid}}}}
function fillStaff(p,free){const [cm,ce]=capOf(p);let [m,e]=hhHas(p);
 while(m<cm&&roomFor("maid")&&(free||p.bac>=BAL.house.hireBac)){p.staff.push(mkServ("maid"));m++;if(!free)ap(p,{bac:-BAL.house.hireBac})}while(e<ce&&roomFor("eunuch")&&(free||p.bac>=BAL.house.hireBac)){p.staff.push(mkServ("eunuch"));e++;if(!free)ap(p,{bac:-BAL.house.hireBac})}}
/* OVER THE TABLE (old saves, a demotion, the cold palace; review/staff-root; review/staff-cap-fix owner 18/11): Nội vụ phủ takes the extra servants back
   and sends them elsewhere. ONE RULE: the household NEVER stays over the table BAL.promo.cap — every servant counts (hhHas), the cap is met by
   sending others away; only those who cannot be moved stay: the personal maid (not in staff), a named palace woman (eid, jstaff post) and a
   co-op player's servant (coop). Order: the least trusted go first; her own eyes and ears (spyFor "me"), lovers, a servant coming home (srvHome)
   and `stay` (one just placed, e.g. a plant) last — but they DO go when nobody else can (the arrival is refused).
   EVERY removal from her household is told to her: a servant she trusts (loyal >= BAL.promo.trimTrust) with a farewell scene, the others in ONE
   grouped kit notice (kitPanel kind "notice") per trim; plus a log line. NPCs: data only. The host decides (co-op guest trims only her own: capSweep). */
function capTrim(p,stay){const gone=[];try{if(!p||!Array.isArray(p.staff)||p.coop||(S&&p===S.thO))return gone;const c=capOf(p),h=hhHas(p);
 const keep=s=>(s===stay||s.home?5000:0)+(s.spyFor==="me"?1000:0)+(s.lover?200:0)+(s.loyal||0);
 [["maid",0],["eunuch",1]].forEach(([role,i])=>{while(h[i]>c[i]){const L=p.staff.filter(s=>s&&s.role===role&&!s.eid&&!s.coop).sort((a,b)=>keep(a)-keep(b));if(!L.length)break;
  const x=L[0];p.staff.splice(p.staff.indexOf(x),1);h[i]--;x.spyFor=x.spyFor==="me"?null:x.spyFor;delete x.home;gone.push(x);
  try{if(x.fid&&typeof figUsed==="function"&&!(window.COOPW&&COOPW.on&&COOPW.seat==="b")){const U=figUsed();const k=U.indexOf(x.fid);if(k>=0)U.splice(k,1)}}catch(e){}}});
 if(p===S&&gone.length)capTell(gone,c);
 for(const s of p.staff){const i=s&&s.role==="maid"?0:1;if(s&&s.home&&h[i]<=c[i])delete s.home}}catch(e){console.error("capTrim",e)}return gone}
/* the one way she is told that Nội vụ phủ took servants back (capTrim; jstaff fitCap goes through capTrim) */
function capTell(gone,c){c=c||capOf(S);const T=gone.filter(s=>(s.loyal||0)>=BAL.promo.trimTrust),O=gone.filter(s=>!T.includes(s));
 log(`Nội vụ phủ định lại kẻ hầu theo phẩm vị: ${gone.map(s=>s.name).join(", ")} được điều sang hầu nơi khác.`);
 if(O.length){const nm=O.map(s=>s.name).join(", ");try{if(typeof kitPanel==="function")kitPanel({kind:"notice",title:"Nội vụ phủ điều người",sub:"Định lại kẻ hầu theo phẩm vị",subject:pServ(O[0]),
   facts:[capLaw(c),`${nm} ${O.length>1?"đều ":""}được điều sang hầu nơi khác.`],btn:"Đã hiểu"});
  else Q.push({t:"Nội vụ phủ điều người",who:pServ(O[0]),h:`<p>Nội vụ phủ định lại số kẻ hầu theo phẩm vị của ngươi. ${nm} được điều sang hầu nơi khác.</p>`,btn:"Đã hiểu"})}catch(e){console.error("capTell",e)}}
 for(const s of T)Q.push({t:"Nội vụ phủ điều người",who:pServ(s),h:`<p>Nội vụ phủ định lại số kẻ hầu theo phẩm vị của ngươi. ${s.name} phải sang hầu nơi khác.</p><p>${s.name} quỳ lạy từ biệt: “Nô tỳ đi rồi, xin chủ tử giữ gìn. Có việc gì, chủ tử cứ sai người gọi, nô tỳ vẫn nhớ ơn.”</p>`,btn:"Đành vậy"})}
/* the household law as she reads it, from the one table (BAL.promo.cap via capOf) */
function capLaw(c){let w="";try{w=S.out?"Ở lãnh cung":`Phẩm ${typeof prRankName==="function"?prRankName(rkOf(S)):RANKS[Math.max(0,Math.min(RANKS.length-1,S.rank|0))].n}`}catch(e){}
 return `${w||"Phẩm vị này"} theo lệ giữ ${c[0]} cung nữ (kể cả cung nữ thân tín)${c[1]?`, ${c[1]} thái giám`:", không có thái giám"}.`}
/* can p take one more servant of this role without staying over the table (room under the cap, or an ordinary servant Nội vụ phủ can move)? */
function capRoom(p,role){try{const i=role==="maid"?0:1;if(hhHas(p)[i]<capOf(p)[i])return true;return(p.staff||[]).some(s=>s&&s.role===role&&!s.eid&&!s.coop&&!s.home)}catch(e){return false}}
/* the one shared mark for a servant handed back to her own mistress (co-op settle: refused seat / refused 'srv'; any later return path):
   capTrim sends the others first; she goes only when nobody else can (never over the table); the mark clears once that side is within the table */
function srvHome(s){if(s&&typeof s==="object")s.home=1;return s}
/* co-op guest (review/staff-root-r1): her own household is a PERSONAL key (jcoopworld W_KEYS has no staff), so the guest trims HER OWN
   household itself (old save, demotion, cold palace); the NPC households and the face list (fidUsed, a world key) stay the host's */
function capSweep(){try{if(!S)return;if(window.COOPW&&COOPW.on&&COOPW.seat==="b"){capTrim(S);return}for(const p of [S].concat(typeof rivals!=="undefined"?rivals:[]))if(p&&(p===S||p.alive!==false))capTrim(p)}catch(e){}}
function servAge(role){const age=role==="maid"?16+R(10):BAL.ageMin+R(45);return role==="maid"?{age}:{age,fe:eunBand(age)}}
function pServ(s){const g=rkOfFace("serv",s);return Object.assign(pServ0(s),{rk:g[0],rw:g[1]})}
function pServ0(s){const n=s.role==="maid"?6:4,i=(s.face>=0?s.face:0);if(s.role!=="maid")return{src:fsrc(s.fc,`img/face-eunuch-${(s.fe>=0?s.fe:eunBand(s.age||30))+1}.webp`),hue:0,ini:"Hoạn",col:"#8a8aa0"};return{src:fsrc(s.fc,""),hue:0,ini:s.role==="maid"?s.name.split(" ").pop()[0]:"Hoạn",col:s.role==="maid"?"#b9a48a":"#8a8aa0"}}
/* the servant one sends: loyalty and traits set the odds and the risk of confessing */
function bestSent(p){const L=(p.staff||[]).filter(s=>!s.spyFor);if(!L.length)return null;return L.slice().sort((a,b)=>(b.loyal+nq(b,"sharp",BAL.net.k.spySharp))-(a.loyal+nq(a,"sharp",BAL.net.k.spySharp)))[0]}
function servCaught(p,s){if(!s)return"";if(roll(30)){p.staff.splice(p.staff.indexOf(s),1);return `${s.name} bị đánh chết trong ngục Thận Hình ti. `}s.loyal=cl(s.loyal-BAL.eff.j10.loyalServCaught,0,100);s.trouble=wk();return""}
/* acts on servants (same functions for NPC mistresses) */
function threatServ(a,s){const o=ownerOf(s);if(!o||!s.lover)return"";/* 2f2: still the person's choice; fear weighs in (BAL.ag.know.tm.threat) */
 if(typeof tmOdds!=="function"){s.spyFor=key(a);oanAdd(s,a,BAL.relMS.threat);return `${NMc(a)} dọa tố chuyện đối thực của ${s.name}; hắn/nàng sợ hãi, thành tai mắt. `}
 const od=tmOdds(a,s)+BAL.ag.know.tm.threat;if(agTry(od)){s.spyFor=key(a);oanAdd(s,a,BAL.relMS.threat);return `${NMc(a)} dọa tố chuyện đối thực của ${s.name}; hắn/nàng sợ hãi, thành tai mắt. `}
 if(agSoft(od)){if(a===S)agSoftTxt(S,"Dọa tố chuyện đối thực");return""}/* review ag-all-2 r2 C5: soft fail at the cap (OD ~17:35Z), as tmAsk */
 const t=tmRefuse(a,s);const f=typeof tmFear==="function"?tmFear(a,1):"";/* failure costs both ways (OD ~17:00Z): her master hears, her sent servant fears (BAL.ag.bt.fear) */
 return `${NMc(a)} dọa tố chuyện đối thực của ${s.name}; hắn/nàng không chịu làm tai mắt${t?", còn bẩm lại với chủ":""}.${f?" "+f+".":""} `}
let PLANT_OK=0;/* the last plantServ landed (cx2:plantSrv reads it: a refusal returns a line too) */
/* ONE odds of planting a servant (review/odds-meter-back, law 4): the roll in plantServ and the card word of PEND.plantsv both read it */
function plantOdds(a,s){s=s||bestSent(a);return s?odA(a,40+a.tamco/4+nq(s,"sharp",BAL.net.k.poachSharp)):0}
function plantServ(a,t){PLANT_OK=0;if(!a.staff)a.staff=[];const s=bestSent(a);if(!s||a.bac<BAL.house.plantBac)return"";/* review ag-all-2 r2 A5 (OD 17/11 ~17:10Z (1)): the bạc only when Nội vụ phủ takes the servant; she must hold it to try */if(capRoom(t,s.role)/* staff-cap-fix: no room (only unmovable servants) = refused */&&roll(plantOdds(a,s))){ap(a,{bac:-BAL.house.plantBac});PLANT_OK=1;a.staff.splice(a.staff.indexOf(s),1);s.spyFor=key(a);(t.staff=t.staff||[]).push(s);/* a full household: the plant takes the place of its least trusted servant (one table, review/staff-root) */capTrim(t,s);return `${NMc(a)} cài ${s.name} vào cung ${NM(t)} làm tai mắt. `}evA(t,a,BAL.eff.j10.evPlantServ);return `Nội vụ phủ thấy lạ, ${NM(t)} không nhận ${s.name}. `}
function servMonth(){let ev="";capSweep();for(const p of consorts()){if(!p.staff)p.staff=[];
  /* co-op guest (review/servant-mline-r2): an NPC household's own month (loyalty, NPC-vs-NPC spies, refilling) rolls on the host;
     the guest keeps only what concerns her: her spies' reports, her servants' friends, NPC acts aimed at her (pickTarget gives only her) */
  const G=p!==S&&typeof mlGuest==="function"&&mlGuest();
  const d=(p.schemes||0)-(p.schLast||0);p.schLast=p.schemes||0;
  for(const s of p.staff.slice()){if(!netIs(s,"loyal")&&!G)s.loyal=cl(s.loyal-BAL.eff.j10.loyalServMonth,0,100);
   if(s.spyFor&&!(G&&byKey(s.spyFor)!==S)){const m=byKey(s.spyFor);if(m&&(m===S||m.alive)){if(d>0&&!(typeof asSelfOn==="function"&&asSelfOn(p))&&roll(60)){/* AG-ALL B: the spy's own "Lén báo tin" (jagstaff) *//*evok: her schemes counter rose this week*/evA(m,p,BAL.ag.ev.one);if(m===S)ev+=`Tai mắt ${s.name} trong cung ${p.name} báo: nàng đang bày mưu. ${evSg(BAL.ag.ev.one,1)}. `}}else s.spyFor=null}
   if(d>0&&!(typeof asSelfOn==="function"&&asSelfOn(p)))for(const fid in s.af){/* AG-ALL B: told in her chosen "Trò chuyện" */if(s.af[fid]<20)continue;const f=servById(+fid),o=f&&ownerOf(f);if(o&&o!==p&&(!G||o===S)&&roll((nv(s,"tellRoll"))+srk(s)*5)){/*evok: same (d>0)*/evA(o,p,BAL.ag.ev.one);if(o===S)ev+=`${f.name} nghe bạn là ${s.name} kể chuyện cung ${NM(p)}: ${evSg(BAL.ag.ev.one)}. `}}}
  const AGP=window.agDOn&&agDOn();/* AG-ALL-2: Mua chuộc / Cài người are her day-plan options (jagacts2) */
  if(p!==S&&!AGP&&roll(10)){const t=pickTarget(p);if(t&&t.staff&&t.staff.length&&p.bac>=60){const s=pick(t.staff);const r=bribeServ(p,s);if(t===S&&r&&s.spyFor===key(p)&&eyes(S)>=3)ev+=`Có tin: ${r}`}}
  if(p!==S&&!AGP&&roll(2)){const t=pickTarget(p);if(t)plantServ(p,t)}
  if(p!==S&&!G)fillStaff(p,false)}
 return ev}
/* ODDS CAP: Tra khảo a spy and Che chở before Thận Hình ti are chances (owner 17/11 17:00Z), rolled once for every door (house card, staff tab)
   and, by the AG-ALL two-way rule, the same for an NPC mistress (servDo m): her Tâm cơ / Danh / rank */
function traO(s,m){m=m||S;const T=BAL.house.tra;return oddsCl(Math.round(T.base+(m.tamco||0)/T.tcDiv-(s&&netIs(s,"loyal")?T.loyal:0)))}
function cheO(m){m=m||S;const C=BAL.house.che;return oddsCl(Math.round(C.base+(m.danh||0)/C.danhDiv+rkOf(m)*C.rank))}
function servAct(a,id){const s=servById(id);if(!s||S.dead||Q.length)return;const o=ownerOf(s);let r="";window.__servOk=true;
 if(o===S){if(a==="thuong"&&S.bac<BAL.house.thuongBac)return;if(a==="hoi"){if(!can(2))return;const fz=nv(s,"askTalk");/* the odds on the card, read before the spend (shown-odds r2) */spend(2);r=fzRun(fz,null,()=>servDo(S,a,s))}else r=servDo(S,a,s)}
 else if(o){if(!can(2))return;if(a==="mua"){const fz=sgServOdds(s);/* odds read before the spend (shown-odds r2; one formula with the jsgame card) */spend(2);r=fzRun(fz,null,()=>bribeServ(S,s))}else if(a==="doa"){spend(2);r=threatServ(S,s)}}
 if(r)log(r);render()}
/* ONE function for her own-staff buttons (Thưởng / Phạt / Hỏi chuyện / Đổi người / Che chở) and an NPC master's choice (AG-ALL-2e cx3:staff, jagacts3); m = the master */
function servDo(m,a,s){const me=m===S,P=BAL.ag.par3.staff;let r="";if(!m||!s||!(m.staff||[]).includes(s))return"";const pay=x=>me?apply(x):ap(m,x);
 if(a==="thuong"){if((m.bac||0)<BAL.house.thuongBac)return"";pay({bac:-BAL.house.thuongBac});s.loyal=cl(s.loyal+BAL.eff.j10.loyalServAct,0,100);r=`Thưởng ${s.name}: thiện cảm ${balSg(BAL.eff.j10.loyalServAct)}.`}
 else if(a==="phat"){s.loyal=cl(s.loyal-BAL.eff.j10.loyalServAct_2,0,100);if(s.spyFor&&!roll(traO(s,m))){if(me)window.__servOk=false;r=`Tra khảo ${s.name}: <span class="r">hỏng</span>, ${s.role==="eunuch"?"hắn":"nàng"} cắn răng không khai: thiện cảm -${balAb(BAL.eff.j10.loyalServAct_2)}.`}else if(s.spyFor){const sp=byKey(s.spyFor);if(m===S)typeof knSoldFound==="function"&&knSoldFound(s);r=`Tra khảo ${s.name}: khai là tai mắt của ${sp?NM(sp):"kẻ khác"}. Đuổi khỏi cung.`;m.staff.splice(m.staff.indexOf(s),1);if(sp&&sp!==m)evA(m,sp,BAL.eff.j10.evServAct)}else r=`Phạt ${s.name}: thiện cảm -${balAb(BAL.eff.j10.loyalServAct_2)}.`}
 else if(a==="hoi"){const f=Object.keys(s.af||{}).map(x=>servById(+x)).find(x=>x&&s.af[x.sid]>=P.hoi.af);const o2=f&&ownerOf(f);
  if(o2&&o2!==m&&aRoll(nv(s,"askTalk"),m)){r=evA(m,o2,BAL.eff.j10.evServAct_2)?`${s.name} kể chuyện nghe từ ${f.name} bên cung ${o2.name}: chứng cứ ${balSg(BAL.eff.j10.evServAct_2)}.`:`${s.name} kể chuyện nghe từ ${f.name} bên cung ${o2.name}: không có gì sai trái, chỉ biết ${harmTxt(o2)}.`}else r=`${s.name} không biết gì mới.`;
  {const dt=allServ().find(x=>x.lover&&!(m.knowDT||[]).includes(x.sid)&&ownerOf(x)!==m);if(dt&&roll(P.hoi.dt)){m.knowDT=(m.knowDT||[]).concat([dt.sid,dt.lover]);if(me)r+=` Lại nghe đồn ${dt.name} và ${(servById(dt.lover)||{}).name} đối thực.`}}}
 else if(a==="doi"){m.staff.splice(m.staff.indexOf(s),1);r=`Trả ${s.name} về Nội vụ phủ.`}
 else if(a==="che"){pay({danh:BAL.eff.j10.danhServAct});if(!roll(cheO(m))){if(me)window.__servOk=false;s.loyal=cl(s.loyal+BAL.house.che.failLoy,0,100);r=`Che chở ${s.name}: <span class="r">hỏng</span>, Thận Hình ti không nể mặt: Danh ${balSg(BAL.eff.j10.danhServAct)}, thiện cảm +${BAL.house.che.failLoy}${me?" (biết ơn ngươi đã ra mặt)":""}.`}else{s.loyal=cl(s.loyal+BAL.eff.j10.loyalServAct_3,0,100);r=`Che chở ${s.name} trước Thận Hình ti: thiện cảm ${balSg(BAL.eff.j10.loyalServAct_3)}, Danh ${balSg(BAL.eff.j10.danhServAct)}.`}}
 return me?r:r?`${m.name}: ${r}`:""}
function courtAct(a,k){const c=S.court[k];if(!c||S.dead||Q.length)return;let r="";
 if(a==="thuong"){if(S.bac<BAL.bacFee.court)return;r=courtGive(S,k)}
 if(a==="hoi"){if(!can(BAL.btn.courtHoi.k))return;const oHoi=BAL.odb.j10.rbCourtAct+(c.af.me||0)/2;/* the odds on the card, read before the spend (shown-odds r2) */spend(BAL.btn.courtHoi.k);c.af.me=(c.af.me||0)+BAL.eff.j10.meCourtAct_2;if(k==="tq"&&roll(oHoi)){discover();r=`${c.name} hé lộ một sở thích của Hoàng thượng.`}else if(k==="ksp")r="Sổ thị tẩm: "+kitNameList(liveRivals(true),x=>`${x.name} ${x.nights}`)+`; ngươi ${S.nights}.`;else r=`${c.name} chỉ cười, không nói gì.`}
 if(r)log(r);render()}
function tqAf(p){return S.court&&S.court.tq?(S.court.tq.af[key(p)]||0):0}
/* Biếu quà người trong triều (Tổng quản / Kính sự phòng): ONE function for the player's button (courtAct thuong) and an NPC consort (AG-ALL-2 cx:tqGift) */
function courtGive(a,k){const c=S.court&&S.court[k];const bac=BAL.bacFee.court,af=BAL.eff.j10.meCourtAct;if(!c||(a.bac||0)<bac)return"";if(a===S)apply({bac:-bac});else ap(a,{bac:-bac});const id=a===S?"me":a.id;c.af[id]=(c.af[id]||0)+af;
 return a===S?`Biếu ${c.name} ${bac} lượng: người ấy quý ngươi ${balSg(af)}.`:`${a.name} biếu ${c.name} ${bac} lượng`}
/* the old monthly drip (roll 10): off while the day plan runs — an NPC consort's own choice now (jagacts2 cx:tqGift) */
function npcCourt(v){if(typeof agDOn==="function"&&agDOn())return;if(roll(10)&&v.bac>=BAL.bacFee.court*2&&S.court)courtGive(v,"tq")}
function staffHTML(){const row=(s,btns)=>`<div class="srow2">${mdH(pServ(s),"sm")}<div class="sinfo"><b>${s.name}</b><span>${srkName(s)} · ${strShow(s)}${s.lover&&(S.knowDT||[]).includes(s.sid)?" · <span class=\"r\">đối thực</span>":""}${s.spyFor==="me"?" · <span class=\"g\">tai mắt của ngươi</span>":""}</span></div><div class="rbtn">${btns}</div></div>`;
 const [cm,ce]=capOf(S),[nm,ne]=hhHas(S);
 let h=`<div class="ph"><span>Kẻ hầu: ${nm}/${cm} cung nữ · ${ne}/${ce} thái giám</span></div>`;
 h+=`<div class="srow2">${mdH(pMaid(),"sm")}<div class="sinfo"><b>${S.maid.name}</b><span>${kitMaidTitle(null,1)} · thiện cảm ${S.maid.loyal}</span></div></div>`;
 h+=S.staff.map(s=>row(s,`<span class="past">thiện cảm ${s.loyal}</span><button data-sv="thuong" data-sid="${s.sid}" ${S.bac<BAL.house.thuongBac?"disabled":""}>Thưởng<small>Bạc -${BAL.house.thuongBac}</small></button><button data-sv="phat" data-sid="${s.sid}">Phạt<small>thiện cảm -${balAb(BAL.eff.j10.loyalServAct_2)}</small></button><button data-sv="hoi" data-sid="${s.sid}" ${!can(2)?"disabled":""}>Hỏi chuyện<small>2 khắc</small></button><button data-sv="che" data-sid="${s.sid}">Che chở<small>Danh ${balSg(BAL.eff.j10.danhServAct)}</small></button><button data-sv="doi" data-sid="${s.sid}">Đổi người</button><button data-rec="${s.sid}" ${S.bac<BAL.house.upBac?"disabled":""}>Tiến cử<small>Bạc -${BAL.house.upBac} · Danh -${BAL.house.upDanh}</small></button>`)).join("")+(S.staff.some(s=>s.role==="maid"&&srk(s)>=BAL.srvRk.cs)?`<div class="rbtn"><button data-smaid="1" ${!can(2)?"disabled":""}>Chưởng sự tra xét cung nữ<small>2 khắc · tìm tai mắt, đối thực</small></button></div>`:"");
 h+=`<div class="rbtn" style="margin:4px 0"><button data-hire="maid" ${nm>=cm||S.bac<BAL.house.hireBac?"disabled":""}>Nội vụ phủ: thêm cung nữ<small>Bạc -${BAL.house.hireBac}</small></button><button data-hire="eunuch" ${ne>=ce||S.bac<BAL.house.hireBac?"disabled":""}>Thêm thái giám<small>Bạc -${BAL.house.hireBac}</small></button><button data-plantsv="1" ${!can(2)||S.bac<BAL.house.plantBac||!bestSent(S)?"disabled":""}>Cài người vào cung khác<small>Bạc -${BAL.house.plantBac} · 2 khắc</small></button></div>`;
 h+=`<h3>Người trong cung</h3>`+Object.entries(S.court).map(([k,c])=>`<div class="srow2">${mdH(k==="ty"?pDoc():{src:`img/face-eunuch-${["tq","ksp","ped"].indexOf(k)%4+1}.webp`,ini:"Hoạn",col:"#8a8aa0"},"sm")}<div class="sinfo"><b>${c.name}</b><span>${c.n} · quý ngươi ${c.af.me||0}</span></div><div class="rbtn"><button data-cv="thuong" data-ck="${k}" ${S.bac<BAL.bacFee.court?"disabled":""}>Biếu<small>Bạc -${BAL.bacFee.court}</small></button><button data-cv="hoi" data-ck="${k}" ${!can(2)?"disabled":""}>Hỏi chuyện<small>2 khắc</small></button></div></div>`).join("");
 h+=`<h3>Kẻ hầu cung khác</h3>`+liveRivals(true).map(v=>`<div class="past" style="margin-top:4px"><b>${v.name}</b></div>`+(v.staff||[]).map(s=>row(s,s.spyFor==="me"?"":`<button data-sv="mua" data-sid="${s.sid}" ${!can(2)||S.bac<nv(s,"bribeCost")?"disabled":""}>Mua chuộc<small>thành: Bạc -${nv(s,"bribeCost")} · ${word(bribeOdds(S,s))}</small></button>${s.lover&&(S.knowDT||[]).includes(s.sid)?`<button data-sv="doa" data-sid="${s.sid}" ${!can(2)?"disabled":""}>Dọa tố đối thực<small>2 khắc</small></button>`:""}`)).join("")).join("");
 return h}
PEND.plantsv=()=>({t:"<p>Cài người hầu của ngươi vào cung ai?</p>",o:liveRivals(true).filter(v=>!sameHouse(S,v)).map(v=>({kgt:v,n:v.name,fx:{},x:`${word(plantOdds(S))} · thành: người của ngươi vào cung ${v.name} làm tai mắt, Bạc -${BAL.house.plantBac} · hỏng: không mất bạc, nàng nắm ${balAb(BAL.eff.j10.evPlantServ)} chứng cứ`,go:()=>{spend(2);log(plantServ(S,v))}})).concat([{n:"Thôi",fx:{}}])});

/* ================= FACTIONS ================= */
const CLANS=["Tể tướng","Đại tướng quân","Lễ bộ","Hộ bộ","Hàn lâm"];
function clanOf(p){if(p===S)return {tt:"Tể tướng",dtq:"Đại tướng quân",ch:"Thái hậu",thd:"Hàn lâm"}[S.origin.k]||"";if(!p.clan)p.clan=pick(CLANS);return p.clan}
function facOf(p){return (S.facs||[]).find(f=>f.m.includes(key(p)))||null}
/* cold-faction (law 1 + 6, whole family): ONE «present» rule for faction life. She is out of it while in lãnh cung (S.out from cold(), not the
   srvW / kcW stand-in S.out of the servant / tiểu thư road); an NPC (and the co-op friend's mirror, v.out = her cold) while dead or out.
   facRoll = the roll (named: still a member, sold out / dropped by name); facMembers = who is present (leads, counts, shares news, meets). */
function herCold(){try{return !!(S&&S.out&&S.coldTurn!=null&&!(typeof isSrv==="function"&&isSrv())&&!(typeof isKc==="function"&&isKc()))}catch(e){return false}}
function facIn(p){return !!p&&(p===S?!herCold()&&!S.dead:p.alive&&!p.out)}
function facRoll(f){return f.m.map(byKey).filter(p=>p&&(p===S?!S.dead:p.alive))}
function facCold(f){return facRoll(f).filter(p=>!facIn(p))}
function facMembers(f){return f.m.map(byKey).filter(p=>p&&facIn(p))}
function facLeader(f){return facMembers(f).sort((a,b)=>rkOf(b)-rkOf(a))[0]||null}
function facStr(f){return Math.round(facMembers(f).reduce((s,p)=>s+rkOf(p)*10+p.danh/2+(p.dad||40)/2,0))}
function facName(lead){if(lead===S)return `phe ${S.name.split(" ")[0]} gia`;if(lead.queen)return "phe Càn Ninh";return `phe ${lead.name.split(" ")[0]} gia`}
function facN(a){const f=facOf(a);return f?facMembers(f).length:1}
function found(a,b){if(facOf(a)||facOf(b))return"";S.facs=S.facs||[];const f={id:Date.now()%1e7+R(999),m:[key(a),key(b)],name:""};S.facs.push(f);f.name=facName(facLeader(f));relAdd(a,b,5);return `${NMc(a)} và ${NM(b)} kết thành ${f.name}. `}
function joinFac(p,f){if(facOf(p)||!f)return"";f.m.push(key(p));return `${NMc(p)} gia nhập ${f.name}. `}
function leaveFac(p){const f=facOf(p);if(!f)return"";f.m=f.m.filter(k=>k!==key(p));facMembers(f).forEach(x=>relAdd(p,x,-BAL.ag.par3.fac.leave.rel));if(!facLive(f))S.facs=S.facs.filter(x=>x!==f);return `${NMc(p)} rời ${f.name}. `}
/* cold-faction review (law 3, whole group): leaving of one's own will is never cost-only — «không dính bè phái» Danh + BAL.rcv.prop.danh (her tab, NPC cx3:facLeave, the lãnh cung letter); leaveFac alone stays the forced leave (divide / sellOut / split) */
function leaveFacSelf(p){const r=leaveFac(p);if(r){if(p===S)apply({danh:BAL.rcv.prop.danh});else ap(p,{danh:BAL.rcv.prop.danh})}return r}
function inviteOdds(a,t){const f=facOf(a);return odA(a,30+aff(t,a)/2+(f?facStr(f)/10:0)+(clanOf(a)===clanOf(t)?15:0))}
function facInvite(a,t){const f=facOf(a);if(!f||facOf(t))return"";/* RECEIVER CHOICE (jrcv RCVK.facInvite) */return rcvAsk("facInvite",a,t)}
function askJoin(a,f){const l=facLeader(f);if(!l||facOf(a))return"";/* RECEIVER CHOICE (jrcv RCVK.facJoin): the leader answers */if(l===a)return joinFac(a,f);return rcvAsk("facJoin",a,l,f.id)}
function sellOut(a){const f=facOf(a);if(!f)return"";const X=BAL.ag.par3.fac.sell,M=facRoll(f).filter(x=>x!==a);/* cold-faction: a member in lãnh cung is named too */const q=queenP()&&queenP()!==a?queenP():null;leaveFac(a);
 for(const m of M){oanAdd(m,a,X.oan);if(q)evA(q,m,BAL.eff.j10.evSellOut);else if(facIn(m)&&roll(X.pun))punish(m,"bị đồng đảng tố giác",1)}if(a===S)apply({danh:X.danh,sung:X.sung});else ap(a,{danh:X.danh,sung:X.sung});if(empGive(a,X.emp,"accuse"))bestow(a,"accuse");return `${NMc(a)} bán đứng ${f.name}, đem chuyện của ${M.map(NM).join(", ")} dâng lên ${q?(q===S?"ngươi":"Hoàng hậu"):"Hoàng thượng"}. `}
function divide(a,f){const M=facMembers(f).filter(x=>x!==a);if(M.length<2)return"";const [x,y]=shuf(M.slice()).slice(0,2);if(roll(odA(a,40+a.tamco/3))){oanAdd(x,y,25);oanAdd(y,x,25);affAdd(x,y,-15);affAdd(y,x,-15);let r=`${NMc(a)} ly gián ${x===S?"ngươi":x.name} và ${y===S?"ngươi":y.name}. `;if(roll(50))r+=leaveFac(rkOf(x)<rkOf(y)?x:y);return r}evA(x,a,BAL.ag.ev.one);return `Mưu ly gián của ${NM(a)} bị ${NM(x)} nhìn thấu. `}
/* cold-faction (law 1): the leader strikes a member in lãnh cung off the roll — her button when she leads, an NPC leader in facMonth; one function */
function facDrop(l,m){const f=facOf(l);if(!f||facOf(m)!==f||facLeader(f)!==l||facIn(m))return"";const D=BAL.ag.par3.fac.drop;f.m=f.m.filter(k=>k!==key(m));oanAdd(m,l,D.oan);
 if(l===S)apply({danh:BAL.rcv.prop.danh});else ap(l,{danh:BAL.rcv.prop.danh});if(!facLive(f))S.facs=S.facs.filter(x=>x!==f);return `${NMc(l)} gạch tên ${NM(m)} khỏi ${f.name}. `}
/* ONE odds of a joint scheme (review/shown-odds-one-path): the faction card (her "Hợp mưu hạ") and the roll read the leader's, not hers */
function jointO(f){const M=facMembers(f),l=facLeader(f);return odA(l,oFrame(l)+5*(M.length-1))}
function jointScheme(f,t){const M=facMembers(f),l=facLeader(f);const o=jointO(f);
 if(aRoll(o)){fall(t,`bị ${f.name} hợp mưu tố tội`);M.forEach(m=>ap(m,{tamco:1}));return `${f.name} hợp mưu hạ ${NM(t)}: thành. `}
 M.forEach(m=>punish(m,`hợp mưu vu cáo ${NM(t)}`,2));return `<span class="r">${f.name} hợp mưu hạ ${NM(t)} bị lộ, cả phe bị phạt.</span> `}
function facLive(f){return facRoll(f).length>=2&&facMembers(f).length>=1}/* cold-faction: a member in lãnh cung keeps her place on the roll */
function facMonth(){let ev="";S.facs=(S.facs||[]).filter(facLive);
 for(const p of consorts())if(p.dad==null)p.dad=30+R(40);for(const p of consorts())if(roll(15))p.dad=cl(p.dad+(R(2)?8:-8),0,100);
 for(const f of S.facs){const M=facMembers(f);const l=facLeader(f);f.name=facName(l);
  /* members share evidence and news */
  const T=[S].concat(rivals);for(const t of T){if(M.includes(t))continue;const mx=Math.max(...M.map(m=>evG(m,t)));if(mx>0)M.forEach(m=>{if(evG(m,t)<mx)evA(m,t,mx-evG(m,t))})}
  /* betrayal, split */
  const b=mindPickBy(M.filter(m=>m!==S&&m!==l&&aff(m,l)<0),m=>-aff(m,l)*mindW(m,"flee"),null);/* npc-mind: was FIRST */if(b&&!p3FacOn()&&roll(4))ev+=seenNPC(b,b,sellOut(b))||"";
  const top=M.filter(m=>m!==S).sort((a,c)=>c.sung-a.sung);if(top.length>=2&&top[0].ghen>60&&top[1].ghen>60&&!p3FacOn()&&roll(5))ev+=eyes(S)>=2?leaveFac(top[1]):(leaveFac(top[1]),"");
  if(l!==S){const o=npcWhy("facJoint",{p:l,f},x=>!!x.tgt&&roll(6));if(o)ev+=seenNPC(l,o.tgt,jointScheme(f,o.tgt))}
  /* cold-faction: an NPC leader may strike a member in lãnh cung off the roll (her too: the news reaches her) */
  if(l&&l!==S){const D=BAL.ag.par3.fac.drop;for(const m of facCold(f))if(aff(l,m)<netTh(l,"than")&&roll(D.p)){const r=facDrop(l,m);if(r)ev+=m===S||eyes(S)>=2?r:"";break}}}/* npc-purpose G2: the leader moves only on a foe the whole faction hates */
 /* NPCs found, join, invite, divide */
 /* AG-ALL-2e2: with the day plan on, an NPC founds / asks to join / leaves / sells out / divides through her own options (jagacts3 cx3:fac*, the same functions as facAct) */
 if(!p3FacOn())for(const v of liveRivals(true)){if(facOf(v))continue;
  const fr=others(v).filter(x=>facIn(x)/* cold-faction: nobody rủ a woman in lãnh cung face to face (the one presence rule) */&&!sameHouse(v,x)&&(aff(v,x)>=netTh(v,"than")||clanOf(v)===clanOf(x)&&aff(v,x)>=netTh(v,"quen")||consorts().some(e=>e!==v&&e!==x&&oan(v,e)>=netTh(v,"act")&&oan(x,e)>=netTh(x,"act"))));
  const x=mindPickBy(fr,y=>BAL.mind.pick.j10fr.base+Math.max(0,aff(v,y)),v);/* npc-mind: was FIRST; facfound-parity: she is in fr too (law 1, her answer = jrcv card) */if(x&&roll(25)){const g=facOf(x);/* RECEIVER CHOICE (jrcv): the leader / the friend answers */const r=g?askJoin(v,g):rcvAsk("facFound",v,x);ev+=eyes(S)>=2||g&&facOf(S)===g?r:""}}
 const mine=facOf(S);for(const f of S.facs){if(f===mine)continue;const l=facLeader(f);const oa=l&&l!==S&&!facOf(S)&&facIn(S)/* cold-faction */&&aff(l,S)>=netTh(l,"than")?npcWhy("facAsk",{p:l,minAff:35},()=>roll(10)):null;if(oa)rcvAsk("facInvite",l,S)/* npc-purpose G2 reason + her card: the 4 answers (jrcv) */}
 if(mine){const od=npcWhy("facDiv",{mine});const l=od&&od.who;if(l&&l!==S&&roll(5)){const r=divide(l,mine);if(r)ev+=r}}/* npc-purpose G2: a rival leader who bears her a grudge divides her faction */
 return ev}
function facHTML(){const mine=facOf(S),F=(S.facs||[]).filter(facLive)/* cold-faction: never a faction with nobody present to lead it */,lc=herCold(),SB=BAL.ag.par3.fac.sell,DB=BAL.ag.par3.fac.drop;let h=`<div class="ph"><span>${mine?`Ngươi thuộc <b>${mine.name}</b>`:"Ngươi chưa vào phe nào"}</span><span>Họ: ${clanOf(S)||"không"}</span></div>`;
 /* cold-faction: in lãnh cung she cannot meet anyone; her faction business goes by letter (the lãnh cung cards, j14 coldActsOf) */
 if(lc)h+=`<p class="past">Ngươi đang ở lãnh cung, không gặp được ai. Chuyện phe phái chỉ còn cách gửi thư ra ngoài (xem các việc ở lãnh cung).</p>`;
 else if(!mine){const cands=liveRivals(true).filter(v=>!facOf(v)&&aff(v,S)>=netTh(v,"than")&&!sameHouse(S,v));h+=`<div class="rbtn" style="margin-bottom:6px">${cands.slice(0,4).map(v=>`<button data-fa="lap" data-fv="${v.id}" ${!can(2)?"disabled":""}>${mdH(pv(v),"xs")}Lập phe cùng ${v.name}<small>2 khắc · ${rcvWord(v,S)}</small></button>`).join("")||`<span class="past">Cần một phi tần thân với ngươi để lập phe.</span>`}</div>`}
 else{const out=liveRivals(true).filter(v=>!facOf(v)&&!sameHouse(S,v));h+=`<div class="rbtn" style="margin-bottom:6px">${out.slice(0,4).map(v=>`<button data-fa="moi" data-fv="${v.id}" ${!can(2)?"disabled":""}>${mdH(pv(v),"xs")}Mời ${v.name}<small>${rcvWord(v,S)}</small></button>`).join("")}<button data-fa="roi">Rời phe<small>Danh ${balSg(BAL.rcv.prop.danh)} · đồng đảng quý ngươi ${balSg(-BAL.ag.par3.fac.leave.rel)}</small></button><button data-fa="ban" ${!can(2)?"disabled":""}>Bán đứng<small>Danh ${balSg(SB.danh)} · cả phe oán ${balSg(SB.oan)}</small></button></div>`}
 h+=F.map(f=>{const M=facMembers(f),l=facLeader(f),st=Math.round(M.filter(m=>m!==S).reduce((s,m)=>s+aff(m,S),0)/Math.max(1,M.filter(m=>m!==S).length));const me=f===mine;
  return `<div class="rival"><div class="top" style="align-items:center;justify-content:flex-start"><b>${f.name}</b><em>đứng đầu: ${mdH(l===S?pMe():pv(l),"xs")}${l===S?"ngươi":l.name} · thế lực ${facStr(f)}</em></div><div class="chips">${M.map(m=>chip(`${mdH(m===S?pMe():pv(m),"xs")}${m===S?"Ngươi":m.name}`)).join("")}${facCold(f).map(m=>chip(`${mdH(m===S?pMe():pv(m),"xs")}${m===S?"Ngươi":m.name} (lãnh cung)`,"hot")).join("")}${me?"":chip(`Với ngươi: ${st>=BAL.cut.facRel?"thân":st<=-BAL.cut.facRel?"thù":"bình thường"} (${st})`,st<=-BAL.cut.facRel?"hot":st>=BAL.cut.facRel?"ok":"")}</div>${lc?"":me?(l===S?`<div class="rbtn">${facCold(f).map(x=>`<button data-fa="gach" data-fv="${x.id}" ${!can(BAL.ag.par3.fac.k)?"disabled":""}>${mdH(pv(x),"xs")}Gạch tên ${x.name}<small>Danh ${balSg(BAL.rcv.prop.danh)} · nàng oán ${balSg(DB.oan)}</small></button>`).join("")}${consorts().filter(x=>x!==S&&!M.includes(x)&&!sameHouse(S,x)).slice(0,3).map(x=>`<button data-fa="hop" data-fv="${x.id}" ${!can(2)?"disabled":""}>${mdH(pv(x),"xs")}Hợp mưu hạ ${x.name}<small>${word(jointO(f))} · lộ: cả phe bị phạt</small></button>`).join("")}</div>`:""):`<div class="rbtn">${mine?"":`<button data-fa="xin" data-ff="${f.id}" ${!can(2)?"disabled":""}>Xin vào phe<small>2 khắc</small></button>`}<button data-fa="ly" data-ff="${f.id}" ${!can(2)||M.length<2?"disabled":""}>Ly gián<small>${word(odA(S,40+S.tamco/3))} · 2 khắc</small></button></div>`}</div>`}).join("")||kitEmpty("Ta chưa có phe phái",["Hậu cung chưa có phe nào. Phi tần quý ta đủ lòng thì lập phe cùng ta.","Có phe thì được che chở, nhưng phe đối nghịch sẽ để mắt tới ta."],{topic:"Phe phái"});
 return h}
function facAct(a,d){if(S.dead||Q.length||herCold())return;/* cold-faction: from lãnh cung only by letter (j14 coldActsOf) */let r="";const v=d.fv?RV(+d.fv):null,f=d.ff?(S.facs||[]).find(x=>x.id===+d.ff):null;
 if(a==="roi"){r=leaveFacSelf(S)}
 else{if(!can(2))return;const fz=a==="hop"&&v&&facOf(S)?jointO(facOf(S)):null;/* the odds on the card, read before the spend (j9 fzRun) */spend(2);
  r=fzRun(fz,null,()=>{let r;if(a==="lap"&&v)r=rcvAsk("facFound",S,v);else if(a==="moi"&&v)r=facInvite(S,v);else if(a==="xin"&&f)r=askJoin(S,f);else if(a==="ban")r=sellOut(S);else if(a==="ly"&&f)r=divide(S,f);else if(a==="hop"&&v&&facOf(S))r=jointScheme(facOf(S),v);else if(a==="gach"&&v)r=facDrop(S,v);else spend(-2);return r})}
 if(r)log(r);render()}
