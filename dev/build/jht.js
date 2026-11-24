/* ================= jht: HOÀNG TỰ = tab con theo kit chung (owner 11/15 09:10Z + 09:20Z, review/hoang-tu) — KIT §37 =================
   1. Hoàng tự (group ht) sub-tabs: Con của ngươi (kid) | Kế vị (kvo) | Hoàng tự trong cung (kin) | Hôn sự (hon) | Quý tộc kén rể · kén dâu (qt).
      Every sub-tab = the kit people strip (pager) + one person card (pcard); no long text tables; an empty sub-tab shows one kit card
      (kitArtFrame picture + title + a few lines) saying how it fills.
   2. Hôn sự for PRINCES too (owner 09:20Z), the mirror of j54 for every mother: quý nữ of the great houses (S.qPool), a son from 16 may be
      promised (xin chỉ ban hôn: odds, cost, gains, losses), wedding at 18; the bride's house backs mother + son ("Nhà vợ chống lưng":
      p.hon like the princesses' in-laws → faction strength and seat contests, and k.pW.b → succession weight kvW). A rival mother with a
      son of age who wants the same girl makes it harder and bears a grudge. The Emperor or Thái hậu decrees a match when nobody asks.
   3. Knowledge (owner rule "Người lạ"): công tử and quý nữ are strangers until known (seen in a marriage talk, met by a daughter, promised,
      married, or asked about: "Dò hỏi gia thế"). A stranger shows the grey silhouette, "Người lạ", house, faction, age; Sắc / Tài "chưa rõ".
   4. Faces: công tử = img/FIGURES-congtu.json (ct01–ct10, a18 + a26, gpt-2-6, own manifest so the men pool never uses them);
      quý nữ = khuê các dress img/FIGURES-kc.json (tier kc), a face nobody else has in this game (figUsed), else a free consort face. */
