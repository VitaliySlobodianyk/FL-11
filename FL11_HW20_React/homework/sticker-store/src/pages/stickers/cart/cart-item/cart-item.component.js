import React from 'react';
import PropTypes from 'prop-types';
import  classes from './cart-item.module.scss';

export function CartItem(props) {
    return (
        <div className={classes.item}>
           <h4 className={classes.itemName}>
           {props.title}
           </h4>
           -
           <span className={classes.price}>
             {props.price}$
           </span>
           <div onClick={() => props.remove(props.id)} className={classes.close}>
               X
           </div>
        </div>
    )
}

CartItem.propTypes = {
    id:PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    remove: PropTypes.func.isRequired
}
