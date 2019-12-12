import React from 'react'
import {RHFInput} from "react-hook-form-input";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { useFormContext } from "react-hook-form";
import {makeStyles} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
    select: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    formControl: {
        marginTop: theme.spacing(1),
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SelectHook = ({ children, name, label, defaultValue = undefined }) => {
    const classes = useStyles();
    const { errors, register, setValue } = useFormContext();
    return (
        <>
            <FormControl className={classes.formControl} error={errors && !!errors[name]}>
                <InputLabel id={`input-label-${name}`}
                            fullWidth
                            className={classes.select}
                            error={errors && !!errors[name]}>
                    {label}
                </InputLabel>
                <RHFInput
                    as={
                        <Select fullWidth
                                labelId={`input-label-${name}`}
                                className={classes.select}>
                            {children}
                        </Select>
                    }
                    name={name}
                    register={register}
                    setValue={setValue}
                    defaultValue={defaultValue}
                />
                <FormHelperText className={classes.select}>{errors && !!errors[name] && errors[name].message}</FormHelperText>
            </FormControl>
        </>
    )
};

export default SelectHook;