(function(){
const T=s=>String(s==null?"":s).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
const gl=(k,l)=>typeof kitGloss==="function"?kitGloss(k,l):l;
const HT={dow:[30,20,12],back:[14,9,5],heirB:4,clanRel:8,envy:-6,rivalO:10,fail:{sung:-3},cd:3,trac:3,tracB:3};
/* ---------- faces: công tử (own manifest) and quý nữ (khuê các) ---------- */
let CTIX={},KCIX={};
function ld(u,cb){try{fetch(u,{cache:"no-cache"}).then(r=>r.ok?r.json():[]).catch(()=>[]).then(j=>{try{const L=typeof figList==="function"?figList(j):(j||[]);/* a failed / empty refetch never wipes the last good list (law 11: every timed figure loader) */if(!L.length)return;cb(L);if(S&&!S.dead&&typeof tab!=="undefined"&&HTK.includes(tab))render()}catch(e){}})}catch(e){}}
function htLoad(){ld("img/FIGURES-congtu.json",L=>{const ix={};L.forEach(f=>{if(f.identity)(ix[f.identity]=ix[f.identity]||[]).push(f)});CTIX=ix});
 ld("img/FIGURES-kc.json",L=>{const ix={};L.filter(f=>String(f.tier)==="kc").forEach(f=>{const k=`${f.role}:${f.identity}`;(ix[k]=ix[k]||[]).push(f)});KCIX=ix})}
htLoad();setInterval(htLoad,300000);
const SIL=g=>({src:`img/kit/unknown-${g}.webp`,ini:"?",col:"#8a8a8a",rk:"",rw:"Người lạ",hue:0,__kr:{role:"unknown",rank:null,sex:g,kid:false,origin:null}});
function ctUsed(){S.ctUsed=Array.isArray(S.ctUsed)?S.ctUsed:[];return S.ctUsed}
function ctFace(s){const ids=Object.keys(CTIX);if(!s.cf&&ids.length){const live=new Set(h54Pool().filter(x=>x!==s&&x.cf).map(x=>x.cf));const U=ctUsed();
  let fr=ids.filter(x=>!live.has(x)&&!U.includes(x));if(!fr.length)fr=ids.filter(x=>!live.has(x));if(fr.length){s.cf=pick(fr);if(!U.includes(s.cf))U.push(s.cf)}}
 const L=s.cf&&CTIX[s.cf];if(!L)return null;const f=figBest(L,null,s.age||20);return f?figPath(f.por||f.file):null}
const h0=h54Face;
window.h54Face=h54Face=function(s){if(s&&!htKn(s))return Object.assign(SIL("m"),{rw:"Người lạ"});let src=null;try{src=ctFace(s)}catch(e){}
 /* never a face of the men pool (those are real guards / physicians: j61 would mask the name as theirs) */
 return{rk:"off",rw:"Công tử",src:src||"",hue:0,ini:String(s.name).split(" ").pop()[0],col:"#6a8aa0"}};
function qnFid(q){if(q.fk)return q.fk;const U=figUsed();const used=new Set(U);(rivals||[]).forEach(v=>v.fid&&used.add(v.fid));if(S.fid)used.add(S.fid);
 let fr=Object.keys(KCIX).filter(k=>!used.has(k));
 if(!fr.length&&typeof FIGIX!=="undefined"&&FIGIX.consort)fr=Object.keys(FIGIX.consort).filter(k=>!used.has(k)).map(k=>"x:"+k);
 if(!fr.length)return null;q.fk=pick(fr);U.push(q.fk.replace(/^x:/,""));return q.fk}
function qnFace(q){if(q&&!htKn(q))return Object.assign(SIL("f"),{rw:"Người lạ"});let src="";
 try{const k=qnFid(q);if(k&&k.startsWith("x:")){const L=FIGIX.consort[k.slice(2)];const f=L&&figBest(L,0,q.age||BAL.ageMin);if(f)src=figPath(f.por||f.file)}else if(k&&KCIX[k]){const f=figBest(KCIX[k],null,q.age||BAL.ageMin);if(f)src=figPath(f.por||f.file)}}catch(e){}
 return{rk:"",rw:"Quý nữ",src,hue:0,ini:String(q.name).split(" ").pop()[0],col:"#b0607a"}}
window.qnFace=qnFace;
/* knowledge: kn = 1 known (name, face, Sắc, Tài). Promised / married ones are public. */
function htKn(x){return !!(x&&(x.kn||x.taken))}
function htKnow(x){if(x&&!x.kn){x.kn=1;return true}return false}
/* ---------- quý nữ pool (mirror of j54 h54Pool) ---------- */
function qnPool(){S.qPool=S.qPool||[];return S.qPool}
function qnById(id){return qnPool().find(q=>q.id===id)||null}
function qnQ(q){return (3-q.tier)*20+q.sac/5+q.tai/5}
/* names never share a "given name" / "surname + last word" with anyone in the game (j61 masks a stranger's name everywhere it appears) */
const QNG=NM_F;/* one name core: jname.js */
const CTG=NM_M;
function nVars(n){const w=String(n||"").split(" ").filter(Boolean);const V=[n];if(w.length>=3){V.push(w.slice(-2).join(" "));V.push(w[0]+" "+w[w.length-1])}return V}
function nUsed(skip){const S0=new Set();const all=[];try{all.push(...namesInUse())}catch(e){}(S.men||[]).forEach(m=>all.push(m.name));(S.staff||[]).forEach(x=>all.push(x.name));(rivals||[]).forEach(v=>all.push(v.name));
 h54Pool().forEach(x=>x!==skip&&all.push(x.name));qnPool().forEach(x=>x!==skip&&all.push(x.name));all.filter(Boolean).forEach(n=>nVars(n).forEach(v=>S0.add(v)));return S0}
function nPick(G){return nmNew(G===CTG?"m":"f")}/* one name core (jname.js): unique across the save */
function qnNew(){const P=qnPool();
 const house=pick(CLANS);const head=P.some(q=>!q.taken&&q.house===house&&q.tier===0);const tier=R(100)<20&&!head?0:R(100)<45?1:2;
 const name=nPick(QNG);
 S.qId=(S.qId||0)+1;const q={id:S.qId,name,house,tier,off:H54OFF[house][tier],age:15+R(5),sac:40+R(56),tai:30+R(66),taken:null};P.push(q);return q}
/* a name that clashes was always shown masked ("Thị vệ ???"), so renaming it loses nothing the player could read; once per person */
function nFix(){try{const W=[];allKids().forEach(([k])=>{if(k.hW&&k.hW.s&&k.hW.kind!=="hoa")W.push([k.hW.s,CTG]);if(k.pW){W.push([k.pW.chinh,QNG]);(k.pW.trac||[]).forEach(t=>W.push([t,QNG]))}});
 for(const x of h54Pool())W.push([x,CTG]);for(const x of qnPool())W.push([x,QNG]);
 for(const [x,G] of W){if(!x||x.nOk)continue;const U=nUsed(x);if(nVars(x.name).some(v=>U.has(v)))x.name=nPick(G,x);x.nOk=1}}catch(e){}}
(function(){const u0=h54PoolUp;h54PoolUp=function(){const r=u0.apply(this,arguments);nFix();return r}})();
function qnPoolUp(){const P=qnPool();for(let i=P.length-1;i>=0;i--){const q=P[i];if(!q.taken&&q.age>24){if(q.fk){const U=figUsed();const j=U.indexOf(q.fk.replace(/^x:/,""));if(j>=0)U.splice(j,1)}P.splice(i,1)}}
 let n=P.filter(q=>!q.taken).length;while(n<8){qnNew();n++}nFix()}
/* ---------- princes: candidates, betrothal, wedding (one function for every mother) ---------- */
function pkSons(){return allKids().filter(([k])=>k.alive&&k.sex==="m").map(([k,v])=>[k,v||S])}
function pkHome(k){return k&&k.alive&&k.sex==="m"&&!k.pW}
function pkMomN(p){return p===S?"ngươi":p.name}
function pkPull(p,k){return 20+rkOf(p)*5+k.fond/4+(k.tal||40)/5+(k.heir?30:0)+(p===queenP()||p===S&&S.rank>=7?15:0)}
function pkCands(p,k){const pl=pkPull(p,k);const F=qnPool().filter(q=>!q.taken).sort((a,b)=>qnQ(b)-qnQ(a));let C=F.filter(q=>qnQ(q)<=pl+15).slice(0,3);if(!C.length&&F.length)C=[F[F.length-1]];return C}
function pkBack(k,q){return HT.back[q.tier]+(k.heir?HT.heirB:0)}
function pkRivals(p,k){return pkSons().filter(([s,m])=>m!==p&&s!==k&&pkHome(s)&&!s.pB&&s.age>=BAL.age.betroth&&s.age<=BAL.age.matchMax&&h54Live(m)).map(([,m])=>m).filter((m,i,a)=>a.indexOf(m)===i)}
function pkO(p,k,q){const R2=q.tier<=1?pkRivals(p,k).filter(m=>rkOf(m)>rkOf(p)):[];return oddsCl(30+(p.sung||0)/3+k.fond/4+(k.heir?10:0)-(q.tier===0?10:0)-(R2.length?HT.rivalO:0))}
window.pkBackOf=k=>(k&&k.pW?k.pW.b||0:k&&k.pB?Math.round((k.pB.b||0)/2):0);
function pkBetroth(k,p,q,by){const me=p===S;const b=by?Math.round(pkBack(k,q)/2):pkBack(k,q);p.hon=(p.hon||0)+b;q.taken=k.name;htKnow(q);k.pB={q:q.id,b,by:by||""};
 if(!by){consorts().filter(c=>c!==p&&clanOf(c)===q.house).forEach(c=>relAdd(p,c,HT.clanRel));if(q.tier<=1)pkRivals(p,k).forEach(m=>relAdd(p,m,HT.envy))}
 try{h54Court(p,q.house,by?8:15)}catch(e){}
 let t=`${by?by+" ban hôn: ":""}${k.name}${me?", con ngươi,":` (con ${p.name})`} được hứa hôn với ${q.name}, con gái ${q.off}; nhà ấy chống lưng ${me?"ngươi":p.name} và hoàng tử (+${b}).`;
 if(k.age>=BAL.age.wed)t+=" "+pkWed(k,p);else t+=" Cưới khi hoàng tử tròn "+(BAL.age.wed)+" tuổi.";return t}
function pkWed(k,p){const q=qnById(k.pB&&k.pB.q);if(!q){k.pB=null;return""}k.pW={chinh:{name:q.name,house:q.house,off:q.off,tier:q.tier,age:q.age,fk:q.fk||""},trac:[],y:S.year,b:k.pB.b};
 const P=qnPool();P.splice(P.indexOf(q),1);k.pB=null;return `${k.name} cưới ${q.name} làm chính phi.`}
function pkTrac(k,p){const F=qnPool().filter(q=>!q.taken&&q.tier>=1);if(!F.length||!k.pW)return"";const q=F.sort((a,b)=>qnQ(b)-qnQ(a))[0];
 q.taken=k.name;htKnow(q);k.pW.trac.push({name:q.name,house:q.house,off:q.off,tier:q.tier,age:q.age,fk:q.fk||""});k.pW.b+=HT.tracB;p.hon=(p.hon||0)+HT.tracB;
 const P=qnPool();P.splice(P.indexOf(q),1);return `Hoàng thượng ban ${q.name}, con gái ${q.off}, làm trắc phi của ${k.name}${p===S?", con ngươi":""}; nhà ấy thêm chống lưng (+${HT.tracB}).`}
/* the succession weight counts the bride's house (lập hiền side: never above đích / trưởng) */
(function(){const w0=kvW;kvW=function(k){return w0.apply(this,arguments)+1.5*pkBackOf(k)}})();
/* ---------- the month ---------- */
function pkCd(p){const t=p===S?S.pkc:p.pkc;return t==null||S.turn-t>=HT.cd}
function pkMark(p){if(p===S)S.pkc=S.turn;else p.pkc=S.turn}
function htMonth(){let ev="";if(!S||S.dead)return ev;qnPoolUp();if(S.month===1)qnPool().forEach(q=>q.age++);
 for(const [k,p] of pkSons()){
  if(k.pB&&k.age>=BAL.age.wed&&pkHome(k)){const t=pkWed(k,p);if(t){if(p===S)ev+=`<span class="g">${t}</span> `;else log(t)}}
  if(p!==S&&h54Live(p)&&pkHome(k)&&!k.pB&&k.age>=BAL.age.betroth&&pkCd(p)&&npcWhy("h54Ban",{p,k},()=>roll(20))){/* npc-purpose G2: her own wish for her son's match */pkMark(p);const C=pkCands(p,k).filter(q=>(p.bac||0)>=HT.dow[q.tier]);
   if(C.length){const q=npwPick(C,q=>g2bAmb(p)?1+qnQ(q):1+(C.length-C.indexOf(q)))||C[0];ap(p,{bac:-HT.dow[q.tier]});/* npc-purpose G2: an ambitious mother reaches for the grandest house, others for the surest fit */if(roll(odA(p,pkO(p,k,q))))log(pkBetroth(k,p,q));else ap(p,HT.fail)}}
  if(pkHome(k)&&!k.pB&&(k.age>=19||k.age>=BAL.age.wed&&!h54Live(p))){const ow=npcWhy("hEmpWed",{p,k,son:1},()=>roll(8));const C=ow?pkCands(p,k):[];if(C.length){const by=ow.who===S.emp?"Hoàng thượng":"Thái hậu";/* npc-purpose G2: whoever of the two cares most (Thái hậu for the heir) */const t=pkBetroth(k,p,C[0],by);if(p===S)ev+=t+" ";else log(t)}}
  if(k.pW&&k.heir&&k.pW.trac.length<1&&k.age>=20&&npcWhy("pkTrac",{k,p},()=>roll(HT.trac))){const t=pkTrac(k,p);if(t){if(p===S)ev+=t+" ";else log(t)}}}
 allKids().forEach(([k,v])=>{if(!k.alive&&k.pB&&!k.pBx){k.pBx=1;const p=v||S;p.hon=Math.max(0,(p.hon||0)-(k.pB.b||0));const q=qnById(k.pB.q);if(q)q.taken=null}});
 S.kids.forEach(k=>{if(pkHome(k)&&k.age>=BAL.age.betroth&&!k.p16){k.p16=1;ev+=`${k.name} tròn ${BAL.age.betroth} tuổi: từ nay bàn được hôn sự (Hoàng tự › Hôn sự; cưới khi tròn ${BAL.age.wed}). `}});
 return ev}
(function(){const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments)||"";try{if(S&&!S.dead)ev+=htMonth()}catch(e){console.error(e)}return ev}})();
/* the son-in-law keeps his face after the wedding (j54 copies fid only) */
(function(){const w0=h54Wed;h54Wed=function(k){const s=k&&k.hB&&h54Son(k.hB.s);const r=w0.apply(this,arguments);try{if(s&&k.hW&&k.hW.s){k.hW.s.cf=s.cf||"";k.hW.s.kn=1}}catch(e){}return r}})();
/* marriage talks seen = known faces (princesses' talks too) */
(function(){const b0=PEND.h54ban;PEND.h54ban=function(pp){try{(pp.c||[]).forEach(id=>{const s=h54Son(id);if(s)htKnow(s)});const k=S.kids.find(x=>x.name===pp.k);if(k&&k.hMet){const s=h54Son(k.hMet);if(s)htKnow(s)}}catch(e){}return b0.apply(this,arguments)}})();
(function(){const m0=PEND.h54met;PEND.h54met=function(pp){try{const s=h54Son(pp.s);if(s)htKnow(s)}catch(e){}return m0.apply(this,arguments)}})();
/* marriage talks are deliberate acts: full option cards (Tốn · Được · Mất · Kèm + odds), not hidden event choices (KIT 28.6 opt-out) */
const HTFULL=["htban","h54ban"];
(function(){const p0=pushModal;pushModal=function(m){try{if(m&&HTFULL.includes(m.pid)){m.showOut=true;m.optLayout="rows";(m.opts||[]).forEach(o=>{if(o)o.showOut=true})}}catch(e){}return p0.apply(this,arguments)}})();
(function(){const d0=deserQ;deserQ=function(L){const out=d0.apply(this,arguments);try{out.forEach(q=>{if(q&&HTFULL.includes(q.pid)){q.showOut=true;q.optLayout="rows";(q.opts||[]).forEach(o=>{if(o)o.showOut=true})}})}catch(e){}return out}})();
/* ---------- her acts ---------- */
function qLine(q){return `${q.name} · ${q.age} tuổi · con gái ${q.off} · phe ${q.house} · Sắc ${q.sac} · Tài ${q.tai}`}
PEND.htban=pp=>{const k=S.kids.find(x=>x.name===pp.k&&pkHome(x));if(!k||k.pB)return null;const C=(pp.c||[]).map(qnById).filter(q=>q&&!q.taken);C.forEach(htKnow);
 const rows=C.map(q=>`<div class="h54c">${mdH(qnFace(q),"sm")}<span>${qLine(q)}</span></div>`).join("");const O=[];
 for(const q of C){const d=HT.dow[q.tier],b=pkBack(k,q),o=pkO(S,k,q),R2=q.tier<=1?pkRivals(S,k):[];const hi=R2.filter(m=>rkOf(m)>rkOf(S));
  O.push({n:`Xin chỉ ban hôn: ${q.name}${S.bac<d?` (thiếu bạc: cần ${d})`:""}`,fx:{bac:-d},x:[word(o),`thành: hứa hôn; nhà ${q.off} chống lưng ngươi và con +${b} (thế lực phe, tranh ghế, thứ tự kế vị của con), các phi tần phe ${q.house} thiện cảm +${HT.clanRel}`,
   `hỏng: Hoàng thượng chưa chuẩn, ${sgStat(HT.fail.sung)}, lễ vật mất`,hi.length?`kèm: ${kitNameList(hi)} cũng nhắm mối này cho con mình (khó hơn)`:"",R2.length?`kèm: ${R2.length} phi tần có con trai đến tuổi ghen (thiện cảm ${HT.envy})`:""].filter(Boolean).join(" · "),
   go:()=>{if(roll(o))log(pkBetroth(k,S,q));else{apply(HT.fail);log(`Hoàng thượng chưa chuẩn mối ${q.name} cho ${k.name}.`)}}})}
 O.push({n:"Chưa bàn vội",fx:{},x:`con ở cạnh ngươi thêm · kèm: phi tần khác có thể hỏi trước các mối tốt`,go:()=>log(`Ngươi chưa vội bàn hôn sự cho ${k.name}.`)});
 return{who:kidFace(k),t:`Bàn hôn sự cho ${k.name}, ${k.age} tuổi${k.age<BAL.age.wed?" (hứa hôn trước, cưới khi tròn "+(BAL.age.wed)+")":""}. Các mối hỏi được (tùy phẩm vị ngươi, lòng thương của Hoàng thượng, tài của con${k.heir?", ngôi Thái tử":""}):<div class="h54cl">${rows||'<p class="past">Chưa có mối nào.</p>'}</div>`,o:O}};
