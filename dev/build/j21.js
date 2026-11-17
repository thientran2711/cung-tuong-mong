/* ================= WHAT SHE KNOWS: info acts show the facts, keep them, relation view in words ================= */
function kn(){S.kf=S.kf||{};S.notes=S.notes||{};S.met=S.met||{};return S}
function noteAdd(id,t){kn();const L=S.notes[id]=S.notes[id]||[];L.unshift(`T${S.month}/${S.year} ${TUAN[S.tuan]}: ${t}`);if(L.length>6)L.length=6}
function agoW(w){const d=wk()-w;return d<=0?"tuần này":d===1?"tuần trước":`${d} tuần trước`}
/* the favour book: true values; a weak look shows only the top 3 */
function favorBook(full){kn();const P=consorts().filter(p=>!p.out).sort((a,b)=>b.sung-a.sung);const L=full?P:P.slice(0,3);const m0=S.turn*3;
 const last=P.map(p=>[p,Math.max(-1,...(p.nightLog||[]))]).sort((a,b)=>b[1]-a[1])[0];
 const rows=L.map(p=>{const n=(p.nightLog||[]).filter(w=>w>=m0).length;if(p!==S){S.kf[p.id]={s:p.sung,n,w:wk()};noteAdd(p.id,`Sủng ${p.sung}, ${n} đêm tháng này${p.preg&&!p.hidden?", có thai":""}`)}
  return `<div class="fbrow">${mdH(p===S?pMe():pv(p),"xs")}<b>${p===S?"Ngươi":p.name}</b><span class="past">${rkName(p)}</span><span class="ef g">Sủng ${p.sung}</span><span class="ef n">${n} đêm tháng này</span>${p.preg&&!p.hidden?'<span class="ef r">có thai</span>':""}</div>`}).join("");
 return `<div class="fbook"><b>Sổ thị tẩm${full?"":" (chỉ xem lướt được 3 người đầu)"}:</b>${rows}${last&&last[1]>=0?`<p class="past">Lần lật thẻ gần nhất: ${last[0]===S?"ngươi":last[0].name} (${agoW(last[1])}).</p>`:""}</div>`}
