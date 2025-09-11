# VueNexa Technologies Website

## Project Structure

```
VueNexa-Site/
├── components/           # Reusable HTML components
│   ├── header.html      # Header component
│   └── footer.html      # Footer component
├── css/                 # Stylesheets
│   ├── main.css         # Main CSS file (imports all others)
│   ├── base.css         # Base styles and reset
│   ├── header.css       # Header-specific styles
│   └── footer.css       # Footer-specific styles
├── js/                  # JavaScript files
│   └── common.js        # Common functionality
├── templates/           # Page templates
│   └── page-template.html # Template for new pages
├── images/              # Image assets
│   ├── logo-3.png       # Main logo
│   └── logo-footer.png  # Footer logo
├── index.html           # Current homepage
├── index-new.html       # New structured homepage
└── README.md           # This file
```

## How to Use

### 1. Creating New Pages
Use the template in `templates/page-template.html` as a starting point:

1. Copy `templates/page-template.html`
2. Rename it to your new page (e.g., `about.html`)
3. Update the title and content
4. The header and footer will be automatically loaded

### 2. Updating Header/Footer
- Edit `components/header.html` to update the header
- Edit `components/footer.html` to update the footer
- Changes will apply to all pages automatically

### 3. Adding New Styles
- Add component-specific styles to their respective CSS files
- Import new CSS files in `css/main.css`
- Use `css/base.css` for global styles

### 4. Adding JavaScript
- Add common functionality to `js/common.js`
- Create new JS files for page-specific functionality
- Include them in your HTML pages

## Benefits of This Structure

1. **Reusable Components**: Header and footer are shared across all pages
2. **Easy Maintenance**: Update header/footer once, applies everywhere
3. **Organized Code**: Separate files for different components
4. **Scalable**: Easy to add new pages and components
5. **Clean Separation**: HTML, CSS, and JS are properly organized

## Migration

To migrate your existing pages:
1. Replace the header section with `<div id="header-placeholder"></div>`
2. Replace the footer section with `<div id="footer-placeholder"></div>`
3. Include the common.js script
4. Add the component loading script
5. Update CSS links to use `css/main.css`
