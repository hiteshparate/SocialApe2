import { CircularProgress, Dialog, DialogContent, Grid, IconButton, Slide, Tooltip, Typography, withStyles } from '@material-ui/core'
import { Close, UnfoldMoreRounded } from '@material-ui/icons'
import dayjs from 'dayjs'
import React, { Component } from 'react'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getScream } from '../redux/actions/dataAction'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    },
    invisibleSeparator: {
        boarder: 'none',
        margin: '4'
    },
    ProfileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    CircularProgress: {
        textAlign: 'center',
        marginTop: 100,
        marginLeft: 150,
        marginBottom: 50
    },
    dialogContent : {
        
    }
   
}

export class ScreamDialog extends Component {

    state = {
        open: false,
    }

    handleOpen = () => {
        this.setState({ open: true });
        this.props.getScream(this.props.screamId);
    }

    handleClose = () => {
        this.setState({ open: false });
    }
    render() {

        const { classes,
            scream: { createdAt, body, screamId, likeCount, commentCount, userHandle, userImage },
            UI: { loading }
        } = this.props;

        const dialogMarkup = loading ? (<CircularProgress size={200} className={classes.CircularProgress}></CircularProgress>) : (
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
                    <hr className={classes.invisibleSeparator}></hr>

                </Grid>
            </Grid>
        )

        return (
            <Fragment>
                <Tooltip title="expand Scream">
                    <IconButton onClick={this.handleOpen}>
                        <UnfoldMoreRounded></UnfoldMoreRounded>
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open}  onClose={this.handleClose} scroll="paper" TransitionComponent={Transition}>
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

export default connect(mapStateToProps, { getScream })(withStyles(styles)(ScreamDialog)) 
