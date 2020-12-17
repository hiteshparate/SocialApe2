import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, TextField, Tooltip, withStyles } from '@material-ui/core'
import { Add, Close } from '@material-ui/icons'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { postScream, clearErrors } from '../redux/actions/dataAction'

const styles = (theme) => ({
    ...theme.PostScream,

})
class PostScream extends Component {
    state = {
        body: '',
        open: false,
        errors: {}
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            })
        }

        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                body: '',
                open: false,
                errors: {}
            })
            // this.handleClose();
        }
    }


    handleOpen = () => {
        this.setState({
            open: true,
        })
    }
    handleClose = () => {
        this.props.clearErrors();
        this.setState({
            open: false,
            errors: {}
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postScream({ body: this.state.body });
    }
    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;

        return (
            <Fragment>
                <Tooltip title="Post a Scream">
                    <IconButton onClick={this.handleOpen}>
                        <Add></Add>
                    </IconButton>
                </Tooltip>

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <Tooltip title="Close">
                        <IconButton onClick={this.handleClose} className={classes.closeButton}>
                            <Close></Close>
                        </IconButton>
                    </Tooltip>
                    <DialogTitle> Post a new Scream </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name="body" type="text" label="Scream Here" multiline rows="3"
                                placeholder="Let us Scream here"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button type="submit" varient="outlined" color="secondary" disabled={loading} className={classes.submitButton}>
                                Submit
                                  {loading && (<CircularProgress></CircularProgress>)}
                            </Button>

                        </form>
                    </DialogContent>


                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream)) 
