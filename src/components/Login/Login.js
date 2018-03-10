import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, getAllGames} from '../../ducks/reducer'
import './Login.css'


class Login extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        this.props.getAllGames();
    }

    render() {
        return (
            <div className = 'login' >
                <Link to='/dashboard' className='auth0'>Sportify</Link>
                <a href={process.env.REACT_APP_LOGIN} className='auth0'>Login</a>
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