import WorkGrid from '../components/WorkGrid'
import { projects } from '../data/projects'

export default function Work() {
  return (
    <section className="section section-work is-page" id="work">
      <div className="wrap">
        <WorkGrid
          projects={projects}
          linkStyle="route"
          variant="featured"
          showToggle={false}
          title={
            <h1 className="project-title page-title">
              Work
            </h1>
          }
          subtitle="Selected projects across React, WordPress, and product design."
        />
      </div>
    </section>
  )
}
