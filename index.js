const PORT = 8000
const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const res = require('express/lib/response');
const fs = require('fs');

const app = express()

const cors = require('cors');
app.use(cors())

const url = 'https://fbref.com/es/equipos/e2d73ee6/2023/all_comps/Estadisticas-de-Penarol-Todas-las-competencias'


//app.METHOD(PATH, HANDLER)

app.get('/', function(req, res){
    res.json('This is my webscraper')
})

app.get('/players/:team/:year', (req, res) => {
    const year = req.params.year;
    const team = req.params.team;
    //const url = `https://fbref.com/es/equipos/e2d73ee6/${year}/all_comps/Estadisticas-de-Penarol-Todas-las-competencias`;
    const url = `https://fbref.com/es/equipos/e2d73ee6/${year}/all_comps/Estadisticas-de-${team}-Todas-las-competencias`;
    
    axios.get(url)
        .then(response => {
        const $ = cheerio.load(response.data);
        const data = [];

        $('table.stats_table tbody tr').each((i, row) => {
        const player = removeAccents($(row).find('th[data-stat="player"] a').text().trim());
        const nationality = $(row).find('td[data-stat="nationality"]').text().trim();
        const position = $(row).find('td[data-stat="position"]').text().trim();
        //const age = $(row).find('td[data-stat="age"]').text().trim();
        const matches = $(row).find('td[data-stat="games"]').text().trim();
        const matches_starts = $(row).find('td[data-stat="games_starts"]').text().trim();
        const minutes = $(row).find('td[data-stat="minutes"]').text().trim();
        const minutes_90s = $(row).find('td[data-stat="minutes_90s"]').text().trim();
        const goals = $(row).find('td[data-stat="goals"]').text().trim();
        const assists = $(row).find('td[data-stat="assists"]').text().trim();
        const goal_assists = $(row).find('td[data-stat="goal_assists"]').text().trim();
        const goals_pens = $(row).find('td[data-stat="goals_pens"]').text().trim();
        const pens_made = $(row).find('td[data-stat="pens_made"]').text().trim();
        const pens_att = $(row).find('td[data-stat="pens_att"]').text().trim();
        const card_yellow = $(row).find('td[data-stat="card_yellow"]').text().trim();
        const cards_red = $(row).find('td[data-stat="cards_red"]').text().trim();
        const assists_per90 = $(row).find('td[data-stat="assists_per90"]').text().trim();
        const goals_assists_per90 = $(row).find('td[data-stat="goals_assists_per90"]').text().trim();
        const goals_pens_per90 = $(row).find('td[data-stat="goals_pens_per90"]').text().trim();
        const goals_assists_pens_per90 = $(row).find('td[data-stat="goals_assists_pens_per90"]').text().trim();
        //const matches = $(row).find('td[data-stat="matches"]').text().trim();

        const item = {};
        const isPlayerAdded = data.some(item => item.player === player);
        if (!isPlayerAdded && player !== ''){
            data.push({
                player,
                nationality,
                position,
                matches,
                matches_starts,
                minutes,
                minutes_90s,
                goals,
                assists,
                goal_assists,
                goals_pens,
                pens_made,
                pens_att,
                card_yellow,
                cards_red,
                assists_per90,
                goals_assists_per90,
                goals_pens_per90,
                goals_assists_pens_per90
            });
            }
        });

        fs.writeFile(`data/data_${team}_${year}.json`, JSON.stringify(data), err => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Error al escribir el archivo' });
            }
    
            console.log('Archivo creado exitosamente');
            res.json(data);
          });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los datos' });

    });

})


//normalization player names
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));