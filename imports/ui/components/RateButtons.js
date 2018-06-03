/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Material-UI componenten */
import Button from 'material-ui/Button';

/* Material-UI icons */
import SentimentVeryDissatisfied from 'material-ui-icons/SentimentVeryDissatisfied';
import SentimentDissatisfied from 'material-ui-icons/SentimentDissatisfied';
import SentimentNeutral from 'material-ui-icons/SentimentNeutral';
import SentimentSatisfied from 'material-ui-icons/SentimentSatisfied';
import SentimentVerySatisfied from 'material-ui-icons/SentimentVerySatisfied';

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
    buttonVDS: {
        background: '#d7191c', color: 'black', width: 65, height: 65,
    },
    buttonD: {
        background: '#fdae61', color: 'black', width: 65, height: 65,
        marginLeft: theme.spacing.unit * 0.5
    },
    buttonN: {
        background: '#ffffbf', color: 'black', width: 65, height: 65,
        marginLeft: theme.spacing.unit * 0.5
    },
    buttonS: {
        background: '#a6d96a', color: 'black', width: 65, height: 65,
        marginLeft: theme.spacing.unit * 0.5
    },
    buttonVS: {
        background: '#1a9641', color: 'black', width: 65, height: 65,
        marginLeft: theme.spacing.unit * 0.5
    }
});

var check;

class RateButtons extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        const veryDis = "/images/verydissatisfied.png";
        const dissati = "/images/dissatisfied.png";
        const neutral = "/images/neutral.png";
        const satisfi = "/images/satisfied.png";
        const verysat = "/images/verysatisfied.png";

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            },
            veryDissatisfiedSrc: veryDis, dissatisfiedSrc: dissati,
            neutralSrc: neutral, satisfiedSrc: satisfi,
            verySatisfiedSrc: verysat
        }
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
        this.state.subscription.sport.stop();
    }

    onClick1(event){
        Meteor.call('addFeeling', this.props.type, 1, 0.25, () => {
            Bert.alert('Je hebt 0.25 punt verdiend.', 'success', 'fixed-bottom');
            levelChecker();
            badgeChecker();
        });
    };

    onClick2(event){
        Meteor.call('addFeeling', this.props.type, 2, 0.5, () => {
            Bert.alert('Je hebt 0.5 punt verdiend.', 'success', 'fixed-bottom');
            levelChecker();
            badgeChecker();
        });
    }

    onClick3(event){
        Meteor.call('addFeeling', this.props.type, 3, 1, () => {
            Bert.alert('Je hebt 1 punt verdiend.', 'success', 'fixed-bottom');
            levelChecker();
            badgeChecker();
        });
    }

    onClick4(event){
        Meteor.call('addFeeling', this.props.type, 4, 1.5, () => {
            Bert.alert('Je hebt 1.5 punt verdiend.', 'success', 'fixed-bottom');
            levelChecker();
            badgeChecker();
        });
    }


    onClick5(event){
        Meteor.call('addFeeling', this.props.type, 5, 1.75, () => {
            Bert.alert('Je hebt 1.75 punt verdiend.', 'success', 'fixed-bottom');
            levelChecker();
            badgeChecker();
        });
    }

    render() {
        if(Meteor.users.find().fetch().length < 1 || !Meteor.userId()) {
            return (<div>Contacteer de administrator</div>);
        }

        const { classes } = this.props;

        check = SportData.find({ user: Meteor.userId(),
                                'result.type': this.props.type,
                                'result.creationDate': moment().startOf('day').format('YYYY-MM-DD')
                            }).count();

        if (check !== 0) {
            return <div />;
        } else {
            return (
                <div>
                    <div className='rate-button-text'>
                        {this.props.question}
                    </div>
                    <div className='rate-button'>
                        <Button className={classes.buttonVDS} onClick={this.onClick1.bind(this)} variant='fab'>
                            <img src={this.state.veryDissatisfiedSrc} width="50"/>
                        </Button>
                        <Button className={classes.buttonD} onClick={this.onClick2.bind(this)} variant='fab'>
                            <img src={this.state.dissatisfiedSrc} width="50"/>
                        </Button>
                        <Button className={classes.buttonN} onClick={this.onClick3.bind(this)} variant='fab'>
                            <img src={this.state.neutralSrc} width="50"/>
                        </Button>
                        <Button className={classes.buttonS} onClick={this.onClick4.bind(this)} variant='fab'>
                            <img src={this.state.satisfiedSrc} width="50"/>
                        </Button>
                        <Button className={classes.buttonVS} onClick={this.onClick5.bind(this)} variant='fab'>
                            <img src={this.state.verySatisfiedSrc} width="50"/>
                        </Button>
                    </div>
                </div>
            );
        }
    }
}

RateButtons.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RateButtons);
