/* ================= NPC MINDS II: fills over j40 (never edits it). One rule for every head.
   1. the push-down roads (j30) come back into the mind's menu (j40 replaced npcAct whole and dropped them), with tells;
   2. knowledge: each victim keeps a belief book (bel) of who she thinks hurt her, built only from what she could know
      (seen with her own eyes, her spy in the doer's palace, evidence in hand); she may stay in the dark or blame the wrong head,
      planted evidence pulls her guess; the player's hidden blows are guessed the same way;
   3. wit: every head may slip (low Tâm cơ most, high ~12%); the clever wait for better odds;
   4. a bad week (punished, demoted, fallen) makes anyone rash for about three weeks;
   5. tells reach her through a named servant of hers, by Tai mắt and servant traits; a servant who spies for the schemer keeps silent (withholds, never lies). ================= */
const PUSHK=["lygian","tocao","xinhh","slowpoison","expose"];
const PUSHW={slowpoison:"poison",lygian:"rumor",xinhh:"ally",tocao:"accuse",expose:"accuse"};
PUSHK.forEach(k=>{if(!BIG.includes(k))BIG.push(k)});
Object.assign(TELLS,{lygian:"đem bạc lén biếu thái giám hầu cận Hoàng thượng, dò lúc ngài vui buồn",tocao:"sai người gom lời cung nhân, chép lại sổ sách cũ",
 xinhh:"năng sang cung Hoàng hậu, ngồi rất lâu, cho người hầu lui ra",slowpoison:"ngày ngày sắc một thứ thuốc bổ lạ mà chẳng dùng cho mình",expose:"cho người canh cửa sau, ghi giờ ai ra vào"});
function m43odds(v,t,k){try{const a=ACT[k];return a&&a.o?a.o(v,t):null}catch(e){return null}}
/* the menu: push-down roads against the holder of the seat she wants next (about the old 45% share); the clever drop poor odds and wait */
(function(){const m0=mindMenu;mindMenu=function(v,t){let O=m0.apply(this,arguments);try{
  const nx=rkOf(v)+1;const want=rkOf(t)===nx&&SEATCAP[nx]!=null&&!seatFree(nx);
  if(want){const b=bandOf(danger(v,t));const allow=BANDS.slice(1,b+1).flatMap(x=>x[2]);const L=PUSHK.filter(k=>{if(!allow.includes(k)||!ACT[k])return false;try{return ACT[k].ok(v,t)}catch(e){return false}});
   if(L.length){const W=O.reduce((a,b)=>a+b[1],0);const pw=L.map(k=>Math.max(.05,persW(v,PUSHW[k])));const ps=pw.reduce((a,b)=>a+b,0);const tot=W>0?W*.45/.55:1;L.forEach((k,i)=>O.push([k,tot*pw[i]/ps]))}}
  if(witOf(v)>=60&&O.length){let drop=0;const keep=O.filter(x=>{const o=m43odds(v,t,x[0]);if(o!=null&&o<45&&roll(60)){drop++;return false}return true});
   if(drop){mindLog(v,"_wait");if(!keep.length){const sp=O.find(x=>x[0]==="spy");return sp?[sp]:[]}}O=keep}/* the clever wait out poor odds and dig for evidence meanwhile */
 }catch(e){}return O}})();
/* the push-down roads read Tâm cơ through odT: a blunder lowers them too */
(function(){const o0=odT;odT=function(a,b){const r=o0.apply(this,arguments);return a&&a.__err?cl(r-a.__err,5,95):r}})();
/* belief book */
function m43sev(k){for(let i=1;i<BANDS.length;i++)if(BANDS[i][2].includes(k))return [0,6,12,20][i];return 6}
function belOf(t,x){t.bel=t.bel||{};const k=key(x);return t.bel[k]=t.bel[k]||{r:0,w:0}}
mindBelief=function(t,v,k){if(!t||t===S||!t.alive||t.out||!v)return;const kv=key(v);const ev=(t.evm&&t.evm[kv])||0;
 let p=35+witOf(t)/2+(ev>0?25:0)-witOf(v)/4;let seen=false;try{seen=together(v,t)}catch(e){}if(seen)p+=40;
 const spy=((v===S?S.staff:v.staff)||[]).some(s=>s&&s.spyFor===key(t));if(spy)p+=30;p=cl(p,10,95);mindLog(t,"_belief");
 const n=m43sev(k);if(roll(p)){oanAdd(t,v,n);belOf(t,v).r+=n;return}
 const L=others(t).filter(x=>x!==v&&(x===S||x.alive&&!x.out));
 if(!L.length||roll(30)){mindLog(t,"_dark");return}/* kept in the dark: she knows a blow fell, not whose */
 const w=L.map(x=>[x,1+oan(t,x)+Math.max(0,-aff(t,x))+15*((t.evm&&t.evm[key(x)])||0)]);let r=Math.random()*w.reduce((a,b)=>a+b[1],0),i=0;while(r>w[i][1]&&i<w.length-1){r-=w[i][1];i++}
 const s=w[i][0];oanAdd(t,s,n);belOf(t,s).w+=n;mindLog(t,"_wrongBelief");t.blamed=t.blamed||{};t.blamed[key(s)]=(t.blamed[key(s)]||0)+1;
 if(s===S&&roll(30+(S.mat||0)*8))noteAdd(t.id,`Nghe nói ${t.name} ngờ ngươi đứng sau chuyện ${ACT[k]?ACT[k].n.toLowerCase():"vừa rồi"}, dù không phải ngươi`)};
