import { useEffect, useState } from 'react'
import './App.css'

type FlavourId = 'orange' | 'lime' | 'berry'

type Flavour = {
  id: FlavourId
  name: string
  description: string
  colour: string
  background: string
  hue: number
}

const flavours: Flavour[] = [
  {
    id: 'orange',
    name: 'Orange burst',
    description: 'A bright citrus flavour with a playful sparkling finish.',
    colour: '#ff7518',
    background: '#ffdfb6',
    hue: 55,
  },
  {
    id: 'lime',
    name: 'Lime splash',
    description: 'A crisp lime flavour imagined for a refreshing little lift.',
    colour: '#b4df52',
    background: '#e7f2ca',
    hue: 110,
  },
  {
    id: 'berry',
    name: 'Berry bright',
    description: 'A lively berry flavour with a colourful personality.',
    colour: '#f58bb0',
    background: '#fce0eb',
    hue: 0,
  },
]

const discoveryTopics = [
  { title: 'Our flavours', keywords: 'orange lime berry fruit flavours', text: 'Three bold personalities. One bright side. Explore orange, lime, and berry in the hero above.', href: '#flavour-selector' },
  { title: 'The Zest story', keywords: 'about story design brand', text: 'A little everyday optimism, bottled up in a colourful sparkling drink concept.', href: '#about' },
  { title: 'Behind the bubbles', keywords: 'ingredients bubbles recipe sparkling water', text: 'Sparkling water, fruit-inspired flavours, and a playful finish. Discover what inspired the concept.', href: '#ingredients' },
  { title: 'Good to know', keywords: 'faq buy questions portfolio concept', text: 'Curious about Zest? Get the answers, including what makes this a portfolio concept.', href: '#faq' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedFlavourId, setSelectedFlavourId] =
  useState<FlavourId>('orange')

  const [isCycling, setIsCycling] = useState(true)
  const [artPaused, setArtPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTopic, setActiveTopic] = useState('')
  const query = searchQuery.trim().toLowerCase()
  const searchResults = discoveryTopics.filter((topic) =>
    (!activeTopic || topic.title === activeTopic) &&
    (!query || `${topic.title} ${topic.keywords} ${topic.text}`.toLowerCase().includes(query)),
  )

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(preference.matches)
    update()
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isCycling || artPaused || reducedMotion) return
    const timer = window.setInterval(() => {
      if (document.hidden) return
      setSelectedFlavourId((current) => {
        const index = flavours.findIndex((flavour) => flavour.id === current)
        return flavours[(index + 1) % flavours.length]!.id
      })
    }, 4500)
    return () => window.clearInterval(timer)
  }, [isCycling, artPaused, reducedMotion])


