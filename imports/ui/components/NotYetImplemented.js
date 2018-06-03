import React, { Component } from 'react';
import Button from 'material-ui/Button';
import CircularIndeterminate from './CircularIndeterminate.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class NotYetImplemented extends TrackerReact(Component) {

    render() {
        return (<div className='please_login'>
                    Not yet implemented<br />
                    <CircularIndeterminate />
                    <Button variant='raised' color='secondary' href='/'>
                        HOME
                    </Button>
                </div>);
    }
}
