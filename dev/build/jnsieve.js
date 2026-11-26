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
 return s.replace(/(^|[.!?…:]\s+)(\p{Ll})/gu,(m,a,b)=>a+b.toUpperCase())}
function bigK(k){try{const b=(BAL.news&&BAL.news.bigBand)||2;return (typeof BANDS!=="undefined"?BANDS:[]).slice(b).some(x=>(x[2]||[]).includes(k))}catch(e){return false}}
/* the act said as a plain clause about the victim @ (NEWS WORDING: one clear sentence; «nàng» stands for T inside the clause) */
const ACT_SAY={frame:"vu oan @",plant:"cài đồ vào rương của @",block:"rút thẻ bài của @",bribe:"mua chuộc cung nữ của @",accuse:"tố giác @",vp:"hặc @ ăn mặc sai phẩm",
 ksab:"phá việc học của con @",takeaway:"xin bế con của @ về nuôi",lygian:"ly gián @",tocao:"tố tội thật của @",xinhh:"xin Hoàng hậu giáng @",trinhth:"trình Thái hậu chuyện của @",
 trinhhh:"trình Hoàng hậu chuyện của @",huydung:"hủy dung @",giahoa:"giá họa trộm đồ cho @",laydo:"sai người lấy trộm đồ của @",laydol:"sai cung nữ lấy đồ của @",
 thathu:"thả thú dữ hại dung nhan @",phonghoa:"phóng hỏa kho đồ của @",petsteal:"trộm thú nuôi của @",xx:"tố @ xa xỉ",poison:"hạ độc @",kpoison:"hạ độc con của @",
 pond:"đẩy con của @ xuống hồ",pushp:"đẩy @ xuống hồ sen",musk:"bỏ xạ hương hại @",catswap:"mua chuộc bà đỡ của @",kframe:"vu con của @ trù ẻo",slowpoison:"hạ độc dần @",
 expose:"bóc chuyện tư tình của @",pgift:"tặng @ quà ăn có độc",rumor:"tung tin đồn về @",spy:"dò la @",spyk:"dò la @",trip:"ngáng chân @",uyhiep:"uy hiếp @ đòi bạc",
 banphe:"bán chuyện của @ cho phe khác",tat:"tát @",phatquy:"phạt @ quỳ",rash:"bỏ phấn lạ hại @",batnat:"ép @ nộp của",thaopet:"hại thú nuôi của @",nuoc:"hắt nước vào @",
 tea:"hắt trà vào @",ink:"quạt mực vào @",ally:"kết giao với @",gift:"tặng quà @",steal:"tranh sủng với @",road:"chặn ngự giá trước cung @",tieuhuy:"trả chứng cứ cho @ để lấy lòng",
 bribel:"sai cung nữ lấy lòng @",blockf:"nhờ người quen rút thẻ bài của @",petcare:"giúp @ chăm thú nuôi",pmplay:"cùng @ chơi",pmduel:"thách đấu @"};
/* «A hủy dung B, vì ghen nàng được sủng.» / «A định hủy dung B, vì …, nhưng không thành.» (reason = jmem causeText, the cause ledger) */
function recSentence(rec,a,t,k){const fail=rec&&rec.r==="fail";const pat=ACT_SAY[k]||`${String(ACT[k]&&ACT[k].n||k).toLowerCase()} với @`;
 let why="";try{why=causeText(rec)||""}catch(e){}if(why&&t&&t.name)why=why.split(t.name).join("nàng");
 return `${a.name} ${fail?"định ":""}${pat.replace("@",t.name)}${why?", "+why:""}${fail?", nhưng không thành":""}.`}
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
/* a card's folded-changes record (nsCard r.K): lead «<title> — kèm theo:» + the ONE kit kitKemRow one-per-line form (named once per feeling,
   strangers with the same feeling and number «N vị khác», names masked by the kit at show time); K.all = the Sổ ghi keeps every line (no 8 cap).
   Old records (no K) keep their text. */
