/* ================= jnroadhp: QUESTLINE Q2 — the NPC side line as a process + two-way (QUESTLINES_AUDIT.md §3 H-a/H-d, §4 Q2) =================
   Builds on jnroad.js / jnroadm.js (NPC roads + the help hồi) without copying them; every number is in BAL.nroad (jbal2.js: fin, sb, hpMax).
   (a) HELP RECORD H-a: v.nr.hp = [[chapter, sign, turn]] — every help (+1) / betrayal (−1) she gave on that person's road (consorts, maids,
       eunuchs, men: every asker of a help hồi), saved with the person; v.nr.hpk / hpa = who asked (j72 key / actor) for the reward and the list.
   (b) When that person's next chapter (the one the help hồi decided) ends, the palace news line carries what her help did and a «Phụ tuyến»
       log line says it: «nhờ ngươi …» / «vì ngươi bán đứng …» (also «dù …» when the chapter went the other way).
   (c) FINALE: a person who wins the chapter that closes her road after the player's help on it (and no betrayal) remembers it: BAL.nroad.fin
       (her rank tier: Danh, the asker's bond, nợ ân). Nothing on a lost or drawn finale (OD:L1601 (4)).
   (d) STRIKE-BACK H-d (two-way, OD:L33): a betrayal is a FACT; the betrayed person learns it only through a real carrier, by the jagknow rules
       (her own Tai mắt oSee × BAL.ag.know.eye; one of her servants hears it (Nghe ngóng odds) and chooses to tell (knTell: lòng, nết); a servant
       of the player bought by her sells it (knTell sell); the rival who was told dislikes the player and lets it slip (the friend rule, by
       thiện cảm)), checked each month for BAL.nroad.sb.mo months. When it lands: oán BAL.nroad.sb.oan toward the player (a consort; hostility
       → her agent deeds aim at the player through jagent agSpite, no flat roll, OD:L1386) or the asker's bond − oan (servants, men). Death only
       through the existing paths. Until then the help line no longer claims she knows (real evidence, OD:L1109).
   (e) Mệnh truyện › «Phụ tuyến»: one kit skill card (kitSkillCard kind "story", the jreign rg/rgl pattern) + kit rows per line she has joined
       (S.nrpt snapshot, capped at BAL.nroad.hpMax, so a line stays listed after its person is gone).
   Old saves load (nr without hp → []); co-op host-only (nrGuest, the jnroad pattern); window.__nrhpoff = 1 switches all of it off. Kit only. */
function nhOff(){try{return !!window.__nrhpoff||(typeof nrGuest==="function"&&nrGuest())}catch(e){return true}}
const nhB=()=>BAL.nroad;
function nhHp(N){if(!N)return[];if(!Array.isArray(N.hp))N.hp=[];return N.hp}
function nhTier(){let i=0;for(const r of nhB().fin.rk)if((S.rank|0)>=r)i++;return i}
const nhAt=(a,i)=>a[Math.min(i,a.length-1)];
const nhCap=t=>t?t.charAt(0).toUpperCase()+t.slice(1):t;
/* ---------- the «Phụ tuyến» list snapshot ---------- */
function nhPt(){if(!Array.isArray(S.nrpt))S.nrpt=[];return S.nrpt}
function nhSnap(N,p,nm){try{const w=N&&N.hpk;if(!w)return null;const L=nhPt();let e=L.find(x=>x.w===w&&x.r===N.r);
 if(!e){e={w,r:N.r,o:N.o};L.push(e);while(L.length>Math.max(1,nhB().hpMax))L.shift()}
 const last=N.l.length?N.l[N.l.length-1]:null;let tag="";try{tag=N.e?nrFill(N.e,p):""}catch(x){}
 Object.assign(e,{nm:nm||e.nm||p&&p.name||"",he:nrHe(p),hp:nhHp(N).slice(),np:N.l.length,c:last?last[0]:0,k:last?last[1]:0,e:tag,x:N.x?1:0,sb:N.sb&&N.sb.k?1:0,f:N.fin?1:0,lt:S.turn});
 const h=N.hp.length?N.hp[N.hp.length-1][0]:0;const hr=N.l.find(z=>z[0]===h);e.hr=hr?hr[1]:null;return e}catch(x){console.error(x);return null}}
