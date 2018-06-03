import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
    requestPermissions: {
        facebook: ['public_profile', 'email', 'user_birthday']
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});
