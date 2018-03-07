
Table games (
	game_Id serial primary key,
	creator_Id integer REFERENCES user(id), 
	Title varchar(50),
	Sport varchar(50),
	dateOfGame integer,
	dateCreated integer,
	Location varchar(100),
	Description varchar(1000)
)
--   4 different inputs street city state zip