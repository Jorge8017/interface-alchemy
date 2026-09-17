import { useEffect, useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const SWIPE_THRESHOLD = 50
const MIN_SCALE = 1
const MAX_SCALE = 4
const ZOOM_STEP = 0.35

export default function Lightbox({ images, index, onClose, onChange }) {
  const current = images[index]
  const hasMultiple = images.length > 1
  const touchStartX = useRef(null)
  const pinchStartDist = useRef(null)
  const pinchStartScale = useRef(1)
  const dragStart = useRef(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const resetZoom = useCallback(() => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }, [])

  const clampScale = (value) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value))

  const zoomBy = useCallback((delta) => {
    setScale((prev) => {
      const next = clampScale(prev + delta)
      if (next <= MIN_SCALE) {
        setOffset({ x: 0, y: 0 })
      }
      return next
    })
  }, [])

  const showPrev = useCallback(() => {
    if (!hasMultiple) return
    resetZoom()
    onChange((index - 1 + images.length) % images.length)
  }, [hasMultiple, images.length, index, onChange, resetZoom])

  const showNext = useCallback(() => {
    if (!hasMultiple) return
    resetZoom()
    onChange((index + 1) % images.length)
  }, [hasMultiple, images.length, index, onChange, resetZoom])

  useEffect(() => {
    resetZoom()
  }, [index, resetZoom])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('lightbox-open')

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.classList.remove('lightbox-open')
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        if (scale > 1) {
          resetZoom()
          return
        }
        onClose()
      } else if (event.key === '+' || event.key === '=') {
        event.preventDefault()
        zoomBy(ZOOM_STEP)
      } else if (event.key === '-' || event.key === '_') {
        event.preventDefault()
        zoomBy(-ZOOM_STEP)
      } else if (event.key === '0') {
        event.preventDefault()
        resetZoom()
      } else if (scale <= 1 && event.key === 'ArrowLeft') {
        event.preventDefault()
        showPrev()
      } else if (scale <= 1 && event.key === 'ArrowRight') {
        event.preventDefault()
        showNext()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose, showPrev, showNext, scale, resetZoom, zoomBy])

  const onWheel = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const delta = event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP
    zoomBy(delta)
  }

  const onTouchStart = (event) => {
    if (event.touches.length === 2) {
      const [a, b] = event.touches
      pinchStartDist.current = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
      pinchStartScale.current = scale
      touchStartX.current = null
      return
    }

    if (scale > 1) {
      const touch = event.touches[0]
      dragStart.current = {
        x: touch.clientX - offset.x,
        y: touch.clientY - offset.y,
      }
      touchStartX.current = null
      return
    }

    if (!hasMultiple) return
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  const onTouchMove = (event) => {
    if (event.touches.length === 2 && pinchStartDist.current) {
      event.preventDefault()
      const [a, b] = event.touches
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
      const next = clampScale(pinchStartScale.current * (dist / pinchStartDist.current))
      setScale(next)
      if (next <= MIN_SCALE) setOffset({ x: 0, y: 0 })
      return
    }

    if (scale > 1 && dragStart.current && event.touches.length === 1) {
      event.preventDefault()
      const touch = event.touches[0]
      setOffset({
        x: touch.clientX - dragStart.current.x,
        y: touch.clientY - dragStart.current.y,
      })
    }
  }

  const onTouchEnd = (event) => {
    if (event.touches.length < 2) {
      pinchStartDist.current = null
    }
    if (event.touches.length === 0) {
      dragStart.current = null
    }

    if (scale > 1 || touchStartX.current == null || !hasMultiple) return
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current
    const delta = endX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < SWIPE_THRESHOLD) return
    if (delta > 0) showPrev()
    else showNext()
  }

  const onPointerDown = (event) => {
    if (scale <= 1 || event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragStart.current = {
      x: event.clientX - offset.x,
      y: event.clientY - offset.y,
    }
  }

  const onPointerMove = (event) => {
    if (!dragStart.current || scale <= 1) return
    setOffset({
      x: event.clientX - dragStart.current.x,
      y: event.clientY - dragStart.current.y,
    })
  }

  const onPointerUp = () => {
    dragStart.current = null
  }

  const onDoubleClick = (event) => {
    event.stopPropagation()
    if (scale > 1) {
      resetZoom()
      return
    }
    setScale(2.25)
  }

  if (!current) return null

  const isZoomed = scale > 1

  return createPortal(
    <div
      className={`lightbox${isZoomed ? ' is-zoomed' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={() => {
        if (isZoomed) {
          resetZoom()
          return
        }
        onClose()
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button type="button" className="lightbox-close" onClick={onClose}>
        close
      </button>

      <div className="lightbox-zoom-controls" onClick={(event) => event.stopPropagation()}>
        <button type="button" aria-label="Zoom out" onClick={() => zoomBy(-ZOOM_STEP)}>
          −
        </button>
        <button type="button" aria-label="Reset zoom" onClick={resetZoom}>
          {Math.round(scale * 100)}%
        </button>
        <button type="button" aria-label="Zoom in" onClick={() => zoomBy(ZOOM_STEP)}>
          +
        </button>
      </div>

      {hasMultiple && !isZoomed && (
        <button
          type="button"
          className="lightbox-nav lightbox-nav--prev"
          aria-label="Previous image"
          onClick={(event) => {
            event.stopPropagation()
            showPrev()
          }}
        >
          ←
        </button>
      )}

      <div
        className="lightbox-figure"
        onClick={(event) => event.stopPropagation()}
        onWheel={onWheel}
      >
        <div
          className={`lightbox-stage${isZoomed ? ' is-zoomed' : ''}`}
          onDoubleClick={onDoubleClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <img
            src={current.src}
            alt={current.alt}
            draggable={false}
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            }}
          />
        </div>
        {hasMultiple && (
          <p className="lightbox-count">
            {index + 1} / {images.length}
            <span className="lightbox-hint"> · scroll or pinch to zoom</span>
          </p>
        )}
        {!hasMultiple && (
          <p className="lightbox-count">
            <span className="lightbox-hint">scroll or pinch to zoom</span>
          </p>
        )}
      </div>

      {hasMultiple && !isZoomed && (
        <button
          type="button"
          className="lightbox-nav lightbox-nav--next"
          aria-label="Next image"
          onClick={(event) => {
            event.stopPropagation()
            showNext()
          }}
        >
          →
        </button>
      )}
    </div>,
    document.body,
  )
}
