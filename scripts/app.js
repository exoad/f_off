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
        chatElement.addEventListener("DOMSubtreeModified", () => {
          var childrenCount = 0;
          let chatElementChildren = chatElement.children;
          for (var i = 0; i < chatElementChildren.length; i++) {
            if (
              chatElementChildren[i].className.equals ===
              constants["html-chat-element-blocked-message-classname"]
            ) {
              childrenCount++;
            }
          }
          logThings(
            "EVENT",
            "DOMSubtreeModified -> Found " + childrenCount + " blocked messages"
          );
        });
      }
    } else {
      logThings("FAILED", "Loaded constants.json from GitHub but it's invalid");
    }
  });
});
