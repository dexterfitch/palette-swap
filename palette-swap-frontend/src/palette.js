class Palette {
  constructor(name, color1, color2, color3, pattern_id) {
    this.name = name;
    this.color1 = color1;
    this.color2 = color2;
    this.color3 = color3;
    this.pattern_id = pattern_id;
  }

  createPaletteCard() {
    const card = document.createElement('div')
    card.className = "card"

    let color1 = document.createElement('div')
    color1.className = "color color1"
    let color1_rgb = document.createTextNode(`${this.color1}`)
    color1.appendChild(color1_rgb)
    card.appendChild(color1)

    let color2 = document.createElement('div')
    color2.className = "color color2"
    let color2_rgb = document.createTextNode(`${this.color2}`)
    color2.appendChild(color2_rgb)
    card.appendChild(color2)

    let color3 = document.createElement('div')
    color3.className = "color color3"
    let color3_rgb = document.createTextNode(`${this.color3}`)
    color3.appendChild(color3_rgb)
    card.appendChild(color3)

    document.getElementById('palette-box').appendChild(card)
  }
}