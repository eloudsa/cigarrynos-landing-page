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

    // Header
    const tagline = document.getElementById("tagline");
    const headerDesc = document.querySelector(".header-description");
    if (tagline && headerDesc) {
      tagline.textContent = t.header.tagline;
      headerDesc.textContent = t.header.description;
    }

    // Features
    const featuresHeading = document.getElementById("features-heading");
    const featuresDesc = document.querySelector(".features .section-description");
    const featuresList = document.getElementById("features-list");
    if (featuresHeading && featuresDesc) {
      featuresHeading.textContent = t.features.title;
      featuresDesc.textContent = t.features.subtitle;
    }
    if (featuresList) {
      featuresList.innerHTML = t.features.items
        .map(feature => `
          <li>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
          </li>
        `).join("");
    }

    // Discover section
    const carouselHeading = document.getElementById("carousel-heading");
    const screenshotsDesc = document.querySelector(".screenshots .section-description");
    if (carouselHeading && screenshotsDesc) {
      carouselHeading.textContent = t.discover.title;
      screenshotsDesc.textContent = t.discover.subtitle;
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
  } else {
    updateMainPageContent(currentLanguage);
  }
  updateFooter(currentLanguage);
});
