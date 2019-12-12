import React from 'react'
import TextField from "@material-ui/core/TextField";
import { RHFInput } from "react-hook-form-input";
import { makeStyles } from '@material-ui/core/styles';
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));

const Input = ({
                   name,
                   label,
                   ...props
               }) => {
    const classes = useStyles();
    const { errors, register, setValue } = useFormContext();
    return (
        <>
            <RHFInput as={<TextField
                fullWidth
                label={label}
                className={classes.textField}
                name={name}
                error={errors && !!errors[name]}
                helperText={errors && !!errors[name] && errors[name].message}
                {...props} />}
                      name={name}
                      register={register}
                      setValue={setValue}/>
        </>
    )
};

Input.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string
};

export default Input;