/* in-page scenarios (strings evaluated in the game frame). Each returns when done. P.seg(name) / P.end() mark perf segments. */
window.SCEN={
 /* baseline: the home stage doing nothing (petals, idle figures) — the floor of this machine */
 async idle(){const P=window.__seg||{seg(){},end(){}};await MD2.wait(400);P.seg('idle-home');await MD2.wait(3000);P.end()},
 /* control: what LIVE does today — the event dialog opens (kmIn) with its option list, then the result card + kitStatFx labels (all cells at once) */
 async live(){const P=window.__seg||{seg(){},end(){}};await MD2.wait(400);P.seg('live-dialog');pushModal({t:'Quý nhân mời thưởng trà',h:'<p>Bành quý nhân dừng bên lối hoa.</p>',opts:M1.OPTS.slice(0,5).map(([n,l])=>({n,j67:l,x:l,fx:{}}))});showModal();await MD2.wait(1500);P.end();
  Q.length=0;document.getElementById('modal').hidden=true;P.seg('live-result');const b=rsnap();S.sung+=3;S.danh+=2;S.bac-=10;S.suc-=5;resultShow('Dâng trà',b,true);try{render()}catch(e){}await MD2.wait(3000);P.end()},
 async m1(o){o=o||{};const P=window.__seg||{seg(){},end(){}};const g=await M1.setup({n:o.n||5,plain:o.plain});P.seg('m1-enter+deal');await M1.enter();P.end();await MD2.wait(900);
  P.seg('m1-lift');await M1.lift(1);await MD2.wait(1500);await M1.lift(3);P.end();await MD2.wait(1700);
  P.seg('m1-choose');await M1.choose(3);P.end();
  P.seg('m4-fly');await M4.run({title:'Mời sang cung',ok:true,mut:()=>{S.sung+=4;S.bac-=20;S.danh+=1}});P.end();await MD2.wait(1500);return g},
 async m2(o){const P=window.__seg||{seg(){},end(){}};await M2.setup({n:12});await MD2.wait(500);P.seg('m2-tap');await M2.tapPerson(0);P.end();await MD2.wait(900);
  P.seg('m2-open');await M2.openRing();P.end();await MD2.wait(700);P.seg('m2-swipe');await M2.fling(-0.011);await MD2.wait(400);await M2.fling(0.007);P.end();await MD2.wait(500);
  await M2.turnTo(5);await MD2.wait(500);await M2.turnBy(1);await MD2.wait(900);P.seg('m2-give');const nm=await M2.give();P.end();await MD2.wait(400);return nm},
 async m4(o){const P=window.__seg||{seg(){},end(){}};await MD2.wait(300);P.seg('m4-fly');await M4.run({title:'Dâng trà hầu Thái hậu',ok:true,mut:()=>{S.sung+=3;S.danh+=2;S.bac-=10;S.suc-=5},item:'ngocboi'});P.end();
  await MD2.wait(1600);P.seg('m4-fly-bai');await M4.run({title:'Dâng trà hầu Thái hậu',ok:false,mut:()=>{S.suc-=8;S.danh-=3}});P.end();await MD2.wait(1500)}};
