/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import classNames from 'classnames';

/* Material-UI componenten */
import TextField from 'material-ui/TextField';
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
import { PersonalGoalData } from '../../api/personalgoals.js';

import { levelChecker } from '../allFunctions.js';
import badgeChecker from './Badges/badgeChecker.js';

/* Language */
const T = i18n.createComponent();

/* Styles */
const styles = theme => ({
    formControl: {
    },
    withoutLabel: {
        marginLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2
    },
    submitButton: {
        marginLeft: theme.spacing.unit,
        color: '#1a9641',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class SportTimeInput extends TrackerReact(Component) {
    constructor() {
        super();

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata'),
                goals: Meteor.subscribe('personalgoals')
            },
            totalTime: ''
        }
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
        this.state.subscription.sport.stop();
        this.state.subscription.goals.stop();
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    clickAdd(event) {
        if (this.state.totalTime === '') {
            Bert.alert('Gelieve je totale tijd in te vullen.', 'danger', 'fixed-top');
        } else {
            const row1 = this.state.totalTime.split(':');
            const number1 = parseInt(row1[0]);
            const number2 = parseInt(row1[1]);
            const millis = (number1*60*60 + number2*60 )*1000

            Bert.alert('Je hebt ' + epoch_to_hh_mm_ss(millis) + ' gesport.', 'success', 'fixed-bottom');
            const differencePoints = ((millis/1000)/60)/4; // per 4 min een punt
            Meteor.call('updateTime', millis, differencePoints, () => {
                levelChecker();
                badgeChecker();
            });
        }
    }

    render() {
        const { classes } = this.props;

        const check = SportData.find({ user: Meteor.userId(),
                                    'result.type': 'time',
                                    'result.creationDate': moment().startOf('day').format('YYYY-MM-DD')
                                 }).count();
        if (check > 0) {
            return (<div />)
        } else {
            return (
                <div>
                    <div className='rate-button-text'>
                        <T>addWorkouts.sporttime</T>
                    </div>
                    <div className='rate-button'>
                        <FormControl className={classNames(classes.formControl, classes.withoutLabel)}>
                            <TextField
                                id='time' type='time'
                                defaultValue='00:00'
                                className={classes.textField}
                                onChange={this.handleChange('totalTime').bind(this)}
                                InputLabelProps={{ shrink: true, }}
                                inputProps={{ step: 300 }}
                            />
                        </FormControl>
                        <IconButton className={classes.submitButton} onClick={this.clickAdd.bind(this)}> <AddCircle style={{width: 40, height: 40}} /></IconButton>
                    </div>
                </div>
            );
        }
    }
}

function epoch_to_hh_mm_ss(epoch) {
    return new Date(epoch).toISOString().substr(12, 4)
}

const CHECK_DATE = (moment().format('dddd') === 'Sunday' ?
                    moment().startOf('week').add(1, 'day').subtract(1, 'week').format('YYYY-MM-DD') :
                    moment().startOf('week').add(1, 'day').format('YYYY-MM-DD')
                    );

SportTimeInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SportTimeInput);