function kemRec(r){try{if(!r||!Array.isArray(r.K)||!r.K.length||typeof kitKemRow!=="function")return"";
 const K=r.K.map(o=>({v:persOf(o.id),k:o.k,d:o.d,t:o.t})).filter(x=>x.v);if(!K.length)return"";K.all=1;
 const h=kitKemRow(K);if(!h)return"";const L=r.L?maskNames(r.L,r.ids):"";return `${L?L+" — kèm theo:":"Kèm theo trong cung:"} ${h}`}catch(e){console.error("nsKemRec",e);return""}}
/* the Sổ ghi tab: her lines (S.logs) and the harem record, newest first, merged by the log sequence at which each record was written */
function recMerge(){const L=S.logs||[],H=recList();if(!H.length)return L;const n=S.logSeq||L.length;const out=[];let j=0;
 const row=r=>`<span class="ld">${r.dt}</span><i hidden data-osk="${r.big?"big":"hc"}"></i>${kemRec(r)||maskNames(r.t,r.ids)}`;
 for(let i=0;i<L.length;i++){const seq=n-i;while(j<H.length&&(H[j].q||0)>=seq)out.push(row(H[j++]));out.push(L[i])}while(j<H.length)out.push(row(H[j++]));return out}
if(typeof renderPanel==="function"){const rp=renderPanel;renderPanel=function(){let keep=null;try{nsOpen();if(on()&&typeof tab!=="undefined"&&tab==="log"&&Array.isArray(S.hrec)&&S.hrec.length){keep=S.logs;S.logs=recMerge()}}catch(e){keep=null}
  let r;try{r=rp.apply(this,arguments)}finally{if(keep)S.logs=keep}try{if(on()&&typeof tab!=="undefined"&&tab==="log")nsLogBar()}catch(e){console.error("nsLogBar",e)}return r}}


/* ---------- 8. SỔ GHI grouped by kind and by person, searchable (ONE SIEVE (B), kit parts only: kitSubTabs §46 kind tabs, kitTabRowHTML §31.11 person
   chips, kitInput §29 search box). Kinds: her own lines (S.logs) · the harem record (S.hrec) · big harm (S.hrec big). The rows stay the Sổ ghi rows. ---------- */
NSV.q="";NSV.p="";
const nsFold=t=>String(t||"").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();
function nsLogRows(P){return [...P.querySelectorAll(".logs > div")]}
function nsLogKind(r){const m=r.querySelector("[data-osk]");return m?m.dataset.osk:"me"}
function nsLogPeople(rows){const C=new Map();const L=[];try{for(const v of liveRivals(true)||[])if(v&&v!==S&&v.name)L.push(v.name);L.push("Hoàng thượng","Thái hậu");if(S.maid&&S.maid.name)L.push(S.maid.name)}catch(e){}
 for(const r of rows){if(r.dataset.nrh)continue;const t=r.textContent;for(const n of L)if(t.includes(n))C.set(n,(C.get(n)||0)+1)}
 return [...C].sort((a,b)=>b[1]-a[1]).slice(0,12)}
function nsLogApply(P){const q=nsFold(NSV.q).trim(),pn=NSV.p,kd=(typeof KTSUB!=="undefined"&&KTSUB.soghi)||"all";const rows=nsLogRows(P);let head=null,seen=0,vis=0;
 const close=()=>{if(head)head.hidden=!seen};
 for(const r of rows){if(r.dataset.nrh){close();head=r;seen=0;continue}if(r.dataset.osnone)continue;const k=nsLogKind(r);
  const okK=kd==="all"||kd===k||(kd==="hc"&&k==="big");const okP=!pn||r.textContent.includes(pn);const okQ=!q||nsFold(r.textContent).includes(q);const on1=okK&&okP&&okQ;r.hidden=!on1;if(on1){seen++;vis++}}
 close();const L=P.querySelector(".logs");if(!L)return vis;let e=L.querySelector("[data-osnone]");if(!vis){if(!e){e=document.createElement("div");e.dataset.osnone=1;e.textContent="Không có dòng nào khớp.";L.appendChild(e)}e.hidden=false}else if(e)e.hidden=true;return vis}
