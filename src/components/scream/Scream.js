import { Card, CardContent, CardMedia, IconButton, Tooltip, Typography, withStyles } from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataAction'
import ChatIcon from '@material-ui/icons/Chat'
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

const styles = {

    card: {
        display: 'flex',
        marginBottom: 20
    },

    image: {
        minwidth: 200
    },
    media: {
        height: 140,
        width: 140,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }

};

class Scream extends Component {

    render() {
        const { classes,
            scream: {
                userImage, userHandle, body, createdAt, likeCount, commentCount, screamId
            },
            user: {
                authenticated,
                credentials: { handle }
            } } = this.props;

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={this.props.scream.screamId}></DeleteScream>
        ) : (
                null
            )



        dayjs.extend(relativeTime)

        return (
            <Card className={classes.card}>
                <CardMedia component="img" image={userImage} title="Profile Image" alt="profile image" className={classes.media}>
                </CardMedia>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/user/${userHandle}`} color="primary">{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    {/* {likeButton} */}
                    <LikeButton screamId={screamId}></LikeButton>
                    <span>{likeCount} likes</span>
                    <Tooltip title="comments" placement="bottom">
                        <IconButton className="button">
                            <ChatIcon color="primary"></ChatIcon>
                        </IconButton>
                    </Tooltip>
                    <span>{commentCount} comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}></ScreamDialog>
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));
