import sys,os;from PIL import Image
S='/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad/stsheets'
ims=[Image.open(os.path.join(S,g.replace(':','_')+'.jpg')) for g in sys.argv[2:] if os.path.exists(os.path.join(S,g.replace(':','_')+'.jpg'))]
W=Image.new('RGB',(ims[0].width,sum(i.height for i in ims)));y=0
for i in ims: W.paste(i,(0,y));y+=i.height
W=W.resize((W.width*3//4,W.height*3//4));W.save(sys.argv[1],quality=78);print(sys.argv[1],W.size)
