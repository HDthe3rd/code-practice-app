// Code Editor functionality
const htmlEditor = document.getElementById("html-editor");
const cssEditor = document.getElementById("css-editor");
const resultPreview = document.getElementById("result-preview");
const previewContent = document.querySelector(".preview-content");
const editorTabs = document.querySelectorAll(".editor-tabs span");
const resetCodeButton = document.getElementById("reset-code");
const toggleHelpButton = document.getElementById("toggle-help");
const consoleOutput = document.getElementById("console-output");
const clearConsoleButton = document.getElementById("clear-console");
const codeErrors = document.getElementById("code-errors");

// Initial editor content (would be loaded from exercise data in real app)
const initialHtmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>Working with Lists</title>
</head>
<body>
    <h1>List Practice</h1>
    
    /* Your code here */
    
</body>
</html>`;

const initialCssContent = `/* Add your CSS styles here */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    padding: 20px;
}

h1 {
    color: #333;
}`;

// Editor state
const editorState = {
  currentTab: "html",
  htmlContent: initialHtmlContent,
  cssContent: initialCssContent,
  consoleHistory: [],
};

// Initialize editor
function initEditor() {
  // Set initial content
  if (htmlEditor) {
    htmlEditor.innerHTML = syntaxHighlight(initialHtmlContent, "html");
  }

  if (cssEditor) {
    cssEditor.innerHTML = syntaxHighlight(initialCssContent, "css");
  }

  // Add event listeners
  setupEditorEventListeners();

  // Simulate console output for demo
  logToConsole("Console ready. Code output will appear here.");
  logToConsole("Tip: Use console.log() to debug your JavaScript code.");
}

// Set up editor event listeners
function setupEditorEventListeners() {
  // Tab switching
  editorTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabType = this.textContent.toLowerCase();
      switchEditorTab(tabType);
    });
  });

  // Content editing (basic implementation)
  if (htmlEditor) {
    htmlEditor.addEventListener("input", function () {
      editorState.htmlContent = this.textContent;
      updatePreview();
    });
  }

  if (cssEditor) {
    cssEditor.addEventListener("input", function () {
      editorState.cssContent = this.textContent;
      updatePreview();
    });
  }

  // Reset code
  if (resetCodeButton) {
    resetCodeButton.addEventListener("click", resetEditorContent);
  }

  // Clear console
  if (clearConsoleButton) {
    clearConsoleButton.addEventListener("click", clearConsole);
  }
}

// Switch between editor tabs
function switchEditorTab(tabType) {
  // Update tab UI
  editorTabs.forEach((tab) => {
    tab.classList.remove("active");
    if (tab.textContent.toLowerCase() === tabType) {
      tab.classList.add("active");
    }
  });

  // Show appropriate editor or preview
  if (htmlEditor) htmlEditor.style.display = "none";
  if (cssEditor) cssEditor.style.display = "none";
  if (resultPreview) resultPreview.style.display = "none";

  switch (tabType) {
    case "html":
      if (htmlEditor) htmlEditor.style.display = "block";
      break;
    case "css":
      if (cssEditor) cssEditor.style.display = "block";
      break;
    case "result":
      if (resultPreview) resultPreview.style.display = "block";
      updatePreview();
      break;
  }

  editorState.currentTab = tabType;
}

// Update the preview pane
function updatePreview() {
  if (!resultPreview || !previewContent) return;

  try {
    // Basic HTML preview - in a real app, this would be more sophisticated
    // and would use a sandboxed iframe
    const htmlContent = editorState.htmlContent.replace(
      "/* Your code here */",
      ""
    ); // Remove placeholder

    previewContent.innerHTML = htmlContent;

    // Apply CSS (in a real app, this would be done properly with a style element)
    const styleElement = document.createElement("style");
    styleElement.textContent = editorState.cssContent;
    previewContent.appendChild(styleElement);

    // Clear any previous errors
    if (codeErrors) {
      codeErrors.style.display = "none";
      codeErrors.textContent = "";
    }
  } catch (error) {
    // Show error in the error display
    if (codeErrors) {
      codeErrors.style.display = "block";
      codeErrors.textContent = `Error: ${error.message}`;
    }

    // Log to console
    logToConsole(`Error: ${error.message}`, "error");
  }
}

// Reset editor content
function resetEditorContent() {
  editorState.htmlContent = initialHtmlContent;
  editorState.cssContent = initialCssContent;

  if (htmlEditor) {
    htmlEditor.innerHTML = syntaxHighlight(initialHtmlContent, "html");
  }

  if (cssEditor) {
    cssEditor.innerHTML = syntaxHighlight(initialCssContent, "css");
  }

  updatePreview();

  // Log to console
  logToConsole("Code has been reset to initial state.");
}

// Log to console
function logToConsole(message, type = "log") {
  if (!consoleOutput) return;

  const logItem = document.createElement("div");
  logItem.className = `console-${type}`;

  // Format the log item
  let formattedMessage = message;
  if (type === "error") {
    formattedMessage = `❌ ${message}`;
    logItem.style.color = "#E74C3C";
  } else if (type === "warn") {
    formattedMessage = `⚠️ ${message}`;
    logItem.style.color = "#F39C12";
  } else {
    formattedMessage = `> ${message}`;
  }

  logItem.textContent = formattedMessage;
  consoleOutput.appendChild(logItem);

  // Scroll to bottom
  consoleOutput.scrollTop = consoleOutput.scrollHeight;

  // Store in history
  editorState.consoleHistory.push({
    message: message,
    type: type,
    timestamp: new Date(),
  });
}

// Clear console
function clearConsole() {
  if (!consoleOutput) return;

  consoleOutput.innerHTML = "";
  logToConsole("Console cleared.");
}

// Basic syntax highlighting
function syntaxHighlight(code, language) {
  if (language === "html") {
    // Very simplified HTML highlighting for demo
    return code
      .replace(
        /(&lt;[\/]?[a-z]+(&gt;)?)/g,
        '<span class="highlight-tag">$1</span>'
      )
      .replace(/\/\*.*?\*\//g, '<span class="highlight-html">$&</span>');
  } else if (language === "css") {
    // Very simplified CSS highlighting for demo
    return code.replace(
      /\/\*.*?\*\//g,
      '<span class="highlight-css">$&</span>'
    );
  }

  return code;
}

// Initialize the editor when DOM is loaded
document.addEventListener("DOMContentLoaded", initEditor);
