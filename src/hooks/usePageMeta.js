import { useEffect } from 'react'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function usePageMeta({ title, description, ogImage, ogUrl } = {}) {
  useEffect(() => {
    const prevTitle = document.title
    if (title) document.title = title

    const descriptionEl = document.head.querySelector('meta[name="description"]')
    const prevDescription = descriptionEl?.getAttribute('content') || ''
    if (description && descriptionEl) {
      descriptionEl.setAttribute('content', description)
    }

    if (description) {
      upsertMeta('property', 'og:description', description)
      upsertMeta('name', 'twitter:description', description)
    }
    if (title) {
      upsertMeta('property', 'og:title', title)
      upsertMeta('name', 'twitter:title', title)
    }
    if (ogImage) {
      upsertMeta('property', 'og:image', ogImage)
      upsertMeta('name', 'twitter:image', ogImage)
    }
    if (ogUrl) {
      upsertMeta('property', 'og:url', ogUrl)
    }

    return () => {
      document.title = prevTitle
      if (descriptionEl && prevDescription) {
        descriptionEl.setAttribute('content', prevDescription)
      }
    }
  }, [title, description, ogImage, ogUrl])
}
