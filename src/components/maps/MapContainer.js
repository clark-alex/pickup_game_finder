import InitialMap from './InitialMap.js'

import {
    default as React,
    Component,
} from 'react';

import {withGoogleMap, GoogleMap, InfoWindow, Marker} from 'react-google-maps';
import initialMap from './InitialMap.js';

export default class MainMap extends Component {
    constructor(props) {
        super(props);
        
    }
    render(){
        return (
            <div style={{height: "100%"}}>
            MAP
            <initialMap
            containerElement={
                <div style={{ height : '100vh', width: 'auto'}}/>
            }
            mapElement={
                <div style = {{height: '100vh', width: '100vw'}}/>
            }
            onMapLoad={this.handleMapLoad}

            />
            </div>
        )
    }
    
}