import React,{Component} from 'react'
import {Link} from 'react-router-dom'


class CreateGame extends Component{
    render(){
        return(
            <div>
                CreateGame
                <br/>
                <Link to='/dashboard'><button>Dashboard</button></Link>
            </div>
        )
    }
}
export default CreateGame