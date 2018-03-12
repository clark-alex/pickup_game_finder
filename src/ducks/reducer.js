import axios from 'axios';


const initialState = {
    user: {},
    subscriptions: [],
    games: [],
}

const GET_USER = 'GET_USER'
const GET_GAMES = 'GET_GAMES'
const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION'
const GET_USER_SUBSCRIPTION = 'GET_USER_SUBSCRIPTION'
const UPDATE_GAMES = 'UPDATE_GAMES'
const GET_CREATED_GAMES = 'GET_CREATED_GAMES'
const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION'






export function getUser() {
    let userData = axios.get('/auth/me').then(res => {
        return res.data
    })
    return {
        type: GET_USER,
        payload: userData
    }
}
export function getAllGames() {
    let gameData = axios.get('/api/games').then(res => {
        return res.data
    })
    return {
        type: GET_GAMES,
        payload: gameData
    }
}
export function updateGames(games) {
    return {
        type: UPDATE_GAMES,
        payload: games
    }
}
export function addSubscription(userId, GameId) {
    let subscribe = axios.post('/api/subscribe', { userId, GameId })
}
export function getCurrentSubscriptions(userId) {
    let getSubs = axios.get(`/api/currentsubscriptions/${userId}`)
    .then(res=>res.data)
    return{
        type: GET_USER_SUBSCRIPTION,
        payload: getSubs
    }
}
export function deleteSubscription(subscribed_id) {
    let deleteSub = axios.delete(`/api/deletesub/${subscribed_id}`)
    .then(res=>console.log(res.data))
    return{
        type: DELETE_SUBSCRIPTION,
        payload: deleteSub
    }
}



export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload })
        case GET_GAMES + '_FULFILLED':
            return Object.assign({}, state, { games: action.payload })
        case UPDATE_GAMES:
            return Object.assign({}, state, { games: action.payload })
        case GET_USER_SUBSCRIPTION + '_FULFILLED':
            return Object.assign({}, state, { subscriptions: action.payload })
        case DELETE_SUBSCRIPTION + '_FULFILLED':
            return Object.assign({}, state, { subscriptions: action.payload})
        default: return state;
    }
}