/* Kính sự phòng: the book is shown, not just 'thành' */
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);if(p&&p.kind==="ksp"){const i=A.findIndex(a=>a.n==="Xem sổ thị tẩm");if(i>=0)A[i]=Object.assign({},A[i],{go:null,run:()=>favorBook(true),x:"thấy Sủng và số đêm của từng người"})}return A}})();
(function(){const c0=courtAct;courtAct=function(a,k){if(a==="hoi"&&k==="ksp"&&S.court&&!S.dead&&!Q.length&&can(2)){spend(2);S.court.ksp.af.me=(S.court.ksp.af.me||0)+BAL.eff.j21.meTop;const full=roll(60);Q.unshift({t:"Thái giám Kính sự phòng kể",who:pEunCourt("ksp"),h:favorBook(full)});log(`Hỏi Kính sự phòng: ${full?"xem trọn sổ thị tẩm":"chỉ nghe được 3 người đầu"}.`);showModal();render();return}return c0.apply(this,arguments)}})();
/* every talk result also shows what was learned (the lines it logged) */
(function(){const t1=talk;talk=function(oi){const b=S?S.logSeq||0:0;const p=S&&curPeople()[popIdx];const r=t1.apply(this,arguments);try{if(p&&p.ref&&p.ref.id!=null){kn();S.met[p.ref.id]=wk()}const n=(S.logSeq||0)-b;if(n>0&&popMsg){const L=S.logs.slice(0,n).map(plain).filter(x=>!/^[^.]{1,40}\. (Thành|Hỏng)\./.test(x)&&!popMsg.includes(x));if(L.length)popMsg+=`<br><span class="past">${L.join(" ")}</span>`;renderStage()}}catch(e){}return r}})();
/* acting on someone means having met her */
(function(){const d0=doAct;doAct=function(i,k){const v=rivals[i];if(v){kn();S.met[v.id]=wk();if(k==="spy"){const e0=v.ev;const r=d0.apply(this,arguments);if(v.ev>e0)noteAdd(v.id,`dò la được thêm ${v.ev-e0} chứng cứ (nay ${v.ev}); Sủng ${v.sung}`);S.kf[v.id]={s:v.sung,n:(v.nightLog||[]).filter(w=>w>=S.turn*3).length,w:wk()};return r}}return d0.apply(this,arguments)}})();
/* ladder words for feelings */
function affW(v){return quyW(v)}/* ONE CORE: the VANPHONG "quý" word (jhc quyW, BAL.quyLv); was its own 7-word ladder with Thù / Lạnh nhạt / Thân */
/* (ONE CORE: dead second oán ladder 10/30/60 removed; the live one is jhc window.oanW on BAL.oanLv) */
function fbar(v,lo,hi,good){const pc=cl((v-lo)/(hi-lo)*100,0,100);return `<span class="fbar"><u class="${good?"g":"r"}" style="width:${pc}%"></u></span>`}
function feel(a,o){return a==null?`<span class="ef n">chưa rõ</span>`:`<span class="ef ${a>BAL.quyLv[2]?"g":a<BAL.quyLv[1]?"r":"n"}">${affW(a)} · ${a>0?"+":""}${a}</span>${fbar(a,-100,100,a>=0)} <span class="ef ${o>=30?"r":o>10?"r":"n"}">${oanW(o)} · ${Math.round(o)}</span>${fbar(o,0,100,false)}`}
function pron(p){return p==="emp"?"ngài":p==="th"?"người":"nàng"}
function knows(v){kn();return v===S||S.met[v.id]!=null||sameHouse(S,v)||(v.ev||0)>0||eyes(S)>=4}
function relLines(v){return [`<span class="rlab">Ngươi với ${pron(v)}:</span> ${feel(aff(S,v),oan(S,v))}`,`<span class="rlab">${pron(v)[0].toUpperCase()+pron(v).slice(1)} với ngươi:</span> ${knows(v)?feel(aff(v,S),oan(v,S)):feel(null)}`]}
function favLine(v){kn();const k=S.kf[v.id];return k?`${ic("sung",14)}Sủng ${k.s} <span class="past">(biết ${agoW(k.w)})</span>`:`${ic("sung",14)}Sủng: <span class="past">chưa rõ (xem sổ thị tẩm)</span>`}
function notesLine(v){kn();const L=S.notes[v.id]||[];return L.length?`<span class="past">Đã biết: ${L.slice(0,2).join(" · ")}</span>`:""}
/* the relation tab, one kit piece */
function relHTML(){kn();const P=consorts();const sel=relSel==="emp"||relSel==="th"?relSel:(byKey(relSel)||S);
 const chips=[["me","Ngươi",pMe()]].concat(liveRivals(true).map(v=>[v.id,v.name,pv(v)]),[["emp","Hoàng thượng",pEmp()]],S.thDead?[]:[["th","Thái hậu",pTH()]]);
 let h=`<div class="relsel"><span class="past">Xem quan hệ của:</span>${chips.map(([k,n,f])=>`<button data-rel="${k}" aria-pressed="${String(k)===String(relSel)}">${mdH(f,"xs")}${n}</button>`).join("")}</div><p class="past rleg">Thiện cảm: càng cao càng quý mến · Oán: càng cao càng thù.</p>`;
 const row=(f,name,rank,lines)=>`<div class="rrow2">${mdH(f,"sm")}<div><b>${name}</b> <span class="past">${rank}</span>${lines.map(l=>`<div class="rl">${l}</div>`).join("")}</div></div>`;
 if(sel==="emp"){return h+row(pEmp(),"Hoàng thượng",empName(),[`<span class="rlab">Với ngươi:</span> <span class="ef g">Sủng ${S.sung}</span>${fbar(S.sung,0,100,true)} <span class="ef g">Ân tình ${S.an||0}</span>${fbar(S.an||0,0,100,true)}`])+liveRivals(true).map(v=>row(pv(v),v.name,rkName(v),[`<span class="rlab">Ngài với nàng:</span> ${favLine(v)}`])).join("")}
 if(sel==="th"){return h+row(pTH(),"Thái hậu","",[`<span class="rlab">Người với ngươi:</span> <span class="ef ${S.th>=0?"g":"r"}">Thương ${S.th}</span>${fbar(S.th,-100,100,S.th>=0)}`])+liveRivals(true).map(v=>row(pv(v),v.name,rkName(v),[`<span class="rlab">Người với nàng:</span> ${knows(v)?`<span class="ef ${v.th>=0?"g":"r"}">Thương ${v.th||0}</span>`:'<span class="ef n">chưa rõ</span>'}`])).join("")}
 if(sel===S){return h+row(pEmp(),"Hoàng thượng","",[`<span class="rlab">Ngài với ngươi:</span> <span class="ef g">Sủng ${S.sung}</span>${fbar(S.sung,0,100,true)} <span class="ef g">Ân tình ${S.an||0}</span>`])+(S.thDead?"":row(pTH(),"Thái hậu","",[`<span class="rlab">Người với ngươi:</span> <span class="ef ${S.th>=0?"g":"r"}">Thương ${S.th}</span>${fbar(S.th,-100,100,S.th>=0)}`]))+P.filter(p=>p!==S).map(v=>row(pv(v),v.name+(sameHouse(S,v)?" · cùng cung":""),rkName(v),relLines(v).concat([notesLine(v),`<span class="pcb">${seeBtn(v)}</span>`].filter(Boolean)))).join("")}
 if(!knows(sel))return h+`<p class="past">Ngươi chưa gặp ${sel.name}, chưa rõ nàng đối với người khác ra sao. Gặp nàng, dò la, hoặc có thêm tai mắt.</p>`;
 return h+P.filter(p=>p!==sel).map(p=>row(p===S?pMe():pv(p),p===S?"Ngươi":p.name,rkName(p),[`<span class="rlab">${sel.name} với ${p===S?"ngươi":"nàng"}:</span> ${feel(aff(sel,p),oan(sel,p))}`])).join("")}
