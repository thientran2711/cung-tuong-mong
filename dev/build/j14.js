/* ================= LÃNH CUNG: a playable state for every consort ================= */
function cold(why){if(S.dead)return;if(S.out)return;S.out=1;S.coldWhy=why;S.coldRank=S.rank;S.coldTurn=S.turn;S.rank=0;S.confined=0;S.preg=S.fake?0:S.preg;S.fake=0;
 /* the cold palace keeps only what the one household table allows (BAL.promo.cap row 0 via capOf; review/staff-cap-fix): the most trusted stay, the others are named here */
 const cc=capOf(S),kp=[];for(const [role,n] of [["maid",cc[0]-1],["eunuch",cc[1]]])kp.push(...(S.staff||[]).filter(s=>s.role===role&&s.loyal>=BAL.loy.trust).sort((a,b)=>b.loyal-a.loyal).slice(0,Math.max(0,n)));
 const keep=kp.concat((S.staff||[]).filter(s=>s.coop&&!kp.includes(s))),left=(S.staff||[]).filter(s=>!keep.includes(s));S.staff=keep;
 log(`<span class="r">${why}. Ngươi bị đưa vào lãnh cung.</span>`);Q.push({t:"Lãnh cung",cls:"end",who:pMe(),h:`<p>${why}.</p><p>Cửa lãnh cung đóng lại sau lưng. Bổng lộc chỉ còn chút gạo mốc, kẻ hầu bỏ đi gần hết${left.length?`: Nội vụ phủ điều ${left.map(s=>s.name).join(", ")} sang nơi khác`:""}${keep.length?`; chỉ ${keep.map(s=>s.name).join(", ")} ở lại`:""}.</p><p class="past">Chưa hết đường: minh oan, cầu xin, nhờ người bên ngoài, hay chờ ân xá.</p>`,btn:"Bước vào"});coldVisit();deal()}
function coldVisit(){S.place="lc";const f=rivals.filter(v=>v.alive&&v.out);S.visit={k:"lc",people:lcPeople("Phế phi · cùng cảnh ngộ"),talked:false,tk:{},msg:"Gió lùa qua song cửa mục. Ở đây chỉ có những người bị quên lãng."}}
function restore(full,why){S.out=0;S.rank=full&&S.coldRank>=7&&seatHas(S,7)?7:seatDown(S,full?S.coldRank:S.coldRank-1);S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.lastPromo=S.turn;fillStaff(S,true);
 log(`<b class="g">${why}. Ngươi được rời lãnh cung, phục vị ${RANKS[S.rank].n}.</b>`);Q.push({t:"Rời lãnh cung",cls:"end",who:pMe(),h:`<p>${why}.</p><p>Ngươi được phục vị <b>${RANKS[S.rank].n}</b>.</p>`,btn:"Tạ ơn"});deal();if(typeof feedback==="function")feedback("decree")}
