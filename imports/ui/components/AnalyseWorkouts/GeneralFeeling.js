/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import CalendarHeatmap from 'react-calendar-heatmap';

/* Componenten */
import { getFeelingCollection } from './analyseFunctions.js';

/* Databases */
import { SportData } from '../../../api/sportdata.js';

var startDate;
const endDate = moment();
var horizontal = true;
var showMonthLabels = true;
var showWeekdayLabels = true;

export default class GeneralFeeling extends TrackerReact(Component) {
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

        if (this.props.day || this.props.week) {
            startDate = moment().subtract(1, 'week');
            showMonthLabels = false;
            showWeekdayLabels = true;
            horizontal= false;
        } else if (this.props.month) {
            startDate = moment().subtract(1, 'month');
            showMonthLabels = false;
            showWeekdayLabels = true;
            horizontal= false;
        } else if (this.props.year) {
            startDate = moment().startOf('year');
            showMonthLabels = true;
            showWeekdayLabels = true;
            horizontal= true;
        } else {
            startDate = moment().startOf('year');
            showMonthLabels = true;
            showWeekdayLabels = true;
            horizontal= true;
        }

        return (
            <div>
                <CalendarHeatmap
                    horizontal={horizontal}
                    showMonthLabels={showMonthLabels}
                    showWeekdayLabels={showWeekdayLabels}
                    monthLabels={MONTH_LABELS}
                    weekdayLabels={DAY_LABELS}
                    startDate={startDate}
                    endDate={endDate}
                    values={getFeelingCollection('generalFeeling')}
                    titleForValue={customTitleForValue}
                    tooltipDataAttrs={customTooltipDataAttrs}
                    classForValue={(value) => {
                        if (!value) { return 'color-empty'; }
                        return `color-scale-${value.count}`;
                    }}
                    onClick={customOnClick}
                />
            </div>
        );
    }
}

const MONTH_LABELS = ['Jan', 'Feb', 'Maa', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
const DAY_LABELS=['ZO', 'MA', 'DI', 'WO', 'DO', 'VR', 'ZA'];
const customTooltipDataAttrs = { 'data-toggle': 'tooltip' };

function customTitleForValue(value) {
    return value ? `${value.date.format('DD-MM-YYYY')}` : null;
}

function customOnClick(value) {
    if (value) {
        alert(`${value.date.format('DD-MM-YYYY')}`);
    }
}
