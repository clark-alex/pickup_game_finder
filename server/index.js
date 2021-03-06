require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , ctrl = require('./ctrl')
    , socket = require('socket.io');


const {
    CONNECTION_STRING,
    SERVER_PORT,
    SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    SUCCESSREDIRECT,
    FAILUREREDIRECT
} = process.env;

const app = express()
    , io = socket(app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`)));
app.use(express.static(`${__dirname}/../build`));
app.use(bodyParser.json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

// -----socket------
io.on('connection', socket => {
    console.log('User Connected');
    socket.emit("welcome", { userID: socket.id, roomID: socket.room })
    // console.log('socket', socket.rooms);

    socket.on('message sent', function (data) {
        data.user = this.id
        console.log('message sent', data);
        const db = app.get('db')
        db.add_message([data.userName, data.room, data.message, data.time_stamp])
        socket.broadcast.emit('message dispatched', data);
    })
    socket.on('join room', data => {
        console.log(data.room);
        socket.join(data.room);
        io.to(data.room).emit('room joined', data.room);
    })
    socket.on('leave room', (data)=> {
        console.log('leave');
        
        socket.disconnect()

    })
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    })
});

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid email  profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db')
    db.find_user([profile.id]).then(users => {

        if (!users[0]) {
            db.create_user([profile.id, profile.displayName, profile._json.email, profile.picture, profile.location]).then(res => {
                done(null, res[0].id);
            })
        } else {
            done(null, users[0].id)
        }
    })
}))
passport.serializeUser((id, done) => {
    done(null, id)
})
passport.deserializeUser((id, done) => {
    app.get('db').find_session_user([id]).then(user => {
        done(null, user[0])
    })

})

// AUTH ENDPOINTS

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: SUCCESSREDIRECT,
    failureRedirect: FAILUREREDIRECT
}))

app.get('/auth/me', (req, res) => {
    if (req.user) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('NNNNNOPE!')
    }
})
app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(FAILUREREDIRECT)
})

// API ENDPOINTS

app.post('/api/newgame', ctrl.newGame)
app.get('/api/games', ctrl.getAllGames)
app.post('/api/subscribe', ctrl.subscribe)
app.get('/api/currentsubscriptions/:id', ctrl.getCurrentSubscriptions)
app.get('/api/creatorinfo', ctrl.getCreatorInfo)
app.delete('/api/deletesub/:id', ctrl.deleteSubscription)
app.delete('/api/deleteCreatedGame/:id', ctrl.deleteGame)
app.get('/api/getActiveGame/:id', ctrl.getActiveGame)
app.put('/api/edit/:id', ctrl.edit)
app.get('/api/messages/:id', ctrl.getMessages)
app.get('/api/users', ctrl.getAllUsers)


