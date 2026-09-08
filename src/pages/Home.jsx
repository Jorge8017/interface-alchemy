import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Statement from '../components/Statement'
import WorkGrid from '../components/WorkGrid'
import About from '../components/About'
import Contact from '../components/Contact'
import { projects } from '../data/projects'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />

      <Statement />

      <section className="section section-work" id="work">
        <div className="wrap">
          <WorkGrid
            projects={projects}
            linkStyle="route"
            variant="featured"
            showToggle={false}
            title="Selected work"
            subtitle="Projects across product design, React, WordPress, and shipped interfaces."
          />
        </div>
      </section>

      <About />
      <Contact />
    </>
  )
}
