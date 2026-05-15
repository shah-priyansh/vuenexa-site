# VueNexa Site Redesign + TextileOS Product Section — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full redesign of the VueNexa company website — dark hero, fixed services, new TextileOS product section, Why VueNexa? section, and improved footer — all in plain HTML + CSS.

**Architecture:** All changes are in `index.html` (structure) and `styles.css` (visual). New CSS classes are appended at the end of `styles.css`. No new files, no build step, no JS framework. The existing `js/common.js` hamburger + smooth scroll logic works automatically with all new anchor links.

**Tech Stack:** HTML5, CSS3, Font Awesome 6.4.0 (already loaded), vanilla JS (no changes needed)

---

## File Map

| File | What changes |
|------|-------------|
| `index.html` | Nav (1 line), Hero (replace visual panel + add stats), Services (2 card edits + 1 new card), new `#products` section, About (stats + description), new `#why-vuenexa` section, Footer (social links + copyright + TextileOS link) |
| `styles.css` | Hero dark-theme overrides, hero-stats, textileos-teaser, services grid tweak, products section, why-vuenexa section, footer social, mobile breakpoints |

---

## Task 1: Navigation — Add Products Link

**Files:**
- Modify: `index.html` — nav-menu list

- [ ] **Step 1: Add Products anchor link to nav**

In `index.html`, find:
```html
<ul class="nav-menu">
    <li><a href="#home" class="nav-link">Home</a></li>
    <li><a href="#services" class="nav-link">Services</a></li>
    <li><a href="#about" class="nav-link">About</a></li>
    <li><a href="#contact" class="nav-link">Contact</a></li>
</ul>
```
Replace with:
```html
<ul class="nav-menu">
    <li><a href="#home" class="nav-link">Home</a></li>
    <li><a href="#services" class="nav-link">Services</a></li>
    <li><a href="#products" class="nav-link">Products</a></li>
    <li><a href="#about" class="nav-link">About</a></li>
    <li><a href="#contact" class="nav-link">Contact</a></li>
</ul>
```

- [ ] **Step 2: Verify**

