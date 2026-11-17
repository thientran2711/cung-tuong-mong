/* ================= jpromsv: D41 — she promotes her OWN servants (owner 15/11 05:00Z OD:L302; gain-and-loss rule 16/11 07:15Z;
   BALANCE rule 15/11 20:30Z). Builds on the existing ĐỀ BẠT act (jaudit §4: srkMax cap by her rank, Bạc cost BAL.dbCost, odds dbOdds,
   loyalty +dbGain, envy −dbEnvy, NPC mistresses the same) — nothing rebuilt. Adds:
   1. a SECOND road of equal worth: ask the Hoàng hậu (or, for the Hoàng hậu herself / no queen, the Thái hậu) to approve = her
      favour −spFav. Bạc-equivalence: the favour price = the Bạc price × (stipend at the reference rank / stipend at HER rank) × favPerBac,
      so a Bạc price that is dear for a low rank costs as dear in favour; 1 point of favour ≈ 5 bạc at Tần (one morning Thỉnh an ≈ +4).
   2. the LOSS side of a head post (Chưởng sự cô cô / Nữ quan; Thủ lĩnh / Tổng quản thái giám):
      - the senior servant passed over resents it (lòng −envySenior);
      - the promoted one may grow PROUD (chance by nature, less if loyal): for proudMo months her loyalty drops each month
        (→ easier to bribe through the existing bribeServ formula, which reads loyalty), she lords it over the others (lòng −bully),
        and when loyalty is under leaveLoyal she may ask to serve a higher palace (card: raise her pay / demote her / let her go).
   3. NPC mistresses: same rules — the favour road when their purse is short; proud NPC servants leave for a higher palace with room.
   Co-op: s.coop servants skip pride/leave. Old saves: new fields (s.proud) are optional. Numbers in BAL.sp (one source). ================= */
Object.assign(BAL,{sp:{favPerBac:.2,favRef:4,favMin:3,favMax:30,favKeep:10,head:{maid:3,eunuch:2},
 proud:{tham:45,lanh:30,chuyen:30,nhat:10,trung:5},proudAvg:24,proudMo:6,proudLoy:3,bully:1,leaveCh:15,leaveLoyal:60,envySenior:5,
 keepMul:.5,keepMin:5,keepGain:6,keepMo:3,demoteLoy:15,demoteOthers:2,letOthers:2,
 k:1/* khắc a đề bạt takes (either road) */}});
function spQ(o){const q=typeof queenP==="function"?queenP():null;return q&&q!==o?q:null}
/* the favour road for mistress o and servant s: {ok,n,k,lbl,how,val} */
function spFav(o,s){const B=BAL.sp,pay=BAL.pay;const r=Math.min(7,Math.max(0,rkOf(o)));
 const n=cl(Math.round(dbCost(s)*pay[B.favRef]/pay[r]*B.favPerBac),B.favMin,B.favMax);const q=spQ(o);const k=q?"hh":"th";
 const lbl=k==="hh"?"Hoàng hậu quý ngươi":"Thái hậu quý ngươi",how=k==="hh"?"xin Hoàng hậu chuẩn":"xin Thái hậu chuẩn";
 let val;if(o===S)val=S[k]||0;else val=q?aff(q,o):(o.th||0);
 const ok=o===S?val>=n:val>=n+B.favKeep;return{ok,n,k,lbl,how,val,q}}
