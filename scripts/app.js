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

function readFile(_path, _cb) {
  fetch(_path, { mode: "same-origin" })
    .then(function (_res) {
      return _res.blob();
    })

    .then(function (_blob) {
      var reader = new FileReader();

      reader.addEventListener("loadend", function () {
        _cb(this.result);
      });

      reader.readAsText(_blob);
    });
}

logThings("Arming", "Warming up the extension...");
var timeNow = Date.now();

readFile("constants.json", (res) => {
  let chatElement = document.getElementsByClassName(
    res["html-chat-element-classname"]
  )[0];
  logThings("Armed", "Ok done. Took: " + (Date.now() - timeNow) + "ms");
});
