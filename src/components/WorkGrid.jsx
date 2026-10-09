import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'

function ProjectMedia({ src, alt, className, coverPosition }) {
  if (src) {
    return (
      <div
        className={`cover-frame ${className || ''}`.trim()}
        style={coverPosition ? { '--cover-position': coverPosition } : undefined}
      >
        <div className="cover-frame-media">
          <img src={src} alt={alt} loading="lazy" decoding="async" />
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <span>{alt}</span>
    </div>
  )
}

export default function WorkGrid({
  projects,
  linkStyle = 'route',
  showToggle = true,
  title,
  subtitle,
  variant = 'grid',
}) {
  const [view, setView] = useState(variant === 'featured' ? 'featured' : 'grid')
  const isList = view === 'list'
  const isFeatured = view === 'featured'

  useEffect(() => {
    if (variant === 'featured') setView('featured')
  }, [variant])

  const visibleProjects = projects.filter((project) => project.published)

  const tileLink = (project, index) => {
    if (project.comingSoon) return null
    if (linkStyle === 'route') return `/work/${project.slug}`
    if (linkStyle === 'hash') return `#case-${index + 1}`
    return null
  }

  const projectStyle = (project) => ({ '--project-color': project.color })

  const CardWrapper = ({ project, index, children, className }) => {
    const href = tileLink(project, index)
    const style = projectStyle(project)
    const classes = `${className}${project.comingSoon ? ' is-coming-soon' : ''}`

    if (linkStyle === 'route' && href) {
      return (
        <Link to={href} className={classes} style={style}>
          {children}
        </Link>
      )
    }
    if (linkStyle === 'hash' && href) {
      return (
        <a href={href} className={classes} style={style}>
          {children}
        </a>
      )
    }
    return (
      <div className={classes} style={style}>
        {children}
      </div>
    )
  }

  return (
    <>
      {(title || showToggle) && (
        <Reveal className="section-head">
          {title && (
            <div>
              {typeof title === 'string' ? <h2>{title}</h2> : title}
              {subtitle && <p className="page-sub">{subtitle}</p>}
            </div>
          )}
          {showToggle && variant !== 'featured' && (
            <div className="view-toggle">
              <button
                type="button"
                className={view === 'grid' ? 'active' : ''}
                onClick={() => setView('grid')}
              >
                Grid
              </button>
              <button
                type="button"
                className={view === 'list' ? 'active' : ''}
                onClick={() => setView('list')}
              >
                List
              </button>
            </div>
          )}
        </Reveal>
      )}

      {isFeatured ? (
        <div className="work-featured">
          {visibleProjects.map((project, index) => (
            <Reveal key={project.slug}>
              <CardWrapper
                project={project}
                index={index}
                className={`work-card${index % 2 === 1 ? ' reverse' : ''}`}
              >
                <div className="work-card-media">
                  <ProjectMedia
                    src={project.tileImage}
                    alt={project.title}
                    className="work-card-image"
                    coverPosition={project.coverPosition}
                  />
                </div>
                <div className="work-card-body">
                  <div className="work-card-tags">
                    {project.comingSoon ? (
                      <span>Coming soon</span>
                    ) : project.excerpt && project.tags?.length ? (
                      project.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))
                    ) : (
                      <>
                        <span>{project.role}</span>
                        <span>{project.stack}</span>
                      </>
                    )}
                  </div>
                  <h3 className="work-card-title">{project.title}</h3>
                  {(project.excerpt || project.problem) && (
                    <p className="work-card-excerpt">
                      {project.excerpt || project.problem}
                    </p>
                  )}
                  {project.comingSoon ? (
                    <span className="work-card-cta work-card-cta--soon">Coming soon</span>
                  ) : (
                    <span className="work-card-cta">View case →</span>
                  )}
                </div>
              </CardWrapper>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal as="div" className={`work-grid${isList ? ' list-mode' : ''}`} id="workGrid">
          {visibleProjects.map((project, index) => {
            const href = tileLink(project, index)
            const style = projectStyle(project)
            const tileClass = `tile${project.comingSoon ? ' is-coming-soon' : ''}`
            const content = (
              <>
                <ProjectMedia
                  src={project.tileImage}
                  alt={project.title}
                  className="tile-ph"
                  coverPosition={project.coverPosition}
                />
                <div className="tile-overlay" />
                  <div className="tile-label">
                  <div className="tile-tags">
                    {project.comingSoon ? (
                      <span>Coming soon</span>
                    ) : project.excerpt && project.tags?.length ? (
                      project.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))
                    ) : (
                      <span>{project.role}</span>
                    )}
                  </div>
                  <div className="t">{project.title}</div>
                  <div className="m">
                    {project.comingSoon
                      ? 'Coming soon'
                      : project.excerpt || `${project.role} — ${project.year}`}
                  </div>
                  {!project.comingSoon && <span className="tile-cta">View case →</span>}
                </div>
              </>
            )

            if (linkStyle === 'route' && href) {
              return (
                <Link key={project.slug} className={tileClass} to={href} style={style}>
                  {content}
                </Link>
              )
            }

            if (linkStyle === 'hash' && href) {
              return (
                <a key={project.slug} className={tileClass} href={href} style={style}>
                  {content}
                </a>
              )
            }

            return (
              <div key={project.slug} className={tileClass} style={style}>
                {content}
              </div>
            )
          })}

          {visibleProjects.map((project, index) => {
            const href = tileLink(project, index)
            const rowClass = `list-row${project.comingSoon ? ' is-coming-soon' : ''}`
            const content = (
              <>
                <span className="t">{project.title}</span>
                <span className="m">{project.comingSoon ? 'Coming soon' : `${project.role} — ${project.year}`}</span>
              </>
            )

            if (linkStyle === 'route' && href) {
              return (
                <Link key={`list-${project.slug}`} className={rowClass} to={href}>
                  {content}
                </Link>
              )
            }

            if (linkStyle === 'hash' && href) {
              return (
                <a key={`list-${project.slug}`} className={rowClass} href={href}>
                  {content}
                </a>
              )
            }

            return (
              <div key={`list-${project.slug}`} className={rowClass}>
                {content}
              </div>
            )
          })}
        </Reveal>
      )}
    </>
  )
}
