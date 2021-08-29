import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Container.css';

const Container = (props) => (
    <div className="container">
           
               <FontAwesomeIcon name={props.iconName} size="5x" icon={props.icon} />
           
          <h3 className="container--title">{props.content}</h3>
    </div>
)
 
export {Container};