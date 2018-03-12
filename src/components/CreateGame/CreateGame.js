import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../../ducks/reducer'
import { connect } from 'react-redux'
import axios from 'axios'
import './CreateGame.css'


class CreateGame extends Component {
    constructor(props) {
        super(props);

        this.state={
            latitude:-1,
            longitude:-1,
            address:'',
            saveClick: false,
        }
    }
    sendTodatabase() {
        console.log('refs', this.refs)
        let dateObject = new Date()
        var obj = {
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
            street_address: '' ,
            city: '',
            address_state: '',
            zip: '',
            latitude:this.state.latitude,
            longitude:this.state.longitude,
            address: this.state.address

        }
        console.log(obj);

        axios.post('/api/newgame', obj).then(res => {
            console.log('status',res.status)
            res.status===200?alert('Successfully Submitted!'):('oops. Try Again')
        })

    }
    geocoder() {
        let fullAddress = this.refs.address.value;
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${process.env.REACT_APP_GOOGLE_KEY}`).then(res => {
            this.setState({latitude: res.data.results[0].geometry.location.lat,
                           longitude: res.data.results[0].geometry.location.lng,
                           address: res.data.results[0].formatted_address
                              })
                           console.log(res.data.results[0].formatted_address)
        })
        this.setState({
            saveClick:!this.state.saveClick
        })
    }
    handleSaveClick(){
        this.setState({
            saveClick:!this.state.saveClick
        })
    }
    render() {
        const {saveClick}= this.state;
        // console.log('id', this.props.user.id);
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
                    <input className={'createInput'} ref='title' name='title' placeholder="Ex. Provo Park Pick-up Soccer" />
                    <h4>Sport</h4>
                    <select className={'selectButton'} ref='sport' name='sport'>
                        <option>--select--</option>
                        <option >Soccer</option>
                        <option>BasketBall</option>
                        <option>Ultimate</option>
                        <option>Rugby</option>
                        <option>Volleyball</option>
                        <option>Soft Ball</option>

                    </select>
                    <h4>date and time of game</h4>
                    <input className={'createInput'} ref='dateOfGame' name='dateOfGame' type='datetime-local' />
                    <h4>location</h4>
                    <input className={'createInput'} ref='address'name='address' placeholder='full address'/>
                    <h4>Skill Level</h4>
                    <select className={'selectButton'} ref='competitionLevel' name='competitionLevel'>
                        <option>--select--</option>
                        <option>Begginner</option>
                        <option>Intermediate</option>
                        <option>Competative</option>
                        <option>All</option>

                    </select>
                    <h4>Description </h4>
                    <input className={'createInput'} ref='gameDescription' name='gameDescription' placeholder="enter game description" />
                    <br />
                    {
                        saveClick===false
                        ?
                        <button className={'saveSubmit'} onClick={() => this.geocoder()}>Save</button>
                        :
                        
                    <button className={'saveSubmit saveClick'} onClick={() => this.sendTodatabase()}>submit</button>
                    }
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, { getUser })(CreateGame)