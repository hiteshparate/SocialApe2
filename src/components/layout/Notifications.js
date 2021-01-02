import { Badge, IconButton, Menu, MenuItem, Tooltip, Typography } from '@material-ui/core';
import { Chat, Favorite, NotificationImportant, NotificationsActive } from '@material-ui/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import React, { Component } from 'react'
import { Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { markNotificationsRead } from '../../redux/actions/userAction';

export class Notifications extends Component {
    state = {
        AnchorEl: null,
    }
    handleOpen = (event) => {
        this.setState({
            AnchorEl: event.target
        });

    }
    handleClose = () => {
        this.setState({ AnchorEl: null })
    }
    onMenuOpened = () => {
        let unReadNotificationsIds = this.props.notifications.filter(not => !not.read).map(not => not.notificationId);
        this.props.markNotificationsRead(unReadNotificationsIds);
    }
    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.AnchorEl;
        dayjs.extend(relativeTime);



        let notifiacationIcon;
        if (notifications && notifications.length > 0) {
            notifications.filter(notification => notification.read === false).length > 0 ?
                notifiacationIcon = (
                    <Badge badgeContent={notifications.filter(notification => notification.read === false).length} color="secondary">
                        <NotificationsActive></NotificationsActive>
                    </Badge>
                ) : (
                    notifiacationIcon = <NotificationsActive></NotificationsActive>
                )

        } else {
            notifiacationIcon = <NotificationsActive></NotificationsActive>
        }
        let notificationMarkup = notifications && notifications.length > 0 ? (
            notifications.map(not => {
                const verb = not.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(not.createdAt).fromNow();
                const iconColor = not.read ? 'primary' : 'secondary';
                const icon = not.type === "like" ? (
                    <Favorite color={iconColor} style={{ marginRight: 10 }}></Favorite>
                ) : (
                        <Chat color={iconColor} style={{ marginRight: 10 }}></Chat>
                    )

                return (
                    <MenuItem key={not.createdAt} onClick={this.handleClose}>
                        {icon}
                        <Typography component={Link} color="primary" varient="body2" to={`/user/${not.recipient}/scream/${not.screamId}`}>
                            {not.sender} {verb} your scream {time}
                            
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
                <MenuItem onClick={this.handleClose}> No notifications yet</MenuItem>
            )
        return (
            <Fragment>
                <Tooltip title="Notifications">
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleOpen}>
                        {notifiacationIcon}
                    </IconButton>

                </Tooltip>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} onEntered={this.onMenuOpened}>
                    {notificationMarkup}
                </Menu>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})
export default connect(mapStateToProps, { markNotificationsRead })(Notifications)
