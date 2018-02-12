import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header>
          <h2>Welcome to Bloc Chat</h2>
        </header>
        <main>
          <RoomList
            firebase = {firebase}
          />
        </main>
      </div>
    );
  }
}

export default App;
