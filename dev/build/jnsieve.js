/* ================= jnsieve: NEWS SIEVE — the daily news keeps only what touches HER (owner OD 26/11 ~04:40Z, verbatim in dev/OWNER_DECISIONS.md) =================
   "Chỉ cần để những cái thông tin nào quan trọng, ảnh hưởng tới những cái điểm số của tôi ... Những cái thông tin như người này cười người kia,
   người này tạt nước người nọ không cần biết ... tổng kết mỗi tháng đó là mình tổng kết lại là người này ghét người kia thích người nọ".
   ONE sieve for every news producer (BAL.news.on):
   1. newsAdd (j28; ~40 producers: SOC deeds, agents, kỳ ngộ, toilette teasing, gifts, spies …): the deed, its witness and S.news stay exactly
      as before (law 6b; jemoact / jlost read S.news as "she heard it"). Only the NOTICE is sieved: an NPC ↔ NPC deed that does not touch her
      (her name / «ngươi» / her servants / BAL.news.keepK kinds / NS_KEEP words: evidence, the night, rank, birth, death, lãnh cung) gives no
      «Tin báo» line and no week-card row (S.news entry marked npc:1, newsHTML skips it). It is counted for the month.
   2. kitKnow (jnotice «Ta biết thêm N điều»): with nết open (BAL.news.netOpen, j28 trKnown) every «biết nết / lộ nết» line is gone; «Sổ ghi
      thêm về …» favour-book lines about others go to the month (the Sổ itself still holds them).
   3. the morning card «Tin trong cung buổi này» (j9 / j3 / jmoodknow / jmline / seenNPC …): sentence by sentence, a sentence that names
      only other people (consorts, their servants, «Trong cung truyền tai nhau», «Tai mắt thấy» …) and nothing of hers is dropped; a card left
      with nothing goes away. Sentences naming nobody (weather, court, her own things) stay.
   4. MONTHLY SUMMARY (nsMonth, at monthTick): ONE kit news panel «Tin trong cung · tổng kết tháng»: the largest thiện cảm changes between
      consorts (who now dislikes / likes whom, net change, kit chips) + whose feeling toward HER moved + how many deeds were heard of.
      Snapshot S.nsA (lazy: an old save starts its baseline at its first month end, no summary that month).
   Stats: window.NSV.stat (tests). Co-op: each seat sieves its own feed from its own S; nothing is sent. */
