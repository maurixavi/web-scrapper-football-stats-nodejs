const feedDisplay = document.querySelector('#feed')

const url = 'http://localhost:8000/players'

fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))