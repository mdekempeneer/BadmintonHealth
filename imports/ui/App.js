/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import CircularProgressbar from 'react-circular-progressbar';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Material-UI componenten */
import Button from 'material-ui/Button';

/* Material-UI icons */
import Create from 'material-ui-icons/Create';
import RemoveRedEye from 'material-ui-icons/RemoveRedEye';
import Settings from 'material-ui-icons/Settings';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Watch from 'material-ui-icons/Watch';
import AlarmAdd from 'material-ui-icons/AlarmAdd';
import AlarmOn from 'material-ui-icons/AlarmOn';

/* Material-UI style */
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

/* Componenten */
import AccountsUIWrapper from './components/AccountsUIWrapper.js';
import CircularIndeterminate from './components/CircularIndeterminate.js';
import HighscoreSummary from './components/HighscoreSummary.js';
import BadgesSummary from './components/BadgesSummary.js';
import { dayChecker, lowerLevel, upperLevel, clickChecker, createReminders, levelChecker } from './allFunctions.js';
import { heartRateScore} from './scoreCalculator.js';
import badgeChecker from './components/Badges/badgeChecker.js';

/* Databases */
import { SportData } from '../api/sportdata'
import { Clicks } from '../api/clicks.js';

/* Language */
const T = i18n.createComponent();

/* Styles */
const styles = theme => ({
    button: {
        margin: 0,
        height: 55,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
        textAlign: 'right'
    }
});

