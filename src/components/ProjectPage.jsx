import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNextProject } from '../data/projects'
import Reveal from './Reveal'
import Lightbox from './Lightbox'
import SlideDeck from './SlideDeck/SlideDeck'
import usePageMeta from '../hooks/usePageMeta'

function approachParagraphs(approach) {
  if (!approach) return []
  return Array.isArray(approach) ? approach : [approach]
}

function asShots(items = []) {
  return items.map((item) =>
    typeof item === 'string' ? { src: item, caption: '' } : item,
  )
}

function normalizeGallery(gallery) {
  if (!gallery) {
    return { layout: 'showcase', desktop: [], mobile: [] }
  }

  // Flat arrays become desktop showcase shots so every project shares one style.
  if (Array.isArray(gallery)) {
    return {
      layout: 'showcase',
      desktop: asShots(gallery),
      mobile: [],
    }
  }

  return {
    layout: 'showcase',
    desktop: asShots(gallery.desktop),
    mobile: asShots(gallery.mobile),
  }
}

function flattenGallery(gallery) {
  return [...gallery.desktop, ...gallery.mobile]
}

function ProjectImage({
  src,
  alt,
  className,
  coverPosition,
  framed = false,
  width,
  height,
  onOpen,
}) {
  if (src && framed) {
    return (
      <button
        type="button"
        className={`cover-frame is-zoomable ${className || ''}`.trim()}
        style={coverPosition ? { '--cover-position': coverPosition } : undefined}
        onClick={onOpen}
        aria-label={`Expand image: ${alt}`}
      >
        <div className="cover-frame-media">
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
          />
        </div>
      </button>
    )
  }

  if (src) {
    return (
      <button
        type="button"
        className={`case-image has-media is-zoomable ${className || ''}`.trim()}
        onClick={onOpen}
        aria-label={`Expand image: ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </button>
    )
  }

  return (
    <div className={`case-image ${className || ''}`.trim()}>
      <span>{alt}</span>
    </div>
  )
}

function ShowcaseShot({ shot, alt, variant, onOpen }) {
  return (
    <figure className={`showcase-shot showcase-shot--${variant}`}>
      <div className="showcase-device">
        {variant === 'desktop' && (
          <div className="showcase-chrome" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}
        <ProjectImage
          src={shot.src}
          alt={alt}
          width={shot.width}
          height={shot.height}
          className={`showcase-image showcase-image--${variant}`}
          onOpen={onOpen}
        />
      </div>
      {shot.caption && (
        <figcaption className="showcase-caption">{shot.caption}</figcaption>
      )}
    </figure>
  )
}

function CaseStudyBody({ caseStudy, openAt }) {
  return (
    <div className="case-study-rich">
      {caseStudy.overview?.length > 0 && (
        <section className="case-study-block">
          <h3>Overview</h3>
          {caseStudy.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      )}

      {caseStudy.challenge?.length > 0 && (
        <section className="case-study-block">
          <h3>The challenge</h3>
          <ul className="case-study-list">
            {caseStudy.challenge.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {caseStudy.designDecisions?.length > 0 && (
        <section className="case-study-block">
          <h3>Design decisions</h3>
          <div className="case-decision-list">
            {caseStudy.designDecisions.map((decision, index) => (
              <article
                key={decision.title}
                className={`case-decision${index % 2 === 1 ? ' reverse' : ''}${decision.image ? '' : ' text-only'}`}
              >
                {decision.image && (
                  <div className="case-decision-media">
                    <ProjectImage
                      src={decision.image}
                      alt={decision.alt || decision.title}
                      width={decision.width}
                      height={decision.height}
                      className="case-decision-image"
                      onOpen={() => openAt(decision.image)}
                    />
                  </div>
                )}
                <div className="case-decision-copy">
                  <h4>{decision.title}</h4>
                  <p>{decision.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {caseStudy.technical?.length > 0 && (
        <section className="case-study-block">
          <h3>Technical challenges</h3>
          <div className="case-tech-list">
            {caseStudy.technical.map((item) => (
              <div key={item.title} className="case-tech-item">
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {caseStudy.quality?.length > 0 && (
        <section className="case-study-block">
          <h3>Quality</h3>
          <ul className="case-study-list">
            {caseStudy.quality.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {caseStudy.howIWorked && (
        <section className="case-study-block">
          <h3>How I worked</h3>
          <p>{caseStudy.howIWorked}</p>
        </section>
      )}

      {caseStudy.learned?.length > 0 && (
        <section className="case-study-block">
          <h3>What I learned</h3>
          <ul className="case-study-list">
            {caseStudy.learned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {caseStudy.next?.length > 0 && (
        <section className="case-study-block">
          <h3>What’s next</h3>
          <ul className="case-study-list">
            {caseStudy.next.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default function ProjectPage({ project }) {
  const nextProject = getNextProject(project.slug)
  const projectStyle = { '--project-color': project.color }
  const approach = approachParagraphs(project.approach)
  const gallery = useMemo(
    () => normalizeGallery(project.gallery),
    [project.gallery],
  )
  const galleryShots = useMemo(() => flattenGallery(gallery), [gallery])
  const hasGallery = galleryShots.length > 0
  const hasCaseStudy = Boolean(project.caseStudy)
  const hasLinks =
    project.figmaLink ||
    project.githubLink ||
    project.liveUrl ||
    (project.liveLinks && project.liveLinks.length > 0)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  usePageMeta({
    title: project.seo?.title,
    description: project.seo?.description,
    ogImage: project.seo?.ogImage,
    ogUrl: project.seo?.ogUrl,
  })

  const lightboxImages = useMemo(() => {
    const items = []
    const seen = new Set()
    const push = (src, alt) => {
      if (!src || seen.has(src)) return
      seen.add(src)
      items.push({ src, alt })
    }

    push(project.image, project.title)
    project.caseStudy?.designDecisions?.forEach((decision) => {
      push(decision.image, decision.alt || decision.title)
    })
    galleryShots.forEach((shot, index) => {
      push(shot.src, shot.caption || `${project.title} detail ${index + 1}`)
    })
    return items
  }, [project, galleryShots])

  const openAt = (src) => {
    const index = lightboxImages.findIndex((item) => item.src === src)
    if (index !== -1) setLightboxIndex(index)
  }

  return (
    <div className="project-page" style={projectStyle}>
      <section className="project-hero">
        <Reveal className="wrap">
          <Link to="/work" className="back-link">
            ← Back to work
          </Link>
          <h1 className="project-title">{project.title}</h1>
          {project.summary ? (
            <p className="project-summary">{project.summary}</p>
          ) : (
            <p className="meta">
              {project.role} · {project.stack} · {project.year}
            </p>
          )}
        </Reveal>
      </section>

      <Reveal as="div" className="project-cover-wrap wrap">
        <ProjectImage
          src={project.image}
          alt={project.title}
          className="project-cover"
          coverPosition={project.coverPosition}
          width={1440}
          height={900}
          framed
          onOpen={() => openAt(project.image)}
        />
      </Reveal>

      <section className="case-body">
        <div className="wrap">
          <div className="case-cols">
            <Reveal className="case-meta">
              <div className="row">
                <div className="k">Role</div>
                <div className="v">{project.role}</div>
              </div>
              {project.timeline ? (
                <div className="row">
                  <div className="k">Timeline</div>
                  <div className="v">{project.timeline}</div>
                </div>
              ) : (
                <div className="row">
                  <div className="k">Year</div>
                  <div className="v">{project.year}</div>
                </div>
              )}
              <div className="row">
                <div className="k">Stack</div>
                <div className="v">{project.stack}</div>
              </div>
              {!project.timeline && project.client && (
                <div className="row">
                  <div className="k">Client</div>
                  <div className="v">{project.client}</div>
                </div>
              )}
              {hasLinks && (
                <div className="row">
                  <div className="k">Links</div>
                  <div className="v project-meta-links">
                    {project.liveLinks?.map(({ label, url }) => (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {label}
                      </a>
                    ))}
                    {!project.liveLinks?.length && project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live site
                      </a>
                    )}
                    {project.figmaLink && (
                      <a
                        href={project.figmaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Figma
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              )}
            </Reveal>
            {!hasCaseStudy && (
              <Reveal>
                <div className="case-text">
                  <h3>The problem</h3>
                  <p>{project.problem}</p>
                  <h3>The approach</h3>
                  {approach.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="case-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </Reveal>
            )}
            {hasCaseStudy && (
              <Reveal>
                <div className="case-text">
                  <h3>Overview</h3>
                  {project.caseStudy.overview?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="case-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {hasCaseStudy && (
        <section className="case-study-sections wrap">
          <Reveal>
            <CaseStudyBody
              caseStudy={{ ...project.caseStudy, overview: [] }}
              openAt={openAt}
            />
          </Reveal>
        </section>
      )}

      {hasGallery && (
        <section className="gallery-showcase wrap">
          {gallery.desktop.length > 0 && (
            <Reveal className="showcase-desktop">
              {gallery.desktop.map((shot) => (
                <ShowcaseShot
                  key={shot.src}
                  shot={shot}
                  alt={shot.caption || project.title}
                  variant="desktop"
                  onOpen={() => openAt(shot.src)}
                />
              ))}
            </Reveal>
          )}

          {gallery.mobile.length > 0 && (
            <Reveal className="showcase-mobile">
              <div className="showcase-mobile-head">
                <h3 className="showcase-mobile-title">On mobile</h3>
                <span className="showcase-mobile-count">
                  {gallery.mobile.length} screens
                </span>
              </div>
              <div className="showcase-mobile-band">
                {gallery.mobile.map((shot) => (
                  <ShowcaseShot
                    key={shot.src}
                    shot={shot}
                    alt={shot.caption || project.title}
                    variant="mobile"
                    onOpen={() => openAt(shot.src)}
                  />
                ))}
              </div>
            </Reveal>
          )}
        </section>
      )}

      {project.pitch?.slides?.length > 0 && (
        <section className="project-pitch wrap">
          <Reveal>
            <h3 className="project-pitch-title">The pitch</h3>
            <SlideDeck
              title={project.pitch.title || 'Proposal deck'}
              slides={project.pitch.slides}
            />
          </Reveal>
        </section>
      )}

      <div className="wrap">
        <Reveal>
          <Link to={`/work/${nextProject.slug}`} className="next-project">
            <span className="label">Next project</span>
            <span className="next-title">{nextProject.title} →</span>
          </Link>
        </Reveal>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </div>
  )
}
