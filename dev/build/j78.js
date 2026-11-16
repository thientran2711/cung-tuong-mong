/* ================= j78: TIN TAI MẮT + CHỨNG CỨ — data and logic only (rendering belongs to the kit owner, j79) =================
   1. Every eavesdrop / dò la / nghe lén returns concrete TRUE facts read from the live world state (a plan she prepares,
      evidence she holds on you, a hidden pregnancy, illicit things in her chest, a past deed, whom she hates or likes,
      where she is this buổi, her Sủng, a trait). Facts are stored deduped in S.intel[id] (same fact key once; newer replaces older).
   2. Every piece of evidence you hold on a consort (v.ev, the old counter, stays authoritative) gets a record in S.evd[id]:
      what it proves, how and when it was obtained. Records follow the counter (gained → added, used → oldest removed).
   3. Evidence has real uses, all ordinary two-way acts (anyone can do them to anyone, same odds and costs):
      Tố giác, Tố tội thật, Bóc chuyện tư tình (existing) + Trình Thái hậu, Trình Hoàng hậu, Uy hiếp đòi bạc,
      Bán cho phe khác, Trả chứng cứ lấy lòng (new). They sit in their own card group "Dùng chứng cứ" (no longer under Hại nặng).
   Public API for the kit: intelOf(p), evidenceOf(p), evidenceActs(p), evidenceDo(id,k), evidenceHeldOnMe(), j78Ref(p).
   ============================================================================================================= */
const J78={cur:null,ctx:null,seq:0};
function j78who(p){if(!p)return"";if(p===S)return"ngươi";if(p.alive===undefined&&p.name)return p.name;try{if(typeof kitKnownName==="function"&&typeof k61Mask==="function"&&p.rank!=null&&!kitKnownName(p))return k61Mask(p)}catch(e){}/* unmet consort: "<tước> ???" (reign-road-fix-r1) */return `${rkName(p)} ${p.name}`}
function j78Who(p){const s=j78who(p);return s?s[0].toUpperCase()+s.slice(1):s}
function j78when(){return `T${S.month}/${S.year} ${TUAN[S.tuan]}`}
/* a person reference the kit renders (title coloured by rank + face) */
function j78Ref(p){if(!p)return null;if(p===S)return{key:"me",me:true,name:S.name,rank:S.rank,title:rkName(S),face:pMe()};return{key:p.id,id:p.id,name:p.name,rank:rkOf(p),title:rkName(p),face:pv(p)}}
function j78actN(k){return ACT[k]?ACT[k].n.toLowerCase():k}
const J78VERB={accuse:"tố giác {t}",block:"rút thẻ bài thị tẩm của {t}",bribe:"mua chuộc cung nữ của {t}",catswap:"mua chuộc bà đỡ hại {t}",expose:"bóc chuyện tư tình của {t}",frame:"vu oan {t}",kframe:"vu con của {t} trù ẻo",kpoison:"hạ độc con của {t}",ksab:"phá việc học của con {t}",lygian:"ly gián {t} với Hoàng thượng",musk:"bỏ xạ hương hại thai {t}",plant:"cài đồ vào rương {t}",poison:"hạ độc {t}",pond:"đẩy con của {t} xuống hồ",pushp:"đẩy {t} xuống hồ sen",road:"chặn ngự giá, tranh sủng với {t}",rumor:"tung tin đồn về {t}",slowpoison:"hạ độc dần {t}",spy:"dò la {t}",steal:"tranh sủng với {t}",takeaway:"xin bế con của {t} về nuôi",tocao:"tố tội {t}",trip:"ngáng chân {t}",vp:"tố {t} vượt phẩm",xinhh:"xin Hoàng hậu giáng {t}",uyhiep:"uy hiếp {t} đòi bạc",banphe:"bán chứng cứ về {t}",trinhth:"trình chứng cứ về {t} lên Thái hậu",trinhhh:"trình chứng cứ về {t} lên Hoàng hậu",tieuhuy:"trả chứng cứ cho {t}"};
function j78act(k,t){const w=typeof t==="string"?t:j78who(t);return (J78VERB[k]||j78actN(k)+" {t}").replace("{t}",w)}

/* ---------- 0. real deeds: every act a consort carries out is remembered (the world state the facts and proofs read) ---------- */
(function(){const r0=runAct;runAct=function(a,t,k){const prev=J78.cur;J78.cur={a,t,k};let r="";try{r=r0.apply(this,arguments)}finally{J78.cur=prev}
 try{if(a&&a!==S&&t&&ACT[k]&&r&&k!=="ally"&&k!=="gift"){S.deeds=S.deeds||[];S.deeds.unshift({a:a.id,t:key(t),k,w:wk(),when:j78when(),ok:!FAILRX.test(r)});if(S.deeds.length>80)S.deeds.length=80}}catch(e){}return r}})();
function j78deeds(v){return (S.deeds||[]).filter(d=>d.a===v.id&&byKey(d.t))}
function j78deedTxt(v,d){const t=byKey(d.t);return `${d.when}: ${j78who(v)} ${d.ok?"đã":"định"} ${j78act(d.k,t)}${d.ok?"":" nhưng không thành"}`}

/* ---------- 1. TIN TAI MẮT ---------- */
function intelAdd(v,f,src){if(!S||!v||v===S)return;S.intel=S.intel||{};const L=S.intel[v.id]=S.intel[v.id]||[];
 const i=L.findIndex(x=>x.k===f.k);if(i>=0)L.splice(i,1);L.unshift({k:f.k,kind:f.kind,txt:f.txt,w:wk(),when:j78when(),by:src.by,how:src.how,bk:bkey()});if(L.length>20)L.length=20}
