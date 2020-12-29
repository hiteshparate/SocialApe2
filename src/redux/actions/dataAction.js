import Axios from 'axios';
import {
    SET_SCREAMS,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    CLEAR_ERRORS,
    POST_SCREAM,
    LOADING_UI,
    SET_ERRORS,
    SET_SCREAM,
    STOP_LOADING_UI
} from '../types';

//get All screams
export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    Axios.get('/screams').then((res) => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: SET_SCREAMS,
            payload: []
        })
    })

}

export const getScream = (screamId) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    Axios.get(`/scream/${screamId}`).then(res => {
        dispatch({
            type: SET_SCREAM,
            payload: res.data,
        });
        dispatch({ type: STOP_LOADING_UI });
    }).catch(err => console.log(err));
}

//Like A Scrream
export const likeScream = (screamId) => (dispatch) => {
    Axios.get(`/scream/${screamId}/like`).then(res => {
        dispatch({
            type: LIKE_SCREAM,
            payload: res.data
        })
    }).catch(err => console.log(err));
}


//Unlike a Scream
export const unlikeScream = (screamId) => (dispatch) => {
    Axios.get(`/scream/${screamId}/unlike`).then(res => {
        dispatch({
            type: UNLIKE_SCREAM,
            payload: res.data
        })
    }).catch(err => console.log(err));
}

export const deleteScream = (screamId) => (dispatch) => {
    Axios.delete(`/scream/${screamId}`).then(() => {
        dispatch({ type: DELETE_SCREAM, payload: screamId })
    }).catch(err => {
        console.log(err);
    })
}

export const postScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    Axios.post(`/scream`, newScream).then((res) => {
        dispatch({
            type: POST_SCREAM,
            payload: res.data,
        });
        dispatch(clearErrors());
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    })
}

export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}
