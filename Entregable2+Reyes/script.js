//La funcion de intercambiar monedas swapCurrencies me ayudo chat gpt, estuve intentandolo pero no me salio
// Y el efecto de cambio tambien
// Funcionalidad para la barra lateral
const overlay = document.getElementById('overlay')
const menuBtn = document.querySelector("#tres-lineas")
const sidebar = document.querySelector("#sidebar")
const clsidebar = document.querySelector("#closeSidebar")
const conversionText = document.getElementById('conversionText')

// Funciones para la calculadora de monedas
const inputMoneda = document.getElementById('inputMoneda')
const outputMoneda = document.getElementById('outputMoneda')
const buttonChange = document.getElementById('buttonChange')
const fromCurrencyDisplay = document.getElementById('Moneda-convertir')
const toCurrencyDisplay = document.getElementById('Moneda-convertida')

// Tasas de cambio (necesito una API para tener tasas de cambio actualizadas)
const usdToArsRate = 1466.00
const arsToUsdRate = 1 / usdToArsRate
let isUsdToArs = true

// Función para formatear números
function formatNumber(num, decimals = 2) {
    return new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num)
}

// Función para actualizar el texto de la conversión
function updateConversionText() {
    if (isUsdToArs) {
        conversionText.textContent = `1 ARS = ${formatNumber(arsToUsdRate, 4)} USD`
    } else {
        conversionText.textContent = `1 USD = ${formatNumber(usdToArsRate, 4)} ARS`
    }
}

// Función principal de conversión
function convertCurrency() {
    const inputValue = parseFloat(inputMoneda.value)

    if (isNaN(inputValue) || inputValue === 0) {
        outputMoneda.value = ''
        return
    }

    let result
    if (isUsdToArs) {
        result = inputValue * arsToUsdRate
    } else {
        result = inputValue * usdToArsRate
    }

    outputMoneda.value = formatNumber(result)
}

// Función para intercambiar las monedas
function swapCurrencies() {
    isUsdToArs = !isUsdToArs

    // Intercambiar el texto de los encabezados de moneda
    const tempText = fromCurrencyDisplay.textContent
    fromCurrencyDisplay.textContent = toCurrencyDisplay.textContent
    toCurrencyDisplay.textContent = tempText

    inputMoneda.value = ''
    outputMoneda.value = ''

    // Actualiza el texto de la conversión.
    updateConversionText()

    // Efecto de animación en el botón
    buttonChange.style.transform = 'rotate(360deg)'
    setTimeout(() => {
        buttonChange.style.transform = 'rotate(0deg)'
    }, 500)
}

// Eventos
menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active")
    overlay.classList.toggle("active")
})

clsidebar.addEventListener("click", () => {
    sidebar.classList.remove("active")
    overlay.classList.remove("active")
})

overlay.addEventListener('click', () => {
    sidebar.classList.remove('active')
    overlay.classList.remove('active')
})

inputMoneda.addEventListener('input', convertCurrency)
buttonChange.addEventListener('click', swapCurrencies)

// Inicializar al cargar la página
window.addEventListener('load', () => {
    convertCurrency()
    updateConversionText()
})