/* ONE list for her lãnh cung cards and an NPC in the cold palace (AG-ALL-2e, jagacts3 p3Cold): p = the one inside; free / end = what "được tha" / Xuất gia do for her or an NPC */
function coldActs(){return coldActsOf(S)}
function coldActsOf(p){const me=p===S,A=[],X=BAL.ag.par3.cold,odP=b=>odA(p,b),fr=others(p).filter(v=>v&&v!==p&&facIn(v)/* cold-faction: the one presence rule */&&aff(v,p)>=netTh(v,"than")),f=facOf(p),
 son=(me?mySons():sonsOf(p)).find(k=>k.age>=X.sonAge),free=(full,why)=>me?restore(full,why):p3Free(p,why),fb=me?S.framedBy:p.coldBy;
 A.push({n:"Cầu xin",t:"Đút bạc cho lính gác, gửi thư lên Dưỡng Hòa điện.",c:{bac:-X.beg.bac},o:odP(BAL.odb.j14.odO+(p.an||0)/X.beg.anD+(p.sung||0)/X.beg.sungD),k:2,w:{},l:{},x:"được tha",go:()=>free(false,"Hoàng thượng đọc thư, động lòng")});
 if(fr.length||f||(p.dad||0)>=X.out.dad)A.push({n:"Nhờ người bên ngoài",t:fr.length?`Nhờ ${fr[0].name} nói giúp.`:f?`Nhờ ${f.name} vận động.`:"Nhờ cha ở triều đình dâng sớ.",c:{bac:-X.out.bac},o:odP(BAL.odb.j14.odO_2+(fr.length?aff(fr[0],p)/X.out.affD:0)+(f?facStr(f)/X.out.facD:0)+(p.dad||0)/X.out.dadD),k:2,w:{},l:{},x:"được tha",go:()=>free(false,"Có người bên ngoài nói giúp")});
 if(fb!=null){const b=byKey(fb);const ce=me?S.coldEv||0:p.coldEv||0;A.push({n:"Tìm chứng cứ minh oan",t:`Tra lại vụ án. Chứng cứ: ${ce}/${BAL.coldEvNeed}.`,c:twCost("cold"),o:odP(BAL.odb.j14.odO_3+eyes(p)*X.ev.mat+(p.tamco||0)/X.ev.tcD),k:2,w:{},l:{},x:`${evSg(BAL.ag.ev.one)}; đủ ${BAL.coldEvNeed} thì phục vị trọn vẹn`,go:()=>{const n=ce+BAL.ag.ev.one;if(me)S.coldEv=n;else p.coldEv=n;if(n>=BAL.coldEvNeed){free(true,"Án được lật, ngươi được minh oan");if(b&&b!==p&&(b===S||b.alive))fall(b,"bị lật tẩy vu oan người khác")}}})}
 if((p.an||0)>=X.poem.an)A.push({n:"Gửi bài thơ cũ",t:"Chép lại bài thơ đêm nào ngài khen, nhờ người lén dâng.",c:{},o:odP(BAL.odb.j14.odO_4+(p.an||0)/X.poem.anD+((p.arts&&p.arts.thi)||0)*X.poem.thi),k:2,w:{},l:{},x:"ngài nhớ chuyện cũ",go:()=>free(false,"Hoàng thượng đọc bài thơ cũ, nhớ chuyện xưa")});
 if(son)A.push({n:`Nhờ ${son.name} cầu xin`,t:"Con quỳ trước Dưỡng Hòa điện xin cho mẹ.",c:{},o:odP(BAL.odb.j14.odO_5+(son.fond||0)/X.son.fondD),k:1,w:{},l:{},x:"được tha",go:()=>free(false,`${son.name} quỳ khóc xin cho mẹ`)});
 A.push({n:"Chép kinh, giữ đức",t:"Ngày ngày chép kinh Kim Cương.",c:{...X.sutra.c},o:100,k:2,w:{...X.sutra.w}},{n:"Trồng rau",t:"Cuốc đất sau sân, trồng rau mà ăn.",c:{},o:100,k:2,w:{...X.veg.w}},{n:"Thêu khăn bán",t:"Nhờ lính gác đem ra ngoài bán.",c:{...X.embro.c},o:odP(BAL.odb.j14.odO_6),k:2,w:{...X.embro.w},l:{}},
  ...coldFacActs(p),
  {n:"Xuất gia",t:"Cắt tóc đi tu, rời bỏ hồng trần.",c:{},o:100,fix:1,k:4,w:{},x:"kết thúc kiếp này, yên ổn",go:()=>me?over("Xuất gia",`${S.name} cạo tóc, vào chùa Bảo Hoa tu hành, sống nốt quãng đời thanh tịnh.`,"Xuất gia"):p3Nun(p)/* owner 24/11 ~07:25Z: her own choice to leave = done, no confirm card */});
 return A}
/* cold-faction (law 1 + 6): faction business from lãnh cung goes by LETTER only — the same cards for her and for an NPC inside (p3Cold).
   Two roads of equal worth (law 2): the food eunuch (Bạc BAL.ag.par3.cold.lt.bac, sure-ish) or her own kept maid (no bạc, odds by the maid's loyalty;
   caught → that maid's loyalty − lt.maidLoy). Deeds: Rời phe · Tố phe (j10 sellOut: members in lãnh cung are named too) · Xin vào phe (the leader answers: jrcv facJoin). */
