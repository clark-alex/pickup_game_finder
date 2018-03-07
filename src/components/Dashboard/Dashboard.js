import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getUser, getAllGames, updateGames } from '../../ducks/reducer';
import axios from 'axios'



class Dashboard extends Component {
    constructor(props) {
        super(props);


    }
    componentWillMount() {
        this.props.getUser();
        this.props.getAllGames();
    }
    subscribe(x,y){
        axios.post('./api/subscribe', {x,y}).then(res=> res.data)
    }

    render() {
        console.log(this.props);
        console.log('userid',this.props.user.id);
        console.log(this.props.games);
        console.log(this.state);
        
        let mappedGames = this.props.games.map((e, k) => {
            console.log('e',e.game_id)
            return (
                <div key={k}>{`${e.title}; ${e.sport}; ${e.dateofgame}; ${e.streetaddress}`} <button onClick={(x,y)=>this.subscribe(this.props.user.id,e.game_id)}>subscribe</button></div>
            )
        }

        )

        return (
            <div>


                <Link to='/profile'><button>My games</button></Link>
                <br />
                <Link to='/CreateGame'><button>Create a game</button></Link>
                <br />
                games
                {mappedGames}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        games: state.games
    }
}
export default connect(mapStateToProps, {updateGames, getUser, getAllGames })(Dashboard)