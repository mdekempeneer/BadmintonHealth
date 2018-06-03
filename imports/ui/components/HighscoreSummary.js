/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import CircularProgressbar from 'react-circular-progressbar';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Material-UI componenten */
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';

/* Componenten */
import HighscoreSummarySingle from './HighscoreSummarySingle.js';

/* Language */
const T = i18n.createComponent();

export default class HighscoreSummary extends TrackerReact(Component) {
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

    clickMore(event) {
        Meteor.call('clickUpdate', 'startpage', 'moreHighscores');
        FlowRouter.go('/highscores');
    }

    render() {
        if(Meteor.users.find().fetch().length < 1 || !Meteor.userId()) {
            return (<div>Contacteer de administrator</div>);
        }

        var partialCollection = Meteor.users.find({}, { sort: { currentPoints: -1 }}).fetch();
        const userIndex = this.findIndex(partialCollection);

        if (1 <= partialCollection.length && partialCollection.length <= 3) {
            return (
                <div className='box-highscores'>
                    {partialCollection.map( (singleUser) => {
                        return <HighscoreSummarySingle key={singleUser._id} person={singleUser} />
                    })}
                    <Row className= 'button-more' justify='center' align='middle'>
                        <Col span={12}> <Button color='inherit' size='small' onClick={this.clickMore.bind(this)}><T>highscore.more</T></Button> </Col>
                    </Row>
                </div>
            );
        } else {
            if (userIndex == 0) {
                return (
                    <div className='box-highscores'>
                        <HighscoreSummarySingle person={partialCollection[userIndex]} />
                        <HighscoreSummarySingle person={partialCollection[userIndex+1]} />
                        <HighscoreSummarySingle person={partialCollection[userIndex+2]} />
                        <Row className= 'button-more' justify='center' align='middle'>
                            <Col span={12}> <Button color='inherit' size='small' onClick={this.clickMore.bind(this)}><T>highscore.more</T></Button> </Col>
                        </Row>
                    </div>
                );
            } else if(userIndex == partialCollection.length-1){
                return (
                    <div className='box-highscores'>
                        <HighscoreSummarySingle person={partialCollection[userIndex-2]} />
                        <HighscoreSummarySingle person={partialCollection[userIndex-1]} />
                        <HighscoreSummarySingle person={partialCollection[userIndex]} />
                        <Row className= 'button-more' justify='center' align='middle'>
                            <Col span={12}> <Button color='inherit' size='small' onClick={this.clickMore.bind(this)}><T>highscore.more</T></Button> </Col>
                        </Row>
                    </div>
                );
            } else {
                return (
                    <div className='box-highscores'>
                        <HighscoreSummarySingle person={partialCollection[userIndex-1]} />
                        <HighscoreSummarySingle person={partialCollection[userIndex]} />
                        <HighscoreSummarySingle person={partialCollection[userIndex+1]} />
                        <Row className= 'button-more' justify='center' align='middle'>
                            <Col span={12}> <Button color='inherit' size='small' onClick={this.clickMore.bind(this)}><T>highscore.more</T></Button> </Col>
                        </Row>
                    </div>
                );
            }
        }

    }
}
