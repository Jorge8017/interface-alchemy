/**
 * One-off portfolio screenshot utility.
 * Run: node scripts/capture-portfolio-screenshots.mjs
 *
 * Explores two client builds and saves full-page captures at 1440px.
 * Page choices are documented in CAPTURE_MANIFEST below.
 */

import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const VIEWPORT = { width: 1440, height: 900 }

/** @type {Array<{ site: string, outputDir: string, captures: Array<{ file: string, url: string, reason: string, setup?: (page: import('playwright').Page) => Promise<void> }> }>} */
const CAPTURE_MANIFEST = [
  {
    site: 'Compleat Golfer Tours',
    outputDir: path.join(ROOT, 'src/assets/projects/compleat-golfer-tours'),
    captures: [
      {
        file: 'cover-packages-listing.png',
        url: 'https://compleatgolfertours.com/packages/',
        reason:
          'Cover — the packages index is the core commerce surface: browseable tour inventory, filters, and the main conversion path. Sells the rebuild better than a marketing homepage alone.',
      },
      {
        file: 'homepage.png',
        url: 'https://compleatgolfertours.com/',
        reason:
          'Homepage hero, featured packages, and destination entry points — shows brand shell and how users land before browsing.',
      },
      {
        file: 'package-detail.png',
        url: 'https://compleatgolfertours.com/packages/nedbank-golf-challenge-2026-hospitality/',
        reason:
          'Single-package template with itinerary detail, pricing cues, and enquiry CTA — the custom template built for international golf packages.',
      },
      {
        file: 'destinations-browse.png',
        url: 'https://compleatgolfertours.com/destinations/',
        reason:
          'Destinations index with regional grid — shows how users browse by geography; complements the package commerce flow (flyout nav is hover-only and did not capture reliably in headless mode).',
      },
      {
        file: 'beachcomber-mauritius.png',
        url: 'https://compleatgolfertours.com/beachcomber-specials/',
        reason:
          'Mauritius Beachcomber destination specials page — called out in the project brief as a dedicated destination landing.',
      },
      {
        file: 'journal-listing.png',
        url: 'https://compleatgolfertours.com/journal/',
        reason:
          'Journal/archive layout — distinct editorial template separate from package commerce, showing layout range.',
      },
    ],
  },
  {
    site: 'Bona Magazine',
    outputDir: path.join(ROOT, 'src/assets/projects/bona-magazine'),
    captures: [
      {
        file: 'cover-homepage.png',
        url: 'https://staging.bona.co.za/',
        reason:
          'Cover — custom front-page.php homepage with curated editorial modules, category rails, and the magazine’s primary reading experience.',
      },
      {
        file: 'category-lifestyle.png',
        url: 'https://staging.bona.co.za/category/lifestyle/',
        reason:
          'Lifestyle category archive — shows how the theme handles section landing pages and article grids.',
      },
      {
        file: 'category-sports.png',
        url: 'https://staging.bona.co.za/category/sports/',
        reason:
          'Sports category — second archive layout with different editorial mix, proving the template scales across verticals.',
      },
      {
        file: 'article-single.png',
        url: 'https://staging.bona.co.za/2026-comrades-marathon-everything-you-need-to-know/',
        reason:
          'Single-article template with byline, body typography, and related content — the core reading experience editors publish into daily.',
      },
      {
        file: 'article-entertainment.png',
        url: 'https://staging.bona.co.za/pearl-modiadie-bids-farewell-to-her-law-love-betrayal-character/',
        reason:
          'Entertainment long-read — alternate article layout/content density for gallery variety on the case study page.',
      },
    ],
  },
]

async function capturePage(page, { file, url, setup }) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 })
  await page.waitForTimeout(500)

  if (setup) {
    await setup(page)
  }

  return file
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
  const context = await browser.newContext({ viewport: VIEWPORT })
  const page = await context.newPage()

  const results = []

  for (const group of groups) {
    fs.mkdirSync(group.outputDir, { recursive: true })
    console.log(`\n📸 ${group.site}`)

    for (const capture of group.captures) {
      const outPath = path.join(group.outputDir, capture.file)
      try {
        await capturePage(page, capture)
        await page.screenshot({ path: outPath, fullPage: true })
        console.log(`  ✓ ${capture.file}`)
        results.push({ ...capture, site: group.site, path: outPath, ok: true })
      } catch (err) {
        console.error(`  ✗ ${capture.file}: ${err.message}`)
        results.push({ ...capture, site: group.site, ok: false, error: err.message })
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
