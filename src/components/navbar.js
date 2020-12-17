import { AppBar, Button, Icon, Toolbar, Tooltip } from '@material-ui/core'
import { Add, Home, Notifications } from '@material-ui/icons';
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PostScrem from '../components/PostScream'

export class NavBar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                         <PostScrem></PostScrem>
                            <Tooltip title="Home">
                                <Icon>
                                    <Home />
                                </Icon>
                            </Tooltip>
                            <Tooltip title="Notifications">
                                <Icon>
                                    <Notifications />
                                </Icon>
                            </Tooltip>
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
