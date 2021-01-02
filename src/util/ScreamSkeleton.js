import { Card, CardContent, CardMedia, withStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React from 'react'
import { Fragment } from 'react';
import noImage from '../images/noUser.png'
const styles = (theme) => ({

    card: {
        display: 'flex',
        marginBottom: 20,
    },
    cardContetnt: {
        width: '100%',
        flexDirection: 'column',
        padding: 25,
    },
    cover: {
        minWidth: '200',
        objectFit: 'cover'
    },
    handle: {
        width: 60,
        height: 20,
        backgroundColor: grey,
        marginBottom: 7,
    }

})

const ScreamSkeleton = (props) => {
    const { classes } = props;

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={noImage}></CardMedia>
            <CardContent className={classes.CardContent}>
                <div className={classes.handle} />
                <div className={classes.date} />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <div className={classes.halfLine} />
            </CardContent>
        </Card>
    ));

    return <Fragment>{content}</Fragment>
}
export default withStyles((styles)(ScreamSkeleton));
