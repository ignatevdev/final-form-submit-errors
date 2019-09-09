import isObjectEmpty from './_isObjectEmpty';

// Recursively clean an object from empty values
export default function clean(obj) {
    const newObj = Array.isArray(obj) ? [] : {};

    Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === 'object') {
            const newVal = clean(obj[key]);

            if (!isObjectEmpty(newVal) && newVal.length !== 0) {
                newObj[key] = newVal;
            }
        } else if (obj[key] !== null) {
            newObj[key] = obj[key];
        }
    });

    return newObj;
}
