import { useEffect, useState } from 'react';
import './conferences.css';
import peopleIcon from './assets/icons/conference/people.png';
import micIcon from './assets/icons/conference/mic.png';
import puzzleIcon from './assets/icons/conference/puzzle.png';
import bookIcon from './assets/icons/conference/book.png';
import calendarIcon from './assets/icons/calendar/calendar.png';
import capIcon from './assets/icons/courses/cap.png';
import studyIcon from './assets/icons/showcase/study.png';
import handshakeIcon from './assets/icons/courses/handshake.png';

const slides = [
  { title: 'Gibrid ta’lim modellari:', sub: 'global tendensiyalar va milliy amaliyot', year: '2026 yil', hue: 'blue' },
  { title: 'Xalqaro ilmiy-amaliy', sub: 'konferensiya — ilğor tajriba', year: '2026 yil', hue: 'navy' },
  { title: 'Kasbiy rivojlaniş', sub: 'va mentorlik tajribasi', year: '2026 yil', hue: 'gold' },
  { title: 'Raqamli ta’lim', sub: 'sun’iy intellekt va yangi metodlar', year: '2026 yil', hue: 'blue' },
];

const upcoming = [
  { day: '26', month: 'OKT', year: '2026', title: 'Gibrid ta’lim modellari: global tendensiyalar va milliy amaliyot', time: '09:00 – 13:00', icon: bookIcon, featured: true },
  { day: '21', month: 'APR', year: '2026', title: 'Xalqaro ilmiy-amaliy konferensiya — 21 aprel 2026-yil', time: '14:00', icon: capIcon },
  { day: '12', month: 'MART', year: '2026', title: 'Xalqaro ilmiy-amaliy konferensiya — 12 mart 2026-yil', time: '09:00 – 13:00', icon: studyIcon },
  { day: '17', month: 'APR', year: '2025', title: 'Xalqaro ilmiy-amaliy konferensiya — 17 aprel 2025-yil', time: '09:00 – 13:00', icon: handshakeIcon },
];

const confStats = [
  { icon: peopleIcon, value: '10+', label: 'xalqaro konferensiya' },
  { icon: micIcon, value: '2000+', label: 'ishtirokchi' },
  { icon: puzzleIcon, value: '6+', label: 'jami soni' },
  { icon: bookIcon, value: '9 ta', label: 'xalqaro baza' },
];

export default function Conferences() {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 6000);
    return () => clearInterval(id);
  }, [total]);

  const go = (step) => setIndex((i) => (i + step + total) % total);
  const slide = slides[index];

  return (
    <section className="section section-soft conf-section" id="konferensiyalar">
      <div className="container conf-grid">
        <article className="conf-info">
          <p className="kicker">Konferensiyalar</p>
          <h2 className="h2">Ilm, tajriba va innovatsiyalar <span className="accent-text">uçraşuvi</span></h2>
          <p className="muted">Markazda ötkaziladigan konferensiyalar va xalqaro forumlar — pedagoglar uçun yangi imkoniyatlar va ilğor tajribalar maydoni.</p>

          <ul className="conf-stats">
            {confStats.map((s) => (
              <li key={s.label}>
                <span className="conf-stat-ico" aria-hidden="true"><img src={s.icon} alt="" /></span>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>

          <a className="btn btn-navy" href="#konferensiyalar">Barça konferensiyalar <span aria-hidden="true">&rarr;</span></a>
        </article>

        <div className={`conf-slider conf-${slide.hue}`} role="region" aria-roledescription="karusel" aria-label="Konferensiyalar slayderi">
          <div className="conf-slide-body">
            <span className="conf-slide-line" aria-hidden="true" />
            <h3>{slide.title}</h3>
            <p>{slide.sub}</p>
            <span className="conf-slide-year"><img src={calendarIcon} alt="" /> {slide.year}</span>
          </div>

          <div className="conf-slide-controls">
            <button type="button" aria-label="Oldingi" onClick={() => go(-1)}>‹</button>
            <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
            <button type="button" aria-label="Keyingi" onClick={() => go(1)}>›</button>
          </div>

          <div className="conf-slide-icons" aria-hidden="true">
            <span>🌍</span><span>💻</span><span>👥</span><span>🎓</span>
          </div>
        </div>

        <article className="conf-list-card">
          <header className="conf-list-head">
            <h3>Sönggi konferensiyalar</h3>
            <a href="#konferensiyalar">Barçasi &rarr;</a>
          </header>
          <ul>
            {upcoming.map((c) => (
              <li key={c.title + c.day + c.year} className={c.featured ? 'is-featured' : ''}>
                <div className="conf-date-badge">
                  <strong>{c.day}</strong>
                  <span>{c.month}</span>
                  <small>{c.year}</small>
                </div>
                <div className="conf-item-body">
                  <h4><a href="#konferensiyalar">{c.title}</a></h4>
                  <p>📍 Toşkent viloyati pedagogik mahorat markazi</p>
                  <p>🕘 {c.time}</p>
                </div>
                <div className="conf-thumb" aria-hidden="true"><img src={c.icon} alt="" /></div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