function nsLogBar(){const P=document.getElementById("panel");if(!P)return;const L=P.querySelector(".logs");if(!L||P.querySelector(".ksoghi"))return;const rows=nsLogRows(P);
 const cnt={all:0,me:0,hc:0,big:0};for(const r of rows){if(r.dataset.nrh)continue;const k=nsLogKind(r);cnt.all++;cnt[k]++;if(k==="big")cnt.hc++}
 const T=(BAL.news.logTabs||[["all","Tất cả"]]).map(([k,l])=>({k,label:l,n:cnt[k]||0})).filter(x=>x.k==="all"||x.n);/* an empty kind has no tab */const tb=kitSubTabs("soghi",T.map(x=>Object.assign({},x,{doable:x.k==="all"?1:0})));
 const ppl=nsLogPeople(rows);if(NSV.p&&!ppl.some(([n])=>n===NSV.p))NSV.p="";
 const pr=ppl.length?`<div class="pctabs kcattabs" role="tablist" data-osprow="1">${kitTabRowHTML([{k:"",label:"Mọi người"}].concat(ppl.map(([n,c])=>({k:n,label:n,n:c}))),NSV.p,"data-osp")}</div>`:"";
 const box=document.createElement("div");box.className="ksoghi";box.innerHTML=tb.html+pr+kitInput({id:"osq",label:"Tìm trong sổ",placeholder:"tên người hay việc…",value:NSV.q});
 L.before(box);const inp=box.querySelector("#osq");if(inp)inp.dataset.osq=1;nsLogApply(P)}
document.addEventListener("input",e=>{const t=e.target;if(!t||!t.dataset||!t.dataset.osq)return;NSV.q=t.value;const P=document.getElementById("panel");if(P)nsLogApply(P)},true);
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-osp]");if(!b||!b.closest("[data-osprow]"))return;e.stopPropagation();NSV.p=b.dataset.osp===NSV.p?"":b.dataset.osp;try{renderPanel()}catch(x){}},true);

/* ---------- 9. «ĐÃ BIẾT VỀ X» — Hậu cung view (jhc knownCol / relPair) and every person pop-up (kitKnownList, the «Đã biết: N tin» chip): ONE list
   (jhc knownList); the facts that touch HER (nsSieve: «ngươi», evidence, the night, rank, life …) come first, the rest after in their order.
   Nothing is dropped (the list is what she knows about that person). ---------- */
if(typeof knownList==="function"){const kl0=knownList;const kl=function(v){const L=kl0.apply(this,arguments);try{if(!on()||!Array.isArray(L)||L.length<2)return L;
  const her=[],rest=[];for(const x of L)(nsHerLine(x&&x.f)?her:rest).push(x);return her.concat(rest)}catch(e){return L}};
 try{knownList=kl}catch(e){}window.kitKnownList=kl}
/* ---------- 6. NẾT OPEN for servants and children too (MAIN decision OD 26/11 ~06:47Z under the standing rule ~05:55Z; law 6b, nothing hidden):
   every servant's nết (s.kn, j29 strShow / jhouse «Xem người» — that paid look is no longer offered, nothing left to look) and every child's
   learning nết (k.dilK, j53) are known from the start. ---------- */
function nsOpen(){try{if(!on()||!BAL.news.netOpen)return;for(const s of (typeof allServ==="function"?allServ():S.staff||[])||[])if(s&&!s.kn)s.kn=1;if(S.maid&&!S.maid.kn)S.maid.kn=1;
  for(const [k] of (typeof allKids==="function"?allKids():[]))if(k&&k.dil&&!k.dilK)k.dilK=1}catch(e){}}