/* ===== ONE TAP TO A PERSON; the map shows who she can know is there ===== */
/* fog: she knows where someone is only if she saw her there this buổi or her eyes reported it this buổi */
function bkey(){return wk()+"-"+(S.buoi||0)}
function seeLoc(v,k){kn();S.seenLoc=S.seenLoc||{};S.seenLoc[v.id]={k:k||whereOf(v),b:bkey()}}
function locKnown(v){const s=S.seenLoc&&S.seenLoc[v.id];return s&&s.b===bkey()&&s.k===whereOf(v)?s.k:null}
/* faces on the map only for the exceptions: her household, public schedules, and people seen/reported this buổi */
function seenAt(k){const W=S.where||{},L=[];if(W.emp===k&&k==="dtd"&&((S.buoi||0)===B4L||(S.buoi||0)===1))L.push(pEmp());if(k==="tn"&&!S.thDead&&(S.buoi||0)===0)L.push(pTH());if(k==="home"){L.push(pMaid());S.kids.filter(x=>x.alive).forEach(x=>L.push(kidFace(x)))}
 for(const v of rivals)if(v.alive&&!v.out&&W[v.id]===k&&locKnown(v)===k)L.push(Object.assign(pv(v),{see:v.id}));return L}
function seenFaces(k){const L=seenAt(k),n=countAt(k);if(!n)return"";return `<span class="mfaces">${L.slice(0,5).map(f=>f.see!=null?`<i data-see="${f.see}">${mdH(f,"xs")}</i>`:mdH(f,"xs")).join("")}${n>L.length?`<span class="mq">+${n-L.length} chưa rõ</span>`:""}</span>`}
/* walk to a consort and open her card; if she has gone, say where, offer to follow */
function goSee(id){const v=rivals.find(x=>x.id===id);if(!v||S.dead||Q.length)return;const k=whereOf(v);
 const open=()=>{const i=curPeople().findIndex(p=>p.ref===v&&p.kind!=="chest");if(i>=0){popIdx=i;popMsg=""}else{const now=whereOf(v);S.visit.msg=`${v.name} vừa rời đi, sang ${placeName(now)}. <button class="btn" data-follow="${v.id}">Theo đến<small>${travel(S.place,now)} khắc</small></button>`}renderStage()};
 if(S.place===k){open();return}const tc=travel(S.place,k);if(S.confined||S.out)return;if(!walkOk(tc)){walkGo(k);return}goTo(k);open()}
