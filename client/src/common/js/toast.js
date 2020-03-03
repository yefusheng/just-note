export const toast = (text, timeout = 2000) => {
    let div = document.createElement('DIV')
    div.innerText = text
    div.className = 'exe-toast'
    const body = document.querySelector('body')
    setTimeout(() => {
        body.removeChild(div)
    }, timeout)
    body.appendChild(div)
}
