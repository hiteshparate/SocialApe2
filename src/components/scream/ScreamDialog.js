import { CircularProgress, Dialog, DialogContent, Grid, IconButton, Slide, Tooltip, Typography, withStyles } from '@material-ui/core'
import { ChatBubble, Close, UnfoldMoreRounded } from '@material-ui/icons'
import dayjs from 'dayjs'
import React, { Component } from 'react'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getScream, clearErrors } from '../../redux/actions/dataAction'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
    closeButton: {
        position: 'absolute',
        // left: '91%',
        // top: '6%'
    },
    invisibleSeparator: {
        border: 'none',
        margin: '4'
    },
    ProfileImage: {
        maxWidth: 150,
        height: 150,
        borderRadius: '50%',
        objectFit: 'cover',
    },
    dialogContent: {
        padding: 20
    },

    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },



}

export class ScreamDialog extends Component {

    state = {
        open: false,
        oldPath: '',
        newPath: '',
    }
    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;
        const { userHandle, screamId } = this.props;

        const newPath = `/user/${userHandle}/scream/${screamId}`;
      
        if (oldPath === newPath) oldPath = `/user/${userHandle}`;
        window.history.pushState(null, null, newPath);
        this.setState({ open: true, oldPath, newPath });
        this.props.getScream(this.props.screamId);

    }

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    }
    render() {

        const { classes,
            scream: { createdAt, body, screamId, likeCount, commentCount, userHandle, userImage, comments },
            UI: { loading }
        } = this.props;

        const dialogMarkup = loading ? (<CircularProgress size={200} ></CircularProgress>) : (
            <Grid container spacing={7}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.ProfileImage}></img>
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} variant="h5" color="primary" to={`/user/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}></hr>
                    <Typography variant="body2" color="textSecondary">
                        Joined on {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                        {body}
                    </Typography>
                    <hr className={classes.invisibleSeparator}></hr>
                    <LikeButton screamId={screamId}></LikeButton>
                    <span>{likeCount} likes</span>
                    <Tooltip title="comments" placement="bottom">
                        <IconButton className="button">
                            <ChatBubble color="primary"></ChatBubble>

                        </IconButton>

                    </Tooltip>
                    <span>{commentCount} comments</span>

                </Grid>
                <hr className={classes.visibleSeparator}></hr>
                <CommentForm screamId={screamId}></CommentForm>

                <Comments comments={comments}></Comments>
            </Grid>
        )

        return (
            <Fragment>
                <Tooltip title="expand Scream">
                    <IconButton onClick={this.handleOpen} disabled={window.location.pathname === `/user/${userHandle}`} >
                        <UnfoldMoreRounded></UnfoldMoreRounded>
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} scroll="paper" TransitionComponent={Transition}>
                    <Tooltip title="close">

                        <IconButton onClick={this.handleClose} className={classes.closeButton}>
                            <Close />
                        </IconButton>
                    </Tooltip>

                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>



            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI,
})

export default connect(mapStateToProps, { getScream, clearErrors })(withStyles(styles)(ScreamDialog)) 
