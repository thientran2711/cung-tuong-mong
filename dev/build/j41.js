/* ================= RA VÀO CUNG CẤM: who may enter which place, when; one rule for every character (her and every NPC) =================
   accessOf(p,k) -> {ok:true} | {ok:false,why,kind,ask}   kind: "rule" (rank / summons) | "hour" (closed) ; ask: "yk" xin yết kiến | "bk" xin bái kiến
   accRole(fn): a role hook, fn(p,k,ctx) returns a verdict object to decide, or null to fall through (a servant-player module plugs in here)
   accGrant(p,k): a pass for this buổi (summons, accepted request, successful sneak). */
const ACC_ROLE=[];
function accRole(fn){if(typeof fn==="function")ACC_ROLE.push(fn)}
function accGrant(p,k){p=p||S;p.acPass=p.acPass||{};p.acPass[k]=bkey()}
function accHas(p,k){const a=(p||S).acPass;return !!(a&&a[k]===bkey())}
function accHost(k){if(k==="kn")return rivals.find(v=>v.queen&&v.alive&&!v.out)||null;if(k&&k[0]==="r")return RV(+k.slice(1))||null;return null}
function accOwn(p,k){if(p===S)return k==="home"||(S.pal!=null&&palaceOf(S)===k);try{return palaceOf(p)===k}catch(e){return false}}
const ACC_DAY={tyv:1,vuon:1};
function accessOf(p,k){p=p||S;if(!k)return{ok:false,why:"cung trống",kind:"rule"};
 if(accOwn(p,k))return{ok:true};
 const ctx={b:S.buoi||0,r:rkOf(p),host:accHost(k)};
 for(const fn of ACC_ROLE){try{const v=fn(p,k,ctx);if(v)return v}catch(e){}}
 if(accHas(p,k))return{ok:true,pass:1};
 const b=ctx.b,r=ctx.r;
 if(k==="dtd"||k==="thu"){if(r>=4)return{ok:false,why:"cần xin yết kiến",kind:"rule",ask:"yk"};return{ok:false,why:"chỉ khi được triệu",kind:"rule"}}
 if(k==="kn"){if(!qOn()||r>=7)return{ok:true};if(b===0||r>=5)return{ok:true};return{ok:false,why:"chỉ sáng thỉnh an",kind:"rule",ask:"bk"}}
 if(k==="tn"){if(S.thDead)return{ok:true};if(r<2)return{ok:false,why:"cần phẩm Quý nhân",kind:"rule"};if(b===0)return{ok:true};return{ok:false,why:"chỉ sáng thỉnh an",kind:"rule"}}
 if(k[0]==="r"){const h=ctx.host;if(!h||!h.alive||h.out)return{ok:true};const hr=rkOf(h);if(r>=hr-1)return{ok:true};return{ok:false,why:`cần phẩm ${RANKS[Math.max(0,hr-1)].n}`,kind:"rule",ask:"bk"}}
 if(ACC_DAY[k]){if(b<B4L)return{ok:true};return{ok:false,why:"đóng cửa tối",kind:"hour"}}
 return{ok:true}}
/* the odds and prices (her side; an NPC module may call the same) */
function accSneakO(k,a){a=a||S;const base=k==="dtd"?25:k==="thu"?30:k==="tn"||k==="kn"?35:k[0]==="r"?45:55;return odA(a,base+(a.tamco||0)/5+(a.mat||0)*3)}
function accAskO(k,a){a=a||S;if(k==="dtd"||k==="thu"){let o=45+(rkOf(a)-4)*8+mm()+(a.sung||0)/5;if(has("chamchinh")&&k==="thu")o-=10;if(has("datinh")&&k==="dtd")o+=8;return odA(a,o)}
 const h=accHost(k);return odA(a,40+(h?aff(h,a)/2+(rkOf(a)-rkOf(h))*8:0))}
