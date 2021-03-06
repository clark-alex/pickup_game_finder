import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getUser, getAllGames,updateActiveGame, updateGames, getCurrentSubscriptions } from '../../ducks/reducer';
import axios from 'axios'
import MapContainer from '../maps/InitialMap'
import GoogleMap from '../maps/GoogleMap'
import Header from '../Header/Header'
import './Dashboard.css'
import { loadavg } from 'os';



class Dashboard extends Component {
    constructor(props) {
        super(props);
    

    
    }
    componentWillMount() {

       this.props.getAllGames();
        this.props.updateActiveGame(0);



    }
    subscribe(x, y) {
        let uId = x;
        let gId = y;
        axios.post('/api/subscribe', { user_id: x, game_id: y }).then(res => res.data)
    }
    getSubs() {
        console.log('userid', this.props.user.id);
        let id = this.props.user.id;
        this.props.getCurrentSubscriptions(id);
    }
   
    render() {

        console.log('userid', this.props);
        // console.log(this.props.games);
        // console.log(this.state);

        // let mappedGames = this.props.games.map((e, k) => {
        //     return (
        //         <div key={k}>{`${e.title}; ${e.sport}; ${e.dateofgame}; ${e.streetaddress}`} <button onClick={()=>this.subscribe(this.props.user.id,e.game_id)}>subscribe</button></div>
        //     )
        // }

        // )

        return (

            <div className='dashboard'>
                <Header />
                <div dashboard>

                    {/* <Link to='/profile'><button onClick={() => this.getSubs()}>My games</button></Link>
                <Link to='/CreateGame'><button>Create a game</button></Link> */}

                    {/* {mappedGames} */}
                    <div >
                        <MapContainer />
                    </div>
                    {/* <GoogleMap/> */}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        games: state.games,
        subscriptions: state.subscriptions
    }
}
export default connect(mapStateToProps, { updateGames, getUser, getAllGames, getCurrentSubscriptions, updateActiveGame })(Dashboard)