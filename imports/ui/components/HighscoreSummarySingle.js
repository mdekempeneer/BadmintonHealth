/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import CircularProgressbar from 'react-circular-progressbar';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Material-UI componenten */
import Avatar from 'material-ui/Avatar';

/* Language */
const T = i18n.createComponent();

export default class HighscoreSummarySingle extends TrackerReact(Component) {
    constructor() {
        super();

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('allSportdata')
            }
        }
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
        this.state.subscription.sport.stop();
    }

    boldCheckName() {
        if(this.props.person.profile.name == Meteor.user().profile.name) {
            return (<div> <b>{this.props.person.profile.name}</b><br/><i>{this.props.person.club}</i></div>);
        } else {
            return (<div> {this.props.person.profile.name}<br/><i>{this.props.person.club}</i></div>);
        }
    }

    points() {
        if(this.props.person.profile.name == Meteor.user().profile.name) {
            if(this.props.person.currentPoints == 1) {
                return (<b>{Math.round(this.props.person.currentPoints)} <T>highscore.point</T></b>);
            } else {
                return (<b>{Math.round(this.props.person.currentPoints)} <T>highscore.points</T></b>);
            }
        } else {
            if(this.props.person.currentPoints == 1) {
                return (<div>{Math.round(this.props.person.currentPoints)} <T>highscore.point</T></div>);
            } else {
                return (<div>{Math.round(this.props.person.currentPoints)} <T>highscore.points</T></div>);
            }
        }
    }

    render() {
        if(Meteor.users.find().fetch().length < 1 || !Meteor.userId() ||
            this.props.person.services === undefined) {
            return (<div>Contacteer de administrator</div>);
        }

        var res = 'https://graph.facebook.com/'.concat(this.props.person.services.facebook.id).concat('/picture?type=large');

        return (
            <Row justify='center' align='middle'>
                <Col className='profile-avatar' span={2}>
                    <Avatar src={res} />
                </Col>
                <Col className='profile-name'   span={6}>{this.boldCheckName()}</Col>
                <Col className='profile-score'  span={4}>{this.points()}</Col>
            </Row>
        );
    }
}