function accName(k){try{return k==="home"?palName("home"):(typeof palName==="function"&&(PLNAME[k]||k[0]==="r")?palName(k):placeOf(k).n)}catch(e){return placeOf(k).n}}
/* the full state of a map place for her right now: grey reason (access first, then khắc / confinement) */
function accState(k){if(!S||!k)return{why:""};if(S.place===k)return{why:"",here:1};
 if(S.out)return{why:"đang ở lãnh cung"};if(S.confined)return{why:`cấm túc ${S.confined} tháng`};
 const a=accessOf(S,k);const tc=k==="home"?0:travel(S.place,k);
 if(!a.ok){const st={why:a.why,kind:a.kind,ask:a.ask,tc};st.sneakOk=can(tc+2);if(a.ask==="yk")st.empAway=(S.where||{}).emp!==k;st.askOk=can(1)&&!st.empAway;return st}
 if(k!=="home"&&!walkOk(tc))return{why:walkWhy(tc)};
 return{why:"",tc}}
function accSneakLine(k,tc){return `${word(accSneakO(k))} · tốn: ${tc+1} khắc · thành: vào được buổi này · hỏng: Danh -8, bị phạt`}
function accAskLine(k){return `${word(accAskO(k))} · tốn: 1 khắc · thành: được vào buổi này · hỏng: không mất gì thêm`}
/* small kit buttons for the map hotspot: name + odds chip + price */
function accMini(k,st,risk){const L=[];
 if(st.ask&&st.ask==="yk")L.push(`<button class="acb" data-acask="${k}" ${st.askOk?"":"disabled"}>Xin yết kiến ${st.empAway?'<i>ngài vắng</i>':oddsChip(word(accAskO(k)))+'<i>1 khắc</i>'}</button>`);
 if(st.ask==="bk")L.push(`<button class="acb" data-acask="${k}" ${st.askOk?"":"disabled"}>Xin bái kiến ${oddsChip(word(accAskO(k)))}<i>1 khắc</i></button>`);
 if(st.kind)L.push(`<button class="acb" data-acsneak="${k}" ${st.sneakOk?"":"disabled"}>Lẻn vào ${oddsChip(word(accSneakO(k)))}<i>${st.tc+1} khắc${risk?" · bắt: Danh -8":""}</i></button>`);
 return L.length?`<span class="macts">${L.join("")}</span>`:""}
/* full kit buttons (Danh sách, cards) */
function accBtns(k,st){const L=[];
 if(st.ask==="yk")L.push(pbtn(`class="btn" data-acask="${k}"`,"Xin yết kiến",accAskLine(k),st.askWhy||(st.empAway?"Hoàng thượng không có ở đây":!can(1)?"hết khắc":"")));
 if(st.ask==="bk")L.push(pbtn(`class="btn" data-acask="${k}"`,"Xin bái kiến",accAskLine(k),!can(1)?"hết khắc":""));
 if(st.kind)L.push(pbtn(`class="btn" data-acsneak="${k}"`,"Lẻn vào",accSneakLine(k,st.tc),st.sneakOk?"":"không đủ khắc"));
 return L.join("")}
/* acts */
function accSneak(k){if(!S||S.dead||Q.length||S.out||S.confined)return;const tc=travel(S.place,k);if(!can(tc+2))return;const nm=accName(k);const o=accSneakO(k);spend(1);
 if(roll(o)){accGrant(S,k);log(`Lẻn vào ${nm} trót lọt.`);window.__accSilent=0;goTo(k);if(S.place!==k)render();return}
 spend(tc);apply({danh:-8});log(`<span class="r">Lẻn vào ${nm}, bị thị vệ bắt được: Danh -8.</span>`);punish(S,`tự tiện lẻn vào ${nm}`,1);
 Q.push({t:"Bị bắt",h:`<p>Thị vệ ${nm} bắt được ngươi ở cửa hông. Chuyện truyền khắp lục cung.</p><p class="r">Danh -8 · ${S.confined?`cấm túc ${S.confined} tháng`:"bị phạt"}</p>`});showModal();render()}
