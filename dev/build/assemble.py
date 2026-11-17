import base64,subprocess,re
import os
d=os.path.dirname(os.path.abspath(__file__))+'/../'  # dev/: build/ here; writes dev/index.html
# Pictures come from Cloudflare (dev/art/CDN.md): IMG_BASE is defined ONCE, in jcdn.js; every "img/…" 'img/…' `img/…` url(img/…) in the
# other modules and p1.html becomes IMG_BASE+"img/…". CTM_IMG_BASE=<url> overrides it, CTM_IMG_BASE= (empty) keeps relative img/ paths.
IMG_BASE=re.search(r'^const IMG_BASE="([^"]*)";',open(d+'build/jcdn.js',encoding='utf-8').read(),re.M).group(1)
IMG_BASE=os.environ.get('CTM_IMG_BASE',IMG_BASE)
def cdn(f,t):
  if f=='jcdn.js':return t.replace('const IMG_BASE="'+re.search(r'const IMG_BASE="([^"]*)"',t).group(1)+'"','const IMG_BASE="'+IMG_BASE+'"',1)
  if f=='jload.js':return t  # works on assets.json keys (relative img/…), maps them itself (keyOf)
  if not IMG_BASE:return t
  t=t.replace('/^img\\//.test(','/^(https?:\\/\\/|img\\/)/.test(')  # "is it already a path?" checks (figPath, j28, j35) accept the absolute CDN URL
  return re.sub(r'''(["'`(])(?:\./)?img/''',lambda m:m.group(1)+IMG_BASE+'img/',t)
