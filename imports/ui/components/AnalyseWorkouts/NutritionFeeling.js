/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Line } from 'react-chartjs-2';

/* Componenten */
import { combineData, combineDataNoDate } from './analyseFunctions.js';

/* Databases */
import { SportData } from '../../../api/sportdata.js';

const type = 'breakfast';
const type2 = 'lunch';
const type3 = 'diner';

const legend = {
    display: true
}

export default class TrainingFeeling extends TrackerReact(Component) {
    constructor(props) {
        super(props)

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

    render() {
        if(Meteor.users.find().fetch().length < 1 || !Meteor.userId()) {
            return (<div>Contacteer de administrator</div>);
        }

        const beginLastYear     = moment().subtract('1','year').subtract('1', 'day').format();
        const beginLastMonth    = moment().subtract('1', 'month').subtract('1', 'day').format();
        const beginLastWeek     = moment().subtract('1', 'week').subtract('1', 'day').format();
        const beginLastDay      = moment().subtract('1', 'day').subtract('1', 'day').format();

        const endDate = moment().add('1','day').format();

        const options = {
            responsive: true,
            scales: {
                xAxes: [{
                    type: 'time',
                    distribution: 'linear',
                    display: true,
                    gridLines: {
                        display: true
                    },
                    time: {
                        unit: 'day',
                        displayFormats: {
                            day: 'DD/MM'
                        }
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        fontFamily: 'FontAwesome',
                        fontSize: 40,
                        beginAtZero: true,
                        max: 6,
                        stepSize: 1,
                        callback: function(value, index, values) {
                            if (value === 0 || value === 6) {
                                return '';
                            } else if (value === 1) {
                                return '\uf119'
                            } else if (value === 2) {
                                return '';
                            } else if (value === 3) {
                                return '\uf11a';
                            } else if (value === 4) {
                                return '';
                            } else if (value === 5) {
                                return '\uf118';
                            }
                            return '';
                        }
                    },
                    scaleLabel: {
                        display: true,
                        // labelString: i18n.__('labels.feeling')
                    }
                }],
            }
        };

        var data;
        if(this.props.year) {
            data = {
                datasets: [{
                    label: i18n.__('badges.breakfast'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(166,206,227,1)',
                    borderColor: 'rgba(166,206,227,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(166,206,227,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(166,206,227,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type, beginLastYear, endDate)
                }, {
                    label: i18n.__('badges.lunch'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,1)',
                    borderColor: 'rgba(31,120,180,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(31,120,180,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(31,120,180,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type2, beginLastYear, endDate)
                }, {
                    label: i18n.__('badges.diner'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(178,223,138,1)',
                    borderColor: 'rgba(178,223,138,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(178,223,138,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(178,223,138,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type3, beginLastYear, endDate)
                }]
            };
        } else if(this.props.month) {
            data = {
                datasets: [{
                    label: i18n.__('badges.breakfast'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(166,206,227,1)',
                    borderColor: 'rgba(166,206,227,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(166,206,227,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(166,206,227,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type, beginLastMonth, endDate)
                }, {
                    label: i18n.__('badges.lunch'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,1)',
                    borderColor: 'rgba(31,120,180,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(31,120,180,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(31,120,180,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type2, beginLastMonth, endDate)
                }, {
                    label: i18n.__('badges.diner'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(178,223,138,1)',
                    borderColor: 'rgba(178,223,138,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(178,223,138,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(178,223,138,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type3, beginLastMonth, endDate)
                }]
            };
        } else if(this.props.week) {
            data = {
                datasets: [{
                    label: i18n.__('badges.breakfast'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(166,206,227,1)',
                    borderColor: 'rgba(166,206,227,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(166,206,227,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(166,206,227,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type, beginLastWeek, endDate)
                }, {
                    label: i18n.__('badges.lunch'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,1)',
                    borderColor: 'rgba(31,120,180,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(31,120,180,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(31,120,180,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type2, beginLastWeek, endDate)
                }, {
                    label: i18n.__('badges.diner'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(178,223,138,1)',
                    borderColor: 'rgba(178,223,138,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(178,223,138,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(178,223,138,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type3, beginLastWeek, endDate)
                }]
            };
        } else if(this.props.day) {
            data = {
                datasets: [{
                    label: i18n.__('badges.breakfast'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(166,206,227,1)',
                    borderColor: 'rgba(166,206,227,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(166,206,227,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(166,206,227,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type, beginLastDay, endDate)
                }, {
                    label: i18n.__('badges.lunch'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,1)',
                    borderColor: 'rgba(31,120,180,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(31,120,180,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(31,120,180,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type2, beginLastDay, endDate)
                }, {
                    label: i18n.__('badges.diner'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(178,223,138,1)',
                    borderColor: 'rgba(178,223,138,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(178,223,138,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(178,223,138,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type3, beginLastDay, endDate)
                }]
            };
        } else {
            data = {
                datasets: [{
                    label: i18n.__('badges.breakfast'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(166,206,227,1)',
                    borderColor: 'rgba(166,206,227,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(166,206,227,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(166,206,227,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineDataNoDate(type)
                }, {
                    label: i18n.__('badges.lunch'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,1)',
                    borderColor: 'rgba(31,120,180,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(31,120,180,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(31,120,180,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineDataNoDate(type2)
                }, {
                    label: i18n.__('badges.diner'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(178,223,138,1)',
                    borderColor: 'rgba(178,223,138,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(178,223,138,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(178,223,138,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineDataNoDate(type3),
                }]
            };
        }
        return (<Line
                    data={data}
                    options={options}
                    legend={legend}
                    width={550}
                    height={550}
                />);
    }
}
