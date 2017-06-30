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

        const regex = regexString && new RegExp(regexString, 'i');

        const isValid = regex && value ? regex.test(value): true;

        const elmResult = element.hasAttribute('required') && value === '' ? { error: 'empty' } : !isValid ? { error: 'invalid' } : null;

        if(elmResult) 
        {
            validationResult[name] = elmResult;
        }

        if(name !== "")
        {
            if(integerKeys && integerKeys.includes(name))
            {
                value = parseInt(value);
            }

            if(type === 'checkbox') 
            {
                value = value === 'true';
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