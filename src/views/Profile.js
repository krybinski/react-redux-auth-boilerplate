import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { updateUser } from 'api/user';
import PanelTemplate from 'templates/PanelTemplate';
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import Title from 'components/Title/Title';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const Profile = (props) => {
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const fixedHeightPaper = classes.paper;

  const handleSubmit = (ev) => {
    ev.preventDefault();

    setErrors({});
    setLoading(true);

    const data = { name, email };

    updateUser(data)
      .then(() => setLoading(false))
      .catch((err) => {
        setLoading(false);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <PanelTemplate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <Title>Profile</Title>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <TextField
                error={!!errors.name}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                helperText={errors.name ? 'Incorrect name.' : ''}
                autoComplete="name"
                autoFocus
                onChange={(ev) => setName(ev.target.value)}
              />
              <TextField
                error={!!errors.email}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                helperText={errors.email ? 'Incorrect email.' : ''}
                autoComplete="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save changes'}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </PanelTemplate>
  );
};

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    name: state.auth.user.name,
    email: state.auth.user.email,
  };
};

export default connect(mapStateToProps)(Profile);
