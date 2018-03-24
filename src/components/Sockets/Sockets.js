
import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import '../Games/Games.css'

class Socket extends Component {
    constructor() {
        super();
        this.state = {
            userID: null,
            roomID: null,
            messages: [],
            usersInfo:[],
            time_stamp:'',

        }

        this.updateMessages = this.updateMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.setUserId = this.setUserId.bind(this);
    }

    componentDidMount() {
        this.socket = io('http://localhost:3021/');
        this.socket.on('message dispatched', this.updateMessages)
        this.socket.on('welcome', this.setUserId)
        this.socket.on('room joined', this.joinedSuccess)
        this.joinRoom()
        axios.get(`/api/messages/${this.props.currentGameId}`).then((res) => {
            console.log(res.data);

            this.setState({ messages: res.data })
        })
        axios.get('/api/users').then((res)=>this.setState({usersInfo:res.data}))
        this.createTimeStamp()
    }
    componentWillUnmount() {
        this.socket.emit('leave room', { room: this.props.currentGameId })
    }
    joinRoom() {
        this.socket.emit('join room', { room: this.props.currentGameId })

    }
    joinedSuccess(room) {
        console.log(room);

    }

    updateMessages(message) {
        console.log('message', message);

        const updatedMessages = this.state.messages.slice()
        // console.log('updatedMessages 01',updatedMessages);
        updatedMessages.push(message)
        // console.log('updatedMessages 02',updatedMessages);

        this.setState({
            messages: updatedMessages
        })
    }
    createTimeStamp(){
        let date = new Date()
        console.log(date);
        let hours = date.getHours()
        let minutes = date.getMinutes()
        this.setState({time_stamp:`${hours}:${minutes}`});
        
    }

    setUserId(user) {
        this.setState(user)
    }
    sendMessage() {
        const message = this.refs.message.value
        this.createTimeStamp()
        this.socket.emit('message sent', { message: message, room: this.props.currentGameId, userName: this.props.userId,  time_stamp:this.state.time_stamp })
        this.updateMessages({ message, user: this.state.userID, time_stamp:this.state.time_stamp, socket_user_id:this.props.userId })
        this.refs.message.value = '';
    }


    render() {
        console.log('socket-props', this.props);
        console.log('socket-state', this.state);


        const gameID = this.props.currentGameId
        console.log(this.state);

        // const messages = this.state.messages.map((e,i) => {
        //     console.log(e.socket_user_id);

        //   const styles = e.user === this.state.userID ? {alignSelf: "flex-end", backgroundColor: "#2d96fb", color: "white"} : {alignSelf: "flex-start", backgroundColor: "#e5e6ea"}
        //   return (
        //     <p key={i} style={styles}>{e.message}</p>
        //   )
        // })
        const messages = this.state.messages.map((e, i) => {

            return (
                <div key={i} className='individualMessageContainer'>
                    <div className={e.socket_user_id === this.props.userId ? 'userMessage message' : 'message'}> 
                        <p>{e.message}</p>
                        
                        <p>{ (this.state.usersInfo.filter((x)=>x.id===e.socket_user_id)).userName}</p>
                    <div className='messageInfo'>
                    <p>{this.state.usersInfo.filter((x)=>x.id===e.socket_user_id)[0]?this.state.usersInfo.filter((x)=>x.id===e.socket_user_id)[0].username:''}</p>
                    <p>{`-${e.time_stamp}`}</p>
                    </div>

                    </div>
                </div>
            )
        })

        return (
            <div className="App">
                <div className="messages">
                    {messages}
                </div>
                <div className="input">
                    {
                        !this.state.messages[0]
                        ?
                        <h1 className={'gameTitle'}> Start the Conversation!</h1>
                        :
                        ''
                    }
                    <input ref="message" className={'messageInput'} />
                    <button className='sendButton' onClick={this.sendMessage}>Send</button>
                </div>
            </div>
        );
    }
}

export default Socket;

