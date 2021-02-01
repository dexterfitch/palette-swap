class Patterns {

  constructor(name, style) {
    this.name = name;
    this.style = style;
  }

  getPatterns = () => {
    fetch(PATTERNS_URL)
    .then(response => response.json())
    .then(patterns => this.renderPatterns(patterns))
  }

  renderPatterns = (patterns) => {
    let select = document.createElement("select")
    select.name = "patterns-dropdown"
    select.id = "patterns-dropdown"
    patternSelect.appendChild(select)
    patterns.data.forEach(pattern => this.renderPatternDropdown(pattern))
  }

  renderPatternDropdown = (pattern) => {
    let select = document.getElementById("patterns-dropdown")
    let option = document.createElement("option")
    option.value = pattern.id
    option.text = pattern.attributes.name
    select.appendChild(option)
  }

}