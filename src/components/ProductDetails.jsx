import * as React from 'react';
import chair from './chair.jpg'
import './productDetail.css'
class ProductDetails extends React.Component{
    render (){
        return(
            <div className='productGlobal'>
                <label className='productName'>Product: {this.props.name}</label>
                <div>
                <img src={chair} alt='Chair' className='chair'/> 
                </div>
                <label>Quantity {this.props.quantity}</label>
            </div>
        )
    }
}

export default ProductDetails;