/* candidate facts about v, all true right now; pri = how much it is worth to her */
function j78facts(v){const F=[];const W=j78Who(v);
 try{if(v.plan&&ACT[v.plan.k]){const t=byKey(v.plan.t);const n=Math.max(1,v.plan.due-bq());if(t)F.push({k:"plan",kind:"plan",pri:100,txt:`${W} đang chuẩn bị ${j78act(v.plan.k,t)}, định ra tay trong ${n} buổi tới.`,go:()=>{if(t===S){S.onGuard=S.onGuard||{};S.onGuard[v.id]=v.plan.k;return " Ngươi đã đề phòng: lúc nàng ra tay, mưu khó thành hơn."}return ""}})}}catch(e){}
 const me=(v.evm&&v.evm.me)||0;if(me>0)F.push({k:"evme",kind:"evme",pri:90,txt:`${W} đang nắm ${me} chứng cứ về ngươi${me>=accNeed(S)?", đủ để tố giác ngươi":""}.`});
 try{const m=v.affair&&manById(v.affair);if(m)F.push({k:"affair",kind:"secret",pri:85,txt:`${W} lén lút tư thông với ${m.name}.`})}catch(e){}
 if(v.preg&&v.hidden)F.push({k:"preg",kind:"secret",pri:80,txt:`${W} đang giấu thai, đã được ${v.preg} tháng.`});
 const bad=(v.inv||[]).filter(e=>e.t||(IT[e.k]&&(IT[e.k].il||IT[e.k].mat)));if(bad.length)F.push({k:"items",kind:"secret",pri:75,txt:`Trong rương ${j78who(v)} có ${bad.map(e=>iname(e)+(e.t&&TAINT[e.t]?` (${TAINT[e.t].n})`:"")).join(", ")}.`});
 S.intel=S.intel||{};const known=new Set((S.intel[v.id]||[]).map(x=>x.k));
 const dd=j78deeds(v).filter(d=>!known.has("deed:"+d.w+":"+d.k+":"+d.t));if(dd.length){const d=dd[0];F.push({k:"deed:"+d.w+":"+d.k+":"+d.t,kind:"deed",pri:d.t==="me"?78:70,txt:j78deedTxt(v,d)+"."})}
 const O=others(v).filter(x=>x===S||x.alive&&!x.out);
 if(O.length){const h=O.map(x=>[x,danger(v,x)]).sort((a,b)=>b[1]-a[1])[0];const b=bandOf(h[1]);
  if(b>0)F.push({k:"hate",kind:"hate",pri:60,txt:`${W} để bụng ${j78who(h[0])} nhất; mức nguy hiểm với người ấy: ${BANDS[b][1]}.`,go:()=>{if(h[0]===S){S.dKnown=S.dKnown||{};S.dKnown[v.id]=wk()}return ""}});
  else F.push({k:"hate",kind:"hate",pri:20,txt:`${W} hiện chưa oán ai đến mức ra tay.`});
  const f=O.map(x=>[x,aff(v,x)]).sort((a,b)=>b[1]-a[1])[0];if(f&&f[1]>=30)F.push({k:"ally",kind:"ally",pri:40,txt:`${W} thân với ${j78who(f[0])} nhất.`})}
 try{const T=traitsOf(v).filter(t=>!trKnown(v).includes(t));if(T.length)F.push({k:"trait:"+T[0],kind:"trait",pri:50,txt:`${W} có nết ${T[0]}.`,go:()=>{const N=(kn().notes[v.id]||[]).length;learnTrait(v,"Tai mắt dò được");const L=S.notes[v.id]||[];if(L.length>N||L.length===6)L.shift();return ""}})}catch(e){}
 if(!together(S,v))F.push({k:"where",kind:"where",pri:35,txt:`Buổi này ${j78who(v)} ở ${placeName(whereOf(v))}.`,go:()=>{seeLoc(v);return ""}});
 const nm=(v.nightLog||[]).filter(w=>w>=S.turn*3).length;F.push({k:"sung",kind:"sung",pri:30,txt:`${W} được lật thẻ ${nm} lần trong tháng này; Sủng ${v.sung}.`,go:()=>{kn();S.kf[v.id]={s:v.sung,n:nm,w:wk()};return ""}});
 return F}
/* learn up to n facts not already known in the same form; returns the sentence(s) */
function intelLearn(v,n,src){if(!S||!v||v===S)return"";S.intel=S.intel||{};const L=S.intel[v.id]||[];
 const F=j78facts(v).filter(f=>{const o=L.find(x=>x.k===f.k);return !o||o.txt!==f.txt||(f.kind==="where"&&o.bk!==bkey())}).map(f=>Object.assign(f,{r:f.pri+R(25)})).sort((a,b)=>b.r-a.r).slice(0,n||1);
 let out=[];for(const f of F){let extra="";try{if(f.go)extra=f.go()||""}catch(e){}intelAdd(v,f,src);out.push(f.txt+extra)}
 if(out.length)noteAdd(v.id,`${src.by} dò được: ${out.join(" ")}`);return out.join(" ")}
