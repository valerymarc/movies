import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { addMovie, removeMovie } from '../actions/movie';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHandHoldingHeart} from '@fortawesome/fontawesome-free-solid';
import '../css/Poster.css';

class PosterComponent extends Component {
    state ={
        hover:false
    }

    showOverlay = () =>{
        if(this.state.hover){
            return;
        }else{
            this.setState({hover: true});
        }
        
    }

    hideOverlay = () =>{
        this.setState({hover: false});
    }

    add = () =>{
        console.log('add avec redux');
        this.props.addM(this.props.movie)
    }

    remove = () =>{
        console.log('remove avec redux');
        this.props.removeM(this.props.id);
    }

    render() {
        return (<div 
        onMouseEnter={this.showOverlay}
        onMouseLeave={this.hideOverlay}
        className="poster">
        <Link to={{ pathname: `/${this.props.id}` }}>
        { !this.props.imgSrc.onerror ? (
            <img className="poster--img" src={this.props.imgSrc} alt="poster" />
        ) : (
            <img className="poster--img" src='./images/no_image.png' alt="poster" />
        )}
       
        </Link>
          {this.state.hover ? (
             <div className="poster--overlay">
                 <h3 className="poster--overlay__text">WISHES LIST</h3>
                {this.props.wished ? (
                    <FontAwesomeIcon onClick={this.remove}  className="poster--icon" name="heart" size="3x" icon={faHeart} />
                ):
                (
                    <FontAwesomeIcon onClick={this.add} className="poster--icon__not" name="heart-o" size="3x" icon={faHandHoldingHeart}  /> 
                )}
             </div>
          ): null}
        </div>)
    }
}

const mapDispacthToProps = dispatch =>{
    return {
        addM : movie => dispatch(addMovie(movie)),
        removeM : idMovie => dispatch(removeMovie(idMovie))
    }
}

const Poster  =  connect(null, mapDispacthToProps)(PosterComponent)

export {Poster};