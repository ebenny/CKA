import { useEffect, useRef, useState } from 'react';
import { ArrowRightIcon, ArrowLeftIcon, XIcon, ListIcon, CheckCircleIcon, DownloadSimpleIcon, CopyIcon, WhatsappLogoIcon, FacebookLogoIcon, InstagramLogoIcon } from '@phosphor-icons/react';
import { programmes } from './programmes.js';
import { contact } from './contact.js';

const asset = (name) => `/assets/${name}`;
function Brand({ footer = false }) {
  return <a className={`brand ${footer ? 'brand--footer' : ''}`} href="#top" aria-label="Coding Kids Africa home"><img src={asset('logo-horizontal.png')} alt="Coding Kids Africa — Nurturing future tech experts" width="480" height="116" /></a>;
}

function Dialog({ state, onClose, onEnquire }) {
  const ref = useRef(null);
  const [preview, setPreview] = useState(null);
  const [selected, setSelected] = useState(state.programme || '');
  const [errors, setErrors] = useState({});
  const [copyStatus, setCopyStatus] = useState('');
  const [draft, setDraft] = useState({ name: '', email: '', phone: '', organisation: '', message: '' });
  const programme = programmes.find((p) => p.id === state.programme);
  const organisationNeeded = ['school', 'camp'].includes(selected);
  useEffect(() => {
    const dialog = ref.current, previousFocus = document.activeElement, previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, []);
  useEffect(() => { if (preview) ref.current.querySelector('[data-confirmation-title]')?.focus(); }, [preview]);
  function updateDraft(event) {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }
  function previewEnquiry(event) {
    event.preventDefault(); const nextErrors = {};
    if (!draft.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) nextErrors.email = 'Please enter a valid email address.';
    if (!selected) nextErrors.programme = 'Please choose a programme.';
    if (organisationNeeded && !draft.organisation.trim()) nextErrors.organisation = 'Please enter your school or organisation name.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { ref.current.querySelector(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus(); return; }
    const clean = Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, value.trim()]));
    setPreview({ ...clean, programme: programmes.find((p) => p.id === selected).title, organisation: organisationNeeded ? clean.organisation : '' });
  }
  const summary = preview ? ['CODING KIDS AFRICA — ENQUIRY DRAFT', 'Preview only. This enquiry has not been sent.', '', `Programme: ${preview.programme}`, `Name: ${preview.name}`, `Email: ${preview.email}`, preview.phone && `Phone: ${preview.phone}`, preview.organisation && `Organisation: ${preview.organisation}`, preview.message && `Message: ${preview.message}`].filter((line) => line !== false && line != null).join('\n') : '';
  async function copyEnquiry() {
    try { await navigator.clipboard.writeText(summary); setCopyStatus('Enquiry draft copied. Nothing has been sent.'); }
    catch { setCopyStatus('Copy is unavailable in this browser. Please download the draft instead.'); }
  }
  function downloadEnquiry() {
    const url = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'coding-kids-africa-enquiry-draft.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const error = (name) => errors[name] && <span className="field-error" id={`${name}-error`}>{errors[name]}</span>;
  return <dialog ref={ref} className="programme-dialog" aria-labelledby="dialog-title" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) { const b = event.currentTarget.getBoundingClientRect(); if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) onClose(); } }}>
    <div className="dialog-inner"><button className="icon-button dialog-close" onClick={onClose} aria-label="Close dialog"><XIcon size={24} /></button>
      {state.type === 'programme' && programme ? <>
        <img className="dialog-service-icon" src={asset(`icons/${programme.icon}.svg`)} alt="" /><p className="eyebrow">{programme.eyebrow}</p><h2 id="dialog-title">{programme.title}</h2><p className="dialog-lead">{programme.intro}</p>
        <ul className="detail-list">{programme.details.map((detail) => <li key={detail}><CheckCircleIcon size={23} weight="duotone" aria-hidden="true" /><span>{detail}</span></li>)}</ul>
        <div className="detail-note"><strong>Let’s find the right fit.</strong><p>{programme.note}</p></div>
        <button className="button button--primary dialog-main-action" onClick={() => onEnquire(programme.id)}>Enquire about {programme.shortTitle}<ArrowRightIcon size={21} aria-hidden="true" /></button><p className="small-note">For parents, guardians and organisation representatives.</p>
      </> : preview ? <>
        <CheckCircleIcon size={54} weight="duotone" className="confirmation-icon" aria-hidden="true" /><p className="eyebrow">YOUR NEXT STEP</p><h2 id="dialog-title" data-confirmation-title tabIndex={-1}>Your enquiry preview is ready.</h2>
        <p className="preview-notice"><strong>Not sent.</strong> This is a website preview. You can copy or download your draft; no details have been stored or sent to Coding Kids Africa.</p>
        <dl className="enquiry-summary"><div><dt>Programme</dt><dd>{preview.programme}</dd></div><div><dt>Name</dt><dd>{preview.name}</dd></div><div><dt>Email</dt><dd>{preview.email}</dd></div>{preview.phone && <div><dt>Phone</dt><dd>{preview.phone}</dd></div>}{preview.organisation && <div><dt>Organisation</dt><dd>{preview.organisation}</dd></div>}{preview.message && <div><dt>Your message</dt><dd>{preview.message}</dd></div>}</dl>
        <div className="summary-actions"><button className="button button--primary" onClick={copyEnquiry}><CopyIcon size={20} aria-hidden="true" />Copy draft</button><button className="button button--outline" onClick={downloadEnquiry}><DownloadSimpleIcon size={20} aria-hidden="true" />Download draft</button></div><p className="copy-status" role="status">{copyStatus}</p><button className="text-button" onClick={() => { setPreview(null); setCopyStatus(''); }}><ArrowLeftIcon size={19} aria-hidden="true" />Edit details</button>
      </> : <>
        <p className="eyebrow">LET’S START SOMETHING BRILLIANT</p><h2 id="dialog-title">Tell us what you have in mind.</h2><p className="dialog-lead">A lesson for your child, a coding hub for your school, or a camp for your community.</p>
        <p className="preview-notice"><strong>Preview mode:</strong> this form prepares an enquiry draft. It does not send or store your details.</p>
        <form className="enquiry-form" noValidate onSubmit={previewEnquiry}>
          <p className="required-note">All fields are required unless marked optional. Please use an adult’s contact details.</p>
          <div className="form-row"><label>Your name<input name="name" autoComplete="name" value={draft.name} onChange={updateDraft} required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} maxLength={100} />{error('name')}</label><label>Email address<input name="email" type="email" autoComplete="email" value={draft.email} onChange={updateDraft} required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} maxLength={200} />{error('email')}</label></div>
          <div className="form-row"><label>Programme<select name="programme" value={selected} onChange={(event) => { setSelected(event.target.value); setErrors((current) => ({ ...current, programme: '' })); }} required aria-invalid={!!errors.programme} aria-describedby={errors.programme ? 'programme-error' : undefined}><option value="">Choose a programme</option>{programmes.map((p) => <option value={p.id} key={p.id}>{p.title}</option>)}</select>{error('programme')}</label><label>Phone <span className="optional">(optional)</span><input name="phone" type="tel" autoComplete="tel" value={draft.phone} onChange={updateDraft} maxLength={40} /></label></div>
          {organisationNeeded && <label>School or organisation name<input name="organisation" autoComplete="organization" value={draft.organisation} onChange={updateDraft} required aria-invalid={!!errors.organisation} aria-describedby={errors.organisation ? 'organisation-error' : undefined} maxLength={150} />{error('organisation')}</label>}
          <label>What would you like to explore? <span className="optional">(optional)</span><textarea name="message" rows={3} value={draft.message} onChange={updateDraft} placeholder="Tell us about your learning or programme goals." maxLength={2000} /></label><p className="small-note">Please don’t include a child’s full name, home address or sensitive personal information.</p><button className="button button--primary" type="submit">Preview enquiry<ArrowRightIcon size={21} aria-hidden="true" /></button>
        </form>
      </>}
    </div>
  </dialog>;
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false), [dialog, setDialog] = useState(null);
  const menuButton = useRef(null);
  const showProgramme = (programme) => { setMenuOpen(false); setDialog({ type: 'programme', programme }); };
  const showEnquiry = (programme = '') => { setMenuOpen(false); setDialog({ type: 'enquiry', programme }); };
  useEffect(() => { if (!menuOpen) return; const onEscape = (event) => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } }; document.addEventListener('keydown', onEscape); return () => document.removeEventListener('keydown', onEscape); }, [menuOpen]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header" id="top"><div className="header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation"><a href="#programmes">Lessons</a><a href="#school-hubs">School hubs</a><button onClick={() => showProgramme('camp')}>Summer camps</button><button className="button button--primary header-enquire" onClick={() => showEnquiry()}>Enquire now</button></nav><button ref={menuButton} className="icon-button mobile-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <XIcon size={27} /> : <ListIcon size={27} />}</button></div>
      {menuOpen && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation"><a href="#programmes" onClick={() => setMenuOpen(false)}>Lessons</a><a href="#school-hubs" onClick={() => setMenuOpen(false)}>School hubs</a><button onClick={() => showProgramme('camp')}>Summer camps</button><button className="button button--primary" onClick={() => showEnquiry()}>Enquire now</button></nav>}
    </header>
    <main id="main"><section className="hero" aria-labelledby="hero-title"><picture className="hero-picture"><source media="(max-width: 1100px)" srcSet={asset('hero-learning-mobile-neat-cut.webp')} /><img className="hero-art" src={asset('hero-learning-neat-cut.webp')} alt="A tutor and three young learners exploring coding together on a laptop" width="1752" height="897" fetchPriority="high" /></picture><div className="hero-content page-width"><p className="eyebrow">CODING SKILLS. BIG POSSIBILITIES.</p><h1 id="hero-title">Big ideas start<br />with a little code.</h1><p className="hero-description">Personalised coding lessons for children<br className="desktop-break" /> and teenagers—at home, online and in school.</p><div className="hero-actions"><a className="button button--primary" href="#programmes">Explore our programmes</a><a className="text-button" href="#school-hubs">Partner with us<ArrowRightIcon size={25} aria-hidden="true" /></a></div><p className="hero-note">Curious minds.<br />Brighter tomorrows.</p></div></section>
      <section className="programmes page-width" id="programmes" aria-labelledby="programmes-title"><h2 id="programmes-title">A learning path for every young mind.</h2><div className="programme-grid">{programmes.map((programme) => <button className="programme-card" key={programme.id} onClick={() => showProgramme(programme.id)} aria-label={`Explore ${programme.title.toLowerCase()}`}><img className="programme-icon" src={asset(`icons/${programme.icon}.svg`)} alt="" width="80" height="80" /><h3>{programme.title}</h3><p>{programme.summary}</p></button>)}</div></section>
      <section className="school-band" id="school-hubs" aria-labelledby="school-title"><div className="school-content"><h2 id="school-title">Turn your school into<br className="desktop-break" /> a launchpad.</h2><p>Create a coding hub or make more of your existing<br className="desktop-break" /> computer infrastructure. Our tutors teach your students.</p><button className="button button--white" onClick={() => showProgramme('school')}>Explore school partnerships</button></div><img className="school-art" src={asset('school-hub-neat-cut.webp')} alt="A tutor helping a student learn in a school computer lab" width="1408" height="864" loading="lazy" /></section>
    </main>
    <footer className="site-footer page-width">
      <Brand footer />
      <div className="footer-contact">
        <a className="footer-whatsapp" href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${contact.whatsappDisplay} (opens in a new tab)`}><WhatsappLogoIcon size={25} aria-hidden="true" /><span>{contact.whatsappDisplay}</span></a>
        <nav className="social-links" aria-label="Follow Coding Kids Africa">
          <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Coding Kids Africa on Facebook (opens in a new tab)"><FacebookLogoIcon size={23} aria-hidden="true" /><span>Facebook</span></a>
          <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Coding Kids Africa on Instagram (opens in a new tab)"><InstagramLogoIcon size={23} aria-hidden="true" /><span>Instagram</span></a>
        </nav>
      </div>
      <a className="footer-top" href="#top" aria-label="Back to top"><span>Back to top</span><ArrowRightIcon size={22} aria-hidden="true" /></a>
    </footer>
    {!dialog && <a className="whatsapp-float" href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`Chat with Coding Kids Africa on WhatsApp at ${contact.whatsappDisplay} (opens in a new tab)`} title="Chat on WhatsApp"><WhatsappLogoIcon size={29} aria-hidden="true" /><span>Chat on WhatsApp</span></a>}
    {dialog && <Dialog key={`${dialog.type}-${dialog.programme}`} state={dialog} onClose={() => setDialog(null)} onEnquire={showEnquiry} />}
  </>;
}
