import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import reduxReset from 'redux-reset'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'

//import { reducers } from '../reducers/index'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const appReducer = combineReducers({
    
})

const enHanceCreateStore = compose(
    reduxReset(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore, applyMiddleware(createSagaMiddleware));

const persistedReducer = persistReducer(persistConfig, appReducer);
export const store = enHanceCreateStore(persistedReducer);
export const persistor = persistStore(store);