function PlayersService(callback) {
    var playersData = [];
    var myTeam = [];
    //...
    //...



    // this.getPlayersByTeam = function (teamName) {
    //     //return an array of all players who match the given teamName.
    //     return playersData.filter(function (player) {
    //         if (player.team == teamName) {
    //             return true;
    //         }
    //     });
    // }

    // this.getPlayersByPosition = function (position) {
    //     //return an array of all players who match the given position.
    //     return playersData.filter(function (player) {
    //         if (position == position) {
    //             return true;
    //         }
    //     });
    // }

    // this.getPlayersByName = function (fullname) {
    //     //returns array of players who match the name
    //     return playersData.filter(function (player) {
    //         if (player.fullname == fullname) {
    //             return true;
    //         }
    //     });
    // }

    //SERVICE
    this.search = function search(query) {
        //filteredResults is an array of of the filtered players
        var x = query.toLowerCase()
        var filteredResults = playersData.filter(function (player) {
            return player.fullname.toLowerCase().includes(x) || player.pro_team.toLowerCase().includes(x) || player.position.toLowerCase().includes(x)
        })
        return filteredResults
    }



    function loadPlayersData() {
        //check if the player already has a copy of the NFL playersData
        var localData = localStorage.getItem('playersData');
        //if they do, pull from there
        if (localData) {
            playersData = JSON.parse(localData);
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
            return callback(playersData)
        }
        //if not go get that data
        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            callback(playersData)
        });
    }

    this.addToMyTeam = function addToMyTeam(playerId, cb) {
        return playersData.filter(function (player) {
            if (player.id == playerId) {
                if (!comparePlayer(player)) {
                    if (myTeam.length <= 10) {
                        if (!comparePosition(player)) {
                            if (myTeam.push(player)) {
                                return cb(myTeam);
                            }
                        } else {
                            alert("Cannot add player. That position is already full.")
                        }
                    } else {
                        alert("Team is full. Hand-egg-ball only allows 11 players, sorry!")
                    }
                } else {
                    alert("Cannot add the same player twice. Nice try, cheater!")
                }

            }
        });
    }

    function comparePlayer(player) {
        for (var i = 0; i < myTeam.length; i++) {
            var element = myTeam[i];
            if (player.id == element.id) {
                return true
            }
        }
        return false
    }
    function comparePosition(player) {
        for (var i = 0; i < myTeam.length; i++) {
            var element = myTeam[i];
            if (player.position == element.position) {
                return true
            }

        }
        return false
    }


    this.removeFromTeam = function removeFromTeam(removeId, draw) {

        var removeMember = myTeam.find(function (char) {
            return char.id == removeId
        })

        var index = myTeam.indexOf(removeMember)

        myTeam.splice(index, 1)

        draw(myTeam)
    };

    loadPlayersData(); //call the function above every time we create a new service
} 