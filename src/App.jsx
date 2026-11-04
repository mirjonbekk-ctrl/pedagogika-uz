import { useEffect, useRef, useState } from 'react';
import './styles.css';
import './polish.css';
import './chrome.css';
import './polish2.css';
import './nav.css';
import './header.css';
import './hero.css';
import HeroIllustration from './HeroIllustration.jsx';
import heroBanner from './assets/hero-banner.png';
import pointCourses from './assets/icons/points/courses.png';
import pointStudents from './assets/icons/points/students.png';
import pointGrowth from './assets/icons/points/growth.png';
import logoImg from './assets/logo.png';
import targetImg from './assets/icons/courses/target.png';
import codeImg from './assets/icons/courses/code.png';
import capImg from './assets/icons/courses/cap.png';
import handshakeImg from './assets/icons/courses/handshake.png';
import bearImg from './assets/icons/courses/bear.png';
import recycleImg from './assets/icons/courses/recycle.png';
import hrImg from './assets/icons/departments/hr.png';
import financeImg from './assets/icons/departments/finance.png';
import libraryImg2 from './assets/icons/departments/library.png';
import scienceImg from './assets/icons/departments/science.png';
import preschoolImg from './assets/icons/departments/preschool.png';
import digitalImg from './assets/icons/departments/digital.png';
import qualityImg from './assets/icons/departments/quality.png';
import methodicImg from './assets/icons/departments/methodic.png';
import coursesImg from './assets/icons/services3d/courses.png';
import scheduleImg from './assets/icons/services3d/schedule.png';
import finalImg from './assets/icons/services3d/final.png';
import cabinetImg from './assets/icons/services3d/cabinet.png';
import attendanceImg from './assets/icons/services3d/attendance.png';
import methodicalImg from './assets/icons/services3d/methodical.png';
import contestImg from './assets/icons/services3d/contest.png';
import libraryImg from './assets/icons/services3d/library.png';
import './quick.css';
import Conferences from './Conferences.jsx';
import { Carousels, ShowcaseCards } from './Showcase.jsx';
import RegionMap from './RegionMap.jsx';
import { NewsIcon, VoiceIcon, MapIcon, FilmIcon } from './RailIcons.jsx';

const quickLinks = [
  { icon: coursesImg, label: 'Kurslar', desc: 'Malaka oşiriş kurslari', href: '#kurslar' },
  { icon: scheduleImg, label: 'Dars jadvali', desc: 'Kurslar va darslar jadvali', href: '#dars-jadvali' },
  { icon: finalImg, label: 'Yakuniy nazorat', desc: 'Nazorat sinovlari va natijalar', href: '#yakuniy' },
  { icon: cabinetImg, label: 'Tinglovçi kabineti', desc: 'Şaxsiy kabinet va xizmatlar', href: '#kabinet' },
  { icon: attendanceImg, label: 'Davomat', desc: 'Davomat ma’lumotlari va hisobotlar', href: '#davomat' },
  { icon: methodicalImg, label: 'Metodik materiallar', desc: 'Öquv va metodik resurslar', href: '#metodik' },
  { icon: contestImg, label: 'Tanlov', desc: 'Tanlovlar va e’lonlar', href: '#tanlov' },
  { icon: libraryImg, label: 'Elektron kutubxona', desc: 'Elektron adabiyotlar va resurslar', href: '#kutubxona' },
];

