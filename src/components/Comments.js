import React, { Component } from 'react'
import grid from '@material-ui/core/styles/withStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import { colors, Grid, Typography } from '@material-ui/core';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const styles = {

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
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" height="200" width="200"></img>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <Typography component={Link} to={`users/${userHandle}`} color='primary'>
                                            {userHandle}
                                        </Typography>
                                        <Typography variant="body2">
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYYY')}
                                        </Typography>
                                        <Typography variant="body1">
                                            {body}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }
}

export default withStyles(styles)(Comments);