if(typeof mkServ==="function"){const ms=mkServ;mkServ=function(){const s=ms.apply(this,arguments);try{if(on()&&BAL.news.netOpen&&s)s.kn=1}catch(e){}return s}}
/* the servant's person card (jmind mindRows = the one source of «Sở trường / Thích / Ghét» rows on every person card) gets the same «Tính nết» row as a consort */
if(typeof mindRows==="function"){const mr=mindRows;window.mindRows=mindRows=function(p){const R=mr.apply(this,arguments);try{if(on()&&BAL.news.netOpen&&p&&typeof p==="object"&&(p.sid!=null||p===S.maid||(typeof allServ==="function"&&allServ().includes(p)))&&typeof netTxt==="function"&&!R.some(r=>r&&r[0]==="Tính nết")){
  const W=p.kn?String(netTxt(p)||"").split(/\s*,\s*/).filter(Boolean):[];R.unshift(["Tính nết",W.length?W.join(", "):"chưa rõ",W.length?"t":"n"])}}catch(e){}return R}}
for(const f of ["endTurn","nextBuoi"]){const g0=window[f];if(typeof g0!=="function")continue;const w=function(){const r=g0.apply(this,arguments);nsOpen();return r};window[f]=w;try{if(f==="endTurn")endTurn=w;else nextBuoi=w}catch(e){}}

/* ---------- 7. ONE SIEVE for every info surface (owner OD 26/11 ~06:50Z (B), verbatim in dev/OWNER_DECISIONS.md: «result cards (only rows that
   changed for HER + «+8 (42)» totals), «VÌ SAO» rows, Hậu cung view, person popups, Sổ ghi grouping (by person/kind, searchable), news at home —
   same rule «touches her / her choices first, the rest in Sổ ghi»»). nsSieve(o) is THE one test; every surface asks it, none filters on its own:
     o = {t}                         a line of text  → it touches her (nsHerLine) or is not other people's business only (nsNpcLine)
     o = {v, d, why, tgt, ev}        a person row    → her / her household / Thái hậu · Hoàng hậu / her act's target / evidence /
                                                       a change ≥ BAL.news.card.big / the span's log names that person in a line about HER
   true = show it on the surface, false = it goes to the Sổ ghi (nothing is deleted). ---------- */
function nsHouse(v){try{if(!v||v===S)return true;if(v===S.maid||(S.staff||[]).includes(v))return true;const q=typeof queenP==="function"?queenP():null;return !!(q&&q!==S&&v===q)}catch(e){return false}}
function nsSieve(o){try{if(!o)return true;if(!on())return true;
 if(o.v==null){return o.t==null?true:!nsNpcLine(o.t)}
 const v=o.v;if(v===S||nsHouse(v))return true;if((o.tgt||[]).includes(v))return true;if(o.ev)return true;
 const B=BAL.news.card||{};if(Math.abs(o.d||0)>=(B.big||99))return true;
 if(v.name&&(o.why||[]).some(c=>String(c).includes(v.name)&&nsHerLine(String(c).split(v.name).join(" "))))return true;/* the line is about HER, not only about that person */
 return false}catch(e){return true}}
/* the result card (j63 kaResultRows calls it): per = [[who, goodParts, badParts, why, v, d, raw]] person rows, K = Kèm [{v,k,d,t}] (ghen / oán of others).
   Keeps the rows nsSieve passes (at most BAL.news.card.rowMax of other people, largest change first); every other change becomes ONE summary
   line «Trong cung: 5 người ghen thêm, 2 người bớt quý ta» (names behind the tap, kit .kkem) and ONE Sổ ghi record with every name and number. */
