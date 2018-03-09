import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentSubscriptions, getUser, getAllGames } from '../../ducks/reducer'



class Profile extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.props.getUser();
        console.log('users', this.props.user);
        console.log('id', this.props.user.id);
        let id = this.props.user.id;
        this.props.getCurrentSubscriptions(id);
    }


    render() {
        console.log('profile props', this.props);
        let mappedSubs = this.props.subscriptions.map((e, k) => {
            return (
                <div key={k}>{`${e.title}; ${e.sport}; ${e.dateofgame}; ${e.streetaddress}`} <button onClick={()=>this.subscribe(this.props.user.id,e.game_id)}>subscribe</button></div>
            )
        }

        )

        return (
            <div>
                <div>
                    Profile
                <br />
                    <Link to='/dashboard'><button>Dashboard</button></Link>
                </div>
                <div>
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
        games:state.games
    }
}
export default connect(mapStateToProps, { getCurrentSubscriptions, getUser,getAllGames })(Profile)