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
import AccountsUIWrapper from './components/AccountsUIWrapper.js';
import CircularIndeterminate from './components/CircularIndeterminate.js';
import NotYetImplemented from './components/NotYetImplemented.js';
import badgeChecker from './components/Badges/badgeChecker.js';
import { dayChecker, clickChecker } from './allFunctions.js';

/* Database */
import { SportData } from '../api/sportdata.js';

import MiBand from './miband';
import { heartRateScore } from './scoreCalculator.js';

import { levelChecker } from './allFunctions.js';

/* Language */
const T = i18n.createComponent();

const UUID_BASE = (x) => `0000${x}-0000-3512-2118-0009af100700`
const UUID_SHORT = (x) => `0000${x}-0000-1000-8000-00805f9b34fb`

const UUID_SERVICE_GENERIC_ACCESS =     UUID_SHORT('1800')
const UUID_SERVICE_GENERIC_ATTRIBUTE =  UUID_SHORT('1801')
const UUID_SERVICE_DEVICE_INFORMATION = UUID_SHORT('180a')
const UUID_SERVICE_FIRMWARE =           UUID_BASE('1530')
const UUID_SERVICE_ALERT_NOTIFICATION = UUID_SHORT('1811')
const UUID_SERVICE_IMMEDIATE_ALERT =    UUID_SHORT('1802')
const UUID_SERVICE_HEART_RATE =         UUID_SHORT('180d')
const UUID_SERVICE_MIBAND_1 =           UUID_SHORT('fee0')
const UUID_SERVICE_MIBAND_2 =           UUID_SHORT('fee1')

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export default class ConnectDevices extends TrackerReact(Component) {
    constructor() {
        super();

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            },
            battery: '', heartrate: '', steps: '',
            distance: '', calories: '', info: ''
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

    async getBatteryLevel(event) {
        Meteor.call('clickUpdate', 'miBand', 'battery');
        this.setState({ info: 'Check the battery level' });
        const device = await navigator.bluetooth.requestDevice({
            filters: [{
                services: [ MiBand.advertisementService ]
            }],
            optionalServices: MiBand.optionalServices
        });

        device.addEventListener('gattserverdisconnected', () => {
            this.setState({ info: 'Device disconnected'})
        });

        await device.gatt.disconnect();
        this.setState({ info: 'Device temporarily disconnected'})

        const server = await device.gatt.connect();
        this.setState({ info: 'Device connected'})

        let miband = new MiBand(server);
        await miband.init();
        this.setState({ info: 'Fetching device info...'})
        let info = {
            time:     await miband.getTime(),
            battery:  await miband.getBatteryInfo(),
            hw_ver:   await miband.getHwRevision(),
            fw_ver:   await miband.getSwRevision(),
            serial:   await miband.getSerial(),
        }
        // console.log('Info:', JSON.stringify(info, null, 2));

        console.log('Batterijniveau: ', info.battery.level)
        console.log('HEALTH: Batterijniveay' + info.battery.level)
        this.setState({ battery: info.battery.level })

        await device.gatt.disconnect()
    }

    async getSingleHeartRate(event) {
        Meteor.call('clickUpdate', 'miBand', 'single');
        this.setState({ info: 'Check your heart rate once' });
        const device = await navigator.bluetooth.requestDevice({
            filters: [{
                services: [ MiBand.advertisementService ]
            }],
            optionalServices: MiBand.optionalServices
        });

        device.addEventListener('gattserverdisconnected', () => {
            this.setState({ info: 'Device disconnected'})
        });

        await device.gatt.disconnect();
        this.setState({ info: 'Device temporarily disconnected'})

        const server = await device.gatt.connect();
        this.setState({ info: 'Device connected'})

        let miband = new MiBand(server);
        await miband.init();

        this.setState({ info: 'Heart Rate Monitor (single-shot)'});
        var heart = await miband.hrmRead();
        var score = heartRateScore(heart)
        Meteor.call('addHeartRate', heart, score, () => {
            this.setState({heartrate: heart});
            levelChecker();
            badgeChecker();
        });

        await device.gatt.disconnect()
    }

    async getMultiHeartRate(event) {
        Meteor.call('clickUpdate', 'miBand', 'multi');
        this.setState({ info: 'Check your heart rate for 30 sec.' });
        const device = await navigator.bluetooth.requestDevice({
            filters: [{
                services: [ MiBand.advertisementService ]
            }],
            optionalServices: MiBand.optionalServices
        });

        device.addEventListener('gattserverdisconnected', () => {
            this.setState({ info: 'Device disconnected'})
        });

        await device.gatt.disconnect();
        this.setState({ info: 'Device temporarily disconnected'})

        const server = await device.gatt.connect();
        this.setState({ info: 'Device connected'})

        let miband = new MiBand(server);
        await miband.init();

        this.setState({ info: 'Heart Rate Monitor (continuous for 30 sec)...' })
        miband.on('heart_rate', (rate) => {
            var score = heartRateScore(rate);
            Meteor.call('addHeartRate', rate, score, () => {
                this.setState({heartrate: rate});
                levelChecker();
                badgeChecker();
            });
        })
        await miband.hrmStart();
        await delay(30000);
        await miband.hrmStop();

        await device.gatt.disconnect()
    }

    async getFootSteps(event) {
        Meteor.call('clickUpdate', 'miBand', 'footsteps');
        this.setState({ info: 'Check your footsteps.' });
        const device = await navigator.bluetooth.requestDevice({
            filters: [{
                services: [ MiBand.advertisementService ]
            }],
            optionalServices: MiBand.optionalServices
        });

        device.addEventListener('gattserverdisconnected', () => {
            this.setState({ info: 'Device disconnected'})
        });

        await device.gatt.disconnect();
        this.setState({ info: 'Device temporarily disconnected'})

        const server = await device.gatt.connect();
        this.setState({ info: 'Device connected'})

        let miband = new MiBand(server);
        await miband.init();

        this.setState({ info: 'Check the footsteps' })
        let ped = await miband.getPedometerStats()
        // console.log('Pedometer:', JSON.stringify(ped))
        this.setState({
            steps: ped.steps,
            distance: ped.distance,
            calories: ped.calories
        });

        Meteor.call('addSteps', ped.steps, 1, () => {
            levelChecker();
            badgeChecker();
        });

        await device.gatt.disconnect()
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
            <div className='overall-box-color'>
                <Button onClick={this.getBatteryLevel.bind(this)}> Batterij niveau </Button>
                <Button onClick={this.getSingleHeartRate.bind(this)}> Eenmalige hartslag </Button>
                <Button onClick={this.getMultiHeartRate.bind(this)}> Meerdere hartslagen </Button>
                <Button onClick={this.getFootSteps.bind(this)}> Footsteps </Button>

                <div className='startpage-level'>
                    Batterij niveau: {this.state.battery} <br/>
                    Hartslag: {this.state.heartrate} <br/>
                    Stappen: {this.state.steps} <br/>
                    Afstand: {this.state.distance} <br/>
                    Calorieën: {this.state.calories} <br/>
                    <br/>
                    INFO: {this.state.info}
                </div>
                <div className='footer'>
                    <Button href='/bugreport'> bug report </Button>
                </div>
            </div>
        );
    }
}

// bluetoothle.startScan( (item) => {
//     console.log('HEALTH: succes', item)
// }, (err) => {
//     console.log('HEALTH: failure', err)
// },
// {
//     'services':
//         'FEE0'
// });
//
// console.log('RETREIVE CONNECTED');
// await bluetoothle.retreiveConnected(
//     (item) => { console.log('HEALTH: RETREIVE CONNECTED succes', item) },
//     (err) => { console.log('HEALTH: RETREIVE CONNECTED failure', err) },
//     { 'services':
//             'FEE0'
//
//     }
// );
