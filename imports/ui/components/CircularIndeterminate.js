/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Material-UI componenten */
import { CircularProgress } from 'material-ui/Progress';

/* Material-UI style */
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

/* Material-UI colors */
import indigo from 'material-ui/colors/indigo';

const styles = theme => ({
    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
    },
});

function CircularIndeterminate(props) {
    const { classes } = props;
    return (
        <div>
            <CircularProgress color='inherit' className={classes.progress} size={100} thickness={7} />
        </div>
    );
}

CircularIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);
