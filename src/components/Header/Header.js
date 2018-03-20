import React, { Component } from 'react';
import './Header.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import { filterOneMonth, filterCurrentWeek, filterTwoWeeks, toggleFilter, filterGames, getUser, getAllGames, updateGames, getCurrentSubscriptions, updateActiveGame } from '../../ducks/reducer';

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
        console.log('val', val);
        let newTime = val
        console.log(newTime)
       let newDate =  Date.parse(new Date()) + newTime
       console.log('current date',newDate);
       
        this.props.filterCurrentWeek(this.props.games, newDate)
        
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
                    <div className={'iconButton'}>
                        <div onClick={() => this.handleClick()}>
                            <div className={this.state.menuClicked ? 'ham one' : 'ham'}></div>
                            <div className={this.state.menuClicked ? 'ham two' : 'ham'}></div>
                            <div className={this.state.menuClicked ? 'ham three' : 'ham'}></div>
                        </div>
                    </div>
                    <div>
                        <h1 className={'logo'}>Sportify</h1>
                    </div>
                    <div className='iconButton'>
                        <Link to='/profile'><span className={'user'} onClick={() => this.getSubs()}><i class="glyphicon glyphicon-user"></i></span></Link>
                    </div>
                </div>
                <div className='underline'>
                </div>
                <div className={this.state.menuClicked ? 'dashboardMenu  slide2' : 'dashboardMenu'}>
                    <Link to='/CreateGame'><h3 onClick={() => this.props.updateActiveGame(-1)} className='h3' >Create a game</h3></Link>
                    <div className='underline1'></div>
                    <div className={'h3'} onClick={() => this.handleFilterClick()}> Filter </div>
                    <div className='underline1'></div>
                    <div className={this.state.filterClicked ? 'filterMenu filterSlide' : 'filterMenu'}>
                        <h3>Filter by Sport</h3>
                        <select className={'selectButton'} ref='sport' name='sport' onChange={() => this.props.filterGames(this.props.games, this.refs.sport.value)} >
                            <option >--select--</option>
                            <option >Soccer</option>
                            <option>BasketBall</option>
                            <option>Ultimate</option>
                            <option>Rugby</option>
                            <option>Volleyball</option>
                            <option>Soft Ball</option>

                        </select>
                        <h3>filter by time of game</h3>
                        <select className={'selectButton'} onChange={(e) => this.updateState(e.target.value)}>
                            <option>--select--</option>
                            <option value={604800000}>One Week</option>
                            <option value={1209600000}>Two Weeks</option>
                            <option value={2419200000}>One Month</option>
                        </select>
                        <div>
                        <button className={'button'} onClick={() => this.props.toggleFilter(true)}>apply</button>
                        <button className={'button'} onClick={() => this.props.toggleFilter(false)}>Cancel</button>
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

export default connect(mapStateToProps, { filterTwoWeeks, filterOneMonth, filterCurrentWeek, toggleFilter, filterGames, updateGames, updateActiveGame, getUser, getAllGames, getCurrentSubscriptions })(Header);