import sys,subprocess,json
P='/home/user/cung-tuong-mong/dev/handover/reports/fig-cutout-clean/batch-consort-ty-tools/'
fhd=json.load(open('/tmp/fhd.json'))['files']
sheet=dict(l.split() for l in open(P+'progress/old_sheet_ids.tsv'))
a18={}
for l in open(P+'progress/ids.tsv'):
    k,i=l.split()[:2]; a18[k]=i
done=set(l.split()[0] for l in open(P+'progress/older.tsv') if l.strip().endswith('OK'))
def q():
    for l in open(P+'older_ty4-8_index.txt'):
        i,k=l.split()[:2]
        if f'fig-{k}.webp' in fhd or k in done: continue
        yield int(i),k
if __name__=='__main__':
    n=int(sys.argv[1]); skip=int(sys.argv[2]) if len(sys.argv)>2 else 0
    for i,k in list(q())[skip:skip+n]:
        age=k[-3:]; a=k.replace(age,'a18')
        pr=subprocess.check_output(['python3',P+'prompt.py',str(i),age,'sheet']).decode().strip()
        print(json.dumps({'key':k,'sheet':sheet[k],'a18':a18.get(a),'prompt':pr}))
