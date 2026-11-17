/* ================= HOUSEHOLDS: maids and eunuchs, one rule for every consort ================= */

const EUN=["Tiểu Lộ Tử","Tiểu Phúc Tử","Tiểu Thuận Tử","Tiểu An Tử","Tiểu Hỉ Tử","Tiểu Quế Tử","Tiểu Lâm Tử","Tiểu Đức Tử","Tiểu Thọ Tử","Tiểu Xuân Tử"];
let sidN=0;
/* ONE household table (owner 17/11 OD 02:50Z + 04:48Z, review/staff-root): BAL.promo.cap[rank] = [maids INCLUDING the personal (close) maid, eunuchs],
   for her AND every NPC consort (two-way law); cold palace = the lowest row; Thái hậu = BAL.promo.capTh; a cung nữ (servant road) keeps no household.
   hhHas(p) = the same count of what the household holds now: the personal maid (S.maid / an NPC's own maid) is the "+1", counted once, here only. */
function capOf(p){const B=BAL.promo,C=B.cap;if(S&&p&&p===S.thO)return B.capTh.slice();if(p===S&&typeof isSrv==="function"&&isSrv())return C[0].map(()=>0);
 return C[p&&p.out?0:Math.max(0,Math.min(C.length-1,rkOf(p)||0))].slice()}
function hhHas(p){const L=(p&&p.staff)||[];return[L.filter(s=>s.role==="maid").length+1,L.filter(s=>s.role==="eunuch").length]}
function mkServ(role){const n=role==="maid"?(AV.maids||[]).length:0;const used=allServ().map(x=>x.name);const pool=(role==="maid"?MAIDS:EUN).filter(x=>!used.includes(x));
 const sa=servAge(role);return{fc:drawF(role==="maid"?"maid":"eunuch",sa.age),fk:bandKeys(role==="maid"?"maid":"eunuch",sa.age)[0],sid:++sidN,name:pool.length?pick(pool):pick(role==="maid"?MAIDS:EUN)+" "+(R(8)+2),role,face:allServ().filter(x=>x.role===role).length,hue:0,...sa,loyal:45+R(36),spyFor:null,lover:null,af:{}}}
function allServ(){const L=[];for(const p of [S].concat(rivals))if(p&&p.staff)L.push(...p.staff);return L}
function ownerOf(s){for(const p of [S].concat(rivals))if(p&&p.staff&&p.staff.includes(s))return p;return null}
function servById(id){return allServ().find(s=>s.sid===id)||null}
function staffInit(){sidN=Math.max(sidN,...allServ().map(s=>s.sid),0);capSweep();for(const p of consorts()){if(!p.staff)p.staff=[];fillStaff(p,true)}
 if(!S.court)S.court={tq:{name:"Tổng quản Lý Liên Anh",n:"Tổng quản thái giám Càn Thanh cung",af:{},age:56+R(6)},ksp:{name:"Thái giám Kính sự phòng Kính Sự",n:"Giữ thẻ bài",af:{},age:40+R(10)},ped:{name:"Tiểu Ngân Tử",n:"Thái giám Nội vụ phủ lo mua đồ",af:{},age:20+R(7)},ty:{name:"Thái y Trương",n:"Thái y viện",af:{},age:50+R(8)}};
 const L=allServ();if(!L.some(s=>s.af&&Object.keys(s.af).length))for(const s of L){const o=pick(L.filter(x=>ownerOf(x)!==ownerOf(s)));if(o){s.af[o.sid]=30;o.af[s.sid]=30}
  if(s.role==="eunuch"&&roll(20)){const m=pick(L.filter(x=>x.role==="maid"&&!x.lover&&ownerOf(x)!==ownerOf(s)));if(m){s.lover=m.sid;m.lover=s.sid}}}}
function fillStaff(p,free){const [cm,ce]=capOf(p);let [m,e]=hhHas(p);
 while(m<cm&&roomFor("maid")&&(free||p.bac>=20)){p.staff.push(mkServ("maid"));m++;if(!free)ap(p,{bac:-20})}while(e<ce&&roomFor("eunuch")&&(free||p.bac>=20)){p.staff.push(mkServ("eunuch"));e++;if(!free)ap(p,{bac:-20})}}
