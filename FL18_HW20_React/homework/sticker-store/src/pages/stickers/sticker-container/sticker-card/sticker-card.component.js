import React from 'react'
import classes from './sticker-card.module.scss';
import PropTypes from 'prop-types';
import {PrimaryButton} from '../../../../shared'; 
import { CardPreview}  from './card-preview';
import {Raiting} from './raiting';

export class StickerCard extends React.Component {

  constructor(props){
    super(props);
    this.state={
      taken: false
    }
    this.onClick= this.onClick.bind(this);
  }
  onClick(){  
    this.setState({
       taken: true
     })   
     this.props.clickMessager(this);
  }
 
  render() {
    return (
    <>
    <div className={classes.card} onClick={( )=>this.props.clickHandler(this)} >
      < CardPreview 
      stickers={this.props.stickers.slice(0,3)}
       />
      <h3 className={classes.header}>{this.props.title}</h3>
       <Raiting
         stars={this.props.stars} 
       />
       <PrimaryButton 
       InitialDisabled={this.state.taken}
       text = {'Buy'}
       price= {this.props.price}
       clickHandler = {this.onClick}
       /> 
    </div>
    </> 
    );
  }
}

StickerCard.propTypes = {
  id:PropTypes.number.isRequired,
  stickers: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
  clickMessager: PropTypes.func.isRequired,
}


