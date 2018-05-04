function PlayersController() {
    var playersService = new PlayersService(drawPlayers)

    function drawPlayers(players) {
        var template = "<h1>Pool of Playas</h1>"
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            template += `
            <div class="card align-items-center">
                <img src="${player.photo}" alt="">
                <div class="card-body align-items-center">
                    <h1>${player.firstname} ${player.lastname}</h1>
                    <h2>Position: ${player.position}</h2>
                    <h2>Team: ${player.pro_team}</h2>
                </div>
            </div>
            `
        }
        document.getElementById("playersList").innerHTML = template
    }











}