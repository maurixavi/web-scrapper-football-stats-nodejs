const feedDisplay = document.querySelector('#feed');
const teamSelect = document.getElementById('team');
const yearSelect = document.getElementById('year');
const searchButton = document.getElementById('search');
const downloadButton = document.getElementById('download');
//const resultsContainer = document.getElementById('results');

let data = [];

searchButton.addEventListener('click', () => {
    const team = teamSelect.value;
    const year = yearSelect.value;
    const url = `http://localhost:9002/players/${team}/${year}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            //data = jsonData;
            let tableHtml = `<table>
                      <thead>
                        <tr>
                          <th>Player</th>
                          <th>Matches</th>
                          <th>Minutes</th>
                          <th>Goals</th>
                          <th>Assists</th>
                          <th>Yellow Cards</th>
                          <th>Red Cards</th>

                        </tr>
                      </thead>
                      <tbody>`;
            data.forEach(item => {
                const player = `<tr>
                        <td>${item.player} (${item.nationality.split(' ')[1]}) </td>
                        <td>${item.matches}</td>
                        <td>${item.minutes}</td>
                        <td>${item.goals}</td>
                        <td>${item.assists}</td>
                        <td>${item.card_yellow}</td>
                        <td>${item.cards_red}</td>
                      </tr>`;
                tableHtml += player;
            });
            tableHtml += '</tbody></table>';
            //feedDisplay.innerHTML = '';
            feedDisplay.insertAdjacentHTML('afterbegin', tableHtml);
        })
        .catch(err => console.log(err));
});

downloadButton.addEventListener('click', () => {
    if (data.length === 0) {
        console.log('No hay datos para descargar');
        return;
    }
    
    const team = teamSelect.value;
    const year = yearSelect.value;
    const filename = `${team}-${year}.json`;
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;

    document.body.appendChild(downloadLink); // Agregar el enlace de descarga al cuerpo del documento
    downloadLink.click();
    document.body.removeChild(downloadLink); // Eliminar el enlace de descarga después de descargar el archivo
});