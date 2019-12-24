const API_KEY = "4e79f879a52347acbd10a979383ccfc7";
const BASE_URL = "https://api.football-data.org/v2/";

const PremierLEAGUE_ID = 2021;
const LaligaLEAGUE_ID = 2014;
const BundesLigaLEAGUE_ID = 2002;

const ENDPOINT_COMPETITION_Premier = `${BASE_URL}competitions/${PremierLEAGUE_ID}/standings`;
const ENDPOINT_COMPETITION_Laliga = `${BASE_URL}competitions/${LaligaLEAGUE_ID}/standings`;
const ENDPOINT_COMPETITION_Bundesliga = `${BASE_URL}competitions/${BundesLigaLEAGUE_ID}/standings`;

var teams_url = `${BASE_URL}competitions/${PremierLEAGUE_ID}/teams`;
var teamData;

var get_teamURL = `${BASE_URL}teams/`;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};




//Premier Teams
function getAllTeams() {
    if ("caches" in window) {
        caches.match(teams_url).then(function (response) {
            if (response) {
                response.json().then(function (premTeams) {
                    console.log("Get All Team Premier League Data: " + premTeams);
                    showAllTeams(premTeams);
                })
            }
        })
    }

    fetchAPI(teams_url)
        .then(premTeams => {
            showAllTeams(premTeams);
        })
        .catch(error => {
            console.log(error)
        })
}

function showAllTeams(premTeams) {
    let premierteams = "";
    let premierElementTeams = document.getElementById("premierteams");

    /* console.log(premTeams); */

    premTeams.teams.forEach(function (dataTeams) {
        console.log(dataTeams);
        premierteams += `
        <div class="collection-item"> 
              <div class="center"><img width="50" height="50" src="${dataTeams.crestUrl.replace(/^http:\/\//i, 'https://')}"></div>
              <div class="center">${dataTeams.name} </div>
              <div class="center">${dataTeams.area.name}</div>
              <div class="center">${dataTeams.founded}</div>
              <div class="center">${dataTeams.venue}</div>
              <div class="center"><a href="${dataTeams.website}" target="_blank">${dataTeams.website}</a></div>
              <div class="card-action right-align">
              <a class="waves-effect waves-light btn blue" onclick="insertTeam(${dataTeams.id})"><i class="material-icons right"></i>Add to Favorite</a>
              </div>
       </div>
       </div>
   `;
    });

    premierElementTeams.innerHTML = `
                <div style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">                
                    ${premierteams}
                </div>
    `;
}





//GET Teams from ID
function getTeamsFromID(idTeams) {
    var urlTeam = `${get_teamURL}${idTeams}`;
    fetchAPI(urlTeam)
        .then(teamFromID => {
            showFavTeams(teamFromID);
        })
        .catch(error => {
            console.log(error)
        })
}

function showFavTeams(teamFromID) {
    var teamData = "";
    var dataElementTeams = document.getElementById("favteam");

    console.log("Team From ID " + teamFromID.name);

    teamData = `
        <div class="collection-item"> 
        
        <div class="center"><img width="50" height="50" src="${teamFromID.crestUrl}"></div>
        <div class="center">${teamFromID.name} </div>
        <div class="center">${teamFromID.area.name}</div>
        <div class="center">${teamFromID.founded}</div>
        <div class="center">${teamFromID.venue}</div>
        <div class="center"><a href="${teamFromID.website}" target="_blank">${teamFromID.website}</a></div>
        <div class="card-action right-align">
        <a class="center waves-effect waves-light btn red" onclick="deleteTeam(${teamFromID.id})"><i class="material-icons right"></i>Delete from Favorite</a>
        </div>
    </div>
    </div>
    `;

    dataElementTeams.innerHTML += teamData;

}

function getFavoriteTeams() {
    var dataDB = getFavTeams();
    if (dataDB.length == "0") {
        var htmlkosong = '<h6 class="center-align">No favorite team found!</6>'
        document.getElementById("favteam").innerHTML = htmlkosong;
    }
    else {
        dataDB.then(function (data) {
            console.log("data yang diambil dari DB " + data);
            data.forEach(function (team) {
                getTeamsFromID(team.id);
                console.log("ini baca fav team " + team.id);
            });
        });
    }
}




//Premier League
function getAllStandingsPremier() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION_Premier).then(function (response) {
            if (response) {
                response.json().then(function (premier) {
                    console.log("Premier Standing Data: " + premier);
                    showStandingPremier(premier);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION_Premier)
        .then(premier => {
            showStandingPremier(premier);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStandingPremier(premier) {
    let standingsPrem = "";
    let standingElementPrem = document.getElementById("premierStandings");

    premier.standings[0].table.forEach(function (standing) {
        standingsPrem += `
            <tr>
                <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                <td>${standing.team.name}</td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
                <td>${standing.goalsFor}</td>
                <td>${standing.goalsAgainst}</td>
                <td>${standing.goalDifference}</td>
                <td><span class="green-text"><b>${standing.points}</b></span></td>
            </tr>
        `;
    });

    standingElementPrem.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>Win</th>
                            <th>Draw</th>
                            <th>Lose</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                            <th>Points</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standingsPrem}
                    </tbody>
                </table>
                
                </div>
    `;
}

//Laliga
function getAllStandingsLaliga() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION_Laliga).then(function (response) {
            if (response) {
                response.json().then(function (laliga) {
                    console.log("Laliga Standing Data: " + laliga);
                    showStandingLaliga(laliga);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION_Laliga)
        .then(laliga => {
            showStandingLaliga(laliga);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStandingLaliga(laliga) {
    let standingsLalig = "";
    let standingElementLalig = document.getElementById("laligaStandings");

    laliga.standings[0].table.forEach(function (standing) {
        standingsLalig += `
            <tr>
                <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                <td>${standing.team.name}</td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
                <td>${standing.goalsFor}</td>
                <td>${standing.goalsAgainst}</td>
                <td>${standing.goalDifference}</td>
                <td><span class="green-text"><b>${standing.points}</b></span></td>
            </tr>
        `;
    });

    standingElementLalig.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>Win</th>
                            <th>Draw</th>
                            <th>Lose</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                            <th>Points</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standingsLalig}
                    </tbody>
                </table>
                
                </div>
    `;
}


//Bundesliga
function getAllStandingsBundes() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION_Bundesliga).then(function (response) {
            if (response) {
                response.json().then(function (bundes) {
                    console.log("Bundesliga Standing Data: " + bundes);
                    showStandingBundes(bundes);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION_Bundesliga)
        .then(bundes => {
            showStandingBundes(bundes);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStandingBundes(bundes) {
    let standingsBund = "";
    let standingElementBund = document.getElementById("bundesligaStandings");

    bundes.standings[0].table.forEach(function (standing) {
        standingsBund += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                    <td><span class="green-text"><b>${standing.points}</b></span></td>
                </tr>
        `;
    });

    standingElementBund.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>Win</th>
                            <th>Draw</th>
                            <th>Lose</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                            <th>Points</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standingsBund}
                    </tbody>
                </table>
                
                </div>
    `;
}

