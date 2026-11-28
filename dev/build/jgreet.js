/* ================= jgreet: ONE GREETING NAME RULE + AG-MEET (owner 17/11 05:12Z, chosen 05:28Z; 05:25Z) =================
   GREETING (greetName(a,b,o), a greets b; the SAME function for her → NPC, NPC → her, NPC ↔ NPC, every greeting site):
   - the LOWER rank always names herself first ("Thần thiếp <tên>, <phẩm> ở <cung>, thỉnh an …") → the higher one learns her name;
   - the lower one learns the higher one's name at once when the title is held by one seat or is a chí tôn (BAL.seatCap[r] === 1:
     Hoàng hậu, Hoàng quý phi; Hoàng thượng, Thái hậu) or a herald calls it (BAL.greet.ann, o.ann: thỉnh an, festival);
   - otherwise the higher one gives her name or not BY HER NẾT (BAL.net.n.greetName via nv(): Kiêu ngạo / Lạnh lùng → only a nod);
   - equals: each gives her name unless she is proud / cold (same table).
   The result line is story text (owner 24/11: narration + her words by RANK, never «Ta đã biết… Vì sao…»). Names/faces are written through j61 (k61Know / npcLearn) — no second "known" store.
   AG-MEET (agent law OD:L1386): each buổi every consort present at a place where others are spends her ONE deed of the buổi (jagent agUse) on
   approaching someone there or keeps her schedule — utility from her own needs (agNeeds ally / spite) × her nết (BAL.net.n.meetW); whom: strangers
   (grey shadows) at random weight, known people by thiện cảm / oán (mindPickBy, human slip). If she picks HER and they share a khắc and a place, she
   comes to her at that khắc (kit Q card "Có người đến", the same queue approaches() j24 uses) and uses one of the player's own person-dialog options
   (j9 topicOpts kinds + Khiêu khích) with the same numbers mirrored (judge = her); her replies = her own topicOpts entries for that person (same
   formulas), free of khắc (the visitor spent hers). NPC ↔ NPC: the greeting rule (names learnt both ways by the rule). Host only (agOn).
   State: S.gmeet {key, pend:[{vid,kh,pl,key}]} (lazy; old saves load without it). Perf: one pass over the consorts per buổi (window.__gmMs). */
const GM={stat:{tick:0,stay:0,meet:0,her:0,npc:0,shown:0,drop:0,byPl:{},byOpt:{}},ms:[]};
function grRank(p){const R=BAL.greet.rank;if(!p||!S)return 0;if(p===S.emp)return R.top;if(S.thO&&p===S.thO)return R.th;
 if(p===S){try{if(typeof isSrv==="function"&&isSrv())return R.srv+(S.srv.mama?R.mama:srkTier(+S.srv.rk||0))}catch(e){}return S.out?R.out:R.cons+(rkOf(S)||0)}
 if((rivals||[]).includes(p))return p.out?R.out:R.cons+(rkOf(p)||0);
 let k="";try{k=k61Kind(p)}catch(e){}if(k==="man"||k==="off"||k==="phys")return R.man;if(k==="tq")return R.srv+R.tq;if(k==="mama")return R.srv+R.mama;if(k==="kid")return R.cons+R.kid;
 return R.srv+srkTier(+p.rk||0,p.role)}/* maid rung → tier (maid-ladder-6) */
/* one seat / chí tôn: everyone knows who holds it */
function grUniq(p){if(!p||!S)return false;if(p===S.emp||(S.thO&&p===S.thO))return true;const cons=p===S?!(typeof isSrv==="function"&&isSrv()):(rivals||[]).includes(p);
 if(!cons||p.out)return false;try{return BAL.seatCap[rkOf(p)]===1}catch(e){return false}}
