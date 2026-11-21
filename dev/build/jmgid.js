/* jmgid — CAL-P2C · IDENTITY OFFSET + ROLLING HAND b (owner OD 20/11 ~07:35Z + ~07:55Z + ~08:00Z, ROOT-74 chat; ORDER MAIN ROOT-75 07:25Z → FOREMAN D #9).
   Owner (verbatim key words): ~07:35Z "Tôi nghĩ vậy là không cần thiết phải chỉnh cái điểm của tôi lên xuống làm gì ... Bản chất nó là tôi là sở đoản của tôi, nhưng mà
   nhân vật ở trong game là sở trường. Điều đó có nghĩa là phải cộng thêm 2 bậc"; ~07:55Z "Qua mỗi một cái màn chơi nó cũng chính là những cái lần test tay của họ.";
   ~08:00Z "tất cả là đều dựa theo cái tay của cái người đó, chứ không phải là dựa theo cái tay của tôi".
   ONE CORE (BAL.orig.id in jbal2.js, BAL.orig.art / BAL.orig.doan in jbal.js):
     mgIdClass(p, kind)  → "tr" sở trường | "" bình thường | "doan" sở đoản of a person's identity (origin × road) for a mini-game kind (the kind's stats as kg82LvFor reads
                           arts, a Tứ đức board td_<k> reads the virtue k — the same map as jmgt mgOrgLv)
     mgIdB(kind, p)      → the player's hand b for that kind (S.mgB, per player, in the save; never-played = prior, the owner's device seeds her Thử tay first tries)
     mgIdOff(kind, p)    → tgt[class] − b (+ gap share), the offset added to her graded result
     mgIdRes(kind, g, o) → the RESULT of a finished play: clamp(round(g + offset)), and her b learns this play (g brought back to a matching board); KG82.idNote = the kit row
                           kg82ShowRes puts on top of the result (law 9: kitRows only, KIT_REQUESTS «sở trường» seal pending)
     mgIdShift(kind, p)  → tgt[class] − tgt[""], the identity shift an NPC's play (jmgt mgNpcRaw, law 1) and her skip / odds roll (mgSkipRaw) carry
   Wiring (edited in place): j82 kg82Play end + kg82Lesson end (every engine of KG82_ENG; the guided tutorial kgTut and jmgcal Thử tay stay raw: o.raw), j82 kg82ShowRes
   (the row), jmgt mgSkipRaw / mgNpcRaw / mgTier (t.kind). Co-op: each seat's S is personal (jcoopworld myBlob), so each player is read by HER OWN b (law 1). */
