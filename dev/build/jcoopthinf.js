/* jcoopthinf: CO-OP THIN GUEST, part F = HER OWN ACTS AS INTENTS (review/coop-thin-f1; audit dev/handover/reports/coop-thin-guest-audit.md
   §3 row F; report dev/handover/reports/coop-thin-f1.md; owner GO 17/11 ~01:40Z, no option-1 patching ~02:05Z). Behind the room level:
   TH.on(6), on only when BOTH seats run a build with it (Worker: level = min(want, cap a, cap b)). Solo and rooms below level 6 run nothing.
   ONE wrapper for every engine function a part moves (F1 runAct; F2–F5 register goTo / buy / useItem / mini-game scores the same way):
     TH.F.reg(name, {mine(args)→bool, enc(args)→plain|null, dec(a)→args|null, log:bool, ctx:[[name,get,set],…]})
   GUEST (seat b, level 6, not inside a host context or a world step still on her phone): the call never runs here. Her person diff since the
     host's copy (E.base: ONE baseline, shared with `do ready`) rides IN the intent (atomic: a resend is applied once), `do f {n,a,c,ops}`;
     the act is PENDING (a second act tap is ignored, #next locked with the existing wait words, act buttons off through can()); the caller
     gets "" (its `if(r)log(r)` logs nothing; spend() stays on her phone = her khắc clock). The answer comes in ONE view message: dr (this
     id) + her part-D patch (her log line, costs, cards) + the host's world → one render, nothing to undo, no flicker. No answer in 8 s →
     the same intent again (same id), 3 times at most, then a kit line and nothing applied.
   HOST (runDo: withSeat("b") from the top of the event loop): an id is run once (kept per room), her ops onto her stored person, the
     call-scoped context set for the call only, args decoded in HER context (the friend = the host's stand-in), the INNER function run (every
     inner wrapper = her act's effects, computed once), log(r) in her context. Acts between the two are ordinary acts in this one engine
     (jcoopworld sendRes at fW(): the stand-in's change → resApply on the host's own person, no message).
   Retired at level 6 for runAct (bypassed: deleted when level >= 6 is the default, part H): part C's act frame + `do npc` ops for her acts,
   jcoopworld sendRes / `res` + ack for her acts on the host, her invite relay (`do inv`), the act-time use of ctm-fam.
   API: TH.F = {on, reg, stat, pend, log}. */