class App extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        const trophyImage = "/images/trophy.png"

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            },
            trophySrc: trophyImage
        };
    }

    componentDidMount() {
        if (Meteor.user()) {
            dayChecker();
            clickChecker();
            createReminders();
        }
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
        this.state.subscription.sport.stop();
    }

    clickAddWorkout(event) {
        Meteor.call('clickUpdate', 'startpage', 'addWorkout');
        FlowRouter.go('/addworkouts');
    }

    clickViewWorkout(event) {
        Meteor.call('clickUpdate', 'startpage', 'viewWorkout');
        FlowRouter.go('/analyseworkouts');
    }

    clickGoals(event) {
        Meteor.call('clickUpdate', 'startpage', 'goals');
        FlowRouter.go('/personalgoals');
    }

    clickMiBand(event) {
        Meteor.call('clickUpdate', 'startpage', 'miBand');
        FlowRouter.go('/connect');
    }

    clickStartSport(event) {
        Meteor.call('timerBool', true);
        Meteor.call('clickUpdate', 'startpage', 'startSport');
        Meteor.call('startTimer');
    }

    clickStopSport(event) {
        Meteor.call('timerBool', false);
        Meteor.call('clickUpdate', 'startpage', 'stopSport');
        const item = SportData.find({
                        user: Meteor.userId(),
                        'result.type': 'timer'
                    }).fetch();
        const difference = moment(new Date()).diff(item[0].date);
        if (difference > 2 * 60 * 60 * 1000) { // Langer dan 2u
            Bert.alert('Je bent vergeten je timer uit te zetten na je sport.', 'danger', 'fixed-bottom');
        } else if (difference < 0.25 * 60 * 60 * 1000) { // Korter dan een kwartier
            Bert.alert('Je sportsessie was te kort.', 'danger', 'fixed-bottom');
        } else {
            Bert.alert('Je hebt ' + epoch_to_hh_mm_ss(difference) + ' gesport.', 'success', 'fixed-bottom');
            const differencePoints = ((difference/1000)/60)/4; // per 4 min een punt
            Meteor.call('updateTime', difference, differencePoints, () => {
                levelChecker();
                badgeChecker();
            });
        }
        Meteor.call('deleteTimer', item[0]._id);
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

        let startLevel = lowerLevel[Meteor.user().currentLevel-1];
        let stopLevel = upperLevel[Meteor.user().currentLevel-1];
        let currentPosition = 100 * ((Meteor.user().currentPoints - startLevel) / (stopLevel - startLevel));

        const { classes } = this.props;

        return (
            <div className='overall-box'>
                <Col className='startpage-level'>
                    <div>LEVEL</div>
                </Col>
                <Col className='startpage-circle'>
                    <CircularProgressbar percentage={currentPosition}
                                         initialAnimation={true}
                                         textForPercentage={(pct) => `${Meteor.user().currentLevel}`}
                    />
                </Col>
                <Col className='startpage-level'>
                    <div>SPORTER</div>
                </Col>

                <Row className='startpage-workout-button' justify='space-between' align='middle'>
                    <Col span={5}>
                        <Button className={classes.button} variant='raised' fullWidth={true} color='primary' onClick={this.clickAddWorkout.bind(this)}>
                            <T>startpage.add_workout</T><Create className={classes.rightIcon} style={{width: 30, height: 30}}/>
                        </Button>
                    </Col>
                    <Col span={5}>
                        <Button className={classes.button} variant='raised' fullWidth={true} color='primary' onClick={this.clickViewWorkout.bind(this)}>
                            <T>startpage.view_workouts</T><RemoveRedEye className={classes.rightIcon} style={{width: 30, height: 30}}/>
                        </Button>
                    </Col>
                </Row>

                <Row className='startpage-workout-button' justify='space-between' align='middle'>
                    <Col span={5}>
                        <Button className={classes.button} variant='raised' fullWidth={true} color='primary' onClick={this.clickGoals.bind(this)}>
                            <T>startpage.personal_goals</T><img src={this.state.trophySrc} className={classes.rightIcon} width="30"/>
                        </Button>
                    </Col>
                    <Col span={5}>
                        <Button className={classes.button} disabled={checkDisabled()} variant='raised' fullWidth={true} color='primary' onClick={this.clickMiBand.bind(this)}>
                            <T>startpage.miband</T><Watch className={classes.rightIcon}  style={{width: 30, height: 30}}/>
                        </Button>
                    </Col>
                </Row>

                <Row className='startpage-workout-button' justify='space-between' align='middle'>
                    <Col span={5}>
                        <Button className={classes.button} disabled={startDisabled()} variant='raised' fullWidth={true} color='primary' onClick={this.clickStartSport.bind(this)}>
                            <T>startpage.start_sport</T><AlarmAdd className={classes.rightIcon} style={{width: 30, height: 30}}/>
                        </Button>
                    </Col>
                    <Col span={5}>
                        <Button className={classes.button} disabled={stopDisabled()} variant='raised' fullWidth={true} color='primary' onClick={this.clickStopSport.bind(this)}>
                            <T>startpage.stop_sport</T><AlarmOn className={classes.rightIcon} style={{width: 30, height: 30}}/>
                        </Button>
                    </Col>
                </Row>

                <Row className='badge-summary' justify='center'>
                    <Col span={12}><BadgesSummary /></Col>
                </Row>

                <Row className='highscore-summary' justify='center'>
                    <Col span={12}><HighscoreSummary /></Col>
                </Row>
                <div className='footer'>
                    <Button href='/bugreport'> bug report </Button>
                </div>
            </div>
        );
    }
}

const ACCESS_USER = ['jEs3qbkPaqLJj2ca7', 'Tb5rPv5G3LA4Jnh6R', 'QQrHzuv4WsGvQCsqK', 'SmKqunqyQkzk2K5Wq', 'Pu57KRZeKz3DHjeny', 'd2v6PnycDgDqo9ZDg', 'scL3siaP2HKf93TrQ', 'XfoZ24b44DQdSG86X', 'JHxJcMSZRCjy3rpRd', '4t539YMkE8PyvYtz4']

function checkDisabled() {
    if ($.inArray(Meteor.userId(), ACCESS_USER) !== -1) {
        return false;
    } else {
        return true;
    }
}

function startDisabled() {
    return Meteor.user().timer;
}

function stopDisabled() {
    return !Meteor.user().timer;
}

function epoch_to_hh_mm_ss(epoch) {
    return new Date(epoch).toISOString().substr(12, 7)
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
