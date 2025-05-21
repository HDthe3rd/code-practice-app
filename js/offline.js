// Offline functionality
const offlineModeToggle = document.getElementById("offline-mode");
const manageDownloadsButton = document.querySelector(".manage-downloads");
const downloadAllButton = document.querySelector(".download-all");
const removeAllButton = document.querySelector(".remove-all");

// Offline content state
const offlineState = {
  downloadedCategories: ["html"],
  downloadingCategories: ["css"],
  availableCategories: ["html", "css", "javascript", "interview"],
  totalStorage: 500, // MB
  usedStorage: 48, // MB
};

// Initialize offline functionality
function initOfflineMode() {
  // Apply offline settings
  applyOfflineSettings();

  // Setup event listeners
  setupOfflineEventListeners();
}

// Apply offline settings
function applyOfflineSettings() {
  // Apply offline mode toggle
  if (offlineModeToggle) {
    offlineModeToggle.checked = appState.settings.offlineMode;
  }

  // Update downloaded status indicators on exercises
  updateOfflineIndicators();
}

// Setup offline event listeners
function setupOfflineEventListeners() {
  // Offline mode toggle
  if (offlineModeToggle) {
    offlineModeToggle.addEventListener("change", function () {
      appState.settings.offlineMode = this.checked;
      applyOfflineSettings();
    });
  }

  // Manage downloads button
  if (manageDownloadsButton) {
    manageDownloadsButton.addEventListener("click", function () {
      showScreen(offlineManagerScreen);
    });
  }

  // Download all button
  if (downloadAllButton) {
    downloadAllButton.addEventListener("click", function () {
      simulateDownloadAll();
    });
  }

  // Remove all button
  if (removeAllButton) {
    removeAllButton.addEventListener("click", function () {
      simulateRemoveAll();
    });
  }

  // Individual download buttons
  document
    .querySelectorAll(".start-download, .pause-download, .remove-download")
    .forEach((button) => {
      button.addEventListener("click", function () {
        const action = this.className.split("-")[0]; // start, pause, or remove
        const category = this.closest(".download-category")
          .querySelector("h3")
          .textContent.toLowerCase();

        if (action === "start") {
          simulateDownloadCategory(category);
        } else if (action === "pause") {
          simulatePauseCategory(category);
        } else if (action === "remove") {
          simulateRemoveCategory(category);
        }
      });
    });
}

// Update offline indicators on exercises
function updateOfflineIndicators() {
  document.querySelectorAll(".exercise").forEach((exercise) => {
    const exerciseCategory = "html"; // In a real app, get this from data attributes
    const downloadStatus = exercise.querySelector(".download-status");

    if (downloadStatus) {
      if (offlineState.downloadedCategories.includes(exerciseCategory)) {
        downloadStatus.innerHTML =
          '<i class="fas fa-download"></i> Available offline';
        downloadStatus.classList.add("downloaded");
      } else {
        downloadStatus.innerHTML =
          '<i class="fas fa-wifi"></i> Requires connection';
        downloadStatus.classList.remove("downloaded");
      }
    }
  });
}

// Simulate download all categories
function simulateDownloadAll() {
  // In a real app, this would trigger actual downloads
  announceToScreenReader("Starting download of all content");
  logToConsole("Starting download of all content...");

  // For demo, just update the UI after a delay
  setTimeout(() => {
    offlineState.downloadedCategories = [...offlineState.availableCategories];
    offlineState.downloadingCategories = [];
    offlineState.usedStorage = 98;
    updateOfflineIndicators();
    announceToScreenReader("All content downloaded");
    logToConsole("All content downloaded successfully");
  }, 2000);
}

// Simulate remove all downloaded content
function simulateRemoveAll() {
  // In a real app, this would delete downloaded content
  announceToScreenReader("Removing all downloaded content");
  logToConsole("Removing all downloaded content...");

  // For demo, just update the UI after a delay
  setTimeout(() => {
    offlineState.downloadedCategories = [];
    offlineState.downloadingCategories = [];
    offlineState.usedStorage = 0;
    updateOfflineIndicators();
    announceToScreenReader("All downloaded content removed");
    logToConsole("All downloaded content removed successfully");
  }, 1000);
}

// Simulate download of a specific category
function simulateDownloadCategory(category) {
  // In a real app, this would trigger actual downloads
  announceToScreenReader(`Starting download of ${category} content`);
  logToConsole(`Starting download of ${category} content...`);

  // For demo, just update the UI after a delay
  offlineState.downloadingCategories.push(category);
  updateOfflineIndicators();

  setTimeout(() => {
    offlineState.downloadedCategories.push(category);
    const index = offlineState.downloadingCategories.indexOf(category);
    if (index > -1) {
      offlineState.downloadingCategories.splice(index, 1);
    }
    offlineState.usedStorage += 25; // Fake storage increase
    updateOfflineIndicators();
    announceToScreenReader(`${category} content downloaded`);
    logToConsole(`${category} content downloaded successfully`);
  }, 2000);
}

// Simulate pause download
function simulatePauseCategory(category) {
  // In a real app, this would pause actual downloads
  announceToScreenReader(`Pausing download of ${category} content`);
  logToConsole(`Pausing download of ${category} content...`);

  // For demo, just update the UI after a delay
  setTimeout(() => {
    const index = offlineState.downloadingCategories.indexOf(category);
    if (index > -1) {
      offlineState.downloadingCategories.splice(index, 1);
    }
    updateOfflineIndicators();
    announceToScreenReader(`${category} download paused`);
    logToConsole(`${category} download paused`);
  }, 1000);
}

// Simulate remove downloaded category
function simulateRemoveCategory(category) {
  // In a real app, this would delete downloaded content
  announceToScreenReader(`Removing downloaded ${category} content`);
  logToConsole(`Removing downloaded ${category} content...`);

  // For demo, just update the UI after a delay
  setTimeout(() => {
    const index = offlineState.downloadedCategories.indexOf(category);
    if (index > -1) {
      offlineState.downloadedCategories.splice(index, 1);
    }
    offlineState.usedStorage -= 25; // Fake storage decrease
    if (offlineState.usedStorage < 0) offlineState.usedStorage = 0;
    updateOfflineIndicators();
    announceToScreenReader(`${category} content removed`);
    logToConsole(`${category} content removed successfully`);
  }, 1000);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initOfflineMode);
