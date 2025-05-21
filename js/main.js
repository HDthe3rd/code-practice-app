// DOM Elements
const backButton = document.getElementById("back-button");
const settingsButton = document.getElementById("settings-button");
const dashboardScreen = document.getElementById("dashboard");
const exerciseListScreen = document.getElementById("exercise-list");
const codeEditorScreen = document.getElementById("code-editor");
const resultsScreen = document.getElementById("results");
const settingsScreen = document.getElementById("settings-screen");
const offlineManagerScreen = document.getElementById("offline-manager");
const categoryButtons = document.querySelectorAll(".category");
const exercises = document.querySelectorAll(".exercise");
const runButton = document.querySelector(".run-button");
const nextButton = document.querySelector(".next-button");
const navItems = document.querySelectorAll(".nav-item");
const toggleInstructionsButton = document.getElementById("toggle-instructions");
const detailedInstructions = document.getElementById("detailed-instructions");

// App State
const appState = {
  currentScreen: "dashboard",
  isOnline: true,
  currentExercise: null,
  userProgress: {
    streak: 3,
    completedExercises: ["html-doc-structure", "headings-paragraphs"],
    categoryProgress: {
      html: 70,
      css: 45,
      javascript: 30,
      interview: 15,
    },
  },
  settings: {
    fontSize: "medium",
    highContrast: false,
    screenReader: true,
    offlineMode: true,
    syntaxHighlighting: true,
    autoComplete: true,
  },
};

// Initialize app
function initApp() {
  showScreen(dashboardScreen);
  updateUIBasedOnState();

  // Set up event listeners
  setupEventListeners();

  // Check online status
  updateOnlineStatus();
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  // For demo purposes - make keyboard users visible
  window.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-mode");
    }
  });

  window.addEventListener("mousedown", function () {
    document.body.classList.remove("keyboard-mode");
  });
}

// Set up event listeners
function setupEventListeners() {
  // Navigation
  backButton.addEventListener("click", handleBackNavigation);
  settingsButton.addEventListener("click", () => showScreen(settingsScreen));

  // Category selection
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      appState.currentCategory = category;
      showScreen(exerciseListScreen);
    });
  });

  // Exercise selection
  exercises.forEach((exercise) => {
    exercise.addEventListener("click", function () {
      if (!this.classList.contains("locked")) {
        showScreen(codeEditorScreen);
      }
    });
  });

  // Run code
  runButton.addEventListener("click", function () {
    validateCode();
    showScreen(resultsScreen);
  });

  // Next exercise
  nextButton.addEventListener("click", function () {
    showScreen(exerciseListScreen);
  });

  // Bottom navigation
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      const navSection =
        this.querySelector(".nav-label").textContent.toLowerCase();
      handleMainNavigation(navSection);
    });
  });

  // Toggle detailed instructions
  if (toggleInstructionsButton) {
    toggleInstructionsButton.addEventListener("click", function () {
      const isVisible = detailedInstructions.style.display === "block";
      detailedInstructions.style.display = isVisible ? "none" : "block";
      this.textContent = isVisible
        ? "Show detailed instructions"
        : "Hide detailed instructions";
    });
  }
}

// Handle back button navigation
function handleBackNavigation() {
  switch (appState.currentScreen) {
    case "exerciseList":
      showScreen(dashboardScreen);
      break;
    case "codeEditor":
      showScreen(exerciseListScreen);
      break;
    case "results":
      showScreen(codeEditorScreen);
      break;
    case "settings":
    case "offlineManager":
      showScreen(dashboardScreen);
      break;
    default:
      showScreen(dashboardScreen);
  }
}

// Handle main navigation
function handleMainNavigation(section) {
  switch (section) {
    case "home":
      showScreen(dashboardScreen);
      break;
    case "learn":
      showScreen(exerciseListScreen);
      break;
    case "progress":
      // For demo, just go back to dashboard
      showScreen(dashboardScreen);
      break;
    case "profile":
      // For demo, show settings
      showScreen(settingsScreen);
      break;
    default:
      showScreen(dashboardScreen);
  }
}

// Helper function to show a screen
function showScreen(screen) {
  // Hide all screens
  dashboardScreen.style.display = "none";
  exerciseListScreen.style.display = "none";
  codeEditorScreen.style.display = "none";
  resultsScreen.style.display = "none";
  settingsScreen.style.display = "none";
  offlineManagerScreen.style.display = "none";

  // Show the requested screen
  screen.style.display = "block";

  // Update current screen in state
  if (screen === dashboardScreen) appState.currentScreen = "dashboard";
  else if (screen === exerciseListScreen)
    appState.currentScreen = "exerciseList";
  else if (screen === codeEditorScreen) appState.currentScreen = "codeEditor";
  else if (screen === resultsScreen) appState.currentScreen = "results";
  else if (screen === settingsScreen) appState.currentScreen = "settings";
  else if (screen === offlineManagerScreen)
    appState.currentScreen = "offlineManager";

  // Announce screen change for screen readers
  announceScreenChange(appState.currentScreen);
}

// Update UI based on state
function updateUIBasedOnState() {
  // Update connection status UI
  const connectionStatus = document.querySelector(".connection-status");
  if (connectionStatus) {
    connectionStatus.className = `connection-status ${
      appState.isOnline ? "online" : "offline"
    }`;
    connectionStatus.innerHTML = appState.isOnline
      ? '<i class="fas fa-wifi"></i> <span>Online Mode</span>'
      : '<i class="fas fa-exclamation-triangle"></i> <span>Offline Mode</span>';
  }

  // Update completed exercises
  document.querySelectorAll(".exercise").forEach((exercise) => {
    const exerciseId = exercise
      .querySelector("h4")
      .textContent.toLowerCase()
      .replace(/\s+/g, "-");
    if (appState.userProgress.completedExercises.includes(exerciseId)) {
      exercise.classList.add("completed");
    }
  });
}

// Check online status
function updateOnlineStatus() {
  appState.isOnline = navigator.onLine;
  updateUIBasedOnState();
}

// Basic code validation for demo
function validateCode() {
  // This would be more sophisticated in a real app
  console.log("Code validation performed");
  // For demo purposes, we're not actually validating code
}

// Screen reader announcements
function announceScreenChange(screenName) {
  // This would use ARIA live regions in a real app
  console.log(`Screen changed to: ${screenName}`);
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", initApp);