// Full menu tree, mirrors the reference site's hamburger menu
const menuTree = [
  { label: 'Boş sahifa', href: '#top' },
  {
    label: 'Markaz',
    children: [
      { label: 'Markaz haqida', href: '#markaz' },
      { label: 'Rahbariyat', href: '#markaz' },
      { label: 'Tuzilma', href: '#tuzilma' },
      { label: 'Tinglovçilar turar joyi', href: '#markaz' },
      { label: 'Öquv xonalar', href: '#markaz' },
      { label: 'Böş iş örinlari', href: '#markaz' },
    ],
  },
  {
    label: 'Bölimlar',
    children: [
      'Inson resurslarini rivojlantiriş',
      'Moliya-iqtisod va buxgalteriya',
      'Axborot-resurs markazi',
      'Fanlarni rivojlantiriş',
      'Maktabgaça ta’limni muvofiqlaştiriş',
      'Ijro intizomi',
      'Raqamlaştiriş va sun’iy intellektni joriy etiş',
      'Ta’lim sifatini nazorat qiliş',
      'Uzluksiz kasbiy ta’limni taşkil etiş',
      'Akademik faoliyatni muvofiqlaştiriş',
      'Metodik xizmat körsatiş',
      'Matbuot kotibi',
      'Yuriskonsult',
    ].map((label) => ({ label, href: '#tuzilma' })),
  },
  {
    label: 'Kafedralar',
    children: [
      { label: 'Aniq, tabiiy fanlar, maktabgaça, boşlanğiç va maxsus ta’lim metodikasi kafedrasi', href: '#kurslar' },
      { label: 'Tillar, pedagogika va ijtimoiy-iqtisodiy fanlar metodikasi kafedrasi', href: '#kurslar' },
    ],
  },
  { label: 'Ta’lim xizmatlari', href: '#kurslar' },
  {
    label: 'Media resurslar',
    children: [
      { label: 'Yangiliklar', href: '#yangiliklar' },
      { label: 'Konferensiyalar', href: '#konferensiyalar' },
      { label: 'Brending', href: '#media' },
    ],
  },
  {
    label: 'Oçiq ma’lumotlar',
    children: [
      { label: 'Huquqiy normalar', href: '#hamkorlik' },
      { label: 'Oçiq tanlov', href: '#tanlov' },
      { label: 'Qabul jadvali', href: '#dars-jadvali' },
      { label: 'Korrupsiyaga qarşi kuraşiş', href: '#hamkorlik' },
    ],
  },
  { label: 'Tanlov', href: '#tanlov' },
  { label: 'Boğlaniş', href: '#boglanish' },
];

const tickerItems = [
  'Kurslar qabuli oçiq',
  'Yangi metodik materiallar joylandi',
  'Yakuniy nazorat jadvali e’lon qilindi',
  'Xalqaro konferensiya — tez orada',
];

const stats = [
  { icon: '📖', value: '120', label: 'Faol kurslar' },
  { icon: '👥', value: '5000+', label: 'Tinglovçilar' },
  { icon: '📄', value: '14+', label: 'Metodik resurslar' },
  { icon: '🌐', value: '10+', label: 'Xalqaro loyihalar' },
  { icon: '📚', value: '1500+', label: 'Elektron kitoblar' },
];

const departments = [
  [hrImg, 'Inson resurslarini rivojlantiriş'],
  [financeImg, 'Moliya-iqtisod va buxgalteriya'],
  [libraryImg2, 'Axborot-resurs markazi'],
  [scienceImg, 'Fanlarni rivojlantiriş'],
  [preschoolImg, 'Maktabgaça ta’limni muvofiqlaştiriş'],
  [digitalImg, 'Raqamli texnologiyalar va sun’iy intellekt'],
  [qualityImg, 'Ta’lim sifatini nazorat qiliş'],
  [methodicImg, 'Metodik xizmat körsatiş'],
];

const news = [
  { icon: '🌐', date: '26.10.2026', tag: 'Xalqaro hamkorlik', title: 'Gibrid ta’lim modellari: global tendensiyalar va milliy amaliyot' },
  { icon: '🧑‍🏫', date: '25.10.2026', tag: 'Seminar-trening', title: 'Kasbga yönaltirişning amaliy modeli' },
  { icon: '🌱', date: '24.10.2026', tag: 'Kasbiy rivojlaniş', title: 'Kasbiy yuksaliş — ta’lim ravnaqi' },
];

const quickResources = [
  { label: 'ARM tizimi', href: '#kabinet' },
  { label: 'Onlayn davomat', href: '#davomat' },
  { label: 'Metodik materiallar', href: '#metodik' },
  { label: 'Xalqaro hamkorlik', href: '#hamkorlik' },
  { label: 'Aloqa', href: '#boglanish' },
];

