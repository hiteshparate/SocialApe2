import { withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class CommentFrom extends Component {

    render() {
        const { classes, authenticated } = this.props;
        const commentMarkup = authenticated
        return commentMarkup;
    }
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(withStyles(styles)(CommentFrom));
