import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFilm } from '@fortawesome/fontawesome-free-solid';
import { connect } from 'react-redux';
import { getNumber } from '../actions/movie';
import '../css/Header.css';

let mypath;

class HeaderComponent extends Component {
  componentDidMount(){
    this.props.getNumber();
  } 
  


  render() {
   this.props.badge === 0 ? mypath="/" : mypath="/player";
        return(<div className="header">
          
          <Link to={{ pathname:"/"}} >
          <FontAwesomeIcon className="header--movie" name="film" size="5x"  icon={faFilm}/>
          </Link>
          
          <h3>MY MOVIES</h3>
              
            
             
            <Link to={{pathname: mypath}}>
            <FontAwesomeIcon className="header--heart" name="heart" size="5x" icon={faHeart}/>
            </Link>
            <div className="header--badge">{this.props.badge}</div>

        </div>);
    }
}

const mapStateToProps = state =>{
  return {
       badge: state.movies.number
  }
}

const mapDispacthToProps = dispatch =>{
  return {
    getNumber: () => dispatch(getNumber())
  }
}

const Header = connect(mapStateToProps, mapDispacthToProps)(HeaderComponent);

/*state = {
  movies: {
    movies:[],
    number: 0
  }
}*/

export { Header };