function pkBtn(k){const t2=whyTime(2);if(!k.alive||k.sex!=="m")return"";if(k.pW)return"";const q=k.pB&&qnById(k.pB.q);
 return pbtn(`data-ht="ban" data-kn="${k.name}"`,"Bàn hôn sự",`tốn: 2 khắc · thành: xem các mối, xin chỉ ban hôn cho con`,k.pB?`đã hứa hôn với ${q?q.name:"quý nữ"}`:k.age<BAL.age.betroth?"con chưa đủ "+(BAL.age.betroth)+" tuổi":t2||(S.pkBan!=null&&S.turn-S.pkBan<HT.cd?`vừa bàn xong (lại được sau ${HT.cd-(S.turn-S.pkBan)} tháng)`:""))}
function askBtn(x,kind){if(htKn(x))return"";const t1=whyTime(1);return pbtn(`data-ht="ask" data-hk="${kind}" data-hid="${x.id}"${capAt(BAL.btn.htAsk,BAL.bacFee.htAsk)}`,"Dò hỏi gia thế",`${capW()} · tốn: ${BAL.btn.htAsk.k} khắc, Bạc -${BAL.bacFee.htAsk} · thành: biết tên, mặt, Sắc, Tài của ${kind==="q"?"nàng":"chàng"}`,t1||(S.bac<BAL.bacFee.htAsk?"thiếu bạc (cần "+BAL.bacFee.htAsk+")":""))}
function htAct(a,b){if(!S||S.dead||Q.length)return;const r0=rsnap();
 if(a==="ban"){const k=S.kids.find(x=>x.name===b.dataset.kn&&pkHome(x));if(!k||k.pB||k.age<BAL.age.betroth||!can(2)||(S.pkBan!=null&&S.turn-S.pkBan<HT.cd))return;spend(2);S.pkBan=S.turn;qnPoolUp();
  pushDil(mkP("htban",{k:k.name,c:pkCands(S,k).map(q=>q.id)}),"Bàn hôn sự");render();return}
 if(a==="ask"){const x=b.dataset.hk==="q"?qnById(+b.dataset.hid):h54Son(+b.dataset.hid);if(!x||htKn(x)||!can(BAL.btn.htAsk.k)||S.bac<BAL.bacFee.htAsk)return;spend(BAL.btn.htAsk.k);apply({bac:-BAL.bacFee.htAsk});htKnow(x);
  const n=bestSent&&bestSent(S);log(`${n?n.name+" dò hỏi":"Ngươi dò hỏi"} gia thế: ${b.dataset.hk==="q"?qLine(x):h54SonLine(x)}.`);resultShow("Dò hỏi gia thế",r0,"sure");render();return}
 if(a==="go"){tab=b.dataset.t;if(b.dataset.pi!=null)PG[tab]=+b.dataset.pi;render()}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-ht]");if(b&&!b.disabled){e.preventDefault();e.stopPropagation();(window.htAct||htAct)(b.dataset.ht,b)}},true);
