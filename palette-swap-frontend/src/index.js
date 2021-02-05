const BASE_URL = "http://localhost:3000"
const PATTERNS_URL = `${BASE_URL}/patterns`
const PALETTES_URL = `${BASE_URL}/palettes`

window.onload = function() {
  window.patternStart = new Patterns()
  window.paletteStart = new Palette()
  
  patternStart.getPatterns()
  paletteStart.getPalettes()

  selectPatternDropdown.addEventListener("mouseup", e => {
    if (!(selectPatternDropdown.value === "")) {
      let selectedPattern = selectPatternDropdown.value
      patternStart.renderSelectedPattern(selectedPattern - 1)
      paletteStart.filterPalettes(selectedPattern)
      paletteCSSBox.className = "hidden"
    }
  })
}

clearThenAppend = (sectionBeingCleared, newSectionData) => {
  while(sectionBeingCleared.firstChild) {
    sectionBeingCleared.removeChild(sectionBeingCleared.firstChild)
  }
  sectionBeingCleared.appendChild(newSectionData)
}