import React, { Component } from 'react';
import SignIn from './SignIn.js';
import SignOut from './SignOut.js';
import '../styles/User.css';

class User extends Component{
  constructor(props){
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
      this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn(e) {
    e.preventDefault();
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut(e) {
    e.preventDefault();
    this.props.firebase.auth().signOut();
    alert("Goodbye!");
  }


  render() {
    return(
      <section className="user-and-header">
        <div className="header">
          <h2>Bloc Chat</h2>
        </div>
        <div className="username-and-buttons">
          <div className="username-display">
            <h3 className="hello">Hello,</h3>
            <h3 className="addressee">{this.props.user === null ? "Guest" : this.props.user.displayName}</h3>
          </div>
          <div className="sign-in/out">
            {this.props.user === null ? (
              <SignIn signIn={(e) => this.signIn(e)} />
            ) : (
              <SignOut signOut={(e) => this.signOut(e)} />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default User;
