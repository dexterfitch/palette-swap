class Pattern {

  constructor(name, style) {
    this.name = name;
    this.style = style;
  }

  getPatterns = () => {
    fetch(PATTERNS_URL)
    .then(response => response.json())
    .then(data => console.log(data))
  }

}