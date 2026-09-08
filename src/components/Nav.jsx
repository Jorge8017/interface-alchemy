import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/work', label: 'work' },
  { to: '/about', label: 'about' },
]

const DARK_SECTION_IDS = ['contact']

function MenuIcon({ open }) {
  if (open) {
    return <span className="menu-btn-icon" aria-hidden="true">×</span>
  }

  return (
    <span className="menu-btn-icon menu-btn-icon--dots" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  )
}

function menuOverlapsDarkSection() {
  const menuBar = document.getElementById('menu-bar')
  if (!menuBar) return false

  const menuRect = menuBar.getBoundingClientRect()
  const sampleY = menuRect.top + menuRect.height / 2

  return DARK_SECTION_IDS.some((id) => {
    const section = document.getElementById(id)
    if (!section) return false
    const rect = section.getBoundingClientRect()
    return rect.top <= sampleY && rect.bottom >= sampleY
  })
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [onDark, setOnDark] = useState(false)
  const location = useLocation()

  const updateContrast = useCallback(() => {
    if (location.pathname === '/contact') {
      setOnDark(true)
      return
    }
    setOnDark(menuOverlapsDarkSection())
  }, [location.pathname])

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    updateContrast()

    window.addEventListener('scroll', updateContrast, { passive: true })
    window.addEventListener('resize', updateContrast)

    return () => {
      window.removeEventListener('scroll', updateContrast)
      window.removeEventListener('resize', updateContrast)
    }
  }, [updateContrast])

  useEffect(() => {
    if (open) return
    const frame = requestAnimationFrame(updateContrast)
    return () => cancelAnimationFrame(frame)
  }, [open, updateContrast])

  const close = () => setOpen(false)
  const toggle = () => setOpen((value) => !value)

  const handleBrandClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    close()
  }

  return (
    <section
      id="menu-bar"
      className={`menu-bar${ready ? ' is-ready' : ''}${open ? ' is-open' : ''}${onDark ? ' on-dark' : ''}`}
    >
      <div id="menu-inner" className="menu-inner">
        <button
          id="menu-btn"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={toggle}
        >
          <MenuIcon open={open} />
        </button>

        <nav
          id="nav-bar"
          className={`nav-bar${open ? '' : ' nav-bar--short'}`}
          aria-label="Primary"
        >
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} onClick={close}>
              {label}
            </Link>
          ))}
        </nav>

        {!open && (
          <Link to="/" id="menu-brand" className="menu-brand" onClick={handleBrandClick}>
            <span className="menu-brand-name">Interface Alchemy</span>
            <span className="menu-brand-sub">BY GEORGE</span>
          </Link>
        )}
      </div>

      <div id="secondary-btns" className="secondary-btns">
        {open && (
          <Link to="/contact" className="menu-cta-pill" onClick={close}>
            contact
          </Link>
        )}
      </div>
    </section>
  )
}