/* OVER THE TABLE (old saves, a demotion, the cold palace; review/staff-root): Nội vụ phủ takes the extra servants back and sends them elsewhere.
   Never the personal maid (not in staff), a named palace woman (eid), a co-op guest's servant; the least trusted go first, her own eyes and
   ears (spyFor "me") and lovers last; `stay` (a servant just placed, e.g. a plant) is never the one sent away. A servant she trusts (loyal >= BAL.promo.trimTrust) leaves with a farewell scene, the others with a log line.
   NPCs: data only. The host decides (co-op guest skips: the household is a world key). */
function capTrim(p,stay){const gone=[];try{if(!p||!Array.isArray(p.staff)||p.coop||(S&&p===S.thO))return gone;const c=capOf(p),h=hhHas(p);
 const keep=s=>(s.spyFor==="me"?1000:0)+(s.lover?200:0)+(s.loyal||0);
 [["maid",0],["eunuch",1]].forEach(([role,i])=>{while(h[i]>c[i]){const L=p.staff.filter(s=>s&&s!==stay&&s.role===role&&!s.eid&&!s.coop).sort((a,b)=>keep(a)-keep(b));if(!L.length)break;
  const x=L[0];p.staff.splice(p.staff.indexOf(x),1);h[i]--;x.spyFor=x.spyFor==="me"?null:x.spyFor;gone.push(x);
  try{if(x.fid&&typeof figUsed==="function"&&!(window.COOPW&&COOPW.on&&COOPW.seat==="b")){const U=figUsed();const k=U.indexOf(x.fid);if(k>=0)U.splice(k,1)}}catch(e){}}});
 if(p===S&&gone.length){const T=gone.filter(s=>(s.loyal||0)>=BAL.promo.trimTrust),O=gone.filter(s=>!T.includes(s));
  if(O.length)log(`Nội vụ phủ định lại kẻ hầu theo phẩm vị: ${O.map(s=>s.name).join(", ")} được điều sang hầu nơi khác.`);
  for(const s of T)Q.push({t:"Nội vụ phủ điều người",who:pServ(s),h:`<p>Nội vụ phủ định lại số kẻ hầu theo phẩm vị của ngươi. ${s.name} phải sang hầu nơi khác.</p><p>${s.name} quỳ lạy từ biệt: “Nô tỳ đi rồi, xin chủ tử giữ gìn. Có việc gì, chủ tử cứ sai người gọi, nô tỳ vẫn nhớ ơn.”</p>`,btn:"Đành vậy"})}}catch(e){console.error("capTrim",e)}return gone}
/* co-op guest (review/staff-root-r1): her own household is a PERSONAL key (jcoopworld W_KEYS has no staff), so the guest trims HER OWN
   household itself (old save, demotion, cold palace); the NPC households and the face list (fidUsed, a world key) stay the host's */
