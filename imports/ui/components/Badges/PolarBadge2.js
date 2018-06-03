/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Polar } from 'react-chartjs-2';

const options = {
    responsive: true,
    scale: {
        display: false,
        ticks: {
            display: false,
            min: -1,
            max: 12,
            stepSize: 13
        }
    },
    animation: {
        animateRotate: false,
        animateScale: true
    }
};

const legend = {
    display: false
};

export default class PolarBadge extends TrackerReact(Component) {
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
            labels: ['Hartslag', 'Gewicht', 'Afstand', 'Stappen', 'Slaap', 'Tijd'],
            datasets: [{
                backgroundColor: [
                    '#D50000',
                    '#304FFE',
                    '#00B8D4',
                    '#64DD17',
                    '#FFAB00',
                    '#FF6D00'
                ],
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [this.props.heartrate, this.props.weight,
                        this.props.distance, this.props.steps,
                        this.props.sleep, this.props.time]
            }]
        };

        return (<Polar
            data={data}
            options={options}
            legend={legend}
            width={95} height={95}
            />);
    }
}
