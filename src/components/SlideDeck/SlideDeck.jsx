import { useCallback, useEffect, useId, useRef, useState } from 'react'
import './SlideDeck.css'

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function SlideDeck({ slides = [], title = 'Slides' }) {
  const [index, setIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const wrapRef = useRef(null)
  const thumbsRef = useRef(null)
  const touchStartX = useRef(null)
  const labelId = useId()
  const total = slides.length

  const goTo = useCallback(
    (nextIndex) => {
      if (total === 0) return
      setIndex(Math.max(0, Math.min(total - 1, nextIndex)))
    },
    [total],
  )

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])
  const goNext = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  // Preload neighbouring slides
  useEffect(() => {
    if (total === 0) return
    ;[index - 1, index + 1].forEach((i) => {
      if (i < 0 || i >= total) return
      const img = new Image()
      img.src = slides[i].src
    })
  }, [index, slides, total])

  // Keep active thumbnail in view
  useEffect(() => {
    const active = thumbsRef.current?.querySelector('[data-active="true"]')
    if (!active) return
    active.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [index, reduceMotion])

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    const el = wrapRef.current
    if (!el) return
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else if (el.requestFullscreen) {
        await el.requestFullscreen()
      }
    } catch {
      // Fullscreen may be blocked by the browser; ignore.
    }
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrev()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    }
  }

  const onTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  const onTouchEnd = (event) => {
    if (touchStartX.current == null) return
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current
    const delta = endX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < 40) return
    if (delta < 0) goNext()
    else goPrev()
  }

  if (total === 0) return null

  const counter = `${pad(index + 1)} / ${pad(total)}`

  return (
    <div
      ref={wrapRef}
      className={`slide-deck${isFullscreen ? ' is-fullscreen' : ''}${reduceMotion ? ' reduce-motion' : ''}`}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="slide-deck__top">
        <h4 id={labelId} className="slide-deck__title">
          {title}
        </h4>
        <div className="slide-deck__top-actions">
          <span className="slide-deck__counter" aria-live="polite">
            {counter}
          </span>
          <button
            type="button"
            className="slide-deck__fullscreen"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? 'Exit' : 'Fullscreen'}
          </button>
        </div>
      </div>

      <div className="slide-deck__stage">
        {slides.map((slide, i) => {
          const nearby = Math.abs(i - index) <= 1
          return (
            <img
              key={slide.src}
              className={`slide-deck__slide${i === index ? ' is-active' : ''}`}
              src={slide.src}
              alt={slide.alt}
              loading={nearby ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
            />
          )
        })}

        {index > 0 && (
          <button
            type="button"
            className="slide-deck__nav slide-deck__nav--prev"
            onClick={goPrev}
            aria-label="Previous slide"
          >
            ←
          </button>
        )}
        {index < total - 1 && (
          <button
            type="button"
            className="slide-deck__nav slide-deck__nav--next"
            onClick={goNext}
            aria-label="Next slide"
          >
            →
          </button>
        )}
      </div>

      <div className="slide-deck__thumbs" ref={thumbsRef} role="list">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="listitem"
            className={`slide-deck__thumb${i === index ? ' is-active' : ''}`}
            data-active={i === index ? 'true' : 'false'}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${slide.alt}`}
            aria-current={i === index ? 'true' : undefined}
          >
            <img src={slide.src} alt="" loading="lazy" decoding="async" draggable={false} />
          </button>
        ))}
      </div>
    </div>
  )
}