js=''.join(cdn(f,open(d+'build/'+f,encoding='utf-8').read()) for f in ['jcdn.js', 'jreg.js', 'j0.js', 'j1.js', 'jtime4.js', 'j2.js', 'j3.js', 'j4.js', 'j5.js', 'j7.js', 'j8.js', 'jvoice.js', 'jtone.js', 'jtone_b.js', 'jtone_b1.js', 'jtone_b2.js', 'jtone_b3.js', 'jtone_b4.js', 'jtone_b5.js', 'jtone_c.js', 'j9.js', 'j10.js', 'j6.js', 'j11.js', 'j12.js', 'j13.js', 'j14.js', 'j15.js', 'j16.js', 'j17.js', 'j18.js', 'j19.js', 'j20.js', 'j21.js', 'j22.js', 'j23.js', 'j24.js', 'j25.js', 'j26.js', 'j27.js', 'j28.js', 'j29.js', 'j30.js', 'j31.js', 'j32.js', 'j33.js', 'j34.js', 'j35.js', 'j36.js', 'j37.js', 'j38.js', 'j39.js', 'j40.js', 'jbal.js', 'jbaleff.js', 'jbalarc.js', 'jkit.js', 'jtin.js', 'j41.js', 'j43.js', 'j42.js', 'j50.js', 'j51.js', 'j52.js', 'j53.js', 'j54.js', 'j55.js', 'j56.js', 'j57.js', 'j58.js', 'j59.js', 'j62.js', 'j64.js', 'j66.js', 'j73.js', 'jkitctl.js', 'jbd.js', 'j74.js', 'j67.js', 'jst14.js', 'jbalroad.js', 'jroad.js', 'jrd_tt.js', 'jrd_dtq.js', 'jrd_muoi.js', 'jrd_cn.js', 'jrd_nc.js', 'jrd_td.js', 'jrd_ch.js', 'jrd_thd.js', 'jrd_cnv.js', 'jend14.js', 'j68.js', 'j68e.js', 'j68f.js', 'j68g.js', 'j68h.js', 'j68i.js', 'j71.js', 'j72.js', 'j75.js', 'jsteal.js', 'j76.js', 'j77.js', 'jtwoway.js', 'j60.js', 'j61.js', 'j63.js', 'j78.js', 'j79.js', 'jbook.js', 'j87.js', 'j70.js', 'j82.js', 'j91.js', 'jmgt.js', 'jnwp.js', 'j90.js', 'j83.js', 'j85.js', 'jtd.js', 'j65.js', 'j88.js', 'jly.js', 'j89.js', 'j86.js', 'j69.js', 'jpal.js', 'jtime4z.js', 'jbal2.js', 'jnwq.js', 'jlant.js', 'jmort.js', 'jdiff.js', 'j92.js', 'jwd92b.js', 'jkiep.js', 'jage.js', 'jcmood.js', 'j97.js', 'j96.js', 'j93.js', 'j94.js', 'jk2b.js', 'jk95.js', 'j98.js', 'j99succ.js', 'jveil.js', 'jface.js', 'jrash.js', 'jearn.js', 'jcol.js', 'jlost.js', 'jemo.js', 'jk3.js', 'jinv.js', 'jwdinv.js', 'jecon.js', 'jstip.js', 'jevfit.js', 'jk4.js', 'jpdlg.js', 'jres.js', 'jseal.js', 'jsl.js', 'jmen.js', 'jroute.js', 'jty.js', 'jthaiy.js', 'jcoop.js', 'jcooplobby.js', 'jcoopworld.js', 'jslots.js', 'jcloud.js', 'jhc.js', 'jht.js', 'jct2.js', 'jload.js', 'jtsb.js', 'jpet.js', 'jpetcare.js', 'jpetlife.js', 'jplace.js', 'jgift.js', 'jpoison.js', 'jevban.js', 'jrest.js', 'jwhy.js', 'jaudit.js', 'jtrong.js', 'jnet.js', 'jkrel.js', 'jclose.js', 'jmark.js', 'jkpor.js', 'jpane.js', 'jtabs.js', 'jchap.js', 'jexam.js', 'jkitpage.js', 'jtitle.js', 'jcooptimer.js', 'jcoopchat.js', 'jkrev.js', 'jfx.js', 'jfxkit.js', 'jstatfx.js', 'jitev.js', 'jitd.js', 'jpromo.js', 'jtoil.js', 'jtoilr.js', 'jlux.js', 'jstory.js', 'jreign.js', 'jnroad.js', 'jnroadm.js', 'jevb.js', 'jne.js', 'jbac.js', 'jts.js', 'jmkt.js', 'jslap.js', 'jmcal.js', 'jsfx.js', 'jpres.js', 'jflip.js', 'jint.js', 'jnight.js', 'jtut.js', 'jgoal.js', 'jsgame.js', 'jrail.js', 'jstatus.js', 'j84.js', 'jimg.js', 'jwkg.js', 'jwkr.js', 'jartc.js', 'jhcpor.js', 'jph.js', 'jopic.js', 'jnotes.js', 'jrcp.js', 'jcui.js', 'jdh.js', 'jdh2.js', 'jdemo.js', 'jlevel.js', 'jpm.js', 'jplfs.js', 'jplx.js', 'jweather.js', 'jbuoi.js', 'jpcf.js', 'jdis.js', 'jmind.js', 'jfighd.js', 'jgpick.js', 'jstaff.js', 'jtruth.js', 'jlogsync.js', 'j95.js', 'j95b.js', 'j95c.js', 'jqsave.js', 'jspread.js', 'jkpc.js', 'jcycle.js', 'jtds.js', 'jwkpics.js', 'jact.js', 'jtq14.js', 'jact2.js', 'jkc.js', 'jhouse.js', 'jmood.js', 'jmline.js', 'jcmaid.js', 'jcoopask.js', 'jpromsv.js', 'jmem.js', 'jorigins.js', 'jeitem.js', 'jil.js', 'jagent.js', 'jagemp.js', 'jagmaid.js', 'jlag2.js', 'jvisit.js', 'jgrey.js', 'jfe.js', 'jmapc.js', 'jksize.js', 'jemoact.js', 'jkc2.js', 'jentry.js', 'joi.js', 'jseat.js', 'jcoopone.js', 'jgreet.js', 'jwhyn.js', 'jkh.js', 'jnpcd.js', 'jworld.js', 'jworld2.js', 'jdress.js', 'jrbatch.js'])
# dev/site/kvfallback.js first: kitView()/html.kv1/kv2 when rot.js is absent (dev/index.html); a no-op under rot.js (KIT §0)
js=open(d+'site/kvfallback.js',encoding='utf-8').read()+'\n'+js
# thin guest part A (review/coop-thin-a): its own last module, after jcoopone (reads COOPW.X from jcoopworld)
js+='\n'+cdn('jcoopthin.js',open(d+'build/jcoopthin.js',encoding='utf-8').read())
# jreg (review/story-frame): every registry pass also covers the entries later modules added (regEach); sweep at the script end + after load timers
js+='\ntry{regSweep();setTimeout(regSweep,0)}catch(e){console.error(e)}\n'
open(d+'build/all.js','w',encoding='utf-8').write(js)
subprocess.run(['node','--check',d+'build/all.js'],check=True)
p1=cdn('p1.html',open(d+'build/p1.html',encoding='utf-8').read())
icon='data:image/webp;base64,'+base64.b64encode(open(d+'build/icon.webp','rb').read()).decode()
p1=p1.replace('__ICON__',icon).rstrip()
assert p1.endswith('<script>'); p1=p1[:-8]
av=open(d+'build/avatars.js',encoding='utf-8').read()
# window.__ctmBuilt: the game script ran to its end (the boot cover lets go only then; else it shows its failure card)
out=p1+'<script>\n'+av+'\n</script>\n<script>\n'+js+'\nwindow.__ctmBuilt=1;\n</script>\n'
# boot cover (dev/site/kboot.js, KIT §14.1): its own last script, so it runs even if the game script threw
out+='<script>try{kbootDone()}catch(e){}</script>\n'
open(d+'index.html','w',encoding='utf-8').write(out)
print('built',len(out))
