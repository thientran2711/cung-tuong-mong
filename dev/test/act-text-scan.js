/* ACT TEXT SCAN (owner 15/11, "Tài nghệ act card text broken and unclear"; LUẬT SỬA CẢ NHÓM).
   Renders EVERY act card the player can see — Hành sự (every deck card, incl. one Tài nghệ deck card per work kind and many deals),
   Hậu cung person cards, Cung nhân, Hoàng tự, Tư trang, Tài nghệ (every art), Mệnh truyện, Giao tình, Phe phái, every place on
   Dư đồ and the people met there, and the options of the dialog each enabled button opens (one level) — in several game states
   (dau, toi, cao, con, hau, hh), and checks each text item of the kit rows (Cần / Tốn / Được / Mất / Kèm / Ghi chú):
     brk    unbalanced ( ) « » [ ] “ ” or an odd number of "
     dots   ".." (code-like ranges such as "+1..2", "0..10")
     pct    "%" (VANPHONG: no percentages)
     frag   an item that starts with ) , ; : or ends with ( : , ; - – (a sentence cut by a splitter)
     word1  a one-word lowercase item with no number (a word torn off its phrase, e.g. "dâng" · "tặng được")
     sp2    two spaces in a row
     sign   a gain (+N, not hostile) shown red, a loss (-N, not harm to a rival) shown green, or anything green in Kèm (owner 15/11)
     kemgain a pure gain (+N, nothing hostile) listed in a KÈM row, or a "kèm:" / "tốn:" / "thành:" label left inside another row's item (Foreman B stat-fx review)
     titlewrap  a card title that holds a portrait/icon and wraps to 2+ lines (Foreman C: "Thưa rằng do Hoàng thượng định")
     glue   a lowercase letter glued to an uppercase one ("thượngSủng")
     twice  the same item in two rows of one card (§31.21)
     long   one row taller than 2 text lines (measured at the run's viewport; meaningful at 755 wide)
   usage: node dev/test/act-text-scan.js <url of a build page> <out.json> [WxH] [scenarios]
          node dev/test/act-text-scan.js --sum <a.json> <b.json> …   (merge runs, e.g. one process per scenario: a long run can crash Chromium)
   Prints a summary table (flags per category, distinct texts) and writes every flagged item with where it was seen. */
const fs=require('fs');
if(process.argv[2]==='--sum'){const M=new Map();let cards=0;const W0=[];for(const f of process.argv.slice(3).filter(a=>a!=='-v')){const d=JSON.parse(fs.readFileSync(f,'utf8'));cards+=d.cards;W0.push(d.W+'x'+d.H);
  for(const e0 of d.all||d.bad){if(e0.row==='hint')continue;const e=Object.assign({},e0,{flags:e0.flags.filter(f=>!(f==='sign'&&/(ghen|oán|thù|nghi)( ngươi| ta)? \+/i.test(e0.text)&&!/[-−]\s?\d/.test(e0.text)))});const k=e.row+'|'+e.text+'|'+e.flags.join(',');if(!M.has(k))M.set(k,e)}}
 const all=[...M.values()],bad=all.filter(e=>e.flags.length),cat={};for(const e of bad)for(const f of e.flags)cat[f]=(cat[f]||0)+1;
 console.log(`act-text-scan merged (${[...new Set(W0)].join(',')}): ${cards} cards read, ${all.filter(e=>!/^(long|twice)$/.test(e.flags[0]||'')).length} distinct row texts, flagged ${bad.length}`);
 for(const k of ['brk','dots','pct','frag','word1','sp2','glue','sign','kemgain','titlewrap','twice','long'])console.log(`  ${k.padEnd(6)} ${cat[k]||0}`);
 if(process.argv.includes('-v'))for(const e of bad)console.log(`[${e.flags.join(',')}] ${e.row}: ${e.text}  — ${e.where[0]}`);process.exit(0)}
