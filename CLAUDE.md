# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Cigarrynos web landing page - a static website showcasing the Cigarrynos mobile app for cigar enthusiasts. The landing page includes multi-language support (EN/FR), age verification, and links to download the mobile apps.

## Development Commands

```bash
# Install dependencies
npm install

# Run local development server (uses serve package)
npx serve

# The site uses static HTML/CSS/JS - no build process required
```

## Architecture & Structure

### Core Components

1. **Multi-page Static Site**
   - `index.html` - Main landing page with features showcase
   - `privacy.html` - Privacy policy page
   - `terms.html` - Terms of use page
   - `restriction.html` - Age restriction notice page
   - `changelog.html` - App version changelog
   - `share/index.html` - Share/deep linking page

2. **JavaScript Application (`js/app.js`)**
   - Implements multi-language support via JSON translation files
   - Age verification modal with localStorage persistence
   - Dynamic content loading for legal documents (Markdown to HTML)
   - Language switcher functionality affecting all page content

3. **Internationalization**
   - Translation files: `translations/en.json` and `translations/fr.json`
   - Legal documents in Markdown: `assets/legal/privacy-policies-{lang}.md` and `terms-of-use-{lang}.md`
   - Dynamic language switching without page reload

4. **Key Features**
   - Age verification gate (stored in localStorage)
   - Responsive design optimized for mobile and desktop
   - Screenshot carousel showcasing app features
   - Direct App Store and Play Store download links

## Important Context

### Mobile App Integration
The landing page supports the Cigarrynos mobile app (Flutter-based) which includes:
- User authentication tiers (Anonymous, Signed-in, Premium, Expert)
- Cigar catalog, reviews, and personal collections
- AI assistant "Wainston" for recommendations
- Social features and community interaction
- Firebase backend with Firestore, Cloud Functions, and Storage

### Company Information
- Developer: Noratek SRL
- Copyright: © 2024 Noratek SRL
- Support: support@cigarrynos.com
- Privacy contact: privacy@cigarrynos.app

## Development Guidelines

1. **Language Support**: Always update both `en.json` and `fr.json` when adding new translatable content
2. **Legal Documents**: Legal content is stored as Markdown files and rendered dynamically
3. **Age Verification**: Required before accessing main content, persists in localStorage
4. **Static Hosting**: Designed for GitHub Pages deployment (CNAME file present)
5. **No Build Process**: Direct HTML/CSS/JS - changes are immediately reflected