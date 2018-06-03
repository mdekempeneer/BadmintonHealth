/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Material-UI componenten */
import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';

/* Material-UI icons */
import FileUpload from 'material-ui-icons/FileUpload'
import Home from 'material-ui-icons/Home'

/* Componenten */
import AccountsUIWrapper from './components/AccountsUIWrapper.js';
import CircularIndeterminate from './components/CircularIndeterminate.js';
import ClubSelect from './components/ClubSelect.js';
import TeamSelect from './components/TeamSelect.js';
import DaySelector from './components/DaySelector.js';
import { dayChecker, lowerLevel, upperLevel, clickChecker, getBirthday, cleanClicks, cleanDoubles, updateZeros } from './allFunctions.js';

/* Databases */
import { SportData } from '../api/sportdata.js';

/* Language */
const T = i18n.createComponent();

export default class Profile extends TrackerReact(Component) {
    constructor() {
        super();

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            }
        }
    }

    componentDidMount() {
        if (Meteor.user()) {
            console.log("check!");
            dayChecker();
            clickChecker();
        }
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
        this.state.subscription.sport.stop();
    }

    clickCertificates(event) {
        Meteor.call('clickUpdate', 'profile', 'certificates');
        this.clickNotImplemented();
    };

    clickHighscores(event) {
        Meteor.call('clickUpdate', 'profile', 'highscores');
        FlowRouter.go('/highscores');
    };

    testForAdmin() {
        if (Meteor.userId() === 'jEs3qbkPaqLJj2ca7') {
            return (
                <div>
                    <Button onClick={cleanClicks}> CLEAN CLICKS </Button>
                    <Button onClick={cleanDoubles}> CLEAN DOUBLES </Button>
                    <Button onClick={updateZeros}> CLEAN ZERO </Button>
                </div>
            )
        } else {
            return null;
        }
    }

    clickNotImplemented(event) {
        alert('Coming soon.')
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

        if (Meteor.user().birthday == '') {
            getBirthday();
        }

        var str1 = 'https://graph.facebook.com/';
        var str2 = Meteor.user().services.facebook.id;
        var str3 = '/picture?type=large';
        var res = str1.concat(str2).concat(str3);

        let startLevel = lowerLevel[Meteor.user().currentLevel-1];
        let stopLevel = upperLevel[Meteor.user().currentLevel-1];
        let currentPosition = 100 * ((Meteor.user().currentPoints - startLevel) / (stopLevel - startLevel));

        return (
            <div className='overall-box'>
                <Row className='flex-box-white' justify='space-between' align='middle'>
                    <Col span={4}>
                        <img className='profilePicture' src={res} />
                    </Col>
                    <Col span={2}/>
                    <Col span={6}>
                        <Row className='flex-left'>
                            {Meteor.user().services.facebook.first_name}&nbsp;{Meteor.user().services.facebook.last_name}
                        </Row>
                        <Row className='flex-left'>
                            &#x1F382; {Meteor.user().birthday}
                        </Row>
                        <Row className='flex-left'>
                            {Meteor.user().club} ({Meteor.user().team})
                        </Row>
                    </Col>
                </Row>

                <Row className='flex-box-color' justify='center'>
                    <Col span={1}>{startLevel}</Col>
                    <Col span={10}>
                        LEVEL {Meteor.user().currentLevel} <br />
                        <LinearProgress variant='determinate' value={currentPosition} />
                    </Col>
                    <Col span={1}>{stopLevel}</Col>
                </Row>

                <Row className='flex-box-white' justify='center'>
                    <Col span={3}>
                        <Button variant='raised' fullWidth color='primary' onClick={this.clickCertificates.bind(this)}>
                            <T>profilepage.certificates</T>
                        </Button>
                    </Col>
                    <Col span={1} />
                    <Col span={3}>
                        <Button variant='raised' fullWidth color='primary' onClick={this.clickHighscores.bind(this)}><T>profilepage.highscores</T></Button>
                    </Col>
                    <Col span={1} />
                    <Col span={3}>
                        <Button variant='raised' fullWidth disabled color='primary'>
                            EMPTY
                        </Button>
                    </Col>
                </Row>

                <Row className='flex-box-white' justify='center'>
                    <DaySelector />
                </Row>

                <Row className='flex-box-white' justify='center'>
                    <Col span={5}><ClubSelect /></Col>
                </Row>
                <Row className='flex-box-white' justify='center'>
                    <Col span={5}><TeamSelect /></Col>
                </Row>
                <div className='footer'>
                    <Button href='/bugreport'> bug report </Button>
                </div>
                {this.testForAdmin()}
            </div>
        );
    }
}