const J78_WHERE="(Đã ghi vào mục Đã biết trên thẻ nàng và Nhật ký.)";
function intelOf(p){if(!S||!p||p===S)return[];S.intel=S.intel||{};return (S.intel[p.id]||[]).map(x=>{let now=true;
  if(x.kind==="where")now=x.bk===bkey();else if(x.k==="plan")now=!!p.plan;else if(x.k==="preg")now=!!(p.preg&&p.hidden);else if(x.k==="affair")now=!!p.affair;
  return {fact:x.txt,kind:x.kind,week:x.w,when:x.when,by:x.by,how:x.how,current:now}})}

/* ---------- 2. CHỨNG CỨ: one record per piece ---------- */
function j78proof(v){/* what a new piece proves: the most telling real thing not yet proven */
 S.evd=S.evd||{};const have=new Set((S.evd[v.id]||[]).map(e=>e.ref).filter(Boolean));
 const dd=j78deeds(v).filter(d=>!have.has("deed:"+d.w+":"+d.k+":"+d.t));const fresh=dd.find(d=>wk()-d.w<=6);
 const mk=d=>({proves:j78deedTxt(v,d),ref:"deed:"+d.w+":"+d.k+":"+d.t,aim:d.t});
 if(fresh)return mk(fresh);
 try{const m=v.affair&&manById(v.affair);if(m&&!have.has("affair"))return{proves:`${j78Who(v)} lén lút tư thông với ${m.name}`,ref:"affair"}}catch(e){}
 if(v.plan&&ACT[v.plan.k]&&!have.has("plan:"+v.plan.due)){const t=byKey(v.plan.t);if(t)return{proves:`${j78Who(v)} chuẩn bị ${j78act(v.plan.k,t)}`,ref:"plan:"+v.plan.due,aim:v.plan.t}}
 const bad=(v.inv||[]).filter(e=>e.t||(IT[e.k]&&(IT[e.k].il||IT[e.k].mat)));if(bad.length&&!have.has("items"))return{proves:`${j78Who(v)} giấu trong rương ${bad.map(iname).join(", ")}`,ref:"items"};
 const vp=vpItems(v);if(vp.length&&!have.has("vp"))return{proves:`${j78Who(v)} dùng đồ quá phẩm: ${vp.map(e=>IT[e.k].n).join(", ")}`,ref:"vp"};
 if(dd.length)return mk(dd[0]);
 const O=others(v).filter(x=>x===S||x.alive&&!x.out).map(x=>[x,hostility(v,x)]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]);
 const h=O.find(x=>!have.has("talk:"+key(x[0])));if(h)return{proves:`lời ${j78who(v)} nói xấu ${j78who(h[0])} sau lưng`,ref:"talk:"+key(h[0]),aim:key(h[0])};
 const t0=O.length?O[0][0]:(queenP()&&queenP()!==v?queenP():S);const c=(S.evd[v.id]||[]).filter(e=>e.ref&&e.ref.indexOf("talk:"+key(t0))===0).length;return{proves:`lời ${j78who(v)} nói xấu ${j78who(t0)} sau lưng, lần thứ ${c+1} có người nghe thấy`,ref:"talk:"+key(t0)+":"+c,aim:key(t0)}}
function j78mkEvd(v,ctx){const c=ctx||{};const p=c.proves?{proves:c.proves,ref:c.ref||null,aim:c.aim}:j78proof(v);
 return {n:++J78.seq,w:c.legacy?null:wk(),when:c.legacy?"":j78when(),how:c.how||"Tai mắt của ngươi",proves:p.proves,ref:p.ref,aim:p.aim||null}}
/* keep S.evd in step with the counters; announce new pieces with what they prove and what they allow now */
function evdSync(ctx){if(!S||!rivals)return;S.evd=S.evd||{};const legacy=!S.evdV;const fresh=[];
 for(const v of rivals){const L=S.evd[v.id]=S.evd[v.id]||[];const n=Math.max(0,v.ev||0);if(L.length>n)L.splice(0,L.length-n);
  while(L.length<n){let c=ctx||J78.ctx;if(legacy)c={legacy:1,how:"Đã có từ trước khi sổ chứng cứ được lập"};else if(!c){c={how:"Tai mắt của ngươi"}/* owner 16:55Z: never the text of whatever log line last named her (a gift is not evidence) */}
   const e=j78mkEvd(v,c);L.push(e);if(!legacy)fresh.push([v,e])}}
 S.evdV=1;J78.lseq=S.logSeq||0;if(fresh.length&&!S.dead){const by={};for(const [v,e] of fresh)(by[v.id]=by[v.id]||[v,[]])[1].push(e);for(const id in by){const [v,E]=by[id];log(j78gainTxt(v,E))}J78.lseq=S.logSeq||0}}
function j78gainTxt(v,E){const A=evidenceActs(v);const tw=whyTime(2);const ok=A.filter(a=>!a.why||a.why===tw).map(a=>`${a.n} (${a.gain[0]||""})`);const need=A.filter(a=>a.why&&/chứng cứ/.test(a.why)).map(a=>`${a.n}: ${a.why}`);
 /* owner 11/15 16:55Z: the line says where the evidence came from (who found what, by which road), one source per piece, never another
    event's text and never the card's help ("Dùng được ở thẻ nàng …"); no double full stop */
 const cut=s=>String(s||"").replace(/<[^>]+>/g,"").replace(/[\s.。!?;,]+$/,"");const lc=s=>{s=cut(s);return s?s.charAt(0).toLowerCase()+s.slice(1):""};
 return `<b>Ngươi có thêm chứng cứ về ${j78who(v)}</b>: `+E.map(e=>`${cut(e.proves)}${e.how?` (nguồn: ${lc(e.how)})`:""}`).join("; ")+"."}