/* the son's own card (Con của ngươi) gets the marriage button + state, like the daughters' */
(function(){const kc=kidCard;kidCard=function(k){let h=kc.apply(this,arguments);try{if(k&&k.alive&&k.sex==="m"&&(k.age>=BAL.age.matchShow||k.pB||k.pW)){
  h=h.replace('<div class="pcinfo">',`<div class="pcinfo"><span>Hôn sự: ${pkState(k)}</span>`);const bt=pkBtn(k);if(bt)h=h.replace('<div class="pcr">',`<div class="pcr"><h5>Hôn sự</h5><div class="pcb">${bt}</div>`)}}catch(e){}return h}})();
function pkState(k){if(k.pW){const W=k.pW;return `chính phi ${W.chinh.name}, con gái ${W.chinh.off}${W.trac.length?` · trắc phi ${W.trac.map(x=>x.name).join(", ")}`:""}`}
 if(k.pB){const q=qnById(k.pB.q);return `đã hứa hôn với ${q?q.name+", con gái "+q.off:"quý nữ"}${k.age<BAL.age.wed?", cưới khi tròn "+(BAL.age.wed)+"":""}`}return k.age>=BAL.age.betroth?"chưa bàn hôn sự":"chưa đến tuổi bàn hôn sự (16)"}
window.pkState=pkState;
window.htAct=htAct;/* jerr (errand scene) wraps the "ask" errand: Dò hỏi gia thế */

/* ---------- STRANGER RULE for children (owner 11/15): a child she has never met shows the grey child silhouette everywhere (strip, card,
   Kế vị, stage); the name is public (announced at birth, j61 k61Pub). Met = her own children (from birth), a palace visit to the mother,
   a festival banquet, a khảo hạch they sit together, a child she takes in. Old saves: other mothers' children start unmet (once). ---------- */
function kidMet(k){try{return isKnown61(k)}catch(e){return true}}
function kidMeet(L,how){try{if(!S||!S.known)return;L=(L||[]).filter(k=>k&&k.alive&&!kidMet(k));if(!L.length)return;k61Know(L,"",true,1);
 if(how)log(`Ngươi đã được gặp mặt ${L.map(k=>k.name).join(", ")}${how}.`)}catch(e){}}
