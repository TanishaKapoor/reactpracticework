import axios from "axios";

export const INITIALIZE_PRODUCTS="INITIALIZE_PRODUCTS";
export const ADD_PRODUCT_TO_CART ="ADD_PRODUCT_TO_CART";
export const REMOVE_PRODUCT_FROM_CART ="REMOVE_PRODUCT_FROM_CART";
export const DECREMENT_QUANTITY ="DECREMENT_QUANTITY";
export const PLACE_ORDER ="PLACE_ORDER";


export function initialiseProductList(response){
    const action={
        type:INITIALIZE_PRODUCTS,
        payload:response
    };

    return action;  
}

export function addProductToCart(product){
    const productNew = {...product,quantity:1};
    const action={
        type: ADD_PRODUCT_TO_CART,
        payload:productNew
    };
    return action;
}

export function decrementProduct(product){
    const action ={
        type: DECREMENT_QUANTITY,
        payload:product
    }
    return action;
}
export function placeOrder(){
    const action={
        type:PLACE_ORDER
    };
    return action;
}
export function removeProductFromCart(product){
    const action ={
        type: REMOVE_PRODUCT_FROM_CART,
        payload:product
    };

    return action;
}

export function initializeProducts(){

    return (dispatch,getState)=>{
        axios("http://localhost:3001/products").then((response)=>{
            dispatch(initialiseProductList(response.data));
        })
    }

}