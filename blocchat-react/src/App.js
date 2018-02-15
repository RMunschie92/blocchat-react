import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDWPO5WTyTd7D7mZqVihIaNGLBFz2ciS7w",
    authDomain: "bloc-chat-react-f7e13.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-f7e13.firebaseio.com",
    projectId: "bloc-chat-react-f7e13",
    storageBucket: "bloc-chat-react-f7e13.appspot.com",
    messagingSenderId: "569104419435"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      activeRoom: null,
      activeRoomName: null,
      user: null
    }
  }

  handleRoomClick(e) {
    this.setState({
      activeRoom: e.target.className,
      activeRoomName: e.target.dataset.name
     });
  }

  setUser(username) {
    this.setState({
      user: username
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h2>Bloc Chat</h2>
        </header>
        <main>
          <User
            firebase = {firebase}
            user = {this.state.user}
            setUser = {(username) => this.setUser(username)}
          />
          <RoomList
            firebase = {firebase}
            activeRoom = {this.state.activeRoom}
            activeRoomName = {this.state.activeRoomName}
            handleRoomClick = {(e) => this.handleRoomClick(e)}
          />
          <MessageList
            firebase = {firebase}
            activeRoom = {this.state.activeRoom}
            activeRoomName = {this.state.activeRoomName}
          />

        </main>
      </div>
    );
  }
}

export default App;