function grHerald(p,o){if(o&&o.ann)return true;try{return !!BAL.greet.ann[p===S?"me":kOf61(p)]}catch(e){return false}}
function grTT(p){try{const n=netOf(p);return n?n[0]:""}catch(e){return""}}
/* does p give her name back (she is the higher / equal side and nobody heralds her)? */
function grNet(p){try{return nv(p,"greetName")?1:0}catch(e){return 1}}
/* g = how the GIVER's name reaches the other: low (she named herself, lower), uniq (one seat), ann (herald), net (her nết said yes/no), me (her choice) */
function grGive(g,o2,rg,ro,o,side){if(rg<ro)return{y:1,w:"low"};if(grUniq(g))return{y:1,w:"uniq"};if(grHerald(g,o))return{y:1,w:"ann"};
 if(g===S&&o&&o.me!=null)return{y:o.me?1:0,w:"me"};return{y:grNet(g),w:"net",t:grTT(g),eq:rg===ro}}
function grLearn(x,y){if(!x||!y||x===y||!S)return;try{if(x===S){if(S.known&&k61St(y)<2)k61Know(y,"",true,2)/* greet-stranger: a public name (Hoàng hậu, level 0/1) still needs face + level 2, else the gate asks "Chào hỏi" again forever */;grMet(y)}else if(y===S)npcLearn(x,S);else npcLearn(x,y)}catch(e){}}
function grFace(x,y){if(x!==S||!S||!S.known)return;try{if(k61St(y)<1)k61Know(y,"",true,1);grMet(y)}catch(e){}}
function grMet(y){try{if((rivals||[]).includes(y)&&y.id!=null){S.met=S.met||{};if(S.met[y.id]==null)k61MetSet(y)}}catch(e){}}
/* she knows x's name / x knows hers BEFORE the greeting */
function grKnew(x,y){try{if(x===S)return k61Named(y);return npcKnows(x,y)}catch(e){return true}}
function greetName(a,b,o){o=o||{};const ra=grRank(a),rb=grRank(b);const ka=grKnew(b,a),kb=grKnew(a,b);
 const A=grGive(a,b,ra,rb,o),B=grGive(b,a,rb,ra,o);
 if(A.y)grLearn(b,a);else grFace(b,a);if(B.y)grLearn(a,b);else grFace(a,b);
 const G={a,b,A,B,newA:!ka&&A.y,newB:!kb&&B.y,ra,rb};G.line=a===S||b===S?grLine(G):"";GM.stat["g_"+A.w]=(GM.stat["g_"+A.w]||0)+1;return G}
/* ---- words (VANPHONG: cổ trang; the nết is named only when she knows it) ---- */
function grPron(p){try{if(p===S.emp)return"Hoàng thượng";if(S.thO&&p===S.thO)return"Thái hậu";const k=typeof k61Kind==="function"?k61Kind(p):"";if(/^(man|off|phys|eun|tq)$/.test(k))return"người ấy"/* greet-stranger: thái y, thái giám, quan, nam nhân */;return netSex(p)==="m"?"người ấy":"nàng"}catch(e){return"nàng"}}
function grKnowsT(p,t){try{return !!t&&(rivals||[]).includes(p)&&(trKnown(p)||[]).includes(t)}catch(e){return false}}
/* ONE speech table (owner 24/11, review rv-visitor-fix 2/3/4): self-address + address by KIND and RANK — consort → one of the three chí tôn «Thần thiếp», consort → another consort «Tần thiếp», quan / thái y «Vi thần», thái giám «Nô tài», cung nữ «Nô tỳ», ma ma «Lão nô»; the one spoken to is «<phẩm> nương nương» (Tần and up) / «<phẩm> tiểu chủ» (Quý nhân and below), Hoàng thượng, «Thái hậu nương nương» — never her personal name, never «ngươi» inside a quote; the fog descriptor is narration only */
function grRk(p){try{return p===S?(rkOf(S)|0):(p&&p.queen?7:+p.rank||0)}catch(e){return 0}}
function grTop(b){try{return b===S.emp||(S.thO&&b===S.thO)||(b!==S&&(rivals||[]).includes(b)&&!!b.queen)}catch(e){return false}}
function grSelf(a,b){let k="";try{k=a===S?(typeof isSrv==="function"&&isSrv()?"maid":"consort"):k61Kind(a)}catch(e){}
 if(k==="consort"||k==="")return grTop(b)?"Thần thiếp":"Tần thiếp";if(k==="eun"||k==="tq")return"Nô tài";if(k==="maid")return"Nô tỳ";if(k==="mama")return"Lão nô";if(k==="kid")return"Nhi thần";return"Vi thần"}
