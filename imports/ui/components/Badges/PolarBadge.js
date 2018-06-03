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
            max: 13
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
            labels: ['Hartslag', 'Gewicht', 'Stappen', 'Slaap', 'Tijd'],
            datasets: [{
                backgroundColor: [
                    '#e41a1c',
                    '#377eb8',
                    '#4daf4a',
                    '#984ea3',
                    '#ff7f00'
                ],
                borderColor: [
                    '#e41a1c',
                    '#377eb8',
                    '#4daf4a',
                    '#984ea3',
                    '#ff7f00'
                ],
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [this.props.heartrate, this.props.weight,
                        this.props.steps, this.props.sleep, this.props.time]
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
