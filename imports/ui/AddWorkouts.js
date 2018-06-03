/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Material-UI componenten */
import Button from 'material-ui/Button';
import Stepper, { Step, StepButton } from 'material-ui/Stepper';
import Typography from 'material-ui/Typography';

/* Material-UI icons */

/* Material-UI style */
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

/* Componenten */
import AccountsUIWrapper from './components/AccountsUIWrapper.js';
import CircularIndeterminate from './components/CircularIndeterminate.js';
import RateButtons from './components/RateButtons.js';
import WeightInput from './components/WeightInput.js';
import SleepInput from './components/SleepInput.js';
import StepsInput from './components/StepsInput.js';
import TrainingWorkingPoints from './components/TrainingWorkingPoints.js';
import HeartrateInputMax from './components/HeartrateInputMax.js';
import HeartrateInputAvg from './components/HeartrateInputAvg.js';
import SportTimeInput from './components/SportTimeInput.js';
import { dayChecker, clickChecker } from './allFunctions.js';

/* Databases */
import { SportData } from '../api/sportdata.js';

import { levelChecker } from './allFunctions.js';
import badgeChecker from './components/Badges/badgeChecker.js';

/* Language */
const T = i18n.createComponent();

/* Styles */
const styles = theme => ({
    root: {
        width: '100%'
    },
    button: {
        marginRight: theme.spacing.unit
    },
    completed: {
        display: 'inline-block'
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    other: {
        width: 50,
        fontWeight: 'bold',
        color: '#3F51B5'
    }
});


class AddWorkouts extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        const runImage = "/images/running.png";
        const badmintonImage = "/images/shuttlecock.png";
        const walkingImage = "/images/pedestrian-walking.png";
        const bikingImage = "/images/bicycle-rider.png";
        const swimImage = "/images/swimming-figure.png";
        const dumbbellImage = "/images/muscle.png";

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            },
            activeStep: 0, completed: {},
            runSrc: runImage, badmintonSrc: badmintonImage, walkingSrc: walkingImage,
            bikingSrc: bikingImage, swimSrc: swimImage, dumbbellSrc: dumbbellImage
        }

        this.clickSport = this.clickSport.bind(this)
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

    completedSteps() { return Object.keys(this.state.completed).length; }

    totalSteps = () => { return getSteps().length; }

    isLastStep() { return this.state.activeStep === this.totalSteps() - 1; }

    allStepsCompleted() { return this.completedSteps() === this.totalSteps(); }

    handleNext = () => {
        let activeStep;

        if (this.isLastStep() && !this.allStepsCompleted()) {
            const steps = getSteps();
            activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
        } else {
            activeStep = this.state.activeStep + 1;
        }
        this.setState({ activeStep, });
        Meteor.call('clickUpdate', 'addworkout', this.state.activeStep.toString());
    }

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({ activeStep: activeStep - 1, });
        Meteor.call('clickUpdate', 'addworkout', this.state.activeStep.toString());
    }

    handleStep = step => () => {
        this.setState({ activeStep: step, });
        Meteor.call('clickUpdate', 'addworkout', this.state.activeStep.toString());
    }

    handleComplete = () => {
        const { completed } = this.state;
        completed[this.state.activeStep] = true;
        this.setState({ completed, });
        this.handleNext();
    }

    handleReset = () => {
        this.setState({ activeStep: 0, completed: {}, });
        Meteor.call('clickUpdate', 'addworkout', this.state.activeStep.toString());
    }

    removeLastInserted = () => {
        const list = SportData.find({ user: Meteor.userId() },
                                    { sort: { date: -1 }, limit: 1 })
                                    .fetch();
        const idRemove = list[0]._id;
        Meteor.call('removeSportDataId', idRemove);
        Meteor.call('clickUpdate', 'addworkout', 'undo');
    }

    undoCheck() {
        const list = SportData.find({ user: Meteor.userId(), 'result.creationDate': {$regex: DAY} });
        return (list.count() !== 0);
    }

    sportChooser() {
        const list = SportData.find({ user: Meteor.userId(), 'result.type': 'sport', 'result.creationDate': TODAY });

        if (list.count() === 0) {
            const { classes } = this.props;
            return (
                <Row className='flex-box-color' justify='center' align='middle'>
                    <Button size='small' onClick={this.clickSport('badminton')}><img src={this.state.badmintonSrc} width="50"/></Button>
                    <Button size='small' onClick={this.clickSport('walk')}><img src={this.state.walkingSrc} width="50"/></Button>
                    <Button size='small' onClick={this.clickSport('bike')}><img src={this.state.bikingSrc} width="50"/></Button>
                    <Button size='small' onClick={this.clickSport('run')}><img src={this.state.runSrc} width="50"/></Button>
                    <Button size='small' onClick={this.clickSport('swim')}><img src={this.state.swimSrc} width="50"/></Button>
                    <Button size='small' onClick={this.clickSport('power')}><img src={this.state.dumbbellSrc} width="50"/></Button>
                    <Button className={classes.other} size='small' onClick={this.clickSport('other')}>Other sport</Button>
                </Row>
            )
        }  else {
            return (
                <Row className='flex-box-color' justify='center' align='middle'>
                    <RateButtons question={i18n.__('addWorkouts.sense_training')} type={'senseTraining'} />
                    <RateButtons question={i18n.__('addWorkouts.sick_health_training')} type={'sickHealth'} />
                    <RateButtons question={i18n.__('addWorkouts.pain_training')} type={'pain'} />
                    <RateButtons question={i18n.__('addWorkouts.score_training')} type={'trainingScore'} />
                    <Col span={12} align='middle'> <TrainingWorkingPoints /> </Col>
                    <Col span={12} align='middle'> <HeartrateInputMax /> </Col>
                    <Col span={12} align='middle'> <HeartrateInputAvg /> </Col>
                    <Col span={12} align='middle'> <SportTimeInput /> </Col>
                    {this.checkTrainingFeelingDone()}
                </Row>
            );
        }
    }

    clickSport(type) {
        return event => {
            Meteor.call('addSport', type, 1 , () => {
                levelChecker();
                badgeChecker();
            });
        }
    }

    getStepContent(step) {
        if (step === 0) {
            return (
                <Row className='flex-box-color' justify='center' align='middle'>
                    <RateButtons question={i18n.__('addWorkouts.general_feeling')}  type={'generalFeeling'} />
                    <Col span={12} align='middle'> <WeightInput /> </Col>
                    {this.checkGeneralFeelingDone()}
                </Row>
            );
        } else if (step === 1) {
            return (
                <Row className='flex-box-color' justify='center' align='middle'>
                    <Col span={12} align='middle'> <SleepInput /> </Col>
                    <RateButtons question={i18n.__('addWorkouts.quality_sleep')} type={'sleepQuality'} />
                    <RateButtons question={i18n.__('addWorkouts.rested')} type={'fatigue'} />
                    {this.checkSleepFeelingDone()}
                </Row>
            );
        } else if (step === 2) {
            return (
                <div> {this.sportChooser()} </div>
            );
        } else if (step === 3) {
            return (
                <Row className='flex-box-color' justify='center' align='middle'>
                    <RateButtons question={i18n.__('addWorkouts.breakfast')} type={'breakfast'} />
                    <RateButtons question={i18n.__('addWorkouts.lunch')} type={'lunch'} />
                    <RateButtons question={i18n.__('addWorkouts.diner')} type={'diner'} />
                    {this.checkNutritionFeelingDone()}
                </Row>
            );
        } else if (step === 4) {
            return (
                <Row className='flex-box-color' justify='center' align='middle'>
                    <Col span={12} align='middle'> <StepsInput /> </Col>
                </Row>
            );
        } else {
            return;
        }
    }

    checkGeneralFeelingDone() {
        const check = dataCountMultiList(['generalFeeling', 'HKQuantityTypeIdentifierWeight']);
        if (check >= 2) { this.handleComplete(); }
    }

    checkSleepFeelingDone() {
        const check = dataCountMultiList(['sleepQuality', 'fatigue', 'lightSleep', 'deepSleep']);
        if (check >= 4) { this.handleComplete(); }
    }

    checkTrainingFeelingDone() {
        const check = dataCountMultiList(['senseTraining', 'sickHealth', 'pain', 'trainingScore', 'workPoint', 'time']);
        const check6 = databaseCountRegexExtra('HeartRate', 'max');
        const check7 = databaseCountRegexExtra('HeartRate', 'avg');
        if (check >= 6 && check6 >= 1 && check7 >= 1) { this.handleComplete(); }
    }

    checkNutritionFeelingDone() {
        const check = dataCountMultiList(['breakfast', 'lunch', 'diner']);
        if (check >= 3) { this.handleComplete(); }
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
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
                <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepButton onClick={this.handleStep(index)} completed={this.state.completed[index]} >
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>

                <div>
                    {this.allStepsCompleted() ? (
                        <div className='rate-all-check'>
                            &#x1f44d; <T>addWorkouts.completed_all</T> &#x1f44d;
                        </div>
                    ) : (
                        <div>
                            {this.getStepContent(activeStep)}
                            <div>
                                <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button} >
                                    <T>addWorkouts.back</T>
                                </Button>
                                <Button variant='raised' color='primary' onClick={this.handleNext} className={classes.button} >
                                    <T>addWorkouts.next</T>
                                </Button>
                                <Button disabled={!(this.undoCheck())} variant='raised' color='primary' onClick={this.removeLastInserted} className={classes.button} >
                                    <T>addWorkouts.undo</T>
                                </Button>
                                {activeStep !== steps.length &&
                                    (this.state.completed[this.state.activeStep] ? (
                                        <Typography variant='caption' className={classes.completed}>
                                            Step {activeStep + 1} already completed
                                        </Typography>
                                    ) : (
                                        <div/>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className='footer'>
                    <Button href='/bugreport'> bug report </Button>
                </div>
            </div>
        );
    }
}

const TODAY = moment().startOf('day').format('YYYY-MM-DD');
const DAY = '.*'.concat(TODAY).concat('.*');

function getSteps() {
    return [i18n.__('addWorkouts.general'), i18n.__('addWorkouts.sleep'), i18n.__('addWorkouts.training'), i18n.__('addWorkouts.nutrition'), i18n.__('addWorkouts.other')];
}

function databaseCount(type) {
    return SportData.find({ user: Meteor.userId(), 'result.type': type, 'result.creationDate': TODAY }).count();
}

function databaseCountRegex(type) {
    return SportData.find({ user: Meteor.userId(), 'result.type': type, 'result.creationDate': {$regex: DAY} }).count();
}

function dataCountMultiList(list) {
    return SportData.find({ user: Meteor.userId(), 'result.type': {$in: list}, 'result.creationDate': {$regex: DAY} }).count();
}

function databaseCountRegexExtra(type, extra) {
    return SportData.find({ user: Meteor.userId(), 'result.type': type, 'result.creationDate': {$regex: DAY}, 'result.extra': extra }).count();
}

AddWorkouts.propTypes = {
    classes: PropTypes.object,
}

export default withStyles(styles)(AddWorkouts);
