import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
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
        this.props.signin(formProps, () => {
            this.props.history.push('/feature');
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="ui piled segment" style={{ margin: "15px" }}>
            <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error" style={{ marginLeft:"20px", marginRight: "20px"}}>
                {/* <fieldset>
                    <label>Email : </label>
                    <Field 
                        name="email"
                        type="text"
                        component="input"
                        autoComplete="off"
                    />
                </fieldset> */}
                <Field name="email" component={this.renderInput} label="Email : " type="text" />
                <Field name="password" component={this.renderInput} type="password" label="Password : " />

                {/* <fieldset>
                    <label>Password : </label>
                    <Field 
                        name="password"
                        type="password"
                        component="input"
                        autoComplete="off"
                    />
                </fieldset> */}
                <div className="ui error message">{this.props.errorMessage}</div>
                <button className="ui primary button" action="submit">Sign In</button>
            </form>
            </div>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.email) {
        errors.email = 'Invalid email. Please try again!!';
    }

    if (!formValues.password) {
        errors.password = 'Invalid password. Please try again!!';
    }

    return errors;
}


function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signin', validate })
)(Signin);