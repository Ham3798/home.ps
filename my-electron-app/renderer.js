const { ipcRenderer } = require('electron')

const map = document.getElementById('map')

map.addEventListener('click', () => {
  ipcRenderer.send('map-click', { x: 100, y: 100 })
})