/* every gain of evidence gets its context */
(function(){const e0=evA;evA=function(h,t,n){if(h===S&&t&&t!==S&&n>0&&!J78.ctx){const c=J78.cur;let ctx=null;
  if(c&&c.a===t&&c.t===S)ctx={how:`Người của ngươi bắt quả tang ${j78who(t)}`,proves:`${j78Who(t)} định ${j78act(c.k,S)}`,aim:"me"};
  else if(c&&c.a===S&&c.t===t)ctx={how:`Ngươi ${j78act(c.k,t)}`};
  else if(c&&c.a&&c.a!==S&&c.t&&c.t!==S)ctx={how:`Tai mắt của ngươi thấy ${j78who(t)} ra tay`};
  J78.ctx=ctx;try{const r=e0.apply(this,arguments);evdSync();return r}finally{J78.ctx=null}}
 const r=e0.apply(this,arguments);evdSync();return r}})();
(function(){const s0=seenNPC;seenNPC=function(v,t,txt){if(!txt||t===S||v===S)return s0.apply(this,arguments);const prev=J78.ctx;J78.ctx={how:"Tai mắt của ngươi thấy tận mắt",proves:plain(txt).replace(/\s*\(sai .*?đi\)\s*$/,"")};try{return s0.apply(this,arguments)}finally{J78.ctx=prev}}})();
(function(){const c0=chooseM;chooseM=function(i){const m=Q[0];const c=m&&m.opts&&m.opts[i];const prev=J78.ctx;
  if(c&&!prev)J78.ctx={how:`${m.t}: ${plain(c.n)}`,__t:plain(m.h||"")};
  try{return c0.apply(this,arguments)}finally{try{evdSync()}finally{J78.ctx=prev}}}})();
/* event text is the proof when it names her */
(function(){const m0=j78mkEvd;j78mkEvd=function(v,c){if(c&&c.__t&&!c.proves){const s=c.__t.split(kRx("(?<=[.!?])\\s+","")).find(x=>x.includes(v.name));if(s)c=Object.assign({},c,{proves:s.replace(/[.!?]$/,"")})}return m0.call(this,v,c)}})();
(function(){const t0=talk;talk=function(oi){const p=S&&curPeople()[popIdx];let a=null;try{a=p&&talkOpts(p)[oi]}catch(e){}const prev=J78.ctx;
  if(a)J78.ctx={how:p.kind==="maid"?`${S.maid.name} được sai đi dò la`:p.kind==="fallen"?`${j78Who(p.ref)} (phế phi) kể chuyện cũ`:a.n};
  try{return t0.apply(this,arguments)}finally{J78.ctx=prev;evdSync()}}})();
(function(){const r0=render;render=function(){try{if(S&&!S.dead)evdSync()}catch(e){}return r0.apply(this,arguments)}})();

/* ---------- 3. eavesdrops that now say WHAT was learned ---------- */
/* the target of a maid's dò la is fixed for the buổi, so the card can name her and the failure can say who caught the maid */
function j78maidT(){const L=liveRivals(true);if(!L.length)return null;S.mspy=S.mspy||{};if(S.mspy.b!==bkey()||!L.some(v=>v.id===S.mspy.id))S.mspy={b:bkey(),id:pick(L).id};return RV(S.mspy.id)}
function j78maidFail(ag){const x=j78maidT();if(!x)return;oanAdd(x,S,5);S.mspy.done=1;const M=ag||S.maid;
 log(`${M.name} nấp nghe ngoài cửa sổ ${placeName(palaceOf(x))} thì bị người của ${j78who(x)} bắt gặp, bị phạt quỳ ngoài sân. ${M.role==="eunuch"?"Hắn":"Nàng"} sợ vì bị sai việc nguy hiểm: lòng -5. ${j78Who(x)} đoán ra ngươi sai người dò mình: oán ngươi +5.`)}
