
module.exports = {

    newGame: (req,res)=>{
        const db = req.app.get('db')
        const {creator_id, title, sport, date_of_game, game_description,  competition_level, month_created,  year_created, hour_created, day_created, street_address, city, address_state, zip, latitude, longitude, address  }=req.body;
        console.log(req.body)
        
        db.create_game([creator_id, title, sport, date_of_game, game_description,  competition_level, month_created,  year_created, hour_created, day_created, street_address, city, address_state, zip, latitude, longitude, address ])
        .then(()=>res.status(200).send())
        .catch((e)=>res.status(500).send(e))
            
        
    },
    // newGame: (req,res)=>{
    //     const db = req.app.get('db')
       
    //     console.log(req.body);
        
    //     db.games.insert([req.body], function(err, res){});
        
            
        
    // },
   
    getAllGames: (req,res)=>{
        const db = req.app.get('db')

        db.get_games([])
        .then((games)=>res.status(200).send(games))
        .catch(()=>res.status(500).send())

    },
    subscribe: (req,res)=>{
        const db = req.app.get('db')
        const {user_id,game_id}=req.body
        
        db.add_subscription ([user_id,game_id])
        .then(()=>res.status(200).send())
        .catch(()=>res.status(500).send())

    },
    getCurrentSubscriptions: (req,res)=>{
        const db = req.app.get('db')
        console.log(req.params.id);
        
        
        db.current_subscriptions([req.params.id])
        .then((subscriptions)=>res.status(200).send(subscriptions))
        .catch(()=>res.status(500).send())
    }

}