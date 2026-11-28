/* LAW-1 DIRECTION SCAN (row11-law1; owner law 1 OD:L33, L1534, OD 24/11 ~08:35Z «rà lại toàn bộ»): for every act an NPC or she can do TO SOMEONE,
   the three directions she → NPC · NPC → her · NPC → NPC, read from the LIVE game by the role-parity probe (dev/tools/role-parity-scan.js: her side =
   the buttons she is shown on every consort / person card; NPC side = every AGREG provider option of every NPC, with its target o.t).
   Columns per act key (union over the consort ranks t1…hh, and the maid life): she→NPC (her button) · NPC→her (an NPC option aimed at her) ·
   NPC→NPC (an option aimed at another consort) · other targets (Emperor / Thái hậu / servant) · self (no target: study, rest …).
   GAP kinds: NOHER = NPCs do it to each other / she does it to them, but no NPC ever does it to her · NOBACK = an NPC does it to her, she has no
   button to do it back · NONPC = an NPC does it only to her, never to another NPC.
   usage: node dev/tools/law1-dir-scan.js [index.html] [--json out.json] [--md out.md] [--from scan.json]                                     */
const fs=require('fs');const RP=require('./role-parity-scan.js');
const CON=["t1","t2","t3","t4","t5","t6","t7","hh"];
let EXD=[];try{EXD=require('./law1-dir-exempt.json')}catch(e){}
function dir(R){const rows=[];const keys=new Set();const T=R.T||{},PK=R.PK||{},NK=R.NKr||{};
 for(const grp of [["consort",CON],["maid",["maid"]]]){const [g,roles]=grp;const K=new Set();for(const r of roles){for(const k in (T[r]||{}))K.add(k);for(const k in (PK[r]||{}))K.add(k)}
  for(const k of [...K].sort()){const tc={};let p=0,n=0;for(const r of roles){if(PK[r]&&PK[r][k])p=1;if(NK[r]&&NK[r][k])n=1;Object.assign(tc,(T[r]||{})[k]||{})}
   const her=!!tc.her,npc=!!tc.npc,oth=["emp","th","srv","kid","other"].filter(x=>tc[x]),self=!!tc.self;
   /* a self act (no target) or an act only toward the Emperor / Thái hậu / a servant is not between her and another consort: no direction row */
   const between=her||npc;let gap=[];
   if(between){if(!her&&(npc||p))gap.push("NOHER");if(her&&!p)gap.push("NOBACK");if(her&&!npc)gap.push("NONPC")}
   const ex=EXD.find(e=>e.key===k&&(!e.grp||e.grp===g)&&(!e.gap||gap.includes(e.gap)));
   rows.push({grp:g,key:k,label:(RP.KEYLAB[k]||[])[0]||k,she:p?1:0,npcHas:n?1:0,her:her?1:0,npc:npc?1:0,oth,self:self?1:0,between,gap,ex:ex?ex.why:""})}}
 return rows}
function md(rows){const L=["| life | act key | she→NPC | NPC→her | NPC→NPC | other targets | gap |","|---|---|---|---|---|---|---|"];
 for(const r of rows){if(!r.between&&!r.she)continue;L.push(`| ${r.grp} | ${r.key} | ${r.she?"✓":"—"} | ${r.her?"✓":"—"} | ${r.npc?"✓":"—"} | ${r.oth.join(" ")||"—"}${r.self?" (self)":""} | ${r.gap.length?(r.ex?"EXEMPT: "+r.ex:r.gap.join(" ")):"SAME"} |`)}
 return L.join("\n")}
module.exports={dir,md};
if(require.main===module){(async()=>{const a=process.argv.slice(2);const html=a.find(x=>!x.startsWith('--')&&!/\.(md|json)$/.test(x))||'dev/index.html';
 const jo=a.indexOf('--json'),mo=a.indexOf('--md'),fo=a.indexOf('--from');
 const R=fo>=0?JSON.parse(fs.readFileSync(a[fo+1],'utf8')):await RP.scan(html);if(jo>=0&&fo<0)fs.writeFileSync(a[jo+1],JSON.stringify(R));
 const rows=dir(R);if(mo>=0)fs.writeFileSync(a[mo+1],md(rows)+"\n");
 const g=rows.filter(r=>r.gap.length&&!r.ex);const c={};for(const r of g)for(const x of r.gap)c[x]=(c[x]||0)+1;
 console.log("LAW-1 DIRECTION: rows "+rows.filter(r=>r.between).length+" between-person acts · gaps "+g.length+" "+JSON.stringify(c));
 for(const r of g)console.log("  "+r.grp+" "+r.key+" ["+r.gap.join(",")+"] she→NPC "+r.she+" · NPC→her "+r.her+" · NPC→NPC "+r.npc+(r.oth.length?" · other "+r.oth.join(" "):""));
 if(R.pageErr&&R.pageErr.length)console.log("PAGE ERRORS: "+R.pageErr.slice(0,5).join(" ; "))})()}