/* ---------- (a) the record + the betrayal fact ---------- */
(function(){if(typeof nrHelped!=="function")return;const h0=nrHelped;
 nrHelped=function(X,how){const r=h0.apply(this,arguments);try{if(nhOff()||!how)return r;const v=X&&X.A&&X.A.o;const N=v&&v.nr;if(!N)return r;
  const n=(X.p&&X.p.nn)||N.n;nhHp(N).push([n,how>0?1:-1,S.turn]);N.hpk=q72Key(X.A);N.hpa=[X.A.k,X.A.id];
  let out=r;if(how<0){const B=X.B;N.sb={t:S.turn,n,m:0,k:0,b:B?[B.k,B.id]:null,bn:B?B.n:""};const he=nrHe(v);
   out=` Chương «${nrChT(v)}» của ${he} thêm khó; ${he} chưa hay ai đã để lộ chuyện.`+nhTip(B,v)}
  nhSnap(N,v,X.A.n);return out}catch(e){console.error(e);return r}}})();
/* (a2) TWO-WAY / EQUAL VALUE (laws 1–2, review round 1): a betrayal IS help to the rival she told (X.B). When B has a road of her own, the
   tip is a record on B's road too — sign 2 «mách tin» (counts as help: B's chapter result line, B's finale reward BAL.nroad.fin, the
   «Phụ tuyến» list) — and B's next chapter gains BAL.nroad.help, the same bonus a help gives (nothing when B already carries one).
   B without a road (or her road closed): B owes the player BAL.nroad.fin.owe nợ ân at once (the j72 ledger, as a won finale gives), on top
   of the j72 bond B gets (BAL.nroad.relB). */
function nhTip(B,v){try{const o=B&&B.o,NB=o&&o.nr;if(!B||o===v)return"";
 if(!NB||NB.x||!NB.n){const ow=nhB().fin.owe||0;if(!ow||!o)return"";q72DebtAdd(B,ow);return ` ${B.n} nợ ngươi ${ow>1?ow+" ân":"một ân"} vì tin này.`}
 nhHp(NB).push([NB.n,2,S.turn]);NB.hpk=q72Key(B);NB.hpa=[B.k,B.id];if(!(NB.hb>0))NB.hb=(NB.hb||0)+nrB().help;nhSnap(NB,o,B.n);
 return ` ${B.n} có tin ngươi mách, chương «${nrChT(o)}» của ${nrHe(o)} thêm phần chắc.`}catch(e){console.error(e);return""}}
/* ---------- (b) + (c) chapter end ---------- */
const NHQ=[];/* lines of this month, logged after the palace news (nrMonth) */
function nhRes(s,k,he,t,c0){const c=c0||(t?`chương «${t}»`:"chương này");
 if(s===2)return k>0?`nhờ tin ngươi mách, ${he} qua được ${c}.`:k<0?`có tin ngươi mách, nhưng ${he} vẫn vấp ở ${c}.`:`có tin ngươi mách, ${he} giữ được thế ở ${c}, không thắng không thua.`;
 if(s>0)return k>0?`nhờ ngươi giúp một tay, ${he} qua được ${c}.`:k<0?`ngươi đã ra tay giúp, nhưng ${he} vẫn vấp ở ${c}.`:`có ngươi giúp, ${he} giữ được thế ở ${c}, không thắng không thua.`;
 return k<0?`vì ngươi bán đứng, ${he} thua ở ${c}.`:k>0?`dù ngươi bán đứng, ${he} vẫn vượt qua ${c}.`:`vì ngươi bán đứng, ${he} chỉ gỡ được nửa phần ở ${c}.`}
function nhFin(N,nm){const F=nhB().fin,i=nhTier(),d=nhAt(F.danh,i),rl=nhAt(F.rel,i),ow=F.owe||0;
 apply({danh:d});let a=null;try{a=N.hpa?q72A(N.hpa[0],N.hpa[1]):null}catch(e){}if(a){if(rl)q72Rel(a,rl);if(ow)q72DebtAdd(a,ow)}
 return[`Phụ tuyến · «${nrTitle(N.r)}»`,`${nm} đi trọn tuyến và nhớ công ngươi: Danh +${d}${a?`, thân thiết với ngươi hơn${ow?`, nợ ngươi ${ow>1?ow+" ân":"một ân"}`:""}`:""}.`,"g"]}
function nhAfter(p,r,nm){try{if(!r||!p||!p.nr||nhOff())return r;const N=p.nr,H=nhHp(N);if(!H.length)return r;const he=nrHe(p);
 const e=H.find(x=>x[0]===r.n);
 if(e&&N.hpr!==r.n){N.hpr=r.n;r.rc=(r.rc||"")+" "+nhCap(nhRes(e[1],r.k,he,""));r.hp=e[1];
  NHQ.push([`Phụ tuyến · ${nm} · «${nrTitle(N.r)}» chương ${r.n}`,nhRes(e[1],r.k,he,""),(e[1]>0)===(r.k>0)?(e[1]>0?"g":"r"):""])}
 if(N.x&&r.k>0&&!N.fin&&H.some(x=>x[1]>0)&&!H.some(x=>x[1]<0)){N.fin=1;NHQ.push(nhFin(N,nm))}
 nhSnap(N,p,nm)}catch(x){console.error(x)}return r}