function grVerb(a){let k="";try{k=a===S?"consort":k61Kind(a)}catch(e){}return/^(man|off|phys)$/.test(k)?"tham kiến":"thỉnh an"}
function grAddr(b,named){try{if(b===S.emp)return"Hoàng thượng";if(S.thO&&b===S.thO)return"Thái hậu nương nương";
 if(b===S&&typeof isSrv==="function"&&isSrv())return"chủ tử";const cons=b===S||(rivals||[]).includes(b);if(!cons)return"nương nương";
 const r=grRk(b),band=r>=3?"nương nương":"tiểu chủ";if(b!==S&&named===false)return band;return b.queen?"Hoàng hậu nương nương":`${RANKS[Math.min(7,r)].n} ${band}`}catch(e){return"nương nương"}}
function grSay(a,b){let bn=true;try{bn=b===S||k61Named(b)}catch(e){}return`“${grSelf(a,b)} ${grVerb(a)} ${grAddr(b,bn)}.”`}
function grLine(G){/* story text (owner 24/11 ~22:02Z + ~22:08Z): a scene in cổ trang with her words, by RANK — the lower one greets first, the higher one answers; never system reasoning («Ta đã biết… Vì sao…»: the know-notice is the kit notice of k61Know). G.arr = the visitor already announced herself at the door (gmOpts) */
 const me=G.a===S,e=me?G.b:G.a,mine=me?G.A:G.B,hers=me?G.B:G.A;let nm=false;try{nm=k61Named(e)}catch(x){}
 const E=nm?k61Title(e):k61Desc(e),Ec=k61Cap(E),P=grPron(e),Pc=k61Cap(P);
 if(mine.w==="low"){/* she is the lower: she greets first, in words */
  const b=hers.y?`${Pc} khẽ nâng tay: “${e===S.emp?"Bình thân":"Miễn lễ"}.”`:(nm?`${Pc} chỉ khẽ gật đầu đáp lễ.`:`${Pc} chỉ khẽ gật đầu, không xưng danh.`);
  return `Ngươi hành lễ: ${grSay(S,e)} ${b}`}
 if(hers.w==="low"){/* the other is the lower: she greets first, her side answers */
  return `${G.arr?"":`${Ec} hành lễ: ${grSay(e,S)} `}${mine.y||G.arr?"Ngươi khẽ nâng tay: “Miễn lễ.”":`Ngươi chỉ khẽ gật đầu đáp lễ; ${P} chưa biết tên ngươi.`}`}
 /* equals: each greets */
 return `Hai bên chào nhau theo lễ${hers.y||nm?"":`; ${P} không xưng danh`}.${mine.y||G.arr?"":` ${Pc} chưa biết tên ngươi.`}`}
/* the arrival as a stage line (owner 24/11 ~22:08Z): a higher rank is announced, a lower / equal one announces herself; at her residence the door lines, elsewhere road lines (rv-visitor-fix 6) */
function visitArrive(v){try{const up=grRank(v)>grRank(S),nmd=k61Named(v),T=k61Cap(nmd?k61Title(v):k61Desc(v)),home=S.place==="home";
 if(up)return home?`Ngoài điện có tiếng xướng: “${T} giá đáo!”`:`Phía trước có tiếng cung nhân xướng: “${T} giá đáo!”`;
 /* she names herself at the door (owner 24/11 ~22:08Z: «người đó xưng tên ngay từ ở cửa») */const s=grSelf(v,S)+" "+T;return home?`Ngoài cửa có tiếng thưa: “${s} xin cầu kiến.”`:`Có người rảo bước tới, cúi đầu thưa: “${s} xin ra mắt.”`}catch(e){return""}}
