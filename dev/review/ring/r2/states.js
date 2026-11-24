window.ST=async function(mode,name){const S=KRR.S,gi=KRR.gi;Object.assign(S,{glow:0,pill:0,sel:-1,selm:null,seld:0,appr:0,apprG:-1,apprM:0,sheet:0,push:0,apprOn:0});
 document.querySelectorAll('.kscn').forEach(e=>e.remove());document.body.classList.remove('kscn-on');
 const bg='https://ctm-img.victoria-tntt.workers.dev/img/'+(mode==='R'?'kc-sanh':'ngu-hoa-vien')+'.webp';
 const at=i=>{if(mode==='S')S.camX=KRR.camFor(i);else S.cur=i};
 if(mode==='R'){if(name==='idle')S.cur=1;if(name==='turned')S.cur=-3;if(name==='approach'||name==='appr95'){S.cur=8;S.apprG=8;S.apprM=0;S.appr=name==='approach'?.8:1}
  KRR.render();if(name==='appr95')await SCEN.scene({bg,left:{src:KRR.GROUPS[8].m[0].src},right:{src:KRR.GROUPS[0].m[0].src,k:.96},title:KRR.GROUPS[8].m[0].name,line:'Muội muội, cho ta nói đôi lời được chăng?',opts:['Nghe nàng nói','Hẹn lúc khác']});return}
 const G=n=>KRR.GROUPS[gi(n)].m;
 if(name==='idle')at(gi('dan'));if(name==='turned')at(gi('chu'));
 if(name==='alert'){at(gi('co'));S.glow=1;S.pill=1}
 if(name==='open'){at(gi('cai'));await SCEN.scene({bg,left:{src:G('cai')[0].src},right:{src:G('cai')[1].src,flip:1},title:'Tô Nhược Lan',line:'Muội dám giẫm lên xiêm y của ta?',opts:['Bước vào can ngăn','Đứng nghe thêm','Lui ra']})}
 if(name==='open4'){at(gi('chat'));const m=G('chat');await SCEN.scene({bg,many:m.map(x=>({src:x.stage===0?'https://ctm-img.victoria-tntt.workers.dev/img/kit/unknown-fig-f.webp':x.src})),lit:1,title:'Ngọc Hân',line:'Nghe nói hôm nay ngự giá sẽ qua vườn.',opts:['Chen lời vào','Đứng nghe','Lui ra']})}
 if(name==='person'||name==='person2'){at(gi('chu'));S.sel=gi('chu');S.selm=name==='person'?1:2;S.seld=1;S.sheet=1}
 if(name==='approach'||name==='appr95'){at(gi('tham'));S.apprG=gi('tham');S.apprM=0;S.appr=name==='approach'?.8:1;KRR.render();
  if(name==='appr95')await SCEN.scene({bg,left:{src:G('tham')[0].src},right:{src:KRR.GROUPS[0].m[0].src,k:.96},title:'Đường Chỉ Nhu',line:'Muội muội, ta có đôi lời muốn nói riêng.',opts:['Nghe nàng nói','Hẹn lúc khác']})}
 KRR.render();await new Promise(r=>setTimeout(r,900));KRR.render()};
