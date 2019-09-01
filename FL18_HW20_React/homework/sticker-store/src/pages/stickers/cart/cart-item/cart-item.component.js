import React from 'react';
import PropTypes from 'prop-types';
import  classes from './cart-item.module.scss';

export function CartItem(props) {
    return (
        <div className={classes.item}>
           {props.title}
           {props.price}$
           <div onClick={() => props.remove(props.id)}>
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
