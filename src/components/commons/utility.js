const getFromData = (container, ignores, integerKeys) => {

    const serializeIgnores = ignores | [];

    const form = container.currentTarget;

    const formElements = form.elements;

    let validationResult = {};

    let formData = {};

    for(let i = 0; i < formElements.length; i++)
    {
        const element = formElements[i];

        let { name, dataset, value, selectedOption, type, checked } = element;

        const regexString = dataset.regex;

        const isMatched = dataset.isMatched;

        const regex = regexString && new RegExp(regexString, 'i');

        const isValid = regex && value ? regex.test(value): isMatched && regexString !== value ? false : true;

        const elmResult = element.hasAttribute('required') && value === '' ? { error: 'empty' } : !isValid ? { error: 'invalid' } : null;

        if(elmResult) 
        {
            validationResult[name] = elmResult;
        }

        if(name === "date_of_birth" || name === "co_date_of_birth") 
        {
            let diff_ms = Date.now() - new Date(value).getTime();
            let age_dt = new Date(diff_ms);

            if(Math.abs(age_dt.getUTCFullYear() - 1970) < 18 || new Date(value).getFullYear() >= new Date().getFullYear()) {
                validationResult[name] = { error: 'ageError' };
            }
        }

        if(name !== "")
        {
            if(integerKeys && integerKeys.includes(name))
            {
                value = parseInt(value);
            }

            if(type === 'checkbox') 
            {
                value = element.checked;
            }

            if(type === 'radio' && checked) 
            {
                formData[name] = value;
            }

            if(type !== 'radio') 
            {
                formData[name] = value;
            }

        }
    }

    return {
        formData,
        validationResult: Object.keys(validationResult).length > 0 && validationResult
    };    
};


export {
    getFromData
};