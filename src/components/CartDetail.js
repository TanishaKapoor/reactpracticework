import React from "react";
import { Component } from "react";
import {Table,Button} from "react-bootstrap";
import {connect} from "react-redux";
import cart_empty from "../images/cart_empty.png";
import order_placed from "../images/order_placed.jpg";
import {bindActionCreators} from "redux";
import {addProductToCart,removeProductFromCart,decrementProduct,placeOrder} from "../actions";
import "../styles/CartDetail.css";
import Modal from "react-awesome-modal";
import { withRouter } from "react-router-dom";

class CartDetail extends Component{

    state={
        isVisible:false
    }

    totalPrice(){
        const amount= this.props.cartProducts.reduce(function(prev,current){
            return prev+(current.quantity*current.price);
        },0);
        return amount;
    }
    placeOrder(res,fun){
        if(res){
            this.props.placeOrder();
        }
        fun();
    }
    windowAlertMessage=()=>{
        this.setState({isVisible:true})
    }
    closeModal(){
        this.setState({isVisible:false});
        this.props.history.push('/');
    }

    render(){
        return(
            <>
            {this.props.cartProducts.length>0?
            (<div>
            <div className="cart-heading">CART DETAILS</div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Device Image</th>
                        <th>Device Name</th>
                        <th>Model Number</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cartProducts.map(cart => {
                        return (
                        <tr key={cart.id}>
                        <td>
                            <img className="image-size" alt="device" src={require(`../images/${cart.img}`)}/>
                        </td>
                        <td>{cart.deviceName.toUpperCase()}</td>
                        <td>{cart.camera}</td>
                        <td>
                            {cart.quantity}
                            <Button className="button-position" variant="outline-primary link" onClick={()=>{this.props.addProductToCart(cart)}}>+</Button>
                            <Button className="button-position" variant="outline-primary link" onClick={()=>{this.props.decrementProduct(cart)}}>-</Button>
                        </td>
                        <td> $ {cart.price * cart.quantity}</td>
                        <td>
                            <Button variant="danger" onClick={()=>{this.props.removeProductFromCart(cart)}}>Remove</Button>
                        </td>
                        </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div className="position">
                <span>Total Price:</span>
                <span> $ {this.totalPrice()}</span>
            </div>
            <div className="position">
                <Button variant="success" onClick={()=>this.placeOrder(true,this.windowAlertMessage)}>PLACE ORDER</Button>
            </div>
            </div>):
            (
                <>
                <Modal visible={this.state.isVisible} width="400" height="400" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <div>
                            <div style={{color:'red', fontWeight:'bolder',marginTop:'40px'}}>
                                ORDER PLACED FOR ORDER ID<br></br>
                                <div>{Math.floor(Math.random() * 100) + 1}</div>
                            </div>
                            <div>
                                <img alt="cart empty" src={order_placed}></img>
                            </div>
                        </div>
                        <Button variant="outline-danger" onClick={() => this.closeModal()}>Close</Button>
                    </div>
                </Modal>
            <div style={this.state.isVisible?{display:'none'}:{display:'inline'}}>
               <div style={{color:'red', fontWeight:'bolder'}}>GO SHOP...!!!</div>
                <img alt="cart empty" src={cart_empty}></img>
            </div>
            </>
            )
             
            }
          
            </>
            
        )
    }

}

function mapStateToProps(state){
    return{
        cartProducts:state.cartProducts
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addProductToCart, removeProductFromCart,decrementProduct,placeOrder }, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CartDetail));