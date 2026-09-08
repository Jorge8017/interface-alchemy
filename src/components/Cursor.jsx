import { useEffect, useRef, useState } from 'react'

const RING_LERP = 0.18
const DOT_LERP = 0.35
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, .is-zoomable'

function lerp(start, end, amount) {
  return start + (end - start) * amount
}

function isDarkSurface(x, y) {
  const element = document.elementFromPoint(x, y)
  if (!element) return false
  return Boolean(element.closest('.contact, .menu-bar.on-dark'))
}

export default function Cursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const ringPosition = useRef({ x: 0, y: 0 })
  const dotPosition = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const frameRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressing, setPressing] = useState(false)
  const [onDark, setOnDark] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const activate = () => {
      const isActive = finePointer.matches && !reducedMotion.matches
      setEnabled(isActive)
      document.body.classList.toggle('custom-cursor', isActive)
    }

    activate()
    finePointer.addEventListener('change', activate)
    reducedMotion.addEventListener('change', activate)

    return () => {
      finePointer.removeEventListener('change', activate)
      reducedMotion.removeEventListener('change', activate)
      document.body.classList.remove('custom-cursor')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return undefined

    const onMouseMove = (event) => {
      target.current = { x: event.clientX, y: event.clientY }
      setHovering(Boolean(event.target.closest(INTERACTIVE_SELECTOR)))
      setOnDark(isDarkSurface(event.clientX, event.clientY))
      if (!visible) setVisible(true)
    }

    const onMouseLeave = () => setVisible(false)
    const onMouseDown = () => setPressing(true)
    const onMouseUp = () => setPressing(false)

    const animate = () => {
      ringPosition.current = {
        x: lerp(ringPosition.current.x, target.current.x, RING_LERP),
        y: lerp(ringPosition.current.y, target.current.y, RING_LERP),
      }

      dotPosition.current = {
        x: lerp(dotPosition.current.x, target.current.x, DOT_LERP),
        y: lerp(dotPosition.current.y, target.current.y, DOT_LERP),
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosition.current.x}px, ${ringPosition.current.y}px, 0) translate(-50%, -50%)`
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPosition.current.x}px, ${dotPosition.current.y}px, 0) translate(-50%, -50%)`
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [enabled, visible])

  if (!enabled) return null

  const classes = [
    'cursor',
    visible ? 'is-visible' : '',
    hovering ? 'is-hovering' : '',
    pressing ? 'is-pressing' : '',
    onDark ? 'on-dark' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
