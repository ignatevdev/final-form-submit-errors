const flatten = (obj: any) => {
  const toReturn: any = {};

  for (const i in obj) {
    if (!obj.hasOwnProperty(i)) {
      continue;
    }

    if (typeof obj[i] === 'object' && obj[i] !== null) {
      const flatObject = flatten(obj[i]);

      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) {
          continue;
        }

        // Make a bracket array notation like some[1].array[0]
        const key = `${i}.${x}`.split('.').reduce((str, value) => {
          if (/^\[\d\]/.test(value)) {
            return `${str}${value}`;
          }

          if (!isNaN(Number(value))) {
            return `${str}[${value}]`;
          }

          if (str) {
            return `${str}.${value}`;
          }

          return value;
        }, '');

        toReturn[key] = flatObject[x];
      }
    } else {
      toReturn[i] = obj[i];
    }
  }

  return toReturn;
};

export default flatten;
