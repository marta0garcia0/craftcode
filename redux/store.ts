import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import rootReducer from './reducers/rootReducer';
const persistConfig = {
    key: 'root',
    storage,
}
const composeEnhancers = compose;
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeEnhancers(
    applyMiddleware(logger))
);
export const persistor = persistStore(store)
