import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3001/accounts/signup', {
            formProps
        });

        dispatch({ type: AUTH_USER, payload: response.data });
        localStorage.setItem('data', response.data);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'User already exists. Please login instead.' })
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3001/accounts/login', {
            formProps
        });

        dispatch({ type: AUTH_USER, payload: response.data });
        localStorage.setItem('data', response.data);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid credentials. Please try again!' })
    }
};

export const signout = () => {
    localStorage.removeItem('data');

    return {
        type: AUTH_USER,
        payload: ''
    }
}