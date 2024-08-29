// ==UserScript==
// @name         Google Docs Zoom Shortcut
// @version      1.0.2
// @description  Lets you zoom with Ctrl + Mouse Wheel on Google Docs and Google Sheets
// @author       Lucas Bürgy
// @match        https://docs.google.com/document/*
// @match        https://docs.google.com/spreadsheets/*
// @icon         https://www.google.com/favicon.ico
// ==/UserScript==

const ZOOM_DELTA = 10;
const INPUT_SELECTOR = [
  "#t-zoom input.goog-toolbar-combo-button-input",
  "#zoomSelect input.goog-toolbar-combo-button-input",
];

async function changeZoom(delta) {
  var input = null;
  for (let i = 0; input === null && i < INPUT_SELECTOR.length; i++) {
    input = document.querySelector(INPUT_SELECTOR[i]);
  }
  if (input === null) {
    console.error('Zoom input not found');
    return;
  }

  const sanitizedValue = Number(input.value.replace(/%/, ""));
  const newValue = sanitizedValue + delta;
  input.value = (newValue < 0 ? 0 : newValue) + '%';

  await input.focus();

  input.dispatchEvent( new KeyboardEvent('keypress', {
    keyCode: 13,
  }));
}

(function () {
  window.addEventListener("wheel", function (event) {
    if (event.ctrlKey) {
      event.preventDefault();
      if (event.deltaY < 0) {
        changeZoom(ZOOM_DELTA);
      } else {
        changeZoom(-ZOOM_DELTA);
      }
    }
  }, { passive: false });
})();
