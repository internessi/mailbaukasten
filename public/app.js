import {palettes,sections,newDraft,normalizeDraft,renderEmail,issues,escapeHtml} from './core.mjs';
const $=id=>document.getElementById(id);
const STORAGE='mailbaukasten.draft.v1';
let state=newDraft(), dirty=false, timer, toastTimer, lastHtml='', lastSection='';
function notify(msg){$('toast').textContent=msg;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,5000);}
try {const saved=localStorage.getItem(STORAGE);if(saved){state=normalizeDraft(JSON.parse(saved));$('remember').checked=true;}}catch{notify('Der gespeicherte Entwurf konnte nicht geladen werden. Sie können eine Entwurfsdatei öffnen.');}
const field=(path,label,type='text',value='')=>`<label class="field"><span>${escapeHtml(label)}</span>${type==='textarea'?`<textarea data-path="${path}" maxlength="12000" rows="4">${escapeHtml(value)}</textarea>`:`<input data-path="${path}" type="${type}" maxlength="12000" value="${escapeHtml(value)}" ${type==='url'?'placeholder="https://…"':''}>`}</label>`;
function content(){
 const open=new Set([...document.querySelectorAll('details[open]')].map(e=>e.id));
 $('content-fields').innerHTML=`<details class="block" id="block-meta" ${open.has('block-meta')||!$('content-fields').children.length?'open':''}><summary>Betreff &amp; Vorschautext</summary>${field('subject','Betreff','text',state.subject)}${field('preheader','Vorschautext im Posteingang','text',state.preheader)}<p class="help-note">Den Betreff später separat im Mailprogramm eintragen.</p></details>`+sections.map(cfg=>{
 const b=state.sections[cfg.id];return `<details class="block ${b.enabled?'':'off'}" id="block-${cfg.id}" ${open.has('block-'+cfg.id)?'open':''}><summary>${cfg.name}<span class="block-state">${b.enabled?'Sichtbar':'Ausgeblendet'}</span></summary><label class="enable"><input type="checkbox" data-toggle="${cfg.id}" ${b.enabled?'checked':''}> Diesen Baustein anzeigen</label><div class="fields" ${b.enabled?'':'hidden'}>${cfg.fields.map(([key,label,type])=>field('sections.'+cfg.id+'.'+key,label,type,b[key])).join('')}${cfg.list?`<div class="items">${b.items.map((i,n)=>`<div class="list-item"><div class="item-head"><strong>Eintrag ${n+1}</strong><button class="quiet small danger" data-remove="${cfg.id}:${n}" aria-label="Eintrag ${n+1} aus ${cfg.name} entfernen">Entfernen</button></div>${field(`sections.${cfg.id}.items.${n}.title`,'Titel','text',i.title)}${field(`sections.${cfg.id}.items.${n}.text`,'Beschreibung','textarea',i.text)}</div>`).join('')}</div><button class="add small" data-add="${cfg.id}" ${b.items.length>=12?'disabled':''}>+ Eintrag hinzufügen</button>`:''}</div>${cfg.id==='footer'?'<p class="help-note">Hier gehören <strong>Ihre</strong> Angaben hinein. Das Internessi-Impressum ist nur für diese Website. <a href="recht.html" target="_blank" rel="noopener">Was ist erforderlich?</a></p>':''}</details>`;
 }).join('');
}
function choices(){
 document.querySelectorAll('[data-design]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.design===state.design)));
 document.querySelectorAll('[data-palette]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.palette===state.palette)));
 $('font').value=state.font;$('spacing').value=state.spacing;
}
function persist(){
 if($('remember').checked){try{localStorage.setItem(STORAGE,JSON.stringify(state));$('save-state').textContent='Auf diesem Gerät gespeichert';}catch{$('remember').checked=false;$('save-state').textContent='Speichern fehlgeschlagen – bitte Entwurf als Datei sichern';notify('Gerätespeicher nicht verfügbar. Sichern Sie Ihren Entwurf als Datei.');}}
 else $('save-state').textContent=dirty?'Ungesicherte Änderungen · Entwurf sichern':'Texte bleiben in Ihrem Browser';
}
function update(changed=true){
 if(changed)dirty=true;
 lastHtml=renderEmail(state);
 // CSP confines document links and content; sandbox disallows scripts and navigation out.
 const preview=lastHtml.replace('<head>','<head><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; img-src \'none\'; form-action \'none\'; base-uri \'none\'">');
 const frame=$('preview');
 let oldScroll=0;try{oldScroll=frame.contentWindow?.scrollY||0;}catch{}
 const path=document.activeElement?.dataset.path||'';
 const section=path.startsWith('sections.')?path.split('.')[1]:'';
 frame.onload=()=>{
  inertLinks(frame);
  if(section&&section!==lastSection){scrollSection(section);lastSection=section;}
  else frame.contentWindow?.scrollTo(0,oldScroll);
 };
 frame.srcdoc=preview;
 if(!$('final-panel').hidden){$('final-preview').onload=()=>inertLinks($('final-preview'));$('final-preview').srcdoc=preview;}
 $('subject-preview').textContent=state.subject||'Ohne Betreff';$('preheader-preview').textContent=state.preheader;
 choices();persist();
}
function inertLinks(frame){
 frame.contentDocument?.addEventListener('click',e=>{if(e.target.closest('a'))e.preventDefault();});
}
function scrollSection(id){
 const el=$('preview').contentDocument?.querySelector('[data-mail-section="'+id+'"]');
 if(el)el.scrollIntoView({block:'start'});
}
 $('content-fields').addEventListener('toggle',e=>{
  if(e.target.open){const id=e.target.id.replace('block-','');if(id!=='meta'){scrollSection(id);lastSection=id;}}
 },true);
function tab(name){
 for(const n of ['design','content']){const active=name===n;$('tab-'+n).setAttribute('aria-selected',active);$('tab-'+n).tabIndex=active?0:-1;$(n+'-panel').hidden=!active;}
}
$('tab-design').onclick=()=>tab('design');$('tab-content').onclick=()=>tab('content');$('go-content').onclick=()=>{tab('content');$('tab-content').focus();};
document.querySelector('.editor-tabs').addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const name=e.key==='Home'?'design':e.key==='End'?'content':$('tab-design').getAttribute('aria-selected')==='true'?'content':'design';tab(name);$('tab-'+name).focus();}});
$('palettes').innerHTML=Object.entries(palettes).map(([id,p])=>`<button class="palette" data-palette="${id}" aria-pressed="${id===state.palette}"><span class="swatches" aria-hidden="true">${[p.dark,p.accent,p.bg,p.light].map(c=>`<i style="background:${c}"></i>`).join('')}</span><span class="name">${p.name}</span><span class="check" aria-hidden="true">✓</span></button>`).join('');
document.querySelectorAll('[data-design]').forEach(b=>b.onclick=()=>{state.design=b.dataset.design;update();});
document.querySelectorAll('[data-palette]').forEach(b=>b.onclick=()=>{state.palette=b.dataset.palette;update();});
for(const key of ['font','spacing'])$(key).onchange=()=>{state[key]=$(key).value;update();};
$('content-fields').addEventListener('input',e=>{
 const path=e.target.dataset.path;if(!path)return;const keys=path.split('.');let node=state;for(const k of keys.slice(0,-1))node=node[k];node[keys.at(-1)]=e.target.value;
 dirty=true;clearTimeout(timer);timer=setTimeout(()=>update(),90);
});
$('content-fields').addEventListener('change',e=>{
 const id=e.target.dataset.toggle;if(!id)return;state.sections[id].enabled=e.target.checked;
 const block=$('block-'+id);block.classList.toggle('off',!e.target.checked);block.querySelector('.block-state').textContent=e.target.checked?'Sichtbar':'Ausgeblendet';block.querySelector('.fields').hidden=!e.target.checked;update();
});
$('content-fields').addEventListener('click',e=>{
 const button=e.target.closest('button');if(!button)return;
 if(button.dataset.add){const id=button.dataset.add;if(state.sections[id].items.length>=12)return;state.sections[id].items.push({title:'',text:''});content();update();const inputs=$('block-'+id).querySelectorAll('.list-item input');inputs[inputs.length-1]?.focus();}
 if(button.dataset.remove){const[id,n]=button.dataset.remove.split(':');state.sections[id].items.splice(Number(n),1);content();update();$('block-'+id).querySelector('[data-add]').focus();}
});
document.querySelectorAll('[data-device]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-device]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('preview').classList.toggle('mobile',b.dataset.device==='mobile');});
document.querySelectorAll('[data-mobile]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-mobile]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('workspace').classList.toggle('show-preview',b.dataset.mobile==='preview');});
function download(data,type,suffix){
 const slug=(state.sections.header.brand||'mailbaukasten').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9-]/g,'-').replace(/-+/g,'-').slice(0,55)||'mailbaukasten';
 const blob=new Blob([data],{type});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=`${slug.toLowerCase()}-${suffix}`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
}
function saveDraft(){clearTimeout(timer);download(JSON.stringify(state,null,2),'application/json;charset=utf-8','entwurf.json');dirty=false;persist();notify('Entwurf als Datei heruntergeladen. Darin bleiben alle Inhalte bearbeitbar.');}
$('save-draft').onclick=saveDraft;$('final-save-draft').onclick=saveDraft;
$('load-draft').onclick=()=>{if(dirty&&!confirm('Aktuelle Eingaben durch einen gespeicherten Entwurf ersetzen? Sichern Sie Änderungen bei Bedarf zuerst.'))return;$('draft-file').click();};
$('draft-file').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>1000000)throw Error('Die Datei ist zu groß (maximal 1 MB).');const parsed=normalizeDraft(JSON.parse(await file.text()));state=parsed;dirty=false;content();update(false);notify('Entwurf geladen. Sie können direkt weiterarbeiten.');}catch(err){notify(err instanceof SyntaxError?'Die Datei enthält keinen gültigen JSON-Entwurf.':err.message);}finally{e.target.value='';}};
$('remember').onchange=()=>{if(!$('remember').checked){try{localStorage.removeItem(STORAGE);}catch{}notify('Der gemerkte Entwurf wurde entfernt. Ihre aktuellen Eingaben bleiben geöffnet.');}persist();};
$('show-final').onclick=()=>{clearTimeout(timer);$('builder').hidden=true;$('final-panel').hidden=false;update(false);$('final-title').focus();window.scrollTo(0,0);};
$('back-edit').onclick=()=>{$('builder').hidden=false;$('final-panel').hidden=true;$('show-final').focus();};
$('download').onclick=()=>{const hints=issues(state);$('issues').innerHTML=hints.length?hints.map(x=>`<li>${escapeHtml(x.text)}</li>`).join(''):'<li>Keine offensichtlichen Lücken gefunden. Bitte kontrollieren Sie Inhalt, Absender und Links trotzdem selbst.</li>';$('export-dialog').showModal();};
$('cancel-export').onclick=()=>$('export-dialog').close();
$('confirm-export').onclick=()=>{download(renderEmail(state),'text/html;charset=utf-8','mail.html');$('export-dialog').close();notify('HTML-Vorlage heruntergeladen. Bitte vor dem Versand eine Testmail prüfen.');};
$('reset').onclick=()=>$('reset-dialog').showModal();$('cancel-reset').onclick=()=>$('reset-dialog').close();
function reset(blank){clearTimeout(timer);try{localStorage.removeItem(STORAGE);}catch{}$('remember').checked=false;state=newDraft(blank);content();update();$('reset-dialog').close();notify(blank?'Leerer Entwurf bereit.':'Beispielvorlage geladen.');}
$('reset-example').onclick=()=>reset(false);$('reset-empty').onclick=()=>reset(true);
window.addEventListener('beforeunload',e=>{if(dirty&&!$('remember').checked){e.preventDefault();e.returnValue='';}});
content();update(false);
