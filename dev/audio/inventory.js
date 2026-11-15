/* SOUND INVENTORY (owner 15/11 08:45Z, 13:25Z, 14:05Z: every moment has a sound, the sound follows the MEANING of the moment).
   Reads the LIVE tables of the built game (no copies): SFXN (moment → file), FX (jfx kinds), KM_BOX (reward boxes), kitLose why / titles
   (jfx KF_LOSEW + TAG titles), kitGain grades, WX (all weather), FEST (all festivals, JSON ones included), KG82_KIND (every minigame,
   exam kinds included), SFXTXT (card words), voTone × speaker (j36 voices), result outcomes, exam, toilette, dialog categories, pets,
   and every literal sfx("…") / kitSfx("…") / feedback("…") in the game source.
   Checks:  1. unmapped = 0   (every kind of every group resolves to a moment key and a file)
            2. missing  = 0   (every file answers 200 from audio/)
            3. mismatch = 0   (the MEANING of the moment (good / bad / neutral, set here by hand) vs the CHARACTER of its sound file
                               (happy / sad / neutral, set here by hand): a bad moment never gets a happy sound, a good one never a sad one)
            4. text scan      every Vietnamese card text in the source (string literals ≥ 25 chars) → the voice (3 speakers) + card-word sound
                               it would get; a text with sad / hostile words never gets a happy voice or sound (and joy words never a sad one).
   usage: node dev/audio/inventory.js <site url> [out.md]   (exit 1 on any failure) */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT]=process.argv;
/* CHARACTER of every sound file (by what it sounds like; dev/audio/SFX_PLAN.md) */
const FILEV={happy:"win learn-good item-pop item-rare lot-good birth bloom promote decree firecracker festival banquet podium rank-new reward-take coin coin-bounce heal join chest-open chest-royal tray-open gift-open vo-f-laugh vo-f-laugh-soft vo-m-laugh vo-child-laugh",
 sad:"fail learn-bad item-lose lot-bad gloom wither sick death-bell cane kneel door-shut expose poison alarm mg-miss confiscate search scheme heartbeat vo-f-cry vo-f-sigh vo-m-sigh vo-f-angry vo-m-angry vo-old-f-hmph vo-crowd-gasp vo-f-gasp",
 neutral:"tap open close page lock notice step buy sell item-fly edict-unroll seal-stamp tablet-shuffle tablet-flip xam-shake xam-drop buoi-bell night-watch week-drum night visitor rain wind snow thunder wx-birds wx-cicada wx-crickets mg-pluck mg-stone mg-needle mg-brush mg-throw mg-arrow mg-fire chest-rattle rite vo-crowd-gossip vo-baby-cry pet-cat pet-dog pet-bird pet-myna pet-parrot pet-rabbit pet-fish pet-duck pet-turtle pet-horse pet-peacock pet-crane pet-fox pet-weasel pet-deer"};
/* MEANING of every moment key (SFXN) */
const KEYV={good:"good promote decree birth win mgwin podium rankNew itemPop itemRare take lidTray lidChest lidRoyal lidGift lidPouch coin coinBounce lotGood bloom heal join firecracker festival banquet preg favour examPass",
 bad:"bad fail mglose poison expose hit harm verdict itemLose lotBad gloom doorShut kneel cane wither sick death alarm demote ash mgMiss confiscate search rob extort skim poisonFound schemeOk examFail",
 neutral:"tap open close lock tab turn notice page step buy sell give itemFly fade coinOut giftBack rattle edict seal tabletShuffle tabletFlip xamShake xamDrop buoi nightWatch week night visitor rain wind snow thunder birds cicada crickets rite ink mgPluck mgStone mgNeedle mgBrush mgThrow mgArrow mgFire mgStep mgFlower mgPuff mirror lantern "+
  "petCat petDog petBird petMyna petParrot petRabbit petFish petDuck petTurtle petHorse petPeacock petCrane petFox petWeasel petDeer"};
