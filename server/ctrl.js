
module.exports = {

    newGame: (req,res)=>{
        const db = req.app.get('db')
        const {creator_id, title, sport, date_of_game, game_description,  competition_level, month_created,  year_created, hour_created, day_created, street_address, city, address_state, zip, latitude, longitude, address  }=req.body;
        console.log(req.body)
        
        db.create_game([creator_id, title, sport, date_of_game, game_description,  competition_level, month_created,  year_created, hour_created, day_created, street_address, city, address_state, zip, latitude, longitude, address ])
        .then(()=>res.status(200).send())
        .catch((e)=>res.status(500).send(e))
            
        
    },
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
        
        
        db.current_subscriptions([req.params.id])
        .then((subscriptions)=>res.status(200).send(subscriptions))
        .catch(()=>res.status(500).send())
    },
    getCreatorInfo: (req,res)=>{
        const db = req.app.get('db')
        
        db.creator_info([])
        .then((info)=>res.status(200).send(info))
        .catch(()=>res.status(500).send())
    },
    deleteSubscription: (req,res)=>{
        const db = req.app.get('db')        

        
        db.delete_subscription([req.params.id])
        .then((x)=>res.status(200).send(x))
        .catch(()=>res.status(500).send())
    },
    deleteGame: (req,res)=>{
        const db = req.app.get('db')
        console.log(req.params.id);
        
        db.delete_created_game([req.params.id])
        .then((x)=>res.status(200).send(x))
        .catch(()=>res.status(500).send())
    },
    getActiveGame: (req,res)=>{
        const db = req.app.get('db')
        console.log(req.params.id);
        

        db.get_active_games([req.params.id])
        .then((x)=>res.status(200).send(x))
        .catch(()=>res.status(500).send())

    },
    edit: (req,res)=>{
        const db = req.app.get('db')

        console.log(req.params.id);
        console.log(req.body);
        
        
        db.games.update({game_id:req.params.id},req.body)

        .then(()=>res.status(200).send())
        .catch(()=>res.status(500).send())

    },
    getMessages: (req,res)=>{
        const db = req.app.get('db')
        
        db.get_messages([req.params.id])
        .then((x)=>res.status(200).send(x))
        .catch(()=>res.status(500).send())
    },
    getAllUsers: (req,res)=>{
        const db = req.app.get('db')

        db.get_all_users()
        .then((x)=>res.status(200).send(x))
        .catch(()=>res.status(500).send())
    }
    



}