function capSweep(){try{if(!S)return;if(window.COOPW&&COOPW.on&&COOPW.seat==="b"){capTrim(S);return}for(const p of [S].concat(typeof rivals!=="undefined"?rivals:[]))if(p&&(p===S||p.alive!==false))capTrim(p)}catch(e){}}
function servAge(role){const age=role==="maid"?16+R(10):18+R(45);return role==="maid"?{age}:{age,fe:eunBand(age)}}
function pServ(s){const g=rkOfFace("serv",s);return Object.assign(pServ0(s),{rk:g[0],rw:g[1]})}
function pServ0(s){const n=s.role==="maid"?6:4,i=(s.face>=0?s.face:0);if(s.role!=="maid")return{src:fsrc(s.fc,`img/face-eunuch-${(s.fe>=0?s.fe:eunBand(s.age||30))+1}.webp`),hue:0,ini:"Hoạn",col:"#8a8aa0"};return{src:fsrc(s.fc,""),hue:0,ini:s.role==="maid"?s.name.split(" ").pop()[0]:"Hoạn",col:s.role==="maid"?"#b9a48a":"#8a8aa0"}}
/* the servant one sends: loyalty and traits set the odds and the risk of confessing */
function bestSent(p){const L=(p.staff||[]).filter(s=>!s.spyFor);if(!L.length)return null;return L.slice().sort((a,b)=>(b.loyal+nq(b,"sharp",BAL.net.k.spySharp))-(a.loyal+nq(a,"sharp",BAL.net.k.spySharp)))[0]}
function sentPen(s){if(!s)return 20;return cl(15-nq(s,"sharp",BAL.net.k.sentSharp)-Math.round((s.loyal-50)/10),0,25)}
function confessRisk(s){if(!s)return 25;return cl(20+nq(s,"timid",BAL.net.k.confTimid)-nq(s,"loyal",BAL.net.k.confLoyal)-Math.round(s.loyal/10),3,60)}
function servCaught(p,s){if(!s)return"";if(roll(30)){p.staff.splice(p.staff.indexOf(s),1);return `${s.name} bị đánh chết trong ngục Thận Hình ti. `}s.loyal=cl(s.loyal-10,0,100);s.trouble=wk();return""}
/* acts on servants (same functions for NPC mistresses) */
function bribeServ(a,s){const o=ownerOf(s);if(!o||o===a||a.bac<30)return"";ap(a,{bac:-30});const odds=odA(a,35+nq(s,"greed",BAL.net.k.bribeGreed)-s.loyal/3+a.tamco/5);
 if(roll(odds)){s.spyFor=key(a);return `${s.name} (người hầu của ${NM(o)}) nhận bạc của ${NM(a)}, thành tai mắt. `}s.loyal=cl(s.loyal+5,0,100);evA(o,a,1);relAdd(a,o,-5);return `${s.name} từ chối bạc của ${NM(a)} và mách chủ. `}
function threatServ(a,s){const o=ownerOf(s);if(!o||!s.lover)return"";s.spyFor=key(a);return `${NMc(a)} dọa tố chuyện đối thực của ${s.name}; hắn/nàng sợ hãi, thành tai mắt. `}
function plantServ(a,t){if(!a.staff)a.staff=[];const s=bestSent(a);if(!s||a.bac<40)return"";ap(a,{bac:-40});if(roll(odA(a,40+a.tamco/4+nq(s,"sharp",BAL.net.k.poachSharp)))){a.staff.splice(a.staff.indexOf(s),1);s.spyFor=key(a);(t.staff=t.staff||[]).push(s);/* a full household: the plant takes the place of its least trusted servant (one table, review/staff-root) */capTrim(t,s);return `${NMc(a)} cài ${s.name} vào cung ${NM(t)} làm tai mắt. `}evA(t,a,1);return `Nội vụ phủ thấy lạ, ${NM(t)} không nhận ${s.name}. `}
function servMonth(){let ev="";capSweep();for(const p of consorts()){if(!p.staff)p.staff=[];
  /* co-op guest (review/servant-mline-r2): an NPC household's own month (loyalty, NPC-vs-NPC spies, refilling) rolls on the host;
     the guest keeps only what concerns her: her spies' reports, her servants' friends, NPC acts aimed at her (pickTarget gives only her) */
  const G=p!==S&&typeof mlGuest==="function"&&mlGuest();
  const d=(p.schemes||0)-(p.schLast||0);p.schLast=p.schemes||0;
  for(const s of p.staff.slice()){if(!netIs(s,"loyal")&&!G)s.loyal=cl(s.loyal-1,0,100);
   if(s.spyFor&&!(G&&byKey(s.spyFor)!==S)){const m=byKey(s.spyFor);if(m&&(m===S||m.alive)){if(d>0&&roll(60)){/*evok: her schemes counter rose this week*/evA(m,p,1);if(m===S)ev+=`Tai mắt ${s.name} trong cung ${p.name} báo: nàng đang bày mưu. Chứng cứ +1. `}}else s.spyFor=null}
   if(d>0)for(const fid in s.af){if(s.af[fid]<20)continue;const f=servById(+fid),o=f&&ownerOf(f);if(o&&o!==p&&(!G||o===S)&&roll((nv(s,"tellRoll"))+srk(s)*5)){/*evok: same (d>0)*/evA(o,p,1);if(o===S)ev+=`${f.name} nghe bạn là ${s.name} kể chuyện cung ${NM(p)}: chứng cứ +1. `}}}
  if(p!==S&&roll(10)){const t=pickTarget(p);if(t&&t.staff&&t.staff.length&&p.bac>=60){const s=pick(t.staff);const r=bribeServ(p,s);if(t===S&&r&&s.spyFor===key(p)&&S.mat>=3)ev+=`Có tin: ${r}`}}
  if(p!==S&&roll(2)){const t=pickTarget(p);if(t)plantServ(p,t)}
  if(p!==S&&!G)fillStaff(p,false)}
 return ev}
