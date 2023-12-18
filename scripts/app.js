/*
Copyright (c) 2023, Jack Meng (exoad) All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
   1. Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.
   2. Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in
      the documentation and/or other materials provided with the
      distribution.
   3. All advertising materials mentioning features or use of this software
      must display the following acknowledgment: This product includes
      software developed by Jack Meng (exoad).
   4. Neither the name of Jack Meng (exoad) nor the names of its
      contributors may be used to endorse or promote products derived
      from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY JACK MENG (EXOAD) AS IS AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS FOR A PARTICULAR PURPOSE IS DISCLAIMED. IN NO EVENT SHALL
JACK MENG (EXOAD) BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const HEADER = "color:#ff2667;font-size:48px;font-weight:bold";
const SUBHEADER = "color:#17ff6c;font-size:24px;font-weight:bold";
const CONTENT = "color:#fab916;font-size:16px;font-weight:bold";

/**
 * Defacto logger
 * @param {string} context
 * @param {string} message
 */
function logThings(context, message) {
  console.log(
    "%c[F_Off]" + `%c${context}` + `\n%c${message}`,
    HEADER,
    SUBHEADER,
    CONTENT
  );
}

logThings("Arming", "Warming up the extension...");
var timeNow = Date.now();

fetch(
  "https://raw.githubusercontent.com/exoad/f_off/main/api/constants.json"
).then((res) => {
  res.json().then((constants) => {
    logThings("Armed", "Ok done. Took: " + (Date.now() - timeNow) + "ms");
    if (constants["html-chat-element-classname"] !== undefined) {
      logThings(
        "API",
        "VALID constants.json from GitHub with:\n" + JSON.stringify(constants)
      );
      let chatElement = document.getElementsByClassName(
        constants["html-chat-element-classname"]
      )[0];
      if (chatElement !== undefined) {
        logThings(
          "SUCCESS",
          "Found chat element: " + chatElement.classList.length + " classes"
        );
        const handleMutations = (mutationsList) => {
          var childrenCount = 0;

          for (const mutation of mutationsList) {
            if (mutation.type === "childList") {
              for (const node of mutation.addedNodes) {
                if (
                  node.nodeType === 1 &&
                  node.classList.contains(
                    constants["html-chat-element-blocked-message-classname"]
                  )
                ) {
                  node.remove();
                  childrenCount++;
                }
              }
            }
          }
          logThings(
            "EVENT",
            "MutationObserver -> Found " +
              childrenCount +
              " blocked message groups"
          );
        };
        const observer = new MutationObserver(handleMutations);
        const observerConfig = {
          childList: true,
          subtree: true,
        };
        observer.observe(chatElement, observerConfig);
      }
    } else {
      logThings(
        "FAILED",
        "Loaded constants.json from GitHub but it's invalid"
      );
    }
  });
});
