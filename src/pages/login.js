import { Button, CircularProgress, Grid, TextField, Typography, withStyles } from '@material-ui/core'
import React, { Component } from 'react';
import AppIcon from '../images/logo192.png';
import { Link } from 'react-router-dom';
import { loginUser } from '../redux/actions/userAction';
import { connect } from 'react-redux';

const styles = (theme) => ({
    ...theme.customForm
});



class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(userData, this.props.history);

        // Axios.post('/login', userData)
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
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;

        return (
            <div>
                <Grid container className={classes.form}>
                    <Grid item sm />
                    <Grid item sm >
                        <img src={AppIcon} alt="app icon" className={classes.icon}></img>
                        <Typography variant="h3">Login</Typography>
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
                            {errors.general && (
                                <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                            )}
                            <Button type="submit"
                                color="primary"
                                variant="contained"
                                className={classes.button}
                                disabled={loading}
                            >
                                Login
                                {loading && (
                                    <CircularProgress className={classes.progress}></CircularProgress>
                                )}
                            </Button>
                            <br />
                            <small className={classes.small}>Don't have an account? Please sign up <Link to="/signup">here</Link></small>
                        </form>
                    </Grid>
                    <Grid item sm />


                </Grid>
            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionToProps = {
    loginUser
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(login));