function servAct(a,id){const s=servById(id);if(!s||S.dead||Q.length)return;const o=ownerOf(s);let r="";
 if(o===S){if(a==="thuong"){if(S.bac<10)return;apply({bac:-10});s.loyal=cl(s.loyal+12,0,100);r=`Thưởng ${s.name}: lòng +12.`}
  else if(a==="phat"){s.loyal=cl(s.loyal-15,0,100);if(s.spyFor){const m=byKey(s.spyFor);r=`Tra khảo ${s.name}: khai là tai mắt của ${m?NM(m):"kẻ khác"}. Đuổi khỏi cung.`;S.staff.splice(S.staff.indexOf(s),1);if(m&&m!==S)evA(S,m,1)}else r=`Phạt ${s.name}: lòng -15.`}
  else if(a==="hoi"){if(!can(2))return;spend(2);const f=Object.keys(s.af).map(x=>servById(+x)).find(x=>x&&s.af[x.sid]>=20);const o2=f&&ownerOf(f);
   if(o2&&o2!==S&&roll(nv(s,"askTalk"))){r=evA(S,o2,1)?`${s.name} kể chuyện nghe từ ${f.name} bên cung ${o2.name}: chứng cứ +1.`:`${s.name} kể chuyện nghe từ ${f.name} bên cung ${o2.name}: không có gì sai trái, chỉ biết ${harmTxt(o2)}.`}else r=`${s.name} không biết gì mới.`;
   const dt=allServ().find(x=>x.lover&&!(S.knowDT||[]).includes(x.sid)&&ownerOf(x)!==S);if(dt&&roll(30)){S.knowDT=(S.knowDT||[]).concat([dt.sid,dt.lover]);r+=` Lại nghe đồn ${dt.name} và ${(servById(dt.lover)||{}).name} đối thực.`}}
  else if(a==="doi"){S.staff.splice(S.staff.indexOf(s),1);r=`Trả ${s.name} về Nội vụ phủ.`}
  else if(a==="che"){s.loyal=cl(s.loyal+20,0,100);apply({danh:-2});r=`Che chở ${s.name} trước Thận Hình ti: lòng +20, Danh -2.`}}
 else if(o){if(!can(2))return;if(a==="mua"){spend(2);r=bribeServ(S,s)}else if(a==="doa"){spend(2);r=threatServ(S,s)}}
 if(r)log(r);render()}
function courtAct(a,k){const c=S.court[k];if(!c||S.dead||Q.length)return;let r="";
 if(a==="thuong"){if(S.bac<20)return;apply({bac:-20});c.af.me=(c.af.me||0)+10;r=`Biếu ${c.name} 20 lượng: người ấy quý ngươi +10.`}
 if(a==="hoi"){if(!can(2))return;spend(2);c.af.me=(c.af.me||0)+1;if(k==="tq"&&roll(40+(c.af.me||0)/2)){discover();r=`${c.name} hé lộ một sở thích của Hoàng thượng.`}else if(k==="ksp")r="Sổ thị tẩm: "+kitNameList(liveRivals(true),x=>`${x.name} ${x.nights}`)+`; ngươi ${S.nights}.`;else r=`${c.name} chỉ cười, không nói gì.`}
 if(r)log(r);render()}
