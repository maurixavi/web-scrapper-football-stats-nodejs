const feedDisplay = document.querySelector('#feed')
    const teamSelect = document.getElementById('team');
    const yearSelect = document.getElementById('year');
    const searchButton = document.getElementById('search');
    const resultsContainer = document.getElementById('results');

    searchButton.addEventListener('click', () => {
        const team = teamSelect.value;
        const year = yearSelect.value;
        const url = `http://localhost:8000/players/${team}/${year}`;
      
        fetch(url)
          .then(response => response.json())
          .then(data => {
            let tableHtml = `<table>
                      <thead>
                        <tr>
                          <th>Player</th>
                          <th>Matches</th>
                          <th>Goals</th>
                          <th>Assists</th>

                        </tr>
                      </thead>
                      <tbody>`;
    data.forEach(item => {
      const player = `<tr>
                        <td>${item.player}</td>
                        <td>${item.matches}</td>
                        <td>${item.goals}</td>
                        <td>${item.assists}</td>

                      </tr>`;
      tableHtml += player;
    });
    tableHtml += '</tbody></table>';
    feedDisplay.innerHTML = '';
    feedDisplay.insertAdjacentHTML('afterbegin', tableHtml);
          })
          .catch(err => console.log(err));
      });
    
