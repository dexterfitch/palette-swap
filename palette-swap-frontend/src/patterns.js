class Patterns {

  constructor(name, style) {
    this.name = name;
    this.style = style;
    this.patterns = [];
  }

  getPatterns = () => {
    fetch(PATTERNS_URL)
    .then(response => response.json())
    .then(patterns => this.renderPatterns(patterns))
  }

  renderPatterns = (patterns) => {
    patterns.data.forEach(pattern => {
      this.patterns.push(pattern.attributes)
    })
    this.patterns.forEach(pattern => {
      this.renderPatternDropdown(pattern)
    })
  }

  renderPatternDropdown = (pattern) => {
    let select = document.getElementById("patterns-dropdown")
    let option = document.createElement("option")

    option.value = pattern.id
    option.text = pattern.name
    select.appendChild(option)
  }

  renderSelectedPattern = (selectedPatternId) => {
    let selectedPattern = this.patterns[selectedPatternId]
    let activePatternStyle = this.setSelectedPatternDefaultStyle(selectedPattern)

    let patternPreview = document.createElement("div")
    patternPreview.className = "pattern-preview"
    patternPreview.setAttribute("style", activePatternStyle)

    while(patternBox.firstChild) {
      patternBox.removeChild(patternBox.firstChild)
    }
    patternBox.appendChild(patternPreview)
  }

  setSelectedPatternDefaultStyle = (selectedPattern) => {
    let defaultPalette = selectedPattern.palettes[0]
    let patternStyleRaw = selectedPattern.style
    let activePatternStyle = patternStyleRaw.replace(/COLOR1/g, defaultPalette.color1).replace(/COLOR2/g, defaultPalette.color2).replace(/COLOR3/g, defaultPalette.color3)
    return activePatternStyle
  }
  
}