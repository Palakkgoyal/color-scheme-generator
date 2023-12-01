const form = document.querySelector("form")
const colorEl = document.getElementById("color")
const colorScheme = document.getElementById("color-schemes")
const colorSchemeContainer = document.getElementById("color-scheme-container")

form.addEventListener("submit", getColorScheme)

function getColorScheme(e) {
    e && e.preventDefault()
    const cleanColorHex = colorEl.value.substring(1)
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${cleanColorHex}&mode=${colorScheme.value}&count=5`)
        .then(res => res.json())
        .then(data =>  {
            colorSchemeContainer.innerHTML = ""
            data.colors.forEach((color, idx) => renderColors(color.hex.value))
        })
}

getColorScheme()

function renderColors(color) {
    const btn = document.createElement("button")   
    btn.style.background = color
    btn.addEventListener("click", () => copyToClipboard(color))
    
    const p = document.createElement("p")
    p.textContent = color
    
    btn.appendChild(p)
    colorSchemeContainer.appendChild(btn)
}

function copyToClipboard(color) {    
    navigator.clipboard.writeText(color) // only work with https otherwise throws error
    alert(`Yay!🥳 copied the color: ${color}`)
}