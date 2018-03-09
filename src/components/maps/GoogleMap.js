import React, { Component } from 'react';
import axios from 'axios';

class GoogleMap extends Component {
    constructor(props) {
        super(props);
        
    }
    componentWillMount(){
        axios.get(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap`)
        .then(res=>console.log('res.data',res.data))
    }
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default GoogleMap;