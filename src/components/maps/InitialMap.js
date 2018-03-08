import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios'

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfowindow: false,
            activeMarker: [],
            selectedPlace: [],
        }
        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.onMapClicked = this.onMapClicked.bind(this)
    }
    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }
    click() {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${'986 freedom pt way'},+${'bluffdale'},+${'UT'}&key=${process.env.REACT_APP_GOOGLE_KEY}`).then(res=>{
            console.log(res.data)
        })
    }

    render() {


        return (
            <div>
                <button onClick={()=>this.click()}></button>
            <Map
                google={this.props.google}
                // style={style}
                initialCenter={{
                    lat: 40.2338,
                    lng: -111.6585
                    // address: '986 freedom pt way bluffdale UT 84065'
                }}
                zoom={14}
                onClick={this.onMapClicked}
                onDragend={this.centerMoved}
            >

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'}
                    position={{
                        lat: 40.478666,
                        lng: -111.919680
                    }} />
                <Marker onClick={this.onMarkerClick}
                    name={'Current location'}
                    position={{
                        lat: 40.542324,
                        lng: -111.8869744
                        // address: '986 freedom point way Bluffdale, UT 84065'
                    }} />
                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY
})(MapContainer)