(function(){
const NSV=window.NSV={stat:{keep:0,drop:0,know:0,knowDrop:0,sent:0,sentDrop:0,cards:0,cardDrop:0,sum:0},log:[],mute:0};
function on(){try{return !!(BAL.news&&BAL.news.on)&&typeof S!=="undefined"&&!!S}catch(e){return false}}
const txtOf=h=>String(h==null?"":h).replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();
/* the words that make a line matter to her whoever it is about: evidence, the night / favour, rank, title, life and death, lãnh cung */
const NS_KEEP=/phát bệnh sau khi dùng|ngài chọn sang cung|hậu thưởng|trúng độc|đầu độc|hạ độc|dấu độc|thấy dấu|thẻ bài|Đêm qua|Hoàng thượng sang cung|chặn ngự giá|chứng cứ|bằng chứng|tang vật|nhân chứng|tố giác|tố cáo|thị tẩm|lật thẻ|sủng hạnh|cướp đêm|giành đêm|đêm của|được gọi nhiều nhất|tấn phong|thăng phẩm|thăng bậc|giáng|bị phế|phế ngôi|lãnh cung|cấm túc|mang thai|có thai|hạ sinh|sinh hạ|sảy thai|băng hà|qua đời|mà chết|chết đuối|ban hiệu|được mời sang cung/i;
/* sentences that are other people's business by their opening words */
const NS_NPC_LEAD=/^(Trong cung truyền tai nhau|Tai mắt thấy|Nghe nói|Có người thấy|Người của )/;
function herWords(){const L=[];try{if(S.name)L.push(S.name);if(S.maid&&S.maid.name)L.push(S.maid.name);for(const s of S.staff||[])if(s&&s.name)L.push(s.name)}catch(e){}return L}
function npcWords(){const L=[];try{for(const v of (typeof rivals!=="undefined"?rivals:[])||[])if(v&&v!==S&&v.name)L.push(v.name);
  if(typeof allServ==="function"){const mine=new Set([].concat(S.staff||[],S.maid?[S.maid]:[]));for(const s of allServ()||[])if(s&&s.name&&!mine.has(s))L.push(s.name)}}catch(e){}return L}
/* whole names only (a one-syllable name is skipped: «Hòa» is also in «Dưỡng Hòa điện») */
const wre=w=>new RegExp("(^|[^\\p{L}])"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?![\\p{L}])","u");
function hasAny(t,L){for(const w of L)if(w&&w.includes(" ")/* two syllables at least: «Hòa» alone is also a place word */&&t.includes(w)&&wre(w).test(t))return true;return false}
/* touches her: names her / «ngươi» / her household, or carries a keep word */
function nsHerLine(t){t=txtOf(t);if(!t)return false;if(/(^|[^\p{L}])(ngươi|Ngươi)([^\p{L}]|$)/u.test(t))return true;if(NS_KEEP.test(t))return true;return hasAny(t,herWords())}
/* other people's business only */
function nsNpcLine(t){t=txtOf(t);if(!t)return false;
 /* another person's mood ("truyền tai nhau … đang tình tứ, vì được lật thẻ"): the night itself is the line «Đêm qua thẻ bài của …» — the mood is hers alone */
 if(NS_MOOD.test(t))return !(/^Trong cung truyền tai nhau: (Hoàng thượng|Thái hậu)/.test(t)/* his / her mood moves her chances */||/(^|[^\p{L}])(ngươi|Ngươi)([^\p{L}]|$)/u.test(t)||hasAny(t,herWords()));
 if(NS_NPC_ONLY.test(t)&&!/(^|[^\p{L}])(ngươi|Ngươi)([^\p{L}]|$)/u.test(t)&&!hasAny(t,herWords()))return hasAny(t,npcWords());/* «X trượt khảo hạch tấn phong»: no rank moved */
 if(nsHerLine(t))return false;return NS_NPC_LEAD.test(t)||hasAny(t,npcWords())}
const NS_NPC_ONLY=/trượt khảo hạch|không đỗ khảo hạch/;
const NS_MOOD=/^Trong cung truyền tai nhau/;
function mKey(){return (S.year||0)*100+(S.month||0)}
function tally(k){try{const M=S.nsM&&S.nsM.k===mKey()?S.nsM:(S.nsM={k:mKey(),n:0,by:{}});M.n++;if(k)M.by[k]=(M.by[k]||0)+1}catch(e){}}
function note(kind,t){if(NSV.log.length<400)NSV.log.push({kind,t:txtOf(t).slice(0,160)})}

/* ---------- 1. newsAdd: the notice only ---------- */
if(typeof newsAdd==="function"){const n0=newsAdd;newsAdd=function(v,k,txt,toMe){
  if(!on()||toMe||v===S||(BAL.news.keepK||[]).includes(k)||!nsNpcLine(txt)){NSV.stat.keep++;return n0.apply(this,arguments)}
  NSV.stat.drop++;tally(k);note("news:"+k,txt);const f0=S.news&&S.news[0];NSV.mute++;let r;try{r=n0.apply(this,arguments)}finally{NSV.mute--}
  try{const f=S.news&&S.news[0];if(f&&f!==f0)f.npc=1}catch(e){}return r}}

/* ---------- 2. kitKnow: nết lines and others' favour-book lines ---------- */
if(typeof kitKnow==="function"){const k0=kitKnow;kitKnow=function(o){try{if(on()&&o&&o.text){const key=String(o.key||""),t=txtOf(o.text);NSV.stat.know++;
   const drop=(NSV.mute&&/^news:/.test(key))
    ||(BAL.news.netOpen&&/^n:/.test(key)&&/(biết nết|lộ nết|có nết)/.test(t))
    ||(/^n:/.test(key)&&/^Sổ ghi thêm/.test(t)&&!/(ngươi|Ngươi)/.test(t))
    ||(NS_NPC_ONLY.test(t)&&nsNpcLine(t))/* «X trượt khảo hạch …» */
    ||(/ kể: /.test(t)&&!/(ngươi|Ngươi)/.test(t)&&nsNpcLine(t.slice(t.indexOf(" kể: ")+5)))/* «A kể: B làm gì đó» about others (j75 tellers) */;
   if(drop){NSV.stat.knowDrop++;if(!NSV.mute)tally("so");note("know:"+key.split(":")[0],t);return}}}catch(e){}return k0.apply(this,arguments)}}

/* ---------- 3. the morning card, sentence by sentence ---------- */
const SENT=/(?<=[.!?…])\s+(?=[^\s.,;:!?…)\]»”])/u;
function sieveHtml(inner){const S0=String(inner).split(SENT);const out=[];let lastKept=true,dropped=0;
 for(const s of S0){const t=txtOf(s);if(!t){continue}
  if(/^(Lý do|Vì sao|Kết quả|Người được sai)/.test(t)){if(lastKept)out.push(s);else dropped++;continue}
  if(nsNpcLine(t)){dropped++;lastKept=false;note("card",t);continue}out.push(s);lastKept=true}
 return{h:out.join(" "),dropped}}
function sieveCard(m){if(!m||typeof m.h!=="string"||m.kit||m.__nsv)return false;if(!(m.kind==="news"||/^Tin trong cung/.test(m.t||"")))return false;
 let body=0,dropTot=0;const h=m.h.replace(/<p(\s[^>]*)?>([\s\S]*?)<\/p>/g,(all,attr,inner)=>{if(/class="past"/.test(attr||""))return all;
   const r=sieveHtml(inner);dropTot+=r.dropped;if(txtOf(r.h)){body++;return `<p${attr||""}>${r.h}</p>`}return""});
 m.__nsv=1;NSV.stat.sent+=dropTot;if(dropTot){NSV.stat.sentDrop+=dropTot;for(let i=0;i<dropTot;i++)tally("card");m.h=h}
 return !body&&dropTot>0}
