const BASE_URL = "http://localhost:3000"
const PATTERNS_URL = `${BASE_URL}/patterns`

const patternsDropdown = document.getElementById("patterns-dropdown")
const patternBox = document.getElementById("pattern-box")
const paletteBox = document.getElementById("palette-box")

window.onload = function() {
  const patternStart = new Patterns()
  const paletteStart = new Palette()
  
  patternStart.getPatterns()

  patternsDropdown.addEventListener("mouseup", e => {
    if (!(patternsDropdown.value === "")) {
      let selectedPattern = patternsDropdown.value - 1
      patternStart.renderSelectedPattern(selectedPattern)
    }
  })
}

clearThenAppend = (sectionBeingCleared, newSectionData) => {
  while(sectionBeingCleared.firstChild) {
    sectionBeingCleared.removeChild(sectionBeingCleared.firstChild)
  }
  sectionBeingCleared.appendChild(newSectionData)
}