function j78maidSpy(ag){const x=j78maidT();if(!x)return"";const M=ag||S.maid;
 const facts=intelLearn(x,2,{by:M.name,how:"Sai đi dò la"});J78.ctx={how:`${M.name} được sai đi dò la`};const n=evA(S,x,1);evdSync();J78.ctx=null;
 log(`${M.name} nghe lén chuyện của ${j78who(x)}: ${facts}${n?"":" Không có gì sai trái để làm chứng cứ."} ${J78_WHERE}`);return ""}
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{
  if(p&&p.kind==="maid"){const i=A.findIndex(a=>a.n==="Sai đi dò la");const x=j78maidT();if(i>=0&&x)A[i]=Object.assign({},A[i],{x:`nghe lén ${j78who(x)}: biết 2 điều thật về nàng · chứng cứ +1 nếu nàng từng làm điều sai`,risk:`${S.maid.name} bị bắt gặp thì sợ hãi (lòng -5) · ${j78who(x)} đoán ra ngươi: oán ngươi +5`,go:j78maidSpy,fail:j78maidFail})}
  if(p&&p.kind==="rival"){const i=A.findIndex(a=>a.n==="Nghe lén câu chuyện");if(i>=0)A[i]=Object.assign({},A[i],{x:"biết 1 điều thật về nàng · chứng cứ +1 nếu nàng từng làm điều sai"})}
  if(p&&p.kind==="fallen"&&p.ref){const i=A.findIndex(a=>a.n==="Hỏi chuyện cũ");if(i>=0){const f=p.ref;A[i]=Object.assign({},A[i],{x:"biết 1 việc thật một phi tần đã làm · chứng cứ +1 nếu có",go:()=>{const t=liveRivals(true);if(!t.length)return;const withDeed=t.filter(v=>j78deeds(v).length);const x=pick(withDeed.length?withDeed:t);
    const facts=intelLearn(x,1,{by:`${j78Who(f)} (phế phi)`,how:"Hỏi chuyện cũ"});J78.ctx={how:`${j78Who(f)} (phế phi) kể chuyện cũ`};const n=evA(S,x,1);evdSync();J78.ctx=null;log(`${j78Who(f)} kể chuyện của ${j78who(x)}: ${facts}${n?"":" Không có gì sai trái để làm chứng cứ."} ${J78_WHERE}`)}})}}
  if(p&&p.kind==="th"){const pk=S.ktPick&&RV(S.ktPick);const i=A.findIndex(a=>/^Kể tội/.test(a.n));
   if(i>=0&&pk&&pk.alive&&!pk.out&&!pk.queen&&(pk.ev||0)>0){const t=pk;A[i]=Object.assign({},A[i],{n:`Kể tội ${t.name}`,lock:false,o:od(40+t.ev*10+S.th/5),go:()=>{t.rel-=15;t.ev--;t.sung=cl(t.sung-10,0,100);S.ktPick=null;log(`${j78Who(t)} bị Thái hậu quở trách, mất sủng.`)}})}}
 }catch(e){}return A}})();
overhear=function(k){const here=liveRivals(true).filter(v=>whereOf(v)===k);if(here.length<2)return"";const v=pick(here);
 if(roll(od(40+S.mat*6))){const facts=intelLearn(v,1,{by:"Ngươi",how:"Nghe lén câu chuyện"});J78.ctx={how:"Ngươi nghe lén câu chuyện"};evA(S,v,1);J78.ctx=null;return `Ngươi nghe lén ${j78who(v)} nói chuyện: ${facts} ${J78_WHERE}`}return "Không nghe được gì."};
/* the Dò la act (player): one fact besides the piece of evidence */
(function(){const d0=doAct;doAct=function(i,k){const v=rivals[i];if(!v||k!=="spy")return d0.apply(this,arguments);const e0=v.ev||0;const n0=S.logSeq||0;J78.ctx={how:"Ngươi sai người dò la"};let r;try{r=d0.apply(this,arguments)}finally{J78.ctx=null}
  try{if((v.ev||0)>e0){const m=v.affair&&manById(v.affair);const L=(S.evd||{})[v.id]||[];if(m&&S.logs.slice(0,(S.logSeq||0)-n0).some(x=>x.includes("lén gặp"))){L.slice(-2).forEach(e=>{e.proves=`${j78Who(v)} lén lút tư thông với ${m.name}`;e.ref="affair";e.how="Tai mắt bắt gặp tận mắt"})}
   const f=intelLearn(v,1,{by:"Tai mắt",how:"Dò la"});if(f){log(`Dò la ${j78who(v)}: ${f} ${J78_WHERE}`);render()}}}catch(e){}return r}})();
(function(){const f0=ACT.spy.f;ACT.spy.f=function(a,t){const r=f0.apply(this,arguments);if(a===S&&/bị phát hiện/.test(r||""))return r+`(Người của ${j78who(t)} bắt gặp kẻ rình rập: nàng quý ngươi -8, oán ngươi +5.) `;return r}})();
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(p&&p.kind==="chest"&&p.ref){const v=p.ref;const i=A.findIndex(a=>a.n==="Lục rương tìm chứng cứ");if(i>=0){const r0=A[i].run;A[i]=Object.assign({},A[i],{x:"chứng cứ +1",risk:`cung nhân của ${j78who(v)} bắt gặp: nàng quý ngươi -15, oán ngươi +9, ngươi bị cấm túc vì lục lọi cung phi tần`,run:()=>{const r=r0();return /bắt gặp/.test(r)?`Cung nhân của ${j78who(v)} bắt gặp ngươi lục rương: nàng quý ngươi -15, oán ngươi +9; ngươi bị phạt vì lục lọi cung phi tần.`:r}})}}}catch(e){}return A}})();
/* scouting where she is: the place is a fact too */
(function(){const s0=scout;scout=function(id){const v=rivals.find(x=>x.id===id);const b=v&&locKnown(v);const r=s0.apply(this,arguments);try{if(v&&!b&&locKnown(v))intelAdd(v,{k:"where",kind:"where",txt:`Buổi này ${j78who(v)} ở ${placeName(whereOf(v))}.`},{by:"Tai mắt",how:"Sai tai mắt dò nơi ở"})}catch(e){}return r}})();
/* a visit card with a result shows the result, not "already talked" on top of it */
(function(){const p0=pcard;pcard=function(o){if(o&&o.note&&/Lần ghé này đã nói chuyện/.test(o.empty||""))o=Object.assign({},o,{empty:""});return p0.call(this,o)}})();