const courses = [
  ['Zamonaviy ta’lim texnologiyalari', 'Interfaol metodlar, loyihaviy va tanqidiy fikrlaşga yönaltirilgan ta’lim.'],
  ['Raqamli kompetensiya', 'Onlayn platformalar, interaktiv topşiriqlar va sun’iy intellekt vositalari.'],
  ['Malaka oşiriş kurslari', 'Fan öqituvçilari uçun sertifikatli malaka oşiriş dasturlari.'],
  ['Hard skills va soft skills', 'Muloqot, jamoada işlaş, vaqtni boşqariş va motivatsiya.'],
  ['Maktabgaça ta’lim', 'Tarbiyaçi va metodistlar uçun bolalar rivoji va öyin orqali öqitiş.'],
  ['Qayta tayyorlaş', 'Boşqa yönalişdan pedagogik faoliyatga ötuvçilar uçun dasturlar.'],
];

const courseIcons = [targetImg, codeImg, capImg, handshakeImg, bearImg, recycleImg];

const serviceList = [
  ['yakuniy', 'Yakuniy nazorat', 'Mustaqil iş himoyasi va test'],
  ['davomat', 'Onlayn davomat', 'Dars davomatini kuzatiş'],
  ['metodik', 'Metodik materiallar', 'Röyxatdan ötmasdan öqiş'],
  ['tanlov', 'Tanlovlar', '“Yil öqituvçisi” va boşqalar'],
  ['kutubxona', 'Elektron kutubxona', 'Minglab elektron resurslar'],
];

const videos = [
  ['Seminar-trening', 'Kasbiy rivojlaniş sari: mentorlik tajribasi'],
  ['Xalqaro hamkorlik', 'Xalqaro tajriba va yangi imkoniyatlar'],
  ['Dars jarayoni', 'Qiziqarli dars maşğulotlari'],
];

const partners = [
  ['https://president.uz', 'Özbekiston Prezidentining veb-sayti'],
  ['https://my.gov.uz', 'Yagona interaktiv davlat xizmatlari portali'],
  ['https://uzedu.uz', 'Maktabgaça va maktab ta’limi vazirligi'],
  ['https://avloniy.uz', 'A. Avloniy nomidagi milliy tadqiqot instituti'],
];

const faqs = [
  ['Markaz qayerda joylaşgan va qaçon işlaydi?', 'Toşkent viloyati, [şahar/tuman], [manzil]. Iş vaqti: duşanba — juma, 09:00 – 18:00.'],
  ['Markaz bilan qanday boğlansam böladi?', 'Telefon, e-poçta yoki «Boğlaniş» bölimidagi forma orqali murojaat qiling.'],
  ['Yakuniy nazorat qanday ötadi?', 'Yakuniy nazorat ikki bosqiçda ötadi: mustaqil iş himoyasi va test.'],
  ['Metodik materiallar va kitoblarni qayerdan olaman?', 'Metodik materiallar va elektron kutubxona kitoblarini röyxatdan ötmasdan öqiş mumkin.'],
];

function Brand({ light = false }) {
  return (
    <a className={`brand${light ? ' brand-light' : ''}`} href="#top" aria-label="Boş sahifa">
      <span className="brand-logo" aria-hidden="true"><img src={logoImg} alt="" /></span>
      <span className="brand-text">
        <span className="brand-top">Toşkent viloyati</span>
        <span className="brand-bottom">Pedagogik mahorat markazi</span>
      </span>
    </a>
  );
}

function MenuItem({ item, onNavigate }) {
  const [expanded, setExpanded] = useState(false);

  if (!item.children) {
    return <li><a href={item.href} onClick={onNavigate}>{item.label}</a></li>;
  }

  return (
    <li className="menu-group">
      <button type="button" className="menu-toggle" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
        {item.label}
        <span aria-hidden="true">{expanded ? '−' : '+'}</span>
      </button>
      {expanded && (
        <ul className="menu-sub">
          {item.children.map((child) => (
            <li key={child.label}><a href={child.href} onClick={onNavigate}>{child.label}</a></li>
          ))}
        </ul>
      )}
    </li>
  );
}

