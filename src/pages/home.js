import { Grid, LinearProgress } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Profile from '../components/profile/Profile';
import Scream from '../components/scream/Scream';
import { getScreams } from '../redux/actions/dataAction'

export class home extends Component {

    componentDidMount() {
        this.props.getScreams();
    }
    render() {
        const { screams, loading } = this.props.data;

        let screamMarkUp = !loading ? (
            screams.map((scream) => {
                return <Scream key={scream.screamId} scream={scream}></Scream>
            })
        ) :
            (
                // <ScreamSkeleton></ScreamSkeleton>
                <LinearProgress></LinearProgress>
            )
        return (

            <Grid container spacing={5}>
                <Grid item sm={8} xs={12}>
                    {screamMarkUp}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile></Profile>
                </Grid>
            </Grid>
        )
    }

}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, { getScreams })(home);
