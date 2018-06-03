/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Componenten */
import PolarBadge from './PolarBadge.js';
import { heartCrit } from './badgeChecker.js';

export default class HeartRateBadges extends TrackerReact(Component) {
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
                    <Col className={getCN1(1)} span={4}> <PolarBadge heartrate={1} weight={0} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(2)} span={4}> <PolarBadge heartrate={2} weight={0} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(3)} span={4}> <PolarBadge heartrate={3} weight={0} distance={0} steps={0} sleep={0} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(1)} span={4}> {heartCrit[0]} uur hartslagmetingen </Col>
                    <Col className={getCN2(2)} span={4}> {heartCrit[1]} uur hartslagmetingen </Col>
                    <Col className={getCN2(3)} span={4}> {heartCrit[2]} uur hartslagmetingen </Col>
                </Row>

                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(4)} span={4}> <PolarBadge heartrate={4} weight={0} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(5)} span={4}> <PolarBadge heartrate={5} weight={0} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(6)} span={4}> <PolarBadge heartrate={6} weight={0} distance={0} steps={0} sleep={0} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(4)} span={4}> {heartCrit[3]} uur hartslagmetingen </Col>
                    <Col className={getCN2(5)} span={4}> {heartCrit[4]} uur hartslagmetingen </Col>
                    <Col className={getCN2(6)} span={4}> {heartCrit[5]} uur hartslagmetingen </Col>
                </Row>

                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(7)} span={4}> <PolarBadge heartrate={7} weight={0} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(8)} span={4}> <PolarBadge heartrate={8} weight={0} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(9)} span={4}> <PolarBadge heartrate={9} weight={0} distance={0} steps={0} sleep={0} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(7)} span={4}> {heartCrit[6]} uur hartslagmetingen </Col>
                    <Col className={getCN2(8)} span={4}> ... </Col>
                    <Col className={getCN2(9)} span={4}> ... </Col>
                </Row>

                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(10)} span={4}> <PolarBadge heartrate={10} weight={0} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(11)} span={4}> <PolarBadge heartrate={11} weight={0} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(12)} span={4}> <PolarBadge heartrate={12} weight={0} distance={0} steps={0} sleep={0} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(10)} span={4}> ... </Col>
                    <Col className={getCN2(11)} span={4}> ... </Col>
                    <Col className={getCN2(12)} span={4}> ... </Col>
                </Row>
            </div>
        );
    }
}

function getCN1(badgeNr) {
    if(Meteor.user().badges.rows.heart[badgeNr-1]) {
        return 'badge-box-white';
    } else {
        return 'badge-box';
    }
}

function getCN2(badgeNr) {
    if(Meteor.user().badges.rows.heart[badgeNr-1]) {
        return 'badge-box-text-white';
    } else {
        return 'badge-box-text';
    }
}