(function(){const b0=birthP;birthP=function(p){const n0=((p&&p.kids)||[]).length;const r=b0.apply(this,arguments);try{if(p===S&&S.known)k61Know(S.kids.slice(n0),"",true,3)}catch(e){}return r}})();
(function(){if(typeof goTo!=="function")return;const g0=goTo;goTo=function(){const r=g0.apply(this,arguments);try{if(S&&!S.dead&&S.known)for(const v of (rivals||[]))if(v.alive&&!v.out&&palaceOf(v)===S.place)kidMeet((v.kids||[]).filter(k=>k.alive),` ở cung ${v.name}`)}catch(e){}return r}})();
(function(){if(typeof festival!=="function")return;const f0=festival;festival=function(title){const r=f0.apply(this,arguments);try{if(r&&S&&S.known)kidMeet(allKids().map(([k])=>k).filter(k=>k.alive&&k.age>=1),` trong ${String(title||"yến tiệc").replace(/<[^>]+>/g,"")}`)}catch(e){}return r}})();
(function(){if(typeof ktRun!=="function")return;const r0=ktRun;ktRun=function(e){let L=[];try{L=ktList(KTE[e]).map(([k])=>k)}catch(x){}const r=r0.apply(this,arguments);try{kidMeet(L," ở buổi khảo hạch")}catch(x){}return r}})();
(function(){const a=ACT&&ACT.takeaway;if(!a)return;const f0=a.f;a.f=function(x,t){const B=((t&&t.kids)||[]).slice();const r=f0.apply(this,arguments);try{for(const k of B)if(!(t.kids||[]).includes(k)){if(!k.bm)k.bm={n:t===S?S.name:`${rkName(t)} ${t.name}`};if(x===S&&S.known)k61Know([k],"",true,3)}}catch(e){}return r}})();
/* children of a consort who shares her palace (side halls): she sees them every day */
function kidMeetHome(){try{if(S&&!S.dead&&S.known&&!S.out)for(const v of (rivals||[]))if(v.alive&&!v.out&&palaceOf(v)==="home")kidMeet((v.kids||[]).filter(k=>k.alive),` ở cùng cung với ngươi`)}catch(e){}}
(function(){const m0=monthTick;monthTick=function(){const ev=m0.apply(this,arguments);kidMeetHome();return ev}})();
function kidMetMig(){try{if(!S||S.kmet||!k61S())return;S.kmet=1;for(const [k,v] of allKids()){if(v)delete S.known[kOf61(k)];else S.known[kOf61(k)]=3}K61VER++}catch(e){}}
(function(){const d0=deser;deser=function(){const r=d0.apply(this,arguments);kidMetMig();return r}})();
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S)S.kmet=1}catch(e){}return r}})();

/* ---------- UI ---------- */
const HTK=["kid","kvo","kin","hon","qt"];
const HTL={kid:["Con của ngươi","Con ngươi"],kvo:["Kế vị","Kế vị"],kin:["Hoàng tự trong cung","Trong cung"],hon:["Hôn sự","Hôn sự"],qt:["Quý tộc kén rể · kén dâu","Quý tộc"]};
function mkTab(k,after){const T0=$("tabs");if(!T0||T0.querySelector(`[data-tab="${k}"]`))return;const b=document.createElement("button");b.dataset.tab=k;b.dataset.s=HTL[k][1];b.setAttribute("role","tab");b.textContent=HTL[k][0];b.dataset.l0=b.textContent;b.dataset.s0=b.dataset.s;
 const ref=T0.querySelector(`[data-tab="${after}"]`);if(ref)ref.after(b);else T0.appendChild(b)}
(function(){let a="kid";for(const k of HTK.slice(1)){mkTab(k,a);a=k}})();
try{KG.ht={keys:HTK.slice(),l:"Hoàng tự",s:"Hoàng tự"}}catch(e){}
try{if(window.VP&&VP.tabs)Object.assign(VP.tabs,{kvo:["Kế vị","Kế vị"],kin:["Hoàng tự trong cung","Trong cung"],hon:["Hôn sự","Hôn sự"],qt:["Quý tộc kén rể · kén dâu","Quý tộc"]})}catch(e){}
/* sub-tab labels: long when they fit, short otherwise (measured: never cut) */
function htFitSub(){try{const P=$("panel");const nav=P&&P.querySelector(":scope > .ksub, :scope > .kpbar > .ksub");if(!nav||!nav.querySelector('[data-ksub="kvo"]'))return;
 const bs=[...nav.querySelectorAll(".ksubb")];bs.forEach(b=>{const L=HTL[b.dataset.ksub];if(L){b.textContent=L[0];b.title=L[0]}});
 if(nav.scrollWidth>nav.clientWidth+1||bs.some(b=>b.scrollWidth>b.clientWidth+1))bs.forEach(b=>{const L=HTL[b.dataset.ksub];if(L)b.textContent=L[1]})}catch(e){}}
/* measured now and again after layout (the first render can measure a panel that is not laid out yet), and on resize */
const HTRO=typeof ResizeObserver==="function"?new ResizeObserver(()=>htFitSub()):null;
(function(){const k0=kgSub;kgSub=function(){const r=k0.apply(this,arguments);htFitSub();requestAnimationFrame(htFitSub);
 try{const nav=$("panel").querySelector(":scope > .ksub, :scope > .kpbar > .ksub");if(HTRO&&nav&&!nav.__htro){nav.__htro=1;HTRO.observe(nav)}}catch(e){}return r}})();
addEventListener("resize",()=>requestAnimationFrame(htFitSub));
/* after death: the extra keys are not tabs (maid-8tabs, owner 21/11 ~03:15Z: the cung nữ road has the same Hoàng tự sub-tabs) */
(function(){const r0=render;render=function(){const x=r0.apply(this,arguments);try{const off=!kgOn();HTK.slice(1).forEach(k=>{const b=document.querySelector(`#tabs [data-tab="${k}"]`);if(b)b.style.display=off?"none":""});
  if(off&&HTK.slice(1).includes(tab))tab="kid"}catch(e){}return x}})();

/* the empty card = the kit's kitEmpty (j79): picture + title + hint lines (never a blank page) */
function htEmpty(art,title,lines,acts){return kitEmpty(title,lines,{art,acts})}
const momLab=p=>p===S?"Ngươi":`${rkName(p)} ${p.name}`;
const momNote=p=>p===S?"":!p.alive?" (đã mất)":p.out?" (lãnh cung)":"";
/* owner 11/15 (TƯ CHẤT vs HIỀN TÀI): Văn · Võ · Đức only for her own child from 3; Hiền tài only from 6 (her own: the number, others: the
   palace's word); tư chất never as a number. Other mothers' children: only what the whole palace knows. */
