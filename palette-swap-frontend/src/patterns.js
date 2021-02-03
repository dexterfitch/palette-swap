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
    let option = document.createElement("option")

    option.value = pattern.id
    option.text = pattern.name
    selectPatternDropdown.appendChild(option)
  }

  renderSelectedPattern = (selectedPatternId) => {
    let currentPattern = this.patterns[selectedPatternId]
    window.currentPalettes = currentPattern.palettes
    let selectedPatternStyle = this.renderStyle(currentPattern)

    palette.className = "palette"
    let patternPreview = document.createElement("div")
    patternPreview.className = "pattern-preview"
    patternPreview.setAttribute("style", selectedPatternStyle)

    clearThenAppend(patternBox, patternPreview)

    this.setColorPreviews(currentPattern)
    this.setColorValues(currentPattern)
    this.setColorSliders(currentPattern)
  }

  renderStyle = (selectedPattern, selectedPalette = 1) => {
    window.currentPalette = currentPalettes[selectedPalette - 1]

    let patternStyleRaw = selectedPattern.style

    let selectedPatternStyle = patternStyleRaw.replace(/COLOR1/g, currentPalette.color1).replace(/COLOR2/g, currentPalette.color2).replace(/COLOR3/g, currentPalette.color3)

    if(currentPalette.color3 === null) {
      color3Section.setAttribute("style", "opacity: 0.25; pointer-events: none;")
    } else {
      color3Section.setAttribute("style", "opacity: 1; pointer-events: auto;")
    }

    return selectedPatternStyle
  }

  getRGBValues = (selectedPattern, selectedPalette = 1) => {
    let color1valueString = currentPalette.color1
    let color2valueString = currentPalette.color2
    let color3valueString = currentPalette.color3

    window.color1RvalueInteger = color1valueString.split(",")[0]
    window.color1GvalueInteger = color1valueString.split(",")[1].replace(" ", "")
    window.color1BvalueInteger = color1valueString.split(",")[2].replace(" ", "")
    window.color2RvalueInteger = color2valueString.split(",")[0]
    window.color2GvalueInteger = color2valueString.split(",")[1].replace(" ", "")
    window.color2BvalueInteger = color2valueString.split(",")[2].replace(" ", "")
    if (!(color3valueString === null)) {
      window.color3RvalueInteger = color3valueString.split(",")[0]
      window.color3GvalueInteger = color3valueString.split(",")[1].replace(" ", "")
      window.color3BvalueInteger = color3valueString.split(",")[2].replace(" ", "")
    }

  }

  setColorPreviews = (selectedPattern) => {
    color1ColorPreview.setAttribute("style", `background-color: rgb(${currentPalette.color1});`)
    color2ColorPreview.setAttribute("style", `background-color: rgb(${currentPalette.color2});`)

    if (!(currentPalette.color3 === null)) {
      color3ColorPreview.setAttribute("style", `background-color: rgb(${currentPalette.color3});`)
    }
  }

  setColorValues = (selectedPattern) => {
    this.getRGBValues(selectedPattern)

    let paletteNameH3 = document.createElement("h3")
    let paletteNameText = document.createTextNode(`${currentPalette.name}`)
    paletteNameH3.appendChild(paletteNameText)
    clearThenAppend(paletteName, paletteNameH3)


    let color1RvalueText = document.createTextNode(`${color1RvalueInteger}`)
    let color1GvalueText = document.createTextNode(`${color1GvalueInteger}`)
    let color1BvalueText = document.createTextNode(`${color1BvalueInteger}`)
    let color2RvalueText = document.createTextNode(`${color2RvalueInteger}`)
    let color2GvalueText = document.createTextNode(`${color2GvalueInteger}`)
    let color2BvalueText = document.createTextNode(`${color2BvalueInteger}`)
    let color3RvalueText
    let color3GvalueText
    let color3BvalueText

    if (currentPalette.color3 === null) {
      color3RvalueText = document.createTextNode("...")
      color3GvalueText = document.createTextNode("...")
      color3BvalueText = document.createTextNode("...")
    } else {
      color3RvalueText = document.createTextNode(`${color3RvalueInteger}`)
      color3GvalueText = document.createTextNode(`${color3GvalueInteger}`)
      color3BvalueText = document.createTextNode(`${color3BvalueInteger}`)
    }

    clearThenAppend(paletteColor1Rvalue, color1RvalueText)
    clearThenAppend(paletteColor1Gvalue, color1GvalueText)
    clearThenAppend(paletteColor1Bvalue, color1BvalueText)
    clearThenAppend(paletteColor2Rvalue, color2RvalueText)
    clearThenAppend(paletteColor2Gvalue, color2GvalueText)
    clearThenAppend(paletteColor2Bvalue, color2BvalueText)
    clearThenAppend(paletteColor3Rvalue, color3RvalueText)
    clearThenAppend(paletteColor3Gvalue, color3GvalueText)
    clearThenAppend(paletteColor3Bvalue, color3BvalueText)
  }

  setColorSliders = (selectedPattern) => {
    this.getRGBValues(selectedPattern)

    color1Rslider.value = color1RvalueInteger
    color1Gslider.value = color1GvalueInteger
    color1Bslider.value = color1BvalueInteger
    color2Rslider.value = color2RvalueInteger
    color2Gslider.value = color2GvalueInteger
    color2Bslider.value = color2BvalueInteger
    if (!(currentPalette.color3 === null)) {
      color3Rslider.value = color3RvalueInteger
      color3Gslider.value = color3GvalueInteger
      color3Bslider.value = color3BvalueInteger
    }
  }

  updateColorValues = () => {

  }

}