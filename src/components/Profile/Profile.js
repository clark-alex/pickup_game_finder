import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentSubscriptions, getUser, getAllGames, deleteSubscription } from '../../ducks/reducer'
import './Profile.css'
import axios from 'axios'



class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameExpandClick: false,
            subExpand: false,
        }
        this.deleteSubs = this.deleteSubs.bind(this)
    }
    componentDidMount() {
        this.props.getUser();
        console.log('users', this.props.user);
        console.log('id', this.props.user.id);
        let id = this.props.user.id;
        this.props.getCurrentSubscriptions(id);
    }
    handleExpansionClick() {
        this.setState({
            gameExpandClick: !this.state.gameExpandClick,
        })
    }
    handleSubsClick() {
        this.setState({
            subExpand: !this.state.subExpand,
        })
    }

    deleteSubs(id){
        axios.delete(`/api/delete/${id}`)
        .then((res)=>console.log(res.data))
    }


    render() {
        console.log('profile props', this.props);
        const { gameExpandClick, subExpand } = this.state
        let mappedSubs = this.props.subscriptions.map((e, k) => {
            return (
                <div key={k} className={
                        !subExpand
                        ?
                        'subscribed '
                        :
                        'subscribed gamesExpand'
                }>
                    <h1>{e.title}</h1>
                    {/* <button onClick={()=>this.onMapClicked()}>X</button></h1> */}
                    {`Last updated ${e.month_created}/${e.day_created}/${e.year_created}`}
                    <div className={'lineBreak'}></div>
                    <div className={'infoSection'}>
                        <h3>Contact Info</h3>
                        <h5>{e.username}</h5>
                        <h5>{e.email}</h5>
                        <div className={'lineBreak'}></div>
                        <h3>Location</h3>
                        <h5>{e.address}</h5>
                        <div className={'lineBreak'}></div>
                        <h3>Game Information</h3>
                        <h5>{e.game_description}</h5>
                    </div>                    
                    <button onClick={()=>this.deleteSubs(e.subscribed_id)}>DELETE</button>
                </div>
            )
        }


        )
        console.log(mappedSubs);
        let createdGames = this.props.games.map((e, k) => this.props.user.id === e.creator_id ?
            <div>
                <div key={k} className={
                    !gameExpandClick
                        ?
                        'subscribed createdGames'
                        :
                        'subscribed createdGames gamesExpand'
                } >
                    <h1>{e.title}</h1>
                    {`Last updated ${e.month_created}/${e.day_created}/${e.year_created}`}
                    <div className={'lineBreak'}></div>
                    <div className={'infoSection'}>
                        <h3>Contact Info</h3>
                        <h5>{e.username}</h5>
                        <h5>{e.email}</h5>
                        <div className={'lineBreak'}></div>
                        <h3>Location</h3>
                        <h5>{e.address}</h5>
                        <div className={'lineBreak'}></div>
                        <h3>Game Information</h3>
                        <h5>{e.game_description}</h5>
                    </div>
                </div>
            </div>
            :
            "")

        return (
            <div>
                <div>
                    Profile
                <br />
                    <Link to='/dashboard'><button>Dashboard</button></Link>
                </div>
                <div className='subsContainer'>
                    <h3>Created Games</h3>
                    <button className={'expandButton'} onClick={() => this.handleExpansionClick()}>Expand</button>
                    {createdGames}
                    <h3>Subscribed Games</h3>
                    <button className={'expandButton'} onClick={() => this.handleSubsClick()}>Expand</button>
                    {mappedSubs}
                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        subscriptions: state.subscriptions,
        games: state.games
    }
}
export default connect(mapStateToProps, { getCurrentSubscriptions, getUser, getAllGames, deleteSubscription })(Profile)