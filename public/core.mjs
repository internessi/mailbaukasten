// MailBaukasten · MIT · one renderer for preview and download.
export const palettes = {
  blau: {name:'Blau', dark:'#0E2540', accent:'#1B66BD', bg:'#E9F1FA', light:'#F2F7FC', line:'#C6D5E5', text:'#1C334F', muted:'#536A82'},
  petrol: {name:'Petrol', dark:'#123E43', accent:'#16716F', bg:'#E5F1EF', light:'#F1F8F6', line:'#BED8D3', text:'#203C3D', muted:'#4B6865'},
  gruen: {name:'Grün', dark:'#233F30', accent:'#477342', bg:'#EBF0E5', light:'#F5F8F0', line:'#CDD9C3', text:'#2D3D2C', muted:'#586851'},
  bordeaux: {name:'Bordeaux', dark:'#512437', accent:'#9C3D5B', bg:'#F5EAED', light:'#FCF5F6', line:'#E4C9D2', text:'#472E36', muted:'#795561'},
  graphit: {name:'Graphit', dark:'#26313C', accent:'#4E657D', bg:'#EAEDEF', light:'#F5F7F9', line:'#CAD2DA', text:'#303D48', muted:'#596875'}
};
export const sections = [
  {id:'header', name:'Briefkopf', fields:[['brand','Name / Unternehmen'],['tagline','Unterzeile'],['badge','Hinweis rechts']]},
  {id:'hero', name:'Überschrift', fields:[['eyebrow','Kleine Themenzeile'],['headline','Hauptüberschrift']]},
  {id:'intro', name:'Einleitung', fields:[['greeting','Anrede'],['body','Text','textarea']]},
  {id:'info', name:'Infobox & Link', fields:[['title','Überschrift'],['text','Text','textarea'],['label','Linktext'],['url','Webadresse','url']]},
  {id:'topics', name:'Themen im Überblick', fields:[['title','Überschrift']], list:true},
  {id:'steps', name:'Nächste Schritte', fields:[['title','Überschrift']], list:true},
  {id:'contact', name:'Kontakt', fields:[['title','Überschrift'],['email','E-Mail-Adresse','email'],['phone','Telefon','tel'],['website','Website','url']]},
  {id:'signature', name:'Gruß & Signatur', fields:[['closing','Abschlusssatz','textarea'],['greeting','Grußformel'],['name','Name'],['role','Position / Unternehmen']]},
  {id:'footer', name:'Absender & Pflichtangaben', fields:[['name','Vollständiger Absender / Firma'],['address','Postanschrift','textarea'],['details','Rechtsform, Sitz, Vertretung, Registerangaben …','textarea'],['legalUrl','Eigenes Impressum (Webadresse)','url'],['privacyUrl','Eigener Datenschutz (Webadresse)','url']]},
  {id:'unsubscribe', name:'Abmeldung', fields:[['text','Hinweistext','textarea'],['label','Linktext'],['url','Abmeldelink (https:// oder mailto:)','text']]}
];
export function newDraft(blank=false) {
 const s={version:1,design:'markant',palette:'blau',font:'klassisch',spacing:'normal',subject:'Einblicke und Neuigkeiten von Ihrem Unternehmen',preheader:'Ein kurzer Überblick – und der direkte Kontakt zu uns.',sections:{
 header:{enabled:true,brand:'Ihr Unternehmen',tagline:'Ideen · Menschen · Möglichkeiten',badge:'Einblicke & Kontakt'},
 hero:{enabled:true,eyebrow:'Gut zu wissen',headline:'Neue Ideen.\nEin guter Anfang.'},
 intro:{enabled:true,greeting:'Guten Tag,',body:'manchmal beginnt etwas Gutes mit einer einfachen Idee. Hier ist Platz für Ihre Neuigkeiten, ein Angebot oder einen persönlichen Einblick.\n\nErzählen Sie Ihren Leserinnen und Lesern, was wirklich wichtig ist – verständlich, freundlich und auf den Punkt.'},
 info:{enabled:true,title:'Entdecken Sie mehr',text:'Ein hilfreicher Link führt direkt zu weiteren Informationen.',label:'Mehr erfahren',url:'https://example.com'},
 topics:{enabled:true,title:'Das erwartet Sie',items:[{title:'Neue Perspektiven',text:'Stellen Sie ein Thema vor, das Ihre Leser interessiert.'},{title:'Praktische Einblicke',text:'Machen Sie den Nutzen an einem konkreten Beispiel deutlich.'},{title:'Persönlicher Austausch',text:'Laden Sie zu Fragen und einem Gespräch ein.'}]},
 steps:{enabled:false,title:'So geht es weiter',items:[{title:'Informieren',text:'Verschaffen Sie sich einen ersten Überblick.'},{title:'Kontakt aufnehmen',text:'Schreiben Sie uns, was Sie interessiert.'},{title:'Gemeinsam starten',text:'Wir besprechen die nächsten Schritte.'}]},
 contact:{enabled:true,title:'Wir sind für Sie da',email:'hallo@example.com',phone:'+49 30 123456',website:'https://example.com'},
 signature:{enabled:true,closing:'Vielen Dank für Ihr Interesse. Wir freuen uns auf den Austausch.',greeting:'Freundliche Grüße',name:'Ihr Name',role:'Ihr Unternehmen'},
 footer:{enabled:true,name:'Ihr Unternehmen',address:'Musterstraße 1\n12345 Musterstadt',details:'Hier die für Ihre Rechtsform erforderlichen Angaben ergänzen.',legalUrl:'https://example.com/impressum',privacyUrl:'https://example.com/datenschutz'},
 unsubscribe:{enabled:true,text:'Sie möchten keine weiteren Informationen per E-Mail erhalten?',label:'Abmelden',url:'mailto:hallo@example.com?subject=Abmeldung'}
 }};
 if(blank){s.subject='';s.preheader='';for(const cfg of sections){const b=s.sections[cfg.id];for(const [key] of cfg.fields)b[key]='';if(cfg.list)b.items=[{title:'',text:''}];}}
 return s;
}
export const escapeHtml = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lines = s => escapeHtml(s).replace(/\r?\n/g,'<br>');
export function safeUrl(value,kind='web') {
 const raw=String(value??'');if(/[\u0000-\u001f\u007f]/.test(raw))return '';
 const v=raw.trim();
 if(!v || /[\s<>"'\\\u0000-\u001f\u007f]/.test(v))return '';
 try {
  if(kind==='email')return /^[^@?&#:]+@[^@?&#:]+\.[^@?&#:]+$/.test(v)?'mailto:'+v:'';
  if(kind==='unsubscribe' && /^mailto:/i.test(v)){
   if(/%(?:0a|0d)/i.test(v))return '';
   const address=v.slice(7).split('?')[0];return safeUrl(address,'email')?v:'';
  }
  const u=new URL(v);return ['https:','http:'].includes(u.protocol)&&!u.username&&!u.password ? u.href : '';
 }catch{return '';}
}
export function normalizeDraft(input) {
 if(!input||typeof input!=='object'||Array.isArray(input)||input.version!==1)throw Error('Das ist keine unterstützte MailBaukasten-Entwurfsdatei (Version 1).');
 const d=newDraft(true);
 for(const [key,values] of Object.entries({design:['markant','brief'],palette:Object.keys(palettes),font:['klassisch','modern'],spacing:['kompakt','normal','grosszuegig']})){
  if(!values.includes(input[key]))throw Error('Ungültige Gestaltung im Entwurf.');d[key]=input[key];
 }
 const str=v=>{if(typeof v!=='string'||v.length>12000)throw Error('Ein Textfeld fehlt oder ist zu lang (maximal 12.000 Zeichen).');return v;};
 d.subject=str(input.subject);d.preheader=str(input.preheader);
 for(const cfg of sections){
  const b=input.sections?.[cfg.id];if(!b||typeof b.enabled!=='boolean')throw Error('Ein Inhaltsbereich ist unvollständig.');
  d.sections[cfg.id].enabled=b.enabled;
  for(const [key]of cfg.fields)d.sections[cfg.id][key]=str(b[key]);
  if(cfg.list){if(!Array.isArray(b.items)||b.items.length>12)throw Error('Maximal zwölf Einträge je Liste sind möglich.');d.sections[cfg.id].items=b.items.map(i=>({title:str(i.title),text:str(i.text)}));}
 }
 return d;
}
export function issues(d){
 const out=[];const s=d.sections;const add=(text,section)=>out.push({text,section});
 if(!d.subject.trim())add('Ein Betreff fehlt. Tragen Sie ihn später auch im Mailprogramm ein.','meta');
 const active=Object.fromEntries(Object.entries(s).filter(([,v])=>v.enabled));
 if(/example\.com|Ihr Unternehmen|Ihr Name|Musterstraße|Musterstadt|Hier die für Ihre Rechtsform/.test(JSON.stringify(active)))add('Es sind noch Beispieltexte oder Beispiel-Kontaktdaten enthalten.','footer');
 if(!s.footer.enabled||!s.footer.name.trim()||!s.footer.address.trim())add('Prüfen Sie den vollständigen Absender und die Postanschrift.','footer');
 if(!s.contact.enabled||!safeUrl(s.contact.email,'email'))add('Eine gültige Kontakt-E-Mail fehlt.','contact');
 for(const [id,key,type] of [['info','url','web'],['contact','website','web'],['footer','legalUrl','web'],['footer','privacyUrl','web'],['unsubscribe','url','unsubscribe']]){
  if(s[id].enabled&&s[id][key]&&!safeUrl(s[id][key],type))add('Ungültiger Link in „'+sections.find(c=>c.id===id).name+'“. Er wird nicht als Link exportiert.',id);
 }
 if(s.unsubscribe.enabled&&!safeUrl(s.unsubscribe.url,'unsubscribe'))add('Für die Abmeldung fehlt eine gültige Web- oder E-Mail-Adresse.','unsubscribe');
 if(!s.unsubscribe.enabled)add('Abmeldung ist ausgeschaltet. Bei Werbung eine geeignete Abmeldemöglichkeit vorsehen.','unsubscribe');
 if(!Object.values(s).some(b=>b.enabled))add('Alle Inhaltsbereiche sind ausgeschaltet.','header');
 if(s.hero.enabled&&!s.hero.headline.trim())add('Die Hauptüberschrift ist leer.','hero');
 return out;
}
export function renderEmail(d){
 const p=palettes[d.palette];const s=d.sections;const bold=d.design==='markant';
 const serif=d.font==='modern'?'Arial,Helvetica,sans-serif':"Georgia,'Times New Roman',serif";
 const sans='Arial,Helvetica,sans-serif';const inset=bold?42:32;
 const factor={kompakt:.8,normal:1,grosszuegig:1.2}[d.spacing];
 const px=n=>Math.round(n*factor);
 let active='';
 const table=(body,style='',attrs='')=>`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" ${attrs} style="width:100%;${style}">${body}</table>`;
 const row=(body,bg='#FFFFFF',pad=24,extra='')=>`<tr data-mail-section="${active}"><td class="inset" bgcolor="${bg}" style="padding:${px(pad)}px ${inset}px;background-color:${bg};font-family:${sans};color:${p.text};font-size:15px;line-height:24px;overflow-wrap:anywhere;word-wrap:break-word;${extra}">${body}</td></tr>`;
 const h=(text,size=21,color=p.dark)=>`<h2 style="margin:0;font-family:${serif};font-size:${size}px;line-height:${size+7}px;color:${color};">${lines(text)}</h2>`;
 const text=(t,color=p.muted)=>`<div style="margin-top:5px;font-size:13px;line-height:21px;color:${color};">${lines(t)}</div>`;
 const a=(value,label,kind='web',color=p.accent)=>{const u=safeUrl(value,kind);return u?`<a href="${escapeHtml(u)}" style="color:${color};text-decoration:underline;word-break:break-word;">${escapeHtml(label)}</a>`:escapeHtml(label);};
 let r=[];
 if(s.header.enabled){active='header';const b=s.header;r.push(row(table(`<tr><td class="mast" style="font-family:${sans};"><div style="font-family:${serif};font-size:21px;line-height:27px;font-weight:bold;color:${bold?'#FFFFFF':p.dark};">${lines(b.brand)}</div><div style="margin-top:4px;font-size:10px;line-height:16px;letter-spacing:1.2px;text-transform:uppercase;color:${bold?'#FFFFFF':p.muted};">${lines(b.tagline)}</div></td>${b.badge?`<td class="badge" align="right" width="150" style="width:150px;padding-left:16px;font-family:${sans};font-size:10px;line-height:16px;font-weight:bold;letter-spacing:.7px;color:${bold?'#FFFFFF':p.accent};"><span style="display:inline-block;${bold?'border:1px solid #FFFFFF;padding:6px 9px;':''}">${lines(b.badge)}</span></td>`:''}</tr>`),bold?p.dark:'#FFFFFF',23));}
 if(s.hero.enabled){active='hero';const b=s.hero;if(bold&&b.eyebrow)r.push(row(lines(b.eyebrow),p.accent,9,'color:#FFFFFF;font-size:10px;line-height:16px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;'));
 r.push(row(`${!bold&&b.eyebrow?`<div style="margin-bottom:7px;font-size:10px;line-height:15px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:${p.accent};">${lines(b.eyebrow)}</div>`:''}<h1 class="headline" style="margin:0;font-family:${serif};font-size:${bold?32:29}px;line-height:${bold?39:36}px;font-weight:normal;color:${p.dark};">${lines(b.headline)}</h1>${bold?`<div style="margin-top:14px;width:72px;height:4px;background-color:${p.accent};font-size:0;line-height:0;">&nbsp;</div>`:''}`,bold?'#FFFFFF':p.light,30));}
 if(s.intro.enabled){active='intro';const b=s.intro;r.push(row(`${b.greeting?`<p style="margin:0 0 16px;">${lines(b.greeting)}</p>`:''}`+b.body.split(/\r?\n\s*\r?\n/).map(t=>`<p style="margin:0 0 14px;">${lines(t)}</p>`).join('')));}
 if(s.info.enabled){active='info';const b=s.info;r.push(row(table(`<tr><td style="padding:${px(17)}px;font-family:${sans};">${h(b.title,bold?18:15)}${text(b.text)}${b.label?`<div style="margin-top:10px;font-size:13px;font-weight:bold;">${a(b.url,b.label)}</div>`:''}</td></tr>`,`background-color:${p.light};border-left:${bold?5:4}px solid ${p.accent};`),'#FFFFFF',16));}
 if(s.topics.enabled){active='topics';const b=s.topics;const items=b.items.map(i=>bold?`<tr><td style="padding:${px(13)}px 0;border-bottom:1px solid ${p.line};">${table(`<tr><td class="ledger" width="145" valign="top" style="width:145px;padding-right:12px;font-family:${sans};font-size:11px;line-height:18px;font-weight:bold;letter-spacing:.5px;text-transform:uppercase;color:${p.accent};">${lines(i.title)}</td><td class="ledger" valign="top" style="font-family:${sans};font-size:14px;line-height:22px;color:${p.text};">${lines(i.text)}</td></tr>`)}</td></tr>`:`<tr><td style="padding:${px(11)}px 0;border-top:1px solid ${p.line};font-family:${sans};"><div style="font-size:11px;line-height:17px;font-weight:bold;letter-spacing:.7px;text-transform:uppercase;color:${p.accent};">${lines(i.title)}</div>${text(i.text,p.text)}</td></tr>`).join('');r.push(row(h(b.title)+table(items,'margin-top:14px;'),bold?p.light:'#FFFFFF',24));}
 if(s.steps.enabled){active='steps';const b=s.steps;const items=b.items.map((i,n)=>`<tr><td width="36" valign="top" style="width:36px;padding:${px(10)}px 0;font-family:${sans};color:${bold?'#FFFFFF':p.accent};background-color:${bold?p.accent:p.light};font-size:13px;font-weight:bold;text-align:center;">${bold?String(n+1).padStart(2,'0'):n+1+'.'}</td><td style="padding:${px(10)}px 0 ${px(10)}px 14px;border-bottom:1px solid ${p.line};font-family:${sans};"><div style="font-size:14px;line-height:21px;font-weight:bold;color:${p.dark};">${lines(i.title)}</div>${text(i.text)}</td></tr>`).join('');r.push(row(h(b.title)+table(items,'margin-top:14px;'),bold?'#FFFFFF':p.light,24));}
 if(s.contact.enabled){active='contact';const b=s.contact;const entries=[['E-Mail',b.email?a(b.email,b.email,'email',bold?'#FFFFFF':p.accent):''],['Telefon',b.phone?(/^[+\d ()/.-]+$/.test(b.phone)?`<a href="tel:${escapeHtml(b.phone.replace(/[^+\d]/g,''))}" style="color:${bold?'#FFFFFF':p.accent};text-decoration:underline;">${escapeHtml(b.phone)}</a>`:escapeHtml(b.phone)):''],['Website',b.website?a(b.website,b.website,'web',bold?'#FFFFFF':p.accent):'']].filter(([,v])=>v);r.push(row(h(b.title,21,bold?'#FFFFFF':p.dark)+entries.map(([k,v])=>`<p style="margin:12px 0 0;font-size:13px;line-height:22px;color:${bold?'#FFFFFF':p.text};"><strong>${k}:</strong> ${v}</p>`).join(''),bold?p.dark:'#FFFFFF',25));}
 if(s.signature.enabled){active='signature';const b=s.signature;r.push(row(`${b.closing?`<p style="margin:0 0 22px;">${lines(b.closing)}</p>`:''}<div style="padding-top:17px;border-top:1px solid ${p.line};">${text(b.greeting)}<div style="margin-top:4px;font-family:${bold?serif:sans};font-size:18px;line-height:24px;font-weight:bold;color:${p.dark};">${lines(b.name)}</div>${text(b.role)}</div>`));}
 if(s.footer.enabled){active='footer';const b=s.footer;r.push(row(`<strong>${lines(b.name)}</strong>${b.address?'<br>'+lines(b.address):''}${b.details?'<br>'+lines(b.details):''}${b.legalUrl||b.privacyUrl?'<br>'+[b.legalUrl?a(b.legalUrl,'Impressum'):'',b.privacyUrl?a(b.privacyUrl,'Datenschutz'):''].filter(Boolean).join(' · '):''}`,p.light,14,`border-top:1px solid ${p.line};font-size:11px;line-height:18px;color:${p.muted};`));}
 if(s.unsubscribe.enabled){active='unsubscribe';const b=s.unsubscribe;r.push(row(`<div>${lines(b.text)}</div><div style="margin-top:4px;font-weight:bold;">${a(b.url,b.label,'unsubscribe')}</div>`,p.bg,14,`border-top:${bold?3:1}px solid ${bold?p.accent:p.line};text-align:center;font-size:11px;line-height:18px;color:${p.muted};`));}
 return `<!DOCTYPE html><html lang="de" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${escapeHtml(d.subject||'Ihre Nachricht')}</title><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]--><style>body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}table{border-collapse:collapse;border-spacing:0;table-layout:fixed}a{overflow-wrap:anywhere}h1,h2,p,div{overflow-wrap:anywhere;word-wrap:break-word}@media only screen and (max-width:640px){.sheet{width:100%!important}.inset{padding-left:22px!important;padding-right:22px!important}.headline{font-size:26px!important;line-height:34px!important}.mast,.badge,.ledger{display:block!important;width:auto!important}.badge{text-align:left!important;padding:12px 0 0!important}.ledger{padding:3px 0!important}}</style></head><body style="margin:0;padding:0;background-color:${p.bg};"><div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;mso-hide:all;">${escapeHtml(d.preheader)}</div>${table(`<tr><td align="center" style="padding:28px 10px;"><!--[if mso]><table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table role="presentation" class="sheet" width="620" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="width:620px;max-width:620px;background-color:#FFFFFF;border:1px solid ${p.line};${!bold?'border-top:4px solid '+p.accent+';':''}">${r.join('')}</table><!--[if mso]></td></tr></table><![endif]--></td></tr>`,`background-color:${p.bg};`)}</body></html>`;
}
