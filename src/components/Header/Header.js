import React, { Component } from 'react';
import './Header.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import {  filterCurrentWeek, toggleFilter, filterGames, getUser, getAllGames, updateGames, getCurrentSubscriptions, updateActiveGame } from '../../ducks/reducer';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuClicked: false,
            filterClicked: false,
            sport: {
                s1: 'Soccer',
                s2: 'Ultimate',
                s3: 'Rugby'
            },
            timeFilter: []


        }
    }
    componentWillMount() {
        this.props.getUser();
        this.props.getAllGames();
    }
    // componentWillReceiveProps(){
    //     console.log(this.props.user.id);
    //     this.props.getCurrentSubscriptions(this.props.user.id);

    // }
    subscribe(x, y) {
        let uId = x;
        let gId = y;
        axios.post('/api/subscribe', { user_id: x, game_id: y }).then(res => res.data)
    }
    getSubs() {
        console.log('userid', this.props.user.id);
        let id = this.props.user.id;
        this.props.getCurrentSubscriptions(id);
    }
    handleClick() {
        this.setState({
            menuClicked: !this.state.menuClicked,
            filterClicked: false


        })
    }
    handleFilterClick() {
        this.setState({
            filterClicked: !this.state.filterClicked
        })
    }
    filterProps() {
        console.log(this.props.games.filter((x) => x.sport === this.refs.sport.value))
    }
    updateState(val) {
        console.log(typeof val);
        
        console.log('val of one week', val);
        let newTime = Date.parse(new Date())
        console.log( 'current date', (newTime))
       var x =  newTime + +val;
       console.log('value of current + one week',x);
       
        this.props.filterCurrentWeek(this.props.games, x)
        
    }

    render() {
        // console.log(this.state);
        console.log('header props', this.props);
        // console.log('x', this.props.games);
        // console.log('y', this.refs.sport.value );



        let h1Style = { padding: '20px', transition: '3s' }
        let mappedGames = this.props.games.map((e, k) => {
            return (
                <div key={k}>{`${e.title}; ${e.sport}; ${e.dateofgame}; ${e.streetaddress}`} <button onClick={() => this.subscribe(this.props.user.id, e.game_id)}>subscribe</button></div>
            )
        }

        )
        return (
            <div>
                <div className='mainHeader'>
                    {/* <div className={'button subButton darker headerButtons headerButton'}> */}
                    <div className={'button subButton'}>
                        <div className={'paraSaan'} onClick={() => this.handleClick()}>
                            <div className={this.state.menuClicked ? 'ham one' : 'ham'}></div>
                            <div className={this.state.menuClicked ? 'ham two' : 'ham'}></div>
                            <div className={this.state.menuClicked ? 'ham three' : 'ham'}></div>
                        </div>
                    </div>
                    <div>
                        <img className={'subLogoImg'} src={require('../images/LogoMakr_63KbJl.png')}/>
                    </div>
                    <div >
                    <Link to='/profile'><button className={'button subButton darker'}><i class="glyphicon glyphicon-user"></i></button></Link>                    </div>
                    {/* <Link to='/profile'><button className={'button subButton darker'}><i class=" glyphicons glyphicons-soccer-ball"></i></button></Link>                    </div> */}
                </div>
                <div className={this.state.menuClicked ? 'dashboardMenu  slide2' : 'dashboardMenu'}>
                    <Link to='/CreateGame'><div onClick={() => this.props.updateActiveGame(-1)} className='h3 taas' >Create a game</div></Link>
                    <div className='h3' onClick={() => this.handleFilterClick()}> Filter </div>
                    {/* <div className='underline1'></div> */}
                    <div className={this.state.filterClicked ? 'filterMenu filterSlide' : 'filterMenu'}>
                        <div className={'salita'}>Filter by Sport</div>
                        <select className={'selectButton'} ref='sport' name='sport' onChange={() => this.props.filterGames(this.props.games, this.refs.sport.value)} >
                            <option >--select--</option>
                            <option >Soccer</option>
                            <option>BasketBall</option>
                            <option>Ultimate</option>
                            <option>Rugby</option>
                            <option>Volleyball</option>
                            <option>Soft Ball</option>

                        </select>
                        <div className={'salita'}>filter by time of game</div>
                        <select className={'selectButton'} onChange={(e) => this.updateState(e.target.value)}>
                            <option>--select--</option>
                            <option value={604800000}>One Week</option>
                            <option value={1209600000}>Two Weeks</option>
                            <option value={2419200000}>One Month</option>
                        </select>
                        <div>
                        <button className={'filterButton   '} onClick={() => this.props.toggleFilter(true)}>apply</button>
                        <button className={' filterButton'} onClick={() => this.props.toggleFilter(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        games: state.games,
        subscriptions: state.subscriptions,
        activeGame: state.activeGame,
        filteredGames: state.filteredGames,
        filterToggle: state.filterToggle,
    }
}

export default connect(mapStateToProps, { filterCurrentWeek, toggleFilter, filterGames, updateGames, updateActiveGame, getUser, getAllGames, getCurrentSubscriptions })(Header);