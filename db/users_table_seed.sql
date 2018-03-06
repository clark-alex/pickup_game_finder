create Table users (
	Id serial primary key,
	auth_id text,
	user_name varchar(20),
	email varchar(50),
	profile_pic  varchar(150),
)