function spPayFav(o,fv){if(o===S){apply({[fv.k]:-fv.n});return}if(fv.q)affAdd(fv.q,o,-fv.n);else o.th=cl((o.th||0)-fv.n,-100,100)}
function spHead(s){return srk(s)>=BAL.sp.head[s.role]}
function spProudCh(s,shown){const B=BAL.sp;const b=shown&&!s.kn?B.proudAvg:qv(B.proud,s,B.proudAvg);return cl(Math.round(b-((s.loyal||50)-50)/5),3,70)}
function spProud(s){return !!(s&&s.proud&&s.proud>S.turn)}
function spSenior(o,s,r0){const L=(o.staff||[]).filter(x=>x!==s&&x.role===s.role&&srk(x)>=r0);L.sort((a,b)=>srk(b)-srk(a)||(b.age||0)-(a.age||0));return L[0]||null}
/* the Kèm part of the Đề bạt card (jaudit button) */
function spKemTxt(o,s){try{const B=BAL.sp;let t="";const sn=spSenior(o,s,srk(s));if(sn)t+=` · kèm: ${sn.name} bị vượt mặt: lòng -${B.envySenior}`;
 if(srk(s)+1>=B.head[s.role])t+=` · kèm: có thể sinh kiêu (${chanceW(spProudCh(s,true))}): ${B.proudMo} tháng lòng -${B.proudLoy} mỗi tháng, có khi xin đi`;return t}catch(e){return""}}
function spAfter(o,s,r0){const B=BAL.sp;const me=o===S;const sn=spSenior(o,s,r0);
 if(sn){sn.loyal=cl(sn.loyal-B.envySenior,0,100);if(me)log(`${sn.name} hầu lâu hơn mà bị ${s.name} vượt mặt, trong lòng không phục (lòng -${B.envySenior}).`)}
 if(spHead(s)&&!s.coop&&ag2Ch(s,spProudCh(s))){s.proud=S.turn+B.proudMo;if(me)log(`${s.name} từ khi lên ${srkName(s)} ra vẻ bề trên với kẻ hầu khác.`)}}
/* the two-road card (KIT: tsPanel + tsOpt option cards with Cần / Tốn / Được / Mất / Kèm, the same as every dialog choice) */
function spOpen(s){if(!S||!s||ownerOf(s)!==S)return;const nx=SRK[s.role][srk(s)+1];if(!nx)return;const c=dbCost(s),fv=spFav(S,s),od=dbOdds(S,s);
 const kem=[`kẻ hầu khác ghen tị (lòng -${BAL.dbEnvy})`];const both=spKemTxt(S,s).split(" · kèm: ").map(x=>x.trim()).filter(Boolean);/* shared Kèm of both roads: once, above the options (short option cards) */
 const duoc=[`${s.name} lên ${nx}`,`lòng +${BAL.dbGain}`];const go=road=>()=>{spend(BAL.sp.k);dbDo(S,s,road,true)};
 tsPanel({t:`Đề bạt ${s.name}`,who:pServ(s),h:`<p>Muốn ${s.name} lên <b>${nx}</b> thì phải qua Nội vụ phủ. Có hai đường: lót tay bằng bạc, hoặc ${fv.how} (mất chút thể diện với người).</p>${both.length&&typeof tsRows==="function"?tsRows(both.map(x=>["Kèm",x,"r"])):""}`,
  opts:[tsOpt({n:"Lót tay Nội vụ phủ",odds:od,fx:{bac:-c},need:[tsNeedBac(c)],duoc,mat:[`mất ${c} bạc`,`lòng -${BAL.dbFail}`],kem,go:go("bac")}),
   tsOpt({n:fv.k==="hh"?"Xin Hoàng hậu chuẩn":"Xin Thái hậu chuẩn",odds:od,fx:{[fv.k]:-fv.n},need:[{t:`${fv.lbl} ${fv.n} (có ${fv.val})`,ok:fv.ok}],duoc,mat:["lời xin mất",`lòng -${BAL.dbFail}`],kem,go:go("fav")})]});
 showModal()}
/* moving a servant to another mistress (NPC side and "Cho đi"): a higher palace with room, else back to Nội vụ phủ */
function spGoTo(o,s){const L=liveRivals(true).filter(v=>v!==o&&rkOf(v)>rkOf(o)&&!v.out&&(()=>{const c=capOf(v),h=hhHas(v),i=s.role==="maid"?0:1;return h[i]<c[i]})());
 return L.length?L.sort((a,b)=>rkOf(b)-rkOf(a))[0]:null}
