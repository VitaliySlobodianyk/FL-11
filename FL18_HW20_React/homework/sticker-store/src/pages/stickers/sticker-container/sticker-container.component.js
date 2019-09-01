import React from 'react';
import { StickerCard } from './sticker-card';
import { API } from '../../../constants/api.constants';
import classes from './stickers-container.module.scss';
import PropTypes from 'prop-types';
export class StickerContainer extends React.Component {

    constructor(props) {
        super(props);
       this.clickedcard={};
        this.state = {
            goods: []
        }
        this.cardClickHandler= this.cardClickHandler.bind(this);
        this.cardClickMessager= this.cardClickMessager.bind(this);
        
    }
    cardClickHandler(componentState,selected){
     this.props.cardHandler(componentState,selected);
    }
    cardClickMessager(status,element){
        this.props.cardSelected(status,element);
    }

    componentDidMount() {
        let dataRequest = new XMLHttpRequest();  
        dataRequest.onload = () => {
            if (dataRequest.status === 200) {    
   
                this.setState({ goods: JSON.parse(dataRequest.response).emoji });
            }
        };
        dataRequest.open('GET', API, true);
        dataRequest.send();
    }

    render() {

        if (this.state.goods.length === 0) {
            return <p>Loading...</p>;
        }
        else {
            return(<div className={classes.container}>              
             {this.state.goods.map(element => {
                return (<StickerCard
                   key={element.id}
                   id={element.id}
                    stickers={element.emoji}
                    title={element.title}
                    stars={element.stars}
                    price={element.price}
                    clickHandler={this.cardClickHandler}
                    clickMessager={this.cardClickMessager}
                />)
            })}
            </div>)
        }
    }

}
StickerContainer.porpTypes={
    cardHandler:PropTypes.func.isRequired,
    cardSelected:PropTypes.func.isRequired,
}



