import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, TextField, Tooltip, withStyles } from '@material-ui/core'
import { Add, Close } from '@material-ui/icons'
import React, { Component } from 'react'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import { postScream, clearErrors } from '../redux/actions/dataAction'

const styles = {
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    },

}

export class PostScream extends Component {

    state = {
        open: false,
        body: '',
        errors: {},
    }
    handleOpen = () => {
        this.setState({
            open: true,
        })
    }

    handleClose = () => {
        this.setState({
            open: false,
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postScream({ body: this.state.body })

        this.setState({
            open: false,
            body: '',
            errors: this.state.errors
        })
    }
    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;
        return (
            <Fragment>
                <Tooltip title="post Scream">
                    <IconButton onClick={this.handleOpen}>
                        <Add />


                    </IconButton>
                </Tooltip>

                <Dialog open={this.state.open} maxWidth="sm" fullWidth onClose={this.handleClose}>
                    <Tooltip title="close">

                        <IconButton onClick={this.handleClose} className={classes.closeButton}>
                            <Close />


                        </IconButton>
                    </Tooltip>
                    <DialogTitle >
                        Post Scream here
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="Scream"
                                multiline
                                fullWidth
                                rows="3"
                                placeholder="Add your thoughts here"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                onChange={this.handleChange}
                                disabled={loading}
                            />
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
                                Submit {loading && (<CircularProgress></CircularProgress>)}
                            </Button>
                        </form>

                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    UI: state.UI,
})

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream)) 