function accAsk(k){if(!S||S.dead||Q.length||!can(1))return;const st=accState(k);if(!st.ask||st.empAway)return;const nm=accName(k);const o=accAskO(k);spend(1);
 if(roll(o)){accGrant(S,k);log(`Xin vào ${nm}: được cho vào buổi này.`);Q.push({t:st.ask==="yk"?"Được yết kiến":"Được mời vào",h:`<p>${st.ask==="yk"?"Thái giám truyền khẩu dụ: Hoàng thượng cho ngươi vào.":"Cung nữ ra cửa mời ngươi vào."}</p><p class="g">Được vào ${nm} buổi này.</p>`});}
 else{log(`Xin vào ${nm}: bị từ chối.`);Q.push({t:"Bị từ chối",h:`<p>${st.ask==="yk"?`Thái giám ra cửa: “Hoàng thượng đang ${S.emp.mood>=2?"không vui":"bận"}, ${kSay({srv:"m"},S,"{goi}")} xin hồi cung.”`:"Cung nữ ra cửa: “Chủ tử nhà nô tỳ không tiện tiếp.”"}</p>`})}
 showModal();render()}
document.addEventListener("click",e=>{const s=e.target.closest("[data-acsneak]");if(s){e.preventDefault();e.stopImmediatePropagation();if(!s.disabled)accSneak(s.dataset.acsneak);return}
 const a=e.target.closest("[data-acask]");if(a){e.preventDefault();e.stopImmediatePropagation();if(!a.disabled)accAsk(a.dataset.acask);return}
 const i=e.target.closest("[data-acinfo]");if(i){e.preventDefault();e.stopImmediatePropagation();accInfo();return}
 const g=e.target.closest(".agrey");if(g){e.preventDefault();e.stopImmediatePropagation()}},true);
/* the gate on goTo: barred places are never entered silently; a tap from elsewhere shows the card with the ways in */
(function(){const g0=goTo;goTo=function(k){if(!S||k===S.place||k==="home"||window.__accStay)return g0.apply(this,arguments);
 const a=accessOf(S,k);if(!a.ok){if(S.place==="home"&&(!S.visit||S.visit.k!=="home"))S.visit={k:"home",people:homePeople(),talked:false,tk:{}};
  if(!window.__accSilent&&!S.dead&&!Q.length&&!S.out&&!S.confined){const st=accState(k);const opts=[];
   if(st.ask&&!st.empAway)opts.push({n:st.ask==="yk"?"Xin yết kiến":"Xin bái kiến",fx:{},x:accAskLine(k),go:()=>setTimeout(()=>accAsk(k),0)});
   if(st.kind&&st.sneakOk)opts.push({n:"Lẻn vào",fx:{},x:accSneakLine(k,st.tc),go:()=>setTimeout(()=>accSneak(k),0)});
   opts.push({n:"Thôi",fx:{},x:""});Q.push({t:accName(k),h:`<p>Không vào được lúc này: <b>${a.why}</b>.</p>${st.kind&&!st.sneakOk?`<p class="past">Lẻn vào: ${typeof j77Bound==="function"?j77Bound(st.tc+2):`không đủ khắc (cần ${st.tc+2})`}.</p>`:""}`,opts});showModal()}
  return}
 const prev=S.place;const r=g0.apply(this,arguments);
 try{if(k==="lc"&&S.place==="lc"&&prev!=="lc"&&!S.out){apply({danh:-2});log("Bị thấy lui tới Trường Môn viện: Danh -2.");if(S.visit)S.visit.msg=(S.visit.msg?S.visit.msg+" ":"")+"Có người thấy ngươi ở lãnh cung: Danh -2."}}catch(e){}
 return r}})();
/* the new buổi re-enters her place quietly (a closed place sends her home without a card) */
/* owner 11/15 06:35Z: the new buổi starts AT her place (S.place stays) with the new occupants — the gate is not asked again (she is
   already inside); only a real reason moves her (night / week end, cấm túc, lãnh cung, a summons), and then a line says why */
