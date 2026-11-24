import os,sys,subprocess,urllib.parse
A='https://api.cloudflare.com/client/v4/accounts/7fc1b88a522c6a91b40051536fa02cae/r2/buckets/ctm-img/objects'
base='up3';fail=0
for root,_,fs in os.walk(base):
    for f in fs:
        p=os.path.join(root,f);key='img/_review/ring/'+os.path.relpath(p,base)
        ct={'html':'text/html; charset=utf-8','mp4':'video/mp4','webp':'image/webp','jpg':'image/jpeg'}[f.rsplit('.',1)[1]]
        r=subprocess.run(['curl','-s','-X','PUT',A+'/'+urllib.parse.quote(key,safe=''),'-H','Content-Type: '+ct,'--data-binary','@'+p],capture_output=True,text=True).stdout
        if '"success":true' not in r:print('FAIL',key,r[:150]);fail=1
print('upload fail=',fail)
