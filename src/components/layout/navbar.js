import { AppBar, Button, Icon, IconButton, Toolbar, Tooltip } from '@material-ui/core'
import { Add, Home } from '@material-ui/icons';
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PostScream from '../scream/PostScream'
import Notifications from './Notifications'

export class NavBar extends Component {


    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <PostScream></PostScream>

                            <Tooltip title="Home">
                                <Button color="inherit" component={Link} to="/">
                                    <Home>
                                    </Home>
                                </Button>
                            </Tooltip>
                            <Notifications></Notifications>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/signup">SignUp</Button>
                                <Button color="inherit" component={Link} to="/">Home</Button>
                            </Fragment>
                        )
                    }
                </Toolbar>
            </AppBar >
        )
    }
}
export const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(NavBar)
