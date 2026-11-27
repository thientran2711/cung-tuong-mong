#!/usr/bin/env node
/* auto-click-scan (review/arrive-walk-fix, LAW 11 whole family for RV-171 §5).
   Lists EVERY programmatic .click() / dispatchEvent( in dev/build/j*.js and gives each a verdict:
     USER  = runs inside her own tap / key / pick handler (a replay or remap of HER action) — allowed
     UI    = the target is pure view (tab, close ✕, menu tab, fold): no khắc, no move, no act — allowed
     EVENT = dispatches a custom event, not a button — allowed
     AUTO-DESIGN = an auto path that presses a one-road end button by design (documented rule) — allowed, listed
     BUG   = an auto path (timer / render wrapper / interval) that clicks a button with game side effects (walk, khắc, act) — FAIL
   Usage: node dev/measure/auto-click-scan.js [--rev <git-sha>]   (exit 1 on any BUG or unclassified site) */
const fs=require("fs"),path=require("path"),cp=require("child_process");
const rev=(process.argv.indexOf("--rev")>=0)?process.argv[process.argv.indexOf("--rev")+1]:null;
const dir=path.join(__dirname,"../build");
const files=rev?cp.execSync(`git ls-tree --name-only ${rev} dev/build/`,{cwd:path.join(__dirname,"../..")}).toString().split("\n").map(f=>path.basename(f)).filter(f=>/^j.*\.js$/.test(f))
  :fs.readdirSync(dir).filter(f=>/^j.*\.js$/.test(f));
