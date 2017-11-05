// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
// import purple from 'material-ui/colors/purple';

import Styles from './style/Styles';

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <Grid
      container
      spacing={24}
      alignItems="center"
      direction="row"
      justify="center"
    >
      {/* <CircularProgress className={classes.progress} /> */}
      <CircularProgress className={classes.progress} size={50} />
      {/* <CircularProgress className={classes.progress} color="accent" /> */}
      {/* <CircularProgress className={classes.progress} style={{ color: purple[500] }} thickness={7} /> */}
    </Grid>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(CircularIndeterminate);
