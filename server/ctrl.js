module.exports = {

    newGame: (req,res)=>{
        const db = req.app.get('db')
        const {creatorId, title, sport, dateOfGame, gameDescription,  competitionLevel, monthCreated,  yearCreated, hourCreated, dateCreated, streetAddress, city, addressState, zip }=req.body;
        
        db.create_game([creatorId, title, sport, dateOfGame, gameDescription,  competitionLevel, monthCreated,  yearCreated, hourCreated, dateCreated, streetAddress, city, addressState, zip])
        .then(()=>res.status(200).send())
        .catch((e)=>res.status(500).send(e))
            
        
    },
    getAllGames: (req,res)=>{
        const db = req.app.get('db')

        db.get_games([])
        .then((games)=>res.status(200).send(games))
        .catch(()=>res.status(500).send())

    }

}