function tqAf(p){return S.court&&S.court.tq?(S.court.tq.af[key(p)]||0):0}
function npcCourt(v){if(roll(10)&&v.bac>=40&&S.court){ap(v,{bac:-20});S.court.tq.af[v.id]=(S.court.tq.af[v.id]||0)+10}}
function staffHTML(){const row=(s,btns)=>`<div class="srow2">${mdH(pServ(s),"sm")}<div class="sinfo"><b>${s.name}</b><span>${srkName(s)} · ${strShow(s)}${s.lover&&(S.knowDT||[]).includes(s.sid)?" · <span class=\"r\">đối thực</span>":""}${s.spyFor==="me"?" · <span class=\"g\">tai mắt của ngươi</span>":""}</span></div><div class="rbtn">${btns}</div></div>`;
 const [cm,ce]=capOf(S),[nm,ne]=hhHas(S);
 let h=`<div class="ph"><span>Kẻ hầu: ${nm}/${cm} cung nữ · ${ne}/${ce} thái giám</span></div>`;
 h+=`<div class="srow2">${mdH(pMaid(),"sm")}<div class="sinfo"><b>${S.maid.name}</b><span>cung nữ thân tín · lòng ${S.maid.loyal}</span></div></div>`;
 h+=S.staff.map(s=>row(s,`<span class="past">lòng ${s.loyal}</span><button data-sv="thuong" data-sid="${s.sid}" ${S.bac<10?"disabled":""}>Thưởng<small>Bạc -10</small></button><button data-sv="phat" data-sid="${s.sid}">Phạt<small>lòng -15</small></button><button data-sv="hoi" data-sid="${s.sid}" ${!can(2)?"disabled":""}>Hỏi chuyện<small>2 khắc</small></button><button data-sv="che" data-sid="${s.sid}">Che chở<small>Danh -2</small></button><button data-sv="doi" data-sid="${s.sid}">Đổi người</button><button data-rec="${s.sid}" ${S.bac<30?"disabled":""}>Tiến cử<small>Bạc -30 · Danh -2</small></button>`)).join("")+(S.staff.some(s=>s.role==="maid"&&srk(s)>=3)?`<div class="rbtn"><button data-smaid="1" ${!can(2)?"disabled":""}>Chưởng sự tra xét cung nữ<small>2 khắc · tìm tai mắt, đối thực</small></button></div>`:"");
 h+=`<div class="rbtn" style="margin:4px 0"><button data-hire="maid" ${nm>=cm||S.bac<20?"disabled":""}>Nội vụ phủ: thêm cung nữ<small>Bạc -20</small></button><button data-hire="eunuch" ${ne>=ce||S.bac<20?"disabled":""}>Thêm thái giám<small>Bạc -20</small></button><button data-plantsv="1" ${!can(2)||S.bac<40||!bestSent(S)?"disabled":""}>Cài người vào cung khác<small>Bạc -40 · 2 khắc</small></button></div>`;
 h+=`<h3>Người trong cung</h3>`+Object.entries(S.court).map(([k,c])=>`<div class="srow2">${mdH(k==="ty"?pDoc():{src:`img/face-eunuch-${["tq","ksp","ped"].indexOf(k)%4+1}.webp`,ini:"Hoạn",col:"#8a8aa0"},"sm")}<div class="sinfo"><b>${c.name}</b><span>${c.n} · quý ngươi ${c.af.me||0}</span></div><div class="rbtn"><button data-cv="thuong" data-ck="${k}" ${S.bac<20?"disabled":""}>Biếu<small>Bạc -20</small></button><button data-cv="hoi" data-ck="${k}" ${!can(2)?"disabled":""}>Hỏi chuyện<small>2 khắc</small></button></div></div>`).join("");
 h+=`<h3>Kẻ hầu cung khác</h3>`+liveRivals(true).map(v=>`<div class="past" style="margin-top:4px"><b>${v.name}</b></div>`+(v.staff||[]).map(s=>row(s,s.spyFor==="me"?"":`<button data-sv="mua" data-sid="${s.sid}" ${!can(2)||S.bac<30?"disabled":""}>Mua chuộc<small>Bạc -30 · ${word(odA(S,35+nq(s,"greed",BAL.net.k.bribeGreed)-s.loyal/3+S.tamco/5))}</small></button>${s.lover&&(S.knowDT||[]).includes(s.sid)?`<button data-sv="doa" data-sid="${s.sid}" ${!can(2)?"disabled":""}>Dọa tố đối thực<small>2 khắc</small></button>`:""}`)).join("")).join("");
 return h}
