import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {initializeProducts} from "../actions";
import rootReducer from '../reducers/rootReducer';

const store = createStore(rootReducer,applyMiddleware(thunk));

store.dispatch(initializeProducts());

export default store;