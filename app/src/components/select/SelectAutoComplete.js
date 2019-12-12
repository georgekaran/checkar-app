import React from 'react';
import Select from "react-select";
import {makeStyles, useTheme} from "@material-ui/core";
import { emphasize } from "@material-ui/core/styles";

import {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
} from '../common/Autocomplete';

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: 250,
        minWidth: 290,
    },
    input: {
        display: 'flex',
        padding: 0,
        height: 'auto',
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: theme.spacing(1),
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        bottom: 6,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
    },
    radioGroup: {
        flexDirection: 'row'
    },
    select: {
        margin: theme.spacing(1),
    }
}));

const SelectAutoComplete = ({ options, onChange, value, label, placeholder }) => {
    const classes = useStyles();
    const theme = useTheme();

    const selectStyles = {
        input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
                font: 'inherit',
            },
        }),
    };

    return (
        <Select
            className={classes.select}
            classes={classes}
            styles={selectStyles}
            inputId="react-select-single"
            TextFieldProps={{
                label,
                InputLabelProps: {
                    htmlFor: 'react-select-single',
                    shrink: true,
                },
            }}
            placeholder={placeholder}
            options={options}
            components={components}
            value={value}
            onChange={onChange}
        />
    );
};

export default SelectAutoComplete;