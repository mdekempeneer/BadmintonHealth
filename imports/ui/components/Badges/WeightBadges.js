/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Componenten */
import PolarBadge from './PolarBadge.js';
import { weightCrit } from './badgeChecker.js';

export default class WeightBadges extends TrackerReact(Component) {
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
                    <Col className={getCN1(1)} span={4}> <PolarBadge heartrate={0} weight={1} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(2)} span={4}> <PolarBadge heartrate={0} weight={2} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(3)} span={4}> <PolarBadge heartrate={0} weight={3} distance={0} steps={0} sleep={0} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(1)} span={4}> {weightCrit[0]} metingen  </Col>
                    <Col className={getCN2(2)} span={4}> {weightCrit[1]} metingen  </Col>
                    <Col className={getCN2(3)} span={4}> {weightCrit[2]} metingen </Col>
                </Row>

                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(4)} span={4}> <PolarBadge heartrate={0} weight={4} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(5)} span={4}> <PolarBadge heartrate={0} weight={5} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(6)} span={4}> <PolarBadge heartrate={0} weight={6} distance={0} steps={0} sleep={0} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(4)} span={4}> {weightCrit[3]} metingen  </Col>
                    <Col className={getCN2(5)} span={4}> {weightCrit[4]} metingen  </Col>
                    <Col className={getCN2(6)} span={4}> {weightCrit[5]} metingen </Col>
                </Row>

                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(7)} span={4}> <PolarBadge heartrate={0} weight={7} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(8)} span={4}> <PolarBadge heartrate={0} weight={8} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(9)} span={4}> <PolarBadge heartrate={0} weight={9} distance={0} steps={0} sleep={0} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(7)} span={4}> {weightCrit[6]} metingen  </Col>
                    <Col className={getCN2(8)} span={4}> {weightCrit[7]} metingen  </Col>
                    <Col className={getCN2(9)} span={4}> {weightCrit[8]} metingen </Col>
                </Row>

                <Row justify='space-around' align='middle'>
                    <Col className={getCN1(10)} span={4}> <PolarBadge heartrate={0} weight={10} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(11)} span={4}> <PolarBadge heartrate={0} weight={11} distance={0} steps={0} sleep={0} time={0}/> </Col>
                    <Col className={getCN1(12)} span={4}> <PolarBadge heartrate={0} weight={12} distance={0} steps={0} sleep={0} time={0}/> </Col>
                </Row>
                <Row justify='space-around' align='middle'>
                    <Col className={getCN2(10)} span={4}> {weightCrit[9]} metingen  </Col>
                    <Col className={getCN2(11)} span={4}> {weightCrit[10]} metingen  </Col>
                    <Col className={getCN2(12)} span={4}> {weightCrit[11]} metingen </Col>
                </Row>
            </div>
        );
    }
}

function getCN1(badgeNr) {
    if(Meteor.user().badges.rows.weight[badgeNr-1]) {
        return 'badge-box-white';
    } else {
        return 'badge-box';
    }
}

function getCN2(badgeNr) {
    if(Meteor.user().badges.rows.weight[badgeNr-1]) {
        return 'badge-box-text-white';
    } else {
        return 'badge-box-text';
    }
}
