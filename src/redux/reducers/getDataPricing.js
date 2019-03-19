import {initialState} from '../initialStates/initial'
import {SET_PRICING} from '../contants/index'
// reducer that brings the data from the products
export const set_Pricing = (state = initialState, action) => {
    switch (action.type) {
      case SET_PRICING:
        return { ...state, subtotal: action.payload.subtotal, savings: action.payload.savings, tax: action.payload.tax,
             total:action.payload.total, zip: action.payload.zip, item_name: action.payload.item_name, quantity: action.payload.quantity }
      default:
        return state;   
  
    }
  }