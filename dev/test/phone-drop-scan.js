/* phone-drop-scan (kit-dialog-2, owner mark #75 21/11 ~05:18Z «Lỡ hẹn»: a person avatar shows on iPad but is missing on the phone; law 11: scan the whole class).
   The SAME seeded game (Math.random seeded, same forced dialogs, same turns) is played on the Fold (755x1000) and the iPad (1180x820). Every small dialog is recorded as a list of
   FEATURES: avatars (<img> inside the text column, .pframe, .md avatar chips), pictures, the figure, the seal, chips, rows - counted by kind - and the texts. A dialog that has
   a feature (or a text line) on the iPad that the Fold drops (or the reverse) is a FAIL: a device may change the LAYOUT, never the CONTENT.
   usage: node dev/test/phone-drop-scan.js <index.html> [turns]   Exit 1 on any difference. */
const {chromium}=require('playwright');const fs=require('fs');const IDX=process.argv[2];const TURNS=+(process.argv[3]||0);/* 0 = the forced dialogs only (identical on both devices); played turns diverge between devices (timing), so they are off by default */
const LIVE='https://thientran2711.'+'github.io/cung-tuong-mong/';const html=fs.readFileSync(IDX,'utf8');
const SZ=[['755x1000@2',755,1000],['1180x820@2',1180,820]];
const SEED=`(()=>{let s=12345;Math.random=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}})()`;
(async()=>{const b=await chromium.launch();const R={};
 for(const [nm,W,H] of SZ){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});
  await ctx.route(u=>u.href.split('?')[0]===LIVE||u.href.split('?')[0]===LIVE+'index.html',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
  await ctx.route(/\.(mp3|ogg)$/,r=>r.fulfill({status:404,body:''}));await ctx.addInitScript(SEED);
  const p=await ctx.newPage();p.setDefaultTimeout(300000);await p.goto(LIVE,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'}).catch(()=>{});
  await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;document.getElementById("modal").hidden=true;try{NLP=null}catch(e){}render()});
  await p.waitForTimeout(1500);
  R[nm]=await p.evaluate(async TURNS=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const out=[];
   ['kroul','kroulw','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});
   const dawn=()=>{const d=document.getElementById('dawn');if(d){d.hidden=true;d.innerHTML='';document.body.classList.remove('kbk-open')}};
   const vis=e=>{const r=e.getBoundingClientRect();if(r.width<2||r.height<2)return false;for(let x=e;x&&x!==document.body;x=x.parentElement){const c=getComputedStyle(x);if(c.display==='none'||c.visibility==='hidden'||c.opacity==='0')return false}return true};
   const feat=d=>{const f={};const add=k=>f[k]=(f[k]||0)+1;
    d.querySelectorAll('img').forEach(i=>{if(vis(i))add('img')});d.querySelectorAll('.pframe,.kpframe,.md,.mdH,.kface,.kitav,[class*="avatar"]').forEach(i=>{if(vis(i))add('avatar:'+(i.className||'').toString().split(' ')[0])});
    d.querySelectorAll('.kszfig,.kt3,.kseal-ev,.kit-chip,.kchip,.kr,.krl,.kar,button').forEach(i=>{if(vis(i))add(i.className.toString().split(' ')[0]||i.tagName)});
    return f};
   const txt=d=>[...d.querySelectorAll('p,.kr,.krl,.kpmain div,.kpt,.kpst')].filter(vis).map(e=>e.innerText.replace(/\s+/g,' ').trim()).filter(Boolean);
   const measure=async(src)=>{await sleep(1300);const M=document.getElementById('modal');if(M.hidden||!Q[0])return;const d=M.querySelector('.dlg');const m=Q[0];
    out.push({src,t:String(m.t||'').slice(0,40),ksz:d.dataset.ksz||'',f:feat(d),txt:txt(d).join(' ¦ ').slice(0,400),vis:[...d.querySelectorAll('*')].filter(e=>vis(e)&&/(^|\s)(kpsubj|pframe|kszfig|kt3|kseal-ev|kitrel|kpiart)(\s|$)/.test(e.className.toString())).length})};
   const next=()=>{const m=Q[0];if(!m)return;try{if(m.opts&&m.opts.length){const i=m.opts.findIndex(o=>!o.disabled&&!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0));chooseM(Math.max(0,i))}else closeModal()}catch(e){Q.shift()}};
   const drain=async(src,k)=>{let g=0;while(Q.length&&g++<k){showModal();dawn();await measure(src);next();await sleep(50)}Q.length=0;document.getElementById('modal').hidden=true};
   for(let i=0;i<6;i++){try{const x=approachOne();if(x){Q.unshift(x);await drain('approach',1)}}catch(e){}}
   for(let i=0;i<6;i++){try{pushDil(makeDil());await drain('dilemma',1)}catch(e){}}
   const P=[['notice',{rows:[['Việc','Thử ấn']]}],['news',{facts:['Tin trong cung: thử.']}],['result',{facts:['Kết quả thử.']}]];
   for(const [k,o] of P){kitPanel(Object.assign({kind:k,title:'Thử '+k},o),true);await drain('kitPanel '+k,1)}
   /* fixed dialogs: the same persons / item on both devices (rivals[0..], first inventory item) */
   {const A=rivals.filter(v=>v&&v.name)[0],B=rivals.filter(v=>v&&v.name)[1],e=S.inv.find(x=>x&&IT[x.k]);
    const F=[['Lỡ hẹn',()=>Q.push({t:'Lỡ hẹn',btn:'Đã hiểu',who:pv(A),h:`<p>Đã quá hạn việc nhờ: <b>Mời uống trà</b>.</p><p>Thiện cảm −3</p>`})],
     ['Đồ thất lạc',()=>Q.push({t:'Đồ thất lạc',who:pMe(),h:`${loTag(e)}<p><b>${loNm(e.k)}</b> trong rương ngươi đã thất lạc.</p>`,btn:'Đã hiểu'})],
     ['Bị từ chối',()=>kitPanel({kind:'result',title:'Bị từ chối',facts:['Cung nữ ra cửa.'],who:pv(A)},true)],
     ['Tin cung',()=>kitPanel({kind:'news',title:'Tin cung',facts:['Mưa lớn suốt đêm.']},true)],
     ['Sổ nguyệt sự',()=>kitModal({kind:'intel',title:'Sổ nguyệt sự',sub:'Kính sự phòng',facts:[{who:S,text:'Ta: đã báo'},{who:A,text:A.name+': đã báo'},{who:B,text:B.name+': đã báo'}]})],
     ['Thưởng',()=>kitPanel({kind:'reward',title:'Ban thưởng',facts:['Hoàng thượng ban thưởng.'],who:pv(B)},true)],
     ['Cảnh báo',()=>kitPanel({kind:'threat',title:'Có kẻ rình',facts:['Có kẻ rình cung.'],who:pv(B)},true)]];
    for(const [t,f] of F){try{Q.length=0;f();showModal();await drain('fixed '+t,1)}catch(e){out.push({src:'fixed '+t,t,ksz:'ERR',f:{},txt:e.message,vis:0})}}}
   for(let t=0;t<TURNS;t++){try{endTurn()}catch(e){}dawn();await drain('play',12);if(S.dead)break}
   return out},TURNS);
  await ctx.close()}
 await b.close();
 const A=R['755x1000@2'],B=R['1180x820@2'];let bad=0,cmp=0;const n=Math.min(A.length,B.length);
 console.log('dialogs: Fold',A.length,'iPad',B.length);
 for(let i=0;i<n;i++){const a=A[i],c=B[i];if(a.src!==c.src||a.t!==c.t)continue;cmp++;const diffs=[];
  for(const k of new Set([...Object.keys(a.f),...Object.keys(c.f)])){if(/^(button|img)$/.test(k))continue;if((a.f[k]||0)!==(c.f[k]||0))diffs.push(`${k}: Fold ${a.f[k]||0} / iPad ${c.f[k]||0}`)}
  if((a.f.img||0)!==(c.f.img||0))diffs.push(`img: Fold ${a.f.img||0} / iPad ${c.f.img||0}`);
  if(a.txt!==c.txt)diffs.push(`text differs: Fold «${a.txt.slice(0,120)}» / iPad «${c.txt.slice(0,120)}»`);
  if(diffs.length){bad++;console.log('FAIL',a.src,'|',a.t,'|',diffs.join('; '))}}
 console.log(`phone-drop-scan: ${cmp} dialogs compared (same seeded game), ${bad} differ`,bad?'FAIL':'PASS');process.exit(bad?1:0)})();
