import { pricingData} from '../../mock/mockData'
import {SET_PRICING} from '../contants/index'
// action that brings the product data 
export const set_Pricing = () => {
    return async (dispatch) => {
        const responsePricing = pricingData;
        dispatch({ type: SET_PRICING, payload: { subtotal: responsePricing.pricing.subtotal, savings: responsePricing.pricing.savings, tax: responsePricing.pricing.tax,
            total:responsePricing.pricing.total, zip: responsePricing.pricing.zip, item_name: responsePricing.itemDetails.item_name, quantity: responsePricing.itemDetails.quantity, 
            
        } });
    }
}
// action that adds the promo discount
export const addPromoCode = (promoCode, total) => {
    return async (dispatch) => {
        console.log('entro')
        let newTotal=total;
        let newSavings=0; 
        if (promoCode==='DISCOUNT'){
            newSavings = (total/100)*10
            newTotal = total-newSavings
        }else{
            newTotal = total
        }
        console.log('s',newSavings,'t', newTotal)
        dispatch({ type: "ADD_PROMO", payload: { Nsavings: newSavings, Ntotal:newTotal            
        } });
    }
}