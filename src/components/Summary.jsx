import * as React from 'react';
import './CSS.css'
import {connect} from 'react-redux'
import {set_Pricing, addPromoCode} from '../redux/actions'
import ProductDetails from './ProductDetails'
class Summary extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            subtotal:0,
            savings:0,
            shipping:0,
            tax:0,
            total:0,
            zip:0,
            promoCode:'',
            item_name:'',
            quantity:0,
            revealDetails:false,
            detailMessage:'Show details +',
            revealPromo:false,
            promoMessage:'Apply promo code',
            hover:false,
        }
    }
    // on component mount get the prices from the mock
     componentDidMount=async()=>{
        
        await  this.props.set_Pricing();
        console.log('props',this.props)
        this.setState({subtotal:this.props.subtotal,
        savings:this.props.savings,
        tax:this.props.tax,
        total:this.props.total,
        item_name:this.props.item_name,
        quantity:this.props.quantity,
        })
    }
    //get the value written in the promo input
    handlePromo=(e)=>{
        this.setState({promoCode:e.target.value})
    }
    // check if the input of the promo is correct and then call the action for the discount
    checkPromo=async()=>{
        if (this.state.promoCode==='DISCOUNT'){
            
            await this.props.addPromoCode(this.state.promoCode, this.state.total)
            console.log(this.props)
            this.setState({savings:(this.state.savings+this.props.promoSavings), total:this.props.promoTotal})
        }else{
            alert('wrong code, the code is DISCOUNT')
        }
    }
    // checks if the show details was clicked and if so render the component with some props so the component is reutilizable
    showDetails=()=>{
        if (this.state.revealDetails===true){
            return ( <ProductDetails name={this.state.item_name} quantity={this.state.quantity}/>)
        }else{
            return (
                <div></div>
            )
        }
    }
    // changes the state based on the click of the show/hide details
    handleDetails = ()=>{
        if (this.state.revealDetails===false){
            this.setState({revealDetails:true, detailMessage:'Hide details -'})
        }else{
            this.setState({revealDetails:false,  detailMessage:'Show details +'})
        }
    }
    // checks and render the promo div
    handlePromoShow=()=>{
        if (this.state.revealPromo===false){
            this.setState({revealPromo:true, promoMessage:'Hide promo code'})
        }else{
            this.setState({revealPromo:false,  promoMessage:'Apply promo code'})
        } 
    }
    // handles the state of the promo div
    showPromo=()=>{
        if (this.state.revealPromo===true){
            return (
                <div className='promo'>
            <span>
                <input type='text' placeholder='Promo Code'onChange={this.handlePromo}></input>
            </span>
            <label className='promoButton'onClick={this.checkPromo} >Apply</label>
            </div>
                )

        }else{
            return (
                <div></div>
            )
        }
    }
   // handles the state if mouse is hovering on shipping
    handleMouseIn=()=>{
        this.setState({ hover: true })
      }
      // checks when mouse leaves the shipping area
      handleMouseOut=()=> {
        this.setState({ hover: false })
      }
      // determines if the tooltip should show or not
      showTooltip=()=>{
        if (this.state.hover===true){
            return ( <div>>Some tooltip</div>)
        }else{
            return (
                <div></div>
            )
        }
      }
    render (){

        return(
            <div className='global'>
                 <div className='outerDivPricing'>         
            <div className='subTotal'>
                <span className='labels'>
                    <label>Subtotal</label>
                </span>
                <span className='numbers'>
                    <label>$ {this.state.subtotal}</label>
                </span>
            </div>
            <div className='Shipping' onMouseOver={this.renderTooltip}>
                <span onMouseOver={this.handleMouseIn} onMouseOut={this.handleMouseOut} className='labels'>
                    <label>Shipping</label>
                    
                </span>
                <span className='numbers'>
                    <label>$ 0.00</label>
                    {this.showTooltip()}
                </span>
            </div>
            <div className='TaxesFees'>
                <span className='labels'>
                    <label>Est. Taxes & Fees</label>
                </span>
                <span className='numbers' >
                    <label> ${this.state.tax}</label>
                </span>
            </div>
            <label onClick={this.handleDetails}>{this.state.detailMessage}</label>
            {
                this.showDetails()
            }
           
            <div className='Total'>
                <span className='labels'>
                    <label>Est. total</label>
                </span>
                <span className='numbers'>
                    <label>$ {this.state.total}</label>
                </span>
            </div>
            </div>
            <label onClick={this.handlePromoShow}>{this.state.promoMessage}</label>
            {this.showPromo()}
            </div>
        )
    }
}
// conects to the store 
export default connect((store)=>({savings:store.set_Pricing.savings, subtotal:store.set_Pricing.subtotal,
    tax:store.set_Pricing.tax, total:store.set_Pricing.total, zip: store.set_Pricing.zip, item_name: store.set_Pricing.item_name, quantity: store.set_Pricing.quantity,
    promoSavings: store.add_promo.savings, promoTotal: store.add_promo.total,
}), {set_Pricing,addPromoCode})(Summary);