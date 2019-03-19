import {initialState} from '../initialStates/initial'
// promo discount reducer
export const add_promo = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_PROMO":
        return { ...state, savings: action.payload.Nsavings, total:action.payload.Ntotal }
      default:
        return state;   
  
    }
  }