PEND.plantsv=()=>({t:"<p>Cài người hầu của ngươi vào cung ai?</p>",o:liveRivals(true).filter(v=>!sameHouse(S,v)).map(v=>({kgt:v,n:v.name,fx:{},x:"Bạc -40",go:()=>{spend(2);log(plantServ(S,v))}})).concat([{n:"Thôi",fx:{}}])});

/* ================= FACTIONS ================= */
const CLANS=["Tể tướng","Đại tướng quân","Lễ bộ","Hộ bộ","Hàn lâm"];
function clanOf(p){if(p===S)return {tt:"Tể tướng",dtq:"Đại tướng quân",ch:"Thái hậu",thd:"Hàn lâm"}[S.origin.k]||"";if(!p.clan)p.clan=pick(CLANS);return p.clan}
function facOf(p){return (S.facs||[]).find(f=>f.m.includes(key(p)))||null}
function facMembers(f){return f.m.map(byKey).filter(p=>p&&(p===S||(p.alive&&!p.out)))}
function facLeader(f){return facMembers(f).sort((a,b)=>rkOf(b)-rkOf(a))[0]||null}
function facStr(f){return Math.round(facMembers(f).reduce((s,p)=>s+rkOf(p)*10+p.danh/2+(p.dad||40)/2,0))}
function facName(lead){if(lead===S)return `phe ${S.name.split(" ")[0]} gia`;if(lead.queen)return "phe Càn Ninh";return `phe ${lead.name.split(" ")[0]} gia`}
function facN(a){const f=facOf(a);return f?facMembers(f).length:1}
function found(a,b){if(facOf(a)||facOf(b))return"";S.facs=S.facs||[];const f={id:Date.now()%1e7+R(999),m:[key(a),key(b)],name:""};S.facs.push(f);f.name=facName(facLeader(f));relAdd(a,b,5);return `${NMc(a)} và ${NM(b)} kết thành ${f.name}. `}
function joinFac(p,f){if(facOf(p)||!f)return"";f.m.push(key(p));return `${NMc(p)} gia nhập ${f.name}. `}
function leaveFac(p){const f=facOf(p);if(!f)return"";f.m=f.m.filter(k=>k!==key(p));facMembers(f).forEach(x=>relAdd(p,x,-10));if(facMembers(f).length<2)S.facs=S.facs.filter(x=>x!==f);return `${NMc(p)} rời ${f.name}. `}
function inviteOdds(a,t){const f=facOf(a);return odA(a,30+aff(t,a)/2+(f?facStr(f)/10:0)+(clanOf(a)===clanOf(t)?15:0))}
function facInvite(a,t){const f=facOf(a);if(!f||facOf(t))return"";if(roll(inviteOdds(a,t)))return joinFac(t,f);relAdd(a,t,-3);return `${NMc(t)} khéo từ chối lời mời của ${NM(a)}. `}
function askJoin(a,f){const l=facLeader(f);if(!l||facOf(a))return"";if(roll(odA(a,30+aff(l,a)/2+(clanOf(a)===clanOf(l)?15:0)+rkOf(a)*3)))return joinFac(a,f);return `${l===S?"Ngươi":l.name} chưa nhận ${NM(a)} vào phe. `}
function sellOut(a){const f=facOf(a);if(!f)return"";const M=facMembers(f).filter(x=>x!==a);const q=queenP()&&queenP()!==a?queenP():null;leaveFac(a);
 for(const m of M){oanAdd(m,a,40);if(q)evA(q,m,2);else if(roll(40))punish(m,"bị đồng đảng tố giác",1)}ap(a,{danh:5,sung:3});if(roll(40))bestow(a,"accuse");return `${NMc(a)} bán đứng ${f.name}, đem chuyện của ${M.map(NM).join(", ")} dâng lên ${q?(q===S?"ngươi":"Hoàng hậu"):"Hoàng thượng"}. `}
