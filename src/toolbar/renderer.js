// ── Session state ──
let sessionPrompts = [];

// ── DOM elements ──
const artistInput = document.getElementById('artist');
const toolSelect = document.getElementById('tool');
const toolCustom = document.getElementById('tool-custom');
const promptArea = document.getElementById('prompt');
const logBtn = document.getElementById('log-btn');
const exportBtn = document.getElementById('export-btn');
const counterEl = document.getElementById('counter');
const feedbackEl = document.getElementById('feedback');
const urlBar = document.getElementById('url-bar');
const backBtn = document.getElementById('back-btn');
const forwardBtn = document.getElementById('forward-btn');

// ── Persist artist name in localStorage ──
artistInput.value = localStorage.getItem('promptkeeper-artist') || '';
artistInput.addEventListener('input', () => {
  localStorage.setItem('promptkeeper-artist', artistInput.value);
});

// ── Tool dropdown: show custom input when "Other" selected ──
toolSelect.addEventListener('change', () => {
  if (toolSelect.value === 'Other') {
    toolCustom.classList.remove('hidden');
    toolCustom.focus();
  } else {
    toolCustom.classList.add('hidden');
  }
});

// ── Get the effective tool name ──
function getToolName() {
  if (toolSelect.value === 'Other') {
    return toolCustom.value.trim() || 'Other';
  }
  return toolSelect.value;
}

// ── URL bar navigation ──
urlBar.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const url = urlBar.value.trim();
    if (url) window.promptKeeper.navigateBrowser(url);
  }
});

backBtn.addEventListener('click', () => window.promptKeeper.browserBack());
forwardBtn.addEventListener('click', () => window.promptKeeper.browserForward());

// Update URL bar when browser navigates
window.promptKeeper.onUrlChanged((url) => {
  urlBar.value = url;
});

// ── Feedback display ──
let feedbackTimeout;
function showFeedback(message) {
  feedbackEl.textContent = message;
  feedbackEl.classList.remove('hidden');
  clearTimeout(feedbackTimeout);
  feedbackTimeout = setTimeout(() => {
    feedbackEl.classList.add('hidden');
  }, 2000);
}

// ── Validation shake ──
function shakeElement(el) {
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 400);
}

// ── Update prompt counter ──
function updateCounter() {
  const count = sessionPrompts.length;
  counterEl.textContent = `Session: ${count} prompt${count !== 1 ? 's' : ''} logged`;
  exportBtn.disabled = count === 0;
}

// ── Log & Copy ──
logBtn.addEventListener('click', async () => {
  const artist = artistInput.value.trim();
  const prompt = promptArea.value.trim();

  if (!artist) {
    shakeElement(artistInput);
    artistInput.focus();
    return;
  }
  if (!prompt) {
    shakeElement(promptArea);
    promptArea.focus();
    return;
  }

  const entry = {
    artist,
    tool: getToolName(),
    prompt,
    timestamp: new Date().toLocaleString(),
  };

  sessionPrompts.push(entry);
  updateCounter();

  await window.promptKeeper.copyToClipboard(prompt);

  promptArea.value = '';
  promptArea.focus();
  showFeedback('Copied to clipboard!');
});

// Enter = Log & Copy, Cmd/Ctrl+Enter = new line
promptArea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.metaKey && !e.ctrlKey) {
    e.preventDefault();
    logBtn.click();
  }
  // Cmd+Enter (Mac) or Ctrl+Enter (Windows) inserts a new line
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    const start = promptArea.selectionStart;
    const end = promptArea.selectionEnd;
    promptArea.value = promptArea.value.substring(0, start) + '\n' + promptArea.value.substring(end);
    promptArea.selectionStart = promptArea.selectionEnd = start + 1;
  }
});

// ── Export to PDF ──
exportBtn.addEventListener('click', async () => {
  if (sessionPrompts.length === 0) {
    showFeedback('No prompts to export');
    return;
  }

  showFeedback('Generating PDF...');

  try {
    const result = await window.promptKeeper.exportPdf(sessionPrompts);
    if (result.saved) {
      showFeedback('PDF exported!');
    }
  } catch (err) {
    showFeedback('Export failed: ' + err.message);
  }
});

// ── Initial state ──
updateCounter();
