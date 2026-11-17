/* tuanluc-sync scan (owner bug 17/11 03:18Z): play scripted lives ~3 months (12 tuần) on dev/index.html (DIRECT mode, logic only) and
   count (1) ONE-TIME lines that were written more than once in one life (must be 0), (2) BÁO notices shown at the moment (jlogbao) per buổi
   (max 1 per buổi), (3) clumsy masked lines ("chưa quen biết báo …: Một vị … chưa quen biết"), (4) Tống ma ma tips repeated inside one tuần.
   usage: node dev/test/tuanluc-sync.js [lives=6] [weeks=12] [html=dev/index.html]   → prints a JSON summary, last line = one-line verdict */
const {chromium}=require('playwright');const path=require('path');
const LIVES=+(process.argv[2]||6),WEEKS=+(process.argv[3]||12),HTML=path.resolve(process.argv[4]||path.join(__dirname,'../index.html'));
(async()=>{const b=await chromium.launch();const tot={lives:0,lines:0,once:{},masked:[],tips:[],bao:0,baoMaxPerBuoi:0,errs:[],resid:[],filler:0};
 for(let L=0;L<LIVES;L++){const ctx=await b.newContext({viewport:{width:1180,height:820}});const p=await ctx.newPage();
  p.on('pageerror',e=>tot.errs.push(e.message.slice(0,160)));
  await p.route(/^https?:\/\//,r=>r.abort());
  await p.goto('file://'+HTML);await p.waitForTimeout(1500);
  const R=await p.evaluate(async([weeks,L])=>{const out={lines:[],bao:[],tuan:0,resid:[],filler:0,mom:0,miss:0,missS:[],cards:0,cardMiss:0,cardMissS:[]};const sl=t=>new Promise(r=>setTimeout(r,t));
   try{SLOT=3;const ti=document.getElementById('title');if(ti)ti.hidden=true;const OR=[...new Set(ORIGINS.map(o=>o.k))];window.__forceOrigin=OR[L%OR.length];start();Q.length=0;render();
    const l0=log;log=function(h){const q=S.logSeq||0;const r=l0.apply(this,arguments);/* the STORED line (after every wrapper) */if((S.logSeq||0)!==q&&S.logs[0])out.lines.push({t:S.turn,tu:S.tuan,b:S.buoi||0,h:String(S.logs[0]).replace(/<span class="ld">[^<]*<\/span>/,"")});return r};
    /* item 7: every card shown (KẾT QUẢ toast, dialog with a title) has its full record in the Sổ ghi (S.cards) */
    const has=(pre,t)=>(S.cards||[]).some(c=>c.k.includes(pre+String(t).replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().slice(0,30)));
    {const r0=resultShow;resultShow=function(title){if(window.__tsNoRes)return r0.apply(this,arguments);const tt=document.getElementById("rtoast");const h0=tt?tt.innerHTML:"";const r=r0.apply(this,arguments);setTimeout(()=>{try{const t2=document.getElementById("rtoast");if(t2&&t2.classList.contains("on")&&t2.innerHTML!==h0){out.cards++;const rt=t2.querySelector(".rt");const same=rt&&(S.cards||[]).some(c=>c.h.includes(lbStrip(rt.innerHTML).slice(0,300)));/* one card on screen = one card kept, whatever title the last call had */if(!has("kq|",title||"")&&!same){out.cardMiss++;if(out.cardMissS.length<8)out.cardMissS.push("kq "+title)}}}catch(e){}},30);return r}}
    {const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const q=Q[0],m=document.getElementById("modal");if(q&&q.t&&m&&!m.hidden&&!S.mg){out.cards++;if(!has("dl|",q.t)){out.cardMiss++;if(out.cardMissS.length<8)out.cardMissS.push("dl "+String(q.t).slice(0,60))}}}catch(e){}return r}}
    /* item 6, moment level: after every player action / time step, each person whose feeling for her changed is NAMED in a line of that moment */
    const PN=()=>{const M={};for(const v of rivals)if(v&&v!==S&&v.id!=null&&!v.dead)M["v"+v.id]=v;[S.maid].concat(S.staff||[]).forEach(x=>{if(x&&typeof x.loyal==="number")M["s"+(x.sid!=null?x.sid:x.name)]=x});return M};
    let dep=0;for(const f of ["act","chooseM","closeModal","nextBuoi","goTo"]){const g=window[f];window[f]=function(){if(dep++)try{return g.apply(this,arguments)}finally{dep--}
     const b=rlSnap(),q=S.logSeq||0,S0=S;try{return g.apply(this,arguments)}finally{dep--;try{if(S===S0&&!S.dead){const a=rlSnap(),M=PN();const n=(S.logSeq||0)-q;const txt=S.logs.slice(0,Math.max(0,n)).map(h=>String(h).replace(/<[^>]+>/g," ")).join(" ");
       for(const k in a){if(!b[k])continue;if(a[k].some((x,i)=>x!==b[k][i])){out.mom++;const p=M[k];const nm=p&&p.name||"";const known=!rivals.includes(p)||(typeof knows!=="function"||knows(p))&&(typeof kitKnownName!=="function"||kitKnownName(p));
        if(!(nm&&txt.includes(nm))&&!(!known&&/chưa quen biết/.test(txt))&&!(p===S.maid&&/cung nữ|thân tín/.test(txt)&&txt.includes(nm))){out.miss++;if(out.missS.length<12)out.missS.push(f+": "+nm+" "+JSON.stringify([b[k],a[k]])+" | "+txt.slice(0,160))}}}}}catch(e){}}}}
    const e0=endTurn;endTurn=function(){out.tuan++;/* item 6: what the week book could not explain (was the "Mấy việc vặt" filler) */try{window.__wkResid=[];const d=wkBookData();out.resid.push(...window.__wkResid.map(x=>S.turn+"|"+x));for(const P of d.persons||[])for(const b of P.blocks||[])for(const f of b.facts||[])if(/Mấy việc vặt/.test(f.text||f))out.filler++}catch(e){}return e0.apply(this,arguments)};
    if(typeof kitPanel==="function"){const k0=kitPanel;kitPanel=function(spec){if(spec&&spec.cls&&/klbao/.test(spec.cls))out.bao.push({t:S.turn,tu:S.tuan,b:S.buoi||0});return k0.apply(this,arguments)}}
    const drain=async()=>{for(let j=0;j<16&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length){chooseM(Math.floor(Math.random()*m.opts.length))}else closeModal()}catch(e){Q.shift();try{showModal()}catch(e){}}await sl(20)}};
    for(let i=0;i<weeks*40&&out.tuan<weeks&&!S.dead;i++){await drain();if(Q.length){Q.length=0;render()}
     for(const t of ['acts','log','rel','staff']){try{tab=t;render()}catch(e){}}
     try{tab='acts';render();const ix=(deck||[]).map((a,i)=>[a,i]).filter(([a])=>a&&!a.done&&!a.lock);for(let k=0;k<2&&ix.length;k++){const [a,i]=ix.splice(Math.floor(Math.random()*ix.length),1)[0];try{act(i)}catch(e){}await sl(10);await drain()}}catch(e){}
     try{const Lp=places().filter(p=>p.k&&p.k!==S.place);const pl=Lp[Math.floor(Math.random()*Lp.length)];if(pl){goTo(pl.k);await drain()}}catch(e){}
     await drain();try{nextBuoi()}catch(e){try{Q.length=0;endTurn()}catch(e){}}await sl(20)}
   }catch(e){out.err=String(e&&e.stack||e).slice(0,300)}return out},[WEEKS,L]);
  if(R.err)tot.errs.push(R.err);tot.resid.push(...R.resid);tot.filler+=R.filler;tot.mom=(tot.mom||0)+R.mom;tot.miss=(tot.miss||0)+R.miss;(tot.missS=tot.missS||[]).push(...R.missS);tot.cards=(tot.cards||0)+R.cards;tot.cardMiss=(tot.cardMiss||0)+R.cardMiss;(tot.cardMissS=tot.cardMissS||[]).push(...R.cardMissS);if(process.env.DUMP)require("fs").appendFileSync(process.env.DUMP,R.lines.map(x=>x.t+"|"+x.b+"|"+x.h.replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim()).join("\n")+"\n");tot.lives++;tot.lines+=R.lines.length;
  const plain=h=>h.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
  /* one-time lines: the announcement family (unlock / first time / met someone / opens) — same text twice in one life = a repeat */
  const ONCE=/bắt đầu nghĩ đến những lối khác|ngoài con đường tranh sủng|có thêm nhóm|lần đầu|Lần đầu|nay đã biết tên|đã lành, ngươi tháo|từ nay (đi theo|theo hầu|lo chạy việc)/;
  const seen={};for(const x of R.lines){const t=plain(x.h);if(!ONCE.test(t))continue;seen[t]=(seen[t]||0)+1}
  for(const [t,n] of Object.entries(seen))if(n>1)tot.once[t]=(tot.once[t]||0)+n-1;
  for(const x of R.lines){const t=plain(x.h);if(/chưa quen biết[^.:]*:\s*Một vị [^.]*chưa quen biết/.test(t)||/chưa quen biết báo [^:]*:/.test(t))tot.masked.push(t.slice(0,160))}
  const tw={};for(const x of R.lines){const t=plain(x.h);if(!/Tống ma ma/.test(t))continue;const k=x.t+'|'+t;tw[k]=(tw[k]||0)+1}
  for(const [k,n] of Object.entries(tw))if(n>1)tot.tips.push(n+'× '+k.slice(0,140));
  const pb={};for(const x of R.bao){const k=x.t+'.'+x.tu+'.'+x.b;pb[k]=(pb[k]||0)+1}tot.bao+=R.bao.length;tot.baoMaxPerBuoi=Math.max(tot.baoMaxPerBuoi,...Object.values(pb),0);
  await ctx.close()}
 await b.close();const nOnce=Object.values(tot.once).reduce((a,b)=>a+b,0);
 console.log(JSON.stringify(tot,null,1).slice(0,6000));console.log("CARDMISS "+JSON.stringify(tot.cardMissS||[]));
 console.log(`TUANLUC-SYNC lives ${tot.lives} lines ${tot.lines} · one-time repeats ${nOnce} · clumsy masked ${tot.masked.length} · tip repeats/tuần ${tot.tips.length} · BÁO ${tot.bao} (max/buổi ${tot.baoMaxPerBuoi}) · relation changes ${tot.mom} (no cause line ${tot.miss}) · cards shown ${tot.cards} (missing from Sổ ghi ${tot.cardMiss}) · week-book residue ${tot.resid.length} · filler lines ${tot.filler} · errors ${tot.errs.length}`)})();
