import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/Image_Card.css'

class Image_Card extends Component{


    constructor(props){
        super(props);
       
    }

    render(){
        return(
        <div className="card">
            <div className="card-image">
                <img src={this.props.image} />
            </div>
            <div className="card-content">
                <p>{this.props.content}</p>
            </div>
            {/* <div className="card-action">
                <a href="#">This is a link</a>
            </div> */}
        </div>
        )
    }
}

export default Image_Card;