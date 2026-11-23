import { useState } from 'react'
import { supabase, supabaseReady } from './supabase.js'

export default function Login({ onLoggedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (!supabaseReady) {
    return (
      <div className="login-wrap">
        <div className="login-card">
          <h1 className="login-title">Sozlash kerak</h1>
          <p className="login-text">
            Supabase ulanmagan. Lokal muhitda <code>.env.local</code> faylida, Vercel’da esa
            Environment Variables bo‘limida <code>VITE_SUPABASE_URL</code> va <code>VITE_SUPABASE_ANON_KEY</code> ni
            kiriting, so‘ng sahifani qayta yuklang.
          </p>
        </div>
      </div>
    )
  }

  async function submit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (err || !data.session) {
      setError('Email yoki parol noto‘g‘ri.')
      return
    }
    onLoggedIn(data.session.user)
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <div className="login-brand">
          <span className="brand-mark">P</span>
          <div>
            <div className="brand-name">Toshkent viloyati pedagogik mahorat markazi</div>
            <div className="brand-sub">Admin panel</div>
          </div>
        </div>
        <h1 className="login-title">Kirish</h1>
        <label className="field">
          <span>Email</span>
          <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="field">
          <span>Parol</span>
          <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="login-error" role="alert">{error}</p>}
        <button className="btn btn-primary login-btn" type="submit" disabled={busy}>
          {busy ? 'Tekshirilmoqda…' : 'Kirish'}
        </button>
      </form>
    </div>
  )
}
