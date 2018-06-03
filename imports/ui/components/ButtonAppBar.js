/* NPM packages */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Material-UI style */
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

/* Material-UI componenten */
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Home from 'material-ui-icons/Home'
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';

/* Componenten */
import AccountsUIWrapper from './AccountsUIWrapper.js'

/* Language */
const T = i18n.createComponent();

/* Styles */
const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class MenuAppBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subscription: {
                users: Meteor.subscribe('allUsers'),
                clicks: Meteor.subscribe('clicks'),
                sport: Meteor.subscribe('sportdata')
            },
            anchorEl: null,
        };

        this.handleMenu = this.handleMenu.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleProfile = this.handleProfile.bind(this)
        this.handleSettings = this.handleSettings.bind(this)
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
        this.state.subscription.clicks.stop();
        this.state.subscription.sport.stop();
    }

    handleMenu(event) {
        if (Meteor.userId()) {
            Meteor.call('clickUpdate', 'general', 'menuButton');
        }
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose() {
        this.setState({ anchorEl: null });
    };

    handleLogout() {
        if (Meteor.userId()) {
            Meteor.call('clickUpdate', 'general', 'logout');
        }
        Meteor.logout();
        this.handleClose();
    };

    handleProfile() {
        if (Meteor.userId()) {
            Meteor.call('clickUpdate', 'general', 'profile');
            FlowRouter.go('/profile');
        }
        this.handleClose();
    };

    handleSettings() {
        if (Meteor.userId()) {
            Meteor.call('clickUpdate', 'general', 'settings');
            FlowRouter.go('/settings');
        }
        this.handleClose();
    };

    clickHome(event) {
        if (Meteor.userId()) {
            Meteor.call('clickUpdate', 'general', 'homeButton');
            FlowRouter.go('/');
        }
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        var user = Meteor.user();

        return (
            <div className={classes.root}>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color='inherit' aria-label='Menu' onClick={this.clickHome.bind(this)}>
                            <Home />
                        </IconButton>

                        <Typography variant='title' color='inherit' className={classes.flex}>
                            Badminton Health
                        </Typography>
                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup='true'
                                onClick={this.handleMenu}
                                color='inherit'
                            >
                                <MoreVertIcon />
                            </IconButton>

                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleProfile}><T>startpage.profile</T></MenuItem>
                                <MenuItem onClick={this.handleSettings}><T>startpage.settings</T></MenuItem>
                                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