/* ---------- 4. evidence acts: ordinary two-way acts ---------- */
function j78buyer(a,t){const L=others(t).filter(x=>x!==a&&(x===S||x.alive&&!x.out)&&(!facOf(t)||facOf(x)!==facOf(t)));if(!L.length)return null;return L.map(x=>[x,hostility(x,t)]).sort((p,q)=>q[1]-p[1])[0][0]}
function j78pay(t){return Math.min(60,Math.max(0,Math.floor(t===S?S.bac:(t.bac||0))))}
function j78thFav(a){return a===S?S.th:0}
A("trinhth","Trình Thái hậu",{c:{duc:-2},ok:(a,t)=>evG(a,t)>=1&&!S.thDead&&rkOf(t)<7,o:(a,t)=>odA(a,40+evG(a,t)*10+j78thFav(a)/5),
 f:(a,t)=>{ap(a,{duc:-2});evA(a,t,-1);if(roll(odA(a,40+(evG(a,t)+1)*10+j78thFav(a)/5))){ap(t,{sung:-10});affAdd(t,a,-15);if(a===S)apply({th:2});return `${j78Who(a)} trình chứng cứ lên Thái hậu: ${j78who(t)} bị quở trách (Sủng -10). `}
  if(a===S)apply({th:-4});return `Thái hậu gạt chứng cứ ${j78who(a)} trình về ${j78who(t)}. `}});
A("trinhhh","Trình Hoàng hậu",{c:{},ok:(a,t)=>{const q=queenP();return evG(a,t)>=2&&q&&q!==a&&q!==t},o:(a,t)=>{const q=queenP();return q?cl(35+aff(q,a)/2+evG(a,t)*8,5,95):5},
 f:(a,t)=>{const q=queenP();const o=cl(35+aff(q,a)/2+evG(a,t)*8,5,95);evA(a,t,-2);if(roll(o)){punish(t,"bị Hoàng hậu xét tội theo chứng cứ",1);affAdd(t,a,-10);return `${j78Who(a)} trình chứng cứ lên Hoàng hậu: ${j78who(t)} bị xét tội. `}affAdd(q,a,-5);return `Hoàng hậu bác chứng cứ ${j78who(a)} trình về ${j78who(t)}. `}});
A("uyhiep","Uy hiếp đòi bạc",{c:{},ok:(a,t)=>evG(a,t)>=1&&j78pay(t)>=10,o:(a,t)=>odA(a,45+evG(a,t)*8-witOf(t)/5),
 f:(a,t)=>{const o=odA(a,45+evG(a,t)*8-witOf(t)/5);const g=j78pay(t);if(roll(o)){evA(a,t,-1);ap(t,{bac:-g});ap(a,{bac:g});oanAdd(t,a,10);return `${j78Who(t)} sợ chuyện lộ, đưa ${j78who(a)} ${g} lượng bạc để chuộc lại một chứng cứ. `}
  oanAdd(t,a,15);ap(a,{danh:-3});return `${j78Who(t)} không chịu đưa bạc cho ${j78who(a)}, còn rêu rao bị uy hiếp. `}});
A("banphe","Bán cho phe khác",{c:{},ok:(a,t)=>evG(a,t)>=1&&!!j78buyer(a,t),o:null,
 f:(a,t)=>{const b=j78buyer(a,t);const n=evG(a,t);if(!b)return"";evA(a,t,-99);evA(b,t,n);ap(a,{bac:15*n});relAdd(a,b,8);oanAdd(t,a,5);return `${j78Who(a)} bán ${n} chứng cứ về ${j78who(t)} cho ${j78who(b)} lấy ${15*n} lượng bạc. `}});
A("tieuhuy","Trả chứng cứ lấy lòng",{c:{},ok:(a,t)=>evG(a,t)>=1,o:null,
 f:(a,t)=>{const n=evG(a,t);evA(a,t,-99);affAdd(t,a,Math.min(30,8*n));oanAdd(t,a,-Math.min(30,10*n));ap(a,{duc:2});return `${j78Who(a)} trả lại ${n} chứng cứ cho ${j78who(t)}; nàng mang ơn. `}});
/* presenting or returning proof is done in person or by letter, never by a servant who can be caught (one rule for all) */
const J78NOSEND=["trinhth","trinhhh","banphe","tieuhuy"];
(function(){const r0=runAct;runAct=function(a,t,k){if(!J78NOSEND.includes(k))return r0.apply(this,arguments);const tg=together;together=(x,y)=>(x===a&&y===t)||(x===t&&y===a)?true:tg(x,y);let r;try{r=r0.apply(this,arguments)}finally{together=tg}return String(r||"").replace(/ \(tại [^)]*\)\s*$/," ")}})();
Object.assign(ACTDOM,{trinhth:"Danh",trinhhh:"Danh",uyhiep:"Mưu kế",banphe:"Mưu kế",tieuhuy:"Giao thiệp"});
/* the act card lines read the target being shown (true numbers per target) */
function j78out(k,a,t){const n=evG(a,t);const q=queenP();const m=has("nongnay")?3:has("nhantu")?1:2;const W=t?j78who(t):"nàng";
 if(k==="trinhth")return[`${W} Sủng -10 · Thái hậu quý ngươi +2`,"Thái hậu quý ngươi -4"];
 if(k==="trinhhh")return[`${W} bị cấm túc ${m} tháng`,"Hoàng hậu thiện cảm -5"];
 if(k==="uyhiep")return[`Bạc +${t?j78pay(t):0} · kèm: ${W} oán ngươi +10`,`Danh -3 · ${W} oán ngươi +15`];
 if(k==="banphe"){const b=t&&j78buyer(a,t);return[`Bạc +${15*n} · ${b?j78who(b):"người mua"} thiện cảm +8 · ${b?j78who(b):"người mua"} nắm ${n>0?n+" ":""}chứng cứ về ${W} · kèm: ${W} oán ngươi +5`,""]}
 if(k==="tieuhuy")return[`${W} quý ngươi +${Math.min(30,8*n)} · ${W} oán ngươi -${Math.min(30,10*n)} · Đức +2`,""];
 return null}
