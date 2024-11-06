const Game = require("../models/Game");

module.exports.getAllGames = (req, res) => {

	return Game.find({})
	.then(games => res.status(200).send({ games }))
	.catch(err => res.status(500).send({ error: "Error in Find", details: err}))

}

module.exports.addGame = (req, res) => {
    let newGame = new Game({
        name: req.body.name,
        description: req.body.description
    });

    return newGame.save()
        .then((savedGame) => res.status(201).send({ Game: savedGame }))
        .catch(err => res.status(500).send({ error: "Error in Save", details: err }))  
}


module.exports.updateGameStatus = (req, res) => {
    let updatedGame = {
        status: 'completed'
    }

    return Game.findByIdAndUpdate(req.params.gameId, updatedGame, { new: true })
        .then((game) => res.status(200).send({ 
            message: 'Game updated successfully', 
            updatedGame: game 
        }))
        .catch(err => res.status(500).send({ error: "Error in Updating", details: err}))
}



module.exports.deleteGame = (req, res) => {

	return Game.deleteOne({ _id: req.params.gameId })
	.then((deleteStatus) => res.status(200).send({ 
    	message: 'Game deleted successfully'
    }))
	.catch(err => res.status(500).send({ error: "Error in Saving", details: err}))  
}
