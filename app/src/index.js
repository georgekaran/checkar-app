import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker';

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import AuthOrApp from './main/AuthOrApp';
import reducers from './main/reducers'

import { SnackbarProvider } from 'notistack';
import { ConfirmDialogProvider } from './components/common/ConfirmDialog/index'

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const devToools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(promise, multi, thunk)(createStore)(reducers, devToools)

const notistackRef = React.createRef();
const onClickDismiss = key => () => { 
    notistackRef.current.closeSnackbar(key);
}

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider 
            ref={notistackRef}
            maxSnack={3} 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
            action={(key) => (<IconButton onClick={onClickDismiss(key)}><CloseIcon /></IconButton>)}>
            <ConfirmDialogProvider>
                <AuthOrApp />
            </ConfirmDialogProvider>
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();