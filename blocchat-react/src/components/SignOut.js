import React, {Component} from 'react';

class SignOut extends Component{
  render() {
    return(
      <div className="sign-out">
        <button id="sign-in-button" onClick={this.props.signOut}>Sign Out</button>
      </div>
    );
  }
}

export default SignOut;
