import Reveal from './Reveal'

export default function CaseEntry({ project, id }) {
  return (
    <Reveal as="div" className="case-entry" id={id}>
      <div className="case-image">
        <span>{project.image}</span>
      </div>
      <div className="case-cols">
        <div className="case-meta">
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
        </div>
        <div>
          <h3 className="case-title">{project.title}</h3>
          <div className="case-text">
            <p>{project.problem}</p>
            {project.approach.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="case-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}