(function(){try{
function I(){return (BAL.orig&&BAL.orig.id)||{on:0}}
function mgIdOn(){const c=I();return !!c.on}
/* the identity (origin key, road) of a person: the player from S.origin + her F14 road; an NPC from jmgt mgOrgOf + her road v.nr.r */
function idOf(p){try{if(!p||typeof p!=="object")return null;if(p===S)return{o:(S.origin&&S.origin.k)||"_",r:S.st&&S.st.f14&&S.st.f14.road};
 return{o:typeof mgOrgOf==="function"?mgOrgOf(p):"_",r:p.nr&&p.nr.r}}catch(e){return null}}
function stats(kind){try{return (/^td_/.test(kind)?[kind.slice(3)]:kg82FormulaOf(kind).map(x=>x[0])).filter(s=>s&&s!=="help")}catch(e){return[]}}
function mgIdClass(p,kind){const c=I(),id=idOf(p);if(!id||!id.o||id.o==="_"||id.o==="srv")return"";
 const A=typeof originArts==="function"?originArts(id.o,id.r):{},D=(BAL.orig.doan||{})[id.o]||{},L=(id.r&&D[id.r])||D[""]||[],ss=stats(kind);
 if(ss.some(s=>(+A[s]||0)>=(c.trAt||1)))return"tr";if(ss.some(s=>L.includes(s)))return"doan";return""}
function tgt(cls){const T=I().tgt||{};return +(T[cls]!=null?T[cls]:T[""]!=null?T[""]:7.5)}
/* ---- the rolling hand b (per player per kind, S.mgB) ---- */
function store(p){p=p||S;if(!p||typeof p!=="object")return null;let M=p.mgB;if(!M||typeof M!=="object")M=p.mgB={};return M}
function seed(kind){try{const c=I(),C=BAL.ag&&BAL.ag.mg2&&BAL.ag.mg2.cal,e=C&&C.on&&C.k&&C.k[kind];
 if(!e||!isFinite(+e.b)||(c.noSeed||[]).includes(kind)||!(typeof mgCalOwner==="function"&&mgCalOwner()))return null;return{b:+e.b,w:(c.seedW||0)*(+e.n||1)}}catch(e){return null}}
function entry(kind,p){const M=store(p);if(!M)return null;let E=M[kind];if(!E||typeof E!=="object"||!isFinite(+E.s)||!isFinite(+E.w)){const c=I(),pw=+c.pw||0,pr=+c.prior;
  E=M[kind]={s:pw*pr,w:pw,n:0};const sd=p===S||!p?seed(kind):null;if(sd&&sd.w>0){E.s+=sd.w*sd.b;E.w+=sd.w;E.sd=1}}return E}
function mgIdB(kind,p){p=p||S;const c=I();const M=p&&p.mgB,E=M&&M[kind];if(E&&isFinite(+E.s)&&+E.w>0)return +E.s/+E.w;
 const sd=p===S?seed(kind):null,pw=+c.pw||0,pr=+c.prior;return sd&&sd.w>0?(pw*pr+sd.w*sd.b)/(pw+sd.w):pr}
/* one finished play x (already brought back to a matching board) joins her hand: newest weight 1, the older ones (and, with age 1, the prior + seed) × (1 − a) */
function learn(kind,x,p){const c=I(),E=entry(kind,p);if(!E)return;const k=1-cl(+c.a||0,0,1),pw=+c.pw||0,pr=+c.prior;
 if(c.age){E.s=E.s*k+x;E.w=E.w*k+1}else{E.s=(E.s-pw*pr)*k+x+pw*pr;E.w=(E.w-pw)*k+1+pw}E.n=(E.n|0)+1;
 E.s=Math.round(E.s*1000)/1000;E.w=Math.round(E.w*1000)/1000}
function mgIdOff(kind,p){p=p||S;const c=I();if(!c.on)return 0;const b=mgIdB(kind,p);return tgt(mgIdClass(p,kind))-b+(+c.gap||0)*(b-(+c.prior))}
function mgIdShift(kind,p){const c=I();if(!c.on||!p||typeof p!=="object")return 0;if(p!==S&&!c.npc)return 0;
 const v=tgt(mgIdClass(p,kind))-tgt("");return p===S?v+(+c.gap||0)*(mgIdB(kind,S)-(+c.prior)):v}
/* the RESULT of the player's finished play: g = the graded play (mgGrade), on the board KG82.tier (gap d). o.raw = no offset, nothing learnt (Thử tay, tutorial) */
function mgIdRes(kind,g,o){o=o||{};KG82.idNote=null;const c=I();g=cl(+g||0,0,10);if(!c.on||o.raw||typeof S==="undefined"||!S)return g;
 const T=KG82.tier&&typeof KG82.tier==="object"&&KG82.tier.kind===kind?KG82.tier:null,d=T&&isFinite(+T.d)?+T.d:0;
 const cls=mgIdClass(S,kind),b=mgIdB(kind,S),off=mgIdOff(kind,S),r=cl(Math.round(g+off),c.lo!=null?c.lo:0,c.hi!=null?c.hi:10);
 learn(kind,cl(g-(mgMedD(d,kind)-mgMedD(0,kind)),0,10),S);
 KG82.idNote={kind,cls,b:Math.round(b*10)/10,g,r,off:Math.round(off*10)/10};return r}
/* the kit row of the result (kitRows via kg82Rows, law 9): which identity class, her usual hand, graded play → result. Player words: VANPHONG (no %) */
function mgIdRow(n){if(!n||n.g===n.r)return"";const L={tr:"Sở trường",doan:"Sở đoản","":"Thân phận"}[n.cls],W={tr:"thân phận này vốn giỏi môn ấy",doan:"thân phận này vốn kém môn ấy","":"môn thường của thân phận này"}[n.cls];
 return kg82Rows([[L,`${W} · tay quen ${mgWord(Math.round(n.b))} · ${n.g}/10 → ${n.r}/10`,"t"]])}
Object.assign(window,{mgIdOn,mgIdClass,mgIdB,mgIdOff,mgIdShift,mgIdRes,mgIdRow});
}catch(e){console.error(e)}})();
