import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducers from ".";

export default function configureStore() {
    return createStore(reducers, applyMiddleware(thunk));
}