["trinhth","trinhhh","uyhiep","banphe","tieuhuy"].forEach(k=>{try{Object.defineProperty(AOUT,k,{configurable:true,enumerable:true,get(){const t=J78.cardV;const o=j78out(k,S,t);return o}})}catch(e){}});
/* disabled reason on her card for the new acts: the real missing condition */
["trinhth","trinhhh","uyhiep","banphe","tieuhuy"].forEach(k=>{try{Object.defineProperty(ACT[k],"x",{configurable:true,get(){const v=J78.cardV;if(!v)return "cần chứng cứ";const e=evidenceActs(v).find(a=>a.k===k);return e&&e.why&&e.why!==whyTime(2)?e.why:"cần chứng cứ"}})}catch(e){}});
(function(){const g0=rvGroups;rvGroups=function(v){const prev=J78.cardV;J78.cardV=v;try{return g0.apply(this,arguments)}finally{J78.cardV=prev}}})();
/* the cost of using evidence shows on the card (Tốn row) */
(function(){const a0=actLineRaw;actLineRaw=function(k,w,c){const v=J78.cardV;const use={accuse:"all",expose:"all",tocao:1,trinhth:1,trinhhh:2,uyhiep:1,banphe:"all",tieuhuy:"all"}[k];
  if(v&&use){const n=evG(S,v);const u=use==="all"?n:use;if(u>0)c=[c,`Chứng cứ -${u}`].filter(Boolean).join(", ")}return a0.call(this,k,w,c)}})();
/* one obvious group on her card: "Dùng chứng cứ" (accusing with real proof is not "harming") */
const J78EVK=["accuse","tocao","expose","trinhth","trinhhh","uyhiep","banphe","tieuhuy"];
(function(){for(const g of RVGRP)g[1]=g[1].filter(k=>!J78EVK.includes(k));RVGRP.splice(1,0,["Dùng chứng cứ",J78EVK.slice()])})();
/* the same acts for every consort: NPCs holding evidence use them too (light weights) */
BANDS[1][2].push("uyhiep","banphe");BANDS[2][2].push("trinhth","trinhhh");
(function(){const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{const b=bandOf(danger(v,t));if(b&&evG(v,t)>=1){const allow=BANDS.slice(1,b+1).flatMap(x=>x[2]);
  for(const [k,w] of [["uyhiep",1],["banphe",1],["trinhth",2],["trinhhh",2]]){if(!allow.includes(k))continue;let ok=false;try{ok=ACT[k].ok(v,t)}catch(e){}if(ok)O.push([k,w*persW(v,k)])}}}catch(e){}return O}})();
Object.assign(TELLS,{trinhhh:"sai người chép lại sổ sách, lời khai cung nhân"});

