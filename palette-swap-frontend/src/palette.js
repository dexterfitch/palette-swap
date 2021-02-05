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

    let filteredPalettes = []
    this.palettes.forEach(palette => {
      if(palette.relationships.pattern.data.id === selectedPatternId) {
        filteredPalettes.push(palette)
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

    let updatedStyle = patternStart.renderStyle(currentPattern, currentPaletteID, true)


    patternStart.createCurrentStyleTextNode(updatedStyle)
    patternStart.generateStyleButton()

    this.updateCurrentPatternStyle(updatedStyle, currentPattern, currentPaletteID)
    paletteCSSBox.className = "hidden"
  }

  updateCurrentPatternStyle = (updatedStyle, currentPattern, currentPaletteID) => {
    let patternPreview = document.getElementsByClassName("pattern-preview")

    patternPreview[0].setAttribute("style", updatedStyle)

    patternStart.getRGBValues(currentPattern, currentPaletteID, true)
    patternStart.setColorPreviews(currentPattern)
    patternStart.setColorValues(currentPattern)
    patternStart.setColorSliders(currentPattern)
  }
}