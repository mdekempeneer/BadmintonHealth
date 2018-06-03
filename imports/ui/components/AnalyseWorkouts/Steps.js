/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Bar } from 'react-chartjs-2';

/* Componenten */
import { combineData, combineDataNoDate } from './analyseFunctions.js';

/* Databases */
import { SportData } from '../../../api/sportdata.js';

const type = 'stepCount';
const T = i18n.createComponent();

const legend = {
    display: false
}

export default class Steps extends TrackerReact(Component) {
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
                    ticks: {
                        stepSize: 1
                    },
                    time: {
                        unit: 'day',
                        displayFormats: {
                            day: 'DD/MM'
                        }
                    },
                    categoryPercentage: 0.98,
                    barPercentage: 0.98
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: i18n.__('labels.steps')
                    }
                }],
            }
        };

        var data;
        if(this.props.year) {
            data = {
                datasets: [{
                    label: i18n.__('badges.steps'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.4)',
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
                    data: combineData(type, beginLastYear, endDate)
                }]
            };
        } else if(this.props.month) {
            data = {
                datasets: [{
                    label: i18n.__('badges.steps'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.4)',
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
                    data: combineData(type, beginLastMonth, endDate)
                }]
            };
        } else if(this.props.week) {
            data = {
                datasets: [{
                    label: i18n.__('badges.steps'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.4)',
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
                    data: combineData(type, beginLastWeek, endDate)
                }]
            };
        } else if(this.props.day) {
            data = {
                datasets: [{
                    label: i18n.__('badges.steps'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.4)',
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
                    data: combineData(type, beginLastDay, endDate)
                }]
            };
        } else {
            data = {
                datasets: [{
                    label: i18n.__('badges.steps'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.4)',
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
                    data: combineDataNoDate(type)
                }]
            };
        }
        return (<Bar
                    data={data}
                    options={options}
                    legend={legend}
                    width={550}
                    height={550}
                />);
    }
}
