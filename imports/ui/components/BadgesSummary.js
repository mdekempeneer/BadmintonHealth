/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Material-UI componenten */
import Button from 'material-ui/Button';

/* Componenten */
import PolarBadge2 from './Badges/PolarBadge.js';

/* Language */
const T = i18n.createComponent();

export default class BadgesSummary extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            }
        };
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
        this.state.subscription.sport.stop();
    }

    clickMore(event) {
        Meteor.call('clickUpdate', 'startpage', 'moreBadges');
        FlowRouter.go('/badges');
    }

    render() {
        if(Meteor.user().badges === undefined || Meteor.users.find().fetch().length < 1 || !Meteor.userId()) {
            return (<div>Contacteer de administrator</div>);
        }

        if (Meteor.user().badges.totalBadges === 0) {
            return (
                <div className='box-badges'>
                    <T>badges.go_sport</T>
                    <Row className= 'button-more' justify='center' align='middle'>
                        <Col span={12}>
                            <Button color='inherit' size='small' onClick={this.clickMore.bind(this)}>
                                <T>badges.look_badges</T>
                            </Button>
                        </Col>
                    </Row>
                </div>
            );
        } else if (Meteor.user().badges.totalBadges === 1) {
            return (
                <div className='box-badges'>
                    <Row justify='center' align='middle'>
                        <Col span={4}>
                            <PolarBadge2
                                heartrate={Meteor.user().badges.mostRecent1.heartrate}
                                weight={Meteor.user().badges.mostRecent1.weight}
                                distance={Meteor.user().badges.mostRecent1.distance}
                                steps={Meteor.user().badges.mostRecent1.steps}
                                sleep={Meteor.user().badges.mostRecent1.sleep}
                                time={Meteor.user().badges.mostRecent1.time}
                            />
                        </Col>
                    </Row>
                    <Row className= 'button-more' justify='center' align='middle'>
                        <Col span={12}>
                            <Button color='inherit' size='small' onClick={this.clickMore.bind(this)}>
                                <T>highscore.more</T>
                            </Button>
                        </Col>
                    </Row>
                </div>
            );
        } else if (Meteor.user().badges.totalBadges === 2) {
            return (
                <div className='box-badges'>
                    <Row justify='center' align='middle'>
                        <Col span={4}>
                            <PolarBadge2
                                heartrate={Meteor.user().badges.mostRecent1.heartrate}
                                weight={Meteor.user().badges.mostRecent1.weight}
                                distance={Meteor.user().badges.mostRecent1.distance}
                                steps={Meteor.user().badges.mostRecent1.steps}
                                sleep={Meteor.user().badges.mostRecent1.sleep}
                                time={Meteor.user().badges.mostRecent1.time}
                            />
                        </Col>
                        <Col span={4}>
                            <PolarBadge2
                                heartrate={Meteor.user().badges.mostRecent2.heartrate}
                                weight={Meteor.user().badges.mostRecent2.weight}
                                distance={Meteor.user().badges.mostRecent2.distance}
                                steps={Meteor.user().badges.mostRecent2.steps}
                                sleep={Meteor.user().badges.mostRecent2.sleep}
                                time={Meteor.user().badges.mostRecent2.time}
                            />
                        </Col>
                    </Row>
                    <Row className= 'button-more' justify='center' align='middle'>
                        <Col span={12}>
                            <Button color='inherit' size='small' onClick={this.clickMore.bind(this)}>
                                <T>highscore.more</T>
                            </Button>
                        </Col>
                    </Row>
                </div>
            );
        } else {
            return (
                <div className='box-badges'>
                    <Row justify='center' align='middle'>
                        <Col span={4}>
                            <PolarBadge2
                                heartrate={Meteor.user().badges.mostRecent1.heartrate}
                                weight={Meteor.user().badges.mostRecent1.weight}
                                distance={Meteor.user().badges.mostRecent1.distance}
                                steps={Meteor.user().badges.mostRecent1.steps}
                                sleep={Meteor.user().badges.mostRecent1.sleep}
                                time={Meteor.user().badges.mostRecent1.time}
                            />
                        </Col>
                        <Col span={4}>
                            <PolarBadge2
                                heartrate={Meteor.user().badges.mostRecent2.heartrate}
                                weight={Meteor.user().badges.mostRecent2.weight}
                                distance={Meteor.user().badges.mostRecent2.distance}
                                steps={Meteor.user().badges.mostRecent2.steps}
                                sleep={Meteor.user().badges.mostRecent2.sleep}
                                time={Meteor.user().badges.mostRecent2.time}
                            />
                        </Col>
                        <Col span={4}>
                            <PolarBadge2
                                heartrate={Meteor.user().badges.mostRecent3.heartrate}
                                weight={Meteor.user().badges.mostRecent3.weight}
                                distance={Meteor.user().badges.mostRecent3.distance}
                                steps={Meteor.user().badges.mostRecent3.steps}
                                sleep={Meteor.user().badges.mostRecent3.sleep}
                                time={Meteor.user().badges.mostRecent3.time}
                            />
                        </Col>
                    </Row>
                    <Row className= 'button-more' justify='center' align='middle'>
                        <Col span={12}>
                            <Button color='inherit' size='small' onClick={this.clickMore.bind(this)}>
                                <T>highscore.more</T>
                            </Button>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}
