/* WHOLE FAMILY scan (law 11) for the HOST-ABSENT RULE (OD L1976): every jptime task that brings a person TO someone's place at a due khắc.
   node dev/tools/arrive-scan.js  → table: kind · who comes · to whose place · can the host be away · rule */
const fs=require('fs');const D=__dirname+'/../build/';const src=fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)).map(f=>fs.readFileSync(D+f,'utf8')).join('\n');
/* every send kind: ptSend({… kind:"x" …}) and the NPC sender table PT_NPC[…]={kind:"x" …} (the body is read 400 chars on: nested {} in a:{…}) */
const sends=[];for(const m of src.matchAll(/ptSend\(\{|PT_NPC\[[^\]]*\]=\{/g)){const body=src.slice(m.index,m.index+400);const k=/kind:"([a-z0-9]+)"/.exec(body);if(k)sends.push({kind:k[1],body})}
for(const m of src.matchAll(/"[a-z0-9:]+":\{kind:"([a-z0-9]+)"/g))sends.push({kind:m[1],body:src.slice(m.index,m.index+400)});
const toHer=s=>/tgt:"me"|place:S\.out\?"lc":"home"|place:t===S\?\(S\.out\?"lc":"home"\)/.test(s.body);
const rows=[];const seen=new Set();
for(const s of sends){if(seen.has(s.kind))continue;seen.add(s.kind);rows.push({kind:s.kind,toHer:toHer(s)})}
/* the classification (reviewed by hand, kept next to the scan so a new kind fails until it is classified) */
const C={
 invite:["consort guest","her palace","yes","HOST-ABSENT RULE (jptime §4b via rcvInvAt)"],
 npcinv:["NPC host's messenger → p3InvLand","guest → host's palace","yes","HOST-ABSENT RULE (rcvInvAt, both NPC↔NPC and NPC host ↔ her)"],
 summon:["họa sư / nhạc sư (rtOrd)","her palace","yes","not a visit: he serves the week at her palace (cớ gặp); no waiting host — he stays until she comes (as today)"],
 giftin:["NPC's servant with a gift","her palace","yes","delivery: the gift card waits for her (pushDil); no host needed"],
 shop:["Nội vụ phủ eunuch with the tray","her palace","yes","delivery: the tray card waits for her; no host needed"],
 scout:["her runner","target's palace","n/a","errand to find someone; not a visit"],
 spy:["her maid","target's palace","n/a","errand; not a visit"],
 listen:["her maid","Cung nhân hội","n/a","errand; not a visit"],
 harm:["her sent servant","target","n/a","deed by a sent servant; not a visit"],
 npc:["NPC servant","target","n/a","NPC deed (two-way of spy/harm); not a visit"],
 plant:["her sent servant","target's palace","n/a","covert deed (plant an item); not a visit — the absent owner is the point"],
 gift:["her servant with a gift","target's palace","n/a","delivery to the palace staff; not a visit"],
 bribe:["her / an NPC servant","target's palace","n/a","errand (bribe a servant); not a visit"],
 buy:["her / an NPC servant","outside the palace","n/a","errand; not a visit"],
 vlbuy:["her servant","outside the palace","n/a","errand; not a visit"],
 clothes:["her servant","Nội vụ phủ","n/a","errand; not a visit"],
 ask:["her servant","Nội vụ phủ","n/a","errand; not a visit"],
 mktspy:["her servant","Cung nhân hội","n/a","errand; not a visit"]};
let bad=0;console.log("kind | who comes | to | host can be away | rule");
for(const r of rows){const c=C[r.kind];if(!c){bad++;console.log(`${r.kind} | ? | ${r.toHer?"her palace":"?"} | ? | UNCLASSIFIED`);continue}console.log(`${r.kind} | ${c[0]} | ${c[1]} | ${c[2]} | ${c[3]}`)}
for(const k of Object.keys(C))if(!seen.has(k))console.log(`(note) ${k}: no send of this kind (runner only)`);
console.log(bad?`ARRIVE-SCAN FAIL ${bad} unclassified`:`ARRIVE-SCAN OK ${rows.length} kinds`);process.exit(bad?1:0);
