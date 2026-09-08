import Reveal from './Reveal'
import aboutPortrait from '../assets/about-portrait.png'

export default function About({ standalone = false }) {
  return (
    <section
      className={`section${standalone ? ' is-page' : ''}`}
      id="about"
    >
      <div className="wrap">
        {standalone ? (
          <Reveal className="section-head">
            <h1 className="project-title page-title">
              About
            </h1>
          </Reveal>
        ) : (
          <Reveal className="section-head">
            <h2>About</h2>
          </Reveal>
        )}

        <Reveal className="about-grid">
          <div className="about-copy">
            <p className="about-lead">
              Hi, I&apos;m Jordan Shears — most people know me as George. I&apos;m a UX/UI
              Designer and Developer based in Cape Town, working across research,
              wireframes, and the React or WordPress code that actually ships the
              finished product.
            </p>
            <p>
              I work across the full stack of building a product&apos;s front door: user
              research and wireframes in Figma, then the React, WordPress, or PHP that
              ships it. That dual lens means I catch usability problems before they become
              tickets.
            </p>
            <p>
              Currently a Junior Developer &amp; UX Designer at Habari Media, where I build
              custom WordPress themes and plugins in PHP for publishing and travel clients,
              and React front ends for high-traffic sites. Recent work includes a tours
              booking platform with a third-party destination API, and a live-data product
              with a WebSocket price feed.
            </p>
          </div>
          <div className="about-aside">
            <img
              src={aboutPortrait}
              alt="Jordan Shears"
              className="about-portrait"
              width={720}
              height={1280}
              loading="lazy"
              decoding="async"
            />
            <div className="facts">
              <div className="fact">
                <div className="k">Based in</div>
                <div className="v">Cape Town, South Africa</div>
              </div>
              {standalone && (
                <div className="fact">
                  <div className="k">Currently</div>
                  <div className="v">Junior Developer &amp; UX Designer, Habari Media</div>
                </div>
              )}
              <div className="fact">
                <div className="k">Education</div>
                <div className="v">
                  Higher Certificate in UI/UX Web Design — Academy of Digital Arts · Higher
                  Certificate in Mobile Application &amp; Web Development — IIE Varsity College
                </div>
              </div>
              {standalone && (
                <div className="fact">
                  <div className="k">Toolkit</div>
                  <div className="v">React · WordPress · PHP · Figma</div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
