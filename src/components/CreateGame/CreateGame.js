import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../../ducks/reducer'
import { connect } from 'react-redux'
import axios from 'axios'


class CreateGame extends Component {
    constructor(props) {
        super(props);

        this.state={
            latitude:-1,
            longitude:-1,
            formattedAddress:''
        }
    }
    sendTodatabase() {
        console.log('refs', this.refs)
        let dateObject = new Date()
        var obj = {
            creatorId: this.props.user.id,
            title: this.refs.title.value,
            sport: this.refs.sport.value,
            dateOfGame: this.refs.dateOfGame.value,
            gameDescription: this.refs.gameDescription.value,
            competitionLevel: this.refs.competitionLevel.value,
            monthCreated: (dateObject.getMonth()) + 1,
            yearCreated: dateObject.getFullYear(),
            hourCreated: dateObject.getHours(),
            dateCreated: dateObject.getDate(),
            streetAddress: this.refs.streetAddress.value,
            city: this.refs.city.value,
            addressState: this.refs.addressState.value,
            zip: this.refs.zip.value,
            // latitude:this.state.latitude,
            // longitude:this.state.longitude
            // address: this.refs.address.value

        }
        console.log(obj);

        axios.post('/api/newgame', obj).then(res => {
            console.log(res.data[0])
        })

    }
    geocoder() {
        let fullAddress = this.refs.address.value;
        // axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${streetAddress},+${city},+${addressState}&key=${process.env.REACT_APP_GOOGLE_KEY}`).then(res => {
        //     this.setState({latitude: res.data.results[0].geometry.location.lat,
        //                    longitude: res.data.results[0].geometry.location.lng  })
        // })
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${process.env.REACT_APP_GOOGLE_KEY}`).then(res => {
            this.setState({latitude: res.data.results[0].geometry.location.lat,
                           longitude: res.data.results[0].geometry.location.lng,
                            formattedAddress: res.data.results[0].formatted_address
                              })
                           console.log(res.data)
        })
    }
    render() {
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
                    <input ref='title' name='title' placeholder="ex. Soccer at the park" />
                    <h4>Sport</h4>
                    <select ref='sport' name='sport'>
                        <option>--select--</option>
                        <option >Soccer</option>
                        <option>BasketBall</option>
                        <option>Ultimate</option>
                        <option>Rugby</option>
                        <option>Volleyball</option>
                        <option>Soft Ball</option>

                    </select>
                    <h4>date and time of game</h4>
                    <input ref='dateOfGame' name='dateOfGame' type='datetime-local' />
                    <h4>location</h4>
                    <input ref='streetAddress' name='streetAddress' placeholder="Street Address" />
                    <input ref='city' name='city' placeholder="City" />
                    <select ref='addressState' name='addressState'>
                        <option>Alabama</option>
                        <option>Alaska</option>
                        <option>Arizona</option>
                        <option>Arkansas</option>
                        <option>California</option>
                        <option>Colorado</option>
                        <option>Connecticut</option>
                        <option>Delaware</option>
                        <option>Florida</option>
                        <option>Georgia</option>
                        <option>Hawaii</option>
                        <option>Idaho</option>
                        <option>Illinois</option>
                        <option>Indiana</option>
                        <option>Iowa</option>
                        <option>Kansas</option>
                        <option>Kentucky</option>
                        <option>Louisiana</option>
                        <option>Maine</option>
                        <option>Maryland</option>
                        <option>Massachusetts</option>
                        <option>Michigan</option>
                        <option>Minnesota</option>
                        <option>Mississippi</option>
                        <option>Missouri</option>
                        <option>Montana</option>
                        <option>Nebraska</option>
                        <option>Nevada</option>
                        <option>New Hampshire</option>
                        <option>New Jersey</option>
                        <option>New Mexico</option>
                        <option>New York</option>
                        <option>North Carolina</option>
                        <option>North Dakota</option>
                        <option>Ohio</option>
                        <option>Oklahoma</option>
                        <option>Oregon</option>
                        <option>Pennsylvania</option>
                        <option>Rhode Island</option>
                        <option>South Carolina</option>
                        <option>South Dakota</option>
                        <option>Tennessee</option>
                        <option>Texas</option>
                        <option>Utah</option>
                        <option>Vermont</option>
                        <option>Virginia</option>
                        <option>Washington</option>
                        <option>West Virginia</option>
                        <option>Wisconsin</option>
                        <option>Wyoming</option>
                    </select>
                    <input ref='zip' name='zip' placeholder="Zip" />
                    <h4>full address</h4>
                    <input ref='address'name='address' placeholder='full address'/>
                    <h4>Skill Level</h4>
                    <select ref='competitionLevel' name='competitionLevel'>
                        <option>--select--</option>
                        <option>Begginner</option>
                        <option>Intermediate</option>
                        <option>Competative</option>
                        <option>All</option>

                    </select>
                    <h4>Description </h4>
                    <input ref='gameDescription' name='gameDescription' placeholder="enter game description" />
                    <br />
                    <button onClick={() => this.geocoder()}>Save</button>
                    <button onClick={() => this.sendTodatabase()}>submit</button>
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