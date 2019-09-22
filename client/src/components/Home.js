import React, { Component } from 'react';
import './style/Home.css';

class Home extends Component{

    constructor(){
        super();
        this.state={
            uname:window.localStorage.getItem('FB_user_name'),
            email:window.localStorage.getItem('FB_user_mail'),
            access_token:window.localStorage.getItem('FB_access_token'),
            picture:window.localStorage.getItem('FB_user_picture')

        }
    }
    render(){
        return(
            <div className="container">
             <div className="imagebox ">
                 <img src={this.state.picture} className="z-depth-4" width="100px"/>
             </div>
            </div>
        )
    }
}

export default Home;