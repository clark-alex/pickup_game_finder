import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentSubscriptions, getUser, getAllGames, deleteSubscription, updateActiveGame } from '../../ducks/reducer'
import axios from 'axios';
import './Games.css'
import Socket from '../Sockets/Sockets'
class Games extends Component {
    constructor(props) {
        super(props);

    }
    deleteSubs(id) {
        axios.delete(`/api/deletesub/${id}`)
            .then((res) => console.log(res.data))
    }
    deleteGame(id) {
        axios.delete(`/api/deleteCreatedGame/${id}`)
            .then((res) => console.log(res.data))
        // res.data===200?alert('Successfully Deleted'):alert('try again later'))
    }

    render() {
        console.log('games props', this.props);
        let currentGameId = this.props.match.params.gameid;
        console.log(currentGameId);

        let subId = this.props.subscriptions.filter(x => +x.game_id === +currentGameId)

        let mappedGames = this.props.games.map((x, k) => +currentGameId === +x.game_id
            ?
            <div key={k}>
                <div>
                    {
                        +this.props.user.id === +x.creator_id
                            ?
                            <div>ADMIN</div>
                            :
                            ''
                    }
                    <h1 className={'gameTitle'}>{x.title}</h1>
                    {`Last updated ${x.month_created}/${x.day_created}/${x.year_created}`}
                    <div>
                        <h1>Location</h1>
                        {x.address}
                    </div>
                    <div>
                        <h1>Game Time</h1>
                        {x.date_of_game}
                    </div>
                    <div>
                        <h1>Game info</h1>
                        {x.game_description}
                        <h4>Sport</h4>
                        {x.sport}
                        <h4>Skill level of play</h4>
                        {x.competition_level}
                    </div>
                </div>
                <div>
                    {
                        +this.props.user.id === +x.creator_id
                            ?

                            <Link to='/CreateGame'><button className={'button subButton'} onClick={() => this.props.updateActiveGame(x.game_id)} >edit</button></Link>
                            :
                            <Link to={'/profile'}><button className={'button subButton'} onClick={() => this.deleteSubs(subId[0].subscribed_id)}>Delete</button></Link>
                    }
                    {
                        +this.props.user.id === +x.creator_id
                            ?

                            <Link to='/profile'><button className={'button subButton'} onClick={() => this.deleteGame(x.game_id)} >Delete</button></Link>
                            :
                            ''
                    }
                    {/* {

                    +this.props.user.id === +x.creator_id
                        ?

                        <Link to={'/profile'}><button className={'button subButton'} onClick={() => this.deleteSubs(subId[0].subscribed_id)}>Delete</button></Link>
                        :
                        ''
                } */}
                </div>
            </div>
            :
            console.log('you have failed', x.game_id)
        )
        return (
            <div className='gameContainer'>
                <div className={'SubHeader'}>
                    <Link to='/profile'><button className={'button subButton'}><i class="glyphicon glyphicon-chevron-left"></i></button></Link>
                    <img className={'subLogoImg'} src={require('../images/LogoMakr_63KbJl.png')} />

                    <a href={process.env.REACT_APP_LOGOUT}><button className={'button subButton'}>logout</button></a>


                </div>
                <div className='gameInfo'>
                    {mappedGames}
                </div>
                <div className='gameInfo'>
                    <Socket currentGameId={currentGameId} userId={this.props.user.id} userInfo={this.props.user} />
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        subscriptions: state.subscriptions,
        games: state.games,
        activeGame: state.activeGame
    }
}

export default connect(mapStateToProps, { updateActiveGame, getCurrentSubscriptions, getUser, getAllGames, deleteSubscription })(Games);