Open `index.html` in browser. Nav shows: Home · Services · Products · About · Contact. Clicking "Products" scrolls to the `#products` section (section will be empty/missing until Task 4 — that's fine). On mobile, hamburger menu includes Products and closes when clicked (handled automatically by `js/common.js`).

- [ ] **Step 3: Commit**

```bash
cd /Users/priyanshshah/Documents/VueNexa/vuenexa-site
git add index.html
git commit -m "feat: add Products anchor link to navigation"
```

---

## Task 2: Hero Section — Dark Theme + TextileOS Teaser Panel

**Files:**
- Modify: `index.html` — hero section (lines 35–83)
- Modify: `styles.css` — hero overrides + new classes appended at end

- [ ] **Step 1: Replace hero HTML**

In `index.html`, replace the entire hero section (from `<section id="home" class="hero">` to `</section>`) with:

```html
<!-- Hero Section -->
<section id="home" class="hero">
    <div class="hero-pattern"></div>
    <div class="hero-container">
        <div class="hero-content">
            <div class="hero-tagline">Trusted by 500+ companies worldwide</div>
            <h1 class="hero-title">
                Your Software <span class="highlight">Development Partner</span> For Success
            </h1>
            <p class="hero-description">
                From concept to deployment — web, mobile, desktop & AI solutions that drive real business growth.
            </p>
            <div class="hero-buttons">
                <a href="#contact" class="btn btn-primary">Start Your Project</a>
                <a href="#services" class="btn btn-secondary">Our Services</a>
            </div>
            <div class="hero-stats">
                <div class="hero-stat">
                    <span class="hero-stat-number">150+</span>
                    <span class="hero-stat-label">Projects</span>
                </div>
                <div class="hero-stat-divider"></div>
                <div class="hero-stat">
                    <span class="hero-stat-number">98%</span>
                    <span class="hero-stat-label">Retention</span>
                </div>
                <div class="hero-stat-divider"></div>
                <div class="hero-stat">
                    <span class="hero-stat-number">5+</span>
                    <span class="hero-stat-label">Years</span>
                </div>
            </div>
        </div>
        <div class="hero-visual">
            <div class="textileos-teaser">
                <div class="teaser-label">
                    <span class="teaser-dot"></span>
                    <span>Our Own Product</span>
                </div>
                <div class="teaser-product-name">TextileOS</div>
                <p class="teaser-description">Complete ERP for the Textile Industry</p>
                <div class="teaser-chips">
                    <span class="teaser-chip">📦 Yarn Stock</span>
                    <span class="teaser-chip">🏭 Production</span>
                    <span class="teaser-chip">💰 Salary</span>
                    <span class="teaser-chip">📄 Chalan PDF</span>
                    <span class="teaser-chip">👥 Clients</span>
                    <span class="teaser-chip">🧵 Beam</span>
                </div>
                <div class="teaser-status">
                    <div class="status-item">
                        <span class="status-dot status-green"></span>
                        <span>Offline sync active</span>
                    </div>
                    <div class="status-item">
                        <span class="status-dot status-blue"></span>
                        <span>3 languages ready</span>
                    </div>
                </div>
                <a href="#products" class="teaser-cta">Explore TextileOS →</a>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Add hero dark-theme CSS and new component styles**

Append to the end of `styles.css`:

```css
/* ==========================================
   HERO DARK THEME OVERRIDES
   ========================================== */
.hero {
    background: #0f172a;
}

.hero::before {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.hero::after {
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="%23334155" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.15;
}

.hero .hero-tagline {
    color: #f97316;
    background: rgba(249, 115, 22, 0.1);
    border: 1px solid rgba(249, 115, 22, 0.3);
    padding: 6px 18px;
    border-radius: 30px;
    display: inline-block;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.hero .hero-title {
    color: #f8fafc;
}

.hero .highlight {
    color: #60a5fa;
}

.hero .highlight::after {
    background: #60a5fa;
}

.hero .hero-description {
    color: #94a3b8;
}

.hero .btn-secondary {
    color: #e2e8f0;
    border-color: #475569;
}

.hero .btn-secondary:hover {
    color: #dc2626;
    border-color: #dc2626;
    background: rgba(220, 38, 38, 0.08);
}

/* Hero inline stats */
.hero-stats {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-top: 2.5rem;
    animation: fadeInUp 1s ease-out 0.6s both;
}

.hero-stat {
    display: flex;
    flex-direction: column;
}

.hero-stat-number {
    font-size: 1.8rem;
    font-weight: 800;
    color: #60a5fa;
    line-height: 1;
}

.hero-stat-label {
    font-size: 0.78rem;
    color: #64748b;
    margin-top: 3px;
    font-weight: 500;
}

.hero-stat-divider {
    width: 1px;
    height: 40px;
    background: #334155;
    flex-shrink: 0;
}

/* TextileOS teaser panel */
.textileos-teaser {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 16px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
    animation: fadeInUp 1s ease-out 0.6s both;
}

.textileos-teaser::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #1d4ed8, #dc2626);
}

.teaser-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    color: #60a5fa;
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
    margin-bottom: 1rem;
    font-weight: 600;
}

.teaser-dot {
    width: 8px;
    height: 8px;
    background: #22c55e;
    border-radius: 50%;
    animation: pulse 2s infinite;
    flex-shrink: 0;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
}

.teaser-product-name {
    font-size: 2.2rem;
    font-weight: 800;
    color: #f8fafc;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
}

.teaser-description {
    font-size: 0.875rem;
    color: #94a3b8;
    margin-bottom: 1.25rem;
    line-height: 1.5;
}

.teaser-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 1.25rem;
}

.teaser-chip {
    background: rgba(96, 165, 250, 0.1);
    border: 1px solid rgba(96, 165, 250, 0.2);
    color: #93c5fd;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 500;
}

.teaser-status {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 1.5rem;
    background: rgba(15, 23, 42, 0.6);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    border: 1px solid #1e293b;
}

