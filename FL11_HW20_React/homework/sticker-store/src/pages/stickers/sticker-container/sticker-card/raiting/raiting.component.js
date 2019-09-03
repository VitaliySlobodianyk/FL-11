import React from 'react'
import PropTypes from 'prop-types';
import classes from './raiting.module.scss';
import { Star } from './star'

export function Raiting(props) {
    let builder = (numberOfStars) => {
        let arr = [];    
        for (let i = numberOfStars; i > 0; i--) {
            if (i < 1) {
                arr.push( (<Star
                    key={i}
                    fillnes={i}
                />)) 
            } else {
                arr.push( (<Star
                    key={i}
                    fillnes={1}
                />)) 
            }
        }
        return arr;
    }
    return (
        <div className={classes.raiting}>
            {
               builder(props.stars)
            }
        </div>
    )
}

Raiting.propTypes = {
    stars: PropTypes.number.isRequired
}
