import React, { Component } from 'react';
import {Link} from 'react-router-dom';



class Profile extends Component {
    constructor(props) {
        super(props);
        
    }
    
    
    render() {
        console.log();
        
        return (
            <div>
                Profile
                <br/>
                <Link to='/dashboard'><button>Dashboard</button></Link>
            </div>
        );
    }
}
export default Profile;