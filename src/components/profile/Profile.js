import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Paper, Typography, withStyles, IconButton, Tooltip } from '@material-ui/core';
import { CalendarToday, ExitToApp, LocationOn } from '@material-ui/icons';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import { logoutUser, uploadImage } from '../../redux/actions/userAction'
import EditProfile from '../profile/EditProfile'
import MuiLink from '@material-ui/core/Link';

const styles = (theme) => ({
    ...theme.Profile
})
class Profile extends Component {
    handleImageUpload = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);

    }

    handleEditImage = () => {
        const file = document.getElementById('imageUpload');
        file.click();

    }
    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const {
            classes,
            user: {
                credentials: { handle, createdAt, imageUrl, bio, website, location },
                loading,
                authenticated
            }
        } = this.props;

        let profileMarkUp = !loading ?
            (authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">

                            <img src={imageUrl} alt="profile" className="profile-image" />
                            <input type="file" id="imageUpload" hidden="hidden" onChange={this.handleImageUpload} />
                            <Tooltip title="edit image" placement="bottom">
                                <IconButton onClick={this.handleEditImage} className="button">
                                    <EditIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <hr />
                        <div className="profile-details">
                            <MuiLink component={Link} to={`/user/${handle}`} color="primary" variant="h5">@{handle}</MuiLink>
                        </div>
                        <hr />
                        {bio && <Typography component="span" variant="body2"> {bio}</Typography>}
                        <hr />
                        {location && (
                            <Fragment>
                                <LocationOn color="primary"></LocationOn>
                                <span>{' '}{location}</span>
                                <hr />
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon></LinkIcon>
                                <a href={website} target="_blank" rel="noopener noreferrer">{' '}{website}</a>
                                <br></br>
                            </Fragment>
                        )}
                        <br></br>
                        <CalendarToday color="primary">

                        </CalendarToday>
                        <span> Joined {dayjs(createdAt).format('MMM,YYYY')}</span>
                    </div>
                    <Tooltip placement="top" title="logout">
                        <IconButton onClick={this.handleLogout}>
                            <ExitToApp color="primary"></ExitToApp>
                        </IconButton>

                    </Tooltip>
                    <EditProfile></EditProfile>
                </Paper>
            ) : (
                    <Paper className={classes.paper}>
                        <Typography component="span" variant="body2" align="center">
                            No Profile Found,please Login Again.
                            </Typography>
                        <hr />
                        <div className={classes.buttons}>
                            <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                            <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
                        </div>

                    </Paper>
                )) :
            (
                <h1> loading </h1>
            )
        return profileMarkUp;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionToProps = { logoutUser, uploadImage }
export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Profile));
