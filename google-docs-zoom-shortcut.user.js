// ==UserScript==
// @name         Google Docs Zoom Shortcut
// @namespace    https://docs.google.com/
// @version      1.0.0
// @description  Lets you zoom with Ctrl + Mouse Wheel on Google Docs and Google Sheets
// @author       Lucas Bürgy
// @match        https://docs.google.com/document/*
// @match        https://docs.google.com/spreadsheets/*
// @icon         https://www.google.com/favicon.ico
// @grant        none
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
    console.log('Zoom input not found');
    return;
  }

  const sanitizedValue = Number(input.value.replace(/%/, ""));
  const newValue = sanitizedValue + delta;
  input.value = (newValue < 0 ? 0 : newValue) + '%';

  await input.focus();

  // Don't work for now sadly, you have to manually press enter :(
  input.dispatchEvent(new KeyboardEvent('keydown', {
    key: "Enter",
    keyCode: 13,
    code: "Enter",
    which: 13,
    altKey: false,
    shiftKey: false,
    ctrlKey: false,
    metaKey: false,
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

  console.log('Zoom listener added');
})();
