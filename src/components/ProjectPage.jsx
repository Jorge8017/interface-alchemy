import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNextProject } from '../data/projects'
import Reveal from './Reveal'
import Lightbox from './Lightbox'
import SlideDeck from './SlideDeck/SlideDeck'

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
  onOpen,
  focus,
  fit,
}) {
  const focusClass =
    focus === 'center' ? 'is-focus-center' : focus === 'top' ? 'is-focus-top' : ''
  const fitClass = fit === 'contain' ? 'is-fit-contain' : ''
  const classes = [className, focusClass, fitClass].filter(Boolean).join(' ')

  if (src && framed) {
    return (
      <button
        type="button"
        className={`cover-frame is-zoomable ${classes}`.trim()}
        style={coverPosition ? { '--cover-position': coverPosition } : undefined}
        onClick={onOpen}
        aria-label={`Expand image: ${alt}`}
      >
        <div className="cover-frame-media">
          <img src={src} alt={alt} loading="lazy" decoding="async" />
        </div>
      </button>
    )
  }

  if (src) {
    return (
      <button
        type="button"
        className={`case-image has-media is-zoomable ${classes}`.trim()}
        onClick={onOpen}
        aria-label={`Expand image: ${alt}`}
      >
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </button>
    )
  }

  return (
    <div className={`case-image ${classes}`.trim()}>
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
          className={`showcase-image showcase-image--${variant}`}
          focus={shot.focus}
          fit={shot.fit}
          onOpen={onOpen}
        />
      </div>
      {shot.caption && (
        <figcaption className="showcase-caption">{shot.caption}</figcaption>
      )}
    </figure>
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
  const hasLinks =
    project.figmaLink ||
    project.githubLink ||
    project.liveUrl ||
    (project.liveLinks && project.liveLinks.length > 0)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const lightboxImages = useMemo(() => {
    const items = []
    if (project.image) {
      items.push({ src: project.image, alt: project.title })
    }
    galleryShots.forEach((shot, index) => {
      items.push({
        src: shot.src,
        alt: shot.caption || `${project.title} detail ${index + 1}`,
      })
    })
    return items
  }, [project.image, project.title, galleryShots])

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
          <p className="meta">
            {project.metaLine ||
              `${project.role} · ${project.stack} · ${project.year}`}
          </p>
        </Reveal>
      </section>

      <Reveal as="div" className="project-cover-wrap wrap">
        <ProjectImage
          src={project.image}
          alt={project.title}
          className="project-cover"
          coverPosition={project.coverPosition}
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
              <div className="row">
                <div className="k">Stack</div>
                <div className="v">{project.stack}</div>
              </div>
              <div className="row">
                <div className="k">Year</div>
                <div className="v">{project.year}</div>
              </div>
              <div className="row">
                <div className="k">Client</div>
                <div className="v">{project.client}</div>
              </div>
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
          </div>
        </div>
      </section>

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
