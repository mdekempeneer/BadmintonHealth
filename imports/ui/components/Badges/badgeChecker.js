import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { SportData } from '../../../api/sportdata.js';

import { levelChecker } from '../../allFunctions.js';

export const weightCrit = [10, 20, 30, 50, 80, 130, 210, 340, 550, 750, 950, 1150];
export const stepsCrit = [25, 50, 75, 125, 200, 375, 575, 950];
export const sleepCrit = [5, 10, 15, 25, 40, 65, 105, 170, 275];
export const timeCrit = [5, 10, 15, 25, 40, 65, 105, 170, 275];
export const heartCrit = [0.25, 0.5, 1, 2, 4, 8, 16];  // 1uur metingen === 1200 meetpunten

export default async function badgeChecker() {
    heartChecker();
    weightChecker();
    stepsChecker();
    sleepChecker();
    timeChecker();
}

async function heartChecker() {
    const list = SportData.find({ user: Meteor.userId(), 'result.type': 'HeartRate' });

    if (Meteor.user().badges === undefined) { return; }

    const lastIndex = Meteor.user().badges.rows.heart.lastIndexOf(true);
    if (lastIndex === (stepsCrit.length - 1)) {
        return;
    } else if (list.count() >= (heartCrit[lastIndex + 1] * 1200)) {
        var text;
        if (heartCrit[lastIndex + 1] === 0.25) {
            text = '1/4';
        } else if (heartCrit[lastIndex + 1] === 0.5) {
            text = '1/2';
        } else {
            text = (heartCrit[lastIndex + 1]).toString();
        }
        var text2 = text.concat(' uur hartslagmetingen');

        Meteor.call('newBadge', lastIndex + 2, 0, 0, 0, 0, 0, 'steps', text2, () => {
            Bert.alert('Proficiat, je hebt een nieuwe badge behaald in de categorie van hartslag!', 'info', 'growl-top-right');
            levelChecker();
        });
    } else {
    }
}


async function weightChecker() {
    const weight = SportData.find({ user: Meteor.userId(), 'result.type': 'HKQuantityTypeIdentifierWeight' });

    if (Meteor.user().badges === undefined) { return; }

    const lastIndex = Meteor.user().badges.rows.weight.lastIndexOf(true);

    if (lastIndex === (weightCrit.length - 1)) {
        return;
    } else if (weight.count() >= weightCrit[lastIndex + 1]) {
        var text = weightCrit[lastIndex + 1].toString();
        var text2 = text.concat(' gewichtsmetingen');

        Meteor.call('newBadge', 0, lastIndex + 2, 0, 0, 0, 0, 'weight', text2, () => {
            Bert.alert('Proficiat, je hebt een nieuwe badge behaald in de categorie van gewicht!', 'info', 'growl-top-right');
            levelChecker();
        });
    } else {
    }
}

async function stepsChecker() {
    var totSteps = 0;
    SportData.find({ user: Meteor.userId(), 'result.type': 'stepCount' })
                .map( (sport) => { totSteps += parseInt(sport.result.value); });

    if (Meteor.user().badges === undefined) { return; }

    const lastIndex = Meteor.user().badges.rows.steps.lastIndexOf(true);

    if (lastIndex === (stepsCrit.length - 1)) {
        return;
    } else if (totSteps >= (stepsCrit[lastIndex + 1] * 1000)) {
        var text = (stepsCrit[lastIndex + 1] * 1000).toString();
        var text2 = text.concat(' stappen');

        Meteor.call('newBadge', 0, 0, 0, lastIndex + 2, 0, 0, 'steps', text2, () => {
            Bert.alert('Proficiat, je hebt een nieuwe badge behaald in de categorie van stappen!', 'info', 'growl-top-right');
            levelChecker();
        });
    } else {
    }
}

async function sleepChecker() {
    var totDeepSleep = 0;
    SportData.find({ user: Meteor.userId(), 'result.type': 'deepSleep' })
                .map( (sport) => { totDeepSleep += parseInt(sport.result.value); });

    if (Meteor.user().badges === undefined) { return; }

    const lastIndex = Meteor.user().badges.rows.sleep.lastIndexOf(true);

    if (lastIndex === (sleepCrit.length -1)) {
        return;
    } else if ( (totDeepSleep / 3600) >= sleepCrit[lastIndex + 1] ) {
        var text = sleepCrit[lastIndex + 1].toString();
        var text2 = text.concat('uur diepe slaap');

        Meteor.call('newBadge', 0, 0, 0, 0, lastIndex + 2, 0, 'sleep', text2, () => {
            Bert.alert('Proficiat, je hebt een nieuwe badge behaald in de categorie van slapen!', 'info', 'growl-top-right');
            levelChecker();
        });
    } else {
    }
}

async function timeChecker() {
    var totTime = 0;
    SportData.find({ user: Meteor.userId(), 'result.type': 'time' })
                .map( (sport) => { totTime += parseInt(sport.result.value); });

    if (Meteor.user().badges === undefined) { return; }

    const lastIndex = Meteor.user().badges.rows.time.lastIndexOf(true);

    if (lastIndex === (timeCrit.length -1)) {
        return;
    } else if ( (totTime / (3600 * 1000)) >= timeCrit[lastIndex + 1] ) {
        var text = timeCrit[lastIndex + 1].toString();
        var text2 = text.concat('uur sport');

        Meteor.call('newBadge', 0, 0, 0, 0, 0, lastIndex + 2, 'time', text2, () => {
            Bert.alert('Proficiat, je hebt een nieuwe badge behaald in de categorie van sport tijd!', 'info', 'growl-top-right');
            levelChecker();
        });
    } else {
    }
}
