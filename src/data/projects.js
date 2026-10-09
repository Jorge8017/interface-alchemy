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
import cgtMobileHome from '../assets/projects/compleat-golfer-tours/mobile-homepage.png'
import cgtMobilePackages from '../assets/projects/compleat-golfer-tours/mobile-packages.png'
import cgtMobilePackageDetail from '../assets/projects/compleat-golfer-tours/mobile-package-detail.png'
import cgtMobileDestinations from '../assets/projects/compleat-golfer-tours/mobile-destinations.png'

import bonaCover from '../assets/projects/bona-magazine/cover-homepage.png'
import bonaArticleSingle from '../assets/projects/bona-magazine/article-single.png'
import bonaDesktopStory from '../assets/projects/bona-magazine/desktop-story.png'
import bonaMobileHome from '../assets/projects/bona-magazine/mobile-homepage.png'
import bonaMobileMenu from '../assets/projects/bona-magazine/mobile-menu.png'
import bonaMobileStory from '../assets/projects/bona-magazine/mobile-story.png'
import bonaMobileDrawer from '../assets/projects/bona-magazine/mobile-article-drawer.png'

import avbCover from '../assets/projects/avb-transport/cover-homepage.png'
import avbDesktopServices from '../assets/projects/avb-transport/desktop-services.png'
import avbDesktopAbout from '../assets/projects/avb-transport/desktop-about.png'
import avbDesktopProjects from '../assets/projects/avb-transport/desktop-projects.png'
import avbDesktopReviews from '../assets/projects/avb-transport/desktop-reviews.png'
import avbDesktopQuote from '../assets/projects/avb-transport/desktop-quote.png'
import avbDesktopCredit from '../assets/projects/avb-transport/desktop-credit-modal.png'
import avbMobileHome from '../assets/projects/avb-transport/mobile-homepage.png'
import avbMobileServices from '../assets/projects/avb-transport/mobile-services.png'
import avbMobileAbout from '../assets/projects/avb-transport/mobile-about.png'
import avbMobileProjects from '../assets/projects/avb-transport/mobile-projects.png'
import avbMobileReviews from '../assets/projects/avb-transport/mobile-reviews.png'
import avbMobileQuote from '../assets/projects/avb-transport/mobile-quote.png'
import avbMobileCredit from '../assets/projects/avb-transport/mobile-credit-modal.png'
import avbPitch01 from '../assets/projects/avb-transport/pitch/slide-01.png'
import avbPitch02 from '../assets/projects/avb-transport/pitch/slide-02.png'
import avbPitch03 from '../assets/projects/avb-transport/pitch/slide-03.png'
import avbPitch04 from '../assets/projects/avb-transport/pitch/slide-04.png'
import avbPitch05 from '../assets/projects/avb-transport/pitch/slide-05.png'
import avbPitch06 from '../assets/projects/avb-transport/pitch/slide-06.png'
import avbPitch07 from '../assets/projects/avb-transport/pitch/slide-07.png'
import avbPitch08 from '../assets/projects/avb-transport/pitch/slide-08.png'
import avbPitch09 from '../assets/projects/avb-transport/pitch/slide-09.png'
import avbPitch10 from '../assets/projects/avb-transport/pitch/slide-10.png'
import avbPitch11 from '../assets/projects/avb-transport/pitch/slide-11.png'
import avbPitch12 from '../assets/projects/avb-transport/pitch/slide-12.png'
import avbPitch13 from '../assets/projects/avb-transport/pitch/slide-13.png'
import avbPitch14 from '../assets/projects/avb-transport/pitch/slide-14.png'
import avbPitch15 from '../assets/projects/avb-transport/pitch/slide-15.png'
import avbPitch16 from '../assets/projects/avb-transport/pitch/slide-16.png'

import repoDesktopLanding from '../assets/projects/repo-recap/desktop-landing.png'
import repoDesktopStory from '../assets/projects/repo-recap/desktop-story.png'
import repoDesktopShare from '../assets/projects/repo-recap/desktop-share.png'
import repoMobileLanding from '../assets/projects/repo-recap/mobile-landing.png'
import repoMobileStory from '../assets/projects/repo-recap/mobile-story.png'
import repoMobileShare from '../assets/projects/repo-recap/mobile-share.png'
import repoGhostMode from '../assets/projects/repo-recap/ghost-mode.png'

