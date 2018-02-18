import React, { Component } from 'react';

class MessageList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      content: '',
      username: '',
      roomId: '',
      sentAt: ''
    };


    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  addZero(i){
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  prettyTime(){
    let time = new Date();
    let hours = this.addZero(time.getHours());
    let minutes = this.addZero(time.getMinutes());
    return hours + ':' + minutes;
  }

  handleMessageChange(e){
    e.preventDefault();
    this.setState({
      content: e.target.value,
      username: this.props.user.displayName,
      roomId: this.props.activeRoom,
      sentAt: this.prettyTime()
    });
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      content: this.state.content,
      username: this.state.username,
      roomId: this.state.roomId,
      sentAt: this.state.sentAt
    });
  }


  render() {

    let activeMessages = this.state.messages.filter( message => message.roomId === this.props.activeRoom );

    return (
      <section className="message-list">

        <div className="active-room-name">
          <h3>{this.props.activeRoomName}</h3>
        </div>

        <div className="messages">
          <ul>
            {
              activeMessages.map( (message, index) =>
                <li key={message.key}>
                  <div>{message.content}</div>
                  <div>{message.username}</div>
                  <div>{message.sentAt}</div>
                </li>
              )
            }
          </ul>
        </div>

        {this.props.activeRoom === null ? '' :
          <div className="message-form">
            <form>
              <input type="text" className="message-input" placeholder="Write your message here..." onChange={ (e) => {this.handleMessageChange(e)} } />
              <input type="submit" value="SEND" onClick={ (e) => {this.createMessage(e)} } />
            </form>
          </div>
        }

      </section>
    );
  }
}

export default MessageList;
