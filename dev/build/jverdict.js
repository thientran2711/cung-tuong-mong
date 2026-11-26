/* ================= jverdict — OB-VERDICT (owner OD 26/11 ~08:30Z «nói xấu xong ... không biết được là có nói xấu thành công hay không»):
   the ACT PAYLOAD for the result card (KIT 7.3 kaAim, j63). Every act SHE aims at a person registers its target when it starts, with
   the verdict of the act's OWN success roll (aRoll), its «bị lộ» (caught) or a capped slip (oddsSoft → BỎ DỞ); every deed an NPC aims at HER
   registers its actor (two-way, law 1). The card of that span then shows the seal, the act's sentence, «Người ấy: <tên>: Sủng −5 (42 → 37) …»
   and «Ai làm». Hooks only (no act logic, no number changes — law 4): runAct, talk, pillowDo, giveTo, servAct, empAct, doAct. ============ */
(function(){if(typeof kaAim!=="function")return;
const F=[];const top=()=>F[F.length-1];
window.KAV={F,stat:{}};const st=k=>{KAV.stat[k]=(KAV.stat[k]|0)+1};
const own=(f,a)=>f&&(a===undefined?f.a===S:a===f.a);
/* the act's own success roll: the FIRST aRoll of the actor inside the frame (side rolls use roll()) */
if(typeof aRoll==="function"){const r0=aRoll;aRoll=function(o,a){const r=r0.apply(this,arguments);const f=top();if(f&&f.ok==null&&own(f,a))f.ok=!!r;return r}}
/* «bị lộ» before the roll: the scheme fails */
if(typeof caught==="function"){const c0=caught;caught=function(a){const r=c0.apply(this,arguments);const f=top();if(r&&f&&f.ok==null&&f.a===a)f.ok=false;return r}}
/* ODDS CAP: a formerly-sure act slipped — nothing done (BỎ DỞ) */
if(typeof oddsSoft==="function"){const s0=oddsSoft;oddsSoft=function(){const f=top();if(f&&f.a===S)f.ok="soft";return s0.apply(this,arguments)}}
/* a dialog / talk option's own result (runOpt: true / false; "sure" stays no seal) */
if(typeof runOpt==="function"){const o0=runOpt;runOpt=function(){const r=o0.apply(this,arguments);const f=top();if(f&&f.a===S&&(r===true||r===false)&&f.ok!=="soft")f.ok=r;return r}}
function isP(v){return !!v&&typeof v==="object"&&v!==S&&typeof v.name==="string"}
/* OUTER acts (doAct, talk, a dialog option on a consort, servant / court acts): ONE aim per act, alive until the card that shows it.
   RV r1 #1: a deed run from its own dialog («Bày mưu» → «Ra tay ngay», the road card «Làm như thường», a picker) re-enters doAct inside
   that dialog's chooseM; the aim then WAITS for its dialog (x.wait = the cards the act queued) and the re-entry runs on the SAME frame, so
   the deed's roll (aRoll / caught / the decision hooks below) lands on the aim the card reads. An act that is over (ran, sent, or opened
   nothing) leaves its aim to the next card (kaAimUse); a dialog closed without its deed («Thôi») closes its aim. */
const PEND=[];let CMID=0,idleT=0;
const qNew=q0=>Q.filter(m=>!q0.includes(m));
const gone=x=>!!x.wait&&!x.wait.some(m=>Q.includes(m));/* its dialog was taken off the queue: it is being answered now */
function shut(x){if(!x)return;x.used=1;const i=PEND.indexOf(x);if(i>=0)PEND.splice(i,1)}
/* a finished act whose card never came (nothing to show, a bot): closed once the board is idle again (no dialog, no mini-game) */
function idleShut(){if(idleT)return;let n=0;const tick=()=>{idleT=0;try{if(!S)return;if((Q.length||S.mg||window.__aaPend)&&++n<240){idleT=setTimeout(tick,500);return}for(const x of KA_AIM)if(x.jvDone)x.used=1}catch(e){}};idleT=setTimeout(tick,0)}
function fin(x,f,q0,now){if(!x)return;const nq=qNew(q0);
 if(!now&&!f.ran&&!f.sent&&nq.length&&!x.used){x.wait=nq;x.jvCm=CMID;if(!PEND.includes(x))PEND.push(x);return}/* its own dialog is open: wait */
 const i=PEND.indexOf(x);if(i>=0)PEND.splice(i,1);x.wait=null;x.outer=0;x.jvDone=1;idleShut()}
/* the pending act whose dialog is being answered now, for this doer → target (and act key) */
const pendOf=(a,t,key)=>{const x=PEND.find(x=>!x.used&&x.jvF&&x.jvF.a===a&&x.jvF.t===t&&(key==null||x.jvKey===key)&&gone(x));if(x){x.jvCm=CMID;x.seq=S.logSeq||0/* the span of the card of the dialog answered now */}return x};
function outer(v,key,o){const f={a:S,t:v,ok:null};const x=kaAim(v,Object.assign({outer:1,open:1,ok:()=>f.ok},o));if(x){x.jvF=f;x.jvKey=key}return [x,f]}
/* runAct: every ACT deed (hãm hại, dò la, tố giác, vu oan, kết giao, cài đồ …), hers and an NPC's on her */
/* her servant refused the dirty deed before it began (j29 «quỳ xin … đừng làm việc thất đức; việc không thành»): nothing done = BỎ DỞ */
const post=(f,r)=>{try{if(f&&f.ok==null&&f.a===S&&r&&/việc không thành/.test(kaPlain(r)))f.ok="soft"}catch(e){}return r};
if(typeof runAct==="function"){const ra0=runAct;runAct=function(a,t,k){const A2=typeof ACT==="object"&&ACT[k];
 if(!S||!a||!t||a===t||!A2)return ra0.apply(this,arguments);
 const f0=top();if(f0&&f0.a===a&&f0.t===t){f0.ran=1;return post(f0,ra0.apply(this,arguments))}/* doAct / a dialog on her already holds this deed */
 const px=pendOf(a,t);if(px){const f=px.jvF;f.ran=1;F.push(f);try{return post(f,ra0.apply(this,arguments))}finally{F.pop()}}/* the deed of a dialog she is answering (picker, road card) */
 const f={a,t,ok:null};const x=a===S&&isP(t)?kaAim(t,{ok:()=>f.ok,n:A2.n}):t===S&&isP(a)?kaAim(S,{by:a,ok:()=>f.ok,n:(A2.n||"").toLowerCase()}):null;
 F.push(f);let r;try{r=post(f,ra0.apply(this,arguments))}finally{F.pop()}if(x){if(!r)x.used=1;else st(a===S?"runAct":"runActOnHer")}return r}}
/* a deed SENT with a servant (jptime ptHarmSend): it lands later → «chưa rõ — người được sai về sẽ báo» */
setTimeout(()=>{try{if(typeof ptHarmSend!=="function")return;const p0=ptHarmSend;ptHarmSend=function(){const r=p0.apply(this,arguments);const f=top();if(r&&f&&f.a===S)f.sent=1;return r}}catch(e){}},0);
/* doAct: her deed from the person card (and its re-entry from its own «Bày mưu» / road card / mini-game) */
if(typeof doAct==="function"){const d0=doAct;doAct=function(i,k){const v=typeof rivals!=="undefined"?rivals[i]:null;const A2=typeof ACT==="object"&&ACT[k];
 if(!S||!v||!A2||k==="plant"||k==="gift")return d0.apply(this,arguments);/* plant / gift open a picker: the picked run registers itself (runAct / giveTo) */
 const key="act:"+v.id+":"+k;let x=pendOf(S,v,key),f;if(x){f=x.jvF;x.jvCm=CMID}else{const L=outer(v,key,{n:A2.n,later:()=>f.ran?"":f.sent?"người được sai về sẽ báo":""});x=L[0];f=L[1]}
 const q0=Q.slice();F.push(f);let r;try{r=d0.apply(this,arguments)}finally{F.pop()}
 if(x){if(f.ran)st("doAct");else if(f.sent)st("doActSent");fin(x,f,q0)}return r}}
/* talk: every talk option on a person (thăm hỏi, khen, nói chuyện người thứ ba, khiêu khích, tạ lỗi, cảnh báo …).
   Servant mode (j42 srvTalk): an option that names her mistress («Tố cáo <chủ> trước Hoàng hậu», «Mật báo chuyện của <chủ>») is aimed at
   the mistress, not at the one who listens (RV r1 #3) */
if(typeof talk==="function"){const t0=talk;talk=function(oi){let p=null,a=null;try{p=S&&curPeople()[popIdx];a=p&&talkOpts(p)[oi]}catch(e){}
 let v=p&&p.ref;try{const m=typeof isSrv==="function"&&isSrv()&&typeof srvM==="function"?srvM():null;if(m&&a&&m!==v&&isP(m)&&String(a.n||"").includes(m.name))v=m}catch(e){}
 if(!S||!a||!isP(v))return t0.apply(this,arguments);
 const [x,f]=outer(v,"talk:"+v.id,{n:a.n});const q0=Q.slice(),s0=S.logSeq||0;
 F.push(f);let r;try{r=t0.apply(this,arguments)}finally{F.pop()}
 if(x){if((S.logSeq||0)!==s0)st("talk");fin(x,f,q0)}return r}}
/* servant-mode talk (j42 srvTalk T(…).run): the option rolls itself and prints «thành. » / «hỏng. » first — that roll is the seal */
if(typeof srvTalk==="function"){const s0=srvTalk;srvTalk=function(){const A=s0.apply(this,arguments);try{for(const a of A||[]){if(!a||typeof a.run!=="function"||a.run.__jv)continue;const r0=a.run;a.run=function(){const r=r0.apply(this,arguments);try{const f=top();const m=kaPlain(r||"");if(f&&f.a===S&&f.ok==null)f.ok=/^thành\./.test(m)?true:/^hỏng\./.test(m)?false:null}catch(e){}return r};a.run.__jv=1}}catch(e){}return A}}
/* a dialog option of a card about a consort (events j7 «Đổ thêm dầu vào lửa», «Thêm một lời buộc tội», j67 roads, the cards of NPC deeds
   on her …): the consort on the card is the target; her option's own roll gives the seal. The cards of her own pending act (its «Bày mưu»,
   road card, picker) are that act's, not a new one. Also: a pending act whose dialog was closed without its deed is closed here. */
if(typeof chooseM==="function"){const c0=chooseM;chooseM=function(i){const id=++CMID;let x=null,f=null;const q0=Q.slice();
 try{const m=Q[0],c=m&&m.opts&&m.opts[i];const w=m&&m.who&&m.who.w;const v=w&&w[0]==="r"&&typeof RV==="function"?RV(w[1]):null;
  if(S&&c&&!c.off&&isP(v)&&v.alive!==false&&!/^Thôi/.test(c.n||"")&&!PEND.some(p=>p.wait&&p.wait.includes(m))){const L=outer(v,"opt:"+v.id,{n:kaPlain(c.n||"")});x=L[0];f=L[1]}}catch(e){}
 if(f)F.push(f);let r;try{r=c0.apply(this,arguments)}finally{if(f)F.pop();
  try{if(x){if(!x.used&&f.ok==null&&!f.ran)st("opt");fin(x,f,q0.slice(1),1)/* an option does not come back to itself: done at once */}for(const p of PEND.slice())if(p!==x&&p.jvCm!==id&&gone(p))shut(p)}catch(e){}}
 return r}}
/* RV r1 #2: deeds decided WITHOUT aRoll — the decision point itself gives the verdict (hooks only, no act logic touched):
   Giá họa trộm đồ (wdFrame → wdFrameResolve): the plant slipped in (aRoll), then the search decides: found guilty = THÀNH, else BẠI */
function frameOf(a,t){const f=top();return f&&f.a===a&&f.t===t?f:null}
/* the accuse family (Hặc ăn mặc sai phẩm, Tố vượt phẩm, Tố xa xỉ, bày biện xa xỉ / vượt phẩm): some roll with roll(), some decide on the truth;
   the inquiry's own outcome line is the decision: «…: thành» = THÀNH; «bỏ qua» (the judge waves it off) / «tố bừa» (proved false) = BẠI */
const accOk=r=>{const h=String(r||"");if(/>thành</.test(h))return true;const t=kaPlain(h);return /bỏ qua|tố bừa/.test(t)?false:null};
{const W=g0=>function(a,t){const r=g0.apply(this,arguments);try{const f=frameOf(a,t);const o=r?accOk(r):null;if(f&&o!==null)f.ok=o}catch(e){}return r};
 /* at the ACT level: jshelf hands ACT.vp / ACT.xx its runners by value (shelfHook1), so the deed function itself is wrapped (once, after every module) */
 const hookA=()=>{for(const k of ["vp","xx"]){const X=typeof ACT==="object"&&ACT[k];if(X&&typeof X.f==="function"&&!X.f.__jv){X.f=W(X.f);X.f.__jv=1}}};hookA();setTimeout(hookA,0);setTimeout(hookA,50)}
/* a deed the receiver answers (jrcv rcvAsk: Kết giao, Nhờ giúp …): her ask is THÀNH when the receiver's answer is a yes (the option's own {ok}) */
if(typeof rcvPick==="function"){const p0=rcvPick;rcvPick=function(t,a){const c=p0.apply(this,arguments);try{const f=frameOf(a,t);if(c&&f&&a===S&&typeof c.go==="function"){const g=c.go;return Object.assign({},c,{go:function(){const r=g.apply(this,arguments);try{if(r&&typeof r==="object"&&"ok" in r)f.ok=!!r.ok}catch(e){}return r}})}}catch(e){}return c}}
if(typeof wdFrameResolve==="function"){const w0=wdFrameResolve;wdFrameResolve=function(a,t){const r=w0.apply(this,arguments);try{const f=frameOf(a,t);if(f&&t!==S&&r)f.ok=/mang tội ăn trộm/.test(kaPlain(r))}catch(e){}return r}}
/* Vu oan resolved (jtruth frameDef → frameExpose): the framed one clears herself and the framer is exposed = BẠI, whatever the plant roll said */
if(typeof frameExpose==="function"){const x0=frameExpose;frameExpose=function(a,p){const r=x0.apply(this,arguments);try{const f=frameOf(a,p);if(f)f.ok=false}catch(e){}return r}}
/* a bribed servant answers (jrcv rcvMaidBribe: «Mua chuộc cung nữ», «Sai cung nữ thân tín lấy lòng»; jagstf2 stf2Bribe: a palace servant):
   she takes the bribe = THÀNH; she refuses (tells her mistress, or keeps quiet) = BẠI */
if(typeof rcvMaidBribe==="function"){const b0=rcvMaidBribe;rcvMaidBribe=function(a,t){const r=b0.apply(this,arguments);try{const f=frameOf(a,t);if(f&&f.a===S&&r)f.ok=r==="take"}catch(e){}return r}}
if(typeof stf2Bribe==="function"){const b0=stf2Bribe;stf2Bribe=function(a,s,o){const r=b0.apply(this,arguments);try{const f=frameOf(a,o);if(f&&f.a===S&&r)f.ok=/nhận bạc của/.test(kaPlain(r))}catch(e){}return r}}
/* RV r1 #3 (law 11): runners that do a deed between two people without runAct — the same aim (target «Người ấy» / doer «Ai làm») */
function hookRun(nm,get,set,who,after){let g0=null;try{g0=get()}catch(e){}if(typeof g0!=="function")return;set(function(){let z=null;try{z=who.apply(null,arguments)}catch(e){}const a=z&&z.a,t=z&&z.t;
 if(!S||!a||!t||a===t)return g0.apply(this,arguments);const ft=frameOf(a,t);if(ft){ft.ran=1;const r=g0.apply(this,arguments);try{if(after)after(ft,r)}catch(e){}return r}
 const f={a,t,ok:null};const x=a===S&&isP(t)?kaAim(t,{ok:()=>f.ok,n:z.n}):t===S&&(isP(a)||z.pub)?kaAim(S,{by:a,pub:z.pub,ok:()=>f.ok,n:z.n}):null;
 F.push(f);let r;try{r=g0.apply(this,arguments)}finally{F.pop()}try{if(after)after(f,r)}catch(e){}if(x){if(r===""&&!z.keep)x.used=1;else st(nm)}return r})}
/* j55 nhà ngoại: dò sổ sách nhà ngoại / dâng chứng cứ tham ô (the verdict = window.__tdOk, set by the deed itself) */
hookRun("tdProbe",()=>tdProbe,f=>tdProbe=f,(a,t)=>({a,t,n:t===S?"sai người dò nhà ngoại ngươi":"Sai người dò nhà ngoại"}),(f,r)=>{if(r)f.ok=!!window.__tdOk});
hookRun("tdLeak",()=>tdLeak,f=>tdLeak=f,(a,t)=>({a,t,n:t===S?"dâng chứng cứ cha ngươi tham ô":"Dâng chứng cứ tham ô"}),(f,r)=>{if(r)f.ok=/bị cách chức/.test(kaPlain(r))/* the deed's own outcome: the father removed (ccStep after it may run another court act) */});
/* j67 / j96 / roads: a consort punished as the outcome of her road */
hookRun("e67pun",()=>e67pun,f=>e67pun=f,v=>({a:S,t:v,n:"bị phạt"}));
/* jemoact: the Emperor / Thái hậu / a consort's temper deed on HER → «Ai làm» (the Emperor and Thái hậu are known to all: pub) */
{const EAN={cham:"châm chọc ngươi",ban:"ban thưởng",noi:"nổi giận với ngươi",quo:"quở trách ngươi",nghi:"nghi kỵ ngươi",egian:"giận lây cả hậu cung",evui:"sủng ái ngươi ra mặt",tgian:"quở cả hậu cung",tvui:"thiên vị ngươi"};
 hookRun("eaHitMe",()=>eaHitMe,f=>eaHitMe=f,(p,k)=>{if(!p||!EAN[k])return null;const pub=S&&p===S.emp?"Hoàng thượng":S&&p===S.thO?"Thái hậu":"";return {a:p,t:S,n:EAN[k],pub,keep:1}})}
/* her servants / other palaces' servants (Thưởng, Phạt, Hỏi chuyện, Che chở, Mua chuộc, Dọa tố) */
if(typeof servAct==="function"){const s0=servAct;servAct=function(a,id){const s=typeof servById==="function"?servById(id):null;if(!S||!isP(s)||a==="doi")return s0.apply(this,arguments);
 const N={thuong:"Thưởng",phat:"Phạt",hoi:"Hỏi chuyện",che:"Che chở",mua:"Mua chuộc",doa:"Dọa tố"};
 const [x,f]=outer(s,"serv:"+id,{n:`${N[a]||""} ${s.name}`.trim()});if(x)x.ok=()=>a==="phat"||a==="che"?(window.__servOk===false?false:true):f.ok;const q0=Q.slice(),s1=S.logSeq||0;
 F.push(f);let r;try{r=s0.apply(this,arguments)}finally{F.pop()}if(x){if((S.logSeq||0)!==s1)st("servAct");fin(x,f,q0)}return r}}
/* Hoàng hậu's acts on a consort (Xử tội, Tịch thu, Ban thưởng, Ân xá, Khất bổng) */
if(typeof empAct==="function"){const e0=empAct;empAct=function(i,k){const v=typeof rivals!=="undefined"?rivals[i]:null;if(!S||!isP(v))return e0.apply(this,arguments);
 const N={judge:"Xử tội",conf:"Tịch thu trang sức",reward:"Ban thưởng",pardon:"Ân xá",cutpay:"Khất bổng lộc"};
 const [x,f]=outer(v,"emp:"+v.id+":"+k,{n:`${N[k]||""} ${v.name}`.trim()});const q0=Q.slice(),s1=S.logSeq||0;
 F.push(f);let r;try{r=e0.apply(this,arguments)}finally{F.pop()}if(x){if((S.logSeq||0)!==s1)st("empAct");fin(x,f,q0)}return r}}
/* pillow slander (j8 night2 «Thì thầm nói xấu» / jagemp pillowNpc): the verdict + ONE plain sentence in her Sổ ghi */
if(typeof pillowDo==="function"){const p0=pillowDo;pillowDo=function(a,t){if(!S||!a||!t||a===t)return p0.apply(this,arguments);
 const f={a,t,ok:null};const me=a===S;const nm=me?`<span data-k61skip>${typeof kaWho==="function"?kaWho(t):t.name}</span>`:"";/* her chosen target: real name + title, never «???» */
 const sen=o=>o===true?`Gối đầu, ngươi thì thầm nói xấu ${nm}: ngài nghe lọt tai.`:o===false?`Gối đầu, ngươi thì thầm nói xấu ${nm}: ngài không tin${typeof DG==="function"&&DG()?", lại quay ra nghi ngươi":", còn trách ngươi lắm lời"}.`:o==="soft"?`Ngươi định nói xấu ${nm}, rồi lại thôi không nói.`:"";
 const x=me&&isP(t)?kaAim(t,{ok:()=>f.ok,n:`Thì thầm nói xấu ${t.name}`,sen}):t===S&&isP(a)?kaAim(S,{by:a,ok:()=>f.ok,n:"nói xấu ngươi bên gối"}):null;
 F.push(f);let r;try{r=p0.apply(this,arguments)}finally{F.pop()}
 f.ok=r&&r.ok?true:r&&r.soft?"soft":false;if(me&&f.ok!=="soft"){try{log(sen(f.ok))}catch(e){}}if(x)st(me?"pillow":"pillowOnHer");return r}}
/* gifts to a person (Tặng quà / giftpick): the target's thiện cảm shows on the «Người ấy» row */
if(typeof giveTo==="function"){const g0=giveTo;giveTo=function(a,r,ix){const e=a&&a.inv&&a.inv[ix];
 const x=S&&a===S&&isP(r)?kaAim(r,{n:e?`Tặng ${typeof iname==="function"?iname(e):"quà"}`:"Tặng quà"}):S&&r===S&&isP(a)?kaAim(S,{by:a,n:"tặng quà ngươi"}):null;
 const out=g0.apply(this,arguments);if(x){if(!out)x.used=1;else st("gift")}return out}}
})();
