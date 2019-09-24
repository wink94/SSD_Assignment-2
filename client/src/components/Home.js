import React, { Component } from 'react';
import './style/Home.css';
import { FacebookProvider, Initialize  } from 'react-facebook';
import Image_Card from './Image_Card';
import axios from 'axios';

class Home extends Component{

    constructor(){
        super();
        /* set state of user parameters */
        this.state={
            uname:window.localStorage.getItem('FB_user_name'),
            email:window.localStorage.getItem('FB_user_mail'),
            access_token:window.localStorage.getItem('FB_access_token'),
            picture:window.localStorage.getItem('FB_user_picture'),
            id:window.localStorage.getItem('FB_user_id'),
            albums:[]

        }
    }

    /* sending a request to graph api at the stage of compenent mounting to DOM */
    componentDidMount(){
        let url='https://graph.facebook.com/'+this.state.id+'?fields=albums{photos{images,id}}&access_token='+this.state.access_token; //resource URI
        axios({
            method:'get',
            url:url
        })
        .then(response=>{   //received response is processed using a foreach array. to extract images
            console.log(response)
            let arr=response.data.albums.data
            let img=[];
            /* reading inner arrays using foreach loop */
            arr.forEach(element => {
                if(element.photos.data.length!==1){
                    let innerArray=element.photos.data 
                    innerArray.forEach(inElement=>{
                        let temp={
                            id:inElement.id,
                            image:inElement.images[0].source
                        };
                        img.push(temp); /* push images to album array */
                    });
                }
                this.setState({
                    albums:img /* set album array current state*/
                })
            });
        })
        .catch(response=>{ /* error handling */
            console.log(response);
        })      
    }

    // extractFBImages=(arr)=>{
    //     let img={}
    //     arr.forEach(element => {
    //         if(element.photos.data){
    //             let innerArray=element.photos.data
    //             innerArray.forEach(inElement=>{
    //                 let temp={
    //                     id:inElement.id,
    //                     image:inElement.images[7].source
    //                 };
    //                 img.push(temp);
    //             });
    //         }
    //     });
    //     return img;
    // }

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
                    {/* images are displayed as cards */}
                    {this.state.albums.map(function(element){
                        return <div className="col s6"> <Image_Card image={element.image} /> </div>
                    })}
                    
                </div>  
        
            </div>
        )
    }
}

export default Home;