/* close-bugs viewport check: each fixed screen at this size — no horizontal overflow, no cut text in the dialog / top bar, the fixes visible.
   states: act tab (Sang buổi / Sang ngày mới label, weather chip by buổi), greeting card from inside (tối), festival invitation (Hội Phượng
   thêu), new-build line (kitLine position vs top bar + dialog), Múa card Cần row. */
(async()=>{const wait=ms=>new Promise(r=>setTimeout(r,ms));const R={};
 const cut=root=>[...root.querySelectorAll('h1,h2,h3,h4,#mt,button,p,.kan,.krv,.kplf span')].filter(e=>e.offsetParent&&e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflow!=='visible'&&getComputedStyle(e).textOverflow==='ellipsis').map(e=>e.textContent.trim().slice(0,40));
 const clr=()=>{Q.length=0;const m=document.getElementById('modal');m.hidden=true};
 const st=async(name,f)=>{try{clr();await f();await wait(500);const M=document.getElementById('modal');
   R[name]={hovf:document.documentElement.scrollWidth>innerWidth+1,cut:cut(M&&!M.hidden?M:document.body).slice(0,5),title:M&&!M.hidden?document.getElementById('mt').textContent:null,
    next:(document.getElementById('next')||{}).textContent,wx:S.wx&&S.wx.n}}catch(e){R[name]={err:String(e)}}};
 await st('act-toi',async()=>{S.buoi=3;used=0;tab="act";render()});
 await st('act-trua',async()=>{S.buoi=1;used=0;tab="act";render()});
 await st('greet-inside',async()=>{S.buoi=3;used=0;S.acGreet={};S.acSeen={};const k=places().map(x=>x.k).find(x=>{if(x[0]!=="r")return false;const h=accHost(x);return h&&h!==S&&h.alive&&!h.out&&rkOf(h)-rkOf(S)>=1});if(!k)throw"no palace";S.where[accHost(k).id]=k;S.place=k;S.visit={k,people:[],talked:false,tk:{}};tab="go";render();j77Tap(k)});
 await st('fest-invite',async()=>{S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};const pp=fPP7("phoenix",11);const d=fInv7("phoenix",pp,true);Q.push(d);showModal()});
 await st('line',async()=>{tab="act";render();kitLine("Đã mở bản mới",0)});
 {const l=document.getElementById('kupdline');const hud=document.querySelector('header.hud');if(l){const r=l.getBoundingClientRect(),h=hud?hud.getBoundingClientRect():{bottom:0};R.line.pill=[Math.round(r.top),Math.round(r.bottom)];R.line.belowHud=r.top>h.bottom;R.line.inView=r.bottom<=innerHeight}}
 await st('mua-card',async()=>{S.suc=17;S.buoi=0;used=0;tab="act";render()});
 {const b=[...document.querySelectorAll('#panel .cards > button')].find(x=>/Múa trong yến/.test(x.textContent));R['mua-card'].need=b?[...b.querySelectorAll('.kr-why .krv > *')].map(e=>e.textContent.trim()):'(không có thẻ Múa ở đời này)'}
 return R})()
