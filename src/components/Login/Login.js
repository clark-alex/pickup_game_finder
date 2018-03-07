import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, getAllGames} from '../../ducks/reducer'


class Login extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        this.props.getAllGames();
    }

    render() {
        return (
            <div>
                <Link to='/dashboard'><button>Login</button></Link>
                <a href={process.env.REACT_APP_LOGIN}><button>Auth0</button></a>

            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        user: state.user,
        games: state.games
    }
}
export default connect(mapStateToProps, {getAllGames, getUser })(Login)