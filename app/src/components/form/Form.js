import React from 'react';
import { FormContext } from 'react-hook-form';
import PropTypes from "prop-types";

const Form =  ({ children, onSubmit, methods }) => {
    return (<FormContext { ...methods } >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            {children}
        </form>
    </FormContext>);
};

Form.propTypes = {
    onSubmit: PropTypes.func,
    methods: PropTypes.object,
};

export default Form;