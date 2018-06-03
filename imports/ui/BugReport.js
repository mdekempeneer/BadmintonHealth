/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Material-UI componenten */
import Button from 'material-ui/Button';

/* Componenten */
import AccountsUIWrapper from './components/AccountsUIWrapper.js';
import CircularIndeterminate from './components/CircularIndeterminate.js';

/* Database */
import { SportData } from '../api/sportdata.js';

/* Language */
const T = i18n.createComponent();

export default class Settings extends TrackerReact(Component) {
    constructor() {
        super();

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers')
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const os = ReactDOM.findDOMNode(this.refs.operatingSystem).value.trim();
        const sm = ReactDOM.findDOMNode(this.refs.smartphoneModel).value.trim();
        const is = ReactDOM.findDOMNode(this.refs.issue).value.trim();

        if (os === '') {
            alert('Please fill in your operating system.')
        } else if (sm === '') {
            alert('Please fill in your smartphone model.')
        } else if (is === '') {
            alert('Please describe the issue.')
        } else {
            const reportText =  'Gebruiker: '.concat(Meteor.user().profile.name).concat('\r')
                                    .concat('Operating system: ').concat(os).concat('\r')
                                    .concat('Smartphone model: ').concat(sm).concat('\r')
                                    .concat('Issue: ').concat(is);

            Meteor.call('sendEmail', 'health@mdekempeneer.be', 'health@mdekempeneer.be','health@mdekempeneer.be', 'bug report', reportText, () => {
                Bert.alert('Thank you for your cooperation', 'success', 'growl-top-right');
            });

            //Clear form
            ReactDOM.findDOMNode(this.refs.operatingSystem).value = '';
            ReactDOM.findDOMNode(this.refs.smartphoneModel).value = '';
            ReactDOM.findDOMNode(this.refs.issue).value = '';
        }
    }

    render() {
        if(Meteor.users.find().fetch().length < 1 || !Meteor.userId()) {
            return (<div className='please_login'>
                        <T>general.login_please</T><br />
                        <div className='facebook-login-pages'>
                            <AccountsUIWrapper />
                        </div>
                    </div>);
        }

        return (
            <div className='overall-box-color-left'>
                <p>We apologise for the inconvenience. Please describe the issue you are facing and we will get back to you with a fix.</p>
                <form className='new-task' onSubmit={this.handleSubmit.bind(this)} >
                    <input type='text' ref='operatingSystem' placeholder='Type your operating system'/>
                    <input type='text' ref='smartphoneModel' placeholder='Type your smartphone model' />
                    <input type='text' ref='issue' placeholder='Describe the issue' />
                </form>
                <br/>
                <Button onClick={this.handleSubmit.bind(this)}> submit </Button>
            </div>
        );
    }
}
