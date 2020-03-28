import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import { LOGIN } from './actions/types';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
  };

  handleSubmit = (ev) => {
    ev.preventDefault();

    const { email, password } = this.state;
    const data = { email, password };

    axios
      .post('http://laravel-auth.local/api/auth/login', data)
      .then((res) => {
        const { access_token, user } = res.data;

        cookie.set('token', access_token);
        this.props.login(user);
        this.props.history.push('/profile');
      })
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  };

  handleInput = (ev) => {
    const { name, value } = ev.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h1>Login page</h1>
        <div>
          {this.state.errors['result'] ? this.state.errors['result'] : null}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleInput}
            />
            <div>
              {this.state.errors['email'] ? this.state.errors['email'] : null}
            </div>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleInput}
            />
            <div>
              {this.state.errors['password']
                ? this.state.errors['password']
                : null}
            </div>
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch({ type: LOGIN, payload: user }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
