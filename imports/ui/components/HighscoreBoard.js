/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Material-UI componenten */
import Avatar from 'material-ui/Avatar';

/* Componenten */
import HighscoreBoardSingle from './HighscoreBoardSingle.js';
import NotYetImplemented from './NotYetImplemented.js';
import { getThisWeekList } from './functions.js';

export default class HighscoreBoard extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('allSportdata')
            }
        };
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
        this.state.subscription.sport.stop();
    }

    findIndex(collection) {
        for(var i = 0; i < collection.length; i++) {
            if (collection[i]._id == Meteor.userId()) {
                return i;
            }
        }
    }

    render() {
        if(Meteor.users.find().fetch().length < 1 || !Meteor.userId()) {
            return (<div>Contacteer de administrator</div>);
        }

        var partialCollection;

        if (this.props.first == 'overview') {
            if(!this.props.week) {
                if (this.props.second == 'general') {
                    partialCollection = Meteor.users.find( {}, { sort: { currentPoints: -1 }, limit: 10 }).fetch();
                } else if (this.props.second == 'club') {
                    partialCollection = Meteor.users.find({ club: Meteor.user().club }, { sort: { currentPoints: -1 }, limit: 10 }).fetch();
                } else if (this.props.second == 'team') {
                    partialCollection = Meteor.users.find({ team: Meteor.user().team }, { sort: { currentPoints: -1 }, limit: 10 }).fetch();
                } else {
                    return (<div><NotYetImplemented /></div>);
                }
            } else {
                if (this.props.second == 'general') {
                    partialCollection = getThisWeekList(CHECK_DATE).find( {}, { sort: { score: -1 }, limit: 10} ).fetch();
                } else if (this.props.second == 'club') {
                    partialCollection = getThisWeekList(CHECK_DATE).find({ club: Meteor.user().club }, { sort: { score: -1 }, limit: 10} ).fetch();
                } else if (this.props.second == 'team') {
                    partialCollection = getThisWeekList(CHECK_DATE).find({ team: Meteor.user().team }, { sort: { score: -1 }, limit: 10} ).fetch();
                } else {
                    return (<div><NotYetImplemented /></div>);
                }
            }
            return (
                <div className='flex-box-color'>
                    {partialCollection.map( (singleUser) => {
                        return <HighscoreBoardSingle score={singleUser.score} type={this.props.second} key={singleUser._id} person={singleUser} />
                    })}
                </div>
            );

        } else if (this.props.first == 'personal') {
            if(!this.props.week) {
                if (this.props.second == 'general') {
                    partialCollection = Meteor.users.find( {}, { sort: { currentPoints: -1 } }).fetch();
                } else if (this.props.second == 'club') {
                    partialCollection = Meteor.users.find({ club: Meteor.user().club }, { sort: { currentPoints: -1 } }).fetch();
                } else if (this.props.second == 'team') {
                    partialCollection = Meteor.users.find({ team: Meteor.user().team }, { sort: { currentPoints: -1 } }).fetch();
                } else {
                    return (<div><NotYetImplemented /></div>);
                }
            } else {
                if (this.props.second == 'general') {
                    partialCollection = getThisWeekList(CHECK_DATE).find( {}, { sort: { score: -1 } } ).fetch();
                } else if (this.props.second == 'club') {
                    partialCollection = getThisWeekList(CHECK_DATE).find({ club: Meteor.user().club }, { sort: { score: -1 } } ).fetch();
                } else if (this.props.second == 'team') {
                    partialCollection = getThisWeekList(CHECK_DATE).find({ team: Meteor.user().team }, { sort: { score: -1 } } ).fetch();
                } else {
                    return (<div><NotYetImplemented /></div>);
                }
            }

            if (partialCollection.length <= 10) {
                return (
                    <div className='flex-box-color'>
                        {partialCollection.map( (singleUser) => {
                            return <HighscoreBoardSingle score={singleUser.score} type={this.props.second} key={singleUser._id} person={singleUser} />
                        })}
                    </div>
                );
            } else {
                const userIndex = this.findIndex(partialCollection);
                var startIndex;
                var stopIndex;
                var newPartialCollection;

                if (userIndex <= 5) {
                    newPartialCollection = partialCollection.slice(0, 10);
                } else if (partialCollection.length - 4 <= userIndex && userIndex <= partialCollection.length - 1) {
                    newPartialCollection = partialCollection.slice(partialCollection.length-10, partialCollection.length);
                } else {
                    newPartialCollection = partialCollection.slice(userIndex-5, userIndex+5);
                }

                return (
                    <div className='flex-box-color'>
                        {newPartialCollection.map( (singleUser) => {
                            return <HighscoreBoardSingle score={singleUser.score} type={this.props.second} key={singleUser._id} person={singleUser} />
                        })}
                    </div>
                );
            }
        } else {
            return (<div><NotYetImplemented /></div>);
        }
    }
}

const CHECK_DATE = (moment().format('dddd') === 'Sunday' ?
                    moment().startOf('week').add(1, 'day').subtract(1, 'week').format('YYYY-MM-DD') :
                    moment().startOf('week').add(1, 'day').format('YYYY-MM-DD')
                    );
