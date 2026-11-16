/* review/small-bugs-3 — eight small faults, each checked as a WHOLE CLASS (LUẬT SỬA CẢ NHÓM).
   usage: node dev/test/small-bugs-3.js <page URL> <WxH@dpr> [shot dir]     (page = doctype + charset + dev/index.html, direct mode)
   env CACHE=<dir> caches CDN pictures.
   than    no "thân ±N" relation delta on screen (act cards, rule cards, Sổ ghi incl. old-save lines)        + source scan dev/test/sb3-scan.py
   caps    no item name (IT + WD_ITEMS) capitalised mid-sentence in Sổ ghi / news lines (old-save lines too)
   from    every gift box (goodsGive: story with giver, story without, emp/th/hh/noivu) — never an empty "from" line; a known giver is named
   toast   the result card (#rtoast) and the kitLine pill are never visible over an open dialog; no tap catcher under a dialog; back after
   strip   Hậu cung › Phi tần / Cung nhân: the face strip is never half under the pane bar (palace labels clipped)
   header  her name block never touches the time block (long names / dates); nothing in the top bar past its right edge
   wrap    no stage / top-bar text set one letter per line (place subtitle), the state row stays inside the bar
   bl      Bổng lộc rule card = one kit table (.kpkb), no legacy .pcrow rows
   Prints JSON {vp, checks:{name:[problems]}, info, errs}; exit 1 when any check has problems. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const crypto=require('crypto');
const [,,URL,VP,SHOTS]=process.argv;const m=/^(\d+)x(\d+)@?([\d.]*)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+(m[3]||1);
const sleep=t=>new Promise(r=>setTimeout(r,t));
async function cache(ctx){const CD=process.env.CACHE;if(!CD)return;fs.mkdirSync(CD,{recursive:true});
 await ctx.route(/\.(webp|png|jpg|mp3|ogg)(\?.*)?$/,async r=>{const u=r.request().url().replace(/\?.*$/,'');const f=CD+'/'+crypto.createHash('md5').update(u).digest('hex');
  if(fs.existsSync(f))return r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':/\.webp$/.test(u)?'image/webp':'application/octet-stream','access-control-allow-origin':'*'}});
  try{const resp=await r.fetch();const b=await resp.body();if(resp.status()===200)fs.writeFileSync(f,b);return r.fulfill({response:resp,body:b})}catch(e){return r.abort()}})}
const HELP=`window.__sb3={W:t=>new Promise(r=>setTimeout(r,t)),
 fresh(o){window.__forceOrigin=o||'tt';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;deal();render()},
 close(){Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kmov').forEach(e=>e.remove());render()},
 async tab(t,sub){document.querySelector('#tabs [data-tab="'+t+'"]').click();await this.W(700);if(sub){const b=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()===sub&&b.offsetParent);if(b){b.click();await this.W(1400)}}},
 texts(root){const L=[];const w=document.createTreeWalker(root||document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const p=n.parentElement;if(!p||/SCRIPT|STYLE/.test(p.tagName)||!n.nodeValue.trim())continue;if(!p.getClientRects().length)continue;L.push(n)}return L},
 itemNames(){const L=[];for(const k in IT)if(IT[k].n)L.push(IT[k].n);if(typeof WD_ITEMS==='object')for(const k in WD_ITEMS)if(WD_ITEMS[k].n)L.push(WD_ITEMS[k].n);return [...new Set(L.filter(n=>/ /.test(n)&&/^\\p{Lu}\\p{Ll}/u.test(n)))]}};`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000});await cache(ctx);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 const OUT={vp:VP,checks:{},info:{}};const C=(k,L)=>{OUT.checks[k]=(OUT.checks[k]||[]).concat(L||[])};
 const shot=async n=>{if(SHOTS){fs.mkdirSync(SHOTS,{recursive:true});await p.screenshot({path:`${SHOTS}/sb3-${W}x${H}-${n}.jpg`,type:'jpeg',quality:55})}};
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1000);await p.evaluate(HELP);
 /* ---------- than + caps: old-save style log lines + fresh lines, Sổ ghi + every act card text ---------- */
 const r1=await p.evaluate(async()=>{const X=__sb3;X.fresh('tt');await X.W(1200);const N=X.itemNames();const v=rivals.find(x=>x.alive)||rivals[1];
  const lines=[`Khương Lạc Anh tặng ${N[0]} cho Tống Cẩm Tú: thân +5.`,`${v.name} thân +25 · Hoàng hậu thân -5`,`Phần thưởng: ${N[1]} vào rương.`,`${N[2]} vào rương.`,`Ngươi nhận ${N[3]}, ${N[4]} và ${N[5]}.`,`Nàng ta tặng ngươi ${N[6]}; nàng thân +3.`];
  lines.forEach(l=>log(l));render();await X.tab('log');await X.W(600);
  const T=X.texts(document.getElementById('panel')).map(n=>n.nodeValue);const txt=T.join('\n');
  const than=T.filter(t=>/(?<![\p{L}])(?<!(?:[Xx]uất|[Bb]ản|[Pp]hụ|[Mm]ẫu|[Kk]ết) )thân [+\-−]\d/u.test(t));
  const rx=new RegExp('(?<=[\\p{Ll}\\d,:)] )(?:'+N.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','u');
  /* caps across the WHOLE log line (date span + text + bold names): the line's full text */
  const blocks=new Set(X.texts(document.getElementById('panel')).map(n=>n.parentElement.closest('div,p,li')).filter(Boolean));
  const caps=[...new Set([...blocks].map(e=>e.textContent).filter(t=>t.length<400&&rx.test(t)))];
  /* every act card on the Hành sự tab */
  await X.tab('act');await X.W(500);const A=X.texts(document.getElementById('panel')).map(n=>n.nodeValue).filter(t=>/(?<![\p{L}])thân [+\-−]\d/u.test(t));
  return {than:than.concat(A).slice(0,8),caps:caps.slice(0,8),sample:T.filter(t=>/vào rương|tặng/.test(t)).slice(0,4)}});
 C('than',r1.than);C('caps',r1.caps);OUT.info.logSample=r1.sample;
 /* ---------- from ---------- */
 const r2=await p.evaluate(async()=>{const X=__sb3;X.close();const P=[];const R=[];const k0=window.kitReward;window.kitReward=function(o){R.push(o);return k0.apply(this,arguments)};
  const who=typeof stipWho67==='function'?stipWho67(null,'{mis} thưởng ngươi một chiếc trâm.'):'Vân Thanh';
  const cases=[['story+who',{from:'story',who:'Tống Cẩm Tú'}],['story',{from:'story'}],['emp',{from:'emp'}],['th',{from:'th'}],['hh',{from:'hh'}],['noivu',{from:'noivu'}],['story-mis',{from:'story',who}]];
  const key=Object.keys(IT).find(k=>/^Trâm gỗ/.test(IT[k].n))||Object.keys(IT)[0];
  for(const [n,o] of cases){R.length=0;goodsGive(S,key,o);await X.W(300);const sp=R[0]||{};const line=sp.from==null?'(no line)':String(sp.from);
   if(!R.length)P.push(n+': no box');if(sp.from!=null&&!String(sp.from).trim()&&o.who)P.push(n+': empty from line');if(o.who&&!(line.includes(o.who)))P.push(n+': giver not named ('+line+')');
   const e=S.inv[S.inv.length-1];if(o.who&&e.giver!==o.who)P.push(n+': inventory entry has no giver');
   }
  document.querySelectorAll('.kmov').forEach(x=>x.remove());
  window.kitReward=k0;return P});
 C('from',r2);
 /* ---------- toast ---------- */
 const r3=await p.evaluate(async()=>{const X=__sb3;X.close();await X.W(300);const P=[];const b=rsnap();S.sung+=3;resultShow('Thỉnh an',b,true);await X.W(400);
  Q.push({t:'Thử',h:'<p>?</p>',opts:[{n:'Nhận lời',fx:{},x:'',go:()=>{}},{n:'Từ chối',fx:{},x:'',go:()=>{}}]});showModal();await X.W(500);
  const rt=document.getElementById('rtoast');const vis=e=>e&&getComputedStyle(e).visibility!=='hidden'&&+getComputedStyle(e).opacity>0&&e.getClientRects().length;
  if(rt&&rt.classList.contains('on')&&vis(rt))P.push('result card visible over the dialog');const cx=document.getElementById('kxcatch');if(cx&&!cx.hidden)P.push('tap catcher on under the dialog');
  if(typeof kitLine==='function'){kitLine('Thử dòng',3000);await X.W(200);const l=document.getElementById('kupdline');if(vis(l))P.push('kitLine pill visible over the dialog')}
  Q.length=0;showModal();await X.W(400);const back=rt&&rt.classList.contains('on')&&vis(rt);return {P,back}});
 C('toast',r3.P);OUT.info.toastBackAfterClose=r3.back;
 /* ---------- strip ---------- */
 const r4=await p.evaluate(async()=>{const X=__sb3;X.close();const P=[];
  for(const sub of ['Phi tần','Cung nhân','Chí tôn']){await X.tab('rv',sub);await X.W(900);const Pn=document.getElementById('panel');const st=Pn.querySelector('.pstrip');const ks=Pn.querySelector('.ksub');
   if(!st||!st.offsetParent)continue;const a=st.getBoundingClientRect(),top=ks&&ks.offsetParent?ks.getBoundingClientRect().bottom:Pn.getBoundingClientRect().top;
   if(a.top<top-1&&a.bottom>top+1)P.push(`${sub}: strip half under the bar (${Math.round(a.top)} < ${Math.round(top)} < ${Math.round(a.bottom)})`)}
  await X.tab('act');return P});
 C('strip',r4);await shot('strip');
 /* ---------- header + wrap ---------- */
 const r5=await p.evaluate(async()=>{const X=__sb3;X.close();const P=[];const hd=document.querySelector('header.hud');
  const leafR=root=>{const R=[];for(const n of X.texts(root)){const rg=document.createRange();rg.selectNodeContents(n);for(const q of rg.getClientRects())if(q.width)R.push(q)}root.querySelectorAll('img').forEach(e=>{const q=e.getBoundingClientRect();if(q.width)R.push(q)});return R};
  for(const [nm,mo,y,rk] of [['Thượng Quan Uyển Nhi',11,12,6],['Mộ Dung Tuyết Nhi',12,23,5],['Lâm',1,1,0]]){S.name=nm;S.month=mo;S.year=y;S.rank=rk;render();await X.W(500);
   const me=hd.querySelector(':scope>.me'),tc=document.getElementById('k3tc');if(!me||!tc)continue;const A=leafR(me),B=leafR(tc);let n=0;
   for(const a of A)for(const b of B)if(a.left<b.right-.5&&a.right>b.left+.5&&a.top<b.bottom-.5&&a.bottom>b.top+.5)n++;if(n)P.push(`${nm} ${mo}/${y}: name block overlaps time block (${n})`);
   const hr=hd.getBoundingClientRect();const out=leafR(hd).filter(q=>q.right>hr.right+1).length;if(out)P.push(`${nm}: ${out} top-bar pieces past the right edge`)}
  /* a long time line forced: the bar must react (two rows) instead of overlapping */
  const W2=[];for(const n of X.texts(document.getElementById('stage')||document.body).concat(X.texts(hd))){const t=n.nodeValue.trim();if(t.length<4)continue;const rg=document.createRange();rg.selectNodeContents(n);
   const rs=[...rg.getClientRects()].filter(q=>q.width);const tops=new Set(rs.map(q=>Math.round(q.top)));if(tops.size>=3&&t.length/tops.size<5)W2.push(`"${t.slice(0,24)}" set ${tops.size} lines for ${t.length} letters`)}
  return {P,W2}});
 C('header',r5.P);C('wrap',r5.W2);await shot('home');
 /* ---------- bl ---------- */
 const r6=await p.evaluate(async()=>{const X=__sb3;X.close();Q.unshift({t:'Bổng lộc',h:blCard()});showModal();await X.W(500);const mb=document.getElementById('mb')||document.getElementById('modal');
  const P=[];if(!mb.querySelector('.kpkb'))P.push('no kit table');const n=mb.querySelectorAll('.pcrow').length;if(n)P.push(n+' legacy .pcrow rows');X.close();return P});
 C('bl',r6);
 OUT.errs=errs.slice(0,5);console.log(JSON.stringify(OUT));await b.close();process.exit(Object.values(OUT.checks).some(L=>L.length)||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
