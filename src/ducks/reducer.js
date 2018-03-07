import axios from 'axios';


const initialState = {
    user:{},
    subscriptions:{},
    games:{},
}

const GET_USER = 'GET_USER'
const GET_GAMES = 'GET_GAMES'




export function getUser(){
    let userData = axios.get('/auth/me').then(res=>{
        return res.data
    })
    return {
        type: GET_USER,
        payload: userData
    }
}
export function getAllGames(){
    let gameData = axios.get('/api/games').then(res=>{
        return res.data
    })
    return{
        type: GET_GAMES,
        payload: gameData
    }
}


export default function reducer(state=initialState,action){
    switch(action.type){
        case GET_USER + '_FULFILLED':
            return Object.assign({},state,{user: action.payload})
        case GET_GAMES + '_FULFILLED':
            return Object.assign({},state, {games: action.payload})
        default: return state;
    }
}