import { useEffect } from 'react'
import Reveal from './Reveal'

export default function Hero() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const line = document.querySelector('.hero-line')
    if (!line) return

    if (prefersReduced) {
      line.classList.add('in')
      return
    }

    const timer = window.setTimeout(() => line.classList.add('in'), 250)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="wrap hero-inner">
        <Reveal as="p" className="meta eyebrow">
          UX Designer &amp; Developer — Cape Town
        </Reveal>
        <h1 className="hero-title">
          <span className="hero-line">
            <span className="hero-line-inner">Quiet interfaces, considered code.</span>
          </span>
        </h1>
        <Reveal as="p" className="sub">
          Forward through research, design, and development — end to end across React,
          WordPress, and PHP.
        </Reveal>
        <Reveal className="scroll-cue">
          <span className="bar" />
          Scroll
        </Reveal>
      </div>
    </section>
  )
}
