select 
	title
, sport
, game_description
, competition_level
, month_created
, year_created
, hour_created
, day_created
, latitude
, longitude
, address
 from games
join subscriptions on games.game_id = subscriptions.game_id
join users on users.id = subscriptions.user_id
where users.id = $1