function spMove(o,s,v){const i=(o.staff||[]).indexOf(s);if(i>=0)o.staff.splice(i,1);s.proud=0;if(v){v.staff=v.staff||[];s.rk=Math.min(srk(s),srkMax(v,s));v.staff.push(s)}}
/* AG-ALL-2 G6 / G10 (ONE CORE): a servant asks her master o to let her go — the three answers, built once: the player consort's card (spLeaveCard),
   an NPC master's choice (spAsk → mindPick, BAL.ag.stf2.lvW × her nết), and the maid player's own "Xin chủ cho đi hầu cung khác" (s = S). */
function spLvS(s){return s===S?{role:"maid",rk:S.srv.rk}:s}
function spLvLoy(s,n){if(s===S)apply({tin:n});else s.loyal=cl(s.loyal+n,0,100)}
function spLeaveOpts(o,s){const B=BAL.sp,x=spLvS(s),v=spGoTo(o,x);const me=o===S,rk=srk(x);const keep=Math.max(B.keepMin,Math.round(dbCost({role:x.role,rk:rk-1})*B.keepMul));
 const others=(o.staff||[]).filter(y=>y!==s);const nm=s===S?"ngươi":s.name;
 return [
  {id:"keep",n:"Tăng tiền thưởng, giữ lại",tag:"reward",keep,v,lock:(me?S.bac:(o.bac||0))<keep,go:()=>{if(me)apply({bac:-keep});else ap(o,{bac:-keep});spLvLoy(s,B.keepGain);
    if(s===S){apply({bac:keep});return `${o.name} tăng tiền thưởng giữ ngươi lại: Bạc +${keep}, Chủ tin +${B.keepGain}.`}s.bac=(s.bac||0)+keep;s.proud=Math.max(s.proud||0,S.turn)+B.keepMo;return me?`Ngươi tăng tiền thưởng giữ ${s.name} lại.`:""}},
  {id:"demote",n:"Giáng một bậc, giữ kỷ cương",tag:"punish",v,lock:rk<1,go:()=>{others.forEach(y=>y.loyal=cl(y.loyal+B.demoteOthers,0,100));spLvLoy(s,-B.demoteLoy);
    if(s===S){S.srv.rk=Math.max(0,S.srv.rk-1);return `${o.name} không cho đi, giáng ngươi xuống ${SRK.maid[S.srv.rk]}. Chủ tin -${B.demoteLoy}.`}s.rk=rk-1;s.proud=0;return me?`Ngươi giáng ${s.name} xuống ${srkName(s)}.`:""}},
  {id:"let",n:"Cho đi",tag:"work",v,go:()=>{others.forEach(y=>y.loyal=cl(y.loyal+B.letOthers,0,100));if(v&&typeof evA==="function")evA(v,o,BAL.ag.ev.one);
    if(s===S){srvReassign(`${o.name} cho ngươi đi${v?"":"; Nội vụ phủ chia ngươi về cung khác"}.`,v||undefined);return""}spMove(o,s,v);return me?`${s.name} rời cung ngươi${v?`, sang hầu ${tsNm(v)}`:", về Nội vụ phủ"}.`:""}}]}
