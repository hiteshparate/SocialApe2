import { Button, Dialog, DialogContent, Grid, IconButton, Tooltip, Typography, withStyles } from '@material-ui/core'
import { Close, UnfoldMore } from '@material-ui/icons'
import dayjs from 'dayjs'
import React, { Component } from 'react'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchScream } from '../redux/actions/dataAction'

const styles = (theme) => ({
        ...theme.ScreamDialog
})

export class ScreamDialog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
        }
        // this.props.fetchScream(this.props.screamId);
    }


    handleOpen = () => {
        this.setState({
            open: true
        });
        // this.props.fetchScream(this.props.screamId);

    }

    handleClose = () => {
        this.setState({
            open: false,
        })
    }
    render() {
        const { classes,
            scream: {
                userImage, userHandle, body, createdAt, likeCount, commentCount, screamId
            },

        } = this.props;

        const dialogMarkup =
            (<Grid container spacing={10}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" height='200px' width="200px"></img>
                </Grid>
                <Grid item sm={7}>
                    @<Typography component={Link} color="primary" varient="h5" to={`/users/${userHandle}`}>
                        {userHandle}
                    </Typography>
                    <hr></hr>
                    <Typography varient="body2" color="primary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr></hr>
                    <Typography varient="body2" color="primary">
                        {body}
                    </Typography>
                    <Typography varient="h1" color="primary">
                        {likeCount} likes
                    </Typography>
                    <Typography varient="h1" color="primary">
                        {commentCount} comments
                    </Typography>
                </Grid>
            </Grid>)

        return (

            <Fragment>
                <Tooltip title="Expand Scream">
                    <IconButton onClick={this.handleOpen}>
                        <UnfoldMore color="primary"></UnfoldMore>
                    </IconButton>

                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <Tooltip title="Close">
                        <IconButton onClick={this.handleClose} >
                            <Close></Close>
                        </IconButton>
                    </Tooltip>
                    <DialogContent>
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

const mapActionsToProps = {
    fetchScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));
