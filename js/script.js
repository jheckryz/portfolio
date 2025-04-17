let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')
const modeImage = document.getElementById('mode-image')


const setImageMode = () => {
  modeImage.src = document.body.classList.contains('darkmode')
    ? 'images/dark-image.png'
    : 'images/light-image.png'
}

const enableDarkmode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmode','active')
  setImageMode()
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkmode', null)
  setImageMode()
}


if (darkmode === "active") enableDarkmode()
else setImageMode()


themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode')
  darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})
