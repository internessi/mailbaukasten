import test from 'node:test';
import assert from 'node:assert/strict';
import {newDraft,normalizeDraft,renderEmail,issues,safeUrl,palettes,sections} from '../public/core.mjs';

test('all 60 design/palette/font/spacing combinations produce independent email HTML',()=>{
 for(const design of ['markant','brief'])for(const palette of Object.keys(palettes))for(const font of ['klassisch','modern'])for(const spacing of ['kompakt','normal','grosszuegig']){
  const d={...newDraft(),design,palette,font,spacing};const h=renderEmail(d);
  assert.match(h,/<!DOCTYPE html>/);assert.match(h,/charset="UTF-8"/);assert.ok(h.includes(palettes[palette].accent));
  assert.doesNotMatch(h,/<script|<iframe|<form|<img|stylesheet|localStorage/);assert.doesNotMatch(h,/Internessi|Sandtorkai|Treuhand/);
 }
});
test('hidden sections keep their data and never enter export',()=>{
 for(const cfg of sections){const d=newDraft();const key=cfg.fields[0][0];d.sections[cfg.id][key]='UNIQUE_HIDDEN_TOKEN';d.sections[cfg.id].enabled=false;
 assert.ok(!renderEmail(d).includes('UNIQUE_HIDDEN_TOKEN'));assert.equal(d.sections[cfg.id][key],'UNIQUE_HIDDEN_TOKEN');}
});
test('rendering changes style without mutating any data',()=>{
 const d=newDraft();d.sections.header.brand='Eigener Name';const before=JSON.stringify(d);renderEmail(d);assert.equal(JSON.stringify(d),before);
 d.design='brief';d.palette='petrol';assert.ok(renderEmail(d).includes('Eigener Name'));
});
test('untrusted text and attributes are escaped in all content fields',()=>{
 const d=newDraft();const attack='</title><script>alert(1)</script><img src=x onerror="evil()">';
 d.subject=attack;d.preheader=attack;
 for(const cfg of sections){const b=d.sections[cfg.id];b.enabled=true;for(const [key]of cfg.fields)b[key]=attack;if(cfg.list)b.items=[{title:attack,text:attack}];}
 const h=renderEmail(d);assert.doesNotMatch(h,/<script|<img|href="javascript|<\/title><script/);assert.match(h,/&lt;script&gt;/);
});
test('links only accept allowed protocols and reject credentials and injection',()=>{
 for(const u of ['javascript:alert(1)','data:text/html,hi','file:///C:/test','https://name:pass@example.com','https://x.com/"onclick="evil','https:\\evil.com','https://x.com/\n','//example.com'])assert.equal(safeUrl(u),'');
 assert.equal(safeUrl('https://example.com'),'https://example.com/');assert.equal(safeUrl('https://example.com/?x=1&y=2'),'https://example.com/?x=1&y=2');
 assert.equal(safeUrl('hallo@example.com','email'),'mailto:hallo@example.com');assert.equal(safeUrl('mailto:a@example.com?subject=Abmeldung','unsubscribe'),'mailto:a@example.com?subject=Abmeldung');
 assert.equal(safeUrl('mailto:a@example.com?subject=x%0ABcc:y@example.com','unsubscribe'),'');
});
test('invalid href values omitted rather than executed',()=>{
 const d=newDraft();d.sections.info.url='javascript:alert(1)';assert.doesNotMatch(renderEmail(d),/javascript:alert/);assert.ok(issues(d).some(i=>i.section==='info'));
});
test('draft JSON round trip includes hidden text and custom list entries',()=>{
 const d=newDraft();d.sections.steps.items.push({title:'Grüße & <Ideen>',text:'Weiter\nlesen'});d.sections.steps.enabled=false;
 assert.deepEqual(normalizeDraft(JSON.parse(JSON.stringify(d))),d);
});
test('import copies a whitelist, never object prototype properties',()=>{
 const d=JSON.parse(JSON.stringify(newDraft()));d.__proto__={polluted:true};d.extra='ignore';const clean=normalizeDraft(d);
 assert.equal(clean.polluted,undefined);assert.equal(clean.extra,undefined);assert.equal({}.polluted,undefined);
});
test('invalid draft schema, oversized values and list limits rejected',()=>{
 for(const v of [null,[],{}, {version:2}])assert.throws(()=>normalizeDraft(v));
 const d=newDraft();d.palette='evil';assert.throws(()=>normalizeDraft(d));d.palette='blau';d.sections.header.brand='x'.repeat(12001);assert.throws(()=>normalizeDraft(d));
 const e=newDraft();e.sections.topics.items=Array(13).fill({title:'',text:''});assert.throws(()=>normalizeDraft(e));
 delete e.sections;assert.throws(()=>normalizeDraft(e));
});
test('empty lists and all sections switched off render safely',()=>{
 const d=newDraft(true);for(const b of Object.values(d.sections))b.enabled=false;
 assert.ok(issues(d).some(i=>i.text.includes('Alle Inhaltsbereiche')));assert.match(renderEmail(d),/<body/);
});
test('long lines and Unicode have responsive and wrapping rules',()=>{
 const d=newDraft();d.sections.hero.headline='ÄÖÜ ß ❤️ '+ 'x'.repeat(10000);const h=renderEmail(d);
 assert.ok(h.includes('ÄÖÜ ß ❤️'));assert.match(h,/overflow-wrap:anywhere/);assert.match(h,/max-width:640px/);
});
const lum=hex=>{const rgb=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
const contrast=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
test('all palette text/background combinations reach WCAG AA 4.5:1',()=>{
 for(const p of Object.values(palettes))for(const [fg,bg]of [[p.text,'#FFFFFF'],[p.muted,p.light],[p.muted,p.bg],[p.accent,p.light],[p.accent,p.bg],['#FFFFFF',p.accent],['#FFFFFF',p.dark]])assert.ok(contrast(fg,bg)>=4.5,`${p.name}: ${fg} on ${bg} = ${contrast(fg,bg)}`);
});
test('default example and missing contact information produce actionable checks',()=>{
 assert.ok(issues(newDraft()).some(i=>i.text.includes('Beispiel')));
 const d=newDraft(true);assert.ok(issues(d).some(i=>i.section==='contact'));assert.ok(issues(d).some(i=>i.section==='footer'));
});