/* ---------- 5. API for the kit ---------- */
function evidenceActs(p){if(!S||!p||p===S)return[];const n=evG(S,p);const i=rivals.indexOf(p);const t2=whyTime(2);const W=j78who(p);const m=has("nongnay")?3:has("nhantu")?1:2;const R0=[];
 const odds=(k,o)=>o==null?"":word(cl(o+lotB(S,ACTDOM[k]),5,95));
 const add=(k,o)=>{const a=ACT[k];if(!a)return;let ok=false;try{ok=a.ok(S,p)}catch(e){}R0.push(Object.assign({k,n:a.n,odds:"",why:"",cost:[],gain:[],fail:[],risk:[],go:()=>evidenceDo(p.id,k)},o(ok)))};
 const nf=(need)=>`cần ${need} chứng cứ, đang có ${n}`;
 const busy=()=>!p.alive?"nàng đã mất":p.out?"nàng ở lãnh cung":sameHouse(S,p)?`cùng ${houseName(p)} với ngươi`:t2||"";
 add("accuse",ok=>{const need=accNeed(p);const tr=rkOf(p);const fall=p.queen||tr>=5?`${W} bị phế vào lãnh cung`:`${W} bị đày lãnh cung hoặc giáng xuống ${RANKS[Math.max(0,tr-2)].n}`;
  return{odds:odds("accuse",oAccuse(S,p)),why:busy()||(n<need?nf(need):rkOf(p)>=7&&S.rank<3?"tố Hoàng hậu cần phẩm Tần trở lên":""),cost:["2 khắc",`Chứng cứ -${n} (dùng hết)`],gain:[fall,"Danh +6"],fail:["Danh -8",`${W} quý ngươi -20`,`${W} oán ngươi +12`].concat(tr>=7?["phạm thượng: bị giáng một bậc hoặc cấm túc"]:[]),risk:tr>=7?["thắng: 12 tháng không được tranh ghế Hoàng hậu"]:[]}});
 add("tocao",ok=>{const cr=realCrime(p);return{odds:odds("tocao",odT(S,50+n*10)),why:busy()||(n<1?nf(1):!cr?"nàng không có tội thật nào (vượt phẩm, đồ cấm, từng bày mưu)":""),cost:["2 khắc","Chứng cứ -1"],gain:[`${W} bị giáng xuống ${RANKS[Math.max(0,rkOf(p)-1)].n} vì ${cr||"tội thật"}`,"Danh +3"],fail:["Danh -5"]}});
 add("expose",ok=>({odds:odds("expose",odT(S,45+n*8)),why:busy()||(!hasScandal(p)?"nàng không có chuyện tư tình bị lộ":n<2?nf(2):""),cost:["2 khắc",`Chứng cứ -${n} (dùng hết)`],gain:[`${W} bị ban chết hoặc vào lãnh cung`],fail:["ngươi bị tội vu khống: vào lãnh cung hoặc giáng 2 bậc"]}));
 add("trinhth",ok=>({odds:odds("trinhth",odA(S,40+n*10+S.th/5)),why:busy()||(n<1?nf(1):S.thDead?"Thái hậu đã băng hà":rkOf(p)>=7?"Thái hậu không xét tội Hoàng hậu":""),cost:["2 khắc","Đức -2","Chứng cứ -1"],gain:[`${W} Sủng -10`,"Thái hậu quý ngươi +2"],fail:["Thái hậu quý ngươi -4"],risk:[`${W} quý ngươi -15`]}));
 add("trinhhh",ok=>{const q=queenP();return{odds:q&&q!==S&&q!==p?odds("trinhhh",cl(35+aff(q,S)/2+n*8,5,95)):"",why:busy()||(!q?"chưa có Hoàng hậu":q===S?"ngươi là Hoàng hậu: dùng Xử tội":q===p?"không trình Hoàng hậu tội của chính nàng":n<2?nf(2):""),cost:["2 khắc","Chứng cứ -2"],gain:[`${W} bị cấm túc ${m} tháng`],fail:["Hoàng hậu thiện cảm -5"],risk:[`${W} quý ngươi -10`]}});
 add("uyhiep",ok=>{const g=j78pay(p);return{odds:odds("uyhiep",odA(S,45+n*8-witOf(p)/5)),why:busy()||(n<1?nf(1):g<10?"nàng không còn đủ 10 lượng":""),cost:["2 khắc","Chứng cứ -1 (trả lại khi nàng chịu chi)"],gain:[`Bạc +${g}`],fail:["Danh -3",`${W} oán ngươi +15`],risk:[`${W} oán ngươi +10`].concat(together(S,p)?[]:[`sai người đi: kẻ đi bị bắt, khai ra ngươi (${W} nắm 1 chứng cứ): ${chanceW(confessRisk(bestSent(S)))}`])}});
 add("banphe",ok=>{const b=j78buyer(S,p);return{why:busy()||(n<1?nf(1):!b?"không ai đủ ghét nàng để mua":""),cost:["2 khắc",`Chứng cứ -${n} (dùng hết)`],gain:[`Bạc +${15*n}`].concat(b?[`${j78who(b)} thiện cảm +8`,`${j78who(b)} nắm ${n} chứng cứ về ${W}`]:[]),risk:[`${W} oán ngươi +5`],buyer:b?j78Ref(b):null}});
 add("tieuhuy",ok=>({why:busy()||(n<1?nf(1):""),cost:["2 khắc",`Chứng cứ -${n} (dùng hết)`],gain:[`${W} quý ngươi +${Math.min(30,8*n)}`,`${W} oán ngươi -${Math.min(30,10*n)}`,"Đức +2"]}));
 if(S.rank>=7)R0.push({k:"judge",n:"Xử tội",odds:"",why:busy()||(n<2?nf(2):""),cost:["2 khắc",`Chứng cứ -${n} (dùng hết)`],gain:[n>=3?`${W} bị giáng một bậc hoặc cấm túc ${m} tháng`:`${W} bị cấm túc ${m} tháng`],fail:[],risk:[`${W} quý ngươi -10`,`${W} oán ngươi +6`],go:()=>evidenceDo(p.id,"judge")});
 /* one kit price line per act, ready for pbtn/kitParse */
 for(const a of R0)a.line=[a.odds,a.cost.length?"tốn: "+a.cost.join(", "):"",a.gain.length?"thành: "+a.gain.join(" · "):"",a.odds&&a.fail&&a.fail.length?"hỏng: "+a.fail.join(" · "):"",a.risk&&a.risk.length?"kèm: "+a.risk.join(" · "):""].filter(Boolean).join(" · ");
 return R0}
function evidenceOf(p){if(!S||!p||p===S)return null;evdSync();const L=((S.evd||{})[p.id]||[]).slice().reverse();
 return {who:j78Ref(p),count:evG(S,p),items:L.map(e=>({proves:e.proves,how:e.how,when:e.when||"trước khi có sổ",week:e.w,aim:e.aim?j78Ref(byKey(e.aim)):null})),acts:evidenceActs(p)}}
/* run an evidence act from the evidence card (closes that card first) */
function evidenceDo(id,k){const v=RV(id);if(!v||!S||S.dead)return;if(Q.length&&Q[0]&&Q[0].evd){Q.shift();showModal()}if(Q.length)return;const i=rivals.indexOf(v);
 if(k==="kt"){S.ktPick=v.id;if(S.place==="tn"){render();return}goTo("tn");return}
 if(k==="judge"){empAct(i,"judge");return}doAct(i,k)}
function evidenceHeldOnMe(){return liveRivals(true).filter(v=>(v.evm&&v.evm.me)>0).map(v=>({who:j78Ref(v),count:v.evm.me}))}