/* s asks o: o = the player → her card; an NPC master → her own choice (loop on), else the old move (a higher palace with room, else nothing) */
function spAsk(o,s){if(!o||!s)return"";if(s===S)S.srv.lvCd=S.turn+BAL.ag.stf2.leave.cd;else s.lvCd=S.turn+BAL.ag.stf2.leave.cd;
 if(o===S){if(!S.dead&&!S.out&&!(typeof isSrv==="function"&&isSrv()))spLeaveCard(s);return""}
 if(!(window.agOn&&agOn()&&typeof mindPick==="function")&&s!==S){const v=spGoTo(o,s);if(v)spMove(o,s,v);return""}
 const W=BAL.ag.stf2.lvW,O=spLeaveOpts(o,s).filter(x=>!x.lock);const mw=t=>{try{return typeof agMW==="function"?agMW(o,t):1}catch(e){return 1}};
 const c=mindPick(O.map(x=>[x,(W[x.id]||0)*mw(x.tag)]),o)||O[O.length-1];try{const N=window.__stf2N=window.__stf2N||{};N["leave_"+c.id]=(N["leave_"+c.id]||0)+1}catch(e){}return c.go()||""}
function spLeaveCard(s){const B=BAL.sp;const O=spLeaveOpts(S,s);const [K,D,L]=O;const v=K.v,keep=K.keep;
 tsPanel({t:"Kẻ hầu xin đi",who:pServ(s),h:`<p>${s.name} thưa rằng ${v?`bên ${tsNm(v)} muốn có ${s.role==="maid"?"nàng":"hắn"} sang hầu`:"muốn xin về Nội vụ phủ"}, xin ${tsGoi()} cho đi.</p>`,
  opts:[tsOpt({n:K.n,fx:{},need:[tsNeedBac(keep)],duoc:[`lòng +${B.keepGain}`,"giữ người, giữ chức"],mat:[`mất ${keep} bạc`],kem:[`kiêu thêm ${B.keepMo} tháng`],go:()=>{const r=K.go();if(r)log(r)}}),
   tsOpt({n:D.n,duoc:["hết kiêu",`kẻ hầu khác lòng +${B.demoteOthers}`],mat:[`${s.name} xuống ${SRK[s.role][srk(s)-1]}`,`lòng -${B.demoteLoy}`],kem:[`lòng dưới ${BAL.loy.out} thì có khi bán mình cho cung khác`],go:()=>{const r=D.go();if(r)log(r)}}),
   tsOpt({n:L.n,duoc:[`kẻ hầu khác lòng +${B.letOthers}`,"bớt một miệng ăn"],mat:[`mất ${s.name}`],kem:v?[`${s.name} mang chuyện cung ngươi sang bên ${tsNm(v)} (người ấy nắm thêm 1 chứng cứ)`]:[],go:()=>{const r=L.go();if(r)log(r)}})]})}
/* monthly: pride runs its course for every household (hers and the NPCs'), after the merit promotions */
function spMonth(){let ev="";const B=BAL.sp;for(const o of consorts()){if(!o||o.dead||(o!==S&&!o.alive))continue;for(const s of (o.staff||[]).slice()){if(!s.proud||s.coop)continue;
 if(s.proud<=S.turn){s.proud=0;if(o===S)ev+=`${s.name} đã bớt kiêu. `;continue}
 s.loyal=cl(s.loyal-B.proudLoy,0,100);(o.staff||[]).forEach(x=>{if(x!==s)x.loyal=cl(x.loyal-B.bully,0,100)});
 if(s.loyal<B.leaveLoyal&&ag2Ch(s,B.leaveCh*(window.agOn&&agOn()?1+(B.leaveLoyal-s.loyal)/B.leaveLoyal:1))){const r=spAsk(o,s);if(r&&o!==S&&typeof mlSee==="function"&&mlSee(o))ev+=r}}}return ev}
(function(){if(typeof servRanks!=="function")return;const r0=servRanks;servRanks=function(){const ev=r0.apply(this,arguments);let e2="";try{e2=spMonth()}catch(e){console.error(e)}return (ev||"")+e2}})();
window.spFav=spFav;window.spOpen=spOpen;window.spMonth=spMonth;window.spAfter=spAfter;window.spKemTxt=spKemTxt;window.spPayFav=spPayFav;window.spLeaveCard=spLeaveCard;window.spLeaveOpts=spLeaveOpts;window.spAsk=spAsk;
