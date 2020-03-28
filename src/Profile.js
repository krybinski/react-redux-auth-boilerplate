import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Profile extends Component {
  state = {
    name: this.props.name,
    email: this.props.email,
    errors: {},
  };

  handleInput = (ev) => {
    const { name, value } = ev.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();

    const { name, email } = this.state;
    const data = { name, email };

    axios
      .patch('http://laravel-auth.local/api/auth/update', data)
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  };

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <div>
          {this.state.errors['result'] ? this.state.errors['result'] : null}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <h3>Edit your details</h3>
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
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
              value={this.state.email}
              onChange={this.handleInput}
            />
            <div>
              {this.state.errors['email'] ? this.state.errors['email'] : null}
            </div>
          </div>
          <div>
            <button>Save changes</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.auth.user.name,
    email: state.auth.user.email,
  };
};

export default connect(mapStateToProps)(Profile);
