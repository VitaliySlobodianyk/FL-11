import React from 'react';
import PropTypes from 'prop-types';
import classes from './product-info.module.scss';
import { PrimaryButton } from '../../../shared';
export class ProductInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                data: this.props.data
            })
        }
        return true;
    }

    render() {
        if (this.state.data) {
            return (
                <div className={classes.header} >
                    <h1> {this.state.data.props.title} </h1>
                    <h3>Includes:</h3>
                    <div>
                        {
                            this.state.data.props.stickers.map((element) => {
                                return element.char;
                            })
                        }
                    </div>
                   <div className={classes.btnWrapper}>
                   <PrimaryButton
                        InitialDisabled={this.state.data.state.taken}
                        text={'Buy'}
                        price={this.state.data.props.price}
                        clickHandler={this.state.data.onClick}
                    />
                   </div>   
                </div>
            )
        }

        return (
            <div className={classes.header} >
                <h1>Select item to see details</h1>
            </div>
        )
    }
}

ProductInfo.propTypes = {
    data: PropTypes.object,
    isBought: PropTypes.bool
}