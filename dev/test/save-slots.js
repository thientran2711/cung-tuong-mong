/* Save slots: solo sổ vs co-op rooms (owner 16/11). Local, no Worker: the co-op life is driven by COOP's own local events
   (emit "start" as host with no world yet → jcoopworld builds the co-op life; COOP.leave(true) → "stop").
   usage: python3 dev/build/assemble.py && node dev/test/save-slots.js [WxH ...]
   Checks: (1) solo sổ intact after solo → co-op → back to solo (incl. renders after leaving, the in-game title button);
   (2) three co-op rooms with different friends listed, each with its own character; (3) old saves (v2-v6 sổ, old single
   ctm-coop-room) still load / show; (4) loading a sổ while still in a room leaves the room first. */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');
const VPS=(process.argv.slice(2).length?process.argv.slice(2):['755x1000','1180x820','844x390']).map(s=>s.split('x').map(Number));
const OUTD=require('path').resolve(__dirname,'../shots/save-slots');require('fs').mkdirSync(OUTD,{recursive:true});const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});
 for(const [w,h] of VPS){const tag=w+'x'+h;
  const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:true,isMobile:w<1100,reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>window.COOPW&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
  /* solo life in Sổ 1 */
  const life=async()=>{await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:60000});await p.evaluate(()=>{try{nlAccept()}catch(e){}while(Q.length)Q.shift();try{closeModal()}catch(e){}try{render()}catch(e){}})};
  await p.evaluate(()=>{SLOT=1;$("title").hidden=true;start()});await life();
  const solo=await p.evaluate(()=>{save();return {name:S.name,rank:S.rank}});
  const r1=await p.evaluate(()=>JSON.parse((window.slotGet?slotGet('hclh-save-v2-1'):localStorage.getItem('hclh-save-v2-1'))).S.name);ok(r1===solo.name,`${tag} solo life saved in Sổ 1`,r1);
  /* co-op life (host, no world yet) */
  await p.evaluate(()=>{window.__solo=S;COOP.state.room='K7QD';COOP.state.you='a';COOP.state.status='open';COOP.emit('start',{room:'K7QD',you:'a',host:true,week:0,state:null})});
  await p.waitForFunction(()=>S!==window.__solo&&S&&S.name,null,{timeout:60000});await life();
  const co=await p.evaluate(()=>({name:S&&S.name,on:COOPW.on}));
  ok(co.on&&co.name&&co.name!==solo.name,`${tag} co-op life built`,co);
  const mid=await p.evaluate(()=>JSON.parse((window.slotGet?slotGet('hclh-save-v2-1'):localStorage.getItem('hclh-save-v2-1'))).S.name);ok(mid===solo.name,`${tag} Sổ 1 untouched while in co-op`,mid);
  /* she leaves the room (freeze panel "Về màn đầu" path), then anything renders */
  await p.evaluate(()=>{COOP.leave(true);try{showTitle()}catch(e){}});await p.waitForTimeout(1500);
  const aft0=await p.evaluate(()=>{const d=JSON.parse((window.slotGet?slotGet('hclh-save-v2-1'):localStorage.getItem('hclh-save-v2-1'))||'null');return d&&d.S.name});
  ok(aft0===solo.name,`${tag} Sổ 1 intact after "Về màn đầu" (leave + title, no other action)`,aft0);
  await p.evaluate(()=>{try{render()}catch(e){}try{save()}catch(e){}});
  const aft=await p.evaluate(()=>{const d=JSON.parse((window.slotGet?slotGet('hclh-save-v2-1'):localStorage.getItem('hclh-save-v2-1'))||'null');return d&&d.S.name});
  ok(aft===solo.name,`${tag} Sổ 1 still the solo life after leaving co-op`,{slot1:aft,solo:solo.name,coop:co.name});
  /* the solo sổ loads as the solo life (title: Chọn sổ › Tiếp tục kiếp này) */
  const ld=await p.evaluate(()=>{$("title").hidden=false;showTitle();const b=document.querySelector('#slots [data-load="1"]');if(b)b.click();return {name:S&&S.name,coop:!!(S&&S.coopRoom),on:COOPW.on}});
  ok(ld.name===solo.name&&!ld.coop&&!ld.on,`${tag} back to solo: Sổ 1 loads the solo life`,ld);
  /* room list: K7QD remembered with her co-op character */
  const L1=await p.evaluate(()=>CTM_ROOMS.list());ok(L1.length>=1&&L1[0].room==='K7QD'&&L1[0].name===co.name,`${tag} room K7QD remembered with her co-op life`,L1[0]);
  /* in-game title button inside a room, then a solo sổ while the room is still open: room left first, sổ untouched */
  const rooms=[['K7QD','Hiền phi Lục Uyển'],['M2PX','Tài nhân Hà Lam'],['Q9ZT','Đáp ứng Kiều Mai']];
  for(const [code,fr] of rooms.slice(1)){
    await p.evaluate(c=>{window.__solo=S;COOP.state.room=c;COOP.state.you='a';COOP.state.status='open';COOP.emit('room',{t:'room',code:c,you:'a'});COOP.emit('start',{room:c,you:'a',host:true,week:0,state:null})},code);
    await p.waitForFunction(()=>S!==window.__solo&&S&&S.name&&S.coopRoom,null,{timeout:60000});await life();
    await p.evaluate(()=>{$("menu").click()});await p.waitForTimeout(300);
    const st=await p.evaluate(()=>({on:COOPW.on,status:COOP.state.status,slot1:JSON.parse((window.slotGet?slotGet('hclh-save-v2-1'):localStorage.getItem('hclh-save-v2-1'))).S.name,title:!$("title").hidden}));
    ok(!st.on&&st.status==='off'&&st.slot1===solo.name&&st.title,`${tag} in-game title button in room ${code}: room left, Sổ 1 intact`,st)}
  /* friend lines differ per room (set directly: the friend's own character comes from the server) */
  await p.evaluate(R=>{R.forEach(([c,f])=>{const L=CTM_ROOMS.list();const x=L.find(y=>y.room===c);if(x){x.fr=f;localStorage.setItem('ctm-coop-rooms',JSON.stringify(L))}})},rooms);
  const L3=await p.evaluate(()=>CTM_ROOMS.list());
  ok(L3.length===3&&new Set(L3.map(x=>x.room)).size===3&&new Set(L3.map(x=>x.name)).size===3&&new Set(L3.map(x=>x.fr)).size===3,`${tag} three co-op rooms, three friends, three characters`,L3.map(x=>[x.room,x.fr,x.who+' '+x.name,x.age,x.date]));
  /* still in a room, she picks the solo sổ: the room is left before the sổ loads */
  await p.evaluate(()=>{window.__solo=S;COOP.state.room='Q9ZT';COOP.state.you='a';COOP.state.status='open';COOP.emit('start',{room:'Q9ZT',you:'a',host:true,week:0,state:null})});
  await p.waitForFunction(()=>S!==window.__solo&&S&&S.name&&S.coopRoom,null,{timeout:60000});await life();
  const ld2=await p.evaluate(()=>{$("title").hidden=false;showTitle();const b=document.querySelector('#slots [data-load="1"]');if(b)b.click();try{render()}catch(e){}return {name:S.name,on:COOPW.on,st:COOP.state.status,slot1:JSON.parse((window.slotGet?slotGet('hclh-save-v2-1'):localStorage.getItem('hclh-save-v2-1'))).S.name}});
  ok(ld2.name===solo.name&&!ld2.on&&ld2.st==='off'&&ld2.slot1===solo.name,`${tag} solo sổ picked while in a room: room left, solo life loaded`,ld2);
  /* review r1: co-op death (in the room, then after leaving) never removes the solo sổ; Kiếp mới in the room stays a room life */
  await p.evaluate(()=>{window.__solo=S;COOP.state.room='Q9ZT';COOP.state.you='a';COOP.state.status='open';COOP.emit('start',{room:'Q9ZT',you:'a',host:true,week:0,state:null})});
  await p.waitForFunction(()=>S!==window.__solo&&S&&S.name&&S.coopRoom,null,{timeout:60000});await life();
  const dth=await p.evaluate(()=>{try{over("Qua đời","Thử chết trong phòng.","chết")}catch(e){}try{render()}catch(e){}try{save()}catch(e){}const a=(window.slotGet?slotGet('hclh-save-v2-1'):localStorage.getItem('hclh-save-v2-1'));
    window.__dead=S;try{start()}catch(e){}return {dead:window.__dead.dead,slot1:a&&JSON.parse(a).S.name}});
  ok(dth.dead&&dth.slot1===solo.name,`${tag} co-op death in the room: Sổ 1 kept`,dth);
  await p.waitForFunction(()=>S!==window.__dead&&S&&S.name,null,{timeout:60000});await life();
  const kn=await p.evaluate(()=>({tag:S.coopRoom,slot1:JSON.parse((window.slotGet?slotGet('hclh-save-v2-1'):localStorage.getItem('hclh-save-v2-1'))).S.name}));
  ok(kn.tag==='Q9ZT'&&kn.slot1===solo.name,`${tag} Kiếp mới after a co-op death belongs to the room`,kn);
  const dth2=await p.evaluate(()=>{COOP.leave(true);try{showTitle()}catch(e){}try{over("Qua đời","Thử chết sau khi rời phòng.","chết")}catch(e){}try{render()}catch(e){}try{save()}catch(e){}
    const a=(window.slotGet?slotGet('hclh-save-v2-1'):localStorage.getItem('hclh-save-v2-1'));return a&&JSON.parse(a).S.name});
  ok(dth2===solo.name,`${tag} co-op life dying after the room is left: Sổ 1 kept`,dth2);
  /* guest waiting for the host's world with a solo sổ loaded, then back to the title: the solo life is never marked nor listed as the room's */
  const gw=await p.evaluate(()=>{window.__rl=localStorage.getItem('ctm-coop-rooms');$("title").hidden=false;showTitle();document.querySelector('#slots [data-load="1"]').click();
    COOP.state.room='W4IT';COOP.state.you='b';COOP.state.status='open';COOP.emit('room',{t:'room',code:'W4IT',you:'b'});COOP.emit('start',{room:'W4IT',you:'b',host:false,week:0,state:null});
    try{render()}catch(e){}try{save()}catch(e){}const tg=S.coopRoom||'';$("title").hidden=false;showTitle();const b=document.querySelector('#slots [data-load="1"]');if(b)b.click();
    const w=CTM_ROOMS.list().find(x=>x.room==='W4IT');return {tag:tg,on:COOPW.on,name:S.name,listed:w&&w.name||'',slot1:JSON.parse((window.slotGet?slotGet('hclh-save-v2-1'):localStorage.getItem('hclh-save-v2-1'))).S.name}});
  ok(!gw.tag&&!gw.on&&gw.name===solo.name&&!gw.listed&&gw.slot1===solo.name,`${tag} guest waiting with a solo sổ open: solo life unmarked, not listed as the room's`,gw);
  await p.evaluate(()=>{localStorage.setItem('ctm-coop-rooms',window.__rl)});/* a 4th room pushes the oldest out (max 3): put the three back */
  /* reload in the middle of a co-op life: Sổ 1 intact, the title continues the solo life, the rooms are still listed */
  await p.evaluate(()=>{window.__solo=S;COOP.state.room='M2PX';COOP.state.you='a';COOP.state.status='open';COOP.emit('start',{room:'M2PX',you:'a',host:true,week:0,state:null})});
  await p.waitForFunction(()=>S!==window.__solo&&S&&S.name&&S.coopRoom,null,{timeout:60000});await life();
  await p.reload({waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>window.COOPW&&document.querySelector('#modal.kpthome'),null,{timeout:90000});await p.waitForTimeout(1500);
  const rl=await p.evaluate(()=>{try{render()}catch(e){}const a=JSON.parse((window.slotGet?slotGet('hclh-save-v2-1'):localStorage.getItem('hclh-save-v2-1'))).S.name;showTitle();const b=document.querySelector('#slots [data-load="1"]');if(b)b.click();
    return {slot1:a,name:S&&S.name,tag:!!(S&&S.coopRoom),rooms:CTM_ROOMS.list().map(x=>x.room)}});
  ok(rl.slot1===solo.name&&rl.name===solo.name&&!rl.tag&&rl.rooms.length===3,`${tag} reload mid co-op: Sổ 1 intact, solo life continues, 3 rooms listed`,rl);
  /* menu: Chọn sổ shows both sets */
  await p.reload({waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>window.COOPW&&document.querySelector('#modal.kpthome [data-tgo="slots"]'),null,{timeout:90000});await p.waitForTimeout(800);
  await p.evaluate(()=>{document.querySelector('#modal [data-tgo="slots"]').click()});await p.waitForTimeout(800);
  const rd=()=>p.evaluate(()=>({tabs:[...document.querySelectorAll('#modal #slots .kcstabs .pct')].map(x=>x.innerText.trim()+(x.classList.contains('on')?'*':'')),cards:[...document.querySelectorAll('#modal #slots .kslot:not(.cloudmini):not(.kjoin)')].map(x=>x.innerText.replace(/\s+/g,' ').trim()),mini:!!document.querySelector('#modal #slots > .cloudmini'),miniFirst:!!document.querySelector('#modal #slots .kcstabs + .cloudmini'),sub:(document.querySelector('#modal .kph .kpsub')||{}).textContent,pd:!!document.querySelector('#modal #pdwrap'),pdVis:(()=>{const e=document.querySelector('#modal #pdwrap');return !!e&&e.getBoundingClientRect().height>0})(),scroll:(()=>{const m=document.querySelector('#modal');return m?m.scrollHeight>m.clientHeight+2:null})()}));
  const m1=await rd();
  ok(m1.tabs.length===2&&/^Một mình\*$/.test(m1.tabs[0])&&/^Cùng hảo hữu$/.test(m1.tabs[1])&&m1.cards.length===3&&m1.cards.every(x=>/^Sổ /i.test(x))&&/Tuổi/i.test(m1.cards[0])&&m1.pd&&m1.mini&&m1.miniFirst,`${tag} Sổ mây card on top of the solo tab; Chọn sổ opens on "Một mình" (last played solo): 3 sổ, Phúc duyên present`,m1);
  await p.screenshot({path:`${OUTD}/chonso-solo-${tag}.png`});
  await p.evaluate(()=>{document.querySelector('#slots [data-kcs="coop"]').click()});await p.waitForTimeout(500);
  const m2=await rd();
  ok(m2.tabs.length===2&&/^Cùng hảo hữu\*$/.test(m2.tabs[1])&&m2.cards.length===3&&m2.cards.every(x=>/^Phòng hảo hữu/i.test(x)&&/Ám hiệu/i.test(x)&&/Trở lại phòng/i.test(x))&&m2.sub!==m1.sub&&m2.pd&&!m2.mini,`${tag} tab "Cùng hảo hữu": 3 phòng, own subtitle, Phúc duyên present`,m2);
  await p.screenshot({path:`${OUTD}/chonso-coop-${tag}.png`});
  /* Phúc duyên reachable (scroll to it if needed) */
  const pr=await p.evaluate(()=>{const e=document.querySelector('#modal #pdwrap');if(!e)return null;e.scrollIntoView({block:'end'});const r=e.getBoundingClientRect();return {top:r.top,bot:r.bottom,h:innerHeight,txt:e.innerText.slice(0,40)}});
  ok(pr&&pr.bot<=pr.h+2&&pr.top>=0,`${tag} Phúc duyên reachable on the co-op tab`,pr);
  /* last-played mode decides the tab: start a solo life -> solo, co-op start -> co-op (storage + fresh open) */
  await p.evaluate(()=>{try{localStorage.setItem('ctm-chonso-tab','coop')}catch(e){}});
  await p.reload({waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>window.COOPW&&document.querySelector('#modal.kpthome [data-tgo="slots"]'),null,{timeout:90000});await p.waitForTimeout(800);
  await p.evaluate(()=>{document.querySelector('#modal .kpmenu .kbtn.alt[data-tgo="slots"]').click()});await p.waitForTimeout(600);
  const m3=await rd();ok(/\*$/.test(m3.tabs[1])&&/^Phòng/i.test(m3.cards[0]),`${tag} opens on "Cùng hảo hữu" when that was the last mode`,m3.tabs);
  await p.evaluate(()=>{document.querySelector('#slots [data-kcs="solo"]').click()});await p.waitForTimeout(300);
  await p.evaluate(()=>{const b=document.querySelector('#slots [data-load="1"]');if(b)b.click()});await p.waitForTimeout(800);
  const st3=await p.evaluate(()=>localStorage.getItem('ctm-chonso-tab'));ok(st3==='solo',`${tag} loading a sổ makes "Một mình" the next tab`,st3);
  await p.evaluate(()=>{$("title").hidden=false;showTitle()});await p.waitForTimeout(900);await p.evaluate(()=>{const b=document.querySelector('#modal [data-tgo="slots"]');if(b)b.click()});await p.waitForTimeout(500);
  const ov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);ok(!ov,`${tag} no horizontal overflow`);
  await p.screenshot({path:`${OUTD}/slots-${tag}.png`});
  /* co-op screen lists the rooms; "Trở lại phòng" asks to rejoin that room's code */
  await p.evaluate(()=>{document.querySelector('#modal [data-tgo="home"]').click()});await p.waitForTimeout(500);
  /* title buttons only open the panel (owner 16/11): "Chơi một mình" -> Chọn sổ on Một mình, nothing started; "Cùng hảo hữu" -> Chọn sổ on Cùng hảo hữu + Nhập ám hiệu */
  await p.evaluate(()=>{const b=document.querySelector('#modal .kpmenu .kbtn.k1');b&&b.click()});await p.waitForTimeout(500);
  const ts=await p.evaluate(()=>({tab:(document.querySelector('#modal #slots .kcstabs .pct.on')||{}).innerText,mini:!!document.querySelector('#modal #slots > .cloudmini'),hid:document.getElementById('title').hidden,btn:'solo'}));
  ok(/Một mình/.test(ts.tab||'')&&ts.mini&&!ts.hid,`${tag} title "Chơi một mình" opens Chọn sổ on Một mình (not straight into the save)`,ts);
  await p.screenshot({path:`${OUTD}/title-solo-${tag}.png`});
  await p.evaluate(()=>{document.querySelector('#modal [data-tgo="home"]').click()});await p.waitForTimeout(500);
  await p.evaluate(()=>{const b=document.querySelector('#modal .kpmenu .kco');b&&b.click()});await p.waitForTimeout(500);
  const tc=await p.evaluate(()=>({tab:(document.querySelector('#modal #slots .kcstabs .pct.on')||{}).innerText,join:!!document.querySelector('#modal #slots [data-coop="join"]'),rooms:document.querySelectorAll('#modal .kroom').length}));
  ok(/Cùng hảo hữu/.test(tc.tab||'')&&tc.join&&tc.rooms===3,`${tag} title "Cùng hảo hữu" opens Chọn sổ on Cùng hảo hữu (3 phòng + Nhập ám hiệu)`,tc);
  const cop=await p.evaluate(()=>[...document.querySelectorAll('#modal .kroom')].length);ok(cop===3,`${tag} Cùng hảo hữu screen lists 3 rooms`,cop);
  await p.screenshot({path:`${OUTD}/coop-${tag}.png`});
  const rj=await p.evaluate(()=>{const b=document.querySelector('#modal .kroom [data-room="M2PX"][data-coop="resume"]');b.click();return localStorage.getItem('ctm-coop-room')});
  ok(rj==='M2PX',`${tag} Trở lại phòng picks that room's ám hiệu`,rj);await p.evaluate(()=>COOP.leave(true));
  /* old saves: a v5 sổ shape from an older build loads; an old single ctm-coop-room shows as a room */
  const old=await p.evaluate(()=>{const d=JSON.parse((window.slotGet?slotGet('hclh-save-v2-1'):localStorage.getItem('hclh-save-v2-1')));d.v=5;localStorage.setItem('hclh-save-v2-3',JSON.stringify(d));
    localStorage.removeItem('ctm-coop-rooms');localStorage.setItem('ctm-coop-room','OLD1');const L=CTM_ROOMS.list();const x=loadSlot(3);return {rooms:L.map(r=>r.room),s3:x&&x.S.name}});
  ok(old.s3===solo.name&&old.rooms[0]==='OLD1',`${tag} old sổ + old room code still show`,old);
  ok(!errs.length,`${tag} no page errors`,errs.slice(0,3));await ctx.close()}
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:'ALL OK');process.exit(f?1:0)})();
