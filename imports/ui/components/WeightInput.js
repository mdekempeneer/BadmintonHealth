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
        marginLeft: theme.spacing.unit,
        color: '#1a9641',
    }
});

const points = 1;

class WeightInput extends Component {
    constructor() {
        super();

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            },
            weight: ''
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
        if (this.state.weight === '') {
            Bert.alert('Gelieve een gewicht in te vullen.', 'danger', 'fixed-top');
        } else {
            var number = this.state.weight.replace(',','.');
            if(isNaN(number)) {
                Bert.alert('Gelieve je input te controleren.', 'danger', 'fixed-top');
            } else {
                Meteor.call('addWeight', number, points, () => {
                    levelChecker();
                    badgeChecker();
                });
            }
        }
    }

    render() {
        const { classes } = this.props;
        var check = checkUpdater();
        if (check !== 0) {
            return (<div/>);
        } else {
            return (
                <div>
                    <div className='rate-button-text'>
                        <T>addWorkouts.weight</T>
                    </div>
                    <div className='rate-button'>
                        <FormControl
                            className={classNames(classes.formControl, classes.withoutLabel)}
                            aria-describedby='weight-helper-text'
                            required={true}
                        >
                            <Input
                                placeholder='00.00'
                                id='adornment-weight'
                                value={this.state.weight}
                                onChange={this.handleChange('weight').bind(this)}
                                endAdornment={<InputAdornment position='end'>Kg</InputAdornment>}
                            />
                        </FormControl>
                        <IconButton className={classes.submitButton} onClick={this.clickAdd.bind(this)}> <AddCircle style={{width: 40, height: 40}} /></IconButton>
                    </div>
                </div>
            );
        }
    }
}

function checkUpdater() {
    const TODAY = '.*'.concat(moment().startOf('day').format('YYYY-MM-DD')).concat('.*');
    return SportData.find({ user: Meteor.userId(),
                                 'result.type': 'HKQuantityTypeIdentifierWeight',
                                 'result.creationDate': {$regex: TODAY}
                                }).count();
}

WeightInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeightInput);
