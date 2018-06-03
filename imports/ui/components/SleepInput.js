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

import { levelChecker } from '../allFunctions.js';
import badgeChecker from './Badges/badgeChecker.js';

import { sleepCalculator } from '../scoreCalculator.js';

/* Language */
const T = i18n.createComponent();

/* Styles */
const styles = theme => ({
    formControl: {

    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 2
    },
    submitButton: {
        marginLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit * 3,
        color: '#1a9641'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class SleepInput extends TrackerReact(Component) {
    constructor() {
        super();

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            },
            lightSleep: '',
            deepSleep: ''
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

    clickAdd(event) {
        if (this.state.lightSleep === '') {
            Bert.alert('Gelieve je lichte slaap in te vullen.', 'danger', 'fixed-top');
        } else if (this.state.deepSleep === '') {
            Bert.alert('Gelieve je diepe slaap in te vullen.', 'danger', 'fixed-top');
        } else {
            const row1 = this.state.lightSleep.split(':');
            const row2 = this.state.deepSleep.split(':');
            const number1 = parseInt(row1[0]);
            const number2 = parseInt(row1[1]);
            const number3 = parseInt(row2[0]);
            const number4 = parseInt(row2[1]);

            const points = sleepCalculator(number1, number2, number3, number4);
            Meteor.call('addSleep', number1, number2, number3, number4, points , () => {
                levelChecker();
                badgeChecker();
                Bert.alert('Je hebt ' + points.toString() + ' punt verdiend.', 'success', 'fixed-bottom');
            });
        }
    }

    render() {
        const { classes } = this.props;
        var check = checkUpdater();
        if (check !== 0) {
            return null;
        } else {
            return (
                <div>
                    <div className='rate-button-text'>
                        <T>addWorkouts.sleep_patern</T>
                    </div>
                    <div className='rate-button'>
                        <FormControl className={classNames(classes.formControl, classes.withoutLabel)}>
                            <TextField
                                id='time' label={i18n.__('addWorkouts.light_sleep')} type='time'
                                defaultValue='00:00'
                                className={classes.textField}
                                onChange={this.handleChange('lightSleep').bind(this)}
                                InputLabelProps={{ shrink: true, }}
                                inputProps={{ step: 300, /* 5 min */ }}
                            />
                            <TextField
                                id='time2' label={i18n.__('addWorkouts.deep_sleep')} type='time'
                                defaultValue='00:00'
                                className={classes.textField}
                                onChange={this.handleChange('deepSleep').bind(this)}
                                InputLabelProps={{ shrink: true, }}
                                inputProps={{ step: 300, /* 5 min */ }}
                            />
                        </FormControl>
                        <IconButton className={classes.submitButton} onClick={this.clickAdd.bind(this)}> <AddCircle style={{width: 40, height: 40}} /></IconButton>
                    </div>
                </div>
            );
        }
    }
}

const TODAY = moment().startOf('day').format('YYYY-MM-DD');

function checkUpdater() {
    const count1 = SportData.find({ user: Meteor.userId(),
                                    'result.type': 'lightSleep',
                                    'result.creationDate': TODAY
                                    }).count();
    const count2 = SportData.find({ user: Meteor.userId(),
                                    'result.type': 'deepSleep',
                                    'result.creationDate': TODAY
                                    }).count();
    return (count1 + count2);
}

SleepInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SleepInput);
