/**
 * @fileoverview This file contains the code for the popup window.
 */

function reloadButton() {
  console.log("[F_Off Daemon] Reloading app.js");
  browser.tabs
    .executeScript({ file: "/scripts/app.js" })
    .then(() => {
      console.log("Injected app.js");
    })
    .catch(() => {
      console.log("Failed to inject app.js");
    });
}
