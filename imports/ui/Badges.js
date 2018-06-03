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
import Error from 'material-ui-icons/Error';

/* Componenten */
import AccountsUIWrapper from './components/AccountsUIWrapper.js';
import CircularIndeterminate from './components/CircularIndeterminate.js';
import HighscoreBoard from './components/HighscoreBoard.js';
import NotYetImplemented from './components/NotYetImplemented.js';
import PolarBadge from './components/Badges/PolarBadge.js';
import HeartRateBadges from './components/Badges/HeartRateBadges.js';
import WeightBadges from './components/Badges/WeightBadges.js';
import StepsBadges from './components/Badges/StepsBadges.js';
import SleepBadges from './components/Badges/SleepBadges.js';
import TimeBadges from './components/Badges/TimeBadges.js';
import GeneralBadge from './components/Badges/GeneralBadge.js';
import { dayChecker, clickChecker } from './allFunctions.js';

/* Databases */
import { SportData } from '../api/sportdata.js';

/* Language */
const T = i18n.createComponent();

export default class Badges extends TrackerReact(Component) {
    constructor() {
        super();

        const generalImage = "/images/grid-world.png";
        const heartbeatImage = "/images/heartbeat.png";
        const weightImage = "/images/weighing.png";
        const stepsImage = "/images/footsteps-silhouette-variant.png";
        const sleepImage = "/images/bed.png";
        const timeImage = "/images/stopwatch.png";

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            },
            general: true, heartrate: false, weight: false, distance: false,
            steps: false, sleep: false, time: false,
            generalSrc: generalImage, heartbeatSrc: heartbeatImage,
            weightSrc: weightImage, stepsSrc: stepsImage, sleepSrc: sleepImage,
            timeSrc: timeImage
        };
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

    clickGeneral(event) {
        Meteor.call('clickUpdate', 'badges', 'general');
        this.setState({ general: true, heartrate: false, weight: false, distance: false, steps: false, sleep: false, time: false });
    }

    clickHeartRate(event) {
        Meteor.call('clickUpdate', 'badges', 'heartrate');
        this.setState({ general: false, heartrate: true, weight: false, distance: false, steps: false, sleep: false, time: false });
    }

    clickWeight(event) {
        Meteor.call('clickUpdate', 'badges', 'weight');
        this.setState({ general: false, heartrate: false, weight: true, distance: false, steps: false, sleep: false, time: false });
    }

    clickDistance(event) {
        Meteor.call('clickUpdate', 'badges', 'distance');
        this.setState({ general: false, heartrate: false, weight: false, distance: true, steps: false, sleep: false, time: false });
    }

    clickSteps(event) {
        Meteor.call('clickUpdate', 'badges', 'steps');
        this.setState({ general: false, heartrate: false, weight: false, distance: false, steps: true, sleep: false, time: false });
    }

    clickSleep(event) {
        Meteor.call('clickUpdate', 'badges', 'sleep');
        this.setState({ general: false, heartrate: false, weight: false, distance: false, steps: false, sleep: true, time: false });
    }

    clickTime(event) {
        Meteor.call('clickUpdate', 'badges', 'time');
        this.setState({ general: false, heartrate: false, weight: false, distance: false, steps: false, sleep: false, time: true });
    }

    renderBadges() {
        if (this.state.general) {
            return (<GeneralBadge />);
        } else if (this.state.heartrate) {
            return (<HeartRateBadges />);
        } else if (this.state.weight) {
            return (<WeightBadges />);
        } else if (this.state.distance) {
            return (<DistanceBadges />);
        } else if (this.state.steps) {
            return (<StepsBadges />);
        } else if (this.state.sleep) {
            return (<SleepBadges />);
        } else if (this.state.time) {
            return (<TimeBadges />);
        } else {
            return;
        }
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

        return (
            <div className='overall-box'>
                <Col span={2} align='middle' justify='center'>
                    <Row className='flex-box-color' justify='center' align='middle'>
                        <Button disabled={this.state.general} size='small' onClick={this.clickGeneral.bind(this)}>
                            <img src={this.state.generalSrc}  width="60"/>
                        </Button>
                        <T>badges.general</T>
                    </Row>
                    <Row className='flex-box-color' justify='center' align='middle'>
                        <Button disabled={this.state.heartrate} size='small' color='inherit' onClick={this.clickHeartRate.bind(this)}>
                            <img src={this.state.heartbeatSrc}  width="60"/>
                        </Button>
                        <T>badges.heartrate</T>
                    </Row>
                    <Row className='flex-box-color' justify='center' align='middle'>
                        <Button disabled={this.state.weight} size='small' color='inherit' onClick={this.clickWeight.bind(this)}>
                            <img src={this.state.weightSrc}  width="60"/>
                        </Button>
                        <T>badges.weight</T>
                    </Row>
                    <Row className='flex-box-color' justify='center' align='middle'>
                        <Button disabled={this.state.steps} size='small' color='inherit' onClick={this.clickSteps.bind(this)}>
                            <img src={this.state.stepsSrc}  width="60"/>
                        </Button>
                        <T>badges.steps</T>
                    </Row>
                    <Row className='flex-box-color' justify='center' align='middle'>
                        <Button disabled={this.state.sleep} size='small' color='inherit' onClick={this.clickSleep.bind(this)}>
                            <img src={this.state.sleepSrc}  width="60"/>
                        </Button>
                        <T>badges.sleep</T>
                    </Row>
                    <Row className='flex-box-color' justify='center' align='middle'>
                        <Button disabled={this.state.time} size='small' color='inherit' onClick={this.clickTime.bind(this)}>
                            <img src={this.state.timeSrc}  width="60"/>
                        </Button>
                        <T>badges.time</T>
                    </Row>
                </Col>
                <Col span={10}>
                    {this.renderBadges()}
                </Col>
                <div className='footer'>
                    <Button href='/bugreport'> bug report </Button>
                </div>
            </div>
        );
    }
}