/* a visitor who is NOT a consort (quan, thái y, thái giám, cung nữ…): the same door line, in her own voice by kind */
function visitArriveK(e){try{const s=grSelf(e,S)+(e&&e.name?" "+e.name:"");return S.place==="home"?`Ngoài cửa có tiếng thưa: “${s} xin cầu kiến.”`:`Có người rảo bước tới, cúi đầu thưa: “${s} xin ra mắt.”`}catch(x){return""}}
function visitSeen(v){try{if(!v||v===S||!S||!S.known)return;window.__k61noKn=1;try{if(typeof k61St==="function"&&k61St(v)<2)k61Know(v,"",true,2);grMet(v)}finally{window.__k61noKn=0}}catch(e){}}
/* the preview of "Chào hỏi" (what is sure: her own name; theirs by the rule — the nết part is not known before) */
function grPreview(a,b){const ra=grRank(a),rb=grRank(b);const P=grPron(b);const L=["thấy mặt, rõ thân phận"];
 L.push(ra<rb?`ngươi xưng danh trước, ${P} biết tên ngươi`:ra===rb?"ngang hàng: mỗi bên xưng danh hay không tùy tính nết":`${P} phận dưới, xưng danh trước`);
 if(rb>ra)L.push(grUniq(b)?"tên người ấy: ngôi chỉ một người giữ, biết ngay":"tên người ấy: tùy tính nết có xưng danh đáp lễ hay không");
 else if(rb<ra)L.push("biết tên người ấy");if(rb<ra&&a===S&&!grUniq(S))L.push("tên ngươi: tùy tính nết ngươi có xưng danh đáp lễ hay không")/* r1: what happens to her own name is said too */;return L.join(" · ")}

/* ===================== the greeting sites (LUẬT SỬA CẢ NHÓM: every one goes through greetName) ===================== */
/* 0 greet-stranger (owner 18/11 01:38Z): the stranger gate again as the outer wrapper, so no kind can skip it (jmen "min" did) */
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{return typeof k61Gate==="function"?k61Gate(p,A):A}catch(x){return A}}})();
/* 1 j61 talk face to face: "Chào hỏi" / "Hành lễ" of a stranger (was: face only + a 2nd tap "Hỏi danh tính"): the tap is edited in j61 (greetName); here the preview */
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(A&&A[0]&&A[0].k61==="greet"){const e=k61Ent(A[0].kke);if(e)A[0]=Object.assign({},A[0],{x:grPreview(S,e)})}}catch(x){}return A}})();
/* 2 j61 NPC acts on her face to face (SOC run / runAct ally·gift): edited in j61 itself to call greetName(v,S) (was: her name + theirs always) */
/* 3 thỉnh an Hoàng hậu / Thái hậu (the player's deck act and the shared deed twDo, NPCs too): a herald calls every name (o.ann) */
(function(){if(typeof twDo!=="function")return;const tw0=twDo;twDo=function(a,t,k){const r=tw0.apply(this,arguments);try{if(r&&a&&(k==="thHH"||k==="thTH")){const h=k==="thTH"?S.thO:(typeof queenP==="function"?queenP():null);if(h&&h!==a)greetName(a,h,{ann:1})}}catch(e){}return r}})();
/* 4 j42 (cung nữ life) "Hành lễ thỉnh an" before a consort, "Chào hỏi đúng lễ" with a man; 5 j22 (consort life) "Chào hỏi đúng lễ" with a man */
function grWrapOpt(A,re,who){try{for(const o of A||[]){if(!o||!re.test(o.n||""))continue;const e=who(o);if(!e)continue;for(const f of ["run","go"]){const f0=o[f];if(typeof f0!=="function")continue;
  o[f]=function(){const r=f0.apply(this,arguments);let G=null;try{G=greetName(S,e)}catch(x){}if(f==="run"&&G&&(G.newA||G.newB))return (r?r+" ":"")+G.line;if(f==="go"&&G&&(G.newA||G.newB))try{log(G.line)}catch(x){}return r}}}}catch(e){}return A}