/* the belief book fades with the grudges, month by month */
(function(){const o0=oanMonth;oanMonth=function(){const r=o0.apply(this,arguments);try{for(const v of rivals){if(!v.bel)continue;for(const k in v.bel){const b=v.bel[k];b.r=Math.floor(b.r*.8);b.w=Math.floor(b.w*.8);if(!b.r&&!b.w)delete v.bel[k]}}}catch(e){}return r}})();
/* her own hidden blows are guessed by the victim the same way */
const M43HARM=new Set(BANDS.slice(1).flatMap(x=>x[2]).concat(PUSHK));
(function(){const r0=runAct;runAct=function(a,t,k){const r=r0.apply(this,arguments);try{if(a===S&&t&&t!==S&&t.alive&&M43HARM.has(k)&&k!=="accuse"&&k!=="vp"&&k!=="xx"&&k!=="tocao"&&r&&!FAILRX.test(r))mindBelief(t,S,k)}catch(e){}return r}})();
/* wit: every head can slip; acts on a belief she holds wrongly are counted */
(function(){const r0=mindRun;mindRun=function(v,t,k,err){err=err||0;try{const tc=witOf(v);if(!err&&roll(tc>=BAL.wit.hi?12:tc>=BAL.wit.lo?18:20)){err=10;mindLog(v,"_mistake");mindLog(v,"_slip")}
  mindLog(v,"_act");const b=v.bel&&t&&v.bel[key(t)];if(b&&(b.w||b.r))mindLog(v,"_actBelief");if(b&&b.w>0&&b.w>=b.r)mindLog(v,"_actWrong")}catch(e){}
 const r=r0.call(this,v,t,k,err);try{if(r&&FAILRX.test(r))mindLog(v,"_fail")}catch(e){}return r}})();
/* a bad week: punished, demoted or fallen makes a head rash for about three weeks */
function m43bad(p){if(p&&typeof p==="object"&&p!==S)p.badWk=bq()}
(function(){const p0=punish;punish=function(p){m43bad(p);return p0.apply(this,arguments)}})();
(function(){const d0=demote;demote=function(p){m43bad(p);return d0.apply(this,arguments)}})();
(function(){const f0=fall;fall=function(p){m43bad(p);return f0.apply(this,arguments)}})();
(function(){const r0=rashOf;rashOf=function(v){const r=r0.apply(this,arguments);if(r)return r;if(v&&v.badWk!=null&&bq()-v.badWk<=9&&roll(25)){mindLog(v,"_badWeek");return 1}return 0}})();
/* tells: the same chance as before, now carried by a named servant of hers; a servant who spies for the schemer keeps it back */
function m43reporter(){const L=[];const seen=new Set();for(const s of [S.maid].concat(S.staff||[])){if(!s||seen.has(s))continue;seen.add(s);L.push(s)}if(!L.length)return null;
 const w=L.map(s=>(nv(s,"agentW"))*(s.loyal>=BAL.loy.close?1.5:1));let r=Math.random()*w.reduce((a,b)=>a+b,0),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}return L[i]}
mindTell=function(v,t,k){mindLog(v,"_tell");try{if(v.plan&&v.plan.due>bq()+3)v.plan.due=bq()+3}catch(e){}/* a tell comes 1-3 buổi before the blow */const tc=witOf(v);let c=12+(S.mat||0)*7+(S.staff||[]).filter(s=>netIs(s,"sharp")||netIs(s,"talk")).length*8+(tc<BAL.wit.mid?15:0)-(tc>=BAL.wit.top?8:0)+(t===S&&S.maid&&S.maid.loyal>=BAL.loy.trust?10:0)-nq(v,"hide",BAL.net.k.hide);
 if(!roll(cl(c,5,80)))return;const s=m43reporter();
 if(s&&s.spyFor&&s.spyFor!=="me"&&(s.spyFor===key(v)||roll(50))){mindLog(v,"_tellWithheld");return}
 mindLog(v,"_tellSeen");const what=TELLS[k]||"có động tĩnh lạ";const txt=`${s?s.name+" về báo: n":"N"}gười của ${v.name} ${what}`;S.tells=S.tells||{};S.tells[v.id]={k,t:key(t),bq:bq()};
 try{newsAdd(v,k,txt,true)}catch(e){}noteAdd(v.id,`${s?s.name:"Tai mắt"} báo: ${what}${t===S?" (có lẽ nhắm vào ngươi)":` (có lẽ nhắm vào ${NM(t)})`}`);
 if(t===S){S.onGuard=S.onGuard||{};S.onGuard[v.id]=k;if(!S.dead)Q.push({t:"Tai mắt báo tin",h:`<p>${txt}.</p><p>Có lẽ nàng đang nhắm vào ngươi. Ngươi đã đề phòng: vài buổi tới mưu của nàng khó thành hơn; dò la hoặc tố giác nàng thì càng chắc.</p>`,who:{w:["r",v.id]}})}
 else log(`${txt}.`)};
/* the wit scale: rivals' Tâm cơ runs about 5-55, so j40's marks (30 / 35 / 60 / 70) read on a stretched scale (x1.6), every head alike; without it no rival ever reached "patient" */
witOf=function(v){return cl(Math.round(1.6*(v===S?S.tamco||0:v.tamco||0)),0,100)};
/* a slight is a real blow (Oán +5 or more at once), not every small rub; smaller rubs leave the mood as it was */
(function(){const o0=oanAdd;oanAdd=function(x,y,n){const had=x&&x!==S?x.slightAt:undefined;const r=o0.apply(this,arguments);try{if(x&&x!==S&&n>0&&n<5){if(had===undefined)delete x.slightAt;else x.slightAt=had}}catch(e){}return r}})();
