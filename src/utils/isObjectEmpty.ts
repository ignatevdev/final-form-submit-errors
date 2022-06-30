const isObjectEmpty = (obj: any) => {
  if (!obj) {
    return true;
  }

  return Object.entries(obj).length === 0 && obj.constructor === Object;
};

export default isObjectEmpty;
