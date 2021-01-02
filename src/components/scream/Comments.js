import React, { Component } from 'react'
import grid from '@material-ui/core/styles/withStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import { colors, Grid, Typography } from '@material-ui/core';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const styles = {
    ProfileImage: {
        // maxWidth: '100%',
        height: 75,
        width: 75,
        objectFit: 'cover',
        borderRadius: '50%',
        position: 'center',

    },
    separator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    
}

export class Comments extends Component {
    render() {
        const { classes, comments } = this.props;
        return (
            <Grid container>
                {comments.map(comment => {
                    const { createdAt, body, userImage, userHandle } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={1}>
                                    </Grid>
                                    <Grid item sm={2}>
                                        <img src={userImage} className={classes.ProfileImage} alt="comment" ></img>
                                    </Grid>
                                    <Grid item sm={7} className={classes.commentData}>
                                        <Typography component={Link} to={`user/${userHandle}`} color='primary'>
                                            {userHandle}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <Typography variant="body1">
                                            {body}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <hr className={classes.separator}></hr>
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }
}

export default withStyles(styles)(Comments);