function divide(a,f){const M=facMembers(f).filter(x=>x!==a);if(M.length<2)return"";const [x,y]=shuf(M.slice()).slice(0,2);if(roll(odA(a,40+a.tamco/3))){oanAdd(x,y,25);oanAdd(y,x,25);affAdd(x,y,-15);affAdd(y,x,-15);let r=`${NMc(a)} ly gián ${x===S?"ngươi":x.name} và ${y===S?"ngươi":y.name}. `;if(roll(50))r+=leaveFac(rkOf(x)<rkOf(y)?x:y);return r}evA(x,a,1);return `Mưu ly gián của ${NM(a)} bị ${NM(x)} nhìn thấu. `}
function jointScheme(f,t){const M=facMembers(f),l=facLeader(f);const o=odA(l,oFrame(l)+5*(M.length-1));
 if(roll(o)){fall(t,`bị ${f.name} hợp mưu tố tội`);M.forEach(m=>ap(m,{tamco:1}));return `${f.name} hợp mưu hạ ${NM(t)}: thành. `}
 M.forEach(m=>punish(m,`hợp mưu vu cáo ${NM(t)}`,2));return `<span class="r">${f.name} hợp mưu hạ ${NM(t)} bị lộ, cả phe bị phạt.</span> `}
function facMonth(){let ev="";S.facs=(S.facs||[]).filter(f=>facMembers(f).length>=2);
 for(const p of consorts())if(p.dad==null)p.dad=30+R(40);for(const p of consorts())if(roll(15))p.dad=cl(p.dad+(R(2)?8:-8),0,100);
 for(const f of S.facs){const M=facMembers(f);const l=facLeader(f);f.name=facName(l);
  /* members share evidence and news */
  const T=[S].concat(rivals);for(const t of T){if(M.includes(t))continue;const mx=Math.max(...M.map(m=>evG(m,t)));if(mx>0)M.forEach(m=>{if(evG(m,t)<mx)evA(m,t,mx-evG(m,t))})}
  /* betrayal, split */
  const b=mindPickBy(M.filter(m=>m!==S&&m!==l&&aff(m,l)<0),m=>-aff(m,l)*mindW(m,"flee"),null);/* npc-mind: was FIRST */if(b&&roll(4))ev+=seenNPC(b,b,sellOut(b))||"";
  const top=M.filter(m=>m!==S).sort((a,c)=>c.sung-a.sung);if(top.length>=2&&top[0].ghen>60&&top[1].ghen>60&&roll(5))ev+=S.mat>=2?leaveFac(top[1]):(leaveFac(top[1]),"");
  if(l!==S&&roll(6)){const E0=consorts().filter(x=>!M.includes(x)&&M.reduce((s,m)=>s+oan(m,x),0)/M.length>=25).filter(x=>!sameHouse(l,x));const e=mindPickBy(E0,x=>M.reduce((s,m)=>s+oan(m,x),0),l);if(e)/* npc-mind: was FIRST */ev+=seenNPC(l,e,jointScheme(f,e))}}
 /* NPCs found, join, invite, divide */
 for(const v of liveRivals(true)){if(facOf(v))continue;
  const fr=others(v).filter(x=>(x===S||x.alive)&&!sameHouse(v,x)&&(aff(v,x)>=35||clanOf(v)===clanOf(x)&&aff(v,x)>=15||consorts().some(e=>e!==v&&e!==x&&oan(v,e)>=30&&oan(x,e)>=30)));
  const x=mindPickBy(fr.filter(y=>y!==S),y=>BAL.mind.pick.j10fr.base+Math.max(0,aff(v,y)),v);/* npc-mind: was FIRST */if(x&&roll(25)){const g=facOf(x);ev+=g?(roll(odA(v,30+aff(x,v)/2))?(S.mat>=2||facOf(S)===g?joinFac(v,g):(joinFac(v,g),"")):""):(S.mat>=2?found(v,x):(found(v,x),""))}}
 const mine=facOf(S);for(const f of S.facs){if(f===mine)continue;const l=facLeader(f);if(l&&l!==S&&!facOf(S)&&aff(l,S)>=35&&roll(10))Q.push({t:"Lời mời vào phe",who:pv(l),h:`<p>${l.name} mời ngươi vào ${f.name}. Vào thì cùng chia tin tức, chứng cứ, che chở nhau.</p><p class="past">Mở mục Giao tình › Phe phái để xin vào.</p>`})}
 if(mine&&roll(5)){const o=S.facs.find(f=>f!==mine);const l=o&&facLeader(o);if(l&&l!==S){const r=divide(l,mine);if(r)ev+=r}}
 return ev}
