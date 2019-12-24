
// database operations
var dbPromise = idb.open('football', 1, function (upgradeDb) {
    switch (upgradeDb.oldVersion) {
        case 0:
            upgradeDb.createObjectStore('teams', { 'keyPath': 'id' })
    }
});

function insertTeam(team) {
    dbPromise.then(function (db) {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        console.log('team ID is '+ team);
        var item = {
            id: team,
        };
        store.put(item);
        return tx.complete;
    }).then(function () {
        M.toast({ html: `Team is succesfully added!` })
        console.log('Team is succesfully added!');
    }).catch(err => {
        console.error('Team gagal disimpan', err);
    });
}

function deleteTeam(teamId) {
    dbPromise.then(function (db) {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        store.delete(teamId);
        return tx.complete;
    }).then(function () {
        M.toast({ html: "Team Succesfully Deleted"});
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification("Team Succesfully Deleted");
            });
        } else {
            console.error('Fitur notifikasi tidak diizinkan.');
        }
        getFavoriteTeams();
    }).catch(err => {
        console.error('Error: ', err);
    });
}


function getFavTeams() {
    return dbPromise.then(function (db) {
        var tx = db.transaction('teams', 'readonly');
        var store = tx.objectStore('teams');
        return store.getAll();
    });
}



var insertTeamListener = teamId => {
    var team = premTeams.teams.filter(el => el.id == teamId)[0]
    insertTeam(team);
    console.log(teamId + "add to favorite")
}


var deleteTeamListener = teamId => {
    var confirmation = confirm("Delete this team?")
    if (confirmation == true) {
        deleteTeam(teamId);
        console.log(teamId + "has been deleted")
    }
}