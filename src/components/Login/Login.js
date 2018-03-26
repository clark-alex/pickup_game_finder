import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, getAllGames, getLocation } from '../../ducks/reducer'
import './Login.css'


class Login extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        this.props.getAllGames();
        this.props.getLocation();
    }

    render() {
        console.log('login props', this.props);

        return (
            <div className='login' >
                <div className={'auth0'}>
                    <img className={'loginLogo'} src={require('../images/LogoMakr_63KbJl.png')} />

                    <a className={'loginButton'} href={process.env.REACT_APP_LOGIN}>Login</a>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        games: state.games,
        userLocation: state.userLocation
    }
}
export default connect(mapStateToProps, { getAllGames, getUser, getLocation })(Login)