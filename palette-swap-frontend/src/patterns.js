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

    while(patternBox.firstChild) {
      patternBox.removeChild(patternBox.firstChild)
    }
    patternBox.appendChild(patternPreview)

    this.setSelectedPatternDefaultColorPreviews(selectedPattern)
    this.setSelectedPatternDefaultStyleColorValues(selectedPattern)
  }

  getSelectedPatternDefaultPalette = (selectedPattern) => {
    return selectedPattern.palettes[0]
  }

  setSelectedPatternDefaultStyle = (selectedPattern) => {
    let defaultPalette = this.getSelectedPatternDefaultPalette(selectedPattern)
    let patternStyleRaw = selectedPattern.style
    let selectedPatternStyle = patternStyleRaw.replace(/COLOR1/g, defaultPalette.color1).replace(/COLOR2/g, defaultPalette.color2).replace(/COLOR3/g, defaultPalette.color3)
    return selectedPatternStyle
  }

  setSelectedPatternDefaultColorPreviews = (selectedPattern) => {
    let defaultPalette = this.getSelectedPatternDefaultPalette(selectedPattern)

    let color1ColorPreview = document.getElementById("color1-color-preview")
    let color2ColorPreview = document.getElementById("color2-color-preview")
    let color3ColorPreview = document.getElementById("color3-color-preview")

    color1ColorPreview.setAttribute("style", `background-color: rgb(${defaultPalette.color1});`)
    color2ColorPreview.setAttribute("style", `background-color: rgb(${defaultPalette.color2});`)
    color3ColorPreview.setAttribute("style", `background-color: rgb(${defaultPalette.color3});`)
  }

  setSelectedPatternDefaultStyleColorValues = (selectedPattern) => {
    let selectedPatternPalette = selectedPattern.palettes[0]

    let paletteName = document.getElementById("palette-name")
    let paletteNameH3 = document.createElement("h3")
    let paletteNameText = document.createTextNode(`${selectedPatternPalette.name}`)

    let paletteColor1Preview = document.getElementById("color1-color-preview")
    let paletteColor1Rslider = document.getElementById("color1-r")
    let paletteColor1Rvalue = document.getElementById("color1-r-value")
    let paletteColor1Gslider = document.getElementById("color1-g")
    let paletteColor1Gvalue = document.getElementById("color1-g-value")
    let paletteColor1Bslider = document.getElementById("color1-b")
    let paletteColor1Bvalue = document.getElementById("color1-b-value")

    let paletteColor2Preview = document.getElementById("color2-color-preview")
    let paletteColor2Rslider = document.getElementById("color2-r")
    let paletteColor2Rvalue = document.getElementById("color2-r-value")
    let paletteColor2Gslider = document.getElementById("color2-g")
    let paletteColor2Gvalue = document.getElementById("color2-g-value")
    let paletteColor2Bslider = document.getElementById("color2-b")
    let paletteColor2Bvalue = document.getElementById("color2-b-value")

    let paletteColor3Preview = document.getElementById("color3-color-preview")
    let paletteColor3Rslider = document.getElementById("color3-r")
    let paletteColor3Rvalue = document.getElementById("color3-r-value")
    let paletteColor3Gslider = document.getElementById("color3-g")
    let paletteColor3Gvalue = document.getElementById("color3-g-value")
    let paletteColor3Bslider = document.getElementById("color3-b")
    let paletteColor3Bvalue = document.getElementById("color3-b-value")

    while(paletteName.firstChild) {
      paletteName.removeChild(paletteName.firstChild)
    }
    paletteNameH3.appendChild(paletteNameText)
    paletteName.appendChild(paletteNameH3)

    let color1ValueString = selectedPatternPalette.color1
    let color1RValueText = document.createTextNode(`${color1ValueString.split(",")[0]}`)
    while(paletteColor1Rvalue.firstChild) {
      paletteColor1Rvalue.removeChild(paletteColor1Rvalue.firstChild)
    }
    paletteColor1Rvalue.appendChild(color1RValueText)
    let color1GValueText = document.createTextNode(`${color1ValueString.split(",")[1].replace(" ", "")}`)
    while(paletteColor1Gvalue.firstChild) {
      paletteColor1Gvalue.removeChild(paletteColor1Gvalue.firstChild)
    }
    paletteColor1Gvalue.appendChild(color1GValueText)
    let color1BValueText = document.createTextNode(`${color1ValueString[4]}`)
    while(paletteColor1Bvalue.firstChild) {
      paletteColor1Bvalue.removeChild(paletteColor1Bvalue.firstChild)
    }
    paletteColor1Bvalue.appendChild(color1BValueText)

    let color2ValueString = selectedPatternPalette.color2
    let color2RValueText = document.createTextNode(`${color2ValueString.split(",")[0]}`)
    while(paletteColor2Rvalue.firstChild) {
      paletteColor2Rvalue.removeChild(paletteColor2Rvalue.firstChild)
    }
    paletteColor2Rvalue.appendChild(color2RValueText)
    let color2GValueText = document.createTextNode(`${color2ValueString.split(",")[1].replace(" ", "")}`)
    while(paletteColor2Gvalue.firstChild) {
      paletteColor2Gvalue.removeChild(paletteColor2Gvalue.firstChild)
    }
    paletteColor2Gvalue.appendChild(color2GValueText)
    let color2BValueText = document.createTextNode(`${color2ValueString.split(",")[2].replace(" ", "")}`)
    while(paletteColor2Bvalue.firstChild) {
      paletteColor2Bvalue.removeChild(paletteColor2Bvalue.firstChild)
    }
    paletteColor2Bvalue.appendChild(color2BValueText)

    let color3ValueString = selectedPatternPalette.color3
    let color3RValueText = document.createTextNode(`${color3ValueString.split(",")[0]}`)
    while(paletteColor3Rvalue.firstChild) {
      paletteColor3Rvalue.removeChild(paletteColor3Rvalue.firstChild)
    }
    paletteColor3Rvalue.appendChild(color3RValueText)
    let color3GValueText = document.createTextNode(`${color3ValueString.split(",")[1].replace(" ", "")}`)
    while(paletteColor3Gvalue.firstChild) {
      paletteColor3Gvalue.removeChild(paletteColor3Gvalue.firstChild)
    }
    paletteColor3Gvalue.appendChild(color3GValueText)
    let color3BValueText = document.createTextNode(`${color3ValueString.split(",")[2].replace(" ", "")}`)
    while(paletteColor3Bvalue.firstChild) {
      paletteColor3Bvalue.removeChild(paletteColor3Bvalue.firstChild)
    }
    paletteColor3Bvalue.appendChild(color3BValueText)

  }
}