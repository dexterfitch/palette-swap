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
    let selectedPatternStyle = this.setSelectedPatternDefaultStyle(selectedPattern)

    let patternPreview = document.createElement("div")
    patternPreview.className = "pattern-preview"
    patternPreview.setAttribute("style", selectedPatternStyle)

    clearThenAppend(patternBox, patternPreview)

    this.setSelectedPatternDefaultColorPreviews(selectedPattern)
    this.setSelectedPatternDefaultStyleColorValues(selectedPattern)
    this.setSelectedPatternDefaultStyleColorSliders(selectedPattern)
  }

  getSelectedPatternDefaultPalette = (selectedPattern) => {
    return selectedPattern.palettes[0]
  }

  getSelectedPatternDefaultPaletteRGBValues = (selectedPattern) => {
    let defaultPalette = this.getSelectedPatternDefaultPalette(selectedPattern)

    let color1ValueString = defaultPalette.color1
    let color2ValueString = defaultPalette.color2
    let color3ValueString = defaultPalette.color3

    window.color1RvalueInteger = color1ValueString.split(",")[0]
    window.color1GvalueInteger = color1ValueString.split(",")[1].replace(" ", "")
    window.color1BvalueInteger = color1ValueString.split(",")[2].replace(" ", "")
    window.color2RvalueInteger = color2ValueString.split(",")[0]
    window.color2GvalueInteger = color2ValueString.split(",")[1].replace(" ", "")
    window.color2BvalueInteger = color2ValueString.split(",")[2].replace(" ", "")
    if (color3ValueString === null) {
      window.color3RvalueInteger = null
    } else {
      window.color3RvalueInteger = color3ValueString.split(",")[0]
      window.color3GvalueInteger = color3ValueString.split(",")[1].replace(" ", "")
      window.color3BvalueInteger = color3ValueString.split(",")[2].replace(" ", "")
    }

  }

  setSelectedPatternDefaultStyle = (selectedPattern) => {
    let defaultPalette = this.getSelectedPatternDefaultPalette(selectedPattern)
    let patternStyleRaw = selectedPattern.style
    let selectedPatternStyle = patternStyleRaw.replace(/COLOR1/g, defaultPalette.color1).replace(/COLOR2/g, defaultPalette.color2).replace(/COLOR3/g, defaultPalette.color3)

    let color3Section = document.getElementById("palette-color3")

    if(defaultPalette.color3 === null) {
      color3Section.setAttribute("style", "opacity: 0.25; pointer-events: none;")
    } else {
      color3Section.setAttribute("style", "opacity: 1; pointer-events: auto;")
    }

    return selectedPatternStyle
  }

  setSelectedPatternDefaultColorPreviews = (selectedPattern) => {
    let defaultPalette = this.getSelectedPatternDefaultPalette(selectedPattern)

    let color1ColorPreview = document.getElementById("color1-color-preview")
    let color2ColorPreview = document.getElementById("color2-color-preview")
    let color3ColorPreview = document.getElementById("color3-color-preview")

    color1ColorPreview.setAttribute("style", `background-color: rgb(${defaultPalette.color1});`)
    color2ColorPreview.setAttribute("style", `background-color: rgb(${defaultPalette.color2});`)

    if (!(defaultPalette.color3 === null)) {
      color3ColorPreview.setAttribute("style", `background-color: rgb(${defaultPalette.color3});`)
    }
  }

  setSelectedPatternDefaultStyleColorValues = (selectedPattern) => {
    this.getSelectedPatternDefaultPaletteRGBValues(selectedPattern)
    let defaultPalette = this.getSelectedPatternDefaultPalette(selectedPattern)

    let paletteName = document.getElementById("palette-name")
    let paletteNameH3 = document.createElement("h3")
    let paletteNameText = document.createTextNode(`${defaultPalette.name}`)

    while(paletteName.firstChild) {
      paletteName.removeChild(paletteName.firstChild)
    }
    paletteNameH3.appendChild(paletteNameText)
    paletteName.appendChild(paletteNameH3)

    let paletteColor1Rvalue = document.getElementById("color1-r-value")
    let paletteColor1Gvalue = document.getElementById("color1-g-value")
    let paletteColor1Bvalue = document.getElementById("color1-b-value")
    let paletteColor2Rvalue = document.getElementById("color2-r-value")
    let paletteColor2Gvalue = document.getElementById("color2-g-value")
    let paletteColor2Bvalue = document.getElementById("color2-b-value")
    let paletteColor3Rvalue = document.getElementById("color3-r-value")
    let paletteColor3Gvalue = document.getElementById("color3-g-value")
    let paletteColor3Bvalue = document.getElementById("color3-b-value")

    let color1RvalueText = document.createTextNode(`${color1RvalueInteger}`)
    let color1GvalueText = document.createTextNode(`${color1GvalueInteger}`)
    let color1BvalueText = document.createTextNode(`${color1BvalueInteger}`)
    let color2RvalueText = document.createTextNode(`${color2RvalueInteger}`)
    let color2GvalueText = document.createTextNode(`${color2GvalueInteger}`)
    let color2BvalueText = document.createTextNode(`${color2BvalueInteger}`)
    let color3RvalueText = ""
    let color3GvalueText = ""
    let color3BvalueText = ""

    if (color3RvalueInteger === null) {
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

  setSelectedPatternDefaultStyleColorSliders = (selectedPattern) => {
    this.getSelectedPatternDefaultPaletteRGBValues(selectedPattern)

    let color1Rslider = document.getElementById("color1-r")
    let color1Gslider = document.getElementById("color1-g")
    let color1Bslider = document.getElementById("color1-b")
    let color2Rslider = document.getElementById("color2-r")
    let color2Gslider = document.getElementById("color2-g")
    let color2Bslider = document.getElementById("color2-b")
    let color3Rslider = document.getElementById("color3-r")
    let color3Gslider = document.getElementById("color3-g")
    let color3Bslider = document.getElementById("color3-b")

    color1Rslider.value = color1RvalueInteger
    color1Rslider.value = color1RvalueInteger
    color1Rslider.value = color1RvalueInteger
    color2Rslider.value = color2RvalueInteger
    color2Gslider.value = color2GvalueInteger
    color2Bslider.value = color2BvalueInteger
    if (!(color3RvalueInteger === null)) {
      color3Rslider.value = color3RvalueInteger
      color3Gslider.value = color3GvalueInteger
      color3Bslider.value = color3BvalueInteger
    }
  }

}