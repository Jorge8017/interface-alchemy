/**
 * Portfolio screenshot utility.
 * Run: node scripts/capture-portfolio-screenshots.mjs [bona|compleat|filter]
 */

import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const DEVICES = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844, hasTouch: true, isMobile: true },
}

const BONA_ARTICLE =
  'https://staging.bona.co.za/2026-comrades-marathon-everything-you-need-to-know/'

async function dismissNoise(page) {
  const selectors = [
    'button:has-text("Accept")',
    'button:has-text("Agree")',
    'button:has-text("Got it")',
    '#onetrust-accept-btn-handler',
  ]

  for (const selector of selectors) {
    try {
      const el = page.locator(selector).first()
      if (await el.isVisible({ timeout: 400 })) {
        await el.click({ timeout: 800 })
        await page.waitForTimeout(200)
      }
    } catch {
      // ignore
    }
  }

  await page.evaluate(() => {
    document
      .querySelectorAll(
        'iframe, .ad-banner, .ad-banner__link, .ad-banner__img, .adsbygoogle, [id*="google_ads" i], [id*="div-gpt" i], .gpt-ad, .ad-slot, .adunit',
      )
      .forEach((node) => {
        node.style.setProperty('display', 'none', 'important')
        node.style.setProperty('height', '0', 'important')
        node.style.setProperty('overflow', 'hidden', 'important')
      })

    const header = document.querySelector('.site-header--ad, #top.site-header')
    if (header) {
      header.classList.remove('site-header--ad')
      header.style.setProperty('padding-top', '0', 'important')
    }
  })
}

async function settlePage(page) {
  await page.waitForLoadState('networkidle', { timeout: 90000 }).catch(() => {})
  await page.waitForTimeout(500)
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready
  })
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(250)
}

async function openBonaStory(page, slug = 'news') {
  await page.locator(`button.cat-pill[data-story-slug="${slug}"]`).first().click()
  await page.waitForSelector('.story-viewer[aria-hidden="false"], .story-viewer:not([hidden])', {
    timeout: 8000,
  })
  await page.waitForTimeout(900)
  // Ensure viewer is visibly open
  await page.waitForFunction(() => {
    const viewer = document.querySelector('.story-viewer')
    return viewer && getComputedStyle(viewer).display !== 'none'
  })
  await page.waitForTimeout(500)
}

async function openBonaStoryDrawer(page) {
  await openBonaStory(page, 'news')

  // Skip subscribe-only slides if the first frame is the newsletter card
  for (let i = 0; i < 3; i += 1) {
    const isSubscribe = await page.evaluate(() => {
      const slide = document.querySelector('.story-viewer__slide')
      return Boolean(slide?.querySelector('.story-viewer__subscribe'))
    })
    if (!isSubscribe) break
    await page.locator('.story-viewer__tap--next').click({ force: true }).catch(() => {})
    await page.waitForTimeout(450)
  }

  const swipeUp = page.locator('.story-viewer__swipe-up')
  await swipeUp.waitFor({ state: 'attached', timeout: 5000 })
  await swipeUp.click({ force: true })

  await page.waitForSelector('.story-viewer.is-drawer-open, .story-viewer__drawer.is-open', {
    timeout: 8000,
  })

  // Wait until article HTML has replaced the loading state
  await page.waitForFunction(() => {
    const article = document.querySelector('[data-drawer-article], .story-viewer__drawer-article')
    const status = document.querySelector('[data-drawer-status], .story-viewer__drawer-status')
    const text = (article?.textContent || '').trim()
    const statusText = (status?.textContent || '').trim().toLowerCase()
    return text.length > 80 && !statusText.includes('loading')
  }, { timeout: 15000 })

  await page.waitForTimeout(700)
}

async function openBonaMobileMenu(page) {
  await page.locator('button.nav-hamburger').click()
  await page.waitForFunction(() => document.body.classList.contains('is-nav-menu-open'))
  await page.waitForTimeout(500)
}

