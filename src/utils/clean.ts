import isObjectEmpty from './isObjectEmpty';

// Recursively clean an object from empty values
const clean = (obj: any) => {
  const newObj: any = Array.isArray(obj) ? [] : {};

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
};

export default clean;
