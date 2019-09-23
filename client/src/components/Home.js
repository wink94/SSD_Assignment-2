import React, { Component } from 'react';
import './style/Home.css';
import { FacebookProvider, Initialize  } from 'react-facebook';
import Image_Card from './Image_Card';
import axios from 'axios';

class Home extends Component{

    constructor(){
        super();
        this.state={
            uname:window.localStorage.getItem('FB_user_name'),
            email:window.localStorage.getItem('FB_user_mail'),
            access_token:window.localStorage.getItem('FB_access_token'),
            picture:window.localStorage.getItem('FB_user_picture'),
            id:window.localStorage.getItem('FB_user_id'),
            albums:[]

        }
    }

    componentDidMount(){

        
        let url='https://graph.facebook.com/'+this.state.id+'?fields=albums{photos{images,id}}&access_token='+this.state.access_token;
        axios({
            method:'get',
            url:url
        })
        .then(response=>{
            console.log(response)
            let arr=response.data.albums.data
            let img=[];
            arr.forEach(element => {
                if(element.photos.data.length!==1){
                    let innerArray=element.photos.data
                    innerArray.forEach(inElement=>{
                        let temp={
                            id:inElement.id,
                            image:inElement.images[0].source
                        };
                        console.log(inElement)
                        img.push(temp);
                        // console.log(img)
                    });
                }
                this.setState({
                    albums:img
                })
            });
            
            
        })
        .catch(response=>{
            console.log(response);
        })
                 
       
    }

    extractFBImages=(arr)=>{
        let img={}
        arr.forEach(element => {
            if(element.photos.data){
                let innerArray=element.photos.data
                innerArray.forEach(inElement=>{
                    let temp={
                        id:inElement.id,
                        image:inElement.images[7].source
                    };
                    img.push(temp);
                });
            }
        });
        return img;
    }

    render(){
        return(
            <div className="container ">
                <div className="row home-head">
                    <div className="imagebox col s6">
                        <img src={this.state.picture} className="z-depth-4" width="100px"/>
                    </div>
                    <div className="col s6">
                        <h3>{this.state.uname}</h3>
                    </div>
                
                </div>

                <div className="row">
                    
                    {this.state.albums.map(function(element){
                        return <div className="col s6"> <Image_Card image={element.image} /> </div>
                    })}
                    
                </div>  
        
            </div>
        )
    }
}

export default Home;