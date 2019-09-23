import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    }
    render() {
        return (
            <div>
                <nav>
                    <div className="blue darken-3">
                        <a className="brand-logo center">SSD-Assignment</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                        </ul>
                        
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;