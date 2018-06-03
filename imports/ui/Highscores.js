/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Material-UI componenten */
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

/* Componenten */
import AccountsUIWrapper from './components/AccountsUIWrapper.js';
import CircularIndeterminate from './components/CircularIndeterminate.js';
import HighscoreBoard from './components/HighscoreBoard.js';
import badgeChecker from './components/Badges/badgeChecker.js';
import { dayChecker, clickChecker } from './allFunctions.js';

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
                sport: Meteor.subscribe('allSportdata')
            },
            firstSelect: 'overview', secondSelect: 'general',
            overviewButton: true, personalButton: false,
            generalButton: true, clubButton: false,
            teamButton: false, thisWeek: false
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

    makeGeneral(event) {
        Meteor.call('clickUpdate', 'highscore', 'general');
        this.setState({ secondSelect: 'general', generalButton: true, clubButton: false, teamButton: false });
    }

    makeClub(event) {
        Meteor.call('clickUpdate', 'highscore', 'sportclub');
        this.setState({ secondSelect: 'club', generalButton: false, clubButton: true, teamButton: false });
    }

    makeTeam(event) {
        Meteor.call('clickUpdate', 'highscore', 'team');
        this.setState({ secondSelect: 'team', generalButton: false, clubButton: false, teamButton: true });
    }

    makeOverview(event) {
        Meteor.call('clickUpdate', 'highscore', 'overview');
        this.setState({ firstSelect: 'overview', overviewButton: true, personalButton: false });
    }

    makePersonal(event) {
        Meteor.call('clickUpdate', 'highscore', 'personal');
        this.setState({ firstSelect: 'personal', overviewButton: false, personalButton: true });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        Meteor.call('clickUpdate', 'highscore', event.target.checked);
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
                <Row className='flex-box-white' justify='space-around' align='middle'>
                    <Col span={3} />
                    <Col span={3}>
                        <Button variant='raised' disabled={this.state.overviewButton} fullWidth color='primary' onClick={this.makeOverview.bind(this)}><T>highscore.overview</T></Button>
                    </Col>
                    <Col span={3}>
                        <Button variant='raised' disabled={this.state.personalButton} fullWidth color='primary' onClick={this.makePersonal.bind(this)}><T>highscore.personal</T></Button>
                    </Col>
                </Row>
                <Col span={3}>
                    <Row className='flex-box-white' justify='center' align='middle'>
                        <Button variant='raised' disabled={this.state.generalButton} fullWidth color='primary' onClick={this.makeGeneral.bind(this)}><T>highscore.general</T></Button>
                    </Row>
                    <Row className='flex-box-white' justify='center' align='middle'>
                        <Button variant='raised' disabled={this.state.clubButton} fullWidth color='primary' onClick={this.makeClub.bind(this)}><T>highscore.sportsclub</T></Button>
                    </Row>
                    <Row className='flex-box-white' justify='center' align='middle'>
                        <Button variant='raised' disabled={this.state.teamButton} fullWidth color='primary' onClick={this.makeTeam.bind(this)}><T>highscore.team</T></Button>
                    </Row>
                    <Row>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.thisWeek}
                                    onChange={this.handleChange('thisWeek')}
                                    value='thisWeek'
                                    color='primary'
                                />
                            }
                            label={i18n.__('highscore.this_week')}
                        />
                    </Row>
                </Col>
                <Col span={9}><HighscoreBoard week={this.state.thisWeek} first={this.state.firstSelect} second={this.state.secondSelect}/></Col>
                <div className='footer'>
                    <Button href='/bugreport'> bug report </Button>
                </div>
            </div>
        );
    }
}
