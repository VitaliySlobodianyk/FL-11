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

        this.getDataFromCard = this.getDataFromCard.bind(this);
        this.cardBought = this.cardBought.bind(this);
        this.getData = this.getData.bind(this);
        this.itemAdded = this.itemAdded.bind(this);
        this.refreshPage=this.refreshPage.bind(this);
    }

    getDataFromCard(data) {
        if (data !== this.state.selectedCard) {
            this.setState(
                {
                    selectedCard: data
                }
            );
        }
    }

    cardBought(status, card) {
        if (status) {
            this.setState(
                {
                    selectedCard: this.state.selectedCard
                }
            );
            this.addItem(card);
        }
    }

    itemAdded(bindedFunc) {
        this.addItem = bindedFunc;
    }

    getData(bindedState) {
        this.header = bindedState;
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
                        cardHandler={this.getDataFromCard}
                        cardSelected={this.cardBought}
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