const read=f=>rev?cp.execSync(`git show ${rev}:dev/build/${f}`,{cwd:path.join(__dirname,"../.."),maxBuffer:1<<26}).toString():fs.readFileSync(path.join(dir,f),"utf8");
/* verdict table: [file, regex on the 240 chars before the call, verdict, why] — first match wins */
const V=[
 ["jpm.js",/getElementById\("k3room"\)/,"BUG","render wrapper (hall arrival) clicks «Về phòng» #k3room = k3RoomTap → homeGo(): a real walk home, khắc spent"],
 ["j6.js",/data-new|ask="2"/,"USER","after her «Bắt đầu kiếp mới» confirm (kitConfirm onYes), re-presses the new-life button she chose"],
 ["jkiep.js",/ask="2"/,"USER","after her new-life confirm (kitConfirm onYes), re-presses the button she chose"],
 ["jglink.js",/data-tab="go"/,"UI","glMap: her «Xem Dư đồ» tap opens the Dư đồ tab (view)"],
 ["jplink.js",/data-pg\]\[data-pi/,"UI","plkGo: her tap on a person's name opens that person's page in the people tab (pager button, view)"],
 ["jk4.js",/KeyboardEvent/,"EVENT","Back (popstate) = one Escape key event to the focused element (her Back press)"],
 ["jk4.js",/kgback|kchatp/,"UI","kitTopClose on her Esc / Back: closes the chat panel ✕ or the mini-game «Quay lại» only while that back is free"],
 ["jcooptimer.js",/kmend|krevok|data-km-close/,"AUTO-DESIGN","co-op AFK timeout presses a ONE-button end scene (KIT §81: kmend / krevok / km-close), no choice; documented rule"],
 ["jload.js",/data-tgo="opt"/,"UI","after her «peek»/«close» tap: opens the Sổ mây options tab of the menu (view only)"],
 ["jk4.js",/kbk-x/,"UI","kitCloseOthers: closes the open book (✕) when an end/night dialog must win (KIT 8.9); view only"],
 ["jk4.js",/xb\[0\]/,"UI","kitModalCloser: the dialog's own close button (Thôi/Lui/Đóng…), run by her Esc / ✕ / outside tap"],
 ["jk4.js",/popx/,"UI","her Esc / tap on the stage ground closes the person pop-up (#popx)"],
 ["jk4.js",/kitOvBtn/,"UI","her ✕ on an overlay presses that overlay's own close"],
 ["jk3.js",/data-tab=/,"UI","her tap on a plaque/fold link opens a tab (view)"],
 ["jk3.js",/k3hc\("lot"\)|b\.click\(\);if\(c/,"USER","her tap on the lot plaque = the HUD cell's own explain card"],
 ["jk3.js",/keep/,"USER","k3Explain: her tap on a fact opens its HUD explain card"],
 ["jk3.js",/h2t/,"UI","k3Sheet: folds the old sheet (view only, never opens)"],
 ["jk2b.js",/data-tab=/,"UI","kitCourtOpen / Tư trang link: her tap opens a tab (view)"],
 ["jk2b.js",/khx/,"UI","her tap on a court chip folds the HUD first (view)"],
 ["j42.js",/data-tab="rv"/,"UI","kitCourtOpen fallback: her tap opens the rivals tab"],
 ["j63.js",/data-tab="log"/,"UI","her tap on the log line opens the log tab"],
 ["j74.js",/data-load=/,"USER","resumeGame: her ☰ «Về game» tap loads her last slot"],
 ["j79.js",/kittn/,"EVENT","custom event «kittn» (thumbnail list loaded), not a button"],
 ["j79.js",/hb\.click/,"USER","her tap on a stat chip = the HUD cell's own card"],
 ["j82.js",/kitOvBtn|kgtback|giveUp|go\.click/,"USER","kg82 mini-game ✕ / give-up: her tap"],
 ["jactj4.js",/b\.click\(\)\}finally/,"USER","engine route of her act pick (temp button carrying her choice)"],
 ["jamove.js",/b\.click\(\)\}finally/,"USER","act-move: her pick runs through a temp button"],
 ["jdayq.js",/./,"EVENT","comment text only (no call)"],
 ["jdf.js",/b\.click\(\)\}finally/,"USER","dfRun: her door pick runs through the dock button"],
 ["jgoal.js",/offsetParent\)b\.click/,"UI","goWhere: her goal-link tap opens the tab (view; already-open tab is skipped so a phone is not sent to the room)"],
 ["jgpick.js",/KIP_GO/,"USER","her gift-pick tap presses that option"],
 ["jinv.js",/keydown/,"USER","keyboard Enter/Space = her tap"],
 ["jitd.js",/key===/,"USER","keyboard Enter/Space = her tap"],
 ["jmcal.js",/key|kmcsave/,"USER","keyboard Enter/Space = her tap"],
 ["jmood.js",/key/,"USER","keyboard Enter/Space = her tap"],
 ["jopic.js",/key/,"USER","keyboard Enter/Space = her tap"],
 ["jkhand.js",/__khBusy/,"USER","the hand-fly animation ends, then HER tapped button runs (deferred replay of her tap)"],
 ["jkpick.js",/kpkpick/,"EVENT","custom event «kpkpick», not a button"],
 ["jkring-item.js",/./,"USER","ring item sheet: her pick / ✕ presses the underlying option / close"],
 ["jkring.js",/data-tab="staff"/,"UI","her ring tap opens the staff tab"],
 ["jkring.js",/./,"USER","ring: her pick / tab / ✕ presses the underlying option"],
 ["jksize.js",/kszRemap3/,"USER","her tap remapped to the button under the enlarged hit box"],
 ["jkstage.js",/onPick/,"USER","her stage-ring pick presses that act button"],
 ["jlux.js",/ctm-lux/,"EVENT","custom event «ctm-lux», not a button"],
 ["jmgcal.js",/mclose|kph button/,"UI","her menu tap closes the menu modal (✕)"],
 ["jtut.js",/mclose|kph button/,"UI","her menu tap closes the menu modal (✕)"],
 ["jtut.js",/function goTab/,"UI","tutorial: opens a tab (view); an already-open tab is skipped (no room bounce)"],
 ["jtut.js",/allCat/,"UI","tutorial: «Tất cả» category tab (view)"],
 ["jnotice.js",/goDuDo/,"UI","her notice tap opens the Dư đồ tab (view)"],
 ["jplfs.js",/tomap/,"USER","kplBack: her back tap presses «‹ Dư đồ» (opens the map, no walk)"],
 ["jpma.js",/kg82go|kgr-go/,"USER","mini-game ✕: her tap"],
 ["jroute.js",/kg82ok/,"USER","mini-game ✕: her tap (KG82.xdo)"],
 ["jsgame.js",/sgdo/,"USER","mini-game ✕: her tap (KG82.xdo)"],
 ["jtoil.js",/toildone/,"USER","mini-game ✕: her tap (KG82.xdo)"],
];
const rows=[];let bad=0,unk=0;
for(const f of files.sort()){const s=read(f);const re=/\.click\(\)|dispatchEvent\(/g;let m;
 while((m=re.exec(s))){const ln=s.slice(0,m.index).split("\n").length;const ctx=s.slice(Math.max(0,m.index-240),m.index+60);
  const v=V.find(([vf,rx])=>vf===f&&rx.test(ctx));const verdict=v?v[2]:"UNCLASSIFIED";if(verdict==="BUG")bad++;if(!v)unk++;
  rows.push({at:`${f}:${ln}`,verdict,why:v?v[3]:ctx.replace(/\s+/g," ").slice(-120)})}}
const by={};rows.forEach(r=>by[r.verdict]=(by[r.verdict]||0)+1);
console.log(`auto-click-scan ${rev||"worktree"}: ${rows.length} sites`);
rows.forEach(r=>console.log(`${r.verdict.padEnd(12)} ${r.at.padEnd(22)} ${r.why}`));
console.log("TOTAL "+Object.entries(by).map(([k,n])=>k+"="+n).join(" ")+` | BUG=${bad} UNCLASSIFIED=${unk}`);
process.exit(bad||unk?1:0);
