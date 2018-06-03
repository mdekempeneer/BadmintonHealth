import { Meteor } from 'meteor/meteor';

import { SportData } from '../imports/api/sportdata.js';
import { NotificationHistory } from '../imports/api/notifications.js';
import { Clicks } from '../imports/api/clicks.js';
import { PersonalGoalData } from '../imports/api/personalgoals.js';

Meteor.startup(() => {

    Push.Configure({
        apn: {
        },
        gcm: {
        },
        production: true,
        'sound': true,
        'badge': true,
        'alert': true,
        'vibrate': true
    });
});

Meteor.publish('allUsers', function() { return Meteor.users.find({}); });

Meteor.publish('sportdata', function() { return SportData.find({ user: Meteor.userId() }); });

Meteor.publish('allSportdata', function() { return SportData.find({}); });

Meteor.publish('notifications', function() { return NotificationHistory.find({}); });

Meteor.publish('clicks', function() { return Clicks.find({ user: Meteor.userId() }); });

Meteor.publish('personalgoals', function() { return PersonalGoalData.find({ user: Meteor.userId() }); });

Accounts.onCreateUser( function(options, user) {
    user.profile = options.profile || {};
    user.birthday = '';
    user.club = '';
    user.currentLevel = 1;
    user.currentPoints = 1;
    user.team = '';
    user.days = 1;
    user.maxdays = 1;
    user.lastday = new Date();

    user.badges = {
        mostRecent1: { heartrate: 0, weight: 0, distance: 0, steps: 0, sleep: 0, time: 0, date: new Date(), type: '', text: '' },
        mostRecent2: { heartrate: 0, weight: 0, distance: 0, steps: 0, sleep: 0, time: 0, date: new Date(), type: '', text: '' },
        mostRecent3: { heartrate: 0, weight: 0, distance: 0, steps: 0, sleep: 0, time: 0, date: new Date(), type: '', text: '' },
        currentLevel: { heartrate: 0, weight: 0, distance: 0, steps: 0, sleep: 0, time: 0 },
        lastUpdate: new Date(),
        totalBadges: 0,
        rows: {
            heart: [false, false, false, false, false, false, false, false, false, false, false, false],
            weight: [false, false, false, false, false, false, false, false, false, false, false, false],
            distance: [false, false, false, false, false, false, false, false, false, false, false, false],
            steps: [false, false, false, false, false, false, false, false, false, false, false, false],
            time: [false, false, false, false, false, false, false, false, false, false, false, false],
            sleep: [false, false, false, false, false, false, false, false, false, false, false, false]
        }
    }

    user.sportdays = {
        monday: false, tuesday: false, wednesday: false,
        thursday: false, friday: false, saturday: false, sunday: false,
        checkdate: '0'
    }

    user.timer = false;
    return user;
});