function coldFacActs(p){const me=p===S,L=BAL.ag.par3.cold.lt,F=BAL.ag.par3.fac,odP=b=>odA(p,b),f=facOf(p),A=[],say=r=>{if(me&&r)log(r);return r||""};
 let mds=[];try{mds=(me?(S.staff||[]).concat(S.maid&&!(S.staff||[]).includes(S.maid)?[S.maid]:[]):(p.staff||[])).filter(m=>m&&m.role!=="eunuch"&&(m===S.maid||m.role==="maid")).filter(m=>m&&m.alive!==false&&!m.coop&&(m.loyal||0)>=BAL.loy.trust).sort((a,b)=>(b.loyal||0)-(a.loyal||0))}catch(e){}
 const m=mds[0],R=[{w:"thái giám đưa cơm",c:{bac:-L.bac},o:odP(L.euO)}];
 if(m)R.push({w:m.name,c:{},o:odP(L.maidO+(m.loyal||0)/L.loyD),fail:()=>{m.loyal=cl((m.loyal||0)-L.maidLoy,0,100);return say(`${m.name} bị lính gác bắt được thư, bị tra hỏi một trận. Thiện cảm ${balSg(-L.maidLoy)}.`)},fx:` · bị bắt: ${m.name} thiện cảm ${balSg(-L.maidLoy)}`});
 const card=(n,t,x,ag,go)=>R.map(r=>({n:`${n} (nhờ ${r.w})`,t,c:{...r.c},o:r.o,k:2,w:{},l:{},ag,x:x+(r.fx||""),go:()=>say(go()),fail:r.fail}));
 if(f){A.push(...card(`Gửi thư xin rời ${f.name}`,"Viết thư báo với phe rằng ngươi không muốn liên lụy ai nữa.",`rời phe, không dính bè phái: Danh ${balSg(BAL.rcv.prop.danh)} · đồng đảng quý ${me?"ngươi":p.name} ${balSg(-F.leave.rel)}`,F.gLeave,
   ()=>leaveFacSelf(p)));
  if(facRoll(f).some(x=>x!==p)){const q=queenP()&&queenP()!==p?queenP():null;
   A.push(...card(`Gửi thư tố ${f.name}`,`Kể hết chuyện của phe trong thư, nhờ người dâng lên ${q?(q===S?"ngươi":"Hoàng hậu"):"Hoàng thượng"}.`,`Danh ${balSg(F.sell.danh)}, ${sgOf(p,F.sell.sung)} · cả phe oán ${balSg(F.sell.oan)}`,F.gSell,()=>sellOut(p)))}}
 else{const G=(S.facs||[]).map(g=>({g,l:facLeader(g)})).filter(o=>o.l&&o.l!==p&&facIn(o.l)&&aff(o.l,p)>=netTh(o.l,"quen")).sort((a,b)=>aff(b.l,p)-aff(a.l,p));const o=G[0];
  if(o)A.push(...card(`Gửi thư xin vào ${o.g.name}`,`Xin ${o.l===S?"ngươi":o.l.name} cho đứng cùng phe, để có người bên ngoài nói giúp.`,`${o.l===S?"ngươi":o.l.name} tự quyết (${rcvWord(o.l,p)}) · vào phe thì nhờ phe vận động được`,F.gJoin,()=>rcvAsk("facJoin",p,o.l,o.g.id)))}
 return A}
function coldMonth(){let ev="";
 if(S.out){apply({bac:2});const w=SEASON[S.month-1]==="Đông";apply({suc:w?-12:-6});if(w&&roll(8)){apply({suc:BAL.eff.j14.sucColdMonth});ev+=`<span class="r">Đêm đông giá buốt, lãnh cung không than sưởi.</span> Sức ${balSg(BAL.eff.j14.sucColdMonth)}. `}
  if(illOf(S)&&S.ill.k==="tambenh"&&S.ill.st>=3&&roll(30)){over("Lãnh cung","Ngươi u uất thành điên dại, sống nốt quãng đời trong lãnh cung.","Phát điên trong lãnh cung",true);return ev}
  if(!S.thDead&&S.th>=50&&!(window.agDOn&&agDOn())&&roll(10)){restore(false,"Thái hậu mở lòng từ bi");return ev}
  if((S.month===1||S.month===8)&&roll(25)){restore(false,S.month===1?"Đại xá đầu năm":"Đại xá nhân tiết Vạn thọ");return ev}
  if(S.suc<=0){die("Chết rét, chết đói trong lãnh cung");return ev}}
 for(const v of rivals){if(!v.alive||!v.out)continue;ap(v,{suc:-4});if(v.suc<=0){v.alive=false;continue}
  if(typeof p3On==="function"&&p3On()){ev+=p3Cold(v);continue}/* AG-ALL-2e: she chooses among her own lãnh cung cards (coldActsOf), not a flat roll */
  if((roll(3)||(v.th>=50&&roll(5)))&&roomFor("consort")&&twCanPay(v,"cold")&&(twPay(v,"cold"),roll(odA(v,35+eyes(v)*6+(v.tamco||0)/5)))){/* two-way law: her release petition costs Sức (BAL.tw.cold) and rolls her odds; the NPC pays and rolls the same */v.out=false;v.rank=0;v.lastPromo=S.turn;v.oan=cl((v.oan||0)+20,0,100);ev+=`${v.name} được tha khỏi lãnh cung, phục vị ${RANKS[0].n}. `;if(v.coldBy!=null){const b=byKey(v.coldBy);if(b)oanAdd(v,b,BAL.eff.j14.coldMonth)}}}
 return ev}

