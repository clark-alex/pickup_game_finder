import axios from 'axios';
import { combineReducers } from '../../../../../../../Library/Caches/typescript/2.6/node_modules/redux';


const initialState = {
    user: {},
    subscriptions: [],
    games: [],
    activeGame: [0],
    filteredGames: [0],
    filterToggle: false,
}

const GET_USER = 'GET_USER'
const GET_GAMES = 'GET_GAMES'
const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION'
const GET_USER_SUBSCRIPTION = 'GET_USER_SUBSCRIPTION'
const UPDATE_GAMES = 'UPDATE_GAMES'
const GET_CREATED_GAMES = 'GET_CREATED_GAMES'
const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION'
const UPDATE_ACTIVE_GAME = 'UPDATE_ACTIVE_GAME'
const FILTER_GAMES = 'FILTER_GAMES'
const TOGGLE_FILTER = 'TOGGLE_FILTER'
const FILTER_CURRENT_WEEK = 'FILTER_CURRENT_WEEK'
const FILTER_TWO_WEEKS = 'FILTER_TWO_WEEKS'
const FILTER_ONE_MONTH = 'FILTER_ONE_MONTH'








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
        .then(res => res.data)
    return {
        type: GET_USER_SUBSCRIPTION,
        payload: getSubs
    }
}
export function deleteSubscription(subscribed_id) {
    let deleteSub = axios.delete(`/api/deletesub/${subscribed_id}`)
        .then(res => console.log(res.data))
    return {
        type: DELETE_SUBSCRIPTION,
        payload: deleteSub
    }
}
export function filterGames(obj, sport) {
    let newArr = obj.filter((obj) => obj.sport === sport)
    console.log('red filter log', newArr, obj, sport);



    return {
        type: FILTER_GAMES,
        payload: newArr
    }
}
export function filterCurrentWeek(obj,time) {
    // let currentDate = (Date.parse(new Date()) + time)
    // console.log('current date', currentDate);
    console.log('should be date',Date.parse(new Date()) + 604800000 );
    
    let currentWeek = obj.filter((x) => Date.parse(x.date_of_game) <= time)
    console.log('current week', currentWeek);
    
    return {
        type: FILTER_CURRENT_WEEK,
        payload: currentWeek
    }
}
// 604800000
export function filterTwoWeeks(obj) {
    let currentDate = Date.parse(new Date()) + 1209600000
    let currentWeek = obj.filter((x) => Date.parse(x.date_of_game) <= currentDate)
    return {
        type: FILTER_TWO_WEEKS,
        payload: currentWeek
    }
}
export function filterOneMonth(obj) {
    let currentDate = Date.parse(new Date()) + 2419200000
    let currentWeek = obj.filter((x) => Date.parse(x.date_of_game) <= currentDate)
    return {
        type: FILTER_ONE_MONTH,
        payload: currentWeek
    }
}
// export function updateActiveGame(activeGame) {
//     return {
//         type: UPDATE_ACTIVE_GAME,
//         payload: activeGame
//     }
// }
export function updateActiveGame(aGameId) {
    let activeGame = axios.get(`/api/getActiveGame/${aGameId}`)
        .then((res) => res.data)
    return {
        type: UPDATE_ACTIVE_GAME,
        payload: activeGame
    }
}
export function toggleFilter(x) {
    return {
        type: TOGGLE_FILTER,
        payload: x
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
            return Object.assign({}, state, { subscriptions: action.payload })
        case UPDATE_ACTIVE_GAME + '_FULFILLED':
            return Object.assign({}, state, { activeGame: action.payload })
        case FILTER_GAMES:
            return Object.assign({}, state, { filteredGames: action.payload })
        case TOGGLE_FILTER:
            return Object.assign({}, state, { filterToggle: action.payload })
        case FILTER_CURRENT_WEEK:
            return Object.assign({}, state, { filteredGames: action.payload })
        case FILTER_TWO_WEEKS:
            return Object.assign({}, state, { filteredGames: action.payload })
        case FILTER_ONE_MONTH:
            return Object.assign({}, state, { filteredGames: action.payload })

        default: return state;
    }
}