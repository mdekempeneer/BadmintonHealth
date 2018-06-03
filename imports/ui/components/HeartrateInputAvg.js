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
import { heartRateScore } from '../scoreCalculator.js';

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
        marginLeft: theme.spacing.unit,
        color: '#1a9641'
    }
});

const points = 1;

class HeartrateInputAvg extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            },
            heartrate: ''
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
        if (this.state.heartrate === '') {
            Bert.alert('Gelieve een hartslag in te vullen.', 'danger', 'fixed-top');
        } else {
            var number = this.state.heartrate.replace(',','.');
            const check1 = isNaN(number);
            const check2 = parseFloat(number) % 1 !== 0;
            if (check1 || check2) {
                if (check1) { Bert.alert('Gelieve je input te controleren.', 'danger', 'fixed-top'); }
                if (check2) { Bert.alert('De input kan geen decimaal getal zijn.', 'danger', 'fixed-top'); }
            } else {
                const points = heartRateScore(number);
                Meteor.call('addHeartRateMax', number, 'avg', points , () => {
                    levelChecker();
                    badgeChecker();
                });
            }
        }
    }

    render() {
        const { classes } = this.props;

        if (checkAmount() === 0) {
            return (
                <div>
                    <div className='rate-button-text'>
                        <T>addWorkouts.avg_heartrate</T>
                    </div>
                    <div className='rate-button'>
                        <FormControl
                            className={classNames(classes.formControl, classes.withoutLabel)}
                            aria-describedby='heartrate-helper-text'
                            required={true}
                        >
                            <Input
                                placeholder='000'
                                id='adornment-heartrate'
                                value={this.state.heartrate}
                                onChange={this.handleChange('heartrate').bind(this)}
                                endAdornment={<InputAdornment position='end'>{i18n.__('addWorkouts.bpm')}</InputAdornment>}
                            />
                        </FormControl>
                        <IconButton className={classes.submitButton} onClick={this.clickAdd.bind(this)}> <AddCircle style={{width: 40, height: 40}} /></IconButton>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

HeartrateInputAvg.propTypes = {
    classes: PropTypes.object.isRequired,
};

function checkAmount() {
    const day = '.*'.concat(moment().startOf('day').format('YYYY-MM-DD')).concat('.*');
    return SportData.find({
        user: Meteor.userId(),
        'result.type': 'HeartRate',
        'result.creationDate': {$regex: day},
        'result.extra': 'avg'
    }).count();
}

export default withStyles(styles)(HeartrateInputAvg);
