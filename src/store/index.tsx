
import { composeWithDevTools } from "redux-devtools-extension";

import { applyMiddleware, createStore, combineReducers } from "redux";
import createSagaMiddleware from "@redux-saga/core";

import dataReducer from "./dataReducer";
import rootWatcher from "../saga";
import deliveryReducer from './deliveryReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    items: dataReducer,
    delivery: deliveryReducer
}) 

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

