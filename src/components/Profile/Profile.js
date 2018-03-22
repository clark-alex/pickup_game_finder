import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentSubscriptions, getUser, getAllGames, deleteSubscription, updateActiveGame } from '../../ducks/reducer'
import './Profile.css'
import axios from 'axios'



class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameExpandClick: false,
            subExpand: false,
            users:[]
        }
        this.deleteSubs = this.deleteSubs.bind(this)
        this.handleExpansionClick = this.handleExpansionClick.bind(this)
        this.handleSubsClick= this.handleSubsClick.bind(this)
    }
    componentWillMount() {
        this.props.getUser();
        console.log('users', this.props.user);
        console.log('id', this.props.user.id);
        let id = this.props.user.id;
        this.props.getCurrentSubscriptions(id);
        this.setState({id:this.props.id})

    }
    // componentDidMount(){
    //     axios.get('/auth/me').then(res=>this.setState({users:res.data}))
    //     let id = this.state.users.id
    //     axios.get(`/api/currentsubscriptions/${id}`)
    // }
    componentWillReceiveProps(){
        let id = this.props.user.id;
        this.props.getCurrentSubscriptions(this.props.user.id);
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
        axios.delete(`/api/deletesub/${id}`)
        .then((res)=>console.log(res.data))
    }
    editSubs(id){
        this.props.updateActiveGame(id)
    }
    



    render() {
        // console.log('profile props', this.props);
        const { gameExpandClick, subExpand } = this.state
        let mappedSubs = this.props.subscriptions.map((e, k) => {
            return (
                
                <div key={k} className={'subscribed'}>
                <Link to={`/games/${e.game_id}`}>
                    <h1>{e.title}</h1>
                </Link>
                    {`Last updated ${e.month_created}/${e.day_created}/${e.year_created}`}
                    {/* <button className={'deleteButton'} onClick={()=>this.deleteSubs(e.subscribed_id)}>DELETE</button> */}
                </div>

            )
        }


        )
        let createdGames = this.props.games.map((e, k) => this.props.user.id === e.creator_id ?
            <div onClick={()=>this.handleExpansionClick()}>
                <div key={k} className={
                    !gameExpandClick
                        ?
                        'subscribed createdGames'
                        :
                        'subscribed createdGames gamesExpand'
                } >
                
        <Link to={`/games/${e.game_id}`}>
                    <h1>{e.title}</h1>
            </Link>
                    {`Last updated ${e.month_created}/${e.day_created}/${e.year_created}`}

                </div>
            </div>
            :
            "")

        return (
            <div onClick={()=>this.handleSubsClick()}>
                <div className='subsContainer'>
                <div className={'SubHeader'}>
                    <Link to='/dashboard'><button className={'button subButton'}><i class="glyphicon glyphicon-chevron-left"></i></button></Link>
                    <img className={'subLogoImg'} src={require('../images/LogoMakr_63KbJl.png')}/>
                    <a href='http://localhost:3021/auth/logout'><button className={'button subButton'}>logout</button></a>


                </div>
                    <h3>Subscribed Games</h3>
                    {mappedSubs}
                    <h3>Created Games</h3>
                    {createdGames}
                </div>

            </div>
        )
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
export default connect(mapStateToProps, { updateActiveGame, getCurrentSubscriptions, getUser, getAllGames, deleteSubscription })(Profile)