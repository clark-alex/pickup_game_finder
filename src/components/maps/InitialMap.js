import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios'
import connect from 'react-redux'
import { getAllGames } from '../../ducks/reducer'

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            showingInfoWindow: false,
            activeMarker: 'empty',
            selectedPlace: {},
        }
        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.onMapClicked = this.onMapClicked.bind(this)
    }
    componentDidMount() {
        axios.get('/api/games').then(res => this.setState({ games: res.data }))
    }

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            showingInfoWindow: true
        });
        this.state.games.map((e) => e.address === this.state.selectedPlace.name ? this.setState({ activeMarker: e }) : 'false')
        // if(this.state.games.address === this.state.selectedPlace.name){
        //     console.log()
        // }



    }

    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }




    render() {
        console.log(this.state.activeMarker);
        console.log(this.state.selectedPlace.name)
        console.log('map state', this.state);
        let style = {top:'80px'}
        let showingWindow = this.state.showingInfowindow;
        let actMarker = this.state.activeMarker
        let mappedMarker = this.state.games.map((e, k) => {
            return (

                <Marker onClick={this.onMarkerClick}
                    name={e.address}
                    position={{
                        lat: e.latitude,
                        lng: e.longitude
                    }} />
            )
        })
        let {activeMarker} = this.state
    //     if (activeMarker === undefined){
    //         return 'select Marker'
    //     }else{
    // let mappedGames = <div>{`${activeMarker.title}; ${activeMarker.sport}; ${activeMarker.date_of_game}; ${activeMarker.address}`} </div> }

        
        return (
            // <div>
            //     {
            //         activeMarker==='empty'
            //         ?
            //         'select Marker'
            //         :
            //         <div>{`${activeMarker.title}; ${activeMarker.sport}; ${activeMarker.date_of_game}; ${activeMarker.address}`} <button>Subscribe</button> </div>

            //     }
                <Map
                    google={this.props.google}
                    style={style}
                    initialCenter={{
                        lat: 40.2338,
                        lng: -111.6585
                        // address: '986 freedom pt way bluffdale UT 84065'
                    }}
                    zoom={14}
                    onClick={this.onMapClicked}
                // onDragend={this.centerMoved}
                >
                    {mappedMarker}


                    <InfoWindow onClose={this.onInfoWindowClose}>
                        {console.log('active', this.state.activeMarker)}
                        {console.log(this.state.showingInfoWindow)}
                        {/* marker={this.state.activeMarker} */}
                        visible={true}
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            // </div>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY
})(MapContainer)

