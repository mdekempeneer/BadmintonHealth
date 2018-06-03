/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Material-UI componenten */
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

/* Material-UI style */
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

/* Styles */
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class TeamSelect extends TrackerReact(Component) {
    constructor() {
        super();

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            },
            team: ''
        };
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
        this.state.subscription.sport.stop();
    }

    handleChange = name => event => {
        Meteor.call('updateTeam', event.target.value);
        this.setState({ [name]: event.target.value });
    };

    render() {
        if(Meteor.users.find().fetch().length < 1 || !Meteor.userId()) {
            return (<div>Contacteer de administrator</div>);
        }

        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor='age-native-simple'>Team</InputLabel>
                    <Select
                        native
                        value={this.state.team}
                        onChange={this.handleChange('team')}
                        inputProps={{
                            id: 'age-native-simple',
                        }}
                    >
                        <option value='' />
                        <option value='De Treffers 1G'>De Treffers 1G</option>
                        <option value='De Treffers 2G'>De Treffers 2G</option>
                        <option value='De Treffers 3G'>De Treffers 3G</option>
                        <option value='De Treffers 1H'>De Treffers 1H</option>
                        <option value='De Treffers 1D'>De Treffers 1D</option>
                    </Select>
                </FormControl>
            </div>
        );
    }
}

TeamSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeamSelect);