function seeBtn(v){if(!v||v===S||!v.alive||v.out||together(S,v)||!locKnown(v))return"";const k=whereOf(v),tc=travel(S.place,k);const why=S.confined?"đang cấm túc":S.out?"đang ở lãnh cung":walkBlock(k,tc);
 return pbtn(`data-see="${v.id}" class="seeb"`,`Đến gặp ${v.name.split(" ").pop()}`,walkLate(k,tc)?`Chắc chắn · tốn: ${tc} khắc · thành: đến nơi buổi sau, có khi nàng đã đi chỗ khác`:`Chắc chắn · tốn: ${tc} khắc · thành: gặp mặt, mọi việc làm tại chỗ, dễ hơn sai người`,why)}
document.addEventListener("click",e=>{const s=e.target.closest("[data-see]");if(s&&!s.disabled){e.preventDefault();e.stopPropagation();goSee(+s.dataset.see);return}const f=e.target.closest("[data-follow]");if(f){e.preventDefault();e.stopPropagation();goSee(+f.dataset.follow)}},true);
/* finding someone: send her eyes (1 khắc), or invite her over */
function scoutBtn(v){if(!v||!v.alive||v.out||locKnown(v)||together(S,v))return"";const o=od(50+eyes(S)*8+S.tamco/10);return pbtn(`data-scout="${v.id}"`,"Sai tai mắt dò nơi ở",`${word(o)} · tốn: 1 khắc · thành: biết nàng ở đâu buổi này · hỏng: không dò ra`,whyTime(1))}
function inviteBtn(v){/* previews: placeWhere (the invite is answered there, relAdd BAL.eff.j21.top) */if(!v||!v.alive||v.out||sameHouse(S,v))return"";const pend=S.invite&&S.invite.id===v.id;const o=inviteO(S,v);return pbtn(`data-invite="${v.id}"`,"Mời đến cung ta",`${word(o)} · tốn: 1 khắc · thành: buổi sau nàng sang cung ngươi · hỏng: nàng từ chối, thiện cảm ${balSg(BAL.eff.j21.top)}`,pend?"đã mời, chờ buổi sau":whyTime(1)||(aff(v,S)<BAL.invite.hate?"nàng ghét ngươi, sẽ không đến":""))}
function scout(id){const v=rivals.find(x=>x.id===id);if(!v||!can(1)||S.dead||Q.length)return;spend(1);const o=od(50+eyes(S)*8+S.tamco/10);if(roll(o)){seeLoc(v);log(`Tai mắt báo: ${v.name} đang ở ${placeName(whereOf(v))} buổi này.`)}else log(`Tai mắt không dò ra ${v.name} ở đâu.`);render()}
/* ONE rule for every invitation (her button and an NPC host, AG-ALL-2e3 cx3:invite): the guest's odds of coming */
function inviteO(h,g){const I=BAL.invite;return od(I.base+aff(g,h)/I.affD+(rkOf(h)-rkOf(g))*I.rk)}
function invite(id){const v=rivals.find(x=>x.id===id);if(!v||!can(1)||S.dead||Q.length)return;spend(1);S.invite={id:v.id,o:inviteO(S,v)};log(`Ngươi sai người mời ${v.name} buổi sau sang cung.`);render()}
document.addEventListener("click",e=>{const s=e.target.closest("[data-scout]");if(s&&!s.disabled){e.stopPropagation();scout(+s.dataset.scout);return}const i=e.target.closest("[data-invite]");if(i&&!i.disabled){e.stopPropagation();invite(+i.dataset.invite)}},true);
/* invitations land when the next buổi's places are drawn; rivals may invite her too */
(function(){const pw=placeWhere;placeWhere=function(){pw.apply(this,arguments);try{if(S.invite){const v=rivals.find(x=>x.id===S.invite.id);const o=S.invite.o;S.invite=null;if(v&&v.alive&&!v.out&&!v.confined){if(roll(o)){S.where[v.id]="home";seeLoc(v,"home");log(`${v.name} nhận lời, sang cung ngươi buổi này.`)}else{relAdd(S,v,BAL.eff.j21.top);log(`${v.name} từ chối lời mời.`)}}}
  if(typeof p3InvLand==="function")p3InvLand();
  const f=liveRivals(true).filter(v=>aff(v,S)>=30&&!v.confined&&!sameHouse(S,v));if(!(typeof p3On==="function"&&p3On())&&f.length&&roll(4)){const v=pick(f);const k=palaceOf(v);S.where[v.id]=k;seeLoc(v,k);log(`${v.name} sai người mời ngươi sang cung nàng chơi buổi này.`)}}catch(e){}}})();