/* ================= SERVANT RANKS ================= */
const SRK={maid:["Cung nữ thô sử","Cung nữ tam đẳng","Cung nữ nhị đẳng","Cung nữ nhất đẳng","Chưởng sự cô cô","Nữ quan"],/* maid-ladder-6 (owner OD 19/11 ~01:26Z): six rungs, nhất đẳng = Đại cung nữ; named rungs BAL.srvRk */eunuch:["Tiểu thái giám","Thái giám","Thủ lĩnh thái giám","Tổng quản thái giám"]};
function srk(s){return s.rk==null?(s.rk=1):s.rk}
function srkName(s){return SRK[s.role][srk(s)]}
/* the 5-step standing of a maid rung (art, frame, colour, leaderboard, bow order: BAL.srvRk.tier); eunuch ranks pass through */
function srkTier(r,role){r=r|0;if(role==="eunuch")return r;const T=BAL.srvRk.tier;return T[Math.max(0,Math.min(T.length-1,r))]}
/* maid-ladder-6 OLD SAVE: maid ranks of a 5-rung save move up one from Đại cung nữ (old 0→0, 1→1 tam đẳng, 2→3, 3→4, 4→5); once, flag S.lad6 */
function srvLad6(){if(!S||S.lad6)return 0;const up=r=>typeof r==="number"&&r>=2?r+1:r;let n=0;const seen=new Set();
 const walk=(o,d)=>{if(!o||typeof o!=="object"||seen.has(o)||d>12)return;seen.add(o);if(o!==S&&o.role==="maid"&&typeof o.rk==="number"){const r=up(o.rk);if(r!==o.rk){o.rk=r;n++}}
  for(const k in o){const v=o[k];if(v&&typeof v==="object")walk(v,d+1)}};
 try{if(S.srv){const v=S.srv;["rk","rk0"].forEach(k=>{const r=up(v[k]);if(r!==v[k]){v[k]=r;n++}});if(v.ex&&typeof v.ex.to==="number")v.ex.to=up(v.ex.to)}
  if(S.rk&&typeof S.rk==="object"){if(typeof S.rk.sr==="number")S.rk.sr=up(S.rk.sr);(S.rk.t||[]).forEach(t=>{if(Array.isArray(t)&&t[2]==="s")t[3]=up(t[3])})}
  /* the promo chest tracker (jpromo prSeen.s: rung seen, old ma ma 5 → 6): without it every old maid save got her rung chest again on load (review r1) */
  if(S.prSeen&&typeof S.prSeen.s==="number")S.prSeen.s=up(S.prSeen.s);
  walk(S,0);(typeof rivals!=="undefined"?rivals:[]).forEach(v=>walk(v,1))}catch(e){console.error(e)}
 S.lad6=1;return n}
