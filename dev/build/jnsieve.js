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
  NSV.stat.drop++;tally(k);note("news:"+k,txt);try{recDrop(txt,[v&&v.id])}catch(e){}const f0=S.news&&S.news[0];NSV.mute++;let r;try{r=n0.apply(this,arguments)}finally{NSV.mute--}
  try{const f=S.news&&S.news[0];if(f&&f!==f0)f.npc=1}catch(e){}return r}}

/* ---------- 2. kitKnow: nết lines and others' favour-book lines ---------- */
if(typeof kitKnow==="function"){const k0=kitKnow;kitKnow=function(o){try{if(on()&&o&&o.text){const key=String(o.key||""),t=txtOf(o.text);NSV.stat.know++;
   const drop=(NSV.mute&&/^news:/.test(key))
    ||(BAL.news.netOpen&&/^n:/.test(key)&&/(biết nết|lộ nết|có nết)/.test(t))
    ||(/^n:/.test(key)&&(/^Sổ ghi thêm/.test(t)&&!/(ngươi|Ngươi)/.test(t)||nsNpcLine(t)))/* a person-book line about others only (noteAdd → noteSay: remarks overheard, j92 «lời của …») */
    ||(NS_NPC_ONLY.test(t)&&nsNpcLine(t))/* «X trượt khảo hạch …» */
    ||(/ kể: /.test(t)&&!/(ngươi|Ngươi)/.test(t)&&nsNpcLine(t.slice(t.indexOf(" kể: ")+5)))/* «A kể: B làm gì đó» about others (j75 tellers) */
    ||(!/^(hr|id|rk):/.test(key)&&nsNpcLine(t))/* any other know line about other people only (whole family: every direct kitKnow caller — jration chest thefts …); her own knowledge of names / ranks and the big harm lines stay */;
   if(drop){NSV.stat.knowDrop++;if(!NSV.mute){tally("so");if(!/(biết nết|lộ nết|có nết)/.test(t))try{recDrop(t)}catch(e){}}note("know:"+key.split(":")[0],t);return}}}catch(e){}return k0.apply(this,arguments)}}

