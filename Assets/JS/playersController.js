function PlayersController() {

    var playersService = new PlayersService(ready)

    function ready() {
        document.getElementById('spinner').innerHTML = ''
    }

    this.search = function search(e) {
        e.preventDefault()
        var query = e.target.query.value
        var results = playersService.search(query)
        drawPlayers(results)
    }



    function drawPlayers(players) {
        var template = "<h1>Pool of Playas</h1>"
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            template += `
            <div class="card align-items-center playerCard">
                <img src="${player.photo}" alt="">
                <div class="card-body align-items-center">
                    <h1>${player.fullname}</h1>
                    <h2>Position: ${player.position}</h2>
                    <h2>Team: ${player.pro_team}</h2>
                    <button onclick="app.controllers.playersController.addToMyTeam(${player.id})">Add to my team</button>
                </div>
            </div>
            `
        }
        document.getElementById("playersList").innerHTML = template
    }

    function drawMyTeam(players) {
        var template = "<h1>The Squad</h1>"
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            template += `
                <div class="card align-items-center playerCard">
                    <img src="${player.photo}" alt="">
                    <div class="card-body align-items-center">
                        <h1>${player.fullname}</h1>
                        <h2>Position: ${player.position}</h2>
                        <h2>Team: ${player.pro_team}</h2>
                        <button onclick="app.controllers.playersController.removeFromTeam(${player.id})">Remove from Team</button>
                    </div>
                </div>
                `
        }
        document.getElementById("myTeam").innerHTML = template
    }


    this.addToMyTeam = function addToMyTeam(id) {
        playersService.addToMyTeam(id, drawMyTeam);
    }

    this.removeFromTeam = function removeFromTeam(id) {
        playersService.removeFromTeam(id, drawMyTeam)
    }







}