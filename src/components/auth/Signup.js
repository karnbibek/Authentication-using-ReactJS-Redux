import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';


const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined;

const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

class Signup extends Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta, type }) => {
        const className = `required field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" className="ui input focus" type={type} />
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = formProps => {
        this.props.signup(formProps, () => {
            this.props.history.push('/feature');
        });
    }

    render() {
        const { handleSubmit } = this.props;
        
        return (
            <div className="ui piled segment" style={{ margin: "15px" }}>
            <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error" style={{ marginLeft:"20px", marginRight: "20px"}}>
                {/* <fieldset>
                    <label>Name : </label>
                    <Field 
                        name="name"
                        type="text"
                        component="input"
                        autoComplete="off"
                    />
                </fieldset> */}
                <Field name="name" component={this.renderInput} label="Enter name : " type="text" />

                {/* <fieldset>
                    <label>Email : </label>
                    <Field 
                        name="email"
                        type="text"
                        component="input"
                        autoComplete="off"
                    />
                </fieldset> */}
                <Field name="email" type="email" component={this.renderInput} validate={email} label="Enter Email : " />

                {/* <fieldset>
                    <label>Address : </label>
                    <Field 
                        name="address"
                        type="text"
                        component="input"
                        autoComplete="off"
                    />
                </fieldset> */}
                <Field name="address" component={this.renderInput} label="Enter Address : " type="text" />

                {/* <fieldset>
                    <label>Phone : </label>
                    <Field 
                        name="phoneNumber"
                        type="number"
                        component="input"
                        autoComplete="off"
                    />
                </fieldset> */}
                <Field name="phoneNumber" component={this.renderInput} validate={number} label="Enter Phone Number : " type="number" />

                {/* <fieldset>
                    <label>Password : </label>
                    <Field 
                        name="password"
                        type="password"
                        component="input"
                        autoComplete="off"
                    />
                </fieldset> */}
                <Field name="password" component={this.renderInput} label="Enter Password : " type="password" />

                <div className="ui error message">{this.props.errorMessage}</div>
                <button className="ui primary button" action="submit">Signup</button>
            </form>
            </div>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.name) {
        errors.name = 'Name is mandatory.';
    }

    if (!formValues.email) {
        errors.email = 'Email is mandatory';
    }

    if (!formValues.address) {
        errors.address = 'You must enter a address';
    }

    if (!formValues.phoneNumber || formValues.phoneNumber.length !== 10) {
        errors.phoneNumber = 'You must enter a valid 10 digit mobile number.';
    }

    if (!formValues.password || formValues.password.length < 8) {
        errors.password = 'You must enter a password of at least 8 characters.';
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup', validate })
)(Signup);