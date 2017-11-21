export const fixtureOrder = {
    id: 123,
    request_type: 'order',
    review_mode: 'auto',
    status: 'approval',
    applicant: {
        first_name: 'Mark',
        last_name: 'Bialik',
        applied_date: '02 Feb 1967',
        address: 'Gold Valley 4 Houston, TX',
        email: 'john@myemail.com',
        phone: '(123) 456-7890',
    },
    co_applicant: {
        first_name: 'Carl',
        last_name: 'Smith',
        email: 'john@myemail.com',
        phone: '(123) 456-7890',
    },
    credit_app_on_file: true,
    items: [
        {
            id: 125,
            name: 'Full Service Program',
            price: 3799,
            document_delivered: false,
            document_signed: false,
        },
        {
            id: 126,
            name: 'Appliance',
            price: 599,
            document_delivered: true,
            document_signed: true,
        },
    ],
    food_tier: 2,
    other_tier: 2,
};

export const fixturePreApproval = {
    id: 124,
    request_type: 'pre-approval',
    applicant: {
        first_name: 'Mark',
        last_name: 'Bialik',
        applied_date: '02 Feb 1967',
        address: 'Gold Valley 4 Houston, TX',
        email: 'john@myemail.com',
        phone: '(123) 456-7890',
    },
    co_applicant: {
        first_name: 'Carl',
        last_name: 'Smith',
        email: 'john@myemail.com',
        phone: '(123) 456-7890',
    },
    food_date: new Date(),
    food_status: 'approval',
    food_review_mode: 'auto',
    other_status: 'in-process',
    other_review_mode: 'manual',
};

export const fixture1 = {
    id: 125,
    request_type: 'order',
    applicant: {
        first_name: 'Mark',
        last_name: 'Bialik',
        applied_date: '02 Feb 1967',
        address: 'Gold Valley 4 Houston, TX',
        email: 'john@myemail.com',
        phone: '(123) 456-7890',
    },
    co_applicant: {
        first_name: 'Carl',
        last_name: 'Smith',
        email: 'john@myemail.com',
        phone: '(123) 456-7890',
    },
    review_mode: 'manual',
    status: 'in-process',
    items: [
        {
            id: 125,
            name: 'Full Service Program',
            price: 3799,
            document_delivered: true,
            document_signed: false,
        },
        {
            id: 126,
            name: 'Appliance',
            price: 599,
            document_delivered: true,
            document_signed: true,
        },
    ],
    food_tier: 2,
    other_tier: 2,
};

export const fixture2 = {
    id: 126,
    request_type: 'pre-approval',
    applicant: {
        first_name: 'Taylor',
        last_name: 'Williams',
        applied_date: '02 Feb 1967',
        address: 'Gold Valley 4 Houston, TX',
        email: 'john@myemail.com',
        phone: '(123) 456-7890',
    },
    co_applicant: {
        first_name: 'Carl',
        last_name: 'Smith',
        email: 'john@myemail.com',
        phone: '(123) 456-7890',
    },
    food_date: new Date(),
    food_status: 'approval',
    food_review_mode: 'auto',
    other_status: 'rejection',
    other_review_mode: 'manual',
};