.status-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.78rem;
    color: #94a3b8;
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
}

.status-green { background: #22c55e; }
.status-blue { background: #60a5fa; }

.teaser-cta {
    display: inline-block;
    color: #dc2626;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 700;
    transition: all 0.2s ease;
}

.teaser-cta:hover {
    color: #f87171;
    transform: translateX(4px);
    display: inline-block;
}
```

- [ ] **Step 3: Verify**

Open `index.html` in browser. Confirm:
- Hero background is dark (`#0f172a`), not white
- "Trusted by 500+ companies worldwide" shows as an orange pill badge
- Headline "Development Partner" is highlighted in blue (not red)
- Description text is grey on dark background
- "Our Services" button has light border/text on dark bg
- 3 inline stats (150+, 98%, 5+) appear below the buttons in blue numbers
- Right panel shows the TextileOS teaser card with green pulsing dot, chips, status row, "Explore TextileOS →" link
- No white flash or layout breakage

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: redesign hero section with dark theme and TextileOS teaser panel"
```

---

## Task 3: Services Section — Fix Icons + Add Two New Cards

**Files:**
- Modify: `index.html` — services-grid (lines 93–166)
- Modify: `styles.css` — services-grid column sizing

- [ ] **Step 1: Fix duplicate icon and rename Mobile-First Design card**

In `index.html`, find the services card for "Mobile-First Design":
```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-mobile-alt"></i>
    </div>
    <h3 class="service-title">Mobile-First Design</h3>
    <p class="service-description">
        Responsive designs that work perfectly across all devices
        and screen sizes with mobile-first approach.
    </p>
</div>
```
Replace with:
```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-desktop"></i>
    </div>
    <h3 class="service-title">Desktop App Development</h3>
    <p class="service-description">
        Cross-platform desktop applications built with Electron,
        delivering native experiences with full offline support
        and automatic data synchronization.
    </p>
</div>
```

- [ ] **Step 2: Add AI & Automation service card**

After the "Maintenance & Support" card (the last `</div>` before the closing `</div>` of `services-grid`), add:
```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-robot"></i>
    </div>
    <h3 class="service-title">AI & Automation</h3>
    <p class="service-description">
        Intelligent automation and AI-powered features using OpenAI
        and modern LLM integrations for smarter, faster business workflows.
    </p>
</div>
```

- [ ] **Step 3: Tighten the services grid column minimum**

In `styles.css`, find:
```css
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}
```
Change `minmax(350px, 1fr)` to `minmax(300px, 1fr)`:
```css
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
```

- [ ] **Step 4: Verify**

Open `index.html` in browser, scroll to Services. Confirm:
- No two cards share the same `fa-mobile-alt` icon
- "Desktop App Development" card exists with laptop/desktop icon
- "AI & Automation" card exists with robot icon
- 8 cards total, grid fills evenly (4×2 on wide screens)

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css
git commit -m "fix: remove duplicate icon, add Desktop App and AI service cards"
```

---

## Task 4: TextileOS Product Section (New)

**Files:**
- Modify: `index.html` — insert new section between Services and About
- Modify: `styles.css` — append products section styles

- [ ] **Step 1: Add TextileOS section HTML**

In `index.html`, find the closing `</section>` of the Services section (after the `</div>` that closes `services-grid`). Insert the following new section immediately after it, before the About section:

```html
<!-- TextileOS Product Section -->
<section id="products" class="products">
    <div class="container">
        <div class="products-inner">
            <div class="products-badge">BUILT BY VUENEXA</div>
            <h2 class="products-name">TextileOS</h2>
            <p class="products-tagline">Complete ERP for the Textile Industry — Web, Desktop &amp; Offline</p>

            <div class="products-features">
                <span class="product-feature-pill">10+ Modules</span>
                <span class="product-feature-pill">English &middot; Gujarati &middot; Hindi</span>
                <span class="product-feature-pill">Offline Support</span>
                <span class="product-feature-pill">Desktop App</span>
                <span class="product-feature-pill">PDF Chalans</span>
            </div>

            <div class="products-modules">
                <div class="module-tile"><span class="module-icon">📦</span><span class="module-name">Yarn</span></div>
                <div class="module-tile"><span class="module-icon">🏭</span><span class="module-name">Machine</span></div>
                <div class="module-tile"><span class="module-icon">👷</span><span class="module-name">Employee</span></div>
                <div class="module-tile"><span class="module-icon">🎯</span><span class="module-name">Quality</span></div>
                <div class="module-tile"><span class="module-icon">🛒</span><span class="module-name">Purchase</span></div>
                <div class="module-tile"><span class="module-icon">👥</span><span class="module-name">Client</span></div>
                <div class="module-tile"><span class="module-icon">📄</span><span class="module-name">Sales</span></div>
                <div class="module-tile"><span class="module-icon">🧵</span><span class="module-name">Beam</span></div>
                <div class="module-tile"><span class="module-icon">⚡</span><span class="module-name">Production</span></div>
                <div class="module-tile"><span class="module-icon">💰</span><span class="module-name">Salary</span></div>
            </div>

            <div class="products-ctas">
                <a href="https://wa.me/917202976525?text=Hi%2C%20I%27d%20like%20a%20demo%20of%20TextileOS"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="btn-whatsapp">
                    <i class="fab fa-whatsapp"></i>
                    Get a Demo on WhatsApp
                </a>
                <a href="#contact" class="btn-secondary-light">Built by VueNexa &rarr;</a>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Add products section CSS**

Append to end of `styles.css`:

```css
/* ==========================================
   TEXTILEOS PRODUCT SECTION
   ========================================== */
.products {
    padding: 6rem 0;
    background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #dc2626 100%);
    position: relative;
    overflow: hidden;
}

.products::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="%23ffffff" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.05;
    pointer-events: none;
}