const mineK=k=>S.kids.includes(k);
function kbars(k){try{ktSync(k)}catch(e){}return mineK(k)&&k.tv!=null?ktBars(k):""}
const hien=k=>hienLine(k,mineK(k));
function fondWord(k){const W=BAL.tc.fw,f=k.fond||0;return f>=W[2]?"rất yêu chiều":f>=W[1]?"yêu":f>=W[0]?"như các con khác":"ít để mắt"}
const thuong=k=>mineK(k)?`Hoàng thượng thương <b>${k.fond}</b>`:`Được thương: <b>${fondWord(k)}</b>`;
const sname=k=>shortN(String(k.name).replace(/^(Hoàng tử|Công chúa) /,""));
try{Object.assign(KIT_GLOSS,{"Hiền tài":"Tài học của hoàng tự, suy ra từ Văn, Võ, Đức (Văn và Đức nặng hơn). Trẻ dưới 6 tuổi chưa xét: Hiền tài chưa rõ. Lệ lập hiền xét Hiền tài cùng lòng thương của Hoàng thượng. Con phi tần khác: chỉ có lời đồn.",
 "Tư chất hoàng tự":"Thứ trẻ mang theo khi chào đời: từ cha mẹ và một phần may rủi, không đổi. Tư chất cao thì học gì cũng nhanh hơn. Không ai biết chắc: nhũ mẫu (từ 1 tuổi), thầy dạy (từ 6 tuổi) chỉ nói phỏng chừng; con phi tần khác chỉ có lời đồn. Văn, Võ, Đức thì phải dạy dỗ mới có: thầy giỏi, mẹ dạy chữ, dạy lễ nghi, mẹ có Tài, có Đức, Hoàng thượng để mắt.",
 "Lập đích, lập trưởng, lập hiền":"Con Hoàng hậu (đích tử) đứng đầu, rồi hoàng tử lớn nhất (trưởng tử); sau đó xét Hiền tài, lòng thương của Hoàng thượng, phẩm vị người mẹ, Thái hậu quý người mẹ và nhà vợ chống lưng. Hoàng tử dưới 6 tuổi chỉ xét đích, trưởng và lòng thương của Hoàng thượng; từ 6 tuổi mới xét lập hiền và mới được lập Thái tử. Băng hà khi chưa lập Thái tử: đích tử lên ngôi, không có thì trưởng tử.",
 "Nhà vợ chống lưng":"Nhà quyền thần có con gái gả cho hoàng tử đứng sau người mẹ và hoàng tử: cộng vào thế lực phe, tranh ghế và thứ tự kế vị (lập hiền).",
 "Nhà chồng chống lưng":"Nhà phò mã đứng sau người mẹ của công chúa: cộng vào thế lực phe và tranh ghế."})}catch(e){}

/* 1. Con của ngươi */
function kidTab(){const K=S.kids;if(!K.length)return htEmpty("img/act-cat-cham-con.webp","Ngươi chưa có con",[
  "Con chỉ đến sau những đêm thị tẩm: được Hoàng thượng lật thẻ càng nhiều, càng dễ có tin vui.",
  "Có thai thì giữ gìn Sức, nhờ thái y an thai; kẻ ghen có thể hại thai.",
  "Con sinh ra hiện ở đây: dạy dỗ, chăm con, bàn hôn sự; con trai được xét vào hàng kế vị."]);
 const hl=S.heir&&S.heir.k?(S.heir.v?`Thái tử: ${S.heir.k.name}, con của ${S.heir.v.name}.`:`<span class="g">Con ngươi, ${S.heir.k.name}, là Thái tử.</span>`):"Chưa lập Thái tử.";
 return `<div class="ph"><span>${hl}</span><span>${ic("con",14)}${mySons().length} hoàng tử · ${myDaus().length} công chúa</span></div>`+pager("kid",K.map(k=>({f:kidFace(k),name:sname(k),dim:!k.alive})),i=>kidCard(K[i]))}
/* 2. Kế vị */
function kvReasons(x,i,o){const L=[];const k=x.k;
 if(k.heir)L.push("Đã được lập làm Thái tử: đứng đầu hàng kế vị.");
 if(x.dich)L.push(`Đích tử (con Hoàng hậu): lệ lập đích đứng trước mọi hoàng tử khác.`);
 if(x.truong)L.push("Trưởng tử: lớn tuổi nhất trong các hoàng tử.");
 if(!x.dich&&!x.truong&&!k.heir){if(!hienShown(k))L.push(`Còn nhỏ: chỉ xét đích, trưởng và lòng thương của Hoàng thượng (lòng thương: ${x.v?fondWord(k):k.fond}).`);
  else L.push(x.v?`Lập hiền: Hiền tài ${hienWord(k)} (lời đồn), lòng thương: ${fondWord(k)}, mẹ là ${rkName(x.v)}.`:`Lập hiền: Hiền tài ${ktHien(k)}, Hoàng thượng thương ${k.fond}, mẹ là ${RANKS[S.rank].n}.`)}
 const b=pkBackOf(k);if(b)L.push(`Nhà vợ chống lưng +${b}.`);
 if(k.age<6)L.push("Chưa đủ 6 tuổi: chưa được xét lập Thái tử.");
 const prev=o[i-1];if(prev&&!k.heir)L.push(`Đứng sau ${prev.k.name}${prev.k.heir?" (Thái tử)":prev.dich&&!x.dich?" (đích tử)":""}.`);return L}
function kvCard(x,i,o){const k=x.k,v=x.v||S,mine=!x.v;const chips=[k.heir?chip("Thái tử","ok"):"",x.dich?chip("Đích tử","ok"):"",x.truong?chip("Trưởng tử","ok"):"",pkBackOf(k)?chip(gl("Nhà vợ chống lưng",`Nhà vợ chống lưng +${pkBackOf(k)}`),"ok"):""];
 const acts=mine?[pbtn(`data-ht="go" data-t="kid" data-pi="${S.kids.indexOf(k)}"`,"Xem con ở mục Con của ngươi","dạy dỗ, chăm con, bàn hôn sự","")]:[];
 return pcard({tabKey:"kvo",f:kidFace(k),name:k.name,rank:`${ic("con",16)}Kế vị thứ ${i+1} · ${k.age} tuổi`,lines:[`Mẹ: <b>${momLab(v)}</b>${momNote(v)}`,tcLine(k,mine),hien(k),kbars(k),thuong(k)],chips,
  groups:[["Vì sao đứng thứ "+(i+1),kvReasons(x,i,o).map(t=>`<p class="kr3note khtwhy">${t}</p>`)],["",acts]],empty:""})}
function kvTab(){const o=kvOrder();const rule=`<div class="ph khtrule"><span>${gl("Lập đích, lập trưởng, lập hiền","Lập đích · lập trưởng · lập hiền")} <small class="past">(chạm để xem đủ luật)</small></span><span>${o.length} hoàng tử</span></div>`;
 if(!o.length)return rule+htEmpty("img/act-phong-tuoc.webp","Trong cung chưa có hoàng tử",["Hoàng tử nào ra đời (con ngươi hay con phi tần khác) sẽ đứng vào hàng kế vị ở đây, theo lệ lập đích, lập trưởng, lập hiền.","Hoàng tử từ 6 tuổi mới được xét lập Thái tử."]);
 return rule+pager("kvo",o.map((x,i)=>({f:kidFace(x.k),name:`${i+1}. ${sname(x.k)}`})),i=>kvCard(o[i],i,o))}
/* 3. Hoàng tự trong cung (other mothers, grouped by mother) */
function kinList(){const L=[];for(const v of (rivals||[])){const ks=(v.kids||[]).filter(k=>k.alive);if(ks.length)ks.sort((a,b)=>b.age-a.age).forEach((k,j)=>L.push({k,v,sep:j===0?momLab(v)+momNote(v):""}))}return L}
/* birth order among all the Emperor's children of the same sex (dead ones counted: the palace remembers) */
function kinOrd(k){try{kvStamp()}catch(e){}const L=allKids().map(([x])=>x).filter(x=>x.sex===k.sex).sort((a,b)=>(a.bt||0)-(b.bt||0));return L.indexOf(k)+1}
function kinRaise(k,v){const bm=k.bm&&k.bm.n?`; mẹ đẻ: ${k.bm.n}`:"";
 if(!v.alive)return `nhũ mẫu và cung nhân trông nom (mẹ đã mất)${bm}`;if(v.out)return `nhũ mẫu và cung nhân trông nom (mẹ ở lãnh cung)${bm}`;
 return `${bm?"nuôi dưới gối ":""}${momLab(v)} · ${palName(palaceOf(v))}${bm}`}
