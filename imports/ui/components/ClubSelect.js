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

class ClubSelect extends TrackerReact(Component) {
    constructor() {
        super();

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            },
            club: ''
        };

        this.handleChange = this.handleChange.bind(this)
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
        this.state.subscription.sport.stop();
    }

    handleChange(name) {
        return event => {
            Meteor.call('updateClub', event.target.value);
            this.setState({ [name]: event.target.value });
        }
    }

    render() {
        if(Meteor.users.find().fetch().length < 1 || !Meteor.userId()) {
            return (<div>Contacteer de administrator</div>);
        }

        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor='age-native-simple'>Club</InputLabel>
                    <Select native value={this.state.club} onChange={this.handleChange('club')} inputProps={{ id: 'age-native-simple', }} >
                        <option value='' />
                        <option value='Bad 79'>Bad 79</option>
                        <option value='BC Buggenhout'>BC Buggenhout</option>
                        <option value='BC Jodoigne'>BC Jodoigne</option>
                        <option value='BC Kampenhout'>BC Kampenhout</option>
                        <option value='BC Tervuren'>BC Tervuren</option>
                        <option value='BC Tienen'>BC Tienen</option>
                        <option value='Brasschaatse BC'>Brasschaatse BC</option>
                        <option value='De Treffers Overijse'>De Treffers Overijse</option>
                        <option value='Dijlevallei BC'>Dijlevallei BC</option>
                        <option value='Everbergse BC'>Everbergse BC</option>
                        <option value='KABAD'>KABAD</option>
                        <option value='Nero Hoeilaart'>Nero Hoeilaart</option>
                        <option value='Omnisport Blauwput'>Omnisport Blauwput</option>
                        <option value='Pluimpke Klop'>Pluimpke Klop</option>
                        <option value='Plumula'>Plumula</option>
                    </Select>
                </FormControl>
            </div>
        );
    }
}

ClubSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClubSelect);
