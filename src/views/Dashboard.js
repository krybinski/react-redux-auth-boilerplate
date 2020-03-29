import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import PanelTemplate from 'templates/PanelTemplate';
import Title from 'components/Title/Title';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const fixedHeightPaper = classes.paper;

  return (
    <PanelTemplate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <Title>Dashboard</Title>
          </Paper>
        </Grid>
      </Grid>
    </PanelTemplate>
  );
};

export default Dashboard;
