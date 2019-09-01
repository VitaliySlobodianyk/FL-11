import React from 'react';
import PropTypes from 'prop-types';
import classes from './cart.module.scss';
import { PrimaryButton } from '../../../shared';
import { CartItem } from './cart-item';
export class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: 0,
            items:[]
        }
        this.addItem= this.addItem.bind(this);
        this.props.onItemAdded(this.addItem);
        this.clearAllItems=this.clearAllItems.bind(this);
        this.removeItem=this.removeItem.bind(this);
        this.renderCartItems=this.renderCartItems.bind(this);
    }
    addItem(item){
        this.state.price+=item.props.price;
        this.state.items.push(item);
    }
    clearAllItems(){
       alert('Purchase has been completed');
        this.state.items.forEach(element=>{
            element.state.taken=false;
        });
        this.setState({
            price: 0,
            items:[]
        });
        this.props.sendRefreshStatus(true);
    }
    removeItem(itemId){
      let element= this.state.items.splice(this.state.items.findIndex(
          (element)=>{
           return element.props.id===itemId;
          }
      ),1)[0];  
        this.state.price-=element.props.price;
        element.state.taken=false;
        this.props.sendRefreshStatus(false);
    }
     
    renderCartItems(){
        if(this.state.items.length===0){
            return (<p>No items to purchase!</p>)
        }else{
        return  this.state.items.map((element) => {
         console.log(element);
             return (<CartItem                        
                 key={element.props.id}
                 id={element.props.id}
                 title={element.props.title}
                 price={element.props.price}
                 remove={this.removeItem}
             />)
         })}
    }
   
    render() {
        return (
            <div className={classes.cart}>
                <h3>Basket</h3>
                <div className={classes.items}>
                    {
                       this.renderCartItems()
                     }
                </div>
                <PrimaryButton
                    InitialDisabled={ !this.state.price }
                    text='Purchase'
                    price={this.state.price}
                    clickHandler={this.clearAllItems}
                />
            </div>
        )
    }
}
Cart.propTypes = {
    onItemAdded: PropTypes.func.isRequired,
    sendRefreshStatus:PropTypes.func.isRequired
}
