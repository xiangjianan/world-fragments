import datetime,json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
entries=[]
for path in sorted((root/'entries').glob('*.json')):
    item=json.loads(path.read_text())
    datetime.date.fromisoformat(item['date'])
    assert path.stem==item['date']
    assert len(item['directions']) == 3, 'Empty days must not create an edition'
    assert isinstance(item['note'],str)
    for d in item['directions']:
        for key in ['title','pattern','insight','connection','opportunity','uncertainty','experiment']:
            assert isinstance(d[key],str) and d[key].strip(),(path,key)
    entries.append(item)
(root/'docs/data/entries.json').write_text(json.dumps(entries,ensure_ascii=False,indent=2)+'\n')
print(f'Built {len(entries)} editions')
