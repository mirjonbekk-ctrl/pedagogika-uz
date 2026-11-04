import { useEffect, useRef, useState } from 'react';
import { regions } from './regions.js';
import mapSvg from './assets/uzbekistan-regions.svg?raw';
import logoImg from './assets/logo.png';
import './region.css';

// SVG path id -> our region id
const svgToRegion = {
  andijan: 'andijon',
  bukhara: 'buxoro',
  fergana: 'fargona',
  jizzakh: 'jizzax',
  namangan: 'namangan',
  navoiy: 'navoiy',
  qashqadaryo: 'qashqadaryo',
  karakalpakstan: 'qoraqalpogiston',
  samarqand: 'samarqand',
  sirdaryo: 'sirdaryo',
  surxondaryo: 'surxondaryo',
  xorazm: 'xorazm',
};

export default function RegionMap() {
  const own = regions.find((r) => r.isOwn) ?? regions[0];
  const [selectedId, setSelectedId] = useState(own.id);
  const selected = regions.find((r) => r.id === selectedId) ?? own;
  const mapRef = useRef(null);

  // Wire up the SVG paths once: map ids, pick the two "tashkent" paths by size, add click handlers
  useEffect(() => {
    const svg = mapRef.current?.querySelector('svg');
    if (!svg) return;

    const tashkentPaths = [...svg.querySelectorAll('path#tashkent')];
    const areas = tashkentPaths.map((p) => {
      const b = p.getBBox();
      return b.width * b.height;
    });
    const smaller = areas.indexOf(Math.min(...areas));

    const handlers = [];
    svg.querySelectorAll('path').forEach((path) => {
      let regionId = svgToRegion[path.id];
      if (path.id === 'tashkent') {
        const i = tashkentPaths.indexOf(path);
        regionId = i === smaller ? 'toshkent-shahar' : 'toshkent-viloyati';
      }
      if (!regionId) return;

      path.dataset.region = regionId;
      path.setAttribute('role', 'button');
      path.setAttribute('tabindex', '0');
      const label = regions.find((r) => r.id === regionId)?.name ?? regionId;
      path.setAttribute('aria-label', label);

      const select = () => setSelectedId(regionId);
      const onKey = (e) => { if (e.key === 'Enter' || e.key === ' ') select(); };
      path.addEventListener('click', select);
      path.addEventListener('keydown', onKey);
      handlers.push([path, select, onKey]);
    });

    return () => handlers.forEach(([p, s, k]) => {
      p.removeEventListener('click', s);
      p.removeEventListener('keydown', k);
    });
  }, []);

  // Highlight the selected region on the map
  useEffect(() => {
    const svg = mapRef.current?.querySelector('svg');
    if (!svg) return;
    svg.querySelectorAll('path[data-region]').forEach((p) => {
      const on = p.dataset.region === selectedId;
      p.classList.toggle('is-active', on);
      p.classList.toggle('is-own', p.dataset.region === own.id);
    });
  }, [selectedId, own.id]);

  const initials = selected.director
    .split(' ')
    .filter((w) => /^[A-ZА-ЯЎҚҒҲ]/u.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('') || '?';

  return (
    <section className="section section-navy region-section" id="xarita">
      <div className="container">
        <header className="region-head">
          <div className="region-brand">
            <span className="region-logo" aria-hidden="true"><img src={logoImg} alt="" /></span>
            <div>
              <strong>Toşkent viloyati</strong>
              <span>Pedagogik mahorat markazi</span>
            </div>
          </div>
          <p>Xaritadan viloyatni tanlang — markaz ma’lumotlari çiqadi.</p>
        </header>

        <h2 className="region-title">
          {selected.center.split('mahorat').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="accent-text">mahorat</span>}
            </span>
          ))}
        </h2>

        <div className="region-layout">
          <div className="region-detail">
            <div className="region-photo" aria-hidden="true">
              <span>{initials}</span>
            </div>
            <div className="region-info">
              <p className="region-role">Markaz direktori</p>
              <h3>{selected.director}</h3>
              <dl>
                <div><dt>Markaz</dt><dd>{selected.center}</dd></div>
                <div><dt>Manzil</dt><dd>{selected.address}</dd></div>
                <div><dt>Telefon</dt><dd>{selected.phone}</dd></div>
                <div><dt>Sayt</dt><dd>{selected.site}</dd></div>
              </dl>
              <a className="btn btn-primary" href="#murojaat">Taşrif buyuriş →</a>
            </div>
          </div>

          <div className="region-map-wrap">
            <div className="region-svg" ref={mapRef} dangerouslySetInnerHTML={{ __html: mapSvg }} />
            <p className="region-credit">
              Xarita: <a href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/uzbekistan" target="_blank" rel="noopener">@svg-maps/uzbekistan</a> (CC BY 4.0), muallif Abduvali Mamajonov
            </p>
          </div>

          <aside className="region-stats">
            <div className="region-stat-head">
              <span className="region-stat-ico" aria-hidden="true">📍</span>
              <div>
                <small>Viloyat</small>
                <strong>{selected.name}</strong>
              </div>
            </div>
            <div className="region-stat"><span aria-hidden="true">🏢</span><div><small>Tumanlar soni</small><strong>{selected.districts}</strong></div></div>
            <div className="region-stat"><span aria-hidden="true">👥</span><div><small>Aholi soni</small><strong>{selected.population}</strong></div></div>
            <div className="region-stat"><span aria-hidden="true">🗺️</span><div><small>Maydoni</small><strong>{selected.area}</strong></div></div>
          </aside>
        </div>

        <div className="region-chips">
          {regions.map((r) => (
            <button
              type="button"
              key={r.id}
              className={`region-chip${r.id === selectedId ? ' is-active' : ''}`}
              onClick={() => setSelectedId(r.id)}
              aria-pressed={r.id === selectedId}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
