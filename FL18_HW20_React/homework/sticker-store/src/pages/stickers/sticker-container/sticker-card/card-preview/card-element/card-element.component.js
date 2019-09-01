import React from 'react'
import PropTypes from 'prop-types'
import classes from './card-element.module.scss'

export function CardElement(props) {
    const styles = [classes.element1,classes.element2,classes.element3];

    return (
        <div className={styles[props.index]}>
            {props.char}
        </div>
    )
}

CardElement.propTypes = {
  index: PropTypes.number.isRequired,
  char:  PropTypes.string.isRequired
}



