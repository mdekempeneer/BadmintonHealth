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
import { PersonalGoalData } from '../../api/personalgoals.js';

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
        marginLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2
    },
    submitButton: {
        marginLeft: theme.spacing.unit,
        color: '#1a9641',
    }
});

const points = 1;

class FootstepGoalsInput extends TrackerReact(Component) {
    constructor() {
        super();

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata'),
                goals: Meteor.subscribe('personalgoals')
            },
            steps: ''
        };
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
        if (this.state.steps === '') {
            Bert.alert('Gelieve je aantal voetstappen in te vullen.', 'danger', 'fixed-top');
        } else {
            var number = this.state.steps.replace(',','.');
            const check1 = isNaN(number);
            const check2 = parseFloat(number) % 1 !== 0;
            if (check1 || check2) {
                if (check1) { Bert.alert('Gelieve je input te controleren.', 'danger', 'fixed-top'); }
                if (check2) { Bert.alert('De input kan geen decimaal getal zijn.', 'danger', 'fixed-top'); }
            } else {
                Meteor.call('personalGoal', 'footsteps', number, () => {
                    Bert.alert('Je hebt je doel ingesteld!', 'success', 'fixed-bottom');
                    levelChecker();
                    badgeChecker();
                });
            }
        }
    }

    render() {
        const { classes } = this.props;

        var partial = PersonalGoalData.find({ user: Meteor.userId(), type: 'footsteps', date: CHECK_DATE });

        if (partial.count() >= 1) {
            return (
                <div className='rate-button'>
                    <T>goals.this_week_goal</T> {partial.fetch()[0].amount} <T>goals.steps_day</T>
                </div>
            )
        } else {
            return (
                <div className='rate-button'>
                    <T>goals.fill_in_goal</T>
                    <FormControl
                        className={classNames(classes.formControl, classes.withoutLabel)}
                        aria-describedby='steps-helper-text'
                        required={true}
                    >
                        <Input
                            placeholder='0000'
                            id='adornment-steps'
                            value={this.state.steps}
                            onChange={this.handleChange('steps').bind(this)}
                            endAdornment={<InputAdornment position='end'>{i18n.__('goals.steps_day')}</InputAdornment>}
                        />
                    </FormControl>
                    <IconButton className={classes.submitButton} onClick={this.clickAdd.bind(this)}> <AddCircle style={{width: 40, height: 40}} /></IconButton>
                </div>
            );
        }
    }
}

FootstepGoalsInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

const CHECK_DATE = (moment().format('dddd') === 'Sunday' ?
                    moment().startOf('week').add(1, 'day').subtract(1, 'week').format('YYYY-MM-DD') :
                    moment().startOf('week').add(1, 'day').format('YYYY-MM-DD')
                    );

export default withStyles(styles)(FootstepGoalsInput);
