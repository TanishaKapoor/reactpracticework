import React from "react";
import "../styles/ProductDetail.css";
import { bindActionCreators } from "redux";
import {addProductToCart} from "../actions";
import { connect } from "react-redux";
import MyContext from "../ContextAPI/MyContext";
import { withRouter } from "react-router-dom";
import {Card,Button} from "react-bootstrap";
import wrongRoute from "../images/wrongRoute.jpg";

function ProductDetail (props){
    let {productDetail} = props.location;
    function checkUser(loggedIn,product){
        if(loggedIn){
            props.addProductToCart(product);
            window.alert('Product added');
            props.history.push('/cart_detail');
        }
        else{
            window.alert('Oopsie..!! Login Required...!!!');
            props.history.push('/login')
        }
    }
    function goBack(){
        props.history.push('/')
    }
 
    return(
        <MyContext.Consumer>
            {context=>(
                <>
                    <div className="align-goback">
                        <Button variant="outline-danger" onClick={()=>goBack()}> Go Back </Button>
                    </div>
                    <h1 style={{marginBottom:'60px'}}>MOBILE DETAIL</h1>
                    {productDetail?
                    <div style={{display:'flex'}}>
                    <div className="border-change col-md-6"> 
                         <img className="img-logo" alt="hello" src={require(`../images/${productDetail.img}`)}/>
                    </div>
                  <Card style={{ width: '18rem', display:'inline-block' }} key={productDetail.id}>
                  <Card.Body>
                      <Card.Title>{productDetail.deviceName.toUpperCase()}</Card.Title>
                      <Card.Text className="text-align">
                                  <span className="heading-text">Device Camera :</span>
                                  <span>{productDetail.camera}</span>
                      </Card.Text>
                      <Card.Text className="text-align">
                                  <span className="heading-text">Device RAM:</span>
                                  <span>{productDetail.RAM}</span>  
                      </Card.Text>
                      <Card.Text className="text-align">
                                  <span className="heading-text">Device OS:</span>
                                  <span>{productDetail.OS}</span>  
                      </Card.Text>
                      <Card.Text className="text-align">
                                  <span className="heading-text">Colors:</span>
                                  <span>{productDetail.colors}</span>  
                      </Card.Text>
                      <Card.Text className="text-align">
                                  <span className="heading-text">Device Storage:</span>
                                  <span>{productDetail.storage}</span>  
                      </Card.Text>
                      <Card.Text className="text-align">
                                  <span className="heading-text">Device Processor:</span>
                                  <span>{productDetail.processor}</span>  
                      </Card.Text>
                      <Card.Text className="text-align">
                                  <span className="heading-text">Screen Size:</span>
                                  <span>{productDetail.screenSize}</span>  
                      </Card.Text>
                      <Card.Text className="text-align">
                                  <span className="heading-text">Price</span>
                                  <span> $ {productDetail.price}</span>  
                      </Card.Text>
                      <Button variant="primary" onClick={()=>checkUser(context.state.isloggedIn,productDetail)}>Add To Cart</Button>
                  </Card.Body>
                  </Card>
                  </div>:
                  <div>
                      
                      <div style={{fontWeight:'bolder',marginBottom:'20px', color:'red'}}>Please Navigate to Home</div>
                      <img className="img-logo" alt="wrong way" src={wrongRoute}/>
                  </div>
                }
                </>
            )}
        </MyContext.Consumer>
  
    )
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addProductToCart}, dispatch);
}
export default withRouter(connect(null,mapDispatchToProps)(ProductDetail));