const markazLinks = [
  'Markaz haqida', 'Rahbariyat', 'Tuzilma', 'Tinglovçilar turar joyi', 'Öquv xonalar', 'Böş iş örinlari',
];
const bolimlarLinks = [
  'Inson resurslarini rivojlantiriş', 'Ta’lim sifatini nazorat qiliş', 'Moliya-iqtisod va buxgalteriya',
  'Uzluksiz kasbiy ta’limni taşkil etiş', 'Axborot-resurs markazi', 'Akademik faoliyatni muvofiqlaştiriş',
  'Fanlarni rivojlantiriş', 'Metodik xizmat körsatiş', 'Maktabgaça ta’limni muvofiqlaştiriş', 'Matbuot kotibi',
  'Ijro intizomi', 'Yuriskonsult', 'Raqamlaştiriş va sun’iy intellektni joriy etiş',
];
const kafedraLinks = [
  'Aniq, tabiiy fanlar, maktabgaça, boşlanğiç va maxsus ta’lim metodikasi kafedrasi',
  'Tillar, pedagogika va ijtimoiy-iqtisodiy fanlar metodikasi kafedrasi',
];

const topMenu = [
  { label: 'Boş sahifa', href: '#top' },
  {
    label: 'Markaz',
    href: '#markaz',
    mega: true,
    columns: [
      { title: null, items: markazLinks.map((t) => ({ label: t, href: '#markaz' })) },
      { title: 'Bölimlar', items: bolimlarLinks.map((t) => ({ label: t, href: '#tuzilma' })) },
      { title: 'Kafedralar', items: kafedraLinks.map((t) => ({ label: t, href: '#kurslar' })) },
    ],
  },
  { label: 'Ta’lim xizmatlari', href: '#kurslar' },
  {
    label: 'Media resurslar',
    href: '#media',
    children: [
      { label: 'Yangiliklar', href: '#yangiliklar' },
      { label: 'Konferensiyalar', href: '#konferensiyalar' },
      { label: 'Brending', href: '#media' },
    ],
  },
  {
    label: 'Oçiq ma’lumotlar',
    href: '#hamkorlik',
    children: [
      { label: 'Huquqiy normalar', href: '#hamkorlik' },
      { label: 'Oçiq tanlov', href: '#tanlov' },
      { label: 'Qabul jadvali', href: '#dars-jadvali' },
      { label: 'Korrupsiyaga qarşi kuraşiş', href: '#hamkorlik' },
    ],
  },
  { label: 'Tanlov', href: '#tanlov' },
  { label: 'Boğlaniş', href: '#boglanish' },
];

