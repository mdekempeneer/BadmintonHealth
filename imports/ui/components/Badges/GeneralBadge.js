/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Polar } from 'react-chartjs-2';

const options = {
    responsive: true,
    scale: {
        display: true,
        ticks: {
            display: false,
            min: -1,
            max: 13,
            stepSize: 2
        }
    },
    animation: {
        animateRotate: true,
        animateScale: true
    }
};

const legend = {
    display: true
};

export default class GeneralBadge extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks')
            }
        };
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
    }

    render() {
        if(Meteor.users.find().fetch().length < 1 || !Meteor.userId()) {
            return (<div>Contacteer de administrator</div>);
        }

        const data = {
            labels: ['Hartslag', 'Gewicht', 'Stappen', 'Slaap', 'Tijd'],
            datasets: [{
                backgroundColor: [
                    '#e41a1c',
                    '#377eb8',
                    '#4daf4a',
                    '#984ea3',
                    '#ff7f00'
                ],
                borderColor: 'rgba(0,0,0,0.5)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [
                    Meteor.user().badges.currentLevel.heartrate,
                    Meteor.user().badges.currentLevel.weight,
                    Meteor.user().badges.currentLevel.steps,
                    Meteor.user().badges.currentLevel.sleep,
                    Meteor.user().badges.currentLevel.time
                ]
            }]
        };

        return (<Polar
            data={data}
            options={options}
            legend={legend}
            width={500}
            height={500}
            />);
    }
}
