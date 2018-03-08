select title, sport, dateofgame, game_description, competitionlevel, monthcreated, yearcreated, hourcreated, daycreated, streetaddress, city, address_state, zip, users.id from games
join subscriptions on games.game_id = subscriptions.game_id
join users on users.id = subscriptions.user_id
where users.id = $1