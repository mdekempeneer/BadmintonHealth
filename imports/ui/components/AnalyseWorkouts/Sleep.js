/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Bar } from 'react-chartjs-2';

/* Componenten */
import { combineData, combineDataNoDate } from './analyseFunctions.js';

/* Databases */
import { SportData } from '../../../api/sportdata.js';

const type = 'lightSleep';
const type2 = 'sleepQuality';
const type3 = 'fatigue';
const type4 = 'deepSleep';
const T = i18n.createComponent();

const legend = {
    display: true
}

export default class Sleep extends TrackerReact(Component) {
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
                    stacked: true,
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
                        stepSize: 30 * 60
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
                    type: 'bar',
                    label: i18n.__('badges.light_sleep'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(166,206,227,0.75)',
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
                    data: combineData(type, beginLastYear, endDate),
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'bar',
                    label: i18n.__('badges.deep_sleep'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.75)',
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
                    data: combineData(type4, beginLastYear, endDate),
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'line',
                    label: i18n.__('badges.quality_sleep'),
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
                    data: combineData(type2, beginLastYear, endDate),
                    yAxisID: 'y-axis-2'
                }, {
                    type: 'line',
                    label: i18n.__('badges.fatigue_sleep'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(51,160,44,1)',
                    borderColor: 'rgba(51,160,44,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(51,160,44,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(51,160,44,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type3, beginLastYear, endDate),
                    yAxisID: 'y-axis-2'
                }]
            };
        } else if(this.props.month) {
            data = {
                datasets: [{
                    type: 'bar',
                    label: i18n.__('badges.light_sleep'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(166,206,227,0.75)',
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
                    data: combineData(type, beginLastMonth, endDate),
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'bar',
                    label: i18n.__('badges.deep_sleep'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.75)',
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
                    data: combineData(type4, beginLastMonth, endDate),
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'line',
                    label: i18n.__('badges.quality_sleep'),
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
                    data: combineData(type2, beginLastMonth, endDate),
                    yAxisID: 'y-axis-2'
                }, {
                    type: 'line',
                    label: i18n.__('badges.fatigue_sleep'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(51,160,44,1)',
                    borderColor: 'rgba(51,160,44,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(51,160,44,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(51,160,44,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type3, beginLastMonth, endDate),
                    yAxisID: 'y-axis-2'
                }]
            };
        } else if(this.props.week) {
            data = {
                datasets: [{
                    type: 'bar',
                    label: i18n.__('badges.light_sleep'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(166,206,227,0.75)',
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
                    data: combineData(type, beginLastWeek, endDate),
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'bar',
                    label: i18n.__('badges.deep_sleep'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.75)',
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
                    data: combineData(type4, beginLastWeek, endDate),
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'line',
                    label: i18n.__('badges.quality_sleep'),
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
                    data: combineData(type2, beginLastWeek, endDate),
                    yAxisID: 'y-axis-2'
                }, {
                    type: 'line',
                    label: i18n.__('badges.fatigue_sleep'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(51,160,44,1)',
                    borderColor: 'rgba(51,160,44,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(51,160,44,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(51,160,44,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type3, beginLastWeek, endDate),
                    yAxisID: 'y-axis-2'
                }]
            };
        } else if(this.props.day) {
            data = {
                datasets: [{
                    type: 'bar',
                    label: i18n.__('badges.light_sleep'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(166,206,227,0.75)',
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
                    data: combineData(type, beginLastDay, endDate),
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'bar',
                    label: i18n.__('badges.deep_sleep'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.75)',
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
                    data: combineData(type4, beginLastDay, endDate),
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'line',
                    label: i18n.__('badges.quality_sleep'),
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
                    data: combineData(type2, beginLastDay, endDate),
                    yAxisID: 'y-axis-2'
                }, {
                    type: 'line',
                    label: i18n.__('badges.fatigue_sleep'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(51,160,44,1)',
                    borderColor: 'rgba(51,160,44,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(51,160,44,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(51,160,44,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineData(type3, beginLastDay, endDate),
                    yAxisID: 'y-axis-2'
                }]
            };
        } else {
            data = {
                datasets: [{
                    type: 'bar',
                    label: i18n.__('badges.light_sleep'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(166,206,227,0.75)',
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
                    data: combineDataNoDate(type),
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'bar',
                    label: i18n.__('badges.deep_sleep'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(31,120,180,0.75)',
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
                    data: combineDataNoDate(type4),
                    yAxisID: 'y-axis-1'
                }, {
                    type: 'line',
                    label: i18n.__('badges.quality_sleep'),
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
                    data: combineDataNoDate(type2),
                    yAxisID: 'y-axis-2'
                }, {
                    type: 'line',
                    label: i18n.__('badges.fatigue_sleep'),
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: 'rgba(51,160,44,1)',
                    borderColor: 'rgba(51,160,44,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(51,160,44,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(51,160,44,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: combineDataNoDate(type3),
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
    return new Date(epoch*1000).toISOString().substr(12, 4)
}
