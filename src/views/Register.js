import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cookie from 'js-cookie';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { register } from 'api/auth';
import { register as registerAction } from 'actions';
import AuthTemplate from 'templates/AuthTemplate';
import routes from 'routes';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const handleSubmit = (ev) => {
    ev.preventDefault();

    setLoading(true);

    const data = { name, email, password, password_confirmation };

    register(data)
      .then((res) => {
        const { access_token, user } = res.data;

        setLoading(false);
        cookie.set('token', access_token);
        props.register(user);
        props.history.push(routes.profile);
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <AuthTemplate>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form} noValidate>
        <TextField
          error={!!errors['name']}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          helperText={!!errors['name'] ? 'Incorrect name.' : ''}
          autoComplete="name"
          autoFocus
          onChange={(ev) => setName(ev.target.value)}
        />
        <TextField
          error={!!errors['email']}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          helperText={!!errors['email'] ? 'Incorrect email.' : ''}
          autoComplete="email"
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <TextField
          type="password"
          error={!!errors['password']}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          helperText={!!errors['password'] ? 'Incorrect password.' : ''}
          autoComplete="password"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <TextField
          type="password"
          error={!!errors['password']}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password_conrifmation"
          label="Password conrifmation"
          name="password_conrifmation"
          helperText={
            !!errors['password'] ? 'Incorrect password confirmation.' : ''
          }
          autoComplete="password"
          onChange={(ev) => setPasswordConfirmation(ev.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>
      <Link to={routes.login}>Already have an account? Sign in here!</Link>
    </AuthTemplate>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (user) => dispatch(registerAction(user)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
