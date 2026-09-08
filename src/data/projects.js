// src/data/projects.js
//
// Single source of truth for all project content.
// Add, remove, or reorder entries here — the Work grid, list view,
// and /work/:slug routes all read from this array automatically.
//
// image / tileImage / gallery are left as empty strings so the existing
// gradient placeholder still renders until you drop in real screenshots.
//
// comingSoon: true marks a project that isn't built yet — ask Cursor to
// render these as non-clickable tiles with a "Coming soon" label rather
// than linking to an empty /work/:slug page.
//
// published: false hides a project from work listings without deleting it.

// Local screenshots — captured via scripts/capture-portfolio-screenshots.mjs
import cgtCover from '../assets/projects/compleat-golfer-tours/cover-packages-listing.png'
import cgtHomepage from '../assets/projects/compleat-golfer-tours/homepage.png'
import cgtPackageDetail from '../assets/projects/compleat-golfer-tours/package-detail.png'
import cgtDestinations from '../assets/projects/compleat-golfer-tours/destinations-browse.png'
import cgtBeachcomber from '../assets/projects/compleat-golfer-tours/beachcomber-mauritius.png'
import cgtJournal from '../assets/projects/compleat-golfer-tours/journal-listing.png'

import bonaCover from '../assets/projects/bona-magazine/cover-homepage.png'
import bonaLifestyle from '../assets/projects/bona-magazine/category-lifestyle.png'
import bonaSports from '../assets/projects/bona-magazine/category-sports.png'
import bonaArticleSingle from '../assets/projects/bona-magazine/article-single.png'
import bonaArticleEntertainment from '../assets/projects/bona-magazine/article-entertainment.png'