.products-inner {
    max-width: 820px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 1;
}

.products-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    padding: 6px 18px;
    border-radius: 30px;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.25);
    text-transform: uppercase;
}

.products-name {
    font-size: 3.5rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
}

.products-tagline {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2rem;
    line-height: 1.5;
}

.products-features {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-bottom: 2.5rem;
}

.product-feature-pill {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    padding: 7px 18px;
    border-radius: 30px;
    font-size: 0.875rem;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.25);
}

.products-modules {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    margin: 0 auto 2.5rem;
    max-width: 700px;
}

.module-tile {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 14px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    transition: all 0.3s ease;
    cursor: default;
}

.module-tile:hover {
    background: rgba(255, 255, 255, 0.22);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.module-icon {
    font-size: 1.5rem;
    line-height: 1;
}

.module-name {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.78rem;
    font-weight: 600;
}

.products-ctas {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.btn-whatsapp {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #25d366;
    color: #fff;
    padding: 14px 28px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 700;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
}

.btn-whatsapp:hover {
    background: #1ea952;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(37, 211, 102, 0.5);
}

.btn-whatsapp i {
    font-size: 1.2rem;
}

.btn-secondary-light {
    display: inline-flex;
    align-items: center;
    color: #fff;
    border: 2px solid rgba(255, 255, 255, 0.5);
    padding: 14px 28px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.btn-secondary-light:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: #fff;
    transform: translateY(-2px);
}
```

- [ ] **Step 3: Verify**

Open `index.html` in browser, scroll to the TextileOS section (between Services and About). Confirm:
- Full-width gradient background (blue → red)
- "BUILT BY VUENEXA" pill badge at top
- "TextileOS" in large white bold text
- 5 feature pills visible
- 5×2 grid of 10 module tiles (Yarn, Machine, Employee, Quality, Purchase, Client, Sales, Beam, Production, Salary)
- Green WhatsApp button and outlined "Built by VueNexa →" button
- Clicking WhatsApp button opens `wa.me` link in new tab with pre-filled message
- Clicking "Built by VueNexa →" smooth-scrolls to Contact section
- "Products" nav link smooth-scrolls to this section

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add TextileOS product section with gradient design and WhatsApp CTA"
```

---

## Task 5: About Section — Update Stats + Add Product Capability Sentence

**Files:**
- Modify: `index.html` — about-stats cards + about-description paragraph

- [ ] **Step 1: Replace the three stat cards**

In `index.html`, find the `about-stats` div:
```html
<div class="about-stats">
    <div class="stat-card">
        <div class="stat-number">150+</div>
        <div class="stat-label">Software Projects Delivered</div>
    </div>
    <div class="stat-card">
        <div class="stat-number">98%</div>
        <div class="stat-label">Client Retention Rate</div>
    </div>
    <div class="stat-card">
        <div class="stat-number">5+</div>
        <div class="stat-label">Years of Experience</div>
    </div>
</div>
```
Replace with:
```html
<div class="about-stats">
    <div class="stat-card">
        <div class="stat-number">10+</div>
        <div class="stat-label">Industry Modules in TextileOS</div>
    </div>
    <div class="stat-card">
        <div class="stat-number">3</div>
        <div class="stat-label">Languages Supported (EN · GU · HI)</div>
    </div>
    <div class="stat-card">
        <div class="stat-number">3×</div>
        <div class="stat-label">Platforms: Web · Desktop · Mobile</div>
    </div>
</div>
```

- [ ] **Step 2: Add product capability sentence to about description**

In `index.html`, find the `about-description` paragraph:
```html
<p class="about-description">
    We are a leading software development agency with a team of expert developers,
    architects, and digital strategists. We specialize in building custom software
    solutions that drive business growth and digital transformation for companies worldwide.
</p>
```
Replace with:
```html
<p class="about-description">
    We are a leading software development agency with a team of expert developers,
    architects, and digital strategists. We specialize in building custom software
    solutions that drive business growth and digital transformation for companies worldwide.
    We don't just build for clients — we build our own products like TextileOS, proving
    our ability to design, develop, and deploy full-scale SaaS from the ground up.
</p>
```

- [ ] **Step 3: Verify**

Scroll to About section. Confirm:
- Three stat cards show: 10+ / Industry Modules, 3 / Languages, 3× / Platforms
- About description includes the TextileOS mention
- Feature cards (Innovation First, Fast Delivery, Secure & Reliable) are unchanged

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: update About section stats and description to reflect TextileOS product"
```

---

## Task 6: Why VueNexa? Section (New)

**Files:**
- Modify: `index.html` — insert new section between About and Technologies
- Modify: `styles.css` — append why-vuenexa styles

- [ ] **Step 1: Add Why VueNexa section HTML**

In `index.html`, find the closing `</section>` of the About section (the one that ends with `</div>` closing `about-features`). Insert immediately after it, before the Technologies section:

```html
<!-- Why VueNexa Section -->
<section class="why-vuenexa">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Why VueNexa?</h2>
            <p class="section-subtitle">Six reasons leading businesses choose us over the competition.</p>
        </div>
        <div class="why-grid">
            <div class="why-card">
                <div class="why-icon"><i class="fas fa-industry"></i></div>
                <h4>Industry-Specific Expertise</h4>
                <p>We've built TextileOS — a full ERP for the textile sector — proving we go beyond generic software solutions.</p>
            </div>
            <div class="why-card">
                <div class="why-icon"><i class="fas fa-globe"></i></div>
                <h4>Multilingual by Default</h4>
                <p>Our products support English, Gujarati, and Hindi out of the box. We build for real users in real contexts, not just demos.</p>
            </div>
            <div class="why-card">
                <div class="why-icon"><i class="fas fa-wifi"></i></div>
                <h4>Offline-First Architecture</h4>
                <p>We design systems that work without internet and sync when reconnected — critical for factories and field teams.</p>
            </div>
            <div class="why-card">
                <div class="why-icon"><i class="fas fa-layer-group"></i></div>
                <h4>Full-Stack Delivery</h4>
                <p>One team, one codebase — from database schema to pixel-perfect UI to Electron desktop packaging. No handoffs.</p>
            </div>
            <div class="why-card">
                <div class="why-icon"><i class="fas fa-headset"></i></div>
                <h4>Long-Term Partnership</h4>
                <p>We maintain and grow what we build. Our 98% client retention rate isn't a number — it's a commitment we keep.</p>
            </div>
            <div class="why-card">
                <div class="why-icon"><i class="fas fa-map-marker-alt"></i></div>
                <h4>Local Roots, Global Standards</h4>
                <p>Based in Surat — India's textile capital — building enterprise-grade software by global standards since day one.</p>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Add Why VueNexa CSS**

Append to end of `styles.css`:

```css
/* ==========================================
   WHY VUENEXA SECTION
   ========================================== */
.why-vuenexa {
    padding: 6rem 0;
    background: #f8fafc;
}

.why-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}

.why-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.why-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
    border-color: #1d4ed8;
}

.why-icon {
    width: 56px;
    height: 56px;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.25rem;
    color: #1d4ed8;
    font-size: 1.3rem;
    transition: all 0.3s ease;
}

.why-card:hover .why-icon {
    background: #1d4ed8;
    color: #fff;
    border-color: #1d4ed8;
}

.why-card h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.75rem;
    line-height: 1.3;
}

.why-card p {
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
}
```

- [ ] **Step 3: Verify**

Scroll to the Why VueNexa section (between About and Technologies). Confirm:
- Light grey background (`#f8fafc`)
- 3×2 grid of 6 white cards
- Each card has a blue circular icon, bold heading, description
- Hovering a card raises it and turns icon blue-filled
- Section header shows "Why VueNexa?" with subtitle

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add Why VueNexa section with 6 differentiator cards"
```

---

## Task 7: Footer Improvements — Social Links, Copyright, TextileOS Link

**Files:**
- Modify: `index.html` — footer section
- Modify: `styles.css` — append footer social styles

- [ ] **Step 1: Update footer HTML**

In `index.html`, find the footer section. Replace the `footer-links` div and `footer-bottom` paragraph with the updated version:

Find:
```html
            <div class="footer-links">
                    <a href="privacy.html" class="footer-link">Privacy Policy</a>
                    <span class="footer-separator">|</span>
                    <a href="terms.html" class="footer-link">Terms & Conditions</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 VueNexa Technologies. All rights reserved.</p>
            </div>
```
Replace with:
```html
            <div class="footer-links">
                <a href="#products" class="footer-link">TextileOS</a>
                <span class="footer-separator">|</span>
                <a href="privacy.html" class="footer-link">Privacy Policy</a>
                <span class="footer-separator">|</span>
                <a href="terms.html" class="footer-link">Terms &amp; Conditions</a>
            </div>
            <div class="footer-social">
                <a href="#" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#" class="social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github"></i>
                </a>
                <a href="#" class="social-link" aria-label="Twitter / X" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-x-twitter"></i>
                </a>
            </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 VueNexa Technologies. All rights reserved.</p>
            </div>
```

- [ ] **Step 2: Add footer social CSS**

Append to end of `styles.css`:

```css
/* ==========================================
   FOOTER SOCIAL LINKS
   ========================================== */
.footer-social {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 1.5rem;
}

.social-link {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 1rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.15);
}

.social-link:hover {
    background: #dc2626;
    border-color: #dc2626;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
}
```

- [ ] **Step 3: Verify**

Scroll to footer. Confirm:
- "TextileOS" appears as first footer link and scrolls to `#products` when clicked
- Privacy Policy and Terms & Conditions links still work
- Three social icon circles (LinkedIn, GitHub, X) appear below the links
- Hovering social icons turns them red
- Copyright shows **2025** not 2024

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: update footer with social links, TextileOS link, and 2025 copyright"
```

---

## Task 8: Mobile Responsiveness for New Sections

**Files:**
- Modify: `styles.css` — add responsive breakpoints for new sections

- [ ] **Step 1: Add responsive CSS for all new sections**

In `styles.css`, find the `/* Responsive Design */` comment block (around line 955). Before the first `@media` rule, append the following new breakpoints:

```css
/* ==========================================
   RESPONSIVE — NEW SECTIONS
   ========================================== */

/* Tablet: 768px and below */
@media (max-width: 768px) {
    /* Hero dark theme */
    .hero-stats {
        gap: 1rem;
    }
    .hero-stat-number {
        font-size: 1.4rem;
    }

    /* TextileOS product section */
    .products-name {
        font-size: 2.5rem;
    }
    .products-modules {
        grid-template-columns: repeat(5, 1fr);
        gap: 8px;
    }
    .module-tile {
        padding: 10px 4px;
    }
    .module-icon {
        font-size: 1.2rem;
    }
    .module-name {
        font-size: 0.7rem;
    }
    .products-ctas {
        flex-direction: column;
        align-items: center;
    }
    .btn-whatsapp,
    .btn-secondary-light {
        width: 100%;
        max-width: 320px;
        justify-content: center;
    }

    /* Why VueNexa */
    .why-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    /* Footer social */
    .footer-social {
        gap: 10px;
    }
}

/* Mobile: 480px and below */
@media (max-width: 480px) {
    /* Hero */
    .hero-stats {
        flex-direction: column;
        gap: 0.75rem;
        align-items: flex-start;
    }
    .hero-stat-divider {
        display: none;
    }

    /* TextileOS product section */
    .products-name {
        font-size: 2rem;
    }
    .products-modules {
        grid-template-columns: repeat(5, 1fr);
        gap: 6px;
    }

    /* Why VueNexa */
    .why-grid {
        grid-template-columns: 1fr;
    }

    /* Teaser panel */
    .textileos-teaser {
        padding: 1.5rem;
    }
    .teaser-product-name {
        font-size: 1.8rem;
    }
}
```

- [ ] **Step 2: Verify on mobile**

Open browser DevTools → toggle device toolbar → test at 375px width (iPhone). Confirm:
- Hero stats stack vertically, dividers hidden
- Hero teaser panel is readable (no overflow)
- TextileOS module grid stays at 5 columns but tiles are compact
- WhatsApp and "Built by VueNexa" buttons are full width and centered
- Why VueNexa cards stack to 1 column
- No horizontal scrollbar appears anywhere on the page

- [ ] **Step 3: Verify on tablet**

Test at 768px. Confirm:
- Why VueNexa shows 2 columns
- Products CTAs stack vertically and center

- [ ] **Step 4: Final full-page review**

Scroll through the complete page at desktop width. Confirm the section order is:
1. Navbar (Home · Services · Products · About · Contact)
2. Hero (dark, with teaser panel + stats)
3. Services (8 cards, correct icons)
4. TextileOS (gradient, 10 modules, WhatsApp CTA)
5. About (new stats, extended description)
6. Why VueNexa? (6 blue-icon cards)
7. Technologies (scrolling rows — unchanged)
8. Contact (form — unchanged)
9. Footer (social links, 2025, TextileOS link)

- [ ] **Step 5: Commit**

```bash
git add styles.css
git commit -m "feat: add mobile-responsive breakpoints for all new sections"
```

---

## Self-Review Checklist

- [x] All spec sections covered (Nav, Hero, Services, Products, About, Why VueNexa?, Footer)
- [x] No TBDs or placeholder text
- [x] WhatsApp URL uses correct number (`917202976525` = `+91 7202976525`)
- [x] `fa-x-twitter` available in Font Awesome 6.4.0 (loaded via CDN)
- [x] `fab fa-whatsapp` available in Font Awesome 6.4.0
- [x] No new files created — only `index.html` and `styles.css` modified
- [x] No JS changes — `js/common.js` handles hamburger and smooth scroll automatically for all new anchor links
- [x] Social link `href="#"` — placeholder, user will fill in real URLs
- [x] Class names consistent across all tasks (`.products-name`, `.module-tile`, `.teaser-cta`, etc.)