(function(){if(typeof srvTalk!=="function")return;const s0=srvTalk;srvTalk=function(p){const A=s0.apply(this,arguments);try{
  const who=p&&p.sk==="man"?()=>manById(p.mid):p&&(p.sk==="rv"||p.sk==="hh")?()=>p.ref&&RV(p.ref.id):null;if(who)grWrapOpt(A,/^(Chào hỏi đúng lễ|Hành lễ thỉnh an)$/,who)}catch(e){}return A}})();
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(p&&(p.kind==="man"||p.kind==="min")&&p.ref)grWrapOpt(A,/^Chào hỏi đúng lễ$/,()=>p.ref)/* min: officials too (greet-stranger) */}catch(e){}return A}})();

/* ===================== AG-MEET: people at a place come to HER (and to each other) ===================== */
function gmZ(){const z=S.gmeet=S.gmeet||{};z.pend=Array.isArray(z.pend)?z.pend:[];return z}
function gmOn(){try{return agOn()&&BAL.greet.meet.on&&!S.out}catch(e){return false}}
/* who is where this buổi, khắc by khắc (ledger: the same record she walks in), from now to the end of the buổi */
function gmPlaces(){const R=agRec();const k0=agKh();const out=[];if(!R)return out;
 for(let kh=k0;kh<J95.KH;kh++){const M={};for(const id in R.P){const e=R.P[id][kh];if(!e||!e[0])continue;if(e[1]==="tryst"||e[1]==="meet")continue;(M[e[0]]=M[e[0]]||[]).push(id)}out.push([kh,M])}return out}
function gmPerson(id){if(id==="me")return S;if(id&&id[0]==="v")return RV(+id.slice(1));return null}
/* her ONE deed of the buổi: approach someone here, or keep her schedule (agent law: needs × nết, human slip) */
function gmWant(v){const B=BAL.greet.meet;let N;try{N=agNeedsC(v)}catch(e){return 0}const u=((N.ally||0)+(N.spite||0)*B.spite)*nv(v,"meetW");return u}
function gmPickT(v,C){const B=BAL.greet.meet;return mindPickBy(C,x=>{let k=false;try{k=npcKnows(v,x)}catch(e){}/* r1: her bonds with the one she knows decide, whether or not that one knows her name */
  if(!k)return B.base;/* a grey shadow to her: picked at random */return B.base+Math.max(0,aff(v,x))/B.affK+Math.max(0,typeof agSpite==="function"?agSpite(v,x):0)/B.oanK},v)}
function gmTick(){if(!gmOn())return;const t0=performance.now();const z=gmZ();const key=agKey();if(z.key===key)return;z.key=key;z.pend=z.pend.filter(p=>p.key===key);GM.stat.tick++;
 try{const PL=gmPlaces();const seen=new Set();const B=BAL.greet.meet;let nHer=0;
  for(const [kh,M] of PL)for(const pl in M){const ids=M[pl];if(ids.length<2)continue;
   for(const id of ids){if(id[0]!=="v"||seen.has(id))continue;const v=gmPerson(id);if(!v||!v.alive||v.out||v.confined&&pl!==palaceOf(v))continue;
    if(agUsed(v)){continue}seen.add(id);
    const u=gmWant(v);if(agPw([["stay",B.stay],["meet",u]])==="stay"){GM.stat.stay++;continue}
    const C=ids.filter(x=>x!==id).map(gmPerson).filter(x=>x&&x!==v&&x.alive!==false&&!x.coop&&!(x!==S&&x.out));if(!C.length)continue;
    const t=gmPickT(v,C);if(!t)continue;if(t===S&&nHer>=B.max)continue;agUse(v);GM.stat.meet++;GM.stat.byPl[pl]=(GM.stat.byPl[pl]||0)+1;
    if(t===S){nHer++;GM.stat.her++;z.pend.push({vid:v.id,kh,pl,key})}else{GM.stat.npc++;try{greetName(v,t)}catch(e){}}}}}catch(e){try{agErr("gmeet",e)}catch(x){}}
 const ms=performance.now()-t0;window.__gmMs=ms;GM.ms.push(ms);if(GM.ms.length>60)GM.ms.shift()}
