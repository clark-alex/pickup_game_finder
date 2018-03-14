update games set (title, sport, date_of_game, game_description, competition_level, month_created, year_created, hour_created, day_created,latitude,longitude, address)
=
($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
where game_id=$13