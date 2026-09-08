import { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'

const SWIPE_THRESHOLD = 50

export default function Lightbox({ images, index, onClose, onChange }) {
  const current = images[index]
  const hasMultiple = images.length > 1
  const touchStartX = useRef(null)

  const showPrev = useCallback(() => {
    if (!hasMultiple) return
    onChange((index - 1 + images.length) % images.length)
  }, [hasMultiple, images.length, index, onChange])

  const showNext = useCallback(() => {
    if (!hasMultiple) return
    onChange((index + 1) % images.length)
  }, [hasMultiple, images.length, index, onChange])

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
        onClose()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        showPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        showNext()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose, showPrev, showNext])

  const onTouchStart = (event) => {
    if (!hasMultiple) return
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  const onTouchEnd = (event) => {
    if (!hasMultiple || touchStartX.current == null) return
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current
    const delta = endX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < SWIPE_THRESHOLD) return
    if (delta > 0) showPrev()
    else showNext()
  }

  if (!current) return null

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button type="button" className="lightbox-close" onClick={onClose}>
        close
      </button>

      {hasMultiple && (
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
      >
        <img src={current.src} alt={current.alt} />
        {hasMultiple && (
          <p className="lightbox-count">
            {index + 1} / {images.length}
          </p>
        )}
      </div>

      {hasMultiple && (
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
