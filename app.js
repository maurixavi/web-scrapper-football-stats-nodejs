const feedDisplay = document.querySelector('#feed')

const url = 'http://localhost:8000/players'

fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const player = `<h3>` + item.player + `</h3>`
            feedDisplay.insertAdjacentHTML("beforeend", player);
        });
    })
    .catch(err => console.log(err));