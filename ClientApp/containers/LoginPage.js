import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <h2>Login</h2>
        <TextField value="Hint Text" />
        <br />
        <TextField value="Hint Text 2" />
        <br />
      </div>
    );
  }
}

export default LoginPage;
