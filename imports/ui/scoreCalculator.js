import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export function heartRateScore(heartrate) {
    var age;
    if(Meteor.user().birthday !== undefined) {
        if(Meteor.user().birthday === '') {
            age = 25;
        } else {
            const year1 = parseInt(moment().format('YYYY'))
            const year2 = parseInt(Meteor.user().birthday.substr(6,4))
            age = year1 - year2
        }
    } else {
        return 0;
    }

    const maximum = 220;
    const HFmax = maximum - age;

    const rates = [HFmax * 0.5, HFmax * 0.6, HFmax * 0.7, HFmax * 0.8, HFmax * 0.9, HFmax]

    if (heartrate < rates[0]) {
        return 0.5;
    } else if (heartrate < rates[1]) {
        return 1;
    } else if (heartrate < rates[2]) {
        return 1.5;
    } else if (heartrate < rates[3]) {
        return 2;
    } else if (heartrate < rates[4]) {
        return 2.5;
    } else if (heartrate < rates[5]) {
        return 2;
    } else {
        return 0.5;
    }
}

export function sleepCalculator(number1, number2, number3, number4) {
    const totalLight = number1 * 60 * 60 + number2 * 60;
    const totalDeep = number3 * 60 * 60 + number4 * 60;

    const total = (totalLight + totalDeep) / 3600;
    if (total > 8) {
        return 3.0;
    } else if (total < 6) {
        return 0.5;
    } else {
        return (0.5 * total - 2);
        // 6u = 1punt ... 8u = 2punt
    }
}
