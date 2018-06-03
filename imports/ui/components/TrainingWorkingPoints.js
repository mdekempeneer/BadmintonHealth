/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import classNames from 'classnames';

/* Material-UI componenten */
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

/* Material-UI icons */
import AddCircle from 'material-ui-icons/AddCircle';

/* Material-UI style */
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

/* Databases */
import { SportData } from '../../api/sportdata.js';

import { levelChecker } from '../allFunctions.js';
import badgeChecker from './Badges/badgeChecker.js';

/* Language */
const T = i18n.createComponent();

/* Styles */
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      formControl: {
      },
      withoutLabel: {
          marginTop: theme.spacing.unit * 2
      },
      submitButton: {
          color: '#1a9641'
      }
});

const points = 1;

class TrainingWorkingPoints extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            },
            workingPoint: ''
        }
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
        this.state.subscription.sport.stop();
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    printout = prop => event => {
        if (this.state.workingPoint === '') {
            alert('Gelieve een werkpunt in te vullen.');
        } else {
            Meteor.call('addWorkPoint', this.state.workingPoint, points, () => {
                this.setState({ [prop]: '' });
                levelChecker();
                badgeChecker();
            });
        }
    }

    render() {
        if(Meteor.users.find().fetch().length < 1 || !Meteor.userId()) {
            return (<div>Contacteer de administrator</div>);
        }

        const { classes } = this.props;

        const check = SportData.find({ user: Meteor.userId(),
                                    'result.type': 'workPoint',
                                    'result.creationDate': moment().startOf('day').format('YYYY-MM-DD')
                                 }).count();
        if (check !== 0) {
            return null;
        } else {
            return (
                <div>
                    <div className='rate-button-text'>
                        <T>addWorkouts.workpoint</T>
                    </div>
                    <div className='rate-button'>
                        <FormControl
                            className={classNames(classes.formControl, classes.withoutLabel)}
                            aria-describedby='weight-helper-text'
                            required={true}
                        >
                            <Input
                                placeholder={i18n.__('addWorkouts.workpoint')}
                                value={this.state.workingPoint}
                                onChange={this.handleChange('workingPoint').bind(this)}
                            />
                        </FormControl>
                        <IconButton className={classes.submitButton} onClick={this.printout('workingPoint').bind(this)}> <AddCircle style={{width: 40, height: 40}} /></IconButton>
                    </div>
                </div>
            );
        }
    }
}

TrainingWorkingPoints.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrainingWorkingPoints);
