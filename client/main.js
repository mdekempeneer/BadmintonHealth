import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';

function getLang () {
    return (
        navigator.languages &&
        navigator.languages[0] ||
        navigator.language ||
        navigator.browserLanguage ||
        navigator.userLanguage ||
        'en'
    );
};

Meteor.startup(() => {
    i18n.setLocale(getLang());

    Push.Configure({
        ios: {
            alert: true,
            badge: true,
            sound: true,
            vibrate: true,
        },
        android: {
            alert: true,
            badge: true,
            sound: true,
            vibrate: true,
            clearNotifications: true
        }
    });
});
