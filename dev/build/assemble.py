import base64,subprocess
import os
d=os.path.dirname(os.path.abspath(__file__))+'/../'  # dev/: build/ here; writes dev/index.html
js=''.join(open(d+'build/'+f,encoding='utf-8').read() for f in ['j0.js', 'j1.js', 'j2.js', 'j3.js', 'j4.js', 'j5.js', 'j7.js', 'j8.js', 'j9.js', 'j10.js', 'j6.js', 'j11.js', 'j12.js', 'j13.js', 'j14.js', 'j15.js', 'j16.js', 'j17.js', 'j18.js', 'j19.js', 'j20.js', 'j21.js', 'j22.js', 'j23.js', 'j24.js', 'j25.js', 'j26.js', 'j27.js', 'j28.js', 'j29.js', 'j30.js', 'j31.js', 'j32.js', 'j33.js', 'j34.js', 'j35.js', 'j36.js', 'j37.js', 'j38.js', 'j39.js', 'j40.js', 'jbal.js', 'jkit.js', 'jtin.js', 'j41.js', 'j43.js', 'j42.js', 'j50.js', 'j51.js', 'j52.js', 'j53.js', 'j54.js', 'j55.js', 'j56.js', 'j57.js', 'j58.js', 'j59.js', 'j60.js', 'j61.js', 'j62.js', 'j64.js', 'j66.js', 'j73.js', 'jkitctl.js', 'j74.js', 'j77.js', 'j80.js', 'j63.js', 'j78.js', 'j79.js', 'j87.js', 'j65.js', 'j88.js', 'j89.js', 'j86.js', 'j82.js', 'j90.js', 'j93.js', 'j94.js', 'jk2b.js', 'j98.js', 'j84.js'])
open(d+'build/all.js','w',encoding='utf-8').write(js)
subprocess.run(['node','--check',d+'build/all.js'],check=True)
p1=open(d+'build/p1.html',encoding='utf-8').read()
icon='data:image/webp;base64,'+base64.b64encode(open(d+'build/icon.webp','rb').read()).decode()
p1=p1.replace('__ICON__',icon).rstrip()
assert p1.endswith('<script>'); p1=p1[:-8]
av=open(d+'build/avatars.js',encoding='utf-8').read()
out=p1+'<script>\n'+av+'\n</script>\n<script>\n'+js+'\n</script>\n'
open(d+'index.html','w',encoding='utf-8').write(out)
print('built',len(out))
