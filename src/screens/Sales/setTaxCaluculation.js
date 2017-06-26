export const applicantFoodTaxState = {
    'CT': '0',
    'NH': '0',
    'ME': '0'
}
export const applicationTaxState = {
    'CT': '6.35',
    'NH': '0',
    'ME': '5.50'
}

export const taxCalculationFlag = (type, state) => {
    let isTaxDisabled = true;
    const isFoodStateFound = applicantFoodTaxState.hasOwnProperty(state);
    const isFound = applicationTaxState.hasOwnProperty(state);
    switch(type) {
        case 'FOOD':
            if(isFoodStateFound) 
                isTaxDisabled = true;
            else 
                isTaxDisabled = false;
            break;
        case 'FSP':
        case 'APP':         
            if(isFound) 
                isTaxDisabled = true;
            else 
                isTaxDisabled = false;
            break;
        default:
            isTaxDisabled = true;
            break;
    }
    return isTaxDisabled;    
}

export const taxCalculationPrice = (type, state, price, elseTax) => {
    let taxPrice = 0;
    const isFoodStateFound = applicantFoodTaxState.hasOwnProperty(state);
    const isFound = applicationTaxState.hasOwnProperty(state);
    switch(type) {
        case 'FOOD':
            if(isFoodStateFound) 
                taxPrice =  parseFloat(price * applicantFoodTaxState[state] /100).toFixed(2) ;
            else 
                taxPrice = elseTax || 0;
            break;
        case 'FSP':
        case 'APP':         
            if(isFound) 
                taxPrice = parseFloat(price * applicationTaxState[state] /100).toFixed(2) ;
            else 
                taxPrice = elseTax || 0;
            break;
        default:
                taxPrice = elseTax || 0;
            break;
    }
    return taxPrice;
}
