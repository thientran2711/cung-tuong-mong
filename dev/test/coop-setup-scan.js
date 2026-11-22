/* coop-setup-scan (review/coop-guest-staff r2, LAW 11 family of the coop-pets early flake) — static, no browser.
   Lists every co-op driver that writes a consort set-up on a seat's OWN screen (S.srv.risen=1 / S.kc.inPal=1 / S.rank=Math.max…) and says
   whether it makes that set-up real (lib/coop-real.js: consort-start origin + REAL check after one merged week) or forces an origin.
   Risk = screen-only set-up on a random origin: a servant start has no consort entry and a rank < PAL_HEAD guest may share the host's palace
   until a week merges (proved in coop-pets r2). usage: node dev/test/coop-setup-scan.js   (exit 0; it is a list, not a gate) */
const fs=require('fs'),path=require('path');const D=__dirname;const rows=[];
for(const f of fs.readdirSync(D).filter(x=>/^coop-.*\.js$/.test(x)&&x!=='coop-setup-scan.js').sort()){const s=fs.readFileSync(path.join(D,f),'utf8');
 const set=(s.match(/S\.srv\.risen=1|S\.kc\.inPal=1|S\.rank=Math\.max/g)||[]).length;if(!set)continue;
 const lib=/lib\/coop-real\.js/.test(s),fo=/__forceOrigin|_ORIGIN/.test(s),fr=(s.match(/COOPW\.friend\(\)/g)||[]).length;
 rows.push({f,set,lib,fo,fr,st:lib?'real (lib/coop-real)':fo?'origin forced (no REAL check)':'RISK: screen-only set-up, random origin'})}
console.log('| driver | set-up writes | friend-entry reads | status |\n|---|---|---|---|');for(const r of rows)console.log(`| ${r.f} | ${r.set} | ${r.fr} | ${r.st} |`);
const n=k=>rows.filter(r=>r.st.startsWith(k)).length;console.log(`\n${rows.length} drivers · real ${n('real')} · origin forced ${n('origin')} · risk ${n('RISK')}`);