/* ---------- 3. the morning card, sentence by sentence ---------- */
const SENT=/(?<=[.!?…])\s+(?=[^\s.,;:!?…)\]»”])/u;
function sieveHtml(inner){const S0=String(inner).split(SENT);const out=[];let lastKept=true,dropped=0;
 for(const s of S0){const t=txtOf(s);if(!t){continue}
  if(/^(Lý do|Vì sao|Kết quả|Người được sai)/.test(t)){if(lastKept)out.push(s);else dropped++;continue}
  if(nsNpcLine(t)){dropped++;lastKept=false;note("card",t);try{recDrop(t)}catch(e){}continue}out.push(s);lastKept=true}
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
function nsGossipSkip(w){if(!on())return false;const t=txtOf(w);const skip=nsNpcLine(t)||(!nsHerLine(t)&&NS_TITLE.test(t));if(skip){NSV.stat.drop++;tally("bao");note("bao",t);try{recDrop(t)}catch(e){}}return skip}

/* ---------- 5. HAREM RECORD in the Sổ ghi + big harm in Tin báo (owner OD 26/11 ~05:05Z, verbatim: "Những tin như ai mưu hại ai thì vẫn báo,
   tức là khung tin báo chỉ báo tin tôi, còn chuyện hậu cung vẫn đầy đủ thông tin trong sổ ghi, tôi muốn xem thông tin vì sao ai bị gì, như tại sao
   mặt bị hủy dung thì tôi qua sổ ghi thì biết ai rạch mặt ai đầy đủ, hiểu không. Chứ không mất hết thông tin này") ----------
   (a) every act between two other people (runAct NPC ↔ NPC: the same acts the cause ledger jmem records, with its REASON causeText) is written in
       S.hrec with doer, victim, the act, the cause and the result; every line the sieve takes out of the daily feed goes there too (nothing lost).
       The Sổ ghi tab (j6 «log») shows S.hrec merged by time with her own lines (S.logs untouched: Tuần lục / kitWhy / jlogsync read S.logs only).
   (b) a BIG harm (an act of danger band ≥ BAL.news.bigBand in BANDS, j24: vu oan, hủy dung, hạ độc, đẩy xuống hồ …) between two other people is
       also ONE «Tin báo» line «A hủy dung B, vì ghen nàng được sủng.» (law 6b; at home in Khuê các nothing, OD 25/11 ~23:10Z).
   Names through knowWho (a stranger stays «một phi tần áo bậc …»), read at show time so a name she learns later appears. */
function recOn(){return on()&&!(typeof isKc==="function"&&isKc())}
function recList(){if(!Array.isArray(S.hrec))S.hrec=[];return S.hrec}
const DATE=()=>`T${S.month}/${S.year} ${typeof TUAN!=="undefined"?TUAN[S.tuan]:""}`;
function recPush(o){try{const L=recList();const t=txtOf(o.t);if(!t)return null;
  if(L.some(x=>x.w===wk()&&x.t===t))return null;/* the same happening told twice (a deed + its rumour) = one line */
  const r={q:S.logSeq||0,w:wk(),dt:DATE(),t,ids:(o.ids||[]).filter(x=>x!=null)};if(o.big)r.big=1;if(o.k)r.k=o.k;L.unshift(r);
  const mx=(BAL.news&&BAL.news.recMax)||300;while(L.length>mx){const rk=x=>x.big?2:x.k?1:0;let i=-1;for(const lv of [0,1,2]){for(let j=L.length-1;j>=0;j--)if(rk(L[j])===lv){i=j;break}if(i>=0)break}L.splice(i,1)}/* oldest first: a heard line, then a small act, a big harm last */NSV.stat.rec=(NSV.stat.rec||0)+1;return r}catch(e){console.error("nsRec",e);return null}}
function persOf(id){try{return typeof RV==="function"?RV(+id):null}catch(e){return null}}
/* a stranger's name → her description (k61), capital first letter at the start of a sentence */
function maskNames(t,ids){let s=String(t);for(const id of ids||[]){const v=persOf(id);if(!v||!v.name)continue;const w=who(v);if(w&&w!==v.name)s=s.split(v.name).join(w)}
 return s.replace(/(^|[.!?…]\s+)(\p{Ll})/gu,(m,a,b)=>a+b.toUpperCase())}
function bigK(k){try{const b=(BAL.news&&BAL.news.bigBand)||2;return (typeof BANDS!=="undefined"?BANDS:[]).slice(b).some(x=>(x[2]||[]).includes(k))}catch(e){return false}}
/* the act said as a plain clause about the victim T (NEWS WORDING: one clear sentence; «nàng» stands for T inside the clause) */
const ACT_SAY={frame:"vu oan T",plant:"cài đồ vào rương của T",block:"rút thẻ bài của T",bribe:"mua chuộc cung nữ của T",accuse:"tố giác T",vp:"hặc T ăn mặc sai phẩm",
 ksab:"phá việc học của con T",takeaway:"xin bế con của T về nuôi",lygian:"ly gián T",tocao:"tố tội thật của T",xinhh:"xin Hoàng hậu giáng T",trinhth:"trình Thái hậu chuyện của T",
 trinhhh:"trình Hoàng hậu chuyện của T",huydung:"hủy dung T",giahoa:"giá họa trộm đồ cho T",laydo:"sai người lấy trộm đồ của T",laydol:"sai cung nữ lấy đồ của T",
 thathu:"thả thú dữ hại dung nhan T",phonghoa:"phóng hỏa kho đồ của T",petsteal:"trộm thú nuôi của T",xx:"tố T xa xỉ",poison:"hạ độc T",kpoison:"hạ độc con của T",
 pond:"đẩy con của T xuống hồ",pushp:"đẩy T xuống hồ sen",musk:"bỏ xạ hương hại T",catswap:"mua chuộc bà đỡ của T",kframe:"vu con của T trù ẻo",slowpoison:"hạ độc dần T",
 expose:"bóc chuyện tư tình của T",pgift:"tặng T quà ăn có độc",rumor:"tung tin đồn về T",spy:"dò la T",spyk:"dò la T",trip:"ngáng chân T",uyhiep:"uy hiếp T đòi bạc",
 banphe:"bán chuyện của T cho phe khác",tat:"tát T",phatquy:"phạt T quỳ",rash:"bỏ phấn lạ hại T",batnat:"ép T nộp của",thaopet:"hại thú nuôi của T",nuoc:"hắt nước vào T",
 tea:"hắt trà vào T",ink:"quạt mực vào T",ally:"kết giao với T",gift:"tặng quà T",steal:"tranh sủng với T",road:"chặn ngự giá trước cung T",tieuhuy:"trả chứng cứ cho T để lấy lòng",
 bribel:"sai cung nữ lấy lòng T",blockf:"nhờ người quen rút thẻ bài của T",petcare:"giúp T chăm thú nuôi",pmplay:"cùng T chơi",pmduel:"thách đấu T"};
/* «A hủy dung B, vì ghen nàng được sủng.» / «A định hủy dung B, vì …, nhưng không thành.» (reason = jmem causeText, the cause ledger) */
function recSentence(rec,a,t,k){const fail=rec&&rec.r==="fail";const pat=ACT_SAY[k]||`${String(ACT[k]&&ACT[k].n||k).toLowerCase()} với T`;
 let why="";try{why=causeText(rec)||""}catch(e){}if(why&&t&&t.name)why=why.split(t.name).join("nàng");
 return `${a.name} ${fail?"định ":""}${pat.replace("T",t.name)}${why?", "+why:""}${fail?", nhưng không thành":""}.`}
function isNpc(p){return !!p&&p!==S&&p.id!=null&&typeof p==="object"&&(typeof rivals==="undefined"||rivals.includes(p))}
if(typeof runAct==="function"){const ra0=runAct;runAct=function(a,t,k){const r=ra0.apply(this,arguments);
  try{if(r&&recOn()&&isNpc(a)&&isNpc(t)&&a!==t&&!NSV.inRec){NSV.inRec=1;try{
    let rec=null;try{rec=(causeQuery({by:a,to:t,limit:1})||[])[0]||null}catch(e){}
    if(!rec||rec.w!==(typeof nowW==="function"?nowW():rec.w)||rec.a!==k)rec={by:String(a.id),to:String(t.id),a:k,n:ACT[k]?ACT[k].n:k,y:{k:"net",x:""},r:/không thành|bị lộ|bị bắt|phát giác|chặn kịp|từ chối/.test(txtOf(r))?"fail":"ok"};
    /* failed or not = the act's OWN first sentence (a later «… sai đi bị bắt, khai ra chủ» is about the servant, the deed itself may have landed) */
    const first=txtOf(r).split(/(?<=[.!?…;])\s+/)[0]||"";rec=Object.assign({},rec,{r:/không thành|phát giác|bị lộ|bị bắt|chặn kịp|từ chối|không ai tin|đã bị cắt/.test(first)?"fail":"ok"});
    const line=recSentence(rec,a,t,k);
    let sent="";const res0=txtOf(r).replace(/\s*\((?:([^()]*?) )?sai ([^()]*) đi\)/g,(m,x,y)=>{sent=y;return""}).replace(/\s*\(tại [^()]*\)/g,"").trim();
    /* the result without the act told again: «A định hủy dung B nhưng không thành, bị lộ dấu vết.» → «bị lộ dấu vết.» */
    const res=res0.split(/(?<=[.!?…])\s+/).map(x=>{if(!(x.includes(a.name)&&x.includes(t.name)))return x;const m=x.match(/nhưng không thành,\s*(.+)$/);return m?m[1]:(/^\S+( \S+)* (định|bày mưu)/.test(x)&&/không thành/.test(x)?"":x)}).filter(Boolean).join(" ").trim();
    const big=bigK(k);
    const R=recPush({t:`${line}${sent?` Người được sai: ${sent}.`:""}${res?` Kết quả: ${res[0].toUpperCase()+res.slice(1)}`:""}`,ids:[a.id,t.id],big,k});
    if(R&&big){NSV.stat.big=(NSV.stat.big||0)+1;const tb=maskNames(line,[a.id,t.id]);R.tb=tb;
      try{kitKnow({key:"hr:"+R.w+":"+a.id+":"+t.id+":"+k,pri:2,text:tb})}catch(e){}NSV.hr=NSV.hr||[];if(NSV.hr.length<400)NSV.hr.push({w:R.w,k,a:a.id,t:t.id,tb})}
  }finally{NSV.inRec=0}}}catch(e){console.error("nsRec act",e)}return r}}
/* the lines the sieve takes out of the feed (newsAdd NPC deeds, kitKnow, the morning card, gossip reports) → the record */
function recDrop(t,ids){if(!recOn())return;const I=new Set((ids||[]).filter(x=>x!=null));try{for(const v of rivals||[])if(v&&v.name&&String(t).includes(v.name))I.add(v.id)}catch(e){}recPush({t,ids:[...I]})}
NSV.recDrop=recDrop;
/* the Sổ ghi tab: her lines (S.logs) and the harem record, newest first, merged by the log sequence at which each record was written */
function recMerge(){const L=S.logs||[],H=recList();if(!H.length)return L;const n=S.logSeq||L.length;const out=[];let j=0;
 const row=r=>`<span class="ld">${r.dt}</span>${maskNames(r.t,r.ids)}`;
 for(let i=0;i<L.length;i++){const seq=n-i;while(j<H.length&&(H[j].q||0)>=seq)out.push(row(H[j++]));out.push(L[i])}while(j<H.length)out.push(row(H[j++]));return out}
if(typeof renderPanel==="function"){const rp=renderPanel;renderPanel=function(){let keep=null;try{nsOpen();if(on()&&typeof tab!=="undefined"&&tab==="log"&&Array.isArray(S.hrec)&&S.hrec.length){keep=S.logs;S.logs=recMerge()}}catch(e){keep=null}
  try{return rp.apply(this,arguments)}finally{if(keep)S.logs=keep}}}

/* ---------- 6. NẾT OPEN for servants and children too (MAIN decision OD 26/11 ~06:47Z under the standing rule ~05:55Z; law 6b, nothing hidden):
   every servant's nết (s.kn, j29 strShow / jhouse «Xem người» — that paid look is no longer offered, nothing left to look) and every child's
   learning nết (k.dilK, j53) are known from the start. ---------- */
function nsOpen(){try{if(!on()||!BAL.news.netOpen)return;for(const s of (typeof allServ==="function"?allServ():S.staff||[])||[])if(s&&!s.kn)s.kn=1;if(S.maid&&!S.maid.kn)S.maid.kn=1;
  for(const [k] of (typeof allKids==="function"?allKids():[]))if(k&&k.dil&&!k.dilK)k.dilK=1}catch(e){}}
if(typeof mkServ==="function"){const ms=mkServ;mkServ=function(){const s=ms.apply(this,arguments);try{if(on()&&BAL.news.netOpen&&s)s.kn=1}catch(e){}return s}}
for(const f of ["endTurn","nextBuoi"]){const g0=window[f];if(typeof g0!=="function")continue;const w=function(){const r=g0.apply(this,arguments);nsOpen();return r};window[f]=w;try{if(f==="endTurn")endTurn=w;else nextBuoi=w}catch(e){}}
Object.assign(window,{nsHerLine,nsNpcLine,nsMonth,nsSieveQ:sieveQ,nsGossipSkip,nsOpen,nsRecMerge:recMerge,nsMask:maskNames});
})();
