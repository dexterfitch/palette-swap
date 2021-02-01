const BASE_URL = "http://localhost:3000"
const PATTERNS_URL = `${BASE_URL}/patterns`

const patternsDropdown = document.getElementById("patterns-dropdown")
const patternBox = document.getElementById("pattern-box")
const paletteBox = document.getElementById("palette-box")

window.onload = function() {
  const start = new Patterns()
  start.getPatterns()
  
  patternsDropdown.addEventListener("mouseup", e => {
    let selectedPattern = patternsDropdown.value
    start.renderSelectedPattern(selectedPattern)
  })
}