const {chromium}=require('playwright');
const [,,URL,OUT,SZ,SC]=process.argv;const [W,H]=(SZ||'755x1000').split('x').map(Number);
const T0=Date.now(),lg=m=>console.error('['+Math.round((Date.now()-T0)/1000)+'s] '+m);
const LIB=String.raw`
window.AT={};
/* phone shell (jk3) hides #panel on the room stage (K3SH is IIFE-private): force it visible like the player's bottom-tab tap does, so row heights are measured at 755 */
{const st=document.createElement('style');st.textContent='html body .game.game#game.k3ph.k3home:not(.maptab)>#panel,html body .game.game#game.k3ph.k3pop>#panel{display:block!important}';document.head.appendChild(st)}
(function(){
let seed=1;const rng=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
Math.random=()=>rng();AT.reseed=s=>{seed=s};
const T=e=>(e&&e.textContent||"");
AT.hide=()=>{const m=document.getElementById("modal");if(m)m.hidden=true;Q.length=0;const t=document.getElementById("rtoast");if(t){t.classList.remove("on");t.innerHTML=""}};
AT.save=()=>{AT.base={j:JSON.stringify(ser()),PG:JSON.parse(JSON.stringify(PG||{}))}};
AT.restore=(s0)=>{AT.hide();const d=JSON.parse(AT.base.j);quiet=true;deser(d);used=d.used||0;AT.reseed(s0||7);try{deal()}catch(e){}quiet=false;S.visit=null;S.place="home";popIdx=null;popMsg="";
 for(const k in PG)delete PG[k];Object.assign(PG,AT.base.PG);AT.reseed((s0||7)+1)};
const panelBtns=()=>[...document.querySelectorAll("#panel button.ka, #panel .pcb button, #panel .rbtn button, #panel button.card")];
const popBtns=()=>[...document.querySelectorAll("#popw button.opt, #popw .opts button, #popw button.ka")].filter(b=>!/^✕/.test(T(b).trim()));
AT.surfaces=()=>{const L=[{id:"act",tab:"act"}];
 rivals.forEach((v,i)=>{if(v.alive&&(i<4||v.queen))L.push({id:"rv:"+i,tab:"rv",pg:["rv",i]})});
 const nS=(S.staff||[]).length+1;for(let i=0;i<Math.min(nS,4);i++)L.push({id:"staff:"+i,tab:"staff",pg:["staff",i]});
 const nK=(S.kids||[]).length;for(let i=0;i<Math.min(nK,2);i++)L.push({id:"kid:"+i,tab:"kid",pg:["kid",i]});if(!nK)L.push({id:"kid",tab:"kid"});
 for(const t of ["inv","art","story","rel","fac"])L.push({id:t,tab:t});
 try{for(const p of places())L.push({id:"place:"+p.k,tab:"act",place:p.k})}catch(e){}
 return L};
AT.show=(sf)=>{tab=sf.tab;/* phone shell (jk3): the panel shows only when not on the room stage */try{if(typeof K3SH!=="undefined")K3SH.home=!!sf.place}catch(e){}if(sf.pg)PG[sf.pg[0]]=sf.pg[1];if(sf.place){try{goTo(sf.place)}catch(e){}}AT.hide();render();if(sf.pop!=null){popIdx=sf.pop;render()}else if(!sf.place)AT.panel()};
/* phone shell: people on the room stage (#popw) also hide the panel; clear them so the panel is laid out and measurable */
AT.panel=()=>{try{const pw=document.getElementById("popw");if(pw)pw.innerHTML="";if(typeof k3Shell==="function")k3Shell()}catch(e){}};
AT.btns=(sf)=>{if(sf.pop!=null)return popBtns();if(sf.place)return[];return panelBtns()};
/* every Tài nghệ deck card kind and many deals: the Hành sự deck is random, so the scan adds them all */
AT.deckAll=()=>{const out=[];try{if(typeof wkDeckCard==="function"){const got=new Set();for(let s=1;s<=80&&got.size<12;s++){AT.reseed(500+s);const c=wkDeckCard();const k=c.n+"|"+(c.x||"").slice(0,40);if(!got.has(k)){got.add(k);out.push(c)}}}}catch(e){}
 const seen=new Set(deck.map(a=>a.n));for(let s=1;s<=24;s++){AT.reseed(100+s);try{deal()}catch(e){}for(const a of deck)if(!seen.has(a.n)){seen.add(a.n);out.push(a)}}
 return out};
/* read one kit act card: rows -> items */
const rows=b=>{const R={};b.querySelectorAll(".kr").forEach(r=>{const k=[...r.classList].find(c=>c.startsWith("kr-"));if(!k)return;const v=r.querySelector(".krv");if(!v)return;
  const E=[...v.querySelectorAll(":scope > .ef, :scope > .kwhy, :scope > .kitem")];const it=E.map(e=>T(e).replace(/^[✓✗]\s*/,""));const cl=E.map(e=>e.classList.contains("kwhy")?"w":e.classList.contains("g")?"g":e.classList.contains("r")?"r":"n");
  let lines=0;try{const cs=getComputedStyle(v);const lh=parseFloat(cs.lineHeight)||parseFloat(cs.fontSize)*1.35;const h=v.getBoundingClientRect().height;lines=h>0?Math.round(h/lh*10)/10:0}catch(e){}
  R[k.slice(3)]={items:it.length?it:[T(v)],cls:it.length?cl:['n'],lines}});return R};
AT.tl=b=>{try{const k=b.querySelector(".kan");if(!k)return{l:0,ic:false};const cs=getComputedStyle(k);const lh=parseFloat(cs.lineHeight)||parseFloat(cs.fontSize)*1.3;const tops=new Set();const wk=document.createTreeWalker(k,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('.md,.klab,em')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let n0;while(n0=wk.nextNode()){if(!n0.textContent.trim())continue;const r=document.createRange();r.selectNodeContents(n0);for(const q of r.getClientRects())if(q.width>1)tops.add(Math.round(q.top/4))}return{l:tops.size,ic:!!k.querySelector(".md,.ic,img,canvas"),w:Math.round(k.getBoundingClientRect().width)}}catch(e){return{l:0,ic:false}}};
AT.card=b=>{const t=AT.tl(b);return{name:T(b.querySelector(".kan")||b).replace(/\s+/g," ").trim().slice(0,80),rows:rows(b),dis:b.disabled,tl:t.l,tic:t.ic,tw:t.w}};
AT.read=(sf)=>AT.btns(sf).filter(b=>b.querySelector(".kb")).map(AT.card);
AT.modalOpts=()=>{const m=document.getElementById("modal");if(!m||m.hidden)return null;return{title:T(document.getElementById("mt")).trim().slice(0,80),opts:[...m.querySelectorAll(".opts button, .opt")].filter(b=>b.querySelector(".kb")).map(AT.card)}};
AT.open=async(sf,j)=>{AT.restore();AT.show(sf);const b=AT.btns(sf)[j];if(!b||b.disabled)return null;try{b.click()}catch(e){return null}await new Promise(r=>setTimeout(r,40));try{render()}catch(e){}return AT.modalOpts()};
/* the material step of every work kind (Tài nghệ: Học / Tự luyện -> pick a work -> material) */
AT.wkMats=()=>{const out=[];if(typeof wkrMat!=="function"||typeof WKR==="undefined")return out;for(const kind of Object.keys(WKR)){const r=WKR[kind][0];if(!r)continue;AT.restore();
  try{Object.assign(KWR,{k:WK[kind].a,mode:"self",run:()=>{},kind});wkrMat(kind,r.id);showModal();render();const m=AT.modalOpts();if(m)out.push(m)}catch(e){}}AT.restore();return out};
AT.fresh=()=>{try{localStorage.clear()}catch(e){}const t=document.getElementById("title");if(t)t.hidden=true;AT.reseed(11);for(let i=0;i<8;i++){window.__nlInner=1;start();window.__nlInner=0;quiet=false;if(!isSrv())break}AT.hide();S.buoi=0;used=0;
 if(S.suc<60)S.suc=80;if(S.bac<200)S.bac=200;render()};
AT.scen=(n)=>{AT.fresh();
 if(n!=="dau"){try{k61Know(rivals.filter(v=>v.alive),"",true,3)}catch(e){}try{for(const v of rivals)S.met[v.id]=wk()}catch(e){}}
 if(n==="cao"){S.rank=5;S.sung=65;S.danh=60;S.th=55;S.tamco=55;S.mat=3;S.duc=60;for(const k in S.arts)S.arts[k]=5;try{fillStaff(S,true)}catch(e){}}
 if(n==="con"){try{S.kids.push(mkKid("m",4));S.kids.push(mkKid("f",2))}catch(e){}S.preg=0;for(const k in S.arts)S.arts[k]=2}
 if(n==="hau"){try{S.rank=Math.max(S.rank,3);fillStaff(S,true)}catch(e){}}
 if(n==="hh"){S.rank=7;const q=rivals.find(v=>v.queen);if(q){q.queen=false;q.rank=6}S.sung=70;S.danh=70;try{fillStaff(S,true)}catch(e){}}
 used=0;S.buoi=n==="toi"?BUOI.length-1:0;render();AT.save()};
})();`;
/* ---- the checks ---- */
const bal=(s,a,b)=>s.split(a).length-1===s.split(b).length-1;
function flags(t){const F=[];const s=t.replace(/\s+$/,'').replace(/^\s+/,'');if(!s)return F;
 if(!bal(s,'(',')')||!bal(s,'«','»')||!bal(s,'[',']')||!bal(s,'“','”')||(s.split('"').length-1)%2)F.push('brk');
 if(/\.\./.test(s))F.push('dots');
 if(/%/.test(s))F.push('pct');
 if(/^[),;:]/.test(s)||/[(:,;–-]$/.test(s))F.push('frag');
 if(/^[\p{Ll}]+$/u.test(s)&&!/^(không|chưa|có|rồi)$/.test(s))F.push('word1');
 if(/\S {2,}\S/.test(t))F.push('sp2');
 if(/\p{Ll}\p{Lu}/u.test(s))F.push('glue');
 return F}