function sieveQ(){if(!on()||typeof Q==="undefined")return;try{for(let i=Q.length-1;i>=0;i--){const m=Q[i];if(m&&!m.__nsv&&(m.kind==="news"||/^Tin trong cung/.test(m.t||""))){NSV.stat.cards++;if(sieveCard(m)){Q.splice(i,1);NSV.stat.cardDrop++}}}}catch(e){console.error("nsieve card",e)}}
for(const f of ["endTurn","nextBuoi"]){const g0=window[f];if(typeof g0!=="function")continue;const w=function(){const r=g0.apply(this,arguments);sieveQ();return r};window[f]=w;try{if(f==="endTurn")endTurn=w;else nextBuoi=w}catch(e){}}

/* ---------- 4. the monthly summary ---------- */
function liveC(){try{return liveRivals(true).filter(v=>v&&v!==S&&v.alive!==false&&!v.out&&v.id!=null)}catch(e){return[]}}
function snap(){const A={};const L=liveC();for(const v of L){A[v.id+">me"]=Math.round(aff(v,S)||0);for(const t of L)if(t!==v)A[v.id+">"+t.id]=Math.round(aff(v,t)||0)}return A}
function who(v){if(v===S)return"ta";try{return typeof knowWho==="function"?knowWho(v):v.name}catch(e){return v.name}}
function nsMonth(){if(!on()||S.dead)return null;const B=BAL.news;const prev=S.nsA,M=S.nsM;S.nsA={k:mKey(),a:snap()};S.nsM={k:mKey(),n:0,by:{}};
 if(!prev||!prev.a)return null;const L=liveC(),by=new Map(L.map(v=>[String(v.id),v]));const rows=[];
 for(const k in S.nsA.a){const p=prev.a[k];if(p==null)continue;const d=S.nsA.a[k]-p;if(!d)continue;const [a,b]=k.split(">");const va=by.get(a),vb=b==="me"?S:by.get(b);if(!va||!vb)continue;
  if(vb===S?Math.abs(d)>=B.sumOwnMin:Math.abs(d)>=B.sumMin)rows.push({va,vb,d})}
 rows.sort((x,y)=>(y.vb===S)-(x.vb===S)||Math.abs(y.d)-Math.abs(x.d));
 const mine=rows.filter(r=>r.vb===S).slice(0,B.sumTop),theirs=rows.filter(r=>r.vb!==S).slice(0,B.sumTop);
 const n=M&&M.n||0;if(!mine.length&&!theirs.length&&!n)return null;
 const facts=[];
 for(const r of mine)facts.push({who:r.va,text:`${who(r.va)} ${r.d>0?"quý ta hơn":"ghét ta hơn"}`,chips:[["Thiện cảm",r.d]]});
 for(const r of theirs)facts.push({who:r.va,text:`${who(r.va)} ${r.d>0?"thích":"ghét"} ${who(r.vb)} hơn`,chips:[["Thiện cảm",r.d]]});
 if(n)facts.push(`Tháng qua giữa các phi tần có ${n} chuyện lớn nhỏ; ta chỉ nghe kể lại tóm tắt.`);
 const sub=typeof kitDate==="function"?kitDate(S.month,S.year):`Tháng ${S.month}`;
 const m=kitPanel({kind:"news",title:"Tin trong cung · tổng kết tháng",sub,facts},false);m.kind="news";m.__nsv=1;m.nsSum=1;NSV.stat.sum++;return m}
if(typeof monthTick==="function"){const m0=monthTick;monthTick=function(){const r=m0.apply(this,arguments);try{if(!S.dead)nsMonth()}catch(e){console.error("nsMonth",e)}return r}}
/* the first month end of an old save / a new life starts the baseline: take it at the first turn if missing */
if(typeof endTurn==="function"){const e0=endTurn;endTurn=function(){try{if(on()&&S&&!S.dead&&!S.nsA)S.nsA={k:mKey(),a:snap()}}catch(e){}return e0.apply(this,arguments)}}
/* a servant's gossip report (jagknow knBao from the gossip chain: «nghe X kể: <chuyện người khác>»): another consort's doing, even unnamed
   («Thường tại ???»), that does not touch her → no report line; it is counted for the month */
const NS_TITLE=/(Đáp ứng|Thường tại|Quý nhân|Tần|Phi|Quý phi|Hoàng quý phi|Hoàng hậu|phi tần)\s/;
function nsGossipSkip(w){if(!on())return false;const t=txtOf(w);const skip=nsNpcLine(t)||(!nsHerLine(t)&&NS_TITLE.test(t));if(skip){NSV.stat.drop++;tally("bao");note("bao",t)}return skip}
Object.assign(window,{nsHerLine,nsNpcLine,nsMonth,nsSieveQ:sieveQ,nsGossipSkip});
})();
