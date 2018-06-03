/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AccountsUIWrapper extends TrackerReact(Component) {
    componentDidMount() {
        this.view = Blaze.render(Template.loginButtons,
            ReactDOM.findDOMNode(this.refs.container));
    }

    componentWillUnmount() {
        Blaze.remove(this.view);
    }

    render() {
        return <span ref='container'/>;
    }
}
