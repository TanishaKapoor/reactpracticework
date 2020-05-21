import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import { Route, Switch, withRouter } from "react-router-dom";
import CartDetail from './components/CartDetail';
import Login from './components/Login';
import MyProvider from './ContextAPI/MyProvider';
import {Nav,Navbar,NavDropdown,Button} from "react-bootstrap";
import MyContext from './ContextAPI/MyContext';

function App(props) {
  function loginPage(){
    props.history.push('/login')
  }
  function productHomePage(){
    props.history.push('/')
  }
  function cartPage(){
    props.history.push('/cart_detail')
  }
  return (
    <MyProvider>
    <MyContext.Consumer>
      {context=>(
    <div>
    {/* <div className="header">
      <div className="col-md-6">
        Mob Online
      </div>
      <div>
        <Link to={{pathname:'/'}}>Products</Link>
      </div>
      <div>
        <Link to={{pathname:'/cart_detail'}}>See CartDetail</Link>
      </div>
      <div className="col-md-6">
        <Link to={{pathname:'/login'}}>Login Trying</Link>
      </div>
    </div> */}
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand>MOBILE APP</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
       <Button variant="outline-primary" className="margin-adjust" onClick={()=>productHomePage()}>
         {/* <Link className="font-change"  to={{pathname:'/'}}>PRODUCTS LIST</Link> */}
         HOME
         </Button>
       {
       (context.state.isloggedIn)?<></>:
       <Button variant="outline-primary" className="margin-adjust" onClick={()=>loginPage()}>LOGIN
           {/* <Link className="font-change" to={{pathname:'/login'}}> LOGIN</Link> */}
      </Button>
       }
       {
       (context.state.isloggedIn)?
        <Button variant="outline-primary" className="margin-adjust" onClick={()=>cartPage()}>CART
            {/* <Link className="font-change" to={{pathname:'/login'}}> LOGIN</Link> */}
        </Button>:<></>
      }
        
        {context.state.isloggedIn?
        <NavDropdown className="dropdown-align" title={context.state.name.toUpperCase()} id="collasible-nav-dropdown">
          <NavDropdown.Item onClick={()=>context.logoutUser()}>LOGOUT</NavDropdown.Item>
        </NavDropdown>:""
        }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    
    <div className="App">
      <Switch>
        <Route exact path='/' component={ProductList}/>
        <Route path='/product_detail' component={ProductDetail}/>
        <Route path='/cart_detail' component={CartDetail}/>
        <Route path='/login' component={Login}/>
    </Switch>
  </div>
  </div>
  )}
  </MyContext.Consumer>
  </MyProvider>
  );
}

export default withRouter(App);
