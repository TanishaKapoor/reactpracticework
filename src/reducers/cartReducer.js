import {ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, DECREMENT_QUANTITY, PLACE_ORDER} from "../actions";

function cartProducts(state=[],action){
    let cartProducts;
    switch(action.type){
        case ADD_PRODUCT_TO_CART:
            // const data= state.find(product=>product.id === action.payload.id);
            // if(data){
            //     data.quantity++;
            //     cartProducts=state;
            // }
            // else{
            //      cartProducts= [...state,action.payload];
            // }
            // debugger;
            // return cartProducts;
            const data = state.find(product=>product.id === action.payload.id);
            if(data){
                cartProducts= Object.assign([], state.map(item => {
                    if(item.id === action.payload.id){
                      item.quantity ++;
                    }
                    return item;
                }));
            }
            else{
                cartProducts= [...state,action.payload];
            }
            return cartProducts;
        case REMOVE_PRODUCT_FROM_CART:
            const productsAfterRemoval= state.filter(product=>product.id !== action.payload.id);
            return productsAfterRemoval;
        case DECREMENT_QUANTITY:
            const datatoDecrement = state.find(product=>product.id === action.payload.id);
            if(datatoDecrement.quantity===1){
                cartProducts = state.filter(product=>product.id !== action.payload.id);
            }
            else{
                cartProducts= Object.assign([], state.map(item => {
                    if(item.id === action.payload.id){
                      item.quantity --;
                    }
                    return item;
                }));
            }
            return cartProducts;
        case PLACE_ORDER:
            cartProducts=[];
            return cartProducts;
        default:
            return state;
    }
}

export default cartProducts;