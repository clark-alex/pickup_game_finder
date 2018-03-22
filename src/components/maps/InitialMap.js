import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios'
import {connect} from 'react-redux'
import { getLocation,  filterGames, getUser, getAllGames,updateActiveGame, updateGames, getCurrentSubscriptions } from '../../ducks/reducer';
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
            location:'',
            lat: 40.2338,
            lng: -111.6585,
            address:'',
            splitTime:'',
            splitDate:'',
        }
        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.onMapClicked = this.onMapClicked.bind(this)
    }

    
    // componentWillMount(){
    //     let id = this.props.user.id;
    //     console.log('id',id);
        
        
    //     this.props.getCurrentSubscriptions(this.props.user.id);

    // }
    
    // componentDidMount() {
    //     axios.get(`/api/creatorinfo/`)
    //     .then(res => this.setState({games:res.data}))
        // axios.get('/auth/me').then(res=>this.setState({user:res.data}))
    // }
    // componentWillMount(){
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         this.setState( {location:position.coords});
    //       });
    // }
    // componentDidMount(){
    //     var options = {
    //         // enableHighAccuracy: true,
    //         timeout: 2000000,
    //         maximumAge: 0
    //       };
    //       function success(pos) {
    //         var crd = pos.coords;
    //         let latitude = pos.coords.latitude;
    //         let longitude = pos.coords.longitude;
            
    //         this.setState({
    //             latitude: latitude,
    //             longitude: longitude

    //         })
    //         // this.setState({location:crd})
    //         console.log('latnlong',latitude,longitude );
    //         // console.log(`Latitude : ${crd.latitude}`);
    //         // console.log(`Longitude: ${crd.longitude}`);
    //         // console.log(`More or less ${crd.accuracy} meters.`);
    //         // this.setState( {location:crd});
    //       }
          
    //       function error(err) {
    //         console.warn(`ERROR(${err.code}): ${err.message}`);
    //       }
          
    //       navigator.geolocation.getCurrentPosition(success, error, options);
    // }
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
        this.props.games.map((e) => e.address === this.state.selectedPlace.name ? this.setState({ activeMarker: e }) : 'false');
        this.props.getCurrentSubscriptions(this.props.user.id);
        if(this.state.activeMarker!=='empty'){
            let time= this.state.activeMarker.date_of_game
            let splitTime = time.split('')
            let date=splitTime.splice(0,10)
            time = splitTime.splice(1)
            date=date.join('')
            time=time.join('')
            console.log('time', time)
            console.log('date', date)
            this.setState({
                splitTime:time,
                splitDate:date,
                lat: this.state.activeMarker.latitude,
                lng: this.state.activeMarker.longitude
            })
        }


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


    handleChange(e){
        this.setState({location:e.target.value})
    }
    search(){
        let address = this.state.location
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_KEY}`).then(res => {
            this.setState({
                lat: res.data.results[0].geometry.location.lat,
                lng: res.data.results[0].geometry.location.lng,
                address: res.data.results[0].formatted_address

            })
            console.log(res.data.results[0].formatted_address)
        })
        
    
    }

    render() {        
        console.log(this.state.activeMarker);
        console.log('map state', this.state)
        console.log('map props', this.props);
        const {user, activeMarker, joinGameButton}=this.state;

        
        let lat = this.state.lat;
        let lng = this.state.lng;
        let style = {top:'79px'}
        let currentSubs = this.props.subscriptions.filter(x=>x.game_id===activeMarker.game_id)
        let showingWindow = this.state.showingInfowindow;
        let actMarker = this.state.activeMarker
        let mappedMarker = this.props.filterToggle ? this.props.filteredGames.map((e, k) => {
            return (

                <Marker onClick={this.onMarkerClick}
                    name={e.address}
                    position={{
                        lat: e.latitude,
                        lng: e.longitude
                    }} 
                    />
            )
        })
        :
        this.props.games.map((e, k) => {
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
                  <div>
                  {
                      +this.props.user.id === +activeMarker.creator_id
                      ?
                      <div>ADMIN</div>
                      :
                      ''  
                    }
                    <h1 className={'title'}>{activeMarker.title}</h1>
                    {/* <button onClick={()=>this.onMapClicked()}>X</button></h1> */}
                    {`Last updated ${activeMarker.month_created}/${activeMarker.day_created}/${activeMarker.year_created}`}
                    </div>
                    <div className={'lineBreak'}></div>
                    <div className={'infoSection'}>
                    <h4 className={'subTitle'}>Contact Info</h4>
                    <h5>{activeMarker.username}</h5>
                    <h5>{activeMarker.email}</h5>
                    <div className={'lineBreak'}></div>
                    <h4 className={'subTitle'}>Location</h4>
                    <h5>{activeMarker.address}</h5>
                    <h4 className={'subTitle'}>Time of Game</h4>
                    {/* {fix time} */}
                    <h5>
                    Date: {this.state.splitDate}
                    </h5>
                    <h5>
                    Time: {this.state.splitTime}
                    </h5>
                    <div className={'lineBreak'}></div>
                    <h4 className={'subTitle'}>Game Information</h4>
                    <h5>{activeMarker.game_description}</h5>
                    {
                     +this.props.user.id === +activeMarker.creator_id
                     ?
                     <button className={'saveSubmit saveClick button subButton '}>ADMIN</button>
                     :
                    currentSubs[0]
                    ?
                    <button className={'button subButton darker'}>Joined</button>
                    :
                    !joinGameButton
                    ?
                    <button onClick={()=>this.subscribe(this.props.user.id,activeMarker.game_id)} className={'button subButton darker'}>Join</button>
                    :
                    <button className={'button subButton darker'}>Joined</button>
                    // { !joinGameButton?'button': 'joinGame clickJoin'}
                    }
                    <br/>
                  </div>
                </div>
                {console.log({lat: lat, lng: lng})}
                <Map
                    google={this.props.google}
                    style={style}
                    center={{
                        lat: lat,
                        lng: lng

                    }}
                    
                
                    zoom={10}
                    onClick={this.onMapClicked}
                // onDragend={this.centerMoved}
                >
                    {mappedMarker}


                    <InfoWindow onClose={this.onInfoWindowClose}>
                        {/* {console.log('active', this.state.activeMarker)}
                        {console.log(this.state.showingInfoWindow)} */}
                        {/* marker={this.state.activeMarker} */}
                        visible={true}
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
                <div className={'searchBar'} >
                <input onChange={e=>this.handleChange(e)} placeholder={'Search by City or Zip'}/>
                <button className={'searchButton'} onClick={()=>this.search()}><i class="glyphicon glyphicon-search"></i></button>
                </div>
            // </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        games: state.games,
        subscriptions: state.subscriptions,
        filteredGames: state.filteredGames,
        filterToggle: state.filterToggle,
        userLocation: state.userLocation


    }
}

const WrappedContainer = GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY
})(MapContainer) 
export default connect( mapStateToProps, {getLocation, filterGames, getUser, getAllGames,updateActiveGame, updateGames, getCurrentSubscriptions }) (WrappedContainer) 

