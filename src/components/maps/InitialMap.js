import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios'
import connect from 'react-redux'
import { getAllGames } from '../../ducks/reducer'
import './InitialMap.css'

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            user: [],
            joinGameButton: false,
            showingInfoWindow: false,
            activeMarker: 'empty',
            selectedPlace: {},
        }
        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.onMapClicked = this.onMapClicked.bind(this)
    }
    componentDidMount() {
        axios.get(`/api/creatorinfo/`)
        .then(res => this.setState({games:res.data}))
        axios.get('/auth/me').then(res=>this.setState({user:res.data}))
    }
   
    subscribe(x, y) {
        let uId = x;
        let gId = y;
        axios.post('/api/subscribe', { user_id: x, game_id: y }).then(res => res.data)
        this.setState({joinGameButton:!this.state.joinGameButton})
    }

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            showingInfoWindow: true
        });
        this.state.games.map((e) => e.address === this.state.selectedPlace.name ? this.setState({ activeMarker: e }) : 'false')

    }
    joinClick(){
        this.setState({joinGameButton:!this.state.joinGameButton})
    }

    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                activeMarker: 'empty',
                showingInfoWindow: false,
                joinGameButton:false,
            })
        }
    }




    render() {        
        console.log(this.state.activeMarker);
        console.log(this.state.selectedPlace.name)
        console.log('map state', this.state);
        const {user, activeMarker, joinGameButton}=this.state;
        let style = {top:'79px'}

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
        
        return (
            <div classname='mapMainBody'>
            <div className=
                {
                    activeMarker==='empty'
                    ?
                    'window'
                    :
                    'window slide'
                }>
                  <div className={'title'}>
                    <h1>{activeMarker.title}</h1>
                    {/* <button onClick={()=>this.onMapClicked()}>X</button></h1> */}
                    {`Last updated ${activeMarker.month_created}/${activeMarker.day_created}/${activeMarker.year_created}`}
                    </div>
                    <div className={'lineBreak'}></div>
                    <div className={'infoSection'}>
                    <h3>Contact Info</h3>
                    <h5>{activeMarker.username}</h5>
                    <h5>{activeMarker.email}</h5>
                    <div className={'lineBreak'}></div>
                    <h3>Location</h3>
                    <h5>{activeMarker.address}</h5>
                    <div className={'lineBreak'}></div>
                    <h3>Game Information</h3>
                    <h5>{activeMarker.game_description}</h5>
                    <button onClick={()=>this.subscribe(user.id,activeMarker.game_id)} className={ !joinGameButton?'joinGame': 'joinGame clickJoin'} >Join Game</button>
                    <br/>
                  </div>
                </div>
                <Map
                    google={this.props.google}
                    style={style}
                    initialCenter={{
                        lat: 40.2338,
                        lng: -111.6585
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

