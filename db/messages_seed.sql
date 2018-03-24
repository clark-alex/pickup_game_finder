create table messages (
	message_id serial primary key,
	socket_user_id int,
	room_id int,
	message varchar(1000)
	)