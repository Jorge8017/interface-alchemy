/**
 * Capture AVB Transport one-pager from local WordPress.
 * Run: node scripts/capture-avb-transport.mjs
 */

import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT = path.join(ROOT, 'src/assets/projects/avb-transport')
const URL = 'http://localhost/avb-transport/'

const DEVICES = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844, hasTouch: true, isMobile: true },
}

const CAPTURES = [
  {
    file: 'cover-homepage.png',
    device: 'desktop',
    reason: 'Hero — cover.',
  },
  {
    file: 'desktop-trust.png',
    device: 'desktop',
    selector: '#why-us',
    reason: 'Accreditations / trust strip.',
  },
  {
    file: 'desktop-services.png',
    device: 'desktop',
    selector: '#services',
    reason: 'Tabbed services panel.',
  },
  {
    file: 'desktop-about.png',
    device: 'desktop',
    selector: '#about',
    reason: 'Family story section.',
  },
  {
    file: 'desktop-projects.png',
    device: 'desktop',
    selector: '#projects',
    reason: 'Project gallery.',
  },
  {
    file: 'desktop-reviews.png',
    device: 'desktop',
    selector: '#reviews',
    reason: 'Reviews section.',
  },
  {
    file: 'desktop-quote.png',
    device: 'desktop',
    selector: '#contact',
    reason: 'Structured quote form.',
  },
  {
    file: 'desktop-credit-modal.png',
    device: 'desktop',
    reason: 'Credit application popup.',
    setup: openCreditModal,
  },
  {
    file: 'mobile-homepage.png',
    device: 'mobile',
    reason: 'Mobile hero with sticky call-and-quote bar.',
  },
  {
    file: 'mobile-services.png',
    device: 'mobile',
    selector: '#services',
    reason: 'Services on mobile.',
  },
  {
    file: 'mobile-about.png',
    device: 'mobile',
    selector: '#about',
    reason: 'Family story on mobile.',
  },
  {
    file: 'mobile-projects.png',
    device: 'mobile',
    selector: '#projects',
    reason: 'Project gallery on mobile.',
  },
  {
    file: 'mobile-reviews.png',
    device: 'mobile',
    selector: '#reviews',
    reason: 'Reviews on mobile.',
  },
  {
    file: 'mobile-quote.png',
    device: 'mobile',
    selector: '#contact',
    reason: 'Quote form on mobile.',
  },
  {
    file: 'mobile-credit-modal.png',
    device: 'mobile',
    reason: 'Credit application popup on mobile.',
    setup: openCreditModal,
  },
]

async function settlePage(page) {
  await page.waitForLoadState('networkidle', { timeout: 90000 }).catch(() => {})
  await page.waitForTimeout(400)
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready
  })
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(200)
}

/** Hide fixed chrome so section crops don't show the sticky logo/menu bar. */
async function hideFixedChrome(page) {
  await page.evaluate(() => {
    document
      .querySelectorAll(
        '.site-header, .site-header__inner, [class*="sticky-bar"], [class*="cta-bar"], [class*="mobile-bar"]',
      )
      .forEach((node) => {
        node.style.setProperty('display', 'none', 'important')
        node.style.setProperty('visibility', 'hidden', 'important')
        node.style.setProperty('pointer-events', 'none', 'important')
      })
  })
}

async function openCreditModal(page) {
  const trigger = page.locator('a[href="#apply"], [data-open-apply]').first()
  await trigger.click({ force: true }).catch(async () => {
    await page.evaluate(() => {
      const modal = document.querySelector('#apply.modal')
      if (!modal) return
      modal.hidden = false
      modal.classList.add('is-open')
      document.body.classList.add('is-modal-open')
      modal.style.removeProperty('display')
      if (getComputedStyle(modal).display === 'none') {
        modal.style.setProperty('display', 'block', 'important')
      }
    })
  })
  await page.waitForFunction(() => {
    const modal = document.querySelector('#apply.modal')
    if (!modal) return false
    return !modal.hidden && getComputedStyle(modal).display !== 'none'
  }, { timeout: 8000 })
  await page.waitForTimeout(500)
}

async function main() {
  const filter = process.argv[2]?.toLowerCase()
  const captures = filter
    ? CAPTURES.filter((c) => c.file.toLowerCase().includes(filter) || c.device === filter)
    : CAPTURES

  fs.mkdirSync(OUT, { recursive: true })
  const browser = await chromium.launch()
  const results = []

  console.log('\n📸 AVB Transport')

  for (const capture of captures) {
    const device = DEVICES[capture.device]
    const outPath = path.join(OUT, capture.file)
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height },
      deviceScaleFactor: 2,
      colorScheme: 'light',
      hasTouch: Boolean(device.hasTouch),
      isMobile: Boolean(device.isMobile),
    })
    const page = await context.newPage()

    try {
      await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 90000 })
      await settlePage(page)

      if (capture.setup) {
        await capture.setup(page)
      } else if (capture.selector) {
        await hideFixedChrome(page)
        const target = page.locator(capture.selector).first()
        await target.scrollIntoViewIfNeeded()
        await page.waitForTimeout(400)
        await target.screenshot({ path: outPath, type: 'png' })
        console.log(`  ✓ ${capture.file} (${capture.device})`)
        results.push({ ...capture, site: 'AVB Transport', path: outPath, ok: true })
        continue
      }

      await page.screenshot({ path: outPath, type: 'png' })
      console.log(`  ✓ ${capture.file} (${capture.device})`)
      results.push({ ...capture, site: 'AVB Transport', path: outPath, ok: true })
    } catch (err) {
      console.error(`  ✗ ${capture.file}: ${err.message}`)
      results.push({ ...capture, site: 'AVB Transport', ok: false, error: err.message })
    } finally {
      await page.close().catch(() => {})
      await context.close().catch(() => {})
    }
  }

  await browser.close()

  const manifestPath = path.join(ROOT, 'scripts', 'capture-avb-manifest.json')
  fs.writeFileSync(manifestPath, JSON.stringify(results, null, 2))
  console.log(`\nManifest written to ${manifestPath}`)

  const failed = results.filter((r) => !r.ok)
  if (failed.length) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
