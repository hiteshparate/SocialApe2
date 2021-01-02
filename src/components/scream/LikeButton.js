// import classes from '*.module.css';
import { IconButton, Tooltip, withStyles } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeScream, unlikeScream } from '../../redux/actions/dataAction';

const styles = {

}
export class LikeButton extends Component {
    likedScream = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId)) {
            return true;
        }
        else {
            return false;
        }
    }

    likeScream = () => {
        this.props.likeScream(this.props.screamId);
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId);
    }

    render() {
        const { classes, user: { authenticated } } = this.props;
        const likeButton = !authenticated ? (
            <Tooltip title="Like">
                <IconButton>
                    <Link to='/login'>
                        <FavoriteBorder color="primary">

                        </FavoriteBorder>
                    </Link>
                </IconButton>
            </Tooltip>

        ) : (
                this.likedScream() ? (
                    <Tooltip title="undo like">
                        <IconButton onClick={this.unlikeScream}>
                            <Favorite color="primary" />
                        </IconButton>
                    </Tooltip>
                ) : (
                        <Tooltip title="Like">
                            <IconButton onClick={this.likeScream}>
                                <FavoriteBorder color="primary" />
                            </IconButton>
                        </Tooltip>
                    )
            )

        return likeButton;
    }
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps, { likeScream, unlikeScream })(withStyles(styles)(LikeButton)) 