function nhFlush(){while(NHQ.length){const [h,b,c]=NHQ.shift();try{log(`<b${c?` class="${c}"`:""}>${h}:</b> ${nhCap(b)}`)}catch(e){console.error(e)}}}
(function(){
 if(typeof nrPlay==="function"){const f=nrPlay;nrPlay=function(v){return nhAfter(v,f.apply(this,arguments),v&&v.name)}}
 if(typeof nrMPlay==="function"){const f=nrMPlay;nrMPlay=function(s){return nhAfter(s,f.apply(this,arguments),s&&s.name)}}
 if(typeof nrMenPlay==="function"){const f=nrMenPlay;nrMenPlay=function(e){return nhAfter(e&&e.p,f.apply(this,arguments),e&&e.n)}}
 if(typeof nrMonth==="function"){const f=nrMonth;nrMonth=function(){const ev=f.apply(this,arguments);try{nhFlush();if(!nhOff()&&nrOn())nhSbMonth()}catch(e){console.error(e)}return ev}}})();
/* ---------- (d) strike-back ---------- */
function nhPeople(){const L=[];try{for(const v of rivals)if(v&&v.nr)L.push([v,v.name])}catch(e){}
 try{for(const s of nrServL("maid").concat(nrServL("eunuch")))if(s&&s.nr)L.push([s,s.name])}catch(e){}
 try{for(const e of nrMenL())if(e.p&&e.p.nr)L.push([e.p,e.n])}catch(e){}return L}
/* who carries the fact to her (null = nobody this month); the jagknow rules, read the same way as knFor */
function nhCarrier(p,N,sb){const hid="nrsb:"+N.hpk+":"+sb.t+":"+sb.m;const isV=rivals.includes(p);const T=BAL.ag.know;
 if(isV){let o=0;try{o=oSee(p,false)*T.eye/100}catch(e){}if(roll(o))return["eye",""]}
 const st=typeof knStaff==="function"?knStaff:()=>[];
 for(const s of st(p)){let o=0;try{o=odA(s,SRVA.listen.o(s))}catch(e){}if(!roll(o))continue;let c="keep";try{c=knTell(s,p,hid)}catch(e){}if(c==="tell")return["srv",s.name]}
 for(const s of st(S)){if(s.spyFor==null)continue;let b=null;try{b=byKey(s.spyFor)}catch(e){}if(b!==p)continue;let c="keep";try{c=knTell(s,S,hid)}catch(e){}if(c==="sell")return["sell",s.name]}
 let B=null;try{B=sb.b?q72A(sb.b[0],sb.b[1]):null}catch(e){}const bo=B&&B.o;
 if(bo&&bo!==p&&rivals.includes(bo)){const a=aff(bo,S);if(a<0){const lo=cl(-a,0,100)/100;let c="keep";try{c=mindPick([["tell",Math.max(.01,lo*T.tell.tell)],["keep",Math.max(.01,(1-lo)*T.tell.keep)]],bo)||"keep"}catch(e){}if(c==="tell")return["riv",bo.name]}}
 return null}
function nhStrike(p,nm,N,sb,by){const o=nhB().sb.oan,he=nrHe(p);sb.k=1;sb.by=by[0];sb.at=S.turn;
 if(rivals.includes(p))oanAdd(p,S,o);else{let a=null;try{a=N.hpa?q72A(N.hpa[0],N.hpa[1]):null}catch(e){}if(a)q72Rel(a,-o)}
 const how={eye:`tai mắt của ${he} dò ra`,srv:`${by[1]}, người hầu của ${he}, nghe ngóng được rồi bẩm lại`,sell:"có kẻ bên ngươi đã bán tin",riv:`${sb.bn||by[1]} cố ý để lộ cho ${he} hay`}[by[0]]||"";
 NHQ.push([`Phụ tuyến · ${nm}`,`${he} đã biết ngươi đem chuyện của ${he} mách cho ${sb.bn||"kẻ kia"}${how?` (${how})`:""}. ${nhCap(he)} ghi hận ngươi.`,"r"]);nhSnap(N,p,nm)}
function nhSbMonth(){const mo=nhB().sb.mo;for(const [p,nm] of nhPeople()){try{const N=p.nr,sb=N.sb;if(!sb||sb.k||sb.m>=mo||S.turn<=sb.t)continue;if(p.alive===false||p.out&&p!==S)continue;
  sb.m++;const by=nhCarrier(p,N,sb);if(by)nhStrike(p,nm,N,sb,by)}catch(e){console.error(e)}}nhFlush()}
