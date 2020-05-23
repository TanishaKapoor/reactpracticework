import React from "react";
import { Component } from "react";
import MyContext from "./MyContext";
import {withRouter } from "react-router-dom";

class MyProvider extends Component{
    state={
        name:"admin",
        password:"admin",
        isloggedIn:false
    };
    render(){
        return(
            <MyContext.Provider
                value={{
                    state:this.state,
                    verifyCredentials:(user)=>{
                        if(this.state.name ===user.name && this.state.password===user.password){
                            this.setState({
                                isloggedIn:true
                            });
                            this.props.history.push('/');
                        }
                        else{
                            window.alert("Wrong Credentials...Login again...!!!")
                            this.props.history.push('/login');
                        }
                    },
                    logoutUser:()=>{
                        this.setState({
                            isloggedIn:false
                        })
                        this.props.history.push('/');           
                    }
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export default withRouter(MyProvider);