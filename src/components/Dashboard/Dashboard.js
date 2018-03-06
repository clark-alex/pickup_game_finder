import React,{Component} from 'react'
import {Link} from 'react-router-dom'


class Dashboard extends Component{
    render(){
        return(
            <div>
                
            
                <Link to='/profile'><button>My games</button></Link>
                <br/>
                <Link to='/CreateGame'><button>Create a game</button></Link>
                <br/>

            </div>
        )
    }
}
export default Dashboard