import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useFormContext } from "react-hook-form"

export default (props) => {
    const { register } = useFormContext();
    return (
        <TextField { ...props } inputRef={register} />
    )
}