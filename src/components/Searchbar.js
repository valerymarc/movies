import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid'
import '../css/SearchBar.css';

class Searchbar extends Component {
  state = {
    value: ""
  } 
  
  handleChange = e =>{
    this.setState({value: e.target.value});
  }
  
  render() {
        const { value } = this.state;
        return(<div className="searchBar--container">
          <div className="searchBar">
              <input 
                 className="searchBar--input"
                 type="text"
                 placeholder="Rechercher un film" 
                 value={value}
                 onChange={this.handleChange}  />
               <div onClick={()=>this.props.onSearchClick(value)}
               className="searchBar--submit">
                  <FontAwesomeIcon className="searchIcon" name="search"  icon={faSearch} />
               </div>
          </div>
        </div>);
    }
}


export {Searchbar};