function TopNav() {
  const [openKey, setOpenKey] = useState(null);
  const navRef = useRef(null);

  // Close the open dropdown on outside click or Escape
  useEffect(() => {
    const onDown = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpenKey(null); };
    const onKey = (e) => { if (e.key === 'Escape') setOpenKey(null); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <nav className="top-nav" aria-label="Asosiy havolalar" ref={navRef}>
      <ul>
        {topMenu.map((item) => {
          const hasDrop = item.mega || item.children;
          const isOpen = openKey === item.label;
          return (
            <li
              key={item.label}
              className={`top-item${hasDrop ? ' has-drop' : ''}${isOpen ? ' is-open' : ''}`}
              onMouseEnter={() => hasDrop && setOpenKey(item.label)}
              onMouseLeave={() => hasDrop && setOpenKey(null)}
            >
              {hasDrop ? (
                <button
                  type="button"
                  className="top-link"
                  aria-expanded={isOpen}
                  onClick={() => setOpenKey(isOpen ? null : item.label)}
                >
                  {item.label}
                  <svg viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5 6 6.5 11 1.5" /></svg>
                </button>
              ) : (
                <a className="top-link" href={item.href}>{item.label}</a>
              )}

              {item.mega && isOpen && (
                <div className="mega">
                  {item.columns.map((col, ci) => (
                    <div className="mega-col" key={ci}>
                      {col.title && <h4><span />{col.title}</h4>}
                      <ul>
                        {col.items.map((link) => (
                          <li key={link.label}><a href={link.href} onClick={() => setOpenKey(null)}>{link.label}</a></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {item.children && isOpen && (
                <div className="drop">
                  {item.children.map((link) => (
                    <a href={link.href} key={link.label} onClick={() => setOpenKey(null)}>{link.label}</a>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const readPage = () => {
    if (!('speechSynthesis' in window)) return;
    const text = document.getElementById('main')?.innerText?.slice(0, 1500) || '';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };

  const focusSearch = () => {
    document.getElementById('quick-search')?.focus();
  };

  return (
    <>
      <header className="site-header" id="top">
        <div className="container header-inner">
          <Brand />

          <TopNav />

          <div className="header-tools">
            <button className="icon-btn" type="button" aria-label="Saytda qidiriş" onClick={focusSearch}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            </button>
            <button className="icon-btn" type="button" aria-label="Közi ojizlar uçun">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
            </button>
            <button className="icon-btn" type="button" aria-label="Sahifani ovoz çiqarib öqiş" onClick={readPage}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /></svg>
            </button>
            <button className="lang-btn" type="button" aria-label="Kirill yozuviga ötiş">ЎЗБ</button>
            <a className="btn btn-ghost btn-sm header-cta" href="#murojaat">Direktorga murojaat</a>
            <button
              className="menu-btn"
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Menyuni yopiş' : 'Menyuni oçiş'}
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" className={`menu-drawer${open ? ' open' : ''}`}>
        <div className="container menu-drawer-inner">
          <ul className="menu-tree">
            {menuTree.map((item) => (
              <MenuItem key={item.label} item={item} onNavigate={close} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function LeftRail() {
  return (
    <nav className="left-rail" aria-label="Sahifa bölimlari">
      <a href="#yangiliklar" aria-label="Yangiliklar" data-label="Yangiliklar"><NewsIcon /></a>
      <a href="#konferensiyalar" className="rail-voice" aria-label="Konferensiya" data-label="Konferensiya"><VoiceIcon /></a>
      <a href="#xarita" aria-label="Xarita" data-label="Xarita"><MapIcon /></a>
      <a href="#media" aria-label="Video lavhalar" data-label="Video lavhalar"><FilmIcon /></a>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <img className="hero-banner" src={heroBanner} alt="" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="eyebrow">Toşkent viloyati</p>
          <h1>PEDAGOGIK MAHORAT<br /><span className="accent">MARKAZI</span></h1>
          <p className="lead">Pedagoglarning kasbiy rivojlanişi, zamonaviy ta’lim texnologiyalari va metodik qöllab-quvvatlaş markazi.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#kurslar">Kurslarni köriş <span aria-hidden="true">&rarr;</span></a>
            <a className="btn btn-outline" href="#kabinet">Tinglovçi kabineti</a>
          </div>
          <ul className="hero-points">
            <li><span className="hp-icon" aria-hidden="true"><img src={pointCourses} alt="" /></span>Zamonaviy<br />kurslar</li>
            <li><span className="hp-icon" aria-hidden="true"><img src={pointStudents} alt="" /></span>Malaka oşiriş</li>
            <li><span className="hp-icon" aria-hidden="true"><img src={pointGrowth} alt="" /></span>Kasbiy<br />rivojlaniş</li>
          </ul>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-card">
            <HeroIllustration />
          </div>
          <div className="hero-mark">TPM</div>
          <p className="hero-callout">Ta’lim —<br />kelajak<br />kafolati!</p>
        </div>
      </div>
      <svg className="wave wave-bottom" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 80 C 320 20, 640 120, 960 60 S 1320 20, 1440 50 L1440 120 L0 120 Z" />
      </svg>
    </section>
  );
}

function QuickServices() {
  return (
    <section className="quick" aria-labelledby="quick-title">
      <div className="container">
        <div className="quick-box">
          <div className="quick-head">
          <div className="quick-title-block">
            <p className="kicker">Tezkor xizmatlar</p>
            <h2 id="quick-title">Tezkor xizmatlar</h2>
            <p className="quick-sub">Sizga kerakli bölgan asosiy bölimlar va xizmatlar</p>
          </div>
          <form className="quick-search" role="search" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="quick-search">Xizmat qidiriş</label>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input id="quick-search" type="search" placeholder="Kurs yoki xizmatni qidiring…" autoComplete="off" />
            <button type="submit" className="quick-submit">Qidiriş</button>
          </form>
          </div>
          <ul className="quick-links">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  <span className="ql-ico" aria-hidden="true"><img src={item.icon} alt="" /></span>
                  <span className="ql-title">{item.label}</span>
                  <span className="ql-desc">{item.desc}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="ticker" aria-label="E’lonlar">
      <div className="ticker-track">
        {items.map((text, i) => <span key={i}>{text}</span>)}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="stats" aria-label="Markaz körsatkiçlari">
      <div className="container stats-grid">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <span className="stat-ico" aria-hidden="true">{s.icon}</span>
            <div>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="markaz">
      <div className="container split">
        <div>
          <p className="kicker">Markaz haqida</p>
          <h2 className="h2">Ta’lim — kelajak kafolati</h2>
          <p>Toşkent viloyati pedagogik mahorat markazi viloyat ta’lim tizimi pedagoglarining kasbiy malakasini oşiriş va metodik xizmat körsatiş uçun taşkil etilgan.</p>
          <p>Markaz qoşida ta’lim sifatini nazorat qiliş, raqamli texnologiyalar va sun’iy intellektni joriy etiş hamda xalqaro hamkorlik yönalişlari faoliyat yuritadi.</p>
          <div className="btn-row">
            <a className="btn btn-primary" href="#markaz">Rahbariyat</a>
            <a className="btn btn-outline-dark" href="#tuzilma">Tuzilma</a>
          </div>
        </div>
        <ul className="dept-grid" id="tuzilma">
          {departments.map(([icon, label]) => (
            <li key={label}><a href="#markaz"><span className="dept-ico"><img src={icon} alt="" /></span>{label}</a></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function News() {
  return (
    <section className="section section-soft" id="yangiliklar">
      <div className="container news-layout">
        <div>
          <div className="section-head">
            <div>
              <p className="kicker">Yangiliklar</p>
              <h2 className="h2">Bugun markazda</h2>
            </div>
            <a className="link-more" href="#yangiliklar">Barça yangiliklar &rarr;</a>
          </div>
          <div className="news-grid">
            {news.map((n) => (
              <article className="card news-card" key={n.title}>
                <div className="news-thumb" aria-hidden="true">
                  <span>{n.icon}</span>
                  <time>{n.date}</time>
                </div>
                <div className="news-body">
                  <span className="tag">{n.tag}</span>
                  <h3><a href="#yangiliklar">{n.title}</a></h3>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="right-aside" aria-label="Tezkor havolalar">
          <div className="aside-card">
            <h3>Tezkor havolalar</h3>
            <ul>
              {quickResources.map((r) => (
                <li key={r.label}><a href={r.href}>{r.label} <span aria-hidden="true">&rarr;</span></a></li>
              ))}
            </ul>
          </div>
          <a className="aside-banner" href="https://www.youtube.com/" target="_blank" rel="noopener">
            <span className="aside-banner-tag">Video darslar</span>
            <strong>MAHORAT 360</strong>
            <span>Pedagoglar uçun video darslar</span>
          </a>
        </aside>
      </div>
    </section>
  );
}

function Courses() {
  return (
    <section className="section" id="kurslar">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="kicker">Ta’lim yönalişlari</p>
            <h2 className="h2">Kurslar</h2>
          </div>
          <a className="link-more" href="#kurslar">Barça kurslar &rarr;</a>
        </div>
        <div className="course-grid">
          {courses.map(([title, text], i) => (
            <a className="course" href="#kurslar" key={title}>
              <span className="course-ico" aria-hidden="true">
                <img src={courseIcons[i]} alt="" />
              </span>
              <span className="course-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="course-go">Batafsil &rarr;</span>
            </a>
          ))}
        </div>

        <div className="cta-band" id="kabinet">
          <div>
            <h3>Tinglovçi kabineti</h3>
            <p>Kurslarga yoziliş, dars jadvali, davomat va yakuniy nazorat natijalarini şu yerda kuzating.</p>
          </div>
          <a className="btn btn-primary" href="#kabinet">Kabinetga kiriş</a>
        </div>

        <ul className="service-list" id="dars-jadvali">
          {serviceList.map(([id, title, text]) => (
            <li id={id} key={id}><strong>{title}</strong><span>{text}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Media() {
  return (
    <section className="section" id="media">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="kicker">Media resurslar</p>
            <h2 className="h2">Video lavhalar</h2>
            <p className="muted">Markaz faoliyati, tadbirlar va ta’lim jarayonlaridan videolavhalar.</p>
          </div>
          <a className="link-more" href="https://www.youtube.com/" target="_blank" rel="noopener">Barça videolar &rarr;</a>
        </div>
        <div className="video-grid">
          {videos.map(([tag, title]) => (
            <a className="video" href="https://www.youtube.com/" target="_blank" rel="noopener" key={title}>
              <span className="video-thumb"><span className="play" aria-hidden="true" /></span>
              <span className="video-meta"><small>{tag}</small><strong>{title}</strong></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section className="section section-soft" id="hamkorlik">
      <div className="container">
        <p className="kicker center">Hamkor taşkilotlar</p>
        <ul className="partners">
          {partners.map(([href, label]) => (
            <li key={href}><a href={href} target="_blank" rel="noopener">{label}</a></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section" id="boglanish">
      <div className="container contact-grid">
        <div className="contact-card">
          <p className="kicker">Boğlaniş</p>
          <h2 className="h2">Toşkent viloyati pedagogik mahorat markazi</h2>
          <dl className="contact-list">
            <div><dt>Manzil</dt><dd>Toşkent viloyati, [şahar/tuman], [köça, uy]</dd></div>
            <div><dt>Telefon</dt><dd><a href="tel:+998000000000">+998 __ ___-__-__</a></dd></div>
            <div><dt>E-poçta</dt><dd><a href="mailto:info@pedagogika.uz">info@pedagogika.uz</a></dd></div>
            <div><dt>Iş vaqti</dt><dd>Duşanba — Juma, 09:00 – 18:00</dd></div>
          </dl>
          <a className="btn btn-primary" href="#murojaat">Direktorga murojaat</a>
        </div>
        <div className="map-card" aria-label="Xarita örni">
          <div>
            <div className="map-pin" aria-hidden="true">📍</div>
            <p>Xaritada köriş uçun manzilni kiriting</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Appeal() {
  const submit = (e) => {
    e.preventDefault();
    e.target.reset();
    alert('Murojaatingiz qabul qilindi. Rahmat!');
  };

  return (
    <section className="section section-soft" id="murojaat">
      <div className="container narrow">
        <p className="kicker center">Direktorga murojaat</p>
        <h2 className="h2 center">Savol yoki taklifingizni yuboring</h2>
        <form className="appeal-form" onSubmit={submit}>
          <div className="form-row">
            <label>F.I.Ş.<input type="text" name="name" required /></label>
            <label>Telefon<input type="tel" name="phone" placeholder="+998" required /></label>
          </div>
          <label>Murojaat matni<textarea name="message" rows="5" required /></label>
          <button className="btn btn-primary" type="submit">Yuboriş</button>
        </form>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section">
      <div className="container narrow">
        <p className="kicker center">Savol-javoblar</p>
        <h2 className="h2 center">Köp söraladigan savollar</h2>
        <div className="faq">
          {faqs.map(([q, a], i) => (
            <details open={i === 0} key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const subscribe = (e) => {
    e.preventDefault();
    e.target.reset();
    alert('Obuna qabul qilindi.');
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Brand light />
          <p className="footer-quote">Tarbiya biz uçun yo hayot — yo mamot, yo najot — yo halokat, yo saodat — yo falokat masalasidir.</p>
          <div className="socials">
            <a href="https://t.me/" aria-label="Telegram" title="Telegram">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.5 4.5 2.8 11.7c-.8.3-.8 1.4 0 1.7l4.6 1.5 1.8 5.6c.2.6.9.8 1.4.4l2.6-2.1 4.6 3.4c.6.4 1.4.1 1.6-.6L23 5.7c.2-.9-.6-1.5-1.5-1.2z" /></svg>
            </a>
            <a href="https://www.youtube.com/" aria-label="YouTube" title="YouTube">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="4" /><path d="M10 9.2v5.6l4.8-2.8z" /></svg>
            </a>
            <a href="https://www.facebook.com/" aria-label="Facebook" title="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h2.5V4.5H14c-2.5 0-4 1.6-4 4.2V11H7.5v3.5H10V21h3.5v-6.5h2.6l.4-3.5h-3V8.6c0-.4.2-.6.6-.6z" /></svg>
            </a>
            <a href="https://www.instagram.com/" aria-label="Instagram" title="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r="1" /></svg>
            </a>
          </div>
        </div>

        <div>
          <h4>Asosiy</h4>
          <ul>
            <li><a href="#top">Boş sahifa</a></li>
            <li><a href="#markaz">Markaz haqida</a></li>
            <li><a href="#markaz">Rahbariyat</a></li>
            <li><a href="#boglanish">Boğlaniş</a></li>
            <li><a href="#murojaat">Direktorga murojaat</a></li>
          </ul>
          <h4 className="footer-sub">Bölimlar</h4>
          <ul>
            <li><a href="#tuzilma">Ta’lim</a></li>
            <li><a href="#markaz">Kasbiy rivojlaniş</a></li>
            <li><a href="#yangiliklar">Yangiliklar</a></li>
            <li><a href="#konferensiyalar">Konferensiyalar</a></li>
          </ul>
        </div>

        <div>
          <h4>Öquv jarayoni</h4>
          <ul>
            <li><a href="#kurslar">Kurslar</a></li>
            <li><a href="#dars-jadvali">Dars jadvali</a></li>
            <li><a href="#davomat">Onlayn davomat</a></li>
            <li><a href="#yakuniy">Yakuniy nazorat</a></li>
            <li><a href="#kabinet">Tinglovçi kabineti</a></li>
          </ul>
          <h4 className="footer-sub">Resurslar</h4>
          <ul>
            <li><a href="#kabinet">ARM</a></li>
            <li><a href="#kutubxona">Elektron kutubxona</a></li>
            <li><a href="#metodik">Metodik materiallar</a></li>
            <li><a href="#hamkorlik">Oçiq ma’lumotlar</a></li>
            <li><a href="#media">Brending</a></li>
          </ul>
        </div>

        <div>
          <h4>Boğlaniş</h4>
          <ul className="footer-contacts">
            <li>Toşkent viloyati, [şahar/tuman], [manzil]</li>
            <li><a href="tel:+998000000000">+998 __ ___-__-__</a></li>
            <li><a href="mailto:info@pedagogika.uz">info@pedagogika.uz</a></li>
          </ul>
          <h4 className="footer-sub">Yangiliklardan xabardor böling</h4>
          <form className="subscribe" onSubmit={subscribe}>
            <label className="sr-only" htmlFor="sub-email">Elektron poçta</label>
            <input id="sub-email" type="email" placeholder="Email manzilingiz" required />
            <button className="btn btn-gold btn-sm" type="submit">Obuna böliş</button>
          </form>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 Toşkent viloyati pedagogik mahorat markazi. Barça huquqlar himoyalangan.</p>
        <p><a href="#top">Sayt xaritasi</a> · <a href="#top">Maxfiylik siyosati</a></p>
      </div>
    </footer>
  );
}

// Sahifa tuzilmasi: bo‘limlar tartibi shu yerda belgilanadi (hero: rasmli banner, o‘ng tomonda; tagline va ticker olib tashlandi; ikonlar yangilandi; yuqoriga tugmasi)
// “Yuqoriga” tugmasi: sahifa pastga aylantirilganda chiqadi, bosilganda tepaga qaytaradi
function ToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`to-top${visible ? ' is-visible' : ''}`}
      aria-label="Yuqoriga"
      title="Yuqoriga"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Asosiy mazmunga ötiş</a>
      <Header />
      <LeftRail />
      <main id="main">
        <Hero />
        <QuickServices />
        <Stats />
        <Carousels />
        <About />
        <News />
        <Courses />
        <ShowcaseCards />
        <Conferences />
        <RegionMap />
        <Media />
        <Partners />
        <Contact />
        <Appeal />
        <Faq />
      </main>
      <Footer />
      <ToTop />
      <nav className="mobile-bar" aria-label="Tezkor tugmalar">
        <a href="#kurslar" aria-label="Kurslar">📚</a>
        <a href="#kabinet" aria-label="Kabinet">👤</a>
        <a href="#boglanish" aria-label="Boğlaniş">📍</a>
      </nav>
    </>
  );
}
