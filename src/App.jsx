import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import portrait from '../portrait.jpg'

const resumeUrl = 'https://drive.google.com/file/d/19P_Y5OD0f_ZDU1dp0E1HqBH2BA7zLD7z/view?usp=sharing'
const emailAddress = 'kamrulkhan526785@gmail.com'
const githubUrl = 'https://github.com/Kamrul785'
const copyrightYear = new Date().getFullYear()

const navigation = [
  ['about', 'About'],
  ['research', 'Research'],
  ['publications', 'Publications'],
  ['experience', 'Experience'],
  ['honors', 'Awards'],
  ['projects', 'Projects'],
  ['teaching', 'Community'],
]
const navigationIds = new Set(navigation.map(([id]) => id))

function SiteHeader() {
  const headerRef = useRef(null)
  const navRef = useRef(null)
  const pillRef = useRef(null)
  const pendingSection = useRef(null)
  const settleTimer = useRef(null)
  const [activeId, setActiveId] = useState('about')

  useEffect(() => {
    const sections = [...document.querySelectorAll('main > section[id]')]
      .filter(section => navigationIds.has(section.id))

    function updateActiveSection() {
      if (pendingSection.current) return
      const readingLine = headerRef.current.getBoundingClientRect().bottom + 40
      const current = sections.findLast(section => section.getBoundingClientRect().top <= readingLine)
      setActiveId(current?.id ?? 'about')
    }

    function finishNavigation() {
      window.clearTimeout(settleTimer.current)
      pendingSection.current = null
      updateActiveSection()
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    document.addEventListener('scrollend', finishNavigation)
    window.addEventListener('wheel', finishNavigation, { passive: true })
    window.addEventListener('touchmove', finishNavigation, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
      document.removeEventListener('scrollend', finishNavigation)
      window.removeEventListener('wheel', finishNavigation)
      window.removeEventListener('touchmove', finishNavigation)
      window.clearTimeout(settleTimer.current)
    }
  }, [])

  useEffect(() => {
    const nav = navRef.current
    const activeLink = nav.querySelector('[aria-current="location"]')
    function positionPill() {
      pillRef.current.style.setProperty('--pill-x', `${activeLink.offsetLeft}px`)
      pillRef.current.style.setProperty('--pill-width', `${activeLink.offsetWidth}px`)
    }
    positionPill()
    const observer = new ResizeObserver(positionPill)
    for (const link of nav.querySelectorAll('a')) observer.observe(link)

    const strip = nav.getBoundingClientRect()
    const link = activeLink.getBoundingClientRect()
    const shift = link.left < strip.left ? link.left - strip.left : Math.max(0, link.right - strip.right)
    if (shift) nav.scrollBy({ left: shift })
    return () => observer.disconnect()
  }, [activeId])

  function selectLink(event, id) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const section = document.getElementById(id)
    if (!section) return

    event.preventDefault()
    const hash = `#${id}`
    if (window.location.hash !== hash) window.history.pushState(null, '', hash)

    setActiveId(id)
    pendingSection.current = id
    window.clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(() => {
      pendingSection.current = null
    }, 1200)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    section.focus({ preventScroll: true })
    section.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' })
  }

  return (
    <header className="site-header" ref={headerRef}>
      <div className="wrap header-inner">
        <a className="brand" href="#about" aria-label="Kamrul Hasan, About" onClick={event => selectLink(event, 'about')}>
          <span className="brand-monogram" aria-hidden="true">KKH</span>
          <span className="brand-name">Kamrul Hasan</span>
        </a>
        <nav aria-label="Main navigation" ref={navRef}>
          <div className="nav-track">
            <span className="nav-pill" ref={pillRef} aria-hidden="true" />
            {navigation.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={id === activeId ? 'location' : undefined}
                onClick={event => selectLink(event, id)}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}

function Profile() {
  return (
    <aside className="profile" aria-label="Profile and links">
      <img className="portrait" src={portrait} width="216" height="226" alt="Portrait of Khandokar Kamrul Hasan" />
      <div className="profile-details">
        <p className="profile-role">Student Researcher</p>
        <p><a href="https://elitelab.ai/">ELITE Research Lab</a><br />Chattogram, Bangladesh</p>
        <div className="profile-links">
          <a href={`mailto:${emailAddress}`} aria-label="Email">
            <svg aria-hidden="true"><use href={`${import.meta.env.BASE_URL}icons.svg#email-icon`} /></svg>
            <span>Email</span>
          </a>
          <a href={githubUrl} aria-label="GitHub">
            <svg aria-hidden="true"><use href={`${import.meta.env.BASE_URL}icons.svg#github-icon`} /></svg>
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/kamrulhasan7/" aria-label="LinkedIn">
            <svg aria-hidden="true"><use href={`${import.meta.env.BASE_URL}icons.svg#linkedin-icon`} /></svg>
            <span>LinkedIn</span>
          </a>
          <a href="https://kamrulhasan-henna.vercel.app/" aria-label="Portfolio">
            <svg aria-hidden="true"><use href={`${import.meta.env.BASE_URL}icons.svg#portfolio-icon`} /></svg>
            <span>Portfolio</span>
          </a>
          <a href={resumeUrl} aria-label="Resume">
            <svg aria-hidden="true"><use href={`${import.meta.env.BASE_URL}icons.svg#resume-icon`} /></svg>
            <span>Resume</span>
          </a>
        </div>
      </div>
    </aside>
  )
}

function ResearchInterests() {
  return (
    <section id="research" tabIndex={-1} aria-labelledby="research-heading">
      <h2 id="research-heading">Research interests</h2>
      <div className="section-body">
        <ul className="topics">
          <li><strong>Machine Learning &amp; Deep Learning</strong> — classification for healthcare applications, including heart failure prediction and lightweight models for skin lesion classification.</li>
          <li><strong>Computer Vision &amp; Digital Image Processing</strong> — retinal lesion analysis for diabetic retinopathy grading and crop disease detection from images.</li>
          <li><strong>Multimodal Learning</strong> — generative translation between imaging modalities, including MRI-to-ultrasound synthesis for ACL tear detection.</li>
          <li><strong>Trustworthy &amp; Explainable AI</strong> — concept bottleneck models that let reviewers inspect and correct lesion predictions, and cross-dataset evaluation to measure how well models generalize.</li>
          <li><strong>Medical Image Segmentation</strong> — learning from limited manual annotations and evaluating the accuracy and efficiency of lightweight segmentation models.</li>
        </ul>
      </div>
    </section>
  )
}

const aclPaperUrl = 'https://www.researchgate.net/publication/414823507_Unsupervised_CycleGAN-Based_MRI-to-Ultrasound_Image_Translation_for_Anterior_Cruciate_Ligament_Tear_Detection'
const authorName = 'Khandokar Kamrul Hasan'
const publications = [
  {
    title: 'Unsupervised CycleGAN-Based MRI-to-Ultrasound Image Translation for Anterior Cruciate Ligament Tear Detection',
    authors: ['Fahad Sikder', authorName, 'Rifatul Islam', 'Ratul Barua', 'et al.'],
    venue: 'IEEE International Conference on Signal Processing, Information, Communication and Systems 2026',
    venueShort: 'SPICSCON 2026',
    url: aclPaperUrl,
  },
  {
    title: 'InterveneDR: An Auditable Concept Bottleneck Framework for Diabetic Retinopathy Grading',
    authors: [authorName],
    status: 'In preparation',
  },
  {
    title: 'Medical Image Segmentation with Limited Annotations',
    status: 'Ongoing research',
  },
  {
    title: 'Lightweight Tooth Segmentation in Panoramic Dental X-rays',
    status: 'In preparation',
  },
]

function Publications() {
  const dialogRef = useRef(null)
  const [unavailableResource, setUnavailableResource] = useState(null)

  function showResourceDialog(title, format, requestUrl) {
    setUnavailableResource({ title, format, requestUrl })
    dialogRef.current.showModal()
  }

  return (
    <section id="publications" tabIndex={-1} aria-labelledby="publications-heading">
      <h2 id="publications-heading">Publications &amp; research projects</h2>
      <div className="section-body publication-scroll" tabIndex={0} role="region" aria-label="Scrollable publication list">
        <ul className="publication-list">
          {publications.map(({ title, authors, venue, venueShort, status, url }) => (
            <li key={title} className="entry">
              <h3 className="publication-title">{title}</h3>
              {authors && (
                <p className="publication-authors">
                  {authors.map((author, index) => (
                    <Fragment key={author}>
                      {index > 0 && ', '}
                      {author === authorName ? <strong>{author}</strong> : author}
                    </Fragment>
                  ))}
                </p>
              )}
              {venue && (
                <p className="publication-venue">
                  {venue}
                  {venueShort && <> <strong className="venue-badge">{venueShort}</strong></>}
                </p>
              )}
              {status && <p className="meta">{status}</p>}
              <div className="publication-links">
                {url
                  ? <a href={url}>Paper</a>
                  : <button type="button" onClick={() => showResourceDialog(title, 'Paper')}>Paper</button>}
                <button type="button" onClick={() => showResourceDialog(title, 'PDF', url)}>PDF</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <dialog ref={dialogRef} className="publication-dialog" aria-labelledby="publication-dialog-title" aria-describedby="publication-dialog-description">
        <h3 id="publication-dialog-title">{unavailableResource?.requestUrl ? 'Request the PDF' : 'Coming soon'}</h3>
        <p id="publication-dialog-description">
          {unavailableResource?.requestUrl
            ? <>There is no public PDF for “{unavailableResource.title}”. You can request a copy from the authors on <a href={unavailableResource.requestUrl}>ResearchGate</a>.</>
            : unavailableResource && `${unavailableResource.format} for “${unavailableResource.title}” is coming soon.`}
        </p>
        <form method="dialog"><button type="submit">Close</button></form>
      </dialog>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" tabIndex={-1} aria-labelledby="projects-heading">
      <h2 id="projects-heading">Selected engineering projects</h2>
      <div className="section-body">
        <div className="project-list">
          <article className="entry">
            <h3>Krishok Bhai</h3>
            <ul className="work-bullets">
              <li>Built a farming advisor that uses Gemini 2.5 Flash to detect crop disease from images across 11 crop varieties.</li>
              <li>Implemented a Bangla–English voice interface with Twilio and reduced audio processing latency to 800 ms.</li>
              <li>Placed 25th nationally at the 2025 Solvio AI Hackathon.</li>
            </ul>
            <p className="meta">Next.js, TypeScript, Gemini, Twilio</p>
            <div className="link-row"><a href="https://github.com/Kamrul785/Krishok-Bhai" aria-label="Code for Krishok Bhai">Code</a><a href="https://krishok-bhai.vercel.app/" aria-label="Live demo for Krishok Bhai">Live</a></div>
          </article>
          <article className="entry">
            <h3>PhiMart</h3>
            <ul className="work-bullets">
              <li>Built a PostgreSQL-backed REST API with more than 35 endpoints for an e-commerce platform.</li>
              <li>Used database transactions to keep order creation consistent and improved catalog browsing with query optimization and pagination.</li>
              <li>Implemented role-based access with Djoser and JWT.</li>
            </ul>
            <p className="meta">Django REST, React, PostgreSQL</p>
            <div className="link-row"><a href="https://github.com/Kamrul785/PhiMart" aria-label="Code for PhiMart">Code</a><a href="https://phi-mart-client-lemon.vercel.app/" aria-label="Live demo for PhiMart">Live</a></div>
          </article>
          <article className="entry">
            <h3>Tuition Hub</h3>
            <ul className="work-bullets">
              <li>Built enrollment workflows for students and tutors, with SSLCommerz webhooks for payment verification and invoice generation.</li>
              <li>Added role-specific wallet access and built paginated search and filtering for more than 1,000 records.</li>
            </ul>
            <p className="meta">Django REST, React, SSLCommerz</p>
            <div className="link-row"><a href="https://github.com/Kamrul785/Tuition-Hub" aria-label="Code for Tuition Hub">Code</a><a href="https://tuition-hub-client.vercel.app/" aria-label="Live demo for Tuition Hub">Live</a></div>
          </article>
        </div>
      </div>
    </section>
  )
}

function SiteFooter() {
  function goToTop(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    event.preventDefault()
    if (window.location.hash !== '#top') window.history.pushState(null, '', '#top')
    document.querySelector('.brand').focus({ preventScroll: true })
    window.scrollTo({ top: 0 })
  }

  return (
    <footer className="wrap site-footer">
      <p className="footer-name" aria-hidden="true">Kamrul</p>
      <div className="footer-row">
        <div className="footer-meta">
          <span>© {copyrightYear} {authorName}</span>
          <span className="footer-location">Chattogram, Bangladesh</span>
        </div>
        <div className="footer-actions">
          <a href={githubUrl} aria-label="GitHub" title="GitHub">
            <svg aria-hidden="true"><use href={`${import.meta.env.BASE_URL}icons.svg#github-icon`} /></svg>
          </a>
          <a href={`mailto:${emailAddress}`} aria-label="Email" title="Email">
            <svg aria-hidden="true"><use href={`${import.meta.env.BASE_URL}icons.svg#mail-outline-icon`} /></svg>
          </a>
          <a className="footer-top" href="#top" onClick={goToTop}>Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useLayoutEffect(() => {
    // The initial browser fragment jump can run before React mounts the sections.
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [])

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <SiteHeader />

      <div className="wrap layout">
        <Profile />

        <main id="main" tabIndex="-1">
          <section id="about" tabIndex={-1} className="intro" aria-labelledby="name">
            <h1 id="name">Khandokar Kamrul Hasan</h1>
            <div className="section-body">
              <p>I am a student researcher at <a href="https://elitelab.ai/">ELITE Research Lab</a> based in Chattogram, Bangladesh. My research interests span machine learning, deep learning, computer vision, digital image processing, and multimodal learning. My work includes developing interpretable models for diabetic retinopathy grading, generating synthetic ultrasound images from MRI scans for ACL tear detection, and investigating how models can learn to segment medical images from limited manual annotations.</p>
              <p>My academic background is in computer science and engineering at <a href="https://www.portcity.edu.bd/">Port City International University (PCIU)</a>. At PCIU, I led the Computer Club’s Competitive Programming Wing, mentored students, and taught C++, data structures, and algorithms in a three-month bootcamp. Before joining ELITE Research Lab, I completed a machine learning internship at <a href="https://codveda.com/">Codveda Technologies</a>, where I built data preprocessing pipelines and evaluated classification models.</p>
              <div className="actions">
                <span>CV: <a href={resumeUrl}>Resume</a></span>
                <span>Contact: <a href="mailto:kamrulkhan526785@gmail.com">kamrulkhan526785@gmail.com</a></span>
              </div>
            </div>
          </section>

          <section id="education" aria-labelledby="education-heading">
            <h2 id="education-heading">Education</h2>
            <div className="section-body">
              <h3>B.Sc. in Computer Science and Engineering</h3>
              <p className="affiliation">Port City International University, Chattogram</p>
              <p className="meta">Completed November 2026</p>
              <p>GPA 3.98/4.00. Relevant coursework includes artificial intelligence, machine learning, digital image processing, and algorithms.</p>
            </div>
          </section>

          <section id="updates" aria-labelledby="updates-heading">
            <h2 id="updates-heading">Updates</h2>
            <div className="section-body updates-feed" tabIndex={0} role="region" aria-label="Academic timeline from 2022 onward">
              <dl className="detail-list">
                <div><dt>November 2026</dt><dd>Completed my B.Sc. in Computer Science and Engineering at Port City International University.</dd></div>
                <div><dt>October 2026</dt><dd>Worked on two medical image segmentation studies: learning from limited annotations and comparing lightweight models for tooth segmentation in panoramic dental X-rays.</dd></div>
                <div><dt>September 2026</dt><dd>Joined ELITE Research Lab as a student researcher.</dd></div>
                <div><dt>August 2026</dt><dd>Co-authored a conference paper on MRI-to-ultrasound translation for ACL tear detection at IEEE SPICSCON 2026.</dd></div>
                <div><dt>June–August 2026</dt><dd>Completed a machine learning internship at Codveda Technologies, building data pipelines and evaluating classification models.</dd></div>
                <div><dt>2025</dt><dd>Qualified as a finalist for the ICPC Asia Dhaka Regional.</dd></div>
                <div><dt>2025</dt><dd>Placed 25th nationally at the Solvio AI Hackathon with Krishok Bhai, a bilingual AI farming advisor.</dd></div>
                <div><dt>2024</dt><dd>Became Joint General Secretary of the PCIU Computer Club and led its Competitive Programming Wing.</dd></div>
                <div><dt>2024</dt><dd>Led a three-month C++ bootcamp for more than 300 students, covering data structures and algorithms.</dd></div>
                <div><dt>2022</dt><dd>Began my B.Sc. in Computer Science and Engineering at Port City International University in Chattogram.</dd></div>
              </dl>
            </div>
          </section>

          <ResearchInterests />
          <Publications />

          <section id="experience" tabIndex={-1} aria-labelledby="experience-heading">
            <h2 id="experience-heading">Experience</h2>
            <div className="section-body">
              <div className="timeline">
                <article className="entry">
                  <p className="meta">September 2026–present <span aria-hidden="true">·</span> Remote</p>
                  <h3>Student Researcher</h3>
                  <p className="affiliation"><a href="https://elitelab.ai/">ELITE Research Lab LLC</a></p>
                  <ul className="work-bullets">
                    <li>Developed EfficientNet-X, a lightweight model with 6.2 million parameters, for four-class skin lesion classification using more than 23,000 augmented images.</li>
                    <li>Addressed class imbalance and used Grad-CAM to inspect model predictions at resolutions up to 448 × 448 pixels.</li>
                    <li>Manage remote experiments and share progress with the research team.</li>
                  </ul>
                </article>
                <article className="entry">
                  <p className="meta">June–August 2026 <span aria-hidden="true">·</span> Remote</p>
                  <h3>Machine Learning Intern</h3>
                  <p className="affiliation"><a href="https://codveda.com/">Codveda Technologies</a></p>
                  <ul className="work-bullets">
                    <li>Built preprocessing pipelines in Pandas and scikit-learn and tuned more than six models, including random forests and support vector machines, using F1 and AUC to compare performance.</li>
                    <li>Built a feed-forward neural network in TensorFlow/Keras for multiclass classification and evaluated it using ROC curves, precision–recall analysis, and validation loss.</li>
                  </ul>
                </article>
              </div>
            </div>
          </section>

          <section id="honors" tabIndex={-1} aria-labelledby="honors-heading">
            <h2 id="honors-heading">Awards &amp; competitive programming</h2>
            <div className="section-body">
              <dl className="detail-list">
                <div>
                  <dt>ICPC Asia Dhaka Regional, 2025</dt>
                  <dd>
                    <p>Regional finalist. Helped Port City International University earn two regional slots. <a href="https://drive.google.com/file/d/1CN8KP1yYbZscYCWhiFyLlLkxMCEZhmEg/view?usp=sharing" aria-label="ICPC certificate">[certificate]</a></p>
                  </dd>
                </div>
                <div>
                  <dt>Solvio AI Hackathon, 2025</dt>
                  <dd>
                    <p>Placed 25th nationally with Krishok Bhai, a bilingual AI farming advisor. <a href="https://drive.google.com/file/d/1DqqsdUKkJkZHdb4G0VonWRyQCSnaU-lG/view?usp=sharing" aria-label="Solvio AI Hackathon certificate">[certificate]</a></p>
                  </dd>
                </div>
                <div><dt>Competitive programming</dt><dd>Earned a <a href="https://www.codechef.com/users/kamrulkhan5267">two-star CodeChef rating</a> with a peak of 1486. Solved more than 1,000 problems across online judges.</dd></div>
              </dl>
            </div>
          </section>

          <Projects />

          <section id="teaching" tabIndex={-1} aria-labelledby="teaching-heading">
            <h2 id="teaching-heading">Community &amp; teaching</h2>
            <div className="section-body">
              <div className="timeline">
                <article className="entry">
                  <p className="meta">2024–2026</p>
                  <h3>Joint General Secretary, PCIU Computer Club</h3>
                  <p>Led the Competitive Programming Wing, organized 11 contests, authored 52 algorithmic problems, and mentored more than 50 students. <a href="https://drive.google.com/file/d/1k575Bw83LHMYRKKneWiR_wX1yDrMhQmi/view?usp=sharing" aria-label="PCIU Computer Club certificate">[certificate]</a></p>
                </article>
                <article className="entry">
                  <p className="meta">2024</p>
                  <h3>Lead Instructor, C++ Bootcamp</h3>
                  <p>Designed and taught a three-month curriculum on C++, data structures, and algorithms for more than 300 students.</p>
                </article>
              </div>
            </div>
          </section>

          <section id="skills" aria-labelledby="skills-heading">
            <h2 id="skills-heading">Technical Skills</h2>
            <table className="skills-table" aria-labelledby="skills-heading">
              <tbody>
                <tr><th scope="row">Languages</th><td>Python, C++, C, JavaScript, SQL</td></tr>
                <tr><th scope="row">ML / DL</th><td>PyTorch, TensorFlow, Hugging Face, scikit-learn, Pandas, OpenCV, Google Gemini API, OpenAI API</td></tr>
                <tr><th scope="row">Web</th><td>Django, Django REST Framework, React, HTML, CSS, Tailwind CSS, Bootstrap</td></tr>
                <tr><th scope="row">Databases</th><td>PostgreSQL, MySQL, SQLite, Supabase</td></tr>
                <tr><th scope="row">Other tools</th><td>Git, GitHub, Vercel, Swagger, ReDoc, LaTeX, Microsoft Office</td></tr>
              </tbody>
            </table>
          </section>

          <section id="contact" className="contact" aria-labelledby="contact-heading">
            <h2 id="contact-heading">Get in touch</h2>
            <div className="section-body">
              <p>I welcome inquiries about research collaboration, graduate opportunities, and engineering roles in applied AI.</p>
              <a href="mailto:kamrulkhan526785@gmail.com">kamrulkhan526785@gmail.com</a>
            </div>
          </section>
        </main>
      </div>
      <SiteFooter />
    </>
  )
}
