import React, { Fragment } from 'react';
import { Button, Paper, Typography, withStyles, IconButton, Tooltip } from '@material-ui/core';
import { CalendarToday, ExitToApp, LocationOn } from '@material-ui/icons';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'
import LinkIcon from '@material-ui/icons/Link';

import EditProfile from './EditProfile'
import MuiLink from '@material-ui/core/Link';
const styles = (theme) => ({
    ...theme.Profile
})
const StaticProfile = (props) => {
    const { classes, profile: { handle, createdAt, imageUrl, bio, website, location } } = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">

                    <img src={imageUrl} alt="profile" className="profile-image" />

                </div>
                <hr />
                <div className="profile-details">
                    <MuiLink component={Link} to={`/user/${handle}`} color="primary" variant="h5">@{handle}</MuiLink>
                </div>
                <hr />
                {bio && <Typography component="span" variant="body2"> {bio}</Typography>}
                <hr />
                {location && (
                    <Fragment>
                        <LocationOn color="primary"></LocationOn>
                        <span>{' '}{location}</span>
                        <hr />
                    </Fragment>
                )}
                {website && (
                    <Fragment>
                        <LinkIcon></LinkIcon>
                        <a href={website} target="_blank" rel="noopener noreferrer">{' '}{website}</a>
                        <br></br>
                    </Fragment>
                )}
                <br></br>
                <CalendarToday color="primary">

                </CalendarToday>
                <span> Joined {dayjs(createdAt).format('MMM,YYYY')}</span>
            </div>

        </Paper>
    )
}

export default withStyles(styles)(StaticProfile);