function kinHealth(k){return k.hp<BAL.cut.kidHp[0]?"đang ốm nặng, thái y ra vào":k.hp<BAL.cut.kidHp[1]?"hay đau ốm":"khỏe mạnh"}
function kinCard(x){const k=x.k,v=x.v;const o=k.sex==="m"?kvOrder():[];const i=o.findIndex(z=>z.k===k);const met=kidMet(k);
 const title=k.heir?"Thái tử":k.sex==="m"?"Hoàng tử":"Công chúa";
 const L=[`Mẹ: <b>${momLab(v)}</b>${momNote(v)}`,tcLine(k,false),hien(k),thuong(k)];
 /* the right pane = what the whole palace knows (owner 11/15): mother (face by the stranger rule), age, birth order, title, honours, illness, who raises */
 const R=[["Tuổi",`${k.age} tuổi`],["Thứ bậc",`${k.sex==="m"?"hoàng tử":"công chúa"} thứ ${kinOrd(k)} của Hoàng thượng`],["Tước vị",title+(i>=0?` · kế vị thứ ${i+1}`:"")],
  ["Nuôi dạy",kinRaise(k,v)],["Sức khỏe",kinHealth(k),k.hp<BAL.cut.kidHp[0]?"r":"n"]];
 if(k.age>=6)R.push(["Học",`Thượng thư phòng · ${TUT[k.tut||0]}${k.vt?" · có thầy võ":""}`]);
 try{const lt=ktLast(k);if(lt)R.push(["Khảo hạch",lt+(k.lt&&k.lt.r==="ex"?" · được Hoàng thượng khen":""),k.lt&&k.lt.r==="ex"?"g":k.lt&&k.lt.r==="poor"?"r":"n"])}catch(e){}
 if(k.sex==="f"){try{h54Init(k);R.push(["Hôn sự",h54State(k)])}catch(e){}}else if(k.age>=BAL.age.matchShow||k.pB||k.pW)R.push(["Hôn sự",pkState(k)]);
 const pub=[kitPersonLine(v,{sub:v===S?"":`mẹ ${k.sex==="m"?"hoàng tử":"công chúa"}${momNote(v)}`}),kitRows(R)];
 if(!met){pub.push(`<p class="kr3note">Ngươi chưa gặp mặt ${k.sex==="m"?"hoàng tử":"công chúa"} này: chỉ nghe tên. Gặp ở yến tiệc, buổi khảo hạch, hoặc sang cung mẹ con thăm thì mới biết mặt.</p>`);
  const vb=v.alive&&!v.out&&typeof visitBtn==="function"?visitBtn(v):"";if(vb)pub.push(vb)}
 const chips=[i>=0?chip(`Kế vị thứ ${i+1}`,""):"",k.heir?chip("Thái tử","ok"):"",k.hW?chip(k.hW.kind==="hoa"?"Hòa thân Bắc Địch":"Đã xuất giá","ok"):"",met?"":chip("Chưa gặp mặt",""),k.hp<35?chip("Đang ốm","hot"):""];
 return pcard({tabKey:"kin",f:kidFace(k),name:k.sex==="f"&&typeof h54Name==="function"?(h54Init(k),h54Name(k)):k.name,rank:`${ic("con",16)}${title} · ${k.age} tuổi`,lines:L,chips,groups:[["Cả cung đều biết",pub]],empty:""})}
function kinTab(){const L=kinList();if(!L.length)return htEmpty("img/act-cat-cham-con.webp","Phi tần khác chưa có con",["Hoàng tử, công chúa của các phi tần khác hiện ở đây, xếp theo người mẹ.","Con ngươi ở mục Con của ngươi."]);
 return `<div class="ph"><span>Con của các phi tần khác, xếp theo người mẹ.</span><span>${L.length} hoàng tự</span></div>`+pager("kin",L.map(x=>({f:kidFace(x.k),name:sname(x.k),sep:x.sep})),i=>kinCard(L[i]))}
/* 4. Hôn sự (princesses and princes of age, every mother) */
function honList(){const L=[];const D=h54Daus().filter(([k])=>k.age>=BAL.age.matchShow||k.hW||k.hB),M=pkSons().filter(([k])=>k.age>=BAL.age.matchShow||k.pB||k.pW);
 const mineFirst=(a,b)=>((a[1]===S)?0:1)-((b[1]===S)?0:1)||b[0].age-a[0].age;
 D.sort(mineFirst).forEach(([k,p],j)=>L.push({k,p,sep:j===0?"Công chúa":""}));M.sort(mineFirst).forEach(([k,p],j)=>L.push({k,p,sep:j===0?"Hoàng tử":""}));return L}
function spouseRow(f,line){return `<div class="h54c khtsp">${mdH(f,"sm")}<span>${line}</span></div>`}
function honCard(x){const k=x.k,p=x.p,me=p===S;const L=[`Mẹ: <b>${momLab(p)}</b>${momNote(p)}`];let sp="",chips=[],B=[];
 if(k.sex==="f"){h54Init(k);L.push(`Hôn sự: ${h54State(k)}`);const W=k.hW,s=k.hB&&h54Son(k.hB.s);
  if(W&&W.kind!=="hoa"){W.s.kn=1;sp=spouseRow(h54Face(W.s),`Phò mã ${W.s.name} · con trai ${W.s.off} · phe ${W.s.house}`);if(W.b)chips.push(chip(gl("Nhà chồng chống lưng",`Nhà chồng chống lưng +${W.b}`),"ok"))}
  else if(s){sp=spouseRow(h54Face(s),h54SonLine(s));if(k.hB.b)chips.push(chip(gl("Nhà chồng chống lưng",`Nhà chồng chống lưng +${k.hB.b}`),"ok"))}
  const m=k.hMet&&h54Son(k.hMet);if(m&&!k.hW&&htKn(m))L.push(`Người con thương: <b>${m.name}</b>`);
  if(me)B=h54Btns(k).filter(b=>/data-h54="(ban|thu|noi)"/.test(b))}
 else{L.push(`Hôn sự: ${pkState(k)}`);const W=k.pW,q=k.pB&&qnById(k.pB.q);
  if(W){W.chinh.kn=1;W.trac.forEach(t=>t.kn=1);sp=spouseRow(qnFace(W.chinh),`Chính phi ${W.chinh.name} · con gái ${W.chinh.off} · phe ${W.chinh.house}`)+W.trac.map(t=>spouseRow(qnFace(t),`Trắc phi ${t.name} · con gái ${t.off}`)).join("")}
  else if(q)sp=spouseRow(qnFace(q),qLine(q));const b=pkBackOf(k);if(b)chips.push(chip(gl("Nhà vợ chống lưng",`Nhà vợ chống lưng +${b}`),"ok"));
  if(me){const bt=pkBtn(k);if(bt)B=[bt]}}
 if(!me)B=[`<p class="kr3note">Hôn sự của con phi tần khác do mẹ con ấy, Hoàng thượng hoặc Thái hậu định.</p>`];
 return pcard({tabKey:"hon",f:kidFace(k),name:k.sex==="f"?h54Name(k):k.name,rank:`${ic("con",16)}${k.sex==="m"?"Hoàng tử":"Công chúa"} · ${k.age} tuổi`,lines:L,chips,note:sp?`<span class="khtsph">${k.sex==="f"?"Nhà chồng":"Nhà vợ"}</span>${sp}`:"",groups:[["Việc hôn sự",B]],empty:""})}
