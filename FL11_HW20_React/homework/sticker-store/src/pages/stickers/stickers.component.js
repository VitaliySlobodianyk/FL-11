import React from 'react';
import { ProductInfo } from './product-info';
import classes from './stickers.module.scss';
import { StickerContainer } from './sticker-container';
import { Cart } from './cart'

export class Stickers extends React.Component {
    constructor() {
        super();
       
        this.state = {
            selectedCard: null,
        };

        this.cardClicked = this.cardClicked.bind(this);
        this.itemAdded = this.itemAdded.bind(this);
        this.refreshPage=this.refreshPage.bind(this);
    }

    cardClicked(card,isBought) {  
        if (card !== this.state.selectedCard) {
            this.setState(
                {
                    selectedCard: card
                }
            );
        }
        if(isBought){
            this.setState(
                {
                    selectedCard: card
                }
            );
            this.addItem(card); 
        }   
    }

    itemAdded(bindedFunc) {
        this.addItem = bindedFunc;
    }
    
    refreshPage(fully) {
        if (fully) {
            this.setState({
                selectedCard: null
            });
        }
        else{
            this.setState({
                selectedCard: this.state.selectedCard
            });
        }
    }

    render() {      
        return (
            <div className={classes.page}>

                <div className={classes.main}>

                    <ProductInfo
                        data={this.state.selectedCard}
                    />

                    <StickerContainer
                        cardHandler={this.cardClicked}
                    />

                </div>
                <Cart
                    onItemAdded={this.itemAdded}
                    sendRefreshStatus={this.refreshPage}
                />
            </div>
        );
    }
}






