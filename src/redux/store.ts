import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import logger from 'redux-logger';
import localforage from 'localforage';
import rootReducer from './reducers/rootReducer';
import { parse, stringify } from 'flatted';

// this will allow a much agile store in the localstorage so the application won't collapse
export const transformCircular = createTransform(
    (inboundState, key) => stringify(inboundState),
    (outboundState, key) => parse(outboundState),
)
const persistConfig = {
    key: 'root',
    storage: localforage,
    transforms: [transformCircular]
};

const composeEnhancers = compose;
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeEnhancers(
    // uncomment to get store log, it may colapse your browser
    // applyMiddleware(logger)
));
export const persistor = persistStore(store)
