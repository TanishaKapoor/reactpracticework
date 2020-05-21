import {INITIALIZE_PRODUCTS} from "../actions";

function products(state=[],action){
    let products;
    switch(action.type){
        case INITIALIZE_PRODUCTS:
            products= action.payload;
            return products;
        default:
            return state;
    }
}

export default products;