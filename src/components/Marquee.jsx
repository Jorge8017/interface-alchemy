import { useEffect, useRef } from 'react'

const items = [
  'UX Design',
  'React',
  'WordPress',
  'Product Design',
  'Figma',
  'PHP',
  'Interface Design',
  'Front-end Development',
]

export default function Marquee() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let frame
    let offset = 0

    const step = () => {
      offset -= 0.35
      if (Math.abs(offset) >= track.scrollWidth / 2) offset = 0
      track.style.transform = `translateX(${offset}px)`
      frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [])

  const sequence = [...items, ...items]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        {sequence.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee-item">
            {item}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
