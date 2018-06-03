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

/* Material-UI style */
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

/* Componenten */
import AccountsUIWrapper from './components/AccountsUIWrapper.js';
import CircularIndeterminate from './components/CircularIndeterminate.js';
import HighscoreBoard from './components/HighscoreBoard.js';
import NotYetImplemented from './components/NotYetImplemented.js';
import HeartRate from './components/AnalyseWorkouts/HeartRate.js';
import Weight from './components/AnalyseWorkouts/Weight.js';
import Steps from './components/AnalyseWorkouts/Steps.js';
import Sleep from './components/AnalyseWorkouts/Sleep.js';
import Time from './components/AnalyseWorkouts/Time.js';
import TrainingFeeling from './components/AnalyseWorkouts/TrainingFeeling.js';
import NutritionFeeling from './components/AnalyseWorkouts/NutritionFeeling.js';
import GeneralFeeling from './components/AnalyseWorkouts/GeneralFeeling.js';
import { dayChecker, clickChecker } from './allFunctions.js';

/* Databases */
import { SportData } from '../api/sportdata.js';

/* Language */
const T = i18n.createComponent();

/* Styles */
const styles = theme => ({
    periodButton: {
        background: '#C5CAE9',
        color: '#3F51B5',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        fontWeight: 'bold'
    },
    firstButton: {
        background: '#C5CAE9',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
});

class AnalyseWorkouts extends TrackerReact(Component) {
    constructor() {
        super();

        const generalImage = "/images/grid-world.png";
        const heartbeatImage = "/images/heartbeat.png";
        const weightImage = "/images/weighing.png";
        const stepsImage = "/images/footsteps-silhouette-variant.png";
        const sleepImage = "/images/bed.png";
        const timeImage = "/images/stopwatch.png";
        const trainingImage = "/images/gym.png";
        const nutritionImage = "/images/diet.png";

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            },
            heartrate: true, weight: false, steps: false, sleep: false,
            time: false, generalFeeling: false, trainingFeeling: false,
            nutritionFeeling: false, workpoints: false, day: false, week: false,
            month: false, year: false, overview: true,
            generalSrc: generalImage, heartbeatSrc: heartbeatImage,
            weightSrc: weightImage, stepsSrc: stepsImage, sleepSrc: sleepImage,
            timeSrc: timeImage, trainingSrc: trainingImage,
            nutritionSrc: nutritionImage
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

    clickHeartRate(event) {
        Meteor.call('clickUpdate', 'analyseworkout', 'heartrate');
        this.setState({ heartrate: true, weight: false, steps: false, sleep: false, time: false, generalFeeling: false, trainingFeeling: false, nutritionFeeling: false, workpoints: false });
    }

    clickWeight(event) {
        Meteor.call('clickUpdate', 'analyseworkout', 'weight');
        this.setState({ heartrate: false, weight: true, steps: false, sleep: false, time: false, generalFeeling: false, trainingFeeling: false, nutritionFeeling: false, workpoints: false });
    }

    clickSteps(event) {
        Meteor.call('clickUpdate', 'analyseworkout', 'steps');
        this.setState({ heartrate: false, weight: false, steps: true, sleep: false, time: false, generalFeeling: false, trainingFeeling: false, nutritionFeeling: false, workpoints: false });
    }

    clickSleep(event) {
        Meteor.call('clickUpdate', 'analyseworkout', 'sleep');
        this.setState({ heartrate: false, weight: false, steps: false, sleep: true, time: false, generalFeeling: false, trainingFeeling: false, nutritionFeeling: false, workpoints: false });
    }

    clickTime(event) {
        Meteor.call('clickUpdate', 'analyseworkout', 'time');
        this.setState({ heartrate: false, weight: false, steps: false, sleep: false, time: true, generalFeeling: false, rainingFeeling: false, nutritionFeeling: false, workpoints: false });
    }

    clickGeneralFeeling(event) {
        Meteor.call('clickUpdate', 'analyseworkout', 'generalFeeling');
        this.setState({ heartrate: false, weight: false, steps: false, sleep: false, time: false, generalFeeling: true, trainingFeeling: false, nutritionFeeling: false, workpoints: false });
    }

    clickTrainingFeeling(event) {
        Meteor.call('clickUpdate', 'analyseworkout', 'trainingFeeling');
        this.setState({ heartrate: false, weight: false, steps: false, sleep: false, time: false, generalFeeling: false, trainingFeeling: true, nutritionFeeling: false, workpoints: false });
    }

    clickNutritionFeeling(event) {
        Meteor.call('clickUpdate', 'analyseworkout', 'nutritionFeeling');
        this.setState({ heartrate: false, weight: false, steps: false, sleep: false, time: false, generalFeeling: false, trainingFeeling: false, nutritionFeeling: true, workpoints: false });
    }

    clickWorkpoints(event) {
        Meteor.call('clickUpdate', 'analyseworkout', 'workpoints');
        this.setState({ heartrate: false, weight: false, steps: false, sleep: false, time: false, generalFeeling: false, trainingFeeling: false, nutritionFeeling: false, workpoints: true });
    }

    clickDay(event) {
        Meteor.call('clickUpdate', 'analyseworkout', 'dayMode');
        this.setState({ day: true, week: false, month: false, year: false });
    }

    clickWeek(event) {
        Meteor.call('clickUpdate', 'analyseworkout', 'weekMode');
        this.setState({ day: false, week: true, month: false, year: false });
    }

    clickMonth(event) {
        Meteor.call('clickUpdate', 'analyseworkout', 'monthMode');
        this.setState({ day: false, week: false, month: true, year: false });
    }

    clickYear(event) {
        Meteor.call('clickUpdate', 'analyseworkout', 'yearMode');
        this.setState({ day: false, week: false, month: false, year: true });
    }

    clickOverview(event) {
        Meteor.call('clickUpdate', 'analyseworkout', 'overviewMode');
        this.setState({ day: false, week: false, month: false, year: false });
    }

    renderBox(){
        if (this.state.heartrate) {
            return (<Col span={12}> <HeartRate year={this.state.year} month={this.state.month} week={this.state.week} day={this.state.day}/> </Col>);
        } else if (this.state.weight) {
            return (<Col span={12}> <Weight year={this.state.year} month={this.state.month} week={this.state.week} day={this.state.day}/> </Col>);
        } else if (this.state.steps) {
            return (<Col span={12}> <Steps year={this.state.year} month={this.state.month} week={this.state.week} day={this.state.day}/> </Col>);
        } else if (this.state.sleep) {
            return (<Col span={12}> <Sleep year={this.state.year} month={this.state.month} week={this.state.week} day={this.state.day}/> </Col>);
        } else if (this.state.time) {
            return (<Col span={12}> <Time year={this.state.year} month={this.state.month} week={this.state.week} day={this.state.day}/> </Col>);
        } else if (this.state.generalFeeling) {
            return (<Col span={12}> <GeneralFeeling year={this.state.year} month={this.state.month} week={this.state.week} day={this.state.day}/></Col>);
        } else if (this.state.trainingFeeling) {
            return (<Col span={12}> <TrainingFeeling year={this.state.year} month={this.state.month} week={this.state.week} day={this.state.day} /> </Col>);
        } else if (this.state.nutritionFeeling) {
            return (<Col span={12}> <NutritionFeeling year={this.state.year} month={this.state.month} week={this.state.week} day={this.state.day} /> </Col>);
        } else if (this.state.workpoints) {
            return (
                <Col span={10}>
                    <ul>
                    {
                        SportData.find({ user: Meteor.userId(),
                                        'result.type': 'workPoint'
                        })
                        .map( (item) => {
                            return (
                                <li key={item._id}>
                                    <button className='delete' onClick={this.deleteThisWorkingPoint.bind(this, item)}>
                                        &times;
                                    </button>
                                    {item.result.value}
                                </li>)
                        })
                    }
                    </ul>
                </Col>);
        }
        else {
            return;
        }
    }

    deleteThisWorkingPoint(item, item2) {
        Meteor.call('deleteWorkingPointData', item._id);
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

        return (
            <div className='overall-box'>
                <Row className='period-selector' justify='space-around' align='middle'>
                    <Col span={2}> <Button className={classes.periodButton} size='small' variant='raised' disabled={this.state.day} onClick={this.clickDay.bind(this)}><T>analyseWorkouts.day</T></Button> </Col>
                    <Col span={2}> <Button className={classes.periodButton} size='small' variant='raised' disabled={this.state.week} onClick={this.clickWeek.bind(this)}><T>analyseWorkouts.week</T></Button> </Col>
                    <Col span={2}> <Button className={classes.periodButton} size='small' variant='raised' disabled={this.state.month} onClick={this.clickMonth.bind(this)}><T>analyseWorkouts.month</T></Button> </Col>
                    <Col span={2}> <Button className={classes.periodButton} size='small' variant='raised' disabled={this.state.year} onClick={this.clickYear.bind(this)}><T>analyseWorkouts.year</T></Button> </Col>
                    <Col span={2}> <Button className={classes.periodButton} size='small' variant='raised' disabled={!this.state.day && !this.state.week && !this.state.month && !this.state.year} onClick={this.clickOverview.bind(this)}><T>analyseWorkouts.all</T></Button> </Col>
                </Row>

                <Row className='analyse-workout-graph' justify='center' align='middle'>
                    {this.renderBox()}
                </Row>

                <Row className='category-selector' justify='space-around' align='middle'>
                    <Col span={2}>
                        <Button className={classes.firstButton} size='small' variant='raised' disabled={this.state.heartrate} onClick={this.clickHeartRate.bind(this)}>
                            <img src={this.state.heartbeatSrc} width="50"/>
                        </Button><br/>
                    </Col>
                    <Col span={2}>
                        <Button className={classes.firstButton} size='small' variant='raised' disabled={this.state.weight} onClick={this.clickWeight.bind(this)}>
                            <img src={this.state.weightSrc} width="50"/>
                        </Button>
                    </Col>
                    <Col span={2}>
                        <Button className={classes.firstButton} size='small' variant='raised' disabled={this.state.steps} onClick={this.clickSteps.bind(this)}>
                            <img src={this.state.stepsSrc} width="50"/>
                        </Button>
                    </Col>
                    <Col span={2}>
                        <Button className={classes.firstButton} size='small' variant='raised' disabled={this.state.time} onClick={this.clickTime.bind(this)}>
                            <img src={this.state.timeSrc} width="50"/>
                        </Button>
                    </Col>
                </Row>
                <Row className='category-selector-text' justify='space-around' align='middle'>
                    <Col span={2}> <T>badges.heartrate</T> </Col>
                    <Col span={2}> <T>badges.weight</T> </Col>
                    <Col span={2}> <T>badges.steps</T> </Col>
                    <Col span={2}> <T>badges.time</T> </Col>
                </Row>
                <Row className='category-selector' justify='space-around' align='middle'>
                    <Col span={2}>
                        <Button className={classes.firstButton} size='small' variant='raised' disabled={this.state.generalFeeling} onClick={this.clickGeneralFeeling.bind(this)}>
                            <img src={this.state.generalSrc} width="50"/>
                        </Button>
                    </Col>
                    <Col span={2}>
                        <Button className={classes.firstButton} size='small' variant='raised' disabled={this.state.sleep} onClick={this.clickSleep.bind(this)}>
                            <img src={this.state.sleepSrc} width="50"/>
                        </Button>
                    </Col>
                    <Col span={2}>
                        <Button className={classes.firstButton} size='small' variant='raised' disabled={this.state.trainingFeeling} onClick={this.clickTrainingFeeling.bind(this)}>
                            <img src={this.state.trainingSrc} width="50"/>
                        </Button>
                    </Col>
                    <Col span={2}>
                        <Button className={classes.firstButton} size='small' variant='raised' disabled={this.state.nutritionFeeling} onClick={this.clickNutritionFeeling.bind(this)}>
                            <img src={this.state.nutritionSrc} width="50"/>
                        </Button>
                    </Col>
                </Row>
                <Row className='category-selector-text' justify='space-around' align='middle'>
                    <Col span={2}> <T>badges.generalFeeling</T> </Col>
                    <Col span={2}> <T>badges.sleep</T> </Col>
                    <Col span={2}> <T>badges.trainingFeeling</T> </Col>
                    <Col span={2}> <T>badges.nutritionFeeling</T> </Col>
                </Row>
                <Row className='category-selector' justify='space-around' align='middle'>
                    <Col span={4}>
                        <Button className={classes.periodButton} variant='raised' disabled={this.state.workpoints} onClick={this.clickWorkpoints.bind(this)}>
                            <T>badges.workpoints</T>
                        </Button>
                    </Col>
                </Row>
                <div className='footer'>
                    <Button href='/bugreport'> bug report </Button>
                </div>
            </div>
        );
    }
}

AnalyseWorkouts.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AnalyseWorkouts);