/* she stands there at that khắc → they come to her */
function gmWatch(){if(!gmOn())return;const H=agHereKh();if(!H)return;const z=gmZ();let n=0;
 for(const p of z.pend.slice()){if(p.key!==H.R.key){z.pend.splice(z.pend.indexOf(p),1);continue}if(p.kh<H.kh){GM.stat.drop++;z.pend.splice(z.pend.indexOf(p),1);continue}
  if(p.kh!==H.kh||p.pl!==H.k)continue;const v=RV(p.vid);z.pend.splice(z.pend.indexOf(p),1);if(!v||!v.alive||v.out)continue;
  const m=gmCard(v);if(m){Q.push(m);try{stat().un++}catch(e){}GM.stat.shown++;n++}}
 if(n)try{showModal()}catch(e){}}
/* what she does to her: the player's own person-dialog options (j9 topicOpts kinds), mirrored: the visitor acts, SHE is the judge */
/* voice by tính tình (jtone.js): the predicate of the card's narration in HER tone; {x} = a third person's name; falls back to the plain words */
function gmSay(k,v,plain,x){let t=plain;try{const P=window.TONE_POOL&&TONE_POOL["greet"+k];if(P&&!(grRank(v)>grRank(S)))t=kLine("greet:"+k.toLowerCase(),P,{about:v})}catch(e){}return String(t).replace(/\{x\}/g,x==null?"":x)}
function gmOpts(v){const A=[],B=BAL.greet.meet;const f=chatF(v),g=n=>Math.max(1,Math.round(n*f));const met=npcKnows(v,S)&&S.known&&k61Named(v);
 const W=tag=>{let w=1;try{for(const t of traitsOf(v)){const R=BAL.net.T[t];if(R&&R.w&&R.w[tag]!=null)w*=R.w[tag]}}catch(e){}return w};
 const fr=Math.max(0,aff(v,S)),sp=Math.max(0,typeof agSpite==="function"?agSpite(v,S):0);
 if(!met){A.push({k:"greet",w:W(B.opt.greet),run:()=>{const hi=grRank(S)>grRank(v)&&!grUniq(S)&&!grHerald(S);const G=greetName(v,S,hi?{me:0}:{});visitSeen(v);G.line=grLine(G);/* rank decides who greets first: a higher visitor stops before her and waits (her side greets, see grLine); only an equal / lower one bows to her */const up=grRank(v)>grRank(S);G.arr=1;try{npcLearn(v,S)}catch(x){}/* she came to HER door to ask for an audience: she knows whose palace it is (rv-visitor-fix r7) */G.line=grLine(G);const T=k61Cap(k61Named(v)?k61Title(v):k61Desc(v)),Pn=k61Cap(grPron(v));/* arrival as a stage line (owner 24/11 ~22:08Z): a higher rank is announced at the door, a lower one announces herself; then her walk in HER tone */const tone=(window.TONE_POOL&&kLine(up?"greet:comehi":"greet:come",up?TONE_POOL.greetComeHi:TONE_POOL.greetCome,{about:v}))||(up?"tiến lại, dừng bước trước mặt ngươi":"tiến lại, cúi chào ngươi");return{h:`${visitArrive(v)} ${Pn} ${tone}.`,line:G.line,G}}});return A}
 const TK=BAL.talk,third=liveRivals(true).filter(x=>x!==v&&x!==S).sort((a,b)=>aff(v,a)-aff(v,b))[0];
 A.push({k:"health",w:W(B.opt.health)*(1+fr/B.affK),run:()=>{const n=g(TK.health);affAdd(S,v,n);chatMark(v);return{h:`${v.name} ${gmSay("Health",v,"hỏi han sức khỏe ngươi")}.`,line:`Ngươi quý nàng +${n}.`}}});
 {const o=talkPraiseO(v),n=g(nv(S,"praise"));A.push({k:"praise",w:W(B.opt.praise)*(1+fr/B.affK),run:()=>{chatMark(v);if(roll(o)){affAdd(S,v,n);return{h:`${v.name} ${gmSay("Praise",v,"khen tài nghệ của ngươi")}.`,line:`Ngươi quý nàng +${n}.`}}affAdd(S,v,-TK.praiseFail);return{h:`${v.name} ${gmSay("Praise",v,"khen tài nghệ của ngươi")}.`,line:`Ngươi cho là nàng giả lả. Ngươi quý nàng -${TK.praiseFail}.`}}})}
 if(fr>=TK.secretBond)A.push({k:"secret",w:W(B.opt.secret)*(1+fr/B.affK),run:()=>{const n=g(TK.secret);affAdd(S,v,n);chatMark(v);return{h:`${v.name} ${gmSay("Secret",v,"kéo ngươi ra một góc, kể chuyện riêng")}.`,line:`Ngươi quý nàng +${n}.`}}});
 if(third)A.push({k:"gossip",w:W(B.opt.gossip),run:()=>{chatMark(v);if(aff(S,third)<0){const n=g(TK.gossip.hit);affAdd(S,v,n);oanAdd(S,third,TK.gossip.oan);return{h:`${v.name} ${gmSay("Gossip",v,"ghé tai bàn tán về {x}",third.name)}.`,line:`Hợp chuyện: ngươi quý nàng +${n}.`}}affAdd(S,v,-TK.gossip.miss);return{h:`${v.name} ${gmSay("Gossip",v,"ghé tai bàn tán về {x}",third.name)}.`,line:`Ngươi không ưa chuyện ấy: ngươi quý nàng -${TK.gossip.miss}.`}}});
 const foe=liveRivals(true).filter(x=>x!==v&&oan(x,S)>=netTh(x,"act"))[0];
 if(foe&&fr>0)A.push({k:"warn",w:W(B.opt.warn)*(1+fr/B.affK),run:()=>{const n=g(TK.warn.hit);affAdd(S,v,n);oanAdd(S,foe,TK.warn.oan);return{h:`${v.name} ${gmSay("Warn",v,"nhắc ngươi coi chừng {x}",foe.name)}.`,line:`Ngươi quý nàng +${n}.`}}});
 if(sp>0&&!sameHouse(S,v)&&mockOK(v,S)/* rank respect */){const PK=TK.provoke;A.push({k:"provoke",w:W(B.opt.provoke)*sp/B.oanK,run:()=>{let dO=0;const dA=affGot(S,v,()=>{dO=oanGot(S,v,()=>relAdd(v,S,-PK.rel))})/* PVQUY-POST-3 item E (MAIN 189, law 4): a result line prints the number really applied (measured before/after the write) */;try{ap(v,{danh:PK.danh})}catch(e){}try{agVent(v,S,"provoke")}catch(e){}return{h:`${v.name} ${gmSay("Provoke",v,"buông lời khiêu khích ngươi trước mặt mọi người")}.`,line:`Ngươi quý nàng ${balSg(dA)}, oán nàng ${balSg(dO)}.`}}})}
 return A}
