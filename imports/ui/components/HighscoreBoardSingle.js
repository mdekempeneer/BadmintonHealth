/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Material-UI componenten */
import Avatar from 'material-ui/Avatar';

/* Language */
const T = i18n.createComponent();

export default class HighscoreBoardSingle extends TrackerReact(Component) {
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
            if (this.props.type == 'general') {
                if (this.props.person.club === '' && this.props.person.team === '') {
                    return (<b> {this.props.person.profile.name} </b>);
                } else if (this.props.person.club !== '' && this.props.person.team === '') {
                    return (<div> <b>{this.props.person.profile.name}<br/>
                                    <i>{this.props.person.club}</i></b></div>);
                } else if (this.props.person.club !== '' && this.props.person.team !== '') {
                    return (<div> <b>{this.props.person.profile.name}<br/>
                                    <i>{this.props.person.club}<br/>
                                    ({this.props.person.team})</i></b></div>);
                } else {
                    return (<b> {this.props.person.profile.name} </b>);
                }
            } else if (this.props.type == 'club') {
                if (this.props.person.club === '' && this.props.person.team === '') {
                    return (<b> {this.props.person.profile.name} </b>);
                } else if (this.props.person.club !== '' && this.props.person.team === '') {
                    return (<div> <b>{this.props.person.profile.name}</b></div>);
                } else if (this.props.person.club !== '' && this.props.person.team !== '') {
                    return (<div> <b>{this.props.person.profile.name}<br/>
                                    <i>{this.props.person.team}</i></b></div>);
                } else {
                    return (<b> {this.props.person.profile.name} </b>);
                }
            } else if (this.props.type == 'team') {
                if (this.props.person.club === '' && this.props.person.team === '') {
                    return (<b> {this.props.person.profile.name} </b>);
                } else if (this.props.person.club !== '' && this.props.person.team === '') {
                    return (<div> <b>{this.props.person.profile.name}<br/>
                                    <i>{this.props.person.club}</i></b></div>);
                } else if (this.props.person.club !== '' && this.props.person.team !== '') {
                    return (<div> <b>{this.props.person.profile.name}<br/>
                                    <i>{this.props.person.club}</i></b></div>);
                } else {
                    return (<b> {this.props.person.profile.name} </b>);
                }
            }
        } else {
            if (this.props.type == 'general') {
                if (this.props.person.club === '' && this.props.person.team === '') {
                    return (<div> {this.props.person.profile.name} </div>);
                } else if (this.props.person.club !== '' && this.props.person.team === '') {
                    return (<div> {this.props.person.profile.name} <br/>
                                    <i>{this.props.person.club}</i></div>);
                } else if (this.props.person.club !== '' && this.props.person.team !== '') {
                    return (<div> {this.props.person.profile.name} <br/>
                                    <i>{this.props.person.club}<br/>
                                    ({this.props.person.team})</i></div>);
                } else {
                    return (<div> {this.props.person.profile.name} </div>);
                }
            } else if (this.props.type == 'club') {
                if (this.props.person.club === '' && this.props.person.team === '') {
                    return (<div> {this.props.person.profile.name} </div>);
                } else if (this.props.person.club !== '' && this.props.person.team === '') {
                    return (<div> {this.props.person.profile.name} </div>);
                } else if (this.props.person.club !== '' && this.props.person.team !== '') {
                    return (<div> {this.props.person.profile.name} <br/>
                                    <i>{this.props.person.team}</i></div>);
                } else {
                    return (<div> {this.props.person.profile.name} </div>);
                }
            } else if (this.props.type == 'team') {
                if (this.props.person.club === '' && this.props.person.team === '') {
                    return (<div> {this.props.person.profile.name} </div>);
                } else if (this.props.person.club !== '' && this.props.person.team === '') {
                    return (<div> {this.props.person.profile.name} <br/>
                                    <i>{this.props.person.club}</i></div>);
                } else if (this.props.person.club !== '' && this.props.person.team !== '') {
                    return (<div> {this.props.person.profile.name} <br/>
                                    <i>{this.props.person.club}</i></div>);
                } else {
                    return (<div> {this.props.person.profile.name} </div>);
                }
            }
        }
    }

    points() {
        if(this.props.person.profile.name == Meteor.user().profile.name) {
            if(this.props.person.currentPoints == 1) {
                if (this.props.score === undefined) {
                    return (<b>{Math.round(this.props.person.currentPoints)} <T>highscore.point</T></b>);
                } else {
                    return (<b>{Math.round(this.props.score)} <T>highscore.point</T></b>);
                }
            } else {
                if (this.props.score === undefined) {
                    return (<b>{Math.round(this.props.person.currentPoints)} <T>highscore.points</T></b>);
                } else {
                    return (<b>{Math.round(this.props.score)} <T>highscore.points</T></b>);
                }
            }
        } else {
            if(this.props.person.currentPoints == 1) {
                if (this.props.score === undefined) {
                    return (<div>{Math.round(this.props.person.currentPoints)} <T>highscore.point</T></div>);
                } else {
                    return (<div>{Math.round(this.props.score)} <T>highscore.point</T></div>);
                }
            } else {
                if (this.props.score === undefined) {
                    return (<div>{Math.round(this.props.person.currentPoints)} <T>highscore.points</T></div>);
                } else {
                    return (<div>{Math.round(this.props.score)} <T>highscore.points</T></div>);
                }
            }
        }
    }

    render() {
        if(Meteor.users.find().fetch().length < 1 || !Meteor.userId()) {
            return (<div>Contacteer de administrator</div>);
        }

        var res = 'https://graph.facebook.com/'.concat(this.props.person.services.facebook.id).concat('/picture?type=large');

        return (
            <Row justify='center' align='middle'>
                <Col className='flex-highscore-avatar' span={2}>
                    <Avatar src={res} />
                </Col>
                <Col className='flex-highscore-name'   span={6}>{this.boldCheckName()}</Col>
                <Col className='flex-highscore-score'  span={4}>{this.points()}</Col>
            </Row>
        );
    }
}
