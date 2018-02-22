import React, {Component} from 'react';

class SignIn extends Component{
  render() {
    return(
      <div className="sign-in">
        <button id="sign-in-button" onClick={this.props.signIn}>Sign In</button>
      </div>
    );
  }
}

export default SignIn;
