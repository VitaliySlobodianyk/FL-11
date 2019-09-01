import React from 'react'
import  PropTypes from 'prop-types';
import classes from './card-preview.module.scss';
import {CardElement} from './card-element'

export function CardPreview (props) {
  if(props.stickers.length>=3){
    return  (<div className={classes.container}> 
            {props.stickers.map((element,index)=> { 
                return <CardElement 
                key={element.codes}
                index={index}
                char={element.char}
                />
            })}
              </div>
             ); 
  } 
  else{
    return <div></div>
  }
}


CardPreview.propTypes ={
    stickers: PropTypes.array.isRequired
 }

 