const selectedFlavour =
  flavours.find((flavour) => flavour.id === selectedFlavourId) ?? flavours[0]!


  useEffect(() => {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>('main > section'),
  )

  const motionPreference = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  )

  function updateStickySections() {
    sections.forEach((section) => {
      const fitsViewport =
        section.offsetHeight <= window.innerHeight - 80

      section.classList.toggle(
        'can-stack',
        fitsViewport && !motionPreference.matches,
      )
    })
  }

  const resizeObserver = new ResizeObserver(updateStickySections)
  sections.forEach((section) => resizeObserver.observe(section))

  const entranceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        if (!motionPreference.matches) {
          const elements = Array.from(entry.target.children)

          elements.forEach((element, index) => {
            element.animate(
              [
                { opacity: 0, transform: 'translateY(24px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              {
                duration: 650,
                delay: index * 70,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                fill: 'backwards',
              },
            )
          })
        }

        entranceObserver.unobserve(entry.target)
      })
    },
    { threshold: 0.12 },
  )

  sections.forEach((section) => entranceObserver.observe(section))

  updateStickySections()
  window.addEventListener('resize', updateStickySections)
  motionPreference.addEventListener('change', updateStickySections)

  return () => {
    resizeObserver.disconnect()
    entranceObserver.disconnect()
    window.removeEventListener('resize', updateStickySections)
    motionPreference.removeEventListener('change', updateStickySections)
    sections.forEach((section) => section.classList.remove('can-stack'))
  }
}, [])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="logo" href="#home" aria-label="Zest home">
          zest<span>.</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close menu' : 'Menu'}
        </button>

        <nav
          id="main-navigation"
          className={`navigation ${menuOpen ? 'is-open' : ''}`}
          aria-label="Main navigation"
        >
          <a href="#flavour-selector" onClick={closeMenu}>
            Flavours
          </a>
          <a href="#about" onClick={closeMenu}>
            About us
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">A sparkling drink concept</p>

            <h1 id="hero-title">
              A little fizz.
              <br />
              A lot of <span>zest.</span>
            </h1>

            <p className="hero-description">
              Bright fruit flavours, playful bubbles, and a fresh perspective
              on your everyday refreshment.
            </p>

            <a className="button" href="#flavour-selector">
              Explore flavours <span aria-hidden="true">↗</span>
            </a>
          </div>

        <div
  
  className="hero-art splash-art"
  onMouseEnter={() => setArtPaused(true)}
  onMouseLeave={() => setArtPaused(false)}
  onFocusCapture={() => setArtPaused(true)}
  onBlurCapture={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setArtPaused(false)
  }}
  style={{ backgroundColor: selectedFlavour.background }}
>
  <div className="splash-stage" key={selectedFlavourId}>
    <span className="splash-ring" />

    <img
      className="splash-product"
      src="/images/zest-fruit-splash.png"
      alt={`Zest ${selectedFlavour.name} can with a fruit splash`}
      style={{ filter: `hue-rotate(${selectedFlavour.hue}deg) drop-shadow(0 18px 16px rgb(36 34 31 / 15%))` }}
      width="1280"
      height="1280"
      fetchPriority="high"
    />
  </div>

  <div className="flavour-options" id="flavour-selector" role="group" aria-label="Choose a flavour">
    {flavours.map((flavour) => (
      <button key={flavour.id} type="button"
        className={`flavour-option ${flavour.id === selectedFlavourId ? 'is-selected' : ''}`}
        style={{ backgroundColor: flavour.colour }}
        aria-label={flavour.name}
        aria-pressed={flavour.id === selectedFlavourId}
        onClick={() => { setSelectedFlavourId(flavour.id); setIsCycling(false) }}
      />
    ))}
  </div>
  <div className="art-bottom">
    <span className="art-caption">Meet your bright side.</span>
    {!reducedMotion && <button className="cycle-toggle" type="button" onClick={() => setIsCycling((current) => !current)} aria-label={isCycling ? 'Pause automatic flavour cycling' : 'Start automatic flavour cycling'}>{isCycling ? 'Ⅱ' : '▶'}</button>}
  </div>
</div>
</section>

<section className="preview-section about-section" id="about" aria-labelledby="about-title">
  <div className="about-copy">
    <p className="eyebrow">About us</p>
    <h2 id="about-title">A brighter take on everyday refreshment.</h2>
    <p>We believe the little moments deserve a little more fizz. A catch-up with friends, a sunny afternoon, or a pause between big ideas — Zest brings a splash of colour and a playful spirit to the everyday.</p>
    <p>Our sparkling drink concept celebrates bold fruit flavours, joyful design, and the simple pleasure of trying something fresh. From Orange burst to Lime splash and Berry bright, every personality has a bright side.</p>
    <p className="about-note">Zest is a fictional brand, imagined as a UI/UX and frontend portfolio project.</p>
  </div>
  <div className="about-art" style={{ backgroundColor: selectedFlavour.background }}>
    <img src="/images/zest-fruit-splash.png" alt={`Zest ${selectedFlavour.name} product preview`} width="1280" height="1280" loading="lazy" style={{ filter: `hue-rotate(${selectedFlavour.hue}deg)` }} />
  </div>
</section>

<section
  className="preview-section"
  id="ingredients"
  aria-labelledby="ingredients-title"
