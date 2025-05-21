// Accessibility features
const fontSizeDecrease = document.querySelector(".size-decrease");
const fontSizeIncrease = document.querySelector(".size-increase");
const currentSizeDisplay = document.querySelector(".current-size");
const highContrastToggle = document.getElementById("high-contrast");
const screenReaderToggle = document.getElementById("screen-reader");
const saveSettingsButton = document.querySelector(".settings-save");

// Font size levels
const fontSizes = ["small", "medium", "large", "extra-large"];
let currentFontSizeIndex = 1; // Start at medium

// Initialize accessibility settings
function initAccessibility() {
  // Apply saved settings if available
  applyAccessibilitySettings();

  // Setup event listeners
  setupAccessibilityEventListeners();

  // Add skip link for keyboard users
  addSkipLink();

  // Add ARIA live regions for important announcements
  addAriaLiveRegions();
}

// Apply accessibility settings from state
function applyAccessibilitySettings() {
  // Apply font size
  document.body.classList.remove(
    "font-size-small",
    "font-size-medium",
    "font-size-large",
    "font-size-extra-large"
  );
  document.body.classList.add(`font-size-${fontSizes[currentFontSizeIndex]}`);
  if (currentSizeDisplay) {
    currentSizeDisplay.textContent = fontSizes[currentFontSizeIndex].replace(
      "-",
      " "
    );
  }

  // Apply high contrast if enabled
  if (appState.settings.highContrast) {
    document.body.classList.add("theme-high-contrast");
    if (highContrastToggle) highContrastToggle.checked = true;
  } else {
    document.body.classList.remove("theme-high-contrast");
    if (highContrastToggle) highContrastToggle.checked = false;
  }

  // Apply screen reader support settings
  if (screenReaderToggle) {
    screenReaderToggle.checked = appState.settings.screenReader;
  }
}

// Setup event listeners for accessibility controls
function setupAccessibilityEventListeners() {
  // Font size controls
  if (fontSizeDecrease) {
    fontSizeDecrease.addEventListener("click", decreaseFontSize);
  }

  if (fontSizeIncrease) {
    fontSizeIncrease.addEventListener("click", increaseFontSize);
  }

  // High contrast toggle
  if (highContrastToggle) {
    highContrastToggle.addEventListener("change", function () {
      appState.settings.highContrast = this.checked;
      applyAccessibilitySettings();
    });
  }

  // Screen reader support toggle
  if (screenReaderToggle) {
    screenReaderToggle.addEventListener("change", function () {
      appState.settings.screenReader = this.checked;
      applyAccessibilitySettings();
    });
  }

  // Save settings button
  if (saveSettingsButton) {
    saveSettingsButton.addEventListener("click", function () {
      // In a real app, this would save to localStorage or a backend
      showScreen(dashboardScreen);
      announceToScreenReader("Settings saved");
    });
  }
}

// Decrease font size
function decreaseFontSize() {
  if (currentFontSizeIndex > 0) {
    currentFontSizeIndex--;
    applyAccessibilitySettings();
  }
}

// Increase font size
function increaseFontSize() {
  if (currentFontSizeIndex < fontSizes.length - 1) {
    currentFontSizeIndex++;
    applyAccessibilitySettings();
  }
}

// Add skip link for keyboard users
function addSkipLink() {
  const skipLink = document.createElement("a");
  skipLink.href = "#main";
  skipLink.className = "skip-link";
  skipLink.textContent = "Skip to content";
  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Add ARIA live regions for announcements
function addAriaLiveRegions() {
  const liveRegion = document.createElement("div");
  liveRegion.className = "aria-live";
  liveRegion.setAttribute("aria-live", "polite");
  liveRegion.setAttribute("aria-atomic", "true");
  document.body.appendChild(liveRegion);
}

// Announce message to screen readers
function announceToScreenReader(message) {
  const liveRegion = document.querySelector(".aria-live");
  if (liveRegion && appState.settings.screenReader) {
    liveRegion.textContent = message;
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initAccessibility);
