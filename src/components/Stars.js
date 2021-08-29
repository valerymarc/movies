import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faStar, faStarHalf } from '@fortawesome/fontawesome-free-solid';
import {faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import '../css/stars.css';

library.add(faStar)

const Stars = (props) => {
    const renderStars1 = () =>{
       return props.fakeArray1.map((element, i) =>{
           return <FontAwesomeIcon key={i} 
                                   className="stars"
                                   name="star"
                                   size="3x"
                                   icon={faStar}
                                   />
       })
    }

    const renderStars2 = () =>{
        return props.fakeArray2.map((element, i) =>{
            return <FontAwesomeIcon key={i} 
                                    className="stars"
                                    name="star-o"
                                    size="3x"
                                    icon={faStarHalfAlt}
                                    />
        })
    }

    return (<div className="stars">   
      {renderStars1()} {/* Pour afficher les étoiles deja remplies */}
      {renderStars2()} {/* Pour afficher les étoiles vides */}
    </div>);
}
 
export {Stars};