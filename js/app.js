document.addEventListener("DOMContentLoaded", async () => {
  // DOM Elements
  const modal = document.getElementById("age-verification");
  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");
  const contentArea = document.getElementById("content-area");

  // Default language and translations store
  let currentLanguage = "en";
  let translations = {};

  // Load translations
  async function loadTranslations(lang) {
    try {
      const response = await fetch(`./translations/${lang}.json`);
      translations[lang] = await response.json();
    } catch (error) {
      console.error(`Failed to load ${lang} translations:`, error);
    }
  }

  // Load legal content
  async function loadLegalContent(lang) {
    if (!contentArea) return; // Exit if not on legal page

    const pageType = window.location.pathname.includes("privacy") ? "privacy-policies" : "terms-of-use";
    const filePath = `assets/legal/${pageType}-${lang}.md`;

    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error('Content not found');
      const text = await response.text();
      contentArea.innerHTML = marked.parse(text);
    } catch (error) {
      contentArea.innerHTML = `<p class="error">Error loading content: ${error.message}</p>`;
    }
  }

  // Update header content (common to all pages)
  function updateHeaderContent(lang) {
    const t = translations[lang];
    if (!t) return; // Exit if translations aren't loaded

    // Header
    const tagline = document.getElementById("tagline");
    const headerDesc = document.getElementById("header-description") || document.querySelector(".header-description");
    if (tagline && headerDesc) {
      tagline.textContent = t.header.tagline;
      headerDesc.textContent = t.header.description;
    }
  }

  // Update main page content
  function updateMainPageContent(lang) {
    const t = translations[lang];
    if (!t) return; // Exit if translations aren't loaded

    // Age verification
    const ageVerificationTitle = document.querySelector("#age-verification h2");
    const ageMessage = document.getElementById("age-message");
    if (ageVerificationTitle && ageMessage && btnYes && btnNo) {
      ageVerificationTitle.textContent = t.ageVerification.title;
      ageMessage.textContent = t.ageVerification.message;
      btnYes.textContent = t.ageVerification.confirmButton;
      btnNo.textContent = t.ageVerification.rejectButton;
    }

    // Update header
    updateHeaderContent(lang);

    // Key Features Section
    const keyFeaturesHeading = document.getElementById("key-features-heading");
    const keyFeaturesSubtitle = document.getElementById("key-features-subtitle");
    if (keyFeaturesHeading && keyFeaturesSubtitle && t.keyFeatures) {
      keyFeaturesHeading.textContent = t.keyFeatures.title;
      keyFeaturesSubtitle.textContent = t.keyFeatures.subtitle;
      
      // Update each feature card
      const featureCards = [
        { id: 'free-access', key: 'freeAccess' },
        { id: 'premium-access', key: 'premiumAccess' },
        { id: 'expert-access', key: 'expertAccess' },
        { id: 'social-features', key: 'socialFeatures' },
        { id: 'privacy-features', key: 'privacyFeatures' }
      ];
      
      featureCards.forEach(card => {
        const title = document.getElementById(`${card.id}-title`);
        const desc = document.getElementById(`${card.id}-desc`);
        if (title && desc && t.keyFeatures[card.key]) {
          title.textContent = t.keyFeatures[card.key].title;
          desc.textContent = t.keyFeatures[card.key].description;
        }
      });
    }

    // Features Showcase
    const featuresHeading = document.getElementById("features-heading");
    const featuresDesc = document.querySelector(".features-showcase .section-description");
    if (featuresHeading && featuresDesc) {
      featuresHeading.textContent = t.features.title;
      featuresDesc.textContent = t.features.subtitle;
    }
    
    // Update individual feature content
    for (let i = 1; i <= 5; i++) {
      const featureTitle = document.getElementById(`feature-${i}-title`);
      const featureDesc = document.getElementById(`feature-${i}-desc`);
      if (featureTitle && featureDesc && t.features[`feature${i}`]) {
        featureTitle.textContent = t.features[`feature${i}`].title;
        featureDesc.textContent = t.features[`feature${i}`].description;
      }
    }

    // Discover section
    const carouselHeading = document.getElementById("carousel-heading");
    const screenshotsDesc = document.querySelector(".screenshots .section-description");
    if (carouselHeading && screenshotsDesc) {
      carouselHeading.textContent = t.discover.title;
      screenshotsDesc.textContent = t.discover.subtitle;
    }

    // Restriction page content
    const restrictionContent = document.querySelector('.restriction-content');
    if (restrictionContent) {
      // Update main content
      const pageTitle = restrictionContent.querySelector('h1');
      const mainDesc = restrictionContent.querySelector('p');
      if (pageTitle && mainDesc) {
        pageTitle.textContent = t.restriction.pageTitle;
        mainDesc.textContent = t.restriction.mainDescription;
      }

      // Update Important Info section
      const importantInfoTitle = restrictionContent.querySelector('h2');
      const importantInfoList = document.getElementById('important-info-list');
      if (importantInfoTitle && importantInfoList) {
        importantInfoTitle.textContent = t.restriction.importantInfo.title;
        importantInfoList.innerHTML = t.restriction.importantInfo.items
          .map(item => `<li>${item}</li>`)
          .join('');
      }

      // Update Legal Requirements section
      const legalTitle = restrictionContent.querySelectorAll('h2')[1];
      const legalIntro = restrictionContent.querySelectorAll('p')[1];
      const legalList = document.getElementById('legal-requirements-list');
      if (legalTitle && legalIntro && legalList) {
        legalTitle.textContent = t.restriction.legalRequirements.title;
        legalIntro.textContent = t.restriction.legalRequirements.intro;
        legalList.innerHTML = t.restriction.legalRequirements.items
          .map(item => `<li>${item}</li>`)
          .join('');
      }

      // Update warning message
      const warning = restrictionContent.querySelector('.warning');
      if (warning) {
        warning.textContent = t.restriction.warning;
      }
    }

    // Download section
    const downloadHeading = document.getElementById("download-heading");
    const downloadDesc = document.querySelector(".download .section-description");
    if (downloadHeading && downloadDesc) {
      downloadHeading.textContent = t.download.title;
      downloadDesc.textContent = t.download.subtitle;
    }
  }

  // Update footer translations
  function updateFooter(lang) {
    const t = translations[lang];
    if (!t) return;

    const footerElements = {
      "footer-created-by": t.footer.createdBy,
      "whats-new": t.footer.whatsNew,
      "privacy-link": t.footer.privacyPolicy,
      "terms-link": t.footer.termsOfUse
    };

    for (const [id, text] of Object.entries(footerElements)) {
      const element = document.getElementById(id);
      if (element) element.textContent = text;
    }
  }

  // Language switcher function
  async function updateContent(lang) {
    // Update active class on language links
    document.querySelectorAll('.language-links a').forEach(link => {
      link.classList.remove('active');
    });
    event.target.classList.add('active');

    currentLanguage = lang;

    // Load translations if not already loaded
    if (!translations[lang]) {
      await loadTranslations(lang);
    }

    // Update content based on page type
    if (contentArea) {
      await loadLegalContent(lang);
      updateHeaderContent(lang); // Update header on legal pages
    } else {
      updateMainPageContent(lang);
    }

    // Update footer (common to all pages)
    updateFooter(lang);
  }

  // Make language switcher function globally available
  window.updateContent = updateContent;
  window.changeLang = updateContent; // Alias for legacy support

  // Age Verification
  if (modal && !localStorage.getItem("ageVerified")) {
    modal.classList.add("active");
  }

  if (btnYes) {
    btnYes.addEventListener("click", () => {
      localStorage.setItem("ageVerified", "true");
      modal.classList.remove("active");
    });
  }

  if (btnNo) {
    btnNo.addEventListener("click", () => {
      window.location.href = "restriction.html"; // Assuming you save the above HTML as underage.html
    });
  }

  // Initialize with default language
  await loadTranslations(currentLanguage);
  if (contentArea) {
    await loadLegalContent(currentLanguage);
    updateHeaderContent(currentLanguage); // Update header on legal pages
  } else {
    updateMainPageContent(currentLanguage);
  }
  updateFooter(currentLanguage);
});