(function(){const n0=nextBuoi;nextBuoi=function(){window.__accSilent=1;window.__accStay=1;const k=S&&S.place,b=S&&(S.buoi||0);try{return n0.apply(this,arguments)}finally{window.__accSilent=0;window.__accStay=0;
 try{if(S&&!S.dead&&k&&k!=="home"&&b<(typeof B4L==="number"?B4L:2)&&(S.buoi||0)===b+1&&S.place!==k&&S.visit){const why=S.out?"ngươi bị đày vào lãnh cung":S.confined?"ngươi đang bị cấm túc":"";
  if(why){const nm=typeof accName==="function"?accName(k):k;S.visit.msg=(S.visit.msg?S.visit.msg+" ":"")+`Không ở lại ${nm} được: ${why}.`;log(`Rời ${nm}: ${why}.`);if(typeof render==="function")render()}}}catch(e){}}}})();
/* a summons from the Thái hậu is a pass to Đức Thọ cung this buổi */
(function(){const c0=chooseM;chooseM=function(i){try{const m=Q[0];if(m&&/triệu/i.test(m.t||"")&&m.opts&&m.opts[i]&&/^Đến/.test(m.opts[i].n)){if(/Thái hậu/.test(m.t))accGrant(S,"tn");if(/Hoàng thượng/.test(m.t)){accGrant(S,"dtd");accGrant(S,"thu")}if(/Hoàng hậu/.test(m.t))accGrant(S,"kn")}}catch(e){}return c0.apply(this,arguments)}})();
/* NPC movement keeps the same rule: a consort barred from a place stays in her own palace */
(function(){const pw=placeWhere;placeWhere=function(){const r=pw.apply(this,arguments);try{const W=S.where||{};for(const v of rivals){if(!v.alive||v.out)continue;const k=W[v.id];if(!k||k==="home"||k[0]==="r")continue;if(!accessOf(v,k).ok)W[v.id]=palaceOf(v)}}catch(e){}return r}})();
/* person-card buttons that would walk into a barred place carry the reason, disabled */
function accDis(html,k){if(!html||!k||!S||S.place===k)return html;const a=accessOf(S,k);if(a.ok||/<button[^>]* disabled/.test(html))return html;return html.replace("<button ","<button disabled ").replace("<small>",`<small><span class="kwhy">${a.why}</span> `)}
(function(){if(typeof seeBtn==="function"){const s0=seeBtn;seeBtn=function(v){const h=s0.apply(this,arguments);try{return accDis(h,whereOf(v))}catch(e){return h}}}
 if(typeof visitBtn==="function"){const v0=visitBtn;visitBtn=function(v){const h=v0.apply(this,arguments);try{return accDis(h,palaceOf(v))}catch(e){return h}}}})();
