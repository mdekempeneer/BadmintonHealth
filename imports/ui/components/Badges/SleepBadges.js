/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Componenten */
import PolarBadge from './PolarBadge.js';
import { sleepCrit } from './badgeChecker.js';

export default class SleepBadges extends TrackerReact(Component) {
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
                    <Col className={getCN1(1)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={1} time={0}/> </Col>
                    <Col className={getCN1(2)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={2} time={0}/> </Col>
                    <Col className={getCN1(3)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={3} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(1)} span={4}> {sleepCrit[0]}uur diepe slaap </Col>
                    <Col className={getCN2(2)} span={4}> {sleepCrit[1]}uur diepe slaap  </Col>
                    <Col className={getCN2(3)} span={4}> {sleepCrit[2]}uur diepe slaap </Col>
                </Row>

                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(4)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={4} time={0}/> </Col>
                    <Col className={getCN1(5)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={5} time={0}/> </Col>
                    <Col className={getCN1(6)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={6} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(4)} span={4}> {sleepCrit[3]}uur diepe slaap  </Col>
                    <Col className={getCN2(5)} span={4}> {sleepCrit[4]}uur diepe slaap  </Col>
                    <Col className={getCN2(6)} span={4}> {sleepCrit[5]}uur diepe slaap </Col>
                </Row>

                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(7)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={7} time={0}/> </Col>
                    <Col className={getCN1(8)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={8} time={0}/> </Col>
                    <Col className={getCN1(9)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={9} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(7)} span={4}> {sleepCrit[6]}uur diepe slaap  </Col>
                    <Col className={getCN2(8)} span={4}> {sleepCrit[7]}uur diepe slaap  </Col>
                    <Col className={getCN2(9)} span={4}> {sleepCrit[8]}uur diepe slaap </Col>
                </Row>

                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(10)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={10} time={0}/> </Col>
                    <Col className={getCN1(11)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={11} time={0}/> </Col>
                    <Col className={getCN1(12)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={12} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(10)} span={4}> ...uur diepe slaap  </Col>
                    <Col className={getCN2(11)} span={4}> ...uur diepe slaap  </Col>
                    <Col className={getCN2(12)} span={4}> ...uur diepe slaap </Col>
                </Row>
            </div>
        );
    }
}

function getCN1(badgeNr) {
    if(Meteor.user().badges.rows.sleep[badgeNr-1]) {
        return 'badge-box-white';
    } else {
        return 'badge-box';
    }
}

function getCN2(badgeNr) {
    if(Meteor.user().badges.rows.sleep[badgeNr-1]) {
        return 'badge-box-text-white';
    } else {
        return 'badge-box-text';
    }
}
