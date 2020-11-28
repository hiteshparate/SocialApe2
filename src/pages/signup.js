import React, { Component } from 'react'
import { Button, CircularProgress, Grid, TextField, Typography, withStyles } from '@material-ui/core'
import AppIcon from '../images/logo192.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userAction';

const styles = (theme) => ({
    ...theme.customForm
});
export class signup extends Component {


    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);

        // Axios.post('/signup', newUserData)
        //     .then(res => {
        //         console.log(res.data);
        //         localStorage.setItem('FBIdtoken', `Bearer ${res.data.token}`);
        //         this.setState({
        //             loading: false,
        //         });
        //         this.props.history.push('/')
        //     })
        //     .catch(err => {
        //         this.setState({
        //             errors: err.response.data,
        //             loading: false
        //         });
        //     })

    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }

    }
    render() {
        const { classes, UI : {loading} } = this.props;
        const { errors } = this.state;

        return (
            <div>
                <Grid container className={classes.form}>
                    <Grid item sm />
                    <Grid item sm >
                        <img src={AppIcon} alt="app icon" className={classes.icon}></img>
                        <Typography variant="h3">Signup</Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField id="email" name="email" type="email" label="Email" className={classes.textField}
                                value={this.state.email}
                                helperText={errors.email}
                                error={errors.email}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField id="password" name="password" type="password" label="Password" className={classes.textField}
                                value={this.state.password}
                                helperText={errors.password}
                                error={errors.password ? true : false}
                                onChange={this.handleChange}
                                fullWidth
                            />

                            <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" className={classes.textField}
                                value={this.state.confirmPassword}
                                helperText={errors.confirmPassword}
                                error={errors.confirmPassword ? true : false}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField id="handle" name="handle" type="text" label="Handle" className={classes.textField}
                                value={this.state.handle}
                                helperText={errors.handle}
                                error={errors.handle ? true : false}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            {errors.general && (
                                <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                            )}

                            <Button type="submit"
                                color="primary"
                                variant="contained"
                                className={classes.button}
                                disabled={loading}
                            >
                                Signup
                                {loading && (
                                    <CircularProgress className={classes.progress}></CircularProgress>
                                )}
                            </Button>
                            <br />
                            <small className={classes.small}>Already have an account? Please Login <Link to="/login">here</Link></small>
                        </form>
                    </Grid>
                    <Grid item sm />


                </Grid>
            </div>
        )
    }

}


const mapStateToProps = (state) => (
    {
        user: state.user,
        UI: state.UI,
    }
)


export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup)); 
