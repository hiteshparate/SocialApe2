import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip, withStyles } from '@material-ui/core';
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit'
import { editUserDetails } from '../redux/actions/userAction'

const styles = (theme) => ({
    ...theme.Profile,
    button: {
        float: 'right',
    }
})

export class EditProfile extends Component {

    state = {
        bio: '',
        website: '',
        location: '',
        open: false,
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.mapUsertoStateDetails(this.props.credentials)
    }
    handleClose = () => {
        this.setState({ open: false });
    }

    componentDidMount() {
        this.mapUsertoStateDetails(this.props.credentials);
    }

    mapUsertoStateDetails = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit Details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary" />


                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>
                        Edit Details
                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name="bio" type="text" label="bio" multiline rows="3" placeholder="Add something about you"
                                className={classes.TextField}
                                value={this.state.bio} onChange={this.handleChange}
                                fullWidth />
                            <TextField name="website" type="text" label="Website" placeholder="your personal website"
                                className={classes.TextField}
                                value={this.state.website} onChange={this.handleChange}
                                fullWidth />
                            <TextField name="location" type="text" label="Location" placeholder="Your City"
                                className={classes.TextField}
                                value={this.state.location} onChange={this.handleChange}
                                fullWidth />

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.handleSubmit} color="primary">Submit</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

const mapActionsToProps = { editUserDetails }
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditProfile));
