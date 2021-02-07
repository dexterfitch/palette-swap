class Patterns {

  constructor(name, style) {
    this.name = name;
    this.style = style;
    this.palettes = [];
    this.patterns = [];
  }

  getPatterns = () => {
    fetch(PATTERNS_URL)
    .then(response => response.json())
    .then(patterns => this.renderPatterns(patterns))
  }

  renderPatterns = (patterns) => {
    patterns.data.forEach(pattern => {
      Object.defineProperty(pattern.attributes, 'palettes', {
        value: pattern.relationships.palettes.data
      })

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
    let currentPalettes = currentPattern.palettes
    let selectedPatternStyle = this.renderStyle(currentPattern, currentPattern.palettes[0].id)

    palette.className = "palette"
    let patternPreview = document.createElement("div")
    patternPreview.className = "pattern-preview"
    patternPreview.setAttribute("style", selectedPatternStyle)

    clearThenAppend(patternBox, patternPreview)

    this.getRGBValues(currentPattern, currentPattern.palettes[0].id)
    this.createCurrentStyleTextNode(selectedPatternStyle)
    this.generateStyleButton()
  }

  renderStyle = (selectedPattern, selectedPaletteID) => {
    let allPalettes = paletteStart.palettes
    let currentPalette = allPalettes.find(pal => pal.id == selectedPaletteID).attributes
    let patternStyleRaw = selectedPattern.style
    let selectedPatternStyle = patternStyleRaw.replace(/COLOR1/g, currentPalette.color1).replace(/COLOR2/g, currentPalette.color2).replace(/COLOR3/g, currentPalette.color3)

    if(currentPalette.color3 === null) {
      color3Section.setAttribute("style", "opacity: 0.25; pointer-events: none;")
    } else {
      color3Section.setAttribute("style", "opacity: 1; pointer-events: auto;")
    }

    return selectedPatternStyle
  }

  getRGBValues = (selectedPattern, selectedPaletteID) => {
    let allPalettes = paletteStart.palettes
    let currentPalette = allPalettes[selectedPaletteID - 1].attributes
    let color1valueString = currentPalette.color1
    let color2valueString = currentPalette.color2
    let color3valueString = currentPalette.color3

    window.color1RvalueInteger = color1valueString.split(",")[0]
    window.color1GvalueInteger = color1valueString.split(",")[1].replace(" ", "")
    window.color1BvalueInteger = color1valueString.split(",")[2].replace(" ", "")
    window.color2RvalueInteger = color2valueString.split(",")[0]
    window.color2GvalueInteger = color2valueString.split(",")[1].replace(" ", "")
    window.color2BvalueInteger = color2valueString.split(",")[2].replace(" ", "")
    if (color3valueString === null) {
      window.color3RvalueInteger = null
      window.color3GvalueInteger = null
      window.color3BvalueInteger = null
    } else {
      window.color3RvalueInteger = color3valueString.split(",")[0]
      window.color3GvalueInteger = color3valueString.split(",")[1].replace(" ", "")
      window.color3BvalueInteger = color3valueString.split(",")[2].replace(" ", "")
    }

    this.setColorPreviews(selectedPattern, currentPalette)
  }

  setColorPreviews = (selectedPattern, currentPalette) => {
    color1ColorPreview.setAttribute("style", `background-color: rgb(${currentPalette.color1});`)
    color2ColorPreview.setAttribute("style", `background-color: rgb(${currentPalette.color2});`)

    if (!(currentPalette.color3 === null)) {
      color3ColorPreview.setAttribute("style", `background-color: rgb(${currentPalette.color3});`)
    }

    this.setColorValues(selectedPattern, currentPalette)
  }

  setColorValues = (selectedPattern, currentPalette) => {
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

    this.addListenersToSliders()

    this.setColorSliders(selectedPattern, currentPalette)
  }

  setColorSliders = (selectedPattern, currentPalette) => {
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

  addListenersToSliders = () => {
    let sliders = document.getElementsByClassName("slider")

    for (var i = 0; i < sliders.length; i++) {
      sliders[i].addEventListener('mouseup', this.updateColorValues, false);
    }
  }

  updateColorValues = () => {
    let clickedSlider = event.target

    switch (clickedSlider.id) {
      case "color1-r":
        let color1Rvalue = clickedSlider.value
        let color1RvalueText = document.createTextNode(`${color1Rvalue}`)
        clearThenAppend(paletteColor1Rvalue, color1RvalueText)
        this.updateColorPreview(color1Rvalue, clickedSlider.id)
        this.generateSaveButton()
      break
      case "color1-g":
        let color1Gvalue = clickedSlider.value
        let color1GvalueText = document.createTextNode(`${color1Gvalue}`)
        clearThenAppend(paletteColor1Gvalue, color1GvalueText)
        this.updateColorPreview(color1Gvalue, clickedSlider.id)
        this.generateSaveButton()
      break
      case "color1-b":
        let color1Bvalue = clickedSlider.value
        let color1BvalueText = document.createTextNode(`${color1Bvalue}`)
        clearThenAppend(paletteColor1Bvalue, color1BvalueText)
        this.updateColorPreview(color1Bvalue, clickedSlider.id)
        this.generateSaveButton()
      break
      case "color2-r":
        let color2Rvalue = clickedSlider.value
        let color2RvalueText = document.createTextNode(`${color2Rvalue}`)
        clearThenAppend(paletteColor2Rvalue, color2RvalueText)
        this.updateColorPreview(color2Rvalue, clickedSlider.id)
        this.generateSaveButton()
      break
      case "color2-g":
        let color2Gvalue = clickedSlider.value
        let color2GvalueText = document.createTextNode(`${color2Gvalue}`)
        clearThenAppend(paletteColor2Gvalue, color2GvalueText)
        this.updateColorPreview(color2Gvalue, clickedSlider.id)
        this.generateSaveButton()
      break
      case "color2-b":
        let color2Bvalue = clickedSlider.value
        let color2BvalueText = document.createTextNode(`${color2Bvalue}`)
        clearThenAppend(paletteColor2Bvalue, color2BvalueText)
        this.updateColorPreview(color2Bvalue, clickedSlider.id)
        this.generateSaveButton()
      break
      case "color3-r":
        let color3Rvalue = clickedSlider.value
        let color3RvalueText = document.createTextNode(`${color3Rvalue}`)
        clearThenAppend(paletteColor3Rvalue, color3RvalueText)
        this.updateColorPreview(color3Rvalue, clickedSlider.id)
        this.generateSaveButton()
      break
      case "color3-g":
        let color3Gvalue = clickedSlider.value
        let color3GvalueText = document.createTextNode(`${color3Gvalue}`)
        clearThenAppend(paletteColor3Gvalue, color3GvalueText)
        this.updateColorPreview(color3Gvalue, clickedSlider.id)
        this.generateSaveButton()
      break
      case "color3-b":
        let color3Bvalue = clickedSlider.value
        let color3BvalueText = document.createTextNode(`${color3Bvalue}`)
        clearThenAppend(paletteColor3Bvalue, color3BvalueText)
        this.updateColorPreview(color3Bvalue, clickedSlider.id)
        this.generateSaveButton()
      break
    }
  }

  updateColorPreview = (changedColorValue, sliderID) => {
    let colorNumber = sliderID.split("-")[0]
    let colorLetter = sliderID.split("-")[1]
    
    switch (colorNumber) {
      case "color1":
        if (colorLetter === "r") {
          let colorValueG = paletteColor1Gvalue.textContent
          let colorValueB = paletteColor1Bvalue.textContent
          let rgbValues = `${changedColorValue}, ${colorValueG}, ${colorValueB}`
          color1ColorPreview.setAttribute("style", `background-color: rgb(${rgbValues});`)
          this.updatePatternPreview(colorNumber, rgbValues)
        } else if (colorLetter === "g") {
          let colorValueR = paletteColor1Rvalue.textContent
          let colorValueB = paletteColor1Bvalue.textContent
          let rgbValues = `${colorValueR}, ${changedColorValue}, ${colorValueB}`
          color1ColorPreview.setAttribute("style", `background-color: rgb(${rgbValues});`)
          this.updatePatternPreview(colorNumber, rgbValues)
        } else if (colorLetter === "b") {
          let colorValueR = paletteColor1Rvalue.textContent
          let colorValueG = paletteColor1Gvalue.textContent
          let rgbValues = `${colorValueR}, ${colorValueG}, ${changedColorValue}`
          color1ColorPreview.setAttribute("style", `background-color: rgb(${rgbValues});`)
          this.updatePatternPreview(colorNumber, rgbValues)
        }
        paletteCSSBox.className = "hidden"
        this.clearStyleName()
        this.generateStyleButton()
      break
      case "color2":
        if (colorLetter === "r") {
          let colorValueG = paletteColor2Gvalue.textContent
          let colorValueB = paletteColor2Bvalue.textContent
          let rgbValues = `${changedColorValue}, ${colorValueG}, ${colorValueB}`
          color2ColorPreview.setAttribute("style", `background-color: rgb(${rgbValues});`)
          this.updatePatternPreview(colorNumber, rgbValues)
        } else if (colorLetter === "g") {
          let colorValueR = paletteColor2Rvalue.textContent
          let colorValueB = paletteColor2Bvalue.textContent
          let rgbValues = `${colorValueR}, ${changedColorValue}, ${colorValueB}`
          color2ColorPreview.setAttribute("style", `background-color: rgb(${rgbValues});`)
          this.updatePatternPreview(colorNumber, rgbValues)
        } else if (colorLetter === "b") {
          let colorValueR = paletteColor2Rvalue.textContent
          let colorValueG = paletteColor2Gvalue.textContent
          let rgbValues = `${colorValueR}, ${colorValueG}, ${changedColorValue}`
          color2ColorPreview.setAttribute("style", `background-color: rgb(${rgbValues});`)
          this.updatePatternPreview(colorNumber, rgbValues)
        }
        paletteCSSBox.className = "hidden"
        this.clearStyleName()
        this.generateStyleButton()
      break
      case "color3":
        if (colorLetter === "r") {
          let colorValueG = paletteColor3Gvalue.textContent
          let colorValueB = paletteColor3Bvalue.textContent
          let rgbValues = `${changedColorValue}, ${colorValueG}, ${colorValueB}`
          color3ColorPreview.setAttribute("style", `background-color: rgb(${rgbValues});`)
          this.updatePatternPreview(colorNumber, rgbValues)
        } else if (colorLetter === "g") {
          let colorValueR = paletteColor3Rvalue.textContent
          let colorValueB = paletteColor3Bvalue.textContent
          let rgbValues = `${colorValueR}, ${changedColorValue}, ${colorValueB}`
          color3ColorPreview.setAttribute("style", `background-color: rgb(${rgbValues});`)
          this.updatePatternPreview(colorNumber, rgbValues)
        } else if (colorLetter === "b") {
          let colorValueR = paletteColor3Rvalue.textContent
          let colorValueG = paletteColor3Gvalue.textContent
          let rgbValues = `${colorValueR}, ${colorValueG}, ${changedColorValue}`
          color3ColorPreview.setAttribute("style", `background-color: rgb(${rgbValues});`)
          this.updatePatternPreview(colorNumber, rgbValues)
        }
        paletteCSSBox.className = "hidden"
        this.clearStyleName()
        this.generateStyleButton()
      break
    }
  }

  updatePatternPreview = (colorNumber, rgbValues) => {
    let patternStyleRaw = this.patterns[selectedPatternId - 1].style
    let patternPreview = document.getElementsByClassName("pattern-preview")[0]

    if (colorNumber === "color1") {
      let color2rgb = `${paletteColor2Rvalue.textContent}, ${paletteColor2Gvalue.textContent}, ${paletteColor2Bvalue.textContent}`
      let color3rgb = `${paletteColor3Rvalue.textContent}, ${paletteColor3Gvalue.textContent}, ${paletteColor3Bvalue.textContent}`
      let currentPatternStyle = patternStyleRaw.replace(/COLOR1/g, rgbValues).replace(/COLOR2/g, color2rgb).replace(/COLOR3/g, color3rgb)
      this.createCurrentStyleTextNode(currentPatternStyle)
      patternPreview.setAttribute("style", currentPatternStyle)
    } else if (colorNumber === "color2") {
      let color1rgb = `${paletteColor1Rvalue.textContent}, ${paletteColor1Gvalue.textContent}, ${paletteColor1Bvalue.textContent}`
      let color3rgb = `${paletteColor3Rvalue.textContent}, ${paletteColor3Gvalue.textContent}, ${paletteColor3Bvalue.textContent}`
      let currentPatternStyle = patternStyleRaw.replace(/COLOR1/g, color1rgb).replace(/COLOR2/g, rgbValues).replace(/COLOR3/g, color3rgb)
      this.createCurrentStyleTextNode(currentPatternStyle)
      patternPreview.setAttribute("style", currentPatternStyle)
    } else if (colorNumber === "color3") {
      let color1rgb = `${paletteColor1Rvalue.textContent}, ${paletteColor1Gvalue.textContent}, ${paletteColor1Bvalue.textContent}`
      let color2rgb = `${paletteColor2Rvalue.textContent}, ${paletteColor2Gvalue.textContent}, ${paletteColor2Bvalue.textContent}`
      let currentPatternStyle = patternStyleRaw.replace(/COLOR1/g, color1rgb).replace(/COLOR2/g, color2rgb).replace(/COLOR3/g, rgbValues)
      this.createCurrentStyleTextNode(currentPatternStyle)
      patternPreview.setAttribute("style", currentPatternStyle)
    }
  }

  clearStyleName = () => {
    let nameField = document.createElement("input")
    nameField.type = "text"
    nameField.className = "form-field"
    nameField.placeholder = "name your creation"

    clearThenAppend(paletteName, nameField)
  }

  generateStyleButton = () => {
    saveStyleButtonBox.className = ""
    let styleButton = document.createElement("button")
    styleButton.id = "generate-style-button"
    styleButton.className = "btn btn-dark"
    let styleButtonText = document.createTextNode("Generate CSS")
    styleButton.appendChild(styleButtonText)

    clearThenAppend(generateStyleButtonBox, styleButton)

    styleButton.addEventListener("click", this.generateStyleCopyBox, false);
  }

  createCurrentStyleTextNode = (currentPatternStyle) => {
    window.currentStyleTextNode = document.createTextNode(`${currentPatternStyle}`)
  }

  generateStyleCopyBox = () => {
    paletteCSSBox.className = ""
    let paletteCSS = document.createElement("p")
    paletteCSS.appendChild(currentStyleTextNode)

    clearThenAppend(paletteCSSBoxText, paletteCSS)

    let styleCopyButton = document.createElement("button")
    styleCopyButton.id = "copy-style-button"
    styleCopyButton.className = "btn btn-outline-light"
    let styleCopyButtonText = document.createTextNode("Copy")
    styleCopyButton.appendChild(styleCopyButtonText)

    let paletteCSSTextarea = document.createElement("textarea")
    paletteCSSTextarea.className = "copyTextarea"
    paletteCSSTextarea.value = currentStyleTextNode.textContent

    clearThenAppend(paletteCSSBoxTextarea, paletteCSSTextarea)

    styleCopyButton.addEventListener("click", () => {
      paletteCSSTextarea.select()
      document.execCommand("copy")
    })

    paletteCSSBoxTextarea.appendChild(styleCopyButton)

  }

  generateSaveButton = () => {
    let saveButton = document.createElement("button")
    saveButton.id = "generate-save-button"
    saveButton.className = "btn btn-outline-dark"
    let saveButtonText = document.createTextNode("Save Palette")
    saveButton.appendChild(saveButtonText)

    clearThenAppend(saveStyleButtonBox, saveButton)

    saveButton.addEventListener("click", this.parsePalette, false)
  }

  parsePalette = () => {
    let patternID = selectPatternDropdown.options.selectedIndex

    let paletteNameInput = paletteName.firstChild.value

    let paletteColor1RvalueText = paletteColor1Rvalue.textContent
    let paletteColor1GvalueText = paletteColor1Gvalue.textContent
    let paletteColor1BvalueText = paletteColor1Bvalue.textContent
    let paletteColor2RvalueText = paletteColor2Rvalue.textContent
    let paletteColor2GvalueText = paletteColor2Gvalue.textContent
    let paletteColor2BvalueText = paletteColor2Bvalue.textContent
    let paletteColor3RvalueText = paletteColor3Rvalue.textContent
    let paletteColor3GvalueText = paletteColor3Gvalue.textContent
    let paletteColor3BvalueText = paletteColor3Bvalue.textContent

    let color1RGB = paletteColor1RvalueText + "," + paletteColor1GvalueText + "," + paletteColor1BvalueText
    let color2RGB = paletteColor2RvalueText + "," + paletteColor2GvalueText + "," + paletteColor2BvalueText
    let color3RGB = paletteColor3RvalueText + "," + paletteColor3GvalueText + "," + paletteColor3BvalueText

    this.createNewPalette(paletteNameInput, color1RGB, color2RGB, color3RGB, patternID).then(palette => {
      let newPalette = new Palette(palette)
      paletteStart.palettes.push(newPalette)
    })
  }

  createNewPalette = (name, color1, color2, color3, pattern_id) => {
    let newPalette = { 
      "name": name, 
      "color1": color1, 
      "color2": color2, 
      "color3": color3, 
      "pattern_id": pattern_id 
    }

    if (name === "") {
      alert("give us a name")
      this.generateSaveButton()
    }

    if (color3 === "...,...,...") {
      newPalette = { 
        "name": name, 
        "color1": color1, 
        "color2": color2, 
        "pattern_id": pattern_id 
      }
    }

    return fetch(PALETTES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newPalette)
    })
    .then(response => (response.json()))
    .catch(error => console.log(error))
  }
}

