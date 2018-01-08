export const setApplianceFlag = (type) => {
    let applianceConst = "";
    switch(type) {
        case "food":
            applianceConst = 'Food';
            break;
        case "appliance":
        case "fsp":
            applianceConst = 'Appliance'
            break;
        case "app":
            applianceConst = 'Other'
            break;
        case "food, appliance":
            applianceConst = 'Food & Appliance'
            break;
        default:
            applianceConst = 'Food'
            break;
    }
    return applianceConst;
}

export const getDonotCheckDetail = () => {
    const rememberDetails = localStorage.getItem('isDonotAskAgain');
    return rememberDetails || 'false';
}

export function parseFun(type) {
    return typeof type == 'string' ? JSON.parse(type) : type;
 }

export  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

export const setLoanProductName = (value) => {
    const type = value ? (value).substring(0, 4) : 0;
    let productName = "";
    switch(type) {
        case "3663":
            productName = 'Food';
            break;
        case "3733":
            productName = 'Appliance'
            break;
        default:
            productName = 'Other'
            break;
    }
    return productName;
}

export const toAbbrName = (firstName, middleName, lastName) => {
    const names = [];
    if (firstName) {
        names.push(firstName[0].toUpperCase());
    }

    if (middleName) {
        names.push(middleName[0].toUpperCase());
    }

    if (lastName) {
        names.push(lastName[0].toUpperCase() + lastName.slice(1));
    }

    return names.join('.');
}