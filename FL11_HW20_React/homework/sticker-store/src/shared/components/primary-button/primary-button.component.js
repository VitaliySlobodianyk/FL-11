import React from 'react'
import PropTypes from 'prop-types'
import classes from './primary-button.module.scss'

export const PrimaryButton = (props) => {


    if (props.number !== null) {
        return ( <
            button onClick = { props.clickHandler }
            className = { classes.primaryButton }
            disabled = { props.InitialDisabled } >
            <
            span className = { classes.text } > { props.text } < /span> <
            span > ({ props.price }
                $) < /span> <
            /button>
        )
    } else {
        return ( <
            button disabled = { props.InitialDisabled } >
            <
            span > { props.text } < /span> <
            /button>
        )
    }
}


PrimaryButton.propTypes = {
    InitialDisabled: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    price: PropTypes.number,
    clickHandler: PropTypes.func
}