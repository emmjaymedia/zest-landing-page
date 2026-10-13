import { useState } from 'react'
import './App.css'

type FlavourId = 'orange' | 'lime' | 'berry'

type Flavour = {
  id: FlavourId
  name: string
  description: string
  colour: string
  background: string
}

const flavours: Flavour[] = [
  {
    id: 'orange',
    name: 'Orange burst',
    description: 'A bright citrus flavour with a playful sparkling finish.',
    colour: '#ff7518',
    background: '#ffdfb6',
  },
  {
    id: 'lime',
    name: 'Lime splash',
    description: 'A crisp lime flavour imagined for a refreshing little lift.',
    colour: '#b4df52',
    background: '#e7f2ca',
  },
  {
    id: 'berry',
    name: 'Berry bright',
    description: 'A lively berry flavour with a colourful personality.',
    colour: '#f58bb0',
    background: '#fce0eb',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const [selectedFlavourId, setSelectedFlavourId] =
  useState<FlavourId>('orange')

const selectedFlavour =
  flavours.find((flavour) => flavour.id === selectedFlavourId) ?? flavours[0]!

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
          <a href="#flavours" onClick={closeMenu}>
            Flavours
          </a>
          <a href="#story" onClick={closeMenu}>
            Our story
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

            <a className="button" href="#flavours">
              Explore flavours <span aria-hidden="true">↗</span>
            </a>
          </div>

        <div className="hero-art"
          aria-hidden="true"
          style={{ backgroundColor: selectedFlavour.background }}
        >
          <div
            className="drink-can"
            style={{ backgroundColor: selectedFlavour.colour }}
          >
            <span className="can-brand">zest.</span>
            <span className="can-flavour">{selectedFlavour.name}</span>
            <span className="can-detail">Sparkling fruit drink</span>
          </div>
          <span className="art-caption">Meet your bright side.</span>
        </div>
        </section>

        <section
  className="preview-section"
  id="flavours"
  aria-labelledby="flavours-title"
>
  <p className="eyebrow">Pick your personality</p>
  <h2 id="flavours-title">Good things come in flavours.</h2>
  <p>Choose a flavour to give the Zest can a fresh look.</p>

  <div
    className="flavour-options"
    role="group"
    aria-label="Choose a flavour"
  >
    {flavours.map((flavour) => {
      const isSelected = flavour.id === selectedFlavourId

      return (
        <button
          key={flavour.id}
          type="button"
          className={`flavour-option ${isSelected ? 'is-selected' : ''}`}
          aria-pressed={isSelected}
          onClick={() => setSelectedFlavourId(flavour.id)}
        >
          <span
            className="flavour-swatch"
            style={{ backgroundColor: flavour.colour }}
            aria-hidden="true"
          />
          {flavour.name}
          {isSelected && (
            <span className="flavour-check" aria-hidden="true">
              ✓
            </span>
          )}
        </button>
      )
    })}
  </div>

  <div className="flavour-description" role="status">
    <h3>{selectedFlavour.name}</h3>
    <p>{selectedFlavour.description}</p>
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


        <section className="preview-section story-section" id="story">
          <p className="eyebrow">Our story</p>
          <h2>A fresh idea, made playful.</h2>
          <p>
            Zest is a fictional brand created for this frontend and UI/UX
            portfolio project.
          </p>
        </section>
      </main>

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


      <footer className="site-footer">
        <a className="logo" href="#home" aria-label="Zest home">
          zest<span>.</span>
        </a>
        <p>Portfolio concept · No products available for sale.</p>
      </footer>
    </>
  )
}

export default App