>
  <p className="eyebrow">Behind the bubbles</p>
  <h2 id="ingredients-title">A simple idea. A sparkling personality.</h2>
  <p>
    Our imagined recipe pairs bubbles with bright fruit flavours.
    Ingredient details below are illustrative.
  </p>

  <div className="ingredient-grid">
    <article className="ingredient-card">
      <span className="ingredient-number" aria-hidden="true">01</span>
      <h3>Sparkling water</h3>
      <p>A bubbly base for the drink concept.</p>
    </article>

    <article className="ingredient-card">
      <span className="ingredient-number" aria-hidden="true">02</span>
      <h3>Fruit flavours</h3>
      <p>Orange, lime, and berry inspire our three colourful varieties.</p>
    </article>

    <article className="ingredient-card">
      <span className="ingredient-number" aria-hidden="true">03</span>
      <h3>A playful finish</h3>
      <p>Bold packaging and a little personality in every imagined sip.</p>
    </article>
  </div>
</section>


        <section className="preview-section discovery-section" id="story" aria-labelledby="discovery-title">
          <p className="eyebrow">Follow your curiosity</p>
          <h2 id="discovery-title">Find your bright side.</h2>
          <form className="discovery-search" onSubmit={(event) => { event.preventDefault(); document.getElementById('discovery-results')?.focus() }} role="search">
            <label className="sr-only" htmlFor="zest-search">Search Zest</label>
            <input id="zest-search" type="search" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setActiveTopic('') }} placeholder="What are you in the mood for?" />
            <button type="submit" aria-label="Search Zest"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6M19 2v6M16 5h6" /></svg></button>
          </form>
          <div className="topic-chips" role="group" aria-label="Explore Zest topics">
            {discoveryTopics.map((topic) => <button type="button" key={topic.title} aria-pressed={activeTopic === topic.title} onClick={() => { setActiveTopic(activeTopic === topic.title ? '' : topic.title); setSearchQuery('') }}><span aria-hidden="true">＋</span>{topic.title}</button>)}
          </div>
          {(query || activeTopic) && <div className="discovery-results" id="discovery-results" tabIndex={-1}>
            <p role="status">{searchResults.length ? `${searchResults.length} bright idea${searchResults.length === 1 ? '' : 's'} to explore` : 'No matches yet. Try “lime”, “story”, or “bubbles”.'}</p>
            {searchResults.map((topic) => <a href={topic.href} key={topic.title}><strong>{topic.title} ↗</strong><span>{topic.text}</span></a>)}
          </div>}
        </section>

<section
  className="preview-section"
  id="faq"
  aria-labelledby="faq-title"
>
  <p className="eyebrow">A few things to know</p>
  <h2 id="faq-title">Curious? Let’s clear things up.</h2>

  <div className="faq-list">
    <details className="faq-item">
      <summary>What is Zest?</summary>
      <p>
        Zest is a fictional sparkling drink brand created to explore
        product design and frontend development.
      </p>
    </details>

    <details className="faq-item">
      <summary>Which flavours can I explore?</summary>
      <p>
        Orange burst, Lime splash, and Berry bright. Use the flavour
        selector to change the product preview.
      </p>
    </details>

    <details className="faq-item">
      <summary>Can I buy a can?</summary>
      <p>
        No. This is a portfolio concept, so there are no products,
        orders, or payments available.
      </p>
    </details>

    <details className="faq-item">
      <summary>Are the ingredients a real formulation?</summary>
      <p>
        No. The ingredient descriptions are illustrative content for
        the concept, not a verified recipe or nutritional information.
      </p>
    </details>
  </div>
</section>


      </main>
      <footer className="site-footer">
        <a className="logo" href="#home" aria-label="Zest home">
          zest<span>.</span>
        </a>
        <a className="developer-credit" href="https://a-majid-portfolio-mauve.vercel.app/">Developed by A. Majid <span aria-hidden="true">↗</span></a>
      </footer>
    </>
  )
}

export default App