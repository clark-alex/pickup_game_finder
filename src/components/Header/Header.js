import React, { Component } from 'react';
import './Header.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import { getUser, getAllGames, updateGames, getCurrentSubscriptions } from '../../ducks/reducer';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuClicked: false

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
    handleClick(){
        this.setState({
            menuClicked: !this.state.menuClicked
        })
    }

    render() {
        console.log(this.state);
        let h1Style = {padding:'20px',transition:'3s'}
          let mappedGames = this.props.games.map((e, k) => {
            return (
                <div key={k}>{`${e.title}; ${e.sport}; ${e.dateofgame}; ${e.streetaddress}`} <button onClick={()=>this.subscribe(this.props.user.id,e.game_id)}>subscribe</button></div>
            )
        }

        )
        return (
            <div>
                <div className='mainHeader'>
                    <div className='iconButton'>
                        <p onClick={()=>this.handleClick()}>options</p>
                    </div>
                    <div>
                        <h1>Sportify</h1>
                    </div>
                    <div className='iconButton'>
                    <Link to='/profile'><p onClick={() => this.getSubs()}>Profile</p></Link>
                    </div>
                </div>
                <div className='underline'>
                </div>
                <div className={this.state.menuClicked ? 'dashboardMenu  slide2' : 'dashboardMenu'}>
                <Link to='/CreateGame'><h3 className= 'h3' >Create a game</h3></Link>
                    <div className='underline1'>
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
        subscriptions: state.subscriptions
    }
}

export default connect(mapStateToProps, { updateGames, getUser, getAllGames, getCurrentSubscriptions } ) (Header);