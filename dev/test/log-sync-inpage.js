/* log-sync audit (owner 15/11 "Tại sao không khớp"): injected after dev/measure/inpage4.js.
   Every header stat (+ Ân tình, Thái hậu/Hoàng hậu → ta) gets an accessor on S that records each real change with its stack.
   After every bot action the Sổ ghi lines written since the last check are replayed per stat:
     "L a → b" sets the stat to b (and a must equal the replayed value: chain consistency),
     "L +n / -n" adds n, "(đã đầy X)" / "(chạm đáy X)" / "L đã đầy X" sets X.
   The replayed value must equal the live value; each miss is recorded with the code paths (stacks) that moved the stat. */
(function(){
const K={sac:"Sắc",tai:"Tài",tamco:"Tâm cơ",duc:"Đức",danh:"Danh",sung:"Sủng",bac:"Bạc",suc:"Sức",an:"Ân tình",th:"Thái hậu",hh:"Hoàng hậu"};
const KR={th:"Thái hậu(?: → (?:ta|ngươi):| quý ngươi| với ngươi:?)?(?: thiện cảm)?",hh:"Hoàng hậu(?: → (?:ta|ngươi):| quý ngươi| với ngươi:?)?(?: thiện cảm)?"};
const A=window.__aud={mis:[],checks:0,lines:0,stale:[],paths:{}};
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
const N="(-?\\d+)";const SG="([+\\-−])(\\d+)";
const FULL="(?:đã đầy|chạm đáy)";
const RX={};for(const k in K)RX[k]=new RegExp(`(?<![\\p{L}\\d])(?:${KR[k]||esc(K[k])})(?: (?:của )?(?:ngươi|ta))?:?\\s+(?:${N}\\s*→\\s*${N}(?:\\s*\\(${FULL}\\))?|${SG}(?:\\s*\\(${FULL}\\s*${N}?\\))?|${FULL}\\s+${N})`,"gu");
const strip=x=>String(x).replace(/^<span class="ld">[^<]*<\/span>/," ").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ");
let cur=null,sh={},seq=0,chg={};
Error.stackTraceLimit=60;
const WR=/^(apply|ap|log|chooseM|act|runOpt|endTurn|monthTick|nextBuoi|doAct|talk|goTo|lesson|night|nightFx|flip|step|modalStep|sensibleStep|randomStep|closeModal|showModal|Object\.f|f|Array\.forEach|go|withDeed|window\.aaDefer|aaDefer)\b/;
function stack(){const s=String(new Error().stack).split("\n").slice(3).map(l=>l.trim().replace(/^at /,"")).filter(l=>!/__aud|log-sync/.test(l));const o=[];let last="";for(const l of s){const nm=(l.match(/^([^ (]+) \(/)||[,""])[1];if(nm&&nm===last&&WR.test(nm))continue;last=nm;o.push(l)}return o.slice(0,14)}
function hook(){if(S===cur)return;cur=S;if(!S)return;
 for(const k in K){let v=S[k];const d=Object.getOwnPropertyDescriptor(S,k);if(d&&d.get&&d.get.__aud)continue;
  const g=function(){return v};g.__aud=1;
  Object.defineProperty(S,k,{get:g,set:function(x){if(x!==v&&!(v==null&&x===0)){(chg[k]=chg[k]||[]).push({o:v,v:x,st:stack()})}v=x},enumerable:true,configurable:true})}
 resync()}
function val(k){return S[k]||0}
function resync(){for(const k in K)sh[k]=val(k);seq=S.logSeq||0;chg={}}
function check(tag){if(!S){cur=null;return}if(S!==cur){hook();return}A.checks++;
 const n=Math.max(0,Math.min((S.logSeq||0)-seq,S.logs.length));const L=S.logs.slice(0,n).reverse().map(strip);A.lines+=L.length;
 const ment={};
 /* bookkeeping lines (jlogsync marker): how many, and catch-all ones without a reason */
 for(const h of S.logs.slice(0,n)){const x=String(h);if(/class="kls"/.test(x)){A.book=(A.book||0)+1;const c=/data-ls="c"/.test(x);if(c){A.bookC=(A.bookC||0)+1;{const key=strip(x).replace(/-?\d+/g,"#").replace(/\s+/g," ").trim().slice(0,110);A.bookK=A.bookK||{};A.bookK[key]=(A.bookK[key]||0)+1}if(!/\(/.test(strip(x))){A.noWhy=(A.noWhy||0)+1;if((A.noWhyEx=A.noWhyEx||[]).length<20)A.noWhyEx.push(strip(x).slice(0,160))}}}}
 for(const t of L){{const re=/=\s*([+\-−])(\d+)\s*bạc/gu;let m;while((m=re.exec(t)))sh.bac+=(m[1]==="+"?1:-1)*+m[2]}for(const k in K){RX[k].lastIndex=0;let m;while((m=RX[k].exec(t))){if(/\p{L}\s$/u.test(t.slice(Math.max(0,m.index-2),m.index))&&!/(?:^|\s)(?:ta|ngươi)\s$/u.test(t.slice(Math.max(0,m.index-7),m.index)))continue;ment[k]=1;
   if(m[1]!=null){const a=+m[1],b=+m[2];if(a!==sh[k]&&A.stale.length<300)A.stale.push({k,line:t.slice(0,220),replayed:sh[k],said:a,live:val(k),date:`T${S.month}/${S.year} t${S.tuan}`});sh[k]=b}
   else if(m[3]!=null){const d=(m[3]==="+"?1:-1)*+m[4];sh[k]=m[5]!=null?+m[5]:sh[k]+d}
   else if(m[6]!=null)sh[k]=+m[6]}}}

 for(const k in K){const live=val(k);if(sh[k]!==live){
   const c=chg[k]||[];if(!c.length){A.drift=(A.drift||0)+1;if((A.driftEx=A.driftEx||[]).length<20)A.driftEx.push({k,replayed:sh[k],live,lines:L.slice(-3).map(x=>x.slice(0,200))});continue}const key=k+" | "+(c.length?c.map(x=>x.st.slice(0,9).join(" < ")).join(" || "):"(no setter: replay drift)");
   const p=A.paths[key]=A.paths[key]||{k,n:0,ex:[]};p.n++;
   if(p.ex.length<3)p.ex.push({replayed:sh[k],live,lines:L.slice(-6).map(x=>x.slice(0,240)),ch:c.map(x=>[x.o,x.v]),tag,date:`T${S.month}/${S.year} t${S.tuan} b${S.buoi}`});
   A.mis.push(k)}}
 resync()}
window.__audCheck=check;
const st0=window.__bot.step;window.__bot.step=function(mode,n){for(let i=0;i<n;i++){check("pre");st0(mode,1);check("act")}return window.__res.length};
})();
