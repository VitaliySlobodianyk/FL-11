import React from 'react'
import classes from './star.module.scss'
import PropTypes from 'prop-types'

export function Star(props) {
    if(props.fillnes=== 1){
    return (
        <div className={classes.usual,classes.star}>
            &#x2605;
        </div>
    )
   }
   return (
        <div className={classes.star}>
             &#x2606;	
         <div className={`${classes.filled} ${classes.star}`} style={{width:(props.fillnes) + 'rem'}}>&#x2605;</div>
</div>
    )
}

Star.propTypes = {
    fillnes: PropTypes.number.isRequired
  }