(function(){try{
const CW=window.COOPW;if(!CW||!CW.thin||!CW.X||typeof COOP!=="object")return;
const TH=CW.thin,X=CW.X,J=X.J,D=TH.D,E=TH.E,LV=6;
const host=()=>CW.seat==="a",on=()=>TH.on(LV);
const F=TH.F={on,R:{},stat:{sent:0,ans:0,resend:0,give:0,run:0,dup:0,busy:0,local:0,bad:0,ms:[]},pend:null,log:[]};
const lg=x=>{F.log.push(x);if(F.log.length>60)F.log.shift()};
const RAW=Symbol.for("ctm.lens.raw");
const isMe=a=>!!a&&(a===S||a[RAW]===S||(S&&S[RAW]&&S[RAW]===a));
const LSK=()=>"ctm-thin-f:"+(COOP.state.room||"");
const PRE={};/* name → the function below the wrapper (the host runs it) */

/* ---------- guest ---------- */
function gOn(){return on()&&!host()&&!!CW.seat&&!CW.ctx&&!!S&&!S.dead&&!CW.inLife&&!CW.inFC&&!CW.allow&&!CW.allowN&&!(TH.C&&TH.C.inWorld&&TH.C.inWorld())}
function line(t){try{if(typeof kitLine==="function")kitLine(t);else log(t)}catch(e){}}
function sendF(p){COOP.send({t:"do",op:"f",args:p.msg,base:TH.view?TH.view.v:0,id:p.id});E.last=p.id;p.at=Date.now()}
function intent(name,args){const R=F.R[name],t00=performance.now();
 if(F.pend){F.stat.busy++;return false}
 let a=null;try{a=R.enc(args)}catch(e){console.error("thin F enc",name,e)}if(a==null){F.stat.bad++;lg(["bad",name]);return false}
 const V=TH.view;if(!V||!V.o){F.stat.bad++;return false}
 try{TH.gSync(V)}catch(e){}
 const c={};for(const [n,g] of R.ctx||[])try{const v=g();if(v!=null)c[n]=J(v)}catch(e){}
 let ops=[],cur=null;try{cur=E.curP();ops=TH.pDiff(E.base(V),cur)}catch(e){console.error("thin F diff",e)}
 const L=E.packs(ops);const last=L.pop()||[];const rid="f"+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
 L.forEach((o,i)=>TH.doSend("erd",{id:rid,i,ops:o}));if(cur)E.sent(cur);
 const p=F.pend={id:"d"+rid,n:name,msg:{n:name,a,c,ops:last},t0:Date.now(),tries:0,pre:Math.round(performance.now()-t00)};sendF(p);F.stat.sent++;lg(["sent",name,p.id,ops.length]);
 /* the pending state shows at once: #next locked + her act buttons off, in this same tick (no lost tap: the tap is held as the intent) */
 const t1=performance.now();try{CW.lockNext();render()}catch(e){}p.pr=Math.round(performance.now()-t1);return true}
function answered(dr){const p=F.pend;if(!p||!dr||dr.id!==p.id)return;F.pend=null;F.stat.ans++;const ms=Date.now()-p.t0;F.stat.ms.push(ms);if(F.stat.ms.length>40)F.stat.ms.shift();
 lg(["ans",p.n,ms,dr.r&&dr.r.st]);F.lastAns={id:p.id,n:p.n,ms,r:dr.r,pre:p.pre,pr:p.pr,tries:p.tries};try{CW.lockNext();render()}catch(e){}}
COOP.on("thinview",V=>{try{if(!host()&&V&&V.o)answered(V.o.dr)}catch(e){console.error("thin F view",e)}});
COOP.on("error",m=>{try{const p=F.pend;if(!p||!m||m.id!==p.id||host())return;if(m.code==="nohost"||m.code==="nothin")p.at=0/* resend at the next tick */}catch(e){}});
setInterval(()=>{const p=F.pend;if(!p||host())return;if(!on()||COOP.frozen)return;if(Date.now()-p.at<8000)return;
 if(p.tries>=3){F.pend=null;F.stat.give++;lg(["give",p.n,p.id]);line("Việc ấy chưa thành, xin thử lại.");try{CW.lockNext();render()}catch(e){}return}
 p.tries++;F.stat.resend++;lg(["resend",p.n,p.id,p.tries]);sendF(p)},1000);
COOP.on("room",()=>{F.pend=null});
/* pending = busy: #next waits (existing lockNext words through CW.eWait), act buttons off (can) */
{const w=CW.eWait;CW.eWait=()=>!!(w&&w())||!!(F.pend&&on()&&!host())}
if(typeof can==="function"){const f=can;can=function(){if(F.pend&&on()&&!host()&&!CW.ctx)return false;return f.apply(this,arguments)}}

/* ---------- host ---------- */
const DONE=new Map();
function doneLoad(){try{const o=JSON.parse(localStorage.getItem(LSK())||"null");if(o&&Array.isArray(o.d))for(const [k,v] of o.d)DONE.set(k,v)}catch(e){}}
function doneSave(){try{while(DONE.size>60)DONE.delete(DONE.keys().next().value);localStorage.setItem(LSK(),JSON.stringify({d:[...DONE]}))}catch(e){}}
let loaded="";
TH.onDo("f",(a,m)=>{a=a||{};const id=m&&m.id;if(loaded!==LSK()){DONE.clear();doneLoad();loaded=LSK()}
 if(id&&DONE.has(id)){F.stat.dup++;lg(["dup",a.n,id]);return DONE.get(id)}
 const R=F.R[a.n];if(!R||!on()){return {st:"off"}}
 if(Array.isArray(a.ops)&&a.ops.length){TH.pApply(S,a.ops);try{D.rebase()}catch(e){}}
 let out={st:"ok"};const keep=[];
 try{for(const [n,g,s] of R.ctx||[]){keep.push([s,g()]);s(n in (a.c||{})?a.c[n]:null)}
  const args=R.dec(a.a);if(!args){out={st:"gone"}}
  else{const r=PRE[a.n].apply(null,args);F.stat.run++;if(R.log&&r)log(r);out={st:"ok",r:typeof r==="string"?r.replace(/<[^>]+>/g,"").slice(0,200):null}}}
 catch(e){console.error("thin F run",a.n,e);out={st:"err",e:String(e&&e.message||e).slice(0,200)}}
 finally{for(const [s,v] of keep)try{s(v)}catch(e){}}
 lg(["run",a.n,out.st]);if(id){DONE.set(id,out);doneSave()}return out});

/* ---------- the wrapper ---------- */
F.reg=function(name,R){const f=window[name];if(typeof f!=="function"||F.R[name])return false;F.R[name]=R;PRE[name]=f;
 window[name]=function(){if(!on()||host()||!R.mine(arguments))return f.apply(this,arguments);
  if(!gOn()){F.stat.local++;return f.apply(this,arguments)}
  intent(name,[...arguments]);return R.ret!==undefined?R.ret:""};return true};

/* ---------- F1: runAct (her Hành động acts) ---------- */
F.reg("runAct",{log:true,
 mine:A=>isMe(A[0])&&!!A[1]&&!isMe(A[1]),
 enc:A=>{const t=A[1],k=A[2],x=A[3];const id=t[RAW]?t[RAW].id:t.id;if(id==null||!ACT[k])return null;
  const o={t:id,k};if(typeof x==="number"){o.x=x;const e=S.inv&&S.inv[x];if(e)o.xe=J(C0(e))}else if(x!=null)o.xv=J(x);return o},
 dec:a=>{if(!a||!ACT[a.k])return null;const t=(rivals||[]).find(v=>v&&v.id===a.t);if(!t||t===S)return null;let x=a.xv;
  if(a.xe){const s=JSON.stringify(a.xe);let i=(S.inv||[]).findIndex(e=>JSON.stringify(C0(e))===s);if(i<0&&typeof a.x==="number"&&S.inv[a.x]&&S.inv[a.x].k===a.xe.k)i=a.x;if(i<0)return null;x=i}
  else if(typeof a.x==="number")x=a.x;return [S,t,a.k,x]},
 ctx:[["sg",()=>typeof SG==="object"&&SG.mod?SG.mod:null,v=>{if(typeof SG==="object")SG.mod=v}],["err",()=>S.__err||null,v=>{S.__err=v||0}]]});
function C0(e){const o=Object.assign({},e);delete o.ci;return o}
}catch(e){console.error("jcoopthinf",e)}})();
