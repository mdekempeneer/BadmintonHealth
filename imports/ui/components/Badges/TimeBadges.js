/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Componenten */
import PolarBadge from './PolarBadge.js';
import { timeCrit } from './badgeChecker.js';

export default class TimeBadges extends TrackerReact(Component) {
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
                    <Col className={getCN1(1)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={0} time={1}/> </Col>
                    <Col className={getCN1(2)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={0} time={2}/> </Col>
                    <Col className={getCN1(3)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={0} time={3}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(1)} span={4}> {timeCrit[0]}uur gesport </Col>
                    <Col className={getCN2(2)} span={4}> {timeCrit[1]}uur gesport  </Col>
                    <Col className={getCN2(3)} span={4}> {timeCrit[2]}uur gesport </Col>
                </Row>

                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(4)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={0} time={4}/> </Col>
                    <Col className={getCN1(5)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={0} time={5}/> </Col>
                    <Col className={getCN1(6)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={0} time={6}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(4)} span={4}> {timeCrit[3]}uur gesport  </Col>
                    <Col className={getCN2(5)} span={4}> {timeCrit[4]}uur gesport  </Col>
                    <Col className={getCN2(6)} span={4}> {timeCrit[5]}uur gesport </Col>
                </Row>

                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(7)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={0} time={7}/> </Col>
                    <Col className={getCN1(8)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={0} time={8}/> </Col>
                    <Col className={getCN1(9)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={0} time={9}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(7)} span={4}> {timeCrit[6]}uur gesport  </Col>
                    <Col className={getCN2(8)} span={4}> {timeCrit[7]}uur gesport  </Col>
                    <Col className={getCN2(9)} span={4}> {timeCrit[8]}uur gesport </Col>
                </Row>

                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(10)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={0} time={10}/> </Col>
                    <Col className={getCN1(11)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={0} time={11}/> </Col>
                    <Col className={getCN1(12)} span={4}> <PolarBadge heartrate={0} weight={0} distance={0} steps={0} sleep={0} time={12}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(10)} span={4}> {timeCrit[9]}uur gesport  </Col>
                    <Col className={getCN2(11)} span={4}> {timeCrit[10]}uur gesport  </Col>
                    <Col className={getCN2(12)} span={4}> {timeCrit[11]}uur gesport </Col>
                </Row>
            </div>
        );
    }
}

function getCN1(badgeNr) {
    if(Meteor.user().badges.rows.time[badgeNr-1]) {
        return 'badge-box-white';
    } else {
        return 'badge-box';
    }
}

function getCN2(badgeNr) {
    if(Meteor.user().badges.rows.time[badgeNr-1]) {
        return 'badge-box-text-white';
    } else {
        return 'badge-box-text';
    }
}
