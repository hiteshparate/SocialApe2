import { Button, Grid, TextField, withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitComment } from '../../redux/actions/dataAction'


const styles = {

}
export class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSUbmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, { body: this.state.body });
        this.setState({
            body : '',
        })
    }
    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSUbmit}>
                    <TextField
                        name="body"
                        label="comment here"
                        type='text'
                        error={errors.comment ? true : false}
                        helperText = {errors.comment}
                        value={this.state.body}
                        fullWidth
                        onChange={this.handleChange}

                    ></TextField>
                    <hr style={{border:'none'}}></hr>
                    <Button type="submit" variant="contained" color="primary"> Submit </Button>
                </form>
            </Grid>
        ) : (null)

        return commentFormMarkup;
    }
}
const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})
export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));