function facHTML(){const mine=facOf(S),F=S.facs||[];let h=`<div class="ph"><span>${mine?`Ngươi thuộc <b>${mine.name}</b>`:"Ngươi chưa vào phe nào"}</span><span>Họ: ${clanOf(S)||"không"}</span></div>`;
 if(!mine){const cands=liveRivals(true).filter(v=>!facOf(v)&&aff(v,S)>=30&&!sameHouse(S,v));h+=`<div class="rbtn" style="margin-bottom:6px">${cands.slice(0,4).map(v=>`<button data-fa="lap" data-fv="${v.id}" ${!can(2)?"disabled":""}>${mdH(pv(v),"xs")}Lập phe cùng ${v.name}<small>2 khắc</small></button>`).join("")||`<span class="past">Cần một phi tần quý ngươi từ 30 để lập phe.</span>`}</div>`}
 else{const out=liveRivals(true).filter(v=>!facOf(v)&&!sameHouse(S,v));h+=`<div class="rbtn" style="margin-bottom:6px">${out.slice(0,4).map(v=>`<button data-fa="moi" data-fv="${v.id}" ${!can(2)?"disabled":""}>${mdH(pv(v),"xs")}Mời ${v.name}<small>${word(inviteOdds(S,v))}</small></button>`).join("")}<button data-fa="roi">Rời phe<small>đồng đảng giận</small></button><button data-fa="ban" ${!can(2)?"disabled":""}>Bán đứng<small>Danh +5 · cả phe oán +40</small></button></div>`}
 h+=F.map(f=>{const M=facMembers(f),l=facLeader(f),st=Math.round(M.filter(m=>m!==S).reduce((s,m)=>s+aff(m,S),0)/Math.max(1,M.filter(m=>m!==S).length));const me=f===mine;
  return `<div class="rival"><div class="top" style="align-items:center;justify-content:flex-start"><b>${f.name}</b><em>đứng đầu: ${mdH(l===S?pMe():pv(l),"xs")}${l===S?"ngươi":l.name} · thế lực ${facStr(f)}</em></div><div class="chips">${M.map(m=>chip(`${mdH(m===S?pMe():pv(m),"xs")}${m===S?"Ngươi":m.name}`)).join("")}${me?"":chip(`Với ngươi: ${st>=20?"thân":st<=-20?"thù":"bình thường"} (${st})`,st<=-20?"hot":st>=20?"ok":"")}</div>${me?(l===S?`<div class="rbtn">${consorts().filter(x=>x!==S&&!M.includes(x)&&!sameHouse(S,x)).slice(0,3).map(x=>`<button data-fa="hop" data-fv="${x.id}" ${!can(2)?"disabled":""}>${mdH(pv(x),"xs")}Hợp mưu hạ ${x.name}<small>${word(odA(S,oFrame(S)+5*(M.length-1)))} · lộ: cả phe bị phạt</small></button>`).join("")}</div>`:""):`<div class="rbtn">${mine?"":`<button data-fa="xin" data-ff="${f.id}" ${!can(2)?"disabled":""}>Xin vào phe<small>2 khắc</small></button>`}<button data-fa="ly" data-ff="${f.id}" ${!can(2)||M.length<2?"disabled":""}>Ly gián<small>${word(odA(S,40+S.tamco/3))} · 2 khắc</small></button></div>`}</div>`}).join("")||`<p class="past">Hậu cung chưa có phe phái nào.</p>`;
 return h}
function facAct(a,d){if(S.dead||Q.length)return;let r="";const v=d.fv?RV(+d.fv):null,f=d.ff?(S.facs||[]).find(x=>x.id===+d.ff):null;
 if(a==="roi"){r=leaveFac(S)}
 else{if(!can(2))return;spend(2);
  if(a==="lap"&&v)r=found(S,v);else if(a==="moi"&&v)r=facInvite(S,v);else if(a==="xin"&&f)r=askJoin(S,f);else if(a==="ban")r=sellOut(S);else if(a==="ly"&&f)r=divide(S,f);else if(a==="hop"&&v&&facOf(S))r=jointScheme(facOf(S),v);else spend(-2)}
 if(r)log(r);render()}
