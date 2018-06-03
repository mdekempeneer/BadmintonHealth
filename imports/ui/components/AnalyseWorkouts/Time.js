/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Bar } from 'react-chartjs-2';

/* Componenten */
import { combineData, combineDataNoDate, combineTimes, combineTimesNoDate } from './analyseFunctions.js';

/* Databases */
import { SportData } from '../../../api/sportdata.js';

const type = 'time';

const legend = {
    display: false
}

export default class Time extends TrackerReact(Component) {
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
                    },
                    categoryPercentage: 0.98,
                    barPercentage: 0.98
                }],
                yAxes: [{
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        userCallback: function(v) { return epoch_to_hh_mm_ss(v) },
                        stepSize: 15 * 60 * 1000
                    },
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: i18n.__('labels.time')
                    }
                }, {
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        stepSize: 1,
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: i18n.__('labels.sportsessions')
                    }
                }],
            }
        };

        var data;
        if(this.props.year) {
            data = {
                datasets: [{
                    type: 'bar',
                    label: i18n.__('badges.time'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.5)',
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
                    data: combineData(type, beginLastYear, endDate),
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'line',
                    label: i18n.__('badges.time'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.5)',
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
                    data: combineTimes(type, beginLastYear, endDate),
                    yAxisID: 'y-axis-2'
                }]
            };
        } else if(this.props.month) {
            data = {
                datasets: [{
                    type: 'bar',
                    label: i18n.__('badges.time'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.5)',
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
                    data: combineData(type, beginLastMonth, endDate),
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'line',
                    label: i18n.__('badges.time'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.5)',
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
                    data: combineTimes(type, beginLastMonth, endDate),
                    yAxisID: 'y-axis-2'
                }]
            };
        } else if(this.props.week) {
            data = {
                datasets: [{
                    type: 'bar',
                    label: i18n.__('badges.time'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.5)',
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
                    data: combineData(type, beginLastWeek, endDate),
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'line',
                    label: i18n.__('badges.time'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.5)',
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
                    data: combineTimes(type, beginLastWeek, endDate),
                    yAxisID: 'y-axis-2'
                }]
            };
        } else if(this.props.day) {
            data = {
                datasets: [{
                    type: 'bar',
                    label: i18n.__('badges.time'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.5)',
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
                    data: combineData(type, beginLastDay, endDate),
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'line',
                    label: i18n.__('badges.time'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.5)',
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
                    data: combineTimes(type, beginLastDay, endDate),
                    yAxisID: 'y-axis-2'
                }]
            };
        } else {
            data = {
                datasets: [{
                    type: 'bar',
                    label: i18n.__('badges.time'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.5)',
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
                    data: combineDataNoDate(type),
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'line',
                    label: i18n.__('badges.time'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.5)',
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
                    data: combineTimesNoDate(type),
                    yAxisID: 'y-axis-2'
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

function epoch_to_hh_mm_ss(epoch) {
    return new Date(epoch).toISOString().substr(12, 4)
}
