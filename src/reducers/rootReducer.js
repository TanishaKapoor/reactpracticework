import {combineReducers} from "redux";

import products from './productsReducer';
import cartProducts from './cartReducer';

const rootReducer = combineReducers({
    products,
    cartProducts
}
);

export default rootReducer;