import { useRef } from 'react';
import './showcase.css';
import studyIcon from './assets/icons/showcase/study.png';
import toolsIcon from './assets/icons/showcase/tools.png';
import aiLabIcon from './assets/icons/innovation/ailab.png';
import vrArIcon from './assets/icons/innovation/vrar.png';
import digitalIcon from './assets/icons/innovation/digital.png';
import mediaIcon from './assets/icons/innovation/media.png';

const summerCards = [
  { day: '16', month: 'IYUL', year: '2025', weekday: 'Çorşanba', tag: 'Ta’tilda ta’lim', title: 'Ta’tilda ta’lim: 2 daqiqada öquvçilar e’tiborini özingizga qarating — 5 ta usul', bg: 'a' },
  { day: '16', month: 'IYUL', year: '2025', weekday: 'Çorşanba', tag: 'Ta’tilda ta’lim', title: 'Uy şaroitida uzuk uçun barmoq ölçamini aniqlaş', bg: 'b' },
  { day: '23', month: 'IYUL', year: '2025', weekday: 'Çorşanba', tag: 'Ta’tilda ta’lim', title: 'Learning app platformasi bilan darslarni qiziqarli qiling', bg: 'c' },
  { day: '30', month: 'IYUL', year: '2025', weekday: 'Çorşanba', tag: 'Ta’tilda ta’lim', title: 'Neyrogimnastika: miya uçun maşqlar', bg: 'd' },
];

const hardSkillCards = [
  { day: '27', month: 'OKTABR', year: '2026', weekday: 'Seşanba', tag: 'Hardskills', title: 'Bu metodni boşqa fanlarda ham qöllaş mumkin! Noodles metodi', bg: 'e' },
  { day: '20', month: 'OKTABR', year: '2026', weekday: 'Seşanba', tag: 'Hardskills', title: '“Kim çaqqon” metodi', bg: 'f' },
  { day: '10', month: 'OKTABR', year: '2026', weekday: 'Sirdaryo', tag: 'Hardskills', title: 'Nega bir xil şaroitda kimdir omadli, kimdir yöq?', bg: 'g' },
];

const partnerCountries = [
  ['🇹🇷', 'Turkiya', 'Nitsa'],
  ['🇦🇿', 'Ozarbayjon', 'Davlat Pedagogika Universitetining Quba filiali'],
  ['🇫🇷', 'Fransiya', 'Francophonia'],
  ['🌍', 'Xalqaro sammit', 'EURIE 2026 Summit'],
  ['🇹🇯', 'Tojikiston', 'Duşanba'],
  ['🇬🇧', 'Buyuk Britaniya', 'CPD_HUB'],
];

function Carousel({ title, subtitle, accent, cards, icon }) {
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <div className={`carousel carousel-${accent}`}>
      <header className="carousel-head">
        <div className="carousel-title">
          <span className="carousel-ico" aria-hidden="true"><img src={icon} alt="" /></span>
          <div>
            <p className="carousel-kicker">{subtitle.kicker}</p>
            <h3>{title}</h3>
            <p className="carousel-sub">{subtitle.text}</p>
          </div>
        </div>
        <a className="carousel-more" href="#media">Barçasi <span aria-hidden="true">&rarr;</span></a>
      </header>

      <div className="carousel-track" ref={trackRef}>
        {cards.map((c) => (
          <article className={`video-card vc-${c.bg}`} key={c.title + c.day}>
            <div className="vc-badge">
              <strong>{c.day}</strong>
              <span>{c.month}</span>
              <small>{c.year}</small>
            </div>
            <span className="vc-weekday">📅 {c.weekday}</span>
            <div className="vc-body">
              <span className="vc-tag">{c.tag}</span>
              <h4>{c.title}</h4>
            </div>
            <button type="button" className="vc-play" aria-label="Videoni oçiş">▶</button>
          </article>
        ))}
      </div>

      <div className="carousel-nav">
        <button type="button" aria-label="Oldingi" onClick={() => scrollBy(-1)}>‹</button>
        <span className="carousel-dots" aria-hidden="true">
          <i className="on" /><i /><i /><i />
        </span>
        <button type="button" aria-label="Keyingi" onClick={() => scrollBy(1)}>›</button>
      </div>
    </div>
  );
}

export function Carousels() {
  return (
    <section className="section carousels" aria-label="Ta’lim va konikmalar">
      <div className="container carousel-pair">
        <Carousel
          accent="blue"
          icon={studyIcon}
          title="Ta’tilda ta’lim"
          subtitle={{ kicker: 'Bilim — eng yaxşi investitsiya', text: 'Ta’til davrida pedagoglar uçun qisqa muddatli dasturlar' }}
          cards={summerCards}
        />
        <Carousel
          accent="gold"
          icon={toolsIcon}
          title="Hard skills"
          subtitle={{ kicker: 'Könikma — kelajak kaliti', text: 'Pedagoglar uçun amaliy könikma video darslari' }}
          cards={hardSkillCards}
        />
      </div>
    </section>
  );
}

export function ShowcaseCards() {
  return (
    <section className="section section-soft showcase" aria-label="Hamkorlik, kutubxona va innovatsiya">
      <div className="container showcase-grid">
        <article className="show-card">
          <h3><span className="show-line" aria-hidden="true" />Global Education Network</h3>
          <p className="muted">Xalqaro hamkorlik — yangi imkoniyatlar</p>
          <ul className="partner-grid">
            {partnerCountries.map(([flag, name, desc]) => (
              <li key={name}>
                <span className="flag" aria-hidden="true">{flag}</span>
                <div>
                  <strong>{name}</strong>
                  <small>{desc}</small>
                </div>
              </li>
            ))}
          </ul>
          <a className="show-link" href="#hamkorlik">Hamkorlar haqida <span aria-hidden="true">&rarr;</span></a>
        </article>

        <article className="show-card show-library">
          <h3>Elektron kutubxona</h3>
          <p className="muted">Bilim — eng katta boylik</p>
          <p className="library-count">1 000+</p>
          <p className="muted">Elektron resurslar</p>
          <div className="library-img" aria-hidden="true">📚</div>
          <a className="show-link" href="#kutubxona">Kutubxonaga kiriş <span aria-hidden="true">&nearr;</span></a>
        </article>

        <article className="show-card show-dark">
          <span className="show-badge">Innovatsiya</span>
          <h3>Kelajak markazi</h3>
          <p>Innovatsiyalar bilan ta’lim kelajagi</p>
          <ul className="future-grid">
            <li><span className="future-ico" aria-hidden="true"><img src={aiLabIcon} alt="" /></span>AI LAB</li>
            <li><span className="future-ico" aria-hidden="true"><img src={vrArIcon} alt="" /></span>VR / AR</li>
            <li><span className="future-ico" aria-hidden="true"><img src={digitalIcon} alt="" /></span>Digital Education</li>
            <li><span className="future-ico" aria-hidden="true"><img src={mediaIcon} alt="" /></span>Media Lab</li>
          </ul>
          <a className="future-link" href="#markaz">Markaz haqida <span aria-hidden="true">&rarr;</span></a>
        </article>
      </div>
    </section>
  );
}