function honTab(){h54PoolUp();qnPoolUp();const L=honList();
 const head=`<div class="ph"><span>Con từ ${BAL.age.betroth} tuổi được bàn hôn sự, cưới khi tròn ${BAL.age.wed}. Nhà thông gia chống lưng ngươi: <b>${S.hon||0}</b>.</span>${S.hEnv?`<span class="r">Sứ thần Bắc Địch chờ cầu hôn một công chúa từ ${BAL.age.wed} tuổi.</span>`:""}</div>`;
 if(!L.length)return head+htEmpty("img/act-hon-su.webp","Chưa có hoàng tự nào đến tuổi bàn hôn sự",["Công chúa, hoàng tử từ "+(BAL.age.matchShow)+" tuổi hiện ở đây; từ "+(BAL.age.betroth)+" tuổi mẹ được bàn hôn sự, cưới khi tròn "+(BAL.age.wed)+".","Công chúa gả vào nhà quyền thần: nhà chồng chống lưng người mẹ. Hoàng tử cưới quý nữ: nhà vợ chống lưng người mẹ và cả hoàng tử trong hàng kế vị.","Các mối (công tử, quý nữ) ở mục Quý tộc kén rể · kén dâu."]);
 return head+pager("hon",L.map(x=>({f:kidFace(x.k),name:sname(x.k),sep:x.sep})),i=>honCard(L[i]))}
/* 5. Quý tộc kén rể · kén dâu */
function qtList(){h54PoolUp();qnPoolUp();const C=h54Pool().filter(s=>!s.taken).sort((a,b)=>h54Q(b)-h54Q(a)),Qn=qnPool().filter(q=>!q.taken).sort((a,b)=>qnQ(b)-qnQ(a));
 return C.map((s,j)=>({x:s,kind:"s",sep:j===0?"Công tử (kén rể)":""})).concat(Qn.map((q,j)=>({x:q,kind:"q",sep:j===0?"Quý nữ (kén dâu)":""})))}
function qtCard(it){const x=it.x,isQ=it.kind==="q",kn=htKn(x);const f=isQ?qnFace(x):h54Face(x);
 const L=[`Nhà: <b>${isQ?"con gái":"con trai"} ${x.off}</b>`,`Phe: <b>${x.house}</b>`,`Tuổi <b>${x.age}</b>`,kn?`Sắc <b>${x.sac}</b> · Tài <b>${x.tai}</b>`:`Sắc, Tài: <b>chưa rõ</b>`];
 const fit=(isQ?S.kids.filter(k=>pkHome(k)&&!k.pB&&k.age>=BAL.age.matchShow).filter(k=>pkCands(S,k).includes(x)):S.kids.filter(k=>h54Home(k)&&!k.hB&&k.age>=BAL.age.matchShow).filter(k=>h54Cands(S,k).includes(x))).map(k=>k.name);
 if(fit.length)L.push(`Hỏi được cho: <b>${fit.join(", ")}</b>`);
 const ask=askBtn(x,it.kind);
 return pcard({tabKey:"qt",f,name:kn?x.name:"Người lạ",rank:`${isQ?"Quý nữ":"Công tử"} · ${x.tier===0?"nhà đứng đầu":x.tier===1?"nhà quyền quý":"nhà quan"}`,lines:L,chips:[chip("Chưa hứa hôn","")],
  groups:[["Việc",ask?[ask]:[`<p class="kr3note">Đã biết gia thế. Muốn kết thông gia: vào Hôn sự, chọn con đã đủ ${BAL.age.betroth} tuổi, chạm Bàn hôn sự.</p>`]]],empty:""})}
function qtTab(){const L=qtList();const head=`<div class="ph"><span>Con các nhà quyền thần chưa hứa hôn: công tử cho công chúa, quý nữ cho hoàng tử. Chưa quen thì là Người lạ: dò hỏi gia thế để biết.</span></div>`;
 if(!L.length)return head+htEmpty("img/act-cat-trieu-chinh.webp","Chưa có mối nào",["Mỗi tháng các nhà quyền thần đưa con đến tuổi vào danh sách kén rể, kén dâu."]);
 return head+pager("qt",L.map(it=>({f:it.kind==="q"?qnFace(it.x):h54Face(it.x),name:htKn(it.x)?shortN(it.x.name):"Người lạ",sep:it.sep})),i=>qtCard(L[i]))}
window.htTabHTML=function(t){return `<div class="pgwrap kht">`+({kid:kidTab,kvo:kvTab,kin:kinTab,hon:honTab,qt:qtTab}[t]||kidTab)()+`</div>`};
if(typeof renderPanel0==="function"){const p0=renderPanel0;renderPanel0=function(){if(!HTK.includes(tab)||!S||S.dead)return p0.apply(this,arguments);/* the cung nữ road too (maid-8tabs) */
  const el=$("panel");faceInit();const gm=document.querySelector(".game");if(gm)gm.classList.add("cardtab");const h=htTabHTML(tab);
  const same=el.dataset.tab===tab,keep=same?el.scrollTop:0;el.innerHTML=h;el.dataset.tab=tab;el.dataset.pg=String(PG[tab]);kitFix(el);panelScrollKeep(el,keep)}}
/* ---------- CSS ---------- */
const st=document.createElement("style");st.id="kit-ht";st.textContent=`
.khtrule .kgl{font-weight:600}.khtrule small{font-size:.72rem}
.kht .khtwhy{margin:0 0 4px;font-size:.82rem;color:inherit}
.kht .pcn .khtsp,.kht .khtsp{display:flex;align-items:center;gap:8px;padding:3px 0;border-bottom:1px solid rgba(0,0,0,.06)}.kht .khtsp span{min-width:0;overflow-wrap:anywhere;font-size:.82rem}
.kht .khtsph{display:block;font-size:.76rem;font-weight:600;color:var(--dim);margin:0 0 2px}
.kht .ph>span{min-width:0;overflow-wrap:anywhere}
`;document.head.appendChild(st);
})();
