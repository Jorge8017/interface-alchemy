import { useState, useRef, useEffect } from 'react'
import Reveal from './Reveal'
import { Link } from 'react-router-dom'

const EMAIL = 'jordanshears28@gmail.com'
const PHONE_E164 = '+27810537147'

const CONTACT_OPTIONS = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/27810537147',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${EMAIL}`,
  },
  {
    id: 'call',
    label: 'Call',
    href: `tel:${PHONE_E164}`,
  },
]

export default function Contact({ standalone = false }) {
  const [contactOpen, setContactOpen] = useState(false)
  const pickerRef = useRef(null)

  useEffect(() => {
    if (!contactOpen) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setContactOpen(false)
    }

    const onPointerDown = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setContactOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [contactOpen])

  return (
    <section
      className={`section contact${standalone ? ' is-page' : ''}`}
      id="contact"
    >
      <Reveal className="wrap contact-inner">
        <p className="contact-eyebrow">Ready to move forward?</p>
        {standalone ? (
          <h1 className="contact-headline">Let&apos;s work together.</h1>
        ) : (
          <h2 className="contact-headline">Let&apos;s work together.</h2>
        )}
        <p className="contact-sub">
          Open to freelance, contract, and full-time roles in UX and front-end development.
        </p>
        <div className="contact-actions">
          <div className="contact-picker" ref={pickerRef}>
            <button
              type="button"
              className="contact-btn"
              aria-expanded={contactOpen}
              aria-haspopup="menu"
              onClick={() => setContactOpen((open) => !open)}
            >
              Contact me
            </button>
            {contactOpen && (
              <div className="contact-picker-menu" role="menu" aria-label="Contact options">
                {CONTACT_OPTIONS.map(({ id, label, href, external }) => (
                  <a
                    key={id}
                    role="menuitem"
                    href={href}
                    className="contact-picker-option"
                    onClick={() => setContactOpen(false)}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href={`mailto:${EMAIL}`} className="contact-email">
            {EMAIL}
          </a>
        </div>
        <div className="contact-links">
          <a
            href="https://www.linkedin.com/in/jordan-shears-3642b51a9"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <Link to="/work">View work</Link>
          <a href="/jordan-shears-cv.pdf" download>
            Download CV
          </a>
        </div>
      </Reveal>
    </section>
  )
}