function srkMax(o,s){const r=rkOf(o);const K=BAL.srvRk;if(s.role==="maid")return r>=7?K.nq:r>=4?K.cs:K.dai;return r>=5?3:r>=3?2:1}
function servMerit(s,n){s.mp=(s.mp||0)+n}
function servRanks(){let ev="";for(const p of consorts()){/* co-op guest: NPC staff merit / rises / sales roll on the host (review/servant-mline-r2) */if(p!==S&&typeof mlGuest==="function"&&mlGuest())continue;const L=p.staff||[];for(const s of L.slice()){const o=p;servMerit(s,1+Math.floor(rkOf(o)/3));
  if((s.mp||0)>=srvMpNeed(srk(s))&&srk(s)<srkMax(o,s)&&(typeof exSrvNpc!=="function"||exSrvNpc(s))){s.rk++;s.mp=0;s.loyal=cl(s.loyal+BAL.eff.j14.loyalServRanks,0,100);if(p===S)ev+=`${s.name} được thăng ${srkName(s)}. `}
  {const t=srkTier(srk(s),s.role);if(t>=2)ap(p,{bac:-Math.floor(t/2)})}
  /* the Emperor's eye: any maid rank, chance by rank / her seeking / the master's favour (jmline mlEye, BAL.mline; was srk>=2 at 1.2 %) */
  if(s.role==="maid"&&(typeof mlEye==="function"?mlEye(p,s):srk(s)>=BAL.mline.offRank&&roll(BAL.mline.offEye))&&roomFor("consort")){if(typeof mlRose==="function")mlRose(p,s);p.staff.splice(p.staff.indexOf(s),1);const n=newRival(0);Object.assign(n,drawFace());n.fromMaidOf=key(p);if(typeof riseCore==="function")riseCore(n,s,p);else relAdd(p,n,s.loyal>=BAL.mline.riseLoy?BAL.mline.riseRel:-BAL.mline.riseRel);rivals.push(n);ev+=`${s.name}, ${srkName(s).toLowerCase()} của ${NM(p)}, lọt mắt xanh Hoàng thượng, được phong ${RANKS[0].n} ${n.name}${s.loyal>=BAL.mline.riseLoy?", vẫn nhớ ơn chủ cũ":", quay lưng với chủ cũ"}. `;continue}
  /* AG-ALL B: the sale dice go while staff are agents (fillStaff = the buyer's "Nội vụ phủ: thêm cung nữ") */if(srkTier(srk(s),s.role)>=2&&!(typeof asSelfOn==="function"&&asSelfOn(p))&&roll(1.5)){const ci=s.role==="maid"?0:1;const big=consorts().find(x=>x!==p&&rkOf(x)>rkOf(p)+1&&(x.bac||0)>=60&&hhHas(x)[ci]<capOf(x)[ci]);if(big){p.staff.splice(p.staff.indexOf(s),1);big.staff.push(s);s.loyal=50;ap(big,{bac:-40});if(p===S||big===S)ev+=`${s.name} bị ${NM(big)} mua về cung mình. `}}}}
 return ev}
/* AG-ALL-2e2: m = the master (default her); an NPC master runs the same (cx3:staffUp) */
function recommend(id,m){m=m||S;const H=BAL.house;const s=servById(id);if(!s||ownerOf(s)!==m||(m.bac||0)<H.upBac)return"";if(m===S)apply({bac:-H.upBac,danh:-H.upDanh});else ap(m,{bac:-H.upBac,danh:-H.upDanh});servMerit(s,BAL.ag.par3.house.merit);
 if(m!==S)return `${m.name} tiến cử ${s.name} lên Nội vụ phủ`;log(`Tiến cử ${s.name} lên Nội vụ phủ.`);render();return""}
function searchMaids(m){m=m||S;const me=m===S;if(me&&!can(2))return"";const head=(m.staff||[]).find(s=>s.role==="maid"&&srk(s)>=BAL.srvRk.cs);if(!head)return"";if(me)spend(2);const spies=m.staff.filter(s=>s.spyFor&&s.spyFor!==key(m));
 if(!me){/* AG-ALL-2e2 cx3:search: the same rule for an NPC master */let r;if(spies.length){const s=spies[0];const b=byKey(s.spyFor);m.staff.splice(m.staff.indexOf(s),1);if(b&&b!==m)evA(m,b,BAL.eff.j14.evSearchMaids);r=`${head.name} tra xét cung nữ của ${m.name}: lôi ra ${s.name} là tai mắt`}
  else{const dt=allServ().find(x=>x.lover&&!(m.knowDT||[]).includes(x.sid)&&ownerOf(x)!==m);if(dt){m.knowDT=(m.knowDT||[]).concat([dt.sid,dt.lover]);r=`${head.name} tra xét cung nữ của ${m.name}, nghe ra một chuyện đối thực`}else r=`${head.name} tra xét cung nữ của ${m.name}, không thấy gì lạ`}return r}
 let r=`${head.name} tra xét cung nữ: `;if(spies.length){const s=spies[0];const m=byKey(s.spyFor);typeof knSoldFound==="function"&&knSoldFound(s);S.staff.splice(S.staff.indexOf(s),1);if(m&&m!==S)/*evok: the spy servant was bought (bribeServ deed)*/evA(S,m,BAL.eff.j14.evSearchMaids);r+=`lôi ra ${s.name} là tai mắt của ${m?NM(m):"kẻ khác"} (chứng cứ ${balSg(BAL.eff.j14.evSearchMaids)}).`}else{const dt=allServ().find(x=>x.lover&&!(S.knowDT||[]).includes(x.sid)&&ownerOf(x)!==S);if(dt){S.knowDT=(S.knowDT||[]).concat([dt.sid,dt.lover]);r+=`nghe ra chuyện đối thực của ${dt.name}.`}else r+="không thấy gì lạ."}log(r);render()}
try{if(!$("title").hidden)wireOpt()}catch(e){}
