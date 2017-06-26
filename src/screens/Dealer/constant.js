export const salesType = {
    'approved': 'Approved',
    'pending': 'Pending',
    'declined': 'Declined',
    'funded': 'Funded',
    'cancelled': 'Cancelled',
}

export const custom_sort = (a, b) => {
    return new Date(b.Payment_Effective_Date).getTime() - new Date(a.Payment_Effective_Date).getTime();
}

export const finalArray = (paymentHist) => {
    return paymentHist.sort(custom_sort)
}