function nsCard(per,K,why,title,tgt){const B=(on()&&BAL.news.card)||null;if(!B)return null;try{
 const keep=[],fold=[],rest=[];const isP=x=>x&&x[4]&&typeof x[4]==="object"&&x[4]!==S&&!nsHouse(x[4]);
 for(const x of per){if(!isP(x)){keep.push(x);continue}const ev=(x[1].concat(x[2])).some(t=>/chứng cứ/.test(t));
  if(nsSieve({v:x[4],d:x[5],why,tgt,ev}))rest.push(x);else fold.push(x)}
 rest.sort((a,b)=>Math.abs(b[5]||0)-Math.abs(a[5]||0));for(const x of rest.splice(B.rowMax))fold.push(x);keep.push(...rest);
 const Kk=(K||[]).filter(x=>Math.round(x.d));const kem=[],kf=[];
 for(const x of Kk)(nsSieve({v:x.v,d:x.d,why,tgt})?kem:kf).push(x);kem.sort((a,b)=>Math.abs(b.d)-Math.abs(a.d));for(const x of kem.splice(B.kemMax))kf.push(x);
 const byV=new Map();const add=(v,w)=>{if(!byV.has(v))byV.set(v,[]);byV.get(v).push(w)};
 for(const x of fold){if(x[1].length)add(x[4],x[1].join(", "));if(x[2].length)add(x[4],x[2].join(", "))}
 for(const x of kf)add(x.v,`${x.k} ${typeof kaNT==="function"?kaNT(Math.round(x.d),x.t):kaN(Math.round(x.d))}`);
 if(!byV.size)return {keep,kem,more:0,fold:[]};
 /* the Sổ ghi keeps every name and number (maskNames at show time: a stranger stays «một vị …») */
 /* MAIN 158 26/11 (law 11): the record is shown through the kit kitKemRow one-per-line form (recMerge), so it also stores the items:
    K = [{id,k,d,t}] (a folded row part «thiện cảm +3 (20)» → k «thiện cảm», d 3, t 20; a Kèm item as it is); lead = the card title */
 const KI=[];const PT=/^(.+?)\s+([+−-]\s*\d+)(?:\s*\((\d+)\))?\s*$/u;
 for(const x of fold)for(const p of x[1].concat(x[2])){const m=txtOf(p).match(PT);if(m)KI.push({id:x[4].id,k:m[1],d:+m[2].replace(/\s/g,"").replace("−","-"),t:m[3]!=null?+m[3]:null})}
 for(const x of kf)KI.push({id:x.v.id,k:x.k,d:Math.round(x.d),t:x.t!=null?x.t:null});
 try{const r0=recPush({t:`${title?txtOf(title)+" — ":""}kèm theo trong cung: ${[...byV].map(([v,W])=>`${v.name} ${W.map(txtOf).join(", ")}`).join("; ")}.`,ids:[...byV.keys()].map(v=>v.id)});if(r0){r0.kem=1/* a card's folded changes (not an NPC act: no k) */;if(KI.length){r0.K=KI;r0.L=title?txtOf(title):""}}}catch(e){}
 NSV.stat.cardFold=(NSV.stat.cardFold||0)+byV.size;
 const kv=new Set(kem.map(x=>x.v));return {keep,kem,more:[...byV.keys()].filter(v=>!kv.has(v)).length,fold:[...byV.keys()].map(v=>v.name)}}catch(e){console.error("nsCard",e);return null}}
/* «VÌ SAO» (kitWhy, j63 kaWhyCl): the reasons of a card come from the span's log clauses; a clause that is other people's business only never
   becomes a reason on her card (it stays in the Sổ ghi) */
if(typeof kaWhyCl==="function"){const w0=kaWhyCl;kaWhyCl=function(){const L=w0.apply(this,arguments);try{if(on()&&Array.isArray(L))return L.filter(c=>!nsNpcLine(c))}catch(e){}return L}}
Object.assign(window,{nsSieve,nsCard,nsHouse,nsHerLine,nsNpcLine,nsMonth,nsSieveQ:sieveQ,nsGossipSkip,nsOpen,nsRecMerge:recMerge,nsMask:maskNames});
})();
