import React from 'react';
import message from './resources/messages/messages-pt'

export default (WrappedComponent) => {
    return (props) => {
        return (
            <WrappedComponent { ...props } message={message} />
        )
    }
};