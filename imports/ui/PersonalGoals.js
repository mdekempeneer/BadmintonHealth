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
import { CircularProgress } from 'material-ui/Progress';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

/* Material-UI style */
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

/* Componenten */
import AccountsUIWrapper from './components/AccountsUIWrapper.js';
import CircularIndeterminate from './components/CircularIndeterminate.js';
import FootstepGoalsInput from './components/FootstepGoalsInput.js';
import SportTimeGoalInput from './components/SportTimeGoalInput.js';
import SportSessionsGoalsInput from './components/SportSessionsGoalsInput.js';
import NotYetImplemented from './components/NotYetImplemented.js';
import badgeChecker from './components/Badges/badgeChecker.js';
import { dayChecker, clickChecker } from './allFunctions.js';

/* Databases */
import { SportData } from '../api/sportdata.js';
import { PersonalGoalData } from '../api/personalgoals.js';

/* Language */
const T = i18n.createComponent();

/* Styles */
const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing.unit * 3,
        backgroundColor: theme.palette.background.paper,
    },
});

class PersonalGoals extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata'),
                goals: Meteor.subscribe('personalgoals')
            },
            value: 'one'
        }
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
        this.state.subscription.sport.stop();
        this.state.subscription.goals.stop();
    }

    componentDidMount() {
        if (Meteor.user()) {
            dayChecker();
            clickChecker();
        }
    }

    handleChange = (event, value) => {
        Meteor.call('clickUpdate', 'personalGoal', value);
        this.setState({ value });
    };

    footStepChecker() {
        var check = PersonalGoalData.find({ user: Meteor.userId(),
                                            type: 'footsteps',
                                            date: CHECK_DATE
                                        });
        if (check.count() === 1) {
            var amount = 0;
            SportData.find({ user: Meteor.userId(),
                             'result.type': 'stepCount',
                             'result.creationDate': { $gte: CHECK_DATE }
            })
            .map( (item) => {
                amount += parseInt(item.result.value)
            });
            var percent = amount/(7*check.fetch()[0].amount)*100;
            return (
                <LinearProgress variant='determinate' value={percent} />
            );
        }
    }

    sportTimeChecker() {
        var check = PersonalGoalData.find({ user: Meteor.userId(),
                                            type: 'sporttime',
                                            date: CHECK_DATE
                                        });
        if (check.count() === 1) {
            var amount = 0;
            SportData.find({ user: Meteor.userId(),
                             'result.type': 'time',
                             'result.creationDate': { $gte: CHECK_DATE }
            })
            .map( (item) => {
                amount += parseInt(item.result.value)
            });
            var percent = amount/check.fetch()[0].amount*100;
            return (
                <LinearProgress variant='determinate' value={percent} />
            );
        }
    }

    sportSessionChecker() {
        var check = PersonalGoalData.find({ user: Meteor.userId(),
                                            type: 'sportsessions',
                                            date: CHECK_DATE
                                        });
        if (check.count() === 1) {
            var amount = 0;
            SportData.find({ user: Meteor.userId(),
                             'result.type': 'time',
                             'result.creationDate': { $gte: CHECK_DATE }
            })
            .map( (item) => {
                amount += parseInt(item.result.times)
            });
            var percent = amount/check.fetch()[0].amount*100;
            return (
                <LinearProgress variant='determinate' value={percent} />
            );
        }
    }

    contentRender() {
        const { classes } = this.props;

        if (this.state.value === 'one') {
            return (
                <div>
                    <FootstepGoalsInput />
                    {this.footStepChecker()} <br/>
                    <div>
                        {this.totalCheckFootstep()}
                        <Row justify='space-between' align='middle'>
                            <T>goals.last_weeks</T>
                        </Row>
                        <Row justify='space-between' align='middle'>
                            {
                                PersonalGoalData.find({
                                    user: Meteor.userId(),
                                    type: 'footsteps'
                                }, { sort: { date: -1 }
                                }).map( (item) => {
                                    if (item.date === CHECK_DATE) { return; }
                                    return (
                                        <Col span={3} key={item._id}>
                                            <CircularProgress key={item._id} className={classes.progress} thickness={7.5} size={100} variant='static' value={item.reached / (7*item.amount) * 100} /><br/>
                                            Week: {moment(item.date).week()}
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    </div>
                </div>
            );
        } else if (this.state.value === 'two') {
            return (
                <div>
                    <SportTimeGoalInput />
                    {this.sportTimeChecker()} <br/>
                    <div>
                        {this.totalCheckSportTime()}
                        <Row justify='space-between' align='middle'>
                            <T>goals.last_weeks</T>
                        </Row>
                        <Row justify='space-between' align='middle'>
                            {
                                PersonalGoalData.find({
                                    user: Meteor.userId(),
                                    type: 'sporttime'
                                }, { sort: { date: -1 }
                                }).map( (item) => {
                                    if (item.date === CHECK_DATE) { return; }
                                    return (
                                        <Col span={3} key={item._id}>
                                            <CircularProgress key={item._id} className={classes.progress} thickness={7.5} size={100} variant='static' value={item.reached / (item.amount) * 100} /><br/>
                                            Week: {moment(item.date).week()}
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    </div>
                </div>
            );
        } else if (this.state.value === 'three') {
            return (
                <div>
                    <SportSessionsGoalsInput />
                    {this.sportSessionChecker()} <br/>
                    <div>
                        {this.totalCheckSportSessions()}
                        <Row justify='space-between' align='middle'>
                            <T>goals.last_weeks</T>
                        </Row>
                        <Row justify='space-between' align='middle'>
                            {
                                PersonalGoalData.find({
                                    user: Meteor.userId(),
                                    type: 'sportsessions'
                                }, { sort: { date: -1 }
                                }).map( (item) => {
                                    if (item.date === CHECK_DATE) { return; }
                                    return (
                                        <Col span={3} key={item._id}>
                                            <CircularProgress key={item._id} className={classes.progress} thickness={7.5} size={100} variant='static' value={item.reached / (item.amount) * 100} /><br/>
                                            Week: {moment(item.date).week()}
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    </div>
                </div>
            );
        }
    }

    totalCheckFootstep() {
        PersonalGoalData.find({
            user: Meteor.userId(),
            type: 'footsteps'
        })
        .map( (item) => {
            if (item.date === CHECK_DATE) {
            } else if (item.reached === undefined) {
                var amount = 0;
                SportData.find({ user: Meteor.userId(),
                                 'result.type': 'stepCount',
                                 'result.creationDate': {
                                     $gte: item.date,
                                     $lt: moment(item.date).add(1,'week').format('YYYY-MM-DD')
                                 }
                })
                .map( (sport) => {
                    amount += parseInt(sport.result.value)
                })
                Meteor.call('reachedGoalData', item, amount)
            } else {
            }
        });
    }

    totalCheckSportTime() {
        PersonalGoalData.find({
            user: Meteor.userId(),
            type: 'sporttime'
        })
        .map( (item) => {
            if (item.date === CHECK_DATE) {
            } else if (item.reached === undefined) {
                var amount = 0;
                SportData.find({ user: Meteor.userId(),
                                 'result.type': 'time',
                                 'result.creationDate': {
                                     $gte: item.date,
                                     $lt: moment(item.date).add(1,'week').format('YYYY-MM-DD')
                                 }
                })
                .map( (sport) => {
                    amount += parseInt(sport.result.value)
                })
                Meteor.call('reachedGoalData', item, amount)
            } else {
            }
        });
    }

    totalCheckSportSessions() {
        PersonalGoalData.find({
            user: Meteor.userId(),
            type: 'sportsessions'
        })
        .map( (item) => {
            if (item.date === CHECK_DATE) {
            } else if (item.reached === undefined) {
                var amount = 0;
                SportData.find({ user: Meteor.userId(),
                                 'result.type': 'time',
                                 'result.creationDate': {
                                     $gte: item.date,
                                     $lt: moment(item.date).add(1,'week').format('YYYY-MM-DD')
                                 }
                })
                .map( (sport) => {
                    amount += parseInt(sport.result.times)
                })
                Meteor.call('reachedGoalData', item, amount)
            } else {
            }
        });
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

        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position='static'>
                    <Tabs value={value} onChange={this.handleChange} fullWidth>
                        <Tab value='one' label={i18n.__('goals.footsteps')} />
                        <Tab value='two' label={i18n.__('goals.sport_time')} />
                        <Tab value='three' label={i18n.__('goals.sport_sessions')} />
                    </Tabs>
                </AppBar>
                <div className='flex-box-color'>
                    {this.contentRender()}
                </div>
            </div>
        );
    }
}

const CHECK_DATE = (moment().format('dddd') === 'Sunday' ?
                    moment().startOf('week').add(1, 'day').subtract(1, 'week').format('YYYY-MM-DD') :
                    moment().startOf('week').add(1, 'day').format('YYYY-MM-DD')
                    );

export default withStyles(styles)(PersonalGoals);