/* ---------- (e) Mệnh truyện › Phụ tuyến ---------- */
function nhList(){try{return (S&&Array.isArray(S.nrpt)?S.nrpt:[]).filter(e=>e&&Array.isArray(e.hp)&&e.hp.length).slice().sort((a,b)=>(b.lt||0)-(a.lt||0))}catch(e){return[]}}
function nhChs(r){const L=[];for(let n=BAL.road.first-1;n<=BAL.road.last;n++)if(nrCh(r,n))L.push(n);return L}
function nhSlide(e){const he=e.he||"nàng",T=nrTitle(e.r)||"tuyến riêng",chs=nhChs(e.r);
 const st=e.x?"đã khép":e.np?`đang ở chương ${chs.find(n=>n>e.c)||e.c}`:"chưa mở chương nào";
 let img=typeof kitOriginArt==="function"&&!(typeof NRM==="object"&&NRM[e.r])&&e.o?kitOriginArt(e.o):"";if(!img){try{img=kitInfoArt("Phụ tuyến").src||""}catch(x){}}
 const did=e.hp.map(([n,s])=>`${s===2?"mách tin giúp":s>0?"giúp":"bán đứng"} ở chương ${n}`).join(" · ");const s0=e.hp[e.hp.length-1][1];
 const R=[["Chương đã qua",e.c?`Chương ${e.c}${e.e?` — ${e.e}`:""}`:"chưa qua chương nào"],["Ngươi đã",did,s0>0?"g":"r"],
  e.hr!=null?["Kết quả",nhRes(s0,e.hr,he,"","chương ấy"),(s0>0)===(e.hr>0)?(s0>0?"g":"r"):""]:["Kết quả","chương ấy chưa tới hồi phân định"],
  e.f?["Trọn tuyến",`${he} đi trọn tuyến và nhớ công ngươi`,"g"]:null,e.sb?["Ghi hận",`${he} đã biết ngươi bán đứng`,"r"]:null];
 return {tap:"chapOpen",kicker:`Phụ tuyến · «${T}»`,title:e.nm,sub:`${Math.min(e.np||0,chs.length)}/${chs.length} chương · ${st}`,img,body:rows67(R),toc:[e.x?"done":"now",e.nm,st]}}
function nhCard(e){return kitSlide("story-pt-"+(e.nm||""),[nhSlide(e)])}
function nhPaneHTML(){const L=nhList();if(!L.length)return kitEmpty("Ta chưa nhúng tay vào tuyến riêng của ai",["Khi ta can dự vào chuyện riêng của một người trong cung, tuyến của người ấy hiện ở đây."],{topic:"Phụ tuyến"});return kitSlide("story-pt",L.map(nhSlide),{tocTitle:"Mục lục tuyến"})}
try{KIT_GLOSS["Phụ tuyến"]="Tuyến riêng của những người ngươi đã nhúng tay: giúp hay bán đứng ở chương nào, chương ấy ra sao. Người được giúp mà đi trọn tuyến thì nhớ công ngươi; kẻ bị bán đứng chỉ biết khi có người đem chuyện đến tai, biết rồi thì ghi hận."}catch(e){}
(function(){if(typeof ktStoryHTML!=="function"||typeof kitSubTabs!=="function")return;const k0=kitSubTabs;
 const has=()=>{try{return !nhOff()&&!!S&&nhList().length>0}catch(e){return false}};
 kitSubTabs=function(key,list,info){if(key==="story"&&Array.isArray(list)&&list.some(x=>x.k==="past")&&!list.some(x=>x.k==="pt")&&has())list=list.concat([{k:"pt",label:"Phụ tuyến",n:String(nhList().length)}]);return k0.call(this,key,list,info)};
 const h0=ktStoryHTML;ktStoryHTML=function(){try{if(has()){const B=[{k:"now",label:"Chương này",n:""},{k:"rank",label:"Sắc phong",n:""},{k:"past",label:"Đã qua",n:String(((S.st&&S.st.ch&&S.st.ch.past)||[]).length+(S.r97||[]).length)}];
   if(ktSubGet("story",B.concat([{k:"pt"},{k:"rg"},{k:"rgl"}]))==="pt"){const sub=kitSubTabs("story",B,kitInfo("Phụ tuyến"));return sub.html+nhPaneHTML()}}}catch(e){console.error(e)}return h0.apply(this,arguments)}})();
Object.assign(window,{nhTip,nhHp,nhList,nhPaneHTML,nhSbMonth,nhCarrier,nhAfter,nhFlush,nhSnap});
