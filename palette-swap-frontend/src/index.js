const BASE_URL = "http://localhost:3000"
const PATTERNS_URL = `${BASE_URL}/patterns`

const patternSelect = document.getElementById("pattern-select")
const patternBox = document.getElementById("pattern-box")
const paletteBox = document.getElementById("palette-box")

window.onload = function() {
  let start = new Patterns();
  start.getPatterns();
};
