/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Componenten */
import PolarBadge from './PolarBadge.js';
import { stepsCrit } from './badgeChecker.js';

export default class StepsBadges extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks')
            }
        };
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
    }

    render() {
        if(Meteor.users.find().fetch().length < 1 || !Meteor.userId()) {
            return (<div>Contacteer de administrator</div>);
        }

        return (
            <div className='badge-overall-box'>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(1)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={1} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(2)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={2} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(3)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={3} sleep={0} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(1)} span={4}> {stepsCrit[0] * 1000} stappen </Col>
                    <Col className={getCN2(2)} span={4}> {stepsCrit[1] * 1000} stappen  </Col>
                    <Col className={getCN2(3)} span={4}> {stepsCrit[2] * 1000} stappen </Col>
                </Row>

                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(4)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={4} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(5)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={5} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(6)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={6} sleep={0} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(4)} span={4}> {stepsCrit[3] * 1000} stappen  </Col>
                    <Col className={getCN2(5)} span={4}> {stepsCrit[4] * 1000} stappen  </Col>
                    <Col className={getCN2(6)} span={4}> {stepsCrit[5] * 1000} stappen </Col>
                </Row>

                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(7)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={7} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(8)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={8} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(9)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={9} sleep={0} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(7)} span={4}> {stepsCrit[6] * 1000} stappen  </Col>
                    <Col className={getCN2(8)} span={4}> {stepsCrit[7] * 1000} stappen  </Col>
                    <Col className={getCN2(9)} span={4}> ... stappen </Col>
                </Row>

                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(10)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={10} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(11)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={11} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(12)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={12} sleep={0} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(10)} span={4}> ... stappen  </Col>
                    <Col className={getCN2(11)} span={4}> ... stappen  </Col>
                    <Col className={getCN2(12)} span={4}> ... stappen </Col>
                </Row>
            </div>
        );
    }
}

function getCN1(badgeNr) {
    if(Meteor.user().badges.rows.steps[badgeNr-1]) {
        return 'badge-box-white';
    } else {
        return 'badge-box';
    }
}

function getCN2(badgeNr) {
    if(Meteor.user().badges.rows.steps[badgeNr-1]) {
        return 'badge-box-text-white';
    } else {
        return 'badge-box-text';
    }
}