/* her replies: her own topicOpts entries for this person (same numbers), no khắc (the visitor spent hers); a proud higher one or a nod also offered */
function gmReplies(v,G){const T=n=>{try{return topicOpts(v).find(a=>a.n===n)}catch(e){return null}};
 const wrap=a=>a&&{n:a.n,fx:a.c||{},x:oddsCapped(a)?kitCapLine(a.x?"thành: "+a.x:"",a.c):a.x||"",go:()=>{let r="";try{if(a.c)apply(a.c);r=a.run?(oddsCapped(a)&&!roll(BAL.odds.hi)?oddsSoft("",null):a.run()):(runOpt(a)?"thành":"hỏng")}catch(e){}if(r)log(`${a.n}: ${r}`)}};
 /* she is the higher one and nobody heralds her: her answer is HER choice (the rule's trait step is her own) */
 if(G&&G.B&&G.B.w==="me"&&!G.arr)return[{n:"Xưng danh đáp lễ",fx:{},x:`${grPron(v)} biết tên ngươi`,go:()=>{npcLearn(v,S);log(`Ngươi xưng danh đáp lễ ${v.name}.`)}},
  {n:"Khẽ gật đầu",fx:{},x:`giữ thể diện · ${grPron(v)} chưa biết tên ngươi`,go:()=>{log(`Ngươi chỉ khẽ gật đầu với ${v.name}.`)}}];
 if(!k61Named(v))return[{n:"Lặng lẽ đáp lễ",fx:{},x:"chưa biết tên người ấy",go:()=>{}}];
 const R=[];for(const n of ["Hỏi han sức khỏe","Khen tài nghệ nàng","Chia sẻ bí mật"]){const a=wrap(T(n));if(a)R.push(a)}
 R.push({n:"Khéo cáo lui",fx:{},x:"không thêm lời, giữ hòa khí đôi bên",go:()=>{}});return R}
