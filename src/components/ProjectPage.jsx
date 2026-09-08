import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNextProject } from '../data/projects'
import Reveal from './Reveal'
import Lightbox from './Lightbox'

function approachParagraphs(approach) {
  if (!approach) return []
  return Array.isArray(approach) ? approach : [approach]
}

function ProjectImage({
  src,
  alt,
  className,
  coverPosition,
  framed = false,
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
          <img src={src} alt={alt} loading="lazy" decoding="async" />
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
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </button>
    )
  }

  return (
    <div className={`case-image ${className || ''}`.trim()}>
      <span>{alt}</span>
    </div>
  )
}

export default function ProjectPage({ project }) {
  const nextProject = getNextProject(project.slug)
  const projectStyle = { '--project-color': project.color }
  const approach = approachParagraphs(project.approach)
  const gallery = project.gallery || []
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
    gallery.forEach((shot, index) => {
      items.push({
        src: shot,
        alt: `${project.title} detail ${index + 1}`,
      })
    })
    return items
  }, [project.image, project.title, gallery])

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
            {project.role} · {project.stack} · {project.year}
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

      {gallery.length > 0 && (
        <div className="wrap">
          <Reveal className="gallery">
            {gallery.map((shot, index) => (
              <ProjectImage
                key={shot}
                src={shot}
                alt={`${project.title} detail ${index + 1}`}
                className="project-gallery-image"
                onOpen={() => openAt(shot)}
              />
            ))}
          </Reveal>
        </div>
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