/* sign: a gain (+N, not hostile) shown red, or a loss (-N, not harm to a rival / less hostility) shown green (owner: "Tại sao + mà màu đỏ") */
function signBad(t,c,r){if(r==='why'||r==='ton'&&c!=='g')return[];const s=t.replace(/\s+/g,' ');const plus=/\+\s?\d/.test(s),minus=/[-−]\s?\d/.test(s);
 const hostile=/(ghen|oán|thù|nghi)( ngươi| ta)? \+/i.test(s),rival=/(^|\s)(nàng|hắn|con nàng|của nàng)(\s|$)/.test(s)||/(ghen|oán|thù|nghi)( ngươi| ta)? [-−]/i.test(s);
 if(c==='r'&&plus&&!minus&&!hostile)return['sign'];if(c==='g'&&minus&&!plus&&!rival)return['sign'];if(r==='kem'&&c==='g')return['sign'];return[]}
/* kemgain: a pure gain in a Kèm row (hostile words / rival harm excluded), or a row label glued inside an item */
function kemGain(t,r){const s=t.replace(/\s+/g,' ');if(/(^|\s)(kèm|tốn|thành|hỏng)\s*:/i.test(s)&&r!=='why')return['kemgain'];
 if(r==='kem'&&/\+\s?\d/.test(s)&&!/[-−]\s?\d/.test(s)&&!/(ghen|oán|thù|nghi)( ngươi| ta)? \+|chứng cứ|nắm|phát giác/i.test(s))return['kemgain'];return[]}
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(0);const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return typeof start==='function'&&typeof deser==='function'&&!document.getElementById('kload')?'ok':''});if(s)break;await p.waitForTimeout(500)}
 await p.waitForTimeout(800);await p.evaluate(LIB);lg('lib');
 const MEAS={rows:0,meas:0};const SEEN=new Map();/* key text|row -> {flags,where[]} */const CARDS=[];let nCards=0;
 const take=(sc,where,c)=>{nCards++;if(c.tl>=2&&c.tic&&W<=1400){const k='titlewrap|'+c.name;if(!SEEN.has(k))SEEN.set(k,{row:'title',text:c.name+' ('+c.tl+' lines, col '+c.tw+'px)',flags:['titlewrap'],where:[sc+' '+where]})}for(const v of Object.values(c.rows)){MEAS.rows++;if(v.lines>0)MEAS.meas++}const all=[];for(const [r,v] of Object.entries(c.rows)){if(r==='hint')continue;/* the odds hint line is review/pick-hint's */for(let ii=0;ii<v.items.length;ii++){const t=v.items[ii];all.push([r,t]);const F=flags(t).concat(signBad(t,(v.cls||[])[ii],r)).concat(kemGain(t,r));const k=r+'|'+t;if(!SEEN.has(k))SEEN.set(k,{row:r,text:t,flags:F,where:[]});const e=SEEN.get(k);if(e.where.length<4)e.where.push(sc+' '+where+' «'+c.name+'»')}
   if(v.lines>2.3&&W<=800){const k='long|'+c.name+'|'+r;if(!SEEN.has(k))SEEN.set(k,{row:r,text:v.items.join(' · '),flags:['long'],lines:v.lines,where:[sc+' '+where+' «'+c.name+'»']})}}
  const norm=t=>t.toLowerCase().replace(/[().,;:\s]+/g,' ').trim();const byT={};for(const [r,t] of all){const n=norm(t);if(!n)continue;(byT[n]=byT[n]||new Set()).add(r)}
  for(const [n,rs] of Object.entries(byT))if(rs.size>1){const k='twice|'+c.name+'|'+n;if(!SEEN.has(k))SEEN.set(k,{row:[...rs].join('+'),text:n,flags:['twice'],where:[sc+' '+where+' «'+c.name+'»']})}};
 const SCN=(SC||'dau,toi,cao,con,hau,hh').split(',');
 for(const sc of SCN){await p.evaluate(n=>AT.scen(n),sc);
  /* the whole deck: every Tài nghệ kind + 24 deals, rendered as the Hành sự tab renders them */
  const dk=await p.evaluate(()=>{AT.restore();const A=AT.deckAll();AT.restore();deck.length=0;A.forEach(a=>deck.push(a));tab="act";try{if(typeof K3SH!=="undefined")K3SH.home=false}catch(e){}render();AT.panel();return AT.read({tab:"act"})});dk.forEach(c=>take(sc,'deck',c));lg(sc+' deck '+dk.length);
  const wm=await p.evaluate(()=>AT.wkMats());wm.forEach(m=>m.opts.forEach(c=>take(sc,'art > '+m.title,c)));
  const SF=await p.evaluate(()=>AT.surfaces());
  for(const sf of SF){let subs=[sf];if(sf.place){const n=await p.evaluate(s=>{AT.restore();AT.show(s);return S.visit&&S.visit.people?S.visit.people.length:0},sf);subs=[];for(let i=0;i<n;i++)subs.push(Object.assign({},sf,{pop:i,id:sf.id+'#'+i}))}
   for(const s2 of subs){const cards=await p.evaluate(s=>{AT.restore();AT.show(s);return AT.read(s)},s2);cards.forEach(c=>take(sc,s2.id,c));
    for(let j=0;j<cards.length;j++){if(cards[j].dis)continue;const m=await p.evaluate(([s,jj])=>AT.open(s,jj),[s2,j]);if(m&&m.opts.length)m.opts.forEach(c=>take(sc,s2.id+' > '+m.title,c))}lg(sc+' '+s2.id+' '+cards.length)}
  }
  lg(sc+' done, cards '+nCards)}
 const all=[...SEEN.values()];const bad=all.filter(e=>e.flags.length);const cat={};for(const e of bad)for(const f of e.flags)cat[f]=(cat[f]||0)+1;
 const items=all.filter(e=>!/^(long|twice)$/.test(e.flags[0]||'')).length;
 fs.writeFileSync(OUT,JSON.stringify({W,H,cards:nCards,items,cat,bad,all,pageErrors:perr},null,1));
 console.log(`  rows measured for height: ${MEAS.meas}/${MEAS.rows}`);console.log(`act-text-scan ${W}x${H}: ${nCards} cards read, ${items} distinct row texts, flagged ${bad.length}`);for(const k of ['brk','dots','pct','frag','word1','sp2','glue','sign','kemgain','titlewrap','twice','long'])console.log(`  ${k.padEnd(6)} ${cat[k]||0}`);console.log('  page errors '+perr.length);
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
