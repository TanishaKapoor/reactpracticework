import React from "react";
import { Component } from "react";
import MyContext from "../ContextAPI/MyContext";
import {Button, Form} from "react-bootstrap";
import "../styles/Login.css";

class Login extends Component{
    state={
        name:"",
        password:""
    }

    handleFormChange= (event)=>{
        let{name,value}= event.target;
        this.setState({
            [name]:value
        })
    }
    reset=()=>{
        this.setState({
            name:"",
            password:""
        })
    }

    verifyUser=()=>{
        const credentials={
            name:this.state.name,
            password:this.state.password
        };
        return credentials;
    }

    render(){
        return(
            <MyContext.Consumer>
                {context=>(
                    <>
                        <h1>LOGIN</h1>
                         <Form className="form-align">
                                <Form.Control className="margin-position"
                                        type="text"
                                        name="name"
                                        placeholder="Enter User name"
                                        value={this.state.name}
                                        onChange={this.handleFormChange}
                                    />
                                <Form.Control className="margin-position"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.handleFormChange}
                                />
                                <div className="col-md-12">
                                <span className="col-md-6">
                                    <Button variant="outline-success"  disabled={!this.state.name || !this.state.password} onClick={()=>{context.verifyCredentials(this.verifyUser())}}>LOGIN</Button>
                                </span>
                                <span className="col-md-6">
                                    <Button variant="outline-danger" disabled={!this.state.name && !this.state.password}  onClick={()=>{this.reset()}}>RESET</Button>
                                </span>
                                </div>
                           
                         </Form>
                    </>
                )}
            </MyContext.Consumer>
            

        )
    };
}

export default Login;