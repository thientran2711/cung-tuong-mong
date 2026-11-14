import json,re,sys;J=json.load(open('kjobs.json'))
for k in sys.argv[1:]:
  p=J[k]['prompt'];feat=re.search(r'features \(([^)]*)\)',p).group(1);pal=re.search(r'every age: ([^.]*)\.',p).group(1)
  parts=re.split(r' [1-4]\) ',p)[1:]; props=[re.split(r', (?=holding|hugging|hands|with hands|one hand)',x)[-1].split(';')[0].split('. Calm')[0] for x in parts]
  print(k,J[k]['style'],'|',feat,'|',pal,'|',' / '.join(props))
