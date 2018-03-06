INSERT INTO users
(auth_id,username,email,profile_pic)
VALUES
($1, $2, $3, $4)
RETURNING *;