import React from 'react';
import { mount } from 'react-mounter';

import { MainLayout } from './layouts/MainLayout.js';
import App from '../imports/ui/App.js';
import Profile from '../imports/ui/Profile.js';
import Highscores from '../imports/ui/Highscores.js';
import Settings from '../imports/ui/Settings.js';
import Badges from '../imports/ui/Badges.js';
import AnalyseWorkouts from '../imports/ui/AnalyseWorkouts.js';
import BadmintonSlagenFilm from '../imports/ui/BadmintonSlagenFilm.js';
import AddWorkouts from '../imports/ui/AddWorkouts.js';
import BugReport from '../imports/ui/BugReport.js';
import ConnectDevices from '../imports/ui/ConnectDevices.js';
import PersonalGoals from '../imports/ui/PersonalGoals.js';

FlowRouter.route('/', {
    action() {
        mount(MainLayout, {
            content: (<App />)
        })
    }
});

FlowRouter.route('/profile', {
    action() {
        mount(MainLayout, {
            content: (<Profile />)
        })
    }
});

FlowRouter.route('/highscores', {
    action() {
        mount(MainLayout, {
            content: (<Highscores />)
        })
    }
});

FlowRouter.route('/settings', {
    action() {
        mount(MainLayout, {
            content: (<Settings />)
        })
    }
});

FlowRouter.route('/badges', {
    action() {
        mount(MainLayout, {
            content: (<Badges />)
        })
    }
});

FlowRouter.route('/analyseworkouts', {
    action() {
        mount(MainLayout, {
            content: (<AnalyseWorkouts />)
        })
    }
});

FlowRouter.route('/badmintonslagen', {
    action() {
        mount(MainLayout, {
            content: (<BadmintonSlagenFilm />)
        })
    }
});

FlowRouter.route('/addworkouts', {
    action() {
        mount(MainLayout, {
            content: (<AddWorkouts />)
        })
    }
});


FlowRouter.route('/bugreport', {
    action() {
        mount(MainLayout, {
            content: (<BugReport />)
        })
    }
});

FlowRouter.route('/connect', {
    action() {
        mount(MainLayout, {
            content: (<ConnectDevices />)
        })
    }
});

FlowRouter.route('/personalgoals', {
    action() {
        mount(MainLayout, {
            content: (<PersonalGoals />)
        })
    }
});
