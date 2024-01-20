////////////////// Import dependencies //////////////////
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import teamReducer from "./slices/team.slice";
import bugReducer from "./slices/bug.slice";
import updateReducer from "./slices/update.slice";

import rootSaga from "./sagas/root.saga";
////////////////////////////////////////////////////////

////////////////// Configurations //////////////////
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    team: teamReducer,
    bug: bugReducer,
    update: updateReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
///////////////////////////////////////////////////