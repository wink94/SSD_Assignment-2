import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import './style/Login.css'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            uname: '',
            pword: '',
            message: ''
        };
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { uname, pword } = this.state;

        axios.post('http://localhost:8081/auth/login', { uname, pword })
            .then((result) => {
                localStorage.setItem('jwtToken', result.data.token);
                this.setState({ message: '' });
                this.props.history.push('/home')
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.setState({ message: 'Login failed. Username or password not match' });
                }
            });
    }

    // fbLogin(){
        
    //     window.fbAsyncInit = function() {
    //         FB.init({
    //         appId      : '707046989723406',
    //         cookie     : true,
    //         xfbml      : true,
    //         version    : '{api-version}'
    //         });
            
    //         FB.AppEvents.logPageView();   
            
    //     };

    //     (function(d, s, id){
    //         var js, fjs = d.getElementsByTagName(s)[0];
    //         if (d.getElementById(id)) {return;}
    //         js = d.createElement(s); js.id = id;
    //         js.src = "https://connect.facebook.net/en_US/sdk.js";
    //         fjs.parentNode.insertBefore(js, fjs);
    //     }(document, 'script', 'facebook-jssdk'));

    // }

    responseFacebook = (response) => {
        // response.preventDefault();
        if(response){
            localStorage.setItem('FB_access_token', response.accessToken);
            localStorage.setItem('FB_user_mail',response.email);
            localStorage.setItem('FB_user_picture',response.picture.data.url);
            localStorage.setItem('FB_user_name',response.name);
            this.setState({ message: response.name+' authenticated' });
            this.props.history.push('/home')
        }
        else{

        }
        console.log(response);
    }
  

    render() {
        const { uname, pword, message } = this.state;

        return (
            <div className="row loginrow">
                <div className="col s4"></div>
                <form class="form-signin" onSubmit={this.onSubmit}>
                    {message !== '' &&
                        <div class="alert alert-warning alert-dismissible" role="alert">
                            {message}
                        </div>
                    }
                    <div className="col s4">
                        <div className="row">
                            <div className="input-field">
                                <input id="username" type="text" className="validate" name="uname" value={uname} onChange={this.onChange} required />
                                <label for="username">Username</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <input id="password" type="password" className="validate" name="pword" value={pword} onChange={this.onChange} required/>
                                <label for="password">Password</label>
                            </div>
                        </div>

                        <div className="row">
                                <button className="btn col s12" type="submit">Login</button>
                        </div>
                        <div className="row">
                        <FacebookLogin
                            appId="707046989723406" 
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            scope="public_profile,email,user_photos"
                            icon="fa-facebook"
                            />
                        </div>
                        <div className="row">
                                <div className="input-field">
                                    <Link to='/register' class="btn">Register</Link>
                                </div>
                        </div>
                    </div>
                </form>
                <div className="col s4"></div>
            </div>
        )
    }
}

export default Login;