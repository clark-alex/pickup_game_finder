import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, getAllGames } from '../../ducks/reducer'
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
            <div className='login' >
                <div className={'auth0'}>
                    <div>Sportify</div>
                    <a className={'loginButton'} href={process.env.REACT_APP_LOGIN}>Login/Register</a>
                </div>
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
export default connect(mapStateToProps, { getAllGames, getUser })(Login)