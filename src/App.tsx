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

const ingredientStories = [
  { title: 'Sparkling water', category: 'The bubbles', description: 'A crisp, bubbly beginning for every bright idea.', image: '/images/sparkling-water.svg', colour: '#bcebdd' },
  { title: 'Orange, with a little attitude.', category: 'Orange burst', description: 'Sunshine-inspired citrus with a playful sparkling finish.', image: '/images/citrus.svg', colour: '#f9c96d' },
  { title: 'A playful finish', category: 'The personality', description: 'Bold packaging. Bright colours. A little joy in every imagined sip.', image: '/images/zest-fruit-splash.png', colour: '#f5b9cd' },
  { title: 'A fresh little lift.', category: 'Lime splash', description: 'A zippy lime-inspired personality for your everyday pause.', image: '/images/citrus.svg', colour: '#d8edac', hue: 45 },
  { title: 'Turn up the colour.', category: 'Berry bright', description: 'A berry-inspired burst that brings the bright side out.', image: '/images/zest-fruit-splash.png', colour: '#f5b9cd' },
  { title: 'Small moments. More fizz.', category: 'Everyday Zest', description: 'A bubbly concept for catch-ups, sunny afternoons, and fresh starts.', image: '/images/sparkling-water.svg', colour: '#c6ddef', hue: 30 },
]

const discoveryTopics = [
  { title: 'Our flavours', keywords: 'orange lime berry fruit flavours', text: 'Three bold personalities. One bright side. Explore orange, lime, and berry in the hero above.', href: '#flavour-selector' },
  { title: 'The Zest story', keywords: 'about story design brand', text: 'A little everyday optimism, bottled up in a colourful sparkling drink concept.', href: '#about' },
  { title: 'Behind the bubbles', keywords: 'ingredients bubbles recipe sparkling water', text: 'Sparkling water, fruit-inspired flavours, and a playful finish. Discover what inspired the concept.', href: '#ingredients' },
  { title: 'Good to know', keywords: 'faq buy questions portfolio concept', text: 'Curious about Zest? Get the answers, including what makes this a portfolio concept.', href: '#faq' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [cardsPaused, setCardsPaused] = useState(false)

  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 24)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])
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
    }, 2500)
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
        section.offsetHeight <= window.innerHeight - 120

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

      <header className={`site-header ${headerScrolled || menuOpen ? 'is-scrolled' : 'is-at-top'}`}>
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
        <div className="hero-about" style={{ backgroundColor: selectedFlavour.background }}>

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

<section className="about-statement" id="about" aria-labelledby="about-title">
  <p className="eyebrow">A little about Zest</p>
  <h2 id="about-title">At Zest, we’re bringing a brighter spirit to everyday moments — one sip, one spark, one little burst of joy at a time.</h2>
  <span className="button about-cta">Discover our flavours <span aria-hidden="true">↗</span></span>
</section>
        </div>

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

  <div className="stories-controls">
    <button type="button" onClick={() => setCardsPaused((current) => !current)} aria-pressed={cardsPaused}>{cardsPaused ? 'Play the stories' : 'Pause the stories'} <span aria-hidden="true">{cardsPaused ? '▶' : 'Ⅱ'}</span></button>
  </div>
  <div className={`story-marquees ${cardsPaused ? 'is-paused' : ''}`}>
    {[ingredientStories.slice(0, 3), ingredientStories.slice(3)].map((row, rowIndex) => (
      <div className={`story-marquee ${rowIndex === 1 ? 'is-reversed' : ''}`} key={rowIndex}>
        <div className="story-track">
          {[0, 1].map((copy) => <div className="story-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {row.map((story) => <article className="story-card" key={story.title} tabIndex={copy === 0 ? 0 : -1}>
              <div className="story-image" style={{ backgroundColor: story.colour }}>
                <img src={story.image} alt="" width="600" height="600" loading="lazy" style={{ filter: `hue-rotate(${story.hue ?? 0}deg)` }} />
                <span className="story-tag">{story.category}</span>
              </div>
              <div className="story-caption"><h3>{story.title}</h3><p>{story.description}</p></div>
            </article>)}
          </div>)}
        </div>
      </div>
    ))}
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