function gmCard(v){const O=gmOpts(v);if(!O.length)return null;const c=agPw(O.map(o=>[o,Math.max(BAL.mind.pickMin,o.w)]));GM.stat.byOpt[c.k]=(GM.stat.byOpt[c.k]||0)+1;
 let r;window.__k61noKn=1;try{r=c.run()}finally{window.__k61noKn=0}/* announced at the door: no «Ngươi biết tên» toast beside the scene */
 try{log(`${r.h} ${r.line}`)}catch(e){}
 return gmReplyCard(v,c.k==="provoke",r.G,r.h,r.line)}
/* r4: the reply card (after the visitor's act ran) is carried as data (j3 rcpReg): v, provoke, G, the two lines */
const gmReplyCard=rcpReg("gmReply",(v,prov,G,h1,h2)=>{let opts;if(prov){try{opts=apHostOpts(v)}catch(e){opts=null}}
 if(!opts)opts=gmReplies(v,G);
 visitSeen(v);const who=pv(v);/* a visitor is always known by sight: face + name at the standard figure size, never the grey silhouette */
 if(!G){const T=k61Title(v);if(String(h1).startsWith(v.name+" "))h1=T+h1.slice(v.name.length)}/* a met visitor: arrival line first, then the visit with her title (rv-visitor-fix 5) */return{ev:1,t:"Có người đến",who,h:`${G?"":`<p>${visitArrive(v)}</p>`}<p>${h1}</p><p>${h2}</p>`,opts}});
(function(){
 /* before the agent loop's deciders: approaching is one of her uses of the buổi's ONE deed; who approaches keeps her deed (agUse), the rest decide as before */
 const at0=agTick;agTick=function(){try{gmTick()}catch(e){}return at0.apply(this,arguments)};
 const w0=agWatch;agWatch=function(){const r=w0.apply(this,arguments);try{gmWatch()}catch(e){}return r};
})();
/* a visitor card never opens on the grey loading stand-in (owner 22:08Z, MAIN 132 / LC13 visitor-scene): her full figure is preloaded first (≤ 4 s), then the card shows — every «Có người đến» card with a consort on it, high or low rank */
(function(){const s0=showModal;showModal=function(){const m=Q[0];
 try{if(m&&m.t==="Có người đến"&&m.who&&m.who.w&&m.who.w[0]==="r"&&m.__fcW==null&&typeof kitFigOf==="function"){const v=RV(m.who.w[1]);if(v){visitSeen(v);const src=kitFigOf(v);
   if(src&&!/unknown-fig/.test(src)){const im=new Image();m.__fcW=1;let done=false;const go=()=>{if(done)return;done=true;m.__fcW=2;try{if(typeof renderStage==="function")renderStage()}catch(e){}/* her stage token is now the real figure, not the stand-in */try{showModal()}catch(e){}};im.onload=go;im.onerror=go;im.src=src;
    if(im.complete){done=true;m.__fcW=2;try{if(typeof renderStage==="function")renderStage()}catch(e){}}else{setTimeout(go,4000);return undefined}}}}}catch(e){}
 if(m&&m.__fcW===1)return undefined;return s0.apply(this,arguments)}})();
Object.assign(window,{visitSeen,visitArrive,visitArriveK,grSay,grSelf,grAddr,greetName,grRank,grUniq,gmTick,gmWatch,gmOpts,GM});
