import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Clicks } from '../api/clicks.js';
import { SportData } from '../api/sportdata.js'

export async function levelChecker() {
    if (Meteor.user().currentPoints > upperLevel[Meteor.user().currentLevel-1]) {
        Meteor.call('updateLevel', () => {
            Bert.alert('Proficiat, je stijgt een level!', 'info', 'growl-top-right')
        });
    }
}

export async function dayChecker() {
    if(moment(Meteor.user().lastday).isSame(new Date(), 'day')
        && moment(Meteor.user().lastday).isSame(new Date(), 'month')
        && moment(Meteor.user().lastday).isSame(new Date(), 'year')) {
    } else {
        const timeDiff = moment(new Date()).startOf('day').diff(moment(Meteor.user().lastday));

        if (timeDiff < 86400000) { //1000 * 60 * 60 * 24
            if(Meteor.user().days == Meteor.user().maxdays) {
                Meteor.call('updateMaxDays', Meteor.user().days + 1 , () => {
                    Bert.alert('Proficiat, je verdiende <strong>10 punten</strong> door vandaag opnieuw in te loggen en je record te verbreken!', 'info', 'growl-top-right')
                });
            } else {
                Meteor.call('updateLastDay', Meteor.user().days + 1, () => {
                    Bert.alert('Proficiat, je verdiende <strong>3 punten</strong> door vandaag opnieuw in te loggen.', 'info', 'growl-top-right')
                });
            }
        } else {
            Meteor.call('daysRowReset', () => {
                Bert.alert('Probeer elke dag eens op bezoek te komen!', 'info', 'growl-top-right')
            });
        }
    }
}

export function getBirthday() {
    $.getJSON('https://graph.facebook.com/me?fields=birthday&access_token=' +
        Meteor.user().services.facebook.accessToken,
        function(data) {
            var birthday = data.birthday
            Meteor.call('updateBirthDay', birthday.toString());
        }
    );
}

export async function clickChecker() {
    if (Clicks.find({ user: Meteor.userId() }).count() === 0) {
        Meteor.call('clickInit');
    }
}

function pusher(date) {
    Push.send({
        from: 'Badminton Health',
        title: 'Herinnering',
        text: 'Je bent vandaag gaan trainen, vergeet je dit niet aan te vullen?',
        query: {
            userId: Meteor.userId()
        },
        delayUntil: date
    });
}

export async function createReminders() {
    var thisWeek = moment().startOf('week');
    var reminder;

    const check = moment().startOf('week').format();

    if(Meteor.user().sportdays === undefined || Meteor.users.find().fetch().length < 1 || !Meteor.userId()) {
        return;
    }

    if (check.substr(0,10) === Meteor.user().sportdays.checkdate.substr(0,10)) {
        return;
    }

    thisWeek = thisWeek.add(1, 'day').add(20, 'hour');
    if(Meteor.user().sportdays.monday) {
        reminder = new Date(thisWeek)
        pusher(reminder)
    }

    thisWeek = thisWeek.add(1, 'day');
    if(Meteor.user().sportdays.tuesday) {
        reminder = new Date(thisWeek)
        pusher(reminder)
    }

    thisWeek = thisWeek.add(1, 'day');
    if(Meteor.user().sportdays.wednesday) {
        reminder = new Date(thisWeek)
        pusher(reminder)
    }

    thisWeek = thisWeek.add(1, 'day');
    if(Meteor.user().sportdays.thursday) {
        reminder = new Date(thisWeek)
        pusher(reminder)
    }

    thisWeek = thisWeek.add(1, 'day');
    if(Meteor.user().sportdays.friday) {
        reminder = new Date(thisWeek)
        pusher(reminder)
    }

    thisWeek = thisWeek.add(1, 'day');
    if(Meteor.user().sportdays.saturday) {
        reminder = new Date(thisWeek)
        pusher(reminder)
    }

    thisWeek = thisWeek.add(1, 'day');
    if(Meteor.user().sportdays.sunday) {
        reminder = new Date(thisWeek)
        pusher(reminder)
    }

    Meteor.call('reminderDate');
}

export var lowerLevel = [0  , 101, 251, 501, 901,  1551, 2601, 4301, 7051]
export var upperLevel = [100, 250, 500, 900, 1550, 2600, 4300, 7050, 11500]
//                         +150 +250 +400 +650 +1050 +1700 +2750 +4450

export async function cleanClicks() {
    Meteor.call('cleanClick');
}

export async function cleanDoubles() {
    var data = SportData.find().fetch();
    console.log("Oorspronkelijke lengte:", data.length);
    var toDelete = []
    for (var i = 0; i < data.length; i++) {
        for (var k = i+1; k < data.length; k++) {
            if (data[i].user === data[k].user &&
                data[i].result.type === data[k].result.type &&
                data[i].result.creationDate === data[k].result.creationDate &&
                data[i].result.value === data[k].result.value) {
                    toDelete.push(data[k]._id)
                }
        }
    }

    console.log("To delete: ", toDelete.length);
    toDelete.forEach( (item) => {
        Meteor.call('deleteSportId', item)
    })

    console.log("Nieuwe lijst: ", SportData.find().fetch().length);
    alert('finish!')
}

export async function updateZeros() {
    console.log("ok");
    var i = 0
    SportData.find({}).forEach( (item) => {
        if (item.earnedPoints === 0) {
            i += 1;
            Meteor.call('nonZero', item._id)
        }
    });
    console.log("ok", i);
}
