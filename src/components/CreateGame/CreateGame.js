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
            day_created: -1,


        }
    }
    // componentDidMount(){
    //     this.props.activeGame[0]
    //     ?
    //     this.state({
    //         title: this.props.activeGame[0].title,
    //         location: this.props.activeGame[0].address,
    //         description: this.props.activeGame[0].game_description
    //     })
    //     :
    //     ''
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
                console.log('edit status', res.status)
                res.status === 200 ? alert('Successfully Submitted!') : ('oops. Try Again')
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
    cancelButton(){
        this.setState({
            saveClick: !this.state.saveClick

        })
    }
    handleInputClick(name){
        this.setState({[name]:!name})
    }
    render() {
        const { saveClick, aGameDetails } = this.state;
        console.log('props', this.props);
        console.log('state', this.state)
        // console.log(this.refs)

        return (
            <div>

                <div className={'SubHeader'}>
                    <Link to='/dashboard'><button className={'button subButton darker'}><i class="glyphicon glyphicon-home"></i></button></Link>
                    <img className={'subLogoImg'} src={require('../images/LogoMakr_63KbJl.png')} />

                    <a href='http://localhost:3021/auth/logout'><button className={'button subButton darker'}>logout</button></a>


                </div>
                <div className='createGameInputFields'>
                    <h4 className={'subTitle'}>Title of Game</h4>
                    {!this.props.activeGame[0]
                        ?
                        <input className={'createInput'} ref='title' name='title' placeholder="Ex. Provo Park Pick-up Soccer" />
                        :
                        <input className={'createInput'} ref='title' name='title' placeholder={this.props.activeGame[0].title} />

                    }
                    <h4 className={'subTitle'}>Sport</h4>
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
                    <h4 className={'subTitle'}>Date and Time</h4>
                    {
                        !this.props.activeGame[0]
                            ?
                            <input className={'selectButton dateAndTime'} ref='dateOfGame' name='dateOfGame' type='datetime-local' />
                            :
                            <input className={'selectButton dateAndTime'} ref='dateOfGame' name='dateOfGame' type='datetime-local' defaultValue={this.props.activeGame[0].date_of_game} />
                    }
                    <h4 className={'subTitle'}>Location</h4>
                    {
                        !this.props.activeGame[0]
                            ?
                            < input className={'createInput'} ref='address' name='address' placeholder='full address' />
                            :
                            < input className={'createInput'} ref='address' name='address' placeholder={this.props.activeGame[0].address} />

                    }
                    <h4 className={'subTitle'}>Skill Level</h4>
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
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Competative</option>
                                <option>All</option>

                            </select>
                    }
                    <h4 className={'subTitle'}>Description </h4>
                    {
                        !this.props.activeGame[0]
                            ?
                            <input className={'createInput'} ref='gameDescription' name='gameDescription' placeholder="enter game description" />
                            :
                            <input className={'createInput'} ref='gameDescription' name='gameDescription' placeholder={this.props.activeGame[0].game_description} />

                    }
                    <br />
                    <div className={'buttonContainer'}>
                    {
                        !this.props.activeGame[0]
                            ?

                            saveClick === false
                                ?
                                <button className={'saveSubmit button subButton darker'} onClick={() => this.geocoder()}>Save</button>
                                :
                                <Link to ={'/dashboard'}><button className={'saveSubmit saveClick button subButton '} onClick={() => this.sendTodatabase()}>submit</button></Link>
                            :
                            saveClick === false
                                ?
                                <button className={'saveSubmit button subButton darker'} onClick={() => this.geocoder()}>Save</button>
                                :
                                <Link to ={'/dashboard'}><button className={'saveSubmit saveClick button subButton'} onClick={() => this.editGame()}>Edit</button></Link>

                    }
                    {
                       
                       saveClick === false
                       ?
                       ''
                       :
                       <button onClick={()=>this.cancelButton()} className={'saveSubmit saveClick button subButton'}>Cancel</button>
                   
                    }
                    </div>
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