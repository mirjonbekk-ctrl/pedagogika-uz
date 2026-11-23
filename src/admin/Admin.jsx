import { useEffect, useState } from 'react'
import './admin.css'
import Login from './Login.jsx'
import { supabase, supabaseReady, fetchRole, ROLE_LABEL } from './supabase.js'

/* ---------- Icons (inline, stroke-based) ---------- */
const paths = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  news: (<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 8h10M7 12h10M7 16h6" /></>),
  banner: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m8 15 3-3 2 2 2-2 3 3" /></>),
  grid: (<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>),
  school: (<><path d="m2 9 10-5 10 5-10 5z" /><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></>),
  calendar: (<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  users: (<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" /></>),
  book: (<><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 5v16" /></>),
  layers: (<><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></>),
  award: (<><circle cx="12" cy="9" r="6" /><path d="m9 14-2 7 5-3 5 3-2-7" /></>),
  image: (<><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 16-5-5-8 8" /></>),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>),
  chart: (<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>),
  settings: (<><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" /></>),
  bell: (<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8" /><path d="M10 20a2 2 0 0 0 4 0" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>),
  plus: <path d="M12 5v14M5 12h14" />,
  eye: (<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>),
  edit: (<><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>),
  trash: (<><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></>),
  check: <path d="m5 12 5 5 9-10" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  pin: (<><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>),
  play: (<><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4z" /></>),
  pause: (<><circle cx="12" cy="12" r="9" /><path d="M10 9v6M14 9v6" /></>),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  up: <path d="m6 15 6-6 6 6" />,
  down: <path d="m6 9 6 6 6-6" />,
}

function Icon({ name, size = 18 }) {
  return (
    <svg className="ic" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

/* ---------- Sample data (namuna, real ma’lumot emas) ---------- */
const nav = [
  { id: 'dash', label: 'Boshqaruv paneli', icon: 'home' },
  {
    id: 'content', label: 'Kontent boshqaruvi', icon: 'news', children: [
      { id: 'news', label: 'Yangiliklar' },
      { id: 'banners', label: 'Bannerlar / Slider' },
      { id: 'quick', label: 'Tezkor xizmatlar' },
      { id: 'today', label: 'Bugun SPMM’da' },
    ],
  },
  {
    id: 'edu', label: 'Ta’lim jarayoni', icon: 'school', children: [
      { id: 'courses', label: 'Kurslar' },
      { id: 'schedule', label: 'Dars jadvali' },
      { id: 'final', label: 'Yakuniy nazorat' },
      { id: 'learners', label: 'Tinglovchilar' },
      { id: 'attendance', label: 'Davomat' },
      { id: 'certs', label: 'Sertifikatlar' },
    ],
  },
  { id: 'res', label: 'Resurslar', icon: 'book' },
  { id: 'media', label: 'Media', icon: 'image' },
  { id: 'events', label: 'Tadbirlar', icon: 'calendar' },
  { id: 'partners', label: 'Hamkorlik', icon: 'users' },
  { id: 'center', label: 'Markaz haqida', icon: 'pin' },
  { id: 'msgs', label: 'Murojaatlar', icon: 'mail', badge: 12 },
  { id: 'stats', label: 'Statistika va hisobotlar', icon: 'chart' },
  { id: 'seo', label: 'SEO va sayt sozlamalari', icon: 'settings', only: ['super_admin'] },
  { id: 'roles', label: 'Foydalanuvchilar va rollar', icon: 'users', only: ['super_admin'] },
  { id: 'system', label: 'Tizim sozlamalari', icon: 'settings', only: ['super_admin'] },
]

const kpis = [
  { label: 'Tinglovchilar', value: '5 000+', delta: '+12%', icon: 'users' },
  { label: 'Faol kurslar', value: '120', delta: '+8%', icon: 'school' },
  { label: 'Metodik resurslar', value: '14+', delta: '+5%', icon: 'layers' },
  { label: 'Ta’lim xizmatlari', value: '10+', delta: '+2%', icon: 'award' },
  { label: 'Elektron kutubxona', value: '1 500+', delta: '+18%', icon: 'book' },
]

const learners = [
  ['Iyun', 1000], ['Iyul', 1500], ['Avgust', 2300], ['Sentabr', 2900], ['Oktabr', 3500], ['Noyabr', 5000],
]

const programs = [
  { label: 'Umumkasbiy', value: 42, color: '#16314f' },
  { label: 'Maxsus fanlar', value: 28, color: '#1d5fa7' },
  { label: 'Raqamli kompetensiya', value: 18, color: '#4f9cd9' },
  { label: 'Malaka oshirish', value: 16, color: '#d4a93f' },
  { label: 'Boshqa', value: 16, color: '#c9d3df' },
]

const traffic = [14, 16, 13, 18, 17, 21, 19, 22, 20, 24, 23, 26, 25, 28, 27, 30, 29, 31, 28, 33, 35, 34, 37, 36, 39, 38, 41, 40, 43, 45]

const news = [
  { title: 'Xalqaro ilmiy-amaliy konferensiya bo‘lib o‘tdi', date: '21-noyabr, 2026', views: 264, status: 'E’lon qilingan' },
  { title: '“Yil o‘qituvchisi” tanlovi viloyat bosqichi', date: '17-noyabr, 2026', views: 263, status: 'E’lon qilingan' },
  { title: 'Raqamli kompetensiya bo‘yicha yangi kurslar', date: '12-noyabr, 2026', views: 198, status: 'Qoralama' },
]

const messages = [
  { name: 'Aliyev Bekzod', text: 'Kursga ro‘yxatdan o‘tish bo‘yicha savol', time: 'Bugun, 09:24', initial: 'A', tone: 'blue' },
  { name: 'Safarova Dilnoza', text: 'Sertifikat olish tartibi haqida', time: 'Kecha, 17:36', initial: 'S', tone: 'violet' },
  { name: 'Karimov Aziz', text: 'Dars jadvalini aniqlashtirish', time: 'Kecha, 14:10', initial: 'K', tone: 'amber' },
]

const events = [
  { day: '27', month: 'NOY', title: 'Metodik mahorat kuni', time: '10:00', place: 'Konferensiya zali' },
  { day: '29', month: 'NOY', title: 'Xalqaro hamkorlik forumi', time: '14:00', place: 'Asosiy bino' },
  { day: '05', month: 'DEK', title: 'Raqamli ta’lim: yangi imkoniyatlar', time: '10:00', place: 'Onlayn (Zoom)' },
]

const courseStatus = [
  { label: 'Faol kurslar', value: 120, icon: 'play', tone: 'green' },
  { label: 'Jarayondagi kurslar', value: 34, icon: 'pause', tone: 'gold' },
  { label: 'Yakunlangan kurslar', value: 286, icon: 'check', tone: 'blue' },
  { label: 'Rejalashtirilgan kurslar', value: 18, icon: 'calendar', tone: 'navy' },
]

/* ---------- Charts ---------- */
function BarChart() {
  const W = 560, H = 230, top = 20, bottom = 30, max = 5000
  const innerH = H - top - bottom
  const step = W / learners.length
  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Oylik tinglovchilar dinamikasi">
      <title>Oylik tinglovchilar dinamikasi</title>
      {[0, 1000, 2000, 3000, 4000, 5000].map((v) => {
        const y = top + innerH - (v / max) * innerH
        return (
          <g key={v}>
            <line x1="36" x2={W} y1={y} y2={y} className="grid" />
            <text x="0" y={y + 4} className="axis">{v.toLocaleString('en-US').replace(',', ' ')}</text>
          </g>
        )
      })}
      {learners.map(([label, v], i) => {
        const bw = 44
        const x = 48 + i * step
        const h = (v / max) * innerH
        const last = i === learners.length - 1
        return (
          <g key={label}>
            <rect x={x} y={top + innerH - h} width={bw} height={h} rx="6" className={last ? 'bar bar-hot' : 'bar'} />
            <text x={x + bw / 2} y={H - 8} textAnchor="middle" className="axis">{label}</text>
            {last && <text x={x + bw / 2} y={top + innerH - h - 8} textAnchor="middle" className="bar-val">{v.toLocaleString('en-US').replace(',', ' ')}</text>}
          </g>
        )
      })}
    </svg>
  )
}

function Donut({ data, center, sub }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const r = 68, C = 2 * Math.PI * r
  let acc = 0
  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 180 180" className="donut" role="img" aria-label={`${center} ${sub}`}>
        <title>{`${center} ${sub}`}</title>
        <circle cx="90" cy="90" r={r} fill="none" stroke="#eef2f7" strokeWidth="22" />
        {data.map((d) => {
          const len = (d.value / total) * C
          const el = (
            <circle key={d.label} cx="90" cy="90" r={r} fill="none" stroke={d.color} strokeWidth="22"
              strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-acc} transform="rotate(-90 90 90)" />
          )
          acc += len
          return el
        })}
        <text x="90" y="88" textAnchor="middle" className="donut-num">{center}</text>
        <text x="90" y="106" textAnchor="middle" className="donut-sub">{sub}</text>
      </svg>
    </div>
  )
}

function Sparkline() {
  const W = 420, H = 120
  const max = Math.max(...traffic), min = Math.min(...traffic)
  const pts = traffic.map((v, i) => {
    const x = (i / (traffic.length - 1)) * W
    const y = H - 8 - ((v - min) / (max - min)) * (H - 24)
    return [x, y]
  })
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${W},${H} L0,${H} Z`
  return (
    <svg className="spark" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="Sayt tashriflari grafigi">
      <title>Sayt tashriflari</title>
      <path d={area} className="spark-area" />
      <path d={line} className="spark-line" fill="none" />
    </svg>
  )
}

/* ---------- Layout pieces ---------- */
function Sidebar({ nav, active, onSelect, open, onClose }) {
  const [openGroups, setOpenGroups] = useState({ content: true, edu: true })
  const toggle = (id) => setOpenGroups((g) => ({ ...g, [id]: !g[id] }))
  return (
    <aside className={`side ${open ? 'is-open' : ''}`}>
      <div className="side-brand">
        <span className="brand-mark">P</span>
        <div>
          <div className="brand-name">Toshkent viloyati pedagogik mahorat markazi</div>
          <div className="brand-sub">Admin panel</div>
        </div>
        <button className="side-close" onClick={onClose} aria-label="Menyuni yopish"><Icon name="arrow" size={16} /></button>
      </div>
      <nav className="side-nav" aria-label="Admin menyu">
        {nav.map((item) => {
          if (!item.children) {
            return (
              <button key={item.id} className={`nav-item ${active === item.id ? 'is-active' : ''}`}
                onClick={() => onSelect(item.id)}>
                <Icon name={item.icon} />
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </button>
            )
          }
          const isOpen = openGroups[item.id]
          return (
            <div key={item.id} className="nav-group">
              <button className="nav-item nav-parent" onClick={() => toggle(item.id)} aria-expanded={isOpen}>
                <Icon name={item.icon} />
                <span>{item.label}</span>
                <span className={`chev ${isOpen ? 'is-up' : ''}`}><Icon name="down" size={14} /></span>
              </button>
              {isOpen && (
                <div className="nav-sub">
                  {item.children.map((c) => (
                    <button key={c.id} className={`nav-sub-item ${active === c.id ? 'is-active' : ''}`}
                      onClick={() => onSelect(c.id)}>{c.label}</button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

function Dashboard() {
  return (
    <>
      <section className="head-row">
        <div>
          <h1 className="greet">Xush kelibsiz, Administrator!</h1>
          <p className="muted">Bugun: 23-noyabr, 2026 (Dushanba)</p>
        </div>
        <div className="quick-actions">
          <button className="btn btn-primary"><Icon name="plus" size={16} />Yangi yangilik</button>
          <button className="btn"><Icon name="school" size={16} />Kurs qo‘shish</button>
          <button className="btn"><Icon name="calendar" size={16} />Tadbir qo‘shish</button>
          <button className="btn"><Icon name="users" size={16} />Foydalanuvchi</button>
        </div>
      </section>

      <section className="kpis">
        {kpis.map((k) => (
          <div key={k.label} className="card kpi">
            <div className="kpi-top">
              <span className="kpi-ico"><Icon name={k.icon} size={20} /></span>
              <span className="delta"><Icon name="up" size={12} />{k.delta}</span>
            </div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </section>

      <section className="grid-2">
        <div className="card">
          <div className="card-head">
            <h2>Tinglovchilar dinamikasi</h2>
            <span className="select">So‘nggi 6 oy <Icon name="down" size={14} /></span>
          </div>
          <BarChart />
        </div>
        <div className="card">
          <div className="card-head"><h2>Ta’lim yo‘nalishlari bo‘yicha kurslar</h2></div>
          <div className="prog-row">
            <Donut data={programs} center="120" sub="kurs" />
            <ul className="legend">
              {programs.map((p) => (
                <li key={p.label}>
                  <span className="dot" style={{ background: p.color }} />
                  <span className="legend-label">{p.label}</span>
                  <span className="legend-val">{p.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid-3">
        <div className="card">
          <div className="card-head">
            <h2>Sayt tashriflari</h2>
            <span className="select">So‘nggi 30 kun <Icon name="down" size={14} /></span>
          </div>
          <div className="big-num">24 680 <span className="delta"><Icon name="up" size={12} />+27%</span></div>
          <Sparkline />
          <div className="axis-row"><span>24 okt</span><span>1 noy</span><span>9 noy</span><span>21 noy</span></div>
        </div>
        <div className="card">
          <div className="card-head"><h2>Davomat (oylik)</h2></div>
          <div className="prog-row">
            <Donut data={[{ label: 'Ishtirok etgan', value: 92, color: '#1f9d63' }, { label: 'Sababli', value: 5, color: '#d4a93f' }, { label: 'Sababsiz', value: 3, color: '#d64545' }]} center="92%" sub="" />
            <ul className="legend">
              <li><span className="dot" style={{ background: '#1f9d63' }} /><span className="legend-label">Ishtirok etgan</span><span className="legend-val">92%</span></li>
              <li><span className="dot" style={{ background: '#d4a93f' }} /><span className="legend-label">Sababli</span><span className="legend-val">5%</span></li>
              <li><span className="dot" style={{ background: '#d64545' }} /><span className="legend-label">Sababsiz</span><span className="legend-val">3%</span></li>
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h2>Kurslar holati</h2></div>
          <ul className="status-list">
            {courseStatus.map((s) => (
              <li key={s.label}>
                <span className={`st-ico tone-${s.tone}`}><Icon name={s.icon} size={16} /></span>
                <span className="st-label">{s.label}</span>
                <span className="st-val">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid-3 bottom">
        <div className="card">
          <div className="card-head"><h2>So‘nggi yangiliklar</h2><a className="link" href="#">Barchasini ko‘rish <Icon name="arrow" size={14} /></a></div>
          <ul className="news-list">
            {news.map((n) => (
              <li key={n.title}>
                <div className="thumb" aria-hidden="true"><Icon name="image" size={18} /></div>
                <div className="news-body">
                  <div className="news-title">{n.title}</div>
                  <div className="news-meta">{n.date} · <Icon name="eye" size={13} /> {n.views}
                    <span className={`pill ${n.status.startsWith('E’lon') ? 'pill-ok' : 'pill-warn'}`}>{n.status}</span>
                  </div>
                </div>
                <div className="row-actions">
                  <button className="icon-btn" aria-label="Tahrirlash"><Icon name="edit" size={16} /></button>
                  <button className="icon-btn danger" aria-label="O‘chirish"><Icon name="trash" size={16} /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div className="card-head">
            <h2>So‘nggi murojaatlar <span className="count">12</span></h2>
            <a className="link" href="#">Barchasi <Icon name="arrow" size={14} /></a>
          </div>
          <ul className="msg-list">
            {messages.map((m) => (
              <li key={m.name}>
                <span className={`avatar tone-${m.tone}`}>{m.initial}</span>
                <div className="msg-body">
                  <div className="msg-name">{m.name}</div>
                  <div className="msg-text">{m.text}</div>
                  <div className="msg-time">{m.time}</div>
                </div>
                <Icon name="arrow" size={14} />
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div className="card-head"><h2>Yaqin tadbirlar</h2><a className="link" href="#">Barchasi <Icon name="arrow" size={14} /></a></div>
          <ul className="event-list">
            {events.map((e) => (
              <li key={e.title}>
                <div className="date-box"><span className="d-day">{e.day}</span><span className="d-mon">{e.month}</span></div>
                <div className="ev-body">
                  <div className="ev-title">{e.title}</div>
                  <div className="ev-meta"><Icon name="clock" size={13} /> {e.time} <Icon name="pin" size={13} /> {e.place}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

function Placeholder({ title }) {
  return (
    <section className="card placeholder">
      <h1 className="greet">{title}</h1>
      <p className="muted">Bu bo‘lim keyingi bosqichda yasaladi. Hozircha faqat boshqaruv paneli tayyor.</p>
    </section>
  )
}

export default function Admin() {
  const [active, setActive] = useState('dash')
  const [menuOpen, setMenuOpen] = useState(false)
  const [session, setSession] = useState(undefined) // undefined = yuklanmoqda, null = kirilmagan
  const [profile, setProfile] = useState({ role: null, fullName: null })

  useEffect(() => {
    if (!supabaseReady) { setSession(null); return undefined }
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) return
    fetchRole(session.user.id).then(setProfile)
  }, [session])

  const role = profile.role
  const label = (() => {
    const flat = nav.flatMap((n) => (n.children ? [n, ...n.children] : [n]))
    return flat.find((n) => n.id === active)?.label || ''
  })()

  const select = (id) => { setActive(id); setMenuOpen(false) }

  async function logout() {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (session === undefined) {
    return <div className="login-wrap"><p className="muted">Yuklanmoqda…</p></div>
  }
  if (!session) {
    return <Login onLoggedIn={() => {}} />
  }

  const visibleNav = nav.filter((n) => !n.only || n.only.includes(role))

  return (
    <div className="admin">
      <Sidebar nav={visibleNav} active={active} onSelect={select} open={menuOpen} onClose={() => setMenuOpen(false)} />
      {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
      <div className="main">
        <header className="topbar">
          <button className="icon-btn menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Menyuni ochish">
            <Icon name="menu" size={20} />
          </button>
          <div className="top-title">
            <div className="top-h">{label}</div>
            <div className="top-sub">Pedagogik mahorat markazi axborot tizimi</div>
          </div>
          <label className="search">
            <Icon name="search" size={16} />
            <input type="search" placeholder="Qidiruv: kurs, tinglovchi, yangilik…" />
          </label>
          <button className="icon-btn bell" aria-label="Bildirishnomalar">
            <Icon name="bell" size={18} /><span className="bell-dot">3</span>
          </button>
          <button className="lang">UZ <Icon name="down" size={12} /></button>
          <div className="profile">
            <span className="avatar tone-navy">{(profile.fullName || session.user.email || 'A').charAt(0).toUpperCase()}</span>
            <div className="profile-text">
              <div className="p-name">{profile.fullName || session.user.email}</div>
              <div className="p-role">{ROLE_LABEL[role] || 'Rol belgilanmagan'}</div>
            </div>
            <button className="icon-btn logout" onClick={logout} aria-label="Chiqish" title="Chiqish">
              <Icon name="arrow" size={16} />
            </button>
          </div>
        </header>

        <main className="content">
          {active === 'dash' ? <Dashboard /> : <Placeholder title={label} />}
        </main>
      </div>
    </div>
  )
}