/** @type {Array<{ site: string, outputDir: string, captures: Array<any> }>} */
const CAPTURE_MANIFEST = [
  {
    site: 'Bona Magazine',
    outputDir: path.join(ROOT, 'src/assets/projects/bona-magazine'),
    captures: [
      {
        file: 'cover-homepage.png',
        url: 'https://staging.bona.co.za/',
        device: 'desktop',
        reason: 'Desktop homepage — cover.',
      },
      {
        file: 'article-single.png',
        url: BONA_ARTICLE,
        device: 'desktop',
        reason: 'Desktop single-article view.',
      },
      {
        file: 'desktop-story.png',
        url: 'https://staging.bona.co.za/',
        device: 'desktop',
        reason: 'Desktop story viewer opened from category pill.',
        setup: async (page) => openBonaStory(page, 'entertainment'),
      },
      {
        file: 'mobile-homepage.png',
        url: 'https://staging.bona.co.za/',
        device: 'mobile',
        reason: 'Mobile homepage.',
      },
      {
        file: 'mobile-menu.png',
        url: 'https://staging.bona.co.za/',
        device: 'mobile',
        reason: 'Mobile hamburger nav open.',
        setup: openBonaMobileMenu,
      },
      {
        file: 'mobile-story.png',
        url: 'https://staging.bona.co.za/',
        device: 'mobile',
        reason: 'Mobile Instagram-style story viewer.',
        setup: async (page) => openBonaStory(page, 'news'),
      },
      {
        file: 'mobile-article-drawer.png',
        url: 'https://staging.bona.co.za/',
        device: 'mobile',
        reason: 'Article drawer opened from story (swipe-up to read).',
        setup: openBonaStoryDrawer,
      },
      {
        file: 'mobile-article.png',
        url: BONA_ARTICLE,
        device: 'mobile',
        reason: 'Mobile single-article page.',
      },
    ],
  },
  {
    site: 'Compleat Golfer Tours',
    outputDir: path.join(ROOT, 'src/assets/projects/compleat-golfer-tours'),
    captures: [
      {
        file: 'cover-packages-listing.png',
        url: 'https://compleatgolfertours.com/packages/',
        device: 'desktop',
        reason: 'Cover — packages listing (desktop).',
      },
      {
        file: 'homepage.png',
        url: 'https://compleatgolfertours.com/',
        device: 'desktop',
        reason: 'Homepage (desktop).',
      },
      {
        file: 'package-detail.png',
        url: 'https://compleatgolfertours.com/packages/nedbank-golf-challenge-2026-hospitality/',
        device: 'desktop',
        reason: 'Package detail (desktop).',
      },
      {
        file: 'destinations-browse.png',
        url: 'https://compleatgolfertours.com/destinations/',
        device: 'desktop',
        reason: 'Destinations index (desktop).',
      },
      {
        file: 'beachcomber-mauritius.png',
        url: 'https://compleatgolfertours.com/beachcomber-specials/',
        device: 'desktop',
        reason: 'Beachcomber specials (desktop).',
      },
      {
        file: 'mobile-homepage.png',
        url: 'https://compleatgolfertours.com/',
        device: 'mobile',
        reason: 'Homepage (mobile).',
      },
      {
        file: 'mobile-packages.png',
        url: 'https://compleatgolfertours.com/packages/',
        device: 'mobile',
        reason: 'Packages listing (mobile).',
      },
      {
        file: 'mobile-package-detail.png',
        url: 'https://compleatgolfertours.com/packages/nedbank-golf-challenge-2026-hospitality/',
        device: 'mobile',
        reason: 'Package detail (mobile).',
      },
      {
        file: 'mobile-destinations.png',
        url: 'https://compleatgolfertours.com/destinations/',
        device: 'mobile',
        reason: 'Destinations (mobile).',
      },
    ],
  },
]

async function capturePage(browser, capture) {
  const device = DEVICES[capture.device || 'desktop']
  const context = await browser.newContext({
    viewport: { width: device.width, height: device.height },
    deviceScaleFactor: 2,
    colorScheme: 'light',
    hasTouch: Boolean(device.hasTouch),
    isMobile: Boolean(device.isMobile),
  })
  const page = await context.newPage()

  await page.goto(capture.url, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await settlePage(page)
  await dismissNoise(page)
  await settlePage(page)

  if (capture.setup) {
    await capture.setup(page)
    await page.waitForTimeout(400)
  }

  return { page, context }
}

async function main() {
  const filter = process.argv[2]?.toLowerCase()
  const groups = filter
    ? CAPTURE_MANIFEST.filter((g) => g.site.toLowerCase().includes(filter))
    : CAPTURE_MANIFEST

  if (filter && groups.length === 0) {
    console.error(`No sites matched filter "${filter}".`)
    process.exit(1)
  }

  const browser = await chromium.launch()
  const results = []

  for (const group of groups) {
    fs.mkdirSync(group.outputDir, { recursive: true })
    console.log(`\n📸 ${group.site}`)

    for (const capture of group.captures) {
      const outPath = path.join(group.outputDir, capture.file)
      let page
      let context
      try {
        ;({ page, context } = await capturePage(browser, capture))
        await page.screenshot({
          path: outPath,
          fullPage: Boolean(capture.fullPage),
          type: 'png',
        })
        console.log(`  ✓ ${capture.file} (${capture.device || 'desktop'})`)
        results.push({ ...capture, site: group.site, path: outPath, ok: true })
      } catch (err) {
        console.error(`  ✗ ${capture.file}: ${err.message}`)
        results.push({ ...capture, site: group.site, ok: false, error: err.message })
      } finally {
        if (page) await page.close().catch(() => {})
        if (context) await context.close().catch(() => {})
      }
    }
  }

  await browser.close()

  const manifestPath = path.join(ROOT, 'scripts', 'capture-manifest.json')
  fs.writeFileSync(manifestPath, JSON.stringify(results, null, 2))
  console.log(`\nManifest written to ${manifestPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
