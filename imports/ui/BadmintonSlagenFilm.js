/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import YouTube from 'react-youtube';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Material-UI componenten */
import Button from 'material-ui/Button';

/* Componenten */
import AccountsUIWrapper from './components/AccountsUIWrapper.js';
import CircularIndeterminate from './components/CircularIndeterminate.js';
import NotYetImplemented from './components/NotYetImplemented.js';
import { dayChecker, clickChecker } from './allFunctions.js';

/* Database */
import { SportData } from '../api/sportdata.js';

/* Language */
const T = i18n.createComponent();

export default class Settings extends TrackerReact(Component) {
    constructor() {
        super();

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            },
            movie: 'Llzbh5rhWsA'
        }
    }

    componentDidMount() {
        if (Meteor.user()) {
            dayChecker();
            clickChecker();
        }
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
        this.state.subscription.sport.stop();
    }

    render() {
        if(Meteor.users.find().fetch().length < 1 || !Meteor.userId()) {
            return (<div className='please_login'>
                        <T>general.login_please</T><br />
                        <div className='facebook-login-pages'>
                            <AccountsUIWrapper />
                        </div>
                    </div>);
        }

        const opts = {
            height: '400',
            width: '550',
            playerVars: { // https://developers.google.com/youtube/player_parameters
            }
        };

        return (
            <div className='overall-box'>
                <YouTube
                    videoId={this.state.movie}
                    opts={opts}
                    onReady={this._onReady}
                />

                <Row className='flex-box-color' justify='center' align='middle'>
                    <Col span={3}><Button disabled={!(Meteor.user().currentLevel > 1)} fullWidth={true} variant='raised'>FOREHAND</Button></Col>
                    <Col span={3}><Button disabled={!(Meteor.user().currentLevel > 2)} fullWidth={true} variant='raised'>BACKHAND</Button></Col>
                    <Col span={3}><Button disabled={!(Meteor.user().currentLevel > 3)} fullWidth={true} variant='raised'>CLEAR</Button></Col>
                    <Col span={3}><Button disabled={!(Meteor.user().currentLevel > 4)} fullWidth={true} variant='raised'>...</Button></Col>
                    <Col span={3}><Button disabled={!(Meteor.user().currentLevel > 5)} fullWidth={true} variant='raised'>...</Button></Col>
                    <Col span={3}><Button disabled={!(Meteor.user().currentLevel > 6)} fullWidth={true} variant='raised'>...</Button></Col>
                    <Col span={3}><Button disabled={!(Meteor.user().currentLevel > 7)} fullWidth={true} variant='raised'>...</Button></Col>
                    <Col span={3}><Button disabled={!(Meteor.user().currentLevel > 8)} fullWidth={true} variant='raised'>...</Button></Col>
                    <Col span={3}><Button disabled={!(Meteor.user().currentLevel > 9)} fullWidth={true} variant='raised'>...</Button></Col>
                    <Col span={3}><Button disabled={!(Meteor.user().currentLevel > 10)} fullWidth={true} variant='raised'>...</Button></Col>
                    <Col span={3}><Button disabled={!(Meteor.user().currentLevel > 11)} fullWidth={true} variant='raised'>...</Button></Col>
                    <Col span={3}><Button disabled={!(Meteor.user().currentLevel > 12)} fullWidth={true} variant='raised'>...</Button></Col>
                </Row>
                <div className='footer'>
                    <Button href='/bugreport'> bug report </Button>
                </div>
            </div>
        );
    }

    _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
