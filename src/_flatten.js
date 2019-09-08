export default function flatten(ob) {
    const toReturn = {};

    for (const i in ob) {
        if (!ob.hasOwnProperty(i)) {
            continue;
        }

        if (typeof ob[i] === 'object' && ob[i] !== null) {
            const flatObject = flatten(ob[i]);

            for (const x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) {
                    continue;
                }

                // Make a bracket array notation like some[1].array[0]
                const key = `${i}.${x}`.split('.').reduce((str, value) => {
                    if (/^\[\d\]/.test(value)) {
                        return `${str}${value}`;
                    }

                    if (!isNaN(value)) {
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
            toReturn[i] = ob[i];
        }
    }

    return toReturn;
}