/* arriving somewhere reveals who is there */
(function(){const g=goTo;goTo=function(k){const r=g.apply(this,arguments);try{if(S.place===k)curPeople().forEach(p=>{if(p.ref&&p.kind!=="chest"&&p.ref.id!=null)seeLoc(p.ref,k)})}catch(e){}return r}})();
/* ===== visiting a consort at her own palace: chance she is home; her gatekeeper may tell where she went ===== */
function visitBtn(v){if(!v||!v.alive||v.out||sameHouse(S,v))return"";const k=palaceOf(v),tc=travel(S.place,k);if(S.place===k)return"";
 return pbtn(`data-visit="${v.id}"`,`Đến cung nàng thăm`,`Chắc chắn · tốn: ${tc} khắc · thành: ${walkLate(k,tc)?"đến nơi buổi sau, ":""}nếu nàng ở nhà thì gặp mặt · có khi nàng đi vắng`,S.confined?"đang cấm túc":S.out?"đang ở lãnh cung":walkBlock(k,tc))}
function visitPal(id){const v=rivals.find(x=>x.id===id);if(!v||S.dead||Q.length)return;const k=palaceOf(v),tc=travel(S.place,k);if(S.confined||S.out)return;if(!walkOk(tc)){walkGo(k);return}goTo(k);if(S.place!==k)return;
 const i=curPeople().findIndex(p=>p.ref===v&&p.kind!=="chest");
 if(i>=0){if(aff(v,S)<=-40){S.visit.tk=S.visit.tk||{};S.visit.tk[i]=1;S.visit.msg=`${v.name} cáo bệnh không tiếp ngươi (nàng ghét ngươi).`}else{popIdx=i;popMsg=""}}
 else{const now=whereOf(v);const friend=aff(v,S)>=20||(v.staff||[]).some(s=>s.spyFor==="me");if(friend){seeLoc(v,now);S.visit.msg=`Cung nữ gác cửa: “${kSay({srv:"f"},v,"{Goi}",{own:true})} sang ${placeName(now)} rồi.” <button class="btn" data-follow="${v.id}">Theo đến<small>${travel(S.place,now)} khắc</small></button>`}else S.visit.msg=`Cung nữ gác cửa: “${kSay({srv:"f"},v,"{Goi}",{own:true})} đi vắng.”`}
 renderStage()}
document.addEventListener("click",e=>{const s=e.target.closest("[data-visit]");if(s&&!s.disabled){e.stopPropagation();visitPal(+s.dataset.visit)}},true);
/* two-way: rivals call at her palace; if she is out, her maid tells or keeps quiet by loyalty */
(function(){const pw=placeWhere;placeWhere=function(){pw.apply(this,arguments);try{if(!S||S.out||!roll(4))return;const L=liveRivals(true).filter(v=>!v.confined&&!sameHouse(S,v));if(!L.length)return;const v=pick(L);
  if(S.place==="home"){S.where[v.id]="home";seeLoc(v,"home");log(`${v.name} sang cung ngươi thăm hỏi.`)}else if(S.maid){log(S.maid.loyal>=BAL.loy.mid?`${v.name} sang cung ngươi thăm, ngươi đi vắng; ${S.maid.name} không nói ngươi đi đâu.`:`${v.name} sang cung ngươi thăm, ngươi đi vắng; ${S.maid.name} lỡ miệng nói ngươi ở ${placeName(S.place)}.`)}}catch(e){}}})();
/* her own palace has its art too (night bedchamber; brighter by day) */
SCIMG.home="tam-cung-dem";
