import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateUser } from 'api/user';
import PanelTemplate from 'templates/PanelTemplate';

const Profile = (props) => {
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [errors, setErrors] = useState({});

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const data = { name, email };

    updateUser(data).catch((err) => {
      setErrors(err.response.data.errors);
    });
  };

  return (
    <PanelTemplate>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Edit your details</h3>
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <div>{!!errors['name'] ? errors['name'] : null}</div>
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <div>{!!errors['email'] ? errors['email'] : null}</div>
        </div>
        <div>
          <button>Save changes</button>
        </div>
      </form>
    </PanelTemplate>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.auth.user.name,
    email: state.auth.user.email,
  };
};

export default connect(mapStateToProps)(Profile);