/* meaning of the kinds of the other groups (where it is not the moment key's own) */
const FXV={heart:"bad",decree:"good",promote:"good",coin:"good",hit:"bad",harm:"bad",poison:"bad",expose:"bad",verdict:"bad",ink:"neutral",birth:"good",preg:"good",favour:"good",night:"neutral",death:"bad",demote:"bad",ash:"bad",win:"good",fail:"bad",mgwin:"good",mglose:"bad",lantern:"good",lock:"neutral"};
const LOSEV={sell:"neutral",give:"neutral",fade:"neutral",lose:"bad"};
const SAD=/che miệng cười|bụm miệng cười|chia ly|biệt ly|hòa thân|không (được )?về thăm|khách chê|bị chê|chê bai|khóc|rơi lệ|nức nở|nghẹn ngào|đau lòng|đau đớn|bi thương|thương tâm|tủi|buồn bã|ủ rũ|bị phạt|phạt quỳ|trượng|bị đánh|tịch thu|lãnh cung|giáng (xuống|làm|phẩm)|qua đời|băng hà|tạ thế|sảy thai|mất con|trả lại quà|không dám nhận|từ chối|khước từ|lạnh nhạt|ghẻ lạnh|nổi giận|quát|mắng|buộc tội|vu cáo|hãm hại|trúng độc|ban chết|thắt cổ|tự vẫn|oán hận|căm hận|mỉa mai|chế giễu|cười nhạo|cười khẩy|cười nhạt|hạ nhục/i;
const JOY=/vui mừng|mừng rỡ|hớn hở|hoan hỉ|rạng rỡ|cười tươi|tươi cười|reo lên|kết làm chị em/i;
const NEG=/không (hề |còn |mấy )?(vui|mừng|cười)|chẳng (vui|mừng|cười)|kém vui|mất vui|chưa (vui|mừng)|giả vờ|gượng/i;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(180000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitSfx==='function'&&typeof FEST==='object');await p.waitForTimeout(4000);
 const R=await p.evaluate(async([FILEV,KEYV,FXV,LOSEV])=>{
  const fv={},kv={};for(const c in FILEV)for(const f of FILEV[c].split(/\s+/))fv["sfx-"+f]=fv[f]=c;for(const c in KEYV)for(const k of KEYV[c].split(/\s+/))if(k)kv[k]=c;
  const fileV=f=>fv[f]||fv[String(f).replace(/^sfx-/,"")]||null;
  const rows=[];const add=(group,kind,meaning,key,how)=>{const files=[].concat(key==null?[]:key).map(k=>k&&k.file?k.file:(k&&/^(sfx|vo)-/.test(k)?k:SFXN[k]||null));
   rows.push({group,kind,meaning,key:[].concat(key==null?[]:key).map(k=>k&&k.file?k.file:k).join(" + "),files,how:how||""})};
  /* 1 moments */
  for(const k of Object.keys(SFXN))add("Moment (SFXN)",k,kv[k]||"?",k);
  /* 2 FX kinds (jfx kitFx / feedback) */
  for(const k of Object.keys(FX)){const res=/^(win|fail|expose|verdict)$/.test(k);add("FX kind (kitFx / feedback)",k,FXV[k]||"?",res?(k==="verdict"?"verdict":k):k,res?"result card / feedback":"kitFx → SFXN")}
  /* 3 feedback kinds used in the source */
  const src=[...document.scripts].map(s=>s.textContent).join("\n");
  const fb=[...new Set([...src.matchAll(/feedback\("([a-z]+)"/g)].map(m=>m[1]))];
  for(const k of fb){const m={good:"mgwin",bad:"mglose"}[k]||k;add("feedback() call",k,kv[k]||FXV[k]||"?",SFXN[k]?k:(k==="heart"?{file:"sfx-heartbeat"}:null),k==="heart"?"j11 heartLoop":"j11 SFXN")}
  /* 4 motion stages (j93 kmStage) */
  const ST={"km-tablet":["neutral",["tabletShuffle","tabletFlip"]],"km-edict":["good",["edict","itemPop"]],"km-gloom":["bad",["gloom"]],"km-bloom":["good",["bloom"]],"km-inkov":["bad",["death"]],"km-reward":["good",["rattle","lidChest","take"]]};
  const stages=[...new Set([...src.matchAll(/kmStage\("(km-[a-z]+)"/g)].map(m=>m[1]))];
  for(const s of stages){const x=ST[s];add("Motion stage (kmStage)",s,x?x[0]:"?",x?x[1]:null)}
  /* 5 reward boxes */
  for(const k of Object.keys(KM_BOX))add("Reward box (kitReward kind)",k+" · "+KM_BOX[k][2],"good",["rattle",SFXBOX[k]||null,"take"].filter(Boolean),"items: itemPop / itemRare by grade, silver coinBounce");
  add("Reward box (kitReward kind)","Bổng lộc bị cắt xén (stipend skimmed)","bad","skim","box head words");
  /* 6 kitGain by grade */
  const KG=typeof KIT_GRADE!=="undefined"?KIT_GRADE:[];for(let g=0;g<5;g++)add("Item gained (kitGain grade)",g+" "+((KG[g]&&KG[g].n)||""),"good",[g>=3?"itemRare":"itemPop","itemFly"]);
  /* 7 kitLose */
  for(const w of ["sell","give","fade"])add("Item leaves (kitLose why)",w,LOSEV[w],ksfxLoseKey({why:w}));
  const titles=new Set(["Mất đồ","Soát ra đồ bẩn","Bị soát phòng"]);try{for(const x of KF_LOSEW)titles.add(x[1])}catch(e){}
  for(const t of titles)add("Item leaves (kitLose why)","lose · "+t,"bad",ksfxLoseKey({why:"lose",title:t}));
  add("Silver (kitCoins)","in","good","coin");add("Silver (kitCoins)","out (pay / fine)","neutral","coinOut");
  /* 8 shop */
  add("Shop / gifts","buy","neutral","buy");add("Shop / gifts","sell / sell a work","neutral","sell");add("Shop / gifts","give a gift (giveTo / gift dialog)","neutral","give");
  add("Shop / gifts","gift sent back ('không dám nhận')","bad",["giftBack"],"card words; voice: tone cold = none");
  /* 9 weather */
  for(const s in WX)for(const w of WX[s])add("Weather ("+s+")",w[0]+" ["+w[1]+"]","neutral",ksfxWx({n:w[0],k:w[1]}));
  /* 10 festivals */
  for(const k of Object.keys(FEST)){const kk=ksfxFest(k);add("Festival / rite",k+" · "+(FEST[k].name||""),kk==="rite"?"neutral":"good",kk)}
  add("Festival / rite","prayer, incense, ancestor rite (card words)","neutral","rite");
  /* 11 minigames */
  for(const k of Object.keys(KG82_KIND)){const e=KG82_KIND[k].e;const st=ksfxMgStroke(k)||(e==="rhythm"?"mgPluck":"tap");
   add("Minigame ("+e+")",k+" · "+(KG82_KIND[k].n||""),"neutral",[st,"mgMiss"],"stroke + miss word; end: mgwin / mglose")}
  add("Minigame end","win (giỏi)","good","mgwin");add("Minigame end","lose (vụng)","bad","mglose");
  /* 12 results */
  add("Result card (kitResultFx)","THÀNH","good",["seal","win"]);add("Result card (kitResultFx)","HỎNG / BẤT LỢI","bad",["seal","fail"]);
  add("Result card (kitResultFx)","HỎNG + bị phát giác","bad",["seal",ksfxOutcome(false,"bị phát giác")]);
  add("Result card (kitResultFx)","THÀNH of a dark scheme (hạ độc, hãm hại)","bad",["seal",ksfxOutcome(true,"hạ độc")],"the deed is dark: sly sting, never the bright win");
  /* 13 exam, poison, toilette */
  add("Promotion exam (jexam)","pass","good",["examPass"]);add("Promotion exam (jexam)","fail","bad",["examFail"]);
  add("Poison gift (jpoison)","poison found (kim bạc đen, có độc)","bad",["poisonFound"]);add("Poison gift (jpoison)","she is poisoned","bad","poison");
  add("Poison gift (jpoison)","the giver is traced (bị phát giác)","bad",["expose"]);
  add("Toilette (jtoil)","brow stroke · powder · lipstick dot","neutral",["mgBrush","mgPuff"],"dot judged by its colour: itemPop / mgMiss");
  add("Toilette (jtoil)","make-up đẹp / tuyệt · dress hợp dịp","good","good");add("Toilette (jtoil)","make-up vụng / diêm dúa · dress wrong","bad","bad");add("Toilette (jtoil)","bare face (mặt mộc)","neutral","mirror");
  /* 14 card words */
  for(const [re,k] of SFXTXT)add("Card words (SFXTXT)",String(re).slice(1,60),kv[k]||"?",k);
  /* 15 voices: tone × speaker */
  const TV={shock:"bad",gossip:"neutral",hostile:"bad",mocking:"bad",sadStrong:"bad",cold:"bad",sad:"bad",joy:"good",warm:"good",neutral:"neutral"};
  for(const sp of ["f","emp","th"])for(const t of Object.keys(TV)){let v=(VOMAP[sp]||{})[t]||null;if(t==="shock")v="f-gasp";if(t==="gossip")v="gossip";
   const f=v?voFiles(v)[0].replace(/^audio\/|\.mp3$/g,""):null;add("Voice (j36 tone × speaker)",sp+" · "+t,TV[t],f?{file:f}:"open",f?"":"no voice: the card's soft open chime")}
  /* 16 dialog categories */
  const cats=new Set();try{for(const k in KIT_DLGMAP)for(const x of KIT_DLGMAP[k])cats.add(x[1])}catch(e){}
  for(const c of cats)add("Dialog category (open)",c,"neutral",["open"],"+ voice by tone, + card words");
  /* 17 pets */
  for(const k in SFXPET)add("Pet",k,"neutral",SFXPET[k]);
  /* 18 literal calls in the source */
  const lit=new Set();for(const m of src.matchAll(/(?<![\w.])(sfx|kitSfx|ksfxOnce)\("([\w-]+)"/g))lit.add(m[1]+":"+m[2]);
  const lits=[...lit].map(x=>{const [fn,a]=x.split(":");const f=fn==="sfx"?ksfxFile(a):SFXN[a]||null;return{fn,a,f}});
  for(const l of lits)rows.push({group:"Literal call in source",kind:l.fn+'("'+l.a+'")',meaning:"-",key:l.a,files:[l.f],how:""});
  /* file check */
  const all=[...new Set(rows.flatMap(r=>r.files).filter(Boolean))];const st={};
  await Promise.all(all.map(f=>fetch(`audio/${f}.mp3`,{method:"HEAD",cache:"no-store"}).then(r=>st[f]=r.status).catch(()=>st[f]=0)));
  for(const r of rows){r.unmapped=!r.files.length||r.files.some(f=>!f);r.missing=r.files.filter(f=>f&&st[f]!==200);
   r.char=r.files.map(f=>f?fileV(f.replace(/-\d$/,""))||"?":"-");
   r.mismatch=r.meaning==="bad"?r.char.includes("happy"):r.meaning==="good"?r.char.includes("sad"):false;
   r.unclass=r.meaning==="?"||r.char.includes("?")}
  /* 19 text scan */
  const strs=new Set();for(const m of src.matchAll(/(["'`])((?:(?!\1)[^\\\n]|\\.){25,600})\1/g)){const t=m[2];if(/[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i.test(t)&&/\s/.test(t)&&!/[{};=]\s*\w+\(|function|=>/.test(t))strs.add(t.replace(/\$\{[^}]*\}/g,"X").replace(/<[^>]+>/g," "))}
  const T=[];for(const t of strs){const sounds=[];for(const who of [{w:["f"]},{w:["e"]},{rk:"th"}]){const k=voKind({t:"",h:t,who});if(k)sounds.push("vo:"+k)}
   const w=ksfxText(t);if(w)sounds.push(w);T.push({t,sounds})}
  return{rows,T,nText:strs.size}},[FILEV,KEYV,FXV,LOSEV]);
 /* text verdicts (node side: same lexicons as the header) */
 const HAPPYVO=/^vo:(f-laugh|f-softlaugh|m-chuckle|child-giggle)$/,SADVO=/^vo:(f-cry|f-sigh|m-sigh|f-angry|m-grunt|old-hmph)$/;
 const kv={};for(const c in KEYV)for(const k of KEYV[c].split(/\s+/))if(k)kv[k]=c;
 const tbad=[];for(const x of R.T){const sad=SAD.test(x.t)||NEG.test(x.t),joy=JOY.test(x.t)&&!NEG.test(x.t);
  const happy=x.sounds.filter(s=>HAPPYVO.test(s)||(!/^vo:/.test(s)&&kv[s]==="good")),sadS=x.sounds.filter(s=>SADVO.test(s)||(!/^vo:/.test(s)&&kv[s]==="bad"));
  if(sad&&!joy&&happy.length)tbad.push({t:x.t.slice(0,160),why:"sad words, happy sound",s:happy});
  if(joy&&!sad&&sadS.length)tbad.push({t:x.t.slice(0,160),why:"joy words, sad sound",s:sadS})}
 const rows=R.rows;const un=rows.filter(r=>r.unmapped),mi=rows.filter(r=>r.missing.length),mm=rows.filter(r=>r.mismatch),uc=rows.filter(r=>r.unclass&&r.group!=="Literal call in source");
 const groups=[...new Set(rows.map(r=>r.group))];
 let md=`# Sound inventory (generated by dev/audio/inventory.js — do not edit by hand)\n\nSite: ${URL} · ${new Date().toISOString().slice(0,16)}Z\n\n`;
 md+=`| Check | Count |\n|---|---|\n| rows (event / act / reveal kinds + literal calls) | ${rows.length} |\n| unmapped | ${un.length} |\n| missing file | ${mi.length} |\n| meaning mismatch (bad→happy, good→sad) | ${mm.length} |\n| unclassified meaning / sound | ${uc.length} |\n| card texts scanned | ${R.nText} |\n| text mismatches (sad text → happy sound, joy text → sad sound) | ${tbad.length} |\n| page errors | ${errs.length} |\n\n`;
 md+=`Sound character: happy / sad / neutral (FILEV in the script). Meaning: good / bad / neutral (KEYV, FXV, LOSEV).\n\n`;
 for(const g of groups){const L=rows.filter(r=>r.group===g);md+=`## ${g} (${L.length})\n\n| Kind | Meaning | Sound key | File(s) | Sound | Note |\n|---|---|---|---|---|---|\n`;
  for(const r of L)md+=`| ${String(r.kind).replace(/\|/g,"¦")} | ${r.meaning} | ${r.key||"—"} | ${r.files.map(f=>f||"**NONE**").join(", ")} | ${r.char.join(", ")} | ${(r.unmapped?"**UNMAPPED** ":"")+(r.missing.length?"**MISSING** ":"")+(r.mismatch?"**MISMATCH** ":"")+r.how} |\n`;md+="\n"}
 if(tbad.length){md+=`## Text mismatches\n\n`;for(const x of tbad)md+=`- ${x.why}: ${x.s.join(", ")} — “${x.t}”\n`}
 if(OUT)fs.writeFileSync(OUT,md);
 const st={};for(const x of R.T)for(const s of x.sounds)st[s]=(st[s]||0)+1;
 console.log(JSON.stringify({rows:rows.length,soundsOnTexts:st,unmapped:un.map(r=>r.group+":"+r.kind),missing:mi.map(r=>r.kind+":"+r.missing),mismatch:mm.map(r=>r.group+":"+r.kind+"→"+r.files),unclassified:uc.map(r=>r.group+":"+r.kind+" "+r.meaning+"/"+r.char),texts:R.nText,textBad:tbad.slice(0,40),errs},null,1));
 await b.close();process.exit(un.length||mi.length||mm.length||uc.length||tbad.length||errs.length?1:0)})();
