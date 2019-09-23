import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FacebookProvider, LoginButton } from 'react-facebook';
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



    handleResponse = (response) => {
        
            localStorage.setItem('FB_access_token', response.tokenDetail.accessToken);
            localStorage.setItem('FB_user_mail',response.profile.email);
            localStorage.setItem('FB_user_picture',response.profile.picture.data.url);
            localStorage.setItem('FB_user_name',response.profile.name);
            localStorage.setItem('FB_user_id',response.profile.id);
            this.setState({ message: response.name+' authenticated' });
            this.props.history.push('/home')
       
        
    }

    handleError=(response)=>{
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
                                <input id="username" type="text" className="validate" name="uname" value={uname} onChange={this.onChange}  />
                                <label for="username">Username</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <input id="password" type="password" className="validate" name="pword" value={pword} onChange={this.onChange} />
                                <label for="password">Password</label>
                            </div>
                        </div>

                        <div className="row">
                                <button className="btn col s12" type="submit">Login with jwtToken</button>
                        </div>
                        <div className="row">
                            <FacebookProvider appId="707046989723406">
                                <LoginButton
                                scope="email,user_photos"
                                onCompleted={this.handleResponse}
                                onError={this.handleError}
                                className="btn col s12 facebook"
                                >
                                    <div className='row'>
                                        {/* <img src="https://img.icons8.com/material/24/000000/facebook-f.png" id='f-icon'></img> */}
                                        <span id='fb-text'>Login with Facebook</span>
                                    </div>
                                
                                </LoginButton>
                            </FacebookProvider>
                            
                        </div>
                        <div className="row">
                                <div className="input-field">
                                    <Link to='/register' className="btn  col s6">Register</Link>
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