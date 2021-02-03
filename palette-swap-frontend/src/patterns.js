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
    let selectedPattern = this.patterns[selectedPatternId]
    let selectedPatternStyle = this.setSelectedPatternDefaultStyle(selectedPattern)

    let patternPreview = document.createElement("div")
    patternPreview.className = "pattern-preview"
    patternPreview.setAttribute("style", selectedPatternStyle)

    clearThenAppend(patternBox, patternPreview)

    this.setSelectedPatternDefaultColorPreviews(selectedPattern)
    this.setSelectedPatternDefaultStyleColorValues(selectedPattern)
    this.setSelectedPatternDefaultStyleColorSliders(selectedPattern)
  }

  setSelectedPatternDefaultPaletteRGBValues = (selectedPattern) => {
    let color1defaultValueString = defaultPalette.color1
    let color2defaultValueString = defaultPalette.color2
    let color3defaultValueString = defaultPalette.color3

    window.color1RdefaultValueInteger = color1defaultValueString.split(",")[0]
    window.color1GdefaultValueInteger = color1defaultValueString.split(",")[1].replace(" ", "")
    window.color1BdefaultValueInteger = color1defaultValueString.split(",")[2].replace(" ", "")
    window.color2RdefaultValueInteger = color2defaultValueString.split(",")[0]
    window.color2GdefaultValueInteger = color2defaultValueString.split(",")[1].replace(" ", "")
    window.color2BdefaultValueInteger = color2defaultValueString.split(",")[2].replace(" ", "")
    if (!(color3defaultValueString === null)) {
      window.color3RdefaultValueInteger = color3defaultValueString.split(",")[0]
      window.color3GdefaultValueInteger = color3defaultValueString.split(",")[1].replace(" ", "")
      window.color3BdefaultValueInteger = color3defaultValueString.split(",")[2].replace(" ", "")
    }

  }

  setSelectedPatternDefaultStyle = (selectedPattern) => {
    window.defaultPalette = selectedPattern.palettes[0]

    let patternStyleRaw = selectedPattern.style
    let selectedPatternStyle = patternStyleRaw.replace(/COLOR1/g, defaultPalette.color1).replace(/COLOR2/g, defaultPalette.color2).replace(/COLOR3/g, defaultPalette.color3)


    if(defaultPalette.color3 === null) {
      color3Section.setAttribute("style", "opacity: 0.25; pointer-events: none;")
    } else {
      color3Section.setAttribute("style", "opacity: 1; pointer-events: auto;")
    }

    return selectedPatternStyle
  }

  setSelectedPatternDefaultColorPreviews = (selectedPattern) => {

    color1ColorPreview.setAttribute("style", `background-color: rgb(${defaultPalette.color1});`)
    color2ColorPreview.setAttribute("style", `background-color: rgb(${defaultPalette.color2});`)

    if (!(defaultPalette.color3 === null)) {
      color3ColorPreview.setAttribute("style", `background-color: rgb(${defaultPalette.color3});`)
    }
  }

  setSelectedPatternDefaultStyleColorValues = (selectedPattern) => {
    this.setSelectedPatternDefaultPaletteRGBValues(selectedPattern)

    let paletteNameH3 = document.createElement("h3")
    let paletteNameText = document.createTextNode(`${defaultPalette.name}`)
    paletteNameH3.appendChild(paletteNameText)
    clearThenAppend(paletteName, paletteNameH3)


    let color1RvalueText = document.createTextNode(`${color1RdefaultValueInteger}`)
    let color1GvalueText = document.createTextNode(`${color1GdefaultValueInteger}`)
    let color1BvalueText = document.createTextNode(`${color1BdefaultValueInteger}`)
    let color2RvalueText = document.createTextNode(`${color2RdefaultValueInteger}`)
    let color2GvalueText = document.createTextNode(`${color2GdefaultValueInteger}`)
    let color2BvalueText = document.createTextNode(`${color2BdefaultValueInteger}`)
    let color3RvalueText = ""
    let color3GvalueText = ""
    let color3BvalueText = ""

    if (defaultPalette.color3 === null) {
      color3RvalueText = document.createTextNode("...")
      color3GvalueText = document.createTextNode("...")
      color3BvalueText = document.createTextNode("...")
    } else {
      color3RvalueText = document.createTextNode(`${color3RdefaultValueInteger}`)
      color3GvalueText = document.createTextNode(`${color3GdefaultValueInteger}`)
      color3BvalueText = document.createTextNode(`${color3BdefaultValueInteger}`)
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

  setSelectedPatternDefaultStyleColorSliders = (selectedPattern) => {
    this.setSelectedPatternDefaultPaletteRGBValues(selectedPattern)

    color1Rslider.value = color1RdefaultValueInteger
    color1Rslider.value = color1RdefaultValueInteger
    color1Rslider.value = color1RdefaultValueInteger
    color2Rslider.value = color2RdefaultValueInteger
    color2Gslider.value = color2GdefaultValueInteger
    color2Bslider.value = color2BdefaultValueInteger
    if (!(defaultPalette.color3 === null)) {
      color3Rslider.value = color3RdefaultValueInteger
      color3Gslider.value = color3GdefaultValueInteger
      color3Bslider.value = color3BdefaultValueInteger
    }
  }

  updatePatternStyleColorValues = () => {

  }

}