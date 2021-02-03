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

  filterPalettes = (selectedPattern) => {
    let filteredPalettes = []
    this.palettes.forEach(palette => {
      if(palette.relationships.pattern.data.id === selectedPattern) {
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

      let palettePreview = document.createElement("div")
      palettePreview.className = "col-4 palette-preview"

      let palettePreviewBox = document.createElement("div")
      palettePreviewBox.className = "row"

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

      palettePreview.appendChild(palettePreviewBox)

      selectPaletteBox.appendChild(palettePreview)

    })
  }
}