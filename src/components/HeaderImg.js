import React, { Component } from 'react';
import '../css/HeaderImg.css';

class HeaderImg extends Component{
    render(){
        return (<div className="headerImg" 
        style={{
            background: `url(${this.props.imgScr}) no-repeat`  
           //background: `url(${IMAGE_BASE_URL}/${BACKDROP_SIZE/results[0].backdrop_path})`
            }}>
              <div className="headerImg--overlay">
                  <h3 className="headerImg--overlay__title">{this.props.title}</h3>
                  <p className="headerImg--overlay__desc">{this.props.overview}</p>
              </div>
        </div>)
    }
}

export { HeaderImg };