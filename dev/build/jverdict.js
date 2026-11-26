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
/* runAct: every ACT deed (hãm hại, dò la, tố giác, vu oan, kết giao, cài đồ …), hers and an NPC's on her */
if(typeof runAct==="function"){const ra0=runAct;runAct=function(a,t,k){const A2=typeof ACT==="object"&&ACT[k];
 if(!S||!a||!t||a===t||!A2)return ra0.apply(this,arguments);
 const f0=top();if(f0&&f0.a===a&&f0.t===t){f0.ran=1;return ra0.apply(this,arguments)}/* doAct already holds this deed */
 const f={a,t,ok:null};const x=a===S&&isP(t)?kaAim(t,{ok:()=>f.ok,n:A2.n}):t===S&&isP(a)?kaAim(S,{by:a,ok:()=>f.ok,n:(A2.n||"").toLowerCase()}):null;
 F.push(f);let r;try{r=ra0.apply(this,arguments)}finally{F.pop()}if(x){if(!r)x.used=1;else st(a===S?"runAct":"runActOnHer")}return r}}
/* doAct: her deed from the person card; a deed by a SENT servant lands later (jptime) → «chưa rõ — người được sai về sẽ báo» */
if(typeof doAct==="function"){const d0=doAct;doAct=function(i,k){const v=typeof rivals!=="undefined"?rivals[i]:null;const A2=typeof ACT==="object"&&ACT[k];
 if(!S||!v||!A2||k==="plant"||k==="gift")return d0.apply(this,arguments);/* plant / gift open a picker: the picked run registers itself (runAct / giveTo) */
 const f={a:S,t:v,ok:null};const x=kaAim(v,{outer:1,ok:()=>f.ok,n:A2.n,later:()=>f.ran?"":"người được sai về sẽ báo"});const u0=typeof used!=="undefined"?used:0,q0=S.logSeq||0;
 F.push(f);let r;try{r=d0.apply(this,arguments)}finally{F.pop()}
 if(x){if(f.ran)st("doAct");else if((typeof used!=="undefined"?used:0)!==u0||(S.logSeq||0)!==q0)st("doActSent");if(!Q.length)x.used=1/* a picker / receiver card still open keeps it for its own result */}return r}}
/* talk: every talk option on a person (thăm hỏi, khen, nói chuyện người thứ ba, khiêu khích, tạ lỗi, cảnh báo …) */
if(typeof talk==="function"){const t0=talk;talk=function(oi){let p=null,a=null;try{p=S&&curPeople()[popIdx];a=p&&talkOpts(p)[oi]}catch(e){}
 const v=p&&p.ref;if(!S||!a||!isP(v))return t0.apply(this,arguments);
 const f={a:S,t:v,ok:null};const x=kaAim(v,{outer:1,ok:()=>f.ok,n:a.n});const q0=S.logSeq||0,k0=S.visit&&S.visit.tk&&S.visit.tk[popIdx];
 F.push(f);let r;try{r=t0.apply(this,arguments)}finally{F.pop()}
 if(x){if((S.logSeq||0)!==q0)st("talk");if(!Q.length)x.used=1}return r}}
/* pillow slander (j8 night2 «Thì thầm nói xấu» / jagemp pillowNpc): the verdict + ONE plain sentence in her Sổ ghi */
if(typeof pillowDo==="function"){const p0=pillowDo;pillowDo=function(a,t){if(!S||!a||!t||a===t)return p0.apply(this,arguments);
 const f={a,t,ok:null};const me=a===S;const nm=me?t.name:"";
 const sen=o=>o===true?`Gối đầu, ngươi thì thầm nói xấu ${nm}: ngài nghe lọt tai.`:o===false?`Gối đầu, ngươi thì thầm nói xấu ${nm}: ngài không tin${typeof DG==="function"&&DG()?", lại quay ra nghi ngươi":", còn trách ngươi lắm lời"}.`:o==="soft"?`Ngươi định nói xấu ${nm}, rồi lại thôi không nói.`:"";
 const x=me&&isP(t)?kaAim(t,{ok:()=>f.ok,n:`Thì thầm nói xấu ${nm}`,sen}):t===S&&isP(a)?kaAim(S,{by:a,ok:()=>f.ok,n:"nói xấu ngươi bên gối"}):null;
 F.push(f);let r;try{r=p0.apply(this,arguments)}finally{F.pop()}
 f.ok=r&&r.ok?true:r&&r.soft?"soft":false;if(me&&f.ok!=="soft"){try{log(sen(f.ok))}catch(e){}}if(x)st(me?"pillow":"pillowOnHer");return r}}
/* gifts to a person (Tặng quà / giftpick): the target's thiện cảm shows on the «Người ấy» row */
if(typeof giveTo==="function"){const g0=giveTo;giveTo=function(a,r,ix){const e=a&&a.inv&&a.inv[ix];
 const x=S&&a===S&&isP(r)?kaAim(r,{n:e?`Tặng ${typeof iname==="function"?iname(e):"quà"}`:"Tặng quà"}):S&&r===S&&isP(a)?kaAim(S,{by:a,n:"tặng quà ngươi"}):null;
 const out=g0.apply(this,arguments);if(x){if(!out)x.used=1;else st("gift")}return out}}
/* her servants / other palaces' servants (Thưởng, Phạt, Hỏi chuyện, Che chở, Mua chuộc, Dọa tố) */
if(typeof servAct==="function"){const s0=servAct;servAct=function(a,id){const s=typeof servById==="function"?servById(id):null;if(!S||!isP(s)||a==="doi")return s0.apply(this,arguments);
 const N={thuong:"Thưởng",phat:"Phạt",hoi:"Hỏi chuyện",che:"Che chở",mua:"Mua chuộc",doa:"Dọa tố"};
 const f={a:S,t:s,ok:null};const x=kaAim(s,{outer:1,ok:()=>a==="phat"||a==="che"?(window.__servOk===false?false:true):f.ok,n:`${N[a]||""} ${s.name}`.trim()});const q0=S.logSeq||0;
 F.push(f);let r;try{r=s0.apply(this,arguments)}finally{F.pop()}if(x){if((S.logSeq||0)!==q0)st("servAct");x.used=1}return r}}
/* Hoàng hậu's acts on a consort (Xử tội, Tịch thu, Ban thưởng, Ân xá, Khất bổng) */
if(typeof empAct==="function"){const e0=empAct;empAct=function(i,k){const v=typeof rivals!=="undefined"?rivals[i]:null;if(!S||!isP(v))return e0.apply(this,arguments);
 const N={judge:"Xử tội",conf:"Tịch thu trang sức",reward:"Ban thưởng",pardon:"Ân xá",cutpay:"Khất bổng lộc"};
 const f={a:S,t:v,ok:null};const x=kaAim(v,{outer:1,ok:()=>f.ok,n:`${N[k]||""} ${v.name}`.trim()});const q0=S.logSeq||0;
 F.push(f);let r;try{r=e0.apply(this,arguments)}finally{F.pop()}if(x){if((S.logSeq||0)!==q0)st("empAct");x.used=1}return r}}
})();
