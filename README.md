# Shrikant Jathar Portfolio

<p align="center">
  <a href="https://shrikantjathar2005.github.io/" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#0366d6;color:white;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:600">View Portfolio</a>
</p>

Recruiter-focused one-page portfolio for **Shrikant Jathar (AI Engineer)**.

## Local preview

No build step is required.

```bash
cd /home/runner/work/shrikant-jathar-portfolio/shrikant-jathar-portfolio
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Files

- `index.html` – page structure and content
- `styles.css` – responsive styling, accessibility states, reduced-motion support
- `script.js` – mobile menu, active nav highlighting, scroll reveal
- `favicon.svg` – lightweight monogram favicon

## Customization guide

1. Update personal details in `index.html` (hero text, experience dates, links, contact).
2. Adjust colors and spacing in `styles.css` via `:root` variables.
3. Add or remove interactive behaviors in `script.js`.
4. If email/resume links are available, add them in the `#contact` section.

## Accessibility notes

- Semantic sections and headings
- Keyboard-visible focus states
- Skip link for keyboard navigation
- `prefers-reduced-motion` support
- Core content remains available without JavaScript
