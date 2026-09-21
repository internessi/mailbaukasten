"""Validate deployed HTML structure and local references without dependencies."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

root=Path(__file__).resolve().parents[1]/'public'
void={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class Check(HTMLParser):
    def __init__(self):super().__init__();self.stack=[];self.links=[];self.ids=set()
    def handle_starttag(self,t,attrs):
        a=dict(attrs)
        if t not in void:self.stack.append(t)
        if 'id' in a:
            assert a['id'] not in self.ids,('duplicate id',a['id'])
            self.ids.add(a['id'])
        for k in ['href','src']:
            if k in a:self.links.append(a[k])
    def handle_endtag(self,t):assert self.stack and self.stack.pop()==t,('unbalanced',t)

for path in root.glob('*.html'):
    p=Check();p.feed(path.read_text(encoding='utf-8'));assert not p.stack,(path,p.stack)
    for link in p.links:
        u=urlsplit(link)
        if u.scheme or u.netloc:continue
        if not u.path:
            if u.fragment:assert u.fragment in p.ids,(path,link)
        else:assert (path.parent/unquote(u.path)).exists(),(path,link)
    print(path.name,'structure, ids and local links OK')
