import sys,glob,os
sys.path.insert(0,os.path.dirname(__file__))
from sheet import sheet
def pairs(names,tag,per=6,H=640):
    for bgn,bg in (('dark',(40,38,46)),('light',(236,232,222))):
        for i in range(0,len(names),per):
            ch=names[i:i+per]; paths=[];labels=[]
            for n in ch:
                paths+= [f'cur/fig-kid-{n}.webp',f'new/fig-kid-{n}.webp']; labels+=[n+' OLD',n+' NEW']
            sheet(paths,labels,f'sheets/{tag}-{bgn}-{i//per+1}.jpg',H=H,bg=bg)
if __name__=='__main__':
    pairs(sys.argv[2:],sys.argv[1])
