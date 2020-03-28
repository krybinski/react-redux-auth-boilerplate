import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import { REGISTER } from './actions/types';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    errors: {},
  };

  handleSubmit = (ev) => {
    ev.preventDefault();

    const { name, email, password, password_confirmation } = this.state;
    const data = { name, email, password, password_confirmation };

    axios
      .post('http://laravel-auth.local/api/auth/register', data)
      .then((res) => {
        const { access_token, user } = res.data;

        cookie.set('token', access_token);
        this.props.register(user);
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
        <h1>Register page</h1>
        <div>
          {this.state.errors['result'] ? this.state.errors['result'] : null}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.handleInput}
            />
            <div>
              {this.state.errors['name'] ? this.state.errors['name'] : null}
            </div>
          </div>
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
            <label>Confirm password</label>
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm password"
              onChange={this.handleInput}
            />
          </div>
          <div>
            <button>Register</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (user) => dispatch({ type: REGISTER, payload: user }),
  };
};

export default connect(null, mapDispatchToProps)(Register);