export const projects = [
  // ---------- Product / React ----------
  {
    slug: 'repo-recap',
    title: 'Repo Recap',
    summary:
      'Type any public GitHub username and get a nine-slide, story-style recap of their work: languages, streaks, peak hours and a personality card worth sharing.',
    excerpt:
      'A story-style recap for any public GitHub profile — designed, built, branded and shipped in two days.',
    role: 'Solo — product design, development, branding and deployment',
    timeline: '2 days (October 2026)',
    stack: 'React, TypeScript, Vite, Tailwind CSS, Framer Motion, TanStack Query, Vitest, Playwright, Vercel',
    year: '2026',
    client: 'Personal project',
    liveLinks: [
      { label: 'View live site', url: 'https://recap.jordanshears.com' },
      { label: 'View code', url: 'https://github.com/Jorge8017/repo-recap' },
    ],
    tags: ['React', 'TypeScript', 'Product Design'],
    problem:
      'A story-style recap for any public GitHub profile — designed, built, branded and shipped in two days.',
    approach:
      'Most of my professional work lives in WordPress and client sites, so I wanted a portfolio piece that shows what I can do in React end to end.',
    color: '#37473A',
    coverPosition: 'center center',
    image: repoDesktopStory,
    tileImage: repoDesktopLanding,
    seo: {
      title: 'Repo Recap — Case Study | Jordan Shears',
      description:
        'A story-style recap for any public GitHub profile, designed, built and shipped in two days with React and TypeScript.',
      ogImage: 'https://jordanshears.com/projects/repo-recap/desktop-share.png',
      ogUrl: 'https://jordanshears.com/work/repo-recap',
    },
    caseStudy: {
      overview: [
        'Most of my professional work lives in WordPress and client sites, so I wanted a portfolio piece that shows what I can do in React end to end: product thinking, interaction design, a real data layer, and the polish needed to ship something people actually share.',
        'Repo Recap turns any public GitHub profile into a short, tappable story, in the spirit of year-in-review formats like GitHub Unwrapped, but instant, available any day of the year, and with no login.',
      ],
      challenge: [
        'Work for every kind of profile: accounts with 300 repos and 40,000 stars, and accounts with nothing public at all.',
        "Stay fast and free: no backend, no login, and GitHub's unauthenticated limit of 60 requests an hour.",
        'Feel like a product, not a demo: a consistent visual system, a shareable output, and a layout that holds up on any screen.',
      ],
      designDecisions: [
        {
          title: 'A story, not a dashboard',
          body: 'Stats land harder one at a time. Each slide has one idea, a kicker (“03 / 09 · PUBLIC CATALOG”), one hero number and a supporting detail. Auto-advance, tap zones and hold-to-pause make it feel native on a phone.',
          image: repoMobileStory,
          alt: 'Repo Recap mobile story slide showing busiest day and peak hour',
          width: 390,
          height: 844,
        },
        {
          title: 'A theatre on desktop',
          body: 'Early versions were a phone-shaped column floating in a black void. I redesigned desktop as a theatre: the story card centred on an ambient glow that matches each slide, with prev/next buttons and keyboard hints.',
          image: repoDesktopStory,
          alt: 'Repo Recap desktop theatre view on the public catalog stats slide',
          width: 1440,
          height: 900,
        },
        {
          title: 'One layout system for every stat',
          body: 'After slides drifted out of sync, I built a single HeroStatSlide component (lead line, hero value, details row) so every stat slide stays consistent by construction. Values measure themselves and shrink to fit, so “Wednesday” or a 30-character repo name never overflows.',
        },
        {
          title: 'Designing for empty data',
          body: 'Accounts with no public work originally got a wall of zeros. Now they get a dedicated “Quiet Mode” story and a “Ghost Mode” personality: building in private, mysterious. Empty states should feel designed, not broken.',
          image: repoGhostMode,
          alt: 'Repo Recap Ghost Mode personality card for a low-activity GitHub profile',
          width: 390,
          height: 844,
        },
        {
          title: 'A card worth sharing',
          body: 'The final slide exports a 1080×1350 image for LinkedIn, Instagram or X, with the personality, top languages and key stats.',
          image: repoDesktopShare,
          alt: 'Repo Recap shareable personality card on desktop',
          width: 1440,
          height: 900,
        },
        {
          title: 'Brand',
          body: 'I explored four logo directions and refined “Code, Played”: a code chevron whose angle echoes a gradient play button, meaning code turned into a story. It ships as the header mark, favicon set and link-preview image.',
        },
      ],
      technical: [
        {
          title: 'Rate limits',
          body: 'Each recap uses only three GitHub API calls, results are cached for an hour, and 404 and rate-limit responses are never retried, so a typo doesn’t burn the hourly quota. Friendly error screens show when the limit resets.',
        },
        {
          title: 'Reliable image export',
          body: 'Exported cards were missing avatars. I render the export card off-screen at full size, load the avatar as a data URL, wait for fonts and image decoding, and fall back to the user’s initial if the avatar can’t load.',
        },
        {
          title: 'Smooth playback',
          body: 'Progress bars animate with Framer Motion values rather than React state, so the slide doesn’t re-render every frame.',
        },
        {
          title: 'Text that fits any data',
          body: 'A useFitText hook measures each hero value against its container and scales it down, so layouts hold for every username, day name and repo name on any screen size.',
        },
        {
          title: 'Link previews',
          body: 'The Open Graph image keeps all key content in a centred square so WhatsApp’s square crop never cuts off the title.',
        },
      ],
      quality: [
        'Unit tests for every stat calculation, personality rule and empty-state path, plus Playwright end-to-end tests at desktop and phone sizes',
        'CI on every push: lint, type-check, tests and build',
        'Accessible by default: full keyboard control, screen-reader announcements per slide, reduced-motion support and WCAG AA contrast',
      ],
      howIWorked:
        'I used Cursor as a pair programmer. I owned the product direction, UX and visual design, architecture and code review, tested every flow on real devices, and turned each bug I found into a fix plus a test.',
      learned: [
        'Designing for the edge cases (empty profiles, long names, failed images) took as long as the happy path, and made the product feel finished.',
        'A shared layout component beats fixing screens one by one.',
        'Shipping to a real domain with real link previews surfaces problems no local build will.',
      ],
      next: [
        'A serverless proxy with a GitHub token for higher rate limits and the full yearly contribution calendar',
        'An embeddable SVG card for GitHub profile READMEs',
        'A compare mode (/vs/userA/userB) and custom date ranges',
      ],
    },
    gallery: {
      layout: 'showcase',
      desktop: [
        {
          src: repoDesktopLanding,
          caption: 'Landing — type any public GitHub username to start a recap.',
          width: 1440,
          height: 900,
        },
      ],
      mobile: [
        {
          src: repoMobileLanding,
          caption: 'Mobile landing tuned for a quick username entry.',
          width: 390,
          height: 844,
        },
        {
          src: repoMobileStory,
          caption: 'Busiest-day slide — one idea per frame on a phone.',
          width: 390,
          height: 844,
        },
        {
          src: repoMobileShare,
          caption: 'Shareable personality card ready to save or post.',
          width: 390,
          height: 844,
        },
      ],
    },
    published: true,
  },

  // ---------- WordPress builds ----------
  {
    slug: 'bona-magazine',
    title: 'Bona Magazine — Redesign & Rebuild',
    role: 'WordPress Developer & Designer',
    stack: 'WordPress · PHP · Custom Theme',
    year: '2026',
    client: 'Bona Magazine',
    liveLinks: [
      { label: 'Live site', url: 'https://www.bona.co.za/' },
    ],
    tags: ['WordPress', 'Custom Theme', 'PHP', 'Web Design'],
    problem:
      'Bona Magazine needed a fully custom WordPress theme built to match an existing Figma design exactly — no page builder shortcuts, no off-the-shelf theme stretched to fit.',
    approach:
      'Built the theme from scratch (bona-mag-theme), converting the Figma design into a dynamic front-page.php with reusable template parts. Added a dedicated Bona Settings admin page so editors could control site-wide options without touching code, plus a setup script to populate dummy content for fast preview and QA during development.',
    color: '#A13D3D',
    coverPosition: 'top center',
    image: bonaCover,
    tileImage: bonaCover,
    gallery: {
      layout: 'showcase',
      desktop: [
        {
          src: bonaArticleSingle,
          caption:
            'Single post with author meta, featured image and a sidebar for promos.',
        },
        {
          src: bonaDesktopStory,
          caption:
            'Instagram-style category stories, opened from the circles in the header.',
        },
      ],
      mobile: [
        {
          src: bonaMobileHome,
          caption: 'Category circles scroll sideways under the logo.',
        },
        {
          src: bonaMobileMenu,
          caption: 'Full-screen menu with expandable sections.',
        },
        {
          src: bonaMobileStory,
          caption: 'Tap through a category’s latest posts.',
        },
        {
          src: bonaMobileDrawer,
          caption: 'A bottom sheet links each story to its article.',
        },
      ],
    },
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
    gallery: {
      layout: 'showcase',
      desktop: [
        {
          src: cgtHomepage,
          caption: 'Homepage with featured packages and clear paths into the catalogue.',
        },
        {
          src: cgtPackageDetail,
          caption: 'Single-package template built for complex international tours.',
        },
        {
          src: cgtDestinations,
          caption: 'Destination browse with a three-level flyout for finding trips.',
        },
        {
          src: cgtBeachcomber,
          caption: 'Mauritius Beachcomber package page shaped for organic discovery.',
        },
      ],
      mobile: [
        {
          src: cgtMobileHome,
          caption: 'Mobile homepage keeps packages and destinations within reach.',
        },
        {
          src: cgtMobilePackages,
          caption: 'Package listing tuned for quick scanning on a phone.',
        },
        {
          src: cgtMobilePackageDetail,
          caption: 'Package detail with the booking path front and centre.',
        },
        {
          src: cgtMobileDestinations,
          caption: 'Destination browse that still works in a narrow viewport.',
        },
      ],
    },
    published: true,
  },
  {
    slug: 'avb-transport',
    title: 'AVB Transport — Redesign Concept',
    role: 'WordPress Developer & Designer',
    stack: 'WordPress · PHP · Custom Theme',
    year: '2026',
    client: 'AVB Transport',
    tags: [
      'WordPress',
      'PHP',
      'Custom Theme',
      'Web Design',
      'UX',
      'Responsive',
    ],
    problem:
      "AVB Transport's 2021 Wix site hid its strongest selling points: three generations in the trade since 1952, a 32-truck fleet, Level 1 B-BBEE status and City of Cape Town accreditation. Visitors saw a stock gravel photo, and the quote form asked only for a name and an email.",
    approach:
      "I redesigned and built a one-page site in AVB's own red and black. It has a hero with a real AVB truck, a tabbed services panel, a family-story section, a project gallery, reviews, a structured quote form and a pop-up credit application. Every section ends in a call to action, and the mobile layout includes a sticky call-and-quote bar. I pitched it to AVB with a 16-slide proposal deck.",
    color: '#C4161C',
    coverPosition: 'center center',
    image: avbCover,
    tileImage: avbCover,
    gallery: {
      layout: 'showcase',
      desktop: [
        {
          src: avbDesktopServices,
          caption: 'Tabbed services panel covering sand, stone, lime, rubble and plant hire.',
        },
        {
          src: avbDesktopAbout,
          caption: 'Family story since 1952 — three generations and a 32-truck fleet on the homepage.',
        },
        {
          src: avbDesktopProjects,
          caption: 'Project gallery proving the work across Cape Town sites.',
        },
        {
          src: avbDesktopReviews,
          caption: 'Reviews that put word-of-mouth next to the brand.',
        },
        {
          src: avbDesktopQuote,
          caption: 'Structured quote form that captures every detail the office needs.',
        },
        {
          src: avbDesktopCredit,
          caption: 'Pop-up credit application without leaving the one-pager.',
        },
      ],
      mobile: [
        {
          src: avbMobileHome,
          caption: 'Mobile hero with AVB’s truck front and centre.',
        },
        {
          src: avbMobileServices,
          caption: 'Services stay scannable in a narrow viewport.',
        },
        {
          src: avbMobileAbout,
          caption: 'Heritage and fleet proof without burying the story.',
        },
        {
          src: avbMobileProjects,
          caption: 'Project gallery stacked for the phone.',
        },
        {
          src: avbMobileReviews,
          caption: 'Reviews that still read cleanly on mobile.',
        },
        {
          src: avbMobileQuote,
          caption: 'Quote form fields that stay usable with one thumb.',
        },
        {
          src: avbMobileCredit,
          caption: 'Credit application modal on a small screen.',
        },
      ],
    },
    pitch: {
      title: 'Website redesign proposal',
      slides: [
        { src: avbPitch01, alt: 'Cover: A website as solid as the fleet' },
        { src: avbPitch02, alt: "A 74-year story the website doesn't tell" },
        { src: avbPitch03, alt: "The homepage shows gravel, not AVB" },
        { src: avbPitch04, alt: 'Small problems that cost enquiries' },
        { src: avbPitch05, alt: 'Turn every visitor into a quote request' },
        { src: avbPitch06, alt: 'Who AVB is, in five seconds' },
        { src: avbPitch07, alt: 'Every service in one panel' },
        { src: avbPitch08, alt: 'Heritage, told with numbers' },
        { src: avbPitch09, alt: 'Work clients can see for themselves' },
        { src: avbPitch10, alt: 'Let clients speak for AVB' },
        { src: avbPitch11, alt: 'Quotes without the back-and-forth' },
        { src: avbPitch12, alt: 'Built for the phone on site' },
        { src: avbPitch13, alt: 'What changes, section by section' },
        { src: avbPitch14, alt: 'What AVB gets from the new site' },
        { src: avbPitch15, alt: 'From proposal to a live site' },
        { src: avbPitch16, alt: "Let's get AVB's website moving" },
      ],
    },
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
    gallery: {
      layout: 'showcase',
      desktop: [
        {
          src: 'https://static.wixstatic.com/media/6ccce7_9fd7ebde27e54978a0c7166b89ca74e9~mv2.png/v1/fit/w_1352,h_901,q_90,enc_avif,quality_auto/6ccce7_9fd7ebde27e54978a0c7166b89ca74e9~mv2.png',
          caption: 'Deal browsing built for quick scanning on a phone.',
        },
        {
          src: 'https://static.wixstatic.com/media/6ccce7_b59ef169a2e1402ab501f6e76d23969c~mv2.png/v1/fit/w_1440,h_838,q_90,enc_avif,quality_auto/6ccce7_b59ef169a2e1402ab501f6e76d23969c~mv2.png',
          caption: 'Deal detail with the offer and next step front and centre.',
        },
        {
          src: 'https://static.wixstatic.com/media/6ccce7_ed702fe71edb49598858812f6ca33e66~mv2.png/v1/fit/w_1440,h_829,q_90,enc_avif,quality_auto/6ccce7_ed702fe71edb49598858812f6ca33e66~mv2.png',
          caption: 'Subscription tier pitched with a concrete extra discount.',
        },
        {
          src: 'https://static.wixstatic.com/media/6ccce7_5dcb4a214d3140968e1f7b215388b5b2~mv2.png/v1/fit/w_1418,h_912,q_90,enc_avif,quality_auto/6ccce7_5dcb4a214d3140968e1f7b215388b5b2~mv2.png',
          caption: 'Account and membership states that keep value visible.',
        },
        {
          src: 'https://static.wixstatic.com/media/6ccce7_2607ccff66cc4f3c9e59f8f1a03bf203~mv2.png/v1/fit/w_1440,h_934,q_90,enc_avif,quality_auto/6ccce7_2607ccff66cc4f3c9e59f8f1a03bf203~mv2.png',
          caption: 'Saved deals and follow-through flows for returning users.',
        },
        {
          src: 'https://static.wixstatic.com/media/6ccce7_9747f54c3ce34c47ad306ee33362ba24~mv2.png/v1/fit/w_1440,h_892,q_90,enc_avif,quality_auto/6ccce7_9747f54c3ce34c47ad306ee33362ba24~mv2.png',
          caption: 'Supporting screens that keep the catalogue feel consistent.',
        },
      ],
      mobile: [],
    },
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
    gallery: {
      layout: 'showcase',
      desktop: [
        {
          src: 'https://static.wixstatic.com/media/6ccce7_9d30b2a5a1ab461f889428aa37780f12~mv2.png/v1/fit/w_1440,h_769,q_90,enc_avif,quality_auto/6ccce7_9d30b2a5a1ab461f889428aa37780f12~mv2.png',
          caption: 'Inventory browse with infinite scroll over a paginated API.',
        },
        {
          src: 'https://static.wixstatic.com/media/6ccce7_495f7236f28c44adbf38907404eb65fa~mv2.png/v1/fit/w_1440,h_698,q_90,enc_avif,quality_auto/6ccce7_495f7236f28c44adbf38907404eb65fa~mv2.png',
          caption: 'Filter drawer for narrowing by make, model, and price.',
        },
        {
          src: 'https://static.wixstatic.com/media/6ccce7_b346e6d763e4437491096258c8b09dd3~mv2.png/v1/fit/w_1440,h_769,q_90,enc_avif,quality_auto/6ccce7_b346e6d763e4437491096258c8b09dd3~mv2.png',
          caption: 'Listing detail with contact and comparison paths close at hand.',
        },
        {
          src: 'https://static.wixstatic.com/media/6ccce7_d43440fd857c44dd89f51142c723f9bc~mv2.png/v1/fit/w_1440,h_769,q_90,enc_avif,quality_auto/6ccce7_d43440fd857c44dd89f51142c723f9bc~mv2.png',
          caption: 'Ad-supported surfaces that keep browse performance intact.',
        },
      ],
      mobile: [],
    },
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
