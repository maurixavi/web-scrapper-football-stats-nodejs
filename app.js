const feedDisplay = document.querySelector('#feed');
const teamSelect = document.getElementById('team');
const yearSelect = document.getElementById('year');
const searchButton = document.getElementById('search');
const downloadButton = document.getElementById('download');

let data = [];
let jsonData;

searchButton.addEventListener('click', () => {
    const team = teamSelect.value;
    const year = yearSelect.value;

    const url =`https://football-stats-express-api-rq26.vercel.app/players/${team}/${year}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            console.log("data1", data)
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
            feedDisplay.insertAdjacentHTML('afterbegin', tableHtml);
        })
        .catch(err => console.log(err));
        
});


downloadButton.addEventListener('click', () => {
    console.log("data2", jsonData)
    if (jsonData.length === 0) {
        console.log('No data available for download.');
        return;
    }
    
    const team = teamSelect.value;
    const year = yearSelect.value;
    const filename = `${team}-${year}.json`;
    const blob = new Blob([JSON.stringify(jsonData)], {type: 'application/json'});

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;

    document.body.appendChild(downloadLink); 
    downloadLink.click();
    document.body.removeChild(downloadLink); 
});