export const projects = [
  // ---------- WordPress builds ----------
  {
    slug: 'bona-magazine',
    title: 'Bona Magazine — Redesign & Rebuild',
    role: 'WordPress Developer',
    stack: 'WordPress · PHP · Custom Theme',
    year: '2026',
    client: 'Bona Magazine',
    liveUrl: 'https://www.bona.co.za/',
    tags: ['WordPress', 'Custom Theme', 'PHP'],
    problem:
      'Bona Magazine needed a fully custom WordPress theme built to match an existing Figma design exactly — no page builder shortcuts, no off-the-shelf theme stretched to fit.',
    approach:
      'Built the theme from scratch (bona-mag-theme), converting the Figma design into a dynamic front-page.php with reusable template parts. Added a dedicated Bona Settings admin page so editors could control site-wide options without touching code, plus a setup script to populate dummy content for fast preview and QA during development.',
    color: '#A13D3D',
    coverPosition: 'top center',
    image: bonaCover,
    tileImage: bonaCover,
    gallery: [bonaLifestyle, bonaSports, bonaArticleSingle, bonaArticleEntertainment],
    published: true,
  },
  {
    slug: 'compleat-golfer-tours',
    title: 'Compleat Golfer Tours — Booking Site',
    role: 'WordPress Developer',
    stack: 'WordPress · SEO · Yoast',
    year: '2026',
    client: 'Compleat Golfer Tours (Habari Media)',
    liveUrl: 'https://compleatgolfertours.com/',
    tags: ['WordPress', 'SEO', 'Booking Systems'],
    problem:
      'A golf tour operator needed to sell complex international travel packages clearly — and be found in search in the first place. The existing site made it hard to browse packages by destination and wasn\'t set up for organic discovery.',
    approach:
      'Built a full international package system on a new single-package template, with a three-level flyout navigation for browsing by destination. Ran a complete SEO setup — Yoast, Google Search Console, and Bing Webmaster Tools — and added destination pages including a Mauritius Beachcomber package and a British Open 2026 competition page.',
    color: '#3E6B8A',
    coverPosition: 'top center',
    image: cgtCover,
    tileImage: cgtCover,
    gallery: [cgtHomepage, cgtPackageDetail, cgtDestinations, cgtBeachcomber, cgtJournal],
    published: true,
  },

  // ---------- UX/UI design ----------
  {
    slug: 'club-daddy',
    title: 'Club Daddy App',
    role: 'UI/UX Designer',
    stack: 'Figma',
    year: '2024',
    client: "Daddy's Deals (via Habari Media)",
    figmaLink: 'https://www.figma.com/design/ogBqGY1LsyAHEqfHWWbVK5/Daddy',
    tags: ['UX/UI Design', 'Figma', 'Mobile'],
    problem:
      "Daddy's Deals needed an app experience for browsing their full catalog of deals — and a way to convert casual browsers into paying subscribers, rather than one-off deal hunters.",
    approach:
      "Designed the full app in Figma, from deal browsing through to a subscription tier with a clear, concrete incentive: subscribers get an extra 30% off the already-discounted deal price. Giving the discount a specific number made the value of upgrading immediately obvious, rather than a vague 'unlock perks' pitch.",
    color: '#6B4577',
    coverPosition: 'center center',
    image: 'https://static.wixstatic.com/media/6ccce7_efeb8cec56504161a63b3d085457584d~mv2.png/v1/fit/w_1440,h_812,q_90,enc_avif,quality_auto/6ccce7_efeb8cec56504161a63b3d085457584d~mv2.png',
    tileImage: 'https://static.wixstatic.com/media/6ccce7_efeb8cec56504161a63b3d085457584d~mv2.png/v1/fit/w_1440,h_812,q_90,enc_avif,quality_auto/6ccce7_efeb8cec56504161a63b3d085457584d~mv2.png',
    gallery: [
      'https://static.wixstatic.com/media/6ccce7_9fd7ebde27e54978a0c7166b89ca74e9~mv2.png/v1/fit/w_1352,h_901,q_90,enc_avif,quality_auto/6ccce7_9fd7ebde27e54978a0c7166b89ca74e9~mv2.png',
      'https://static.wixstatic.com/media/6ccce7_b59ef169a2e1402ab501f6e76d23969c~mv2.png/v1/fit/w_1440,h_838,q_90,enc_avif,quality_auto/6ccce7_b59ef169a2e1402ab501f6e76d23969c~mv2.png',
      'https://static.wixstatic.com/media/6ccce7_ed702fe71edb49598858812f6ca33e66~mv2.png/v1/fit/w_1440,h_829,q_90,enc_avif,quality_auto/6ccce7_ed702fe71edb49598858812f6ca33e66~mv2.png',
      'https://static.wixstatic.com/media/6ccce7_5dcb4a214d3140968e1f7b215388b5b2~mv2.png/v1/fit/w_1418,h_912,q_90,enc_avif,quality_auto/6ccce7_5dcb4a214d3140968e1f7b215388b5b2~mv2.png',
      'https://static.wixstatic.com/media/6ccce7_2607ccff66cc4f3c9e59f8f1a03bf203~mv2.png/v1/fit/w_1440,h_934,q_90,enc_avif,quality_auto/6ccce7_2607ccff66cc4f3c9e59f8f1a03bf203~mv2.png',
      'https://static.wixstatic.com/media/6ccce7_9747f54c3ce34c47ad306ee33362ba24~mv2.png/v1/fit/w_1440,h_892,q_90,enc_avif,quality_auto/6ccce7_9747f54c3ce34c47ad306ee33362ba24~mv2.png',
    ],
    published: true,
  },
  {
    slug: 'autodealer',
    title: 'AutoDealer — Vehicle Marketplace',
    role: 'Lead Developer and UI/UX Designer',
    stack: 'Figma · React',
    year: '2024/2025',
    client: 'Habari Media',
    githubLink: 'https://github.com/Jorge8017/autodealer.co.za-final-v1',
    tags: ['UX/UI Design', 'React', 'Figma'],
    problem:
      "AutoDealer's vehicle marketplace needed to handle thousands of listings without feeling like a slow, paginated database. Browsing, filtering, and comparing cars had to feel instant, even on a large, ad-supported page. This was the original design and build — later rebranded into CarMag.",
    approach:
      "Designed and built the full experience solo: an infinite-scroll inventory system on top of a paginated API, a dedicated filter drawer for narrowing results by make, model, and price, a contact form modal and a survey modal using React's createPortal for clean layering, and Google Ad Manager (GPT) integration across listing and article pages without hurting load performance.",
    color: '#C1553A',
    coverPosition: 'top center',
    image: 'https://static.wixstatic.com/media/6ccce7_f49952c5f2d749e1a6a70ec69396962a~mv2.png/v1/fit/w_1440,h_754,q_90,enc_avif,quality_auto/6ccce7_f49952c5f2d749e1a6a70ec69396962a~mv2.png',
    tileImage: 'https://static.wixstatic.com/media/6ccce7_f49952c5f2d749e1a6a70ec69396962a~mv2.png/v1/fit/w_1440,h_754,q_90,enc_avif,quality_auto/6ccce7_f49952c5f2d749e1a6a70ec69396962a~mv2.png',
    gallery: [
      'https://static.wixstatic.com/media/6ccce7_9d30b2a5a1ab461f889428aa37780f12~mv2.png/v1/fit/w_1440,h_769,q_90,enc_avif,quality_auto/6ccce7_9d30b2a5a1ab461f889428aa37780f12~mv2.png',
      'https://static.wixstatic.com/media/6ccce7_495f7236f28c44adbf38907404eb65fa~mv2.png/v1/fit/w_1440,h_698,q_90,enc_avif,quality_auto/6ccce7_495f7236f28c44adbf38907404eb65fa~mv2.png',
      'https://static.wixstatic.com/media/6ccce7_b346e6d763e4437491096258c8b09dd3~mv2.png/v1/fit/w_1440,h_769,q_90,enc_avif,quality_auto/6ccce7_b346e6d763e4437491096258c8b09dd3~mv2.png',
      'https://static.wixstatic.com/media/6ccce7_d43440fd857c44dd89f51142c723f9bc~mv2.png/v1/fit/w_1440,h_769,q_90,enc_avif,quality_auto/6ccce7_d43440fd857c44dd89f51142c723f9bc~mv2.png',
    ],
    published: true,
  },

  // ---------- React (in progress) ----------
  {
    slug: 'react-project-1',
    title: '[React Project 1 — coming soon]',
    role: '[Role]',
    stack: 'React',
    year: '[Year]',
    client: '[Client / personal project]',
    tags: ['React'],
    problem: '',
    approach: '',
    color: '#5C6670',
    image: '',
    tileImage: '',
    gallery: [],
    comingSoon: true,
    published: false,
  },
  {
    slug: 'react-project-2',
    title: '[React Project 2 — coming soon]',
    role: '[Role]',
    stack: 'React',
    year: '[Year]',
    client: '[Client / personal project]',
    tags: ['React'],
    problem: '',
    approach: '',
    color: '#6E5C54',
    image: '',
    tileImage: '',
    gallery: [],
    comingSoon: true,
    published: false,
  },
]

export default projects

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug && p.published)
}

export function getNextProject(slug) {
  const published = projects.filter((p) => p.published)
  const index = published.findIndex((p) => p.slug === slug)
  if (index === -1) return published[0]
  return published[(index + 1) % published.length]
}
