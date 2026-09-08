import { chromium } from 'playwright'

const sites = [
  { name: 'CGT', url: 'https://compleatgolfertours.com/' },
  { name: 'Bona', url: 'https://staging.bona.co.za/' },
]

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

for (const site of sites) {
  console.log(`\n=== ${site.name}: ${site.url} ===`)
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 60000 })
    const title = await page.title()
    console.log(`Title: ${title}`)

    const links = await page.evaluate((origin) => {
      const host = new URL(origin).host
      const seen = new Set()
      const results = []

      for (const a of document.querySelectorAll('a[href]')) {
        let href = a.href
        if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) continue
        try {
          const u = new URL(href)
          if (u.host !== host) continue
          if (
            /privacy|terms|cookie|login|wp-admin|xmlrpc|wp-json|feed|#/.test(
              u.pathname + u.search,
            )
          ) {
            continue
          }
          const text = (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80)
          const key = u.pathname
          if (seen.has(key)) continue
          seen.add(key)
          results.push({ path: u.pathname, text, href: u.href })
        } catch {
          /* skip */
        }
      }
      return results.slice(0, 40)
    }, site.url)

    for (const link of links) {
      console.log(`  ${link.path} — ${link.text}`)
    }
  } catch (err) {
    console.error(`  ERROR: ${err.message}`)
  }
}

await browser.close()
