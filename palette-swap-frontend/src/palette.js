class Palette {
  constructor(name, color1, color2, color3, pattern_id) {
    this.name = name;
    this.color1 = color1;
    this.color2 = color2;
    this.color3 = color3;
    this.pattern_id = pattern_id;
    this.palettes = [];
  }

  getPalettes = () => {
    fetch(PALETTES_URL)
    .then(response => response.json())
    .then(palettes => this.renderPalettes(palettes))
  }

  renderPalettes = (palettes) => {
    this.palettes = []
    palettes.data.forEach(palette => {
      this.palettes.push(palette)
    })
  }

  filterPalettes = (selectedPatternId) => {
    window.selectedPatternId = selectedPatternId
    let patternID = selectedPatternId

    let filteredPalettes = []

    this.palettes.forEach(pal => {
      if(pal.relationships.pattern.data.id == patternID) {
        filteredPalettes.push(pal)
      }
    })

    this.displayFilteredPalettes(filteredPalettes)
  }

  displayFilteredPalettes = (filteredPalettes) => {
    while (selectPaletteBox.firstChild) {
      selectPaletteBox.removeChild(selectPaletteBox.lastChild)
    }

    filteredPalettes.forEach(palette => {
      let paletteId = palette.attributes.id
      let paletteName = palette.attributes.name
      let paletteColor1 = palette.attributes.color1
      let paletteColor2 = palette.attributes.color2
      let paletteColor3 = palette.attributes.color3
      let palettePatternId = palette.relationships.pattern.data.id

      let palettePreviewNameOverlay = document.createElement("div")
      palettePreviewNameOverlay.className = "palette-name"
      let palettePreviewNameText = document.createTextNode(`${paletteName}`)
      palettePreviewNameOverlay.appendChild(palettePreviewNameText)

      let palettePreview = document.createElement("div")
      palettePreview.className = "col-6 palette-preview"
      palettePreview.setAttribute("id", `${palettePatternId} - ${paletteId}`)

      let palettePreviewBox = document.createElement("div")
      palettePreviewBox.className = "row"
      palettePreviewBox.setAttribute("style", "position: relative")

      let palettePreviewColor1 = document.createElement("div")
      palettePreviewColor1.className = "col-4"

      let palettePreviewColor1Inner = document.createElement("div")
      palettePreviewColor1Inner.className = "palette-preview-inner inner-1"

      let palettePreviewColor2 = document.createElement("div")
      palettePreviewColor2.className = "col-4"

      let palettePreviewColor2Inner = document.createElement("div")
      palettePreviewColor2Inner.className = "palette-preview-inner inner-2"

      let palettePreviewColor3 = document.createElement("div")
      palettePreviewColor3.className = "col-4"

      let palettePreviewColor3Inner = document.createElement("div")
      palettePreviewColor3Inner.className = "palette-preview-inner inner-3"

      palettePreviewColor1Inner.setAttribute("style", `background-color: rgb(${paletteColor1})`)
      palettePreviewColor2Inner.setAttribute("style", `background-color: rgb(${paletteColor2})`)
      if (paletteColor3 === null) {
        palettePreviewColor3Inner.className = "palette-preview-inner inner-3 no-color"
      } else {
        palettePreviewColor3Inner.setAttribute("style", `background-color: rgb(${paletteColor3})`)
      }

      palettePreviewColor1.appendChild(palettePreviewColor1Inner)
      palettePreviewColor2.appendChild(palettePreviewColor2Inner)
      palettePreviewColor3.appendChild(palettePreviewColor3Inner)

      palettePreviewBox.appendChild(palettePreviewColor1)
      palettePreviewBox.appendChild(palettePreviewColor2)
      palettePreviewBox.appendChild(palettePreviewColor3)
      palettePreviewBox.appendChild(palettePreviewNameOverlay)

      palettePreview.appendChild(palettePreviewBox)

      selectPaletteBox.appendChild(palettePreview)
    })

    this.addListenersToPalettesInGallery()
  }

  addListenersToPalettesInGallery = () => {
    let selectablePalettes = document.getElementsByClassName("palette-preview")

    for (var i = 0; i < selectablePalettes.length; i++){
      selectablePalettes[i].addEventListener('click', this.getUpdatedStyle, true);
    }
  }

  getUpdatedStyle = () => {
    let clickedPaletteIDs
    let splitPaletteIDs

    if(event.target.parentElement.className === "col-4" || event.target.parentElement.className === "palette-name") {
      clickedPaletteIDs = event.target.parentElement.parentElement.parentElement.id
      splitPaletteIDs = clickedPaletteIDs.split(" - ")
    } else if (event.target.parentElement.className === "row") {
      clickedPaletteIDs = event.target.parentElement.parentElement.id
      splitPaletteIDs = clickedPaletteIDs.split(" - ")
    }

    let currentPatternID = parseInt(splitPaletteIDs[0]) - 1
    let currentPaletteID = parseInt(splitPaletteIDs[1])
    let currentPattern = patternStart.patterns[currentPatternID]

    let updatedStyle = patternStart.renderStyle(currentPattern, currentPaletteID)


    this.createCurrentStyleTextNode(updatedStyle)
    this.generateStyleButton()

    this.updateCurrentPatternStyle(updatedStyle, currentPattern, currentPaletteID)
    paletteCSSBox.className = "hidden"
    saveStyleButtonBox.className = "hidden"
  }

  updateCurrentPatternStyle = (updatedStyle, currentPattern, currentPaletteID) => {
    let patternPreview = document.getElementsByClassName("pattern-preview")

    patternPreview[0].setAttribute("style", updatedStyle)

    patternStart.getRGBValues(currentPattern, currentPaletteID)
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
      window.location.reload()
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
      return
    } else if (name.length > 16) {
      alert("too long buddy, keep it less than 16 chars")
      this.generateSaveButton()
      return
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

  editPalette = () => {}

  deletePalette = () => {}



}