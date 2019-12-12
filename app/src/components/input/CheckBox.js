import React from 'react'
import Checkbox from "@material-ui/core/Checkbox";
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

const CheckboxHook = ({
                   name,
                   label,
                   value,
                   ...props
               }) => {
    const classes = useStyles();
    const { errors, register, setValue } = useFormContext();
    return (
        <>
            <RHFInput as={<Checkbox
                fullWidth
                type="checkbox"
                label={label}
                className={classes.textField}
                name={name}
                value={value}
                error={errors && !!errors[name]}
                helperText={errors && !!errors[name] && errors[name].message}
                {...props} />}
                      name={name}
                      register={register}
                      setValue={setValue}/>
        </>
    )
};

CheckboxHook.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string
};

export default CheckboxHook;