/* THE MAP: a place she cannot enter now keeps the kit map label + a lock mark; the reason and the ways in live in the option card (j77Card) */
function accSpot(all,cls,k,attrs,inner){const st=accState(k);if(st.here||!st.why)return all;
 attrs=attrs.replace(/\sdisabled/g,"").replace(/title="([^"]*)"/,(m,t)=>`title="${t.replace(/ · (hết khắc|đang cấm túc[^·"]*|đang ở lãnh cung)/,"")} · ${st.why}"`);
 /* KIT map-label rule (owner 11/15 "map grey box"): a locked place wears the SAME label as every place (name + "N bóng") plus a small lock
    mark; no grey box over the map art, no reason line, no buttons on the map — a tap opens the kit option card (j77Card: reason, Xin yết
    kiến / bái kiến, Lẻn vào with odds and khắc) */
 /* owner-bug 16/11 18:30Z "chỗ nào cũng khóa hết" (review/dudo-lock): the lock mark means a RULE keeps her out (accessOf fails: st.kind;
    cấm túc / lãnh cung). A place that is open but farther than the khắc left this buổi is NOT locked: walk spill takes her there next
    buổi (card "Đi (đến nơi vào buổi sau)"), so its label stays the plain label with the red "đi N khắc" — no lock mark. */
 const lock=!st.walk;
 if(lock)inner=inner.replace(/(<span class="mlab">[\s\S]*?)(<\/span>)/,`$1${ACC_LOCK}$2`);
 return `<div class="mspot${cls.replace(/\soff/g,"")} off ${lock?"agrey":"awalk"}" data-ak="${k}"${attrs} aria-label="${accName(k)}: ${st.why}">${inner}</div>`}
const ACC_LOCK=`<svg class="mlock" viewBox="0 0 12 14" width="10" height="12" aria-hidden="true"><path d="M3 6V4.2a3 3 0 0 1 6 0V6" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="1.5" y="6" width="9" height="7" rx="1.5" fill="currentColor"/></svg>`;
(function(){const m0=mapHTML;mapHTML=function(){let h=m0.apply(this,arguments);if(window.__mapList)return h;
 try{h=h.replace(/<button class="mspot([^"]*)" data-go="([^"]+)"([^>]*)>([\s\S]*?)<\/button>/g,(all,cls,k,attrs,inner)=>accSpot(all,cls,k,attrs,inner));
  h=h.replace('<button class="btn mz" data-maplist="1">','<button class="btn mz" data-acinfo="1" aria-label="Ra vào cung cấm">ⓘ Ra vào</button><button class="btn mz" data-maplist="1">')}catch(e){}
 return h}})();
/* THE LIST: the same grey tiles */
(function(){const g0=mapHTMLgrid;mapHTMLgrid=function(){let h=g0.apply(this,arguments);
 try{h=h.replace(/<button class="mtile" data-go="([^"]+)"([^>]*)>([\s\S]*?)<\/button>/g,(all,k,attrs,inner)=>{const st=accState(k);if(st.here)return all.replace('class="mtile"','class="mtile ahere"');if(!st.why)return all;
   inner=inner.replace(/<span class="mchip">[^<]*<\/span>/g,"");inner=inner.replace('<span class="mband">',`<span class="mband"><span class="mchip agw">${st.why}</span>`);
   const acts=st.kind?`<span class="tacts">${accMini(k,st,1).replace(/<\/?span class="macts">/g,"")}</span>`:"";
   return `<div class="mtile ${st.walk?"awalk":"agrey"}" data-ak="${k}"${attrs.replace(/\sdisabled/g,"")}>${inner}${acts}</div>`}); /* awalk: open, only farther than the khắc left (walk spill) — not greyed as locked (review/dudo-lock) */
  h=h.replace('<div class="pmap">',`<div class="ph"><button class="btn" data-acinfo="1">ⓘ Ra vào cung cấm<small>ai được vào đâu, lúc nào</small></button></div><div class="pmap">`)}catch(e){}
 return h}})();
/* TRA CỨU: Ra vào cung cấm */
function accInfo(){if(!S||Q.length)return;const R=n=>`<b>${n}</b>`;
 Q.push({t:"Ra vào cung cấm",h:`<div class="acinfo"><p>Một luật cho mọi người trong cung, cả phi tần khác.</p>
 <p>${R("Dưỡng Hòa điện, Cần Chính điện")}: khi được triệu. Từ Phi: xin yết kiến (được cho vào: ${word(accAskO("dtd"))}).</p>
 <p>${R("Càn Ninh cung")}: sáng thỉnh an, ai cũng vào. Lúc khác: được mời, hoặc từ Quý phi.</p>
 <p>${R("Đức Thọ cung")}: sáng thỉnh an, từ Quý nhân. Thấp hơn: khi Thái hậu triệu.</p>
 <p>${R("Cung phi tần khác")}: phẩm ngươi không thấp hơn chủ cung quá một bậc, hoặc được mời.</p>
 <p>${R("Thái y viện, Ngự hoa viên")}: sáng, trưa, chiều. Tối đóng cửa.</p>
 <p>${R("Kính sự phòng")}: phi tần nào cũng vào. ${R("Trường Môn viện")}: ai cũng vào, bị thấy: Danh -2.</p>
 <p>${R("Cung của ngươi")}: luôn vào được.</p>
 <p>Chỗ có dấu khóa: không vào được lúc này. <b>Lẻn vào</b>: tốn khắc, bị bắt Danh -8 và bị phạt.</p></div>`,btn:"Đã rõ"});showModal()}
/* look: the same label as every place + a lock mark (no grey box) */
(function(){const st=document.createElement("style");st.textContent=`
.mspot.agrey,.mspot.awalk{cursor:pointer;pointer-events:auto}
.mspot.agrey .mlab{opacity:1!important}
/* owner 16/11 "chỗ không đủ khắc thì cho nút màu xám" (review/map-labels-2): ONE kit state for an open place that is farther than the khắc left (.awalk): the same label, greyed; still tappable (walk spill). Map label + Danh sách tile both. Real rule locks (.agrey) keep the normal label + lock mark. */
.mspot.awalk .mlab{background:#d3d0c6f5;color:#6e6c63;border-color:#a9a698;box-shadow:0 1px 3px #3a2a1e40}.mspot.awalk .mlab i{background:#c2bfb3;color:#6e6c63}.mspot.awalk .mlab em{color:#8a3a2c}.mspot.awalk .mres{filter:grayscale(1);opacity:.75}
.mspot .mlab .mlock{flex:none;display:block;margin-left:0;opacity:1;color:#6b4a1c}.mspot .mlab .kmlock{flex:none}
.mspot .mwhy{display:block;background:#2b2b28d9;color:#c9c9c0;font-size:.55rem;line-height:1.2;border-radius:6px;padding:0 5px;margin-top:1px;white-space:nowrap;pointer-events:none}
.mspot.sm .mwhy{font-size:.5rem;padding:0 3px}
.mspot .macts{display:flex;flex-direction:column;gap:2px;margin-top:2px;align-items:center;z-index:3}
.mspot .acb,.mtile .acb{font:600 .55rem/1.2 var(--body);background:#3a2a1ee6;color:#ffe7b0;border:1px solid #c9a35a;border-radius:8px;padding:1px 5px;white-space:nowrap;cursor:pointer;display:inline-flex;align-items:center;gap:3px;min-height:20px}
.mspot .acb .oc,.mtile .acb .oc{font-size:.5rem;padding:0 4px;line-height:1.2}
.mspot .acb i,.mtile .acb i{font-style:normal;color:#f3e6cf;font-weight:400}
.mspot .acb:disabled,.mtile .acb:disabled{opacity:.5;cursor:default;filter:grayscale(1)}
/* kv3:.kv1 */:where(.kv1) .mspot .mwhy{font-size:.5rem}:where(.kv1) .mspot .acb,:where(.kv1) .mtile .acb{font-size:.5rem;min-height:18px}
.mtile.awalk{cursor:pointer;background-color:#6d6d68!important;background-blend-mode:luminosity;border-color:#77776f}.mtile.awalk .mband{filter:grayscale(1);opacity:.8}
.mtile.agrey{background-color:#6d6d68!important;background-blend-mode:luminosity;cursor:default;border-color:#77776f}
.mtile.agrey .mband{filter:grayscale(1);opacity:.8}
.mtile .mchip.agw{background:#3a3a36;color:#d8d8cf;border:1px solid #77776f}
.mtile:disabled:not(.ahere){filter:grayscale(1)}
.mtile.ahere:disabled{opacity:1}
.mtile .tacts{display:flex;flex-wrap:wrap;gap:3px;padding:3px 4px 4px;width:100%;background:#1a0e08ee}
.mtile .tacts{flex-direction:column;align-items:stretch}.mtile .tacts .acb{white-space:normal;justify-content:flex-start;flex-wrap:wrap;font-size:.6rem;min-height:26px;text-align:left}
.acinfo p{margin:.2em 0;font-size:.85rem;line-height:1.35}
`;document.head.appendChild(st)})();
