// MERGED event layout (owner 23/11 17:08Z: "gộp M1 và M2"): messenger (+ info box) and HER figure (+ choice box), cut out on the blurred stage between the bars.
// Throwaway mockup (never land). usage: node m12.js [fold|ipad|both] [still|video|all]
const {boot,settle,chromium}=require('./boot');const fs=require('fs');const {execSync}=require('child_process');const {mark,cut}=require('./cut');
const OUT='/home/user/wt/mock2-shots';fs.mkdirSync(OUT+'/raw',{recursive:true});
const LIB=fs.readFileSync(__dirname+'/mklib.js','utf8');
const LONG='<p>Giữa giờ Thân, {N} một mình bước vào cung, sắc mặt nghiêm lại. Nàng bảo cung nữ lui ra ngoài rồi mới hạ giọng: hôm qua ở Ngự hoa viên, có kẻ thấy Lệ quý nhân lén gặp người của Thái y viện, trong tay áo giấu một gói thuốc bọc giấy dầu. Chuyện chưa ai dám nói ra, nhưng nếu đúng là thuốc hại thai thì cả hậu cung sắp có biến.</p><p>Nàng nói thêm, giọng run run: “Muội không biết nên tin ai. Tỷ tỷ là người có lòng, xin tỷ cho muội một lời.” Ngoài hiên gió thổi qua rèm, tiếng chuông đồng ở Càn Thanh cung vừa điểm.</p>';
const SOLO='<p>Canh hai, đèn trong tẩm điện đã hạ bớt. Lúc cung nữ dọn khay trà, dưới thềm rơi ra một mảnh khăn lụa thêu chữ “Lệ”, vật tùy thân của Lệ quý nhân. Trên khăn còn vương mùi thuốc lạ, không giống hương của cung nào, mép khăn dính chút bột trắng.</p><p>Không ai thấy ai đánh rơi. Ngoài cửa, tiếng mõ cầm canh vừa qua.</p>';
const MJS=`window.MKM={
 css(){if(!window.__mkt)window.__mkt=setInterval(()=>{document.querySelectorAll('body > *').forEach(e=>{if(e.id!=='mk'&&e.offsetHeight<360&&/Trong cung vừa qua/.test(e.textContent||'')&&getComputedStyle(e).position==='fixed')e.style.display='none'})},100);if(document.getElementById('mkmcss'))return;const s=document.createElement('style');s.id='mkmcss';s.textContent=\`
#mk .dlg.mkbox{position:absolute;z-index:4;max-width:none;max-height:none;margin:0;padding:0;display:flex;flex-direction:column;overflow:visible;text-align:left;animation:none;box-shadow:0 6px 22px rgba(0,0,0,.38)}
#mk .mkbox .kph{border-radius:10px 10px 0 0;padding:6px 12px 5px;position:relative}
#mk .mkbox .kph .kptitle{font:700 16px/1.3 serif;color:#7a1f1f}
#mk .mkbox .mkbody{flex:1 1 auto;min-height:0;overflow:auto;padding:9px 12px 11px;font-size:15px;line-height:1.45;border-radius:0 0 10px 10px}
#mk .mkbox .mkbody p{margin:0 0 6px}
#mk .mkbox .opts{display:flex!important;flex-direction:column;gap:8px;margin-top:4px}
#mk .mkbox:before,#mk .mkbox:after{content:"";position:absolute;width:0;height:0;border-style:solid;border-color:transparent;border-width:0;background:none;box-shadow:none;inset:auto}
#mk .mkbox.tl:before{left:-13px;top:22px;border-width:11px 13px 11px 0;border-right-color:var(--gold,#b8901f)}
#mk .mkbox.tl:after{left:-11px;top:23px;border-width:10px 12px 10px 0;border-right-color:#f6ded6}
#mk .mkbox.tr:before{right:-13px;top:22px;border-width:11px 0 11px 13px;border-left-color:var(--gold,#b8901f)}
#mk .mkbox.tr:after{right:-11px;top:23px;border-width:10px 0 10px 12px;border-left-color:#f6ded6}
#mk .mkbox.rb:before{right:-13px;bottom:26px;border-width:11px 0 11px 13px;border-left-color:var(--gold,#b8901f)}
#mk .mkbox.rb:after{right:-11px;bottom:27px;border-width:10px 0 10px 12px;border-left-color:#fef2ec}
#mk .mkbox.ut:before{top:-13px;left:var(--tx,50%);border-width:0 11px 13px 11px;border-bottom-color:var(--gold,#b8901f)}
#mk .mkbox.ut:after{top:-11px;left:calc(var(--tx,50%) + 1px);border-width:0 10px 12px 10px;border-bottom-color:#f6ded6}
#mk .mkcut{position:absolute;overflow:hidden;z-index:2}
#mk .mkcut img{position:absolute;max-width:none;max-height:none;display:block}
.mktap{position:fixed;z-index:9999;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;border:3px solid #ffd54a;background:rgba(255,213,74,.25);box-shadow:0 0 14px rgba(255,190,40,.9);pointer-events:none}
.mkpick{outline:3px solid #e0a800!important;outline-offset:2px;transform:scale(.98)}
\`;document.head.appendChild(s)},
 // cut-out figure window: x = left px, y = top px, w/h = window, fh = full figure height (top of figure at window top + pad)
 cut(L,src,{x,y,w,h,fh,pad=4,align='c'}){const fw=fh/2.0408;const b=document.createElement('div');b.className='mkcut';b.style.cssText='left:'+x+'px;top:'+y+'px;width:'+w+'px;height:'+h+'px';
  const lx=align==='c'?(w-fw)/2:align==='l'?0:w-fw;b.innerHTML='<img src="'+src+'" style="left:'+lx+'px;top:'+pad+'px;width:'+fw+'px;height:'+fh+'px">';L.appendChild(b);return b},
 box(L,title,nodes,css,tail){const b=document.createElement('div');b.className='dlg mkbox '+(tail||'');b.style.cssText+=css;
  b.innerHTML='<div class="kph"><span class="kptitle">'+title+'</span></div><div class="mkbody"></div>';nodes.forEach(n=>n&&b.querySelector('.mkbody').appendChild(n));L.appendChild(b);return b},
 build({v,night,solo}){MKM.css();const M=document.getElementById('modal');const ds=[...M.querySelectorAll('.dlg')];const d=ds.reverse().find(x=>/Lệ quý nhân/.test(x.textContent))||ds.find(x=>x.querySelector('.kpmain'));if(!d)return {err:M.textContent.slice(0,200)};
  [...document.body.children].forEach(e=>{if(/^\\s*Trong cung vừa qua/.test(e.textContent||''))e.style.display='none'});
  const P0=MKX.who(d);const src=figFor(P0),me=figFor(S);const km=d.querySelector('.kpmain').cloneNode(true);km.querySelectorAll('.k3ev').forEach(e=>e.remove());
  km.querySelectorAll('*').forEach(e=>{e.style.columns='auto';e.style.columnCount='1'});km.style.cssText+=';max-height:none!important;height:auto!important;overflow:visible!important;position:static!important;padding:0!important;margin:0!important;border:0!important;background:none!important;box-shadow:none!important;columns:auto!important;column-count:1!important';
  const op=d.querySelector('.opts').cloneNode(true);
  const L=MKX.layer(MKX.stageSrc(night),{night});document.documentElement.classList.add('mkhide');
  document.querySelectorAll('[class*=seal]').forEach(e=>{if(!e.closest('header.hud')&&!e.classList.contains('kpseal'))e.style.display='none'});
  const ipad=innerWidth>1000,w=L.g.w,H=L.g.H;const who=P0?P0.name:'';const T='Chuyện trong cung';const R={L,ipad,figs:[],boxes:[]};
  if(!solo&&v==='A'){
   if(!ipad){const rh=H/2,fh=rh/0.5;
    R.figs.push(MKM.cut(L,src,{x:0,y:0,w:w*.40,h:rh,fh}));R.figs.push(MKM.cut(L,me,{x:w*.60,y:rh,w:w*.40,h:rh,fh}));
    R.boxes.push(MKM.box(L,who,[km],'left:'+(w*.40)+'px;top:10px;width:'+(w*.58)+'px;height:'+(rh-18)+'px','tl'));
    R.boxes.push(MKM.box(L,S.name,[op],'left:'+(w*.02)+'px;top:'+(rh+8)+'px;width:'+(w*.57)+'px;height:'+(rh-16)+'px','tr'))}
   else{const fh=H-6;R.figs.push(MKM.cut(L,src,{x:0,y:0,w:w*.25,h:H,fh}));R.figs.push(MKM.cut(L,me,{x:w*.75,y:0,w:w*.25,h:H,fh}));
    R.boxes.push(MKM.box(L,who,[km],'left:'+(w*.245)+'px;top:12px;width:'+(w*.43)+'px;height:'+(H*.45)+'px','tl'));
    R.boxes.push(MKM.box(L,S.name,[op],'left:'+(w*.315)+'px;bottom:12px;width:'+(w*.43)+'px;max-height:'+(H*.50)+'px','rb'))}}
  else if(!solo){// B: each box sits under its own speaker's face (two columns)
   if(!ipad){const fh=H*1.05,bt=H*.36;R.figs.push(MKM.cut(L,src,{x:0,y:0,w:w/2,h:H,fh}));R.figs.push(MKM.cut(L,me,{x:w/2,y:0,w:w/2,h:H,fh}));
    R.boxes.push(MKM.box(L,who,[km],'left:8px;top:'+bt+'px;width:'+(w/2-14)+'px;bottom:8px','ut'));R.boxes[0].style.setProperty('--tx','45%');
    R.boxes.push(MKM.box(L,S.name,[op],'left:'+(w/2+6)+'px;top:'+bt+'px;width:'+(w/2-14)+'px;max-height:'+(H-bt-8)+'px','ut'));R.boxes[1].style.setProperty('--tx','50%')}
   else{const fh=H-6,bt=H*.30;R.figs.push(MKM.cut(L,src,{x:0,y:0,w:w/2,h:H,fh}));R.figs.push(MKM.cut(L,me,{x:w/2,y:0,w:w/2,h:H,fh}));
    R.boxes.push(MKM.box(L,who,[km],'left:'+(w*.03)+'px;top:'+bt+'px;width:'+(w*.44)+'px;bottom:12px','ut'));R.boxes[0].style.setProperty('--tx','48%');
    R.boxes.push(MKM.box(L,S.name,[op],'left:'+(w*.53)+'px;top:'+bt+'px;width:'+(w*.44)+'px;max-height:'+(H-bt-12)+'px','ut'));R.boxes[1].style.setProperty('--tx','48%')}}
  else if(v==='A'){// solo, beside her: one box (story + her choices) attached to her
   if(!ipad){const fh=H*1.02;R.figs.push(MKM.cut(L,me,{x:w*.52,y:0,w:w*.48,h:H,fh}));
    R.boxes.push(MKM.box(L,T,[km,op],'left:'+(w*.02)+'px;top:10px;width:'+(w*.58)+'px;max-height:'+(H-20)+'px','tr'))}
   else{const fh=H-6;R.figs.push(MKM.cut(L,me,{x:w*.66,y:0,w:w*.30,h:H,fh}));
    R.boxes.push(MKM.box(L,T,[km,op],'left:'+(w*.12)+'px;top:12px;width:'+(w*.56)+'px;max-height:'+(H-24)+'px','tr'))}}
  else{// solo B: box under her face
   const fh=ipad?H-6:H*1.05,bt=H*(ipad?.30:.36);R.figs.push(MKM.cut(L,me,{x:0,y:0,w:w,h:H,fh}));
   R.boxes.push(MKM.box(L,T,[km,op],'left:'+(ipad?w*.22:w*.06)+'px;top:'+bt+'px;width:'+(ipad?w*.56:w*.88)+'px;max-height:'+(H-bt-10)+'px','ut'))}
  window.__R=R;return {who,n:R.boxes.length}},
 tap(x,y){const t=document.createElement('div');t.className='mktap';t.style.left=x+'px';t.style.top=y+'px';document.body.appendChild(t);
  t.animate([{transform:'scale(.4)',opacity:0},{transform:'scale(1)',opacity:1,offset:.35},{transform:'scale(1.5)',opacity:0}],{duration:650,easing:'ease-out'}).onfinish=()=>t.remove()},
 // OPEN motion: layer fades in, figures slide in from their side, boxes pop
 open(){const R=window.__R;const L=R.L;L.animate([{opacity:0},{opacity:1}],{duration:380,easing:'ease-out',fill:'both'});
  L.querySelector('.mkbg').animate([{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:700,easing:'ease-out',fill:'both'});
  R.figs.forEach((f,i)=>{const r=f.getBoundingClientRect(),fromL=r.left+r.width/2<innerWidth/2;f.animate([{transform:'translateX('+(fromL?-60:60)+'px)',opacity:0},{transform:'none',opacity:1}],{duration:520,delay:180+i*150,easing:'cubic-bezier(.2,.8,.3,1)',fill:'both'})});
  R.boxes.forEach((b,i)=>b.animate([{transform:'scale(.92)',opacity:0},{transform:'none',opacity:1}],{duration:340,delay:620+i*260,easing:'ease-out',fill:'both'}))},
 scroll(ms){const b=window.__R.boxes[0].querySelector('.mkbody');const m=b.scrollHeight-b.clientHeight;if(m<4)return 0;const t0=performance.now();const st=()=>{const k=Math.min(1,(performance.now()-t0)/ms);b.scrollTop=m*k*k*(3-2*k);if(k<1)requestAnimationFrame(st)};requestAnimationFrame(st);return m},
 pick(i){const R=window.__R;const bx=R.boxes[R.boxes.length-1];const body=bx.querySelector('.mkbody');const cs=[...bx.querySelectorAll('.opts > *')];const c=cs[i]||cs[0];
  const br=body.getBoundingClientRect(),cr=c.getBoundingClientRect();if(cr.bottom>br.bottom||cr.top<br.top)body.scrollTop+=cr.top-br.top-20;
  setTimeout(()=>{const r=c.getBoundingClientRect();MKM.tap(r.left+r.width*.5,r.top+r.height/2);c.classList.add('mkpick')},250);return 1},
 close(){const R=window.__R;const L=R.L;R.boxes.forEach(b=>b.animate([{opacity:1},{opacity:0,transform:'scale(.96)'}],{duration:260,fill:'both'}));
  R.figs.forEach(f=>{const r=f.getBoundingClientRect(),toL=r.left+r.width/2<innerWidth/2;f.animate([{opacity:1},{opacity:0,transform:'translateX('+(toL?-50:50)+'px)'}],{duration:380,delay:120,fill:'both'})});
  L.animate([{opacity:1},{opacity:0}],{duration:420,delay:260,fill:'both'}).onfinish=()=>{MKX.clear();MKX.closeModal()}}
};`;
const CLIPS=[['A',0,0],['A',1,0],['B',0,0],['B',1,0],['A',0,1],['B',1,1]];
const nm=(v,night,solo)=>`m12-${v}${solo?'-solo':''}${night?'-night':'-day'}`;
(async()=>{const which=process.argv[2]||'both',mode=process.argv[3]||'all';const b=await chromium.launch();
 for(const [W,H,name] of [[755,1000,'fold'],[1180,820,'ipad']]){if(which!=='both'&&which!==name)continue;
  for(const pass of ['still','video']){if(mode!=='all'&&mode!==pass)continue;const vid=pass==='video';
   const vdir=`${OUT}/raw/${name}`;if(vid){fs.rmSync(vdir,{recursive:true,force:true});fs.mkdirSync(vdir,{recursive:true})}
   const {ctx,p}=await boot(b,W,H,vid?1:2,vid?{recordVideo:{dir:vdir,size:{width:W,height:H}}}:null);const T0=Date.now();
   await p.addScriptTag({content:LIB});await p.addScriptTag({content:MJS});const marks=[];
   for(const [v,night,solo] of CLIPS){const n=nm(v,night,solo);
    for(let t=0;t<5;t++){if(await p.evaluate(({L,solo})=>{window.__mksolo=solo;return MKX.openEvent(L)},{L:solo?SOLO:LONG,solo}))break;await p.evaluate(()=>{try{closeModal()}catch(e){}});await p.waitForTimeout(1500)}
    await p.waitForFunction(()=>document.querySelector('#modal .dlg .kpmain'),null,{timeout:20000});await settle(p);
    const r=await p.evaluate(a=>MKM.build(a),{v,night,solo});await settle(p);
    if(!vid){await p.waitForTimeout(500);await p.screenshot({path:`${OUT}/${n}-${name}.png`});console.log('still',n,name,JSON.stringify(r))}
    else{// hide, then play: open → read (scroll the story) → tap a choice → close
     await p.evaluate(()=>{window.__R.L.style.opacity='0'});await p.waitForTimeout(300);await mark(p);await p.waitForTimeout(500);const s=(Date.now()-T0)/1000;
     await p.evaluate(()=>{window.__R.L.style.opacity='';MKM.open()});await p.waitForTimeout(2300);
     const m=await p.evaluate(()=>MKM.scroll(1800));await p.waitForTimeout(m?2300:600);
     await p.evaluate(()=>MKM.pick(1));await p.waitForTimeout(1300);await p.evaluate(()=>MKM.close());await p.waitForTimeout(1300);
     marks.push([n,(Date.now()-T0)/1000-s+0.5]);console.log('clip',n,name,JSON.stringify(r))}
    await p.evaluate(()=>{MKX.clear();MKX.closeModal()});await p.waitForTimeout(500)}
   if(p.errs.length)console.log('errors',p.errs.slice(0,4));const TC=(Date.now()-T0)/1000;const vp=vid?await p.video().path():null;await ctx.close();
   if(vid)cut(vp,marks,n=>`${OUT}/${n}-${name}.mp4`,3.8);}}
 await b.close()})();
