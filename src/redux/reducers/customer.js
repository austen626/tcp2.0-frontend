import {
    CLEAR_CUSTOMER,
    CHANGE_CONTACT,
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    CHANGE_PRODUCT,
    ADD_EXITING_PRODUCT,
    EMAIL_VALIDATE_REQUEST,
    EMAIL_VALIDATE_SUCCESS,
    EMAIL_VALIDATE_FAILED,
    SET_RESENT_SUCCESS,
} from '../actions/customer';
import {    
    SET_REORDER_CUSTOMER,
    SET_REORDER_CUSTOMER_SUCCESS,
    SET_REORDER_CUSTOMER_FAILED,
    SET_CUSTOMER_FORM,
    SET_CUSTOMER_FORM_SUCCESS,
    SET_CUSTOMER_FORM_FAILED,
} from '../actions/actionTypes'

const INITIAL_CONTACT = {

    order_type: 0,

    existing_customer_id: 0,
    reorder: false,
    preapproval_id:0,
    main_app: {
        cif_number: '',
        name: "",
        email: "",
        dobY: "",
        dobM: "",
        dobD: "",
        ssn: "",
        dl: "",
        nod: "",
        cell_phone: "",
        home_phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        yt1: "",
        own_or_rent: "",
        present_employer: "",
        yt2: "",
        job_title: "",
        employer_phone: "",
        monthly_income: "",
        additional_income: "",
        source: "",
        landlord_holder: "",
        monthly_rent_payment: ""
    },
    co_app: {
        name: "",
        email: "",
        dobY: "",
        dobM: "",
        dobD: "",
        ssn: "",
        dl: "",
        nod: "",
        cell_phone: "",
        home_phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        yt1: "",
        own_or_rent: "",
        present_employer: "",
        yt2: "",
        job_title: "",
        employer_phone: "",
        monthly_income: "",
        additional_income: "",
        source: "",
        landlord_holder: "",
        monthly_rent_payment: ""
    },

    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',

    co_name: '',
    same_address: false,
    co_street: '',
    co_city: '',
    co_state: '',
    co_zip: '',
    co_phone: '',
    co_email: '',

    co_enabled: false,
    co_complete: false,
    co_separate: false,
    sent: false,
};

export const INITIAL_PRODUCT = {
    product_type: '',
    
    price: 0,
    total_discount: 0,
    coupon: 0,
    add_discount: 0,

    tax : 0,
    
    cash_credit: 0,
    check: 0,
    finance_period: 0,

    makemodel: '',

    saved: false,
}

const INIT_STATE = {
    contact: INITIAL_CONTACT,
    products: [],
    isSettingCustomerDetails: false,
    isCustomerFormLoading: false,
    isEmailNotValid: false,
    isEmailCheckLoading: false,
    sentOneTime: false,
    customerError: ''
};

export default function(state = INIT_STATE, action){
    var products;
    switch (action.type) {
        case CHANGE_CONTACT:
            if (action.payload.role === "main") {
                return {
                    ...state,
                    contact: {
                        ...state.contact,
                        main_app: {
                            ...state.contact.main_app,
                            [action.payload.key]: action.payload.value
                        }
                    }
                }    
            } else if (action.payload.role === "co") {
                return {
                    ...state,
                    contact: {
                        ...state.contact,
                        co_app: {
                            ...state.contact.co_app,
                            [action.payload.key]: action.payload.value
                        }
                    }
                }
            }
            return {
                ...state,
                contact: {
                    ...state.contact,
                    ...action.payload
                }
            }
        case CLEAR_CUSTOMER:
            return INIT_STATE;
            case ADD_PRODUCT:
            return {
                ...state,
                products: [
                    ...state.products,
                    INITIAL_PRODUCT
                ]
            };
        case ADD_EXITING_PRODUCT:
            return {
                ...state,
                products: [
                    ...action.payload
                ]
            };
        case CHANGE_PRODUCT:
            products = state.products;
            for (var i = 0; i < products.length; i ++) {
                if (i === action.payload.id) {
                    products[i] = {
                        ...products[i],
                        ...action.payload.data
                    };
                }
            }
            return {
                ...state,
                products: products
            };
        case REMOVE_PRODUCT:
            products = state.products;
            products.splice(action.payload.id, 1);
            return {
                ...state,
                products: products
            };
        case SET_REORDER_CUSTOMER:
                return {
                    ...state,
                    isSettingCustomerDetails: true,
                    customerError: ''
                };
        case SET_REORDER_CUSTOMER_SUCCESS:
            return {
                ...state,
                isSettingCustomerDetails: false,
                customerError: ''
            };
        case SET_REORDER_CUSTOMER_FAILED:
            return {
                ...state,
                isSettingCustomerDetails: false,
                customerError: 'Not Found'
            };
        case SET_CUSTOMER_FORM:
                return {
                    ...state,
                    isCustomerFormLoading: true
                };
        case SET_CUSTOMER_FORM_SUCCESS:
            return {
                ...state,
                isCustomerFormLoading: false,
                // ...INIT_STATE
            };
        case SET_CUSTOMER_FORM_FAILED:
            return {
                ...state,
                isCustomerFormLoading: false
            };
        case EMAIL_VALIDATE_REQUEST:
                return {
                    ...state,
                    isEmailNotValid: false,
                    isEmailCheckLoading: true
                };
        case EMAIL_VALIDATE_SUCCESS:
            return {
                ...state,
                isEmailNotValid: action.data,
                isEmailCheckLoading: false
            };
        case EMAIL_VALIDATE_FAILED:
            return {
                ...state,
                isEmailNotValid: action.data,
                isEmailCheckLoading: false
            };
        case SET_RESENT_SUCCESS:
            return {
                ...state,
                sentOneTime: true,
            };
        default:
            return state;
    }
}

// const setCustomer = (state, data) => {
//     console.log(state)
//     console.log(data)
//     return {
//         ...state,
//         products: [
//             ...state.products,
//             INITIAL_PRODUCT
//         ],
//         contact: {

//         }
//     }
// }