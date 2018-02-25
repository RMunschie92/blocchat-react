import React, { Component } from 'react';
import '../styles/MessageList.css';
import '../styles/App.css';

class MessageList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      content: '',
      roomId: '',
      sentAt: '',
      validUser: null
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
      roomId: this.props.activeRoom,
      sentAt: this.prettyTime()
    });
  }

  handleKeyPress(e) {
    if (e.target.className === 'message-input' && e.key === 'Enter') {
      this.createMessage(e);
    }
  }

  createMessage(e) {
    e.preventDefault();
    if ( this.props.user === null ) {
      alert("Please sign in to send a message.")
    }
    else {
      this.messagesRef.push({
        content: this.state.content,
        username: this.props.user.displayName,
        roomId: this.state.roomId,
        sentAt: this.state.sentAt
      });
    }
    document.getElementById("message-form").reset();
  }

  getBubbleClass(message, user) {
    if (this.props.user === null || message.username !== this.props.user.displayName) {
      return 'receive-message-bubble';
    }
    else if (message.username === this.props.user.displayName) {
      return 'send-message-bubble';
    }
  }

  getContentClass(message, user) {
    if (this.props.user === null || message.username !== this.props.user.displayName) {
      return 'receive-message-content';
    }
    else if (message.username === this.props.user.displayName) {
      return 'send-message-content';
    }
  }


  render() {

    let activeMessages = this.state.messages.filter( message => message.roomId === this.props.activeRoom );

    return (
      <section className="messages-container">

        <div className="fixed-messages-header">
          <h3 className="active-room-name">{this.props.activeRoomName}</h3>
        </div>


          <div className="messages-overflow-container">
            <div className="scrolling-messages-list" id="scrolling-messages-list">
              <ul id="list-ul">
                {
                  activeMessages.map( (message, index) =>
                    <li className={this.getBubbleClass(message, this.props.user)} key={message.key}>
                      <div className="message-username">{message.username}</div>
                      <div className={this.getContentClass(message, this.props.user)}>{message.content}</div>
                      <div className="message-timestamp">{message.sentAt}</div>
                    </li>
                  )
                }
              </ul>

            </div>
          </div>


        {this.props.activeRoom === null ? '' :
          <div className="fixed-messages-footer">
            <form id="message-form">
              <textarea className="message-input" placeholder="Write your message here..." onChange={ (e) => {this.handleMessageChange(e)} } onKeyUp={ (e) => this.handleKeyPress(e)} >
              </textarea><input type="submit" className="message-submit" value="SEND" onClick={ (e) => {this.createMessage(e)} } />
            </form>
          </div>
        }

      </section>
    );
  }
}

export default MessageList;
