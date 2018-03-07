import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getUser, getAllGames } from '../../ducks/reducer';



class Dashboard extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        this.props.getUser();
        // this.props.getAllGames();

    }

    render() {
        console.log(this.props.games[0]);
        let mappedGames = this.props.games.map((e, k) => {
            console.log(e.sport)
            return (
                <div key={k}>{`${e.title}; ${e.sport}; ${e.dateofgame}; ${e.streetaddress}`}</div>
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
export default connect(mapStateToProps, { getUser, getAllGames })(Dashboard)