/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Flex grid */
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

/* Material-UI componenten */
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

/* Material-UI style */
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

/* Material-UI colors */
import green from 'material-ui/colors/green';

/* Styles */
const styles = theme => {
};

class DaySelector extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            }
        };

        this.handleChange = this.handleChange.bind(this)
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
        this.state.subscription.sport.stop();
    }

    handleChange(name) {
        return event => {
            Meteor.call('sportdays', name, event.target.checked);
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Row className='flex-box-color' justify='space-around' align='middle'>
                    <Col span={12}> Trainingsdagen </Col>
                    <Col span={1}>
                        <FormControlLabel
                            control={ <Switch checked={Meteor.user().sportdays.monday} onChange={this.handleChange('monday')} value='monday' color='primary' /> }
                        />
                        Maa
                    </Col>
                    <Col span={1}>
                        <FormControlLabel
                            control={ <Switch checked={Meteor.user().sportdays.tuesday} onChange={this.handleChange('tuesday')} value='tuesday' color='primary' /> }
                        />
                        Din
                    </Col>
                    <Col span={1}>
                        <FormControlLabel
                            control={ <Switch checked={Meteor.user().sportdays.wednesday} onChange={this.handleChange('wednesday')} value='wednesday' color='primary' /> }
                        />
                        Woe
                    </Col>
                    <Col span={1}>
                        <FormControlLabel
                            control={ <Switch checked={Meteor.user().sportdays.thursday} onChange={this.handleChange('thursday')} value='thursday' color='primary' /> }
                        />
                        Don
                    </Col>
                    <Col span={1}>
                        <FormControlLabel
                            control={ <Switch checked={Meteor.user().sportdays.friday} onChange={this.handleChange('friday')} value='friday' color='primary' /> }
                        />
                        Vri
                    </Col>
                    <Col span={1}>
                        <FormControlLabel
                            control={ <Switch checked={Meteor.user().sportdays.saturday} onChange={this.handleChange('saturday')} value='saturday' color='primary' /> }
                        />
                        Zat
                    </Col>
                    <Col span={1}>
                        <FormControlLabel
                            control={ <Switch checked={Meteor.user().sportdays.sunday} onChange={this.handleChange('sunday').bind(this)} value='sunday' color='primary' /> }
                        />
                        Zon
                    </Col>
                </Row>
            </div>
        );
    }
}

DaySelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DaySelector);
