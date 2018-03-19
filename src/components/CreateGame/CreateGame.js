import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getUser, getCurrentSubscriptions } from '../../ducks/reducer'
import { connect } from 'react-redux'
import axios from 'axios'
import './CreateGame.css'


class CreateGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: -1,
            longitude: -1,
            address: '',
            saveClick: false,
            aGameDetails: [],
            title: '',
            sport: '',
            date_of_game: '',
            game_description: '',
            competition_level: '',
            month_created: -1,
            year_created: -1,
            hour_created: -1,
            day_created: -1

        }
    }
    // componentWillReceiveProps(){
    //     this.props.activeGame===-1
    //     ?
    //     console.log(null)
    //     :
    //     axios.get(`/api/getActiveGame/${this.props.activeGame}`)
    //     .then((res)=>this.setState({aGameDetails:res.data}))
    // }
    // componentWillMount(){
    //     this.props.activeGame===-1
    //     ?
    //     console.log(null)
    //     :
    //     axios.get(`/api/getActiveGame/${this.props.activeGame}`)
    //     .then((res)=>this.setState({aGameDetails:res.data}))
    // }
    // componentWillMount() {
    //     let dateObject = new Date();
    //     this.setState({
    //             title: this.props.activeGame[0].title,
    //             sport: this.props.activeGame[0].sport,
    //             date_of_game: this.props.activeGame[0].date_of_game,
    //             game_description: this.props.activeGame[0].game_description,
    //             competition_level:this.props.activeGame[0].competition_level,
    //             month_created: (dateObject.getMonth()) + 1,
    //             year_created: dateObject.getFullYear(),
    //             hour_created: dateObject.getHours(),
    //             day_created: dateObject.getDate(),
    //         })
    // }
    sendTodatabase() {
        console.log('refs', this.refs)
        let dateObject = new Date()
        let obj = {
            creator_id: this.props.user.id,
            title: this.refs.title.value,
            sport: this.refs.sport.value,
            date_of_game: this.refs.dateOfGame.value,
            game_description: this.refs.gameDescription.value,
            competition_level: this.refs.competitionLevel.value,
            month_created: (dateObject.getMonth()) + 1,
            year_created: dateObject.getFullYear(),
            hour_created: dateObject.getHours(),
            day_created: dateObject.getDate(),
            street_address: '',
            city: '',
            address_state: '',
            zip: '',
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            address: this.state.address

        }
        console.log(obj);

        axios.post('/api/newgame', obj).then(res => {
            console.log('status', res.status)
            res.status === 200 ? alert('Successfully Submitted!') : ('oops. Try Again')
        })

    }
    editGame() {
        console.log('refs', this.refs)
        let dateObject = new Date()
        let id = this.props.activeGame[0].game_id;
        let obj = {
            // creator_id: this.props.user.id,
            title: this.refs.title.value,
            sport: this.refs.sport.value,
            date_of_game: this.refs.dateOfGame.value,
            game_description: this.refs.gameDescription.value,
            competition_level: this.refs.competitionLevel.value,
            month_created: (dateObject.getMonth()) + 1,
            year_created: dateObject.getFullYear(),
            hour_created: dateObject.getHours(),
            day_created: dateObject.getDate(),
            street_address: '',
            city: '',
            address_state: '',
            zip: '',
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            address: this.state.address

        }
        console.log(obj);
        axios.put(`/api/edit/${id}`, obj)
            .then(res => {
                console.log('edit status', res.status);
            })

    }
    geocoder() {
        let fullAddress = this.refs.address.value;
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${process.env.REACT_APP_GOOGLE_KEY}`).then(res => {
            this.setState({
                latitude: res.data.results[0].geometry.location.lat,
                longitude: res.data.results[0].geometry.location.lng,
                address: res.data.results[0].formatted_address
            })
            console.log(res.data.results[0].formatted_address)
        })
        this.setState({
            saveClick: !this.state.saveClick
        })
    }
    editField() {

    }
    render() {
        const { saveClick, aGameDetails } = this.state;
        console.log('props', this.props);
        console.log('state', this.state)
        // console.log(this.refs)

        return (
            <div>

                CreateGame
                <br />
                <Link to='/dashboard'><button>Dashboard</button></Link>
                <a href='http://localhost:3021/auth/logout'><button>logout</button></a>
                <div className='createGameInputFields'>
                    <h4>Title of Game</h4>
                    {!this.props.activeGame[0]
                        ?
                        <input className={'createInput'} ref='title' name='title' placeholder="Ex. Provo Park Pick-up Soccer" />
                        :
                        <input className={'createInput'} ref='title' name='title' placeholder={this.props.activeGame[0].title} />

                    }
                    <h4>Sport</h4>
                    {
                        !this.props.activeGame[0]
                            ?

                            <select className={'selectButton'} ref='sport' name='sport'>
                                <option>--select--</option>
                                <option >Soccer</option>
                                <option>BasketBall</option>
                                <option>Ultimate</option>
                                <option>Rugby</option>
                                <option>Volleyball</option>
                                <option>Soft Ball</option>
                            </select>
                            :
                            <select className={'selectButton'} ref='sport' name='sport' >
                                <option>{this.props.activeGame[0].sport}</option>
                                <option >Soccer</option>
                                <option>BasketBall</option>
                                <option>Ultimate</option>
                                <option>Rugby</option>
                                <option>Volleyball</option>
                                <option>Soft Ball</option>

                            </select>
                    }
                    <h4>date and time of game</h4>
                    {
                        !this.props.activeGame[0]
                            ?
                            <input className={'createInput'} ref='dateOfGame' name='dateOfGame' type='datetime-local' />
                            :
                            <input className={'createInput'} ref='dateOfGame' name='dateOfGame' type='datetime-local' defaultValue={this.props.activeGame[0].date_of_game} />
                    }
                    <h4>location</h4>
                    {
                        !this.props.activeGame[0]
                            ?
                            < input className={'createInput'} ref='address' name='address' placeholder='full address' />
                            :
                            < input className={'createInput'} ref='address' name='address' placeholder={this.props.activeGame[0].address} />

                    }
                    <h4>Skill Level</h4>
                    {
                        !this.props.activeGame[0]
                            ?
                            <select className={'selectButton'} ref='competitionLevel' name='competitionLevel'>
                                <option>--select--</option>
                                <option>Begginner</option>
                                <option>Intermediate</option>
                                <option>Competative</option>
                                <option>All</option>

                            </select>
                            :
                            <select className={'selectButton'} ref='competitionLevel' name='competitionLevel' >
                                <option>{this.props.activeGame[0].competition_level}</option>
                                <option>Begginner</option>
                                <option>Intermediate</option>
                                <option>Competative</option>
                                <option>All</option>

                            </select>
                    }
                    <h4>Description </h4>
                    {
                        !this.props.activeGame[0]
                            ?
                            <input className={'createInput'} ref='gameDescription' name='gameDescription' placeholder="enter game description" />
                            :
                            <input className={'createInput'} ref='gameDescription' name='gameDescription' placeholder={this.props.activeGame[0].game_description} />

                    }
                    <br />
                    {
                        !this.props.activeGame[0]
                            ?

                            saveClick === false
                                ?
                                <button className={'saveSubmit'} onClick={() => this.geocoder()}>Save</button>
                                :
                                <button className={'saveSubmit saveClick'} onClick={() => this.sendTodatabase()}>submit</button>
                            :
                            saveClick === false
                                ?
                                <button className={'saveSubmit'} onClick={() => this.geocoder()}>Save</button>
                                :
                                <button className={'saveSubmit saveClick'} onClick={() => this.editGame()}>Edit</button>

                    }

                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        activeGame: state.activeGame,
        subscriptions: state.subscriptions,
    }
}
export default connect(mapStateToProps, { getUser })(CreateGame)