import { Button, Dialog, DialogActions, DialogTitle, IconButton, Tooltip, withStyles } from '@material-ui/core'
import { Delete, DeleteOutline } from '@material-ui/icons'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { deleteScream } from '../../redux/actions/dataAction';
const styles = {
    DeleteButton:{
        position : 'absolute',
        left: '55%',
        

    }
}

export class DeleteScream extends Component {
    state = {
        open: false,
    };
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

    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({ open: false });

    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="Delete Scream" className={classes.DeleteButton}>
                    <IconButton onClick={this.handleOpen}>
                        <Delete color="action"></Delete>

                    </IconButton>

                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm" >
                    <DialogTitle>
                        Are you sure you want to delete?
                </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary"> Cancel</Button>
                        <Button onClick={this.deleteScream} color="secondary"> Delete </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream)); 
