import React, {Component} from 'react'
import {Link} from 'react-router-dom'


class Login extends Component{
    render(){
        return(
            <div>
                <Link to='/dashboard'><button>Login</button></Link>
                <a href={ process.env.REACT_APP_LOGIN }><button>Auth0</button></a>

            </div>
        )
    }
}
export default Login