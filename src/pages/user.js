import { Grid, withStyles } from '@material-ui/core'
import Axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import StaticProfile from '../components/profile/StaticProfile';
import Scream from '../components/scream/Scream';
import { getUserData } from '../redux/actions/dataAction'

const styles = (theme) => ({
    ...theme.Profile,
})

class user extends Component {
    state = {
        profile: '',
        screamIdParams: null,
    }
    componentDidMount() {
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;


        if (screamId) {
            this.setState({
                screamIdParams: screamId
            })
        }
        this.props.getUserData(handle);
        Axios.get(`/user/${handle}`).then(res => {
            this.setState({
                profile: res.data.user,
            })
        }).catch(err => console.log(err));
    }
    render() {
        const { screams, loading } = this.props.data;
        // console.log(screams);
        const { screamIdParams } = this.state;
        const screamsMarkUp = loading ? (
            <p>Loading data...</p>
        ) : (
                screams === null ?
                    (<p>No screams posted</p>) :
                    !screamIdParams ?
                        (screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)) :
                        (screams.map(scream => {
                            if (scream.screamId !== screamIdParams)
                                return <Scream key={scream.screamId} scream={scream} />
                            else
                                return <Scream key={scream.screamId} scream={scream} openDialog />
                        }))
            )

        return (
            <Grid container spacing={5}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkUp}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <p> Loading Data...</p>
                    ) : (
                            <StaticProfile profile={this.state.profile}></StaticProfile>
                        )}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    data: state.data,
})
export default connect(mapStateToProps, { getUserData })(withStyles(styles)(user))
